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

  it("enthalten keinen Platzhalter mehr", () => {
    const platzhalter: inhalt.Platzhalter[] = [];
    const sammle = (wert: unknown) => {
      if (typeof wert !== "object" || wert === null) return;
      if (inhalt.istPlatzhalter(wert)) platzhalter.push(wert);
      for (const eintrag of Object.values(wert)) sammle(eintrag);
    };
    sammle(inhalt);
    expect(platzhalter).toEqual([]);
  });

  it("nennen eine feste Dauer nur im Beispielpaket", () => {
    // Entscheidung: Das Mentoring hat keine feste Dauer. Angaben wie
    // "drei Monate" oder "zwölf Wochen" stehen nur im Abschnitt paket.
    const dauer = [
      /\b(drei|3|zwölf|12)[\s-]*(Monat|Woche)/i,
      /dreimonat/i,
      /\bMonat \d/i,
      /Stunden[^.]*\b(im|pro|je) Monat/i,
      /\b\d+ Tage\b/i,
    ];
    const treffer = texte.filter(
      ([pfad, text]) =>
        !pfad.startsWith("site.paket") &&
        dauer.some((muster) => muster.test(text)),
    );
    expect(treffer).toEqual([]);
  });

  it("nennen keinen Preis, keinen Euro-Betrag, keinen Stundensatz und keinen Rabatt", () => {
    // Entscheidung: Auf der Seite steht niemals ein Preis.
    const preis = [
      /\d[\d.,]*\s*(€|Euro\b|EUR\b)/i,
      /€/,
      /Stundensatz/i,
      /Rabatt/i,
      /\bStunden\b[^.]*\b(im|pro|je) Monat/i,
    ];
    const treffer = texte.filter(([, text]) =>
      preis.some((muster) => muster.test(text)),
    );
    expect(treffer).toEqual([]);
  });

  it("verlinken Telefon und Instagram in der Fußzeile richtig", () => {
    const [telefon, instagram] = inhalt.fusszeile.kontakt;
    expect(telefon.label).toBe("+49 4171 60 888 20");
    // Im href steht die Nummer ohne Leerzeichen.
    expect(telefon.href).toBe("tel:+4941716088820");
    expect(instagram.label).toBe("@hyggehomes.official");
    expect(instagram.href).toBe("https://www.instagram.com/hyggehomes.official/");
    expect(instagram.rel).toBe("noopener noreferrer");
  });

  it("erwähnen keine Gruppencalls", () => {
    // Entscheidung: Das Mentoring läuft über persönliche 1:1-Calls.
    // Eine WhatsApp-Gruppe wäre davon nicht betroffen.
    const treffer = texte.filter(
      ([, text]) =>
        /Gruppencall/i.test(text) ||
        /\bGruppen?\b/i.test(text.replace(/WhatsApp-Gruppe/gi, "")),
    );
    expect(treffer).toEqual([]);
    expect(inhalt.paket.enthalten.punkte).toContain("Persönliche 1:1-Calls");
    expect(inhalt.paket.enthalten.punkte).toHaveLength(5);
  });

  it("beantworten Dauer und Kosten des Mentorings ohne Zahl", () => {
    const fragen = inhalt.fragen.eintraege;
    expect(fragen).toHaveLength(9);
    expect(fragen.slice(-2)).toEqual([
      {
        frage: "Wie lange dauert das Mentoring?",
        antwort:
          "Das stimmen wir individuell ab. Es hängt davon ab, wo du gerade stehst und was du erreichen willst.",
      },
      {
        frage: "Was kostet das Mentoring?",
        antwort:
          "Das hängt vom Umfang ab. Wir stimmen es im Erstgespräch mit dir ab. Das Erstgespräch selbst ist kostenlos.",
      },
    ]);
    // Jede Frage steht nur einmal da.
    expect(new Set(fragen.map((eintrag) => eintrag.frage)).size).toBe(9);
  });

  it("zeigen keine Teilnehmerstimmen", () => {
    // Entscheidung: Es gibt noch keine Teilnehmerstimmen.
    expect(Object.keys(inhalt.zahlen)).not.toContain("stimmen");
    const treffer = texte.filter(([, text]) => /Teilnehmerstimme|Stimmen von/i.test(text));
    expect(treffer).toEqual([]);
  });

  it("halten die Beschreibung für Suchmaschinen bei höchstens 155 Zeichen", () => {
    expect(inhalt.meta.beschreibung.length).toBeLessThanOrEqual(155);
    expect(inhalt.meta.titel).toBe(
      "Mentoring by Anna & Thilo: Ein Business, das zum Familienleben passt",
    );
  });

  it("setzen die Schalter: keine Platzhalter, keine Indexierung", () => {
    expect(inhalt.SHOW_PLACEHOLDER_MARKS).toBe(false);
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
