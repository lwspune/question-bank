/**
 * Question of the day — the pure pick (2026-10-04).
 *
 * Replaces the "thought of the day" first proposed for the motivation layer: a
 * quote has close to no measured effect (mindset messaging, d ≈ 0.08) and a
 * pop-up on first open delays the first question; a real past-year question is
 * retrieval practice, and a miss feeds the drill.
 *
 * Everyone targeting an exam gets the SAME question on an IST day, chosen by
 * hashing "<exam>:<day>" into the exam's pool. No table: the date is the state.
 * The pool is ordered by id at read time (lib/daily/service.ts), so an ingest
 * that day can move the pick, which is acceptable for a daily card; the read is
 * cached per exam per day to keep it still.
 *
 * Spec: tests/question-of-day.test.ts.
 */

export function dailySeed(examSlug: string, istDay: string): string {
  return `${examSlug}:${istDay}`;
}

/** FNV-1a, 32-bit: small, stable across runtimes, and well spread for short keys. */
function fnv1a(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

export function dailyIndex(seed: string, poolSize: number): number | null {
  if (!Number.isInteger(poolSize) || poolSize <= 0) return null;
  return fnv1a(seed) % poolSize;
}
