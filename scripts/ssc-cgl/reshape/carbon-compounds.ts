/**
 * Reshape plan: SSC CGL Tier I General Awareness Chemistry "Carbon and Its Compounds" (28 q), for
 * scripts/ssc-cgl/reshape.ts.
 *
 * Read all 28 rows (2026-11-02, main session). Two pages: hydrocarbons (with the one allotrope row), and functional
 * groups with named reagents. Never featured: f6b97add (its solution opens with a Note), 56131af2 (it needs its figure).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  hydrocarbons: "Hydrocarbons and Fuels",
  functional: "Functional Groups and Reagents",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Carbon and Its Compounds",
  order: [T.hydrocarbons, T.functional],
  byPrefix: {
    [T.hydrocarbons]: [
      "aba672b1", "6dbb23b0", "6dfcf4a6", "adbd8b3b", "e5831881", "8d5c979c", "fc7da54d", "79664be1",
      "bdd7d95b", "516a7b66", "0d349432", "f6b97add", "21588c93",
    ],
    [T.functional]: [
      "1ecd10a7", "2751533d", "33e90f36", "d717805f", "cec35a5f", "a6e1f2bf", "af4ae0a8", "5c8ba8ea",
      "7d3c6ec8", "56131af2", "8455b7fa", "c5b4b940", "ad0c0c36", "4ddf9e05", "21cc70bb",
    ],
  },
  expected: {
    [T.hydrocarbons]: 13,
    [T.functional]: 15,
  },
  total: 28,
};

export default plan;
