"use client";

import { useEffect, useRef, useState } from "react";
import { KnopfLink } from "@/components/ui/Knopf";
import type { SelbsttestInhalt } from "@/content/site";
import { bewerte } from "@/lib/selbsttest";
import { ersetze } from "@/lib/text";

/**
 * Selbsttest mit einer Frage je Schritt. Der Zustand liegt nur im Speicher
 * des Browsers: Es wird nichts gespeichert und nichts übertragen.
 */
export function Selbsttest({ inhalt }: { inhalt: SelbsttestInhalt }) {
  const gesamt = inhalt.fragen.length;
  const [antworten, setAntworten] = useState<number[]>([]);
  const schritt = antworten.length;
  const fertig = schritt >= gesamt;

  // Nach jedem Wechsel springt der Fokus auf die neue Überschrift.
  const ueberschriftRef = useRef<HTMLHeadingElement>(null);
  const fokusNoetig = useRef(false);
  useEffect(() => {
    if (!fokusNoetig.current) return;
    fokusNoetig.current = false;
    ueberschriftRef.current?.focus();
  }, [schritt]);

  function antworte(punkte: number) {
    fokusNoetig.current = true;
    setAntworten((bisher) => [...bisher, punkte]);
  }

  function zurueck() {
    fokusNoetig.current = true;
    setAntworten((bisher) => bisher.slice(0, -1));
  }

  function neustart() {
    fokusNoetig.current = true;
    setAntworten([]);
  }

  if (fertig) {
    const bewertung = bewerte(antworten);
    const ergebnis = inhalt.ergebnisse[bewertung.stufe];
    return (
      <div className="karte md:p-8">
        <div key="ergebnis" className="selbsttest-schritt flex flex-col gap-5">
          <p className="kleinzeile">{inhalt.ergebnisKleinzeile}</p>
          <h3 ref={ueberschriftRef} tabIndex={-1} className="selbsttest-titel">
            {ergebnis.titel}
          </h3>
          <p>{ergebnis.text}</p>
          {bewertung.offen.length > 0 ? (
            <div className="flex flex-col gap-3 border-t border-line pt-5">
              <h4 className="kleinzeile" id="selbsttest-offen">
                {inhalt.offeneThemenTitel}
              </h4>
              <ul
                aria-labelledby="selbsttest-offen"
                className="flex flex-col gap-3"
              >
                {bewertung.offen.map((index) => (
                  <li
                    key={inhalt.fragen[index].thema}
                    className="text-klein border-l-2 border-sage pl-3"
                  >
                    <span className="font-medium">
                      {inhalt.fragen[index].thema}
                    </span>
                    <br />
                    <span className="text-muted">
                      {inhalt.fragen[index].frage}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <KnopfLink href={inhalt.cta.href}>{inhalt.cta.label}</KnopfLink>
            <button
              type="button"
              className="knopf knopf-sekundaer"
              onClick={neustart}
            >
              {inhalt.neustart}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const aktuelle = inhalt.fragen[schritt];
  return (
    <div className="karte md:p-8">
      <div key={schritt} className="selbsttest-schritt flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="kleinzeile">
            {ersetze(inhalt.fortschritt, { nr: schritt + 1, gesamt })}
          </p>
          <div className="fortschritt" aria-hidden="true">
            <span style={{ width: `${((schritt + 1) / gesamt) * 100}%` }} />
          </div>
        </div>
        <h3 ref={ueberschriftRef} tabIndex={-1} className="selbsttest-titel">
          {aktuelle.thema}
        </h3>
        <p id="selbsttest-frage" className="min-h-[5em] sm:min-h-[3.4em]">
          {aktuelle.frage}
        </p>
        <div
          role="group"
          aria-label={inhalt.antwortenLabel}
          aria-describedby="selbsttest-frage"
          className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
        >
          {inhalt.antworten.map((antwort) => (
            <button
              key={antwort.label}
              type="button"
              className="knopf knopf-sekundaer sm:min-w-[9rem]"
              onClick={() => antworte(antwort.punkte)}
            >
              {antwort.label}
            </button>
          ))}
        </div>
        {schritt > 0 ? (
          <button type="button" className="text-knopf self-start" onClick={zurueck}>
            {inhalt.zurueck}
          </button>
        ) : null}
      </div>
    </div>
  );
}
