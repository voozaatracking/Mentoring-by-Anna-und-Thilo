/*
 * Basisadresse der Seite für absolute Verweise in den Metadaten.
 * Reihenfolge: SITE_URL, Produktionsadresse von Vercel, Vorschauadresse
 * von Vercel, lokale Entwicklung.
 */
export function siteUrl(env: NodeJS.ProcessEnv = process.env): URL {
  const kandidaten = [
    env.SITE_URL,
    env.VERCEL_PROJECT_PRODUCTION_URL,
    env.VERCEL_URL,
  ];
  for (const kandidat of kandidaten) {
    const wert = kandidat?.trim();
    if (!wert) continue;
    try {
      return new URL(wert.startsWith("http") ? wert : `https://${wert}`);
    } catch {
      // Ungültiger Wert: nächsten Kandidaten versuchen.
    }
  }
  return new URL("http://localhost:3000");
}
