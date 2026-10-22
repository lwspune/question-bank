/**
 * Reshape plan: SSC CGL Tier I "Averages" (89 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 89 stems and solutions (2026-10-23). The ingest filed them under three subtopics, and
 * "Sum and Mean" (51 rows) mixed four methods. Cut here by the method that solves the row: sum and
 * count (plus the assumed-average trick and pair averages); a member joining or leaving (the count
 * changes); a replacement or a wrong entry (the count stays); parts of a total (leftover members,
 * overlapping parts, a member tied to the average of all); weighted and combined averages (with the
 * missing group and alligation); and consecutive numbers (an AP's middle term, multiples in a range,
 * the first n naturals and their squares). Never featured: 70618263 and e9c0b00d (their solutions
 * open with a Note: the conditions cannot be met as printed).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  sum: "Sum and Mean",
  change: "Members Joining and Leaving",
  replace: "Replacements and Corrections",
  parts: "Parts of a Total",
  weighted: "Weighted and Combined Averages",
  sequences: "Averages of Consecutive Numbers",
} as const;

const plan: ReshapePlan = {
  chapter: "Averages",
  order: [T.sum, T.change, T.replace, T.parts, T.weighted, T.sequences],
  byPrefix: {
    [T.sum]: [
      "c2563ebe", "03d11dca", "d9ccce5f", "a3d8f300", "4010c610", "bcfa31c5", "8f861f33", "56baa8ca",
      "4160939d", "d6a8633c", "02b11f36",
      "1f29550b", "fd55419c", "c634184d",
    ],
    [T.change]: [
      "f920b891", "e194c104", "7bcebdaf", "d44d0267", "3db1fb91", "c654758c", "9b32b50f", "389cf77d",
      "b3f8c5da", "6f38dfae", "5f978079", "bc465ba8", "f03bbdb1", "37915303", "a511882b", "8aeead1c",
      "62860dbd", "c09dcffd", "6317528d", "9c52430f",
    ],
    [T.replace]: [
      "184cb993", "4056fab2", "d2e261f1", "e80127ea",
      "21e61845", "b653a1d0", "443e0e7e", "637799c7",
    ],
    [T.parts]: [
      "c1c10a32", "af626370", "e680404c", "2fc47cea",
      "5171cb60", "a89279e5",
      "cdd3d695", "d33ff397",
    ],
    [T.weighted]: [
      "7913a94b", "59563764", "3ff6f2c6", "bf6e4208", "5e87cb93", "9d522148", "78ce0bac", "92454ed4",
      "cddfab60", "5cc34d30", "f14cbff1", "24454910", "d4f9fd5d", "a9c81396", "a6cb870b",
      "a2511a95", "3eb748a1", "10467d93", "2901dfb8",
      "d3897baa", "df2c2463", "cc27a0c5", "50b20a46",
      "2e6cc227", "1bb9ac8e", "bf2a31c6", "7d34266d",
    ],
    [T.sequences]: [
      "188747d1", "e0ff056d", "f7341154", "70618263", "e9c0b00d",
      "a5a43902", "c2e1b383", "5925eec4", "4d314205",
      "24d23b49", "cc50ea9a", "79f1afc0",
    ],
  },
  expected: {
    [T.sum]: 14,
    [T.change]: 20,
    [T.replace]: 8,
    [T.parts]: 8,
    [T.weighted]: 27,
    [T.sequences]: 12,
  },
  total: 89,
};

export default plan;
