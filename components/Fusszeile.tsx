import Link from "next/link";
import { fusszeile, ui, type FussVerweis } from "@/content/site";

/** Interner Verweis, externer Verweis in neuem Tab oder Telefonlink. */
function FussLink({ link }: { link: FussVerweis }) {
  if (link.extern) {
    return (
      <a href={link.href} target="_blank" rel={link.rel ?? "noopener"}>
        {link.label}
        <span className="sr-only"> {ui.neuerTab}</span>
      </a>
    );
  }
  if (link.href.startsWith("/")) {
    return <Link href={link.href}>{link.label}</Link>;
  }
  return <a href={link.href}>{link.label}</a>;
}

export function Fusszeile() {
  return (
    <footer className="border-t border-line bg-soft py-10">
      <div className="rahmen flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-klein">{fusszeile.text}</p>
          <ul
            aria-label={fusszeile.kontaktLabel}
            className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6"
          >
            {fusszeile.kontakt.map((eintrag) => (
              <li key={eintrag.href} className="text-klein">
                <span className="text-muted">{eintrag.art}: </span>
                <FussLink link={eintrag} />
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label={ui.fussnavigation}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {fusszeile.links.map((link) => (
              <li key={link.href} className="text-klein">
                <FussLink link={link} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
