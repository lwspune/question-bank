/**
 * The arithmetic behind the small charts on the student's own tabs
 * (2026-11-10): reason bars on Review, a bar per weak spot on Home, the subject
 * bar over the map and the fixed ring on Progress. Pure; the components only
 * draw what these return. Spec: tests/me-charts.test.ts.
 *
 * Percentages keep one decimal: enough for a bar, and the words beside every
 * bar carry the exact counts.
 */

const one = (n: number) => Math.round(n * 10) / 10;

export type Segment<K extends string> = { key: K; n: number; pct: number };

/**
 * A bar split into parts, each its share of `total` (the parts' sum unless
 * given), in the order given. Empty parts are dropped so no zero-width sliver
 * draws a rounded end; an empty total draws nothing.
 */
export function segments<K extends string>(
  parts: readonly { key: K; n: number }[],
  total?: number
): Segment<K>[] {
  const of = total ?? parts.reduce((s, p) => s + Math.max(0, p.n), 0);
  if (of <= 0) return [];
  return parts.filter((p) => p.n > 0).map((p) => ({ key: p.key, n: p.n, pct: one((p.n / of) * 100) }));
}

/** The smallest bar a non-empty row draws, so a 1 next to a 400 still shows. */
const MIN_VISIBLE = 4;

/**
 * A row's bar width as a percent of the biggest row, so the top row fills its
 * track. Never empty for a row that holds something, never over full.
 */
export function barWidth(n: number, max: number): number {
  if (n <= 0 || max <= 0) return 0;
  return Math.min(100, Math.max(MIN_VISIBLE, one((n / max) * 100)));
}

/**
 * Mistakes fixed out of every mistake made, for the Progress tile's ring.
 *
 * `fixed` is counted across every exam (the drill ladder's lifetime count), so
 * `waiting` is too: the per-chapter due counts, which the pulse keeps unfocused.
 * Pairing it with the FOCUSED due count would put one exam's backlog under
 * every exam's fixes. Null until the pulse has arrived.
 */
export function fixProgress(
  fixed: number | null,
  chapterDue: Record<string, number> | undefined
): { fixed: number; waiting: number; share: number } | null {
  if (fixed === null) return null;
  const waiting = Object.values(chapterDue ?? {}).reduce((s, n) => s + n, 0);
  const all = fixed + waiting;
  return { fixed, waiting, share: all === 0 ? 0 : fixed / all };
}
