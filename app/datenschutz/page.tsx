import type { Metadata } from "next";
import { datenschutz, meta } from "@/content/site";

export const metadata: Metadata = { title: meta.datenschutzTitel };

export default function DatenschutzSeite() {
  return (
    <main>
      <h1>{datenschutz.titel}</h1>
      <p>
        <strong>{datenschutz.entwurfTitel}</strong> {datenschutz.entwurfText}
      </p>
    </main>
  );
}
