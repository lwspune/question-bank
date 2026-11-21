/**
 * Reshape plan: MH Scholarship Class 7 "Classification (Odd One Out)" (9 q, the April 2026 paper), for
 * scripts/mh-scholarship/reshape.ts. Cut by what a question asks; every row read.
 */
import type { ReshapePlan } from "../../reshape";

const plan: ReshapePlan = {
  exam: "mh-scholarship-7",
  subject: "Intelligence Test",
  chapter: "Classification (Odd One Out)",
  order: ["Word and Number Groups", "Letter and Figure Groups"],
  byPrefix: {
    "Word and Number Groups": ["7edd592d", "9f1e3d44", "c84f6770", "11c39036", "d58bb961"],
    "Letter and Figure Groups": ["3bd82ed4", "de7a4446", "aca55ae0", "e1c22967"],
  },
  expected: {"Word and Number Groups": 5, "Letter and Figure Groups": 4},
  total: 9,
};

export default plan;
