import type { ChapterNote } from "@/app/notes/_types";

export const AF_SS_CHAPTER: ChapterNote = {
  chapterName: "Sequence and Series",
  title: "Sequence and Series: AFCAT Numerical Ability",
  intro:
    "Sequence and Series has 94 practice questions in the AFCAT bank and no AFCAT past-year question yet; about a fifth of them are HARD. " +
    "The work is the same in every progression: one formula for a term and one for a sum, read forwards to find a value or backwards to find how many terms there are. " +
    "A harmonic progression brings no new formula, only a flip to an arithmetic progression and back. " +
    "Most marks here are lost to counting slips, such as taking n steps to reach the nth term, and to a flip that is never undone.",
  cardBlurb:
    "AP, GP and HP terms and sums, which term and how many terms, the sum to infinity, the three means and how they compare, and the standard sums of natural numbers, squares and cubes.",
  subtopicOrder: ["af-ss-ap", "af-ss-gp", "af-ss-hp", "af-ss-special"],
};
