/**
 * Reshape plan: SSC CGL Tier I "Lines, Angles and Polygons" (18 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 18 stems and solutions (2026-10-23); every row is from the 2025 shifts and every key
 * checks. The ingest filed them under two subtopics, sixteen under one polygon heading. Cut here by
 * what the row needs: angle facts at lines and the angle sums and diagonals of ANY polygon (the two
 * line rows fold in here, too few for a page of their own), then the single angle of a REGULAR
 * polygon (each angle, the number of sides from an angle, the centre and the side). No row is flawed.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  sums: "Angles, Parallels and Polygon Sums",
  regular: "Regular Polygons",
} as const;

const plan: ReshapePlan = {
  chapter: "Lines, Angles and Polygons",
  order: [T.sums, T.regular],
  byPrefix: {
    [T.sums]: [
      "56d27469", "d245f373",
      "00b92a9f", "70a7445b", "7566b2e9", "6b7eb034",
      "d87d93ae", "ab64cf71",
    ],
    [T.regular]: [
      "eced6e59", "b8c47f08",
      "a7164152", "050fd41a", "6cb72563", "09fd0ab2", "1c99f5e3",
      "69bf2a1f", "7b62fa5b", "df98529c",
    ],
  },
  expected: {
    [T.sums]: 8,
    [T.regular]: 10,
  },
  total: 18,
};

export default plan;
