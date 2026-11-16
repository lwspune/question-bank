/**
 * Reshape plan: SSC CGL TIER II Reasoning "Classification" (14 q), for scripts/ssc-cgl/reshape.ts.
 * Read all 14 stems, options and keys (2026-11-15); every key agreed. Word and number odd-one-out on one page.
 */
import type { ReshapePlan } from "../reshape";

const T = { odd: "Odd One Out: Words and Numbers" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Reasoning",
  chapter: "Classification",
  order: [T.odd],
  byPrefix: {
    [T.odd]: [
      "1347dab3", "77929d69", "eebc8d9b", "f6db88ee", "7b18c506", "34f657c1", "4f55bf55",
      "09898b1c", "0f139cdb", "1c1c7ce2", "5d8a46aa", "abeb177c", "0d07aa2a", "974b4ce5",
    ],
  },
  expected: { [T.odd]: 14 },
  total: 14,
};

export default plan;
