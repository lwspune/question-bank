/**
 * Reshape plan: SSC CGL TIER II Reasoning "Analogy" (17 q), for scripts/ssc-cgl/reshape.ts.
 * Read all 17 stems and keys (2026-11-15); every key agreed. Letter, word and number analogies on one page.
 */
import type { ReshapePlan } from "../reshape";

const T = { analogy: "Letter, Word and Number Analogies" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Reasoning",
  chapter: "Analogy",
  order: [T.analogy],
  byPrefix: {
    [T.analogy]: [
      "3299d885", "b6594c0b", "c22d4b56", "cd04c394", "2d47b279", "c242542d", "4264271b", "dda3ac80",
      "4fcad984", "81c6510a", "a204474c", "e8744ed1", "bfeae137", "8d98911a", "fa8d3017", "180b1a5d", "4d74541c",
    ],
  },
  expected: { [T.analogy]: 17 },
  total: 17,
};

export default plan;
