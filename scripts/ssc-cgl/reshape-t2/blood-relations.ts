/**
 * Reshape plan: SSC CGL TIER II Reasoning "Blood Relations" (15 q), for scripts/ssc-cgl/reshape.ts.
 * Read all 15 stems and keys (2026-11-15); every key agreed. Coded and direct relations on one page.
 */
import type { ReshapePlan } from "../reshape";

const T = { rel: "Family Trees from Statements and Codes" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Reasoning",
  chapter: "Blood Relations",
  order: [T.rel],
  byPrefix: {
    [T.rel]: [
      "49065d83", "7c796098", "96a86747", "b4906a7b", "b5c6440b", "c1a4aff1", "dd9cecda", "ee0caa17", "585eeed2", "6001b72a", "eec06d74",
      "8f7d5665", "8840adfc", "b57fb515", "b6ad1a28",
    ],
  },
  expected: { [T.rel]: 15 },
  total: 15,
};

export default plan;
