import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_STRAIGHT_LINE_CHAPTER: ChapterNote = {
  chapterName: "Straight Line",
  title: "Straight Line — MHT-CET Maths",
  intro:
    "Straight Line is about one question a paper and sits on the cheap side of MHT-CET Maths: one in five of its past-year questions is HARD, and the HARD " +
    "ones are all on the first page — a line at a given angle, a rotation, an angle bisector, a reflected slope. Everything else is routine coordinate " +
    "geometry, and every tool here is the two-dimensional version of a move the Line and Plane cornerstone also needs: slope and angle, the forms of a line, " +
    "the section formula, the distance from a point and the foot of a perpendicular. The pages below run in that order, angle first, because the angle " +
    "formula is the one thing the chapter tests in four disguises. The concurrency determinant on the second page is the same test that reappears as " +
    "collinearity, coplanarity and the scalar triple product in later chapters. Every PYQ is tagged.",
  cardBlurb:
    "Slope and angle, the forms of a line, section formula, distance and the foot of the perpendicular — the MHT-CET Straight Line chapter with every past-year question tagged.",
  subtopicOrder: [
    "cetsl-slope-angle-and-rotation",
    "cetsl-forms-intersections-and-concurrency",
    "cetsl-section-formula-and-rectangles",
    "cetsl-distance-and-foot-of-perpendicular",
  ],
};
