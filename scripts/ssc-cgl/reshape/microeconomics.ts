/**
 * Reshape plan: SSC CGL Tier I General Awareness Economics "Microeconomics" (10 q), for
 * scripts/ssc-cgl/reshape.ts.
 *
 * Read all 10 rows (2026-11-01, main session). One page: basic ideas with public goods, and demand with elasticity.
 * No row is held back from featuring.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  basics: "Basic Concepts, Demand and Elasticity",
} as const;

const plan: ReshapePlan = {
  subject: "Economics",
  chapter: "Microeconomics — Demand, Supply and Market Structure",
  order: [T.basics],
  byPrefix: {
    [T.basics]: [
      "38bc3dd7", "56acb02c", "33026931", "3cb3bb8f", "43f3db80", "db3d7594", "e2d79e3d", "5fc5bc51",
      "44b6898a", "146c6bae",
    ],
  },
  expected: {
    [T.basics]: 10,
  },
  total: 10,
};

export default plan;
