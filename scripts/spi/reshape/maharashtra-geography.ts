/**
 * Reshape plan: SPI "Maharashtra Geography" (5 q), for scripts/spi/reshape.ts.
 *
 * Read all 5 stems and solutions (2026-10-22). They are one set from the 2022 paper (Q76 to Q80):
 * a pair of Maharashtra districts, name the river on the boundary between them. One page.
 * Every key checks out; 8666cbff (Ahmednagar and Beed) is keyed "None of these" because none of
 * Godavari, Bhima and Nira lies between those two districts.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  rivers: "Rivers on District Boundaries",
} as const;

const plan: ReshapePlan = {
  chapter: "Maharashtra Geography",
  order: [T.rivers],
  byPrefix: {
    [T.rivers]: ["8666cbff", "77c7c380", "4102a755", "5f8d1a13", "30da71f6"],
  },
  expected: {
    [T.rivers]: 5,
  },
  total: 5,
};

export default plan;
