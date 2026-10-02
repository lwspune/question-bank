import type { ChapterNote } from "@/app/notes/_types";

export const CDSEN_RC_CHAPTER: ChapterNote = {
  chapterName: "Reading Comprehension",
  title: "Reading Comprehension — CDS English",
  intro:
    "Reading Comprehension has 288 past-year questions in CDS English, in all 20 sittings from 2017 to 2026. " +
    "Most are passage items: find the line a question points to, then pick the option that says it in other words without changing the claim. " +
    "Since 2024 (I) every paper has also carried a newer format, two sentences S1 and S2 and a question about how they relate, with no passage at all; it has 50 questions so far and its own method on the last two pages. " +
    "The early pages build the reading habit that every later page relies on.",
  subtopicOrder: [
    "cdsen-rca-locating",
    "cdsen-rca-definitions-reasons",
    "cdsen-rca-option-traps",
    "cdsen-rca-word-meaning",
    "cdsen-rca-word-hunts",
    "cdsen-rcb-phrases",
    "cdsen-rcb-inference",
    "cdsen-rcb-reasons",
    "cdsen-rcb-main-idea",
    "cdsen-rcb-pairs-core",
    "cdsen-rcb-pairs-wider",
  ],
};
