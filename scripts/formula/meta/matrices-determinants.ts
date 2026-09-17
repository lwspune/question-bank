/**
 * Authored teaching metadata for the Matrices & Determinants formula axis.
 *
 * The QUESTION SETS are not here — they live in
 * `scripts/formula/tags/matrices-determinants.json`, one entry per question,
 * produced by reading all 768 solutions. This file supplies only what a human
 * must write: what each identity is called, how it is written, and what it says.
 *
 * A slug appearing in the tags but NOT here is simply not published. That is
 * how the long tail is withheld, and how `direct-computation` — 15 questions
 * whose solutions invoke no identity at all — is kept out by definition.
 */
export type TopicMeta = {
  name: string;
  kind: "formula" | "property" | "technique";
  latex: string;
  /** Plain language, NO LaTeX: this feeds <meta description>. */
  statement: string;
  symbols: { symbol: string; meaning: string }[];
};

const A = { symbol: "A", meaning: "a square matrix" };
const N = { symbol: "n", meaning: "the order of the matrix" };
const DET = { symbol: "|A|", meaning: "the determinant of A" };
const ADJ = { symbol: "\\operatorname{adj}A", meaning: "the adjugate — transpose of the cofactor matrix" };

export const META: Record<string, TopicMeta> = {
  "cofactor-expansion": {
    name: "Cofactor expansion",
    kind: "technique",
    latex: "\\det A = \\sum_{j} a_{ij}C_{ij} \\quad (\\text{any fixed row } i)",
    statement:
      "A determinant equals the sum of the products of the entries of any one row or column with their own cofactors.",
    symbols: [
      { symbol: "a_{ij}", meaning: "the entry in row i, column j" },
      { symbol: "C_{ij}", meaning: "its cofactor, the signed minor" },
    ],
  },
  "row-column-operations": {
    name: "Row and column operations",
    kind: "technique",
    latex: "R_i \\to R_i + \\lambda R_j \\;\\Rightarrow\\; \\det A \\text{ unchanged}",
    statement:
      "Adding a multiple of one row or column to another leaves the determinant unchanged, which is what makes a determinant collapsible before expansion.",
    symbols: [{ symbol: "R_i, C_i", meaning: "the i-th row and column" }],
  },
  "det-2x2": {
    name: "Determinant of a 2×2 matrix",
    kind: "formula",
    latex: "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc",
    statement:
      "The determinant of a two by two matrix is the product of the leading diagonal minus the product of the other diagonal.",
    symbols: [{ symbol: "a,b,c,d", meaning: "the four entries, read row-wise" }],
  },
  "matrix-powers-pattern": {
    name: "Powers of a matrix",
    kind: "technique",
    latex: "A^n = \\underbrace{A\\cdot A\\cdots A}_{n}",
    statement:
      "High powers of a structured matrix are found by computing the first few and reading off the pattern, not by repeated multiplication.",
    symbols: [A, { symbol: "n", meaning: "the exponent" }],
  },
  "matrix-polynomial-equation": {
    name: "Matrix polynomial equations",
    kind: "technique",
    latex: "A^2 - (\\operatorname{tr}A)\\,A + |A|\\,I = O \\quad (2\\times2)",
    statement:
      "A matrix satisfying a polynomial equation can be rearranged to give its inverse, its powers, or an unknown coefficient. For order two this is the Cayley-Hamilton relation.",
    symbols: [A, { symbol: "\\operatorname{tr}A", meaning: "the trace, sum of diagonal entries" }, { symbol: "I", meaning: "the identity matrix" }],
  },
  "trig-determinant": {
    name: "Determinants with trigonometric entries",
    kind: "technique",
    latex: "\\sin^2\\theta + \\cos^2\\theta = 1",
    statement:
      "Determinants whose entries are trigonometric functions almost always collapse through a Pythagorean or compound-angle identity rather than through brute expansion.",
    symbols: [{ symbol: "\\theta", meaning: "the angle appearing in the entries" }],
  },
  "identical-rows-zero": {
    name: "Proportional rows make a determinant vanish",
    kind: "property",
    latex: "R_i = \\lambda R_j \\;\\Rightarrow\\; \\det A = 0",
    statement:
      "If two rows or columns are equal, or one is a multiple of another, or the rows are otherwise linearly dependent, the determinant is zero.",
    symbols: [{ symbol: "\\lambda", meaning: "any scalar" }],
  },
  "det-adj": {
    name: "Determinant of the adjoint",
    kind: "formula",
    latex: "|\\operatorname{adj}A| = |A|^{\\,n-1}",
    statement:
      "The determinant of the adjugate is the determinant of the matrix raised to the power one less than the order.",
    symbols: [A, N, DET, ADJ],
  },
  "inverse-via-adjoint": {
    name: "Inverse via the adjoint",
    kind: "formula",
    latex: "A^{-1} = \\frac{1}{|A|}\\operatorname{adj}A \\qquad (|A| \\neq 0)",
    statement:
      "The inverse of a non-singular matrix is its adjugate divided by its determinant.",
    symbols: [A, DET, ADJ],
  },
  "skew-symmetric-definition": {
    name: "Skew-symmetric matrices",
    kind: "property",
    latex: "A^T = -A \\;\\Rightarrow\\; a_{ii} = 0",
    statement:
      "A matrix is skew-symmetric when its transpose is its negative, which forces every diagonal entry to be zero.",
    symbols: [{ symbol: "A^T", meaning: "the transpose of A" }],
  },
  "symmetric-definition": {
    name: "Symmetric matrices",
    kind: "property",
    latex: "A^T = A",
    statement:
      "A matrix is symmetric when it equals its own transpose, that is when each entry matches its mirror image across the leading diagonal.",
    symbols: [{ symbol: "A^T", meaning: "the transpose of A" }],
  },
  "det-scalar": {
    name: "Determinant of a scalar multiple",
    kind: "formula",
    latex: "|kA| = k^{\\,n}\\,|A|",
    statement:
      "Multiplying every entry of a matrix of order n by a scalar multiplies the determinant by that scalar raised to the power n, because each of the n rows contributes one factor.",
    symbols: [{ symbol: "k", meaning: "the scalar" }, N, DET],
  },
  "adjoint-identity": {
    name: "The adjoint identity",
    kind: "formula",
    latex: "A(\\operatorname{adj}A) = (\\operatorname{adj}A)A = |A|\\,I_n",
    statement:
      "A matrix times its adjugate, in either order, is the determinant times the identity matrix.",
    symbols: [A, DET, ADJ, { symbol: "I_n", meaning: "the identity matrix of order n" }],
  },
  "order-of-product": {
    name: "Order of a matrix product",
    kind: "formula",
    latex: "A_{m\\times n}\\,B_{n\\times p} = (AB)_{m\\times p}",
    statement:
      "A product is defined only when the number of columns of the first matrix equals the number of rows of the second, and the result takes the outer dimensions.",
    symbols: [{ symbol: "m, n, p", meaning: "the dimensions involved" }],
  },
  "transpose-of-product": {
    name: "Reversal law for transposes",
    kind: "formula",
    latex: "(AB)^T = B^T A^T",
    statement:
      "The transpose of a product is the product of the transposes in the reverse order.",
    symbols: [{ symbol: "A^T", meaning: "the transpose of A" }],
  },
  "inverse-definition": {
    name: "Definition of the inverse",
    kind: "property",
    latex: "AB = BA = I \\iff B = A^{-1}",
    statement:
      "Two matrices are inverses precisely when their product in both orders is the identity, and the inverse when it exists is unique.",
    symbols: [{ symbol: "I", meaning: "the identity matrix" }],
  },
  "adjoint-definition": {
    name: "Definition of the adjoint",
    kind: "property",
    latex: "(\\operatorname{adj}A)_{ij} = C_{ji}",
    statement:
      "The adjugate is the transpose of the matrix of cofactors. For order two this simply swaps the diagonal entries and negates the other two.",
    symbols: [{ symbol: "C_{ji}", meaning: "the cofactor of the entry in row j, column i" }],
  },
  "consistency-from-determinant": {
    name: "Consistency of a linear system",
    kind: "property",
    latex: "\\Delta \\neq 0 \\Rightarrow \\text{unique solution}",
    statement:
      "A square system has a unique solution when the coefficient determinant is non-zero; when it is zero the system has either no solution or infinitely many, decided by the augmented system.",
    symbols: [{ symbol: "\\Delta", meaning: "the coefficient determinant" }],
  },
  "singular-iff-det-zero": {
    name: "Singular matrices",
    kind: "property",
    latex: "A \\text{ singular} \\iff |A| = 0 \\iff A^{-1} \\text{ does not exist}",
    statement:
      "A square matrix fails to have an inverse exactly when its determinant is zero.",
    symbols: [DET],
  },
  "homogeneous-nontrivial": {
    name: "Non-trivial solutions of a homogeneous system",
    kind: "property",
    latex: "AX = O \\text{ has } X \\neq O \\iff \\Delta = 0",
    statement:
      "A homogeneous system has a solution other than all zeros exactly when its coefficient determinant vanishes.",
    symbols: [{ symbol: "\\Delta", meaning: "the coefficient determinant" }, { symbol: "O", meaning: "the zero column" }],
  },
  "transpose-rules": {
    name: "Rules of transposition",
    kind: "formula",
    latex: "(A^T)^T = A, \\qquad (A+B)^T = A^T + B^T, \\qquad (kA)^T = kA^T",
    statement:
      "Transposition undoes itself and distributes over addition and scalar multiplication. Only over a product does it reverse the order.",
    symbols: [{ symbol: "k", meaning: "a scalar" }],
  },
  "det-inverse": {
    name: "Determinant of the inverse",
    kind: "formula",
    latex: "|A^{-1}| = \\frac{1}{|A|}",
    statement:
      "The determinant of the inverse is the reciprocal of the determinant, which follows from taking determinants of A times its inverse.",
    symbols: [DET],
  },
  "cube-roots-unity": {
    name: "Cube roots of unity in determinants",
    kind: "formula",
    latex: "\\omega^3 = 1, \\qquad 1 + \\omega + \\omega^2 = 0",
    statement:
      "Determinants built from cube roots of unity collapse through these two relations, usually by adding all columns so one becomes zero.",
    symbols: [{ symbol: "\\omega", meaning: "a non-real cube root of unity" }],
  },
  "det-product": {
    name: "Determinant of a product",
    kind: "formula",
    latex: "|AB| = |A|\\,|B|",
    statement:
      "The determinant of a product is the product of the determinants, which also shows that determinants commute even when the matrices do not.",
    symbols: [DET],
  },
  "det-power": {
    name: "Determinant of a power",
    kind: "formula",
    latex: "|A^m| = |A|^{\\,m}",
    statement:
      "The determinant of a matrix power is the determinant raised to that power.",
    symbols: [{ symbol: "m", meaning: "the exponent" }, DET],
  },
  "determinant-equation-roots": {
    name: "Determinant equations and their roots",
    kind: "technique",
    latex: "\\det A(x) = 0",
    statement:
      "Setting a determinant containing a variable to zero produces a polynomial equation, and its roots are usually read off by inspection or through the sum and product of roots.",
    symbols: [{ symbol: "x", meaning: "the variable in the entries" }],
  },
  "orthogonal-inverse-transpose": {
    name: "Orthogonal matrices",
    kind: "property",
    latex: "AA^T = I \\iff A^{-1} = A^T",
    statement:
      "A matrix is orthogonal when its transpose is its inverse. Every rotation matrix is orthogonal, and every orthogonal matrix has determinant plus or minus one.",
    symbols: [{ symbol: "A^T", meaning: "the transpose of A" }],
  },
  "idempotent-matrix": {
    name: "Idempotent matrices",
    kind: "property",
    latex: "A^2 = A \\;\\Rightarrow\\; A^k = A \\ (k \\ge 1)",
    statement:
      "A matrix equal to its own square stays unchanged under every higher power, which collapses long expressions immediately.",
    symbols: [{ symbol: "k", meaning: "any positive integer" }],
  },
  "involutory-definition": {
    name: "Involutory matrices",
    kind: "property",
    latex: "A^2 = I \\iff A^{-1} = A",
    statement:
      "A matrix whose square is the identity is its own inverse, and its even powers are the identity.",
    symbols: [{ symbol: "I", meaning: "the identity matrix" }],
  },
  "matrix-equality": {
    name: "Equality of matrices",
    kind: "property",
    latex: "A = B \\iff a_{ij} = b_{ij} \\ \\forall\\, i,j",
    statement:
      "Two matrices are equal only when they have the same order and every corresponding pair of entries agrees, which turns one matrix equation into several scalar ones.",
    symbols: [{ symbol: "a_{ij}, b_{ij}", meaning: "corresponding entries" }],
  },
  "det-transpose": {
    name: "Determinant of the transpose",
    kind: "formula",
    latex: "|A^T| = |A|",
    statement:
      "Transposing a matrix leaves its determinant unchanged, which is why every row property of determinants has a matching column property.",
    symbols: [{ symbol: "A^T", meaning: "the transpose of A" }],
  },
  "matrix-equation-system": {
    name: "Solving AX = B",
    kind: "technique",
    latex: "AX = B \\;\\Rightarrow\\; X = A^{-1}B \\quad (|A| \\neq 0)",
    statement:
      "A linear system written in matrix form is solved by multiplying on the left by the inverse of the coefficient matrix.",
    symbols: [{ symbol: "X", meaning: "the column of unknowns" }, { symbol: "B", meaning: "the column of constants" }],
  },
  "matrix-commutativity": {
    name: "Matrix multiplication is not commutative",
    kind: "property",
    latex: "(A+B)(A-B) = A^2 - AB + BA - B^2",
    statement:
      "Because AB and BA generally differ, the familiar algebraic identities hold only when the two matrices commute, and the cross terms must be kept separate until then.",
    symbols: [{ symbol: "AB, BA", meaning: "the two orders of the product" }],
  },
  "diagonal-definition": {
    name: "Diagonal matrices",
    kind: "property",
    latex: "a_{ij} = 0 \\ (i \\neq j)",
    statement:
      "A diagonal matrix has zeros everywhere off the leading diagonal; the diagonal entries themselves are unrestricted.",
    symbols: [{ symbol: "a_{ij}", meaning: "the entry in row i, column j" }],
  },
  "adj-adj-a": {
    name: "Adjoint of an adjoint",
    kind: "formula",
    latex: "\\operatorname{adj}(\\operatorname{adj}A) = |A|^{\\,n-2}\\,A",
    statement:
      "Taking the adjoint twice returns the matrix itself, scaled by the determinant raised to the power two less than the order.",
    symbols: [A, N, DET, ADJ],
  },
  "triangular-determinant": {
    name: "Determinant of a triangular matrix",
    kind: "formula",
    latex: "\\det A = \\prod_i a_{ii}",
    statement:
      "For an upper or lower triangular matrix, and so for a diagonal one, the determinant is simply the product of the diagonal entries.",
    symbols: [{ symbol: "a_{ii}", meaning: "the diagonal entries" }],
  },
  "scalar-matrix-definition": {
    name: "Scalar matrices",
    kind: "property",
    latex: "A = kI",
    statement:
      "A scalar matrix is a diagonal matrix whose diagonal entries are all equal, so it behaves like the scalar k in every product.",
    symbols: [{ symbol: "k", meaning: "the common diagonal entry" }, { symbol: "I", meaning: "the identity matrix" }],
  },
  "matrix-addition-scalar": {
    name: "Addition and scalar multiplication",
    kind: "property",
    latex: "(A + B)_{ij} = a_{ij} + b_{ij}, \\qquad (kA)_{ij} = k\\,a_{ij}",
    statement:
      "Matrices of the same order are added entry by entry, and a scalar multiplies every entry, so both operations act position by position.",
    symbols: [{ symbol: "k", meaning: "the scalar" }],
  },
  "counting-matrices": {
    name: "Counting matrices",
    kind: "technique",
    latex: "\\text{orders of } N \\text{ entries} = d(N), \\qquad \\text{fillings} = c^{\\,mn}",
    statement:
      "The possible orders of a matrix with a fixed number of entries correspond to the divisors of that number, and each position is then filled independently.",
    symbols: [
      { symbol: "d(N)", meaning: "the number of divisors of N" },
      { symbol: "c", meaning: "choices available per entry" },
    ],
  },
  "row-scaling-common-factor": {
    name: "Taking a common factor out of a row",
    kind: "property",
    latex: "\\det(\\ldots, kR_i, \\ldots) = k\\,\\det(\\ldots, R_i, \\ldots)",
    statement:
      "A factor common to every entry of one row or column comes outside the determinant once, which is the single-row version of the scalar rule.",
    symbols: [{ symbol: "k", meaning: "the common factor" }],
  },
};
