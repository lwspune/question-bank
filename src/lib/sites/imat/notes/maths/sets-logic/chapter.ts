import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_MAT_SLG_CHAPTER: ChapterNote = {
  chapterName: "Sets and Logic",
  title: "Sets, Intervals and Logical Statements",
  intro:
    "Sets and Logic is the language the rest of IMAT mathematics is written in. " +
    "Recent papers give their answers as intervals, write ℝ for all real numbers and ∅ for no solution, and join conditions with ∧ and ∀, so reading these symbols quickly saves time on every algebra question. " +
    "Direct questions are rare and short: a definition such as the Cartesian product, or a count from a Venn diagram that needs the inclusion and exclusion rule. " +
    "The logical reasoning puzzles live in their own chapter; this one covers only the mathematical side.",
  subtopicOrder: ["imat-slg-sets", "imat-slg-logic"],
};
