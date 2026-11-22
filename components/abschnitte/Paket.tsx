import { EINBLENDEN, staffel } from "@/components/effekte/bewegung";
import { Abschnitt, AbschnittsKopf } from "@/components/ui/Abschnitt";
import { KnopfLink } from "@/components/ui/Knopf";
import { Haken } from "@/components/ui/Symbole";
import { paket } from "@/content/site";

/** Beispielpaket: fünf Phasen, enthaltene Bausteine und Schlusszeile ohne Preis. */
export function Paket() {
  return (
    <Abschnitt id={paket.id} titelId="paket-titel">
      <AbschnittsKopf
        titel={paket.titel}
        titelId="paket-titel"
        text={paket.text}
      />

      <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start lg:gap-16">
        {/* Fünf Phasen als nummerierte Liste */}
        <ol aria-label={paket.phasenLabel} className="flex flex-col">
          {paket.phasen.map((phase, index) => (
            <li
              key={phase.titel}
              className={`${EINBLENDEN} flex max-w-none gap-5 border-t border-taupe py-5 last:border-b`}
              style={staffel(index)}
            >
              <span className="nummer w-10 shrink-0" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h3>{phase.titel}</h3>
                <p className="text-klein">{phase.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={`karte ${EINBLENDEN} flex flex-col gap-6 md:p-8`}>
          <h3 id="paket-enthalten-titel">{paket.enthalten.titel}</h3>
          <ul
            aria-labelledby="paket-enthalten-titel"
            className="flex flex-col gap-3"
          >
            {paket.enthalten.punkte.map((punkt) => (
              <li key={punkt} className="text-klein flex gap-3">
                <Haken className="mt-[0.2em] shrink-0 text-sage" />
                <span>{punkt}</span>
              </li>
            ))}
          </ul>
          <p className="border-t border-line pt-5 font-medium">
            {paket.schlusszeile}
          </p>
          <KnopfLink href={paket.cta.href} className="self-start">
            {paket.cta.label}
          </KnopfLink>
        </div>
      </div>
    </Abschnitt>
  );
}
