import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_LOG_DED_CHAPTER: ChapterNote = {
  chapterName: "Deductive Logic",
  title: "Deductive Logic: Statements, Conditionals and Puzzles",
  intro:
    "Deductive Logic has 13 past questions since 2011, and the ministry papers from 2023 on have asked 6 of them. " +
    "That is close to one in every paper, and the ministry items are short: a statement or two, then one question about what can be deduced. " +
    "No outside knowledge is needed, only exact reading of small words such as all, some, only if and unless. " +
    "The difficulty sits in the options, where a statement that is true in real life, or the converse of the given rule, waits beside the one conclusion that actually follows.",
  subtopicOrder: [
    "imat-ded-statements",
    "imat-ded-conditionals",
    "imat-ded-syllogisms",
    "imat-ded-puzzles",
  ],
};
