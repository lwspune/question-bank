import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_MAT_TRG_CHAPTER: ChapterNote = {
  chapterName: "Trigonometry",
  title: "Trigonometry: Ratios, Graphs and Equations",
  intro:
    "Trigonometry has 4 past questions since 2011, and the ministry papers from 2023 on have asked 3 of them. " +
    "Each one rests on a small set of facts: which side goes with sine and which with cosine, the exact values at the standard angles, the signs in each quadrant, and the fact that sine and cosine never leave the interval from minus 1 to 1. " +
    "The harder items are equations, where you must count every solution in a given range, and expressions that turn into a quadratic in sin x. " +
    "No calculator is allowed, so the exact values must be automatic.",
  subtopicOrder: ["imat-trg-ratios", "imat-trg-graphs-equations"],
};
