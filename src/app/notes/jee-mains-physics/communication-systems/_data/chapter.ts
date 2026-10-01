import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_COMM_CHAPTER: ChapterNote = {
  chapterName: "Communication Systems",
  title: "Communication Systems — JEE Mains Physics",
  intro:
    "Communication Systems has 63 past-year questions from 2021 to 2023, and 11 of them ask for a number rather than an option. " +
    "There has been no question on it since 2023: the chapter was dropped from the JEE Main syllabus, so these notes serve the older papers. " +
    "Nearly half the questions are on amplitude modulation, where two results do almost all the work: the modulation index and a bandwidth of twice the message frequency. " +
    "About a quarter are pure recall from NCERT's tables of bands, layers and terms, so learn those tables exactly. " +
    "The arithmetic is short everywhere. Marks are lost on reading ω as f, adding antenna heights before taking the roots, or using half a wavelength for an antenna instead of a quarter.",
  subtopicOrder: ["jph-comm-basics", "jph-comm-los", "jph-comm-am"],
};
