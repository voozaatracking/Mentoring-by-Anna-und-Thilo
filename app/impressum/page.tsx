import type { Metadata } from "next";
import { impressum, meta } from "@/content/site";

export const metadata: Metadata = { title: meta.impressumTitel };

export default function ImpressumSeite() {
  return (
    <main>
      <h1>{impressum.titel}</h1>
      <p>
        <strong>{impressum.entwurfTitel}</strong> {impressum.entwurfText}
      </p>
    </main>
  );
}
