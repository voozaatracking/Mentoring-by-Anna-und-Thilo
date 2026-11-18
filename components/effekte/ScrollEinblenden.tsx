"use client";

import { useEffect } from "react";
import { EINBLENDEN, bewegungReduziert } from "./bewegung";

/**
 * Blendet Elemente mit der Klasse "reveal" beim Scrollen einmalig ein.
 *
 * Der verborgene Ausgangszustand gilt nur, wenn JavaScript aktiv ist: Erst
 * diese Komponente setzt data-einblenden am html-Element. Elemente, die beim
 * Start schon im Sichtbereich oder darüber liegen, bleiben ohne Sprung
 * sichtbar. Ohne JavaScript und bei prefers-reduced-motion ist alles sichtbar.
 */
export function ScrollEinblenden() {
  useEffect(() => {
    if (bewegungReduziert() || !("IntersectionObserver" in window)) return;

    const wurzel = document.documentElement;
    const elemente = Array.from(
      document.querySelectorAll<HTMLElement>(`.${EINBLENDEN}:not(.ist-sichtbar)`),
    );
    const sichtgrenze = window.innerHeight;
    const wartend: HTMLElement[] = [];
    for (const element of elemente) {
      if (element.getBoundingClientRect().top < sichtgrenze) {
        element.classList.add("ist-sichtbar");
      } else {
        wartend.push(element);
      }
    }
    wurzel.dataset.einblenden = "an";

    const beobachter = new IntersectionObserver(
      (eintraege) => {
        for (const eintrag of eintraege) {
          if (!eintrag.isIntersecting) continue;
          eintrag.target.classList.add("ist-sichtbar");
          beobachter.unobserve(eintrag.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    for (const element of wartend) beobachter.observe(element);

    return () => {
      beobachter.disconnect();
      delete wurzel.dataset.einblenden;
    };
  }, []);

  return null;
}
