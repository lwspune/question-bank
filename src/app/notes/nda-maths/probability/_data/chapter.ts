import type { ChapterNote } from "@/app/notes/_types";

export const PROBABILITY_CHAPTER: ChapterNote = {
  chapterName: "Probability",
  title: "Probability — NDA Mathematics",
  intro:
    "Probability measures how likely an event is, on a scale from 0 (impossible) " +
    "to 1 (certain). This chapter builds it from the ground up: first the classical " +
    "counting definition — favourable outcomes over total — and the counting tools " +
    "(combinations, dice and coin sample spaces, arrangements) that feed it; then the " +
    "rules that combine events — the addition rule for unions, the multiplication rule " +
    "for independent events, and finally conditional probability and Bayes' theorem. " +
    "New to probability? Start with Classical Probability & Counting below; everything " +
    "after it is a rule applied to the outcomes you learn to count there.",
  subtopicOrder: [
    "classical-probability-counting",
    "event-algebra-addition-rule",
    "independent-events",
    "conditional-probability-bayes",
  ],
};
