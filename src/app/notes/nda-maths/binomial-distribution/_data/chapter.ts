import type { ChapterNote } from "@/app/notes/_types";

export const BINOMIAL_DISTRIBUTION_CHAPTER: ChapterNote = {
  chapterName: "Binomial Distribution",
  title: "Binomial Distribution — NDA Maths",
  intro:
    "Binomial Distribution is one of the most reliable scorers in the NDA Maths paper: a tight topic with 30 PYQs " +
    "spanning 2017 to 2026, mostly EASY and MODERATE, and the same handful of patterns repeat year after year. " +
    "The notes teach in two movements. " +
    "(1) The Binomial Setting and Computing Probabilities — what makes an experiment binomial, the formula for the " +
    "probability of exactly k successes, reading the success probability p out of the wording, and the complement " +
    "trick that turns 'at least one' and short tails into one or two lines. " +
    "(2) Mean, Variance, and Recovering the Parameters — the mean np and variance npq, the signature back-solve that " +
    "recovers n and p by dividing variance by mean, and the probability-equation problems that ask for p. " +
    "Every PYQ is tagged to a concept — learn the pattern, drill the bank, bank the marks.",
  subtopicOrder: ["bd-computing-probabilities", "bd-mean-variance"],
};
