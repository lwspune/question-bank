/**
 * Reshape plan: SSC CGL Tier I "Quadrilaterals" (11 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 11 stems and solutions (2026-10-23); six rows are from the 2024 shifts and five from the
 * 2025 shifts, and every key checks. The ingest spread them over five subtopics of one to four rows
 * each, too few for a page apiece, so they share one page cut by shape: the angle sum and the
 * diagonals of any quadrilateral (the cyclic row folds in here), the trapezium, the parallelogram,
 * then the rhombus and the kite (equal sides, so congruent halves). No row is flawed.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  properties: "Properties of Quadrilaterals",
} as const;

const plan: ReshapePlan = {
  chapter: "Quadrilaterals",
  order: [T.properties],
  byPrefix: {
    [T.properties]: [
      "6b7256a9", "c5aae95f", "ff6675d3",
      "241216be", "482c9647",
      "9f59b614", "0db900d6",
      "2fb071ba", "517701fc", "4e8ea8da", "be9e9767",
    ],
  },
  expected: {
    [T.properties]: 11,
  },
  total: 11,
};

export default plan;
