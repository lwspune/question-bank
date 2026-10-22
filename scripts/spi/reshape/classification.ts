/**
 * Reshape plan: SPI Reasoning "Classification" (6 q), for scripts/spi/reshape.ts.
 *
 * Read all 6 stems and solutions (2026-10-22). All six are 2022 Q45-50, "find the odd number or odd
 * set of numbers", filed under three one-off subtopics. One page: single numbers tested against
 * number facts (prime, square, digit sum), and pairs or sets where a rule links the numbers inside.
 * Never featured: 6ec6ea4d (two rules fit: 683 by digit sum, 478 as the only even number and the
 * only non-prime).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  odd: "Odd One Out",
} as const;

const plan: ReshapePlan = {
  chapter: "Classification",
  order: [T.odd],
  byPrefix: {
    [T.odd]: ["2d091d5c", "373dedf1", "6ec6ea4d", "63a3bdd7", "a5db0aa9", "7c795fe8"],
  },
  expected: {
    [T.odd]: 6,
  },
  total: 6,
};

export default plan;
