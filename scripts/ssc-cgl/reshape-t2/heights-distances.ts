/**
 * Reshape plan: SSC CGL TIER II "Heights and Distances" (11 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 11 stems and solutions (2026-11-15); every key re-derived and agreed. Two pages, with Tier I's
 * names, by how many angles the stem gives: one line of sight (from the ground, and from a pole or
 * building, where the observer's height comes off first) and two angles of elevation or depression
 * (both on one side, and points on opposite sides). Nothing is flawed; every row may be featured.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  one: "One Line of Sight",
  two: "Two Angles of Elevation or Depression",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Heights and Distances",
  order: [T.one, T.two],
  byPrefix: {
    [T.one]: ["fccfc000", "4a4e42ce", "81adc252", "95c031e8", "5569a602"],
    [T.two]: ["0f78a146", "ff0499d5", "5bfe2e1a", "9644e8de", "714b5dc4", "a8036171"],
  },
  expected: { [T.one]: 5, [T.two]: 6 },
  total: 11,
};

export default plan;
