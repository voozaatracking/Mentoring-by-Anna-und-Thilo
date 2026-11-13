import { Abschnitt, AbschnittsKopf } from "@/components/ui/Abschnitt";
import { Bild } from "@/components/ui/Bild";
import { ueberUns } from "@/content/site";

export function UeberUns() {
  return (
    <Abschnitt id={ueberUns.id} titelId="ueber-uns-titel">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <AbschnittsKopf
          kleinzeile={ueberUns.kleinzeile}
          titel={ueberUns.titel}
          titelId="ueber-uns-titel"
          text={ueberUns.text}
        />
        <Bild
          name="bank"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[3/2] w-full"
        />
      </div>

      {/* Vier Stationen als nummerierte Reihe */}
      <ol
        aria-label={ueberUns.stationenLabel}
        className="mt-14 grid gap-8 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-6"
      >
        {ueberUns.stationen.map((station, index) => (
          <li
            key={station.titel}
            className="flex flex-col gap-3 border-t border-taupe pt-5"
          >
            <span className="nummer" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{station.titel}</h3>
            <p className="text-klein">{station.text}</p>
          </li>
        ))}
      </ol>

      {/* Zwei Rollenkarten mit Porträt */}
      <ul className="mt-14 grid gap-4 md:mt-20 md:gap-6 lg:grid-cols-2">
        {ueberUns.rollen.map((rolle) => (
          <li
            key={rolle.name}
            className="karte flex flex-col gap-5 sm:flex-row sm:gap-6"
          >
            <Bild
              name={rolle.bild}
              sizes="(min-width: 640px) 180px, 220px"
              className="aspect-[4/5] w-full max-w-[220px] shrink-0 self-start sm:w-[180px]"
              // Hochformat 2:3 im Rahmen 4:5: oben ausrichten, Gesicht im oberen Drittel.
              bildKlasse="object-top"
            />
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h3>{rolle.name}</h3>
                <p className="kleinzeile">{rolle.rolle}</p>
              </div>
              <p className="text-klein">{rolle.text}</p>
              <p className="text-klein border-l-2 border-sage pl-3">
                <span className="text-muted">{rolle.frageLabel}</span>{" "}
                <span className="font-medium">{rolle.frage}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      <blockquote className="zitat mt-14 md:mt-20">
        <p>{ueberUns.zitat}</p>
      </blockquote>
    </Abschnitt>
  );
}
