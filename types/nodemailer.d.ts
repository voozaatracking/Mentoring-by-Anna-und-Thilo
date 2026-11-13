/*
 * Schlanke Typen für nodemailer. Das Paket bringt keine eigenen Typen mit,
 * und ein weiteres Typpaket soll nicht als Abhängigkeit dazukommen.
 * Beschrieben ist nur, was lib/mail.ts verwendet.
 */
declare module "nodemailer" {
  export interface Adresse {
    name: string;
    address: string;
  }

  export interface SmtpOptionen {
    host: string;
    port: number;
    /** true: TLS ab Verbindungsaufbau (Port 465). */
    secure?: boolean;
    /** true: STARTTLS ist Pflicht, kein Versand im Klartext. */
    requireTLS?: boolean;
    auth?: { user: string; pass: string };
    connectionTimeout?: number;
    greetingTimeout?: number;
    socketTimeout?: number;
  }

  export interface MailOptionen {
    from?: string | Adresse;
    to?: string;
    cc?: string;
    replyTo?: string | Adresse;
    subject?: string;
    text?: string;
  }

  export interface Transporter {
    sendMail(mail: MailOptionen): Promise<{ messageId?: string }>;
  }

  export function createTransport(optionen: SmtpOptionen): Transporter;

  const nodemailer: { createTransport: typeof createTransport };
  export default nodemailer;
}
