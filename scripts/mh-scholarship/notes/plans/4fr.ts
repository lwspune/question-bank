/**
 * Reshape plan: MH Scholarship Class 4 "Fractions and Decimals" (9 q, the April 2026 paper), for
 * scripts/mh-scholarship/reshape.ts. Cut by what a question asks; every row read.
 */
import type { ReshapePlan } from "../../reshape";

const plan: ReshapePlan = {
  exam: "mh-scholarship-4",
  subject: "Mathematics",
  chapter: "Fractions and Decimals",
  order: ["Reading and Comparing Fractions", "Fraction Word Problems"],
  byPrefix: {
    "Reading and Comparing Fractions": ["115af086", "c64e107d", "fcaf7fe9", "6dbff78b", "f6bbd350", "f38fa1b1"],
    "Fraction Word Problems": ["4a151b99", "9dba492e", "0892a335"],
  },
  expected: {"Reading and Comparing Fractions": 6, "Fraction Word Problems": 3},
  total: 9,
};

export default plan;
