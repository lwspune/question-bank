import type { ChapterNote } from "@/app/notes/_types";

export const PROBABILITY_DISTRIBUTION_CHAPTER: ChapterNote = {
  chapterName: "Probability Distribution",
  title: "Probability Distribution — MHT-CET Maths",
  intro:
    "Probability Distribution is a high-yield MHT-CET Maths chapter (115 PYQs across 2021–2025) that runs from first principles all the way to random variables. " +
    "The arc matters more here than in most chapters: the classical-probability block is the vocabulary every later one speaks, and the random-variable blocks are that " +
    "same vocabulary applied to a variable rather than to a single event. Work the four subtopics below in order — each rests on the one before. " +
    "Only about one question in five is HARD, and they concentrate in Conditional Probability, Independence and Bayes' Theorem (8 of its 26). " +
    "Every PYQ is tagged — learn the pattern, drill the bank, recover the marks.",
  subtopicOrder: [
    "classical-probability-odds",
    "conditional-independence-bayes",
    "discrete-random-variables",
    "expectation-variance-sd",
  ],
};
