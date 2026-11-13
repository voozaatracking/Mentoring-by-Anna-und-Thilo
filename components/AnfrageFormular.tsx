"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { Hinweis } from "@/components/ui/Hinweis";
import { MitEmail } from "@/components/ui/MitEmail";
import type { FormularInhalt } from "@/content/site";
import {
  GRENZEN,
  STAND_WERTE,
  pruefeAnfrage,
  type Fehlercode,
  type Feld,
  type FeldFehler,
} from "@/lib/anfrage";
import { ersetze } from "@/lib/text";

type Status = "bereit" | "sendet" | "erfolg" | "fehler" | "zu_viele";

const LEER = {
  name: "",
  email: "",
  telefon: "",
  stand: "",
  nachricht: "",
  zustimmung: false,
  /** Honeypot: bleibt bei Menschen leer. */
  website: "",
};

const REIHENFOLGE: Feld[] = [
  "name",
  "email",
  "telefon",
  "stand",
  "nachricht",
  "zustimmung",
];

/** Anfrageformular. Sendet als JSON an POST /api/anfrage. */
export function AnfrageFormular({
  inhalt,
  kontaktEmail,
}: {
  inhalt: FormularInhalt;
  kontaktEmail: string;
}) {
  const [werte, setWerte] = useState(LEER);
  const [fehler, setFehler] = useState<FeldFehler>({});
  const [status, setStatus] = useState<Status>("bereit");
  const formRef = useRef<HTMLFormElement>(null);

  function setze<K extends keyof typeof LEER>(feld: K, wert: (typeof LEER)[K]) {
    setWerte((bisher) => ({ ...bisher, [feld]: wert }));
  }

  function fehlertext(feld: Feld): string | undefined {
    const code = fehler[feld];
    if (!code) return undefined;
    const genau: Partial<Record<Feld, Partial<Record<Fehlercode, string>>>> =
      inhalt.feldFehlerGenau;
    return genau[feld]?.[code] ?? inhalt.feldFehler[code];
  }

  function zeigeFeldFehler(neu: FeldFehler) {
    setFehler(neu);
    setStatus("bereit");
    const erstes = REIHENFOLGE.find((feld) => neu[feld]);
    if (erstes) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${erstes}"]`)
        ?.focus();
    }
  }

  async function absenden(ereignis: FormEvent<HTMLFormElement>) {
    ereignis.preventDefault();
    if (status === "sendet") return;

    const ergebnis = pruefeAnfrage(werte);
    if (!ergebnis.ok) {
      zeigeFeldFehler(ergebnis.fehler);
      return;
    }

    setFehler({});
    setStatus("sendet");
    try {
      const antwort = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(werte),
      });
      if (antwort.ok) {
        setWerte(LEER);
        setStatus("erfolg");
        return;
      }
      if (antwort.status === 400) {
        const daten: { felder?: FeldFehler } | null = await antwort
          .json()
          .catch(() => null);
        if (daten?.felder && Object.keys(daten.felder).length > 0) {
          zeigeFeldFehler(daten.felder);
          return;
        }
      }
      setStatus(antwort.status === 429 ? "zu_viele" : "fehler");
    } catch {
      setStatus("fehler");
    }
  }

  const hatFeldFehler = Object.keys(fehler).length > 0;

  function beschreibung(feld: Feld) {
    return fehler[feld] ? `anfrage-${feld}-fehler` : undefined;
  }

  function fehlerZeile(feld: Feld) {
    const text = fehlertext(feld);
    if (!text) return null;
    return (
      <p id={`anfrage-${feld}-fehler`} className="feld-fehler">
        {text}
      </p>
    );
  }

  const stern = (
    <span aria-hidden="true" className="ml-1">
      {inhalt.pflichtZeichen}
    </span>
  );
  const optional = (
    <span className="ml-1 font-normal text-muted">{inhalt.optional}</span>
  );

  return (
    <div className="karte md:p-8">
      {/* Statusmeldungen: Der Bereich bleibt im DOM, damit Screenreader Änderungen ansagen. */}
      <div aria-live="polite" aria-atomic="true">
        {status === "erfolg" ? (
          <Hinweis status="erfolg">
            <p ref={(element) => element?.focus()} tabIndex={-1}>
              {inhalt.erfolg}
            </p>
          </Hinweis>
        ) : null}
        {status === "fehler" ? (
          <Hinweis status="fehler" className="mb-6">
            <p>
              <MitEmail text={inhalt.fehler} email={kontaktEmail} />
            </p>
          </Hinweis>
        ) : null}
        {status === "zu_viele" ? (
          <Hinweis status="fehler" className="mb-6">
            <p>
              <MitEmail text={inhalt.zuVieleAnfragen} email={kontaktEmail} />
            </p>
          </Hinweis>
        ) : null}
        {hatFeldFehler ? (
          <Hinweis status="fehler" className="mb-6">
            <p>{inhalt.fehlerZusammenfassung}</p>
          </Hinweis>
        ) : null}
      </div>

      {status === "erfolg" ? null : (
        <form
          ref={formRef}
          onSubmit={absenden}
          noValidate
          aria-labelledby="anfrage-titel"
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1">
            <h3 id="anfrage-titel">{inhalt.titel}</h3>
            <p className="text-klein text-muted">{inhalt.pflichtHinweis}</p>
          </div>

          <noscript>
            <Hinweis>
              <p>
                <MitEmail text={inhalt.ohneJavascript} email={kontaktEmail} />
              </p>
            </Hinweis>
          </noscript>

          <div>
            <label htmlFor="anfrage-name" className="feld-label">
              {inhalt.felder.name}
              {stern}
            </label>
            <input
              id="anfrage-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={GRENZEN.nameMax}
              className="feld"
              value={werte.name}
              onChange={(e) => setze("name", e.target.value)}
              aria-invalid={fehler.name ? true : undefined}
              aria-describedby={beschreibung("name")}
            />
            {fehlerZeile("name")}
          </div>

          <div>
            <label htmlFor="anfrage-email" className="feld-label">
              {inhalt.felder.email}
              {stern}
            </label>
            <input
              id="anfrage-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              maxLength={GRENZEN.emailMax}
              className="feld"
              value={werte.email}
              onChange={(e) => setze("email", e.target.value)}
              aria-invalid={fehler.email ? true : undefined}
              aria-describedby={beschreibung("email")}
            />
            {fehlerZeile("email")}
          </div>

          <div>
            <label htmlFor="anfrage-telefon" className="feld-label">
              {inhalt.felder.telefon}
              {optional}
            </label>
            <input
              id="anfrage-telefon"
              name="telefon"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              maxLength={GRENZEN.telefonMax}
              className="feld"
              value={werte.telefon}
              onChange={(e) => setze("telefon", e.target.value)}
              aria-invalid={fehler.telefon ? true : undefined}
              aria-describedby={beschreibung("telefon")}
            />
            {fehlerZeile("telefon")}
          </div>

          <div>
            <label htmlFor="anfrage-stand" className="feld-label">
              {inhalt.felder.stand}
              {stern}
            </label>
            <select
              id="anfrage-stand"
              name="stand"
              required
              className="feld"
              value={werte.stand}
              onChange={(e) => setze("stand", e.target.value)}
              aria-invalid={fehler.stand ? true : undefined}
              aria-describedby={beschreibung("stand")}
            >
              <option value="" disabled>
                {inhalt.standBitteWaehlen}
              </option>
              {STAND_WERTE.map((wert) => (
                <option key={wert} value={wert}>
                  {inhalt.standOptionen[wert]}
                </option>
              ))}
            </select>
            {fehlerZeile("stand")}
          </div>

          <div>
            <label htmlFor="anfrage-nachricht" className="feld-label">
              {inhalt.felder.nachricht}
              {optional}
            </label>
            <textarea
              id="anfrage-nachricht"
              name="nachricht"
              rows={5}
              maxLength={GRENZEN.nachrichtMax}
              className="feld"
              value={werte.nachricht}
              onChange={(e) => setze("nachricht", e.target.value)}
              aria-invalid={fehler.nachricht ? true : undefined}
              aria-describedby={
                fehler.nachricht
                  ? "anfrage-nachricht-fehler anfrage-nachricht-zaehler"
                  : "anfrage-nachricht-zaehler"
              }
            />
            <p
              id="anfrage-nachricht-zaehler"
              className="mt-1 text-right text-[0.9rem] text-muted"
            >
              {ersetze(inhalt.nachrichtZaehler, {
                anzahl: werte.nachricht.length,
                max: GRENZEN.nachrichtMax,
              })}
            </p>
            {fehlerZeile("nachricht")}
          </div>

          <div>
            <div className="flex items-start gap-3">
              <input
                id="anfrage-zustimmung"
                name="zustimmung"
                type="checkbox"
                required
                className="haken-feld"
                checked={werte.zustimmung}
                onChange={(e) => setze("zustimmung", e.target.checked)}
                aria-invalid={fehler.zustimmung ? true : undefined}
                aria-describedby={beschreibung("zustimmung")}
              />
              <label htmlFor="anfrage-zustimmung" className="text-klein">
                {inhalt.zustimmung.vor}
                <Link href={inhalt.zustimmung.link.href}>
                  {inhalt.zustimmung.link.label}
                </Link>
                {inhalt.zustimmung.nach}
                {stern}
              </label>
            </div>
            {fehlerZeile("zustimmung")}
          </div>

          {/* Honeypot: für Menschen unsichtbar und nicht per Tastatur erreichbar. */}
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="anfrage-website">{inhalt.honeypotLabel}</label>
            <input
              id="anfrage-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={werte.website}
              onChange={(e) => setze("website", e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="knopf knopf-primaer self-start"
            aria-disabled={status === "sendet" ? true : undefined}
          >
            {status === "sendet" ? inhalt.sendenLaeuft : inhalt.senden}
          </button>
        </form>
      )}
    </div>
  );
}
