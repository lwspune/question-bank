import type { ChapterNote } from "@/app/notes/_types";

export const CB_MA_DT_CHAPTER: ChapterNote = {
  chapterName: "Determinants",
  title: "Determinants: CBSE Class 12 Mathematics",
  intro:
    "Determinants has 199 questions in this bank: every example and exercise of the NCERT chapter, and CBSE's board papers from 2023 to 2026. " +
    "One hundred and seven of them come from board papers, at least twenty-two in each of those years. " +
    "The one-mark questions test the rules: the value of a determinant, an unknown that makes a matrix singular, |kA| = kⁿ|A|, |adj A| = |A|ⁿ⁻¹, the inverse of a diagonal matrix and the area of a triangle. " +
    "Every year a five-mark question asks you to find A⁻¹ and solve three equations by the matrix method, or to use a given product of two matrices to do it, and a case study turns a story about prices, scholarships or a box's measurements into AX = B." +
    "Marks go to the steps: write |A| and say it is not zero before you find an inverse, transpose the matrix of cofactors, check whether the equations use A or its transpose, and put your answer back into the equations.",
  cardBlurb:
    "Evaluating determinants of order two and three, area of a triangle and collinear points, minors and cofactors, the adjoint and inverse of a matrix, and solving linear equations by the matrix method.",
  subtopicOrder: [
    "cbm-dt-expand",
    "cbm-dt-area",
    "cbm-dt-cofactors",
    "cbm-dt-inverse",
    "cbm-dt-system",
  ],
};
