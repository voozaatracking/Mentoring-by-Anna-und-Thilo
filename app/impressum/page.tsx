import type { Metadata } from "next";
import { RechtsSeite } from "@/components/recht/RechtsSeite";
import { impressum, meta } from "@/content/site";

export const metadata: Metadata = { title: meta.impressumTitel };

export default function ImpressumSeite() {
  return <RechtsSeite inhalt={impressum} />;
}
