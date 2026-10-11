/**
 * The checked-sheet report (answer-sheet grading): where the marks went.
 * Growth-framed, so it names the few questions that cost the most, among the
 * ones the student actually answered. An unanswered OR side or an extra
 * "attempt any" question is not a loss.
 */
import { describe, it, expect } from "vitest";
import { biggestLosses, type ReportGrade } from "@/lib/answerSheets/report";

const g = (position: number, maxMarks: number, outcome: ReportGrade["outcome"], awarded: number | null): ReportGrade => ({
  position,
  printedNumber: String(position),
  questionId: `q-${position}`,
  maxMarks,
  outcome,
  awarded,
  earned: null,
  missing: null,
});

describe("biggestLosses", () => {
  it("names the answered questions that lost the most marks, largest first", () => {
    const grades = [g(1, 1, "scored", 1), g(2, 3, "scored", 1), g(3, 5, "scored", 2), g(4, 2, "scored", 1.5)];
    expect(biggestLosses(grades).map((x) => [x.position, x.lost])).toEqual([
      [3, 3],
      [2, 2],
      [4, 0.5],
    ]);
  });

  it("ignores questions not attempted or not counted, and full marks", () => {
    const grades = [g(1, 5, "not_attempted", null), g(2, 5, "not_counted", null), g(3, 2, "scored", 2)];
    expect(biggestLosses(grades)).toEqual([]);
  });

  it("keeps printed order on a tie and stops at the limit", () => {
    const grades = [g(5, 2, "scored", 0), g(2, 2, "scored", 0), g(9, 2, "scored", 0), g(7, 2, "scored", 0)];
    expect(biggestLosses(grades, 3).map((x) => x.position)).toEqual([2, 5, 7]);
  });
});
