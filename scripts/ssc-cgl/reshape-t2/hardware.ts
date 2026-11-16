/**
 * Reshape plan: SSC CGL TIER II Computer Knowledge "Computer Hardware" (44 q), for scripts/ssc-cgl/reshape.ts.
 * Read all 44 stems and keys (2026-11-15); every key agreed. One page: the CPU, memory and storage, and
 * ports and devices. Flawed (solution opens with a **Note:**, tagged but never featured): c30be96d.
 */
import type { ReshapePlan } from "../reshape";

const T = { hw: "CPU, Memory, Ports and Devices" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Computer Knowledge",
  chapter: "Computer Hardware",
  order: [T.hw],
  byPrefix: {
    [T.hw]: [
      "2a5e7e1c", "3c06a855", "416fb7aa", "8bda8f28", "a285e13f", "cf2e4f6f", "fc929608", "5eca54d5", "5c33f81f", "9e63daf9", "566ac075", "b00d7a56",
      "0271455c", "03edc4c4", "1c6b0f24", "5ad5245c", "66c99558", "8950862c", "8df2a1e9", "b6ae53e9", "b7bfda2e", "c30be96d", "c8bbe002",
      "23909cde", "7bda33b0", "d5a47787", "9095e188", "b285f8be", "b952c73f", "cfc18a41", "685009b9", "e16f0273", "9da58fc8",
      "01c7ddc6", "140a06ff", "6006ab59", "8ebdf016", "0b0c22cf", "d910b2a8", "7b62bf4d", "8ce4741e", "9f846739", "b240a439", "f46d496c",
    ],
  },
  expected: { [T.hw]: 44 },
  total: 44,
};

export default plan;
