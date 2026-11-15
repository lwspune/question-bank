/**
 * Reshape plan: SSC CGL TIER II "Statistics" (18 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 18 stems and solutions (2026-11-15); every key re-derived and agreed. Tier I has no Statistics
 * notes. Two pages: ungrouped data (one new name: mode, median and the two standard-deviation rows) and
 * grouped data (median and mean from a frequency table, the grouped-mode formula, and the empirical
 * relation mode = 3 median - 2 mean, with the one ungrouped row that asks for it). Nothing is flawed;
 * every row may be featured.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  ungrouped: "Mean, Median and Mode of Ungrouped Data",
  grouped: "Mean, Median and Mode of Grouped Data",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Statistics",
  order: [T.ungrouped, T.grouped],
  byPrefix: {
    [T.ungrouped]: ["06442f5b", "4e5b8de9", "35afdea4", "5cea96d0", "abd0df30", "744397c6", "b1fa18e4", "feeb7016", "60198812", "0d3d0e14"],
    [T.grouped]: ["0d7dd2ae", "a9f6f042", "82c3c8fd", "96ec46d3", "040d1957", "b1bba8da", "175df507", "f4559815"],
  },
  expected: { [T.ungrouped]: 10, [T.grouped]: 8 },
  total: 18,
};

export default plan;
