import type { ChapterNote } from "@/app/notes/_types";

export const CB_MA_PR_CHAPTER: ChapterNote = {
  chapterName: "Probability",
  title: "Probability: CBSE Class 12 Mathematics",
  intro:
    "Probability has 292 questions in this bank: every example and exercise of the NCERT chapter, and CBSE's board papers from 2022 to 2026. " +
    "One hundred and seventy-nine of them come from board papers, and forty-one of those are one-mark MCQs, mostly on conditional probability and independent events. " +
    "The written questions and case studies follow a few fixed patterns: a 'given that' probability from dice, cards or a survey, two or three people trying something independently, and a case study that first finds an overall probability with the theorem of total probability and then reverses it with Bayes' theorem. " +
    "Marks go to the steps: name every event in words, write each probability with its condition, show the comparison when you test for independence, and write the Bayes formula before substituting. " +
    "Probability distributions and their mean were asked every year from 2022 to 2025 but not in 2026, and the present NCERT chapter does not teach them beyond defining a random variable. " +
    "In an assertion-reason item, code (D) in Mathematics means the Assertion is false and the Reason is true.",
  cardBlurb:
    "Conditional probability and its properties, the multiplication rule, independent events, the theorem of total probability, Bayes' theorem, and random variables with their distributions and mean.",
  subtopicOrder: [
    "cbm-pr-conditional",
    "cbm-pr-multiplication",
    "cbm-pr-independent",
    "cbm-pr-total",
    "cbm-pr-bayes",
    "cbm-pr-distributions",
  ],
};
