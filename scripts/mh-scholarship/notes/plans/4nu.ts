/**
 * Reshape plan: MH Scholarship Class 4 "Numbers and Number System" (6 q, the April 2026 paper), for
 * scripts/mh-scholarship/reshape.ts. Cut by what a question asks; every row read.
 */
import type { ReshapePlan } from "../../reshape";

const plan: ReshapePlan = {
  exam: "mh-scholarship-4",
  subject: "Mathematics",
  chapter: "Numbers and Number System",
  order: ["Place Value and Number Names", "Number Patterns and Counting Digits"],
  byPrefix: {
    "Place Value and Number Names": ["21237fd6", "306abeb0", "6370fed5", "dec37d81"],
    "Number Patterns and Counting Digits": ["9dd72a8c", "5cd6906c"],
  },
  expected: {"Place Value and Number Names": 4, "Number Patterns and Counting Digits": 2},
  total: 6,
};

export default plan;
