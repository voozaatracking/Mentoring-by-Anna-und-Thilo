/*
 * Rate-Limit im Arbeitsspeicher: 5 Anfragen je IP und Stunde.
 *
 * Grenze: Der Speicher gilt je laufender Serverinstanz. Bei Vercel können
 * mehrere Instanzen parallel laufen, und ein Neustart leert den Speicher.
 * Das Limit bremst einfache Wiederholungen, ist aber kein harter Schutz.
 */

export const MAX_ANFRAGEN = 5;
export const FENSTER_MS = 60 * 60 * 1000;

const speicher = new Map<string, number[]>();

/** Zählt die Anfrage und meldet, ob sie noch innerhalb des Limits liegt. */
export function innerhalbLimit(
  schluessel: string,
  jetzt: number = Date.now(),
): boolean {
  const grenze = jetzt - FENSTER_MS;
  const zeiten = (speicher.get(schluessel) ?? []).filter((zeit) => zeit > grenze);
  if (zeiten.length >= MAX_ANFRAGEN) {
    speicher.set(schluessel, zeiten);
    return false;
  }
  zeiten.push(jetzt);
  speicher.set(schluessel, zeiten);
  if (speicher.size > 5000) raeumeAuf(grenze);
  return true;
}

function raeumeAuf(grenze: number) {
  for (const [schluessel, zeiten] of speicher) {
    if (zeiten.every((zeit) => zeit <= grenze)) speicher.delete(schluessel);
  }
}

/** Nur für Tests: leert den Speicher. */
export function setzeRateLimitZurueck() {
  speicher.clear();
}

/** IP-Adresse des Aufrufers aus den Headern des Proxys. */
export function clientIp(request: Request): string {
  const echt = request.headers.get("x-real-ip")?.trim();
  if (echt) return echt;
  const weitergeleitet = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  return weitergeleitet || "unbekannt";
}
