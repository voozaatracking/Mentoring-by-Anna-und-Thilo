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
  telefon: "+49 4171 60 888 20",
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

  it("kommt ohne Nachricht aus, aber nicht ohne Telefon", () => {
    const ohneNachricht = {
      name: "Erika Beispiel",
      email: "erika@example.org",
      telefon: "04171/6088820",
      stand: "informieren",
      zustimmung: true,
    };
    expect(pruefeAnfrage(ohneNachricht).ok).toBe(true);
    expect(fehlerVon({ ...ohneNachricht, telefon: undefined })).toEqual({
      telefon: "pflicht",
    });
  });

  it("lehnt Eingaben ab, die kein Objekt sind", () => {
    for (const eingabe of [null, undefined, "text", 42, [gueltig]]) {
      expect(fehlerVon(eingabe)).toEqual({
        name: "pflicht",
        email: "pflicht",
        telefon: "pflicht",
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
    it("ist Pflicht: eine fehlende Telefonnummer wird abgelehnt", () => {
      for (const telefon of ["", "   ", undefined, null, 4171]) {
        expect(fehlerVon({ ...gueltig, telefon }).telefon).toBe("pflicht");
      }
    });

    it("nimmt gültige Formate an", () => {
      for (const telefon of [
        "+49 4171 60 888 20",
        "04171/6088820",
        "(04171) 60 888-20",
        "0151 2345678",
        "123456",
      ]) {
        expect(fehlerVon({ ...gueltig, telefon }).telefon, telefon).toBeUndefined();
      }
    });

    it("lehnt ungültige Telefonnummern ab", () => {
      for (const telefon of [
        "ruf mich an",
        "12345", // weniger als 6 Zeichen
        "+49 (0) 1", // weniger als 6 Ziffern
        "0151.2345678", // Punkt ist nicht erlaubt
        "0151 2345678 abends",
        "0151 2345678;5",
      ]) {
        expect(fehlerVon({ ...gueltig, telefon }).telefon, telefon).toBe("format");
      }
    });

    it("erlaubt 6 bis 30 Zeichen", () => {
      expect(GRENZEN.telefonMin).toBe(6);
      expect(GRENZEN.telefonMax).toBe(30);
      expect(
        fehlerVon({ ...gueltig, telefon: "1".repeat(30) }).telefon,
      ).toBeUndefined();
      expect(fehlerVon({ ...gueltig, telefon: "1".repeat(31) }).telefon).toBe(
        "zu_lang",
      );
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

  it("istTelefon verlangt mindestens sechs Ziffern", () => {
    expect(istTelefon("12345")).toBe(false);
    expect(istTelefon("123456")).toBe(true);
    expect(istTelefon("+49 (4171) 60 888-20")).toBe(true);
    expect(istTelefon("+ / ( ) - -")).toBe(false);
  });

  it("istHoneypotGefuellt erkennt Inhalt im Feld website", () => {
    expect(istHoneypotGefuellt({ website: "" })).toBe(false);
    expect(istHoneypotGefuellt({ website: "   " })).toBe(false);
    expect(istHoneypotGefuellt({})).toBe(false);
    expect(istHoneypotGefuellt(null)).toBe(false);
    expect(istHoneypotGefuellt({ website: "http://spam.example" })).toBe(true);
  });
});
