import Link from "next/link";
import { fusszeile, ui } from "@/content/site";

export function Fusszeile() {
  return (
    <footer className="border-t border-line bg-soft py-10">
      <div className="rahmen flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="text-klein">{fusszeile.text}</p>
        <nav aria-label={ui.fussnavigation}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {fusszeile.links.map((link) => (
              <li key={link.href} className="text-klein">
                {link.extern ? (
                  <a href={link.href} target="_blank" rel="noopener">
                    {link.label}
                    <span className="sr-only"> {ui.neuerTab}</span>
                  </a>
                ) : (
                  <Link href={link.href}>{link.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
