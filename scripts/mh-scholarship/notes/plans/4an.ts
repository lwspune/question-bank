/**
 * Reshape plan: MH Scholarship Class 4 "Analogy" (5 q, the April 2026 paper), for
 * scripts/mh-scholarship/reshape.ts. Cut by what a question asks; every row read.
 */
import type { ReshapePlan } from "../../reshape";

const plan: ReshapePlan = {
  exam: "mh-scholarship-4",
  subject: "Intelligence Test",
  chapter: "Analogy",
  order: ["Word, Number and Letter Pairs", "Figure Pairs"],
  byPrefix: {
    "Word, Number and Letter Pairs": ["9de1debb", "47afad7f", "ad677b4e"],
    "Figure Pairs": ["db787602", "d10b3a57"],
  },
  expected: {"Word, Number and Letter Pairs": 3, "Figure Pairs": 2},
  total: 5,
};

export default plan;
