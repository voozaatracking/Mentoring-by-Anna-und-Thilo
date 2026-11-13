"use client";

import { useEffect, useRef } from "react";
import { bewegungReduziert } from "./bewegung";

/** Dauer des Hochzählens in Millisekunden. */
const DAUER = 1200;

/**
 * Kennzahl, die einmal hochzählt, sobald sie sichtbar wird. Der echte Wert
 * steht für Screenreader immer im DOM. Die sichtbare Zahl ist aria-hidden
 * und zeigt ohne JavaScript ebenfalls den echten Wert.
 */
export function Zaehler({ wert, vorsatz }: { wert: number; vorsatz?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const gezaehlt = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || gezaehlt.current) return;
    if (bewegungReduziert() || !("IntersectionObserver" in window)) return;

    let bild = 0;
    const beobachter = new IntersectionObserver(
      (eintraege) => {
        if (!eintraege.some((eintrag) => eintrag.isIntersecting)) return;
        beobachter.disconnect();
        gezaehlt.current = true;
        const start = performance.now();
        const schritt = (jetzt: number) => {
          const zeit = Math.min(1, (jetzt - start) / DAUER);
          const anteil = 1 - Math.pow(1 - zeit, 3);
          element.textContent = String(Math.round(wert * anteil));
          if (zeit < 1) bild = window.requestAnimationFrame(schritt);
        };
        bild = window.requestAnimationFrame(schritt);
      },
      { threshold: 0.6 },
    );
    beobachter.observe(element);

    return () => {
      beobachter.disconnect();
      window.cancelAnimationFrame(bild);
      element.textContent = String(wert);
    };
  }, [wert]);

  return (
    <>
      <span className="sr-only">
        {vorsatz ? `${vorsatz} ${wert}` : wert}
      </span>
      <span aria-hidden="true">
        {vorsatz ? <span className="kennzahl-vorsatz">{vorsatz} </span> : null}
        <span ref={ref}>{wert}</span>
      </span>
    </>
  );
}
