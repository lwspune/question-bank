/**
 * The checked-sheet report, pure parts (migration 0153).
 * Spec: tests/answer-sheets-report.test.ts.
 */
import type { GradeOutcome } from "./grade";

export type ReportGrade = {
  position: number;
  printedNumber: string;
  questionId: string | null;
  maxMarks: number;
  outcome: GradeOutcome;
  awarded: number | null;
  earned: string | null;
  missing: string | null;
};

/**
 * The answered questions that cost the most marks, largest loss first, printed
 * order on a tie. Only SCORED rows: an unanswered OR side or an extra
 * "attempt any" question is not a loss, and counting them would make every
 * paper with a choice look worse than it went.
 */
export function biggestLosses(grades: ReportGrade[], limit = 3): (ReportGrade & { lost: number })[] {
  return grades
    .filter((g) => g.outcome === "scored" && g.awarded !== null && g.awarded < g.maxMarks)
    .map((g) => ({ ...g, lost: g.maxMarks - (g.awarded ?? 0) }))
    .sort((a, b) => b.lost - a.lost || a.position - b.position)
    .slice(0, limit);
}
