import type { ChapterNote } from "@/app/notes/_types";

export const AF_PR_CHAPTER: ChapterNote = {
  chapterName: "Probability",
  title: "Probability: AFCAT Numerical Ability",
  intro:
    "Probability holds 197 practice questions in this bank and no AFCAT past-year question yet, and about one in seven of them is HARD. " +
    "Almost every question is one formula, favourable outcomes over total outcomes, applied to a familiar experiment. " +
    "What changes from question to question is how the outcomes are counted: by listing them, by a pattern such as the ways to make a sum on two dice, by choosing positions or balls with nCr, or by counting what is not wanted and subtracting. " +
    "The notes start with the formula and its three rules, and each later page adds one counting tool that the pages after it reuse. " +
    "The HARD questions sit mostly where several balls are chosen at once and where coin tosses come with an order or a condition.",
  cardBlurb:
    "Equally likely outcomes, the not, or and and rules, coins and nCr, sums and pairs on two dice, the 52-card deck, draws with and without replacement, and choosing balls with combinations.",
  subtopicOrder: [
    "af-pr-basics",
    "af-pr-coins",
    "af-pr-dice",
    "af-pr-cards",
    "af-pr-bag",
    "af-pr-select",
  ],
};
