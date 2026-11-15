/**
 * Reshape plan: SSC CGL TIER II "Trigonometric Ratios and Identities" (56 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 56 stems and solutions (2026-11-15); every key re-derived and agreed. The ingest filed them
 * under nine subtopics, five of them with 1 to 5 rows. Cut by technique, in teaching order: the
 * standard values and the simple equations that land on a standard angle (one new name, "Standard
 * Values and Simple Equations", since Tier II has no radian rows); all six ratios from one ratio or one
 * named triangle; complementary angles (with the two rows that find an angle from a pair and the one
 * allied angle); and identities, the largest page, which also takes the four sec ± tan rows, the power
 * identity row and the one elimination row, too few on Tier II for pages of their own. Nothing is
 * flawed; every row may be featured.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  values: "Standard Values and Simple Equations",
  triangle: "Ratios in a Right Triangle",
  complementary: "Complementary and Allied Angles",
  identities: "Simplifying and Proving Identities",
} as const;

const plan: ReshapePlan = {
  tier: 2,
  chapter: "Trigonometric Ratios and Identities",
  order: [T.values, T.triangle, T.complementary, T.identities],
  byPrefix: {
    [T.values]: ["fc6d246c", "41900a3b", "4d033b96", "f35910ae", "a8568a5e", "43f3b2bf", "6124efca", "a36c3326"],
    [T.triangle]: [
      "b2734feb", "b712e43c", "dd33de41", "da28f209", "31c250b8", "13887388", "878f093b", "8fbee843",
      "55740233", "a6229b4a", "4432c8d7",
    ],
    [T.complementary]: [
      "57e2c7d3", "02524792", "1912aa1a", "b9ffd406", "cc8bde4f", "24f168d3", "94291413", "d1a43c54", "1f24cbe5",
      "46bd4582", "53f95171", "675bb102",
    ],
    [T.identities]: [
      "348be099", "58431438", "58bc5e6f", "85f359a8", "3f419737", "7df2bfea", "5a073005", "92a6ad52", "98fbd85d",
      "a95ec1b3", "bc1d37e4", "fa9056fd", "7ce31ca1", "a0938822", "a135696f", "ab76e908", "bacef8e2", "ddb6a620",
      "63575563", "c10dba83",
      "de614c60", "efde88ec", "aff0d3c9", "6fa339dc",
      "b51f01a1",
    ],
  },
  expected: { [T.values]: 8, [T.triangle]: 11, [T.complementary]: 12, [T.identities]: 25 },
  total: 56,
};

export default plan;
