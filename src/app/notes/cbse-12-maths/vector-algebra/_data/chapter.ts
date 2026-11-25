import type { ChapterNote } from "@/app/notes/_types";

export const CB_MA_VA_CHAPTER: ChapterNote = {
  chapterName: "Vector Algebra",
  title: "Vector Algebra: CBSE Class 12 Mathematics",
  intro:
    "Vector Algebra has 283 questions in this bank: every example and exercise of the NCERT chapter, and CBSE's board papers from 2022 to 2026. " +
    "One hundred and fifty-eight of them come from board papers, at least twenty-three in each of those years. " +
    "The one-mark questions test the rules: when two vectors are collinear or perpendicular, direction cosines, a projection, the angle from a dot or cross product, and assertion-reason items on what each product gives. " +
    "The two- and three-mark questions ask for a unit vector or a vector of given length, a section point, an angle, or the area of a triangle or parallelogram, and every year at least one asks you to show or prove a result about lengths and products. " +
    "Marks go to the steps: write each vector as head minus tail, show the determinant with the minus sign on the middle term, divide by the length before you scale, keep both signs where the direction is not fixed, and halve the cross product for a triangle or when the diagonals are given.",
  cardBlurb:
    "Scalars and types of vectors, adding vectors, components and direction cosines, the section formula, the dot product with angles and projections, and the cross product with areas and perpendicular vectors.",
  subtopicOrder: [
    "cbm-va-types",
    "cbm-va-addition",
    "cbm-va-components",
    "cbm-va-section",
    "cbm-va-dot",
    "cbm-va-cross",
  ],
};
