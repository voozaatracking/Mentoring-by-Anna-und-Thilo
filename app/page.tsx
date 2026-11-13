import { Abschnitt, AbschnittsKopf } from "@/components/ui/Abschnitt";
import { Bild } from "@/components/ui/Bild";
import { Hinweis } from "@/components/ui/Hinweis";
import { KnopfLink } from "@/components/ui/Knopf";
import { PlatzhalterBox } from "@/components/ui/Platzhalter";
import {
  bilder,
  einstieg,
  erstgespraech,
  frage,
  inhalte,
  type BildName,
} from "@/content/site";

/* Vorläufige Startseite: zeigt die Bausteine des Designsystems. */
export default function Startseite() {
  return (
    <>
      <Abschnitt id="einstieg" titelId="einstieg-titel">
        <div className="flex flex-col gap-6">
          <p className="kleinzeile">{einstieg.kleinzeile}</p>
          <h1 id="einstieg-titel">{einstieg.titel}</h1>
          <p>{einstieg.text}</p>
          <div className="flex flex-wrap gap-3">
            <KnopfLink href={einstieg.primaer.href}>
              {einstieg.primaer.label}
            </KnopfLink>
            <KnopfLink href={einstieg.sekundaer.href} variante="sekundaer">
              {einstieg.sekundaer.label}
            </KnopfLink>
          </div>
        </div>
      </Abschnitt>
      <Abschnitt id={frage.id} ton="soft" titelId="frage-titel">
        <AbschnittsKopf
          kleinzeile={frage.kleinzeile}
          titel={frage.titel}
          titelId="frage-titel"
          text={frage.text}
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {frage.karten.map((karte) => (
            <li key={karte.titel} className="karte flex flex-col gap-3">
              <h3>{karte.titel}</h3>
              <p className="text-klein">{karte.text}</p>
            </li>
          ))}
        </ul>
        <Hinweis className="mt-8">
          <p>{inhalte.hinweis}</p>
        </Hinweis>
        <PlatzhalterBox className="mt-4" platzhalter={erstgespraech.rahmen} />
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {(Object.keys(bilder) as BildName[]).map((name) => (
            <li key={name}>
              <Bild
                name={name}
                sizes="(min-width: 768px) 25vw, 50vw"
                className="aspect-square"
              />
            </li>
          ))}
        </ul>
      </Abschnitt>
    </>
  );
}
