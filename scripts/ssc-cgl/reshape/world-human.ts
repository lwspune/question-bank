/**
 * Reshape plan: SSC CGL Tier I General Awareness Geography "World and Human Geography" (27 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 27 rows (2026-11-01, main session). Seven small subtopics folded into two pages: world geography, and
 * population and settlements. Never featured: da76c88a and ab045050 (figures SSC's key takes from one source).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  world: "World Geography",
  human: "Population and Settlements",
} as const;

const plan: ReshapePlan = {
  subject: "Geography",
  chapter: "World and Human Geography",
  order: [T.world, T.human],
  byPrefix: {
    [T.world]: [
      "15d93399", "43dff6bc", "7bef8c13", "5873d474", "cad772c0", "2dcd1692", "3260512c", "d1611612",
      "da76c88a", "54ebc482", "e17dd641", "8b0e1a51", "74ba4f36", "20deb482", "ba210123", "7ec233fd",
    ],
    [T.human]: [
      "ab045050", "02b52196", "078cdf67", "27e6cb0c", "34cf2a04", "abaae5b4", "d9301844", "0f5f0baf",
      "96720936", "9c015acd", "b28d8c8d",
    ],
  },
  expected: {
    [T.world]: 16,
    [T.human]: 11,
  },
  total: 27,
};

export default plan;
