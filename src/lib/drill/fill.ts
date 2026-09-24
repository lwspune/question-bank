/**
 * The daily set — ENGAGEMENT_SPEC.md B2 — as a FILL of the drill. Pure core.
 *
 * WHY A FILL AND NOT A NEW SURFACE. The user's brief is no clutter, phone
 * first, and `/drill` is already the one place a student goes to practise
 * five questions. So when fewer than five are DUE, the rest of the five are
 * UNSEEN past-year MCQs: first from the subtopics this student has got wrong
 * most often (the transfer half the drill launched without — an exact
 * question they missed proves recall, an unseen one from the same subtopic
 * proves the idea), then from their target exam at large. A student with
 * nothing due and a target exam still gets five; the empty state is now only
 * for a student with neither.
 *
 * FIXED SIZE, DETERMINISTIC ORDER. Five, due first, no randomness: this is
 * retrieval practice with a predictable cost, not a variable reward. What
 * moves the pool forward is the SEEN filter — a question served today is met,
 * and met questions are never served as "new" again.
 *
 * Difficulty matching is deliberately absent in v1: the spec named it, but a
 * band needs three judged answers per subtopic and the students this fill
 * exists for (nothing due) are the ones with the least evidence.
 *
 * No I/O. Spec: tests/drill-fill.test.ts.
 */
import type { DueQuestion } from "./select";

/** How many weak subtopics the fill draws from. Two: enough to interleave,
 *  few enough that a subtopic gets a real run of practice. */
export const WEAK_SUBTOPICS = 2;

export type WrongRef = { questionId: string; subtopicId: string | null };

/** The n subtopics with the most recorded wrong answers, most first, ties by
 *  id so the same history yields the same choice. Unclassified misses are
 *  skipped — there is no subtopic to draw from. */
export function rankWeakSubtopics(wrongs: readonly WrongRef[], n = WEAK_SUBTOPICS): string[] {
  const counts = new Map<string, number>();
  for (const w of wrongs) {
    if (!w.subtopicId) continue;
    counts.set(w.subtopicId, (counts.get(w.subtopicId) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
    .slice(0, n)
    .map(([id]) => id);
}

/** Candidates minus the seen set, in candidate order, deduplicated, capped. */
export function pickUnseen(candidates: readonly string[], seen: ReadonlySet<string>, n: number): string[] {
  const out: string[] = [];
  const taken = new Set<string>();
  for (const id of candidates) {
    if (out.length >= n) break;
    if (seen.has(id) || taken.has(id)) continue;
    taken.add(id);
    out.push(id);
  }
  return out;
}

export type SetItem = { questionId: string; origin: "due" | "new" };

/** Due questions first (already interleaved by selectDrill), then new ones
 *  to fill the gap, never past `size`, never the same question twice. */
export function composeDailySet(
  due: readonly DueQuestion[],
  fresh: readonly string[],
  size: number
): SetItem[] {
  const out: SetItem[] = [];
  const taken = new Set<string>();
  for (const d of due) {
    if (out.length >= size) break;
    if (taken.has(d.questionId)) continue;
    taken.add(d.questionId);
    out.push({ questionId: d.questionId, origin: "due" });
  }
  for (const id of fresh) {
    if (out.length >= size) break;
    if (taken.has(id)) continue;
    taken.add(id);
    out.push({ questionId: id, origin: "new" });
  }
  return out;
}
