import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import * as inhalt from "@/content/site";
import { ZIELNAMEN } from "@/scripts/bilder.mjs";

const quelltext = readFileSync(
  path.resolve(__dirname, "../content/site.ts"),
  "utf8",
);

/** Sammelt alle Zeichenketten aus den exportierten Inhalten. */
function alleTexte(wert: unknown, pfad: string, ziel: [string, string][]) {
  if (typeof wert === "string") ziel.push([pfad, wert]);
  else if (Array.isArray(wert)) {
    wert.forEach((eintrag, index) => alleTexte(eintrag, `${pfad}[${index}]`, ziel));
  } else if (typeof wert === "object" && wert !== null) {
    for (const [name, eintrag] of Object.entries(wert)) {
      alleTexte(eintrag, `${pfad}.${name}`, ziel);
    }
  }
}

const texte: [string, string][] = [];
alleTexte(inhalt, "site", texte);

describe("Inhalte in content/site.ts", () => {
  it("enthalten keine Gedankenstriche", () => {
    // Halbgeviertstrich, Geviertstrich, Ziffernstrich, Querstrich, Minuszeichen
    const striche = /[‒–—―−]/;
    const zeilen = quelltext
      .split("\n")
      .map((zeile, index) => `${index + 1}: ${zeile}`)
      .filter((zeile) => striche.test(zeile));
    expect(zeilen).toEqual([]);
  });

  it("nutzen keinen Bindestrich als Gedankenstrich", () => {
    const treffer = texte.filter(([, text]) => / - /.test(text));
    expect(treffer).toEqual([]);
  });

  it("nutzen im Text nur die Anführungszeichen „ und “", () => {
    const treffer = texte.filter(([, text]) => /["»«”]/.test(text));
    expect(treffer).toEqual([]);
  });

  it("enthalten keine Emojis", () => {
    const treffer = texte.filter(([, text]) =>
      /\p{Extended_Pictographic}/u.test(text),
    );
    expect(treffer).toEqual([]);
  });

  it("markieren jeden Platzhalter mit einem Hinweis", () => {
    const platzhalter: inhalt.Platzhalter[] = [];
    const sammle = (wert: unknown) => {
      if (typeof wert !== "object" || wert === null) return;
      if (inhalt.istPlatzhalter(wert)) platzhalter.push(wert);
      for (const eintrag of Object.values(wert)) sammle(eintrag);
    };
    sammle(inhalt);
    // 4 Einträge im Ablauf, Format der Termine, Erfahrungswert, 3 Stimmen,
    // weitere Bestandteile, Preis, Rahmen des Erstgesprächs
    expect(platzhalter).toHaveLength(12);
    for (const eintrag of platzhalter) {
      expect(eintrag.hinweis.trim().length).toBeGreaterThan(5);
    }
  });

  it("setzen die Schalter für den ersten Wurf", () => {
    expect(inhalt.SHOW_PLACEHOLDER_MARKS).toBe(true);
    expect(inhalt.ALLOW_INDEXING).toBe(false);
    expect(inhalt.CONTACT_EMAIL).toBe("info@hygge-homes.de");
  });

  it("verweisen nur auf Bilddateien, die das Bildskript kennt", () => {
    const dateien = Object.values(inhalt.bilder).map((bild) => bild.datei);
    expect(dateien.sort()).toEqual([...ZIELNAMEN].sort());
    for (const bild of Object.values(inhalt.bilder)) {
      expect(bild.alt.length).toBeGreaterThan(10);
    }
  });

  it("markieren offene Punkte der Rechtsseiten mit [PRÜFEN: ...]", () => {
    const rechtstexte: [string, string][] = [];
    alleTexte(inhalt.impressum, "impressum", rechtstexte);
    alleTexte(inhalt.datenschutz, "datenschutz", rechtstexte);
    const markierungen = rechtstexte.filter(([, text]) =>
      text.includes("[PRÜFEN:"),
    );
    expect(markierungen.length).toBeGreaterThanOrEqual(10);
    expect(inhalt.impressum.entwurfTitel).toBe("Entwurf");
    expect(inhalt.datenschutz.entwurfTitel).toBe("Entwurf");
  });
});
