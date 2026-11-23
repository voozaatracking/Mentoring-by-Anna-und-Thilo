import { EINBLENDEN, staffel } from "@/components/effekte/bewegung";
import { Bild } from "@/components/ui/Bild";
import { ExternerLink } from "@/components/ui/ExternerLink";
import { Logo } from "@/components/ui/Logo";
import { inhalte, type BildName } from "@/content/site";

/*
 * Bildausschnitte der Partnerfotos im Rahmen 3:2.
 *
 * partnerGolet: Das PNG hat transparente runde Ecken und am rechten Rand
 * eine halbtransparente Pixelspalte. Der Ausschnitt bei 18 Prozent von oben
 * schneidet die Ecken weg, die leichte Skalierung schiebt die Ränder aus dem
 * Rahmen. Der Kopf bleibt vollständig sichtbar, es entsteht keine helle Kante.
 *
 * partnerMertensSchabow: mittig. Der Rahmen zeigt 82 Prozent der Bildbreite,
 * alle sechs Gesichter liegen innerhalb.
 */
const AUSSCHNITT: Partial<Record<BildName, string>> = {
  partnerGolet: "object-[center_18%] scale-[1.03]",
  partnerMertensSchabow: "object-center",
};

/* Logos klein und linksbündig. Maße in Pixeln, Farben bleiben unverändert. */
const LOGO: Partial<
  Record<BildName, { hoehe: number; breite?: number; klasse?: string }>
> = {
  logoGolet: { hoehe: 28 },
  logoMertensSchabow: { hoehe: 40, breite: 40, klasse: "rounded-[8px]" },
};

/**
 * Partner für Baurecht und Steuern. Block im Abschnitt Inhalte, direkt unter
 * dem Hinweis zur Rechts- und Steuerberatung. Je Karte von oben nach unten:
 * Foto, Logo, Titel, Bildzeile, Text, Link. Die Bilder sind nicht verlinkt.
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
        {partner.karten.map((karte, index) => {
          const logo = LOGO[karte.logo] ?? { hoehe: 28 };
          return (
            <li
              key={karte.titel}
              className={`karte ${EINBLENDEN} flex flex-col overflow-hidden p-0 md:p-0`}
              style={staffel(index)}
            >
              {/* Foto über die volle Kartenbreite. Die Karte rundet die oberen Ecken. */}
              <Bild
                name={karte.bild}
                sizes="(min-width: 1184px) 548px, (min-width: 768px) 50vw, 100vw"
                className="aspect-[3/2] w-full rounded-none"
                bildKlasse={AUSSCHNITT[karte.bild] ?? "object-center"}
              />
              <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
                {/* Zeile mit fester Höhe, damit die Titel beider Karten auf einer Linie stehen. */}
                <div className="flex h-10 items-center">
                  <Logo
                    name={karte.logo}
                    hoehe={logo.hoehe}
                    breite={logo.breite}
                    className={logo.klasse}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="titel-karte">{karte.titel}</h4>
                  <p className="text-klein text-muted">{karte.bildzeile}</p>
                </div>
                <p className="text-klein">{karte.text}</p>
                <p className="text-klein mt-auto">
                  <ExternerLink href={karte.link.href}>
                    {karte.link.label}
                  </ExternerLink>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <p className={`text-klein ${EINBLENDEN} mt-6`}>{partner.schlusszeile}</p>
    </div>
  );
}
