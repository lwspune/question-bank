import { describe, it, expect } from "vitest";
import { principleSlug } from "@/lib/guide/principleSlug";

describe("principleSlug", () => {
  it("lowercases and replaces spaces with hyphens", () => {
    expect(principleSlug("Compound Angle Formulas")).toBe(
      "compound-angle-formulas"
    );
  });

  it("strips em-dashes and re-emits as single hyphen", () => {
    expect(
      principleSlug("Special Matrices — Skew-Symmetric, Diagonal")
    ).toBe("special-matrices-skew-symmetric-diagonal");
  });

  it("strips commas and apostrophes", () => {
    expect(principleSlug("Cramer's Rule, Solution Space")).toBe(
      "cramers-rule-solution-space"
    );
  });

  it("replaces ampersand with 'and'", () => {
    expect(principleSlug("Sets & Relations")).toBe("sets-and-relations");
  });

  it("collapses multiple separators into one hyphen", () => {
    expect(principleSlug("A — B,  C   &   D")).toBe("a-b-c-and-d");
  });

  it("strips leading and trailing hyphens", () => {
    expect(principleSlug("— Leading and trailing —")).toBe(
      "leading-and-trailing"
    );
  });

  it("preserves digits and transliterates Greek letters", () => {
    expect(principleSlug("A+B+C=π identity")).toBe("a-b-c-pi-identity");
    expect(principleSlug("Roots of x^2 = 1")).toBe("roots-of-x-2-1");
    expect(principleSlug("Cube Roots of ω")).toBe("cube-roots-of-omega");
  });

  it("returns an empty string for empty input", () => {
    expect(principleSlug("")).toBe("");
  });
});
