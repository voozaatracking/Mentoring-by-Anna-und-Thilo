import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

/*
 * Bild und Logo laden Dateien über next/image. Für den Test stehen einfache
 * Platzhalter an ihrer Stelle, damit Reihenfolge, Texte und Links der
 * Karten ohne Bildverarbeitung prüfbar sind.
 */
vi.mock("@/components/ui/Bild", () => ({
  Bild: ({ name, bildKlasse }: { name: string; bildKlasse?: string }) =>
    createElement("img", { "data-foto": name, "data-klasse": bildKlasse }),
}));
vi.mock("@/components/ui/Logo", () => ({
  Logo: ({ name, hoehe, breite, className }: { name: string; hoehe: number; breite?: number; className?: string }) =>
    createElement("img", { "data-logo": name, "data-hoehe": hoehe, "data-breite": breite, "data-klasse": className }),
}));

import { Partner } from "@/components/abschnitte/Partner";
import { ablauf, bilder, fragen, inhalte, paket } from "@/content/site";

const html = renderToStaticMarkup(createElement(Partner));
const links = [...html.matchAll(/<a [^>]*>/g)].map((treffer) => treffer[0]);
const karten = html.split("<li").slice(1);

describe("Partnerblock im Abschnitt Inhalte", () => {
  it("zeigt Überschrift, Einleitung, zwei Karten und Schlusszeile", () => {
    const { partner } = inhalte;
    expect(partner.titel).toBe("Unsere Partner");
    expect(partner.karten.map((karte) => karte.titel)).toEqual([
      "GoLet GmbH",
      "Mertens Schabow Steuerberatung",
    ]);
    for (const text of [
      "Unsere Partner",
      "Für Baurecht und Steuern holen wir Fachleute dazu, mit denen wir selbst zusammenarbeiten. Im Mentoring gibt es Calls mit unseren Partnern und Videos von ihnen.",
      "GoLet GmbH",
      "Nutzungsänderung und Bauantrag für Ferienwohnungen.",
      "Mertens Schabow Steuerberatung",
      "Steuerberatung aus Hamburg, unter anderem für Immobilien.",
      "Brauchst du Beratung für dein Objekt, beauftragst du unsere Partner direkt. Ob du das tust, entscheidest du selbst.",
    ]) {
      expect(html).toContain(text);
    }
  });

  it("verlinkt beide Partner in neuem Tab mit rel noopener noreferrer", () => {
    expect(links).toHaveLength(2);
    expect(links[0]).toContain('href="https://golet.de"');
    expect(links[1]).toContain('href="https://mertens-schabow.de"');
    for (const link of links) {
      expect(link).toContain('target="_blank"');
      expect(link).toContain('rel="noopener noreferrer"');
    }
    expect(html).toContain(">golet.de<");
    expect(html).toContain(">mertens-schabow.de<");
  });

  it("nutzt Links ohne Tracking-Parameter", () => {
    for (const karte of inhalte.partner.karten) {
      const ziel = new URL(karte.link.href);
      expect(ziel.protocol).toBe("https:");
      expect(ziel.search).toBe("");
      expect(ziel.hash).toBe("");
      expect(ziel.pathname).toBe("/");
    }
  });

  it("zeigt je Karte Foto, Logo, Titel, Bildzeile, Text und Link in dieser Reihenfolge", () => {
    expect(karten).toHaveLength(2);
    const erwartet = [
      {
        foto: 'data-foto="partnerGolet"',
        logo: 'data-logo="logoGolet"',
        titel: "GoLet GmbH",
        bildzeile: "Johannes Leutgeb, Geschäftsführer",
        text: "Nutzungsänderung und Bauantrag für Ferienwohnungen.",
        link: 'href="https://golet.de"',
      },
      {
        foto: 'data-foto="partnerMertensSchabow"',
        logo: 'data-logo="logoMertensSchabow"',
        titel: "Mertens Schabow Steuerberatung",
        bildzeile: "Das Team der Kanzlei",
        text: "Steuerberatung aus Hamburg, unter anderem für Immobilien.",
        link: 'href="https://mertens-schabow.de"',
      },
    ];
    erwartet.forEach((teile, index) => {
      const positionen = Object.values(teile).map((teil) => karten[index].indexOf(teil));
      // Jeder Teil kommt vor und steht hinter dem vorherigen.
      expect(positionen.every((position) => position >= 0)).toBe(true);
      expect(positionen).toEqual([...positionen].sort((a, b) => a - b));
    });
  });

  it("setzt Logos in fester Größe und den Ausschnitt der Fotos", () => {
    // GoLet 28 Pixel hoch, Mertens Schabow 40 mal 40 Pixel mit Radius 8 Pixel.
    expect(html).toContain('data-logo="logoGolet" data-hoehe="28"');
    expect(html).toMatch(
      /data-logo="logoMertensSchabow" data-hoehe="40" data-breite="40" data-klasse="rounded-\[8px\]"/,
    );
    // Das Foto von GoLet braucht den Ausschnitt bei 18 Prozent und eine leichte Skalierung.
    expect(html).toMatch(/data-foto="partnerGolet" data-klasse="object-\[center_18%\] scale-\[1\.03\]"/);
    expect(html).toContain('data-foto="partnerMertensSchabow" data-klasse="object-center"');
    // Logos bleiben farblich unverändert: kein Filter, kein Umfärben.
    expect(html).not.toMatch(/grayscale|invert|brightness|filter|mix-blend/);
  });

  it("verlinkt die Bilder nicht und nennt keine Vergütung", () => {
    expect([...html.matchAll(/<img /g)]).toHaveLength(4);
    // Kein Bild steht innerhalb eines Links.
    for (const link of html.matchAll(/<a [^>]*>[\s\S]*?<\/a>/g)) {
      expect(link[0]).not.toContain("<img");
    }
    expect(html).not.toMatch(/<iframe|<script/);
    expect(html).not.toMatch(/Provision|Vergütung|Affiliate|Werbung/i);
  });

  it("hat für Fotos und Logos der Partner die vorgegebenen Alt-Texte", () => {
    expect(bilder.partnerGolet.alt).toBe(
      "Johannes Leutgeb im grauen Pullover sitzt an einem Holztisch und lacht in die Kamera",
    );
    expect(bilder.partnerMertensSchabow.alt).toBe(
      "Sechs Personen aus dem Team von Mertens Schabow auf und hinter einem grauen Sofa, alle lächeln in die Kamera",
    );
    expect(bilder.logoGolet.alt).toBe("Logo der GoLet GmbH");
    expect(bilder.logoMertensSchabow.alt).toBe("Logo von Mertens Schabow");
  });

  it("nennt die Calls mit den Partnern in Schritt 3, aber nicht in der Liste Enthalten", () => {
    // Entscheidung: Die Seite sagt, dass es Calls mit den Partnern gibt.
    // Sie sagt nicht, ob diese enthalten sind.
    expect(ablauf.schritte[2]).toEqual({
      titel: "Umsetzung mit Begleitung",
      text: "Du setzt um, wir begleiten dich. In persönlichen 1:1-Calls und per WhatsApp zwischen den Terminen. Dazu Videos und Vorlagen, die du nutzt, wenn es in deinen Alltag passt. Für Baurecht und Steuern gibt es Calls mit unseren Partnern.",
    });
    expect(paket.enthalten.punkte).toEqual([
      "Persönliche 1:1-Calls",
      "WhatsApp-Austausch zwischen den Terminen",
      "Lernvideos und Vorlagen",
      "Zugang zu unserer Objektanalyse im vereinbarten Umfang",
      "Dein persönlicher Fahrplan",
    ]);
    // Der Hinweis zur Rechts- und Steuerberatung bleibt unverändert.
    expect(inhalte.hinweis).toBe(
      "Das Mentoring ersetzt keine Rechts- oder Steuerberatung. Wir sagen dir, an welchen Stellen du sie brauchst.",
    );
  });

  it("verweist in der Frage zur Rechts- und Steuerberatung auf die Partner", () => {
    const eintrag = fragen.eintraege.find(
      (frage) => frage.frage === "Ist das Mentoring eine Rechts- oder Steuerberatung?",
    );
    expect(eintrag?.antwort).toBe(
      "Nein. Wir teilen unsere Erfahrung aus der Praxis. Für Verträge, Nutzungsänderung und Steuern brauchst du Fachleute. Wir sagen dir, wann. Dafür gibt es Calls mit unseren Partnern. Eine Beratung zu deinem Einzelfall beauftragst du direkt bei ihnen.",
    );
    // Keine neue Frage: Es bleibt bei neun.
    expect(fragen.eintraege).toHaveLength(9);
  });
});
