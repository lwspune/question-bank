/**
 * Staleness + latest-verdict resolution for review rows. Pure — no I/O.
 *
 * See tests/reviews-staleness.test.ts for the reasoning behind each rule.
 */

/**
 * Has the question changed since this review looked at it?
 *
 * An unknown current hash counts as STALE, not fresh: we cannot show the review
 * still applies, and the whole point of the fingerprint is to avoid asserting
 * what we cannot support.
 */
export function isReviewStale(
  review: { reviewed_content_hash: string },
  currentContentHash: string | null | undefined
): boolean {
  if (typeof currentContentHash !== "string" || currentContentHash.length === 0) return true;
  return review.reviewed_content_hash !== currentContentHash;
}

/**
 * The newest review per question — "what do we currently believe about this
 * question?". The table is append-only, so an overturned review is still on
 * record; this just picks the one that stands.
 *
 * On an exact timestamp tie the FIRST row encountered wins. Two reviews of one
 * question at the same instant cannot be ordered, so this is deterministic by
 * fiat and a tie should be read as a data problem, not resolved cleverly.
 */
export function latestReviewByQuestion<T extends { question_id: string; reviewed_at: string }>(
  rows: readonly T[]
): Map<string, T> {
  const latest = new Map<string, T>();
  for (const row of rows) {
    const held = latest.get(row.question_id);
    if (!held || row.reviewed_at > held.reviewed_at) {
      latest.set(row.question_id, row);
    }
  }
  return latest;
}
