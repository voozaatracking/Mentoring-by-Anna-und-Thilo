/*
 * Mailversand der Anfrage über SMTP mit nodemailer.
 * Nur-Text-Mail an MAIL_TO, optional Kopie an MAIL_CC. Reply-To ist die
 * Adresse der anfragenden Person. Es gibt keine automatische Antwort.
 */

import nodemailer from "nodemailer";
import { formular, mail as mailTexte } from "@/content/site";
import type { Anfrage } from "@/lib/anfrage";
import { ersetze } from "@/lib/text";

export const PFLICHT_VARIABLEN = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "MAIL_FROM",
  "MAIL_TO",
] as const;

export type MailKonfiguration = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
  cc?: string;
};

export type KonfigurationsErgebnis =
  | { ok: true; konfiguration: MailKonfiguration }
  | { ok: false; grund: string };

type Umgebung = Record<string, string | undefined>;

/** Liest und prüft die Umgebungsvariablen. Der Grund ist für das Serverlog. */
export function leseMailKonfiguration(env: Umgebung): KonfigurationsErgebnis {
  const fehlend = PFLICHT_VARIABLEN.filter((name) => !env[name]?.trim());
  if (fehlend.length > 0) {
    return { ok: false, grund: `Es fehlen: ${fehlend.join(", ")}` };
  }

  const port = Number(env.SMTP_PORT);
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    return { ok: false, grund: "SMTP_PORT ist keine gültige Portnummer." };
  }

  const user = env.SMTP_USER!.trim();
  const from = env.MAIL_FROM!.trim();
  if (from.toLowerCase() !== user.toLowerCase()) {
    return { ok: false, grund: "MAIL_FROM muss SMTP_USER entsprechen." };
  }

  return {
    ok: true,
    konfiguration: {
      host: env.SMTP_HOST!.trim(),
      port,
      user,
      pass: env.SMTP_PASS!,
      from,
      to: env.MAIL_TO!.trim(),
      cc: env.MAIL_CC?.trim() || undefined,
    },
  };
}

const zeitFormat = new Intl.DateTimeFormat("de-DE", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "Europe/Berlin",
});

export type MailInhalt = { betreff: string; text: string };

/** Baut Betreff und Text der Mail mit allen Feldern und dem Zeitpunkt. */
export function baueMail(anfrage: Anfrage, zeitpunkt: Date): MailInhalt {
  const { felder, leer } = mailTexte;
  const zeilen = [
    mailTexte.einleitung,
    "",
    `${felder.name}: ${anfrage.name}`,
    `${felder.email}: ${anfrage.email}`,
    `${felder.telefon}: ${anfrage.telefon || leer}`,
    `${felder.stand}: ${formular.standOptionen[anfrage.stand]}`,
    `${felder.zustimmung}: ${mailTexte.zustimmungErteilt}`,
    `${felder.zeitpunkt}: ${zeitFormat.format(zeitpunkt)} Uhr`,
    "",
    `${felder.nachricht}:`,
    anfrage.nachricht || leer,
    "",
    mailTexte.antwortHinweis,
  ];
  return {
    betreff: ersetze(mailTexte.betreff, { name: anfrage.name }),
    text: zeilen.join("\n"),
  };
}

/** Versendet die Anfrage. Wirft, wenn der SMTP-Server ablehnt. */
export async function versendeAnfrage(
  konfiguration: MailKonfiguration,
  anfrage: Anfrage,
  inhalt: MailInhalt,
): Promise<void> {
  const direktTls = konfiguration.port === 465;
  const transport = nodemailer.createTransport({
    host: konfiguration.host,
    port: konfiguration.port,
    // Port 465 nutzt TLS ab Verbindungsaufbau, andere Ports STARTTLS als Pflicht.
    secure: direktTls,
    requireTLS: !direktTls,
    auth: { user: konfiguration.user, pass: konfiguration.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  await transport.sendMail({
    from: { name: mailTexte.absenderName, address: konfiguration.from },
    to: konfiguration.to,
    cc: konfiguration.cc,
    replyTo: anfrage.email,
    subject: inhalt.betreff,
    text: inhalt.text,
  });
}
