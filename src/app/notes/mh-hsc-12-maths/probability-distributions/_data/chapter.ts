import type { ChapterNote } from "@/app/notes/_types";

export const HSC_MA_PD_CHAPTER: ChapterNote = {
  chapterName: "Probability Distributions",
  title: "Probability Distributions: Maharashtra HSC Mathematics",
  intro:
    "Probability Distributions has 124 questions in this bank: the exercises and solved examples of Chapter 7 in the Balbharati Part II textbook, and the board's past papers from 2015 to 2026. " +
    "Twenty-five were set in board papers, eleven of them from 2024 to 2026, and most repeat a textbook exercise or solved example, often with the same numbers. " +
    "The board's short questions ask for the expected value from a table, for k and a probability from a p.m.f. table, or for the probability of an interval from a p.d.f. Its longer ones ask for the variance and standard deviation, for several probabilities from one p.d.f., or for the c.d.f. of a continuous random variable and the probabilities read from it." +
    "Marks go to the steps: the line that the probabilities add up to 1 (or that the area is 1) before k is found, the table with its x p and x² p columns, every probability written as a sum or an integral before its value, and the c.d.f. given for every range of x. " +
    "Discrete random variables come first and continuous ones after, so take the pages in order.",
  cardBlurb:
    "Random variables and their types, the probability mass function, expected value and variance, the probability density function, and the cumulative distribution function for discrete and continuous random variables.",
  subtopicOrder: ["hscm-pd-random", "hscm-pd-pmf", "hscm-pd-expectation", "hscm-pd-pdf", "hscm-pd-cdf"],
};
