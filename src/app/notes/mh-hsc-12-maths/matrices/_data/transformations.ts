import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_MX_TRANSFORMATIONS_NOTE: SubtopicNote = {
  subtopicName: "Elementary Transformations of a Matrix",
  title: "Elementary Transformations of a Matrix",
  oneLineDefinition:
    "The six row and column operations, how to write them, and how to use them to turn a matrix into a triangular matrix or into the identity matrix.",
  whyItMatters:
    "15 questions, one of them from a board paper: a 2015 MCQ on the power of a scalar matrix. The rest are Exercise 2.1, its solved examples and the first questions of Miscellaneous Exercise 2(A). In this bank the board has not set a question on the transformations alone, but every inverse by row or column transformations and every solution by the method of reduction is a chain of these moves, so they must be quick and exact.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmmx-operations",
      name: "The six elementary transformations and how to write them",
      intuition:
        "An elementary transformation is one simple move on the rows, or on the columns, of a matrix. There are only three kinds of move, and each can be done to rows or to columns, so there are six in all. After a move the new matrix is not equal to the old one, so we say it is equivalent to it and write the sign ~ between them.",
      definition:
        "- **Interchange** two rows or two columns: \\(R_i \\leftrightarrow R_j\\) or \\(C_i \\leftrightarrow C_j\\).\n" +
        "- **Multiply** every element of one row or column by a non-zero scalar \\(k\\): \\(R_i \\to kR_i\\) or \\(C_i \\to kC_i\\).\n" +
        "- **Add** \\(k\\) times one row (column) to another row (column): \\(R_j \\to R_j + kR_i\\) or \\(C_j \\to C_j + kC_i\\). The row \\(R_i\\) itself does not change.\n" +
        "- The matrix obtained is **equivalent** to the original one: write \\(A \\sim B\\), never \\(A = B\\).\n" +
        "- When two moves are asked for in order, do the first, write the matrix, then do the second on that new matrix.",
      formula: {
        label: "Notation for the moves",
        latex:
          "R_i \\leftrightarrow R_j, \\quad R_i \\to kR_i\\ (k \\neq 0), \\quad R_j \\to R_j + kR_i \\qquad (\\text{the same with } C \\text{ for columns})",
        symbols: [
          { symbol: "\\(R_i\\)", meaning: "the i-th row of the matrix" },
          { symbol: "\\(C_j\\)", meaning: "the j-th column of the matrix" },
          { symbol: "\\(k\\)", meaning: "a non-zero real number" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(A = \\begin{bmatrix} 2 & 1 \\\\ 3 & -1 \\end{bmatrix}\\), apply \\(R_2 \\to R_2 - R_1\\) and then \\(C_1 \\leftrightarrow C_2\\) on \\(A\\).",
        steps: [
          "Given: \\(A = \\begin{bmatrix} 2 & 1 \\\\ 3 & -1 \\end{bmatrix}\\).",
          "\\(R_2 \\to R_2 - R_1\\): the new second row is \\((3 - 2,\\ -1 - 1) = (1,\\ -2)\\); the first row stays as it is.",
          "\\(A \\sim \\begin{bmatrix} 2 & 1 \\\\ 1 & -2 \\end{bmatrix}\\).",
          "\\(C_1 \\leftrightarrow C_2\\): interchange the two columns of this new matrix.",
          "\\(A \\sim \\begin{bmatrix} 1 & 2 \\\\ -2 & 1 \\end{bmatrix}\\).",
        ],
        answer: "\\(A \\sim \\begin{bmatrix} 1 & 2 \\\\ -2 & 1 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "Apply \\(C_2 \\to 3C_2\\) on \\(\\begin{bmatrix} 1 & 4 \\\\ 2 & 0 \\end{bmatrix}\\).",
        steps: ["Multiply every element of the second column by 3: \\(4 \\to 12\\) and \\(0 \\to 0\\)."],
        answer: "\\(\\begin{bmatrix} 1 & 12 \\\\ 2 & 0 \\end{bmatrix}\\)",
      },
      practiceSet: [
        { prompt: "Which sign is written between a matrix and the matrix obtained from it by an elementary transformation?", answer: "The sign ~ (is equivalent to)" },
        {
          prompt: "Apply \\(R_1 \\leftrightarrow R_2\\) on \\(\\begin{bmatrix} 0 & 5 \\\\ 1 & 2 \\end{bmatrix}\\).",
          answer: "\\(\\begin{bmatrix} 1 & 2 \\\\ 0 & 5 \\end{bmatrix}\\)",
        },
        {
          prompt: "Apply \\(C_2 \\to C_2 + 2C_1\\) on \\(\\begin{bmatrix} 1 & 0 \\\\ 3 & 1 \\end{bmatrix}\\).",
          answer: "\\(\\begin{bmatrix} 1 & 2 \\\\ 3 & 7 \\end{bmatrix}\\)",
        },
      ],
      pyqExampleId: "2c846d43-3661-4b52-8635-03e8e5d2a493",
      traps: [
        {
          title: "Writing = instead of ~",
          body: "After a transformation the matrix has changed, so \\(A = \\begin{bmatrix} 1 & 2 \\\\ -2 & 1 \\end{bmatrix}\\) is false. Write \\(A \\sim\\), which is how the textbook writes every step.",
        },
        {
          title: "Changing both rows in an add move",
          body: "In \\(R_j \\to R_j + kR_i\\) only \\(R_j\\) changes. The row \\(R_i\\) that you add is copied down unchanged.",
        },
        {
          title: "Multiplying by zero",
          body: "\\(R_i \\to 0 \\cdot R_i\\) is not an elementary transformation. The scalar must be non-zero, or the move cannot be undone.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmmx-reduce",
      name: "Reducing a matrix to a triangular matrix or to the identity",
      intuition:
        "The same moves can be used with a goal in mind: make zeros in chosen places. If all entries below the leading diagonal become zero you have an upper triangular matrix. If you go on until the diagonal is all 1s and everything else is 0, you have the identity matrix. Work one column at a time, top to bottom, so that a zero you have made is never spoiled by a later move.",
      definition:
        "- **Upper triangular:** every element below the leading diagonal is zero.\n" +
        "- The textbook's order for reducing a 3 by 3 matrix to \\(I_3\\) by row transformations:\n" +
        "- (1) make \\(a_{11} = 1\\); (2) make \\(a_{21}\\) and \\(a_{31}\\) zero;\n" +
        "- (3) make \\(a_{22} = 1\\); (4) make \\(a_{12}\\) and \\(a_{32}\\) zero;\n" +
        "- (5) make \\(a_{33} = 1\\); (6) make \\(a_{13}\\) and \\(a_{23}\\) zero.\n" +
        "- If the question says row transformations, use rows only; if it says column transformations, use columns only.\n" +
        "- Write the move used above or beside every new matrix.",
      formula: {
        label: "Goal of the reduction",
        latex: "A \\sim \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} = I_3",
      },
      authoredExample: {
        prompt: "Reduce \\(A = \\begin{bmatrix} 2 & 4 \\\\ 1 & 3 \\end{bmatrix}\\) to the identity matrix by row transformations.",
        steps: [
          "\\(R_1 \\to \\dfrac{1}{2}R_1\\): \\(A \\sim \\begin{bmatrix} 1 & 2 \\\\ 1 & 3 \\end{bmatrix}\\).",
          "\\(R_2 \\to R_2 - R_1\\): \\(A \\sim \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}\\).",
          "\\(R_1 \\to R_1 - 2R_2\\): \\(A \\sim \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = I\\).",
        ],
        answer: "\\(A \\sim I\\), using \\(R_1 \\to \\frac{1}{2}R_1\\), \\(R_2 \\to R_2 - R_1\\), \\(R_1 \\to R_1 - 2R_2\\)",
      },
      selfCheckExample: {
        prompt: "Convert \\(\\begin{bmatrix} 1 & 3 \\\\ 2 & 5 \\end{bmatrix}\\) into an upper triangular matrix by one row transformation.",
        steps: ["The element below the diagonal is 2. Use \\(R_2 \\to R_2 - 2R_1\\): \\((2 - 2,\\ 5 - 6) = (0,\\ -1)\\)."],
        answer: "\\(\\begin{bmatrix} 1 & 3 \\\\ 0 & -1 \\end{bmatrix}\\)",
      },
      practiceSet: [
        { prompt: "Which elements must be zero in an upper triangular 3 by 3 matrix?", answer: "\\(a_{21}\\), \\(a_{31}\\) and \\(a_{32}\\), the ones below the leading diagonal" },
        {
          prompt: "Which single row transformation turns \\(\\begin{bmatrix} 1 & 0 \\\\ 4 & 1 \\end{bmatrix}\\) into \\(I\\)?",
          answer: "\\(R_2 \\to R_2 - 4R_1\\)",
        },
        {
          prompt: "Which single column transformation turns \\(\\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}\\) into \\(I\\)?",
          answer: "\\(C_2 \\to C_2 - 2C_1\\)",
        },
      ],
      pyqExampleId: "6203eab7-7ceb-4cfb-85e0-6caa859518fa",
      traps: [
        {
          title: "Using a column move in a row question",
          body: "A question that says 'by row transformations' gives no marks for a step such as \\(C_2 \\to C_2 - C_1\\), even if the final matrix is right.",
        },
        {
          title: "Zeros above instead of below",
          body: "An upper triangular matrix has its zeros below the leading diagonal. A matrix with zeros above the diagonal is lower triangular.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmmx-scalar",
      name: "Powers of a scalar matrix (asked by the board in 2015)",
      intuition:
        "A scalar matrix has the same number k at every place on the leading diagonal and zeros elsewhere, so it is just k times the identity matrix. Multiplying it by itself multiplies the k's and leaves the identity as it is. This is algebra of matrices from Class 11: the present Class 12 chapter does not teach it, and the board asked it once in this bank (2015), so give it little time.",
      definition:
        "- A scalar matrix is \\(A = kI\\), with \\(k\\) on the leading diagonal and 0 elsewhere.\n" +
        "- Since \\(I^n = I\\), \\(A^n = (kI)^n = k^n I\\).\n" +
        "- To write the answer in terms of \\(A\\), use \\(I = \\dfrac{1}{k}A\\): \\(A^n = k^{n-1}A\\).",
      formula: {
        label: "Power of a scalar matrix",
        latex: "(kI)^n = k^n I = k^{n-1}A \\quad \\text{where } A = kI",
      },
      authoredExample: {
        prompt: "If \\(A = \\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}\\), show that \\(A^2 - 4A + 4I = O\\).",
        steps: [
          "\\(A = 2I\\), so \\(A^2 = 4I^2 = 4I\\).",
          "\\(4A = 4(2I) = 8I\\).",
          "\\(A^2 - 4A + 4I = 4I - 8I + 4I = 0 \\cdot I = O\\).",
        ],
        answer: "\\(A^2 - 4A + 4I = O\\), the zero matrix",
      },
      selfCheckExample: {
        prompt: "Write \\(\\begin{bmatrix} 3 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 3 \\end{bmatrix}\\) as a multiple of \\(I_3\\).",
        steps: ["Every diagonal element is 3 and every other element is 0."],
        answer: "\\(3I_3\\)",
      },
      practiceSet: [
        { prompt: "If \\(A = kI\\), what is \\(A^n\\) in terms of \\(I\\)?", answer: "\\(k^n I\\)" },
        { prompt: "If \\(A = \\begin{bmatrix} -1 & 0 \\\\ 0 & -1 \\end{bmatrix}\\), find \\(A^{10}\\).", answer: "\\(I\\), since \\((-1)^{10} = 1\\)" },
      ],
      pyqExampleId: "e34b60eb-8b8e-4922-b2e8-0e6aff8d7d7f",
      traps: [
        {
          title: "Changing I to A without dividing by k",
          body: "\\(A^n = k^n I\\) is not \\(k^n A\\). Since \\(A = kI\\), replacing \\(I\\) by \\(A\\) means dividing by \\(k\\), so \\(A^n = k^{n-1}A\\).",
        },
      ],
    },
  ],
};
