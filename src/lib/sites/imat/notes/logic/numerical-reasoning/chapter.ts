import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_LOG_NUR_CHAPTER: ChapterNote = {
  chapterName: "Numerical Reasoning",
  title: "Numerical Reasoning: Solving Everyday Number Problems",
  intro:
    "Numerical Reasoning has 63 past questions since 2011, and the ministry papers from 2023 on have asked 6 of them. " +
    "Each item is a short story that hides one or two lines of school arithmetic, so the work is reading the situation into numbers, choosing the method and checking the answer against the story. " +
    "The Cambridge papers set long multi-step puzzles about costs, journeys, timetables and ages, while the ministry papers ask shorter items on percentages, half-lives, probability and rearranging a relation. " +
    "Most wrong answers come from a correct calculation of the wrong quantity, and the options are built from exactly those slips, so checking the answer in the story is part of the method.",
  subtopicOrder: [
    "imat-nur-words",
    "imat-nur-percent",
    "imat-nur-ratio",
    "imat-nur-units",
    "imat-nur-counting",
    "imat-nur-growth",
  ],
};
