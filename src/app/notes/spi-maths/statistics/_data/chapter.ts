import type { ChapterNote } from "@/app/notes/_types";

export const SPI_STATISTICS_CHAPTER: ChapterNote = {
  chapterName: "Statistics",
  title: "Statistics: SPI Mathematics",
  intro:
    "Statistics has 48 questions in the SPI bank, and one of them is from the 2022 paper. " +
    "Only two are HARD and 35 are EASY: most give a list or a few totals and ask for one average in a single step. " +
    "The marks are lost on small details, such as whole numbers starting at 0, the cumulative frequency of the class before the median class, and the 3 that goes with the median in the empirical relation.",
  cardBlurb:
    "The mean of a list, median and mode, class marks, the assumed mean and step deviation methods, the median and mode formulas, the empirical relation and graphs.",
  subtopicOrder: [
    "spi-st-mean",
    "spi-st-median-mode",
    "spi-st-grouped-mean",
    "spi-st-grouped-median",
    "spi-st-relation",
  ],
};
