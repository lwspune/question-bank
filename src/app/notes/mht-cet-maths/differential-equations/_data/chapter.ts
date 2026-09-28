import type { ChapterNote } from "@/app/notes/_types";

export const DIFFERENTIAL_EQUATIONS_CHAPTER: ChapterNote = {
  chapterName: "Differential Equations",
  title: "Differential Equations — MHT-CET Maths",
  intro:
    "Differential Equations is one of the largest chapters in MHT-CET Maths — 135 PYQs across 2021–2025 — and it is almost " +
    "pure method: recognise the type of first-order equation in front of you, then apply the matching recipe. The whole chapter " +
    "turns on that recognition step. Work the six subtopics below in order — each builds on the last. " +
    "The three largest pools hold 31 questions each, but the difficulty sits elsewhere: " +
    "Linear Differential Equations (Integrating Factor) is only 23 questions and 14 of them are HARD, " +
    "the one genuinely expensive block in the chapter. " +
    "Every PYQ is tagged — learn the pattern, drill the bank, recover the marks.",
  subtopicOrder: [
    "order-degree-formation",
    "variable-separable",
    "homogeneous-reducible",
    "linear-integrating-factor",
    "growth-decay-models",
    "newtons-law-cooling",
  ],
};
