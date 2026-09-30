import type { ChapterNote } from "@/app/notes/_types";

export const JEE_DIFFERENTIATION_CHAPTER: ChapterNote = {
  chapterName: "Differentiation",
  title: "Differentiation — JEE Mains Mathematics",
  intro:
    "Differentiation has 77 past-year questions from 2021 to 2026, and 24 of them have a numerical answer rather than options. " +
    "About half the questions compute a derivative, usually after a simplification, a substitution or a logarithm has made it short. " +
    "The other half ask whether a derivative exists — where pieces join, where a modulus or a maximum has a corner, and where the greatest integer function jumps.",
  subtopicOrder: [
    "jee-diff-chain",
    "jee-diff-implicit",
    "jee-diff-functional",
    "jee-diff-piecewise",
    "jee-diff-counting",
  ],
};
