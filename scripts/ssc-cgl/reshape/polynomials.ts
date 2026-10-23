/**
 * Reshape plan: SSC CGL Tier I "Polynomials" (6 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 6 stems and solutions (2026-10-23): three rows from the 2023 shifts, two from 2024 and
 * one from 2025, and every key checks. The ingest filed them under three subtopics of one to three
 * rows. One page holds them all, in teaching order: putting a value into a polynomial (with the sign
 * rule for a polynomial whose terms all have the same degree), the remainder and factor theorems,
 * the sum of the roots read from the coefficients, and a product that collapses by the difference of
 * squares. No row is flawed.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  values: "Values, Remainders and Roots",
} as const;

const plan: ReshapePlan = {
  chapter: "Polynomials",
  order: [T.values],
  byPrefix: {
    [T.values]: ["ab383916", "a7e42f7e", "e3961e8d", "e419341d", "8e2e46c2", "09fa39ee"],
  },
  expected: {
    [T.values]: 6,
  },
  total: 6,
};

export default plan;
