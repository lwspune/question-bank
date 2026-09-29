/**
 * Reshape plan — CDS "Triangles" (151 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 151 stems AND solutions (2026-09-28). The classification's largest bucket,
 * "Pythagoras Theorem and its Converse" (39), mixed three techniques: plain Pythagoras
 * (triples, ladders, poles), the ALTITUDE TO THE HYPOTENUSE (p = ab/c, BD² = AD·DC —
 * which also filled most of "Altitudes and Sides"), and the squared-difference family of
 * medians and cevians (AB² − AC² = BD² − CD², the isosceles AB² − AD² = BD·DC). Each now
 * sits on the page that teaches it: the altitude on its own page (the single most repeated
 * right-triangle move in the paper), the cevian identities with Apollonius. Basic
 * proportionality and the bisector theorem stay together (both divide a side in a ratio),
 * the midpoint theorem joins them, and triangle-inequality statements join the median
 * inequalities. Premise sets stay together: 34d777d2/12fa1bdc, 963e7f9d/967cb9be/29606449,
 * f6ba97d0/ad662ada, 819651b0/49d3abc7, cf26e699/306e99b7/e6ae6394, 3039dc68/9ca7106b,
 * a6cdbe6c/8bac8085, 1ec96f0a/fb445839, ea074555/08eae8f4.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  angles: "Angles of a Triangle",
  ineq: "Triangle Inequalities",
  congr: "Congruence and Similarity",
  prop: "Parallels, Midpoints and the Bisector Theorem",
  area: "Ratio of Areas of Triangles",
  pyth: "Pythagoras Theorem and its Converse",
  alt: "The Altitude to the Hypotenuse",
  med: "Medians and Apollonius Theorem",
  centres: "Centres of a Triangle",
  rules: "Sine and Cosine Rules",
} as const;

const plan: ReshapePlan = {
  chapter: "Triangles",
  order: [T.angles, T.ineq, T.congr, T.prop, T.area, T.pyth, T.alt, T.med, T.centres, T.rules],
  whole: {},
  byPrefix: {
    [T.angles]: [
      "3ddbaa0d", "e8a328c4", "12f5039f", "0d3f77c6", "6ab6b36f", "56601f0b", "c4dfea0b", "5324d4fe",
      "f9b61d2d", "8bdb7ec2", "5152ddc5",
    ],
    [T.ineq]: [
      "1f4dfbfe", "fdb6da78", "720375e1", "34d777d2", "12fa1bdc", "84e2a092", "ee4ed766", "e98b79cb",
      "9f9dcef6", "33aa50dc",
    ],
    [T.congr]: [
      "6bc4e429", "05a6af90", "bea06596", "4743d28f", "b028c005", "a4e7ae2a", "02bc6d71", "ef51b363",
      "9a87b985", "129114ce", "b3e6a2e2", "2e246189", "5a19e35d",
    ],
    [T.prop]: [
      "11c1c554", "ec6f47c0", "a77fd3a2", "caeccca6", "999ca294", "13ad5d36", "1c0be054", "e7e9acce",
      "9b382c76", "acf2758c", "511a1bc8", "4f2aaa5c", "906db145", "a78e1c8f", "43075306", "6d552e35",
      "1644eddd",
    ],
    [T.area]: [
      "7a6f43f5", "202c7b84", "a84c82ef", "1fb48f8b", "ab3ea6ab", "bfa85f13", "718de072", "1fff82f4",
      "00c28b51", "9b61dde3", "9c2a75d6", "f235941d", "e46362d1", "1ec96f0a", "fb445839",
    ],
    [T.pyth]: [
      "6d618b06", "864cef07", "34475941", "386d2cbc", "8651b5d4", "cfb29efb", "d963f067", "60c91128",
      "06e4e3a9", "fb9f9baf", "7d94427f", "b96612f3", "9378261e", "c835739c", "22dec582", "212f24ae",
      "f47e340d", "1425b399", "6ef00d33", "04114d55", "2418d676", "fde5973f",
    ],
    [T.alt]: [
      "e0ba7f9d", "5976283e", "dc0bdc81", "0c340d8a", "d5e3a0b3", "ea074555", "cf9d0968", "34d13a37",
      "31b3adb9", "ff1aa446", "2b64b02d", "6350d5eb", "3711898c", "158c36c6", "56eb2361", "ea8b7410",
      "92668e68", "3039dc68", "9ca7106b", "399b468f", "80b7b71d", "cc715eb8", "31f35fe1", "8fec7ca1",
      "08eae8f4", "6d0b9f4c", "a92d3fa7",
    ],
    [T.med]: [
      "963e7f9d", "967cb9be", "29606449", "125bd746", "25d3f4f8", "4e114854", "069f75de", "e9839217",
      "f6ba97d0", "ad662ada", "9ddbb67f", "b9e9dbab", "46d36cda", "63fa8ac7",
    ],
    [T.centres]: [
      "b6dffeee", "c26beb6f", "32e236ee", "8aebfbe5", "379f6964", "819651b0", "49d3abc7", "702b91cd",
      "41bdca3f", "cf26e699", "306e99b7", "e6ae6394", "391c6535", "4305f0f3", "a6cdbe6c", "8bac8085",
    ],
    [T.rules]: ["82476d69", "9ba93115", "355f7dbf", "072819de", "2570ea12", "e5c21bb0"],
  },
  expected: {
    [T.angles]: 11,
    [T.ineq]: 10,
    [T.congr]: 13,
    [T.prop]: 17,
    [T.area]: 15,
    [T.pyth]: 22,
    [T.alt]: 27,
    [T.med]: 14,
    [T.centres]: 16,
    [T.rules]: 6,
  },
  total: 151,
};

export default plan;
