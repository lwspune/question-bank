/**
 * Reshape plan: SSC CGL Tier I "Algebraic Identities and Simplification" (172 q), for
 * scripts/ssc-cgl/reshape.ts.
 *
 * Read all 172 stems and solutions (2026-10-23). The ingest borrowed the CDS chapter's eight
 * subtopics, and two of them were too wide to teach as one page: "Squares and Cubes of a Binomial"
 * (49 rows) mixed the square forms with the cube forms, and "Reciprocal Sums x ± 1/x" (65 rows) mixed
 * the squaring ladder with cubes, fifth, sixth, seventh and eighth powers. Cut here by the identity
 * that solves the row: squares of a binomial (with plain expansion); cubes of a binomial (from a sum
 * and a product, spotting an expanded cube, and a³ ± b³ cancelling in a numeric fraction); the x ± 1/x
 * squaring ladder (with switching sign and starting from an equation or a surd); cubes and higher
 * powers of x ± 1/x; three variables (the trinomial square, and squares that can never be negative,
 * which takes the two-row "Sums of Squares and Least Values" and one conditional row); the cube
 * identity with a + b + c = 0 (which takes the sum-of-cubes rows filed under three variables); and
 * rational expressions (which takes the a + b = 2c conditional row). The two-row "Symmetric and Cyclic
 * Expressions" is folded into squares and three variables. Never featured: e838f3b2 (its solution
 * opens with a Note: the expression is not a constant as printed).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  squares: "Squares of a Binomial",
  cubes: "Cubes of a Binomial",
  reciprocal: "Reciprocal Sums x ± 1/x",
  powers: "Cubes and Higher Powers of x ± 1/x",
  three: "Sums and Products of Three Variables",
  cubeIdentity: "The Cube Identity and a + b + c = 0",
  rational: "Rational Algebraic Expressions",
} as const;

const plan: ReshapePlan = {
  chapter: "Algebraic Identities and Simplification",
  order: [T.squares, T.cubes, T.reciprocal, T.powers, T.three, T.cubeIdentity, T.rational],
  byPrefix: {
    [T.squares]: [
      "c59277e5", "86747fe3", "44190565", "11b3d741", "25342f96", "376dee45", "a2b506b0", "b5d6d4b2",
      "fe5aae0c", "70d96c44", "ab21927f",
      "d4f0aff0", "e3a8d2ad", "fac92752", "0ad40cea", "e9584202", "31e37f07", "6965bd8f", "6e0d00a6",
      "c7f3c8ab",
    ],
    [T.cubes]: [
      "de9422a2", "9549bf61", "971478ae", "2d0a6309", "ccb19223", "7d26c774", "661c4049", "68f3a92a",
      "38c4e3e6", "1559617e", "94c27ee2", "872651c8", "b97cb2c4", "7f9097c1",
      "5d1f2395", "e82be34e", "fb53073a", "c822a814", "9f24ad68", "714323df",
      "14806f3e", "65e7013b", "a84699fb", "21e96e78", "2dfacfcd", "ca5c9773", "e217e02a", "bf538c45",
      "e39ed4d7", "a3f72eaf", "824344a1",
    ],
    [T.reciprocal]: [
      "5e89d9c7", "6885b38d", "44a947ae", "c1d68a72", "7dc9bc19", "176bdf2f", "2b92cf59", "ac126afe",
      "b183049f", "b71ac91b", "b57c00eb", "e25c7c71", "7ca4640b", "cc7d95d5", "90a7c7c9",
      "d07673a3", "850f19ba", "dab9ec76", "6947c34c", "818b0f85", "e55c6e0e", "07979c23", "f5090f8d",
      "de53b2fd",
      "4fb49d6f", "db57654d", "015db01e", "3a52594b", "f25ab98e", "fd0cb345", "d4433a00", "82e6ae98",
      "8a5cc193", "fc8ceb59", "c990af2c",
    ],
    [T.powers]: [
      "5be6a076", "0c359333", "b244f7ee", "29c42c9e", "17afa9a8", "496b6ac1", "63a462a5", "500703e9",
      "b1479468", "3c7c4480",
      "97421398", "39e1290a", "4b4ea0fb", "c84bd8ca", "476859b7", "cae29b24", "c8fd62d4", "70bdfd9c",
      "95e58b51", "c6aaa344", "c4ec3e18", "a62d04d1", "f1876b28", "efdab518", "e838f3b2",
      "44b7ee80", "6adcd950", "add82574", "8f0c28d7", "8fb7673c",
    ],
    [T.three]: [
      "0e4a3e39", "3d2039f0", "543fc77f", "9c9089bc", "1aac92bf",
      "73a76b0c", "db34335b", "dc9aced8", "93e4c1c4", "63764359", "6561007a",
    ],
    [T.cubeIdentity]: [
      "25ac40c4", "1fb2ad54", "dd08b4c9", "02a558c2", "bed40104", "80b4652d", "17efb25a", "def602c3",
      "1cbf983b", "5adf3847", "7dcf24a0", "f3d4fd34", "55c4dd14",
      "5990667c", "96e424df", "ae03102f", "a80ee37a", "672c2ab0", "33300be2", "18c92730", "a0dfd666",
      "75bbbbda", "7fe14dbe", "69dc466d", "a9048bcb", "6d813867",
    ],
    [T.rational]: [
      "b50a7ff2", "af53b053", "9758b09b", "8abd87b9", "94d6f2e2", "16e0e738", "91c173aa", "176ea340",
      "7a11a4a3", "9c8ecdb8", "f7a37942", "c38fee4b",
      "082dc205", "8ca42114", "a2782578", "16ce2a0a", "dfe03132", "280fa794", "3ec697c3",
    ],
  },
  expected: {
    [T.squares]: 20,
    [T.cubes]: 31,
    [T.reciprocal]: 35,
    [T.powers]: 30,
    [T.three]: 11,
    [T.cubeIdentity]: 26,
    [T.rational]: 19,
  },
  total: 172,
};

export default plan;
