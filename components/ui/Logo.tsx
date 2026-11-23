import Image from "next/image";
import { bilder, ui, type BildName } from "@/content/site";
import { bildDateien } from "@/lib/bilder.generated";

/**
 * Logo eines Dritten in fester Größe. Das Logo bleibt farblich unverändert:
 * kein Filter, kein Umfärben. Ohne Angabe der Breite folgt sie aus der Höhe
 * und dem Seitenverhältnis der Datei.
 */
export function Logo({
  name,
  hoehe,
  breite,
  className = "",
}: {
  name: BildName;
  /** Höhe in Pixeln. */
  hoehe: number;
  /** Breite in Pixeln, sonst aus dem Seitenverhältnis. */
  breite?: number;
  className?: string;
}) {
  const eintrag = bilder[name];
  const datei = bildDateien[eintrag.datei];
  if (!datei) {
    return (
      <span className="text-klein text-muted">
        {ui.bildFolgt} {eintrag.datei}
      </span>
    );
  }
  const b = breite ?? Math.round((hoehe * datei.width) / datei.height);
  return (
    <Image
      src={datei}
      alt={eintrag.alt}
      width={b}
      height={hoehe}
      sizes={`${b}px`}
      className={`block max-w-none shrink-0 ${className}`}
      style={{ width: b, height: hoehe }}
    />
  );
}
