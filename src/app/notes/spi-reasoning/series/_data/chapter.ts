import type { ChapterNote } from "@/app/notes/_types";

export const SPI_SERIES_CHAPTER: ChapterNote = {
  chapterName: "Series",
  title: "Series: SPI Reasoning",
  intro:
    "Series has 5 questions in the SPI bank, all from the 2022 paper: two ask for a missing term and three for the wrong term in a row of numbers. " +
    "None needs more than Class 10 arithmetic. Each is cracked by writing the differences under the row, dividing when the terms grow fast, or spotting squares with one added or taken away, and then checking the answer against every term.",
  cardBlurb:
    "Differences that stay the same, grow or run through the primes, multipliers that rise by one, squares plus or minus one, and two series woven together.",
  subtopicOrder: ["spi-rss-numbers"],
};
