/**
 * Reshape plan: SSC CGL Tier I Reasoning "Figure Counting" (36 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 36 solutions (2026-10-23, main session). The ingest's two subtopics already fit the two
 * teaching pages (triangles; squares, rectangles and circles), so nothing moves. Never featured:
 * 9a15788e, 9447c384, 91cf038c (their notices say no printed option matches the count) and 9d975443,
 * 3d373b75, 8e767b58, 92729112, 3889ccc9 (their solutions only cite the key SSC printed).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  triangles: "Counting Triangles",
  squares: "Counting Squares and Other Figures",
} as const;

const plan: ReshapePlan = {
  subject: "Reasoning",
  chapter: "Figure Counting",
  order: [T.triangles, T.squares],
  byPrefix: {
    [T.triangles]: [
      "957744e1", "05a47285", "54fa3941", "6c28a747", "849c029e", "28e131e8", "91cf038c", "9a15788e",
      "8b95b50d", "d0316bc3", "a4b5e0ce", "966f7545", "18216f21",
      "639c36f1", "3c34acab", "ae776117", "b69a007f", "9cc7ab65", "615a7a3d", "6175a8bd", "3d373b75",
      "e57a713a", "51f29bd6", "3b3ce885", "fa149f69",
    ],
    [T.squares]: [
      "9d975443", "0d51f25c", "4c257375", "8c747c87", "2063534a", "92729112", "0725b786", "3889ccc9",
      "e4f6f0c1", "9447c384", "8e767b58",
    ],
  },
  expected: { [T.triangles]: 25, [T.squares]: 11 },
  total: 36,
};

export default plan;
