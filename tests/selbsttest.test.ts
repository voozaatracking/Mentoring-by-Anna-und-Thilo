import { describe, expect, it } from "vitest";
import { selbsttest } from "@/content/site";
import {
  bewerte,
  offeneFragen,
  stufeFuerSumme,
  summe,
} from "@/lib/selbsttest";

describe("Bewertungslogik des Selbsttests", () => {
  it("ordnet die Summen an den Grenzen 5, 6, 9 und 10 richtig zu", () => {
    expect(stufeFuerSumme(5)).toBe("nochNicht");
    expect(stufeFuerSumme(6)).toBe("offen");
    expect(stufeFuerSumme(9)).toBe("offen");
    expect(stufeFuerSumme(10)).toBe("gut");
  });

  it("deckt den ganzen Bereich von 0 bis 12 ab", () => {
    const stufen = Array.from({ length: 13 }, (_, punkte) =>
      stufeFuerSumme(punkte),
    );
    expect(stufen).toEqual([
      "nochNicht",
      "nochNicht",
      "nochNicht",
      "nochNicht",
      "nochNicht",
      "nochNicht",
      "offen",
      "offen",
      "offen",
      "offen",
      "gut",
      "gut",
      "gut",
    ]);
  });

  it("summiert die Punkte", () => {
    expect(summe([])).toBe(0);
    expect(summe([2, 1, 0, 2, 1, 0])).toBe(6);
  });

  it("nennt alle Fragen, die nicht mit Ja beantwortet wurden", () => {
    expect(offeneFragen([2, 2, 2, 2, 2, 2])).toEqual([]);
    expect(offeneFragen([2, 1, 0, 2, 1, 2])).toEqual([1, 2, 4]);
  });

  it("bewertet ganze Antwortreihen", () => {
    expect(bewerte([2, 2, 2, 2, 2, 2])).toEqual({
      summe: 12,
      stufe: "gut",
      offen: [],
    });
    expect(bewerte([2, 2, 2, 2, 1, 1])).toEqual({
      summe: 10,
      stufe: "gut",
      offen: [4, 5],
    });
    expect(bewerte([2, 2, 2, 1, 1, 1]).stufe).toBe("offen");
    expect(bewerte([1, 1, 1, 1, 1, 1]).stufe).toBe("offen");
    expect(bewerte([1, 1, 1, 1, 1, 0]).stufe).toBe("nochNicht");
    expect(bewerte([0, 0, 0, 0, 0, 0])).toEqual({
      summe: 0,
      stufe: "nochNicht",
      offen: [0, 1, 2, 3, 4, 5],
    });
  });

  it("passt zu den Inhalten: sechs Fragen, Antworten mit 2, 1 und 0 Punkten", () => {
    expect(selbsttest.fragen).toHaveLength(6);
    expect(selbsttest.antworten.map((antwort) => antwort.punkte)).toEqual([
      2, 1, 0,
    ]);
    expect(Object.keys(selbsttest.ergebnisse).sort()).toEqual([
      "gut",
      "nochNicht",
      "offen",
    ]);
  });
});
