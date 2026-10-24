/**
 * Reshape plan: SSC CGL Tier I "Heights and Distances" (20 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 20 stems and solutions (2026-10-23). Cut here by how many right triangles the row needs:
 * one triangle (a height, a shadow or a distance from one angle, and a ladder, rope, wire or ramp as
 * the hypotenuse), or two triangles sharing a side (two observers on the same side or on opposite
 * sides, the complementary-angle pair, and one observer reading two angles: a statue on a pedestal,
 * or a building seen from a tower top). The one-row "Observer Above the Ground" (a98bf3e3) folds
 * into the second page, whose method it uses. Never featured: 4157ab39 (its solution opens with a
 * Note: options C and D print the same number).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  one: "One Line of Sight",
  two: "Two Angles of Elevation or Depression",
} as const;

const plan: ReshapePlan = {
  chapter: "Heights and Distances",
  order: [T.one, T.two],
  byPrefix: {
    [T.one]: [
      "9c9b90ac", "18e0cec4", "687722ee", "690c1f25",
      "c50a16d2", "cf33dd50", "e5f0d420", "39743512", "3286f361", "6a30fa96",
    ],
    [T.two]: [
      "1124f363", "758e4c47", "ccb0a364", "9f62abf2",
      "4157ab39", "24939205", "f27e6e1d", "8585f1e4",
      "435005db", "a98bf3e3",
    ],
  },
  expected: {
    [T.one]: 10,
    [T.two]: 10,
  },
  total: 20,
};

export default plan;
