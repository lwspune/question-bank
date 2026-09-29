/**
 * Reshape plan — CDS "Algebraic Identities and Simplification" (98 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 98 stems AND solutions (2026-09-29). The classification's "Conditional Identities"
 * (44) was a catch-all holding four techniques: two-variable power sums from a + b and ab,
 * the x ± 1/x ladder, the a + b + c = 0 cube identity, and genuine "use the condition"
 * substitutions (ab + bc + ca = 0, equal ratios = k, recognising a cube). "Symmetric and
 * Cyclic Expressions" (20) mixed symmetric sums of three variables with cyclic fraction sums
 * that need a different move. Each now sits on the page that teaches it. Sums of squares that
 * must vanish and the least-value (AM–GM) questions share a page with the three comparisons,
 * since all of them turn on "a square is never negative". Premise sets stay together:
 * 02f27bcb/e54fe549, e6d6c74c/8f4b90a9, 0b646e19/c9fed200, and the 2023-II data-sufficiency
 * pair eb3ef2a3/c1347f99.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  binomial: "Squares and Cubes of a Binomial",
  recip: "Reciprocal Sums x ± 1/x",
  symm: "Sums and Products of Three Variables",
  cube: "The Cube Identity and a + b + c = 0",
  squares: "Sums of Squares and Least Values",
  cond: "Conditional Identities",
  rational: "Rational Algebraic Expressions",
  cyclic: "Symmetric and Cyclic Expressions",
} as const;

const plan: ReshapePlan = {
  chapter: "Algebraic Identities and Simplification",
  order: [T.binomial, T.recip, T.symm, T.cube, T.squares, T.cond, T.rational, T.cyclic],
  whole: {},
  byPrefix: {
    [T.binomial]: [
      "17e6da14", "aa29b834", "474f3cd3", "65dbd5c0", "befd780e", "839092a2", "e677432c", "ea730060",
      "1712600e", "15d4ceda", "09ffcea7", "8d49a92e",
    ],
    [T.recip]: [
      "94cf9c27", "b461a253", "e5727106", "ea0205d7", "3176799f", "d6c96e29", "5baee729", "e3d3374e",
      "08344ebf", "0b646e19", "c9fed200",
    ],
    [T.symm]: [
      "9ce13469", "b85c6adb", "58953245", "b7e1dfe2", "b358e1af", "d0e72a5f", "e4e0e04a", "646fbdcf",
      "b5ef9c1a", "b254cef5", "dbb8cd7f",
    ],
    [T.cube]: [
      "728aa4ab", "afcc437a", "c2ca44d3", "6ce768c3", "af8cf608", "e6d6c74c", "885fcec7", "8f4b90a9",
      "96ae7d0e", "428b18f6", "8728a477",
    ],
    [T.squares]: [
      "37857066", "eb5c25f0", "4132c2e1", "6dc06b0e", "1f80c37b", "e5a0d22b", "eb3ef2a3", "1fd1c7d4",
      "d2d8d5e7", "bf928c39", "fb5aafe0", "c1347f99",
    ],
    [T.cond]: [
      "994dda8d", "b46b0462", "b04410c2", "b22eb01d", "fa50bd18", "5156147e", "57d26538", "f529b339",
      "3e4ea669", "84882680", "ec762c9d", "1a3ace97", "f1e63864", "69301339", "4b7c974b", "21196d8b",
    ],
    [T.rational]: [
      "1efe45ae", "b4c7aab5", "10b88909", "e9e69d05", "acfd8b99", "f77043d7", "e6ddd1c0", "d910d9d9",
      "9c95dae3", "02f27bcb", "149d3671", "e54fe549", "1eba7fbb", "fe0d5236", "63573a1c", "33d96f01",
      "e77f3fb2", "f50aa583", "79723b49",
    ],
    [T.cyclic]: ["6f2493c5", "59fc2c91", "5f222a03", "559f5759", "2907a5e8", "ed89bd00"],
  },
  expected: {
    [T.binomial]: 12,
    [T.recip]: 11,
    [T.symm]: 11,
    [T.cube]: 11,
    [T.squares]: 12,
    [T.cond]: 16,
    [T.rational]: 19,
    [T.cyclic]: 6,
  },
  total: 98,
};

export default plan;
