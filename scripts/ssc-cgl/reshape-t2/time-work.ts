/**
 * Reshape plan: SSC CGL TIER II "Time and Work" (26 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 26 stems and solutions (2026-11-15); every key re-derived. Two pages: work rates (total work
 * as units, efficiency and wages, men and women and man-hours, and the four alternate-day rows, too few
 * on Tier II for Tier I's own page) and pipes and cisterns (inlets and outlets together, and pipes opened
 * in turn).
 *
 * Never featured: 285b2175 (Note: SSC printed Adya's time as "16 hours"; the options only fit 16 days).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  work: "Work Rates",
  pipes: "Pipes and Cisterns",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Time and Work",
  order: [T.work, T.pipes],
  byPrefix: {
    [T.work]: [
      "aa4a2d94", "aeafee92", "884ce4db", "51606129", "61bc22ed", "7bfe4dbe", "ba996518", "03334edd",
      "90eb3d07", "ac688389", "e0e9be67",
      "95039823", "d8ec5c32", "e3c195f7",
      "6a2a1963", "d9f5400a", "abb7d58c", "285b2175",
    ],
    [T.pipes]: ["75e0812c", "3f336461", "d1fe2f58", "e3f6a9c0", "67f17e96", "7b8cec6f", "85a3871a", "d31a3a24"],
  },
  expected: { [T.work]: 18, [T.pipes]: 8 },
  total: 26,
};

export default plan;
