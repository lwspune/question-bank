/**
 * Reshape plan: SSC CGL TIER II Reasoning "Mathematical Operations" (16 q), for scripts/ssc-cgl/reshape.ts.
 * Read all 16 stems and keys (2026-11-15); every key agreed. Sign substitution, interchange and balancing
 * on one page.
 */
import type { ReshapePlan } from "../reshape";

const T = { ops: "Sign Rules and Balancing Equations" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Reasoning",
  chapter: "Mathematical Operations",
  order: [T.ops],
  byPrefix: {
    [T.ops]: [
      "2dd4fe3f", "5e587e14", "7de6d2ad", "f9245189", "dc1bb857", "7c8c0e1e", "e321113b",
      "2d2d1bce", "3f538918", "c97b0074", "35b7180b",
      "234a8a58", "8aced5b2", "e8aa9bfa", "fac40dc4", "63bcf10e",
    ],
  },
  expected: { [T.ops]: 16 },
  total: 16,
};

export default plan;
