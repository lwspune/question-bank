/**
 * How far a student got through an animated solution (2026-11-08), the pure
 * core the player feeds.
 *
 * WHY. Until this, the player sent "finished" only when its automatic first
 * run reached the end untouched. A student who tapped through to the last
 * step, or whose phone has animations turned off (the player then shows the
 * final picture and never plays), was never counted as finishing. Two
 * students who probably had animations off showed 0 finished of 38 between
 * them, which alone made the 3D and algebra scenes look weak.
 *
 * The player calls stepDone(k, how) each time step k finishes drawing, by the
 * automatic run ("auto") or by a tap ("tapped"). The tracker answers with
 * what to record:
 *   reached   a step further than any before (step is 1-based, from 2: the
 *             first step is already covered by "shown")
 *   finished  the first time the last step is reached, by either route
 * With animations off it records nothing: that student only ever sees the
 * final picture, so there is nothing to finish. Their "shown" says so
 * instead (lib/visuals/usage), and the report leaves them out of the share.
 *
 * Spec: tests/visual-progress.test.ts.
 */

export type StepRoute = "auto" | "tapped";

export type ProgressReport = { action: "reached"; step: number } | { action: "finished"; how: StepRoute };

export type Progress = { stepDone(k: number, how: StepRoute): ProgressReport[] };

export function createProgress(total: number, opts: { reduced: boolean }): Progress {
  let furthest = 0;
  let finished = false;
  return {
    stepDone(k, how) {
      if (opts.reduced || !Number.isInteger(k) || k < 0 || k >= total) return [];
      const out: ProgressReport[] = [];
      if (k > furthest) {
        furthest = k;
        out.push({ action: "reached", step: k + 1 });
      }
      if (k === total - 1 && !finished) {
        finished = true;
        out.push({ action: "finished", how });
      }
      return out;
    },
  };
}
