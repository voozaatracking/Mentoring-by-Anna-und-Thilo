/** Ersetzt Marken der Form {name} in einem Text aus content/site.ts. */
export function ersetze(
  text: string,
  werte: Record<string, string | number>,
): string {
  return text.replace(/\{(\w+)\}/g, (marke, name: string) =>
    name in werte ? String(werte[name]) : marke,
  );
}

/** Teilt einen Text an einer Marke, zum Beispiel für einen Link an der Stelle. */
export function teileAnMarke(text: string, name: string): [string, string] {
  const marke = `{${name}}`;
  const position = text.indexOf(marke);
  if (position === -1) return [text, ""];
  return [text.slice(0, position), text.slice(position + marke.length)];
}
