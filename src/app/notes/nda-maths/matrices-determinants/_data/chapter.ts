import type { ChapterNote } from "@/app/notes/_types";

export const MATRICES_DETERMINANTS_CHAPTER: ChapterNote = {
  chapterName: "Matrices & Determinants",
  title: "Matrices & Determinants — NDA Mathematics",
  intro:
    "Matrices & Determinants is the single biggest scoring chapter in NDA Mathematics — " +
    "170 past-year questions across 2017–2026, around eight or nine marks on every paper. " +
    "It is also the hardest: nearly a third of the questions are HARD, and two areas " +
    "(determinant properties and special determinants) sit near 50% HARD. The chapter is " +
    "almost entirely a small set of rules applied carefully, so the payoff is in knowing " +
    "the properties cold and not falling for the standard traps. Work the six notes below in " +
    "order — matrices and their algebra, the special types, determinant evaluation and " +
    "properties, the special determinants, the adjoint–inverse machinery, and finally linear " +
    "systems — and the bank turns into rule-application.",
  subtopicOrder: [
    "matrix-operations",
    "special-matrices",
    "determinants-evaluation-properties",
    "special-determinants",
    "cofactors-adjoint-inverse",
    "linear-systems",
  ],
};
