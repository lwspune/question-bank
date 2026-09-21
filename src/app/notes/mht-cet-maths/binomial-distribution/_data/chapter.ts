import type { ChapterNote } from "@/app/notes/_types";

export const BINOMIAL_DISTRIBUTION_CHAPTER: ChapterNote = {
  chapterName: "Binomial Distribution",
  title: "Binomial Distribution — MHT-CET Maths",
  intro:
    "Binomial Distribution is a compact, high-yield MHT-CET Maths chapter (60 PYQs across 2021–2025) built on one model: n independent trials, each a success (probability p) or failure (q = 1 − p). " +
    "Almost every question reduces to spotting n, p and q, then reaching for the right tool. " +
    "Work the four subtopics below in order. Only about one question in five is HARD, which makes " +
    "this one of the safest places in the paper to bank marks. " +
    "Every PYQ is tagged — learn the pattern, drill the bank, recover the marks.",
  subtopicOrder: [
    "binomial-setting-pmf",
    "computing-binomial-probabilities",
    "binomial-mean-variance",
    "binomial-parameter-estimation",
  ],
};
