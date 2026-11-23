import type { ChapterNote } from "@/app/notes/_types";

export const HSC_MA_LR_CHAPTER: ChapterNote = {
  chapterName: "Linear Programming",
  title: "Linear Programming: Maharashtra HSC Mathematics",
  intro:
    "Linear Programming has 123 questions in this bank: every exercise and solved example of Chapter 7 in the Balbharati Part I textbook, and the board's past papers from 2015 to 2026. " +
    "Fifteen were set in board papers, at least one in every year of that span except 2021, and all but one ask for a written answer. " +
    "Most of them ask for a linear programming problem solved by the graphical method, a few starting from a word problem that must first be formulated. " +
    "Every board question from 2023 to 2026 is a textbook exercise or solved example, so working through the exercises is the surest preparation. " +
    "Marks go to the steps: the intercepts and the origin test for each line, a feasible region drawn and shaded with its corners labelled, the working for each point where two lines meet, a table of z at every corner, and a last line that names the maximum or minimum and where it occurs.",
  cardBlurb:
    "Graphing linear inequations and feasible regions, formulating a linear programming problem from a word problem, and solving it by the corner-point method, including unbounded regions and infinitely many optimal solutions.",
  subtopicOrder: ["hscm-lr-inequations", "hscm-lr-formulation", "hscm-lr-graphical"],
};
