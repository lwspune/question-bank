import type { ChapterNote } from "@/app/notes/_types";

export const APPLICATIONS_OF_DERIVATIVE_CHAPTER: ChapterNote = {
  chapterName: "Applications of Derivative",
  title: "Applications of Derivative — MHT-CET Maths",
  intro:
    "Applications of Derivative is the largest single chapter in MHT-CET Maths — 183 PYQs across 2021–2025 — and it is where " +
    "the derivative stops being an abstract limit and starts doing work: finding slopes, estimating values, tracking rates, and " +
    "locating the best-possible answer. Everything rests on one idea — dy/dx is the slope of the curve at a point — read seven " +
    "ways. Work the seven subtopics below in order — each builds on the tools before it. " +
    "Only about a quarter of the chapter is HARD, and two pools carry most of the marks: " +
    "Maxima, Minima and Optimisation (42 q) and Rate of Change and Related Rates (40 q). " +
    "Every PYQ is tagged — learn the pattern, drill the bank, recover the marks.",
  // The first sentence of `intro` runs 43w, past the 40-word card band,
  // so the card / <meta description> line is authored instead.
  cardBlurb:
    "Where the derivative stops being an abstract limit and starts doing work: finding slopes, estimating values, tracking rates of change, and locating the best answer available.",
  subtopicOrder: [
    "tangents-normals",
    "angle-between-curves",
    "approximations",
    "rate-of-change",
    "increasing-decreasing",
    "maxima-minima",
    "rolle-mvt",
  ],
};
