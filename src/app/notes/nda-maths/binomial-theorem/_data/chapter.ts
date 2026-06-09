import type { ChapterNote } from "@/app/notes/_types";

export const BINOMIAL_THEOREM_CHAPTER: ChapterNote = {
  chapterName: "Binomial Theorem",
  title: "Binomial Theorem — NDA Maths",
  intro:
    "Binomial Theorem is a formula-driven chapter: once you can write the general term, most questions are a single substitution. 54 PYQs span 2017–2026, formula-heavy but tricky — the marks come from picking the right value of r, not from heavy algebra. " +
    "The notes teach in four movements, foundations first: " +
    "(1) Coefficients & Specific Terms — what the binomial theorem says, what C(n, r) is, then the general term and how to pull out a specific term, the middle term, the term independent of x, equal-coefficient conditions, and how many terms a product really has; " +
    "(2) Sums of Binomial Coefficients — the put-x = 1 / x = −1 trick for sums of coefficients, the alternating sum that vanishes, weighted sums via differentiation, and the Pascal-rule identities; " +
    "(3) Integer & Fractional Parts — the conjugate-pair trick where (a+√b)ⁿ + (a−√b)ⁿ is an integer, and how the fractional parts add to 1; " +
    "(4) Remainders & Divisibility — writing a base as (multiple ± 1)ⁿ to read a remainder off the binomial expansion, plus Legendre's formula for the power of a prime in n!. " +
    "The coefficient identities (ΣC = 2ⁿ, symmetry, Pascal's rule) are the only must-knows. Every PYQ is tagged.",
  subtopicOrder: [
    "bt-coefficients-terms",
    "bt-coefficient-sums",
    "bt-integer-fractional-parts",
    "bt-remainders-divisibility",
  ],
};
