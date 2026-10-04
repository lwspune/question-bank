/**
 * "Beat the crowd" — the pure core (2026-10-04, the user's tiers and words).
 *
 * When a student answers right a question most students got wrong:
 *   70%+ wrong  "Nice! 70%+ got this wrong. You got it right."
 *   80%+ wrong  "Smart! 80%+ got this wrong. You got it right."
 *   90%+ wrong  "Genius! 90%+ got this wrong. You got it right."
 * V says it (the user's call, same day).
 *
 * THE SAFETY RULES ARE THE FEATURE. A question most students get wrong is
 * exactly where a wrong key hides: on 2026-10-04 all 45 questions at 80%+
 * wrong had a distractor as the most-picked option. So the message fires only
 * when ALL of these hold:
 *   1. a person CHECKED the question (a `question_reviews` row from a crowd
 *      run, verdict confirmed / key_fixed / stem_fixed / solution_rewritten)
 *      and it has not changed since (reviewed hash = current hash);
 *   2. the crowd figure is pooled only from stat rows measured on the question
 *      as it stands (a key fix makes old rows' "correct" mean the old key) and
 *      whose source did not mark against a different key (verdict_mismatch);
 *   3. at least CROWD_MIN_ATTEMPTS attempts back the figure;
 *   4. the source is not on the not-credible list (a classroom test whose
 *      crowd picked "turbulence" as the opposite of AGREEMENT).
 * Unreviewed questions never fire: a newly hard question waits for the next
 * review run (scripts/reviews/apply-crowd-hard-fixes.ts is the first).
 *
 * A fact about a QUESTION, shown only after the student got it right — the
 * C4 rule (ENGAGEMENT_SPEC.md) that keeps peer data off people.
 *
 * Spec: tests/celebrate-crowd.test.ts.
 */

/** Review runs whose verdicts make a question eligible. */
export const CROWD_REVIEW_RUNS = ["crowd-hard-key-check-2026-10-04"] as const;

export const CROWD_MIN_ATTEMPTS = 20;

const ELIGIBLE_VERDICTS: ReadonlySet<string> = new Set(["confirmed", "key_fixed", "stem_fixed", "solution_rewritten"]);

/** Sources whose recorded picks are not credible as a crowd (by hand, 2026-10-04). */
const NOT_CREDIBLE_SOURCES: ReadonlySet<string> = new Set(["Eng_Geo_Final_D_Test_19_Aug.docx"]);

export type CrowdTier = 70 | 80 | 90;

const WORD: Record<CrowdTier, string> = { 70: "Nice!", 80: "Smart!", 90: "Genius!" };

export function crowdTier(pooled: { attempted: number; correct: number }): CrowdTier | null {
  if (pooled.attempted < CROWD_MIN_ATTEMPTS) return null;
  const wrong = 1 - pooled.correct / pooled.attempted;
  if (wrong >= 0.9) return 90;
  if (wrong >= 0.8) return 80;
  if (wrong >= 0.7) return 70;
  return null;
}

export function crowdMessage(tier: CrowdTier): string {
  return `${WORD[tier]} ${tier}%+ got this wrong. You got it right.`;
}

export type CrowdStatRow = {
  attempted: number;
  correct: number;
  measuredContentHash: string | null;
  /** Tracker rows only; null on vault mocks, which grade against our own key. */
  verdictMismatch: number | null;
};

export function poolFreshStats(rows: readonly CrowdStatRow[], currentHash: string): { attempted: number; correct: number } {
  let attempted = 0;
  let correct = 0;
  for (const r of rows) {
    if (r.measuredContentHash !== currentHash || (r.verdictMismatch ?? 0) > 0) continue;
    attempted += r.attempted;
    correct += r.correct;
  }
  return { attempted, correct };
}

export function isCrowdEligible(input: {
  reviewVerdict: string | null;
  reviewedHash: string | null;
  currentHash: string;
  sourceFile: string | null;
}): boolean {
  if (!input.reviewVerdict || !ELIGIBLE_VERDICTS.has(input.reviewVerdict)) return false;
  if (input.reviewedHash !== input.currentHash) return false;
  return !(input.sourceFile && NOT_CREDIBLE_SOURCES.has(input.sourceFile));
}
