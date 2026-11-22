import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Partner } from "@/components/abschnitte/Partner";
import { fragen, inhalte } from "@/content/site";

const html = renderToStaticMarkup(createElement(Partner));
const links = [...html.matchAll(/<a [^>]*>/g)].map((treffer) => treffer[0]);

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
      "Für Baurecht und Steuern holen wir Fachleute dazu, mit denen wir selbst zusammenarbeiten.",
      "GoLet GmbH",
      "Nutzungsänderung und Bauantrag für Ferienwohnungen.",
      "Mertens Schabow Steuerberatung",
      "Steuerberatung aus Hamburg, unter anderem für Immobilien.",
      "Die Leistungen unserer Partner beauftragst du direkt bei ihnen. Ob du das tust, entscheidest du selbst.",
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

  it("zeigt keine Logos und keine Bilder und nennt keine Vergütung", () => {
    expect(html).not.toMatch(/<img|<picture|<svg|<iframe|<script/);
    expect(html).not.toMatch(/Provision|Vergütung|Affiliate|Werbung/i);
  });

  it("verweist in der Frage zur Rechts- und Steuerberatung auf die Partner", () => {
    const eintrag = fragen.eintraege.find(
      (frage) => frage.frage === "Ist das Mentoring eine Rechts- oder Steuerberatung?",
    );
    expect(eintrag?.antwort).toBe(
      "Nein. Wir teilen unsere Erfahrung aus der Praxis. Für Verträge, Nutzungsänderung und Steuern brauchst du Fachleute. Wir sagen dir, wann. Für diese Fragen kannst du auf unsere Partner zurückgreifen.",
    );
    // Keine neue Frage: Es bleibt bei neun.
    expect(fragen.eintraege).toHaveLength(9);
  });
});
