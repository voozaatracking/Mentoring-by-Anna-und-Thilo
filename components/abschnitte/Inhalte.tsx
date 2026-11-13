import { Abschnitt, AbschnittsKopf } from "@/components/ui/Abschnitt";
import { Bild } from "@/components/ui/Bild";
import { Hinweis } from "@/components/ui/Hinweis";
import { EINBLENDEN, staffel } from "@/components/effekte/bewegung";
import { inhalte } from "@/content/site";

export function Inhalte() {
  return (
    <Abschnitt id={inhalte.id} ton="soft" titelId="inhalte-titel">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <AbschnittsKopf
          kleinzeile={inhalte.kleinzeile}
          titel={inhalte.titel}
          titelId="inhalte-titel"
          text={inhalte.text}
        />
        <Bild
          name="laptop"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`${EINBLENDEN} aspect-[3/2] w-full`}
        />
      </div>

      {/* Sechs nummerierte Karten */}
      <ol className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {inhalte.themen.map((thema, index) => (
          <li
            key={thema.titel}
            className={`karte ${EINBLENDEN} flex flex-col gap-3`}
            style={staffel(index % 3)}
          >
            <span className="nummer" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{thema.titel}</h3>
            <p className="text-klein">{thema.text}</p>
          </li>
        ))}
      </ol>

      {/* Wohnungsbilder: geringe Auflösung, deshalb höchstens 280px Kantenlänge */}
      <div className="mt-14 md:mt-20">
        <h3 id="wohnungen-titel">{inhalte.wohnungen.titel}</h3>
        <p className="text-klein mt-2">{inhalte.wohnungen.text}</p>
        <ul
          aria-labelledby="wohnungen-titel"
          className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {inhalte.wohnungen.kacheln.map((kachel, index) => (
            <li
              key={kachel.bild}
              className={`${EINBLENDEN} w-full max-w-[280px]`}
              style={staffel(index)}
            >
              <figure className="flex flex-col gap-2">
                <Bild
                  name={kachel.bild}
                  sizes="(min-width: 768px) 280px, 50vw"
                  className="aspect-square w-full"
                />
                <figcaption className="kleinzeile">{kachel.label}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <Hinweis className={`${EINBLENDEN} mt-10 md:mt-14`}>
        <p>{inhalte.hinweis}</p>
      </Hinweis>
    </Abschnitt>
  );
}
