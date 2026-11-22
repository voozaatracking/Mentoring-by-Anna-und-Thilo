# Roadmap

Stand: Feedback von Thilo eingearbeitet (Runde 1, Branch `feat/feedback-thilo-1`). Diese Datei sammelt Entscheidungen, Platzhalter und offene Punkte.

## Entscheidungen

Diese Punkte sind entschieden und werden nicht neu diskutiert. Tests in `tests/inhalt.test.ts` schützen sie.

- **Kein Preis.** Auf der Seite steht niemals ein Preis. Auch kein Euro-Betrag, kein Stundensatz, kein Rabatt. Einzige Ausnahme: die Faustformel zur Einrichtung („140 bis 180 Euro je Quadratmeter“) in den häufigen Fragen. Sie ist kein Preis des Mentorings.
- **Keine feste Dauer.** Angaben wie „drei Monate“ oder „zwölf Wochen“ stehen nur im Beispielpaket (`paket`). Der Ablauf sagt: so lange, wie es für das Ziel sinnvoll ist.
- **Positionierung.** Schwerpunkt ist die Kurzzeitvermietung. Der Überbau ist Business-Aufbau, der zum Familienleben passt.
- **Keine Teilnehmerstimmen.** Es gibt noch keine. Der Block ist entfernt.
- **Telefon ist Pflichtfeld** im Formular.
- **Persönliche 1:1-Calls.** Das Mentoring läuft über persönliche 1:1-Calls. Gruppencalls werden auf der Seite nicht erwähnt.

## Geplant

- Gruppencalls geplant, freiwillig, erst nach Start auf die Seite.

## Platzhalter auf der Seite

Keine. `SHOW_PLACEHOLDER_MARKS` steht auf `false`.

Erledigt in Runde 1:

| Früherer Platzhalter | Ersetzt durch |
| --- | --- |
| Ablauf Monat 1 bis 3 und Danach | Vier Schritte ohne Zeitangabe |
| Format der Termine | Einleitung und Schritt 3 im Ablauf |
| Erfahrungswert je Wohnung | Satz ohne Zahl im Abschnitt Zahlen |
| Drei Teilnehmerstimmen | Block entfernt |
| Weitere Bestandteile des Pakets | Liste „Enthalten“ im Beispielpaket |
| Preis | Schlusszeile im Beispielpaket, ohne Preis |
| Dauer, Kosten und Ablauf des Erstgesprächs | Text über dem Formular |

## Bilder

Alle zwölf Bilder liegen unter ihren Zielnamen in `assets/images/`. Es gibt kein Platzhalterbild.

- Alt-Texte sind anhand der Fotos formuliert, ohne Ortsangaben.
- Bildausschnitte sind geprüft: Einstieg (mobil und Desktop), Porträts (4:5, Gesicht im oberen Drittel), übrige Fotos im Originalformat 3:2 oder 2:3.
- Die vier Wohnungsbilder haben keine Beschriftung mehr.
- Das Open-Graph-Bild entsteht automatisch aus dem Einstiegsbild.

## Rechtsseiten

Beide Seiten sind Entwürfe. Vor der Veröffentlichung alle Markierungen `[PRÜFEN: ...]` klären und den Hinweis „Entwurf“ entfernen.

Impressum:

- Bezeichnung der Rechtsgrundlage für die Anbieterkennzeichnung
- Kontaktadresse für das Mentoring
- USt-IdNr. oder Kleinunternehmerregelung
- Inhaltlich verantwortliche Person, falls erforderlich
- Hinweis zur Verbraucherstreitbeilegung, falls erforderlich

Datenschutz:

- Anschriften der Dienstleister (Vercel, Strato)
- Rechtsgrundlagen (Hosting, Anfrageformular)
- Erforderlichkeit der Telefonnummer als Pflichtangabe (neu in Runde 1)
- Auftragsverarbeitung mit Vercel und Strato, Übermittlung in Drittländer
- Umfang und Speicherdauer der Verbindungsdaten bei Vercel
- Speicherdauer der Anfragen im Postfach
- Verweise auf die Artikel der DSGVO
- Zuständige Aufsichtsbehörde
- Datum der Fassung

## Vor dem Livegang

- [x] Alle Platzhalter ersetzt, `SHOW_PLACEHOLDER_MARKS = false`
- [x] Bilder geliefert, Alt-Texte geprüft
- [ ] Rechtsseiten geprüft, Hinweis „Entwurf“ entfernt
- [ ] Umgebungsvariablen in Vercel gesetzt, Testanfrage auf der Preview gesendet
- [ ] Endgültige Domain festgelegt und als `SITE_URL` gesetzt
- [ ] `ALLOW_INDEXING = true`

## Beantwortete Rückfragen aus Runde 1

- Satz zur Dauer: steht in der Einleitung von „So läuft es ab“.
- Häufige Fragen: zwei neue Fragen zu Dauer und Kosten des Mentorings, ohne Zahl.
- Erstgespräch: der alte Einleitungsabsatz ist gestrichen.
- Faustformel zur Einrichtung: wiederhergestellt, als einzige erlaubte Ausnahme im Test.

## Offene Punkte und Ideen

- Rate-Limit liegt im Arbeitsspeicher und gilt bei Vercel je Instanz. Für einen härteren Schutz wäre ein gemeinsamer Speicher nötig. Das widerspricht der Vorgabe „keine Datenbank“ und ist deshalb offen.
- Das Formular braucht JavaScript. Ohne JavaScript zeigt es die Ausweichadresse.
- Das Favicon (`app/icon.svg`) ist ein neutrales Hauszeichen in den Seitenfarben. Ein Logo von Hygge Homes fehlt.
- Wortmarke in der Kopfzeile ist reiner Text. Ein Logo kann sie später ersetzen.
- Sitemap und robots.txt fehlen bewusst, solange die Seite nicht indexiert werden soll.
- `CLAUDE.md` und `docs/PROJEKTSTATUS.md` gibt es im Repository nicht. Projektregeln stehen in `AGENTS.md`, der Stand in dieser Datei.
