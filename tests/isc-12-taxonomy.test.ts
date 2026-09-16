import { describe, it, expect } from "vitest";
import {
  ISC_TAXONOMY,
  ISC_SUBJECTS,
  chaptersFor,
  allChapterNames,
  sourceForYear,
  YEAR_SOURCES,
  ISC_12_EXAM_NAME,
} from "../scripts/isc-12-pyq/config";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

/**
 * Invariants of the ISC Class-12 PCM chapter taxonomy, which is authored from
 * the official ISC syllabus (Revised, ISC 2026) rather than forked from cbse-12.
 */

describe("ISC taxonomy shape", () => {
  it("covers exactly the three PCM subjects", () => {
    expect(Object.keys(ISC_TAXONOMY).sort()).toEqual(
      [...ISC_SUBJECTS].sort()
    );
  });

  it("has the measured chapter counts per subject", () => {
    expect(chaptersFor("Mathematics")).toHaveLength(15);
    expect(chaptersFor("Physics")).toHaveLength(14);
    expect(chaptersFor("Chemistry")).toHaveLength(10);
  });

  it("never repeats a chapter name within a subject", () => {
    for (const subject of ISC_SUBJECTS) {
      const names = chaptersFor(subject).map((c) => c.name);
      expect(new Set(names).size).toBe(names.length);
    }
  });

  it("never repeats a syllabus reference within a subject", () => {
    // Two chapters claiming the same syllabus unit means one of them was
    // invented or duplicated — the taxonomy must be traceable 1:1 to the source.
    for (const subject of ISC_SUBJECTS) {
      const refs = chaptersFor(subject).map((c) => c.syllabusRef);
      expect(new Set(refs).size).toBe(refs.length);
    }
  });

  it("gives every chapter a non-empty syllabus reference", () => {
    for (const subject of ISC_SUBJECTS) {
      for (const chapter of chaptersFor(subject)) {
        expect(chapter.syllabusRef.trim()).not.toBe("");
      }
    }
  });
});

describe("the anti-catch-all rule", () => {
  /**
   * The syllabus's own UNIT names are deliberately NOT chapter names where the
   * unit bundles distinct techniques. ISC Maths unit 3 "Calculus" alone carries
   * 32 of 80 marks; as a single chapter it would be the largest catch-all in the
   * bank on the day it shipped, and this project's CLAUDE.md records catch-alls
   * ("Mechanics", "Physics", "Forests and Natural Vegetation") having to be
   * broken up per-question later, every time.
   *
   * This guards the decision rather than restating it: if a later pass
   * "simplifies" the taxonomy back to syllabus units, these fail.
   */
  const MUST_NOT_BE_A_CHAPTER = [
    "Calculus", // Maths unit 3 — split into 4
    "Algebra", // Maths unit 2 — split into Matrices + Determinants
    "Optics", // Physics unit 6 — split into Ray + Wave
    "Electrostatics", // Physics unit 1 — split into 2
    "Atoms and Nuclei", // Physics unit 8 — split into 2
    "Magnetic Effects of Current and Magnetism", // Physics unit 3 — split into 2
    "Electromagnetic Induction and Alternating Currents", // Physics unit 4 — split
  ];

  it("does not expose a bundling syllabus unit as a chapter", () => {
    const names = new Set(allChapterNames());
    for (const banned of MUST_NOT_BE_A_CHAPTER) {
      expect(names.has(banned)).toBe(false);
    }
  });

  it("keeps the four Calculus sub-units as separate chapters", () => {
    const maths = chaptersFor("Mathematics").map((c) => c.name);
    expect(maths).toContain("Continuity, Differentiability and Differentiation");
    expect(maths).toContain("Applications of Derivatives");
    expect(maths).toContain("Integrals");
    expect(maths).toContain("Differential Equations");
  });
});

describe("the ISC-only commerce half", () => {
  /**
   * Section C has no CBSE Class 12 counterpart. It is the single strongest
   * reason this taxonomy could not be forked from cbse-12, so it is pinned by
   * name — a later "align ISC with CBSE" pass would delete exactly these.
   */
  it("carries Application of Calculus and Linear Regression in Section C", () => {
    const sectionC = chaptersFor("Mathematics")
      .filter((c) => c.section === "C")
      .map((c) => c.name);
    expect(sectionC).toEqual([
      "Application of Calculus",
      "Linear Regression",
      "Linear Programming",
    ]);
  });

  it("splits Maths Sections B and C into three chapters each", () => {
    const bySection = (s: string) =>
      chaptersFor("Mathematics").filter((c) => c.section === s).length;
    expect(bySection("A")).toBe(9);
    expect(bySection("B")).toBe(3);
    expect(bySection("C")).toBe(3);
  });
});

describe("year sources", () => {
  it("records 2025 as keyed and 2026 as not", () => {
    expect(sourceForYear(2025).keyed).toBe(true);
    expect(sourceForYear(2025).from).toBe("marking-scheme");
    expect(sourceForYear(2026).keyed).toBe(false);
    expect(sourceForYear(2026).from).toBe("question-paper");
  });

  it("throws for a year with no source document in hand", () => {
    // Refuses rather than defaulting — the same polarity as patternForYear.
    expect(() => sourceForYear(2024)).toThrow(/no source document/i);
    expect(() => sourceForYear(2027)).toThrow(/no source document/i);
  });

  it("gives every held year a non-empty provenance note", () => {
    for (const source of YEAR_SOURCES) {
      expect(source.note.trim().length).toBeGreaterThan(20);
    }
  });
});

describe("registry wiring", () => {
  it("the exam name matches the isc-12 registry entry exactly", () => {
    // A near-miss here yields an EMPTY exam rather than an error — the /books
    // lane hit precisely this with "Maths" against "Mathematics".
    const entry = EXAM_REGISTRY.find((e) => e.slug === "isc-12");
    expect(entry).toBeDefined();
    expect(entry!.examName).toBe(ISC_12_EXAM_NAME);
  });

  it("is registered as CISCE Class 12, and NOT as a /board reader exam", () => {
    const entry = EXAM_REGISTRY.find((e) => e.slug === "isc-12")!;
    expect(entry.board).toBe("CISCE");
    expect(entry.std).toBe(12);
    // boardExam tracks a TEXTBOOK-structured corpus, which ISC has none of.
    // "ISC is a school board, so this should be true" is the wrong inference.
    expect(entry.boardExam).toBeUndefined();
    // PYQ-only corpus, so /browse must default to the PYQ view.
    expect(entry.practiceOnly).toBeUndefined();
    // And NO mixedFormats until the corpus exists to earn it. The flag
    // describes the live bank, not the papers — tests/format-mix-registry
    // measures it against the DB and an empty exam must stay unflagged.
    expect(entry.mixedFormats).toBeUndefined();
  });
});
