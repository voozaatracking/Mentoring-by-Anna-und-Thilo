import { beforeEach, describe, expect, it } from "vitest";
import {
  FENSTER_MS,
  MAX_ANFRAGEN,
  clientIp,
  innerhalbLimit,
  setzeRateLimitZurueck,
} from "@/lib/rate-limit";

beforeEach(() => setzeRateLimitZurueck());

describe("Rate-Limit", () => {
  it("lässt fünf Anfragen je Stunde zu und gibt danach wieder frei", () => {
    const start = 1_000_000;
    for (let nummer = 0; nummer < MAX_ANFRAGEN; nummer += 1) {
      expect(innerhalbLimit("ip", start + nummer)).toBe(true);
    }
    expect(innerhalbLimit("ip", start + 10)).toBe(false);
    expect(innerhalbLimit("ip", start + FENSTER_MS - 1)).toBe(false);
    // Nach einer Stunde ist die erste Anfrage aus dem Fenster gefallen.
    expect(innerhalbLimit("ip", start + FENSTER_MS)).toBe(true);
  });

  it("liest die IP aus den Headern des Proxys", () => {
    const mit = (headers: Record<string, string>) =>
      clientIp(new Request("http://localhost/", { headers }));
    expect(mit({ "x-real-ip": "203.0.113.9" })).toBe("203.0.113.9");
    expect(mit({ "x-forwarded-for": "203.0.113.5, 10.0.0.1" })).toBe(
      "203.0.113.5",
    );
    expect(mit({})).toBe("unbekannt");
  });
});
