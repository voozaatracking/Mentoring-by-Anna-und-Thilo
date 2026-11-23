# Roadmap

Stand: Drittes Feedback von Thilo eingearbeitet. Zahlen auf Stand November 2026, Partner im Mentoring, Rechtstexte final. Diese Datei sammelt Entscheidungen, Platzhalter und offene Punkte.

## Entscheidungen

Diese Punkte sind entschieden und werden nicht neu diskutiert. Tests in `tests/inhalt.test.ts` schützen sie.

- **Kein Preis.** Auf der Seite steht niemals ein Preis. Auch kein Euro-Betrag, kein Stundensatz, kein Rabatt. Einzige Ausnahme: die Faustformel zur Einrichtung („140 bis 180 Euro je Quadratmeter“) in den häufigen Fragen. Sie ist kein Preis des Mentorings.
- **Keine feste Dauer.** Angaben wie „drei Monate“ oder „zwölf Wochen“ stehen nur im Beispielpaket (`paket`). Der Ablauf sagt: so lange, wie es für das Ziel sinnvoll ist.
- **Positionierung.** Schwerpunkt ist die Kurzzeitvermietung. Der Überbau ist Business-Aufbau, der zum Familienleben passt.
- **Keine Teilnehmerstimmen.** Es gibt noch keine. Der Block ist entfernt.
- **Telefon ist Pflichtfeld** im Formular.
- **Persönliche 1:1-Calls.** Das Mentoring läuft über persönliche 1:1-Calls. Gruppencalls werden auf der Seite nicht erwähnt. Das Wort „Gruppe“ erscheint nicht auf der Seite.
- **Partner im Mentoring.** Calls und Videos der Partner sind Teil des Mentorings. Beratung zum Einzelfall beauftragen Teilnehmer weiter direkt bei den Partnern.
- **Kein „Architekt“.** Das Wort erscheint nicht auf der Seite.
- **Keine Stundenangabe.** Auch die Frage zur Zeit nennt keine Zahl.

## Geplant

- Gruppencalls geplant, freiwillig, erst nach Start auf die Seite.
- Teilnehmerstimmen folgen, sobald es welche gibt. Bis dahin steht kein Block dazu auf der Seite.

## Stand der Inhalte

- **Zahlen, Stand November 2026:** 29 Ferienwohnungen, rund 145 Betten, 6 Standorte. Die Werte stehen einmal in `content/site.ts` (Konstante `STAND`) und fließen in Einstieg, Über uns und den Abschnitt Zahlen. Der sechste Standort wird nicht benannt, die Orte stehen mit „unter anderem“.
- **Partner ergänzt:** Block „Unsere Partner“ im Abschnitt Inhalte, unter dem Hinweis zur Rechts- und Steuerberatung. GoLet GmbH und Mertens Schabow Steuerberatung, nur Firmennamen und einfache Links, keine Aussage zu Vergütung oder Provision.
- **Partner im Mentoring (drittes Feedback):** Schritt 3 im Ablauf, die Liste „Enthalten“ im Beispielpaket (sechs Punkte), der Partnerblock und die Frage zur Rechts- oder Steuerberatung nennen die Calls und Videos der Partner.
- **Einstieg und Frage zur Zeit (drittes Feedback):** Die Unterzeile im Einstieg spricht vom Aufbau des Business und vom Wachsen auf 29 Ferienwohnungen. Die Antwort auf „Wie viel Zeit muss ich einplanen?“ verweist auf die individuelle Planung.
- **Bild getauscht:** `hygge-homes-ruecken.jpg` ist die bearbeitete Fassung (1376 x 768 Pixel, 16:9).

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
- Ausnahme: `hygge-homes-ruecken.jpg` ist seit dem Tausch 16:9 und steht mittig im Rahmen 3:2. Beide Personen sind ganz sichtbar. Die Auflösung ist mit 1376 Pixel Breite geringer als bei den übrigen Fotos (2500 Pixel).
- Die vier Wohnungsbilder haben keine Beschriftung mehr.
- Das Open-Graph-Bild entsteht automatisch aus dem Einstiegsbild.

## Rechtstexte

Final. Die freigegebenen Fassungen liegen unverändert unter `docs/rechtstexte/`. Die Seiten `/impressum` und `/datenschutz` zeigen denselben Wortlaut. Ein Test vergleicht beide Zeichen für Zeichen.

- Der Hinweis „Entwurf“ und alle Prüfhinweise sind entfernt.
- Das Kästchen im Formular lautet „Ich habe die Datenschutzerklärung gelesen.“ Es formuliert keine Einwilligung.
- Änderungen an den Rechtstexten: zuerst die Datei unter `docs/rechtstexte/` freigeben lassen, dann `content/site.ts` nachziehen.
- Die Datenschutzerklärung nennt in Abschnitt 6 die Links zu den Partnern.

## Offen bis zum Livegang

Offen sind diese vier Punkte:

- [ ] **MAIL_CC.** In Vercel setzen. Die Datenschutzerklärung nennt eine Kopie an ein zweites Postfach. Ohne `MAIL_CC` geht keine Kopie raus.
- [ ] **Domain.** Festlegen, in Vercel verbinden und als `SITE_URL` setzen.
- [ ] **Vercel Pro.** Projekt auf Vercel Pro umstellen.
- [ ] **Livegang.** Umgebungsvariablen prüfen, Testanfrage senden, dann `ALLOW_INDEXING = true`.

Erledigt: Platzhalter ersetzt, Bilder geliefert, Rechtstexte final, Zahlen aktualisiert, Partner ergänzt.

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
