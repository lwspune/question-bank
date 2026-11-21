/**
 * Reshape plan: MH Scholarship Class 4 "Classification (Odd One Out)" (9 q, the April 2026 paper), for
 * scripts/mh-scholarship/reshape.ts. Cut by what a question asks; every row read.
 */
import type { ReshapePlan } from "../../reshape";

const plan: ReshapePlan = {
  exam: "mh-scholarship-4",
  subject: "Intelligence Test",
  chapter: "Classification (Odd One Out)",
  order: ["Word and Number Groups", "Letter and Figure Groups"],
  byPrefix: {
    "Word and Number Groups": ["3e34e619", "edfcdf04", "df31440f", "ff22b61e", "e5caa564"],
    "Letter and Figure Groups": ["1213ac20", "2c076b75", "3a8fd864", "a5c39e1e"],
  },
  expected: {"Word and Number Groups": 5, "Letter and Figure Groups": 4},
  total: 9,
};

export default plan;
