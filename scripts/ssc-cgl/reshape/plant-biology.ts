/**
 * Reshape plan: SSC CGL Tier I General Awareness Biology "Plant Biology" (11 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 11 rows (2026-11-01, main session). One page: the plant's form and tissues, and its processes.
 * Never featured: 1825b6c0 (its solution opens with a Note).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  plants: "Plant Form and Processes",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Plant Biology",
  order: [T.plants],
  byPrefix: {
    [T.plants]: [
      "30f3590f", "8276fc27", "a7454c17", "f9947fc8", "9f161499", "57e8cba8", "c53e21f0", "606aeba6",
      "1825b6c0", "720584d6", "e8913534",
    ],
  },
  expected: {
    [T.plants]: 11,
  },
  total: 11,
};

export default plan;
