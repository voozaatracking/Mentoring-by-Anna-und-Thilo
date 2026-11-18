import { EINBLENDEN } from "@/components/effekte/bewegung";
import { Selbsttest } from "@/components/Selbsttest";
import { Abschnitt, AbschnittsKopf } from "@/components/ui/Abschnitt";
import { selbsttest } from "@/content/site";

export function SelbsttestAbschnitt() {
  return (
    <Abschnitt id={selbsttest.id} ton="soft" titelId="selbsttest-titel">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <AbschnittsKopf
          kleinzeile={selbsttest.kleinzeile}
          titel={selbsttest.titel}
          titelId="selbsttest-titel"
          text={selbsttest.text}
        />
        <div className={EINBLENDEN}>
          <Selbsttest inhalt={selbsttest} />
        </div>
      </div>
    </Abschnitt>
  );
}
