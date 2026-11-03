import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Mathematics (Part I), Ch. 2 Matrices. Definitions are the
 * Balbharati text's own, trimmed; every formula re-checked on a worked matrix;
 * most-asked years from the board past-paper questions in the bank, 2017-2026
 * (one 2015 question on matrix powers left out: the current book does not teach it).
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Matrices",
  chapterSlug: "matrices",
  source: "Balbharati Mathematics and Statistics Part I Std XII (Maharashtra State Board), Chapter 2",
  keyPoints: [
    {
      term: "Elementary transformations",
      text: "Six operations, three on rows and three on columns: interchange two rows (\\(R_i \\leftrightarrow R_j\\)), multiply a row by a non-zero scalar (\\(R_i \\to kR_i\\)), add \\(k\\) times one row to another (\\(R_j \\to R_j + kR_i\\)); the same for columns.",
    },
    {
      term: "Equivalent matrix",
      text: "After an elementary transformation, the matrix obtained is said to be equivalent to the original matrix (written \\(A \\sim B\\)). After \\(R_j \\to R_j + kR_i\\), row \\(R_i\\) itself stays the same.",
    },
    {
      term: "Inverse of a matrix",
      text: "If \\(A\\) is a square matrix of order \\(m\\) and there is a square matrix \\(B\\) of the same order with \\(AB = BA = I\\), then \\(B\\) is the inverse of \\(A\\), written \\(A^{-1}\\). Then \\(A\\) is also the inverse of \\(B\\).",
    },
    {
      term: "Invertible (non-singular)",
      text: "A square matrix \\(A\\) has an inverse if and only if \\(|A| \\neq 0\\) (non-singular). If \\(|A| = 0\\), \\(A\\) is singular and not invertible. **Check \\(|A|\\) first.**",
    },
    {
      term: "Uniqueness of the inverse",
      text: "If \\(A\\) is a square matrix and its inverse exists, then it is unique.",
    },
    {
      term: "Minor",
      text: "The minor \\(M_{ij}\\) of an element \\(a_{ij}\\) is the determinant obtained by deleting the \\(i\\)th row and \\(j\\)th column in which the element lies.",
    },
    {
      term: "Co-factor",
      text: "The co-factor of \\(a_{ij}\\) is \\(A_{ij} = (-1)^{i+j}M_{ij}\\). Signs follow the chessboard pattern, starting with + at the top left.",
    },
    {
      term: "Adjoint",
      text: "The adjoint of a square matrix \\(A = [a_{ij}]\\) is the **transpose** of the matrix of co-factors \\([A_{ij}]\\). It is denoted adj \\(A\\).",
    },
    {
      term: "Row or column transformations",
      text: "For \\(A^{-1}\\) by row transformations use \\(AA^{-1} = I\\) and transform the prefactor \\(A\\) and the right side \\(I\\). By column transformations use \\(A^{-1}A = I\\) and transform the postfactor. Never mix the two.",
    },
    {
      term: "Diagonal matrices",
      text: "A diagonal matrix is invertible if and only if all the elements in the diagonal are non-zero. The inverse of a diagonal matrix is a diagonal matrix.",
    },
    {
      term: "Matrix form of linear equations",
      text: "A system is written \\(AX = B\\): \\(X\\) is the column matrix of variables, \\(A\\) the matrix of coefficients of variables and \\(B\\) the column matrix of constants. For three equations the orders are \\(3 \\times 3\\), \\(3 \\times 1\\), \\(3 \\times 1\\).",
    },
    {
      term: "Method of inversion",
      text: "If \\(A\\) is non-singular, find \\(A^{-1}\\) (by transformations or by the adjoint method) and pre-multiply \\(AX = B\\) by it: \\(X = A^{-1}B\\).",
    },
    {
      term: "Method of reduction",
      text: "Using row transformations, reduce \\(A\\) to an upper triangular, lower triangular or diagonal matrix, performing the same row transformations on \\(B\\) at the same time. Rewrite as equations and solve by elimination.",
    },
  ],
  formulas: [
    { label: "Inverse", latex: "AA^{-1} = A^{-1}A = I \\qquad A^{-1} \\text{ exists} \\iff |A| \\neq 0" },
    { label: "Minor and co-factor", latex: "A_{ij} = (-1)^{i+j} M_{ij}" },
    { label: "Adjoint", latex: "\\operatorname{adj} A = [A_{ij}]^{T}" },
    { label: "Adjoint identity", latex: "A(\\operatorname{adj} A) = (\\operatorname{adj} A)A = |A|\\, I" },
    { label: "Inverse by adjoint", latex: "A^{-1} = \\frac{1}{|A|}\\operatorname{adj} A" },
    {
      label: "Two by two matrix",
      latex:
        "A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\Rightarrow \\operatorname{adj} A = \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}, \\quad A^{-1} = \\frac{1}{ad - bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}",
    },
    { label: "Inverse of a product, and its determinant", latex: "(AB)^{-1} = B^{-1}A^{-1} \\qquad |A^{-1}| = \\frac{1}{|A|}" },
    {
      label: "Inverse of a diagonal matrix",
      latex:
        "\\begin{bmatrix} x & 0 & 0 \\\\ 0 & y & 0 \\\\ 0 & 0 & z \\end{bmatrix}^{-1} = \\begin{bmatrix} \\frac{1}{x} & 0 & 0 \\\\ 0 & \\frac{1}{y} & 0 \\\\ 0 & 0 & \\frac{1}{z} \\end{bmatrix} \\quad (x, y, z \\neq 0)",
    },
    {
      label: "Rotation matrix",
      latex:
        "\\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}^{-1} = \\begin{bmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{bmatrix} \\qquad \\text{determinant } \\cos^2\\theta + \\sin^2\\theta = 1",
    },
    { label: "Linear equations", latex: "AX = B \\Rightarrow X = A^{-1}B" },
  ],
  derivations: [
    {
      title: "Find the inverse of a matrix by elementary row transformations",
      steps: [
        "Check \\(|A| \\neq 0\\), so \\(A^{-1}\\) exists.",
        "Write \\(AA^{-1} = I\\). Apply each row transformation to \\(A\\) on the left and to \\(I\\) on the right, together.",
        "Make the leading element 1, then make the rest of its column 0; repeat column by column until the left side is \\(I\\).",
        "The left side now reads \\(IA^{-1} = P\\), so \\(A^{-1} = P\\). Verify \\(AA^{-1} = I\\) if time allows.",
      ],
    },
    {
      title: "Find the inverse of a matrix by the adjoint method",
      steps: [
        "Find \\(|A|\\); it must be non-zero.",
        "Find all co-factors \\(A_{ij} = (-1)^{i+j}M_{ij}\\) and write the matrix of co-factors.",
        "Transpose it to get adj \\(A\\).",
        "\\(A^{-1} = \\frac{1}{|A|}\\operatorname{adj} A\\).",
      ],
    },
    {
      title: "Verify that \\(A(\\operatorname{adj} A) = (\\operatorname{adj} A)A = |A|I\\)",
      steps: [
        "Find \\(|A|\\) and adj \\(A\\). For \\(A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\): \\(|A| = -2\\), \\(\\operatorname{adj} A = \\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix}\\).",
        "Multiply both ways: \\(A(\\operatorname{adj} A) = \\begin{bmatrix} -2 & 0 \\\\ 0 & -2 \\end{bmatrix}\\), and \\((\\operatorname{adj} A)A\\) gives the same.",
        "Compare with \\(|A|I = -2I\\). All three are equal: verified.",
      ],
    },
    {
      title: "Prove that the inverse of a square matrix, if it exists, is unique",
      steps: [
        "Let \\(B\\) and \\(C\\) both be inverses of \\(A\\): \\(AB = BA = I\\) and \\(AC = CA = I\\).",
        "\\(B = BI = B(AC) = (BA)C = IC = C\\).",
        "Hence \\(B = C\\): the inverse is unique.",
      ],
    },
    {
      title: "Check whether a matrix is invertible",
      steps: [
        "Find its determinant.",
        "\\(|A| \\neq 0\\): non-singular, hence invertible. \\(|A| = 0\\): singular, not invertible.",
        "Example: \\(\\begin{vmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{vmatrix} = \\cos^2\\theta + \\sin^2\\theta = 1 \\neq 0\\), so it is invertible.",
      ],
    },
    {
      title: "Solve a system of equations by the method of inversion",
      steps: [
        "Write the equations as \\(AX = B\\), each in the order \\(x, y, z\\) (a missing variable has coefficient 0).",
        "Check \\(|A| \\neq 0\\); find \\(A^{-1}\\) by the adjoint method or by transformations.",
        "Pre-multiply by \\(A^{-1}\\): \\(X = A^{-1}B\\). Multiply out and equate entries to get \\(x, y, z\\).",
      ],
    },
    {
      title: "Solve a system of equations by the method of reduction",
      steps: [
        "Write the equations as \\(AX = B\\).",
        "Apply row transformations to \\(A\\) and the same ones to \\(B\\), until \\(A\\) is upper triangular.",
        "Rewrite as equations: the last gives \\(z\\), then back-substitute for \\(y\\) and \\(x\\).",
      ],
    },
    {
      title: "Word problem: find the numbers using matrices",
      steps: [
        "Let the numbers be \\(x, y, z\\); turn each sentence into an equation (\"twice the second added to the sum of the first and third\" is \\(x + 2y + z\\)).",
        "Write \\(AX = B\\) and solve by inversion or by reduction.",
        "Check the answer in all three original sentences.",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    {
      topic: "Find the co-factors, the matrix of co-factors or the adjoint of a matrix",
      years: [2026, 2025, 2022, 2020, 2018],
    },
    { topic: "Find the inverse of a matrix by elementary row transformations", years: [2025, 2024, 2023, 2018] },
    {
      topic: "Solve a system of linear equations by the method of inversion or of reduction (including word problems)",
      years: [2025, 2024, 2022, 2020],
    },
    { topic: "Find the inverse of a matrix by the adjoint method", years: [2026, 2024, 2017] },
    { topic: "Verify that \\(A(\\operatorname{adj} A) = (\\operatorname{adj} A)A = |A|I\\)", years: [2026, 2023] },
    { topic: "Check whether a matrix is invertible", years: [2024] },
  ],
  mistakes: [
    {
      title: "Giving the matrix of co-factors as the adjoint",
      body: "The adjoint is the **transpose** of the matrix of co-factors. For \\(\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\), swap \\(a\\) and \\(d\\) and change the signs of \\(b\\) and \\(c\\).",
    },
    {
      title: "Dropping the sign \\((-1)^{i+j}\\)",
      body: "A co-factor is the minor with a sign. \\(A_{12}\\), \\(A_{21}\\), \\(A_{23}\\) and \\(A_{32}\\) change sign; the corner and centre co-factors do not.",
    },
    {
      title: "Mixing row and column transformations",
      body: "In one inverse use only row transformations (with \\(AA^{-1} = I\\)) or only column transformations (with \\(A^{-1}A = I\\)). Apply every step to both sides.",
    },
    {
      title: "Skipping the determinant check",
      body: "Show \\(|A| \\neq 0\\) before finding \\(A^{-1}\\). If \\(|A| = 0\\), the matrix is singular: write that the inverse does not exist.",
    },
    {
      title: "Writing \\(X = BA^{-1}\\)",
      body: "Matrix multiplication is not commutative. Pre-multiply both sides of \\(AX = B\\) by \\(A^{-1}\\): \\(X = A^{-1}B\\), a column matrix.",
    },
    {
      title: "Forgetting \\(B\\) in the method of reduction",
      body: "Every row transformation on \\(A\\) must be done on \\(B\\) too, at the same time. Arrange each equation in the order \\(x, y, z\\) before writing \\(A\\).",
    },
  ],
};

export default sheet;
