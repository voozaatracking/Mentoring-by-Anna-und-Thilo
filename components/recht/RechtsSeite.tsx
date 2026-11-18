import { Hinweis } from "@/components/ui/Hinweis";
import type { RechtsSeite as RechtsSeiteInhalt } from "@/content/site";

const MARKIERUNG = /(\[PRÜFEN:[^\]]*\])/g;

/** Hebt Markierungen der Form [PRÜFEN: ...] sichtbar hervor. */
function MitMarkierungen({ text }: { text: string }) {
  const teile = text.split(MARKIERUNG);
  return (
    <>
      {teile.map((teil, index) =>
        teil.startsWith("[PRÜFEN:") ? (
          <mark key={index} className="pruefen">
            {teil}
          </mark>
        ) : (
          teil
        ),
      )}
    </>
  );
}

/** Rechtsseite als strukturierter Entwurf mit Hinweis oben. */
export function RechtsSeite({ inhalt }: { inhalt: RechtsSeiteInhalt }) {
  return (
    <article className="abschnitt">
      <div className="rahmen">
        <div className="flex max-w-[760px] flex-col gap-8">
          <h1>{inhalt.titel}</h1>
          <Hinweis>
            <p>
              <strong className="font-medium">{inhalt.entwurfTitel}.</strong>{" "}
              <MitMarkierungen text={inhalt.entwurfText} />
            </p>
          </Hinweis>
          {inhalt.abschnitte.map((abschnitt) => (
            <section key={abschnitt.titel} className="flex flex-col gap-3">
              <h2 className="recht-titel">{abschnitt.titel}</h2>
              {abschnitt.absaetze
                ?.filter((absatz) => !absatz.startsWith("[PRÜFEN:"))
                .map((absatz) => (
                  <p key={absatz}>
                    <MitMarkierungen text={absatz} />
                  </p>
                ))}
              {abschnitt.liste ? (
                <ul className="flex flex-col gap-1">
                  {abschnitt.liste.map((zeile) => (
                    <li key={zeile}>{zeile}</li>
                  ))}
                </ul>
              ) : null}
              {abschnitt.absaetze
                ?.filter((absatz) => absatz.startsWith("[PRÜFEN:"))
                .map((absatz) => (
                  <p key={absatz}>
                    <MitMarkierungen text={absatz} />
                  </p>
                ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
