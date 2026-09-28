/**
 * Reshape plan — CDS "Mensuration 2D" (197 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 197 stems AND solutions (2026-09-28). The classification cut grouped by
 * SHAPE NAME ("Areas of Triangles and Quadrilaterals" 71, "Circle, Sector and
 * Segment" 49), which put a wheel-revolution count beside a segment-area formula and
 * Heron's formula beside a tiling cost. The teaching cut groups by the technique the
 * solution uses: triangle areas; quadrilateral areas; the SAME-LENGTH family (a wire
 * re-bent, two shapes of equal perimeter — the paper's favourite comparison);
 * circumference, wheels and rings; arcs, sectors and segments; one figure drawn in
 * another (incircle, circumcircle, regular polygons); touching circles, where the
 * move is always "join the centres"; and composite shaded regions. The two tiny
 * source subtopics (equal perimeter 4, regular polygons 3) fold into the pages that
 * teach them. Premise sets stay together: 991433d1/0dbab1dc, 6c947e85/5fd3cd92/
 * 5bddd7c2, 3ee1b037/f4628deb, b0276b30/2258df5b, fa0f4476/02ea0bd1/8817061a,
 * 595199ea/4a69f633, bf343736/cbd972ff, 46315146/83139d07, f49bcac9/220c55a5,
 * 229a586d/0566d57e, 446b8fcb/b75db575, dcd1c38d/a8328173, 1c5efafe/4a656859,
 * fb1109aa/10c3ae9e, dd5ec883/efa8ff8d.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  tri: "Areas of Triangles",
  quad: "Rectangles, Squares and Other Quadrilaterals",
  wire: "Equal Perimeters and Re-bent Wires",
  circ: "Circumference, Wheels and Rings",
  sector: "Arcs, Sectors and Segments",
  insc: "Inscribed and Circumscribed Figures",
  touch: "Touching Circles",
  shaded: "Combined and Shaded Regions",
} as const;

const plan: ReshapePlan = {
  chapter: "Mensuration 2D",
  order: [T.tri, T.quad, T.wire, T.circ, T.sector, T.insc, T.touch, T.shaded],
  whole: {},
  byPrefix: {
    [T.tri]: [
      "73732c75", "6960c136", "19ee9149", "6256abeb", "ccecb24f", "eb527484", "a7e54b89", "aedaa18c",
      "aadcfecd", "6093bbaf", "3411b5c8", "75195bfb", "6509d9ef", "c555dbd1", "41d7cd7a", "487c2f34",
      "69e5494b", "bd840688", "f9595b44", "be04f7b3", "7401a768", "1f758fb5", "a1750339", "229a586d",
      "0566d57e", "a5e2c239", "5d1944cb", "5e3230b9", "45031c64", "f9d52664", "b21d1d66", "d9a49dfd",
    ],
    [T.quad]: [
      "4861051e", "0229d71f", "073c3adb", "18b0e990", "a8ad51e3", "c9df67a4", "dcd1c38d", "a8328173",
      "7b05ded0", "f21030fc", "6b118cf0", "8a9d23b5", "81c25ff0", "f948b319", "03aa4bc7", "f66caa58",
      "821fe9ab", "98db2111", "23f76fe1", "32760d68", "ec7eedd9", "c9b8cba0", "a0b2140e", "8f8ae4ca",
      "8a2695c2", "103550d0", "b0276b30", "2258df5b", "f57e67ea", "112ca8c2", "68948033", "9ae62b26",
      "c41ff357", "b798bd2a",
    ],
    [T.wire]: [
      "3233908b", "567ff71f", "78e491a4", "2505fc97", "f1864f3e", "19865cbc", "41a44e11", "06308b25",
      "3a07c9ed", "2e2847ab", "4f9b2f52", "32892a3f", "7c5631a8", "f7f869bc", "637130e2", "f36a2139",
      "1e09107a",
    ],
    [T.circ]: [
      "fe136762", "5d4e131a", "506d25e4", "27b6800e", "be567c4f", "5dcb7b09", "e9dff099", "78abe2d3",
      "db369a90", "5254a68b", "aae9bbbe", "a15ff9eb", "375bf644", "81ef4c6c", "2f367617", "36dc7d18",
      "c12f00b1", "eb4594c4", "a32414ee",
    ],
    [T.sector]: [
      "1c874529", "a9bb09f6", "9079dc8c", "a9761558", "9c016c57", "61fa214c", "8683d407", "5d5eaa91",
      "1c5efafe", "4a656859", "69ce5148", "fb1109aa", "10c3ae9e", "94e61b31", "73f78687", "55f63a22",
      "e2a30842", "7c60ec72", "dd5ec883", "efa8ff8d", "415cc7e7", "0b3781e6", "bdc41e6d", "3a209387",
      "79765c24",
    ],
    [T.insc]: [
      "85693d3b", "4df91840", "67a5f2a8", "48d08000", "3d99bb4d", "6f2f479b", "8e510be4", "88b1f73d",
      "5da39628", "eab4b030", "8eea594b", "548e9506", "e30fca07", "03f6d9d0", "4cac010d", "e8709567",
      "991433d1", "0dbab1dc", "6c947e85", "5fd3cd92", "5bddd7c2", "170efbad", "cd32a3ed", "5a132d9a",
      "451a8318", "994e41d5", "8e56b3c4", "446b8fcb", "b75db575", "0423a0d0", "edf4d3a7", "9d57f170",
    ],
    [T.touch]: [
      "2dfc2482", "7bb9bc22", "a09c0703", "09e62240", "7d15994d", "426a01e2", "31798c66", "3915c114",
      "0653bb9a", "b634d7f3", "46315146", "83139d07", "923d7891",
    ],
    [T.shaded]: [
      "ba896c6d", "e22c8b3c", "4d984b9d", "e7f3bbf6", "8b88e924", "410f2534", "d3bede5f", "d428a093",
      "19b6eeb6", "5f363582", "47f0db9c", "6e84ce01", "6ee5cf94", "c7daff5c", "3ee1b037", "f4628deb",
      "595199ea", "4a69f633", "bf343736", "cbd972ff", "f49bcac9", "220c55a5", "fa0f4476", "02ea0bd1",
      "8817061a",
    ],
  },
  expected: {
    [T.tri]: 32,
    [T.quad]: 34,
    [T.wire]: 17,
    [T.circ]: 19,
    [T.sector]: 25,
    [T.insc]: 32,
    [T.touch]: 13,
    [T.shaded]: 25,
  },
  total: 197,
};

export default plan;
