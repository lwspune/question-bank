import { describe, expect, it } from "vitest";
import { bestMatch, similarity, tokens } from "../scripts/syllabus/match-sections";

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
