import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_MX_ADJOINT_NOTE: SubtopicNote = {
  subtopicName: "Inverse by Adjoint Method",
  title: "Inverse of a Matrix by the Adjoint Method",
  oneLineDefinition:
    "When a matrix is invertible, the inverse A⁻¹ = (1/|A|) adj A for 2 by 2 and 3 by 3 matrices, and using inverses to solve matrix equations such as AX = B.",
  whyItMatters:
    "47 questions, the largest page of the chapter, four of them from board papers: the inverse of a 2 by 2 matrix (an MCQ in 2017), whether the matrix with cos θ and sin θ is invertible (2024), and the inverse of a 3 by 3 matrix by the adjoint method (2024, 2026). The textbook rows are Exercise 2.2, most of Miscellaneous Exercise 2(A) and its MCQs, including matrix equations such as AX = B and AXB = C.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmmx-invertible",
      name: "Invertible and singular matrices",
      intuition:
        "Before you look for an inverse, ask whether one exists. A square matrix has an inverse exactly when its determinant is not zero. A matrix with |A| = 0 is called singular and has no inverse; one with |A| ≠ 0 is non-singular, or invertible. And when an inverse exists there is only one.",
      definition:
        "- A square matrix \\(A\\) is invertible if and only if \\(|A| \\neq 0\\) (non-singular). If \\(|A| = 0\\) it is singular and has no inverse.\n" +
        "- Only a square matrix can have an inverse.\n" +
        "- A determinant with two identical rows (or columns) is 0, so such a matrix is singular.\n" +
        "- **Theorem: the inverse, if it exists, is unique.** Proof outline:\n" +
        "- Let \\(B\\) and \\(C\\) both be inverses of \\(A\\), so \\(AB = BA = I\\) and \\(AC = CA = I\\).\n" +
        "- \\(B = BI = B(AC)\\).\n" +
        "- \\(= (BA)C = IC = C\\). Hence \\(B = C\\).",
      formula: {
        label: "Condition for an inverse",
        latex: "A^{-1} \\text{ exists if and only if } |A| \\neq 0",
      },
      authoredExample: {
        prompt: "Check whether \\(A = \\begin{bmatrix} 2 & -1 & 3 \\\\ 1 & 0 & 2 \\\\ 3 & -1 & 5 \\end{bmatrix}\\) is invertible.",
        steps: [
          "Expand along the first row: \\(|A| = 2(0 \\cdot 5 - 2 \\cdot (-1)) - (-1)(1 \\cdot 5 - 2 \\cdot 3) + 3(1 \\cdot (-1) - 0 \\cdot 3)\\).",
          "\\(|A| = 2(2) + 1(-1) + 3(-1) = 4 - 1 - 3 = 0\\).",
          "Since \\(|A| = 0\\), \\(A\\) is singular.",
        ],
        answer: "\\(A\\) is not invertible",
      },
      selfCheckExample: {
        prompt: "For what value of \\(k\\) is \\(\\begin{bmatrix} k & 2 \\\\ 3 & 6 \\end{bmatrix}\\) singular?",
        steps: ["\\(|A| = 6k - 6 = 0\\)."],
        answer: "\\(k = 1\\)",
      },
      practiceSet: [
        { prompt: "Is \\(\\begin{bmatrix} 4 & 6 \\\\ 2 & 3 \\end{bmatrix}\\) invertible?", answer: "No, its determinant is \\(12 - 12 = 0\\)" },
        { prompt: "A 3 by 3 matrix has two identical rows. Is it invertible?", answer: "No, its determinant is 0" },
        { prompt: "Can a 2 by 3 matrix have an inverse?", answer: "No, only a square matrix can" },
      ],
      pyqExampleId: "3e1846f7-914c-42a8-885a-b06aed45a8bc",
      traps: [
        {
          title: "Giving the verdict without the reason",
          body: "Write the value of \\(|A|\\), then '\\(|A| \\neq 0\\), so \\(A\\) is non-singular and hence invertible' (or '\\(|A| = 0\\), so \\(A\\) is singular'). The conclusion alone does not earn the marks.",
        },
        {
          title: "Testing a product of non-square matrices too early",
          body: "If \\(A\\) is 2 by 3 and \\(B\\) is 3 by 2, neither has an inverse, but \\(AB\\) is 2 by 2 and may have one. Multiply first, then test \\(|AB|\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmmx-inverse-two",
      name: "Inverse of a 2 by 2 matrix by the adjoint method",
      intuition:
        "Since A(adj A) = |A| I, dividing adj A by the number |A| gives a matrix that multiplies A to I: that is the inverse. For a 2 by 2 matrix the adjoint is the swap-and-change-sign shortcut, so the inverse takes one line once the determinant is known.",
      definition:
        "- \\(A^{-1} = \\dfrac{1}{|A|}\\,\\text{adj}\\,A\\), when \\(|A| \\neq 0\\).\n" +
        "- For \\(A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\): \\(A^{-1} = \\dfrac{1}{ad - bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}\\).\n" +
        "- If \\(|A| = 1\\), then \\(A^{-1} = \\text{adj}\\,A\\).\n" +
        "- Board layout: \\(|A|\\) and 'so \\(A^{-1}\\) exists'; the co-factors; \\(\\text{adj}\\,A\\); \\(A^{-1}\\); a check \\(AA^{-1} = I\\).",
      formula: {
        label: "Inverse by the adjoint method",
        latex: "A^{-1} = \\frac{1}{|A|}\\,\\text{adj}\\,A, \\qquad \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}^{-1} = \\frac{1}{ad - bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}",
      },
      authoredExample: {
        prompt: "Find \\(A^{-1}\\) by the adjoint method if \\(A = \\begin{bmatrix} 3 & -1 \\\\ 4 & 2 \\end{bmatrix}\\).",
        steps: [
          "\\(|A| = (3)(2) - (-1)(4) = 6 + 4 = 10 \\neq 0\\), so \\(A^{-1}\\) exists.",
          "Co-factors: \\(A_{11} = 2\\), \\(A_{12} = -4\\), \\(A_{21} = -(-1) = 1\\), \\(A_{22} = 3\\).",
          "\\(\\text{adj}\\,A = \\begin{bmatrix} 2 & -4 \\\\ 1 & 3 \\end{bmatrix}^T = \\begin{bmatrix} 2 & 1 \\\\ -4 & 3 \\end{bmatrix}\\).",
          "\\(A^{-1} = \\dfrac{1}{|A|}\\,\\text{adj}\\,A = \\dfrac{1}{10}\\begin{bmatrix} 2 & 1 \\\\ -4 & 3 \\end{bmatrix}\\).",
          "Check: \\(\\begin{bmatrix} 3 & -1 \\\\ 4 & 2 \\end{bmatrix}\\begin{bmatrix} 2 & 1 \\\\ -4 & 3 \\end{bmatrix} = \\begin{bmatrix} 10 & 0 \\\\ 0 & 10 \\end{bmatrix} = 10I\\), so \\(AA^{-1} = I\\).",
        ],
        answer: "\\(A^{-1} = \\dfrac{1}{10}\\begin{bmatrix} 2 & 1 \\\\ -4 & 3 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "\\(A = \\begin{bmatrix} x & 2 \\\\ 3 & 4 \\end{bmatrix}\\) and \\(A^{-1} = -\\dfrac{1}{2}\\,\\text{adj}\\,A\\). Find \\(x\\).",
        steps: [
          "\\(A^{-1} = \\dfrac{1}{|A|}\\,\\text{adj}\\,A\\), so \\(|A| = -2\\).",
          "\\(|A| = 4x - 6 = -2\\), so \\(x = 1\\).",
        ],
        answer: "\\(x = 1\\)",
      },
      practiceSet: [
        { prompt: "If \\(|A| = 1\\), how are \\(A^{-1}\\) and \\(\\text{adj}\\,A\\) related?", answer: "They are equal" },
        { prompt: "Can \\(\\dfrac{1}{|A|}\\,\\text{adj}\\,A\\) be used when \\(|A| = 0\\)?", answer: "No, the inverse does not exist" },
      ],
      pyqExampleId: "75f736d1-7e31-4803-9e51-866e7f3e16c9",
      traps: [
        {
          title: "Losing the sign of the determinant",
          body: "When \\(|A|\\) is negative, \\(\\dfrac{1}{|A|}\\) is negative too. Either keep it outside as \\(-\\dfrac{1}{5}\\) or change every sign inside; doing half of each gives a wrong matrix.",
        },
        {
          title: "Multiplying by |A| instead of dividing",
          body: "\\(A^{-1}\\) is \\(\\text{adj}\\,A\\) divided by \\(|A|\\). \\(|A|\\,\\text{adj}\\,A\\) is a different matrix, and a check \\(AA^{-1}\\) shows it at once.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmmx-inverse-three",
      name: "Inverse of a 3 by 3 matrix by the adjoint method",
      intuition:
        "For a 3 by 3 matrix there is no one-line shortcut, but there is a fixed routine: determinant, nine co-factors, transpose, divide. The board gives marks to each stage, so lay the stages out under headings and finish with a check, which catches the sign slips that cost the most marks.",
      definition:
        "- **Step 1:** find \\(|A|\\) and write '\\(|A| \\neq 0\\), so \\(A^{-1}\\) exists'.\n" +
        "- **Step 2:** find all nine co-factors \\(A_{ij} = (-1)^{i+j}M_{ij}\\).\n" +
        "- **Step 3:** \\(\\text{adj}\\,A\\) is the transpose of the matrix of co-factors.\n" +
        "- **Step 4:** \\(A^{-1} = \\dfrac{1}{|A|}\\,\\text{adj}\\,A\\).\n" +
        "- **Check:** \\(A\\) times \\(\\text{adj}\\,A\\) must be \\(|A|\\,I\\).",
      formula: {
        label: "Inverse of a 3 by 3 matrix",
        latex: "A^{-1} = \\frac{1}{|A|}\\begin{bmatrix} A_{11} & A_{21} & A_{31} \\\\ A_{12} & A_{22} & A_{32} \\\\ A_{13} & A_{23} & A_{33} \\end{bmatrix}",
      },
      authoredExample: {
        prompt: "Find \\(A^{-1}\\) by the adjoint method if \\(A = \\begin{bmatrix} 1 & 2 & 1 \\\\ 0 & 1 & 1 \\\\ 3 & 1 & 2 \\end{bmatrix}\\).",
        steps: [
          "Step 1: \\(|A| = 1(2 - 1) - 2(0 - 3) + 1(0 - 3) = 1 + 6 - 3 = 4 \\neq 0\\), so \\(A^{-1}\\) exists.",
          "Step 2: \\(A_{11} = +(2 - 1) = 1\\), \\(A_{12} = -(0 - 3) = 3\\), \\(A_{13} = +(0 - 3) = -3\\).",
          "\\(A_{21} = -(4 - 1) = -3\\), \\(A_{22} = +(2 - 3) = -1\\), \\(A_{23} = -(1 - 6) = 5\\).",
          "\\(A_{31} = +(2 - 1) = 1\\), \\(A_{32} = -(1 - 0) = -1\\), \\(A_{33} = +(1 - 0) = 1\\).",
          "Step 3: \\(\\text{adj}\\,A = \\begin{bmatrix} 1 & 3 & -3 \\\\ -3 & -1 & 5 \\\\ 1 & -1 & 1 \\end{bmatrix}^T = \\begin{bmatrix} 1 & -3 & 1 \\\\ 3 & -1 & -1 \\\\ -3 & 5 & 1 \\end{bmatrix}\\).",
          "Step 4: \\(A^{-1} = \\dfrac{1}{4}\\begin{bmatrix} 1 & -3 & 1 \\\\ 3 & -1 & -1 \\\\ -3 & 5 & 1 \\end{bmatrix}\\).",
          "Check, first row of \\(A\\) with each column of \\(\\text{adj}\\,A\\): \\(1 + 6 - 3 = 4\\), \\(-3 - 2 + 5 = 0\\), \\(1 - 2 + 1 = 0\\), as \\(|A|\\,I\\) needs.",
        ],
        answer: "\\(A^{-1} = \\dfrac{1}{4}\\begin{bmatrix} 1 & -3 & 1 \\\\ 3 & -1 & -1 \\\\ -3 & 5 & 1 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt:
          "For \\(A = \\begin{bmatrix} 1 & 1 & 0 \\\\ 0 & 1 & 1 \\\\ 1 & 0 & 1 \\end{bmatrix}\\), \\(|A| = 2\\) and \\(\\text{adj}\\,A = \\begin{bmatrix} 1 & -1 & 1 \\\\ 1 & 1 & -1 \\\\ -1 & 1 & 1 \\end{bmatrix}\\). Write \\(A^{-1}\\).",
        steps: ["\\(A^{-1} = \\dfrac{1}{|A|}\\,\\text{adj}\\,A\\)."],
        answer: "\\(A^{-1} = \\dfrac{1}{2}\\begin{bmatrix} 1 & -1 & 1 \\\\ 1 & 1 & -1 \\\\ -1 & 1 & 1 \\end{bmatrix}\\)",
      },
      practiceSet: [
        { prompt: "How many co-factors do you find to invert a 3 by 3 matrix by the adjoint method?", answer: "Nine" },
        { prompt: "A 3 by 3 matrix has \\(|A| = 1\\). What is \\(A^{-1}\\) in terms of \\(\\text{adj}\\,A\\)?", answer: "\\(A^{-1} = \\text{adj}\\,A\\)" },
      ],
      pyqExampleId: "e9cb93e5-4d3c-4abc-8dea-def15641dcdd",
      traps: [
        {
          title: "Using the matrix of co-factors as the adjoint",
          body: "Dividing the matrix of co-factors by \\(|A|\\) gives the transpose of the inverse. Write the transpose step on its own line before you divide.",
        },
        {
          title: "Skipping the check",
          body: "One wrong sign in nine co-factors spoils the whole inverse. Multiplying one row of \\(A\\) by the columns of \\(\\text{adj}\\,A\\) takes a minute and must give \\(|A|, 0, 0\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmmx-matrix-equation",
      name: "Matrix equations: AX = B, XA = B and the inverse of a product",
      intuition:
        "You cannot divide by a matrix, but you can multiply by its inverse. To free X in AX = B, multiply both sides by A⁻¹ on the left; in XA = B, multiply on the right. Because matrix multiplication depends on order, the side you multiply on matters, and for the same reason the inverse of a product comes in the reverse order.",
      definition:
        "- \\(AX = B\\): pre-multiply by \\(A^{-1}\\), so \\(X = A^{-1}B\\).\n" +
        "- \\(XA = B\\): post-multiply by \\(A^{-1}\\), so \\(X = BA^{-1}\\).\n" +
        "- \\(AXB = C\\): \\(X = A^{-1}CB^{-1}\\).\n" +
        "- \\((AB)^{-1} = B^{-1}A^{-1}\\), the reverse order.\n" +
        "- The inverse of a symmetric matrix is symmetric.",
      formula: {
        label: "Freeing X",
        latex: "AX = B \\Rightarrow X = A^{-1}B, \\qquad XA = B \\Rightarrow X = BA^{-1}, \\qquad (AB)^{-1} = B^{-1}A^{-1}",
      },
      authoredExample: {
        prompt: "Find \\(X\\) if \\(AX = B\\), where \\(A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}\\) and \\(B = \\begin{bmatrix} 3 & 0 \\\\ 1 & 2 \\end{bmatrix}\\).",
        steps: [
          "\\(|A| = 2 - 1 = 1 \\neq 0\\), so \\(A^{-1}\\) exists and \\(A^{-1} = \\text{adj}\\,A = \\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix}\\).",
          "Pre-multiply \\(AX = B\\) by \\(A^{-1}\\): \\(X = A^{-1}B\\).",
          "\\(X = \\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix}\\begin{bmatrix} 3 & 0 \\\\ 1 & 2 \\end{bmatrix} = \\begin{bmatrix} 3 - 1 & 0 - 2 \\\\ -3 + 2 & 0 + 4 \\end{bmatrix} = \\begin{bmatrix} 2 & -2 \\\\ -1 & 4 \\end{bmatrix}\\).",
          "Check: \\(AX = \\begin{bmatrix} 4 - 1 & -4 + 4 \\\\ 2 - 1 & -2 + 4 \\end{bmatrix} = \\begin{bmatrix} 3 & 0 \\\\ 1 & 2 \\end{bmatrix} = B\\).",
        ],
        answer: "\\(X = \\begin{bmatrix} 2 & -2 \\\\ -1 & 4 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(XA = B\\) and \\(A\\) is invertible, is \\(X = A^{-1}B\\) or \\(X = BA^{-1}\\)?",
        steps: ["\\(A\\) stands to the right of \\(X\\), so post-multiply both sides by \\(A^{-1}\\): \\(XAA^{-1} = BA^{-1}\\)."],
        answer: "\\(X = BA^{-1}\\)",
      },
      practiceSet: [
        { prompt: "If \\(AX = I\\), what is \\(X\\)?", answer: "\\(X = A^{-1}\\)" },
        { prompt: "If \\(AXB = C\\), with \\(A\\) and \\(B\\) invertible, write \\(X\\).", answer: "\\(X = A^{-1}CB^{-1}\\)" },
        { prompt: "\\(A\\) is symmetric and invertible. Is \\(A^{-1}\\) symmetric?", answer: "Yes" },
      ],
      pyqExampleId: "45957eeb-ed56-414a-be09-5184e6212c78",
      traps: [
        {
          title: "Multiplying on the wrong side",
          body: "From \\(AX = B\\) the answer is \\(A^{-1}B\\), not \\(BA^{-1}\\). The two are usually different matrices, because matrix multiplication is not commutative.",
        },
        {
          title: "Inverting a product in the same order",
          body: "\\((AB)^{-1}\\) is \\(B^{-1}A^{-1}\\). Writing \\(A^{-1}B^{-1}\\) is the most common slip in a 'verify that' question.",
        },
      ],
    },
  ],
};
