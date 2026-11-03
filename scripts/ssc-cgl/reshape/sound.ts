/**
 * Reshape plan: SSC CGL Tier I General Awareness Physics "Sound" (7 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 7 rows (2026-11-02, main session). One page: the wave equation, then the Doppler effect and hearing.
 * No row is held back from featuring.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  sound: "Sound Waves and the Doppler Effect",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Sound",
  order: [T.sound],
  byPrefix: {
    [T.sound]: [
      "8d517cbc", "213f913b", "2d62ffc9", "c4f73788", "2a2e4a0d", "c4ad1ddf", "a9b8d443",
    ],
  },
  expected: {
    [T.sound]: 7,
  },
  total: 7,
};

export default plan;
