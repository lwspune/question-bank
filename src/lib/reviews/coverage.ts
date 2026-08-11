/**
 * What a new review pass may skip, given what is already on record. Pure — no I/O.
 *
 * See tests/reviews-coverage.test.ts for the three rules and why each exists.
 */
import { METHOD_STRENGTH, type ReviewMethod, type ReviewVerdict } from "./types";

export type PriorReview = { method: string; verdict: string };

export type ReviewDisposition =
  /** Already confirmed by evidence at least as strong as the pass being run. */
  | "skip"
  /** Needs looking at. */
  | "review"
  /** Something is already known about it — surface that rather than re-deriving. */
  | "flag";

/**
 * Verdicts that mean a finding exists which a reviewer should SEE before the
 * paper is printed, even if the answer itself was later confirmed.
 */
const FLAG_VERDICTS: ReadonlySet<ReviewVerdict> = new Set(["defect_preserved", "unverifiable"]);

export function classifyForReview(
  priors: readonly PriorReview[],
  targetMethod: ReviewMethod
): ReviewDisposition {
  // A known defect outranks a skip: "this question has a known book defect" is
  // exactly what a pre-print reviewer needs, confirmed answer or not.
  if (priors.some((p) => FLAG_VERDICTS.has(p.verdict as ReviewVerdict))) return "flag";

  const required = METHOD_STRENGTH[targetMethod];
  const covered = priors.some(
    (p) =>
      p.verdict === "confirmed" &&
      (METHOD_STRENGTH[p.method as ReviewMethod] ?? 0) >= required
  );
  return covered ? "skip" : "review";
}
