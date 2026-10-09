import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_MAT_GEO_CHAPTER: ChapterNote = {
  chapterName: "Geometry",
  title: "Geometry: Shapes, Solids and Coordinates",
  intro:
    "Geometry has 21 past questions since 2011, and the ministry papers from 2023 on have asked 5 of them. " +
    "It is the largest Mathematics chapter in the bank, but most items need one well-known fact or formula: a volume, an angle theorem, a gradient, the equation of a circle. " +
    "The work is in choosing that fact quickly and in the algebra after it: completing the square for a circle, the negative reciprocal for a perpendicular line, squaring a scale factor for an area. " +
    "Diagrams are often marked not to scale, so trust the numbers you are given, not your eye.",
  subtopicOrder: [
    "imat-geo-angles-triangles",
    "imat-geo-areas-circles",
    "imat-geo-solids",
    "imat-geo-lines",
    "imat-geo-circle-parabola",
  ],
};
