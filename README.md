# Mentoring by Anna & Thilo

Verkaufsseite für das Mentoring von Hygge Homes. Ein Onepager mit zwei Rechtsseiten und einem Anfrageformular, das per E-Mail versendet.

Stand: Feedback von Thilo eingearbeitet (Runde 1), Rechtstexte final. Es gibt keine Platzhalter mehr. Offene Punkte stehen in [ROADMAP.md](ROADMAP.md).

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
| `/impressum` | Finale Fassung aus `docs/rechtstexte/impressum.md` |
| `/datenschutz` | Finale Fassung aus `docs/rechtstexte/datenschutz.md` |
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
| `MAIL_CC` | nein | Kopie an eine weitere Adresse. Die Datenschutzerklärung nennt eine Kopie an ein zweites Postfach, deshalb für den Livegang setzen |
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
| `SHOW_PLACEHOLDER_MARKS` | Zeigt die Etiketten „Platzhalter“. Steht auf `false`, weil es keinen Platzhalter gibt |
| `ALLOW_INDEXING` | Solange `false`, steht robots auf noindex |
| `CONTACT_EMAIL` | Sichtbare Ausweichadresse im Formular |
| `STAND` | Zahlen zu Hygge Homes (Wohnungen, Betten, Standorte, Orte). Nur hier ändern, sie fließen in Einstieg, Über uns und Zahlen |

## Feste Entscheidungen für die Inhalte

Diese Punkte sind entschieden. Tests in `tests/inhalt.test.ts` schützen sie.

- Auf der Seite steht kein Preis. Auch kein Euro-Betrag, kein Stundensatz und kein Rabatt. Einzige Ausnahme ist die Faustformel zur Einrichtung in den häufigen Fragen („140 bis 180 Euro je Quadratmeter“). Der Test erlaubt genau diesen Wortlaut an genau dieser Stelle.
- Das Mentoring hat keine feste Dauer. Eine Dauer steht nur im Beispielpaket (Abschnitt `paket`).
- Schwerpunkt ist die Kurzzeitvermietung. Der Überbau ist Business-Aufbau, der zum Familienleben passt.
- Es gibt noch keine Teilnehmerstimmen.
- Telefon ist Pflichtfeld im Formular.
- Das Mentoring läuft über persönliche 1:1-Calls. Gruppencalls werden auf der Seite nicht erwähnt.

## Platzhalter

Derzeit gibt es keinen Platzhalter, `SHOW_PLACEHOLDER_MARKS` steht auf `false`. Der Mechanismus bleibt für spätere Lücken erhalten.

Ein Platzhalter ist im Inhalt so markiert:

```ts
{ placeholder: true, hinweis: "Was hier noch fehlt." }
```

So nutzt du ihn:

1. Eintrag in `content/site.ts` als Platzhalter anlegen und in der Komponente mit `PlatzhalterBox` oder `PlatzhalterEtikett` aus `components/ui/Platzhalter.tsx` darstellen.
2. `SHOW_PLACEHOLDER_MARKS` auf `true` setzen, damit das Etikett sichtbar ist.
3. Den Test „enthalten keinen Platzhalter mehr“ anpassen und den Eintrag in `ROADMAP.md` aufnehmen.

Eine Suche nach `placeholder: true` in `content/site.ts` findet alle Stellen.

## Rechtstexte

Impressum und Datenschutzerklärung sind final. Die freigegebenen Fassungen liegen unverändert unter `docs/rechtstexte/`. Die Seiten zeigen denselben Wortlaut aus `content/site.ts` (Objekte `impressum` und `datenschutz`). Die Seite parst kein Markdown.

Der Test `tests/rechtstexte.test.ts` baut aus den Inhalten wieder das Markdown und vergleicht es Zeichen für Zeichen mit den Dateien. So änderst du einen Rechtstext:

1. Neue Fassung freigeben lassen und unter `docs/rechtstexte/` ablegen.
2. Denselben Wortlaut in `content/site.ts` nachziehen. Ein Block ist ein Absatz, mehrere Zeilen eines Blocks stehen untereinander.
3. `npm run test` ausführen. Der Test zeigt jede Abweichung.

Das Kästchen im Formular lautet „Ich habe die Datenschutzerklärung gelesen.“ Es formuliert bewusst keine Einwilligung.

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
| `2026_09_10_Hygge_Homes-57.jpg` | `hygge-homes-ruecken.jpg` | Zahlen. Seit November 2026 liegt hier die bearbeitete Fassung (1376 x 768 Pixel) |
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
