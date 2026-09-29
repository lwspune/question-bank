/**
 * Reshape plan — CDS "Lines, Angles and Polygons" (22 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 22 stems AND solutions (2026-09-29). Two kinds of question: angles made by lines (a
 * linear pair, vertical angles, complements, the angle-bisector locus, parallels cut by
 * transversals, counting intersection points) and the angles of polygons (interior and exterior
 * sums, regular polygons). The four line buckets become one page; polygons keep theirs.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  lines: "Lines, Angles and Parallels",
  polygons: "Interior and Exterior Angles of Polygons",
} as const;

const plan: ReshapePlan = {
  chapter: "Lines, Angles and Polygons",
  order: [T.lines, T.polygons],
  whole: {},
  byPrefix: {
    [T.lines]: [
      "ea312df4", "7ee2d55a", "ed45efde", "f9ca979f", "eee270f0", "b2c56479", "69f15f4c", "37d6ce71",
      "bfd40cfd", "0885ff9b", "e1017bb3", "5ed598a4",
    ],
    [T.polygons]: ["0985b41a", "d6b92b45", "07007523", "7a97fc18", "7fb70ba7", "0789b00c", "81f6d08c", "7ebfce72", "8d0488ae", "face9e4a"],
  },
  expected: {
    [T.lines]: 12,
    [T.polygons]: 10,
  },
  total: 22,
};

export default plan;
