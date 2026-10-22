/**
 * Reshape plan: CDS GK Physics "Units, Measurement and Dimensions" (5 q),
 * for scripts/cds-gs/reshape.ts.
 *
 * Read all 5 stems AND solutions (2026-10-23). Five rows make one teaching page: units of
 * pressure and of a spring constant, the nano prefix and the nanoscale, and the one
 * dimensions question (Planck's constant). The page is renamed so its name says all three.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  units: "Units, Prefixes and Dimensions",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Units, Measurement and Dimensions",
  order: [T.units],
  whole: {
    "Units and Dimensions": T.units,
  },
  byPrefix: {},
  expected: { [T.units]: 5 },
  total: 5,
};

export default plan;
