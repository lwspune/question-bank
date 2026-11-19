/**
 * Reshape plan: Homi Bhabha Std IX "Matter and Its Nature" (17 q, every paper but 2018), for
 * scripts/homi-bhabha/reshape.ts (2026-11-19).
 *
 * Read all 17 stems and solutions. The ingest filed them under five subtopics; cut here by what a
 * question asks: the states of matter and changes of state, elements, compounds and mixtures with
 * solutions and colloids, and the methods of separating mixtures. Never featured (each carries a
 * notice): 126f0bbc (honey can also be a colloid), 64e6f74a (a line of the stem is cut off).
 * 8a44c4d3 ("gelatin: sol", "soap paper") and 4e2626a6 ("platinum nitrate" as a complex) are loose
 * as printed, so not featured either.
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  states: "States of Matter",
  composition: "Elements, Compounds and Mixtures",
  separation: "Separating Mixtures",
} as const;

const plan: ReshapePlan = {
  subject: "Chemistry",
  chapter: "Matter and Its Nature",
  order: [T.states, T.composition, T.separation],
  byPrefix: {
    [T.states]: ["316d9efe", "574c441d", "003ff18c", "9fefb08d", "5a4050b7"],
    [T.composition]: ["9e701f53", "4e2626a6", "dceac300", "0c8d0e46", "126f0bbc", "8a44c4d3"],
    [T.separation]: ["640e5f2d", "907ff80b", "64e6f74a", "6a55e794", "d14a2230", "5eebb0bc"],
  },
  expected: { [T.states]: 5, [T.composition]: 6, [T.separation]: 6 },
  total: 17,
};

export default plan;
