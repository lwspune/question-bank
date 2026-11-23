import type { ChapterNote } from "@/app/notes/_types";

export const HSC_MA_BD_CHAPTER: ChapterNote = {
  chapterName: "Binomial Distribution",
  title: "Binomial Distribution: Maharashtra HSC Mathematics",
  intro:
    "Binomial Distribution has 95 questions in this bank: every exercise and solved example of the chapter in the Balbharati Part II textbook, and the board's past papers from 2015 to 2026. " +
    "Twenty-four were set in board papers, thirteen of them from 2024 to 2026, and all but five ask for a written answer. " +
    "The board asks for the probability of exactly, at least or at most a number of successes in a fixed number of trials, and for the mean, the variance, n or p of a binomial distribution. " +
    "Seventeen of those board questions repeat a textbook exercise or solved example with the same numbers, so working the exercises is the best preparation. " +
    "Marks go to the set-up: say what X counts, write n, p and q, state X ~ B(n, p), then show the formula, the substitution and the answer. " +
    "For a range of successes, list the values of x first, and work with the complement when it has fewer terms.",
  cardBlurb:
    "Bernoulli trials, p and q, the probability of exactly, at least and at most x successes, finding p from given probabilities, and the mean, variance and standard deviation, with n and p found from them.",
  subtopicOrder: ["hscm-bd-bernoulli", "hscm-bd-distribution", "hscm-bd-mean"],
};
