/**
 * Reshape plan: SSC CGL TIER II Reasoning "Series" (18 q), for scripts/ssc-cgl/reshape.ts.
 * Read all 18 stems and keys (2026-11-15); every key agreed. Number and letter series on one page.
 */
import type { ReshapePlan } from "../reshape";

const T = { series: "Number and Letter Series" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Reasoning",
  chapter: "Series",
  order: [T.series],
  byPrefix: {
    [T.series]: [
      "0feae8ee", "154b68bd", "8a2b826b", "9def946a", "07ada129", "373a25f3", "9ba5a767", "e4fd7d53",
      "25ca105a", "2663ebd9", "71f5b62f", "eee17b0c", "5baa6dfd", "0041890d", "f98a0473",
      "cb7478db", "b743aa54", "e27d80ba",
    ],
  },
  expected: { [T.series]: 18 },
  total: 18,
};

export default plan;
