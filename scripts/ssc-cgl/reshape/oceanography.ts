/**
 * Reshape plan: SSC CGL Tier I General Awareness Geography "Oceanography" (7 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 7 rows (2026-11-01, main session). One page. Never featured: 0d9c1737 (its solution opens with a Note)
 * and dcfb1555 (its solution credits NCERT with a figure NCERT does not give).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  oceans: "Tides, Salinity and Coral Reefs",
} as const;

const plan: ReshapePlan = {
  subject: "Geography",
  chapter: "Oceanography",
  order: [T.oceans],
  byPrefix: {
    [T.oceans]: [
      "67fb0fd6", "5afd2a86", "de8a8ba7", "0d9c1737", "dcfb1555", "94d0a671", "b7a0ed16",
    ],
  },
  expected: {
    [T.oceans]: 7,
  },
  total: 7,
};

export default plan;
