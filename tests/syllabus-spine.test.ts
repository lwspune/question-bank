import { describe, expect, it } from "vitest";
import {
  BOOK_OF_EXAM,
  dominantSbByChapter,
  sbBookOrder,
  parseCoveredRef,
  splitCoveredBy,
  splitPyqCount,
  SPINE,
} from "../src/lib/syllabus/summary";

describe("splitPyqCount", () => {
  it("pulls the PYQ count out of an exam-spine concept name", () => {
    expect(splitPyqCount("Diazonium Salts (12 PYQ)")).toEqual({ name: "Diazonium Salts", pyq: 12 });
  });

  it("leaves a book-spine name alone and reports zero", () => {
    // NCERT and State Board rows carry no count; they must not be mangled.
    expect(splitPyqCount("Nature of Matter")).toEqual({ name: "Nature of Matter", pyq: 0 });
  });

  it("does not treat a parenthetical that is not a PYQ count as one", () => {
    expect(splitPyqCount("Nature of Oxides (Acidic, Basic, Amphoteric)")).toEqual({
      name: "Nature of Oxides (Acidic, Basic, Amphoteric)",
      pyq: 0,
    });
  });
});

describe("parseCoveredRef", () => {
  it("reads an explicit year prefix", () => {
    expect(parseCoveredRef("XII:4.11.9", 11)).toEqual({ cls: 12, no: "4.11.9" });
    expect(parseCoveredRef("XI:2.7", 12)).toEqual({ cls: 11, no: "2.7" });
  });

  it("falls back to the row's own year when the ref carries none", () => {
    expect(parseCoveredRef("11.4", 12)).toEqual({ cls: 12, no: "11.4" });
  });

  it("tolerates surrounding whitespace from a comma-separated list", () => {
    expect(parseCoveredRef("  XI:9.7.1 ", 12)).toEqual({ cls: 11, no: "9.7.1" });
  });
});

describe("splitCoveredBy", () => {
  it("splits a multi-section pointer and drops empties", () => {
    expect(splitCoveredBy("1.2.1, 1.2.2, 1.2.3")).toEqual(["1.2.1", "1.2.2", "1.2.3"]);
    expect(splitCoveredBy("12.7, XII:4.11.9")).toEqual(["12.7", "XII:4.11.9"]);
  });

  it("returns nothing for an empty pointer, which is how a gap is stored", () => {
    expect(splitCoveredBy("")).toEqual([]);
    expect(splitCoveredBy(" , ")).toEqual([]);
  });
});

describe("BOOK_OF_EXAM", () => {
  it("maps an exam column on an exam-spine row to the book its refs point into", () => {
    // The bug this prevents: resolving an NCERT ref against the State Board book,
    // which renders NCERT 7.4 (Alcohols) as State Board Ch.7 (Groups 16, 17, 18).
    expect(BOOK_OF_EXAM["CBSE Class 12"]).toBe(SPINE.ncert);
    expect(BOOK_OF_EXAM["MH State Board"]).toBe(SPINE.stateBoard);
  });
});

describe("dominantSbByChapter", () => {
  const row = (chapterName: string, pyq: number, labels: [number, string][]) => ({
    chapterName,
    pyq,
    refs: labels.map(([cls, chapterLabel]) => ({ cls, no: "1.1", chapterLabel })),
  });

  it("picks the book chapter holding most of an exam chapter's PYQ", () => {
    const d = dominantSbByChapter([
      row("Hydrocarbons", 47, [[11, "Std XI Ch.15 Hydrocarbons"]]),
      row("Hydrocarbons", 6, [[11, "Std XI Ch.14 Basic Principles"]]),
    ]);
    expect(d.get("Hydrocarbons")?.label).toBe("Std XI Ch.15 Hydrocarbons");
    expect(d.get("Hydrocarbons")?.pyq).toBe(47);
  });

  it("counts a straddling subtopic against BOTH chapters, not a split share", () => {
    // The question really does need both chapters; halving the count would
    // understate each and could hand dominance to the wrong one.
    const d = dominantSbByChapter([
      row("X", 10, [
        [11, "Std XI Ch.2 Analytical"],
        [12, "Std XII Ch.8 Transition"],
      ]),
      row("X", 4, [[12, "Std XII Ch.8 Transition"]]),
    ]);
    expect(d.get("X")?.label).toBe("Std XII Ch.8 Transition");
    expect(d.get("X")?.pyq).toBe(14);
  });

  it("counts a chapter once when a row points at two sections of it", () => {
    const d = dominantSbByChapter([
      {
        chapterName: "X",
        pyq: 9,
        refs: [
          { cls: 11, no: "5.1", chapterLabel: "Std XI Ch.5 Bonding" },
          { cls: 11, no: "5.3", chapterLabel: "Std XI Ch.5 Bonding" },
        ],
      },
    ]);
    expect(d.get("X")?.pyq).toBe(9);
  });

  it("breaks a tie to the EARLIER chapter so the key does not depend on row order", () => {
    const forward = dominantSbByChapter([
      row("X", 5, [[12, "Std XII Ch.3 Ionic"]]),
      row("X", 5, [[11, "Std XI Ch.12 Equilibrium"]]),
    ]);
    const reversed = dominantSbByChapter([
      row("X", 5, [[11, "Std XI Ch.12 Equilibrium"]]),
      row("X", 5, [[12, "Std XII Ch.3 Ionic"]]),
    ]);
    expect(forward.get("X")?.label).toBe("Std XI Ch.12 Equilibrium");
    expect(reversed.get("X")?.label).toBe(forward.get("X")?.label);
  });

  it("omits a chapter with no pointer into the book at all", () => {
    // Organic Reaction Mechanisms: it has no place in book order, so callers
    // sort it last rather than guessing a position for it.
    const d = dominantSbByChapter([row("Orphan", 10, [])]);
    expect(d.has("Orphan")).toBe(false);
  });

  it("orders Std XI before Std XII regardless of chapter number", () => {
    const d = dominantSbByChapter([
      row("A", 1, [[12, "Std XII Ch.2 Solutions"]]),
      row("B", 1, [[11, "Std XI Ch.15 Hydrocarbons"]]),
    ]);
    expect(sbBookOrder(d.get("B"))).toBeLessThan(sbBookOrder(d.get("A")));
  });

  it("sorts a chapter with no book home last", () => {
    expect(sbBookOrder(undefined)).toBeGreaterThan(sbBookOrder({ label: "z", cls: 12, chapterNo: 99, pyq: 0 }));
  });
});
