import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_DT_INVERSE_NOTE: SubtopicNote = {
  subtopicName: "Adjoint and Inverse of a Matrix",
  title: "Adjoint and Inverse of a Matrix",
  oneLineDefinition:
    "The adjoint of a square matrix is the transpose of its matrix of cofactors; A(adj A) = (adj A)A = |A|I, so a matrix has an inverse exactly when |A| ≠ 0, and then A⁻¹ = (1/|A|) adj A.",
  whyItMatters:
    "58 questions, thirty-two of them from board papers: five in 2023, ten in 2024, nine in 2025 and eight in 2026. Every year from 2023 to 2026 the board read |A| off a product such as A(adj A) = 3I and asked for |adj A|, |2A| or det(B⁻¹). It asked for the inverse of a 3 by 3 matrix inside a case study (2023, 2025, 2026), (AB)⁻¹ with B⁻¹ given (2023, 2024), (kA)⁻¹ (2025, 2026), A⁻¹ from a relation such as A² − A + I = O (2023, 2026), the values of λ that make a matrix invertible (2024) and unknown entries found from AA⁻¹ = I (2024). The textbook adds Exercise 4.4, Examples 12 to 15 and Miscellaneous Questions 3, 4 and 8.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmdt-adjoint",
      name: "Adjoint of a matrix and A(adj A) = |A|I",
      intuition:
        "Replace every element by its cofactor, then transpose. That is the adjoint. Multiply \\(A\\) by its adjoint and each diagonal entry becomes a row times its own cofactors, which is \\(|A|\\); every other entry is a row times another row's cofactors, which is 0. So the product is \\(|A|\\) times the identity.",
      definition:
        "- \\(\\operatorname{adj} A\\) is the **transpose** of the matrix of cofactors \\([A_{ij}]\\).\n" +
        "- For order 3: \\(\\operatorname{adj} A = \\begin{bmatrix} A_{11} & A_{21} & A_{31} \\\\ A_{12} & A_{22} & A_{32} \\\\ A_{13} & A_{23} & A_{33} \\end{bmatrix}\\): the cofactors of row 1 go down column 1.\n" +
        "- **Order 2 shortcut:** for \\(\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\), swap \\(a\\) and \\(d\\) and change the signs of \\(b\\) and \\(c\\): \\(\\operatorname{adj} A = \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}\\).\n" +
        "- **Theorem 1:** \\(A(\\operatorname{adj} A) = (\\operatorname{adj} A)A = |A|I\\), where \\(I\\) has the order of \\(A\\).\n" +
        "- So if \\(A(\\operatorname{adj} A) = kI\\), then \\(|A| = k\\).",
      formula: {
        label: "Adjoint and the product with A",
        latex: "\\operatorname{adj} A = [A_{ij}]^{T}, \\qquad A(\\operatorname{adj} A) = (\\operatorname{adj} A)A = |A|\\,I",
      },
      authoredExample: {
        prompt: "Find \\(\\operatorname{adj} A\\) for \\(A = \\begin{bmatrix} 2 & -1 & 0 \\\\ 1 & 3 & 2 \\\\ 0 & 1 & 4 \\end{bmatrix}\\) and verify that \\(A(\\operatorname{adj} A) = |A|I\\).",
        steps: [
          "\\(|A| = 2(12 - 2) - (-1)(4 - 0) + 0 = 20 + 4 = 24\\).",
          "\\(A_{11} = 12 - 2 = 10\\), \\(A_{12} = -(4 - 0) = -4\\), \\(A_{13} = 1 - 0 = 1\\).",
          "\\(A_{21} = -(-4 - 0) = 4\\), \\(A_{22} = 8 - 0 = 8\\), \\(A_{23} = -(2 - 0) = -2\\).",
          "\\(A_{31} = -2 - 0 = -2\\), \\(A_{32} = -(4 - 0) = -4\\), \\(A_{33} = 6 + 1 = 7\\).",
          "\\(\\operatorname{adj} A = \\begin{bmatrix} 10 & 4 & -2 \\\\ -4 & 8 & -4 \\\\ 1 & -2 & 7 \\end{bmatrix}\\) (cofactors of row 1 written as column 1).",
          "\\(A(\\operatorname{adj} A) = \\begin{bmatrix} 20 + 4 + 0 & 8 - 8 + 0 & -4 + 4 + 0 \\\\ 10 - 12 + 2 & 4 + 24 - 4 & -2 - 12 + 14 \\\\ 0 - 4 + 4 & 0 + 8 - 8 & 0 - 4 + 28 \\end{bmatrix} = \\begin{bmatrix} 24 & 0 & 0 \\\\ 0 & 24 & 0 \\\\ 0 & 0 & 24 \\end{bmatrix}\\).",
          "\\(= 24I = |A|I\\), as required.",
        ],
        answer: "\\(\\operatorname{adj} A = \\begin{bmatrix} 10 & 4 & -2 \\\\ -4 & 8 & -4 \\\\ 1 & -2 & 7 \\end{bmatrix}\\), and \\(A(\\operatorname{adj} A) = 24I\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\operatorname{adj} A\\) for \\(A = \\begin{bmatrix} 4 & -3 \\\\ 2 & 5 \\end{bmatrix}\\).",
        steps: [
          "Swap the diagonal entries 4 and 5.",
          "Change the signs of \\(-3\\) and 2.",
          "\\(\\operatorname{adj} A = \\begin{bmatrix} 5 & 3 \\\\ -2 & 4 \\end{bmatrix}\\).",
        ],
        answer: "\\(\\begin{bmatrix} 5 & 3 \\\\ -2 & 4 \\end{bmatrix}\\)",
      },
      practiceSet: [
        { prompt: "Find \\((\\operatorname{adj} A)A\\) for \\(A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\).", answer: "\\(\\begin{bmatrix} -2 & 0 \\\\ 0 & -2 \\end{bmatrix}\\)", method: "\\(|A|I\\) with \\(|A| = -2\\)" },
        { prompt: "A square matrix \\(A\\) of order 3 has \\(A(\\operatorname{adj} A) = 10I\\). Find \\(|A|\\).", answer: "\\(10\\)" },
        { prompt: "Find \\(\\operatorname{adj} A\\) for \\(A = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 3 \\end{bmatrix}\\).", answer: "\\(\\begin{bmatrix} 6 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 2 \\end{bmatrix}\\)" },
      ],
      pyqExampleId: "359330c1-7236-44fa-91c3-dab11df2c910",
      traps: [
        {
          title: "Forgetting to transpose",
          body: "The matrix of cofactors is not the adjoint. The cofactors of row 1 must stand in column 1 of \\(\\operatorname{adj} A\\).",
        },
        {
          title: "The order 2 shortcut applied to order 3",
          body: "Swapping the diagonal and changing signs works only for a 2 by 2 matrix. A 3 by 3 adjoint needs all nine cofactors.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmdt-adj-results",
      name: "Determinant of the adjoint and of the inverse",
      intuition:
        "Take determinants of both sides of \\((\\operatorname{adj} A)A = |A|I\\). The right side is \\(|A|\\) times the identity, whose determinant is \\(|A|^n\\). Divide by \\(|A|\\) and you get \\(|\\operatorname{adj} A| = |A|^{n-1}\\). Most one-mark questions on this page are this result combined with \\(|kA| = k^n|A|\\).",
      definition:
        "- \\(|\\operatorname{adj} A| = |A|^{n-1}\\) for a square matrix of order \\(n\\). For order 3 this is \\(|A|^2\\).\n" +
        "- \\(|A(\\operatorname{adj} A)| = ||A|I| = |A|^n\\).\n" +
        "- \\(|A^{-1}| = \\dfrac{1}{|A|}\\).\n" +
        "- \\(|k \\operatorname{adj} A| = k^n|A|^{n-1}\\).\n" +
        "- If \\(A\\) is non-singular, \\(|\\operatorname{adj} A| \\ne 0\\), so \\(\\operatorname{adj} A\\) is non-singular too.\n" +
        "- Given \\(|\\operatorname{adj} A|\\) for order 3, \\(|A|^2\\) is known, so \\(|A|\\) has two values, \\(\\pm\\).",
      formula: {
        label: "Determinant of the adjoint",
        latex: "|\\operatorname{adj} A| = |A|^{n-1}",
        symbols: [{ symbol: "\\(n\\)", meaning: "order of A" }],
      },
      authoredExample: {
        prompt: "\\(A\\) is a square matrix of order 3 with \\(|A| = -3\\). Find \\(|\\operatorname{adj} A|\\), \\(|A^{-1}|\\), \\(|2\\operatorname{adj} A|\\) and \\(|A(\\operatorname{adj} A)|\\).",
        steps: [
          "\\(|\\operatorname{adj} A| = |A|^{3-1} = (-3)^2 = 9\\).",
          "\\(|A^{-1}| = \\dfrac{1}{|A|} = -\\dfrac{1}{3}\\).",
          "\\(|2\\operatorname{adj} A| = 2^3|\\operatorname{adj} A| = 8 \\times 9 = 72\\).",
          "\\(A(\\operatorname{adj} A) = |A|I = -3I\\), so \\(|A(\\operatorname{adj} A)| = (-3)^3|I| = -27\\).",
        ],
        answer: "\\(9,\\ -\\dfrac{1}{3},\\ 72,\\ -27\\)",
      },
      selfCheckExample: {
        prompt: "For a square matrix \\(A\\) of order 3, \\(A(\\operatorname{adj} A) = \\begin{bmatrix} 5 & 0 & 0 \\\\ 0 & 5 & 0 \\\\ 0 & 0 & 5 \\end{bmatrix}\\). Find \\(|\\operatorname{adj} A|\\) and \\(|3A|\\).",
        steps: [
          "\\(A(\\operatorname{adj} A) = |A|I = 5I\\), so \\(|A| = 5\\).",
          "\\(|\\operatorname{adj} A| = |A|^2 = 25\\).",
          "\\(|3A| = 3^3|A| = 27 \\times 5 = 135\\).",
        ],
        answer: "\\(25\\) and \\(135\\)",
      },
      practiceSet: [
        { prompt: "\\(A\\) is of order 2 with \\(|A| = -6\\). Find \\(|\\operatorname{adj} A|\\).", answer: "\\(-6\\)", method: "\\(|A|^{2-1}\\)" },
        { prompt: "\\(A\\) is of order 3 with \\(|\\operatorname{adj} A| = 49\\). Find \\(|A|\\).", answer: "\\(7\\) or \\(-7\\)" },
        { prompt: "\\(A\\) is a non-singular matrix of order 3. Is \\(\\operatorname{adj} A\\) singular?", answer: "No: \\(|\\operatorname{adj} A| = |A|^2 \\ne 0\\)." },
      ],
      pyqExampleId: "152a9ef3-80a4-40a6-8052-db3c6457156b",
      traps: [
        {
          title: "Power n in place of n − 1",
          body: "For order 3, \\(|\\operatorname{adj} A| = |A|^2\\), not \\(|A|^3\\). The cube belongs to \\(|A(\\operatorname{adj} A)|\\).",
        },
        {
          title: "Dropping the negative root",
          body: "From \\(|A|^2 = 36\\), \\(|A| = 6\\) or \\(-6\\). Nothing in such a question rules out the negative value.",
        },
        {
          title: "Reading |A| as the whole product",
          body: "If \\(A(\\operatorname{adj} A) = 3I\\) for order 3, then \\(|A| = 3\\), not 27. The 27 is the determinant of the product.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmdt-inverse-formula",
      name: "Inverse by the adjoint: A⁻¹ = adj A ÷ |A|",
      intuition:
        "Divide \\(A(\\operatorname{adj} A) = |A|I\\) by \\(|A|\\) and you have a matrix that multiplies \\(A\\) to give \\(I\\). That is the inverse, and it exists only when you are allowed to divide, that is when \\(|A| \\ne 0\\).",
      definition:
        "- **Theorem 4:** a square matrix \\(A\\) is invertible if and only if it is non-singular, \\(|A| \\ne 0\\).\n" +
        "- Then \\(A^{-1} = \\dfrac{1}{|A|}\\operatorname{adj} A\\).\n" +
        "- **Board steps:** find \\(|A|\\) and state \\(|A| \\ne 0\\), so \\(A^{-1}\\) exists; write the nine cofactors; write \\(\\operatorname{adj} A\\); write \\(A^{-1}\\).\n" +
        "- A diagonal matrix with non-zero diagonal entries has as inverse the diagonal matrix of the reciprocals.\n" +
        "- If a matrix is given as the inverse of \\(A\\), their product is \\(I\\): compare one entry at a time to find an unknown.\n" +
        "- \\((A^{-1})^{-1} = A\\): to find \\(A\\) from \\(A^{-1}\\), invert \\(A^{-1}\\).",
      formula: {
        label: "Inverse of a non-singular matrix",
        latex: "A^{-1} = \\dfrac{1}{|A|}\\operatorname{adj} A, \\qquad |A| \\ne 0",
      },
      authoredExample: {
        prompt: "Find \\(A^{-1}\\) for \\(A = \\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 3 \\\\ 2 & 0 & 1 \\end{bmatrix}\\).",
        steps: [
          "\\(|A| = 1(1 - 0) - 2(0 - 6) + 0 = 1 + 12 = 13 \\ne 0\\), so \\(A^{-1}\\) exists.",
          "\\(A_{11} = 1\\), \\(A_{12} = -(0 - 6) = 6\\), \\(A_{13} = 0 - 2 = -2\\).",
          "\\(A_{21} = -(2 - 0) = -2\\), \\(A_{22} = 1 - 0 = 1\\), \\(A_{23} = -(0 - 4) = 4\\).",
          "\\(A_{31} = 6 - 0 = 6\\), \\(A_{32} = -(3 - 0) = -3\\), \\(A_{33} = 1 - 0 = 1\\).",
          "\\(\\operatorname{adj} A = \\begin{bmatrix} 1 & -2 & 6 \\\\ 6 & 1 & -3 \\\\ -2 & 4 & 1 \\end{bmatrix}\\).",
          "\\(A^{-1} = \\dfrac{1}{|A|}\\operatorname{adj} A = \\dfrac{1}{13}\\begin{bmatrix} 1 & -2 & 6 \\\\ 6 & 1 & -3 \\\\ -2 & 4 & 1 \\end{bmatrix}\\).",
        ],
        answer: "\\(A^{-1} = \\dfrac{1}{13}\\begin{bmatrix} 1 & -2 & 6 \\\\ 6 & 1 & -3 \\\\ -2 & 4 & 1 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "Find the inverse of \\(\\begin{bmatrix} 3 & -1 \\\\ 5 & 2 \\end{bmatrix}\\).",
        steps: [
          "\\(|A| = 3 \\times 2 - (-1) \\times 5 = 6 + 5 = 11 \\ne 0\\).",
          "\\(\\operatorname{adj} A = \\begin{bmatrix} 2 & 1 \\\\ -5 & 3 \\end{bmatrix}\\).",
          "\\(A^{-1} = \\dfrac{1}{11}\\begin{bmatrix} 2 & 1 \\\\ -5 & 3 \\end{bmatrix}\\).",
        ],
        answer: "\\(\\dfrac{1}{11}\\begin{bmatrix} 2 & 1 \\\\ -5 & 3 \\end{bmatrix}\\)",
      },
      practiceSet: [
        { prompt: "For what value of \\(\\lambda\\) is \\(\\begin{bmatrix} 1 & \\lambda & 2 \\\\ 0 & 2 & 1 \\\\ 3 & 1 & 1 \\end{bmatrix}\\) not invertible?", answer: "\\(\\lambda = \\dfrac{11}{3}\\)", method: "\\(|A| = 3\\lambda - 11\\)" },
        { prompt: "Find the inverse of \\(\\begin{bmatrix} 3 & 0 & 0 \\\\ 0 & -1 & 0 \\\\ 0 & 0 & 4 \\end{bmatrix}\\).", answer: "\\(\\begin{bmatrix} \\tfrac{1}{3} & 0 & 0 \\\\ 0 & -1 & 0 \\\\ 0 & 0 & \\tfrac{1}{4} \\end{bmatrix}\\)" },
        { prompt: "If \\(A^{-1} = \\dfrac{1}{5}\\begin{bmatrix} 1 & 2 \\\\ -2 & 1 \\end{bmatrix}\\), find \\(A\\).", answer: "\\(\\begin{bmatrix} 1 & -2 \\\\ 2 & 1 \\end{bmatrix}\\)" },
      ],
      pyqExampleId: "b5c6222c-d397-4d7c-85e5-4a46f8960028",
      traps: [
        {
          title: "No line on existence",
          body: "Write \\(|A| \\ne 0\\), so \\(A^{-1}\\) exists, before you find any cofactor. The board gives a mark for that line.",
        },
        {
          title: "Losing the sign of |A|",
          body: "With \\(|A| = -7\\), \\(A^{-1} = -\\dfrac{1}{7}\\operatorname{adj} A\\). Dividing by 7 alone gives a matrix whose product with \\(A\\) is \\(-I\\).",
        },
        {
          title: "No check at the end",
          body: "Multiply one row of \\(A\\) by one column of your \\(A^{-1}\\). A diagonal entry must give 1 and any other entry 0; a wrong cofactor shows up at once.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmdt-inverse-laws",
      name: "Inverse of a product, a scalar multiple and a transpose",
      intuition:
        "To undo \"first \\(B\\), then \\(A\\)\" you undo \\(A\\) first and \\(B\\) last, so the order reverses. A scalar inverts like a number, and a transpose can be taken before or after inverting.",
      definition:
        "- **Reversal law:** \\((AB)^{-1} = B^{-1}A^{-1}\\), for invertible \\(A\\), \\(B\\) of the same order (Example 14 of the book verifies it).\n" +
        "- So when \\(B^{-1}\\) is given, find only \\(A^{-1}\\) and multiply \\(B^{-1}A^{-1}\\) in that order.\n" +
        "- \\((kA)^{-1} = \\dfrac{1}{k}A^{-1}\\) for \\(k \\ne 0\\), because \\((kA)\\left(\\dfrac{1}{k}A^{-1}\\right) = I\\).\n" +
        "- \\((A^{-1})^{-1} = A\\).\n" +
        "- \\((A')^{-1} = (A^{-1})'\\), because \\(A'(A^{-1})' = (A^{-1}A)' = I' = I\\).\n" +
        "- \\((A + B)^{-1}\\) is **not** \\(A^{-1} + B^{-1}\\): with \\(A = B = I\\), the left side is \\(\\dfrac{1}{2}I\\) and the right side \\(2I\\).",
      formula: {
        label: "Reversal law and scalar multiple",
        latex: "(AB)^{-1} = B^{-1}A^{-1}, \\qquad (kA)^{-1} = \\dfrac{1}{k}A^{-1}",
      },
      authoredExample: {
        prompt: "If \\(A = \\begin{bmatrix} 1 & 2 \\\\ 1 & 3 \\end{bmatrix}\\) and \\(B^{-1} = \\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}\\), find \\((AB)^{-1}\\).",
        steps: [
          "\\((AB)^{-1} = B^{-1}A^{-1}\\), so only \\(A^{-1}\\) is needed.",
          "\\(|A| = 3 - 2 = 1 \\ne 0\\), and \\(\\operatorname{adj} A = \\begin{bmatrix} 3 & -2 \\\\ -1 & 1 \\end{bmatrix}\\), so \\(A^{-1} = \\begin{bmatrix} 3 & -2 \\\\ -1 & 1 \\end{bmatrix}\\).",
          "\\(B^{-1}A^{-1} = \\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}\\begin{bmatrix} 3 & -2 \\\\ -1 & 1 \\end{bmatrix} = \\begin{bmatrix} 6 + 1 & -4 - 1 \\\\ -9 - 2 & 6 + 2 \\end{bmatrix}\\).",
          "\\(= \\begin{bmatrix} 7 & -5 \\\\ -11 & 8 \\end{bmatrix}\\).",
        ],
        answer: "\\((AB)^{-1} = \\begin{bmatrix} 7 & -5 \\\\ -11 & 8 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "For \\(A = \\begin{bmatrix} 3 & 1 \\\\ 2 & 1 \\end{bmatrix}\\), find \\((2A)^{-1}\\).",
        steps: [
          "\\(|A| = 3 - 2 = 1\\), so \\(A^{-1} = \\begin{bmatrix} 1 & -1 \\\\ -2 & 3 \\end{bmatrix}\\).",
          "\\((2A)^{-1} = \\dfrac{1}{2}A^{-1} = \\dfrac{1}{2}\\begin{bmatrix} 1 & -1 \\\\ -2 & 3 \\end{bmatrix}\\).",
        ],
        answer: "\\(\\dfrac{1}{2}\\begin{bmatrix} 1 & -1 \\\\ -2 & 3 \\end{bmatrix}\\)",
      },
      practiceSet: [
        { prompt: "\\(A\\) and \\(B\\) are invertible of order 3 with \\(|A| = 2\\) and \\(|B| = -3\\). Find \\(|(AB)^{-1}|\\).", answer: "\\(-\\dfrac{1}{6}\\)" },
        { prompt: "Write \\((5A)^{-1}\\) in terms of \\(A^{-1}\\).", answer: "\\(\\dfrac{1}{5}A^{-1}\\)" },
        { prompt: "For invertible \\(A\\), write \\((A')^{-1}\\) in terms of \\(A^{-1}\\).", answer: "\\((A^{-1})'\\)" },
      ],
      pyqExampleId: "3e12907c-782e-4eac-bb4f-e784b5c3d1a6",
      traps: [
        {
          title: "Keeping the order",
          body: "\\((AB)^{-1} = B^{-1}A^{-1}\\), not \\(A^{-1}B^{-1}\\). Matrix products do not commute, so the two orders give different matrices.",
        },
        {
          title: "Inverting a scalar the wrong way",
          body: "\\((3A)^{-1} = \\dfrac{1}{3}A^{-1}\\). Writing \\(3A^{-1}\\) gives a matrix whose product with \\(3A\\) is \\(9I\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmdt-matrix-polynomial",
      name: "Inverse from a matrix equation such as A² − 6A + 8I = O",
      intuition:
        "If \\(A\\) satisfies an equation in its powers, multiply the whole equation by \\(A^{-1}\\). Each power of \\(A\\) drops by one, the constant term \\(I\\) becomes \\(A^{-1}\\), and you can read off \\(A^{-1}\\) without a single cofactor.",
      definition:
        "- First show the equation holds: work out \\(A^2\\) (and \\(A^3\\) if needed), substitute, and get \\(O\\).\n" +
        "- Multiplying by \\(A^{-1}\\) is allowed only if \\(|A| \\ne 0\\); state it.\n" +
        "- \\(A^2A^{-1} = A\\), \\(AA^{-1} = I\\), \\(IA^{-1} = A^{-1}\\).\n" +
        "- Collect \\(A^{-1}\\) on one side and divide by the number in front of it.\n" +
        "- The number term of a matrix equation is always a multiple of \\(I\\), never a bare number.",
      formula: {
        label: "From the equation to the inverse",
        latex: "A^2 + pA + qI = O,\\ q \\ne 0 \\;\\Rightarrow\\; A^{-1} = -\\dfrac{1}{q}(A + pI)",
      },
      authoredExample: {
        prompt: "Show that \\(A = \\begin{bmatrix} 3 & 1 \\\\ 1 & 3 \\end{bmatrix}\\) satisfies \\(A^2 - 6A + 8I = O\\), and hence find \\(A^{-1}\\).",
        steps: [
          "\\(A^2 = \\begin{bmatrix} 3 & 1 \\\\ 1 & 3 \\end{bmatrix}\\begin{bmatrix} 3 & 1 \\\\ 1 & 3 \\end{bmatrix} = \\begin{bmatrix} 10 & 6 \\\\ 6 & 10 \\end{bmatrix}\\).",
          "\\(A^2 - 6A + 8I = \\begin{bmatrix} 10 & 6 \\\\ 6 & 10 \\end{bmatrix} - \\begin{bmatrix} 18 & 6 \\\\ 6 & 18 \\end{bmatrix} + \\begin{bmatrix} 8 & 0 \\\\ 0 & 8 \\end{bmatrix} = \\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix} = O\\).",
          "\\(|A| = 9 - 1 = 8 \\ne 0\\), so \\(A^{-1}\\) exists. Multiply the equation by \\(A^{-1}\\): \\(A - 6I + 8A^{-1} = O\\).",
          "\\(8A^{-1} = 6I - A = \\begin{bmatrix} 3 & -1 \\\\ -1 & 3 \\end{bmatrix}\\).",
          "\\(A^{-1} = \\dfrac{1}{8}\\begin{bmatrix} 3 & -1 \\\\ -1 & 3 \\end{bmatrix}\\).",
        ],
        answer: "\\(A^{-1} = \\dfrac{1}{8}\\begin{bmatrix} 3 & -1 \\\\ -1 & 3 \\end{bmatrix}\\)",
      },
      selfCheckExample: {
        prompt: "A square matrix \\(A\\) satisfies \\(A^3 = I\\). Write \\(A^{-1}\\) in terms of \\(A\\).",
        steps: [
          "\\(A^3 = I\\) gives \\(A \\cdot A^2 = I\\).",
          "So \\(A^2\\) multiplied by \\(A\\) gives \\(I\\), and \\(A^{-1} = A^2\\).",
        ],
        answer: "\\(A^{-1} = A^2\\)",
      },
      practiceSet: [
        { prompt: "Show that \\(A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 1 \\end{bmatrix}\\) satisfies \\(A^2 - 2A - 3I = O\\) and find \\(A^{-1}\\).", answer: "\\(A^{-1} = \\dfrac{1}{3}(A - 2I) = \\dfrac{1}{3}\\begin{bmatrix} -1 & 2 \\\\ 2 & -1 \\end{bmatrix}\\)" },
        { prompt: "For \\(A = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}\\), find numbers \\(a\\) and \\(b\\) such that \\(A^2 + aA + bI = O\\).", answer: "\\(a = -5\\), \\(b = 6\\)", method: "\\(4 + 2a + b = 0\\) and \\(9 + 3a + b = 0\\)" },
      ],
      pyqExampleId: "a3dec237-8717-4937-83d7-d510841cdb4a",
      traps: [
        {
          title: "Writing 8 for 8I",
          body: "\\(A^{-1} = \\dfrac{1}{8}(6 - A)\\) has no meaning: a number cannot be added to a matrix. Write \\(6I - A\\).",
        },
        {
          title: "Multiplying without the condition",
          body: "Say \\(|A| \\ne 0\\) before multiplying by \\(A^{-1}\\). The step mark goes with that line.",
        },
      ],
    },
  ],
};
