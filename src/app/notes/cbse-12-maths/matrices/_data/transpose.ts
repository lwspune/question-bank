import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_MT_TRANSPOSE_NOTE: SubtopicNote = {
  subtopicName: "Transpose of a Matrix",
  title: "Transpose of a Matrix",
  oneLineDefinition:
    "The transpose A′ made by turning rows into columns, its four properties with the reversal law for a product, and the board's favourite: the angle that makes A + A′ a multiple of I.",
  whyItMatters:
    "31 questions, fifteen of them from board papers, eight of those in 2026 alone. The most repeated board question gives a matrix with trigonometric elements and asks for the angle that makes A + A′ a multiple of I (2023, 2024, and four sets of 2026). The board also asks for the transpose of a 2 by 2 matrix built from a rule for its elements (three sets of 2026), which properties of the transpose are true or not true (2025, 2026), the transpose of a product of two given matrices (2023), the order of a product of transposes (2024), the product of a row matrix and its transpose (2023), and the condition for a matrix to equal its transpose (2023). The textbook adds Exercise 3.3 up to Q6, its examples and Miscellaneous Exercise Q3.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmmt-find-transpose",
      name: "Finding the transpose",
      intuition:
        "To transpose a matrix, write its first row as the first column, its second row as the second column, and so on. A tall matrix becomes a wide one: the order m by n becomes n by m. The elements on the diagonal stay where they are, and each element off the diagonal swaps places with its mirror image across the diagonal.",
      definition:
        "- If \\(A = [a_{ij}]\\) is an \\(m \\times n\\) matrix, its **transpose** \\(A'\\) (or \\(A^T\\)) is the \\(n \\times m\\) matrix \\([a_{ji}]\\): the rows of \\(A\\) are the columns of \\(A'\\).\n" +
        "- The element in row \\(i\\), column \\(j\\) of \\(A'\\) is \\(a_{ji}\\).\n" +
        "- A row matrix transposes to a column matrix, and a column matrix to a row matrix.\n" +
        "- In a square matrix the diagonal elements do not move.\n" +
        "- **If \\(A'\\) is given, \\(A = (A')'\\):** transpose it back before you use \\(A\\).",
      formula: {
        label: "Transpose",
        latex: "A = [a_{ij}]_{m \\times n} \\;\\Rightarrow\\; A' = [a_{ji}]_{n \\times m}",
      },
      authoredExample: {
        prompt:
          "If \\(A' = \\begin{bmatrix} 1 & 4 \\\\ -2 & 0 \\\\ 3 & 5 \\end{bmatrix}\\) and \\(B = \\begin{bmatrix} 2 & 1 & 0 \\\\ -1 & 3 & 2 \\end{bmatrix}\\), find \\(A + B\\).",
        steps: [
          "\\(A' \\) is \\(3 \\times 2\\), so \\(A = (A')'\\) is \\(2 \\times 3\\), the same order as \\(B\\).",
          "Write the columns of \\(A'\\) as rows: \\(A = \\begin{bmatrix} 1 & -2 & 3 \\\\ 4 & 0 & 5 \\end{bmatrix}\\).",
          "\\(A + B = \\begin{bmatrix} 1 + 2 & -2 + 1 & 3 + 0 \\\\ 4 - 1 & 0 + 3 & 5 + 2 \\end{bmatrix} = \\begin{bmatrix} 3 & -1 & 3 \\\\ 3 & 3 & 7 \\end{bmatrix}\\).",
        ],
        answer: "\\(A + B = \\begin{bmatrix} 3 & -1 & 3 \\\\ 3 & 3 & 7 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "Write the transpose of \\(\\begin{bmatrix} 7 \\\\ -1 \\\\ 0 \\end{bmatrix}\\).",
        steps: ["A \\(3 \\times 1\\) column becomes a \\(1 \\times 3\\) row."],
        answer: "\\(\\begin{bmatrix} 7 & -1 & 0 \\end{bmatrix}\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(A = \\begin{bmatrix} a & 3 \\\\ b & 6 \\end{bmatrix}\\) and \\(A' = \\begin{bmatrix} 2 & 5 \\\\ c & 6 \\end{bmatrix}\\), find \\(a\\), \\(b\\) and \\(c\\).",
          answer: "\\(A' = \\begin{bmatrix} a & b \\\\ 3 & 6 \\end{bmatrix}\\), so \\(a = 2\\), \\(b = 5\\), \\(c = 3\\)",
        },
        {
          prompt: "A matrix A is of order \\(3 \\times 5\\). What is the order of \\(A'\\)?",
          answer: "\\(5 \\times 3\\)",
        },
        {
          prompt: "If \\(A = \\begin{bmatrix} 4 & -2 \\\\ 9 & 1 \\end{bmatrix}\\), what is the element in row 1, column 2 of \\(A'\\)?",
          answer: "\\(a_{21} = 9\\)",
        },
      ],
      pyqExampleId: "b9e8e08d-5a39-491a-bf44-2d36a248107b",
      traps: [
        {
          title: "Choosing A itself instead of its transpose",
          body: "When a matrix is built from a rule and the question asks for \\(A'\\), the MCQ options usually include \\(A\\) as well. Build \\(A\\) first, then swap the elements off the diagonal.",
        },
        {
          title: "Moving the diagonal elements",
          body: "Transposing never moves \\(a_{11}, a_{22}, \\dots\\). Only the elements off the diagonal change places, each with its mirror image.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmmt-transpose-laws",
      name: "Properties of the transpose and the reversal law",
      intuition:
        "Transposing a sum is easy: transpose each matrix and add. A number in front just comes along. A product is different: the transpose of AB is B′ times A′, in the reverse order. It has to be: if A is 2 by 3 and B is 3 by 4, then A′ times B′ would be 3 by 2 times 4 by 3, which is not even defined.",
      definition:
        "For matrices \\(A\\) and \\(B\\) of suitable orders:\n" +
        "- \\((A')' = A\\).\n" +
        "- \\((kA)' = kA'\\), for any constant \\(k\\).\n" +
        "- \\((A + B)' = A' + B'\\), and so \\((A - B)' = A' - B'\\).\n" +
        "- \\((AB)' = B'A'\\): the **reversal law**. For three matrices, \\((ABC)' = C'B'A'\\).\n" +
        "- A row matrix \\(A\\) of order \\(1 \\times n\\) gives \\(AA'\\) of order \\(1 \\times 1\\) and \\(A'A\\) of order \\(n \\times n\\).",
      formula: {
        label: "Reversal law",
        latex: "(AB)' = B'A', \\qquad (A + B)' = A' + B', \\qquad (kA)' = kA'",
      },
      authoredExample: {
        prompt:
          "If \\(A = \\begin{bmatrix} 1 & 2 \\\\ 0 & -1 \\end{bmatrix}\\) and \\(B = \\begin{bmatrix} 3 & 1 \\\\ 2 & 4 \\end{bmatrix}\\), verify that \\((AB)' = B'A'\\).",
        steps: [
          "\\(AB = \\begin{bmatrix} 3 + 4 & 1 + 8 \\\\ 0 - 2 & 0 - 4 \\end{bmatrix} = \\begin{bmatrix} 7 & 9 \\\\ -2 & -4 \\end{bmatrix}\\), so LHS \\(= (AB)' = \\begin{bmatrix} 7 & -2 \\\\ 9 & -4 \\end{bmatrix}\\).",
          "\\(B' = \\begin{bmatrix} 3 & 2 \\\\ 1 & 4 \\end{bmatrix}\\) and \\(A' = \\begin{bmatrix} 1 & 0 \\\\ 2 & -1 \\end{bmatrix}\\).",
          "RHS \\(= B'A' = \\begin{bmatrix} 3 + 4 & 0 - 2 \\\\ 1 + 8 & 0 - 4 \\end{bmatrix} = \\begin{bmatrix} 7 & -2 \\\\ 9 & -4 \\end{bmatrix}\\).",
          "LHS = RHS, so \\((AB)' = B'A'\\) is verified.",
        ],
        answer: "Both sides equal \\(\\begin{bmatrix} 7 & -2 \\\\ 9 & -4 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "A is \\(2 \\times 3\\) and B is \\(3 \\times 4\\). What is the order of \\((AB)'\\)?",
        steps: ["\\(AB\\) is \\(2 \\times 4\\), so its transpose is \\(4 \\times 2\\)."],
        answer: "\\(4 \\times 2\\)",
      },
      practiceSet: [
        {
          prompt: "Simplify \\((A'B')'\\).",
          answer: "\\((A'B')' = (B')'(A')' = BA\\)",
        },
        {
          prompt: "If \\(A' = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\), find \\((2A)'\\).",
          answer: "\\((2A)' = 2A' = \\begin{bmatrix} 2 & 4 \\\\ 6 & 8 \\end{bmatrix}\\)",
        },
        {
          prompt: "Write \\((ABC)'\\) in terms of the transposes of A, B and C.",
          answer: "\\(C'B'A'\\)",
        },
      ],
      pyqExampleId: "22c54a29-aaa4-4718-aa51-4b32c09c0fc5",
      traps: [
        {
          title: "Writing the transpose of AB as \\(A'B'\\)",
          body: "The order reverses: \\((AB)' = B'A'\\). The board has asked which property is NOT correct (2025) and which are true (2026); the unreversed form is the wrong one each time.",
        },
        {
          title: "Changing the order of a difference",
          body: "Transposing a difference keeps the order: \\((A - B)' = A' - B'\\), not \\(B' - A'\\). Only a PRODUCT reverses.",
        },
        {
          title: "Giving a number for a 1 by 1 product",
          body: "For a row matrix \\(A\\), \\(AA'\\) is the \\(1 \\times 1\\) matrix \\([\\,\\dots\\,]\\). An MCQ may offer both the number and the matrix: the matrix is the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmmt-a-plus-at",
      name: "A + A′ and A′A for matrices with trigonometric elements",
      intuition:
        "Many board matrices have the shape with the same element twice on the diagonal and two elements of opposite signs off it. Adding the transpose makes the two off-diagonal elements cancel, so A + A′ is just twice the diagonal element times I. Setting it equal to a multiple of I gives a simple trigonometric equation: solve it in the interval the question gives. The same shape built from cosine and sine also gives A′A = I.",
      definition:
        "- For \\(A = \\begin{bmatrix} f & g \\\\ -g & f \\end{bmatrix}\\): \\(A' = \\begin{bmatrix} f & -g \\\\ g & f \\end{bmatrix}\\), so \\(A + A' = \\begin{bmatrix} 2f & 0 \\\\ 0 & 2f \\end{bmatrix} = 2f\\,I\\).\n" +
        "- \\(A + A' = kI\\) then gives \\(2f = k\\): solve for the angle in the given interval.\n" +
        "- For \\(A = \\begin{bmatrix} \\cos\\alpha & \\sin\\alpha \\\\ -\\sin\\alpha & \\cos\\alpha \\end{bmatrix}\\), \\(A'A = \\begin{bmatrix} \\cos^2\\alpha + \\sin^2\\alpha & 0 \\\\ 0 & \\sin^2\\alpha + \\cos^2\\alpha \\end{bmatrix} = I\\).\n" +
        "- In \\(A'A = I\\), each diagonal element of the product is the sum of the squares of a column of \\(A\\), and each element off the diagonal is the product of two different columns. So each column has squares adding to 1 and two different columns give 0.",
      formula: {
        label: "Sum of a matrix and its transpose",
        latex: "\\begin{bmatrix} f & g \\\\ -g & f \\end{bmatrix} + \\begin{bmatrix} f & g \\\\ -g & f \\end{bmatrix}' = 2f\\,I",
      },
      authoredExample: {
        prompt:
          "If \\(A = \\begin{bmatrix} \\sin x & 2 \\\\ -2 & \\sin x \\end{bmatrix}\\) and \\(A + A' = \\sqrt{2}\\,I\\), find \\(x\\) in \\(\\left[0, \\dfrac{\\pi}{2}\\right]\\).",
        steps: [
          "\\(A' = \\begin{bmatrix} \\sin x & -2 \\\\ 2 & \\sin x \\end{bmatrix}\\).",
          "\\(A + A' = \\begin{bmatrix} 2\\sin x & 0 \\\\ 0 & 2\\sin x \\end{bmatrix} = 2\\sin x\\,I\\).",
          "So \\(2\\sin x = \\sqrt{2}\\), that is \\(\\sin x = \\dfrac{1}{\\sqrt{2}}\\).",
          "In \\(\\left[0, \\dfrac{\\pi}{2}\\right]\\), \\(x = \\dfrac{\\pi}{4}\\).",
        ],
        answer: "\\(x = \\dfrac{\\pi}{4}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(A = \\begin{bmatrix} 0 & 1 \\\\ -1 & 0 \\end{bmatrix}\\), find \\(A'A\\).",
        steps: ["\\(A' = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}\\), and the product is \\(\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}\\)."],
        answer: "\\(A'A = I\\)",
      },
      practiceSet: [
        {
          prompt: "Find \\(A + A'\\) for \\(A = \\begin{bmatrix} 3 & -4 \\\\ 4 & 3 \\end{bmatrix}\\).",
          answer: "\\(\\begin{bmatrix} 6 & 0 \\\\ 0 & 6 \\end{bmatrix} = 6I\\)",
        },
        {
          prompt: "Show that for any \\(A = \\begin{bmatrix} p & q \\\\ -q & p \\end{bmatrix}\\), \\(A + A'\\) is a scalar matrix.",
          answer: "\\(A + A' = \\begin{bmatrix} 2p & 0 \\\\ 0 & 2p \\end{bmatrix} = 2p\\,I\\), a scalar matrix",
        },
        {
          prompt: "Verify that \\(A'A = I\\) for \\(A = \\begin{bmatrix} \\frac{1}{\\sqrt{2}} & \\frac{1}{\\sqrt{2}} \\\\ -\\frac{1}{\\sqrt{2}} & \\frac{1}{\\sqrt{2}} \\end{bmatrix}\\).",
          answer: "\\(A'A = \\begin{bmatrix} \\frac{1}{2} + \\frac{1}{2} & \\frac{1}{2} - \\frac{1}{2} \\\\ \\frac{1}{2} - \\frac{1}{2} & \\frac{1}{2} + \\frac{1}{2} \\end{bmatrix} = I\\)",
        },
      ],
      pyqExampleId: "7bbba5d1-2176-4254-a245-bd2e8f591141",
      traps: [
        {
          title: "Ignoring the interval",
          body: "\\(\\sin\\theta = \\dfrac{1}{2}\\) holds for \\(\\dfrac{\\pi}{6}\\) and for \\(\\dfrac{5\\pi}{6}\\). The question's interval decides which one is the answer, so read it before you choose.",
        },
        {
          title: "Taking an angle at which the matrix does not exist",
          body: "If the matrix contains \\(\\tan x\\) or \\(\\cot x\\), an end point of \\(\\left[0, \\dfrac{\\pi}{2}\\right]\\) can make an element undefined. Board 2026 had such a matrix, and the end points were not answers.",
        },
        {
          title: "Forgetting that the off-diagonal elements cancel",
          body: "In \\(A + A'\\) the element \\(g\\) above the diagonal meets \\(-g\\) from the transpose. If your sum has non-zero elements off the diagonal, recheck the transpose.",
        },
      ],
    },
  ],
};
