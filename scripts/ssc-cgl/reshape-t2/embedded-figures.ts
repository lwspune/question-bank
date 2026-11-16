/**
 * Reshape plan: SSC CGL TIER II Reasoning "Embedded Figures and Pattern Completion" (14 q, every one a
 * picture), for scripts/ssc-cgl/reshape.ts. Read all 14 stems and keys (2026-11-15). Hidden figures and
 * pattern completion on one page.
 */
import type { ReshapePlan } from "../reshape";

const T = { figures: "Hidden Figures and Pattern Completion" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Reasoning",
  chapter: "Embedded Figures and Pattern Completion",
  order: [T.figures],
  byPrefix: {
    [T.figures]: [
      "66c18f4f", "88518a3c", "e21c71d2", "e2448d34", "d8a64912", "e8c7684b", "acc810dd",
      "4efcabec", "4f123edc", "5be618d1", "b169382c", "aa1a2327", "0411bb8e", "ef12f994",
    ],
  },
  expected: { [T.figures]: 14 },
  total: 14,
};

export default plan;
