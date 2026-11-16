/**
 * Reshape plan: SSC CGL TIER II Reasoning "Alphabet and Number Tests" (12 q), for scripts/ssc-cgl/reshape.ts.
 * Read all 12 stems and keys (2026-11-15); every key agreed. Word formation and digit order on one page.
 */
import type { ReshapePlan } from "../reshape";

const T = { words: "Word Formation and Digit Order" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Reasoning",
  chapter: "Alphabet and Number Tests",
  order: [T.words],
  byPrefix: {
    [T.words]: [
      "8da7ffc8", "ceec5fcd", "d7ba98c8", "eb982b7e", "a48d0ddf", "26c742d4", "dbe09986", "a079c0ed", "f06b043a",
      "313a42bc", "55414742", "83e0e002",
    ],
  },
  expected: { [T.words]: 12 },
  total: 12,
};

export default plan;
