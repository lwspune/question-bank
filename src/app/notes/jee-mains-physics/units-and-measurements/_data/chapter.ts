import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_UNIT_CHAPTER: ChapterNote = {
  chapterName: "Units and Measurements",
  title: "Units and Measurements — JEE Mains Physics",
  intro:
    "Units and Measurements has 190 past-year questions from 2021 to 2026, and 19 of them ask for a number rather than an option. " +
    "Just over half are about dimensions: building a quantity's dimensions from the equation that defines it, then using them to find unknown constants and powers or to test an equation. " +
    "Most of the rest are about errors and instruments, and there the arithmetic is short. Marks are lost on a sign or a factor: a zero error added instead of subtracted, a power left out of an error sum, or a time error divided by one period instead of the whole run.",
  subtopicOrder: [
    "jph-unit-sigfig",
    "jph-unit-mechdims",
    "jph-unit-emdims",
    "jph-unit-homogeneity",
    "jph-unit-relations",
    "jph-unit-errors",
    "jph-unit-lab-errors",
    "jph-unit-instruments",
  ],
};
