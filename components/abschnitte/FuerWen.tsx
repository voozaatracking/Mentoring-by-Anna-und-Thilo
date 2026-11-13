import { EINBLENDEN, staffel } from "@/components/effekte/bewegung";
import { Abschnitt } from "@/components/ui/Abschnitt";
import { Haken, Kreuz } from "@/components/ui/Symbole";
import { fuerWen } from "@/content/site";

export function FuerWen() {
  return (
    <Abschnitt id={fuerWen.id} titelId="fuer-wen-titel">
      <h2 id="fuer-wen-titel" className={EINBLENDEN}>{fuerWen.titel}</h2>
      <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
        <div
          className={`karte ${EINBLENDEN} flex flex-col gap-4`}
          data-akzent="salbei"
        >
          <h3 id="passt-titel">{fuerWen.passt.titel}</h3>
          <ul aria-labelledby="passt-titel" className="flex flex-col gap-3">
            {fuerWen.passt.punkte.map((punkt) => (
              <li key={punkt} className="text-klein flex gap-3">
                <Haken className="mt-[0.2em] shrink-0 text-sage" />
                <span>{punkt}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`karte ${EINBLENDEN} flex flex-col gap-4`}
          style={staffel(1)}
        >
          <h3 id="passt-nicht-titel">{fuerWen.passtNicht.titel}</h3>
          <ul
            aria-labelledby="passt-nicht-titel"
            className="flex flex-col gap-3"
          >
            {fuerWen.passtNicht.punkte.map((punkt) => (
              <li key={punkt} className="text-klein flex gap-3">
                <Kreuz className="mt-[0.2em] shrink-0 text-taupe" />
                <span>{punkt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Abschnitt>
  );
}
