import { describe, expect, it } from "vitest";
import { bestMatch, isGenericTitle, parentTitle, parentsCompatible, similarity, tokens } from "../scripts/syllabus/match-sections";

describe("tokens", () => {
  it("drops filler that cannot discriminate between chemistry headings", () => {
    expect(tokens("Types of the System")).toEqual(["system"]);
  });

  it("keeps chemistry nouns and normalises trailing hyphens from line breaks", () => {
    expect(tokens("Dichloro- methane")).toEqual(["dichloro", "methane"]);
  });
});

describe("similarity", () => {
  it("scores a terse heading against a verbose one on the shorter title", () => {
    // Plain Jaccard would score this ~0.25 and lose a correct match; these two
    // books routinely pair a one-word heading with a descriptive one.
    expect(similarity("Work", "Work and Heat in Thermodynamic Processes")).toBe(1);
  });

  it("scores unrelated headings at zero", () => {
    expect(similarity("Vitamins", "Solubility of a Solid in a Liquid")).toBe(0);
  });

  it("is symmetric", () => {
    expect(similarity("Bond Enthalpy", "Enthalpy of a Bond")).toBe(
      similarity("Enthalpy of a Bond", "Bond Enthalpy"),
    );
  });
});

describe("parentTitle / parentsCompatible", () => {
  const byNo = new Map([["9.5", "Aromatic Hydrocarbons"], ["9.1", "Alkanes"]]);

  it("reads a sub-section's parent title", () => {
    expect(parentTitle("9.5.5", byNo)).toBe("Aromatic Hydrocarbons");
  });

  it("returns empty for a top-level section", () => {
    expect(parentTitle("9.5", byNo)).toBe("");
  });

  it("rejects siblings whose parents share nothing", () => {
    // The exact wrong-section answer: "Physical properties" under Aromatic
    // Hydrocarbons must not pair with "Physical properties of alkanes".
    expect(parentsCompatible("Aromatic Hydrocarbons", "Alkanes")).toBe(false);
  });

  it("permits when either side is top-level, since absence is not evidence", () => {
    expect(parentsCompatible("", "Alkanes")).toBe(true);
    expect(parentsCompatible("Ionization of Acids and Bases", "")).toBe(true);
  });

  it("permits genuinely related parents", () => {
    expect(parentsCompatible("Aromatic Hydrocarbons", "Aromatic Compounds")).toBe(true);
  });
});

describe("parent guard in bestMatch", () => {
  it("skips a high-scoring candidate whose parent is incompatible", () => {
    const candidates = [{ sectionNo: "15.1.4", title: "Physical properties of alkanes", parent: "Alkanes" }];
    expect(bestMatch("Physical properties", candidates, "Aromatic Hydrocarbons")).toBeNull();
    // ...but keeps it when the parents agree.
    expect(bestMatch("Physical properties", candidates, "Alkanes")?.sectionNo).toBe("15.1.4");
  });
});

describe("bestMatch", () => {
  const sb = [
    { sectionNo: "14.5", title: "Isomerism" },
    { sectionNo: "14.6", title: "Theoretical basis of organic reactions" },
    { sectionNo: "12.4", title: "Law of mass action and equilibrium constant" },
  ];

  it("returns the best-scoring candidate", () => {
    const m = bestMatch("Structural Isomerism", sb);
    expect(m?.sectionNo).toBe("14.5");
  });

  it("returns null when nothing clears the threshold", () => {
    // A wrong match asserts coverage that does not exist — worse than no match.
    expect(bestMatch("Vitamins", sb)).toBeNull();
  });

  it("returns null for an empty candidate list rather than throwing", () => {
    expect(bestMatch("Anything", [])).toBeNull();
  });

  it("does not match on filler words alone", () => {
    // "Types of the System" vs "Types of Solids" share only stopwords once
    // filtered, so they must not be paired.
    expect(bestMatch("Types of the System", [{ sectionNo: "1.2", title: "Types of Solids" }])).toBeNull();
  });
});

describe("isGenericTitle", () => {
  it("flags titles that every chapter repeats", () => {
    expect(isGenericTitle("Physical properties")).toBe(true);
    expect(isGenericTitle("Preparation")).toBe(true);
    expect(isGenericTitle("Nomenclature and Isomerism")).toBe(true);
  });

  it("does not flag a title that identifies itself", () => {
    expect(isGenericTitle("Chromatography")).toBe(false);
    expect(isGenericTitle("The pH Scale")).toBe(false);
    expect(isGenericTitle("Lattice Enthalpy")).toBe(false);
  });

  it("guards generic titles but leaves distinctive ones alone", () => {
    const alkaneSide = [{ sectionNo: "15.1.4", title: "Physical properties of alkanes", parent: "Alkanes" }];
    // generic + incompatible parent -> refused
    expect(bestMatch("Physical properties", alkaneSide, "Aromatic Hydrocarbons")).toBeNull();
    // distinctive title -> parent mismatch must NOT block it
    const chrom = [{ sectionNo: "3.5.1", title: "Adsorption Chromatography", parent: "Chromatographic techniques" }];
    expect(bestMatch("Chromatography", chrom, "Methods of Purification")?.sectionNo).toBe("3.5.1");
  });
});

describe("majority-generic guard", () => {
  it("still guards a title carrying a stray extracted word", () => {
    // Real case: the aromatic-hydrocarbons properties section extracts as
    // "Properties Sulphonation: Physical properties". An all-tokens test let it
    // through and it matched the alkanes section.
    expect(isGenericTitle("Properties Sulphonation: Physical properties")).toBe(true);
    const alkanes = [{ sectionNo: "15.1.4", title: "Physical properties of alkanes", parent: "Alkanes" }];
    expect(
      bestMatch("Properties Sulphonation: Physical properties", alkanes, "Aromatic Hydrocarbon"),
    ).toBeNull();
  });

  it("leaves a distinctive title unguarded", () => {
    expect(isGenericTitle("Lattice Enthalpy")).toBe(false);
    expect(isGenericTitle("Hydrogen Bonding")).toBe(false);
  });

  it("guards a half-generic title, which is intended", () => {
    // "Preparation of Benzene" is 1-of-2 generic. Guarding it is correct: it must
    // not pair with "Preparation of alkanes" under a different parent, and the
    // guard only ever rejects on an INCOMPATIBLE parent, so the right match still
    // survives.
    expect(isGenericTitle("Preparation of Benzene")).toBe(true);
    const right = [{ sectionNo: "15.4.4", title: "Preparation of aromatic compounds", parent: "Aromatic Hydrocarbons" }];
    expect(bestMatch("Preparation of Benzene", right, "Aromatic Hydrocarbon")?.sectionNo).toBe("15.4.4");
  });
});
