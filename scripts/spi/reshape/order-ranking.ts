/**
 * Reshape plan: SPI Reasoning "Order, Ranking and Arrangement" (5 q), for scripts/spi/reshape.ts.
 *
 * Read all 5 stems and solutions (2026-10-22). One rank-from-top-and-bottom item (Sample Paper GAT
 * Q73) and one 2022 puzzle set of four (Q59-62: incomes and professions in a family). One page.
 * The 2022 puzzle names EIGHT people (P to W) for "seven members", so as printed one person has no
 * profession and an unplaced income: f8ef57c9 (the third lady is not fixed by any reading),
 * 6ee239e1 and 599e9b70 hold only on the seven-member reading. Featured from the set: 48629ecf
 * (Q earns the least), which holds on every reading.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  ranks: "Ranks and Order Puzzles",
} as const;

const plan: ReshapePlan = {
  chapter: "Order, Ranking and Arrangement",
  order: [T.ranks],
  byPrefix: {
    [T.ranks]: ["fed3152e", "f8ef57c9", "48629ecf", "6ee239e1", "599e9b70"],
  },
  expected: {
    [T.ranks]: 5,
  },
  total: 5,
};

export default plan;
