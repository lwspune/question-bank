/**
 * Reshape plan: SSC CGL TIER II Reasoning "Data Sufficiency" (14 q), for scripts/ssc-cgl/reshape.ts.
 * Read all 14 stems and keys (2026-11-15); every key agreed. One page: seating questions and the rest.
 */
import type { ReshapePlan } from "../reshape";

const T = { ds: "Data Sufficiency: One, Both or Neither" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Reasoning",
  chapter: "Data Sufficiency",
  order: [T.ds],
  byPrefix: {
    [T.ds]: [
      "4847ffaa", "4af63cb5", "b988dbeb", "bfdee938", "c9c2efe3", "dc6efc30", "e6784f94", "f78c2485", "a58977f8", "de94477a",
      "f2bab633", "75ca2d6f", "9989ea8b", "ae76fbc4",
    ],
  },
  expected: { [T.ds]: 14 },
  total: 14,
};

export default plan;
