import { EINBLENDEN, staffel } from "@/components/effekte/bewegung";
import { ExternerLink } from "@/components/ui/ExternerLink";
import { inhalte } from "@/content/site";

/**
 * Partner für Baurecht und Steuern. Block im Abschnitt Inhalte, direkt unter
 * dem Hinweis zur Rechts- und Steuerberatung. Nur Firmennamen und einfache
 * Links, keine Logos und keine Bilder.
 */
export function Partner() {
  const { partner } = inhalte;
  return (
    <div className="mt-14 md:mt-20">
      <h3 id="partner-titel" className={EINBLENDEN}>
        {partner.titel}
      </h3>
      <p className={`text-klein ${EINBLENDEN} mt-2`}>{partner.text}</p>
      <ul
        aria-labelledby="partner-titel"
        className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6"
      >
        {partner.karten.map((karte, index) => (
          <li
            key={karte.titel}
            className={`karte ${EINBLENDEN} flex flex-col gap-3`}
            style={staffel(index)}
          >
            <h4 className="titel-karte">{karte.titel}</h4>
            <p className="text-klein">{karte.text}</p>
            <p className="text-klein mt-auto">
              <ExternerLink href={karte.link.href}>
                {karte.link.label}
              </ExternerLink>
            </p>
          </li>
        ))}
      </ul>
      <p className={`text-klein ${EINBLENDEN} mt-6`}>{partner.schlusszeile}</p>
    </div>
  );
}
