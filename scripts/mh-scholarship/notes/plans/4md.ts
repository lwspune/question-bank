/**
 * Reshape plan: MH Scholarship Class 4 "Multiplication and Division" (8 q, the April 2026 paper), for
 * scripts/mh-scholarship/reshape.ts. Cut by what a question asks; every row read.
 */
import type { ReshapePlan } from "../../reshape";

const plan: ReshapePlan = {
  exam: "mh-scholarship-4",
  subject: "Mathematics",
  chapter: "Multiplication and Division",
  order: ["Long Division", "Multiplication and Division Word Problems"],
  byPrefix: {
    "Long Division": ["9123379c", "46548b05"],
    "Multiplication and Division Word Problems": ["41ec2f55", "2fe60fe9", "d6b8510d", "46dd4fc6", "9663131e", "cc34ec47"],
  },
  expected: {"Long Division": 2, "Multiplication and Division Word Problems": 6},
  total: 8,
};

export default plan;
