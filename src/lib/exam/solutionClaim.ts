/**
 * What an exam's pages may promise about solutions.
 *
 * Every exam page and chapter landing page used to say "with answers and worked
 * solutions", but on 2026-10-23 ten exams had a worked solution on under a quarter
 * of their questions (MPSC, IPMAT, JIPMAT, Foundation Course) and two on under
 * half (NEET, MPSC State Services Mains). Each exam declares its coverage on
 * EXAM_REGISTRY (`solutionCoverage`, absent = all), and
 * tests/solution-coverage-registry.test.ts re-measures it daily against the live
 * bank with classifySolutionShare, so the declaration cannot drift.
 *
 * Pure; unit-tested in tests/solution-claim.test.ts.
 */

export type SolutionCoverage = "all" | "some" | "none";

/** Share of PUBLIC questions with a worked solution at or above which an exam is "all". */
export const ALL_SOLVED_SHARE = 0.9;
/** At or above this share (and below ALL_SOLVED_SHARE) an exam is "some"; below, "none". */
export const SOME_SOLVED_SHARE = 0.25;

export function classifySolutionShare(share: number): SolutionCoverage {
  if (share >= ALL_SOLVED_SHARE) return "all";
  return share >= SOME_SOLVED_SHARE ? "some" : "none";
}

export function solutionCoverageOf(entry: { solutionCoverage?: "some" | "none" } | null | undefined): SolutionCoverage {
  return entry?.solutionCoverage ?? "all";
}

/** The clause a page uses: never a promise of solutions the questions do not carry. */
export function answersPhrase(coverage: SolutionCoverage): string {
  switch (coverage) {
    case "all":
      return "with answers and worked solutions";
    case "some":
      return "with answers, and worked solutions for some";
    case "none":
      return "with answers";
  }
}
