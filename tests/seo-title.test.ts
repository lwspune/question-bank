import { describe, it, expect } from "vitest";
import { fitTitle, shortenLead, TITLE_MAX, BRAND } from "@/lib/seo/title";

describe("fitTitle", () => {
  it("keeps every part and the brand when they fit", () => {
    expect(
      fitTitle("Fundamentals", ["MHT-CET Maths", { text: "Indefinite Integration", optional: true }, "Notes"])
    ).toBe("Fundamentals — MHT-CET Maths Indefinite Integration Notes · PYQ Vault");
  });

  it("drops an optional part before dropping the brand", () => {
    const t = fitTitle("Lanthanoids and Actinoids", [
      "MHT-CET Chemistry",
      { text: "Transition and Inner Transition Elements", optional: true },
      "Notes",
    ]);
    expect(t).toBe("Lanthanoids and Actinoids — MHT-CET Chemistry Notes · PYQ Vault");
  });

  it("prefers an optional part over the brand", () => {
    // 62 chars with the chapter, 74 with the brand too — so the brand goes.
    const t = fitTitle("Electrostatic Potential", ["MHT-CET Physics", { text: "Electrostatics", optional: true }, "Notes"]);
    expect(t).toBe("Electrostatic Potential — MHT-CET Physics Electrostatics Notes");
    expect(t.length).toBeLessThanOrEqual(TITLE_MAX);
  });

  it("shortens a long lead at its first colon or dash, only when nothing else fits", () => {
    const t = fitTitle(
      "Lanthanoids and Actinoids: Membership, 4f Configurations and the Lanthanoid Contraction",
      ["MHT-CET Chemistry", { text: "Transition and Inner Transition Elements", optional: true }, "Notes"]
    );
    expect(t).toBe("Lanthanoids and Actinoids — MHT-CET Chemistry Notes · PYQ Vault");
  });

  it("does not shorten a lead that already fits", () => {
    const lead = "Rolle's Theorem: Conditions";
    expect(fitTitle(lead, ["MHT-CET Maths", "Notes"])).toBe(`${lead} — MHT-CET Maths Notes · PYQ Vault`);
  });

  it("never drops a required part; truncates the lead at a word as a last resort", () => {
    const lead = "A very long topic name without any colon or dash that goes on and on and on forever";
    const t = fitTitle(lead, ["MH HSC 12 Physics", "Textbook Solutions"]);
    expect(t.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(t.endsWith(" — MH HSC 12 Physics Textbook Solutions")).toBe(true);
    expect(t).toMatch(/^A very long topic.*… — /);
    expect(t).not.toMatch(/\s…/); // cut at a word, no dangling space
  });

  it("with shortenLead off, trims the full lead at a word instead of cutting at the dash", () => {
    const t = fitTitle("Solution of a Triangle — the Sine, Cosine and Projection Rules", ["MHT-CET Maths", "Notes"], {
      shortenLead: false,
    });
    expect(t.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(t.startsWith("Solution of a Triangle — the Sine")).toBe(true);
    expect(t.endsWith("… — MHT-CET Maths Notes")).toBe(true);
  });

  it("works with no parts at all (a hub page)", () => {
    expect(fitTitle("Board textbook solutions")).toBe("Board textbook solutions · PYQ Vault");
  });

  it("skips empty parts", () => {
    expect(fitTitle("Matrices", ["", "CBSE Class 12 Maths", { text: " ", optional: true }])).toBe(
      "Matrices — CBSE Class 12 Maths · PYQ Vault"
    );
  });

  it("uses the brand constant", () => {
    expect(BRAND).toBe("PYQ Vault");
  });
});

describe("shortenLead", () => {
  it("cuts at the first colon, em dash or en dash", () => {
    expect(shortenLead("Adsorption: Surface vs Bulk")).toBe("Adsorption");
    expect(shortenLead("Distance — From a Point")).toBe("Distance");
    expect(shortenLead("Distance – From a Point")).toBe("Distance");
  });

  it("returns the lead unchanged when there is nothing to cut at", () => {
    expect(shortenLead("Matrices")).toBe("Matrices");
  });

  it("does not cut to an empty or one-word-fragment prefix", () => {
    expect(shortenLead(": leading colon")).toBe(": leading colon");
  });
});
