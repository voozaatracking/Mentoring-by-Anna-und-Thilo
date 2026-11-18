"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { KnopfLink } from "@/components/ui/Knopf";
import type { Verweis } from "@/content/site";

type Texte = {
  hauptnavigation: string;
  menue: string;
  menueOeffnen: string;
  menueSchliessen: string;
  schliessen: string;
  zurStartseite: string;
};

/** Ab dieser Scrolltiefe wird die Kopfzeile schmaler und erhält die Linie. */
const SCHWELLE = 80;

/**
 * Fixierte Kopfzeile. Mobil öffnet sich das Menü als Overlay in einem
 * dialog-Element: Fokusfalle, Escape und gesperrter Hintergrund kommen
 * vom Browser.
 */
export function Kopfzeile({
  wortmarke,
  links,
  cta,
  texte,
}: {
  wortmarke: string;
  links: Verweis[];
  cta: Verweis;
  texte: Texte;
}) {
  const kopfRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [offen, setOffen] = useState(false);

  useEffect(() => {
    const kopf = kopfRef.current;
    if (!kopf) return;
    const pruefe = () => {
      kopf.dataset.schmal = window.scrollY > SCHWELLE ? "true" : "false";
    };
    pruefe();
    window.addEventListener("scroll", pruefe, { passive: true });
    return () => window.removeEventListener("scroll", pruefe);
  }, []);

  function oeffne() {
    dialogRef.current?.showModal();
    setOffen(true);
  }

  function schliesse() {
    dialogRef.current?.close();
  }

  return (
    <header ref={kopfRef} className="kopfzeile" data-schmal="false">
      <div className="rahmen flex items-center justify-between gap-4">
        <Link href="/" className="wortmarke" aria-label={`${wortmarke}. ${texte.zurStartseite}`}>
          {wortmarke}
        </Link>

        <nav aria-label={texte.hauptnavigation} className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <KnopfLink href={cta.href} klein className="hidden lg:inline-flex">
          {cta.label}
        </KnopfLink>

        <button
          type="button"
          className="knopf knopf-sekundaer knopf-klein lg:hidden"
          aria-haspopup="dialog"
          aria-expanded={offen}
          aria-label={texte.menueOeffnen}
          onClick={oeffne}
        >
          {texte.menue}
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className="menue-overlay"
        aria-label={texte.menue}
        onClose={() => setOffen(false)}
      >
        <div className="rahmen flex min-h-full flex-col gap-10 pb-10">
          <div className="flex h-[var(--kopf-hoehe)] items-center justify-between gap-4">
            <span className="wortmarke">{wortmarke}</span>
            <button
              type="button"
              className="knopf knopf-sekundaer knopf-klein"
              aria-label={texte.menueSchliessen}
              onClick={schliesse}
            >
              {texte.schliessen}
            </button>
          </div>
          <nav aria-label={texte.hauptnavigation}>
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href} className="border-b border-line">
                  <Link
                    href={link.href}
                    className="menue-link"
                    onClick={schliesse}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <KnopfLink href={cta.href} onClick={schliesse}>
            {cta.label}
          </KnopfLink>
        </div>
      </dialog>
    </header>
  );
}
