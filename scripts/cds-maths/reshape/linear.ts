/**
 * Reshape plan — CDS "Linear Equations" (40 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 40 stems AND solutions (2026-09-29). "Word Problems and Applications" (25) held two
 * kinds of story: ages (present ages from past and future relations, including three rows of the
 * 2023-II cousins set, whose other two rows are in Averages) and everything else (numbers,
 * fractions, money, bills), so each gets a page. "Consistency of Simultaneous Equations" (4) is
 * the other half of solving a system and joins "Solving Linear Systems".
 */
import type { ReshapePlan } from "../reshape";

const T = {
  systems: "Solving Linear Systems",
  word: "Word Problems and Applications",
  ages: "Age Problems",
  integral: "Integral Solutions and Diophantine Equations",
} as const;

const plan: ReshapePlan = {
  chapter: "Linear Equations",
  order: [T.systems, T.word, T.ages, T.integral],
  whole: {},
  byPrefix: {
    [T.systems]: ["6f76882b", "a06009a7", "e3cc1ab9", "ac634f79", "472b51ca", "a3a1d703", "e65d740f", "28587f4d", "03e309ef", "c2e91faa"],
    [T.word]: [
      "733287fe", "4ce21ee2", "8be83b8b", "0f76298a", "6ca058f4", "af3cc3c5", "0c83f853", "9ee31b5f",
      "b814cd6a", "ded1e460", "c9080ea6", "0a205225", "d4ab79e3",
    ],
    [T.ages]: [
      "56593e57", "82f98504", "faa5f629", "f1eddf14", "55510983", "45c30df2", "af807878", "8e194ca0",
      "5482c590", "5e4cfa9a", "1f290a0e", "f9238e42",
    ],
    [T.integral]: ["2c32dd9c", "b90e5385", "4266a7ed", "50036d94", "79a962da"],
  },
  expected: {
    [T.systems]: 10,
    [T.word]: 13,
    [T.ages]: 12,
    [T.integral]: 5,
  },
  total: 40,
};

export default plan;
