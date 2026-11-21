/**
 * Reshape plan: MH Scholarship Class 7 "Algebraic Expressions and Identities" (6 q, the April 2026 paper), for
 * scripts/mh-scholarship/reshape.ts. Cut by what a question asks; every row read.
 */
import type { ReshapePlan } from "../../reshape";

const plan: ReshapePlan = {
  exam: "mh-scholarship-7",
  subject: "Mathematics",
  chapter: "Algebraic Expressions and Identities",
  order: ["Squares and Values of Expressions", "Factorisation"],
  byPrefix: {
    "Squares and Values of Expressions": ["855d8233", "633845f8", "e9683eb2"],
    "Factorisation": ["1de81025", "95b6aad4", "e99f0cba"],
  },
  expected: {"Squares and Values of Expressions": 3, "Factorisation": 3},
  total: 6,
};

export default plan;
