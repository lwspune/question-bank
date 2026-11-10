/** Smallest size a formula is shrunk to; below it the maths is too small to read. */
export const FIT_MIN_SCALE = 0.7;

/**
 * How much to shrink a display formula so it fits its box (2026-11-10): 1 when
 * it already fits or when shrinking would go below FIT_MIN_SCALE (then it keeps
 * its size and scrolls under the edge shadow), otherwise just enough to fit with
 * a 2% margin. A box with no width yet is treated as fitting.
 * Spec: tests/fit-scale.test.ts.
 */
export function fitScale(scrollWidth: number, clientWidth: number): number {
  if (clientWidth <= 0 || scrollWidth <= clientWidth) return 1;
  const fit = clientWidth / scrollWidth;
  if (fit < FIT_MIN_SCALE) return 1;
  // The margin never takes it below the floor: at the floor it still fits.
  return Math.max(fit * 0.98, FIT_MIN_SCALE);
}
