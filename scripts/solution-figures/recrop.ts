/**
 * Pure rule for the NCERT watermark backfill (recrop-ncert.ts): replace a live
 * crop only when its record still reproduces it and the watermark crossed it.
 */
export type RecropMetrics = { liveVsOld: number; oldVsNew: number; liveVsNew?: number };
export type RecropDecision = "replace" | "clean" | "mismatch" | "done";

/** Above this share of strongly differing pixels the record no longer produces
 *  the live image (stale box, hand-made composite): never replace it blind. */
export const MISMATCH_OVER = 0.03;
/** Above this share of differing pixels the watermark showed in the crop. */
export const WATERMARK_OVER = 0.001;
/** At or below this share the live image already IS the clean crop (replaced on
 *  an earlier run), so a re-run must not upload it again. Measured 2026-10-29:
 *  the 171 replaced on 10-19 score <= 0.0015; an unreplaced one 0.10. */
export const DONE_AT_OR_UNDER = 0.01;

export function decideRecrop(m: RecropMetrics): RecropDecision {
  if (m.liveVsOld > MISMATCH_OVER) return "mismatch";
  if (m.oldVsNew <= WATERMARK_OVER) return "clean";
  return m.liveVsNew !== undefined && m.liveVsNew <= DONE_AT_OR_UNDER ? "done" : "replace";
}
