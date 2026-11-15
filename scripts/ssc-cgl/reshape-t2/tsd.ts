/**
 * Reshape plan: SSC CGL TIER II "Time, Speed and Distance" (21 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 21 stems and solutions (2026-11-15); every key re-derived and agreed. Six subtopics of 1 to 6
 * rows. Two pages, with Tier I's names: speed, time and distance basics (units and speed changes, average
 * speed, and the boat and race rows) and relative speed (meeting, chasing and the circular track, and
 * trains crossing). Nothing is flawed; every row may be featured.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  basics: "Speed, Time and Distance Basics",
  relative: "Relative Speed: Chasing and Meeting",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Time, Speed and Distance",
  order: [T.basics, T.relative],
  byPrefix: {
    [T.basics]: [
      "6fc79a5f", "1999d805", "d084dfde", "083dc22b",
      "75330f1d", "8003426d", "eabf5ea2", "aa0e6ed9", "d07c826b",
      "995d8b7d", "9a1971a9", "3bdb7e5d",
    ],
    [T.relative]: ["8cc4356e", "97db71a4", "c413addc", "9dd26f17", "fea58b95", "91226163", "0cc8ebac", "d897dfd8", "7b6d26a0"],
  },
  expected: { [T.basics]: 12, [T.relative]: 9 },
  total: 21,
};

export default plan;
