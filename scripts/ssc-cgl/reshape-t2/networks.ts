/**
 * Reshape plan: SSC CGL TIER II Computer Knowledge "Computer Networks" (11 q), for scripts/ssc-cgl/reshape.ts.
 * Read all 11 stems and keys (2026-11-15); every key agreed (91f0d7dc keys "Layer 3 Switch", the only
 * switch among its options; not featured). Devices and network basics on one page.
 */
import type { ReshapePlan } from "../reshape";

const T = { nw: "Network Devices, Layers and Media" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Computer Knowledge",
  chapter: "Computer Networks",
  order: [T.nw],
  byPrefix: {
    [T.nw]: [
      "46d106cc", "50c99839", "8819a295", "a93df1ff", "971886a9", "302c9dd0", "91f0d7dc",
      "27615e66", "45d55d5e", "589df377", "3030f2d6",
    ],
  },
  expected: { [T.nw]: 11 },
  total: 11,
};

export default plan;
