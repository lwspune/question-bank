import type { ChapterNote } from "@/app/notes/_types";

export const SPI_COORDINATE_GEOMETRY_CHAPTER: ChapterNote = {
  chapterName: "Coordinate Geometry",
  title: "Coordinate Geometry: SPI Mathematics",
  intro:
    "Coordinate Geometry has 30 questions in the SPI bank, and one of them, a centroid, is from the 2022 paper. " +
    "Twenty-one are EASY, eight MODERATE and one HARD. Nearly every question is one formula with the numbers put in: distance, the section formula with its midpoint and centroid cases, area or slope. " +
    "So the marks are lost on signs, not ideas: subtracting a negative coordinate, putting the ratio's m with the wrong end, or keeping one of two answers.",
  cardBlurb:
    "Axes and quadrants, the distance formula, the section formula, midpoints and centroids, the area of a triangle, slope, collinear points and the equation of a line.",
  subtopicOrder: ["spi-cg-distance", "spi-cg-section", "spi-cg-lines"],
};
