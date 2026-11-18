/*
 * Validierung der Anfrage als reine Funktionen. Die Datei enthält keine
 * UI-Texte: Sie liefert Fehlercodes, die das Formular in Texte übersetzt.
 * Sie läuft im Browser und auf dem Server.
 */

export const STAND_WERTE = [
  "informieren",
  "suche",
  "aussicht",
  "vermiete",
] as const;

export type Stand = (typeof STAND_WERTE)[number];

export const GRENZEN = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  telefonMax: 40,
  nachrichtMax: 2000,
} as const;

export type Feld =
  | "name"
  | "email"
  | "telefon"
  | "stand"
  | "nachricht"
  | "zustimmung";

export type Fehlercode = "pflicht" | "zu_lang" | "format" | "ungueltig";

export type Anfrage = {
  name: string;
  email: string;
  telefon: string;
  stand: Stand;
  nachricht: string;
  zustimmung: true;
};

export type FeldFehler = Partial<Record<Feld, Fehlercode>>;

export type Pruefergebnis =
  | { ok: true; anfrage: Anfrage }
  | { ok: false; fehler: FeldFehler };

function istObjekt(wert: unknown): wert is Record<string, unknown> {
  return typeof wert === "object" && wert !== null && !Array.isArray(wert);
}

/** Entfernt Steuerzeichen und Zeilenumbrüche aus einzeiligen Feldern. */
export function einzeilig(wert: unknown): string {
  if (typeof wert !== "string") return "";
  return wert
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Behält Zeilenumbrüche, entfernt andere Steuerzeichen. */
export function mehrzeilig(wert: unknown): string {
  if (typeof wert !== "string") return "";
  return wert
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "")
    .trim();
}

export function istEmail(wert: string): boolean {
  if (wert.length === 0 || wert.length > GRENZEN.emailMax) return false;
  return /^[^\s@<>(),;:"]+@[^\s@<>(),;:"]+\.[^\s@<>(),;:".]{2,}$/.test(wert);
}

export function istTelefon(wert: string): boolean {
  if (!/^[0-9+()/\s.-]+$/.test(wert)) return false;
  return wert.replace(/\D/g, "").length >= 5;
}

export function istStand(wert: unknown): wert is Stand {
  return (
    typeof wert === "string" && (STAND_WERTE as readonly string[]).includes(wert)
  );
}

/** Honeypot: Das versteckte Feld website muss leer bleiben. */
export function istHoneypotGefuellt(eingabe: unknown): boolean {
  if (!istObjekt(eingabe)) return false;
  const wert = eingabe.website;
  return typeof wert === "string" && wert.trim().length > 0;
}

export function pruefeAnfrage(eingabe: unknown): Pruefergebnis {
  const daten = istObjekt(eingabe) ? eingabe : {};
  const fehler: FeldFehler = {};

  const name = einzeilig(daten.name);
  if (name.length < GRENZEN.nameMin) fehler.name = "pflicht";
  else if (name.length > GRENZEN.nameMax) fehler.name = "zu_lang";

  const email = einzeilig(daten.email);
  if (email.length === 0) fehler.email = "pflicht";
  else if (email.length > GRENZEN.emailMax) fehler.email = "zu_lang";
  else if (!istEmail(email)) fehler.email = "format";

  const telefon = einzeilig(daten.telefon);
  if (telefon.length > GRENZEN.telefonMax) fehler.telefon = "zu_lang";
  else if (telefon.length > 0 && !istTelefon(telefon)) fehler.telefon = "format";

  const stand = daten.stand;
  if (stand === undefined || stand === null || stand === "") {
    fehler.stand = "pflicht";
  } else if (!istStand(stand)) {
    fehler.stand = "ungueltig";
  }

  const nachricht = mehrzeilig(daten.nachricht);
  if (nachricht.length > GRENZEN.nachrichtMax) fehler.nachricht = "zu_lang";

  if (daten.zustimmung !== true) fehler.zustimmung = "pflicht";

  if (Object.keys(fehler).length > 0 || !istStand(stand)) {
    return { ok: false, fehler };
  }

  return {
    ok: true,
    anfrage: { name, email, telefon, stand, nachricht, zustimmung: true },
  };
}
