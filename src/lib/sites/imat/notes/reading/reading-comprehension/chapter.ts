import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_REA_RDC_CHAPTER: ChapterNote = {
  chapterName: "Reading Comprehension",
  title: "Reading Comprehension: Reading What the Text Supports",
  intro:
    "Reading Comprehension has 9 past questions since 2011, and the ministry papers from 2023 on have asked 9 of them. " +
    "It belongs entirely to the current format: the ministry papers open with short passages, often translated from Italian essays, articles or medicine leaflets, each followed by one question. " +
    "The work is careful reading, not knowledge, and the 2026 papers say so: answer only from what the text states or implies. " +
    "The difficulty sits in the options, which reuse the passage's own words while adding a claim, dropping a 'may', reversing a cause, or giving the right idea with a wrong second half.",
  subtopicOrder: ["imat-rdc-supported", "imat-rdc-negative-cause", "imat-rdc-technical", "imat-rdc-author"],
};
