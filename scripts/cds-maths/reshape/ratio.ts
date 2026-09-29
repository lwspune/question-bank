/**
 * Reshape plan — CDS "Ratio, Proportion and Variation" (76 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 76 stems AND solutions (2026-09-29). "Ratio and Proportion" (40) held three kinds of
 * question: combining and dividing by ratios (chained ratios A:B:C, splitting a sum, a will),
 * ratios that change in a story (incomes and savings, ages, fares, villages), and the algebra of
 * equal ratios (put each ratio = k, cross-multiply and factor, componendo). Each gets a page.
 * Variation, partnership and mixtures keep their own pages.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  ratio: "Ratio and Proportion",
  stories: "Ratios in Income, Savings and Ages",
  algebra: "Equal Ratios and Proportion Algebra",
  variation: "Direct and Inverse Variation",
  partnership: "Partnership",
  mixtures: "Mixtures and Alligation",
} as const;

const plan: ReshapePlan = {
  chapter: "Ratio, Proportion and Variation",
  order: [T.ratio, T.stories, T.algebra, T.variation, T.partnership, T.mixtures],
  whole: {},
  byPrefix: {
    [T.ratio]: [
      "5fbad4a3", "9bc1650e", "123d4180", "b4eff930", "2f294607", "1aeafc4d", "1c887f5a", "3cb08001",
      "8eed5886", "60ff8011", "170eb23a", "8a54bb6f", "8e8db428", "989a724c", "e0da071d", "6c4008c9",
    ],
    [T.stories]: [
      "7d34bf40", "a747053a", "7d50ebb6", "25f1dd29", "0942fbda", "ccce7f1a", "69161cb4", "e580b539",
      "ac0f2ba0", "3d13f258",
    ],
    [T.algebra]: [
      "af033a4c", "2ae7cafe", "ad02679f", "fa33ed0f", "c14beb18", "44aabb59", "3000e8d9", "6675a22a",
      "c1642947", "7f74bfdc", "a82c4092", "ea22989e", "cae752b1", "8a26e04d",
    ],
    [T.variation]: [
      "1d890b18", "9468f4d0", "43428044", "8e813e8f", "ee124ff7", "6742660d", "830595eb", "eacafc41",
      "d6e203eb", "e924079c", "4b507cb1", "036fbb55", "43cae17d", "9bec4990", "760ec21e", "0a9ae1d2",
      "712ab46f", "a669e221",
    ],
    [T.partnership]: ["66f73887", "1fa4e05c", "d6df4975", "0965d8e8", "118e6544"],
    [T.mixtures]: [
      "5954eb63", "e2a48bf5", "eae9e589", "9cc34424", "98bcf715", "b6cecf8e", "f7461fbf", "9381f365",
      "d954a630", "bc13746a", "05b34f09", "a841509e", "94700099",
    ],
  },
  expected: {
    [T.ratio]: 16,
    [T.stories]: 10,
    [T.algebra]: 14,
    [T.variation]: 18,
    [T.partnership]: 5,
    [T.mixtures]: 13,
  },
  total: 76,
};

export default plan;
