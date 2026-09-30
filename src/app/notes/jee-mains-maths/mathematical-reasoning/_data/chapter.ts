import type { ChapterNote } from "@/app/notes/_types";

export const JEE_MATHEMATICAL_REASONING_CHAPTER: ChapterNote = {
  chapterName: "Mathematical Reasoning",
  title: "Mathematical Reasoning — JEE Mains Mathematics",
  intro:
    "Mathematical Reasoning has 67 past-year questions from 2021 to 2023, and 19 of them ask for the negation of a statement or a shorter statement equivalent to it. " +
    "The topic was removed from the JEE Mains syllabus after 2023, so no later paper asks it. " +
    "Almost every question rests on two facts: an implication is false only when a true statement implies a false one, and De Morgan's laws flip each connective under a negation.",
  subtopicOrder: [
    "jee-mr-truth-tables",
    "jee-mr-connectives",
    "jee-mr-negation",
    "jee-mr-implications",
  ],
};
