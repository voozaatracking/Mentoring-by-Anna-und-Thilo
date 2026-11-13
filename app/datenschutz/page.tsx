import type { Metadata } from "next";
import { datenschutz, meta } from "@/content/site";

export const metadata: Metadata = { title: meta.datenschutzTitel };

export default function DatenschutzSeite() {
  return (
    <div className="rahmen abschnitt">
      <h1>{datenschutz.titel}</h1>
      <p>
        <strong>{datenschutz.entwurfTitel}</strong> {datenschutz.entwurfText}
      </p>
    </div>
  );
}
