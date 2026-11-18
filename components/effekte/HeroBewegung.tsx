"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { beiScroll, bewegungReduziert } from "./bewegung";

/** Größte Verschiebung des Einstiegsbilds beim Scrollen in Pixeln. */
const MAX_VERSATZ = 40;

/**
 * Verschiebt das Einstiegsbild beim Scrollen um bis zu 40px. Die Komponente
 * setzt nur die CSS-Variable --hero-versatz. Die Skalierung beim Laden
 * (1.06 auf 1 in 1,8s) ist reines CSS an der Klasse hero-bild.
 */
export function HeroBewegung({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || bewegungReduziert()) return;
    return beiScroll(() => {
      const hoehe = element.offsetHeight || 1;
      const anteil = Math.min(1, Math.max(0, window.scrollY / hoehe));
      element.style.setProperty(
        "--hero-versatz",
        `${(anteil * MAX_VERSATZ).toFixed(1)}px`,
      );
    });
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
