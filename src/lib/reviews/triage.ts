/**
 * Report triage -> review verdict. Pure — no I/O.
 *
 * See tests/reviews-triage.test.ts for the rules. The short version: a report
 * status does not tell you what the admin actually did, so this derives a
 * verdict only where the meaning is unambiguous and otherwise requires an
 * explicit pick. It never guesses.
 */
import { isReviewVerdict, type ReviewVerdict } from "./types";
import type { ReportCategory, ReportStatus } from "../reports/types";

/**
 * Categories where the complaint is about the ANSWER. Fixing a broken image or
 * a mis-filed chapter is a data repair and says nothing about correctness.
 */
export const ANSWER_AFFECTING_CATEGORIES: ReadonlySet<ReportCategory> = new Set([
  "wrong-answer",
  "incorrect-solution",
]);

export type TriageReviewInput = {
  category: ReportCategory;
  status: ReportStatus;
  /** What the admin says they did. Required for "resolved" — never inferred. */
  proposedVerdict?: ReviewVerdict | string | null;
};

export function resolveTriageReview(input: TriageReviewInput): ReviewVerdict | null {
  if (!ANSWER_AFFECTING_CATEGORIES.has(input.category)) return null;

  // "duplicate" marks the REPORT as a duplicate — the adjudication belongs to
  // the original report, not to this row.
  if (input.status === "wont-fix") return "confirmed";
  if (input.status !== "resolved") return null;

  return isReviewVerdict(input.proposedVerdict) ? input.proposedVerdict : null;
}

/** Verdicts an admin may pick when resolving an answer-affecting report. */
export const TRIAGE_VERDICT_CHOICES: readonly ReviewVerdict[] = [
  "key_fixed",
  "stem_fixed",
  "solution_rewritten",
  "defect_preserved",
  "confirmed",
  "unverifiable",
];
