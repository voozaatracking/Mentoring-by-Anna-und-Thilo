# Roadmap

Stand: Feedback von Thilo eingearbeitet (Runde 1), Rechtstexte final. Diese Datei sammelt Entscheidungen, Platzhalter und offene Punkte.

## Entscheidungen

Diese Punkte sind entschieden und werden nicht neu diskutiert. Tests in `tests/inhalt.test.ts` schützen sie.

- **Kein Preis.** Auf der Seite steht niemals ein Preis. Auch kein Euro-Betrag, kein Stundensatz, kein Rabatt.
- **Keine feste Dauer.** Angaben wie „drei Monate“ oder „zwölf Wochen“ stehen nur im Beispielpaket (`paket`).
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

## Rechtstexte

Final. Die freigegebenen Fassungen liegen unverändert unter `docs/rechtstexte/`. Die Seiten `/impressum` und `/datenschutz` zeigen denselben Wortlaut. Ein Test vergleicht beide Zeichen für Zeichen.

- Der Hinweis „Entwurf“ und alle Prüfhinweise sind entfernt.
- Das Kästchen im Formular lautet „Ich habe die Datenschutzerklärung gelesen.“ Es formuliert keine Einwilligung.
- Änderungen an den Rechtstexten: zuerst die Datei unter `docs/rechtstexte/` freigeben lassen, dann `content/site.ts` nachziehen.

## Offen bis zum Livegang

Offen sind nur noch diese drei Punkte:

- [ ] **Domain.** Festlegen, in Vercel verbinden und als `SITE_URL` setzen.
- [ ] **Vercel Pro.** Projekt auf Vercel Pro umstellen.
- [ ] **Livegang.** Umgebungsvariablen prüfen, Testanfrage senden, dann `ALLOW_INDEXING = true`. Die Datenschutzerklärung nennt eine Kopie an ein zweites Postfach, dafür muss `MAIL_CC` gesetzt sein.

Erledigt: Platzhalter ersetzt, Bilder geliefert, Rechtstexte final.

## Offene Rückfragen aus Runde 1

- **Satz zur Dauer.** Der Ersatzsatz „Wir begleiten dich so lange, wie es für dein Ziel sinnvoll ist. Dauer und Umfang stimmen wir gemeinsam ab.“ steht nirgends auf der Seite. Alle Stellen mit fester Dauer haben in den Paketen 1, 5 und 7 wörtlich vorgegebene neue Texte bekommen. Soll der Satz zusätzlich stehen, und wo?
- **Faustformel zur Einrichtung.** Die Antwort „140 bis 180 Euro je Quadratmeter“ in den häufigen Fragen ist wegen „kein Euro-Betrag“ entfernt. Soll die Faustformel als Ausnahme zurück?
- **Häufige Fragen zu Dauer, Preis und Erstgespräch.** Keine der sieben Fragen behandelt diese Themen, und neue Fragen waren ausgeschlossen. Die vorgegebenen Antworten stehen deshalb nirgends. Sollen drei Fragen dazukommen?
- **Erstgespräch, zwei Absätze.** Der bisherige Einleitungstext steht weiter über dem neuen Text. Soll er entfallen?

## Offene Punkte und Ideen

- Rate-Limit liegt im Arbeitsspeicher und gilt bei Vercel je Instanz. Für einen härteren Schutz wäre ein gemeinsamer Speicher nötig. Das widerspricht der Vorgabe „keine Datenbank“ und ist deshalb offen.
- Das Formular braucht JavaScript. Ohne JavaScript zeigt es die Ausweichadresse.
- Das Favicon (`app/icon.svg`) ist ein neutrales Hauszeichen in den Seitenfarben. Ein Logo von Hygge Homes fehlt.
- Wortmarke in der Kopfzeile ist reiner Text. Ein Logo kann sie später ersetzen.
- Sitemap und robots.txt fehlen bewusst, solange die Seite nicht indexiert werden soll.
- `CLAUDE.md` und `docs/PROJEKTSTATUS.md` gibt es im Repository nicht. Projektregeln stehen in `AGENTS.md`, der Stand in dieser Datei.
