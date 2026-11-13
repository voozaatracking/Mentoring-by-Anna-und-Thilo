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
  text,
  className = "",
}: {
  kleinzeile?: string;
  titel: string;
  titelId: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={`${EINBLENDEN} flex flex-col gap-4 ${className}`}>
      {kleinzeile ? <p className="kleinzeile">{kleinzeile}</p> : null}
      <h2 id={titelId}>{titel}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
