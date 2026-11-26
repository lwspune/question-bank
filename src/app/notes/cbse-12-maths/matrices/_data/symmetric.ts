import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_MT_SYMMETRIC_NOTE: SubtopicNote = {
  subtopicName: "Symmetric and Skew-Symmetric Matrices",
  title: "Symmetric and Skew Symmetric Matrices",
  oneLineDefinition:
    "A matrix equal to its transpose is symmetric and one equal to the negative of its transpose is skew symmetric; proving which one a combination of matrices is; and writing any square matrix as the sum of a symmetric and a skew symmetric matrix.",
  whyItMatters:
    "41 questions, twenty-six of them from board papers from 2023 to 2026, nearly all one-mark questions. The board asks for the unknowns that make a matrix symmetric or skew symmetric (every year), the type of a given matrix (four questions in 2025, one in 2026), the one matrix that is both symmetric and skew symmetric (two questions in 2025), how many symmetric matrices can be filled from two numbers (2023), whether a combination such as AB minus BA or BAB′ is symmetric or skew symmetric (every year, with an assertion-reason item in 2024), and the skew symmetric part of a 2 by 2 matrix (2023). The textbook adds Exercise 3.3 from Q7, the two theorems of the section and three proofs from the Miscellaneous Exercise.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmmt-symmetric-test",
      name: "Testing for symmetric and skew symmetric",
      intuition:
        "Fold a square matrix along its diagonal. If every element lands on an equal element, the matrix is symmetric. If every element lands on its negative, it is skew symmetric, and then each diagonal element, which lands on itself, must equal its own negative: it must be zero. So a skew symmetric matrix always has zeros down its diagonal.",
      definition:
        "- A square matrix \\(A\\) is **symmetric** if \\(A' = A\\), that is \\(a_{ij} = a_{ji}\\) for all \\(i, j\\).\n" +
        "- A square matrix \\(A\\) is **skew symmetric** if \\(A' = -A\\), that is \\(a_{ji} = -a_{ij}\\) for all \\(i, j\\).\n" +
        "- Putting \\(i = j\\): \\(a_{ii} = -a_{ii}\\), so \\(a_{ii} = 0\\). **Every diagonal element of a skew symmetric matrix is zero.**\n" +
        "- Every diagonal matrix (so every scalar and identity matrix) is symmetric.\n" +
        "- A matrix that is both symmetric and skew symmetric has \\(A = -A\\), so \\(A = O\\): only the zero matrix is both.\n" +
        "- In a symmetric matrix only the elements on and above the diagonal are free; the rest are copies.",
      formula: {
        label: "The two tests",
        latex: "\\text{symmetric: } A' = A, \\qquad \\text{skew symmetric: } A' = -A,\\ a_{ii} = 0",
      },
      authoredExample: {
        prompt:
          "Find \\(p\\), \\(q\\) and \\(r\\) if \\(A = \\begin{bmatrix} 2 & p & 7 \\\\ -3 & 5 & q \\\\ r & 4 & 1 \\end{bmatrix}\\) is a symmetric matrix.",
        steps: [
          "\\(A\\) is symmetric, so \\(a_{ij} = a_{ji}\\) for every pair of places.",
          "\\(a_{12} = a_{21}\\): \\(p = -3\\).",
          "\\(a_{23} = a_{32}\\): \\(q = 4\\).",
          "\\(a_{31} = a_{13}\\): \\(r = 7\\).",
        ],
        answer: "\\(p = -3,\\ q = 4,\\ r = 7\\)",
      },
      selfCheckExample: {
        prompt: "Is \\(\\begin{bmatrix} 0 & 2 \\\\ -2 & 0 \\end{bmatrix}\\) symmetric, skew symmetric or neither?",
        steps: ["Its transpose is \\(\\begin{bmatrix} 0 & -2 \\\\ 2 & 0 \\end{bmatrix}\\), the negative of the matrix."],
        answer: "Skew symmetric",
      },
      practiceSet: [
        {
          prompt: "Is \\(\\begin{bmatrix} 1 & 2 \\\\ -2 & 1 \\end{bmatrix}\\) symmetric, skew symmetric or neither?",
          answer: "Neither: \\(a_{12} \\neq a_{21}\\), and the diagonal is not zero",
        },
        {
          prompt: "How many symmetric matrices of order \\(2 \\times 2\\) have every element 0 or 1?",
          answer: "Three places are free (\\(a_{11}, a_{12}, a_{22}\\)), so \\(2^3 = 8\\)",
        },
        {
          prompt: "Is the diagonal matrix with diagonal elements 4, -1 and 6 symmetric?",
          answer: "Yes. Transposing a diagonal matrix leaves it unchanged",
        },
      ],
      pyqExampleId: "0bb0be25-b6c0-49a3-b217-1500a4fb4587",
      traps: [
        {
          title: "Leaving a diagonal unknown free in a skew symmetric matrix",
          body: "Every diagonal element of a skew symmetric matrix is 0, so a letter on the diagonal is 0. Writing this down is often the first mark.",
        },
        {
          title: "Comparing an element with the wrong partner",
          body: "\\(a_{ij}\\) is compared with \\(a_{ji}\\), its mirror image across the diagonal: row 1 column 3 with row 3 column 1. Do not compare it with the element beside it.",
        },
        {
          title: "Counting every element when counting symmetric matrices",
          body: "In a symmetric matrix the elements below the diagonal are copies of those above. For order 3, only \\(3 + 3 = 6\\) places are free, not 9.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmmt-symmetric-proofs",
      name: "Proving a combination symmetric or skew symmetric",
      intuition:
        "To decide whether a combination like AB minus BA is symmetric or skew symmetric, take its transpose with the laws from the transpose page and simplify. If you get the same expression back, it is symmetric; if you get its negative, it is skew symmetric. The reversal law is where the work is: the transpose of AB is B′A′, and then you replace each transpose using what is given.",
      definition:
        "- Write \\(M\\) for the combination and find \\(M'\\) using \\((AB)' = B'A'\\), \\((A \\pm B)' = A' \\pm B'\\), \\((kA)' = kA'\\), \\((A')' = A\\).\n" +
        "- Replace \\(A'\\) by \\(A\\) (if \\(A\\) is symmetric) or by \\(-A\\) (if skew symmetric).\n" +
        "- \\(M' = M\\): symmetric. \\(M' = -M\\): skew symmetric.\n" +
        "- **Useful results:** for symmetric \\(A, B\\): \\(AB - BA\\) is skew symmetric, \\(AB + BA\\) is symmetric, and \\(AB\\) is symmetric if and only if \\(AB = BA\\).\n" +
        "- For any matrix \\(B\\) of suitable order, \\(B'AB\\) is symmetric or skew symmetric according as \\(A\\) is symmetric or skew symmetric.",
      formula: {
        label: "The test for a combination",
        latex: "M' = M \\Rightarrow \\text{symmetric}, \\qquad M' = -M \\Rightarrow \\text{skew symmetric}",
      },
      authoredExample: {
        prompt: "If \\(A\\) and \\(B\\) are symmetric matrices of the same order, show that \\(AB + BA\\) is a symmetric matrix.",
        steps: [
          "Given: \\(A' = A\\) and \\(B' = B\\).",
          "\\((AB + BA)' = (AB)' + (BA)'\\).",
          "\\(= B'A' + A'B'\\) (reversal law).",
          "\\(= BA + AB\\) (as \\(A' = A\\), \\(B' = B\\)).",
          "\\(= AB + BA\\) (addition is commutative).",
          "So \\((AB + BA)' = AB + BA\\), and \\(AB + BA\\) is symmetric.",
        ],
        answer: "\\((AB + BA)' = AB + BA\\), so it is symmetric",
      },
      selfCheckExample: {
        prompt: "If \\(A\\) is skew symmetric, is \\(A^2\\) symmetric or skew symmetric?",
        steps: ["\\((A^2)' = (AA)' = A'A' = (-A)(-A) = A^2\\)."],
        answer: "Symmetric",
      },
      practiceSet: [
        {
          prompt: "For any square matrix \\(A\\), show that \\(AA'\\) is symmetric.",
          answer: "\\((AA')' = (A')'A' = AA'\\)",
        },
        {
          prompt: "If \\(A\\) is skew symmetric and \\(k\\) is a number, is \\(kA\\) skew symmetric?",
          answer: "Yes: \\((kA)' = kA' = -kA\\)",
        },
        {
          prompt: "If \\(A\\) is skew symmetric and \\(B\\) is any matrix of the same order, what kind of matrix is \\(B'AB\\)?",
          answer: "\\((B'AB)' = B'A'B = -B'AB\\), so it is skew symmetric",
        },
      ],
      pyqExampleId: "abb95328-d0e8-4769-a7d1-f2b6846064be",
      traps: [
        {
          title: "Transposing a product without reversing it",
          body: "\\((AB)' = B'A'\\), never \\(A'B'\\). Every proof on this page turns on that one step, so write it as its own line.",
        },
        {
          title: "Assuming the product of two symmetric matrices is symmetric",
          body: "\\((AB)' = BA\\) for symmetric \\(A\\) and \\(B\\), so \\(AB\\) is symmetric only when \\(AB = BA\\). The textbook proves this as Miscellaneous Example 24.",
        },
        {
          title: "Assertion-reason: a true definition beside a false claim",
          body: "Board 2024 asserted that \\(B'AB\\) is skew symmetric for a symmetric A (false: it is symmetric), with the Reason giving the definition of a skew symmetric matrix (true). In Mathematics that is code (D): Assertion false, Reason true.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmmt-split",
      name: "Any square matrix as symmetric part plus skew symmetric part",
      intuition:
        "Half of A plus A′ is always symmetric, and half of A minus A′ is always skew symmetric, and the two halves add back to A. So every square matrix splits into a symmetric part and a skew symmetric part. The board asks for one part as an MCQ; the textbook asks for both, with the check that each part is what it should be.",
      definition:
        "- **Theorem 1:** for any square matrix \\(A\\) with real entries, \\(A + A'\\) is symmetric and \\(A - A'\\) is skew symmetric.\n" +
        "- Proof outline: let \\(B = A + A'\\). Then \\(B' = (A + A')' = A' + (A')' = A' + A = A + A' = B\\), so \\(B\\) is symmetric.\n" +
        "- Let \\(C = A - A'\\). Then \\(C' = (A - A')' = A' - (A')' = A' - A = -(A - A') = -C\\), so \\(C\\) is skew symmetric.\n" +
        "- **Theorem 2:** any square matrix is the sum of a symmetric and a skew symmetric matrix: \\(A = \\frac{1}{2}(A + A') + \\frac{1}{2}(A - A')\\).\n" +
        "- Proof outline: since \\((kA)' = kA'\\), \\(P = \\frac{1}{2}(A + A')\\) is symmetric and \\(Q = \\frac{1}{2}(A - A')\\) is skew symmetric, by Theorem 1, and \\(P + Q = A\\).\n" +
        "- \\(P\\) has the same diagonal as \\(A\\); \\(Q\\) has zeros on its diagonal.",
      formula: {
        label: "Symmetric part plus skew symmetric part",
        latex: "A = \\underbrace{\\tfrac{1}{2}(A + A')}_{P\\ \\text{symmetric}} + \\underbrace{\\tfrac{1}{2}(A - A')}_{Q\\ \\text{skew symmetric}}",
      },
      authoredExample: {
        prompt: "Express \\(A = \\begin{bmatrix} 1 & 4 \\\\ -2 & 3 \\end{bmatrix}\\) as the sum of a symmetric and a skew symmetric matrix.",
        steps: [
          "\\(A' = \\begin{bmatrix} 1 & -2 \\\\ 4 & 3 \\end{bmatrix}\\).",
          "\\(P = \\frac{1}{2}(A + A') = \\frac{1}{2}\\begin{bmatrix} 2 & 2 \\\\ 2 & 6 \\end{bmatrix} = \\begin{bmatrix} 1 & 1 \\\\ 1 & 3 \\end{bmatrix}\\). \\(P' = P\\), so \\(P\\) is symmetric.",
          "\\(Q = \\frac{1}{2}(A - A') = \\frac{1}{2}\\begin{bmatrix} 0 & 6 \\\\ -6 & 0 \\end{bmatrix} = \\begin{bmatrix} 0 & 3 \\\\ -3 & 0 \\end{bmatrix}\\). \\(Q' = -Q\\), so \\(Q\\) is skew symmetric.",
          "Check: \\(P + Q = \\begin{bmatrix} 1 & 1 + 3 \\\\ 1 - 3 & 3 \\end{bmatrix} = \\begin{bmatrix} 1 & 4 \\\\ -2 & 3 \\end{bmatrix} = A\\).",
        ],
        answer: "\\(A = \\begin{bmatrix} 1 & 1 \\\\ 1 & 3 \\end{bmatrix} + \\begin{bmatrix} 0 & 3 \\\\ -3 & 0 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(A\\) is a skew symmetric matrix of order 3, what is \\(\\frac{1}{2}(A + A')\\)?",
        steps: ["\\(A' = -A\\), so \\(A + A' = O\\)."],
        answer: "The zero matrix",
      },
      practiceSet: [
        {
          prompt: "For \\(A = \\begin{bmatrix} 2 & 7 \\\\ 3 & 5 \\end{bmatrix}\\), find \\(A - A'\\) and show that it is skew symmetric.",
          answer: "\\(A - A' = \\begin{bmatrix} 0 & 4 \\\\ -4 & 0 \\end{bmatrix}\\), whose transpose is its negative",
        },
        {
          prompt: "What is the skew symmetric part of a symmetric matrix?",
          answer: "The zero matrix, since \\(A - A' = O\\)",
        },
        {
          prompt: "How do the diagonal elements of the symmetric part \\(\\frac{1}{2}(A + A')\\) compare with those of \\(A\\)?",
          answer: "They are the same, since \\(\\frac{1}{2}(a_{ii} + a_{ii}) = a_{ii}\\)",
        },
      ],
      pyqExampleId: "15dfed8b-8d87-4c32-82e8-40e59ff10328",
      traps: [
        {
          title: "Forgetting the half",
          body: "\\(A + A'\\) is symmetric, but the symmetric PART of \\(A\\) is \\(\\frac{1}{2}(A + A')\\). Without the half, the two parts add up to \\(2A\\).",
        },
        {
          title: "A skew symmetric part with a non-zero diagonal",
          body: "The diagonal of \\(\\frac{1}{2}(A - A')\\) is always zero. If yours is not, recheck \\(A'\\). An MCQ option with a non-zero diagonal can be ruled out at once.",
        },
        {
          title: "Skipping the checks in a long answer",
          body: "Show that \\(P' = P\\), that \\(Q' = -Q\\) and that \\(P + Q = A\\). Each line carries marks in a textbook or board answer.",
        },
      ],
    },
  ],
};
