import type { ChapterNote } from "@/app/notes/_types";

export const CDSEN_CLOZE_CHAPTER: ChapterNote = {
  chapterName: "Cloze Test",
  title: "Cloze Test — CDS English",
  intro:
    "Cloze Test has 174 past-year questions in CDS English: a passage with ten blanks, sometimes two passages, in 14 of the 20 sittings from 2017 to 2025. " +
    "It did not appear in either 2024 or 2026 paper, so treat it as likely but not certain. " +
    "More than half of the blanks are decided by grammar alone, before meaning comes in: the word class the blank needs, the verb form, or the preposition its neighbour demands. " +
    "Learn to name the blank's slot first; meaning and the passage's logic settle the rest.",
  subtopicOrder: [
    "cdsen-cz-slot",
    "cdsen-cz-verbs",
    "cdsen-cz-prepositions",
    "cdsen-cz-collocations",
    "cdsen-cz-linkers",
    "cdsen-cz-meaning",
  ],
};
