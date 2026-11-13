import { Abschnitt, AbschnittsKopf } from "@/components/ui/Abschnitt";
import { EINBLENDEN, staffel } from "@/components/effekte/bewegung";
import { frage } from "@/content/site";

export function Frage() {
  return (
    <Abschnitt id={frage.id} ton="soft" titelId="frage-titel">
      <AbschnittsKopf
        kleinzeile={frage.kleinzeile}
        titel={frage.titel}
        titelId="frage-titel"
        text={frage.text}
      />
      <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
        {frage.karten.map((karte, index) => (
          <li
            key={karte.titel}
            className={`karte ${EINBLENDEN} flex flex-col gap-3`}
            style={staffel(index)}
          >
            <h3>{karte.titel}</h3>
            <p className="text-klein">{karte.text}</p>
          </li>
        ))}
      </ul>
    </Abschnitt>
  );
}
