/**
 * Reshape plan: SSC CGL TIER II "Averages" (22 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 22 stems and solutions (2026-11-15); every key re-derived and agreed. Two pages: sum and mean
 * (average and total, and a total that changes when values are added, removed, replaced or raised), and
 * combined and consecutive averages (one new name: two groups merged, and runs of even or odd numbers,
 * three rows each, too few on Tier II for Tier I's separate pages). Nothing is flawed; every row may be
 * featured.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  sum: "Sum and Mean",
  combined: "Combined and Consecutive Averages",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Averages",
  order: [T.sum, T.combined],
  byPrefix: {
    [T.sum]: [
      "68a94455", "fa2a0cb7", "4f75df25", "41bc0601", "04a552c9", "a593786c", "63c3c080", "9c1e3097", "1fdb596e",
      "ad00d467", "ebb4131a", "6f26f778", "d21f1132", "e9824785", "040668c2", "ae522129",
    ],
    [T.combined]: ["29d97a86", "2654125b", "3cdac9f4", "b956891e", "6aa8062b", "fb6f2b37"],
  },
  expected: { [T.sum]: 16, [T.combined]: 6 },
  total: 22,
};

export default plan;
