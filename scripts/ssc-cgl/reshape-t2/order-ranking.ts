/**
 * Reshape plan: SSC CGL TIER II Reasoning "Order, Ranking and Arrangement" (15 q), for scripts/ssc-cgl/reshape.ts.
 * Read all 15 stems and keys (2026-11-15); every key agreed. Ranks, seating and schedules on one page.
 */
import type { ReshapePlan } from "../reshape";

const T = { order: "Ranks, Seats and Schedules" } as const;

const plan: ReshapePlan = {
  tier: 2,
  subject: "Reasoning",
  chapter: "Order, Ranking and Arrangement",
  order: [T.order],
  byPrefix: {
    [T.order]: [
      "30a6e6e7", "3c5a7449", "5089567f", "2d9aec52", "9fb25b23", "3b595168",
      "71435a7c", "7ecc69de", "cb59ad8d", "341a25e6", "464b233b", "760d1a8f",
      "e594ab98", "257eb673", "76007c8e",
    ],
  },
  expected: { [T.order]: 15 },
  total: 15,
};

export default plan;
