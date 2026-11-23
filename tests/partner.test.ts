import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Partner } from "@/components/abschnitte/Partner";
import { ablauf, fragen, inhalte, paket } from "@/content/site";

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

  it("zeigt keine Logos und keine Bilder und nennt keine Vergütung", () => {
    expect(html).not.toMatch(/<img|<picture|<svg|<iframe|<script/);
    expect(html).not.toMatch(/Provision|Vergütung|Affiliate|Werbung/i);
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
