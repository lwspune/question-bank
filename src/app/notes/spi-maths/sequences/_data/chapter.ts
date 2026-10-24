import type { ChapterNote } from "@/app/notes/_types";

export const SPI_SEQUENCES_CHAPTER: ChapterNote = {
  chapterName: "Sequence and Series",
  title: "Sequence and Series: SPI Mathematics",
  intro:
    "Sequence and Series has 39 questions in the SPI bank, and three of them are from the 2022 paper. " +
    "Twenty-five are EASY, twelve MODERATE and only two HARD. " +
    "Thirty-six are about arithmetic progressions and rest on just two formulas, one for a term and one for a sum, so the marks are lost to small slips: n in place of n minus 1, a sum given when a term is asked, a sign dropped. " +
    "The other three go one step further, to geometric progressions and the two means.",
  cardBlurb:
    "Common difference, the nth term, terms from the end, three terms in AP, the two sum formulas, standard sums, sums written in n, GP and the AM and GM.",
  subtopicOrder: ["spi-sq-nth-term", "spi-sq-three-terms", "spi-sq-sum", "spi-sq-gp"],
};
