import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_MX_COFACTORS_NOTE: SubtopicNote = {
  subtopicName: "Minors, Cofactors and Adjoint",
  title: "Minors, Cofactors and the Adjoint of a Matrix",
  oneLineDefinition:
    "The minor and the co-factor of each element, the matrix of co-factors, the adjoint as its transpose, and the result A(adj A) = (adj A)A = |A| I.",
  whyItMatters:
    "27 questions, nine of them from board papers in six different years, more than any other page of the chapter. The board asks for the co-factors or the matrix of co-factors of a 2 by 2 matrix (2020, 2022, 2025, 2026), the adjoint of a 2 by 2 matrix (MCQs in 2018 and 2026, a written answer in 2025), and to verify or prove A(adj A) = (adj A)A = |A| I for a 2 by 2 matrix (2023, 2026). These are short, sure marks if the signs are right.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmmx-cofactor",
      name: "Minor and co-factor of an element",
      intuition:
        "Every element of a square matrix has its own small determinant: cross out the row and the column the element sits in, and what is left is its minor. The co-factor is the minor with a sign attached, plus or minus in a chessboard pattern that starts with plus at the top left. The co-factors are the building blocks of the adjoint and of the inverse.",
      definition:
        "- **Minor** \\(M_{ij}\\) of \\(a_{ij}\\): the determinant left after deleting the \\(i\\)th row and the \\(j\\)th column.\n" +
        "- **Co-factor** \\(A_{ij} = (-1)^{i+j}M_{ij}\\).\n" +
        "- Sign pattern for a 3 by 3 matrix: \\(\\begin{matrix} + & - & + \\\\ - & + & - \\\\ + & - & + \\end{matrix}\\).\n" +
        "- For a 2 by 2 matrix the minor of each element is the single element left: the minor of \\(a_{11}\\) is \\(a_{22}\\), of \\(a_{12}\\) is \\(a_{21}\\).\n" +
        "- The **matrix of co-factors** is \\([A_{ij}]\\), each co-factor in the place of its element.\n" +
        "- Check: the elements of any row times their own co-factors add up to \\(|A|\\).",
      formula: {
        label: "Co-factor",
        latex: "A_{ij} = (-1)^{i+j}M_{ij}",
        symbols: [
          { symbol: "\\(M_{ij}\\)", meaning: "minor of the element in row i and column j" },
          { symbol: "\\(A_{ij}\\)", meaning: "co-factor of that element" },
        ],
      },
      authoredExample: {
        prompt: "Find the matrix of co-factors of \\(A = \\begin{bmatrix} 1 & 0 & 2 \\\\ 3 & 1 & 0 \\\\ 0 & 2 & 1 \\end{bmatrix}\\).",
        steps: [
          "Formula: \\(A_{ij} = (-1)^{i+j}M_{ij}\\).",
          "Row 1: \\(A_{11} = +\\begin{vmatrix} 1 & 0 \\\\ 2 & 1 \\end{vmatrix} = 1\\), \\(A_{12} = -\\begin{vmatrix} 3 & 0 \\\\ 0 & 1 \\end{vmatrix} = -3\\), \\(A_{13} = +\\begin{vmatrix} 3 & 1 \\\\ 0 & 2 \\end{vmatrix} = 6\\).",
          "Row 2: \\(A_{21} = -\\begin{vmatrix} 0 & 2 \\\\ 2 & 1 \\end{vmatrix} = -(0 - 4) = 4\\), \\(A_{22} = +\\begin{vmatrix} 1 & 2 \\\\ 0 & 1 \\end{vmatrix} = 1\\), \\(A_{23} = -\\begin{vmatrix} 1 & 0 \\\\ 0 & 2 \\end{vmatrix} = -2\\).",
          "Row 3: \\(A_{31} = +\\begin{vmatrix} 0 & 2 \\\\ 1 & 0 \\end{vmatrix} = -2\\), \\(A_{32} = -\\begin{vmatrix} 1 & 2 \\\\ 3 & 0 \\end{vmatrix} = -(0 - 6) = 6\\), \\(A_{33} = +\\begin{vmatrix} 1 & 0 \\\\ 3 & 1 \\end{vmatrix} = 1\\).",
          "Matrix of co-factors: \\(\\begin{bmatrix} 1 & -3 & 6 \\\\ 4 & 1 & -2 \\\\ -2 & 6 & 1 \\end{bmatrix}\\).",
          "Check along row 1: \\(1(1) + 0(-3) + 2(6) = 13\\), and \\(|A| = 1(1 - 0) - 0 + 2(6 - 0) = 13\\).",
        ],
        answer: "\\([A_{ij}] = \\begin{bmatrix} 1 & -3 & 6 \\\\ 4 & 1 & -2 \\\\ -2 & 6 & 1 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "For \\(A = \\begin{bmatrix} 1 & 2 & 0 \\\\ 3 & -1 & 4 \\\\ 2 & 1 & 5 \\end{bmatrix}\\), find the co-factor \\(A_{23}\\).",
        steps: [
          "Delete row 2 and column 3: \\(M_{23} = \\begin{vmatrix} 1 & 2 \\\\ 2 & 1 \\end{vmatrix} = 1 - 4 = -3\\).",
          "\\(A_{23} = (-1)^{2+3}(-3) = 3\\).",
        ],
        answer: "\\(A_{23} = 3\\)",
      },
      practiceSet: [
        { prompt: "What is the sign attached to the minor of the element in row 3, column 2?", answer: "Minus, since \\((-1)^{3+2} = -1\\)" },
        { prompt: "What is the order of the minor of an element of a 3 by 3 determinant?", answer: "2 (it is a 2 by 2 determinant)" },
        { prompt: "For a 2 by 2 matrix \\(A\\), what is \\(a_{11}A_{11} + a_{12}A_{12}\\) equal to?", answer: "\\(|A|\\)" },
      ],
      pyqExampleId: "90aabfad-f325-49c5-8ae9-b5edb6ba1809",
      traps: [
        {
          title: "Writing the minor as the co-factor",
          body: "The co-factor carries the sign \\((-1)^{i+j}\\). For the elements at places (1, 2) and (2, 1) the co-factor is minus the minor, and leaving the sign out loses the mark.",
        },
        {
          title: "Taking the wrong element as a 2 by 2 minor",
          body: "Deleting row 1 and column 2 of a 2 by 2 matrix leaves \\(a_{21}\\), not \\(a_{22}\\). Cross out the row and the column every time instead of guessing.",
        },
        {
          title: "Transposing when co-factors are asked",
          body: "'Find the matrix of co-factors' wants \\([A_{ij}]\\) with each co-factor in its own place. Its transpose is the adjoint, a different answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmmx-adjoint",
      name: "The adjoint of a square matrix",
      intuition:
        "Once you have the matrix of co-factors, one more step gives the adjoint: turn its rows into columns. For a 2 by 2 matrix the whole process collapses into a shortcut you can do at sight: swap the two diagonal elements and change the signs of the other two.",
      definition:
        "- \\(\\text{adj}\\,A\\) is the **transpose** of the matrix of co-factors: \\(\\text{adj}\\,A = [A_{ij}]^T\\).\n" +
        "- For a 3 by 3 matrix: \\(\\text{adj}\\,A = \\begin{bmatrix} A_{11} & A_{21} & A_{31} \\\\ A_{12} & A_{22} & A_{32} \\\\ A_{13} & A_{23} & A_{33} \\end{bmatrix}\\).\n" +
        "- For \\(A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\): \\(\\text{adj}\\,A = \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}\\).\n" +
        "- In a written answer show the co-factors, then the transpose; the shortcut alone is fine for an MCQ.",
      formula: {
        label: "Adjoint",
        latex: "\\text{adj}\\,A = [A_{ij}]^{T}, \\qquad \\text{adj}\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}",
      },
      authoredExample: {
        prompt: "Find the adjoint of \\(A = \\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 3 \\\\ 2 & 0 & 1 \\end{bmatrix}\\).",
        steps: [
          "Co-factors, \\(A_{ij} = (-1)^{i+j}M_{ij}\\):",
          "\\(A_{11} = +(1 - 0) = 1\\), \\(A_{12} = -(0 - 6) = 6\\), \\(A_{13} = +(0 - 2) = -2\\).",
          "\\(A_{21} = -(2 - 0) = -2\\), \\(A_{22} = +(1 - 0) = 1\\), \\(A_{23} = -(0 - 4) = 4\\).",
          "\\(A_{31} = +(6 - 0) = 6\\), \\(A_{32} = -(3 - 0) = -3\\), \\(A_{33} = +(1 - 0) = 1\\).",
          "Matrix of co-factors: \\(\\begin{bmatrix} 1 & 6 & -2 \\\\ -2 & 1 & 4 \\\\ 6 & -3 & 1 \\end{bmatrix}\\).",
          "\\(\\text{adj}\\,A\\) = its transpose \\(= \\begin{bmatrix} 1 & -2 & 6 \\\\ 6 & 1 & -3 \\\\ -2 & 4 & 1 \\end{bmatrix}\\).",
        ],
        answer: "\\(\\text{adj}\\,A = \\begin{bmatrix} 1 & -2 & 6 \\\\ 6 & 1 & -3 \\\\ -2 & 4 & 1 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "The matrix of co-factors of a matrix \\(A\\) is \\(\\begin{bmatrix} 2 & -1 & 0 \\\\ 3 & 4 & -2 \\\\ 1 & 0 & 5 \\end{bmatrix}\\). Write \\(\\text{adj}\\,A\\).",
        steps: ["The adjoint is the transpose: the first row becomes the first column, and so on."],
        answer: "\\(\\begin{bmatrix} 2 & 3 & 1 \\\\ -1 & 4 & 0 \\\\ 0 & -2 & 5 \\end{bmatrix}\\)",
      },
      practiceSet: [
        { prompt: "Is the adjoint the matrix of co-factors or its transpose?", answer: "Its transpose" },
        { prompt: "How many co-factors must you find to write the adjoint of a 3 by 3 matrix?", answer: "Nine, one for each element" },
      ],
      pyqExampleId: "00d77209-76bd-464c-80d6-08a7611b8b11",
      traps: [
        {
          title: "Changing the wrong signs in the 2 by 2 shortcut",
          body: "In \\(\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}\\) the diagonal elements swap places and keep their signs; the other two stay in place and change sign. MCQ options are built from the other sign patterns.",
        },
        {
          title: "Forgetting the transpose for a 3 by 3 matrix",
          body: "Writing the co-factors in their own places gives the matrix of co-factors, not the adjoint. For a 3 by 3 matrix the two differ, so the inverse built on it comes out wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmmx-adj-identity",
      name: "A(adj A) = (adj A)A = |A| I",
      intuition:
        "Multiply a matrix by its adjoint and something neat happens. On the diagonal, each row of A meets its own co-factors, which is exactly the expansion of |A|. Off the diagonal, a row meets the co-factors of a different row, which is the expansion of a determinant with two equal rows, so it is 0. The product is |A| on the diagonal and 0 elsewhere: |A| times I. This is the result behind the adjoint method for the inverse.",
      definition:
        "- \\(a_{11}A_{11} + a_{12}A_{12} + a_{13}A_{13} = |A|\\): a row times its own co-factors gives the determinant.\n" +
        "- \\(a_{11}A_{21} + a_{12}A_{22} + a_{13}A_{23} = 0\\): a row times the co-factors of another row gives 0, because it is the expansion of a determinant with two identical rows.\n" +
        "- Hence \\(A(\\text{adj}\\,A) = (\\text{adj}\\,A)A = |A|\\,I\\).\n" +
        "- **To verify for a given matrix:** find \\(\\text{adj}\\,A\\); work out \\(A(\\text{adj}\\,A)\\) ...(i); work out \\((\\text{adj}\\,A)A\\) ...(ii); find \\(|A|\\) and \\(|A|\\,I\\) ...(iii); conclude 'from (i), (ii) and (iii)'.",
      formula: {
        label: "Adjoint identity",
        latex: "A(\\text{adj}\\,A) = (\\text{adj}\\,A)A = |A|\\,I",
      },
      authoredExample: {
        prompt: "For \\(A = \\begin{bmatrix} 3 & 1 \\\\ 2 & 2 \\end{bmatrix}\\), find \\(\\text{adj}\\,A\\), work out \\(A(\\text{adj}\\,A)\\), and hence write \\(|A|\\).",
        steps: [
          "\\(A_{11} = 2\\), \\(A_{12} = -2\\), \\(A_{21} = -1\\), \\(A_{22} = 3\\), so \\(\\text{adj}\\,A = \\begin{bmatrix} 2 & -1 \\\\ -2 & 3 \\end{bmatrix}\\).",
          "\\(A(\\text{adj}\\,A) = \\begin{bmatrix} 3 & 1 \\\\ 2 & 2 \\end{bmatrix}\\begin{bmatrix} 2 & -1 \\\\ -2 & 3 \\end{bmatrix} = \\begin{bmatrix} 6 - 2 & -3 + 3 \\\\ 4 - 4 & -2 + 6 \\end{bmatrix} = \\begin{bmatrix} 4 & 0 \\\\ 0 & 4 \\end{bmatrix}\\).",
          "This is \\(4I\\), and \\(A(\\text{adj}\\,A) = |A|\\,I\\), so \\(|A| = 4\\).",
          "Check: \\(|A| = (3)(2) - (1)(2) = 4\\).",
        ],
        answer: "\\(\\text{adj}\\,A = \\begin{bmatrix} 2 & -1 \\\\ -2 & 3 \\end{bmatrix}\\), \\(A(\\text{adj}\\,A) = 4I\\), \\(|A| = 4\\)",
      },
      selfCheckExample: {
        prompt: "For a 2 by 2 matrix \\(A\\), \\(A(\\text{adj}\\,A) = \\begin{bmatrix} -7 & 0 \\\\ 0 & -7 \\end{bmatrix}\\). Find \\(|A|\\).",
        steps: ["\\(A(\\text{adj}\\,A) = |A|\\,I = -7I\\)."],
        answer: "\\(|A| = -7\\)",
      },
      practiceSet: [
        { prompt: "For a 3 by 3 matrix, what is \\(a_{21}A_{11} + a_{22}A_{12} + a_{23}A_{13}\\)?", answer: "0 (row 2 with the co-factors of row 1)" },
        { prompt: "If \\(A\\) is a 3 by 3 matrix with \\(|A| = 6\\), what is \\((\\text{adj}\\,A)A\\)?", answer: "\\(6I_3\\)" },
      ],
      pyqExampleId: "785e1811-563e-4ad4-b36e-ff46939eebc3",
      traps: [
        {
          title: "Working out only one product",
          body: "'Verify that \\(A(\\text{adj}\\,A) = (\\text{adj}\\,A)A = |A|\\,I\\)' has three parts. Work out both products and \\(|A|\\,I\\), number them, and conclude from all three.",
        },
        {
          title: "Writing |A| where |A| I is needed",
          body: "\\(A(\\text{adj}\\,A)\\) is a matrix, so it equals the matrix \\(|A|\\,I\\), not the number \\(|A|\\).",
        },
      ],
    },
  ],
};
