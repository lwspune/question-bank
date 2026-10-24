import type { ChapterNote } from "@/app/notes/_types";

export const SSC_SERIES_CHAPTER: ChapterNote = {
  chapterName: "Series",
  title: "Series: SSC CGL Reasoning",
  intro:
    "Series has 433 questions in the SSC CGL Tier I bank: 124 from the 2023 shifts, 123 from the 2024 shifts and 186 from the 2025 shifts, with 323 EASY, 109 MODERATE and one HARD. " +
    "A little over half are letter series, about a third are number series, and the rest mix letters with numbers or ask which term is wrong. " +
    "With 36 seconds a question, the marks go to a fixed order of checks: turn letters into positions, write the differences, divide when the terms grow fast, look for squares, cubes and primes, then split the odd and even places. Test the answer against the term after the gap before you mark it.",
  cardBlurb:
    "Letter positions, clusters, blank series, differences, multipliers, squares, cubes and primes, letter-number terms and wrong terms.",
  subtopicOrder: [
    "ssc-rse-positions",
    "ssc-rse-clusters",
    "ssc-rse-blanks",
    "ssc-rse-differences",
    "ssc-rse-multiply",
    "ssc-rse-powers",
    "ssc-rse-alphanumeric",
    "ssc-rse-wrong",
  ],
};
