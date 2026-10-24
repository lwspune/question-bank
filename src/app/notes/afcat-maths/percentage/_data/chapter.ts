import type { ChapterNote } from "@/app/notes/_types";

export const AF_PC_CHAPTER: ChapterNote = {
  chapterName: "Percentage",
  title: "Percentage: AFCAT Numerical Ability",
  intro:
    "Percentage is one of the largest chapters of AFCAT Numerical Ability, and fourteen of its questions come from AFCAT papers of 2015 to 2019." +
    "More than half of those fourteen are successive changes: a price cut and then restored, a budget held fixed while the price moves, a cheaper price that buys a few kilograms more. " +
    "The practice questions carry percentages into shop prices, mixtures and journeys, but the method does not change: write every change as a factor, and keep track of which number is the base. " +
    "About one question in six is HARD, and most of those sit in the later pages, where the percentage is one step inside a longer problem.",
  cardBlurb:
    "Percentages and fractions, percentage change, successive changes, price and consumption, population growth, budgets and groups, marks and elections, profit and discount, mixtures, interest, work and speed.",
  subtopicOrder: [
    "af-pc-basics",
    "af-pc-change",
    "af-pc-successive",
    "af-pc-growth",
    "af-pc-shares",
    "af-pc-marks",
    "af-pc-profit",
    "af-pc-mixtures",
    "af-pc-rates",
  ],
};
