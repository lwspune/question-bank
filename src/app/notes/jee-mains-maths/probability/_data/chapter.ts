import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PROBABILITY_CHAPTER: ChapterNote = {
  chapterName: "Probability",
  title: "Probability — JEE Mains Mathematics",
  intro:
    "Probability has 149 past-year questions from 2021 to 2026, and 26 of them use total probability or Bayes' theorem. " +
    "The pages start with probability by counting — selections, dice, digits — and with probabilities that depend on random coefficients. " +
    "The middle pages cover the addition rule, conditional probability, independence and Bayes' theorem. " +
    "The last two pages are distributions: the binomial, and the mean and variance of a random variable.",
  subtopicOrder: [
    "jee-prob-counting",
    "jee-prob-dice",
    "jee-prob-conditions",
    "jee-prob-rules",
    "jee-prob-bayes",
    "jee-prob-binomial",
    "jee-prob-rv",
  ],
};
