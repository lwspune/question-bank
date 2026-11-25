import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_MT_ADDITION_NOTE: SubtopicNote = {
  subtopicName: "Addition and Scalar Multiplication",
  title: "Addition of Matrices and Multiplication by a Scalar",
  oneLineDefinition:
    "Adding and subtracting matrices of the same order element by element, multiplying a matrix by a number, the laws these operations obey, and solving matrix equations such as 2A + 3X = 5B.",
  whyItMatters:
    "21 questions, two of them from board papers: the matrix B that makes 2A + B a null matrix (2023) and the matrix C with A + B + C = O (2026). The textbook rows are the examples and exercises of the book's section on operations: sums and differences, scalar multiples, matrix equations such as 2A + 3X = 5B, a pair of equations in X + Y and X minus Y, and the rice-sales example in which the sum, the difference and 2% of a sales matrix are read as money.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmmt-add",
      name: "Adding and subtracting matrices",
      intuition:
        "Two tables of the same size can be added place by place: the number in row 1, column 1 of one is added to the number in row 1, column 1 of the other, and so on. That is all matrix addition is. If the tables have different sizes, some places have no partner, so the sum is not defined. Subtraction works the same way, one place at a time.",
      definition:
        "- If \\(A = [a_{ij}]\\) and \\(B = [b_{ij}]\\) have the **same order** \\(m \\times n\\), then \\(A + B = [a_{ij} + b_{ij}]\\) and \\(A - B = [a_{ij} - b_{ij}]\\).\n" +
        "- Matrices of different orders cannot be added or subtracted.\n" +
        "- **Commutative law:** \\(A + B = B + A\\).\n" +
        "- **Associative law:** \\((A + B) + C = A + (B + C)\\).\n" +
        "- **Additive identity:** \\(A + O = O + A = A\\), with \\(O\\) the zero matrix of the same order.\n" +
        "- **Additive inverse:** \\(-A = [-a_{ij}]\\), and \\(A + (-A) = O\\). So \\(A + X = O\\) gives \\(X = -A\\).",
      formula: {
        label: "Sum and difference",
        latex: "A + B = [a_{ij} + b_{ij}]_{m \\times n}, \\qquad A - B = [a_{ij} - b_{ij}]_{m \\times n}",
      },
      authoredExample: {
        prompt:
          "If \\(A = \\begin{bmatrix} 3 & -1 & 2 \\\\ 0 & 4 & -5 \\end{bmatrix}\\) and \\(B = \\begin{bmatrix} -2 & 6 & 1 \\\\ 5 & -3 & 0 \\end{bmatrix}\\), find \\(A + B\\) and \\(A - B\\).",
        steps: [
          "Both matrices are \\(2 \\times 3\\), so the sum and the difference are defined.",
          "\\(A + B = \\begin{bmatrix} 3 + (-2) & -1 + 6 & 2 + 1 \\\\ 0 + 5 & 4 + (-3) & -5 + 0 \\end{bmatrix} = \\begin{bmatrix} 1 & 5 & 3 \\\\ 5 & 1 & -5 \\end{bmatrix}\\).",
          "\\(A - B = \\begin{bmatrix} 3 - (-2) & -1 - 6 & 2 - 1 \\\\ 0 - 5 & 4 - (-3) & -5 - 0 \\end{bmatrix} = \\begin{bmatrix} 5 & -7 & 1 \\\\ -5 & 7 & -5 \\end{bmatrix}\\).",
        ],
        answer: "\\(A + B = \\begin{bmatrix} 1 & 5 & 3 \\\\ 5 & 1 & -5 \\end{bmatrix}\\), \\(A - B = \\begin{bmatrix} 5 & -7 & 1 \\\\ -5 & 7 & -5 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "Can \\(\\begin{bmatrix} 1 & 2 \\end{bmatrix} + \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}\\) be found?",
        steps: ["The first is \\(1 \\times 2\\) and the second is \\(2 \\times 1\\)."],
        answer: "No. The orders are different, so the sum is not defined",
      },
      practiceSet: [
        {
          prompt: "Find \\(\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} + \\begin{bmatrix} -a & 2b \\\\ c & 0 \\end{bmatrix}\\).",
          answer: "\\(\\begin{bmatrix} 0 & 3b \\\\ 2c & d \\end{bmatrix}\\)",
        },
        {
          prompt: "Write the additive inverse of \\(\\begin{bmatrix} 2 & -7 \\\\ 0 & 6 \\end{bmatrix}\\).",
          answer: "\\(\\begin{bmatrix} -2 & 7 \\\\ 0 & -6 \\end{bmatrix}\\)",
        },
        {
          prompt: "X is of order \\(2 \\times 3\\) and Y is of order \\(3 \\times 2\\). Is \\(X + Y\\) defined?",
          answer: "No. Only matrices of the same order can be added",
        },
      ],
      pyqExampleId: "5f0e244e-b979-4460-8818-9a0c288b3734",
      traps: [
        {
          title: "Losing a sign when subtracting a negative element",
          body: "Subtract every element of the second matrix with its sign: \\(3 - (-2) = 5\\), not 1. Write the bracket for each negative element before you simplify.",
        },
        {
          title: "Adding matrices of different orders",
          body: "A sum or difference is defined only for matrices of the same order. Check the orders first; an MCQ often offers an answer for a sum that does not exist.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmmt-scalar",
      name: "Multiplying by a scalar and solving for an unknown matrix",
      intuition:
        "Multiplying a matrix by a number multiplies every element by that number, the way a price list doubles when every price doubles. With addition and scalar multiples you can solve a matrix equation like an ordinary one: move the known matrices to one side, then divide every element by the number in front of X.",
      definition:
        "- \\(kA = [k\\,a_{ij}]\\): every element of \\(A\\) is multiplied by the scalar \\(k\\). In particular \\(-A = (-1)A\\).\n" +
        "- **Laws:** \\(k(A + B) = kA + kB\\) and \\((k + l)A = kA + lA\\), for matrices of the same order.\n" +
        "- \\(A - B = A + (-1)B\\).\n" +
        "- **To solve \\(pA + qX = rB\\):** \\(qX = rB - pA\\), so \\(X = \\dfrac{1}{q}(rB - pA)\\). Dividing by \\(q\\) divides every element.\n" +
        "- **Two equations \\(X + Y = P\\), \\(X - Y = Q\\):** add them to get \\(2X = P + Q\\); subtract them to get \\(2Y = P - Q\\).",
      formula: {
        label: "Scalar multiple",
        latex: "kA = [k\\,a_{ij}]_{m \\times n}, \\qquad k(A + B) = kA + kB",
      },
      authoredExample: {
        prompt:
          "If \\(A = \\begin{bmatrix} 1 & -2 \\\\ 4 & 0 \\end{bmatrix}\\) and \\(B = \\begin{bmatrix} 1 & 4 \\\\ -2 & 3 \\end{bmatrix}\\), find the matrix \\(X\\) such that \\(3X - A = 2B\\).",
        steps: [
          "\\(3X - A = 2B\\), so \\(3X = A + 2B\\).",
          "\\(2B = \\begin{bmatrix} 2 & 8 \\\\ -4 & 6 \\end{bmatrix}\\).",
          "\\(A + 2B = \\begin{bmatrix} 1 + 2 & -2 + 8 \\\\ 4 - 4 & 0 + 6 \\end{bmatrix} = \\begin{bmatrix} 3 & 6 \\\\ 0 & 6 \\end{bmatrix}\\).",
          "\\(X = \\dfrac{1}{3}\\begin{bmatrix} 3 & 6 \\\\ 0 & 6 \\end{bmatrix} = \\begin{bmatrix} 1 & 2 \\\\ 0 & 2 \\end{bmatrix}\\).",
        ],
        answer: "\\(X = \\begin{bmatrix} 1 & 2 \\\\ 0 & 2 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(A = \\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix}\\), find \\(-3A\\).",
        steps: ["Multiply every element by \\(-3\\)."],
        answer: "\\(\\begin{bmatrix} -6 & 3 \\\\ 0 & -9 \\end{bmatrix}\\)",
      },
      practiceSet: [
        {
          prompt: "Find \\(X\\) and \\(Y\\) if \\(X + Y = \\begin{bmatrix} 4 & 2 \\\\ 6 & 0 \\end{bmatrix}\\) and \\(X - Y = \\begin{bmatrix} 2 & 0 \\\\ -2 & 4 \\end{bmatrix}\\).",
          answer: "\\(X = \\begin{bmatrix} 3 & 1 \\\\ 2 & 2 \\end{bmatrix}\\), \\(Y = \\begin{bmatrix} 1 & 1 \\\\ 4 & -2 \\end{bmatrix}\\)",
        },
        {
          prompt: "If \\(A = \\begin{bmatrix} 1 & 0 \\\\ 2 & -1 \\end{bmatrix}\\) and \\(B = \\begin{bmatrix} 0 & 3 \\\\ 1 & 1 \\end{bmatrix}\\), find \\(2A - 3B\\).",
          answer: "\\(\\begin{bmatrix} 2 & -9 \\\\ 1 & -5 \\end{bmatrix}\\)",
        },
        {
          prompt: "Simplify \\(\\sin\\theta\\begin{bmatrix} \\sin\\theta & 0 \\\\ 0 & \\sin\\theta \\end{bmatrix} + \\cos\\theta\\begin{bmatrix} \\cos\\theta & 0 \\\\ 0 & \\cos\\theta \\end{bmatrix}\\).",
          answer: "\\(\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = I\\), since \\(\\sin^2\\theta + \\cos^2\\theta = 1\\)",
        },
      ],
      pyqExampleId: "43030ffa-08ad-4d1b-9a8a-ea7fd714c6b0",
      traps: [
        {
          title: "Multiplying only some elements by the scalar",
          body: "\\(kA\\) multiplies EVERY element, the zeros included (they stay 0) and the negative ones (their signs follow \\(k\\)). A scalar in front of a bracket of matrices multiplies each matrix in the bracket.",
        },
        {
          title: "Dividing by the wrong number at the end",
          body: "From \\(3X = M\\) the answer is \\(X = \\frac{1}{3}M\\): divide every element of \\(M\\) by 3. Moving \\(A\\) across the equals sign changes its sign first; do that step before you divide.",
        },
      ],
    },
  ],
};
