/*
 * Bewertungslogik des Selbsttests als reine Funktionen.
 * Je Frage gibt es 2 (Ja), 1 (Noch unsicher) oder 0 (Nein) Punkte.
 */

export type Stufe = "gut" | "offen" | "nochNicht";

export const PUNKTE_JA = 2;

/** Untergrenzen der Stufen bei sechs Fragen (maximal 12 Punkte). */
export const SCHWELLE_GUT = 10;
export const SCHWELLE_OFFEN = 6;

export function summe(antworten: readonly number[]): number {
  return antworten.reduce((gesamt, punkte) => gesamt + punkte, 0);
}

/** 10 bis 12: gut. 6 bis 9: offen. 0 bis 5: noch nicht. */
export function stufeFuerSumme(punkte: number): Stufe {
  if (punkte >= SCHWELLE_GUT) return "gut";
  if (punkte >= SCHWELLE_OFFEN) return "offen";
  return "nochNicht";
}

/** Positionen aller Fragen, die nicht mit Ja beantwortet wurden. */
export function offeneFragen(antworten: readonly number[]): number[] {
  return antworten.flatMap((punkte, index) =>
    punkte < PUNKTE_JA ? [index] : [],
  );
}

export type Bewertung = {
  summe: number;
  stufe: Stufe;
  offen: number[];
};

export function bewerte(antworten: readonly number[]): Bewertung {
  const gesamt = summe(antworten);
  return {
    summe: gesamt,
    stufe: stufeFuerSumme(gesamt),
    offen: offeneFragen(antworten),
  };
}
