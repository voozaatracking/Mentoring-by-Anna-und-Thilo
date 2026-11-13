import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ALLOW_INDEXING, SITE_NAME, meta, ui } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

/*
 * Schriften lokal als variable WOFF2 (Subset Latin, SIL Open Font License,
 * siehe app/fonts/OFL.txt). Kein next/font/google, kein Abruf zur Laufzeit.
 */
const oswald = localFont({
  src: "./fonts/oswald-latin.woff2",
  variable: "--font-oswald",
  weight: "200 700",
  display: "swap",
});

const jost = localFont({
  src: "./fonts/jost-latin.woff2",
  variable: "--font-jost",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: meta.titel,
  description: meta.beschreibung,
  robots: ALLOW_INDEXING
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE_NAME,
    title: meta.titel,
    description: meta.beschreibung,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f4efe6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${oswald.variable} ${jost.variable}`}
    >
      <body className="antialiased">
        <a href="#inhalt" className="sprunglink">
          {ui.sprunglink}
        </a>
        <main id="inhalt" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
