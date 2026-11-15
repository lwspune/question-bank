/**
 * Reshape plan: SSC CGL TIER II Computer Knowledge "Cyber Security" (20 q), for scripts/ssc-cgl/reshape.ts.
 * Read all 20 stems and keys (2026-11-15); every key agreed. Malware and protection on one page.
 */
import type { ReshapePlan } from "../reshape";

const T = { sec: "Malware and How to Stay Protected" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Computer Knowledge",
  chapter: "Cyber Security",
  order: [T.sec],
  byPrefix: {
    [T.sec]: [
      "245dc46a", "5ccc05a7", "6d74a87c", "7fcf1f82", "838145fc", "85db1163", "cc761a78", "e6ee434e", "54354ee5", "81c2d610", "fd7e60e2", "a3f14042",
      "82380ffc", "14af007c", "4aa0f702", "ba89ef3a", "cfbfd917", "81bf5641", "8b7e7052", "8d32bcef",
    ],
  },
  expected: { [T.sec]: 20 },
  total: 20,
};

export default plan;
