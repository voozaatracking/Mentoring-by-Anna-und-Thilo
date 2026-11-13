import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { sendMail, createTransport } = vi.hoisted(() => {
  const sendMail = vi.fn(async (mail: Record<string, unknown>) => {
    void mail;
    return { messageId: "test" };
  });
  const createTransport = vi.fn((optionen: Record<string, unknown>) => {
    void optionen;
    return { sendMail };
  });
  return { sendMail, createTransport };
});

vi.mock("nodemailer", () => ({
  default: { createTransport },
  createTransport,
}));

import { POST } from "@/app/api/anfrage/route";
import { MAX_ANFRAGEN, setzeRateLimitZurueck } from "@/lib/rate-limit";

const gueltig = {
  name: "Erika Beispiel",
  email: "erika@example.org",
  telefon: "0151 2345678",
  stand: "aussicht",
  nachricht: "Wir haben eine Wohnung in Aussicht.",
  zustimmung: true,
  website: "",
};

function anfrage(daten: unknown, ip = "203.0.113.5") {
  return new Request("http://localhost/api/anfrage", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: typeof daten === "string" ? daten : JSON.stringify(daten),
  });
}

function setzeSmtp(mitCc = true) {
  vi.stubEnv("SMTP_HOST", "smtp.example.org");
  vi.stubEnv("SMTP_PORT", "465");
  vi.stubEnv("SMTP_USER", "mentoring@example.org");
  vi.stubEnv("SMTP_PASS", "geheim");
  vi.stubEnv("MAIL_FROM", "mentoring@example.org");
  vi.stubEnv("MAIL_TO", "anna@example.org");
  vi.stubEnv("MAIL_CC", mitCc ? "thilo@example.org" : "");
}

function leereSmtp() {
  for (const name of [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "MAIL_FROM",
    "MAIL_TO",
    "MAIL_CC",
  ]) {
    vi.stubEnv(name, "");
  }
}

beforeEach(() => {
  setzeRateLimitZurueck();
  sendMail.mockClear();
  createTransport.mockClear();
  leereSmtp();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("POST /api/anfrage", () => {
  it("antwortet mit 400, wenn die Zustimmung fehlt", async () => {
    setzeSmtp();
    const antwort = await POST(anfrage({ ...gueltig, zustimmung: false }));
    expect(antwort.status).toBe(400);
    expect(await antwort.json()).toEqual({
      ok: false,
      fehler: "validierung",
      felder: { zustimmung: "pflicht" },
    });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("antwortet mit 400 bei kaputtem JSON", async () => {
    setzeSmtp();
    const antwort = await POST(anfrage("{kaputt"));
    expect(antwort.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("antwortet beim Honeypot mit 200 und versendet nichts", async () => {
    setzeSmtp();
    const antwort = await POST(
      anfrage({ ...gueltig, website: "http://spam.example" }),
    );
    expect(antwort.status).toBe(200);
    expect(await antwort.json()).toEqual({ ok: true });
    expect(createTransport).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("versendet bei Erfolg mit to, cc und replyTo", async () => {
    setzeSmtp();
    const antwort = await POST(anfrage(gueltig));
    expect(antwort.status).toBe(200);
    expect(await antwort.json()).toEqual({ ok: true });

    expect(createTransport).toHaveBeenCalledTimes(1);
    expect(createTransport.mock.calls[0][0]).toMatchObject({
      host: "smtp.example.org",
      port: 465,
      secure: true,
      auth: { user: "mentoring@example.org", pass: "geheim" },
    });

    expect(sendMail).toHaveBeenCalledTimes(1);
    const mail = sendMail.mock.calls[0][0];
    expect(mail).toMatchObject({
      from: {
        name: "Mentoring by Anna & Thilo",
        address: "mentoring@example.org",
      },
      to: "anna@example.org",
      cc: "thilo@example.org",
      replyTo: "erika@example.org",
      subject: "Neue Anfrage Erstgespräch: Erika Beispiel",
    });
    const text = String(mail.text);
    expect(text).toContain("Name: Erika Beispiel");
    expect(text).toContain("E-Mail: erika@example.org");
    expect(text).toContain("Telefon: 0151 2345678");
    expect(text).toContain("Stand: Ich habe eine Wohnung in Aussicht");
    expect(text).toContain("Wir haben eine Wohnung in Aussicht.");
    expect(text).toMatch(/Zeitpunkt: .+ Uhr/);
    // Nur-Text-Mail, keine automatische Antwort an die anfragende Person.
    expect(mail).not.toHaveProperty("html");
    expect(String(mail.to)).not.toContain("erika@example.org");
  });

  it("versendet ohne cc, wenn MAIL_CC fehlt, und nutzt STARTTLS abseits von Port 465", async () => {
    setzeSmtp(false);
    vi.stubEnv("SMTP_PORT", "587");
    const antwort = await POST(anfrage(gueltig));
    expect(antwort.status).toBe(200);
    expect(createTransport.mock.calls[0][0]).toMatchObject({
      port: 587,
      secure: false,
      requireTLS: true,
    });
    expect(sendMail.mock.calls[0][0].cc).toBeUndefined();
  });

  it("antwortet mit 503 und schreibt ins Serverlog, wenn Variablen fehlen", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    setzeSmtp();
    vi.stubEnv("SMTP_PASS", "");
    vi.stubEnv("MAIL_TO", "");
    const antwort = await POST(anfrage(gueltig));
    expect(antwort.status).toBe(503);
    expect(await antwort.json()).toEqual({
      ok: false,
      fehler: "nicht_konfiguriert",
    });
    expect(sendMail).not.toHaveBeenCalled();
    expect(log).toHaveBeenCalledTimes(1);
    expect(String(log.mock.calls[0][0])).toContain("SMTP_PASS, MAIL_TO");
    // Keine personenbezogenen Daten im Serverlog.
    expect(String(log.mock.calls[0][0])).not.toContain("erika@example.org");
  });

  it("antwortet mit 503, wenn MAIL_FROM nicht SMTP_USER entspricht", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    setzeSmtp();
    vi.stubEnv("MAIL_FROM", "andere@example.org");
    const antwort = await POST(anfrage(gueltig));
    expect(antwort.status).toBe(503);
    expect(sendMail).not.toHaveBeenCalled();
    expect(String(log.mock.calls[0][0])).toContain("MAIL_FROM");
  });

  it("schreibt die Mail in der Entwicklung in die Konsole, wenn Variablen fehlen", async () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    vi.stubEnv("NODE_ENV", "development");
    const antwort = await POST(anfrage(gueltig));
    expect(antwort.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
    expect(String(info.mock.calls[0][0])).toContain(
      "Neue Anfrage Erstgespräch: Erika Beispiel",
    );
  });

  it("antwortet mit 502, wenn der SMTP-Server ablehnt", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    setzeSmtp();
    sendMail.mockRejectedValueOnce(new Error("535 Authentication failed"));
    const antwort = await POST(anfrage(gueltig));
    expect(antwort.status).toBe(502);
    expect(String(log.mock.calls[0][0])).toContain("535");
  });

  it("antwortet ab der sechsten Anfrage je IP und Stunde mit 429", async () => {
    setzeSmtp();
    for (let nummer = 1; nummer <= MAX_ANFRAGEN; nummer += 1) {
      const antwort = await POST(anfrage(gueltig, "198.51.100.7"));
      expect(antwort.status, `Anfrage ${nummer}`).toBe(200);
    }
    const zuViel = await POST(anfrage(gueltig, "198.51.100.7"));
    expect(zuViel.status).toBe(429);
    expect(await zuViel.json()).toEqual({
      ok: false,
      fehler: "zu_viele_anfragen",
    });
    expect(sendMail).toHaveBeenCalledTimes(MAX_ANFRAGEN);

    // Eine andere IP ist nicht betroffen.
    const andere = await POST(anfrage(gueltig, "198.51.100.8"));
    expect(andere.status).toBe(200);
  });
});
