/**
 * Pure helpers for the answer-reveal practice signal.
 *
 * WHY: revealing an answer is the one discrete act of retrieval practice the
 * question bank produces — the student tried, then checked. Until now it was
 * computed client-side by revealMeter.ts and thrown away, which left the bank
 * (70k questions, 317 landing pages) recording NOTHING when it was used. A
 * "viewed" event was deliberately not chosen: scrolling past a question is not
 * practice, and it would be high-volume and low-meaning.
 *
 * Signed-in students only. Anonymous visitors are not tracked: a retention claim
 * needs a stable identity across visits, which for an anonymous visitor means
 * minting a persistent device id — and that is behavioural monitoring of an
 * audience that is largely under 18. Aggregate anon counts are already
 * approximated by Vercel Analytics.
 *
 * Batching matters: a student revealing 40 answers must be one request, not 40.
 * The client accumulates ids and flushes on an interval and on page hide.
 *
 * Spec: tests/practice-batch.test.ts.
 */

/** Most ids in one flush. Bounds both the request body and the client queue. */
export const PRACTICE_BATCH_MAX = 50;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/**
 * Add a revealed question to the pending queue. Deduped (a re-reveal is not a
 * second practice event) and capped — when full the OLDEST is dropped, so a long
 * session keeps the most recent work rather than refusing all new work.
 */
export function addToBatch(batch: readonly string[], questionId: string): string[] {
  if (batch.includes(questionId)) return [...batch];
  const next = [...batch, questionId];
  return next.length > PRACTICE_BATCH_MAX ? next.slice(next.length - PRACTICE_BATCH_MAX) : next;
}

export type ParsedBatch = { ok: true; ids: string[] } | { ok: false; error: string };

/**
 * Validate an untrusted batch body. The client is not trusted to have deduped,
 * lowercased or bounded anything.
 *
 * An oversized batch is REJECTED rather than truncated: silently dropping the
 * tail would leave the client believing it had recorded work we never stored,
 * and neither side would ever find out.
 */
export function parsePracticeBatch(raw: unknown): ParsedBatch {
  if (typeof raw !== "object" || raw === null) return { ok: false, error: "Invalid body." };
  const ids = (raw as { questionIds?: unknown }).questionIds;
  if (!Array.isArray(ids)) return { ok: false, error: "questionIds must be an array." };
  if (ids.length === 0) return { ok: false, error: "questionIds is empty." };
  if (ids.length > PRACTICE_BATCH_MAX) {
    return { ok: false, error: `Too many ids in one batch (max ${PRACTICE_BATCH_MAX}).` };
  }

  const out: string[] = [];
  for (const id of ids) {
    if (typeof id !== "string") return { ok: false, error: "questionIds must be strings." };
    const norm = id.trim().toLowerCase();
    if (!UUID_RE.test(norm)) return { ok: false, error: "questionIds must be uuids." };
    if (!out.includes(norm)) out.push(norm);
  }
  return { ok: true, ids: out };
}
