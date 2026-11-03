import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Mathematics, Ch. 4 Determinants. Definitions and theorems are
 * NCERT's own, trimmed; every worked value re-computed by hand; most-asked
 * groups from the CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Determinants",
  chapterSlug: "determinants",
  source: "NCERT Mathematics Part I (CBSE Class 12), Chapter 4",
  keyPoints: [
    {
      term: "Determinant",
      text: "To every square matrix \\(A = [a_{ij}]\\) of order n we can associate a number (real or complex) called the determinant of A, written \\(|A|\\) or det A. Only square matrices have determinants.",
    },
    {
      term: "Expansion",
      text: "The value of a determinant is the sum of the products of the elements of any one row (or column) with their cofactors: \\(|A| = a_{11}A_{11} + a_{12}A_{12} + a_{13}A_{13}\\). Expand along the row or column with the most zeros.",
    },
    {
      term: "Area of a triangle",
      text: "Since area is a positive quantity, we always take the absolute value of the determinant. If the area is given, use both the positive and the negative value of the determinant: that gives two values of k.",
    },
    {
      term: "Collinear points",
      text: "The area of the triangle formed by three collinear points is zero. So three points are collinear exactly when the area determinant is 0.",
    },
    {
      term: "Minor",
      text: "The minor \\(M_{ij}\\) of an element \\(a_{ij}\\) of a determinant is the determinant obtained by deleting its ith row and jth column. A minor of a determinant of order n is of order \\(n - 1\\).",
    },
    {
      term: "Cofactor",
      text: "The cofactor of \\(a_{ij}\\) is \\(A_{ij} = (-1)^{i+j}M_{ij}\\). Signs follow the chessboard pattern, + at the top left.",
    },
    {
      term: "Cofactors of another row",
      text: "If elements of one row (or column) are multiplied with cofactors of elements of any other row (or column), then their sum is zero: \\(a_{11}A_{21} + a_{12}A_{22} + a_{13}A_{23} = 0\\).",
    },
    {
      term: "Adjoint",
      text: "The adjoint of a square matrix A is defined as the **transpose** of the matrix of cofactors \\([A_{ij}]\\). Theorem 1: \\(A(\\operatorname{adj} A) = (\\operatorname{adj} A)A = |A|\\,I\\).",
    },
    {
      term: "Singular and non-singular",
      text: "A square matrix A is said to be singular if \\(|A| = 0\\), and non-singular if \\(|A| \\neq 0\\).",
    },
    {
      term: "Determinant of a product",
      text: "The determinant of the product of matrices is equal to the product of their determinants: \\(|AB| = |A|\\,|B|\\). If A and B are non-singular of the same order, so are AB and BA.",
    },
    {
      term: "Invertible means non-singular",
      text: "A square matrix A is invertible if and only if A is a non-singular matrix, and then \\(A^{-1} = \\frac{1}{|A|}\\operatorname{adj} A\\).",
    },
    {
      term: "Consistent and inconsistent",
      text: "A system of equations is said to be consistent if its solution (one or more) exists, and inconsistent if its solution does not exist.",
    },
    {
      term: "Number of solutions of AX = B",
      text: "(i) \\(|A| \\neq 0\\): a unique solution \\(X = A^{-1}B\\). (ii) \\(|A| = 0\\) and \\((\\operatorname{adj} A)B \\neq O\\): no solution (inconsistent). (iii) \\(|A| = 0\\) and \\((\\operatorname{adj} A)B = O\\): the system may or may not be consistent.",
    },
  ],
  formulas: [
    { label: "Order two", latex: "\\begin{vmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}" },
    {
      label: "Order three, along the first row",
      latex:
        "\\begin{vmatrix} a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\\\ a_3 & b_3 & c_3 \\end{vmatrix} = a_1(b_2c_3 - b_3c_2) - b_1(a_2c_3 - a_3c_2) + c_1(a_2b_3 - a_3b_2)",
    },
    {
      label: "Area of a triangle",
      latex:
        "\\Delta = \\frac{1}{2}\\left|\\begin{vmatrix} x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\\\ x_3 & y_3 & 1 \\end{vmatrix}\\right| = \\frac{1}{2}\\left|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)\\right|",
    },
    { label: "Minor and cofactor", latex: "A_{ij} = (-1)^{i+j}M_{ij}" },
    { label: "Adjoint identity", latex: "A(\\operatorname{adj} A) = (\\operatorname{adj} A)A = |A|\\,I" },
    { label: "Inverse", latex: "A^{-1} = \\frac{1}{|A|}\\operatorname{adj} A \\quad (|A| \\neq 0)" },
    {
      label: "Two by two adjoint",
      latex: "A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\Rightarrow \\operatorname{adj} A = \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}",
    },
    {
      label: "Determinant rules, A of order n",
      latex: "|AB| = |A||B| \\quad |\\operatorname{adj} A| = |A|^{n-1} \\quad |A^{-1}| = \\frac{1}{|A|} \\quad |kA| = k^{n}|A| \\quad |A'| = |A|",
    },
    { label: "Skew symmetric matrix of order 3", latex: "|A'| = |-A| = (-1)^3|A| \\Rightarrow |A| = 0" },
    { label: "Inverse rules", latex: "(AB)^{-1} = B^{-1}A^{-1} \\qquad (kA)^{-1} = \\frac{1}{k}A^{-1} \\;\\; (k \\neq 0) \\qquad (A^{-1})^{-1} = A" },
    { label: "Inverse from an equation", latex: "A^2 + aA + bI = O, \\; b \\neq 0 \\Rightarrow A^{-1} = -\\frac{1}{b}(A + aI)" },
    { label: "System of equations", latex: "AX = B \\Rightarrow X = A^{-1}B \\quad (|A| \\neq 0)" },
  ],
  derivations: [
    {
      title: "Find \\(A^{-1}\\) by the adjoint method",
      steps: [
        "Find \\(|A|\\); if it is 0, A is singular and \\(A^{-1}\\) does not exist.",
        "Find all nine cofactors \\(A_{ij} = (-1)^{i+j}M_{ij}\\).",
        "Write the matrix of cofactors and transpose it: that is adj A.",
        "\\(A^{-1} = \\frac{1}{|A|}\\operatorname{adj} A\\). Check one entry of \\(AA^{-1} = I\\) if time allows.",
      ],
    },
    {
      title: "Solve a system of linear equations by the matrix method",
      steps: [
        "Write the equations in the order x, y, z (a missing variable has coefficient 0) as \\(AX = B\\).",
        "Find \\(|A|\\). If \\(|A| \\neq 0\\), the system has a unique solution.",
        "Find adj A and \\(A^{-1}\\).",
        "\\(X = A^{-1}B\\): multiply out and equate to read x, y, z. Put them back in one equation to check.",
      ],
    },
    {
      title: "Use a given product of matrices to solve a system",
      steps: [
        "Multiply the given matrices: usually \\(AB = kI\\).",
        "Then \\(A^{-1} = \\frac{1}{k}B\\) (and \\(B^{-1} = \\frac{1}{k}A\\)).",
        "Write the system as \\(AX = C\\) with the same coefficient matrix A (compare carefully: it may be \\(A'\\) or B), and \\(X = A^{-1}C\\).",
      ],
    },
    {
      title: "Show that A satisfies an equation such as \\(A^2 - 4A + I = O\\); hence find \\(A^{-1}\\)",
      steps: [
        "Find \\(A^2\\), then \\(A^2 - 4A + I\\) entry by entry and show it is O. For \\(A = \\begin{bmatrix} 2 & 3 \\\\ 1 & 2 \\end{bmatrix}\\): \\(A^2 = \\begin{bmatrix} 7 & 12 \\\\ 4 & 7 \\end{bmatrix}\\).",
        "Multiply the equation by \\(A^{-1}\\) (it exists as \\(|A| \\neq 0\\)): \\(A - 4I + A^{-1} = O\\).",
        "So \\(A^{-1} = 4I - A = \\begin{bmatrix} 2 & -3 \\\\ -1 & 2 \\end{bmatrix}\\).",
      ],
    },
    {
      title: "Find the area of a triangle, or k when the area is given, using determinants",
      steps: [
        "Write \\(\\Delta = \\frac{1}{2}\\begin{vmatrix} x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\\\ x_3 & y_3 & 1 \\end{vmatrix}\\) and expand.",
        "Take the absolute value. For P(3, 1), Q(9, 3), R(5, 7): \\(\\frac{1}{2}|{-12} + 54 - 10| = 16\\) sq units.",
        "If the area is given, set the determinant equal to \\(\\pm 2 \\times\\) area and solve both equations for k.",
      ],
    },
    {
      title: "Find the equation of a line through two points using determinants",
      steps: [
        "Take any point P(x, y) on the line through A and B; then A, B, P are collinear, so the area of triangle ABP is zero.",
        "Write \\(\\begin{vmatrix} x & y & 1 \\\\ x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\end{vmatrix} = 0\\) and expand. For A(1, 3), B(0, 0): \\(y = 3x\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    {
      topic: "Values of \\(|kA|\\), \\(|\\operatorname{adj} A|\\), \\(|A^{-1}|\\), \\(|AB|\\) and \\(A(\\operatorname{adj} A) = |A|I\\)",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Word problem: write the equations as AX = B, find \\(|A|\\) and \\(A^{-1}\\), and solve by matrices",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Evaluate a determinant, or find x from its value (including a singular matrix)",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Find \\(A^{-1}\\) and use it to solve a system of three equations (or use a given product AB)",
      marks: 5,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Cofactors, adjoint and inverse: find \\(A^{-1}\\), \\((AB)^{-1}\\), or \\(A^{-1}\\) from an equation in A",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Area of a triangle using determinants; collinear points; find k when the area is given",
      marks: 1,
      years: [2026, 2023],
    },
  ],
  mistakes: [
    {
      title: "Writing \\(|kA| = k|A|\\)",
      body: "Each of the n rows is multiplied by k, so \\(|kA| = k^n|A|\\). For order 2 with \\(|A| = -2\\): \\(|5A'| = 25 \\times (-2) = -50\\). Likewise \\(|\\operatorname{adj} A| = |A|^{n-1}\\), not \\(|A|\\).",
    },
    {
      title: "Forgetting to transpose the cofactor matrix",
      body: "adj A is the **transpose** of \\([A_{ij}]\\). Writing the cofactor matrix as it is gives a wrong \\(A^{-1}\\) and a wrong solution to the system.",
    },
    {
      title: "Writing \\(X = BA^{-1}\\)",
      body: "From \\(AX = B\\), pre-multiply by \\(A^{-1}\\): \\(X = A^{-1}B\\). B is a column matrix, so \\(BA^{-1}\\) is not even defined.",
    },
    {
      title: "Using the wrong coefficient matrix",
      body: "When A is given and you must solve a system, check that the system's coefficient matrix really is A. If it is \\(A'\\), use \\((A')^{-1} = (A^{-1})'\\).",
    },
    {
      title: "One value of k from a given area",
      body: "The determinant can be \\(+2\\Delta\\) or \\(-2\\Delta\\): solve both. A final area is never negative.",
    },
    {
      title: "Calling \\(|A| = 0\\) 'no solution' at once",
      body: "With \\(|A| = 0\\), find \\((\\operatorname{adj} A)B\\): if it is not O the system is inconsistent; if it is O the system may have infinitely many solutions or none.",
    },
  ],
};

export default sheet;
