/**
 * Reshape plan: SSC CGL Tier I General Awareness Physics "Astronomy and Space" (7 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 7 rows (2026-11-02, main session). One page: the universe and its objects, then satellites and space weather.
 * No row is held back from featuring.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  space: "The Universe and Satellites",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Astronomy and Space",
  order: [T.space],
  byPrefix: {
    [T.space]: [
      "3d2ea865", "824c4bd9", "9e167fe9", "e4be428e", "9c62ef43", "b79a61fb", "c35b15e8",
    ],
  },
  expected: {
    [T.space]: 7,
  },
  total: 7,
};

export default plan;
