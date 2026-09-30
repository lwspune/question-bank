import type { ChapterNote } from "@/app/notes/_types";

export const JEE_STATISTICS_CHAPTER: ChapterNote = {
  chapterName: "Statistics",
  title: "Statistics — JEE Mains Mathematics",
  intro:
    "Statistics has 88 past-year questions from 2021 to 2026, and 74 of them give or ask for a variance or a standard deviation. " +
    "Almost every one rests on two totals, the sum of the values and the sum of their squares, and the first three pages build those totals from different starting points. " +
    "The last two pages move to the mean deviation about the mean or the median, and to data given as a frequency table.",
  subtopicOrder: [
    "jee-stat-sums",
    "jee-stat-unknowns",
    "jee-stat-changes",
    "jee-stat-deviation",
    "jee-stat-frequency",
  ],
};
