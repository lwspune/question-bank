/**
 * Pure post-mock feedback helpers (Phase 3) — the 1-tap difficulty rating +
 * optional comment captured on the result page. No I/O; unit-tested in
 * tests/mock-feedback.test.ts. Mirrored by the DB CHECK on mock_feedback.rating.
 */

/** How the mock felt, difficulty-wise. Closed set. */
export const RATINGS = ["too_easy", "just_right", "too_hard"] as const;
export type Rating = (typeof RATINGS)[number];

const RATING_SET = new Set<string>(RATINGS);

/** What each rating is called on screen — the student widget and both admin views. */
export const RATING_LABELS: Record<Rating, string> = {
  too_easy: "Too easy",
  just_right: "Just right",
  too_hard: "Too hard",
};

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

export type RatingDistribution = Record<Rating, number>;

/** Count each rating. A value outside the closed set is skipped (the DB CHECK
 *  forbids one, so this only guards a hand-built row). */
export function ratingDistribution(ratings: readonly string[]): RatingDistribution {
  const d: RatingDistribution = { too_easy: 0, just_right: 0, too_hard: 0 };
  for (const r of ratings) if (isRating(r)) d[r] += 1;
  return d;
}

export type MockRatingRow = {
  rating: string;
  comment: string | null;
  createdAt: string;
  mockSlug: string;
  mockTitle: string;
};

export type MockRatingsSummary<R extends MockRatingRow> = {
  count: number;
  distribution: RatingDistribution;
  /** One entry per mock, most-rated first (ties by title). */
  byMock: { slug: string; title: string; count: number; distribution: RatingDistribution }[];
  /** Rows carrying a comment, newest first. */
  comments: R[];
};

/**
 * The cross-mock rollup behind /dashboard/feedback. Until 2026-09-27 ratings
 * were visible only one mock at a time, so the Feedback page read as empty
 * while 67 ratings sat behind per-mock pages.
 */
export function summarizeMockRatings<R extends MockRatingRow>(
  rows: readonly R[],
  opts: { maxComments?: number } = {}
): MockRatingsSummary<R> {
  const maxComments = opts.maxComments ?? 30;
  const groups = new Map<string, { title: string; ratings: string[] }>();
  for (const r of rows) {
    const g = groups.get(r.mockSlug) ?? { title: r.mockTitle, ratings: [] };
    g.ratings.push(r.rating);
    groups.set(r.mockSlug, g);
  }
  const byMock = [...groups.entries()]
    .map(([slug, g]) => ({
      slug,
      title: g.title,
      count: g.ratings.length,
      distribution: ratingDistribution(g.ratings),
    }))
    .sort((a, b) => b.count - a.count || a.title.localeCompare(b.title));
  const comments = rows
    .filter((r) => r.comment)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, maxComments);
  return {
    count: rows.length,
    distribution: ratingDistribution(rows.map((r) => r.rating)),
    byMock,
    comments,
  };
}

/**
 * Does the comment box hold something the server does not have yet? Compared
 * trimmed, blank as null, the same way validateFeedback stores it — so a
 * trailing space never costs a request, and clearing a saved comment does.
 */
export function commentNeedsSave(lastSaved: string | null, current: string): boolean {
  const next = current.trim() || null;
  return next !== (lastSaved?.trim() || null);
}
