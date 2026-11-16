/**
 * Reshape plan: SSC CGL TIER II Computer Knowledge "Internet and E-mail" (22 q), for scripts/ssc-cgl/reshape.ts.
 * Read all 22 stems and keys (2026-11-15); every key agreed. E-mail, browsing and protocols on one page.
 */
import type { ReshapePlan } from "../reshape";

const T = { net: "E-mail, Browsers and Internet Protocols" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Computer Knowledge",
  chapter: "Internet and E-mail",
  order: [T.net],
  byPrefix: {
    [T.net]: [
      "18282122", "50e7f659", "67e7a355", "75c85faf", "a58b0dbe", "ed64d35b", "7d7a9efa", "9584022a", "9c8a33fa", "cba40e11",
      "24724b55", "69a2e9a3", "75512f2b", "8a1d4123", "a1f2218e", "0597ed36", "25fb604c",
      "3e82d3a2", "d2180f9b", "b56a1a10", "f5d8aa07", "936899c6",
    ],
  },
  expected: { [T.net]: 22 },
  total: 22,
};

export default plan;
