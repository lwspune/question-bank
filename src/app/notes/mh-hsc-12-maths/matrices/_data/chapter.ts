import type { ChapterNote } from "@/app/notes/_types";

export const HSC_MA_MX_CHAPTER: ChapterNote = {
  chapterName: "Matrices",
  title: "Matrices: Maharashtra HSC Mathematics",
  intro:
    "Matrices has 142 questions in this bank: every exercise and solved example of the chapter in the Balbharati Part I textbook, and the board's past papers from 2015 to 2026. " +
    "Twenty-two were set in board papers, twelve of them from 2024 to 2026, and all but four ask for a written answer. " +
    "The board's short questions ask for co-factors or the adjoint of a 2 by 2 matrix, or to verify that A(adj A) = |A| I. Its longer ones ask for an inverse by row transformations or by the adjoint method, or for three equations solved by the method of inversion or of reduction. " +
    "Marks go to the steps: the value of |A| and the line that the inverse exists, every transformation written beside its matrix, the co-factors before the adjoint, and a check by multiplication at the end. " +
    "Every method in the chapter is a chain of elementary transformations or co-factors, so take the pages in order.",
  cardBlurb:
    "Elementary transformations, the inverse by row and column transformations, minors, co-factors and the adjoint, the inverse by the adjoint method, and solving linear equations by inversion and by reduction.",
  subtopicOrder: ["hscm-mx-transformations", "hscm-mx-elementary", "hscm-mx-cofactors", "hscm-mx-adjoint", "hscm-mx-equations"],
};
