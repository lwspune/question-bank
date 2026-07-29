/**
 * Unit tests for the /guide marks-per-paper helper, plus structural
 * invariants on the hand-transcribed CHAPTER_TABLE subtopic rows.
 *
 * The marks column is DERIVED from qCount (never stored), so the helper is
 * the single place the arithmetic lives. The data invariants below are the
 * real guard: the 111 subtopic rows are SQL-derived once and pasted in, so a
 * transcription slip is the likely failure — these catch a chapter whose
 * subtopics don't add up to its own question count.
 */
import { describe, it, expect } from "vitest";
import { marksPerPaper, shareOfBank } from "@/lib/guide/marks";
import {
  CHAPTER_TABLE,
  MARKING,
  OVERVIEW,
} from "@/app/guide/nda-maths/_data/nda-maths";

describe("marksPerPaper", () => {
  it("converts a bank question count into marks in one paper", () => {
    // 170 questions across 18 papers = 9.44 q/paper x 2.5 marks = 23.6
    expect(marksPerPaper(170, MARKING)).toBe(23.6);
  });

  it("rounds to one decimal", () => {
    expect(marksPerPaper(162, MARKING)).toBe(22.5);
    expect(marksPerPaper(89, MARKING)).toBe(12.4);
  });

  it("keeps sub-1-mark chapters visible rather than rounding them to zero", () => {
    // Linear Inequalities: 5 q across 18 papers is real but negligible.
    expect(marksPerPaper(5, MARKING)).toBe(0.7);
  });

  it("returns 0 for an empty chapter", () => {
    expect(marksPerPaper(0, MARKING)).toBe(0);
  });

  it("returns 0 rather than dividing by zero when papers is 0", () => {
    expect(marksPerPaper(100, { ...MARKING, papers: 0 })).toBe(0);
  });

  it("maps the whole bank onto exactly one paper's marks", () => {
    // The bank IS 18 complete papers, so the full count must map to 300.
    expect(marksPerPaper(OVERVIEW.totalQ, MARKING)).toBe(MARKING.paperMarks);
  });
});

describe("shareOfBank", () => {
  it("reports a slice's share of the bank to one decimal", () => {
    expect(shareOfBank(170, 2160)).toBe(7.9);
    expect(shareOfBank(59, 2160)).toBe(2.7);
  });

  it("returns 0 for an empty slice or an empty bank", () => {
    expect(shareOfBank(0, 2160)).toBe(0);
    expect(shareOfBank(10, 0)).toBe(0);
  });

  it("agrees with the stored chapter shares", () => {
    // Same meaning for chapters and subtopics — so a chapter's stored
    // pctTotal must be what the helper computes from its qCount.
    const drifted = CHAPTER_TABLE.filter(
      (row) => Math.abs(shareOfBank(row.qCount, OVERVIEW.totalQ) - row.pctTotal) > 0.05
    ).map((r) => r.chapter);
    expect(drifted).toEqual([]);
  });
});

describe("CHAPTER_TABLE data integrity", () => {
  it("every chapter's subtopics sum to its question count", () => {
    const mismatched = CHAPTER_TABLE.filter((row) => {
      const sum = row.subtopics.reduce((n, s) => n + s.qCount, 0);
      return sum !== row.qCount;
    }).map((row) => ({
      chapter: row.chapter,
      declared: row.qCount,
      subtopicSum: row.subtopics.reduce((n, s) => n + s.qCount, 0),
    }));
    expect(mismatched).toEqual([]);
  });

  it("chapter question counts sum to the bank total", () => {
    const sum = CHAPTER_TABLE.reduce((n, row) => n + row.qCount, 0);
    expect(sum).toBe(OVERVIEW.totalQ);
  });

  it("covers every chapter exactly once", () => {
    const names = CHAPTER_TABLE.map((r) => r.chapter);
    expect(new Set(names).size).toBe(names.length);
    expect(names.length).toBe(OVERVIEW.chapters);
  });

  it("has no duplicate subtopic names within a chapter", () => {
    const dupes = CHAPTER_TABLE.filter((row) => {
      const names = row.subtopics.map((s) => s.subtopic);
      return new Set(names).size !== names.length;
    }).map((r) => r.chapter);
    expect(dupes).toEqual([]);
  });

  it("gives every chapter at least one subtopic", () => {
    const empty = CHAPTER_TABLE.filter((r) => r.subtopics.length === 0).map(
      (r) => r.chapter
    );
    expect(empty).toEqual([]);
  });

  it("keeps every percentage in range", () => {
    for (const row of CHAPTER_TABLE) {
      expect(row.pctHard).toBeGreaterThanOrEqual(0);
      expect(row.pctHard).toBeLessThanOrEqual(100);
      for (const sub of row.subtopics) {
        expect(sub.pctHard).toBeGreaterThanOrEqual(0);
        expect(sub.pctHard).toBeLessThanOrEqual(100);
        expect(sub.qCount).toBeGreaterThan(0);
      }
    }
  });

  it("stays sorted by question count, descending", () => {
    const counts = CHAPTER_TABLE.map((r) => r.qCount);
    expect([...counts].sort((a, b) => b - a)).toEqual(counts);
  });

  it("sorts each chapter's subtopics by question count, descending", () => {
    const unsorted = CHAPTER_TABLE.filter((row) => {
      const counts = row.subtopics.map((s) => s.qCount);
      return (
        JSON.stringify([...counts].sort((a, b) => b - a)) !==
        JSON.stringify(counts)
      );
    }).map((r) => r.chapter);
    expect(unsorted).toEqual([]);
  });
});
