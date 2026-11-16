/**
 * Reshape plan: SSC CGL TIER II "Quadrilaterals" (10 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 10 stems and solutions (2026-11-15); every key re-derived. One page, as on Tier I: properties of
 * quadrilaterals (cyclic quadrilaterals; diagonals, area and the parallelogram rule; trapeziums).
 *
 * Never featured: 77cbb951 (Note: SSC keyed C, 1 : root 2; working it through gives A, 1 : 2, which the
 * bank keeps).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  properties: "Properties of Quadrilaterals",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Quadrilaterals",
  order: [T.properties],
  byPrefix: {
    [T.properties]: ["687197bb", "08a9d171", "35906e73", "e9bade87", "1d7f79cc", "77cbb951", "2e629553", "1d72ebfe", "98682d6d", "45a2aa79"],
  },
  expected: { [T.properties]: 10 },
  total: 10,
};

export default plan;
