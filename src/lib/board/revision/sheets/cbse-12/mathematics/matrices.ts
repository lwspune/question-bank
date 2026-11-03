import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Mathematics, Ch. 3 Matrices. Definitions and theorems are
 * NCERT's own, trimmed; every worked matrix re-multiplied by hand; most-asked
 * groups from the CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Matrices",
  chapterSlug: "matrices",
  source: "NCERT Mathematics Part I (CBSE Class 12), Chapter 3",
  keyPoints: [
    {
      term: "Matrix and its order",
      text: "A matrix is an ordered rectangular array of numbers or functions, called its elements or entries. A matrix with m rows and n columns has order \\(m \\times n\\) and \\(mn\\) elements.",
    },
    {
      term: "Row, column, square matrix",
      text: "A **column matrix** has only one column (\\(m \\times 1\\)); a **row matrix** has only one row (\\(1 \\times n\\)). A matrix with the number of rows equal to the number of columns is a **square matrix** of order n.",
    },
    {
      term: "Diagonal and scalar matrix",
      text: "A square matrix is **diagonal** if all its non-diagonal elements are zero. A diagonal matrix is **scalar** if its diagonal elements are equal: \\(b_{ij} = 0\\) for \\(i \\neq j\\) and \\(b_{ii} = k\\). Every scalar matrix is diagonal; not every diagonal matrix is scalar.",
    },
    {
      term: "Identity and zero matrix",
      text: "A square matrix in which elements in the diagonal are all 1 and the rest are all zero is the **identity matrix** \\(I_n\\). A matrix with all elements zero is the **zero (null) matrix** O.",
    },
    {
      term: "Equal matrices",
      text: "Two matrices are equal if (i) they are of the same order and (ii) each element of one is equal to the corresponding element of the other: \\(a_{ij} = b_{ij}\\) for all i and j.",
    },
    {
      term: "When a product is defined",
      text: "The product AB is defined if the number of columns of A is equal to the number of rows of B. If A is \\(m \\times n\\) and B is \\(n \\times p\\), AB is \\(m \\times p\\).",
    },
    {
      term: "Product rules",
      text: "Multiplication is associative and distributive, but **not commutative**: AB and BA may differ, or one may not be defined. If the product of two matrices is a zero matrix, it is not necessary that one of the matrices is a zero matrix.",
    },
    {
      term: "Transpose",
      text: "If A is an \\(m \\times n\\) matrix, the matrix obtained by interchanging the rows and columns of A is called the transpose of A, written \\(A'\\) or \\(A^T\\). It is \\(n \\times m\\).",
    },
    {
      term: "Properties of transpose",
      text: "For matrices of suitable orders: \\((A')' = A\\), \\((kA)' = kA'\\), \\((A + B)' = A' + B'\\) and \\((AB)' = B'A'\\) (the order reverses).",
    },
    {
      term: "Symmetric matrix",
      text: "A square matrix \\(A = [a_{ij}]\\) is said to be symmetric if \\(A' = A\\), that is, \\(a_{ij} = a_{ji}\\) for all possible values of i and j.",
    },
    {
      term: "Skew symmetric matrix",
      text: "A square matrix is skew symmetric if \\(A' = -A\\), that is \\(a_{ji} = -a_{ij}\\). Putting \\(i = j\\) gives \\(a_{ii} = 0\\): all the diagonal elements of a skew symmetric matrix are zero.",
    },
    {
      term: "Theorem 1",
      text: "For any square matrix A with real number entries, \\(A + A'\\) is a symmetric matrix and \\(A - A'\\) is a skew symmetric matrix.",
    },
    {
      term: "Theorem 2",
      text: "Any square matrix can be expressed as the sum of a symmetric and a skew symmetric matrix: \\(A = \\frac{1}{2}(A + A') + \\frac{1}{2}(A - A')\\).",
    },
    {
      term: "Invertible matrix",
      text: "If A is square of order m and there is a square matrix B of the same order with \\(AB = BA = I\\), then B is called the inverse matrix of A, written \\(A^{-1}\\), and A is invertible. The inverse, if it exists, is unique.",
    },
  ],
  formulas: [
    { label: "Order of a product", latex: "A_{m \\times n} \\, B_{n \\times p} = (AB)_{m \\times p}" },
    { label: "Element of a product", latex: "(AB)_{ik} = \\sum_{j = 1}^{n} a_{ij} b_{jk}" },
    { label: "Transpose", latex: "(A')' = A \\quad (kA)' = kA' \\quad (A + B)' = A' + B' \\quad (AB)' = B'A'" },
    { label: "Symmetric and skew symmetric", latex: "A' = A \\qquad A' = -A \\;\\Rightarrow\\; a_{ii} = 0" },
    { label: "Symmetric plus skew symmetric", latex: "A = \\underbrace{\\tfrac{1}{2}(A + A')}_{P = P'} + \\underbrace{\\tfrac{1}{2}(A - A')}_{Q' = -Q}" },
    {
      label: "Squares do not expand as numbers do",
      latex: "(A + B)^2 = A^2 + AB + BA + B^2 \\qquad (A + B)(A - B) = A^2 - AB + BA - B^2",
    },
    { label: "Idempotent matrix", latex: "A^2 = A \\Rightarrow A^n = A, \\quad (I - A)^2 = I - A, \\quad (I + A)^2 = I + 3A" },
    { label: "Inverse", latex: "AA^{-1} = A^{-1}A = I \\qquad (AB)^{-1} = B^{-1}A^{-1}" },
    {
      label: "Rotation matrix",
      latex:
        "F(x) = \\begin{bmatrix} \\cos x & -\\sin x & 0 \\\\ \\sin x & \\cos x & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}, \\quad F(x)F(y) = F(x + y)",
    },
    {
      label: "Counting",
      latex:
        "m \\times n \\text{ matrices, each entry from } k \\text{ values: } k^{mn} \\qquad \\text{orders of a matrix with } N \\text{ elements} = \\text{number of divisors of } N",
    },
  ],
  derivations: [
    {
      title: "Prove that \\(A + A'\\) is symmetric and \\(A - A'\\) is skew symmetric",
      steps: [
        "Let \\(B = A + A'\\). Then \\(B' = (A + A')' = A' + (A')' = A' + A = B\\), so B is symmetric.",
        "Let \\(C = A - A'\\). Then \\(C' = A' - (A')' = A' - A = -(A - A') = -C\\), so C is skew symmetric.",
      ],
    },
    {
      title: "Express a square matrix as the sum of a symmetric and a skew symmetric matrix",
      steps: [
        "Write \\(A'\\). Find \\(P = \\frac{1}{2}(A + A')\\) and \\(Q = \\frac{1}{2}(A - A')\\).",
        "Show \\(P' = P\\) (symmetric) and \\(Q' = -Q\\) (skew symmetric, diagonal all 0).",
        "Check \\(P + Q = A\\). For \\(A = \\begin{bmatrix} 2 & 0 \\\\ 5 & 4 \\end{bmatrix}\\): \\(Q = \\begin{bmatrix} 0 & -\\frac{5}{2} \\\\ \\frac{5}{2} & 0 \\end{bmatrix}\\).",
      ],
    },
    {
      title: "Compute \\(A^2 - 5A + 4I\\), or find k so that A satisfies a given equation",
      steps: [
        "Find \\(A^2 = A \\cdot A\\) row by column; write every entry.",
        "Multiply A and I by their scalars, then add or subtract entry by entry. The constant term is always a multiple of I.",
        "To find k, equate corresponding entries of both sides. For \\(A = \\begin{bmatrix} 2 & 3 \\\\ -1 & 2 \\end{bmatrix}\\): \\(A^2 = \\begin{bmatrix} 1 & 12 \\\\ -4 & 1 \\end{bmatrix}\\) and \\(A^2 - 4A + 7I = O\\).",
      ],
    },
    {
      title: "Show that \\(F(x)F(y) = F(x + y)\\) for the rotation matrix",
      steps: [
        "Multiply the two \\(3 \\times 3\\) matrices row by column.",
        "Entry (1, 1) is \\(\\cos x\\cos y - \\sin x\\sin y = \\cos(x + y)\\); entry (2, 1) is \\(\\sin x\\cos y + \\cos x\\sin y = \\sin(x + y)\\).",
        "The third row and column stay \\(0, 0, 1\\). The product is \\(F(x + y)\\).",
      ],
    },
    {
      title: "Prove that the inverse of a square matrix, if it exists, is unique",
      steps: [
        "Let B and C both be inverses of A: \\(AB = BA = I\\) and \\(AC = CA = I\\).",
        "\\(B = BI = B(AC) = (BA)C = IC = C\\). Hence the inverse is unique.",
      ],
    },
    {
      title: "Prove that \\((AB)^{-1} = B^{-1}A^{-1}\\)",
      steps: [
        "\\((AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AIA^{-1} = AA^{-1} = I\\).",
        "Similarly \\((B^{-1}A^{-1})(AB) = B^{-1}(A^{-1}A)B = I\\).",
        "By the definition of inverse, \\((AB)^{-1} = B^{-1}A^{-1}\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    {
      topic: "Symmetric and skew symmetric matrices: identify, find missing entries, decide the type of AB - BA and similar",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Multiply matrices; use \\(AB \\neq BA\\), \\((A + B)^2\\) and \\(A^2 = A\\) correctly",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Types of matrices (row, column, diagonal, scalar, identity) and counting matrices or orders",
      marks: 1,
      years: [2026, 2025, 2024],
    },
    {
      topic: "Compute \\(A^2 - 5A + 4I\\), find k in \\(A^2 = kA\\), or show that A satisfies an equation",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Order of a product: when AB is defined, and finding an unknown matrix from a product",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Equal matrices: solve for unknown entries from a matrix equation",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Construct a matrix from \\(a_{ij}\\); transpose and its properties",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Matrices with trigonometric entries: \\(A + A' = kI\\), or \\(F(x)F(y) = F(x + y)\\)",
      marks: 1,
      years: [2026, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Expanding \\((A + B)^2\\) as \\(A^2 + 2AB + B^2\\)",
      body: "That needs \\(AB = BA\\). In general \\((A + B)^2 = A^2 + AB + BA + B^2\\). If \\((A + B)^2 = A^2 + B^2\\), then \\(AB + BA = O\\), that is \\(AB = -BA\\).",
    },
    {
      title: "Writing \\((AB)' = A'B'\\)",
      body: "The order reverses: \\((AB)' = B'A'\\), and \\((AB)^{-1} = B^{-1}A^{-1}\\). For a symmetric A, \\((B'AB)' = B'A'B = B'AB\\): symmetric.",
    },
    {
      title: "Writing 4 instead of 4I",
      body: "In \\(A^2 - 5A + 4I\\) the constant is a matrix. Adding the number 4 to every entry of a matrix is wrong: add 4 to the diagonal entries only.",
    },
    {
      title: "Assuming BA is defined because AB is",
      body: "A \\(2 \\times 3\\) times a \\(3 \\times 2\\) gives \\(2 \\times 2\\), but the other way gives \\(3 \\times 3\\). Check columns of the first against rows of the second, every time.",
    },
    {
      title: "Calling a diagonal matrix scalar",
      body: "\\(\\operatorname{diag}[3, 5, 2]\\) is diagonal but **not** scalar: a scalar matrix needs all diagonal elements equal. A matrix that is both symmetric and skew symmetric is the zero matrix.",
    },
    {
      title: "Dropping a root when equating entries",
      body: "Equate every pair of corresponding entries and keep all solutions that satisfy them all: \\(y^2 - 1 = 35\\) gives \\(y = \\pm 6\\).",
    },
  ],
};

export default sheet;
