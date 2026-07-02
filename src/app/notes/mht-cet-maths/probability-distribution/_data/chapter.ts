import type { ChapterNote } from "@/app/notes/_types";

export const PROBABILITY_DISTRIBUTION_CHAPTER: ChapterNote = {
  chapterName: "Probability Distribution",
  title: "Probability Distribution — MHT-CET Maths",
  intro:
    "Probability Distribution is a high-yield MHT-CET Maths chapter (126 PYQs across 2021–2025) that runs from first principles all the way to random variables. It teaches in four movements, each resting on the one before: " +
    "(1) Classical Probability, Addition Theorem & Odds — the foundation: favourable ÷ total on equally-likely outcomes, counting with permutations and combinations, the addition theorem P(A∪B) = P(A)+P(B)−P(A∩B), the complement and 'at least one' shortcut, and converting odds to probabilities; " +
    "(2) Conditional Probability, Independence & Bayes' Theorem — restricting the sample space with P(A|B), the multiplication rule for sequential draws, independent-event algebra, the total-probability theorem, and Bayes' theorem for bags, urns and diagnostic tests; " +
    "(3) Discrete Random Variables, PMF & CDF — defining a distribution, finding the constant k (finite, quadratic, exponential and infinite-series PMFs), reading probabilities of ranges, building a distribution from an experiment, the cumulative distribution function, and the continuous (density) analogue; " +
    "(4) Expectation, Variance & Standard Deviation — E(X), the variance formula Var(X) = E(X²) − [E(X)]², expected winnings in games, the uniform-distribution formulas E = (n+1)/2 and Var = (n²−1)/12, and back-solving for unknown probabilities from a given mean. " +
    "Every PYQ is tagged — learn the pattern, drill the bank, recover the marks.",
  subtopicOrder: [
    "classical-probability-odds",
    "conditional-independence-bayes",
    "discrete-random-variables",
    "expectation-variance-sd",
  ],
};
