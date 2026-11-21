/**
 * Reshape plan: MH Scholarship Class 4 "Coding and Decoding" (5 q, the April 2026 paper), for
 * scripts/mh-scholarship/reshape.ts. Cut by what a question asks; every row read.
 */
import type { ReshapePlan } from "../../reshape";

const plan: ReshapePlan = {
  exam: "mh-scholarship-4",
  subject: "Intelligence Test",
  chapter: "Coding and Decoding",
  order: ["Code Tables and Swapped Names", "Number Codes"],
  byPrefix: {
    "Code Tables and Swapped Names": ["6b97306b", "bcb95a04", "df1a4ffb"],
    "Number Codes": ["7b14dce5", "cf460fe4"],
  },
  expected: {"Code Tables and Swapped Names": 3, "Number Codes": 2},
  total: 5,
};

export default plan;
