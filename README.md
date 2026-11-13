# Mentoring by Anna & Thilo

Verkaufsseite für das Mentoring von Hygge Homes. Ein Onepager mit zwei Rechtsseiten und einem Anfrageformular, das per E-Mail versendet.

Stand: erster Wurf. Fehlende Inhalte sind auf der Seite sichtbar als Platzhalter markiert. Die vollständige Liste steht in [ROADMAP.md](ROADMAP.md).

## Technik

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Node 22
- Laufzeit-Abhängigkeit zusätzlich zum Standard: `nodemailer`
- Entwicklungs-Abhängigkeit zusätzlich zum Standard: `vitest`
- Keine Datenbank, kein Tracking, keine Cookies, keine Animations-, UI- oder Formularbibliothek

Hinweis für die Arbeit am Code: `AGENTS.md` verweist auf die mitgelieferte Dokumentation unter `node_modules/next/dist/docs/`. Diese Next-Version weicht in Teilen von älteren Versionen ab.

## Start

```bash
npm install
```

```bash
npm run dev
```

Die Seite läuft dann unter http://localhost:3000.

Weitere Befehle:

| Befehl | Zweck |
| --- | --- |
| `npm run lint` | ESLint |
| `npm run test` | Tests mit Vitest |
| `npm run build` | Produktions-Build |
| `npm run start` | Produktions-Build lokal starten |
| `npm run bilder` | Bildregister neu erzeugen |
| `npm run bilder:umbenennen` | Originaldateien per `git mv` auf die Zielnamen umbenennen |

Vor jedem Commit: Lint, Tests und Build. Vor dem Build den Ordner `.next` löschen.

## Seiten und Routen

| Pfad | Inhalt |
| --- | --- |
| `/` | Onepager |
| `/impressum` | Entwurf mit Markierungen `[PRÜFEN: ...]` |
| `/datenschutz` | Entwurf mit Markierungen `[PRÜFEN: ...]` |
| `POST /api/anfrage` | Nimmt das Formular entgegen und versendet eine E-Mail |

## Umgebungsvariablen

Vorlage: `.env.example`. Lokal als `.env.local` anlegen, bei Vercel in den Projekteinstellungen setzen.

| Variable | Pflicht | Bedeutung |
| --- | --- | --- |
| `SMTP_HOST` | ja | SMTP-Server, zum Beispiel von Strato |
| `SMTP_PORT` | ja | Port. 465 nutzt TLS direkt, andere Ports STARTTLS |
| `SMTP_USER` | ja | Benutzername des Postfachs |
| `SMTP_PASS` | ja | Passwort des Postfachs |
| `MAIL_FROM` | ja | Absenderadresse. Muss `SMTP_USER` entsprechen |
| `MAIL_TO` | ja | Empfänger der Anfragen |
| `MAIL_CC` | nein | Kopie an eine weitere Adresse |
| `SITE_URL` | nein | Öffentliche Adresse der Seite für Metadaten. Ohne Angabe wird die Adresse von Vercel verwendet |

Verhalten, wenn Variablen fehlen:

- In der Entwicklung (`npm run dev`) wird die Mail in die Konsole geschrieben. Das Formular meldet Erfolg.
- In Production antwortet die Route mit 503. Das Formular zeigt die Fehlermeldung mit der Ausweichadresse. Im Serverlog steht, welche Variablen fehlen.

Es gibt keine automatische Antwort an die anfragende Person. Reply-To der Mail ist ihre Adresse.

## Inhalte ändern

Alle Texte stehen in `content/site.ts`. Komponenten enthalten keinen Fließtext.

Regeln für Texte:

- Ansprache du. Nur im Selbsttest ihr.
- Keine Gedankenstriche, keine Emojis, kurze Sätze. Ein Test prüft die Gedankenstriche.
- Anführungszeichen im Text als „ und “.
- Lange Wörter in Überschriften bekommen ein weiches Trennzeichen (`SHY` in `content/site.ts`).

Schalter in `content/site.ts`:

| Konstante | Wirkung |
| --- | --- |
| `SHOW_PLACEHOLDER_MARKS` | Zeigt die Etiketten „Platzhalter“. Auf `false` setzen, wenn alle Platzhalter ersetzt sind |
| `ALLOW_INDEXING` | Solange `false`, steht robots auf noindex |
| `CONTACT_EMAIL` | Sichtbare Ausweichadresse im Formular |

## Platzhalter ersetzen

Jeder Platzhalter ist im Inhalt so markiert:

```ts
{ placeholder: true, hinweis: "Preis des Mentorings ergänzen." }
```

Es gibt zwei Arten:

1. Reine Platzhalter ohne Inhalt, zum Beispiel der Preis. Zum Ersetzen den Eintrag durch den echten Text ersetzen. Dafür ist an der Stelle eine kleine Anpassung am Typ nötig, wenn dort bisher nur ein Platzhalter erlaubt ist.
2. Vorläufige Inhalte mit Markierung, zum Beispiel die Einträge im Ablauf. Zum Ersetzen den Text anpassen und die beiden Felder `placeholder` und `hinweis` entfernen.

Eine Suche nach `placeholder: true` in `content/site.ts` findet alle Stellen.

## Bilder

Quelle ist der Ordner `assets/images/`. Die Seite bindet Bilder über statische Importe mit `next/image` ein. Fehlt eine Datei, zeigt die Seite an der Stelle eine Fläche mit dem Text „Bild folgt: <Zielname>“.

So kommen die Bilder auf die Seite:

1. Originaldateien nach `assets/images/` oder ins Hauptverzeichnis legen und mit `git add` aufnehmen.
2. `npm run bilder:umbenennen` ausführen. Das Skript verschiebt die bekannten Originalnamen per `git mv` nach `assets/images/` und benennt sie auf die Zielnamen um.
3. `npm run bilder` ausführen. Das Skript schreibt `lib/bilder.generated.ts` mit den Importen aller vorhandenen Dateien. Vor `npm run dev` und `npm run build` läuft es automatisch.
4. Alt-Texte in `content/site.ts` (Objekt `bilder`) an das Foto anpassen. Keine Ortsangaben.
5. Bildausschnitt prüfen. Er wird je Abschnitt über `bildKlasse` gesetzt, zum Beispiel `object-top` bei den Porträts.

Zuordnung:

| Originalname | Zielname | Verwendung |
| --- | --- | --- |
| `2026_09_10_Hygge_Homes-67.jpg` | `hero-heide.jpg` | Einstieg |
| `2026_09_10_Hygge_Homes-10.jpg` | `anna-thilo-bank.jpg` | Über uns, Hauptbild |
| `2026_09_10_Hygge_Homes-84.jpg` | `anna-portrait.jpg` | Rollenkarte Anna, 4:5 |
| `2026_09_10_Hygge_Homes-100.jpg` | `thilo-portrait.jpg` | Rollenkarte Thilo, 4:5 |
| `2026_09_10_Hygge_Homes-50.jpg` | `anna-thilo-laptop.jpg` | Inhalte |
| `2026_09_10_Hygge_Homes-77.jpg` | `anna-thilo-weg.jpg` | Ablauf, Hochformat |
| `2026_09_10_Hygge_Homes-57.jpg` | `hygge-homes-ruecken.jpg` | Zahlen |
| `2026_09_10_Hygge_Homes-37.jpg` | `anna-thilo-erstgespraech.jpg` | Formular |
| `gamleby_slider01-2.jpg` | `wohnung-schlafen.jpg` | Kachel Schlafen |
| `celle_1og_homeslider-600x600.png` | `wohnung-wohnen.png` | Kachel Wohnen |
| `scandi-sunset_card_slide_01.png` | `wohnung-essen.png` | Kachel Essen |
| `rosengarten_titel_quadratisch.jpg` | `wohnung-studio.jpg` | Kachel Studio |

Die vier Wohnungsbilder haben geringe Auflösung. Sie erscheinen nur als quadratische Kacheln mit höchstens 280 Pixeln Kantenlänge.

## Schriften

Oswald und Jost liegen als variable WOFF2 unter `app/fonts/` und werden über `next/font/local` eingebunden. Es gibt keinen Abruf zur Laufzeit und kein `next/font/google`. Lizenz: `app/fonts/OFL.txt`.

## Deployment bei Vercel

1. Repository in Vercel importieren. Framework Next.js, Node 22.
2. Umgebungsvariablen setzen (siehe oben).
3. Auf der Preview eine Testanfrage senden und den Eingang im Postfach prüfen.

Sicherheits-Header setzt `next.config.ts`. HSTS ist nur in Production aktiv.

## Bekannte Grenzen

- Das Rate-Limit (5 Anfragen je IP und Stunde) liegt im Arbeitsspeicher. Bei Vercel gilt es je laufender Instanz, nicht global.
- Die Rechtsseiten sind Entwürfe und keine Rechtsberatung.
