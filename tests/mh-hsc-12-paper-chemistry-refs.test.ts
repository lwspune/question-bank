import { describe, it, expect } from "vitest";
import {
  CHEMISTRY_GRAMMAR as G,
  PHYSICS_GRAMMAR,
  MATHS_GRAMMAR,
  grammarFor,
  HSC_CHEMISTRY_CHAPTERS,
} from "../scripts/mh-hsc-12-pyq/paper/lib";

/**
 * The printed MH HSC Class-12 CHEMISTRY paper, measured off the June 2026
 * print (code J-261) and identical on every born-digital sitting in the folder:
 *
 *   Q.1  (i)-(x)     10 MCQ          1 mark   — all compulsory
 *   Q.2  (i)-(viii)   8 VSA          1 mark   — all compulsory
 *   Q.3-14           12 short        2 marks  — attempt any 8
 *   Q.15-26          12 short        3 marks  — attempt any 8
 *   Q.27-31           5 long         4 marks  — attempt any 3
 *
 * 47 items — STRUCTURALLY IDENTICAL to Physics. The two differ only in the ref
 * SPELLING and the chapter list, which is exactly what `GrammarSpec` is for.
 */
describe("CHEMISTRY_GRAMMAR.expectedRefs — the printed shape", () => {
  it("is 47 items: 10 MCQ + 8 VSA + 12 + 12 + 5", () => {
    expect(G.expectedRefs).toHaveLength(47);
  });

  it("carries no duplicates", () => {
    expect(new Set(G.expectedRefs).size).toBe(G.expectedRefs.length);
  });

  it("opens on Q.1 roman sub-items and closes on Q.31", () => {
    expect(G.expectedRefs[0]).toBe("Q.1.i");
    expect(G.expectedRefs[9]).toBe("Q.1.x");
    expect(G.expectedRefs[10]).toBe("Q.2.i");
    expect(G.expectedRefs[17]).toBe("Q.2.viii");
    expect(G.expectedRefs[18]).toBe("Q. 3");
    expect(G.expectedRefs.at(-1)).toBe("Q. 31");
  });

  /**
   * THE SPELLING IS THE WHOLE REASON THIS IS A THIRD GRAMMAR RATHER THAN A
   * REUSE OF PHYSICS. Three subjects, three spellings, all of them already
   * shipped in the bank:
   *
   *   Maths      Q. 1. (v)
   *   Physics    Q. 1(v)
   *   Chemistry  Q.1.v      <- 128 of 131 distinct Chemistry refs, no brackets
   *
   * Reconciliation compares against the shipped rows, so getting this wrong
   * makes every ref look missing while every shipped row looks unexpected.
   */
  it("uses the shipped Chemistry spelling — no brackets, no space", () => {
    expect(G.expectedRefs).toContain("Q.1.v");
    expect(G.expectedRefs).not.toContain("Q. 1(v)");
    expect(G.expectedRefs).not.toContain("Q. 1. (v)");
    expect(PHYSICS_GRAMMAR.expectedRefs).toContain("Q. 1(v)");
    expect(MATHS_GRAMMAR.expectedRefs).toContain("Q. 1. (v)");
  });

  it("reaches (ix) and (x), which the Maths paper never has", () => {
    expect(G.expectedRefs).toContain("Q.1.ix");
    expect(G.expectedRefs).toContain("Q.1.x");
    expect(MATHS_GRAMMAR.expectedRefs).not.toContain("Q. 1. (ix)");
  });
});

describe("normaliseRef", () => {
  it("folds observed spellings of Q.1.iii onto the shipped form", () => {
    for (const raw of ["Q.1.iii", "Q. 1(iii)", "Q. 1. (iii)", "Q 1 iii", "Q. 1. III."]) {
      expect(G.normaliseRef(raw)).toBe("Q.1.iii");
    }
  });

  it("folds whole-question spellings", () => {
    for (const raw of ["Q. 27", "Q.27", "Q 27", "Q. 27."]) {
      expect(G.normaliseRef(raw)).toBe("Q. 27");
    }
  });

  it("rejects a ref outside the printed range", () => {
    expect(G.normaliseRef("Q. 32")).toBeNull();
    expect(G.normaliseRef("Q.1.xi")).toBeNull();
    expect(G.normaliseRef("Q.2.ix")).toBeNull();
  });
});

/**
 * THE COMPILATION SPLITS A MIXED-BAG QUESTION WITH LETTERS, NOT ROMANS.
 * Measured on the 2025 sitting: `Q.4.a`, `Q.19.b`, `Q.21.a`, `Q.31.b` and even
 * `Q.22.b.i` sit alongside roman splits `Q.7.ii`, `Q.14.i`. Neither Maths nor
 * Physics has a letter split anywhere, which is why the parser never needed it.
 *
 * Without this, every letter-split row in the bank reads as `unexpected` at
 * reconcile time — 12 of the 2025 sitting's 52 rows — and the report is noise
 * rather than a finding. Letters map onto the same part index as romans, so
 * `Q.4.a` and `Q.4.i` are the SAME part and must fold onto one canonical form.
 */
describe("letter split parts — the Chemistry compilation's own convention", () => {
  it("folds a letter part onto the canonical split ref", () => {
    expect(G.normaliseRef("Q.4.a")).toBe("Q. 4(i)");
    expect(G.normaliseRef("Q.19.b")).toBe("Q. 19(ii)");
    expect(G.normaliseRef("Q.31.c")).toBe("Q. 31(iii)");
  });

  it("maps a letter and its roman twin onto the SAME ref", () => {
    expect(G.normaliseRef("Q.14.a")).toBe(G.normaliseRef("Q.14.i"));
    expect(G.normaliseRef("Q.14.b")).toBe(G.normaliseRef("Q.14.ii"));
  });

  it("counts a letter-split part against its printed parent", () => {
    const seen = G.expectedRefs.filter((r) => r !== "Q. 21").concat(["Q.21.a", "Q.21.b"]);
    const r = G.reconcileRefs(seen);
    expect(r.missing).toEqual([]);
    expect(r.unexpected).toEqual([]);
  });

  // Q.1 and Q.2 are BLOCK headers whose sub-items are romans on every printed
  // paper. A letter there is not a split, so it must stay a parse failure.
  it("does not accept a letter under the Q.1 / Q.2 blocks", () => {
    expect(G.normaliseRef("Q.1.a")).toBeNull();
    expect(G.normaliseRef("Q.2.b")).toBeNull();
  });

  it("stays OFF for Maths and Physics, which have no letter splits", () => {
    expect(PHYSICS_GRAMMAR.normaliseRef("Q. 21(a)")).toBeNull();
    expect(MATHS_GRAMMAR.normaliseRef("Q. 21(a)")).toBeNull();
  });
});

describe("sectionOf — section, marks and format", () => {
  it("puts the Q.1 block in Section A as 1-mark MCQs", () => {
    expect(G.sectionOf("Q.1.i")).toEqual({ section: "A", marks: 1, format: "mcq" });
    expect(G.sectionOf("Q.1.x")).toEqual({ section: "A", marks: 1, format: "mcq" });
  });

  it("puts the Q.2 block in Section A as 1-mark written answers", () => {
    expect(G.sectionOf("Q.2.i")).toEqual({ section: "A", marks: 1, format: "subjective" });
    expect(G.sectionOf("Q.2.viii")).toEqual({ section: "A", marks: 1, format: "subjective" });
  });

  it("bands the whole-numbered questions B/C/D at 2/3/4 marks", () => {
    expect(G.sectionOf("Q. 3")).toEqual({ section: "B", marks: 2, format: "subjective" });
    expect(G.sectionOf("Q. 14")).toEqual({ section: "B", marks: 2, format: "subjective" });
    expect(G.sectionOf("Q. 15")).toEqual({ section: "C", marks: 3, format: "subjective" });
    expect(G.sectionOf("Q. 26")).toEqual({ section: "C", marks: 3, format: "subjective" });
    expect(G.sectionOf("Q. 27")).toEqual({ section: "D", marks: 4, format: "subjective" });
    expect(G.sectionOf("Q. 31")).toEqual({ section: "D", marks: 4, format: "subjective" });
  });

  it("prints 98 marks against a Max of 70 — the gap IS the optionality", () => {
    const total = G.expectedRefs.reduce((n, r) => n + (G.sectionOf(r)?.marks ?? 0), 0);
    expect(total).toBe(98);
  });
});

describe("chapters", () => {
  it("carries the 16 live Chemistry chapters", () => {
    expect(HSC_CHEMISTRY_CHAPTERS).toHaveLength(16);
    expect(new Set(HSC_CHEMISTRY_CHAPTERS).size).toBe(16);
  });

  it("accepts a live chapter and rejects a Physics one", () => {
    expect(G.validateChapter("Chemical Kinetics")).toBe("Chemical Kinetics");
    expect(() => G.validateChapter("Rotational Dynamics")).toThrow();
  });

  /** The two organic chapters are the ones a transcription most often merges. */
  it("keeps the two organic chapters distinct", () => {
    expect(HSC_CHEMISTRY_CHAPTERS).toContain("Alcohols, Phenols and Ethers");
    expect(HSC_CHEMISTRY_CHAPTERS).toContain("Aldehydes, Ketones and Carboxylic Acids");
  });
});

describe("grammarFor — the routing key", () => {
  it("routes Chemistry to its own grammar, not Physics'", () => {
    expect(grammarFor("Chemistry")).toBe(G);
    expect(grammarFor("Physics")).toBe(PHYSICS_GRAMMAR);
    expect(grammarFor("Mathematics")).toBe(MATHS_GRAMMAR);
  });

  it("throws on an unknown subject rather than defaulting", () => {
    expect(() => grammarFor("Biology")).toThrow(/no board-paper grammar/);
  });
});

describe("reconcileRefs", () => {
  it("reports a complete paper as clean", () => {
    const r = G.reconcileRefs(G.expectedRefs);
    expect(r.missing).toEqual([]);
    expect(r.unexpected).toEqual([]);
    expect(r.duplicates).toEqual([]);
  });

  it("names a missing ref in the shipped spelling", () => {
    const r = G.reconcileRefs(G.expectedRefs.filter((x) => x !== "Q.1.iv"));
    expect(r.missing).toEqual(["Q.1.iv"]);
  });

  it("catches a duplicate", () => {
    const r = G.reconcileRefs([...G.expectedRefs, "Q. 20"]);
    expect(r.duplicates).toEqual(["Q. 20"]);
  });
});
