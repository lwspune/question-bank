import type { ChapterNote } from "@/app/notes/_types";

export const VECTORS_CHAPTER: ChapterNote = {
  chapterName: "Vectors",
  title: "Vectors — MHT-CET Mathematics",
  intro:
    "Vectors is 214 past-year questions in the MHT-CET Maths bank across 2021–2025, " +
    "one of its heaviest scorers and also its hardest single chapter: nearly six in " +
    "ten are HARD. A vector carries both magnitude AND direction — an arrow, not a " +
    "number. This chapter builds " +
    "from the fundamentals — magnitude, components, unit vectors, the section " +
    "formula — to the four products that do the real work: the DOT product " +
    "(angle, projection, perpendicularity), the CROSS product (area, the " +
    "perpendicular direction), and the SCALAR & VECTOR triple products (volume, " +
    "coplanarity). Lock down the determinant forms and the |a+b|² magnitude " +
    "expansion and most of the paper falls out. New to vectors? Start with " +
    "Magnitude & Unit Vectors below; everything after it is an application.",
  subtopicOrder: [
    "magnitude-unit-vectors",
    "section-formula-geometry",
    "linear-combinations-coplanarity",
    "dot-product",
    "cross-product",
    "scalar-triple-product",
  ],
};
