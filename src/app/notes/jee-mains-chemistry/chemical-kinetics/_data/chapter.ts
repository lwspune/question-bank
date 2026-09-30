import type { ChapterNote } from "@/app/notes/_types";

export const JEE_CH_KIN_CHAPTER: ChapterNote = {
  chapterName: "Chemical Kinetics",
  title: "Chemical Kinetics — JEE Mains Chemistry",
  intro:
    "Chemical Kinetics has 126 past-year questions from 2021 to 2026, and 80 of them ask for a number rather than an option. " +
    "Two equations carry more than half the bank: the first-order law, k = (2.303/t) log([A]₀/[A]) with t½ = 0.693/k, and the Arrhenius equation, k = A e^(−Ea/RT). " +
    "The rest is bookkeeping — dividing a rate by its coefficient, working out a partial pressure from a total pressure, or reading an order from a table, a half-life or a graph. " +
    "The pages build in that order, because finding an order from a half-life needs both the zero-order and the first-order laws first. " +
    "Keep log 2 = 0.301, log 3 = 0.477 and ln 10 = 2.303 at hand: most answers are nearest-integer numbers.",
  subtopicOrder: [
    "jch-kin-rate",
    "jch-kin-rate-law",
    "jch-kin-first-order",
    "jch-kin-gas-decay",
    "jch-kin-zero-order",
    "jch-kin-arrhenius",
    "jch-kin-mechanism",
  ],
};
