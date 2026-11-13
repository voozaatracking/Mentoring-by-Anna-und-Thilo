# Roadmap

Stand: erster Wurf. Diese Datei sammelt alle Platzhalter und offenen Punkte.

## Platzhalter auf der Seite

Alle Einträge stehen in `content/site.ts` und sind dort mit `placeholder: true` markiert.

| Nr. | Abschnitt | Was fehlt | Objekt in `content/site.ts` |
| --- | --- | --- | --- |
| 1 | Ablauf | Monat 1: Inhalt laut Thilo | `ablauf.eintraege[0]` |
| 2 | Ablauf | Monat 2: Inhalt laut Thilo | `ablauf.eintraege[1]` |
| 3 | Ablauf | Monat 3: Inhalt laut Thilo | `ablauf.eintraege[2]` |
| 4 | Ablauf | Danach: Inhalt laut Thilo | `ablauf.eintraege[3]` |
| 5 | Ablauf | Format der Termine (Video oder vor Ort, einzeln oder Gruppe) | `ablauf.format` |
| 6 | Zahlen | Erfahrungswert je Wohnung. Nur nach Freigabe durch Thilo, mit Zusatz „eigene Erfahrung, kein Versprechen“ | `zahlen.erfahrungswert` |
| 7 | Zahlen | Stimme eines Teilnehmers (1) | `zahlen.stimmen[0]` |
| 8 | Zahlen | Stimme eines Teilnehmers (2) | `zahlen.stimmen[1]` |
| 9 | Zahlen | Stimme eines Teilnehmers (3) | `zahlen.stimmen[2]` |
| 10 | Paket | Weitere Bestandteile des Pakets | `paket.karte.punkte[2]` |
| 11 | Paket | Preis | `paket.karte.preis` |
| 12 | Erstgespräch | Dauer, Kosten und Ablauf des Erstgesprächs | `erstgespraech.rahmen` |

## Fehlende Bilder

Der Ordner `assets/images/` war beim ersten Wurf nicht im Repository. Alle zwölf Bilder erscheinen deshalb als Fläche „Bild folgt“. Ablauf zum Nachliefern: siehe README, Abschnitt Bilder.

- `hero-heide.jpg`
- `anna-thilo-bank.jpg`
- `anna-portrait.jpg`
- `thilo-portrait.jpg`
- `anna-thilo-laptop.jpg`
- `anna-thilo-weg.jpg`
- `hygge-homes-ruecken.jpg`
- `anna-thilo-erstgespraech.jpg`
- `wohnung-schlafen.jpg`
- `wohnung-wohnen.png`
- `wohnung-essen.png`
- `wohnung-studio.jpg`

Nach dem Nachliefern:

- Alt-Texte gegen die Fotos prüfen. Sie sind ohne Sichtung formuliert.
- Bildausschnitte prüfen, vor allem Einstieg, Porträts (4:5) und Ablauf (Hochformat).
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
- Auftragsverarbeitung mit Vercel und Strato, Übermittlung in Drittländer
- Umfang und Speicherdauer der Verbindungsdaten bei Vercel
- Speicherdauer der Anfragen im Postfach
- Verweise auf die Artikel der DSGVO
- Zuständige Aufsichtsbehörde
- Datum der Fassung

## Vor dem Livegang

- [ ] Alle Platzhalter ersetzt, dann `SHOW_PLACEHOLDER_MARKS = false`
- [ ] Bilder geliefert, Alt-Texte geprüft
- [ ] Rechtsseiten geprüft, Hinweis „Entwurf“ entfernt
- [ ] Umgebungsvariablen in Vercel gesetzt, Testanfrage auf der Preview gesendet
- [ ] Endgültige Domain festgelegt und als `SITE_URL` gesetzt
- [ ] `ALLOW_INDEXING = true`

## Offene Punkte und Ideen

- Rate-Limit liegt im Arbeitsspeicher und gilt bei Vercel je Instanz. Für einen härteren Schutz wäre ein gemeinsamer Speicher nötig. Das widerspricht der Vorgabe „keine Datenbank“ und ist deshalb offen.
- Das Formular braucht JavaScript. Ohne JavaScript zeigt es die Ausweichadresse.
- Favicon ist ein neutrales Zeichen. Ein Logo von Hygge Homes fehlt.
- Wortmarke in der Kopfzeile ist reiner Text. Ein Logo kann sie später ersetzen.
- Sitemap und robots.txt fehlen bewusst, solange die Seite nicht indexiert werden soll.
