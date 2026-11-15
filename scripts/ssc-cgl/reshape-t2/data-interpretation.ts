/**
 * Reshape plan: SSC CGL TIER II "Data Interpretation" (28 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 28 stems and solutions (2026-11-15); every key re-derived from the chart values the
 * solutions record. Every row carries SSC's own chart. Two pages, with Tier I's names: reading tables and
 * graphs (bar, line and histogram: percentage of, percent more or less, ratios, averages and growth,
 * and the two-line-chart row) and pie charts and shares of a total (one pie, and two pies with different
 * totals).
 *
 * Never featured: 8ab53552 (Note: as printed, B and C tie for the highest pass rate, so "second highest"
 * is ambiguous; SSC keyed C).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  graphs: "Reading Tables and Graphs",
  pies: "Pie Charts and Shares of a Total",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Data Interpretation",
  order: [T.graphs, T.pies],
  byPrefix: {
    [T.graphs]: [
      "47ab35af", "c67744c3", "105c95b4", "4b3925f1", "769d2d9e", "dc2e75fb", "e34e3ee2", "46e8cee7",
      "72e4a462", "da02ffab", "a7bda690", "b905630a", "19c9c3de", "dd7a99cc", "1bf61732", "60d6123c",
    ],
    [T.pies]: ["086f92de", "92e630cc", "e82de4ca", "6b7c80ec", "9df8b528", "214a23fa", "3ac01f10", "44758783", "7571d235", "8ab53552", "f2c797da", "5e5d6449"],
  },
  expected: { [T.graphs]: 16, [T.pies]: 12 },
  total: 28,
};

export default plan;
