/**
 * Reshape plan — CDS "Circles" (69 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 69 stems AND solutions (2026-09-29). The cut is by the theorem a solution uses.
 * "Tangents and Secants" split: the tangent-length and tangent-angle rows keep a page, and the
 * tangent-secant rule PT^2 = PA.PB joins the intersecting-chords rows as power of a point.
 * "Two Circles and Common Tangents" split into common tangents/chords and touching circles (the
 * two circles-in-an-angle rows join the latter). The three-point, circumcircle and locus rows share
 * a page. Premise sets 767620fe (tangents meeting at P) and 6f3def7e (two chords, radius 50)
 * each move whole.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  chords: "Chords and Perpendiculars",
  angles: "Angles in a Circle",
  circum: "Circumcircle and Locus",
  tangents: "Tangents from an External Point",
  power: "Intersecting Chords and Power of a Point",
  common: "Common Tangents and Common Chords",
  touching: "Touching Circles",
} as const;

const plan: ReshapePlan = {
  chapter: "Circles",
  order: [T.chords, T.angles, T.circum, T.tangents, T.power, T.common, T.touching],
  whole: {},
  byPrefix: {
    [T.chords]: [
      "1203c71a", "47b4cfa2", "8a0c4669", "5b2673c0", "2be7f183", "80093bb2", "4158b9fc", "3c7c7bec",
      "cfb0e951", "fcd77cd0", "c00005b3", "c975428d", "83762202", "27472f08", "0b60f4b2",
    ],
    [T.angles]: [
      "3140a42e", "6b6e2839", "7d9db3ca", "9e422408", "423c1533", "32407f42", "9044fc8b", "f8d57c74",
      "7fedeee0", "2df2acd1", "cf1eb95e", "ac0c48cf", "4fb2efce",
    ],
    [T.circum]: [
      "5e9120b1", "815de069", "b8e657e5", "f6333d0e", "d02e8f9c", "63dead92", "a62c62ad", "c0fd8d8f",
      "1b13fa90",
    ],
    [T.tangents]: [
      "22044f2d", "c3e0b095", "4700898c", "98fc0aa4", "fa94d6f6", "ca02842f", "80e1c0f9", "d1e83edb",
      "d5134fd8", "22f6100d", "f39dea31",
    ],
    [T.power]: ["2e842463", "becc7160", "31949398", "8cd09ce0", "6da186ef"],
    [T.common]: ["5639c1c0", "8d42a64f", "494e86cf", "676acb1a", "e80dd1c3", "53bbc551"],
    [T.touching]: [
      "eaed60a7", "d06878e0", "67aac5c0", "8b15ac0b", "206aa3e0", "5cdf03da", "ab6d4af0", "721b8e3e",
      "7c12fb0b", "ca489b98",
    ],
  },
  expected: {
    [T.chords]: 15,
    [T.angles]: 13,
    [T.circum]: 9,
    [T.tangents]: 11,
    [T.power]: 5,
    [T.common]: 6,
    [T.touching]: 10,
  },
  total: 69,
};

export default plan;
