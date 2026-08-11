/**
 * Validation boundary for a review record. Pure — no I/O.
 *
 * Every caller is a script or a route handler holding data assembled by an
 * agent, so this fails loudly and specifically rather than letting a Postgres
 * CHECK violation surface halfway through a batch write.
 *
 * See tests/reviews-record.test.ts for the rules and why each one exists.
 */
import {
  REVIEW_NOTE_MAX,
  isReviewMethod,
  isReviewSource,
  isReviewVerdict,
  type ReviewMethod,
  type ReviewSource,
  type ReviewVerdict,
} from "./types";

export type ReviewInput = {
  questionId: string;
  /**
   * `questions.content_hash` as it stands AFTER this review's own edits land.
   * Not the pre-fix value: a corrective review's edit is the review's own
   * output, so stamping the old hash would make every fixed row born stale.
   */
  reviewedContentHash: string;
  method: ReviewMethod | string;
  verdict: ReviewVerdict | string;
  /** The pass this belonged to, e.g. "grounding:nda-maths-batch-7". */
  runLabel: string;
  derivedModel?: string | null;
  source?: ReviewSource | string;
  note?: string | null;
};

export type ReviewRow = {
  question_id: string;
  reviewed_content_hash: string;
  method: ReviewMethod;
  verdict: ReviewVerdict;
  run_label: string;
  derived_model: string | null;
  source: ReviewSource;
  note: string | null;
};

export type SanitizeResult = { ok: true; row: ReviewRow } | { ok: false; reason: string };

function blank(value: unknown): boolean {
  return typeof value !== "string" || value.trim().length === 0;
}

export function sanitizeReviewRecord(input: ReviewInput): SanitizeResult {
  if (blank(input.questionId)) {
    return { ok: false, reason: "questionId is required" };
  }
  if (blank(input.reviewedContentHash)) {
    return {
      ok: false,
      reason:
        "reviewedContentHash is required — a review with no fingerprint cannot be checked for staleness later",
    };
  }
  if (blank(input.runLabel)) {
    return { ok: false, reason: "runLabel is required" };
  }
  if (!isReviewMethod(input.method)) {
    return { ok: false, reason: `unknown method: ${String(input.method)}` };
  }
  if (!isReviewVerdict(input.verdict)) {
    return { ok: false, reason: `unknown verdict: ${String(input.verdict)}` };
  }

  const source = input.source ?? "live";
  if (!isReviewSource(source)) {
    return { ok: false, reason: `unknown source: ${String(source)}` };
  }

  const trimmedNote = typeof input.note === "string" ? input.note.trim() : null;
  if (trimmedNote != null && trimmedNote.length > REVIEW_NOTE_MAX) {
    // Mirrors the DB CHECK so the dry run catches it rather than the INSERT.
    return {
      ok: false,
      reason: `note exceeds ${REVIEW_NOTE_MAX} chars (${trimmedNote.length})`,
    };
  }

  return {
    ok: true,
    row: {
      question_id: input.questionId.trim(),
      reviewed_content_hash: input.reviewedContentHash.trim(),
      method: input.method,
      verdict: input.verdict,
      run_label: input.runLabel.trim(),
      derived_model: input.derivedModel ?? null,
      source,
      note: trimmedNote && trimmedNote.length > 0 ? trimmedNote : null,
    },
  };
}

export type SanitizeBatchResult = {
  rows: ReviewRow[];
  errors: { index: number; reason: string }[];
};

/**
 * Partition a batch. The caller decides whether a rejected row is fatal — a
 * script emitting reviews as a side effect should warn and carry on rather than
 * abort the primary write it was actually there to do.
 */
export function sanitizeReviewRecords(inputs: ReviewInput[]): SanitizeBatchResult {
  const rows: ReviewRow[] = [];
  const errors: { index: number; reason: string }[] = [];
  inputs.forEach((input, index) => {
    const result = sanitizeReviewRecord(input);
    if (result.ok) rows.push(result.row);
    else errors.push({ index, reason: result.reason });
  });
  return { rows, errors };
}
