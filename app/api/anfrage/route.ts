/*
 * POST /api/anfrage: nimmt das Anfrageformular entgegen und versendet eine
 * E-Mail.
 *
 * Laufzeit: Node.js. Bei aktivem cacheComponents ist das die einzige
 * Laufzeit, ein Export "runtime" ist dort laut Next-Dokumentation nicht
 * erlaubt und bricht den Build.
 *
 * Antworten:
 *   200  angenommen (auch beim Honeypot, dann ohne Versand)
 *   400  Eingabe ungültig, mit Fehlercodes je Feld
 *   413  Anfrage zu groß
 *   429  mehr als 5 Anfragen je IP und Stunde
 *   502  SMTP-Server hat den Versand abgelehnt
 *   503  Umgebungsvariablen für den Versand fehlen
 */

import { istHoneypotGefuellt, pruefeAnfrage } from "@/lib/anfrage";
import {
  baueMail,
  leseMailKonfiguration,
  versendeAnfrage,
} from "@/lib/mail";
import { clientIp, innerhalbLimit } from "@/lib/rate-limit";

const MAX_ZEICHEN = 20_000;

function antwort(status: number, daten: Record<string, unknown>) {
  return Response.json(daten, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  if (!innerhalbLimit(clientIp(request))) {
    return antwort(429, { ok: false, fehler: "zu_viele_anfragen" });
  }

  let eingabe: unknown;
  try {
    const roh = await request.text();
    if (roh.length > MAX_ZEICHEN) {
      return antwort(413, { ok: false, fehler: "zu_gross" });
    }
    eingabe = JSON.parse(roh);
  } catch {
    return antwort(400, { ok: false, fehler: "ungueltig", felder: {} });
  }

  // Honeypot: Bots erhalten eine unauffällige Erfolgsantwort, ohne Versand.
  if (istHoneypotGefuellt(eingabe)) {
    return antwort(200, { ok: true });
  }

  const ergebnis = pruefeAnfrage(eingabe);
  if (!ergebnis.ok) {
    return antwort(400, {
      ok: false,
      fehler: "validierung",
      felder: ergebnis.fehler,
    });
  }

  const inhalt = baueMail(ergebnis.anfrage, new Date());
  const konfiguration = leseMailKonfiguration(process.env);

  if (!konfiguration.ok) {
    if (process.env.NODE_ENV === "development") {
      // In der Entwicklung ersetzt die Konsole den Mailversand.
      console.info(
        `[anfrage] Mailversand nicht konfiguriert (${konfiguration.grund}). Die Mail erscheint nur hier:\n` +
          `Betreff: ${inhalt.betreff}\nReply-To: ${ergebnis.anfrage.email}\n\n${inhalt.text}`,
      );
      return antwort(200, { ok: true });
    }
    console.error(
      `[anfrage] Mailversand nicht konfiguriert. ${konfiguration.grund}`,
    );
    return antwort(503, { ok: false, fehler: "nicht_konfiguriert" });
  }

  try {
    await versendeAnfrage(konfiguration.konfiguration, ergebnis.anfrage, inhalt);
  } catch (fehler) {
    const meldung = fehler instanceof Error ? fehler.message : String(fehler);
    console.error(`[anfrage] Versand fehlgeschlagen: ${meldung}`);
    return antwort(502, { ok: false, fehler: "versand" });
  }

  return antwort(200, { ok: true });
}
