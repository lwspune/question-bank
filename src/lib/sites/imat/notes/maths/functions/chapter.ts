import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_MAT_FUN_CHAPTER: ChapterNote = {
  chapterName: "Functions",
  title: "Functions: Domain, Graphs and Inverses",
  intro:
    "Functions has 5 past questions since 2011, and the ministry papers from 2023 on have asked 4 of them. " +
    "So the topic now comes up about once a year, and each item is short: evaluate a function, find where a quadratic turns or which point it passes through, invert a logarithm or an exponential, or say where a function is positive. " +
    "The difficulty sits in the details: the domain of a logarithm, the sign inside a bracket, and the difference between an inverse and a reciprocal. " +
    "Know the shapes of the standard graphs by heart and most of these items take a minute.",
  subtopicOrder: ["imat-fun-basics", "imat-fun-graphs", "imat-fun-inverse-transform"],
};
