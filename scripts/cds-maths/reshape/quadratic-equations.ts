/**
 * Reshape plan — CDS "Quadratic Equations" (89 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 89 stems AND solutions (2026-09-29). "Vieta's Relations and Root Coefficient
 * Identities" (45) held three techniques: forming or solving an equation from its roots (and
 * the "coefficients add to zero, so 1 is a root" shortcut), evaluating a symmetric function of
 * the roots (α² + β², α − β, α⁴ + β⁴) from the sum and product, and roots tied by a relation
 * (ratio, one twice the other, reciprocal, the roots ARE the coefficients, shifted roots).
 * "Nature of Roots and Discriminant" (23) splits into the plain discriminant questions and the
 * harder ones about perfect squares, signs, integer roots and roots inside an interval.
 * "Radical Equations" becomes "Equations Reducible to Quadratics" and takes the biquadratic and
 * the rational equation that reduce to a quadratic. The premise set 71d36887/70099f68 stays
 * together on the signs page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  forming: "Solving and Forming Quadratic Equations",
  symmetric: "Symmetric Functions of the Roots",
  relation: "Roots in a Given Relation",
  nature: "Nature of Roots and Discriminant",
  signs: "Perfect Squares, Signs and Location of Roots",
  common: "Common Roots",
  maxmin: "Maximum and Minimum of Quadratic Expressions",
  reducible: "Equations Reducible to Quadratics",
  word: "Word Problems and Applications",
} as const;

const plan: ReshapePlan = {
  chapter: "Quadratic Equations",
  order: [T.forming, T.symmetric, T.relation, T.nature, T.signs, T.common, T.maxmin, T.reducible, T.word],
  whole: {},
  byPrefix: {
    [T.forming]: [
      "0db28679", "3bc6cbb2", "72856a0c", "1ef885a5", "f24e0de8", "0ec58193", "63b8af09", "c80dbc2d",
      "0d3c4f64", "021d31f9", "234a1810", "b5118f76", "17eef8a0", "bac0f4f4", "8051c25f",
    ],
    [T.symmetric]: [
      "6460b5b5", "a18f6a8d", "12b8c9cd", "c6e8ed7f", "f8f8328e", "3728539f", "33c115fb", "eb38531a",
      "0d97f28d", "5cca139b", "206c360a", "01ca51e4", "313b98a9", "ea694306", "7ee95fb8", "8aeda5e1",
      "738352d5",
    ],
    [T.relation]: [
      "6d1f88b5", "ad071226", "08c30ab7", "09be60aa", "0885c413", "11fe175c", "2e1dca6b", "7f842878",
      "335dfe34", "2ee0762a",
    ],
    [T.nature]: [
      "5c280eaa", "6b4fd333", "e89a5974", "75916592", "c0158379", "8a0f5ddd", "073e78fd", "1c36e896",
      "d14748f9", "a36e9902", "8e66cb2b", "7e772433", "4f807685", "b6334259",
    ],
    [T.signs]: [
      "6c97f0fe", "0c02b51e", "dcb84380", "160eb9c0", "533b81e7", "8f304056", "085b5eee", "70099f68",
      "71d36887", "1cfae67b",
    ],
    [T.common]: ["34366577", "c8e5130e", "c2359ef0", "1359bdc9", "7a5f38b3", "6c4dd94a"],
    [T.maxmin]: ["b9b266dd", "e7baae41", "b1bd1669", "1149bd16", "74114a3f"],
    [T.reducible]: ["d6def568", "40f859d8", "b87ff3d7", "69d24a36", "e1a505f6", "60da36b2"],
    [T.word]: ["bf6f7aaa", "9f6d808b", "12ee9ec1", "ab925a46", "bf2d2a0c", "8bb94127"],
  },
  expected: {
    [T.forming]: 15,
    [T.symmetric]: 17,
    [T.relation]: 10,
    [T.nature]: 14,
    [T.signs]: 10,
    [T.common]: 6,
    [T.maxmin]: 5,
    [T.reducible]: 6,
    [T.word]: 6,
  },
  total: 89,
};

export default plan;
