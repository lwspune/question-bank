/**
 * Reshape plan: SPI "Linear Equations" (29 q), for scripts/spi/reshape.ts.
 *
 * Read all 29 stems and solutions (2026-10-22). The ingest filed them under 22 one-off subtopics.
 * Cut here by what the question asks you to do: solve (one variable, a linear inequality, a pair by
 * elimination), read a pair's graph (a straight line, the three cases and the ratio test, the value of
 * k that gives a chosen case), and turn words into equations (one unknown, a chain of comparisons
 * such as ages and heights, two unknowns). Never featured: 1cd4d003 (two printed options are correct,
 * C and D are both the given equation times 5; its solution carries a Note saying so).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  solving: "Solving Linear Equations",
  consistency: "Graphs and Consistency of a Pair",
  word: "Word Problems on Linear Equations",
} as const;

const plan: ReshapePlan = {
  chapter: "Linear Equations",
  order: [T.solving, T.consistency, T.word],
  byPrefix: {
    [T.solving]: ["026e6f1c", "fa6d0ca7", "d3bbd6b7", "d79c81a9", "36d5995c", "3e2f0154", "aa7fba24", "d9f22afa"],
    [T.consistency]: [
      "abfda0ab", "8a3b74f3", "dd456c20", "6ca1df2f", "e25e9413", "68a3f197", "10a2c31e", "f3ade418",
      "904da206", "de83b1e9", "8dd6eeef", "692abb53", "c75fb9bd", "1cd4d003",
    ],
    [T.word]: ["a2ddb0fe", "db28ef27", "1fcfe093", "40b06fe4", "ce443e7f", "39675fa3", "bda137c0"],
  },
  expected: {
    [T.solving]: 8,
    [T.consistency]: 14,
    [T.word]: 7,
  },
  total: 29,
};

export default plan;
