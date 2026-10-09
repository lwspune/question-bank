import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_MAT_EQI_CHAPTER: ChapterNote = {
  chapterName: "Equations and Inequalities",
  title: "Equations and Inequalities",
  intro:
    "Equations and Inequalities has 16 past questions since 2011, and the ministry papers from 2023 on have asked 7 of them. " +
    "Since 2023 the weight has moved to inequalities (quadratic, fractional, and with an absolute value), with the answer given as an interval or as ℝ or ∅. " +
    "The work is algebra by hand, and nearly every question starts with factorising. " +
    "The difficulty sits in the details that change the answer set: flipping the sign when multiplying by a negative, excluding values that make a denominator zero, and checking solutions after squaring.",
  subtopicOrder: [
    "imat-eqi-expressions",
    "imat-eqi-linear",
    "imat-eqi-quadratics",
    "imat-eqi-inequalities",
    "imat-eqi-special-equations",
  ],
};
