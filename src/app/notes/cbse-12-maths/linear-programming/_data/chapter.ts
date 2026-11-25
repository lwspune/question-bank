import type { ChapterNote } from "@/app/notes/_types";

export const CB_MA_LP_CHAPTER: ChapterNote = {
  chapterName: "Linear Programming",
  title: "Linear Programming: CBSE Class 12 Mathematics",
  intro:
    "Linear Programming has 102 questions in this bank: every example and exercise of the NCERT chapter, and CBSE's board papers from 2023 to 2026. " +
    "Eighty-seven of them come from board papers, at least nineteen in each of those years. " +
    "Every year has a three-mark question that says \"solve graphically\", 2023, 2024 and 2026 also set it for five marks, and the one-mark questions ask for the terms, the number of corner points, the constraints of a shaded figure and the best of some given corners. " +
    "Marks go to the steps: draw every line with its equation, shade the feasible region and say whether it is bounded, show how each corner point was found, make a table of Z at every corner, and finish with the value and the point where it occurs. " +
    "On an unbounded region add the open half-plane check, and when two corners tie, give every point of the segment joining them.",
  cardBlurb:
    "Terms and theorems of linear programming, drawing and shading the feasible region, reading constraints off a graph, the corner point method, ties along an edge and the half-plane check for unbounded regions.",
  subtopicOrder: ["cbm-lp-graphical"],
};
