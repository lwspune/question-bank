/**
 * Reshape plan: SSC CGL Tier I "Coordinate Geometry" (29 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 29 stems and solutions (2026-10-23). The ingest filed 25 rows under one catch-all, "Lines,
 * Distance and Area", and 4 under "Section Formula and Centroid". Cut here by what the row works on:
 * points alone (distance, midpoint, centroid, the area of a triangle from its corners, the point
 * equidistant from three corners); one line (slope, intercepts, whether a point lies on it, its
 * equation from a point and a slope); and two lines (parallel and perpendicular slopes, the
 * perpendicular bisector, the shortest distance to a line). The first and last pages hold 7 and 6
 * rows, under the usual 8, because their methods are distinct and folding either into the middle
 * page would give it five concepts. Every key re-derived; none disputed, no row flawed as printed.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  points: "Distance, Section Formula and Area",
  line: "Slope and Equation of a Line",
  pairs: "Parallel and Perpendicular Lines",
} as const;

const plan: ReshapePlan = {
  chapter: "Coordinate Geometry",
  order: [T.points, T.line, T.pairs],
  byPrefix: {
    [T.points]: ["11bd3e72", "8999575a", "88f14dd2", "d2d91915", "cdd95318", "fce7a1ad", "2aa133cf"],
    [T.line]: [
      "669694cc", "b4b5a417", "12700891", "4e2903b1",
      "b976fec2", "dde78f6d", "c136e4c5",
      "f2b63363", "8ca61ff6", "46064515", "fc8c8ef8", "dfc713da", "2aea9496", "7ea4b82f", "da72d903", "0f7da853",
    ],
    [T.pairs]: ["5988fc37", "451d4d8d", "18a85f38", "9573b90c", "bb1208d4", "d6afcf29"],
  },
  expected: {
    [T.points]: 7,
    [T.line]: 16,
    [T.pairs]: 6,
  },
  total: 29,
};

export default plan;
