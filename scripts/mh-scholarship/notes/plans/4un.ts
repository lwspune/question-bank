/**
 * Reshape plan: MH Scholarship Class 4 "Units of Measurement" (7 q, the April 2026 paper), for
 * scripts/mh-scholarship/reshape.ts. Cut by what a question asks; every row read.
 */
import type { ReshapePlan } from "../../reshape";

const plan: ReshapePlan = {
  exam: "mh-scholarship-4",
  subject: "Mathematics",
  chapter: "Units of Measurement",
  order: ["Time and Calendar", "Money, Ream and Quire"],
  byPrefix: {
    "Time and Calendar": ["7874c165", "ff61a484", "fe67fa1d", "0c36f4a3"],
    "Money, Ream and Quire": ["15908cae", "64088208", "9306c940"],
  },
  expected: {"Time and Calendar": 4, "Money, Ream and Quire": 3},
  total: 7,
};

export default plan;
