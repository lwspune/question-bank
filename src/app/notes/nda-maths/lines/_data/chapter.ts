import type { ChapterNote } from "@/app/notes/_types";

export const LINES_CHAPTER: ChapterNote = {
  chapterName: "Lines",
  title: "Straight Lines — NDA Mathematics",
  intro:
    "Straight Lines is 104 past-year NDA questions from 2017 to 2026, about one in five rated HARD — a " +
    "steady, high-volume scorer. The chapter is a toolbox, and the quickest way to use it under time is " +
    "to sort the tools by what the stem hands you. Given only points, reach for distance, the section " +
    "formula, the area determinant or a triangle centre. Given one line and a point, reach for a form of " +
    "the equation, an intercept, the perpendicular distance or a reflection. Given two lines, reach for " +
    "the angle formula, the parallel and perpendicular tests, or the family through their intersection. " +
    "Count the lines the question names, and the shelf picks itself.",
  /**
   * Teaching order. `lines-angle-parallel-perp` sits SECOND, not third: it is
   * the chapter's shortest block (two formulas, both resting on slope alone),
   * and the blocks after it lean on perpendicularity and on the angle
   * bisectors. Moving it up closes the locus → angle-between dependency and
   * shortens the two that remain.
   *
   * NOT the textbook order, deliberately. NCERT (9.2.2–9.2.3) and Balbharati
   * (5.2.3–5.2.4) both teach the angle and the parallel/perpendicular tests
   * BEFORE any form of the equation, and Balbharati opens the chapter with
   * Locus. Both are right for a school year and wrong for a student with forty
   * minutes: the cheapest marks here are "here is a line, find its equation /
   * slope / intercepts", and this order puts them in scoring range in the
   * first block. Locus is the hardest thing in the chapter and leads nothing.
   */
  subtopicOrder: [
    "lines-equation-slope",
    "lines-angle-parallel-perp",
    "lines-distance-section-locus",
    "lines-triangles-polygons",
  ],
};
