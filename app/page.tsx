import { Ablauf } from "@/components/abschnitte/Ablauf";
import { Einstieg } from "@/components/abschnitte/Einstieg";
import { Erstgespraech } from "@/components/abschnitte/Erstgespraech";
import { Frage } from "@/components/abschnitte/Frage";
import { Fragen } from "@/components/abschnitte/Fragen";
import { FuerWen } from "@/components/abschnitte/FuerWen";
import { Inhalte } from "@/components/abschnitte/Inhalte";
import { Paket } from "@/components/abschnitte/Paket";
import { SelbsttestAbschnitt } from "@/components/abschnitte/SelbsttestAbschnitt";
import { UeberUns } from "@/components/abschnitte/UeberUns";
import { Zahlen } from "@/components/abschnitte/Zahlen";

/* Onepager. Die Abschnitte wechseln zwischen --bg und --soft. */
export default function Startseite() {
  return (
    <>
      <Einstieg />
      <Frage />
      <UeberUns />
      <Inhalte />
      <Ablauf />
      <SelbsttestAbschnitt />
      <FuerWen />
      <Zahlen />
      <Paket />
      <Fragen />
      <Erstgespraech />
    </>
  );
}
