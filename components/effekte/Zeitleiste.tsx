"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { beiScroll, bewegungReduziert } from "./bewegung";

/**
 * Senkrechte Zeitleiste, deren Linie sich mit dem Scrollfortschritt füllt.
 * Ohne JavaScript und bei prefers-reduced-motion ist die Linie voll.
 */
export function Zeitleiste({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const liste = ref.current;
    if (!liste || bewegungReduziert()) return;
    const aufraeumen = beiScroll(() => {
      const flaeche = liste.getBoundingClientRect();
      // Die Linie füllt sich, während die Liste durch die Bildschirmmitte läuft.
      const start = window.innerHeight * 0.6;
      const anteil = (start - flaeche.top) / (flaeche.height || 1);
      liste.style.setProperty(
        "--fortschritt",
        Math.min(1, Math.max(0, anteil)).toFixed(3),
      );
    });
    return () => {
      aufraeumen();
      liste.style.removeProperty("--fortschritt");
    };
  }, []);

  return (
    <ol ref={ref} aria-label={label} className="zeitleiste">
      {children}
    </ol>
  );
}
