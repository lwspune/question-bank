/**
 * Reshape plan — CDS "Trigonometric Ratios and Identities" (227 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 227 stems AND solutions (2026-09-28). The classification cut had one
 * 115-question catch-all, "Fundamental Identities", holding six technique families:
 * simplify/prove, the sec±tan / cosec±cot reciprocal trick, "given a sum, square it"
 * with the power identities, elimination of θ between parameters, equations solved
 * for θ, and the a sinθ + b cosθ = √(a²+b²) extreme case (a max/min fact). Each goes
 * to the page that teaches its technique. Smaller moves: the three "tan A tan B = 1"
 * equations join complementary angles; one "cot θ = 63/16" row joins the right
 * triangle; the lone triangle-inequality row joins max/min; d9e9d0a1 joins elimination to sit with its
 * premise-set sibling fa29d4cb (2025 II Q41–42).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  values: "Degree, Radian and Standard Values",
  right: "Ratios in a Right Triangle",
  comp: "Complementary and Allied Angles",
  ident: "Simplifying and Proving Identities",
  recip: "Reciprocal Pairs — sec ± tan and cosec ± cot",
  sums: "Power Identities and Given Sums",
  eqn: "Trigonometric Equations",
  compound: "Compound and Multiple Angles",
  maxmin: "Maximum, Minimum and Impossible Values",
  elim: "Eliminating θ and Substitution Chains",
} as const;

const plan: ReshapePlan = {
  chapter: "Trigonometric Ratios and Identities",
  order: [T.values, T.right, T.comp, T.ident, T.recip, T.sums, T.eqn, T.compound, T.maxmin, T.elim],
  whole: {
    "Degree and Radian Measure": T.values,
    "Specific Values and Quadrants": T.values,
    "Trigonometric Ratios in a Right Triangle": T.right,
    "Maximum and Minimum of Trigonometric Expressions": T.maxmin,
    "Trigonometric Inequalities in a Triangle": T.maxmin,
  },
  byPrefix: {
    [T.ident]: [
      "02755ee7", "cefa55f3", "3a9760c3", "2ea59dfd", "ff3c42b3", "b6570980", "c26258e4", "8bfa4245",
      "ebc7ddd7", "436e7bd4", "e237d725", "8bf1338b", "12a38dbf", "6b5c8626", "09b5374b", "887409f9",
      "c336d375", "10b4016b", "77d46489", "9ffc9572", "6720b6f2", "ec777441", "0e4be499", "335c57a0",
    ],
    [T.recip]: [
      "415342f1", "ccf4c00d", "9a4b47f2", "bc50e63b", "46ac4426", "38f58b4b", "5f816a0a", "89a1d160",
      "85f0ee1a", "c8b61b68", "2cf0f1b8", "e27ed3b1", "b28170ec", "d6e13271", "b1061124", "6400d70a",
      "21cb9d07", "8dc278c1",
    ],
    [T.sums]: [
      "bf8c6772", "83deb1d6", "2e22e667", "8a164e23", "5833c9ee", "25e4544e", "143ac8a1", "77f3ebc0",
      "dfda8b75", "03c83383", "c8253924", "c42fb715", "e45248cd", "889b485a", "12ce231c", "56c8a468",
      "26d00ec3",
    ],
    [T.elim]: [
      "5a45b7d7", "5c4e3728", "bada3928", "6b65b2dd", "6d53f931", "59e8aeeb", "9c2e72b5", "ae605d42",
      "fbe94fe9", "e431bbe3", "544ebfa6", "45906e09", "7caae2a9", "52efd0fc", "b9b69f4a", "0dc5e0e0",
      "2f99b1a5", "fa29d4cb", "3edc402e", "c2466149", "e0a3ce13", "6fc1c548", "12096196", "0f31374e",
      "892404ff", "c121fa27", "56f57686", "e5640411", "9605640a", "542da01b", "d78ef1b4", "cfb8899a",
      "ca27bb19", "d9e9d0a1",
    ],
    [T.eqn]: ["65cea531", "ea1cc99b", "a3956dae", "3659201a", "c820628c", "44d3fb30", "bd69e5ee", "92665848", "856848b0", "743fb651"],
    [T.maxmin]: ["eabeef13", "b95592f4", "8e47596c", "bd72a712", "44ee23b6", "fc99ea94", "8255d7b4"],
    [T.right]: ["f13b10f4", "6503abf2", "1dbc9818", "cd94a46e", "57ffb3d2", "f9c530f0", "9b823f7d"],
    [T.comp]: ["0dd978b6", "0bb8929f"],
  },
  expected: {
    [T.values]: 20, [T.right]: 22, [T.comp]: 21, [T.ident]: 24, [T.recip]: 18,
    [T.sums]: 17, [T.eqn]: 26, [T.compound]: 8, [T.maxmin]: 37, [T.elim]: 34,
  },
  total: 227,
};

export default plan;
