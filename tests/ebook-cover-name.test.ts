/**
 * The buyer's name on an ebook's cover (2026-10-28, owner: "add
 * personalisation"). The account's name is the default, the buyer may change
 * it (a parent's account buying for a child), and the cover prints in a
 * built-in PDF font, so only names that font can draw are accepted.
 */
import { describe, it, expect } from "vitest";
import { MAX_PRINT_NAME, accountNameOf, coverName, tidyName, validatePrintName } from "@/lib/ebooks/coverName";

describe("tidyName", () => {
  it("trims and collapses spaces", () => {
    expect(tidyName("  Asha   Patil ")).toBe("Asha Patil");
  });

  it("title-cases a name typed all in capitals or all in small letters", () => {
    expect(tidyName("MOHINEE SHIRKE")).toBe("Mohinee Shirke");
    expect(tidyName("rahul d'souza")).toBe("Rahul D'Souza");
    expect(tidyName("ANNE-MARIE")).toBe("Anne-Marie");
  });

  it("leaves a name the person cased themselves alone", () => {
    expect(tidyName("Ravi McDonald")).toBe("Ravi McDonald");
  });
});

describe("validatePrintName", () => {
  it("accepts an ordinary name and returns it tidied", () => {
    expect(validatePrintName(" ASHA PATIL ")).toEqual({ ok: true, name: "Asha Patil" });
  });

  it("refuses an empty name", () => {
    expect(validatePrintName("   ").ok).toBe(false);
  });

  it(`refuses a name over ${MAX_PRINT_NAME} characters`, () => {
    expect(validatePrintName("A".repeat(MAX_PRINT_NAME + 1)).ok).toBe(false);
    expect(validatePrintName("A".repeat(MAX_PRINT_NAME)).ok).toBe(true);
  });

  it("refuses letters the cover's font cannot draw, with a reason", () => {
    const r = validatePrintName("रमा पाटील");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/English letters/i);
  });

  it("refuses digits and symbols, so the cover carries a name and nothing else", () => {
    expect(validatePrintName("Asha 123").ok).toBe(false);
    expect(validatePrintName("www.example.com").ok).toBe(false);
    expect(validatePrintName("asha@example.com").ok).toBe(false);
  });

  it("allows the marks names carry: dots, apostrophes, hyphens and accents", () => {
    expect(validatePrintName("Dr. A. K. O'Brien-Rao").ok).toBe(true);
    expect(validatePrintName("José Müller").ok).toBe(true);
  });
});

describe("coverName", () => {
  it("prints the name the buyer chose first", () => {
    expect(coverName({ printName: "Kartavya Shirke", accountName: "MOHINEE SHIRKE" })).toBe("Kartavya Shirke");
  });

  it("falls back to the account's name, tidied", () => {
    expect(coverName({ printName: null, accountName: "MOHINEE SHIRKE" })).toBe("Mohinee Shirke");
  });

  it("skips an account name the cover cannot print", () => {
    expect(coverName({ printName: null, accountName: "रमा" })).toBeNull();
    expect(coverName({ printName: null, accountName: "" })).toBeNull();
    expect(coverName({ printName: undefined, accountName: undefined })).toBeNull();
  });
});

describe("accountNameOf", () => {
  it("reads the name a sign-up stored: Google's full_name, else name", () => {
    expect(accountNameOf({ full_name: "Asha Patil", name: "Asha" })).toBe("Asha Patil");
    expect(accountNameOf({ name: "Asha" })).toBe("Asha");
    expect(accountNameOf({ full_name: 42 })).toBeNull();
    expect(accountNameOf(null)).toBeNull();
  });
});
