/**
 * Reshape plan: SSC CGL Tier I General Awareness Chemistry "Mole Concept and Stoichiometry" (7 q), for
 * scripts/ssc-cgl/reshape.ts.
 *
 * Read all 7 rows (2026-11-02, main session). One page: mole sums, and the laws with their discoverers.
 * No row is held back from featuring.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  mole: "The Mole and the Laws of Combination",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Mole Concept and Stoichiometry",
  order: [T.mole],
  byPrefix: {
    [T.mole]: [
      "c10ec545", "7005c04a", "f81e6dc7", "b61665f4", "a36b2d80", "de143edf", "4f4ab0e8",
    ],
  },
  expected: {
    [T.mole]: 7,
  },
  total: 7,
};

export default plan;
