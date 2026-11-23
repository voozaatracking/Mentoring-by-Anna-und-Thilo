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

    // Einzige Ausnahme: die Faustformel zur Einrichtung in den häufigen
    // Fragen. Sie ist kein Preis des Mentorings. Erlaubt ist genau dieser
    // Wortlaut an genau dieser Stelle.
    const ausnahmeFrage = "Was kostet die Einrichtung einer Wohnung?";
    const ausnahmeText = "140 bis 180 Euro je Quadratmeter";
    const index = inhalt.fragen.eintraege.findIndex(
      (eintrag) => eintrag.frage === ausnahmeFrage,
    );
    expect(index).toBeGreaterThanOrEqual(0);
    const ausnahmePfad = `site.fragen.eintraege[${index}].antwort`;
    expect(inhalt.fragen.eintraege[index].antwort).toContain(ausnahmeText);

    const treffer = texte
      .map(([pfad, text]): [string, string] => [
        pfad,
        // replace ersetzt nur das erste Vorkommen: Ein zweiter Betrag in
        // derselben Antwort lässt den Test scheitern.
        pfad === ausnahmePfad ? text.replace(ausnahmeText, "") : text,
      ])
      .filter(([, text]) => preis.some((muster) => muster.test(text)));
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

  it("nennen die Partner nicht in der Liste Enthalten", () => {
    // Entscheidung: Die Seite sagt, dass es Calls mit den Partnern gibt.
    // Sie sagt nicht, ob diese enthalten sind.
    const treffer = inhalt.paket.enthalten.punkte.filter((punkt) =>
      /partner/i.test(punkt),
    );
    expect(treffer).toEqual([]);
    const enthalten = texte.filter(([, text]) =>
      /Partner[^.]*\b(enthalten|inklusive|inbegriffen|Teil des Mentorings)\b/i.test(text),
    );
    expect(enthalten).toEqual([]);
  });

  it("enthalten das Wort Architekt nicht", () => {
    // Entscheidung: Das Wort erscheint nicht auf der Seite. Geprüft werden
    // alle Texte und zusätzlich die ganze Datei samt Kommentaren.
    const treffer = texte.filter(([, text]) => /architekt/i.test(text));
    expect(treffer).toEqual([]);
    const zeilen = quelltext
      .split("\n")
      .map((zeile, index) => `${index + 1}: ${zeile}`)
      .filter((zeile) => /architekt/i.test(zeile));
    expect(zeilen).toEqual([]);
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

  it("nennen die Zahlen mit Stand November 2026", () => {
    expect(inhalt.STAND).toMatchObject({ wohnungen: 29, betten: 145, standorte: 6 });
    expect(inhalt.einstieg.text).toBe(
      "Wir begleiten dich persönlich beim Aufbau deines Business. Unser Schwerpunkt ist die Kurzzeitvermietung. Damit sind wir selbst auf 29 Ferienwohnungen gewachsen.",
    );
    expect(inhalt.einstieg.zahlen).toEqual([
      { wert: 29, label: "Ferienwohnungen" },
      { vorsatz: "rund", wert: 145, label: "Betten" },
      { wert: 6, label: "Standorte" },
    ]);
    expect(inhalt.zahlen.kennzahlen).toEqual([
      { wert: 29, label: "Ferienwohnungen" },
      { vorsatz: "rund", wert: 145, label: "Betten" },
      { wert: 6, label: "Standorte" },
      { vorsatz: "über", wert: 100, label: "Besichtigungen bis zur ersten Wohnung" },
    ]);
    // Der sechste Standort wird nicht benannt: Die Orte stehen mit "unter anderem".
    expect(inhalt.ueberUns.stationen[3].text).toBe(
      "29 Ferienwohnungen und rund 145 Betten, unter anderem in Lüneburg, Winsen (Luhe), Rosengarten, Celle und Amelinghausen. Mit einem festen Team und klaren Abläufen.",
    );
    // Die Geschichte bleibt: Gästezimmer, erste Wohnung Anfang 2024.
    expect(inhalt.ueberUns.stationen[0].titel).toBe("Ein Gästezimmer");
    expect(inhalt.ueberUns.stationen[2].text).toContain("Anfang 2024");
    // Die alten Zahlen kommen nirgends mehr vor.
    const alt = texte.filter(([, text]) =>
      /\b24 Ferienwohnungen|\b125 Betten|\b5 Standorte|fünf Standorte/i.test(text),
    );
    expect(alt).toEqual([]);
  });

  it("beantworten die Frage zur Zeit ohne Zahl", () => {
    const fragen = inhalt.fragen.eintraege;
    const index = fragen.findIndex(
      (eintrag) => eintrag.frage === "Wie viel Zeit muss ich einplanen?",
    );
    // Die Frage bleibt an dritter Stelle.
    expect(index).toBe(2);
    expect(fragen[index].antwort).toBe(
      "Das planen wir individuell mit dir. Wir schauen auf deinen Stand, dein Ziel und deine Woche. Daraus ergibt sich ein Tempo, das in deinen Alltag passt.",
    );
    expect(fragen[index].antwort).not.toMatch(/\d/);
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

  it("formulieren am Kästchen zum Datenschutz keine Einwilligung", () => {
    const { vor, link, nach } = inhalt.formular.zustimmung;
    expect(`${vor}${link.label}${nach}`).toBe(
      "Ich habe die Datenschutzerklärung gelesen.",
    );
    expect(link.href).toBe("/datenschutz");
    const formulartexte: [string, string][] = [];
    alleTexte(inhalt.formular, "formular", formulartexte);
    const treffer = formulartexte.filter(([, text]) =>
      /einverstanden|einwillig|stimme .* zu\b/i.test(text),
    );
    expect(treffer).toEqual([]);
  });

  it("enthalten keine Prüfhinweise und keinen Entwurfshinweis mehr", () => {
    const treffer = texte.filter(([, text]) => /\[PRÜFEN|Entwurf/i.test(text));
    expect(treffer).toEqual([]);
    expect(Object.keys(inhalt.impressum)).not.toContain("entwurfTitel");
    expect(Object.keys(inhalt.datenschutz)).not.toContain("entwurfTitel");
  });
});
