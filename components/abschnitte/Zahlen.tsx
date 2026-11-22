import { Abschnitt, AbschnittsKopf } from "@/components/ui/Abschnitt";
import { EINBLENDEN } from "@/components/effekte/bewegung";
import { Zaehler } from "@/components/effekte/Zaehler";
import { Bild } from "@/components/ui/Bild";
import { KnopfLink } from "@/components/ui/Knopf";
import { zahlen } from "@/content/site";

export function Zahlen() {
  return (
    <Abschnitt id={zahlen.id} ton="soft" titelId="zahlen-titel">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-10">
          <AbschnittsKopf
            kleinzeile={zahlen.kleinzeile}
            titel={zahlen.titel}
            titelId="zahlen-titel"
          />
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
            {zahlen.kennzahlen.map((kennzahl) => (
              <div
                key={kennzahl.label}
                className="flex flex-col gap-2 border-t border-taupe pt-4"
              >
                <dd className="kennzahl">
                  <Zaehler wert={kennzahl.wert} vorsatz={kennzahl.vorsatz} />
                </dd>
                <dt className="text-klein text-muted">{kennzahl.label}</dt>
              </div>
            ))}
          </dl>
          <p className="text-klein">{zahlen.hinweis}</p>
        </div>
        <Bild
          name="ruecken"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`${EINBLENDEN} aspect-[3/2] w-full`}
          // Das Foto ist 16:9 (1376 x 768), der Rahmen 3:2. Mittig bleiben
          // beide Personen ganz im Bild, beschnitten werden nur die Ränder.
          bildKlasse="object-center"
        />
      </div>

      {/* Podcast: nur ein Link, nichts eingebettet */}
      <div
        className={`${EINBLENDEN} mt-10 flex flex-col gap-4 border-t border-line pt-8 md:mt-14 md:flex-row md:items-center md:justify-between md:gap-8`}
      >
        <p>{zahlen.podcast.text}</p>
        <KnopfLink
          href={zahlen.podcast.link.href}
          variante="sekundaer"
          extern
          className="shrink-0 self-start md:self-auto"
        >
          {zahlen.podcast.link.label}
        </KnopfLink>
      </div>
    </Abschnitt>
  );
}
