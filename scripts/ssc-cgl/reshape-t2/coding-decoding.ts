/**
 * Reshape plan: SSC CGL TIER II Reasoning "Coding-Decoding" (17 q), for scripts/ssc-cgl/reshape.ts.
 * Read all 17 stems and keys (2026-11-15); every key agreed. Letter, number and shared-code questions on
 * one page.
 */
import type { ReshapePlan } from "../reshape";

const T = { codes: "Letter, Number and Word Codes" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Reasoning",
  chapter: "Coding-Decoding",
  order: [T.codes],
  byPrefix: {
    [T.codes]: [
      "77a62b3d", "a136b72b", "c878c5a4", "77d787c2", "7439331d", "e17d072f",
      "29d1ec68", "3d87d463", "793afa3f", "7ee56ee7", "7f67d81f",
      "c848efb2", "8477265c", "98994d2e", "7aaf6dd7", "b631bbcf", "7c9d378d",
    ],
  },
  expected: { [T.codes]: 17 },
  total: 17,
};

export default plan;
