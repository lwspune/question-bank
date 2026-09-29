/**
 * Reshape plan — CDS "Logarithms" (33 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 33 stems AND solutions (2026-09-29). The bank's three-way cut (laws, number of digits,
 * equations) is sound; the one "Comparison of Logarithmic and Power Expressions" row is a use of the
 * sign of log m for 0 < m < 1 and joins the laws page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  laws: "Logarithm Identities and Change of Base",
  digits: "Number of Digits and Characteristic",
  equations: "Solving Logarithmic Equations",
} as const;

const plan: ReshapePlan = {
  chapter: "Logarithms",
  order: [T.laws, T.digits, T.equations],
  whole: {},
  byPrefix: {
    [T.laws]: [
      "14cecc9f", "d3d68e97", "9e20dfde", "708d6f3e", "a4d8214a", "33d428e6", "3e2a88c3", "1ca137c6",
      "838f4f97", "8ff1720e", "33a921d2", "476f79a2", "bad7e32a",
    ],
    [T.digits]: ["dececcb4", "f8b5344f", "72985b99", "c69a5531", "5dabcd11", "d6de3c9a", "4e53365b", "acb6bdbc", "03c5a95b", "6701b0d8"],
    [T.equations]: ["a55368f8", "31de327c", "11c247c5", "0a9a27b3", "491689b2", "eba8c9a9", "d8d73420", "d4299294", "9a0d6940", "367ddf61"],
  },
  expected: {
    [T.laws]: 13,
    [T.digits]: 10,
    [T.equations]: 10,
  },
  total: 33,
};

export default plan;
