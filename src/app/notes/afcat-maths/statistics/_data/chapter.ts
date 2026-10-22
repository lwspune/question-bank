import type { ChapterNote } from "@/app/notes/_types";

export const AF_ST_CHAPTER: ChapterNote = {
  chapterName: "Statistics",
  title: "Statistics: AFCAT Numerical Ability",
  intro:
    "Statistics is one of the smallest chapters of AFCAT Numerical Ability, two thirds of its questions are EASY, and only one is HARD. " +
    "Many are one-line facts: which graph is drawn first, where a class boundary sits, what a sector of a pie chart stands for. " +
    "The questions that take time are on grouped data, where the median and the mode each have a formula that must be used on the right class, and on unknown values pinned down by two averages at once. " +
    "The pages build those formulas from the ground up, so each one uses only what came before it.",
  cardBlurb:
    "Class intervals, pie charts, the mean and combined mean, standard deviation, median and mode of lists and grouped data, the geometric mean, the empirical relation, histograms and ogives.",
  subtopicOrder: ["af-st-data", "af-st-mean", "af-st-median", "af-st-graphs"],
};
