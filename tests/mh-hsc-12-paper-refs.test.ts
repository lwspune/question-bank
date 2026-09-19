import { describe, it, expect } from "vitest";
import {
  EXPECTED_REFS,
  normaliseRef,
  sectionOf,
  reconcileRefs,
  validateChapter,
  HSC_MATHS_CHAPTERS,
} from "../scripts/mh-hsc-12-pyq/paper/lib";

describe("EXPECTED_REFS — the printed shape of an HSC Maths paper", () => {
  it("is 44 items: 8 MCQ + 4 VSA + 12 + 12 + 8", () => {
    expect(EXPECTED_REFS).toHaveLength(44);
  });

  it("carries no duplicates", () => {
    expect(new Set(EXPECTED_REFS).size).toBe(EXPECTED_REFS.length);
  });

  it("opens on Q.1 roman sub-items and closes on Q.34", () => {
    expect(EXPECTED_REFS[0]).toBe("Q. 1. (i)");
    expect(EXPECTED_REFS[7]).toBe("Q. 1. (viii)");
    expect(EXPECTED_REFS[8]).toBe("Q. 2. (i)");
    expect(EXPECTED_REFS[11]).toBe("Q. 2. (iv)");
    expect(EXPECTED_REFS[12]).toBe("Q. 3");
    expect(EXPECTED_REFS.at(-1)).toBe("Q. 34");
  });
});

describe("normaliseRef — the compilation's numbering is inconsistent", () => {
  // The shipped 2024/2025 rows carry FIVE spellings of the same sub-item.
  // Reconciling a new transcription against them needs one canonical form.
  it("folds every observed spelling of Q.1(iii) together", () => {
    for (const raw of ["Q. 1. iii.", "Q. 1. (iii)", "Q.1.iii", "Q 1 (iii)", "Q. 1. III."]) {
      expect(normaliseRef(raw)).toBe("Q. 1. (iii)");
    }
  });

  it("folds every observed spelling of Q.2(iv) together", () => {
    for (const raw of ["Q. 2. iv.", "Q. 2. (iv)", "Q.2.iv"]) {
      expect(normaliseRef(raw)).toBe("Q. 2. (iv)");
    }
  });

  it("folds whole-number refs", () => {
    expect(normaliseRef("Q. 23")).toBe("Q. 23");
    expect(normaliseRef("Q.23")).toBe("Q. 23");
    expect(normaliseRef("Q 23")).toBe("Q. 23");
  });

  it("is idempotent — normalising a canonical ref changes nothing", () => {
    for (const ref of EXPECTED_REFS) expect(normaliseRef(ref)).toBe(ref);
  });

  it("returns null for something that is not a ref, rather than guessing", () => {
    expect(normaliseRef("SECTION - A")).toBeNull();
    expect(normaliseRef("")).toBeNull();
    // Q.35 does not exist on this paper — a plausible-looking ref is still wrong.
    expect(normaliseRef("Q. 35")).toBeNull();
    expect(normaliseRef("Q. 1. (ix)")).toBeNull();
  });
});

describe("sectionOf — section, marks and format follow from the ref alone", () => {
  it("puts Q.1 sub-items in Section A as 2-mark MCQs", () => {
    expect(sectionOf("Q. 1. (i)")).toEqual({ section: "A", marks: 2, format: "mcq" });
    expect(sectionOf("Q. 1. (viii)")).toEqual({ section: "A", marks: 2, format: "mcq" });
  });

  it("puts Q.2 sub-items in Section A as 1-mark free-response", () => {
    expect(sectionOf("Q. 2. (iii)")).toEqual({ section: "A", marks: 1, format: "subjective" });
  });

  it("splits Q.3-34 across B/C/D at the printed boundaries", () => {
    expect(sectionOf("Q. 3")).toEqual({ section: "B", marks: 2, format: "subjective" });
    expect(sectionOf("Q. 14")).toEqual({ section: "B", marks: 2, format: "subjective" });
    expect(sectionOf("Q. 15")).toEqual({ section: "C", marks: 3, format: "subjective" });
    expect(sectionOf("Q. 26")).toEqual({ section: "C", marks: 3, format: "subjective" });
    expect(sectionOf("Q. 27")).toEqual({ section: "D", marks: 4, format: "subjective" });
    expect(sectionOf("Q. 34")).toEqual({ section: "D", marks: 4, format: "subjective" });
  });

  it("accepts a non-canonical spelling by normalising first", () => {
    expect(sectionOf("Q. 1. iii.")).toEqual({ section: "A", marks: 2, format: "mcq" });
  });

  it("throws on a ref that is not on the paper", () => {
    expect(() => sectionOf("Q. 35")).toThrow();
  });

  it("agrees with the printed mark total: 8*2 + 4*1 + 12*2 + 12*3 + 8*4 = 112 printed", () => {
    // 112 PRINTED marks against a Max of 80 — the gap IS the optionality
    // (attempt any 8 of 12, any 8 of 12, any 5 of 8). Asserting the printed
    // total guards the marks table; it is deliberately not 80.
    const total = EXPECTED_REFS.reduce((n, r) => n + sectionOf(r).marks, 0);
    expect(total).toBe(112);
  });
});

describe("reconcileRefs — completeness is checked BOTH ways", () => {
  it("reports nothing for a complete paper", () => {
    expect(reconcileRefs(EXPECTED_REFS)).toEqual({ missing: [], unexpected: [], duplicates: [] });
  });

  it("names what the transcription dropped", () => {
    // Exactly the March-2024 delta: the compilation is missing these two.
    const seen = EXPECTED_REFS.filter((r) => r !== "Q. 2. (iii)" && r !== "Q. 23");
    expect(reconcileRefs(seen).missing).toEqual(["Q. 2. (iii)", "Q. 23"]);
  });

  it("names a ref that is not on the paper instead of ignoring it", () => {
    expect(reconcileRefs([...EXPECTED_REFS, "Q. 35"]).unexpected).toEqual(["Q. 35"]);
  });

  it("catches the same question transcribed twice under two spellings", () => {
    // A count alone passes this: 44 refs, one of them a duplicate in disguise.
    const seen = EXPECTED_REFS.filter((r) => r !== "Q. 23").concat("Q. 1. iii.");
    const out = reconcileRefs(seen);
    expect(out.duplicates).toEqual(["Q. 1. (iii)"]);
    expect(out.missing).toEqual(["Q. 23"]);
  });
});

describe("validateChapter — HARD-validated against the 15 shipped chapters", () => {
  it("knows exactly the 15 chapters the bank already carries", () => {
    expect(HSC_MATHS_CHAPTERS).toHaveLength(15);
  });

  it("accepts a catalog chapter", () => {
    expect(validateChapter("Mathematical Logic")).toBe("Mathematical Logic");
    expect(validateChapter("Application of Definite Integration")).toBe("Application of Definite Integration");
  });

  it("rejects a near-miss rather than auto-creating a near-duplicate chapter", () => {
    // "Lines and Planes" is the natural spelling; the bank's is "Line and Planes".
    // Auto-creating the plural would silently fork the chapter.
    expect(() => validateChapter("Lines and Planes")).toThrow(/Line and Planes/);
    expect(() => validateChapter("Vectors and 3D")).toThrow();
  });

  it("rejects a catch-all", () => {
    expect(() => validateChapter("Mathematics")).toThrow();
  });
});
