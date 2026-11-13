import { Abschnitt, AbschnittsKopf } from "@/components/ui/Abschnitt";
import { EINBLENDEN } from "@/components/effekte/bewegung";
import { Zeitleiste } from "@/components/effekte/Zeitleiste";
import { Bild } from "@/components/ui/Bild";
import { PlatzhalterBox, PlatzhalterEtikett } from "@/components/ui/Platzhalter";
import { ablauf } from "@/content/site";

export function Ablauf() {
  return (
    <Abschnitt id={ablauf.id} titelId="ablauf-titel">
      <AbschnittsKopf
        kleinzeile={ablauf.kleinzeile}
        titel={ablauf.titel}
        titelId="ablauf-titel"
        text={ablauf.text}
      />

      {/* Bild im Hochformat neben der senkrechten Zeitleiste */}
      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <Bild
          name="weg"
          sizes="(min-width: 768px) 40vw, 100vw"
          className={`${EINBLENDEN} aspect-[2/3] w-full max-w-[420px]`}
        />
        <div className="flex flex-col gap-8">
          <Zeitleiste label={ablauf.zeitleisteLabel}>
            {ablauf.eintraege.map((eintrag) => (
              <li key={eintrag.label} className="zeitleiste-eintrag">
                <span className="zeitleiste-punkt" aria-hidden="true" />
                <p className="kleinzeile">{eintrag.label}</p>
                <h3 className="mt-1">{eintrag.titel}</h3>
                <p className="text-klein mt-2">{eintrag.text}</p>
                <p className="mt-2">
                  <PlatzhalterEtikett hinweis={eintrag.hinweis} />
                </p>
              </li>
            ))}
          </Zeitleiste>
          <PlatzhalterBox platzhalter={ablauf.format} />
        </div>
      </div>
    </Abschnitt>
  );
}
