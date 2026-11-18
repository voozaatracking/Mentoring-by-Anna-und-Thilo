import {
  SHOW_PLACEHOLDER_MARKS,
  ui,
  type Platzhalter,
} from "@/content/site";

/** Kleines Etikett für Inhalte, die noch ersetzt werden müssen. */
export function PlatzhalterEtikett({ hinweis }: { hinweis?: string }) {
  if (!SHOW_PLACEHOLDER_MARKS) return null;
  return (
    <span className="platzhalter-zeile">
      <span className="platzhalter-etikett">{ui.platzhalterEtikett}</span>
      {hinweis ? <span className="platzhalter-hinweis">{hinweis}</span> : null}
    </span>
  );
}

/** Eigenständiger Platzhalter ohne vorläufigen Inhalt. */
export function PlatzhalterBox({
  platzhalter,
  className = "",
}: {
  platzhalter: Platzhalter;
  className?: string;
}) {
  if (!SHOW_PLACEHOLDER_MARKS) return null;
  return (
    <div className={`platzhalter-box ${className}`}>
      <PlatzhalterEtikett hinweis={platzhalter.hinweis} />
    </div>
  );
}
