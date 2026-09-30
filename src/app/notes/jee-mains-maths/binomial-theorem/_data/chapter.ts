import type { ChapterNote } from "@/app/notes/_types";

export const JEE_BINOMIAL_THEOREM_CHAPTER: ChapterNote = {
  chapterName: "Binomial Theorem",
  title: "Binomial Theorem — JEE Mains Mathematics",
  intro:
    "Binomial Theorem has 165 past-year questions from 2021 to 2026, and 75 of them are numerical answer. " +
    "The pages start with the general term and the ratios between neighbouring coefficients, then expansions of products and of three-term brackets. " +
    "The middle pages add up coefficients by substitution, differentiation, integration and Vandermonde's identity, and sum whole families of expansions. " +
    "The last page uses the theorem to find remainders.",
  subtopicOrder: [
    "jee-bin-term",
    "jee-bin-consecutive",
    "jee-bin-products",
    "jee-bin-rational",
    "jee-bin-sums",
    "jee-bin-sums-products",
    "jee-bin-series",
    "jee-bin-remainder",
  ],
};
