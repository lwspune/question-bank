/**
 * Reshape plan: SSC CGL Tier I Reasoning "Venn Diagrams" (44 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 44 rows (2026-10-23, main session). The ingest's two subtopics (choose the diagram for three
 * classes; read numbers off a drawn diagram) are already the two teaching pages, so nothing moves.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  logical: "Logical Venn Diagrams",
  counting: "Counting from a Venn Diagram",
} as const;

const plan: ReshapePlan = {
  subject: "Reasoning",
  chapter: "Venn Diagrams",
  order: [T.logical, T.counting],
  byPrefix: {
    [T.logical]: [
      "dd24a79c", "7ee34ee5", "d7929b89", "2dc79ff9", "843c6bb4", "b6fe14a3", "0366193f", "a1af6a6b",
      "2ea98c2c", "77270686", "c7c6d9ec", "c1418ca9", "1157f738", "c346bbea", "029c9353", "055a7ea9",
      "698cf7cf", "b6771974", "76a2666c", "52a4b0c9", "6fd94b09", "36e97931", "1a9bc85f", "c8d84d80",
      "e8061c34", "8594e30f", "2809b476", "b9891683", "b9e9d895", "902f06e0",
    ],
    [T.counting]: [
      "fc71e927", "175c904b", "c86af310", "ef62a221", "66c3ca3a", "7ea4334b", "9ca03555",
      "afa64778", "e66b315b", "6a3af5a8", "85cf8e6d", "7f09cb85", "a75f50d1", "8a8d8e74",
    ],
  },
  expected: { [T.logical]: 30, [T.counting]: 14 },
  total: 44,
};

export default plan;
