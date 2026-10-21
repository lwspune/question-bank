/**
 * One graded question of a checked sheet, as the report page reads it
 * (migrations 0153, 0175). The summary built from these rows (where the marks
 * went, what to focus on) is lib/answerSheets/paperReport.ts.
 */
import type { GradeCause, GradeOutcome } from "./grade";

export type ReportGrade = {
  position: number;
  printedNumber: string;
  questionId: string | null;
  maxMarks: number;
  outcome: GradeOutcome;
  awarded: number | null;
  earned: string | null;
  missing: string | null;
  /** Null on a sheet graded before causes existed (0175). */
  cause: GradeCause | null;
  topic: string | null;
};
