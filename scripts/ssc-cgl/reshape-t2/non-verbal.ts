/**
 * Reshape plan: SSC CGL TIER II Reasoning "Non-Verbal Series and Analogy" (26 q, every one a picture), for
 * scripts/ssc-cgl/reshape.ts. Read all 26 stems and keys (2026-11-15). Series, analogy and odd figure on
 * one page. Flawed (solution opens with a **Note:**, tagged but never featured): ed4c1b53.
 */
import type { ReshapePlan } from "../reshape";

const T = { figures: "Figure Series, Analogy and Odd Figure" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Reasoning",
  chapter: "Non-Verbal Series and Analogy",
  order: [T.figures],
  byPrefix: {
    [T.figures]: [
      "04a12eea", "359bdb07", "4d5de83a", "6f3b869c", "489a9482", "55c9e8d3", "c5a93714",
      "73cb14c2", "8e068666", "c63aed2f", "f2806b66", "e6f251c6", "07b8d9e2", "5088cef3", "f721bcc8",
      "03fc9715", "5e579eb9", "98dc6bff", "a2025131", "c8f50857", "ddea84c9", "e525985a", "ed4c1b53", "dfa8087b", "252b1777", "40aeed4e",
    ],
  },
  expected: { [T.figures]: 26 },
  total: 26,
};

export default plan;
