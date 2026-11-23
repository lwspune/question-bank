import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_MX_ELEMENTARY_NOTE: SubtopicNote = {
  subtopicName: "Inverse by Elementary Transformation Method",
  title: "Inverse of a Matrix by Elementary Transformations",
  oneLineDefinition:
    "What the inverse of a square matrix is, when it exists, and how to find it by a chain of row transformations on AA⁻¹ = I or of column transformations on A⁻¹A = I.",
  whyItMatters:
    "15 questions, four of them from board papers, all written answers: the inverse of a 3 by 3 matrix by row transformations (2018), of a diagonal matrix x, y, z followed by a numerical one (2023), of a 2 by 2 matrix (2024) and of the rotation matrix with cos θ and sin θ (2025). The textbook adds the column method, which the board has not yet asked in this bank.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmmx-row-inverse",
      name: "Inverse by elementary row transformations",
      intuition:
        "The inverse of A is the matrix that multiplies A to give I. Start from the true statement AA⁻¹ = I. A row transformation on a product acts only on the first factor, so you may apply it to A and to the I on the right, and A⁻¹ in the middle is untouched. Keep going until A has become I. The equation then reads I A⁻¹ = B, so the matrix B on the right is the inverse.",
      definition:
        "- **Definition:** if \\(A\\) is a square matrix and there is a square matrix \\(B\\) of the same order with \\(AB = BA = I\\), then \\(B\\) is the inverse of \\(A\\), written \\(A^{-1}\\).\n" +
        "- \\(A^{-1}\\) exists only when \\(|A| \\neq 0\\), so first find \\(|A|\\) and write that \\(A^{-1}\\) exists.\n" +
        "- Write \\(AA^{-1} = I\\) with the matrices in full.\n" +
        "- Apply each row transformation to \\(A\\) (the prefactor) and to \\(I\\) on the right side; never to \\(A^{-1}\\).\n" +
        "- When the left side has become \\(IA^{-1}\\), the right side is \\(A^{-1}\\).\n" +
        "- Order of work for a 3 by 3 matrix: make \\(a_{11} = 1\\), clear the rest of column 1, make \\(a_{22} = 1\\), clear column 2, make \\(a_{33} = 1\\), clear column 3.",
      formula: {
        label: "Row method",
        latex: "AA^{-1} = I \\ \\xrightarrow{\\text{row transformations}}\\ IA^{-1} = B, \\quad \\therefore A^{-1} = B",
      },
      authoredExample: {
        prompt: "Find the inverse of \\(A = \\begin{bmatrix} 3 & 1 \\\\ 5 & 2 \\end{bmatrix}\\) by elementary row transformations.",
        steps: [
          "\\(|A| = (3)(2) - (1)(5) = 1 \\neq 0\\), so \\(A^{-1}\\) exists.",
          "Consider \\(AA^{-1} = I\\): \\(\\begin{bmatrix} 3 & 1 \\\\ 5 & 2 \\end{bmatrix}A^{-1} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}\\).",
          "\\(R_2 \\to R_2 - R_1\\): \\(\\begin{bmatrix} 3 & 1 \\\\ 2 & 1 \\end{bmatrix}A^{-1} = \\begin{bmatrix} 1 & 0 \\\\ -1 & 1 \\end{bmatrix}\\).",
          "\\(R_1 \\to R_1 - R_2\\): \\(\\begin{bmatrix} 1 & 0 \\\\ 2 & 1 \\end{bmatrix}A^{-1} = \\begin{bmatrix} 2 & -1 \\\\ -1 & 1 \\end{bmatrix}\\).",
          "\\(R_2 \\to R_2 - 2R_1\\): \\(\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}A^{-1} = \\begin{bmatrix} 2 & -1 \\\\ -5 & 3 \\end{bmatrix}\\).",
          "\\(\\therefore A^{-1} = \\begin{bmatrix} 2 & -1 \\\\ -5 & 3 \\end{bmatrix}\\).",
          "Check: \\(\\begin{bmatrix} 3 & 1 \\\\ 5 & 2 \\end{bmatrix}\\begin{bmatrix} 2 & -1 \\\\ -5 & 3 \\end{bmatrix} = \\begin{bmatrix} 6 - 5 & -3 + 3 \\\\ 10 - 10 & -5 + 6 \\end{bmatrix} = I\\).",
        ],
        answer: "\\(A^{-1} = \\begin{bmatrix} 2 & -1 \\\\ -5 & 3 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "Find the inverse of \\(\\begin{bmatrix} 1 & 0 \\\\ 2 & 1 \\end{bmatrix}\\) by a row transformation.",
        steps: [
          "\\(|A| = 1 \\neq 0\\). In \\(AA^{-1} = I\\) apply \\(R_2 \\to R_2 - 2R_1\\) to \\(A\\) and to \\(I\\).",
          "The left side becomes \\(IA^{-1}\\) and the right side becomes \\(\\begin{bmatrix} 1 & 0 \\\\ -2 & 1 \\end{bmatrix}\\).",
        ],
        answer: "\\(\\begin{bmatrix} 1 & 0 \\\\ -2 & 1 \\end{bmatrix}\\)",
      },
      practiceSet: [
        { prompt: "Which equation do you start from to find an inverse by row transformations?", answer: "\\(AA^{-1} = I\\)" },
        { prompt: "What must you check before you start the row transformations?", answer: "That \\(|A| \\neq 0\\), so that \\(A^{-1}\\) exists" },
        {
          prompt: "Find the inverse of \\(\\begin{bmatrix} 1 & 3 \\\\ 0 & 1 \\end{bmatrix}\\) by one row transformation.",
          answer: "\\(R_1 \\to R_1 - 3R_2\\) gives \\(\\begin{bmatrix} 1 & -3 \\\\ 0 & 1 \\end{bmatrix}\\)",
        },
      ],
      pyqExampleId: "3ee3ed2f-0b7a-4af2-a5a5-dfe125e70b35",
      traps: [
        {
          title: "Transforming the wrong factor",
          body: "In \\(AA^{-1} = I\\) a row transformation acts on \\(A\\), the prefactor, and on \\(I\\). Changing the rows of \\(A^{-1}\\) as well makes the working wrong from that line on.",
        },
        {
          title: "Slipping in a column move",
          body: "Once you have started with \\(AA^{-1} = I\\), every move must be a row move. One column move in the middle breaks the method, even if the answer happens to come out right.",
        },
        {
          title: "Not checking that the inverse exists",
          body: "Find \\(|A|\\) first and write \\(|A| \\neq 0\\), so \\(A^{-1}\\) exists. Board answers give this line a mark, and it saves you from working on a matrix that has no inverse.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmmx-column-inverse",
      name: "Inverse by elementary column transformations",
      intuition:
        "The column method is the mirror of the row method. Start from A⁻¹A = I instead. A column transformation on a product acts only on the second factor, so here it acts on A, which is now the post-factor, and on I. When A has become I, the right side is A⁻¹.",
      definition:
        "- Check \\(|A| \\neq 0\\).\n" +
        "- Write \\(A^{-1}A = I\\) with the matrices in full.\n" +
        "- Apply each column transformation to \\(A\\) (the post-factor) and to \\(I\\); \\(A^{-1}\\) is untouched.\n" +
        "- When the left side has become \\(A^{-1}I\\), the right side is \\(A^{-1}\\).",
      formula: {
        label: "Column method",
        latex: "A^{-1}A = I \\ \\xrightarrow{\\text{column transformations}}\\ A^{-1}I = B, \\quad \\therefore A^{-1} = B",
      },
      authoredExample: {
        prompt: "Find the inverse of \\(A = \\begin{bmatrix} 1 & 2 \\\\ 1 & 3 \\end{bmatrix}\\) by elementary column transformations.",
        steps: [
          "\\(|A| = 3 - 2 = 1 \\neq 0\\), so \\(A^{-1}\\) exists.",
          "Consider \\(A^{-1}A = I\\): \\(A^{-1}\\begin{bmatrix} 1 & 2 \\\\ 1 & 3 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}\\).",
          "\\(C_2 \\to C_2 - 2C_1\\): \\(A^{-1}\\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\end{bmatrix} = \\begin{bmatrix} 1 & -2 \\\\ 0 & 1 \\end{bmatrix}\\).",
          "\\(C_1 \\to C_1 - C_2\\): \\(A^{-1}\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 3 & -2 \\\\ -1 & 1 \\end{bmatrix}\\).",
          "\\(\\therefore A^{-1} = \\begin{bmatrix} 3 & -2 \\\\ -1 & 1 \\end{bmatrix}\\).",
          "Check: \\(\\begin{bmatrix} 1 & 2 \\\\ 1 & 3 \\end{bmatrix}\\begin{bmatrix} 3 & -2 \\\\ -1 & 1 \\end{bmatrix} = \\begin{bmatrix} 3 - 2 & -2 + 2 \\\\ 3 - 3 & -2 + 3 \\end{bmatrix} = I\\).",
        ],
        answer: "\\(A^{-1} = \\begin{bmatrix} 3 & -2 \\\\ -1 & 1 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "Find the inverse of \\(\\begin{bmatrix} 1 & 0 \\\\ 4 & 1 \\end{bmatrix}\\) by a column transformation.",
        steps: [
          "In \\(A^{-1}A = I\\) apply \\(C_1 \\to C_1 - 4C_2\\) to \\(A\\) and to \\(I\\).",
          "The left side becomes \\(A^{-1}I\\) and the right side becomes \\(\\begin{bmatrix} 1 & 0 \\\\ -4 & 1 \\end{bmatrix}\\).",
        ],
        answer: "\\(\\begin{bmatrix} 1 & 0 \\\\ -4 & 1 \\end{bmatrix}\\)",
      },
      practiceSet: [
        { prompt: "Which equation do you start from to find an inverse by column transformations?", answer: "\\(A^{-1}A = I\\)" },
        { prompt: "In the column method, which matrices do the transformations act on?", answer: "On \\(A\\), the post-factor, and on \\(I\\); never on \\(A^{-1}\\)" },
      ],
      pyqExampleId: "92311e49-5460-42ae-8cf3-1386b1640fdc",
      traps: [
        {
          title: "Starting the column method from AA⁻¹ = I",
          body: "In \\(AA^{-1} = I\\) a column move would act on the post-factor \\(A^{-1}\\), which is unknown. Columns go with \\(A^{-1}A = I\\); rows go with \\(AA^{-1} = I\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmmx-special-inverse",
      name: "Inverses of a diagonal matrix and of the rotation matrix",
      intuition:
        "Two matrices come up again and again. A diagonal matrix needs only one scaling move per row, so its inverse simply turns each diagonal entry upside down. The matrix with cos θ and sin θ has determinant cos²θ + sin²θ = 1, so it always has an inverse, and the working shows that the inverse is the same matrix with the signs of the sin θ entries changed, which is its transpose.",
      definition:
        "- \\(A = \\begin{bmatrix} x & 0 & 0 \\\\ 0 & y & 0 \\\\ 0 & 0 & z \\end{bmatrix}\\) has \\(|A| = xyz\\), so it is non-singular only when \\(x, y, z\\) are all non-zero.\n" +
        "- Row moves \\(R_1 \\to \\dfrac{1}{x}R_1\\), \\(R_2 \\to \\dfrac{1}{y}R_2\\), \\(R_3 \\to \\dfrac{1}{z}R_3\\) give \\(A^{-1} = \\begin{bmatrix} 1/x & 0 & 0 \\\\ 0 & 1/y & 0 \\\\ 0 & 0 & 1/z \\end{bmatrix}\\).\n" +
        "- For \\(\\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}\\) the inverse is \\(\\begin{bmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{bmatrix}\\); the 3 by 3 form with a 1 in the last place works the same way.\n" +
        "- Finish with a check by multiplication: \\(\\cos^2\\theta + \\sin^2\\theta = 1\\) on the diagonal.",
      formula: {
        label: "Inverse of a diagonal matrix",
        latex:
          "\\begin{bmatrix} x & 0 & 0 \\\\ 0 & y & 0 \\\\ 0 & 0 & z \\end{bmatrix}^{-1} = \\begin{bmatrix} \\frac{1}{x} & 0 & 0 \\\\ 0 & \\frac{1}{y} & 0 \\\\ 0 & 0 & \\frac{1}{z} \\end{bmatrix}, \\quad xyz \\neq 0",
      },
      authoredExample: {
        prompt:
          "Find the inverse of \\(A = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}\\) by elementary row transformations.",
        steps: [
          "\\(|A| = \\cos^2\\theta + \\sin^2\\theta = 1 \\neq 0\\), so \\(A^{-1}\\) exists. Take \\(\\cos\\theta \\neq 0\\) for the first move.",
          "Consider \\(AA^{-1} = I\\): \\(\\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}A^{-1} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}\\).",
          "\\(R_1 \\to \\dfrac{1}{\\cos\\theta}R_1\\): \\(\\begin{bmatrix} 1 & -\\tan\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}A^{-1} = \\begin{bmatrix} \\sec\\theta & 0 \\\\ 0 & 1 \\end{bmatrix}\\).",
          "\\(R_2 \\to R_2 - \\sin\\theta\\,R_1\\): \\(\\begin{bmatrix} 1 & -\\tan\\theta \\\\ 0 & \\sec\\theta \\end{bmatrix}A^{-1} = \\begin{bmatrix} \\sec\\theta & 0 \\\\ -\\tan\\theta & 1 \\end{bmatrix}\\), since \\(\\cos\\theta + \\sin\\theta\\tan\\theta = \\sec\\theta\\).",
          "\\(R_2 \\to \\cos\\theta\\,R_2\\): \\(\\begin{bmatrix} 1 & -\\tan\\theta \\\\ 0 & 1 \\end{bmatrix}A^{-1} = \\begin{bmatrix} \\sec\\theta & 0 \\\\ -\\sin\\theta & \\cos\\theta \\end{bmatrix}\\).",
          "\\(R_1 \\to R_1 + \\tan\\theta\\,R_2\\): \\(\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}A^{-1} = \\begin{bmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{bmatrix}\\), since \\(\\sec\\theta - \\tan\\theta\\sin\\theta = \\dfrac{1 - \\sin^2\\theta}{\\cos\\theta} = \\cos\\theta\\).",
          "\\(\\therefore A^{-1} = \\begin{bmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{bmatrix}\\).",
        ],
        answer: "\\(A^{-1} = \\begin{bmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "Does the diagonal matrix with diagonal entries 4, 0 and 7 have an inverse?",
        steps: ["Its determinant is the product of the diagonal entries: \\(4 \\times 0 \\times 7 = 0\\)."],
        answer: "No, it is singular",
      },
      practiceSet: [
        { prompt: "What is the inverse of \\(I_3\\)?", answer: "\\(I_3\\) itself" },
        {
          prompt: "Multiply \\(\\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}\\) by \\(\\begin{bmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{bmatrix}\\). What do you get?",
          answer: "\\(\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}\\), because \\(\\cos^2\\theta + \\sin^2\\theta = 1\\)",
        },
      ],
      pyqExampleId: "33fbf8e9-7769-479d-9f2b-e016c95d021c",
      traps: [
        {
          title: "Dividing without saying the divisor is non-zero",
          body: "A move such as \\(R_1 \\to \\dfrac{1}{x}R_1\\) or \\(R_1 \\to \\dfrac{1}{\\cos\\theta}R_1\\) needs the divisor to be non-zero. Write that condition beside the move.",
        },
        {
          title: "Losing a minus sign on the diagonal",
          body: "The inverse of a diagonal entry \\(-a\\) is \\(-\\dfrac{1}{a}\\), not \\(\\dfrac{1}{a}\\). Turn each entry upside down and keep its sign.",
        },
        {
          title: "Combining two row moves into one line",
          body: "Write each elementary transformation as its own step, such as \\(R_2 \\to R_2 - \\sin\\theta\\,R_1\\). A line like '\\(R_1 \\to \\cos\\theta\\,R_1 + \\sin\\theta\\,R_2\\)' is two moves at once and is not one elementary transformation.",
        },
      ],
    },
  ],
};
