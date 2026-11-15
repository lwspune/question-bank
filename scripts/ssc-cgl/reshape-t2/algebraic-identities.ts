/**
 * Reshape plan: SSC CGL TIER II "Algebraic Identities and Simplification" (31 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 31 stems and solutions (2026-11-15); every key re-derived and agreed. Six subtopics, four of
 * them with 1 or 2 rows. Two pages: squares, cubes and three variables (one new name: the binomial
 * squares and cubes, factoring a cube sum or difference, the reciprocal-sum row a + b over ab, and the
 * five three-variable rows, too few on Tier II for a page of their own); and reciprocal sums x ± 1/x
 * (the ladder of powers, and turning a quadratic into x + 1/x). Nothing is flawed; every row may be
 * featured.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  identities: "Squares, Cubes and Three Variables",
  reciprocal: "Reciprocal Sums x ± 1/x",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Algebraic Identities and Simplification",
  order: [T.identities, T.reciprocal],
  byPrefix: {
    [T.identities]: [
      "a7fedbfe", "e1d85c75", "4fed4083", "bec36251", "10ebaed9", "47d7010f", "4acbb6c9",
      "a90c450a", "460c3fbc", "a2f7fb37", "3aab27c1", "85bb1097", "b98e6dc9",
      "473cd43b", "30968958", "2d8dbf07", "13462fb6",
      "dede6eff", "a400ac97", "3d908786", "d49bf1bb", "77f47751",
    ],
    [T.reciprocal]: ["df54d0c4", "d5a1b72f", "7a9eda81", "69a50f75", "7063a531", "67c1a5c3", "f079bdb9", "5c1dfb4d", "7279cfa2"],
  },
  expected: { [T.identities]: 22, [T.reciprocal]: 9 },
  total: 31,
};

export default plan;
