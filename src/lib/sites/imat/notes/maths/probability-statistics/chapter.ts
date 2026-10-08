import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_MAT_PST_CHAPTER: ChapterNote = {
  chapterName: "Probability and Statistics",
  title: "Probability and Statistics: Counting, Chance and Averages",
  intro:
    "Probability and Statistics has 11 past questions since 2011, and the ministry papers from 2023 on have asked 3 of them. " +
    "All three were probability with dice or with balls drawn from a bag, with or without putting the first ball back; the older papers leaned more on averages and on counting arrangements. " +
    "Every item is a short calculation, so the difficulty sits in the setting up: listing outcomes without missing or double counting any, multiplying along the right branches, and remembering that a bag holds one ball fewer for the second draw. " +
    "For averages, the key move is almost always to turn a mean back into a total.",
  subtopicOrder: ["imat-pst-counting", "imat-pst-probability", "imat-pst-statistics"],
};
