import Image from "next/image";
import { bilder, ui, type BildName } from "@/content/site";
import { bildDateien } from "@/lib/bilder.generated";

/** Fläche für ein Bild, das noch nicht im Repository liegt. */
export function ImagePlaceholder({ zielname }: { zielname: string }) {
  return (
    <div className="bild-platzhalter">
      <span>
        {ui.bildFolgt} {zielname}
      </span>
    </div>
  );
}

/**
 * Bild aus assets/images/ über next/image mit Blur-Platzhalter. Das Bild
 * füllt seinen Rahmen. Größe oder Seitenverhältnis kommen über className,
 * zum Beispiel "aspect-[4/5]". Fehlt die Datei, erscheint ImagePlaceholder.
 */
export function Bild({
  name,
  sizes,
  className = "",
  vorrang = false,
  bildKlasse = "",
}: {
  name: BildName;
  /** Angabe für next/image, zum Beispiel "(min-width: 768px) 50vw, 100vw". */
  sizes: string;
  className?: string;
  /** Für das Bild im ersten Sichtbereich: sofort und mit Vorrang laden. */
  vorrang?: boolean;
  bildKlasse?: string;
}) {
  const eintrag = bilder[name];
  const datei = bildDateien[eintrag.datei];
  return (
    <div className={`bild ${className}`}>
      {datei ? (
        <Image
          src={datei}
          alt={eintrag.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          loading={vorrang ? "eager" : "lazy"}
          fetchPriority={vorrang ? "high" : "auto"}
          className={`object-cover ${bildKlasse}`}
        />
      ) : (
        <ImagePlaceholder zielname={eintrag.datei} />
      )}
    </div>
  );
}
