/**
 * Reshape plan: SSC CGL Tier I "Mensuration 2D" (138 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 138 stems and solutions (2026-10-23). The ingest filed them under seven subtopics, and
 * "Arcs, Sectors and Segments" (58 rows) mixed three methods: an arc as a fraction of the
 * circumference, a sector's area, and a segment (sector minus triangle). Cut here by the method that
 * solves the row, in teaching order: rectangles, squares, trapeziums and tiles; triangles (base and
 * height, Heron, equilateral triangles and hexagons, scaling); the whole circle (circumference,
 * wheels, area, rings; the one re-bent wire row sits here); arc length and sector perimeter (with
 * radians); sector area; and regions built from pieces (segments, whole minus holes, inscribed
 * figures). The four "Inscribed and Circumscribed" rows and the one "Equal Perimeters" row fold into
 * the pages whose method they use. 5fb7444c (regular polygons, area ratio to side ratio) moves to
 * the triangle page's scaling concept.
 * Never featured (flawed or unclear as printed, no Note): a7ab3c0a (inner radius 28 larger than outer
 * 25), 52dd1837 (circumference : diameter = 3 : 5 is impossible), 9ea98676 (the second sector's
 * radius is not given), 3bdf436a (the plot is never said to be square), 9db8383f (the figure shades
 * the minor sector, but an arc of 5r is a major one), 83c8bc8b (options C and D are the same),
 * 12f73677 (the hexagon is never said to be regular).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  quads: "Rectangles, Squares and Other Quadrilaterals",
  triangles: "Areas of Triangles",
  circles: "Circumference, Wheels and Rings",
  arcs: "Arc Length and Sector Perimeter",
  sectors: "Sector Area",
  shaded: "Combined and Shaded Regions",
} as const;

const plan: ReshapePlan = {
  chapter: "Mensuration 2D",
  order: [T.quads, T.triangles, T.circles, T.arcs, T.sectors, T.shaded],
  byPrefix: {
    [T.quads]: [
      // sides, area and perimeter as equations
      "ef75e846", "89f5eb7a", "f3b78117", "d0f65f91", "6d18bed3", "e6c13c25", "f85b56e2", "2e5d2ff7",
      "2deb719e", "e48c901a", "9156f10d", "d2bad0d2",
      // diagonals
      "838abba9", "e758b672", "55dd82f4", "62616c53",
      // tiles, paths, cut-outs and cost
      "f4e282ef", "59cbf1e2", "7207eed2", "de25e0d3", "3bdf436a",
      // parallelogram and trapezium
      "0a905dd9", "216499f6", "e1766199", "95fb3212",
    ],
    [T.triangles]: [
      // base and height, two sides and the angle
      "779753c9", "3dc24281", "3b968dd9", "c5d3c0d9", "c9e9c65d", "71b90dfb", "3a53c132",
      // three sides: semi-perimeter, Heron, inradius
      "38aa0e82", "bcc03d8d", "50c2341a", "0707bc52",
      // equilateral triangle and regular hexagon
      "b9e54a50", "a52455ed", "22109813", "d3f4683f", "db9dd399", "59784101", "57e48343",
      // scaling
      "de6cf1ed", "bbea1aad", "5fb7444c",
    ],
    [T.circles]: [
      // circumference and wheels
      "bf97a8da", "52dd1837", "dd40407a", "36403b16", "ccd15d3b", "3acac9ab", "78268718", "bf813b3d",
      "c3ecc70e",
      // area and its scaling
      "e8360101", "d0a05c0a", "972f2eab", "b6078eed", "99396efe", "8cdb7802", "ee981cc1",
      // rings and paths
      "75421ccd", "a7ab3c0a", "87e96f76", "8a3693d1", "eb1a930c", "651a11c0", "c818e39d", "65672bec",
      "b0b01515",
    ],
    [T.arcs]: [
      // arc as a fraction of the circumference
      "a1406968", "f93e481f", "ef9dd1c0", "f55db4ab", "af8a9734", "83c8bc8b", "13e77a58", "b7bef425",
      "3bf734f7", "0491a0b7",
      // sector perimeter
      "31b570c2", "bcbffd3b", "1d33a946", "3b12193a", "17eeacab", "468f5b24", "72e30282",
      // radians
      "5d7c7d6e", "b448f576",
    ],
    [T.sectors]: [
      // fraction of the circle's area
      "35c3d1ce", "e3f823ef", "b09d2fcf", "5a4d7f24", "7eb14120", "7e935a7d", "054d25c4", "2b6fb593",
      "40b93029", "27caa3a0",
      // half arc times radius, half r squared theta
      "7e1f7fd0", "0c7a8e1b", "b8a1c2d8", "ec6485de", "9db8383f", "6432a1fd", "3f6f9904", "1d14176f",
      "176517bf", "7f1485d9", "f2dba50e", "45f80f86",
      // two sectors compared
      "16454365", "9ea98676", "812dcca3", "1ee279b0", "612d3629", "b2cf4299", "0174b750", "0014fad7",
      // from the perimeter
      "4619f382", "82b70998",
    ],
    [T.shaded]: [
      // segments
      "bcf79f63", "3a4a1b4b", "20728d3a", "92747590", "074cc5ae", "4c5c0840", "8633c696",
      // whole minus holes, pieces added
      "bc79e886", "2a4f930d", "1279377a", "7dda4eab", "10956bb8",
      // inscribed figures
      "7b419c28", "4823e341", "12f73677", "59427631",
    ],
  },
  expected: {
    [T.quads]: 25,
    [T.triangles]: 21,
    [T.circles]: 25,
    [T.arcs]: 19,
    [T.sectors]: 32,
    [T.shaded]: 16,
  },
  total: 138,
};

export default plan;
