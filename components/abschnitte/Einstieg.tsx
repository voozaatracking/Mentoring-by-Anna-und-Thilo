import { Bild } from "@/components/ui/Bild";
import { KnopfLink } from "@/components/ui/Knopf";
import { einstieg } from "@/content/site";

export function Einstieg() {
  return (
    <section
      id="einstieg"
      aria-labelledby="einstieg-titel"
      className="bg-bg pb-[var(--abschnitt-abstand)]"
    >
      {/* Bild über die volle Breite, mobil 4:3, ab 768px min(78vh, 720px) hoch */}
      <div className="px-[var(--rand)]">
        <Bild
          name="hero"
          sizes="100vw"
          vorrang
          className="aspect-[4/3] w-full md:aspect-auto md:h-[min(78vh,720px)]"
        />
      </div>

      <div className="rahmen">
        {/* Mobil Text unter dem Bild, ab 768px helle Karte mit 96px Überlappung */}
        <div className="relative z-10 mt-8 flex flex-col gap-5 md:-mt-24 md:max-w-[560px] md:rounded-[var(--radius-karte)] md:border md:border-line md:bg-card md:p-8">
          <p className="kleinzeile">{einstieg.kleinzeile}</p>
          <h1 id="einstieg-titel">{einstieg.titel}</h1>
          <p>{einstieg.text}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <KnopfLink href={einstieg.primaer.href}>
              {einstieg.primaer.label}
            </KnopfLink>
            <KnopfLink href={einstieg.sekundaer.href} variante="sekundaer">
              {einstieg.sekundaer.label}
            </KnopfLink>
          </div>
        </div>

        <dl
          aria-label={einstieg.zahlenLabel}
          className="mt-10 grid max-w-[560px] grid-cols-1 gap-x-6 gap-y-3 border-t border-line pt-6 min-[440px]:grid-cols-3"
        >
          {einstieg.zahlen.map((zahl) => (
            <div
              key={zahl.label}
              className="flex items-baseline gap-3 min-[440px]:flex-col min-[440px]:gap-1"
            >
              <dd className="kennzahl-klein">{zahl.wert}</dd>
              <dt className="text-klein text-muted">{zahl.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
