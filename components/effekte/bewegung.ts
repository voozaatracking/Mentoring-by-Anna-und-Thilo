import type { CSSProperties } from "react";

/** Klasse für das Einblenden beim Scrollen. Wirkt nur mit aktivem JavaScript. */
export const EINBLENDEN = "reveal";

/** Staffelt Elemente einer Gruppe um je 80ms. */
export function staffel(index: number): CSSProperties {
  return { "--reveal-i": index } as CSSProperties;
}

/** Wahr, wenn Bewegung reduziert werden soll. Dann bleiben alle Effekte aus. */
export function bewegungReduziert(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Ruft die Funktion beim Scrollen und bei Größenänderung höchstens einmal
 * je Bild auf (requestAnimationFrame). Gibt eine Aufräumfunktion zurück.
 */
export function beiScroll(aktualisiere: () => void): () => void {
  let bild = 0;
  const plane = () => {
    if (bild !== 0) return;
    bild = window.requestAnimationFrame(() => {
      bild = 0;
      aktualisiere();
    });
  };
  aktualisiere();
  window.addEventListener("scroll", plane, { passive: true });
  window.addEventListener("resize", plane);
  return () => {
    window.removeEventListener("scroll", plane);
    window.removeEventListener("resize", plane);
    if (bild !== 0) window.cancelAnimationFrame(bild);
  };
}
