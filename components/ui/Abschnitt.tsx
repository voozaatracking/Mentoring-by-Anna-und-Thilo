import type { ReactNode } from "react";
import { EINBLENDEN } from "@/components/effekte/bewegung";

/** Abschnitt des Onepagers. Der Ton wechselt zwischen --bg und --soft. */
export function Abschnitt({
  id,
  ton = "bg",
  titelId,
  children,
  className = "",
}: {
  id: string;
  ton?: "bg" | "soft";
  /** id der Überschrift, die den Abschnitt benennt. */
  titelId?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-ton={ton}
      aria-labelledby={titelId}
      className={`abschnitt ${className}`}
    >
      <div className="rahmen">{children}</div>
    </section>
  );
}

/** Kleinzeile, Überschrift und Einleitung eines Abschnitts. */
export function AbschnittsKopf({
  kleinzeile,
  titel,
  titelId,
  unterzeile,
  text,
  className = "",
}: {
  kleinzeile?: string;
  titel: string;
  titelId: string;
  /** Kurze Zeile direkt unter der Überschrift. */
  unterzeile?: string;
  /** Ein Absatz oder mehrere Absätze. */
  text?: string | string[];
  className?: string;
}) {
  const absaetze = text === undefined ? [] : [text].flat();
  return (
    <div className={`${EINBLENDEN} flex flex-col gap-4 ${className}`}>
      {kleinzeile ? <p className="kleinzeile">{kleinzeile}</p> : null}
      <h2 id={titelId}>{titel}</h2>
      {unterzeile ? <p className="unterzeile">{unterzeile}</p> : null}
      {absaetze.map((absatz) => (
        <p key={absatz}>{absatz}</p>
      ))}
    </div>
  );
}
