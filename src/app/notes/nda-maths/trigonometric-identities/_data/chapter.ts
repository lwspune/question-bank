import type { ChapterNote } from "@/app/notes/_types";

export const TRIGONOMETRIC_IDENTITIES_CHAPTER: ChapterNote = {
  chapterName: "Trigonometric Identities",
  title: "Trigonometric Identities — NDA Mathematics",
  intro:
    "Trigonometric Identities is the single biggest topic in NDA Mathematics — around 138 past-year " +
    "questions across 2017–2026, and the hardest by raw HARD count (47 of them). It is also a foundation " +
    "for Trigonometric Equations, Inverse Trigonometry, Properties of Triangle, and Heights & Distances. " +
    "The whole chapter rewards one habit: recognising which identity a problem wants before grinding. " +
    "Work the five notes in order — first the standard values, signs by quadrant, and special angles; " +
    "then the compound-angle formulas that unlock everything else; then double/triple/half-angle; then " +
    "product-to-sum and sum-to-product; and finally the maximum/minimum techniques. The recurring traps " +
    "are predictable: wrong sign for the quadrant, degrees left unconverted, and reaching for brute force " +
    "where a single compound-angle step was intended.",
  subtopicOrder: [
    "trig-values-quadrants",
    "trig-compound-angle",
    "trig-multiple-half-angle",
    "trig-product-sum",
    "trig-max-min",
  ],
};
