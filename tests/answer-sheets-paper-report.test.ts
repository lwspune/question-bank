/**
 * The checked-sheet summary (answer-sheet grading, migration 0175): the score,
 * where the marks went by cause, what fixing the slips is worth, and what to
 * work on first. Ported from nda-tracker's homework report
 * (src/lib/assignments/paperReport.js) with ONE deliberate difference: a board
 * paper has OR choices and "attempt any N", so its questions' maximums add up
 * to MORE than the paper's total. The maximum is the paper's printed total,
 * and "not answered" is whatever the scored losses leave, so the bars always
 * add back up to it.
 */
import { describe, it, expect } from "vitest";
import { buildPaperReport, type SummaryGrade } from "@/lib/answerSheets/paperReport";

const g = (
  position: number,
  maxMarks: number,
  outcome: SummaryGrade["outcome"],
  awarded: number | null,
  cause: SummaryGrade["cause"] = null,
  topic: string | null = null,
  missing: string | null = null
): SummaryGrade => ({ position, printedNumber: String(position), maxMarks, outcome, awarded, cause, topic, missing });

const sum = (xs: number[]) => xs.reduce((s, x) => s + x, 0);

describe("buildPaperReport", () => {
  it("scores against the paper's printed total, not the sum of every question", () => {
    // Q2 OR Q3: the student answered Q2, so Q3 is not a loss.
    const r = buildPaperReport({
      totalMax: 9,
      grades: [
        g(1, 1, "scored", 1),
        g(2, 3, "scored", 2, "careless"),
        g(3, 3, "not_attempted", null),
        g(4, 5, "scored", 0, "concept", "Ohm's law"),
      ],
    });
    expect([r.total, r.max, r.pct]).toEqual([3, 9, 33]);
    expect(r.lost.map((l) => [l.key, l.marks])).toEqual([
      ["concept", 5],
      ["careless", 1],
    ]);
  });

  it("always adds back up: the score plus every loss is the paper's total", () => {
    const r = buildPaperReport({
      totalMax: 20,
      grades: [g(1, 5, "scored", 3, "incomplete", "Steps"), g(2, 5, "scored", 5), g(3, 5, "not_attempted", null), g(4, 5, "scored", 1.5, "misread")],
    });
    expect(r.total + sum(r.lost.map((l) => l.marks))).toBe(20);
  });

  it("names the unanswered questions when they account for every unanswered mark", () => {
    const r = buildPaperReport({ totalMax: 10, grades: [g(1, 5, "scored", 5), g(2, 5, "not_attempted", null)] });
    expect(r.lost).toEqual([{ key: "not_attempted", label: "Not answered", marks: 5, questions: ["Q.2"] }]);
  });

  it("gives the marks but no question list when a choice makes the list misleading", () => {
    // Attempt any 2 of Q1-Q4 (5 each, total 10): one answered, three left blank.
    // 5 marks are unanswered, but naming all three blanks would claim 15.
    const r = buildPaperReport({
      totalMax: 10,
      grades: [g(1, 5, "scored", 5), g(2, 5, "not_attempted", null), g(3, 5, "not_attempted", null), g(4, 5, "not_attempted", null)],
    });
    expect(r.lost).toEqual([{ key: "not_attempted", label: "Not answered", marks: 5, questions: [] }]);
  });

  it("never reports a negative unanswered share", () => {
    const r = buildPaperReport({ totalMax: 4, grades: [g(1, 5, "scored", 4, "careless")] });
    expect(r.lost.find((l) => l.key === "not_attempted")).toBeUndefined();
  });

  it("does not count an answer that was not counted as a loss", () => {
    const r = buildPaperReport({ totalMax: 5, grades: [g(1, 5, "scored", 5), g(2, 5, "not_counted", null, null, null, "Q.1 came first")] });
    expect(r.lost).toEqual([]);
  });

  it("counts full, part and zero marks among the answers given", () => {
    const r = buildPaperReport({
      totalMax: 15,
      grades: [g(1, 5, "scored", 5), g(2, 5, "scored", 2, "careless"), g(3, 5, "scored", 0, "concept", "Moles")],
    });
    expect(r.counts).toEqual({ full: 1, partial: 1, zero: 1 });
  });

  it("puts a grade saved before causes existed under 'other', so it still adds up", () => {
    const r = buildPaperReport({ totalMax: 5, grades: [g(1, 5, "scored", 2)] });
    expect(r.lost).toEqual([{ key: "other", label: "Other marks lost", marks: 3, questions: ["Q.1"] }]);
  });

  it("works out what fixing the slips is worth", () => {
    const r = buildPaperReport({
      totalMax: 10,
      grades: [g(1, 5, "scored", 4, "careless"), g(2, 5, "scored", 3.5, "careless")],
    });
    expect(r.potential).toEqual({ marks: 10, pct: 100, avoidable: 2.5, questions: ["Q.1", "Q.2"] });
  });

  it("focuses on the three biggest losses that need learning, not just care", () => {
    const r = buildPaperReport({
      totalMax: 25,
      grades: [
        g(1, 5, "scored", 0, "careless"),
        g(2, 5, "scored", 1, "concept", "Chain rule", "Used the product rule."),
        g(3, 5, "scored", 3, "incomplete", "The condition dx/dt ≠ 0"),
        g(4, 5, "scored", 2, "misread"),
        g(5, 5, "scored", 4.5, "concept", "Units of work"),
      ],
    });
    expect(r.focus.map((f) => [f.label, f.lost, f.heading])).toEqual([
      ["Q.2", 4, "Learn this again: Chain rule"],
      ["Q.4", 3, "Read the question again"],
      ["Q.3", 2, "Show full steps: The condition dx/dt ≠ 0"],
    ]);
    expect(r.focus[0].missing).toBe("Used the product rule.");
    // The rest: the slip and the concept that did not make the top three.
    expect(r.smallerFixes.map((f) => [f.cause, f.questions, f.marks])).toEqual([
      ["concept", ["Q.5"], 0.5],
      ["careless", ["Q.1"], 5],
    ]);
  });

  it("never names the cause 'careless' to the student", () => {
    const r = buildPaperReport({ totalMax: 5, grades: [g(1, 5, "scored", 4, "careless")] });
    expect(JSON.stringify(r)).not.toMatch(/Careless/);
    expect(r.lost[0].label).toBe("Slips");
  });
});
