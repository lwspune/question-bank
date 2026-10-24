/**
 * Reshape plan: SPI "Lines, Angles and Polygons" (19 q), for scripts/spi/reshape.ts.
 *
 * Read all 19 stems and solutions (2026-10-22). The ingest filed them under 15 one-off subtopics.
 * Cut by what the question asks for: first the words and the angle pairs (line, ray, opposite rays,
 * congruent, complementary and supplementary), then angles where lines cross or run parallel, with
 * the one polygon question, and last the ruler-and-compass constructions (they need the 60 degree
 * equilateral arc and parallel lines from the earlier pages). Never featured: a532c456 (2022 Q44: the
 * count of 7 holds only for the figure's angle; at 45 degrees it would change) and 3d1c6903 (two
 * options cannot be built by the school bisection steps).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  basics: "Lines, Rays and Angle Pairs",
  parallel: "Intersecting Lines, Parallel Lines and Polygons",
  constructions: "Constructions",
} as const;

const plan: ReshapePlan = {
  chapter: "Lines, Angles and Polygons",
  order: [T.basics, T.parallel, T.constructions],
  byPrefix: {
    [T.basics]: [
      "ddab756e", "b79cdfb0", "fe06f6e9", "2eb21e6a", "fd5bcb87", "26107a58", "5c9bd1cc", "d8a468d2",
      "a532c456",
    ],
    [T.parallel]: ["751017c2", "13c4ce59", "d9037725", "72c205ce", "56fce3e0"],
    [T.constructions]: ["1d0218b8", "5cb4e757", "a99df1b5", "4b32ac40", "3d1c6903"],
  },
  expected: {
    [T.basics]: 9,
    [T.parallel]: 5,
    [T.constructions]: 5,
  },
  total: 19,
};

export default plan;
