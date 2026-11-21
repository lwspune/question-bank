/**
 * Reshape plan: MH Scholarship Class 7 "Perimeter and Area" (5 q, the April 2026 paper), for
 * scripts/mh-scholarship/reshape.ts. Cut by what a question asks; every row read.
 */
import type { ReshapePlan } from "../../reshape";

const plan: ReshapePlan = {
  exam: "mh-scholarship-7",
  subject: "Mathematics",
  chapter: "Perimeter and Area",
  order: ["Squares and Rectangles", "Paths and Circles"],
  byPrefix: {
    "Squares and Rectangles": ["b0152da5", "703678cd", "cd7020d9"],
    "Paths and Circles": ["3a48131a", "6965b92c"],
  },
  expected: {"Squares and Rectangles": 3, "Paths and Circles": 2},
  total: 5,
};

export default plan;
