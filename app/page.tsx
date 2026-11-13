import { PlatzhalterBox } from "@/components/ui/Platzhalter";
import { einstieg, erstgespraech } from "@/content/site";

export default function Startseite() {
  return (
    <main>
      <p>{einstieg.kleinzeile}</p>
      <h1>{einstieg.titel}</h1>
      <p>{einstieg.text}</p>
      <PlatzhalterBox platzhalter={erstgespraech.rahmen} />
    </main>
  );
}
