import type { ChapterNote } from "@/app/notes/_types";

export const SPI_GRAMMAR_CHAPTER: ChapterNote = {
  chapterName: "Grammar",
  title: "Grammar: SPI English",
  intro:
    "Grammar has 108 questions in the SPI bank: five from the 2022 paper and eleven from the 2026 paper. " +
    "Most are short and fair: 73 are EASY, 33 MODERATE and only 2 HARD. " +
    "Almost half (52) ask you to change the voice of a sentence or turn spoken words into reported speech, and both of those rest on knowing the tenses well. " +
    "So start with the tenses and move through the pages in order: each one uses only what the pages before it have taught.",
  cardBlurb:
    "Tenses, modals, subject and verb agreement, conjunctions, a, an and the, prepositions, active and passive voice, and direct and indirect speech.",
  subtopicOrder: [
    "spi-gr-tenses",
    "spi-gr-agreement",
    "spi-gr-articles",
    "spi-gr-prepositions",
    "spi-gr-passive",
    "spi-gr-passive-special",
    "spi-gr-speech",
    "spi-gr-speech-questions",
  ],
};
