import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_LOG_SPA_CHAPTER: ChapterNote = {
  chapterName: "Spatial and Sequence Reasoning",
  title: "Spatial and Sequence Reasoning: Patterns, Clocks, Cubes and Plans",
  intro:
    "Spatial and Sequence Reasoning has 28 past questions since 2011, and the ministry papers from 2023 on have asked 4 of them. " +
    "Most of the Cambridge items were drawings to compare: nets, views, pieces to fit together, mirrored displays. " +
    "The ministry items need no picture at all and come down to one rule applied carefully, such as a painted-cube count, a seating plan, a clock hand turning, or a number sequence. " +
    "The difficulty is rarely the arithmetic: it is an off-by-one count, a left and right seen from the wrong side, or a rule that fits only the first few terms.",
  subtopicOrder: [
    "imat-spa-numbers",
    "imat-spa-letters",
    "imat-spa-clocks",
    "imat-spa-reflections",
    "imat-spa-solids",
    "imat-spa-grids",
  ],
};
