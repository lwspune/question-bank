/**
 * A published past paper as a download (2026-10-07): the exact questions of one
 * sitting, in printed order, headed by the paper's own sections. Only whole
 * past papers qualify; a chapter test or a practice paper is not a paper anyone
 * sat, so it is refused.
 */
import { describe, it, expect } from "vitest";
import { mockPaperExport } from "@/lib/mocks/paperExport";
import type { MockRow } from "@/lib/mocks/query";

function mock(over: Partial<MockRow> = {}): MockRow {
  return {
    id: "m1",
    slug: "jee-mains-2026-apr-06-s1-paper-1",
    paperCode: "p",
    pyqYear: 2026,
    pyqMonth: "Apr",
    source: "pyq",
    scope: "full",
    title: "JEE Mains 2026 (6 Apr, Shift 1)",
    durationSecs: 10800,
    marking: { correct: 4, wrong: -1 },
    sections: [
      { key: "physics", label: "Physics", count: 2 },
      { key: "chemistry", label: "Chemistry", count: 1 },
    ],
    // Deliberately out of order: the snapshot is not stored sorted.
    questions: [
      { position: 3, questionId: "c1", sectionKey: "chemistry", marks: 4, negMarks: 1 },
      { position: 1, questionId: "p1", sectionKey: "physics", marks: 4, negMarks: 1 },
      { position: 2, questionId: "p2", sectionKey: "physics", marks: 4, negMarks: 1 },
    ],
    totalQuestions: 3,
    totalMarks: 12,
    examName: "JEE Mains",
    ...over,
  };
}

describe("mockPaperExport", () => {
  it("lists the questions in printed order", () => {
    const out = mockPaperExport(mock());
    expect(out.ok && out.questionIds).toEqual(["p1", "p2", "c1"]);
  });

  it("labels each question with its section's printed name", () => {
    const out = mockPaperExport(mock());
    if (!out.ok) throw new Error("refused");
    expect(Object.fromEntries(out.sectionOf)).toEqual({ p1: "Physics", p2: "Physics", c1: "Chemistry" });
  });

  it("carries the paper's title", () => {
    const out = mockPaperExport(mock());
    expect(out.ok && out.title).toBe("JEE Mains 2026 (6 Apr, Shift 1)");
  });

  it("falls back to the section key when a section has no label", () => {
    const out = mockPaperExport(mock({ sections: [] }));
    if (!out.ok) throw new Error("refused");
    expect(out.sectionOf.get("c1")).toBe("chemistry");
  });

  it("refuses a chapter test", () => {
    expect(mockPaperExport(mock({ scope: "sectional" })).ok).toBe(false);
  });

  it("refuses a practice paper", () => {
    expect(mockPaperExport(mock({ source: "practice" })).ok).toBe(false);
  });
});
