import { EINBLENDEN } from "@/components/effekte/bewegung";
import { Abschnitt } from "@/components/ui/Abschnitt";
import { KnopfLink } from "@/components/ui/Knopf";
import { PlatzhalterEtikett } from "@/components/ui/Platzhalter";
import { Haken } from "@/components/ui/Symbole";
import { istPlatzhalter, paket } from "@/content/site";

export function Paket() {
  const { karte } = paket;
  return (
    <Abschnitt id={paket.id} titelId="paket-titel">
      <h2 id="paket-titel" className={EINBLENDEN}>{paket.titel}</h2>
      <div
        className={`karte ${EINBLENDEN} mt-10 flex max-w-[640px] flex-col gap-6 md:mt-14 md:p-8`}
      >
        <h3 id="paket-karte-titel">{karte.titel}</h3>
        <ul aria-labelledby="paket-karte-titel" className="flex flex-col gap-3">
          {karte.punkte.map((punkt) =>
            istPlatzhalter(punkt) ? (
              <li key={punkt.hinweis} className="flex gap-3">
                <Haken className="mt-[0.3em] shrink-0 text-taupe" />
                <PlatzhalterEtikett hinweis={punkt.hinweis} />
              </li>
            ) : (
              <li key={punkt} className="flex gap-3">
                <Haken className="mt-[0.3em] shrink-0 text-sage" />
                <span>{punkt}</span>
              </li>
            ),
          )}
        </ul>
        <div className="flex flex-col gap-2 border-t border-line pt-5">
          <p className="kleinzeile">{karte.preisLabel}</p>
          <p>
            <PlatzhalterEtikett hinweis={karte.preis.hinweis} />
          </p>
        </div>
        <p className="text-klein">{karte.satz}</p>
        <KnopfLink href={karte.cta.href} className="self-start">
          {karte.cta.label}
        </KnopfLink>
      </div>
    </Abschnitt>
  );
}
