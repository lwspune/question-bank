import type { ChapterNote } from "@/app/notes/_types";

export const LINES_CHAPTER: ChapterNote = {
  chapterName: "Lines",
  title: "Straight Lines — NDA Mathematics",
  intro:
    "Lines (coordinate geometry of the straight line) is around 97 past-year NDA questions — a steady, " +
    "high-volume scorer. The whole chapter is built from a handful of tools: the slope and the forms of a " +
    "line's equation, the distance and section formulas, the angle between two lines, and the area of a " +
    "triangle from its vertices. Work the four notes in order — first equations, slopes and the family of " +
    "lines; then distance, section and locus; then angles, parallelism and perpendicularity; and finally " +
    "triangles, quadrilaterals and polygons, which apply everything. The recurring traps are sign errors " +
    "in the angle formula and forgetting that 'distance from a point to a line' needs the normalised form.",
  subtopicOrder: [
    "lines-equation-slope",
    "lines-distance-section-locus",
    "lines-angle-parallel-perp",
    "lines-triangles-polygons",
  ],
};
