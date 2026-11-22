import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { datenschutz, impressum, type RechtsBlock, type RechtsSeite } from "@/content/site";

/*
 * Die finalen, freigegebenen Rechtstexte liegen unter docs/rechtstexte/.
 * Die Seiten /impressum und /datenschutz zeigen die Inhalte aus
 * content/site.ts. Dieser Test baut aus den Inhalten wieder das Markdown
 * und vergleicht es Zeichen für Zeichen mit der freigegebenen Datei.
 */

function datei(name: string): string {
  return readFileSync(
    path.resolve(__dirname, "../docs/rechtstexte", name),
    "utf8",
  );
}

function blockAlsMarkdown(block: RechtsBlock): string {
  const [erste, ...weitere] = block.zeilen;
  const anfang = block.vorspann ? `**${block.vorspann}** ${erste}` : erste;
  return [anfang, ...weitere].join("\n");
}

function alsMarkdown(seite: RechtsSeite): string {
  const teile = [
    `# ${seite.titel}`,
    ...seite.vorab.map(blockAlsMarkdown),
    ...seite.abschnitte.flatMap((abschnitt) => [
      `## ${abschnitt.titel}`,
      ...abschnitt.bloecke.map(blockAlsMarkdown),
    ]),
  ];
  return `${teile.join("\n\n")}\n`;
}

describe("Finale Rechtstexte", () => {
  it("Impressum stimmt Zeichen für Zeichen mit docs/rechtstexte/impressum.md überein", () => {
    expect(alsMarkdown(impressum)).toBe(datei("impressum.md"));
  });

  it("Datenschutz stimmt Zeichen für Zeichen mit docs/rechtstexte/datenschutz.md überein", () => {
    expect(alsMarkdown(datenschutz)).toBe(datei("datenschutz.md"));
  });

  it("die freigegebenen Dateien enthalten keine Prüfhinweise", () => {
    for (const name of ["impressum.md", "datenschutz.md"]) {
      expect(datei(name)).not.toContain("[PRÜFEN");
    }
  });

  it("jeder Block hat mindestens eine Zeile und keine leeren Zeilen", () => {
    for (const seite of [impressum, datenschutz]) {
      const bloecke = [
        ...seite.vorab,
        ...seite.abschnitte.flatMap((abschnitt) => abschnitt.bloecke),
      ];
      for (const block of bloecke) {
        expect(block.zeilen.length).toBeGreaterThan(0);
        expect(block.zeilen.every((zeile) => zeile.trim() === zeile && zeile !== "")).toBe(true);
      }
    }
  });
});
