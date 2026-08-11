/**
 * Shared types for post-ingestion question reviews. Mirrors the `method`,
 * `verdict` and `source` CHECK constraints in migration 0074.
 *
 * WHAT THIS RECORDS, and what it deliberately does not:
 *
 * A row means "someone checked this question's answer after it was ingested and
 * concluded X". That is a different fact from `questions.derived_model` /
 * `derived_at` (0040), which record who *produced* a derived field — upstream of
 * anyone verifying it. Without this table, a question whose key was blind
 * re-derived and confirmed is indistinguishable from one nobody has ever opened.
 *
 * NOT a verdict: a structural probe pass (`npm run audit:keys`) checks three
 * defect shapes and is blind to a plain wrong key. Stamping every scanned row
 * `confirmed` from it would turn an unexamined question green — the same
 * "default becomes an assertion" failure the exam spines already hit. Only an
 * adjudicated flag earns a row.
 */

export const REVIEW_METHODS = [
  /** An agent/human re-derived the answer without seeing the stored key. */
  "blind_rederivation",
  /** Our answer diffed against the source paper's official answer key. */
  "source_key_crosscheck",
  /** Our answer diffed against a textbook's printed ANSWERS section. */
  "textbook_answer_key",
  /** A mechanical probe flagged the row and a human adjudicated the flag. */
  "structural_probe",
  /** A student report was triaged and the answer was adjudicated. */
  "report_triage",
] as const;

export type ReviewMethod = (typeof REVIEW_METHODS)[number];

export const REVIEW_VERDICTS = [
  /** Re-derivation agreed with what the bank already held. Nothing changed. */
  "confirmed",
  /** The stored correct option was wrong and was flipped. */
  "key_fixed",
  /** The stem and/or options were corrupted and were repaired. */
  "stem_fixed",
  /** The answer stood; the solution prose was wrong or thin and was rewritten. */
  "solution_rewritten",
  /** Our answer stood and the SOURCE is wrong — the defect is flagged, not fixed. */
  "defect_preserved",
  /** Could not be settled (defective options, missing figure, source ambiguity). */
  "unverifiable",
] as const;

export type ReviewVerdict = (typeof REVIEW_VERDICTS)[number];

export const REVIEW_SOURCES = [
  /** Written by the pass that did the reviewing. First-hand. */
  "live",
  /**
   * Reconstructed after the fact from a committed machine-readable artifact
   * (a *.crosscheck.json / *.mcq-verify.json). Never from prose: a paragraph
   * re-read by an LLM is a plausible guess, and the point of this table is that
   * a guess and a record stop looking alike.
   */
  "backfilled",
] as const;

export type ReviewSource = (typeof REVIEW_SOURCES)[number];

/** Verdicts meaning the reviewer changed OUR data — i.e. we had it wrong. */
export const CORRECTIVE_VERDICTS: ReadonlySet<ReviewVerdict> = new Set([
  "key_fixed",
  "stem_fixed",
  "solution_rewritten",
]);

export const REVIEW_NOTE_MAX = 2000;

export const REVIEW_METHOD_LABELS: Record<ReviewMethod, string> = {
  blind_rederivation: "Blind re-derivation",
  source_key_crosscheck: "Source answer-key cross-check",
  textbook_answer_key: "Textbook answer-key cross-check",
  structural_probe: "Structural probe (adjudicated)",
  report_triage: "Student report triage",
};

export const REVIEW_VERDICT_LABELS: Record<ReviewVerdict, string> = {
  confirmed: "Confirmed correct",
  key_fixed: "Key fixed",
  stem_fixed: "Stem/options fixed",
  solution_rewritten: "Solution rewritten",
  defect_preserved: "Source defect flagged",
  unverifiable: "Unverifiable",
};

export function isReviewMethod(value: unknown): value is ReviewMethod {
  return typeof value === "string" && (REVIEW_METHODS as readonly string[]).includes(value);
}

export function isReviewVerdict(value: unknown): value is ReviewVerdict {
  return typeof value === "string" && (REVIEW_VERDICTS as readonly string[]).includes(value);
}

export function isReviewSource(value: unknown): value is ReviewSource {
  return typeof value === "string" && (REVIEW_SOURCES as readonly string[]).includes(value);
}
