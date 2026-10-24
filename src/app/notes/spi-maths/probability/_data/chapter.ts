import type { ChapterNote } from "@/app/notes/_types";

export const SPI_PROBABILITY_CHAPTER: ChapterNote = {
  chapterName: "Probability",
  title: "Probability: SPI Mathematics",
  intro:
    "Probability has 59 questions in the SPI bank, more than any other Mathematics chapter, and two of them are from the 2022 paper. " +
    "None is HARD and only nine are MODERATE: almost every one is a single count of favourable outcomes over equally likely ones. " +
    "The marks are lost in the counting, not the formula, so these pages teach what to list for a die, a pair of dice, a deck and a bag.",
  cardBlurb:
    "Favourable over total, the faces of a die, coins, the 36 outcomes of two dice, the complement, the 52-card deck, bags, odds and expected counts.",
  subtopicOrder: [
    "spi-pr-coins-die",
    "spi-pr-rules",
    "spi-pr-two-dice",
    "spi-pr-cards-bags",
    "spi-pr-expected",
  ],
};
