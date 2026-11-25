import type { ChapterNote } from "@/app/notes/_types";

export const CB_MA_MT_CHAPTER: ChapterNote = {
  chapterName: "Matrices",
  title: "Matrices: CBSE Class 12 Mathematics",
  intro:
    "Matrices has 232 questions in this bank: every example and exercise of the NCERT chapter, and CBSE's board papers from 2023 to 2026. " +
    "One hundred and seventeen of them come from board papers, about thirty a year, and a hundred of those are one-mark MCQs and assertion-reason items: the order of a product, which laws of multiplication hold, the transpose of a product, the angle that makes A + A′ a multiple of I, and whether a matrix or a combination of matrices is symmetric or skew symmetric. " +
    "The written questions ask you to work out a polynomial in A or show that one is the zero matrix, to find an unknown value or matrix from a product, and to use matrices in a sales problem. " +
    "Marks go to the steps: each element of a product worked out row by column, every term of a polynomial written as a matrix, and a check that every equation agrees. " +
    "In an assertion-reason item, code (D) in Mathematics means the Assertion is false and the Reason is true.",
  cardBlurb:
    "Order and types of matrices, equality, addition and scalar multiples, multiplication and its laws, powers and polynomials in A, the transpose, symmetric and skew symmetric matrices, and the inverse of a matrix.",
  subtopicOrder: [
    "cbm-mt-order",
    "cbm-mt-equality",
    "cbm-mt-addition",
    "cbm-mt-multiplication",
    "cbm-mt-transpose",
    "cbm-mt-symmetric",
    "cbm-mt-inverse",
  ],
};
