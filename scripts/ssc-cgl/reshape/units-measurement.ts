/**
 * Reshape plan: SSC CGL Tier I General Awareness Physics "Units, Measurement and Dimensions" (7 q), for
 * scripts/ssc-cgl/reshape.ts.
 *
 * Read all 7 rows (2026-11-02, main session). One page: units, then dimensions and the vernier calliper.
 * No row is held back from featuring.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  units: "Units, Dimensions and Measuring",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Units, Measurement and Dimensions",
  order: [T.units],
  byPrefix: {
    [T.units]: [
      "b462366c", "c932dbf7", "79b3ce9d", "993c6443", "fdbb6aa7", "0daea665", "f6510d47",
    ],
  },
  expected: {
    [T.units]: 7,
  },
  total: 7,
};

export default plan;
