/**
 * Pure post-mock feedback helpers (Phase 3) — the 1-tap difficulty rating +
 * optional comment captured on the result page. No I/O; unit-tested in
 * tests/mock-feedback.test.ts. Mirrored by the DB CHECK on mock_feedback.rating.
 */

/** How the mock felt, difficulty-wise. Closed set. */
export const RATINGS = ["too_easy", "just_right", "too_hard"] as const;
export type Rating = (typeof RATINGS)[number];

const RATING_SET = new Set<string>(RATINGS);

export function isRating(value: unknown): value is Rating {
  return typeof value === "string" && RATING_SET.has(value);
}

const COMMENT_MAX = 500;

export type FeedbackSubmission = { rating: unknown; comment?: unknown };
export type FeedbackValidation =
  | { ok: true; rating: Rating; comment: string | null }
  | { ok: false; message: string };

/**
 * Validate a feedback submission: a valid rating is required; the comment is
 * optional, trimmed, capped, and blank collapses to null.
 */
export function validateFeedback(input: FeedbackSubmission): FeedbackValidation {
  if (!isRating(input.rating)) {
    return { ok: false, message: "Pick how the mock felt." };
  }
  let comment: string | null = null;
  if (typeof input.comment === "string") {
    const trimmed = input.comment.trim();
    comment = trimmed ? trimmed.slice(0, COMMENT_MAX) : null;
  }
  return { ok: true, rating: input.rating, comment };
}
