/**
 * Pure rule for the NCERT watermark backfill (recrop-ncert.ts): replace a live
 * crop only when its record still reproduces it and the watermark crossed it.
 */
export type RecropMetrics = { liveVsOld: number; oldVsNew: number };
export type RecropDecision = "replace" | "clean" | "mismatch";

/** Above this share of strongly differing pixels the record no longer produces
 *  the live image (stale box, hand-made composite): never replace it blind. */
export const MISMATCH_OVER = 0.03;
/** Above this share of differing pixels the watermark showed in the crop. */
export const WATERMARK_OVER = 0.001;

export function decideRecrop(m: RecropMetrics): RecropDecision {
  if (m.liveVsOld > MISMATCH_OVER) return "mismatch";
  return m.oldVsNew > WATERMARK_OVER ? "replace" : "clean";
}
