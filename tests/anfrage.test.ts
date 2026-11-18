import { describe, expect, it } from "vitest";
import {
  GRENZEN,
  istEmail,
  istHoneypotGefuellt,
  istTelefon,
  pruefeAnfrage,
} from "@/lib/anfrage";

const gueltig = {
  name: "Erika Beispiel",
  email: "erika@example.org",
  telefon: "",
  stand: "suche",
  nachricht: "",
  zustimmung: true,
  website: "",
};

function fehlerVon(eingabe: unknown) {
  const ergebnis = pruefeAnfrage(eingabe);
  return ergebnis.ok ? {} : ergebnis.fehler;
}

describe("pruefeAnfrage", () => {
  it("nimmt eine gültige Anfrage an und bereinigt die Felder", () => {
    const ergebnis = pruefeAnfrage({
      ...gueltig,
      name: "  Erika\r\nBeispiel  ",
      email: " erika@example.org ",
      telefon: " +49 (0) 151 234-5678 ",
      nachricht: "  Zeile 1\r\nZeile 2\u0007  ",
    });
    expect(ergebnis).toEqual({
      ok: true,
      anfrage: {
        name: "Erika Beispiel",
        email: "erika@example.org",
        telefon: "+49 (0) 151 234-5678",
        stand: "suche",
        nachricht: "Zeile 1\nZeile 2",
        zustimmung: true,
      },
    });
  });

  it("kommt ohne Telefon und Nachricht aus", () => {
    const ergebnis = pruefeAnfrage({
      name: "Erika Beispiel",
      email: "erika@example.org",
      stand: "informieren",
      zustimmung: true,
    });
    expect(ergebnis.ok).toBe(true);
  });

  it("lehnt Eingaben ab, die kein Objekt sind", () => {
    for (const eingabe of [null, undefined, "text", 42, [gueltig]]) {
      expect(fehlerVon(eingabe)).toEqual({
        name: "pflicht",
        email: "pflicht",
        stand: "pflicht",
        zustimmung: "pflicht",
      });
    }
  });

  describe("Name", () => {
    it("verlangt mindestens zwei Zeichen", () => {
      expect(fehlerVon({ ...gueltig, name: "" }).name).toBe("pflicht");
      expect(fehlerVon({ ...gueltig, name: "   " }).name).toBe("pflicht");
      expect(fehlerVon({ ...gueltig, name: "A" }).name).toBe("pflicht");
      expect(fehlerVon({ ...gueltig, name: "Al" }).name).toBeUndefined();
      expect(fehlerVon({ ...gueltig, name: 12 }).name).toBe("pflicht");
    });

    it("erlaubt höchstens 100 Zeichen", () => {
      const genau = "a".repeat(GRENZEN.nameMax);
      expect(fehlerVon({ ...gueltig, name: genau }).name).toBeUndefined();
      expect(fehlerVon({ ...gueltig, name: `${genau}a` }).name).toBe("zu_lang");
    });
  });

  describe("E-Mail", () => {
    it("ist Pflicht", () => {
      expect(fehlerVon({ ...gueltig, email: "" }).email).toBe("pflicht");
    });

    it("prüft das Format", () => {
      for (const email of [
        "erika",
        "erika@",
        "@example.org",
        "erika@example",
        "erika@example.o",
        "erika beispiel@example.org",
        "erika@@example.org",
        "erika@example.org, bcc@example.org",
        "Erika <erika@example.org>",
      ]) {
        expect(fehlerVon({ ...gueltig, email }).email, email).toBe("format");
      }
      for (const email of [
        "erika@example.org",
        "erika.beispiel+test@mail.example.co.uk",
        "e@ex.de",
      ]) {
        expect(fehlerVon({ ...gueltig, email }).email, email).toBeUndefined();
      }
    });

    it("erlaubt höchstens 254 Zeichen", () => {
      const domain = "@example.org";
      const genau = "a".repeat(GRENZEN.emailMax - domain.length) + domain;
      expect(genau).toHaveLength(254);
      expect(fehlerVon({ ...gueltig, email: genau }).email).toBeUndefined();
      expect(fehlerVon({ ...gueltig, email: `a${genau}` }).email).toBe(
        "zu_lang",
      );
    });
  });

  describe("Telefon", () => {
    it("ist optional, prüft aber Format und Länge", () => {
      expect(fehlerVon({ ...gueltig, telefon: "" }).telefon).toBeUndefined();
      expect(
        fehlerVon({ ...gueltig, telefon: "04171 60 888 20" }).telefon,
      ).toBeUndefined();
      expect(fehlerVon({ ...gueltig, telefon: "ruf mich an" }).telefon).toBe(
        "format",
      );
      expect(fehlerVon({ ...gueltig, telefon: "123" }).telefon).toBe("format");
      expect(
        fehlerVon({ ...gueltig, telefon: "1".repeat(GRENZEN.telefonMax) })
          .telefon,
      ).toBeUndefined();
      expect(
        fehlerVon({ ...gueltig, telefon: "1".repeat(GRENZEN.telefonMax + 1) })
          .telefon,
      ).toBe("zu_lang");
    });
  });

  describe("Stand", () => {
    it("verlangt einen der vier Auswahlwerte", () => {
      for (const stand of ["informieren", "suche", "aussicht", "vermiete"]) {
        expect(fehlerVon({ ...gueltig, stand }).stand).toBeUndefined();
      }
      expect(fehlerVon({ ...gueltig, stand: "" }).stand).toBe("pflicht");
      expect(fehlerVon({ ...gueltig, stand: undefined }).stand).toBe("pflicht");
      expect(fehlerVon({ ...gueltig, stand: "anderes" }).stand).toBe(
        "ungueltig",
      );
      expect(fehlerVon({ ...gueltig, stand: 1 }).stand).toBe("ungueltig");
    });
  });

  describe("Nachricht", () => {
    it("erlaubt höchstens 2000 Zeichen", () => {
      const genau = "a".repeat(GRENZEN.nachrichtMax);
      expect(
        fehlerVon({ ...gueltig, nachricht: genau }).nachricht,
      ).toBeUndefined();
      expect(fehlerVon({ ...gueltig, nachricht: `${genau}a` }).nachricht).toBe(
        "zu_lang",
      );
    });
  });

  describe("Zustimmung", () => {
    it("muss genau true sein", () => {
      for (const zustimmung of [false, undefined, null, "true", 1, "on"]) {
        expect(fehlerVon({ ...gueltig, zustimmung }).zustimmung).toBe(
          "pflicht",
        );
      }
      expect(fehlerVon({ ...gueltig, zustimmung: true })).toEqual({});
    });
  });
});

describe("Hilfsfunktionen", () => {
  it("istEmail lehnt leere und zu lange Werte ab", () => {
    expect(istEmail("")).toBe(false);
    expect(istEmail(`${"a".repeat(250)}@ex.de`)).toBe(false);
  });

  it("istTelefon verlangt mindestens fünf Ziffern", () => {
    expect(istTelefon("1234")).toBe(false);
    expect(istTelefon("12345")).toBe(true);
    expect(istTelefon("+49 (4171) 60 888-20")).toBe(true);
  });

  it("istHoneypotGefuellt erkennt Inhalt im Feld website", () => {
    expect(istHoneypotGefuellt({ website: "" })).toBe(false);
    expect(istHoneypotGefuellt({ website: "   " })).toBe(false);
    expect(istHoneypotGefuellt({})).toBe(false);
    expect(istHoneypotGefuellt(null)).toBe(false);
    expect(istHoneypotGefuellt({ website: "http://spam.example" })).toBe(true);
  });
});
