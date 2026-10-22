import type { ChapterNote } from "@/app/notes/_types";

export const SPI_READING_COMPREHENSION_CHAPTER: ChapterNote = {
  chapterName: "Reading Comprehension",
  title: "Reading Comprehension: SPI English",
  intro:
    "Reading Comprehension has 18 questions in the SPI bank, on three passages, and eight of them come from one passage in the 2022 paper. " +
    "Every question is answered from the passage alone, never from what you already know. " +
    "The easy ones point at a single line. The hard ones ask what a line suggests, or offer 'None of these' and 'Cannot be said', and they are lost by students who answer from their memory of the story instead of going back to the words.",
  cardBlurb:
    "Finding the line, cutting near-miss options, stated or implied or not given, and what the writer means by a line.",
  subtopicOrder: ["spi-rc-facts", "spi-rc-inference"],
};
