/**
 * Reshape plan — CDS "Averages" (47 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 47 stems AND solutions (2026-09-29). "Average and Weighted Average" (43) held three
 * techniques: work through the TOTAL (sum = count x mean: add or drop an item, overlapping groups,
 * a new member, the largest value a reading can take), COMBINE groups with different means
 * (weighted means, the ratio of group sizes), and the average of CONSECUTIVE or equally spaced
 * numbers (the middle term). "Correction of Mean" (4) is the first technique applied to a misread
 * value, so it joins that page. The cousins premise set (1f6cba1c, 8e515017) stays together.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  totals: "Sum and Mean",
  weighted: "Weighted and Combined Averages",
  sequences: "Averages of Consecutive Numbers",
} as const;

const plan: ReshapePlan = {
  chapter: "Averages",
  order: [T.totals, T.weighted, T.sequences],
  whole: {},
  byPrefix: {
    [T.totals]: [
      "c1d9d21d", "773baf5a", "2bffac93", "b9a122f3", "db51f97a", "d326d98e", "494a0bb5", "7b35056c",
      "17bd38b1", "4d1056b4", "15944550", "c43458a4", "1f6cba1c", "8e515017", "dd0022fd", "c56e94b2",
      "ade2c2b1", "d3d81b4b", "80363019", "d97685f6",
    ],
    [T.weighted]: [
      "43077c78", "dc0e54b8", "f6e5e2c4", "b3bd65a1", "3d3d2880", "26e2a25a", "4cb0d4b1", "b96f4f89",
      "986ab707", "dc1a9b61", "4b44447b", "805d1dd8", "416ba14b", "922cbd3a", "a4ab3ded", "14ac4149",
      "f863890a", "b5d92dcf", "0942b17c",
    ],
    [T.sequences]: ["230ef4a6", "a8a4dad2", "6bb9f6fb", "92f6bed1", "09a63b53", "c31633e1", "930ab4a6", "8a85c262"],
  },
  expected: {
    [T.totals]: 20,
    [T.weighted]: 19,
    [T.sequences]: 8,
  },
  total: 47,
};

export default plan;
