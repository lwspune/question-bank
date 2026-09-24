import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_APPLICATIONS_OF_DEFINITE_INTEGRAL_CHAPTER: ChapterNote = {
  chapterName: "Applications of Definite Integral",
  title: "Applications of Definite Integral — MHT-CET Maths",
  intro:
    "Applications of Definite Integral is the most concentrated chapter in MHT-CET Maths: one skill, area, asked in three guises, at about one question a paper. " +
    "The integration is never the hard part — it is a polynomial, a square root or a standard circle result. The marks are won and lost in the setup: sketching the region, " +
    "finding where the curves meet, deciding which curve is on top over each stretch, and choosing whether to slice vertically or horizontally. " +
    "Work the pages below in order. The first teaches the setup on a single curve, the second adds a second boundary and the intersection step that most wrong answers skip, " +
    "and the third collects the circle, ellipse and hyperbola regions that need one standard integral learnt cold. Every PYQ is tagged.",
  cardBlurb:
    "Area under a curve, area between two curves, and the circle, ellipse and hyperbola regions — the one MHT-CET skill where the setup, not the integration, decides the mark.",
  subtopicOrder: [
    "cetadi-area-under-a-curve",
    "cetadi-area-between-curves",
    "cetadi-conic-regions",
  ],
};
