import { EINBLENDEN } from "@/components/effekte/bewegung";
import { Abschnitt } from "@/components/ui/Abschnitt";
import { fragen } from "@/content/site";

export function Fragen() {
  return (
    <Abschnitt id={fragen.id} ton="soft" titelId="fragen-titel">
      <h2 id="fragen-titel" className={EINBLENDEN}>{fragen.titel}</h2>
      <div className={`${EINBLENDEN} mt-10 max-w-[800px] md:mt-14`}>
        {fragen.eintraege.map((eintrag) => (
          <details key={eintrag.frage} className="faq">
            <summary>{eintrag.frage}</summary>
            <div>
              <p>{eintrag.antwort}</p>
            </div>
          </details>
        ))}
      </div>
    </Abschnitt>
  );
}
