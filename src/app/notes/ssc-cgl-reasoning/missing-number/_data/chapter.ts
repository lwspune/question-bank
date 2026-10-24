import type { ChapterNote } from "@/app/notes/_types";

export const SSC_MISSING_NUMBER_CHAPTER: ChapterNote = {
  chapterName: "Missing Number",
  title: "Missing Number: SSC CGL Reasoning",
  intro:
    "Missing Number has 12 questions in the SSC CGL Tier I bank, eleven from the 2023 shifts and one from the 2025 shifts, and nine of them are MODERATE. " +
    "Each gives a few rows of numbers tied together by one hidden rule and asks for the number behind the question mark. " +
    "The method never changes: guess the kind of rule from the size of the third number, prove it on two full rows, and only then apply it. " +
    "SSC adds a note that numbers must be used whole, so 13 is thirteen, never 1 and 3.",
  cardBlurb:
    "Rules that add, subtract, halve, multiply or divide, squares and cubes, two-step chains and the 3 by 3 magic square.",
  subtopicOrder: ["ssc-rmn-grids"],
};
