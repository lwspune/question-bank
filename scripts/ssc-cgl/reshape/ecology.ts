/**
 * Reshape plan: SSC CGL Tier I General Awareness Biology "Ecology and Environment" (17 q), for
 * scripts/ssc-cgl/reshape.ts.
 *
 * Read all 17 rows (2026-11-01, main session). One page: ecosystems, adaptations and ecologists, and threats to the
 * environment. Never featured: 399b6fae (its key rests on a judgement of the main threat).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  ecosystems: "Ecosystems, Adaptations and Environment",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Ecology and Environment",
  order: [T.ecosystems],
  byPrefix: {
    [T.ecosystems]: [
      "22ee9177", "244e0365", "a1a611c5", "a5af5f38", "aeb0697a", "e2c907a7", "d78f014b", "7d9342d4",
      "e62d7543", "1e01568f", "1fc313e2", "b75c3c58", "d3e1de39", "df8ff889", "3263b1b4", "76c0ec17",
      "399b6fae",
    ],
  },
  expected: {
    [T.ecosystems]: 17,
  },
  total: 17,
};

export default plan;
