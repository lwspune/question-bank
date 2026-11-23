/**
 * Reshape plan: MH Scholarship Class 7 "Analogy" (7 q, the April 2026 paper), for
 * scripts/mh-scholarship/reshape.ts. Cut by what a question asks; every row read.
 */
import type { ReshapePlan } from "../../reshape";

const plan: ReshapePlan = {
  exam: "mh-scholarship-7",
  subject: "Intelligence Test",
  chapter: "Analogy",
  order: ["Word, Number and Letter Pairs", "Pyramid and Figure Pairs"],
  byPrefix: {
    "Word, Number and Letter Pairs": ["67126d9c", "8330fefe", "60b011fc", "bc1ac0e9"],
    "Pyramid and Figure Pairs": ["5651ce31", "59b28d19", "e4e1db7a"],
  },
  expected: {"Word, Number and Letter Pairs": 4, "Pyramid and Figure Pairs": 3},
  total: 7,
};

export default plan;
