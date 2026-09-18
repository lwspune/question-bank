/**
 * Text size for the classroom-projection overlay, in px.
 *
 * Separate from the component because the component is a Radix portal that does
 * not exist until a click — there is no headless way to render one in this repo,
 * so every decision that can be made without a DOM is made here where a test can
 * reach it.
 *
 * The default is a ROOM measurement rather than a design preference. The card
 * this overlay opens from is sized for one reader at arm's length; the overlay
 * is read by a class from up to eight metres away, so it opens far larger and
 * the teacher trims from there. The chosen size persists per browser, because a
 * given classroom's panel and room depth do not change between lessons.
 *
 * Spec: tests/present-text-size.test.ts.
 */

export const MIN_PRESENT_SIZE = 20;
export const MAX_PRESENT_SIZE = 72;
export const DEFAULT_PRESENT_SIZE = 32;
export const PRESENT_SIZE_STEP = 4;

/** localStorage key. Per browser, so one classroom panel keeps its setting. */
export const PRESENT_SIZE_KEY = "qb_present_size";

/**
 * Bound a size to the legible range.
 *
 * The non-finite guard is load-bearing and not defensive noise: `Math.max(MIN,
 * NaN)` is NaN, so a clamp written the obvious way passes NaN straight through
 * into a `font-size` and the overlay renders at nothing. The value arrives from
 * localStorage, which can hold anything.
 */
export function clampPresentSize(px: number): number {
  if (!Number.isFinite(px)) {
    return Number.isNaN(px) ? DEFAULT_PRESENT_SIZE : MAX_PRESENT_SIZE;
  }
  return Math.min(MAX_PRESENT_SIZE, Math.max(MIN_PRESENT_SIZE, px));
}

/** One A− / A+ press. Saturates at the bounds rather than overshooting. */
export function stepPresentSize(px: number, direction: 1 | -1): number {
  return clampPresentSize(clampPresentSize(px) + direction * PRESENT_SIZE_STEP);
}

/** Parse a persisted size, falling back to the default for anything unusable. */
export function readPresentSize(raw: string | null): number {
  if (!raw) return DEFAULT_PRESENT_SIZE;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return DEFAULT_PRESENT_SIZE;
  return clampPresentSize(parsed);
}
