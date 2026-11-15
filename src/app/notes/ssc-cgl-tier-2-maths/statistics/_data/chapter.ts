import type { ChapterNote } from "@/app/notes/_types";

export const SSC2_STATISTICS_CHAPTER: ChapterNote = {
  chapterName: "Statistics",
  title: "Statistics: SSC CGL Tier II Maths",
  intro:
    "Statistics has 18 questions in the SSC CGL Tier II bank: 14 EASY and 4 MODERATE. " +
    "Over half ask for a mode or a median from a short list of numbers, which takes sorting and counting rather than any formula. " +
    "The rest work from a frequency table: the median and mean of grouped data, the grouped-mode formula, and the empirical rule that links mode, median and mean. " +
    "Sort ungrouped data before reading off a median, and for grouped data find the right class from the running total first.",
  cardBlurb:
    "Mode, median and standard deviation of a list, and the mean, median and mode of grouped data with the empirical relation, as SSC CGL Tier II asks them.",
  subtopicOrder: ["ssc2-st-ungrouped", "ssc2-st-grouped"],
};
