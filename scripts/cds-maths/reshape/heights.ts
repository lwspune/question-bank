/**
 * Reshape plan — CDS "Heights and Distances" (41 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 41 stems AND solutions (2026-09-29). "Angles of Elevation and Depression" (34) held
 * four set-ups: one right triangle (a shadow, a broken tree, a ladder), TWO observation points on
 * a line (moving towards the tower, opposite sides, complementary angles), an observer standing
 * ABOVE the ground who sees both elevation and depression (building and tree, ship's deck, cloud
 * and its reflection), and towers standing on a plane figure (hexagon, square, rectangle,
 * bearings). Each gets a page; the two-object rows join the two-point page. Premise sets
 * (cloud, flagstaff, double angle) each stay together.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  single: "One Line of Sight",
  twopoints: "Two Points of Observation",
  above: "Observer Above the Ground",
  plane: "Towers on Plane Figures and Bearings",
} as const;

const plan: ReshapePlan = {
  chapter: "Heights and Distances",
  order: [T.single, T.twopoints, T.above, T.plane],
  whole: {},
  byPrefix: {
    [T.single]: ["a5799e11", "417c1e5e", "e2981169", "b1962fb9", "a0274946", "c264dff5"],
    [T.twopoints]: [
      "61e8ad35", "1c950da9", "89d49c4d", "d8247579", "1093b2b9", "863007cb", "85f61d75", "87f5ad19",
      "5a39c272", "b7e32612", "0c31fc2b", "1944db75", "aa5816ef", "41bdce9e", "1fa48152", "2e268966",
      "9ef421aa", "2f780a8d", "8d360ff0",
    ],
    [T.above]: ["655662f4", "977879a6", "d007d2f0", "aecf5e73", "32b6debf", "0b6fe01b", "c748dcf9", "aaf98a59", "a4c97682"],
    [T.plane]: ["c5fe94ab", "e6dcc69c", "3f33a87c", "2291551a", "965f417b", "7662357b", "6e5efe2c"],
  },
  expected: {
    [T.single]: 6,
    [T.twopoints]: 19,
    [T.above]: 9,
    [T.plane]: 7,
  },
  total: 41,
};

export default plan;
