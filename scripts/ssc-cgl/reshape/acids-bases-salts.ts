/**
 * Reshape plan: SSC CGL Tier I General Awareness Chemistry "Acids, Bases and Salts" (8 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 8 rows (2026-11-02, main session). One page: acids and bases at home, and how acids react with metals.
 * No row is held back from featuring.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  acids: "Acids, Bases and Their Reactions",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Acids, Bases and Salts",
  order: [T.acids],
  byPrefix: {
    [T.acids]: [
      "97316a0a", "fa644e20", "3c1847d5", "b37fcb71", "1dbe51af", "24ed008d", "3a76f7d1", "eae59de9",
    ],
  },
  expected: {
    [T.acids]: 8,
  },
  total: 8,
};

export default plan;
