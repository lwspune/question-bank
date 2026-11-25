import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_DT_COFACTORS_NOTE: SubtopicNote = {
  subtopicName: "Minors and Cofactors",
  title: "Minors and Cofactors",
  oneLineDefinition:
    "The minor of an element is the determinant left when its row and column are deleted; the cofactor is the minor with the sign (−1) to the power i + j, and a determinant is the sum of the elements of any row times their own cofactors.",
  whyItMatters:
    "13 questions, two of them from board papers, both in 2024: each gave a 3 by 3 matrix and asked for the elements of one row multiplied by the cofactors of another row, which is always zero. The textbook adds Exercise 4.3 and Examples 8 to 11. Cofactors are the working parts of the adjoint, so every inverse on the next pages is built from them.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmdt-minor",
      name: "Minor and cofactor of an element",
      intuition:
        "Cover the row and the column of an element; the determinant that is left is its minor. The cofactor is the same number with a sign taken from the + − + chessboard pattern. Cofactors are just the signed pieces you already use when you expand a determinant.",
      definition:
        "- **Minor** \\(M_{ij}\\) of \\(a_{ij}\\): the determinant obtained by deleting the \\(i\\)th row and \\(j\\)th column.\n" +
        "- The minor of an element of a determinant of order \\(n\\) is a determinant of order \\(n - 1\\).\n" +
        "- **Cofactor** \\(A_{ij} = (-1)^{i+j}M_{ij}\\).\n" +
        "- When \\(i + j\\) is even the cofactor equals the minor; when \\(i + j\\) is odd it is the minor with its sign changed.\n" +
        "- For order 2, \\(\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}\\) has \\(A_{11} = d\\), \\(A_{12} = -c\\), \\(A_{21} = -b\\), \\(A_{22} = a\\).",
      formula: {
        label: "Cofactor from minor",
        latex: "A_{ij} = (-1)^{i+j} M_{ij}",
        symbols: [
          { symbol: "\\(M_{ij}\\)", meaning: "minor of the element in row i, column j" },
          { symbol: "\\(A_{ij}\\)", meaning: "cofactor of that element" },
        ],
      },
      authoredExample: {
        prompt: "For \\(\\Delta = \\begin{vmatrix} 2 & -1 & 3 \\\\ 4 & 0 & 5 \\\\ 1 & 6 & -2 \\end{vmatrix}\\), find the minors and cofactors of the elements of the first row and of \\(a_{23}\\). Hence find \\(\\Delta\\).",
        steps: [
          "\\(M_{11} = \\begin{vmatrix} 0 & 5 \\\\ 6 & -2 \\end{vmatrix} = 0 - 30 = -30\\); \\(A_{11} = (+1)(-30) = -30\\).",
          "\\(M_{12} = \\begin{vmatrix} 4 & 5 \\\\ 1 & -2 \\end{vmatrix} = -8 - 5 = -13\\); \\(A_{12} = (-1)(-13) = 13\\).",
          "\\(M_{13} = \\begin{vmatrix} 4 & 0 \\\\ 1 & 6 \\end{vmatrix} = 24 - 0 = 24\\); \\(A_{13} = (+1)(24) = 24\\).",
          "\\(M_{23} = \\begin{vmatrix} 2 & -1 \\\\ 1 & 6 \\end{vmatrix} = 12 + 1 = 13\\); \\(A_{23} = (-1)^{5}(13) = -13\\).",
          "\\(\\Delta = a_{11}A_{11} + a_{12}A_{12} + a_{13}A_{13} = 2(-30) + (-1)(13) + 3(24)\\).",
          "\\(= -60 - 13 + 72 = -1\\).",
        ],
        answer: "\\(A_{11} = -30\\), \\(A_{12} = 13\\), \\(A_{13} = 24\\), \\(A_{23} = -13\\); \\(\\Delta = -1\\)",
      },
      selfCheckExample: {
        prompt: "Write the minors and cofactors of all the elements of \\(\\begin{vmatrix} 5 & -2 \\\\ 3 & 7 \\end{vmatrix}\\).",
        steps: [
          "Minors: \\(M_{11} = 7\\), \\(M_{12} = 3\\), \\(M_{21} = -2\\), \\(M_{22} = 5\\).",
          "Cofactors: \\(A_{11} = 7\\), \\(A_{12} = -3\\), \\(A_{21} = -(-2) = 2\\), \\(A_{22} = 5\\).",
        ],
        answer: "\\(M_{11} = 7, M_{12} = 3, M_{21} = -2, M_{22} = 5\\); \\(A_{11} = 7, A_{12} = -3, A_{21} = 2, A_{22} = 5\\)",
      },
      practiceSet: [
        { prompt: "In \\(\\begin{vmatrix} 2 & 0 & -1 \\\\ 3 & 4 & 1 \\\\ -2 & 5 & 6 \\end{vmatrix}\\), find the cofactor \\(A_{32}\\).", answer: "\\(-5\\)", method: "\\(-\\begin{vmatrix} 2 & -1 \\\\ 3 & 1 \\end{vmatrix}\\)" },
        { prompt: "In \\(\\begin{vmatrix} 2 & 0 & -1 \\\\ 3 & 4 & 1 \\\\ -2 & 5 & 6 \\end{vmatrix}\\), find the minor \\(M_{21}\\) and the cofactor \\(A_{21}\\).", answer: "\\(M_{21} = 5\\), \\(A_{21} = -5\\)" },
      ],
      pyqExampleId: "216ce57e-2c38-4098-a303-c7399f61f0c5",
      traps: [
        {
          title: "Calling a minor a cofactor",
          body: "A cofactor carries the sign \\((-1)^{i+j}\\). For \\(a_{12}\\), \\(a_{21}\\), \\(a_{23}\\) and \\(a_{32}\\) the cofactor is the minor with its sign changed.",
        },
        {
          title: "Deleting the wrong line",
          body: "For \\(M_{23}\\) delete row 2 and column 3. Deleting column 2 and row 3 gives \\(M_{32}\\), a different number.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmdt-cofactor-sum",
      name: "Expansion by cofactors, and the sum that is always zero",
      intuition:
        "A determinant equals the elements of any one row (or column) times their own cofactors, added. If you take the elements of one row with the cofactors of a different row, you have expanded a determinant with two equal rows, and that determinant is zero.",
      definition:
        "- \\(\\Delta = a_{11}A_{11} + a_{12}A_{12} + a_{13}A_{13}\\), and the same along any row or column.\n" +
        "- Elements of a row (or column) multiplied by the cofactors of **another** row (or column) add up to zero.\n" +
        "- For example, \\(a_{11}A_{21} + a_{12}A_{22} + a_{13}A_{23}\\) is the expansion along \\(R_2\\) of the determinant whose first two rows are both \\(a_{11}, a_{12}, a_{13}\\), and its value is 0.\n" +
        "- These two facts give \\(A(\\operatorname{adj} A) = |A|I\\) on the next page.",
      formula: {
        label: "Expansion by own cofactors, and by another row's cofactors",
        latex: "a_{i1}A_{i1} + a_{i2}A_{i2} + a_{i3}A_{i3} = \\Delta, \\qquad a_{i1}A_{k1} + a_{i2}A_{k2} + a_{i3}A_{k3} = 0 \\ (i \\ne k)",
      },
      authoredExample: {
        prompt: "Using the cofactors of the elements of the third row, evaluate \\(\\Delta = \\begin{vmatrix} 1 & -2 & 3 \\\\ 0 & 4 & -1 \\\\ 2 & 1 & 1 \\end{vmatrix}\\).",
        steps: [
          "\\(A_{31} = (+1)\\begin{vmatrix} -2 & 3 \\\\ 4 & -1 \\end{vmatrix} = 2 - 12 = -10\\).",
          "\\(A_{32} = (-1)\\begin{vmatrix} 1 & 3 \\\\ 0 & -1 \\end{vmatrix} = -(-1 - 0) = 1\\).",
          "\\(A_{33} = (+1)\\begin{vmatrix} 1 & -2 \\\\ 0 & 4 \\end{vmatrix} = 4 - 0 = 4\\).",
          "\\(\\Delta = a_{31}A_{31} + a_{32}A_{32} + a_{33}A_{33} = 2(-10) + 1(1) + 1(4)\\).",
          "\\(= -20 + 1 + 4 = -15\\).",
        ],
        answer: "\\(\\Delta = -15\\)",
      },
      selfCheckExample: {
        prompt: "Using the cofactors of the elements of the second column, evaluate \\(\\begin{vmatrix} 2 & 1 & 3 \\\\ 1 & 0 & 4 \\\\ 2 & 2 & 1 \\end{vmatrix}\\).",
        steps: [
          "\\(A_{12} = -\\begin{vmatrix} 1 & 4 \\\\ 2 & 1 \\end{vmatrix} = -(1 - 8) = 7\\).",
          "\\(A_{22} = \\begin{vmatrix} 2 & 3 \\\\ 2 & 1 \\end{vmatrix} = 2 - 6 = -4\\).",
          "\\(A_{32} = -\\begin{vmatrix} 2 & 3 \\\\ 1 & 4 \\end{vmatrix} = -(8 - 3) = -5\\).",
          "\\(\\Delta = 1(7) + 0(-4) + 2(-5) = 7 - 10 = -3\\).",
        ],
        answer: "\\(-3\\)",
      },
      practiceSet: [
        { prompt: "Using the cofactors of the second column, evaluate \\(\\begin{vmatrix} 1 & 0 & 2 \\\\ 3 & 1 & 0 \\\\ 0 & 2 & 1 \\end{vmatrix}\\).", answer: "\\(13\\)", method: "\\(A_{12} = -3\\), \\(A_{22} = 1\\), \\(A_{32} = 6\\)" },
        { prompt: "A determinant of order 3 has value 12. Find \\(a_{21}A_{21} + a_{22}A_{22} + a_{23}A_{23}\\).", answer: "\\(12\\)", method: "Elements of a row times their own cofactors give the determinant." },
        { prompt: "Write \\(\\Delta\\) of order 3 in terms of the elements of the third column and their cofactors.", answer: "\\(\\Delta = a_{13}A_{13} + a_{23}A_{23} + a_{33}A_{33}\\)" },
      ],
      pyqExampleId: "657ff351-860e-4a05-92a3-b4f1d3cf9f25",
      traps: [
        {
          title: "Expecting the determinant from mixed rows",
          body: "\\(a_{11}A_{21} + a_{12}A_{22} + a_{13}A_{23}\\) is not \\(\\Delta\\). Elements of one row with cofactors of another row always give 0.",
        },
        {
          title: "Using minors in the expansion",
          body: "\\(\\Delta = a_{21}M_{21} + a_{22}M_{22} + a_{23}M_{23}\\) is wrong: the expansion uses cofactors, so the signs \\(- \\; + \\; -\\) of the second row must be in it.",
        },
      ],
    },
  ],
};
