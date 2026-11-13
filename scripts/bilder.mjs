/*
 * Bildregister für die Seite.
 *
 *   node scripts/bilder.mjs               schreibt lib/bilder.generated.ts
 *   node scripts/bilder.mjs --umbenennen  benennt Originaldateien per git mv um
 *
 * Die Seite bindet Bilder über statische Importe ein. Ein statischer Import
 * einer fehlenden Datei bricht den Build. Deshalb erzeugt dieses Skript die
 * Importe nur für Dateien, die in assets/images/ wirklich vorhanden sind.
 * Für alle anderen zeigt die Seite die Fläche „Bild folgt“.
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const wurzel = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bildOrdner = path.join(wurzel, "assets", "images");
const zielDatei = path.join(wurzel, "lib", "bilder.generated.ts");

/** Originalname -> Zielname. Die Zielnamen stehen auch in content/site.ts. */
export const ZUORDNUNG = {
  "2026_09_10_Hygge_Homes-67.jpg": "hero-heide.jpg",
  "2026_09_10_Hygge_Homes-10.jpg": "anna-thilo-bank.jpg",
  "2026_09_10_Hygge_Homes-84.jpg": "anna-portrait.jpg",
  "2026_09_10_Hygge_Homes-100.jpg": "thilo-portrait.jpg",
  "2026_09_10_Hygge_Homes-50.jpg": "anna-thilo-laptop.jpg",
  "2026_09_10_Hygge_Homes-77.jpg": "anna-thilo-weg.jpg",
  "2026_09_10_Hygge_Homes-57.jpg": "hygge-homes-ruecken.jpg",
  "2026_09_10_Hygge_Homes-37.jpg": "anna-thilo-erstgespraech.jpg",
  "gamleby_slider01.jpg": "wohnung-schlafen.jpg",
  "celle_1og_homeslider-600x600.png": "wohnung-wohnen.png",
  "scandi-sunset_card_slide_01.png": "wohnung-essen.png",
  "rosengarten_titel_quadratisch.jpg": "wohnung-studio.jpg",
};

export const ZIELNAMEN = Object.values(ZUORDNUNG);

/** Inhalt von lib/bilder.generated.ts für die vorhandenen Dateien. */
export function erzeugeRegister(vorhandeneDateien) {
  const dateien = ZIELNAMEN.filter((name) => vorhandeneDateien.includes(name));
  const importe = dateien.map(
    (name, index) => `import bild${index} from "@/assets/images/${name}";`,
  );
  const eintraege = dateien.map(
    (name, index) => `  ${JSON.stringify(name)}: bild${index},`,
  );
  return [
    "/*",
    " * Automatisch erzeugt von scripts/bilder.mjs. Nicht von Hand ändern.",
    " * Neu erzeugen mit: npm run bilder",
    " */",
    'import type { StaticImageData } from "next/image";',
    ...importe,
    "",
    "/** Vorhandene Bilder nach Zielname. Fehlende Bilder sind nicht enthalten. */",
    "export const bildDateien: Record<string, StaticImageData | undefined> = {",
    ...eintraege,
    "};",
    "",
  ].join("\n");
}

function schreibeRegister() {
  const vorhanden = ZIELNAMEN.filter((name) =>
    existsSync(path.join(bildOrdner, name)),
  );
  const inhalt = erzeugeRegister(vorhanden);
  const bisher = existsSync(zielDatei) ? readFileSync(zielDatei, "utf8") : "";
  if (bisher !== inhalt) writeFileSync(zielDatei, inhalt);
  const fehlend = ZIELNAMEN.filter((name) => !vorhanden.includes(name));
  console.log(
    `[bilder] ${vorhanden.length} von ${ZIELNAMEN.length} Bildern vorhanden.`,
  );
  if (fehlend.length > 0) {
    console.log(`[bilder] Es fehlen: ${fehlend.join(", ")}`);
  }
}

function benenneUm() {
  let anzahl = 0;
  for (const [original, ziel] of Object.entries(ZUORDNUNG)) {
    const von = path.join(bildOrdner, original);
    const nach = path.join(bildOrdner, ziel);
    if (!existsSync(von)) continue;
    if (existsSync(nach)) {
      console.log(`[bilder] Übersprungen, Ziel existiert schon: ${ziel}`);
      continue;
    }
    execFileSync("git", ["mv", von, nach], { cwd: wurzel, stdio: "inherit" });
    console.log(`[bilder] ${original} -> ${ziel}`);
    anzahl += 1;
  }
  console.log(`[bilder] ${anzahl} Dateien umbenannt.`);
}

const direktGestartet =
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (direktGestartet) {
  if (process.argv.includes("--umbenennen")) benenneUm();
  schreibeRegister();
}
