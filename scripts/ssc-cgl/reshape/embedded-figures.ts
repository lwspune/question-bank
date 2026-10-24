/**
 * Reshape plan: SSC CGL Tier I Reasoning "Embedded Figures and Pattern Completion" (59 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 59 rows (2026-10-23, main session). The ingest's two subtopics are the two teaching pages, so
 * nothing moves. Never featured: 9b7034e8 and 0e5648fb (their solutions only cite the key SSC printed).
 */
import type { ReshapePlan } from "../reshape";

const plan: ReshapePlan = {
  subject: "Reasoning",
  chapter: "Embedded Figures and Pattern Completion",
  order: ["Embedded Figures", "Pattern Completion"],
  byPrefix: {
    "Embedded Figures": [
      "a417ff6f", "9b7034e8", "b152d97f", "f81dcc8d", "78e39c7e", "4c871567", "9db94551", "b751db33",
      "e4650960", "98c60b6f", "9c6d983f", "ebea3683", "e65b39d5", "777ea82c", "3b4bcedd", "1fabf836",
      "5da3f3ed", "f513a8da", "9f4c4c3b", "65880bf1", "3f0cd954", "5f1ff2a6", "23c13e23", "1e7d560c",
      "a7403e25", "636c18a4", "83323217", "51ae007a", "c3d48743", "24ce965f", "28dd8d5c", "549b367a",
      "64aed24b", "12b1891a", "0f3bbc36", "7abf809f", "0be1f6fd", "e99b544a", "0e5648fb", "2549f302",
      "64bcf848", "e3980b2e", "d4819fa3", "fd663472", "5265c15b", "16d21122", "3892fbf6", "a4c75daa",
      "f24c2393", "13b2b6ba", "69a51d5a", "e9602aa4", "79eddb0e", "32f3d812",
    ],
    "Pattern Completion": [
      "62420c9e", "21ec68b3", "f45f8c94", "4c634280", "0e259564",
    ],
  },
  expected: {"Embedded Figures": 54, "Pattern Completion": 5},
  total: 59,
};

export default plan;
