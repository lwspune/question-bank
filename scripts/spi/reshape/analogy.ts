/**
 * Reshape plan: SPI "Analogy" (5 q), for scripts/spi/reshape.ts.
 *
 * Read all 5 stems and solutions (2026-11-22). The chapter reached 5 questions with the 2026 paper
 * (Q148 repeats Sample Paper GAT Q74 almost word for word, as its own row). One page: number rules
 * and word links.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  analogies: "Number and Word Analogies",
} as const;

const plan: ReshapePlan = {
  chapter: "Analogy",
  order: [T.analogies],
  byPrefix: {
    [T.analogies]: ["0347256a", "79bcd1e5", "897204c4", "d0bfb9e7", "f4f17c4d"],
  },
  expected: {
    [T.analogies]: 5,
  },
  total: 5,
};

export default plan;
