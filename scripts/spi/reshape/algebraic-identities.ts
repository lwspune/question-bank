/**
 * Reshape plan: SPI "Algebraic Identities and Simplification" (16 q), for scripts/spi/reshape.ts.
 *
 * Read all 16 stems and solutions (2026-10-22). The ingest filed them under 16 one-off subtopics.
 * Cut here by what the identity is used for: factorising (common factor and grouping, the
 * (x + a)(x + b) product, perfect squares, the difference of two squares) and finding a value
 * (x² + y² and x³ + y³ from the sum and product, the three-term identities under a + b + c = 0, and
 * a chain of brackets that cancels). Never featured: 2685f550 (option prints "P" for p), 30131a86
 * (option D prints "B"), 332bce4b and 5df9347f (print "X" for x), 2afccf0a (options print "B" for b).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  factorising: "Factorising with Common Factors and Identities",
  values: "Finding Values with Identities",
} as const;

const plan: ReshapePlan = {
  chapter: "Algebraic Identities and Simplification",
  order: [T.factorising, T.values],
  byPrefix: {
    [T.factorising]: [
      "2a372fbe", "2685f550", "2afccf0a", "5df9347f", "9b7f77a1", "332bce4b", "18a95d41", "30131a86",
      "49c45c49", "a95772d4", "829712e4",
    ],
    [T.values]: ["9e22c57d", "00e0d8a8", "09520ab3", "0a10659f", "f9920bc5"],
  },
  expected: {
    [T.factorising]: 11,
    [T.values]: 5,
  },
  total: 16,
};

export default plan;
