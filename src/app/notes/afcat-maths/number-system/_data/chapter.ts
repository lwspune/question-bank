import type { ChapterNote } from "@/app/notes/_types";

export const AF_NS_CHAPTER: ChapterNote = {
  chapterName: "Number System",
  title: "Number System: AFCAT Numerical Ability",
  intro:
    "Number System has 131 practice questions in the AFCAT bank, none of them from an AFCAT paper, and only about one in ten is HARD. " +
    "Most are one step: the right rule, applied to each option in turn, picks out the answer. " +
    "Marks are lost on facts held loosely, such as whether zero is a natural number, why 1 is not prime, or which way round the rule for 11 runs, so every rule here is stated exactly and then tested on fresh numbers. " +
    "The harder questions, a missing digit, a count of divisors, the remainder of a huge power, each have a short method that beats long division.",
  cardBlurb:
    "Kinds of numbers, divisibility rules, prime factorisation and counting divisors, HCF and LCM, and remainders of sums, products and powers.",
  subtopicOrder: [
    "af-ns-types",
    "af-ns-divisibility",
    "af-ns-prime-factors",
    "af-ns-hcf-lcm",
    "af-ns-remainders",
  ],
};
