import { describe, it, expect } from "vitest";
import {
  parseQuestionNumber,
  deriveNominalMarks,
  SSC_MATHS_SLOT_MARKS,
  SSC_SCIENCE_SLOT_MARKS,
} from "@/lib/papers/written/provenance";

describe("parseQuestionNumber", () => {
  it("splits an A/B slot from its item", () => {
    expect(parseQuestionNumber("Q1(A)(iii)")).toEqual({ slot: "Q1(A)", depth: 1 });
    expect(parseQuestionNumber("Q2(B)(v)")).toEqual({ slot: "Q2(B)", depth: 1 });
  });

  it("splits a plain slot from its item", () => {
    expect(parseQuestionNumber("Q4(ii)")).toEqual({ slot: "Q4", depth: 1 });
    expect(parseQuestionNumber("Q5(i)")).toEqual({ slot: "Q5", depth: 1 });
  });

  it("reports depth 2 for a sub-parted row", () => {
    expect(parseQuestionNumber("Q3(ii)(a)")).toEqual({ slot: "Q3", depth: 2 });
    expect(parseQuestionNumber("Q4(i)(e)")).toEqual({ slot: "Q4", depth: 2 });
  });

  it("reports depth 0 for a bare slot", () => {
    expect(parseQuestionNumber("Q4")).toEqual({ slot: "Q4", depth: 0 });
  });

  it("tolerates surrounding whitespace", () => {
    expect(parseQuestionNumber("  Q2(A)(i) ")).toEqual({ slot: "Q2(A)", depth: 1 });
  });

  it("returns null for junk or missing numbering", () => {
    expect(parseQuestionNumber("Ex 3.1 Q5")).toBeNull(); // textbook ref, not a board slot
    expect(parseQuestionNumber("")).toBeNull();
    expect(parseQuestionNumber(null)).toBeNull();
    expect(parseQuestionNumber(undefined)).toBeNull();
  });
});

describe("deriveNominalMarks — Maths", () => {
  it("maps each modern Algebra/Geometry slot to its board marks", () => {
    const m = (q: string) => deriveNominalMarks(q, SSC_MATHS_SLOT_MARKS);
    expect(m("Q1(A)(i)")).toBe(1);
    expect(m("Q1(B)(ii)")).toBe(1);
    expect(m("Q2(A)(i)")).toBe(2);
    expect(m("Q2(B)(iv)")).toBe(2);
    expect(m("Q3(A)(i)")).toBe(3);
    expect(m("Q3(B)(ii)")).toBe(3);
    expect(m("Q4(iii)")).toBe(4);
    expect(m("Q5(ii)")).toBe(3);
  });

  it("sums to the 40-mark paper when each slot is counted at its attempt count", () => {
    // 4x1 + 4x1 + 2x2 + 4x2 + 1x3 + 2x3 + 2x4 + 1x3 = 40
    const total =
      4 * 1 + 4 * 1 + 2 * 2 + 4 * 2 + 1 * 3 + 2 * 3 + 2 * 4 + 1 * 3;
    expect(total).toBe(40);
  });

  it("refuses the transitional Q6 slot — it is not in the modern pattern", () => {
    expect(deriveNominalMarks("Q6(i)", SSC_MATHS_SLOT_MARKS)).toBeNull();
  });
});

describe("deriveNominalMarks — Science", () => {
  it("maps each modern Science slot to its board marks", () => {
    const m = (q: string) => deriveNominalMarks(q, SSC_SCIENCE_SLOT_MARKS);
    expect(m("Q1(A)(i)")).toBe(1);
    expect(m("Q1(B)(iii)")).toBe(1);
    expect(m("Q2(A)(ii)")).toBe(2);
    expect(m("Q2(B)(i)")).toBe(2);
    expect(m("Q3(iv)")).toBe(3);
    expect(m("Q4(ii)")).toBe(5);
  });

  it("does NOT tag a sub-parted row — its marks belong to the parent question", () => {
    // Q3(ii)(a),(b),(c) are three rows of ONE 3-mark question. Tagging each 3
    // would treble the question's weight and corrupt slot sourcing.
    expect(deriveNominalMarks("Q3(ii)(a)", SSC_SCIENCE_SLOT_MARKS)).toBeNull();
    expect(deriveNominalMarks("Q4(i)(e)", SSC_SCIENCE_SLOT_MARKS)).toBeNull();
  });

  it("uses the Maths map's Q3 value only when given the Maths map (maps don't leak)", () => {
    // Q3 alone is a Science slot worth 3; in Maths the slot is Q3(A)/Q3(B).
    expect(deriveNominalMarks("Q3(i)", SSC_SCIENCE_SLOT_MARKS)).toBe(3);
    expect(deriveNominalMarks("Q3(i)", SSC_MATHS_SLOT_MARKS)).toBeNull();
  });
});
