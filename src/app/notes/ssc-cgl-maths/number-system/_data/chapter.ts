import type { ChapterNote } from "@/app/notes/_types";

export const SSC_NUMBER_SYSTEM_CHAPTER: ChapterNote = {
  chapterName: "Number System",
  title: "Number System: SSC CGL Quantitative Aptitude",
  intro:
    "Number System has 91 questions in the SSC CGL Tier I bank: 77 EASY, 14 MODERATE and none HARD. " +
    "Forty-eight of them hand you a number, often with a digit missing, and ask whether it passes a divisibility test, so the tests are worth practising until you can run them without writing anything down. " +
    "The questions from the 2025 shifts lean the other way: twelve of the thirteen ask what kind of number something is, and each needs one fact. " +
    "Everywhere else in the chapter, one prime factorisation or one swap of a number for its remainder does the work of a long calculation, which matters when Tier I gives you about 36 seconds a question.",
  cardBlurb:
    "Number families, terminating decimals, primes, squares, the division algorithm, divisibility tests, missing digits, divisor counts, HCF and LCM, and remainders of large powers.",
  subtopicOrder: [
    "ssc-ns-types",
    "ssc-ns-division",
    "ssc-ns-tests",
    "ssc-ns-digits",
    "ssc-ns-factors",
    "ssc-ns-remainders",
  ],
};
