import type { ChapterNote } from "@/app/notes/_types";

export const SPI_SENTENCE_REARRANGEMENT_CHAPTER: ChapterNote = {
  chapterName: "Sentence Rearrangement",
  title: "Sentence Rearrangement: SPI English",
  intro:
    "Sentence Rearrangement has 13 questions in the SPI bank, five from the 2022 paper and three from the 2026 paper, and each is one sentence cut into four parts labelled P, Q, R and S. " +
    "Seven are EASY and six MODERATE, and none needs a hard word: the order is fixed by grammar. " +
    "Find the part that can open the sentence, glue the parts whose words must sit together, and let the joining words settle the rest. Then check the options, because one question from the 2022 paper has its right order missing.",
  cardBlurb:
    "The opening part, words that must sit together, joining words such as but, yet and while, and when to choose None of these.",
  subtopicOrder: ["spi-sr-opening", "spi-sr-linkers"],
};
