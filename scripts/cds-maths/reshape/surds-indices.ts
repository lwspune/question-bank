/**
 * Reshape plan — CDS "Surds, Indices and Simplification" (82 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 82 stems AND solutions (2026-09-29). "Surds and Rationalisation" (31) held three
 * techniques: taking the square root of a + 2√b (and then √x + 1/√x), rationalising with the
 * conjugate (including the telescoping sums), and solving an equation that contains surds
 * (componendo–dividendo). "Laws of Indices" (21) splits into the index laws with the
 * a^x = b^y = c^z family, and exponential equations solved by t = a^x. The lone "Comparison of
 * Surds" row joins indices (raise to a common power). Continued fractions and nested radicals
 * share a page because both are self-similar expressions solved from the inside or by a fixed
 * point. The premise pair f8421cc9/ce654ef1 stays together.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  fractions: "Fractions and Decimals",
  indices: "Laws of Indices",
  expo: "Exponential Equations",
  roots: "Square Roots of Surds",
  conj: "Surds and Rationalisation",
  eqns: "Equations with Surds",
  simp: "Simplification of Expressions",
  nested: "Continued Fractions and Nested Radicals",
} as const;

const plan: ReshapePlan = {
  chapter: "Surds, Indices and Simplification",
  order: [T.fractions, T.indices, T.expo, T.roots, T.conj, T.eqns, T.simp, T.nested],
  whole: {},
  byPrefix: {
    [T.fractions]: [
      "ef865dd6", "8acb2f68", "02b17d9f", "de515b09", "30cd95e3", "28b1b63b", "395c081b", "98e63d62",
      "3fa0656d", "be74a02e", "440cbba7",
    ],
    [T.indices]: [
      "59f7ac2a", "c72ff02d", "3cd7b208", "4fa06fd1", "0556ccd7", "fec80c40", "4e70d61f", "1dd0dddf",
      "ac74465f", "37a9178d", "197dcb5c", "317a9a16", "abe3f2e6", "4e6da436", "3f04f847", "0c6ebc83",
    ],
    [T.expo]: ["07a82f70", "ca063dc9", "2f341a89", "5a435f7c", "24a40504", "21aa8cfc", "3b9cd3e2", "d008f2ab"],
    [T.roots]: [
      "5ba19166", "674c929c", "088df040", "1e0946eb", "1191a127", "ec9c2d8d", "910fd330", "a6e9bf81",
      "594d1e3b", "7a1ff136", "6f948b08",
    ],
    [T.conj]: [
      "b6b88f5c", "19c60d43", "e90f77dd", "f8421cc9", "ce654ef1", "ebd66c33", "e5a17cb4", "281fedae",
      "6d53e0e5", "b99ca130", "a3121d22",
    ],
    [T.eqns]: ["14581fd8", "1dd318a9", "1ddd4d6a", "0f09e98b", "8566bb80", "d51a38a6", "6903f289"],
    [T.simp]: ["c28144d7", "5f676286", "b5eb3d75", "14613357", "43a99004", "abdf3b0e"],
    [T.nested]: [
      "355c4afa", "69f8eff0", "496bbb86", "7ffb966a", "18f46fda", "c97f0b5f", "ee27f627", "43668d17",
      "74dec8c6", "7610ba03", "874b877a", "852eb0f5",
    ],
  },
  expected: {
    [T.fractions]: 11,
    [T.indices]: 16,
    [T.expo]: 8,
    [T.roots]: 11,
    [T.conj]: 11,
    [T.eqns]: 7,
    [T.simp]: 6,
    [T.nested]: 12,
  },
  total: 82,
};

export default plan;
