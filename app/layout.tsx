import type { Metadata } from "next";
import "./globals.css";
import { ALLOW_INDEXING, SITE_NAME, meta } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
