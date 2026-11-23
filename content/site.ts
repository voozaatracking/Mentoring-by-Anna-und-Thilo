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

/**
 * Zeigt das Etikett „Platzhalter“ an allen markierten Stellen. Derzeit gibt
 * es keinen Platzhalter. Kommt wieder einer dazu, auf true setzen.
 */
export const SHOW_PLACEHOLDER_MARKS = false;

/** Solange false, setzt die Seite robots auf noindex. */
export const ALLOW_INDEXING = false;

/** Sichtbare Ausweichadresse, falls das Formular nicht funktioniert. */
export const CONTACT_EMAIL = "info@hygge-homes.de";

export const SITE_NAME = "Mentoring by Anna & Thilo";

export const PODCAST_URL =
  "https://open.spotify.com/show/3lxmZmT0iVF92A5kc4oFx8";

export const HYGGE_HOMES_URL = "https://hygge-homes.de";

/** Telefonnummer, wie sie auf der Seite steht. */
export const TELEFON = "+49 4171 60 888 20";

/** Ziel des Telefonlinks: dieselbe Nummer ohne Leerzeichen. */
export const TELEFON_HREF = "tel:+4941716088820";

export const INSTAGRAM_NAME = "@hyggehomes.official";

export const INSTAGRAM_URL = "https://www.instagram.com/hyggehomes.official/";

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
  | "wohnungStudio"
  | "partnerGolet"
  | "partnerMertensSchabow"
  | "logoGolet"
  | "logoMertensSchabow";

export type BildEintrag = {
  /** Zielname der Datei in assets/images/. */
  datei: string;
  alt: string;
};

export type TitelText = { titel: string; text: string };

export type Kennzahl = { vorsatz?: string; wert: number; label: string };

/*
 * Zahlen zu Hygge Homes, Stand November 2026. Sie stehen nur hier und
 * fließen in Einstieg, Über uns und den Abschnitt Zahlen. Der sechste
 * Standort wird nicht benannt, deshalb heißt es bei den Orten "unter
 * anderem".
 */
export const STAND = {
  wohnungen: 29,
  betten: 145,
  standorte: 6,
  orte: "unter anderem in Lüneburg, Winsen (Luhe), Rosengarten, Celle und Amelinghausen",
} as const;

const kennzahlenKern = [
  { wert: STAND.wohnungen, label: "Ferienwohnungen" },
  { vorsatz: "rund", wert: STAND.betten, label: "Betten" },
  { wert: STAND.standorte, label: "Standorte" },
] satisfies Kennzahl[];

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
  /* Fotos und Logos der Partner, Nutzung mit Freigabe der Partner. */
  partnerGolet: {
    datei: "partner-golet.png",
    alt: "Johannes Leutgeb im grauen Pullover sitzt an einem Holztisch und lacht in die Kamera",
  },
  partnerMertensSchabow: {
    datei: "partner-mertens-schabow.webp",
    alt: "Sechs Personen aus dem Team von Mertens Schabow auf und hinter einem grauen Sofa, alle lächeln in die Kamera",
  },
  logoGolet: {
    datei: "logo-golet.png",
    alt: "Logo der GoLet GmbH",
  },
  logoMertensSchabow: {
    datei: "logo-mertens-schabow.jpeg",
    alt: "Logo von Mertens Schabow",
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
  text: `Wir begleiten dich persönlich beim Aufbau deines Business. Unser Schwerpunkt ist die Kurzzeitvermietung. Damit sind wir selbst auf ${STAND.wohnungen} Ferienwohnungen gewachsen.`,
  primaer: erstgespraechVerweis,
  sekundaer: {
    label: "Passt das zu uns? Zum Selbsttest",
    href: "/#selbsttest",
  } satisfies Verweis,
  zahlenLabel: "Hygge Homes in Zahlen",
  zahlen: kennzahlenKern,
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
      text: `${STAND.wohnungen} Ferienwohnungen und rund ${STAND.betten} Betten, ${STAND.orte}. Mit einem festen Team und klaren Abläufen.`,
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
  /*
   * Partner: Fotos, ein Name und Logos der Partner sind erlaubt. Logos
   * Dritter bleiben farblich unverändert, ohne Filter und ohne Umfärben.
   * Sie sind die einzige Ausnahme von der Regel "kein Schwarz". Die Bilder
   * sind nicht verlinkt. Die Links tragen keine Tracking-Parameter und
   * öffnen in neuem Tab.
   *
   * Die Seite sagt, dass es Calls mit den Partnern und Videos von ihnen
   * gibt. Sie sagt nicht, ob diese enthalten sind. Beratung zum Einzelfall
   * beauftragen Teilnehmer direkt bei den Partnern. Bewusst keine Aussage
   * zu Vergütung oder Provision. Ein Test prüft, dass zwei bestimmte Wörter
   * nicht auf der Seite stehen (siehe tests/inhalt.test.ts).
   */
  partner: {
    titel: "Unsere Partner",
    text: "Für Baurecht und Steuern holen wir Fachleute dazu, mit denen wir selbst zusammenarbeiten. Im Mentoring gibt es Calls mit unseren Partnern und Videos von ihnen.",
    karten: [
      {
        bild: "partnerGolet",
        logo: "logoGolet",
        titel: "GoLet GmbH",
        bildzeile: "Johannes Leutgeb, Geschäftsführer",
        text: "Nutzungsänderung und Bauantrag für Ferienwohnungen.",
        link: { label: "golet.de", href: "https://golet.de" },
      },
      {
        bild: "partnerMertensSchabow",
        logo: "logoMertensSchabow",
        titel: "Mertens Schabow Steuerberatung",
        bildzeile: "Das Team der Kanzlei",
        text: "Steuerberatung aus Hamburg, unter anderem für Immobilien.",
        link: { label: "mertens-schabow.de", href: "https://mertens-schabow.de" },
      },
    ] satisfies (TitelText & {
      bild: BildName;
      logo: BildName;
      /** Zeile unter dem Titel: wer auf dem Foto zu sehen ist. */
      bildzeile: string;
      link: Verweis;
    })[],
    schlusszeile:
      "Brauchst du Beratung für dein Objekt, beauftragst du unsere Partner direkt. Ob du das tust, entscheidest du selbst.",
  },
};

/* ------------------------------------------------------------------ */
/* 6. Ablauf                                                           */
/* ------------------------------------------------------------------ */

export const ablauf = {
  id: "ablauf",
  titel: "So läuft es ab",
  unterzeile: "Schritt für Schritt",
  text: "In persönlichen 1:1-Calls sind wir deine Begleiter im Mentoring. Wir begleiten dich so lange, wie es für dein Ziel sinnvoll ist. Dauer, Umfang und Ablauf stimmen wir gemeinsam ab.",
  zeitleisteLabel: "Ablauf des Mentorings",
  /*
   * Vier Schritte ohne Zeitangabe. Das Mentoring hat keine feste Dauer.
   * Es läuft über persönliche 1:1-Calls mit Anna und Thilo. Die Seite
   * sagt, dass es für Baurecht und Steuern Calls mit den Partnern gibt.
   * Sie sagt nicht, ob diese enthalten sind. Andere Formate stehen erst
   * auf der Seite, wenn es sie gibt (siehe ROADMAP).
   */
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
      text: "Du setzt um, wir begleiten dich. In persönlichen 1:1-Calls und per WhatsApp zwischen den Terminen. Dazu Videos und Vorlagen, die du nutzt, wenn es in deinen Alltag passt. Für Baurecht und Steuern gibt es Calls mit unseren Partnern.",
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
    ...kennzahlenKern,
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
    /*
     * Die Objektanalyse wird bewusst nicht verlinkt. Die Liste nennt die
     * Partner nicht: Ob ihre Calls enthalten sind, sagt die Seite nicht.
     */
    punkte: [
      "Persönliche 1:1-Calls",
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
        "Das planen wir individuell mit dir. Wir schauen auf deinen Stand, dein Ziel und deine Woche. Daraus ergibt sich ein Tempo, das in deinen Alltag passt.",
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
        "Nein. Wir teilen unsere Erfahrung aus der Praxis. Für Verträge, Nutzungsänderung und Steuern brauchst du Fachleute. Wir sagen dir, wann. Dafür gibt es Calls mit unseren Partnern. Eine Beratung zu deinem Einzelfall beauftragst du direkt bei ihnen.",
    },
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
  ],
};

/* ------------------------------------------------------------------ */
/* 12. Erstgespräch und Formular                                       */
/* ------------------------------------------------------------------ */

export const erstgespraech = {
  id: "erstgespraech",
  kleinzeile: "Erstgespräch",
  titel: "Lass uns sprechen",
  text:
    "Das Erstgespräch führst du mit Anna oder Thilo. Es ist kostenlos und dauert rund 30 Minuten. Wir schauen auf deinen aktuellen Stand und darauf, wo du in den nächsten Monaten stehen willst. Innerhalb von ein bis vier Tagen bekommst du einen klaren Plan, wie wir dein Ziel gemeinsam erreichen können. Ins Mentoring nehmen wir nur Menschen auf, die wirklich umsetzen wollen.",
};

export const formular = {
  titel: "Anfrage für ein Erstgespräch",
  pflichtHinweis: "Felder mit Stern sind Pflichtfelder.",
  pflichtZeichen: "*",
  /* Pflichtfelder: Name, E-Mail, Telefon, Stand und die Bestätigung zum Datenschutz. */
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
  /*
   * Bewusst keine Einwilligung: Die Anfrage wird als vorvertragliche
   * Maßnahme bearbeitet (siehe Datenschutzerklärung). Das Kästchen
   * bestätigt nur, dass die Erklärung gelesen wurde.
   */
  zustimmung: {
    vor: "Ich habe die ",
    link: { label: "Datenschutzerklärung", href: "/datenschutz" },
    nach: " gelesen.",
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
      pflicht: "Bitte bestätige, dass du die Datenschutzerklärung gelesen hast.",
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
    zustimmung: "Datenschutzerklärung",
    zeitpunkt: "Zeitpunkt",
  },
  leer: "(keine Angabe)",
  zustimmungErteilt: "gelesen",
  antwortHinweis:
    "Antworten auf diese E-Mail gehen direkt an die anfragende Person.",
};

/* ------------------------------------------------------------------ */
/* 13. Fußzeile                                                        */
/* ------------------------------------------------------------------ */

export type FussVerweis = Verweis & {
  /** Öffnet in neuem Tab. */
  extern?: boolean;
  /** Wert für rel bei externen Verweisen, sonst gilt noopener. */
  rel?: string;
};

export const fusszeile = {
  text: "Mentoring by Anna & Thilo. Ein Angebot der Westerwiede & Westerwiede GbR.",
  kontaktLabel: "Kontakt",
  /* Instagram ist nur ein Link. Nichts wird eingebettet, kein Skript geladen. */
  kontakt: [
    { art: "Telefon", label: TELEFON, href: TELEFON_HREF },
    {
      art: "Instagram",
      label: INSTAGRAM_NAME,
      href: INSTAGRAM_URL,
      extern: true,
      rel: "noopener noreferrer",
    },
  ] satisfies (FussVerweis & { art: string })[],
  links: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "Podcast", href: PODCAST_URL, extern: true },
    { label: "hygge-homes.de", href: HYGGE_HOMES_URL, extern: true },
  ] satisfies FussVerweis[],
};

/* ------------------------------------------------------------------ */
/* Rechtsseiten (final)                                                */
/* ------------------------------------------------------------------ */

/*
 * Finale, freigegebene Fassungen. Quelle sind die Dateien unter
 * docs/rechtstexte/. Die Texte hier stimmen Wort für Wort damit überein,
 * ein Test vergleicht beide. Änderungen deshalb immer zuerst in der Datei
 * unter docs/rechtstexte/ freigeben lassen und dann hier nachziehen.
 */

export type RechtsBlock = {
  /** Fett gesetzter Beginn des Absatzes. */
  vorspann?: string;
  /** Eine Zeile ist ein Absatz. Mehrere Zeilen stehen untereinander. */
  zeilen: string[];
};

export type RechtsAbschnitt = {
  titel: string;
  bloecke: RechtsBlock[];
};

export type RechtsSeite = {
  titel: string;
  /** Blöcke zwischen Überschrift und erstem Abschnitt, zum Beispiel der Stand. */
  vorab: RechtsBlock[];
  abschnitte: RechtsAbschnitt[];
};

export const impressum: RechtsSeite = {
  titel: "Impressum",
  vorab: [],
  abschnitte: [
    {
      titel: "Angaben gemäß § 5 DDG",
      bloecke: [
        {
          zeilen: [
            "Westerwiede & Westerwiede GbR",
            "Habichtsweg 21",
            "21385 Amelinghausen",
          ],
        },
        {
          zeilen: [
            "Vertreten durch die Gesellschafter:",
            "Thilo Westerwiede",
            "Anna Westerwiede",
          ],
        },
      ],
    },
    {
      titel: "Kontakt",
      bloecke: [
        {
          zeilen: [
            "Telefon: +49 4171 60 888 20",
            "E-Mail: info@hygge-homes.de",
          ],
        },
      ],
    },
    {
      titel: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
      bloecke: [
        {
          zeilen: [
            "Thilo Westerwiede",
            "Habichtsweg 21",
            "21385 Amelinghausen",
          ],
        },
      ],
    },
    {
      titel: "Verbraucherstreitbeilegung",
      bloecke: [
        {
          zeilen: [
            "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
          ],
        },
      ],
    },
    {
      titel: "Anbieter des Mentorings",
      bloecke: [
        {
          zeilen: [
            "Das Mentoring wird von der Westerwiede & Westerwiede GbR angeboten. Hygge Homes ist die Marke unserer Ferienwohnungen. Die Hygge Homes ND GmbH ist nicht Anbieterin dieser Website und des Mentorings.",
          ],
        },
      ],
    },
    {
      titel: "Bildnachweis",
      bloecke: [
        {
          zeilen: [
            "Fotos von Anna und Thilo: Die Nutzungsrechte liegen bei Anna und Thilo Westerwiede.",
            "Wohnungsfotos: Hygge Homes ND GmbH, Nutzung mit Freigabe.",
            "Fotos und Logos unserer Partner: GoLet GmbH und Mertens Schabow Steuerberatung, Nutzung mit Freigabe.",
          ],
        },
      ],
    },
    {
      titel: "Haftung für Inhalte",
      bloecke: [
        {
          zeilen: [
            "Wir erstellen die Inhalte dieser Seite mit Sorgfalt. Für Richtigkeit, Vollständigkeit und Aktualität übernehmen wir keine Gewähr. Als Diensteanbieter sind wir für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich.",
          ],
        },
      ],
    },
    {
      titel: "Haftung für Links",
      bloecke: [
        {
          zeilen: [
            "Diese Seite enthält Links zu Websites Dritter. Für deren Inhalte ist der jeweilige Anbieter verantwortlich. Erhalten wir Hinweise auf Rechtsverletzungen, entfernen wir den betreffenden Link.",
          ],
        },
      ],
    },
    {
      titel: "Urheberrecht",
      bloecke: [
        {
          zeilen: [
            "Texte und Fotos auf dieser Seite sind urheberrechtlich geschützt. Eine Verwendung außerhalb dieser Seite ist nur mit unserer schriftlichen Zustimmung erlaubt.",
          ],
        },
      ],
    },
  ],
};

export const datenschutz: RechtsSeite = {
  titel: "Datenschutzerklärung",
  vorab: [
    {
      zeilen: [
        "Stand: November 2026",
      ],
    },
  ],
  abschnitte: [
    {
      titel: "1. Das Wichtigste in Kürze",
      bloecke: [
        {
          zeilen: [
            "Diese Seite setzt keine Cookies und nutzt kein Tracking und keine Analyse-Tools. Die Schriften sind auf dem eigenen Server eingebunden, es besteht keine Verbindung zu Google oder anderen Schriftanbietern. Personenbezogene Daten verarbeiten wir nur in zwei Fällen: beim technischen Aufruf der Seite und wenn du uns über das Formular eine Anfrage schickst.",
          ],
        },
      ],
    },
    {
      titel: "2. Verantwortlicher",
      bloecke: [
        {
          zeilen: [
            "Westerwiede & Westerwiede GbR",
            "Gesellschafter: Thilo Westerwiede, Anna Westerwiede",
            "Habichtsweg 21",
            "21385 Amelinghausen",
          ],
        },
        {
          zeilen: [
            "Telefon: +49 4171 60 888 20",
            "E-Mail: info@hygge-homes.de",
          ],
        },
        {
          zeilen: [
            "Ansprechpartner für alle Fragen zum Datenschutz ist Thilo Westerwiede, erreichbar über die oben genannten Kontaktdaten.",
          ],
        },
      ],
    },
    {
      titel: "3. Hosting",
      bloecke: [
        {
          zeilen: [
            "Diese Seite wird gehostet bei der Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.",
          ],
        },
        {
          zeilen: [
            "Beim Aufruf der Seite verarbeitet Vercel technisch notwendige Daten: IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse, zuvor besuchte Seite, Browser und Betriebssystem. Diese Daten werden in Server-Logdateien gespeichert. Sie dienen der Auslieferung der Seite, ihrer Stabilität und ihrer Sicherheit. Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und zuverlässigen Bereitstellung (Art. 6 Abs. 1 lit. f DSGVO).",
          ],
        },
        {
          zeilen: [
            "Vercel speichert diese Logdateien nur so lange, wie es für den technischen Betrieb nötig ist. Wir selbst speichern sie nicht gesondert und werten sie nicht aus.",
          ],
        },
        {
          zeilen: [
            "Vercel hat seinen Sitz in den USA. Die Übermittlung erfolgt auf Grundlage des EU-US Data Privacy Framework (Angemessenheitsbeschluss nach Art. 45 DSGVO) und ergänzend auf Grundlage von Standardvertragsklauseln (Art. 46 DSGVO).",
          ],
        },
      ],
    },
    {
      titel: "4. Anfrageformular",
      bloecke: [
        {
          zeilen: [
            "Wenn du uns über das Formular eine Anfrage schickst, verarbeiten wir folgende Angaben: Name, E-Mail-Adresse, Telefonnummer, deinen aktuellen Stand (Auswahl) und, falls du sie ausfüllst, deine Nachricht. Name, E-Mail-Adresse, Telefonnummer und Stand sind Pflichtangaben. Ohne sie können wir deine Anfrage nicht bearbeiten. Die Telefonnummer brauchen wir, um das Erstgespräch mit dir abzustimmen.",
          ],
        },
        {
          zeilen: [
            "Wir nutzen diese Daten, um deine Anfrage zu bearbeiten und mit dir ein Erstgespräch zu vereinbaren. Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen auf deine Anfrage (Art. 6 Abs. 1 lit. b DSGVO).",
          ],
        },
        {
          zeilen: [
            "So läuft die Übermittlung: Der Server bei Vercel nimmt deine Anfrage entgegen und versendet sie als E-Mail über den Mailserver der STRATO GmbH, Otto-Ostrowski-Straße 7, 10249 Berlin, an unser Postfach. Eine Kopie geht zur Absicherung an ein zweites Postfach von uns. Auf der Website selbst wird deine Anfrage nicht gespeichert, es gibt keine Datenbank. Eine automatische Bestätigung senden wir nicht.",
          ],
        },
        {
          zeilen: [
            "Empfänger sind Vercel und STRATO als Auftragsverarbeiter.",
          ],
        },
        {
          zeilen: [
            "Schutz vor Missbrauch: Um zu verhindern, dass das Formular massenhaft genutzt wird, verarbeitet der Server deine IP-Adresse kurzzeitig im Arbeitsspeicher und begrenzt die Zahl der Anfragen je Stunde. Die IP-Adresse wird dabei nicht dauerhaft gespeichert. Rechtsgrundlage ist unser berechtigtes Interesse am Schutz vor Missbrauch (Art. 6 Abs. 1 lit. f DSGVO).",
          ],
        },
        {
          zeilen: [
            "Speicherdauer: Anfragen, aus denen kein Mentoring entsteht, löschen wir spätestens sechs Monate nach dem letzten Kontakt. Entsteht ein Vertrag, bewahren wir die Daten auf, solange gesetzliche Aufbewahrungspflichten es verlangen.",
          ],
        },
      ],
    },
    {
      titel: "5. Kontakt per E-Mail oder Telefon",
      bloecke: [
        {
          zeilen: [
            "Wenn du uns per E-Mail oder Telefon kontaktierst, verarbeiten wir deine Angaben, um dein Anliegen zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn es um ein mögliches Mentoring geht, sonst unser berechtigtes Interesse an der Beantwortung deiner Anfrage (Art. 6 Abs. 1 lit. f DSGVO). Für die Speicherdauer gilt Abschnitt 4.",
          ],
        },
      ],
    },
    {
      titel: "6. Links zu anderen Seiten",
      bloecke: [
        {
          zeilen: [
            "Diese Seite enthält Links zu Instagram, Spotify, hygge-homes.de und zu den Websites unserer Partner GoLet GmbH und Mertens Schabow Steuerberatung. Es handelt sich um einfache Links, nichts davon ist eingebettet. Eine Verbindung zu diesen Anbietern entsteht erst, wenn du einen Link anklickst. Dann gilt die Datenschutzerklärung des jeweiligen Anbieters.",
          ],
        },
      ],
    },
    {
      titel: "7. Verschlüsselung",
      bloecke: [
        {
          zeilen: [
            "Diese Seite nutzt eine TLS-Verschlüsselung. Du erkennst sie an „https://“ in der Adresszeile und am Schloss-Symbol deines Browsers. Daten, die du über das Formular schickst, können während der Übertragung nicht von Dritten mitgelesen werden.",
          ],
        },
      ],
    },
    {
      titel: "8. Deine Rechte",
      bloecke: [
        {
          zeilen: [
            "Du hast das Recht auf Auskunft über deine bei uns gespeicherten Daten (Art. 15 DSGVO), auf Berichtigung (Art. 16 DSGVO), auf Löschung (Art. 17 DSGVO), auf Einschränkung der Verarbeitung (Art. 18 DSGVO) und auf Datenübertragbarkeit (Art. 20 DSGVO). Wende dich dafür an die Kontaktdaten in Abschnitt 2.",
          ],
        },
        {
          vorspann: "Widerspruchsrecht (Art. 21 DSGVO):",
          zeilen: [
            "Verarbeiten wir deine Daten auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO), kannst du dieser Verarbeitung aus Gründen, die sich aus deiner besonderen Situation ergeben, jederzeit widersprechen. Wir verarbeiten deine Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.",
          ],
        },
        {
          zeilen: [
            "Du hast außerdem das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für uns zuständig ist der Landesbeauftragte für den Datenschutz Niedersachsen, Prinzenstraße 5, 30159 Hannover.",
          ],
        },
      ],
    },
    {
      titel: "9. Keine automatisierte Entscheidung",
      bloecke: [
        {
          zeilen: [
            "Wir treffen keine Entscheidungen, die ausschließlich auf einer automatisierten Verarbeitung beruhen, und erstellen keine Profile.",
          ],
        },
      ],
    },
    {
      titel: "10. Änderungen",
      bloecke: [
        {
          zeilen: [
            "Wir passen diese Datenschutzerklärung an, wenn sich die Seite oder die Rechtslage ändert. Es gilt die jeweils hier veröffentlichte Fassung.",
          ],
        },
      ],
    },
  ],
};
