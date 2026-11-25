import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_MT_INVERSE_NOTE: SubtopicNote = {
  subtopicName: "Elementary Operations and Inverse of a Matrix",
  title: "Invertible Matrices",
  oneLineDefinition:
    "What it means for B to be the inverse of A, why the inverse is unique, the inverse of a product, finding the inverse from a relation such as A squared minus 3A plus I equal to O, and a power of a matrix proved by induction.",
  whyItMatters:
    "4 questions, one of them from a board paper: the inverse of A written in terms of A from a relation between its powers (2023). The textbook rows are Exercise 3.4 (the one question the present book keeps there), the matrix X whose product with a 2 by 3 matrix is given (Miscellaneous Exercise Q8) and a power of a rotation matrix proved by induction (Miscellaneous Example 23). The present NCERT book no longer teaches elementary row and column operations, and no board paper from 2023 to 2026 in this bank asked them.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmmt-inverse",
      name: "The inverse of a matrix",
      intuition:
        "For numbers, 1/a is the number that multiplies a to give 1. For a square matrix A, the inverse is the matrix that multiplies A, on either side, to give the identity matrix I. Not every matrix has one, and a rectangular matrix never does. When you are given a relation between the powers of A, you can find the inverse without any new method: multiply the whole relation by the inverse of A and rearrange.",
      definition:
        "- **Definition:** if \\(A\\) is a square matrix of order \\(m\\) and there is a square matrix \\(B\\) of the same order with \\(AB = BA = I\\), then \\(B\\) is the **inverse** of \\(A\\), written \\(A^{-1}\\), and \\(A\\) is **invertible**.\n" +
        "- A rectangular matrix has no inverse. If \\(B\\) is the inverse of \\(A\\), then \\(A\\) is the inverse of \\(B\\).\n" +
        "- **Theorem 3 (the inverse is unique).** Let \\(B\\) and \\(C\\) both be inverses of \\(A\\), so \\(AB = BA = I\\) and \\(AC = CA = I\\).\n" +
        "- Then \\(B = BI = B(AC) = (BA)C = IC = C\\).\n" +
        "- **Theorem 4.** If \\(A\\) and \\(B\\) are invertible matrices of the same order, then \\((AB)^{-1} = B^{-1}A^{-1}\\).\n" +
        "- **Inverse from a relation:** from, say, \\(A^2 + pA + qI = O\\) with \\(q \\neq 0\\), multiply by \\(A^{-1}\\): \\(A + pI + qA^{-1} = O\\), so \\(A^{-1} = -\\dfrac{1}{q}(A + pI)\\).\n" +
        "- **An unknown X with \\(XP = Q\\), P not square:** P has no inverse, so write X with letters, multiply and compare elements.\n" +
        "- The present book has dropped elementary row and column operations. The inverse of a given matrix is found in the next chapter, Determinants, by the adjoint method.",
      formula: {
        label: "Inverse",
        latex: "AB = BA = I \\;\\Rightarrow\\; B = A^{-1}, \\qquad (AB)^{-1} = B^{-1}A^{-1}",
      },
      authoredExample: {
        prompt:
          "Show that \\(B = \\begin{bmatrix} 2 & -1 \\\\ -5 & 3 \\end{bmatrix}\\) is the inverse of \\(A = \\begin{bmatrix} 3 & 1 \\\\ 5 & 2 \\end{bmatrix}\\).",
        steps: [
          "\\(AB = \\begin{bmatrix} 3(2) + 1(-5) & 3(-1) + 1(3) \\\\ 5(2) + 2(-5) & 5(-1) + 2(3) \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = I\\).",
          "\\(BA = \\begin{bmatrix} 2(3) + (-1)(5) & 2(1) + (-1)(2) \\\\ -5(3) + 3(5) & -5(1) + 3(2) \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = I\\).",
          "Since \\(AB = BA = I\\), \\(B\\) is the inverse of \\(A\\).",
        ],
        answer: "\\(AB = BA = I\\), so \\(B = A^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "A and B are invertible matrices of the same order. Write \\((AB)^{-1}\\) in terms of \\(A^{-1}\\) and \\(B^{-1}\\).",
        steps: ["The order reverses, as for the transpose."],
        answer: "\\((AB)^{-1} = B^{-1}A^{-1}\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(AB = BA = I\\), what is the inverse of \\(B\\)?",
          answer: "\\(A\\)",
        },
        {
          prompt: "Can a \\(2 \\times 3\\) matrix have an inverse?",
          answer: "No. Only a square matrix can have an inverse",
        },
        {
          prompt: "Find the matrix \\(X\\) if \\(X\\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 1 \\end{bmatrix} = \\begin{bmatrix} 2 & 5 & 1 \\\\ 1 & 2 & 0 \\end{bmatrix}\\).",
          answer: "\\(X\\) is \\(2 \\times 2\\); comparing elements gives \\(X = \\begin{bmatrix} 2 & 1 \\\\ 1 & 0 \\end{bmatrix}\\)",
        },
      ],
      pyqExampleId: "63459e0a-49c4-446c-b6ac-e29001ff8b5d",
      traps: [
        {
          title: "Thinking AB = BA is enough",
          body: "For \\(B\\) to be the inverse of \\(A\\), the two products must both equal \\(I\\): \\(AB = BA = I\\). Two matrices can commute without being inverses.",
        },
        {
          title: "Writing the inverse of a product as \\(A^{-1}B^{-1}\\)",
          body: "\\((AB)^{-1} = B^{-1}A^{-1}\\), with the order reversed, just like \\((AB)' = B'A'\\).",
        },
        {
          title: "Spending time on elementary operations",
          body: "The present NCERT book does not teach elementary row and column operations, and no board paper from 2023 to 2026 in this bank asked them. Learn the inverse by the adjoint method in Determinants instead.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmmt-induction",
      name: "A power formula proved by induction",
      intuition:
        "Squaring a matrix two or three times often shows a pattern for the nth power. Seeing a pattern is not a proof. The principle of mathematical induction turns it into one: show the formula is true for n = 1, assume it is true for n = k, and use one multiplication by A to show it is true for n = k + 1.",
      definition:
        "- Let \\(P(n)\\) be the statement that \\(A^n\\) equals the given matrix.\n" +
        "- **Step 1:** check \\(P(1)\\): \\(A^1 = A\\) agrees with the formula at \\(n = 1\\).\n" +
        "- **Step 2:** assume \\(P(k)\\) is true, that is \\(A^k\\) is given by the formula with \\(n = k\\).\n" +
        "- **Step 3:** \\(A^{k+1} = A^k A\\). Multiply the assumed \\(A^k\\) by \\(A\\) and simplify to the formula with \\(n = k + 1\\).\n" +
        "- **Conclusion:** \\(P(k)\\) true implies \\(P(k + 1)\\) true, so by the principle of mathematical induction \\(P(n)\\) is true for all natural numbers \\(n\\).",
      formula: {
        label: "The induction step",
        latex: "A^{k+1} = A^k \\, A",
      },
      authoredExample: {
        prompt: "If \\(A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}\\), prove that \\(A^n = \\begin{bmatrix} 1 & n \\\\ 0 & 1 \\end{bmatrix}\\) for every natural number \\(n\\).",
        steps: [
          "Let \\(P(n)\\): \\(A^n = \\begin{bmatrix} 1 & n \\\\ 0 & 1 \\end{bmatrix}\\).",
          "\\(P(1)\\): \\(A^1 = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}\\), so \\(P(1)\\) is true.",
          "Assume \\(P(k)\\) is true: \\(A^k = \\begin{bmatrix} 1 & k \\\\ 0 & 1 \\end{bmatrix}\\).",
          "Then \\(A^{k+1} = A^k A = \\begin{bmatrix} 1 & k \\\\ 0 & 1 \\end{bmatrix}\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 1 + k \\\\ 0 & 1 \\end{bmatrix}\\).",
          "So \\(P(k + 1)\\) is true whenever \\(P(k)\\) is true.",
          "By the principle of mathematical induction, \\(P(n)\\) is true for all natural numbers \\(n\\).",
        ],
        answer: "\\(A^n = \\begin{bmatrix} 1 & n \\\\ 0 & 1 \\end{bmatrix}\\) for all natural numbers \\(n\\)",
      },
      selfCheckExample: {
        prompt: "Using the result \\(A^n = \\begin{bmatrix} 1 & n \\\\ 0 & 1 \\end{bmatrix}\\) for \\(A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}\\), write \\(A^5\\).",
        steps: ["Put \\(n = 5\\)."],
        answer: "\\(\\begin{bmatrix} 1 & 5 \\\\ 0 & 1 \\end{bmatrix}\\)",
      },
      practiceSet: [
        {
          prompt: "If \\(A = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}\\), write \\(A^n\\).",
          answer: "\\(\\begin{bmatrix} 2^n & 0 \\\\ 0 & 3^n \\end{bmatrix}\\)",
        },
        {
          prompt: "If \\(A = \\begin{bmatrix} 1 & 0 \\\\ 2 & 1 \\end{bmatrix}\\), find \\(A^2\\) and \\(A^3\\) and guess \\(A^n\\).",
          answer: "\\(A^2 = \\begin{bmatrix} 1 & 0 \\\\ 4 & 1 \\end{bmatrix}\\), \\(A^3 = \\begin{bmatrix} 1 & 0 \\\\ 6 & 1 \\end{bmatrix}\\), so \\(A^n = \\begin{bmatrix} 1 & 0 \\\\ 2n & 1 \\end{bmatrix}\\)",
        },
        {
          prompt: "In an induction proof, after assuming the statement for \\(n = k\\), what must you show?",
          answer: "That the statement is true for \\(n = k + 1\\)",
        },
      ],
      pyqExampleId: "b221b423-e8be-492e-8233-ebe0e729bb50",
      traps: [
        {
          title: "Checking a few values instead of proving",
          body: "Working out \\(A^2\\) and \\(A^3\\) shows the pattern; it does not prove it. The proof needs the base case, the assumption for \\(n = k\\) and the step to \\(n = k + 1\\), each written out.",
        },
        {
          title: "Leaving out the conclusion",
          body: "End with the sentence that, by the principle of mathematical induction, the result is true for all natural numbers \\(n\\). It is part of the answer.",
        },
      ],
    },
  ],
};
