/**
 * Reshape plan: SSC CGL TIER II "Linear Equations" (19 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 19 stems and solutions (2026-11-15); every key re-derived and agreed. Two pages, with Tier I's
 * names: solving linear systems (solving two or three equations, and how many solutions a pair has) and
 * word problems and applications (setting up equations, heads and legs, and the four age rows, too few on
 * Tier II for Tier I's own page). Nothing is flawed; every row may be featured.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  systems: "Solving Linear Systems",
  words: "Word Problems and Applications",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Linear Equations",
  order: [T.systems, T.words],
  byPrefix: {
    [T.systems]: ["ec8601b2", "4aca66ee", "acaed599", "bae1a52b", "a8393617", "b56549e2", "7be48bd4", "96179ad9", "3462a51b"],
    [T.words]: ["070fc399", "cb96da1c", "7a311309", "470c7e97", "6f6fe642", "d7e49697", "404fd49c", "72ceda59", "4c407a6e", "fcad9953"],
  },
  expected: { [T.systems]: 9, [T.words]: 10 },
  total: 19,
};

export default plan;
