/**
 * Reshape plan: SSC CGL Tier I General Awareness Biology "Human Physiology" (25 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 25 rows (2026-11-01, main session). Eight small subtopics cut into nutrition, and the body's systems.
 * Never featured: 626f1afc (its solution opens with a Note).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  nutrition: "Nutrition, Vitamins and Minerals",
  systems: "Organ Systems of the Body",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Human Physiology",
  order: [T.nutrition, T.systems],
  byPrefix: {
    [T.nutrition]: [
      "2978be08", "626f1afc", "9cd4b096", "bc7f097c", "c3501c86", "55354706", "85608b98", "28e53478",
      "c81dd4cf", "ca74818a",
    ],
    [T.systems]: [
      "01f512f1", "0eecd78c", "1ee7cba4", "7b6ca764", "e33e7116", "9aa9489c", "1a3c73d0", "aa49bca5",
      "94265770", "f7cb24f7", "bf46b178", "dd5b0afa", "f7f5fab9", "56a1b775", "e1852e9c",
    ],
  },
  expected: {
    [T.nutrition]: 10,
    [T.systems]: 15,
  },
  total: 25,
};

export default plan;
