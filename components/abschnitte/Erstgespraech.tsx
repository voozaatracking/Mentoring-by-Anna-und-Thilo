import { AnfrageFormular } from "@/components/AnfrageFormular";
import { Abschnitt, AbschnittsKopf } from "@/components/ui/Abschnitt";
import { Bild } from "@/components/ui/Bild";
import { PlatzhalterBox } from "@/components/ui/Platzhalter";
import { CONTACT_EMAIL, erstgespraech, formular } from "@/content/site";

export function Erstgespraech() {
  return (
    <Abschnitt id={erstgespraech.id} titelId="erstgespraech-titel">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <AbschnittsKopf
            kleinzeile={erstgespraech.kleinzeile}
            titel={erstgespraech.titel}
            titelId="erstgespraech-titel"
            text={erstgespraech.text}
          />
          <PlatzhalterBox platzhalter={erstgespraech.rahmen} />
          <Bild
            name="erstgespraech"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[3/2] w-full"
          />
        </div>
        <AnfrageFormular inhalt={formular} kontaktEmail={CONTACT_EMAIL} />
      </div>
    </Abschnitt>
  );
}
