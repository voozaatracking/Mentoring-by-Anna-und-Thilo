import type { Metadata } from "next";
import { RechtsSeite } from "@/components/recht/RechtsSeite";
import { datenschutz, meta } from "@/content/site";

export const metadata: Metadata = { title: meta.datenschutzTitel };

export default function DatenschutzSeite() {
  return <RechtsSeite inhalt={datenschutz} />;
}
