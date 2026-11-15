/**
 * Reshape plan: SSC CGL TIER II Computer Knowledge "MS Office" (39 q), for scripts/ssc-cgl/reshape.ts.
 * Read all 39 stems and keys (2026-11-15); every key agreed. Word, Excel and PowerPoint on one page.
 * Flawed (solution opens with a **Note:**, tagged but never featured): d031eceb.
 */
import type { ReshapePlan } from "../reshape";

const T = { office: "Word, Excel and PowerPoint" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Computer Knowledge",
  chapter: "MS Office",
  order: [T.office],
  byPrefix: {
    [T.office]: [
      "050b1569", "17c7a419", "1d80103f", "2699b0ea", "480c5bd5", "dfc7d29f", "ec1850cc", "edb11551", "f01a1fb2", "93566c22",
      "b0796e10", "32d32012", "3ffbc76d", "5d2c56a3", "7cc58da5", "2b3d1aee", "3d8abbd4",
      "22c14fad", "340b598c", "7f120b87", "8b69c398", "971e7a70", "b3a6df7b", "d031eceb", "f746ba8f", "be00f2fe", "cf1eb662",
      "1abfc61e", "2b392209", "5f972ff2", "dca47db5", "0365bddd", "dd4dfc57", "e5f41d92",
      "6924e671", "6ef22749", "a552de3c", "e04ace92", "b65e9e09",
    ],
  },
  expected: { [T.office]: 39 },
  total: 39,
};

export default plan;
