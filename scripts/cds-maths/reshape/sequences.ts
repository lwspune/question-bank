/**
 * Reshape plan — CDS "Sequence and Series" (19 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 19 stems AND solutions (2026-09-29). Two kinds of question: summing a progression or a
 * special series (AP and GP sums, sums of squares and cubes, telescoping terms), and the three
 * means of two numbers (AM, GM, HM and GM^2 = AM x HM). The AP, GP and special-series buckets
 * become one page; the means keep theirs.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  series: "Progressions and Special Sums",
  means: "Arithmetic, Geometric and Harmonic Means",
} as const;

const plan: ReshapePlan = {
  chapter: "Sequence and Series",
  order: [T.series, T.means],
  whole: {},
  byPrefix: {
    [T.series]: ["adc21937", "57b389ed", "779a2bf6", "ad8aa642", "401abfa6", "f0446675", "4655b100", "9f1a0670", "e6bc25c8", "2445d4e9"],
    [T.means]: ["0b0a608b", "a348dee6", "5c2cf7b3", "bc3f3277", "de70d7c2", "9802359a", "e2e04016", "df977cfc", "70ab575b"],
  },
  expected: {
    [T.series]: 10,
    [T.means]: 9,
  },
  total: 19,
};

export default plan;
