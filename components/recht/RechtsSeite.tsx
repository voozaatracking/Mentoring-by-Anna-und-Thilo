import type {
  RechtsBlock,
  RechtsSeite as RechtsSeiteInhalt,
} from "@/content/site";

/** Ein Absatz. Mehrere Zeilen stehen untereinander, zum Beispiel bei Anschriften. */
function Block({ block }: { block: RechtsBlock }) {
  return (
    <p>
      {block.vorspann ? (
        <>
          <strong className="font-medium">{block.vorspann}</strong>{" "}
        </>
      ) : null}
      {block.zeilen.map((zeile, index) => (
        <span key={zeile}>
          {index > 0 ? <br /> : null}
          {zeile}
        </span>
      ))}
    </p>
  );
}

/** Rechtsseite mit den finalen Texten aus content/site.ts. */
export function RechtsSeite({ inhalt }: { inhalt: RechtsSeiteInhalt }) {
  return (
    <article className="abschnitt">
      <div className="rahmen">
        <div className="flex max-w-[760px] flex-col gap-8">
          <h1>{inhalt.titel}</h1>
          {inhalt.vorab.map((block) => (
            <Block key={block.zeilen[0]} block={block} />
          ))}
          {inhalt.abschnitte.map((abschnitt) => (
            <section key={abschnitt.titel} className="flex flex-col gap-3">
              <h2 className="recht-titel">{abschnitt.titel}</h2>
              {abschnitt.bloecke.map((block) => (
                <Block key={block.zeilen[0]} block={block} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
