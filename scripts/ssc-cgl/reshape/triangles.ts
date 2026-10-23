/**
 * Reshape plan: SSC CGL Tier I "Triangles" (132 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 132 stems and solutions and the 4 figures (2026-10-23). The ingest's ten subtopics are
 * re-cut by method into seven pages. "Congruence and Similarity" (43 rows) splits into Congruent
 * Triangles (32: reading the vertex order and the four rules) and Similar Triangles (11), and the
 * second takes the area rows of "Ratio of Areas of Triangles", because every one of them is "find
 * the scale factor k, then use k for lengths and k squared for areas". The three-row "The Altitude
 * to the Hypotenuse" and the five Pythagoras rows join the eight Triangle Inequalities rows on one
 * page about sides: the altitude results follow from Pythagoras and two ways of writing the area,
 * so they need nothing from similarity. The three medial-triangle area rows (the quarter triangle)
 * move to the midpoint theorem; the median-halves-the-area row joins the centroid's equal parts on
 * the Medians page. Never featured: 9ccf88f8, e276bcb6 and 61befd02 (their solutions open with a
 * Note).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  angles: "Angles of a Triangle",
  sides: "Sides of a Triangle",
  congruent: "Congruent Triangles",
  similar: "Similar Triangles",
  parallels: "Parallels, Midpoints and the Bisector Theorem",
  medians: "Medians and Apollonius Theorem",
  centres: "Centres of a Triangle",
} as const;

const plan: ReshapePlan = {
  chapter: "Triangles",
  order: [T.angles, T.sides, T.congruent, T.similar, T.parallels, T.medians, T.centres],
  byPrefix: {
    [T.angles]: [
      // angle sum, ratios and equations, kinds of triangle
      "1873daf2", "2086c0da", "fbccf221", "94c7739f", "3d706037", "c6f8900d", "abd194cd", "86f97e59",
      "3a102dfe", "66b5c55c", "b8f2edae", "8cf406b1", "0c8cf6ac", "c4bef45d",
      // exterior angle
      "43afbf1a", "ad78d4ac", "0ff167aa", "683c6301",
      // isosceles and equilateral
      "ea4ce01c", "5d7ee36e", "ac0f5f94", "e276bcb6", "528fdddd", "ce024a24",
    ],
    [T.sides]: [
      // triangle inequality
      "52c02466", "7e72df98", "467dec3d", "f9e3ab87", "a7ad76e4", "4dd9bc3d", "b365f8e7", "b11aa56f",
      // Pythagoras and its converse
      "2faaae9d", "b3f2d4fd", "2c58f4ec", "00f05984", "c3b28439",
      // altitude to the hypotenuse
      "94bded39", "64d34e22", "a57c64b9",
    ],
    [T.congruent]: [
      // what congruence gives
      "baf42af6", "a42282a2", "1f5d27ea", "01e1131f", "92170577",
      // reading the correspondence
      "9a56b529", "a9b59ea7", "12518d97", "b5810faa", "0245ad42", "a9a015ab", "e6112886", "51d16081",
      "5d680ff2", "36e12995", "536bdaaf", "f6f416ed",
      // SSS, SAS, ASA, RHS
      "fc20051c", "d939b3b5", "5e2df796", "eac69edb", "accfd2f0", "2621754b", "dfffd677", "061b8af5",
      "9ad0a9f2", "f71b9971", "1130837f", "a6dc7694", "05f2629a", "171278f6", "dd8a1b29",
    ],
    [T.similar]: [
      // criteria and the scale factor for lengths
      "852569c8", "e63b4645", "d4af2eca", "75c978bc", "360aaa22", "0751dd50", "e3a8e701",
      // areas scale by the square
      "9eee9217", "57b45cf7", "d35855b1", "b5a85b8e", "5ab7e69c", "f87fb4a4", "cd8e824c", "4292c7eb",
      "932bf7fd", "5b56642d", "81aab8c1",
      // a line parallel to one side, and the areas it cuts off
      "72da09cf", "50953b1d", "7fd69b43", "70d4db5c",
    ],
    [T.parallels]: [
      // basic proportionality theorem
      "29ea7f90", "076fe4ff", "a5dea206", "2fa36649",
      // midpoint theorem and the quarter triangle
      "ffe3df4e", "8bf39918", "47b66694", "c71bab9b", "764ac5f0", "50f16f09",
      // angle bisector theorem
      "de84dbd0", "db422cb3", "61befd02",
    ],
    [T.medians]: [
      // centroid 2 : 1
      "7ce70f6d", "ce485fef", "3fdd2605", "0421e95e",
      // median and centroid areas
      "a841c2ce", "99670015", "13211057",
      // Apollonius
      "60c2d1d1", "7be1123c", "9ccf88f8",
    ],
    [T.centres]: [
      // where the centres lie
      "7499da81", "405ed55d", "ab371285", "85feb4a7",
      // angle at the incentre
      "21fedfa5", "83ecc81b", "6bfd92cd",
      // inradius
      "2e341562", "6121bdf9", "048a4d79", "0e8b3fed", "0a0e4047",
      // circumradius
      "f9402f37", "142fba5f", "97d898a6",
    ],
  },
  expected: {
    [T.angles]: 24,
    [T.sides]: 16,
    [T.congruent]: 32,
    [T.similar]: 22,
    [T.parallels]: 13,
    [T.medians]: 10,
    [T.centres]: 15,
  },
  total: 132,
};

export default plan;
