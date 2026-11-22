/*
 * Zentrale Inhalte der Seite. Komponenten enthalten keinen Fließtext,
 * sie lesen alles aus dieser Datei.
 *
 * Regeln für Texte:
 * - Ansprache du. Nur im Selbsttest ihr, weil die Fragen an das Paar gehen.
 * - Keine Gedankenstriche, keine Emojis, kurze Sätze.
 * - Anführungszeichen im gerenderten Text als „ und “.
 * - Lange Wörter in Überschriften erhalten ein weiches Trennzeichen (SHY).
 * - Platzhalter sind als { placeholder: true, hinweis: "..." } markiert.
 */

import type { Fehlercode, Feld, Stand } from "@/lib/anfrage";
import type { Stufe } from "@/lib/selbsttest";

/* ------------------------------------------------------------------ */
/* Schalter und Konstanten                                             */
/* ------------------------------------------------------------------ */

/** Zeigt das Etikett „Platzhalter“ an allen markierten Stellen. */
export const SHOW_PLACEHOLDER_MARKS = true;

/** Solange false, setzt die Seite robots auf noindex. */
export const ALLOW_INDEXING = false;

/** Sichtbare Ausweichadresse, falls das Formular nicht funktioniert. */
export const CONTACT_EMAIL = "info@hygge-homes.de";

export const SITE_NAME = "Mentoring by Anna & Thilo";

export const PODCAST_URL =
  "https://open.spotify.com/show/3lxmZmT0iVF92A5kc4oFx8";

export const HYGGE_HOMES_URL = "https://hygge-homes.de";

/** Weiches Trennzeichen für lange Wörter in Überschriften. */
const SHY = "­";

/* ------------------------------------------------------------------ */
/* Typen                                                               */
/* ------------------------------------------------------------------ */

export type Platzhalter = { placeholder: true; hinweis: string };

/** Vorläufiger Inhalt, der zusätzlich als Platzhalter markiert ist. */
export type Vorlaeufig<T> = T & Platzhalter;

export function istPlatzhalter(wert: unknown): wert is Platzhalter {
  return (
    typeof wert === "object" &&
    wert !== null &&
    (wert as { placeholder?: unknown }).placeholder === true
  );
}

export type Verweis = { label: string; href: string };

export type BildName =
  | "hero"
  | "bank"
  | "anna"
  | "thilo"
  | "laptop"
  | "weg"
  | "ruecken"
  | "erstgespraech"
  | "wohnungSchlafen"
  | "wohnungWohnen"
  | "wohnungEssen"
  | "wohnungStudio";

export type BildEintrag = {
  /** Zielname der Datei in assets/images/. */
  datei: string;
  alt: string;
};

export type TitelText = { titel: string; text: string };

export type Kennzahl = { vorsatz?: string; wert: number; label: string };

/* ------------------------------------------------------------------ */
/* Metadaten und allgemeine Beschriftungen                             */
/* ------------------------------------------------------------------ */

export const meta = {
  titel: "Mentoring by Anna & Thilo: Ein Business, das zum Familienleben passt",
  /* Höchstens 155 Zeichen, du-Ansprache, kein Versprechen. Ein Test prüft die Länge. */
  beschreibung:
    "Persönliche Begleitung beim Aufbau deines Business, passend zu deinem Familienleben. Unser Schwerpunkt ist die Kurzzeitvermietung.",
  impressumTitel: "Impressum | Mentoring by Anna & Thilo",
  datenschutzTitel: "Datenschutz | Mentoring by Anna & Thilo",
};

export const ui = {
  sprunglink: "Zum Inhalt springen",
  platzhalterEtikett: "Platzhalter",
  bildFolgt: "Bild folgt:",
  hauptnavigation: "Hauptnavigation",
  fussnavigation: "Rechtliches und Links",
  menue: "Menü",
  menueOeffnen: "Menü öffnen",
  menueSchliessen: "Menü schließen",
  schliessen: "Schließen",
  neuerTab: "(öffnet in neuem Tab)",
  zurStartseite: "Zur Startseite",
};

/* ------------------------------------------------------------------ */
/* Bilder                                                              */
/* ------------------------------------------------------------------ */

/* Alt-Texte beschreiben das Foto. Keine Ortsangaben. */
export const bilder: Record<BildName, BildEintrag> = {
  hero: {
    datei: "hero-heide.jpg",
    alt: "Anna und Thilo stehen Arm in Arm in der blühenden Heide und lachen sich an",
  },
  bank: {
    datei: "anna-thilo-bank.jpg",
    alt: "Anna sitzt auf einer Holzbank, Thilo steht neben ihr, beide lächeln in die Kamera",
  },
  anna: {
    datei: "anna-portrait.jpg",
    alt: "Porträt von Anna in weißer Bluse, sie lächelt in die Kamera",
  },
  thilo: {
    datei: "thilo-portrait.jpg",
    alt: "Porträt von Thilo mit Brille und hellblauem Hemd, er lächelt in die Kamera",
  },
  laptop: {
    datei: "anna-thilo-laptop.jpg",
    alt: "Anna und Thilo sitzen auf einer Bank und schauen gemeinsam auf einen Laptop mit dem Logo von Hygge Homes",
  },
  weg: {
    datei: "anna-thilo-weg.jpg",
    alt: "Anna und Thilo gehen nebeneinander einen Sandweg durch die Heide entlang",
  },
  ruecken: {
    datei: "hygge-homes-ruecken.jpg",
    alt: "Anna und Thilo von hinten in grauen Shirts mit dem Aufdruck Hygge Homes, vor ihnen blühende Heide",
  },
  erstgespraech: {
    datei: "anna-thilo-erstgespraech.jpg",
    alt: "Thilo stützt sich auf eine Banklehne, Anna steht hinter ihm, beide lächeln in die Kamera",
  },
  wohnungSchlafen: {
    datei: "wohnung-schlafen.jpg",
    alt: "Schlafzimmer mit Doppelbett, grauer Tagesdecke und Nachttischlampe",
  },
  wohnungWohnen: {
    datei: "wohnung-wohnen.png",
    alt: "Wohnbereich mit dunklem Sofa, Stehlampe und runden Beistelltischen",
  },
  wohnungEssen: {
    datei: "wohnung-essen.png",
    alt: "Gedeckter Esstisch aus Holz vor einer hellen Einbauküche",
  },
  wohnungStudio: {
    datei: "wohnung-studio.jpg",
    alt: "Studio mit Essplatz am Fenster, Bett und Holzboden",
  },
};

/* ------------------------------------------------------------------ */
/* 1. Kopfzeile                                                        */
/* ------------------------------------------------------------------ */

const erstgespraechVerweis: Verweis = {
  label: "Erstgespräch anfragen",
  href: "/#erstgespraech",
};

export const kopfzeile = {
  wortmarke: SITE_NAME,
  links: [
    { label: "Über uns", href: "/#ueber-uns" },
    { label: "Inhalte", href: "/#inhalte" },
    { label: "Ablauf", href: "/#ablauf" },
    { label: "Selbsttest", href: "/#selbsttest" },
    { label: "Fragen", href: "/#fragen" },
  ] satisfies Verweis[],
  cta: erstgespraechVerweis,
};

/* ------------------------------------------------------------------ */
/* 2. Einstieg                                                         */
/* ------------------------------------------------------------------ */

export const einstieg = {
  kleinzeile: SITE_NAME,
  titel: `Ein Business aufbauen, das zu deinem Familien${SHY}leben passt`,
  text: "Wir begleiten dich persönlich beim Aufbau. Unser Schwerpunkt ist die Kurzzeitvermietung. Damit haben wir selbst 24 Ferienwohnungen aufgebaut.",
  primaer: erstgespraechVerweis,
  sekundaer: {
    label: "Passt das zu uns? Zum Selbsttest",
    href: "/#selbsttest",
  } satisfies Verweis,
  zahlenLabel: "Hygge Homes in Zahlen",
  zahlen: [
    { wert: 24, label: "Ferienwohnungen" },
    { vorsatz: "rund", wert: 125, label: "Betten" },
    { wert: 5, label: "Standorte" },
  ] satisfies Kennzahl[],
};

/* ------------------------------------------------------------------ */
/* 3. Die ehrliche Frage                                               */
/* ------------------------------------------------------------------ */

export const frage = {
  id: "frage",
  kleinzeile: "Bevor du startest",
  titel: "Passt das überhaupt zu uns?",
  text: "Kurzzeitvermietung klingt nach schöner Wohnung, netten Gästen und Zusatzeinkommen. Im Alltag heißt sie auch: Nachrichten zur Schlafenszeit der Kinder, Wäsche, Reparaturen und Verantwortung am Wochenende. Wir zeigen dir beide Seiten, bevor du einen Mietvertrag unterschreibst.",
  karten: [
    {
      titel: "Kein Nebenbei-Projekt",
      text: "Sobald Gäste, Geld und Verpflichtungen zusammenkommen, führst du ein kleines Unternehmen. Auch mit nur einer Wohnung.",
    },
    {
      titel: `Familien${SHY}freundlich wird es durch Planung`,
      text: "Kurzzeitvermietung ist nicht von allein familienfreundlich. Sie kann so organisiert werden. Genau daran arbeiten wir mit dir.",
    },
    {
      titel: "Ein Noch-nicht ist erlaubt",
      text: "Manchmal ist ein späterer Start die richtige Entscheidung. Auch das sagen wir dir, wenn wir es so sehen.",
    },
  ] satisfies TitelText[],
};

/* ------------------------------------------------------------------ */
/* 4. Über uns                                                         */
/* ------------------------------------------------------------------ */

export const ueberUns = {
  id: "ueber-uns",
  kleinzeile: "Wer wir sind",
  titel: "Wir haben selbst so angefangen",
  text: "Wir sind Anna und Thilo Westerwiede. Wir leben mit unserer Familie in einem Schwedenhaus in der Lüneburger Heide und führen Hygge Homes. Alles, was wir im Mentoring weitergeben, haben wir selbst ausprobiert, Herausforderungen angenommen und gelöst.",
  stationenLabel: "Unser Weg in vier Stationen",
  stationen: [
    {
      titel: "Ein Gästezimmer",
      text: "Unser erstes Inserat war das Gästezimmer im eigenen Haus. Es lief besser, als wir erwartet hatten.",
    },
    {
      titel: "Über 100 Besichtigungen",
      text: "Monatelang haben wir Wohnungen angesehen und ein Nein nach dem anderen gehört. Heute wissen wir, wie man Vermieter überzeugt.",
    },
    {
      titel: "Die erste Wohnung",
      text: "Zwischen Weihnachten und Neujahr haben wir gestrichen, Möbel geschleppt und aufgebaut. Anfang 2024 ging das Inserat online. Die erste Buchung kam nach weniger als einer Stunde.",
    },
    {
      titel: "Heute",
      text: "24 Ferienwohnungen und rund 125 Betten in Lüneburg, Winsen (Luhe), Rosengarten, Celle und Amelinghausen. Mit einem festen Team und klaren Abläufen.",
    },
  ] satisfies TitelText[],
  rollen: [
    {
      bild: "anna",
      name: "Anna",
      rolle: "Einrichtung, Inserate und Familienalltag",
      text: "Anna gestaltet die Wohnungen, schreibt die Inserate und behält im Blick, was ein Geschäftsmodell mit dem Familienleben macht.",
      frageLabel: "Ihre Frage:",
      frage: "Will ich das wirklich in meinem Alltag haben?",
    },
    {
      bild: "thilo",
      name: "Thilo",
      rolle: "Zahlen, Akquise und Struktur",
      text: "Thilo rechnet Objekte durch, verhandelt mit Vermietern und baut Abläufe, die auch an schlechten Tagen funktionieren.",
      frageLabel: "Seine Frage:",
      frage: "Trägt das Modell unter deinen Bedingungen?",
    },
  ] satisfies {
    bild: BildName;
    name: string;
    rolle: string;
    text: string;
    frageLabel: string;
    frage: string;
  }[],
  zitat: "Das Geschäftsmodell soll zum Leben passen. Nicht umgekehrt.",
};

/* ------------------------------------------------------------------ */
/* 5. Inhalte                                                          */
/* ------------------------------------------------------------------ */

export const inhalte = {
  id: "inhalte",
  kleinzeile: "Woran wir arbeiten",
  titel: "Sechs Themen, ein roter Faden",
  text: [
    "Wir gehen die Schritte in der Reihenfolge durch, in der sie bei dir anstehen. Du bekommst Werkzeuge und Vorlagen an die Hand und wendest sie auf deine Situation an.",
    "Unser Schwerpunkt ist die Kurzzeitvermietung. Du baust ein anderes Business auf? Viele Fragen sind dieselben: Zahlen, Struktur, Abläufe und deine Zeit. Auch dabei begleiten wir dich.",
  ],
  themen: [
    {
      titel: `Markt und Positio${SHY}nierung`,
      text: "Gibt es an deinem Standort Nachfrage? Wen willst du ansprechen und was fehlt dort noch? Erst die Positionierung, dann alles andere.",
    },
    {
      titel: "Die erste Wohnung finden und prüfen",
      text: "Wo du suchst, welche Kriterien zählen und wann du Nein sagst. Jedes Objekt rechnen wir in drei Szenarien. Das vorsichtige entscheidet.",
    },
    {
      titel: "Vermieter überzeugen",
      text: "Vorbereitung, Unterlagen und ein Gesprächsleitfaden in fünf Schritten. Ehrlich im Auftreten, klar bei Zuständigkeit und Vertrag.",
    },
    {
      titel: "Einrichten mit System",
      text: "Schlafen, Sitzen, Licht, Küche, Dekoration. In dieser Reihenfolge. Mit einem Budgetrahmen, der zur Wohnung passt.",
    },
    {
      titel: `Preise, Plattformen, Direkt${SHY}buchung`,
      text: "Dynamische Preise ab dem ersten Tag, mehrere Plattformen und früh eine eigene Buchungsseite.",
    },
    {
      titel: "Rollen, Abläufe, Auslagern",
      text: "Wer macht was, wann ist Familienzeit, was gibst du zuerst ab? Für den Betrieb und für euch als Paar.",
    },
  ] satisfies TitelText[],
  wohnungen: {
    titel: "Aus unseren Wohnungen",
    text: "Ein paar Beispiele aus unseren Wohnungen. So kann auch deine Wohnung aussehen: gemütlich eingerichtet und abgestimmt auf dein Konzept und deine Gäste.",
    /* Kacheln ohne Beschriftung. Die Alt-Texte stehen im Objekt bilder. */
    kacheln: [
      "wohnungSchlafen",
      "wohnungWohnen",
      "wohnungEssen",
      "wohnungStudio",
    ] satisfies BildName[],
  },
  hinweis:
    "Das Mentoring ersetzt keine Rechts- oder Steuerberatung. Wir sagen dir, an welchen Stellen du sie brauchst.",
};

/* ------------------------------------------------------------------ */
/* 6. Ablauf                                                           */
/* ------------------------------------------------------------------ */

export const ablauf = {
  id: "ablauf",
  titel: "So läuft es ab",
  unterzeile: "Schritt für Schritt",
  text: "In Einzelcalls und Gruppencalls sind wir deine persönlichen Begleiter im Mentoring. Den genauen Ablauf stimmen wir auf dein Ziel ab.",
  zeitleisteLabel: "Ablauf des Mentorings",
  /* Vier Schritte ohne Zeitangabe. Das Mentoring hat keine feste Dauer. */
  schritte: [
    {
      titel: "Erstgespräch",
      text: "Du lernst uns kennen, wir lernen dich kennen. Wir schauen auf deinen aktuellen Stand und darauf, wo du hinwillst. Kostenlos, rund 30 Minuten.",
    },
    {
      titel: "Dein Plan",
      text: "Innerhalb von ein bis vier Tagen bekommst du einen klaren Plan, wie wir dein Ziel gemeinsam erreichen.",
    },
    {
      titel: "Umsetzung mit Begleitung",
      text: "Du setzt um, wir begleiten dich. In Einzelcalls, in Gruppencalls und per WhatsApp zwischen den Terminen. Dazu Videos und Vorlagen, die du nutzt, wenn es in deinen Alltag passt.",
    },
    {
      titel: "Wie es weitergeht",
      text: "Am Ende schauen wir gemeinsam, was erreicht ist und was als Nächstes kommt. Auf Wunsch begleiten wir dich weiter.",
    },
  ] satisfies TitelText[],
};

/* ------------------------------------------------------------------ */
/* 7. Selbsttest                                                       */
/* ------------------------------------------------------------------ */

export const selbsttest = {
  id: "selbsttest",
  kleinzeile: "Selbsttest",
  titel: "Sechs ehrliche Fragen",
  text: "Kein Punktequiz, sondern eine Gesprächshilfe. Am besten beantwortet ihr die Fragen zu zweit. Es wird nichts gespeichert und nichts übertragen.",
  /** {nr} und {gesamt} werden ersetzt. */
  fortschritt: "Frage {nr} von {gesamt}",
  antwortenLabel: "Eure Antwort",
  antworten: [
    { label: "Ja", punkte: 2 },
    { label: "Noch unsicher", punkte: 1 },
    { label: "Nein", punkte: 0 },
  ],
  fragen: [
    {
      thema: "Zeit",
      frage:
        "Habt ihr in einer normalen Woche wirklich Zeit für die laufenden Aufgaben?",
    },
    {
      thema: "Verantwortung",
      frage:
        "Wisst ihr, wer übernimmt, wenn ein Kind krank ist und gleichzeitig ein Gast ein Problem hat?",
    },
    {
      thema: "Geld",
      frage:
        "Habt ihr einen Puffer für Leerstand, Reparaturen und unerwartete Kosten?",
    },
    {
      thema: "Grenzen",
      frage:
        "Könnt ihr festlegen, wann ihr erreichbar seid, und diese Grenzen auch einhalten?",
    },
    {
      thema: "Motivation",
      frage:
        "Wollt ihr wirklich Gastgeber sein und nicht nur die Zusatzeinnahmen?",
    },
    {
      thema: "Beziehung",
      frage:
        "Könnt ihr über Aufgaben, Geld und Belastung sprechen, bevor es schwierig wird?",
    },
  ],
  ergebnisKleinzeile: "Euer Ergebnis",
  ergebnisse: {
    gut: {
      titel: "Gute Ausgangslage",
      text: "Ihr habt die wichtigsten Fragen für euch geklärt. Im Erstgespräch schauen wir, welcher Schritt als Nächstes ansteht.",
    },
    offen: {
      titel: "Einige Punkte sind offen",
      text: "Das ist normal. Genau an den unsicheren Stellen lohnt es sich, genauer hinzusehen. Bringt sie ins Erstgespräch mit.",
    },
    nochNicht: {
      titel: "Vielleicht noch nicht jetzt",
      text: "Mehrere klare Neins sind kein Scheitern. Vielleicht braucht es mehr Unterstützung, ein anderes Modell oder einen späteren Zeitpunkt. Auch darüber sprechen wir offen mit euch.",
    },
  } satisfies Record<Stufe, TitelText>,
  offeneThemenTitel: "Darüber solltet ihr sprechen",
  cta: erstgespraechVerweis,
  zurueck: "Zurück",
  neustart: "Noch einmal starten",
};

export type SelbsttestInhalt = typeof selbsttest;

/* ------------------------------------------------------------------ */
/* 8. Für wen                                                          */
/* ------------------------------------------------------------------ */

export const fuerWen = {
  id: "fuer-wen",
  titel: "Für wen das Mentoring passt",
  passt: {
    titel: "Das passt, wenn du",
    punkte: [
      "gern Gastgeber bist und Kontakt mit Gästen magst",
      "bereit bist, ein kleines Unternehmen zu führen",
      "einen finanziellen Puffer hast und vorsichtig rechnest",
      "Aufgaben verteilen und abgeben willst",
      "deine Familie in die Entscheidung einbeziehst",
    ],
  },
  passtNicht: {
    titel: "Das passt nicht, wenn du",
    punkte: [
      "schnelles oder passives Einkommen erwartest",
      "sofort auf jeden Euro angewiesen bist",
      "dauerhaft am Limit bist und keine Vertretung hast",
      "nur die Einnahmen interessant findest, nicht die Gastgeberrolle",
      "erwartest, dass es nebenbei läuft",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* 9. Zahlen                                                           */
/* ------------------------------------------------------------------ */

export const zahlen = {
  id: "zahlen",
  kleinzeile: "Hygge Homes in Zahlen",
  titel: "Woher unsere Erfahrung kommt",
  kennzahlen: [
    { wert: 24, label: "Ferienwohnungen" },
    { vorsatz: "rund", wert: 125, label: "Betten" },
    { wert: 5, label: "Standorte" },
    {
      vorsatz: "über",
      wert: 100,
      label: "Besichtigungen bis zur ersten Wohnung",
    },
  ] satisfies Kennzahl[],
  /* Bewusst ohne Zahl: kein Erfahrungswert je Wohnung, kein Versprechen. */
  hinweis:
    "Jede Wohnung und jeder Standort ist anders. Was sich rechnet, prüfen wir für dein Objekt im Detail.",
  podcast: {
    text: "Im Podcast „HYGGE HOMES family & business“ erzählen wir offen, was gut läuft und was nicht.",
    link: { label: "Zum Podcast", href: PODCAST_URL } satisfies Verweis,
  },
};

/* ------------------------------------------------------------------ */
/* 10. Beispielpaket                                                   */
/* ------------------------------------------------------------------ */

/*
 * Nur in diesem Abschnitt darf eine Dauer stehen ("zwölf Wochen",
 * "90 Tage"), weil er ausdrücklich ein Beispiel zeigt. Ein Preis, ein
 * Euro-Betrag oder Stunden pro Monat stehen auch hier nicht.
 */
export const paket = {
  id: "paket",
  titel: "Ein Beispiel",
  text: "Jedes Mentoring stellen wir individuell zusammen. So kann es aussehen: unser Einstieg in die Kurzzeitvermietung über zwölf Wochen.",
  phasenLabel: "Phasen des Beispiels",
  phasen: [
    {
      titel: "Start und Standort",
      text: "Ziel, Zeitbudget und Wunschregion festlegen. Standorte bewerten, Objektsuche starten.",
    },
    {
      titel: "Objektsuche und Kalkulation",
      text: "Objekte finden, Vermieter ansprechen, mit Szenarien rechnen und entscheiden.",
    },
    {
      titel: "Einrichtung und Abläufe",
      text: "Budget und Ausstattung planen, Reinigung, Check-in und Dienstleister organisieren.",
    },
    {
      titel: "Vermarktung, Verträge, Betrieb",
      text: "Inserat und Preise vorbereiten, rechtliche Fragen sammeln und mit Fachleuten klären, Kennzahlen festlegen.",
    },
    {
      titel: "Abschluss",
      text: "Ergebnisse sichern und einen Plan für die nächsten 90 Tage machen.",
    },
  ] satisfies TitelText[],
  enthalten: {
    titel: "Enthalten",
    /* Die Objektanalyse wird bewusst nicht verlinkt. */
    punkte: [
      "Einzelcalls",
      "Gruppencalls",
      "WhatsApp-Austausch zwischen den Terminen",
      "Lernvideos und Vorlagen",
      "Zugang zu unserer Objektanalyse im vereinbarten Umfang",
      "Dein persönlicher Fahrplan",
    ],
  },
  schlusszeile:
    "Umfang, Dauer und Preis stimmen wir im Erstgespräch individuell ab.",
  cta: erstgespraechVerweis,
};

/* ------------------------------------------------------------------ */
/* 11. Häufige Fragen                                                  */
/* ------------------------------------------------------------------ */

export const fragen = {
  id: "fragen",
  titel: "Häufige Fragen",
  eintraege: [
    {
      frage: "Ist es nicht schon zu spät, um zu starten?",
      antwort:
        "Nein. Der Markt ist professioneller geworden, und die Nachfrage ist da. Wer heute startet, braucht eine klare Positionierung und saubere Zahlen. Daran arbeiten wir zuerst.",
    },
    {
      frage: "Brauche ich eine eigene Immobilie?",
      antwort:
        "Nein. Wir selbst haben mit angemieteten Wohnungen begonnen. Dabei mietest du eine Wohnung und vermietest sie mit ausdrücklicher Zustimmung des Vermieters an Gäste weiter. Was rechtlich vor Ort gilt, klärst du vorab mit den zuständigen Stellen.",
    },
    {
      frage: "Wie viel Zeit muss ich einplanen?",
      antwort:
        "Mehr, als die meisten denken. Zur reinen Arbeitszeit kommen Abstimmung, Erreichbarkeit und Bereitschaft bei Problemen. Im Mentoring planen wir das ehrlich mit deiner Woche.",
    },
    {
      frage: "Was kostet die Einrichtung einer Wohnung?",
      antwort:
        "Als Faustformel rechnen wir mit 140 bis 180 Euro je Quadratmeter. Die Reihenfolge ist wichtiger als die Summe: erst Betten, dann Sitzmöbel, Licht und Küche, zuletzt Dekoration.",
    },
    {
      frage: "Geht das neben dem Beruf?",
      antwort:
        "Am Anfang ja, wir haben selbst so begonnen. Dauerhaft funktioniert es nur mit klaren Zuständigkeiten und Aufgaben, die du abgibst. Reinigung und Wäsche sind meist der erste Schritt.",
    },
    {
      frage: "Was, wenn sich herausstellt, dass es nicht passt?",
      antwort:
        "Dann ist das ein gutes Ergebnis. Ein Nein vor dem ersten Mietvertrag ist günstiger als eines danach.",
    },
    {
      frage: "Ist das Mentoring eine Rechts- oder Steuerberatung?",
      antwort:
        "Nein. Wir teilen unsere Erfahrung aus der Praxis. Für Verträge, Nutzungsänderung und Steuern brauchst du Fachleute. Wir sagen dir, wann.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 12. Erstgespräch und Formular                                       */
/* ------------------------------------------------------------------ */

export const erstgespraech = {
  id: "erstgespraech",
  kleinzeile: "Erstgespräch",
  titel: "Lass uns sprechen",
  text: "Im Erstgespräch lernen wir uns kennen und klären, wo du stehst und ob das Mentoring zu dir passt. Schreib uns kurz, wir melden uns bei dir.",
  rahmen:
    "Das Erstgespräch führst du mit Anna oder Thilo. Es ist kostenlos und dauert rund 30 Minuten. Wir schauen auf deinen aktuellen Stand und darauf, wo du in den nächsten Monaten stehen willst. Innerhalb von ein bis vier Tagen bekommst du einen klaren Plan, wie wir dein Ziel gemeinsam erreichen können. Ins Mentoring nehmen wir nur Menschen auf, die wirklich umsetzen wollen.",
};

export const formular = {
  titel: "Anfrage für ein Erstgespräch",
  pflichtHinweis: "Felder mit Stern sind Pflichtfelder.",
  pflichtZeichen: "*",
  /* Pflichtfelder: Name, E-Mail, Telefon, Stand und Zustimmung. */
  felder: {
    name: "Name",
    email: "E-Mail",
    telefon: "Telefon",
    stand: "Wo stehst du gerade?",
    nachricht:
      "Nachricht (optional: Was möchtest du mit deinem Business erreichen? Ein, zwei Sätze reichen.)",
  },
  nachrichtPlatzhalter:
    "Zum Beispiel: Ich möchte neben dem Job eine erste Ferienwohnung starten.",
  standBitteWaehlen: "Bitte wählen",
  standOptionen: {
    informieren: "Ich informiere mich noch",
    suche: "Ich suche meine erste Wohnung",
    aussicht: "Ich habe eine Wohnung in Aussicht",
    vermiete: "Ich vermiete bereits",
  } satisfies Record<Stand, string>,
  /** {anzahl} und {max} werden ersetzt. */
  nachrichtZaehler: "{anzahl} von {max} Zeichen",
  zustimmung: {
    vor: "Ich habe die ",
    link: { label: "Datenschutzerklärung", href: "/datenschutz" },
    nach: " gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden.",
  },
  honeypotLabel: "Website (bitte leer lassen)",
  senden: "Anfrage senden",
  sendenLaeuft: "Wird gesendet",
  erfolg:
    "Danke, deine Anfrage ist bei uns angekommen. Wir melden uns bei dir.",
  /** {email} wird durch CONTACT_EMAIL ersetzt. */
  fehler:
    "Das hat leider nicht geklappt. Schreib uns bitte direkt an {email}.",
  /** {email} wird durch CONTACT_EMAIL ersetzt. */
  zuVieleAnfragen:
    "Das waren zu viele Anfragen in kurzer Zeit. Versuch es später noch einmal oder schreib uns direkt an {email}.",
  fehlerZusammenfassung: "Bitte prüfe die markierten Felder.",
  /** {email} wird durch CONTACT_EMAIL ersetzt. */
  ohneJavascript:
    "Das Formular braucht JavaScript. Du erreichst uns auch per E-Mail an {email}.",
  feldFehler: {
    pflicht: "Bitte füll dieses Feld aus.",
    zu_lang: "Die Eingabe ist zu lang.",
    format: "Bitte prüfe die Schreibweise.",
    ungueltig: "Bitte wähle eine der Möglichkeiten.",
  } satisfies Record<Fehlercode, string>,
  /** Genauere Meldungen für einzelne Felder, sonst gilt feldFehler. */
  feldFehlerGenau: {
    email: { format: "Bitte gib eine gültige E-Mail-Adresse ein." },
    telefon: {
      pflicht: "Bitte gib eine Telefonnummer an, unter der wir dich erreichen.",
      format: "Bitte gib eine Telefonnummer an, unter der wir dich erreichen.",
      zu_lang: "Bitte gib eine Telefonnummer an, unter der wir dich erreichen.",
    },
    stand: { pflicht: "Bitte wähle aus, wo du gerade stehst." },
    zustimmung: {
      pflicht: "Bitte stimme der Datenschutzerklärung zu.",
    },
  } satisfies Partial<Record<Feld, Partial<Record<Fehlercode, string>>>>,
};

export type FormularInhalt = typeof formular;

/** Texte der E-Mail, die das Formular an Anna und Thilo sendet. */
export const mail = {
  absenderName: SITE_NAME,
  /** {name} wird ersetzt. */
  betreff: "Neue Anfrage Erstgespräch: {name}",
  einleitung: "Neue Anfrage über das Formular der Mentoring-Seite.",
  felder: {
    name: "Name",
    email: "E-Mail",
    telefon: "Telefon",
    stand: "Stand",
    nachricht: "Nachricht",
    zustimmung: "Zustimmung Datenschutz",
    zeitpunkt: "Zeitpunkt",
  },
  leer: "(keine Angabe)",
  zustimmungErteilt: "erteilt",
  antwortHinweis:
    "Antworten auf diese E-Mail gehen direkt an die anfragende Person.",
};

/* ------------------------------------------------------------------ */
/* 13. Fußzeile                                                        */
/* ------------------------------------------------------------------ */

export const fusszeile = {
  text: "Mentoring by Anna & Thilo. Ein Angebot der Westerwiede & Westerwiede GbR.",
  links: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "Podcast", href: PODCAST_URL, extern: true },
    { label: "hygge-homes.de", href: HYGGE_HOMES_URL, extern: true },
  ] satisfies (Verweis & { extern?: boolean })[],
};

/* ------------------------------------------------------------------ */
/* Rechtsseiten (Entwürfe)                                             */
/* ------------------------------------------------------------------ */

/*
 * Markierungen der Form [PRÜFEN: ...] werden auf der Seite sichtbar
 * hervorgehoben. Die Texte sind Entwürfe und keine Rechtsberatung.
 */

export type RechtsAbschnitt = {
  titel: string;
  absaetze?: string[];
  liste?: string[];
};

export type RechtsSeite = {
  titel: string;
  entwurfTitel: string;
  entwurfText: string;
  abschnitte: RechtsAbschnitt[];
};

const anbieterZeilen = [
  "Westerwiede & Westerwiede GbR",
  "Habichtsweg 21",
  "21385 Amelinghausen",
];

const kontaktZeilen = [
  `E-Mail: ${CONTACT_EMAIL}`,
  "Telefon: +49 4171 60 888 20",
];

export const impressum: RechtsSeite = {
  titel: "Impressum",
  entwurfTitel: "Entwurf",
  entwurfText:
    "Diese Seite ist ein Entwurf und noch nicht rechtlich geprüft. Alle mit [PRÜFEN: ...] markierten Stellen müssen vor der Veröffentlichung geklärt werden.",
  abschnitte: [
    {
      titel: "Anbieter",
      liste: anbieterZeilen,
      absaetze: [
        "[PRÜFEN: Bezeichnung der Rechtsgrundlage für die Anbieterkennzeichnung]",
      ],
    },
    {
      titel: "Gesellschafter",
      liste: ["Thilo Westerwiede", "Anna Westerwiede"],
    },
    {
      titel: "Kontakt",
      liste: kontaktZeilen,
      absaetze: ["[PRÜFEN: Kontaktadresse für das Mentoring]"],
    },
    {
      titel: "Umsatzsteuer",
      absaetze: ["[PRÜFEN: USt-IdNr. oder Kleinunternehmerregelung]"],
    },
    {
      titel: "Verantwortlich für den Inhalt",
      absaetze: [
        "[PRÜFEN: Angabe einer inhaltlich verantwortlichen Person, falls erforderlich]",
      ],
    },
    {
      titel: "Hinweis zum Angebot",
      absaetze: [
        "Das Mentoring ist ein Angebot der Westerwiede & Westerwiede GbR. Es ersetzt keine Rechts- oder Steuerberatung.",
        "[PRÜFEN: Hinweis zur Verbraucherstreitbeilegung, falls erforderlich]",
      ],
    },
  ],
};

export const datenschutz: RechtsSeite = {
  titel: "Datenschutz",
  entwurfTitel: "Entwurf",
  entwurfText:
    "Diese Datenschutzerklärung ist ein Entwurf und noch nicht rechtlich geprüft. Alle mit [PRÜFEN: ...] markierten Stellen müssen vor der Veröffentlichung geklärt werden. [PRÜFEN: Anschriften der Dienstleister, Rechtsgrundlagen, Auftragsverarbeitung]",
  abschnitte: [
    {
      titel: "1. Verantwortlicher",
      absaetze: [
        "Verantwortlich für die Verarbeitung deiner Daten auf dieser Website ist:",
      ],
      liste: [...anbieterZeilen, ...kontaktZeilen],
    },
    {
      titel: "2. Hosting bei Vercel",
      absaetze: [
        "Diese Website wird bei Vercel gehostet. Beim Aufruf der Seite verarbeitet der Anbieter die technisch nötigen Verbindungsdaten, um die Seite auszuliefern.",
        "[PRÜFEN: Anschrift von Vercel]",
        "[PRÜFEN: Umfang und Speicherdauer der Verbindungsdaten bei Vercel]",
        "[PRÜFEN: Rechtsgrundlage für das Hosting]",
        "[PRÜFEN: Vertrag zur Auftragsverarbeitung mit Vercel und Übermittlung in Drittländer]",
      ],
    },
    {
      titel: "3. Anfrageformular",
      absaetze: [
        "Wenn du uns über das Formular schreibst, verarbeiten wir diese Angaben:",
      ],
      liste: [
        "Name (Pflichtangabe)",
        "E-Mail-Adresse (Pflichtangabe)",
        "Telefonnummer (Pflichtangabe)",
        "deine Auswahl zur Frage, wo du gerade stehst",
        "deine Nachricht, wenn du eine schreibst",
        "Zeitpunkt der Anfrage",
      ],
    },
    {
      titel: "Zweck der Verarbeitung",
      absaetze: [
        "Wir nutzen deine Angaben nur, um deine Anfrage zu bearbeiten und uns für ein Erstgespräch bei dir zu melden.",
        "[PRÜFEN: Rechtsgrundlage für die Verarbeitung der Anfrage]",
        "[PRÜFEN: Erforderlichkeit der Telefonnummer als Pflichtangabe]",
      ],
    },
    {
      titel: "Versand per E-Mail über Strato",
      absaetze: [
        "Das Formular sendet deine Angaben als E-Mail an unser Postfach. Der Versand läuft über den Mailserver unseres Anbieters Strato. Auf der Website selbst speichern wir deine Angaben nicht in einer Datenbank.",
        "Zum Schutz vor Missbrauch zählt der Server die Anfragen je IP-Adresse. Diese Zählung liegt für höchstens eine Stunde im Arbeitsspeicher und wird nicht dauerhaft gespeichert.",
        "[PRÜFEN: Anschrift von Strato]",
        "[PRÜFEN: Vertrag zur Auftragsverarbeitung mit Strato]",
      ],
    },
    {
      titel: "Speicherdauer",
      absaetze: ["[PRÜFEN: Speicherdauer der Anfragen im Postfach]"],
    },
    {
      titel: "4. Keine Cookies und keine Analyse",
      absaetze: [
        "Diese Website setzt keine Cookies. Wir nutzen keine Werkzeuge zur Analyse oder zum Tracking deines Besuchs.",
      ],
    },
    {
      titel: "5. Lokal eingebundene Schriften",
      absaetze: [
        "Die Schriften Oswald und Jost liegen auf unserem eigenen Webspace. Beim Laden der Schriften wird keine Verbindung zu Servern anderer Anbieter aufgebaut.",
      ],
    },
    {
      titel: "6. Externer Link zu Spotify",
      absaetze: [
        "Unser Podcast ist als einfacher Link zu Spotify hinterlegt. Auf dieser Website ist nichts von Spotify eingebettet. Erst wenn du den Link anklickst, verlässt du unsere Seite. Dann gelten die Datenschutzhinweise von Spotify.",
        "Dasselbe gilt für den Link zu hygge-homes.de.",
      ],
    },
    {
      titel: "7. Rechte der Betroffenen",
      absaetze: [
        "Du hast gegenüber uns diese Rechte in Bezug auf deine Daten:",
      ],
      liste: [
        "Auskunft",
        "Berichtigung",
        "Löschung",
        "Einschränkung der Verarbeitung",
        "Datenübertragbarkeit",
        "Widerspruch gegen die Verarbeitung",
        "Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft",
      ],
    },
    {
      titel: "So erreichst du uns dazu",
      absaetze: [
        `Schreib uns dafür an ${CONTACT_EMAIL}.`,
        "[PRÜFEN: Verweise auf die einschlägigen Artikel der DSGVO]",
      ],
    },
    {
      titel: "8. Beschwerderecht",
      absaetze: [
        "Du kannst dich bei einer Aufsichtsbehörde für den Datenschutz beschweren, wenn du meinst, dass wir deine Daten nicht rechtmäßig verarbeiten.",
        "[PRÜFEN: zuständige Aufsichtsbehörde mit Anschrift]",
      ],
    },
    {
      titel: "Stand",
      absaetze: ["[PRÜFEN: Datum der Fassung]"],
    },
  ],
};
