import { describe, it, expect } from "vitest";
import {
  PHYSICS_GRAMMAR as G,
  MATHS_GRAMMAR,
  grammarFor,
  HSC_PHYSICS_CHAPTERS,
} from "../scripts/mh-hsc-12-pyq/paper/lib";

/**
 * The printed MH HSC Class-12 PHYSICS paper, measured off the June 2026 print
 * (code J-229) and identical on every born-digital sitting in the folder:
 *
 *   Q.1  (i)-(x)     10 MCQ          1 mark   — all compulsory
 *   Q.2  (i)-(viii)   8 VSA          1 mark   — all compulsory
 *   Q.3-14           12 short        2 marks  — attempt any 8
 *   Q.15-26          12 short        3 marks  — attempt any 8
 *   Q.27-31           5 long         4 marks  — attempt any 3
 *
 * 47 items, 98 printed marks against a Max of 70. The gap IS the optionality.
 */
describe("PHYSICS_GRAMMAR.expectedRefs — the printed shape", () => {
  it("is 47 items: 10 MCQ + 8 VSA + 12 + 12 + 5", () => {
    expect(G.expectedRefs).toHaveLength(47);
  });

  it("carries no duplicates", () => {
    expect(new Set(G.expectedRefs).size).toBe(G.expectedRefs.length);
  });

  it("opens on Q.1 roman sub-items and closes on Q.31", () => {
    expect(G.expectedRefs[0]).toBe("Q. 1(i)");
    expect(G.expectedRefs[9]).toBe("Q. 1(x)");
    expect(G.expectedRefs[10]).toBe("Q. 2(i)");
    expect(G.expectedRefs[17]).toBe("Q. 2(viii)");
    expect(G.expectedRefs[18]).toBe("Q. 3");
    expect(G.expectedRefs.at(-1)).toBe("Q. 31");
  });

  // The canonical spelling is NOT the Maths one. 364 Physics rows are already
  // shipped as `Q. 1(v)`; reconciling against them needs that exact form.
  it("uses the shipped Physics spelling, not the Maths 'Q. 1. (i)'", () => {
    expect(G.expectedRefs).toContain("Q. 1(v)");
    expect(G.expectedRefs).not.toContain("Q. 1. (v)");
    expect(MATHS_GRAMMAR.expectedRefs).toContain("Q. 1. (v)");
  });
});

describe("normaliseRef", () => {
  it("folds observed spellings of Q.1(iii) onto the shipped form", () => {
    for (const raw of ["Q. 1(iii)", "Q. 1. (iii)", "Q.1(iii)", "Q 1 iii", "Q. 1. III."]) {
      expect(G.normaliseRef(raw)).toBe("Q. 1(iii)");
    }
  });

  it("reaches (ix) and (x), which the Maths paper never has", () => {
    expect(G.normaliseRef("Q. 1(ix)")).toBe("Q. 1(ix)");
    expect(G.normaliseRef("Q. 1(x)")).toBe("Q. 1(x)");
    expect(MATHS_GRAMMAR.normaliseRef("Q. 1. (ix)")).toBeNull();
  });

  it("lets Q.2 run to (viii) — the Maths paper stops at (iv)", () => {
    expect(G.normaliseRef("Q. 2(viii)")).toBe("Q. 2(viii)");
    expect(MATHS_GRAMMAR.normaliseRef("Q. 2. (viii)")).toBeNull();
  });

  it("is idempotent on every canonical ref", () => {
    for (const ref of G.expectedRefs) expect(G.normaliseRef(ref)).toBe(ref);
  });

  it("returns null rather than guessing", () => {
    expect(G.normaliseRef("SECTION - A")).toBeNull();
    expect(G.normaliseRef("")).toBeNull();
    // Q.32 does not exist on this paper — Maths runs to 34, Physics stops at 31.
    expect(G.normaliseRef("Q. 32")).toBeNull();
    expect(G.normaliseRef("Q. 1(xi)")).toBeNull();
    expect(G.normaliseRef("Q. 2(ix)")).toBeNull();
    // Q.1 and Q.2 are BLOCK headers, not items.
    expect(G.normaliseRef("Q. 1")).toBeNull();
    expect(G.normaliseRef("Q. 2")).toBeNull();
  });
});

/**
 * A Section-D item worth 4 marks routinely welds a derivation to an unrelated
 * numerical. June-2026 Q.31 is "obtain an expression for the magnetic induction
 * of a toroid" + "a Carnot refrigerator operates between 150 K and 200 K" —
 * Magnetic Fields and Thermodynamics, one printed item.
 *
 * The bank holds BOTH precedents for this and they are not equally good. The
 * compilation duplicated the bare number (2022 and 2024 each carry 'Q. 29'
 * twice, filed in two chapters), which makes a genuine double-transcription
 * indistinguishable from a deliberate split. The 2023 source numbers the parts
 * 'Q. 29(i)' / 'Q. 29(ii)'. We adopt that: distinct refs, so the duplicate
 * check keeps working.
 */
describe("split refs — one printed item, two chapters", () => {
  it("accepts a roman part on a whole-number ref", () => {
    expect(G.normaliseRef("Q. 31(i)")).toBe("Q. 31(i)");
    expect(G.normaliseRef("Q. 31 (ii)")).toBe("Q. 31(ii)");
  });

  it("maps a part back to the printed item it came from", () => {
    expect(G.parentRef("Q. 31(i)")).toBe("Q. 31");
    expect(G.parentRef("Q. 31(ii)")).toBe("Q. 31");
    expect(G.parentRef("Q. 31")).toBe("Q. 31");
    expect(G.parentRef("Q. 1(v)")).toBe("Q. 1(v)");
  });

  it("refuses a part of an item that is not on the paper", () => {
    expect(G.normaliseRef("Q. 32(i)")).toBeNull();
  });

  it("places a part exactly where its parent sits", () => {
    expect(G.sectionOf("Q. 31(ii)")).toEqual(G.sectionOf("Q. 31"));
  });
});

describe("sectionOf — printed structure, never a judgement", () => {
  it("reads Q.1 as a 1-mark MCQ, unlike the Maths paper's 2-mark", () => {
    expect(G.sectionOf("Q. 1(i)")).toEqual({ section: "A", marks: 1, format: "mcq" });
    expect(MATHS_GRAMMAR.sectionOf("Q. 1. (i)")).toEqual({ section: "A", marks: 2, format: "mcq" });
  });

  it("reads Q.2 as a 1-mark written answer", () => {
    expect(G.sectionOf("Q. 2(viii)")).toEqual({ section: "A", marks: 1, format: "subjective" });
  });

  it("bands the whole-number questions B/C/D at 2/3/4 marks", () => {
    expect(G.sectionOf("Q. 3")).toEqual({ section: "B", marks: 2, format: "subjective" });
    expect(G.sectionOf("Q. 14")).toEqual({ section: "B", marks: 2, format: "subjective" });
    expect(G.sectionOf("Q. 15")).toEqual({ section: "C", marks: 3, format: "subjective" });
    expect(G.sectionOf("Q. 26")).toEqual({ section: "C", marks: 3, format: "subjective" });
    expect(G.sectionOf("Q. 27")).toEqual({ section: "D", marks: 4, format: "subjective" });
    expect(G.sectionOf("Q. 31")).toEqual({ section: "D", marks: 4, format: "subjective" });
  });

  it("throws on a ref that is not on this paper", () => {
    expect(() => G.sectionOf("Q. 32")).toThrow(/not a question ref/);
  });

  it("totals 98 printed marks against the cover's Max 70", () => {
    const total = G.expectedRefs.reduce((n, r) => n + G.sectionOf(r).marks, 0);
    expect(total).toBe(98);
  });

  it("counts exactly 10 MCQs — the only keyed items on the paper", () => {
    const mcq = G.expectedRefs.filter((r) => G.sectionOf(r).format === "mcq");
    expect(mcq).toHaveLength(10);
  });
});

describe("reconcileRefs — both directions, because a count is not enough", () => {
  it("passes a complete transcription", () => {
    expect(G.reconcileRefs(G.expectedRefs)).toEqual({ missing: [], unexpected: [], duplicates: [] });
  });

  it("names what is missing", () => {
    const seen = G.expectedRefs.filter((r) => r !== "Q. 23");
    expect(G.reconcileRefs(seen).missing).toEqual(["Q. 23"]);
  });

  it("names what is not on the paper instead of dropping it", () => {
    expect(G.reconcileRefs([...G.expectedRefs, "Q. 32"]).unexpected).toEqual(["Q. 32"]);
  });

  // The failure a length check cannot see: one item transcribed twice under two
  // spellings while another is dropped still totals 47.
  it("catches a duplicate that a count would hide", () => {
    const seen = G.expectedRefs.filter((r) => r !== "Q. 23").concat("Q. 1. (iii)");
    const rec = G.reconcileRefs(seen);
    expect(seen).toHaveLength(G.expectedRefs.length);
    expect(rec.duplicates).toEqual(["Q. 1(iii)"]);
    expect(rec.missing).toEqual(["Q. 23"]);
  });

  it("treats a split pair as covering its printed item, not as two strays", () => {
    const seen = G.expectedRefs.filter((r) => r !== "Q. 31").concat("Q. 31(i)", "Q. 31(ii)");
    expect(G.reconcileRefs(seen)).toEqual({ missing: [], unexpected: [], duplicates: [] });
  });

  it("refuses a bare item sitting alongside its own split parts", () => {
    const seen = [...G.expectedRefs, "Q. 31(i)"];
    expect(G.reconcileRefs(seen).duplicates).toEqual(["Q. 31"]);
  });
});

describe("validateChapter — HARD, because auto-create would fork a shipped chapter", () => {
  it("accepts all 16 chapters the bank carries", () => {
    expect(HSC_PHYSICS_CHAPTERS).toHaveLength(16);
    for (const c of HSC_PHYSICS_CHAPTERS) expect(G.validateChapter(c)).toBe(c);
  });

  it("names the near-match, which is the answer nearly every time it fires", () => {
    expect(() => G.validateChapter("Magnetic Field due to Electric Current")).toThrow(
      /Did you mean "Magnetic Fields due to Electric Current"/,
    );
    expect(() => G.validateChapter("Atoms and Nuclei")).toThrow(
      /Did you mean "Structure of Atoms and Nuclei"/,
    );
  });

  it("refuses a Maths chapter routed into the Physics lane", () => {
    expect(() => G.validateChapter("Matrices")).toThrow(/unknown mh-hsc-12 Physics chapter/);
  });
});

describe("grammarFor", () => {
  it("routes by subject name", () => {
    expect(grammarFor("Physics")).toBe(G);
    expect(grammarFor("Mathematics")).toBe(MATHS_GRAMMAR);
  });

  it("throws on a subject this lane does not carry", () => {
    expect(() => grammarFor("Chemistry")).toThrow(/Chemistry/);
  });
});
