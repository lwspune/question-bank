/**
 * Reshape plan: SPI Reasoning "Series" (5 q), for scripts/spi/reshape.ts.
 *
 * Read all 5 stems and solutions (2026-10-22). All five are 2022 number series (Q22, Q29-32): a
 * missing term or a wrong term, filed under three one-off subtopics. One page: differences
 * (constant, rising by 2, consecutive primes), a multiplier that rises by one, and squares plus or
 * minus one, including two series woven together. Every key re-derived; none disputed.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  numbers: "Number Series",
} as const;

const plan: ReshapePlan = {
  chapter: "Series",
  order: [T.numbers],
  byPrefix: {
    [T.numbers]: ["8330e981", "27b75cfe", "5e4e01d1", "8d1dd538", "68c9085b"],
  },
  expected: {
    [T.numbers]: 5,
  },
  total: 5,
};

export default plan;
