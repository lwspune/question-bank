// Does a newly transcribed shift grade difficulty on the same scale as the bank?
//
// The 2026 papers were first labelled by a different hand than 2021-2025, and the
// labels ran far easier (Maths HARD 11% against 29-46%). Nothing noticed until the
// guides' figures moved, and every label had to be re-graded. build-pdf-shift now
// compares each subject's mix in a shift with the bank's baseline
// (difficulty-baseline.json) and refuses one that drifts beyond the tolerance.
//
// The tolerance is wide on purpose: a subject is 50 questions, so ordinary
// paper-to-paper noise is several points either way. 20 points is about three
// standard deviations for a 40% share, so a hit means a different SCALE, not a
// harder or easier paper.
export type Difficulty = "EASY" | "MODERATE" | "HARD";
export type Mix = { n: number } & Record<Difficulty, number>;
export type Baseline = Record<Difficulty, number>;

export const DRIFT_TOLERANCE = 20;

/** Whole-number percentage of each label. */
export function difficultyMix(labels: Difficulty[]): Mix {
  const n = labels.length;
  const pct = (d: Difficulty) => (n ? Math.round((100 * labels.filter((x) => x === d).length) / n) : 0);
  return { n, EASY: pct("EASY"), MODERATE: pct("MODERATE"), HARD: pct("HARD") };
}

/** One line per label (EASY and HARD, the two ends of the scale) that sits beyond the tolerance. */
export function difficultyDrift(mix: Mix, baseline: Baseline, tolerance = DRIFT_TOLERANCE): string[] {
  const out: string[] = [];
  for (const d of ["EASY", "HARD"] as const) {
    const gap = mix[d] - baseline[d];
    if (Math.abs(gap) > tolerance) out.push(`${d} ${mix[d]}% vs bank ${baseline[d]}% (${gap > 0 ? "+" : ""}${gap})`);
  }
  return out;
}
