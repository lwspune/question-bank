/**
 * Reshape plan: SSC CGL TIER II "Triangles" (45 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 45 stems and solutions (2026-11-15); every key re-derived and agreed. None carries a figure.
 * The ingest filed them under nine subtopics, five with 1 to 4 rows. Cut by technique, in teaching
 * order: angles (angle sum, exterior angles, isosceles chains, the bisector-altitude angle); sides,
 * bisectors and midpoints (one new name: Pythagoras and its converse, the one cosine-rule row, the
 * angle-bisector theorem and the midpoint theorem); congruence and similarity (with the four area-ratio
 * rows and the altitude-to-hypotenuse row); and the centres (angles at the incentre and orthocentre,
 * inradius and circumradius, the centroid and medians).
 *
 * Never featured: c185e5a2 (its solution opens with a Note: the English is our translation of SSC's
 * Hindi).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  angles: "Angles of a Triangle",
  sides: "Sides, Bisectors and Midpoints",
  similarity: "Congruence and Similarity",
  centres: "Centres of a Triangle",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Triangles",
  order: [T.angles, T.sides, T.similarity, T.centres],
  byPrefix: {
    [T.angles]: ["875f2cf1", "3a70fd46", "70509861", "caca47af", "93942090", "76e71913", "135090e0", "ab2878f8", "140463f3"],
    [T.sides]: ["d1bac85f", "446fa69b", "899c110c", "6f2bced9", "a2d6ff5c", "a63659a8", "6db3f7cb", "8dd202aa"],
    [T.similarity]: [
      "4a3d009b", "3f077b8e", "7c9d6819", "8738f849",
      "9ba4cf40", "003c9300", "14e77eed", "7bf4f257", "c95ce134", "7d04478c",
      "5981a83f", "e88bbe9c", "5b0cbfae", "43a9a20e",
    ],
    [T.centres]: [
      "c185e5a2", "45eb4702", "89eba20d", "9ebcff19",
      "18157320", "18271760", "c614ca66",
      "982b29e7", "27947139", "9a80378f", "cd4aa8b6", "485d4736", "85837c1f", "2a4b3e5d",
    ],
  },
  expected: { [T.angles]: 9, [T.sides]: 8, [T.similarity]: 14, [T.centres]: 14 },
  total: 45,
};

export default plan;
