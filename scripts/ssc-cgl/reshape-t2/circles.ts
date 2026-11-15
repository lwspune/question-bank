/**
 * Reshape plan: SSC CGL TIER II "Circles" (16 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 16 stems and solutions (2026-11-15); every key re-derived. Two pages: angles in a circle (the
 * angle at the centre, cyclic quadrilaterals and the alternate segment) and chords, tangents and radii
 * (one new name: chords and the perpendicular from the centre, common chords, the circumradius and
 * collinear points, and tangents from an external point).
 *
 * Never featured: 748ef145 (Note: as printed no option is right; the common chord is 36 times root 3 and
 * SSC keyed its half).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  angles: "Angles in a Circle",
  chords: "Chords, Tangents and Radii",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Circles",
  order: [T.angles, T.chords],
  byPrefix: {
    [T.angles]: ["09b1b78b", "58be87e3", "cc82527d", "51de1634", "f79a5aef", "a0492207"],
    [T.chords]: ["37403a34", "883b1713", "ecfeb4b6", "748ef145", "9a6da9ea", "53701eed", "0d108a46", "d5784399", "077af7a6", "212963ce"],
  },
  expected: { [T.angles]: 6, [T.chords]: 10 },
  total: 16,
};

export default plan;
