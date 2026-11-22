import { Abschnitt, AbschnittsKopf } from "@/components/ui/Abschnitt";
import { EINBLENDEN } from "@/components/effekte/bewegung";
import { Zeitleiste } from "@/components/effekte/Zeitleiste";
import { Bild } from "@/components/ui/Bild";
import { ablauf } from "@/content/site";

export function Ablauf() {
  return (
    <Abschnitt id={ablauf.id} titelId="ablauf-titel">
      <AbschnittsKopf
        titel={ablauf.titel}
        titelId="ablauf-titel"
        unterzeile={ablauf.unterzeile}
        text={ablauf.text}
      />

      {/* Bild im Hochformat neben der senkrechten Zeitleiste */}
      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <Bild
          name="weg"
          sizes="(min-width: 768px) 40vw, 100vw"
          className={`${EINBLENDEN} aspect-[2/3] w-full max-w-[420px]`}
        />
        {/* Vier Schritte ohne Zeitangabe. Die Linie füllt sich beim Scrollen. */}
        <Zeitleiste label={ablauf.zeitleisteLabel}>
          {ablauf.schritte.map((schritt, index) => (
            <li key={schritt.titel} className="zeitleiste-eintrag">
              <span className="zeitleiste-punkt" aria-hidden="true" />
              <p className="kleinzeile" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1">{schritt.titel}</h3>
              <p className="text-klein mt-2">{schritt.text}</p>
            </li>
          ))}
        </Zeitleiste>
      </div>
    </Abschnitt>
  );
}
