/**
 * NDA Maths · Matrices & Determinants · the "PROPERTY" theme (rule/identity recall).
 *
 * Matrix/determinant RULES taught in /notes `definition` prose, now exposed via
 * `formula.latex` (fresh on empty concepts; append-only on bundle concepts so the
 * shipped formula quizzes are untouched) and themed `property`. 25 rule-identities
 * → two Common-Properties quizzes. Run:
 *   npm run quiz:verify nda-maths__matrices-determinants-properties
 *
 * NOTE: the `transpose-rules` + `symmetric-and-skew-symmetric` appends were REVERTED
 * — they were single-formula concepts whose existing `auto` atom would flip to
 * needs_review and dirty an already-shipped formula quiz (deferred, needs a re-author
 * + re-assemble). `orthogonal-matrices` is a bundle, so its new piece is `:2` (not :1).
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── powers-of-a-matrix ──
  { atomKey: "powers-of-a-matrix:formula:0", stem: "For a square matrix A, which definition of A² is correct?", distractors: [f("A^2 = 2A"), f("A^2 = A + A"), f("A^2 = A^T A")], theme: "property" },
  { atomKey: "powers-of-a-matrix:formula:1", stem: "Which recursive rule for the nth power of a square matrix is correct?", distractors: [f("A^n = nA"), f("A^n = A^{n+1}A"), f("A^n = (A^{n-1})^T A")], theme: "property" },

  // ── matrix-algebra-caveats (non-commutativity) ──
  { atomKey: "matrix-algebra-caveats:formula:0", stem: "For matrices A, B (which need not commute), which expansion of (A+B)² is correct?", distractors: [f("(A+B)^2 = A^2 + 2AB + B^2"), f("(A+B)^2 = A^2 + B^2"), f("(A+B)^2 = A^2 + 2BA + B^2")], theme: "property" },
  { atomKey: "matrix-algebra-caveats:formula:1", stem: "For matrices A, B (which need not commute), which expansion of (A+B)(A−B) is correct?", distractors: [f("(A+B)(A-B) = A^2 - B^2"), f("(A+B)(A-B) = A^2 + AB - BA - B^2"), f("(A+B)(A-B) = A^2 - 2AB - B^2")], theme: "property" },

  // ── diagonal-scalar-identity (append) ──
  { atomKey: "diagonal-scalar-identity:formula:2", stem: "For a diagonal matrix D, which power rule is correct?", distractors: [f("D^k = \\operatorname{diag}(kd_1, \\dots, kd_n)"), f("D^k = k\\operatorname{diag}(d_1, \\dots, d_n)"), f("D^k = \\operatorname{diag}(d_1, \\dots, d_n)^T")], theme: "property" },
  { atomKey: "diagonal-scalar-identity:formula:3", stem: "Which determinant of a scalar matrix kIₙ is correct?", distractors: [f("\\det(kI_n) = nk"), f("\\det(kI_n) = k"), f("\\det(kI_n) = k^{n-1}")], theme: "property" },

  // ── orthogonal-matrices (append → :2) ──
  { atomKey: "orthogonal-matrices:formula:2", stem: "Which two-sided condition DEFINES an orthogonal matrix?", distractors: [f("AA^T = A^T A = O"), f("A A^T = -A^T A = I"), f("A^2 = A^T A = I")], theme: "property" },

  // ── idempotent-involutory ──
  { atomKey: "idempotent-involutory:formula:0", stem: "Which property of an idempotent matrix (A² = A) is correct?", distractors: [f("A^2 = A \\Rightarrow A^n = nA"), f("A^2 = A \\Rightarrow A^n = I"), f("A^2 = A \\Rightarrow A^n = O")], theme: "property" },
  { atomKey: "idempotent-involutory:formula:1", stem: "Which property of an involutory matrix (A² = I) is correct?", distractors: [f("A^2 = I \\Rightarrow A^{-1} = I"), f("A^2 = I \\Rightarrow A^{-1} = A^T"), f("A^2 = I \\Rightarrow A^{-1} = -A")], theme: "property" },
  { atomKey: "idempotent-involutory:formula:2", stem: "For the n×n all-ones matrix Jₙ, which identity is correct?", distractors: [f("J_n^2 = J_n"), f("J_n^2 = n^2 J_n"), f("J_n^2 = nI_n")], theme: "property" },
  { atomKey: "idempotent-involutory:formula:3", stem: "Which equation DEFINES a nilpotent matrix?", distractors: [f("A^k = I \\text{ (nilpotent)}"), f("A^k = A \\text{ (nilpotent)}"), f("A^k = kO \\text{ (nilpotent)}")], theme: "property" },

  // ── det-products-scalar-powers (append) ──
  { atomKey: "det-products-scalar-powers:formula:2", stem: "Which determinant-of-transpose identity is correct?", distractors: [f("\\det(A^T) = -\\det A"), f("\\det(A^T) = \\frac{1}{\\det A}"), f("\\det(A^T) = (\\det A)^2")], theme: "property" },
  { atomKey: "det-products-scalar-powers:formula:3", stem: "Which determinant-of-a-power identity is correct?", distractors: [f("\\det(A^m) = m\\det A"), f("\\det(A^m) = \\det A"), f("\\det(A^m) = (\\det A)^{m-1}")], theme: "property" },
  { atomKey: "det-products-scalar-powers:formula:4", stem: "Which determinant-of-inverse identity is correct?", distractors: [f("\\det(A^{-1}) = -\\det A"), f("\\det(A^{-1}) = \\det A"), f("\\det(A^{-1}) = \\frac{1}{(\\det A)^2}")], theme: "property" },
  { atomKey: "det-products-scalar-powers:formula:5", stem: "Which determinant identity for a conjugation B⁻¹AB is correct?", distractors: [f("\\det(B^{-1}AB) = \\frac{\\det A}{\\det B}"), f("\\det(B^{-1}AB) = \\det A\\,\\det B"), f("\\det(B^{-1}AB) = \\frac{1}{\\det A}")], theme: "property" },

  // ── core-determinant-properties ──
  { atomKey: "core-determinant-properties:formula:0", stem: "What happens to a determinant when two rows are swapped?", distractors: [f("R_i \\leftrightarrow R_j \\Rightarrow \\det \\to \\det"), f("R_i \\leftrightarrow R_j \\Rightarrow \\det \\to 0"), f("R_i \\leftrightarrow R_j \\Rightarrow \\det \\to 2\\det")], theme: "property" },
  { atomKey: "core-determinant-properties:formula:1", stem: "A determinant has two proportional rows. Which statement is correct?", distractors: [f("\\text{two identical/proportional rows} \\Rightarrow \\det = 1"), f("\\text{two identical/proportional rows} \\Rightarrow \\det = -\\det"), f("\\text{two identical/proportional rows} \\Rightarrow \\det = \\text{product of those rows}")], theme: "property" },
  { atomKey: "core-determinant-properties:formula:2", stem: "If one row of a determinant is scaled by k, how does the determinant change?", distractors: [f("\\det(kR_i\\text{-scaled}) = k^n\\det A"), f("\\det(kR_i\\text{-scaled}) = \\det A"), f("\\det(kR_i\\text{-scaled}) = k^2\\det A")], theme: "property" },

  // ── singular-and-determinant-equations ──
  { atomKey: "singular-and-determinant-equations:formula:0", stem: "Which condition characterises a singular matrix?", distractors: [f("A \\text{ singular} \\iff |A| = 1"), f("A \\text{ singular} \\iff |A| \\neq 0"), f("A \\text{ singular} \\iff |A| = \\pm 1")], theme: "property" },
  { atomKey: "singular-and-determinant-equations:formula:1", stem: "If |A| = 0, which statement about the inverse is correct?", distractors: [f("|A| = 0 \\Rightarrow A^{-1} = O"), f("|A| = 0 \\Rightarrow A^{-1} = A^T"), f("|A| = 0 \\Rightarrow A^{-1} = I")], theme: "property" },

  // ── sum-of-determinants ──
  { atomKey: "sum-of-determinants:formula:0", stem: "Which statement about the determinant of a sum is correct?", distractors: [f("\\det(A+B) = \\det A + \\det B"), f("\\det(A+B) = \\det A \\cdot \\det B"), f("\\det(A+B) = \\det A - \\det B")], theme: "property" },

  // ── inverse-of-special-matrices ──
  { atomKey: "inverse-of-special-matrices:formula:0", stem: "Which double-inverse identity is correct?", distractors: [f("(A^{-1})^{-1} = A^{-1}"), f("(A^{-1})^{-1} = A^T"), f("(A^{-1})^{-1} = I")], theme: "property" },
  { atomKey: "inverse-of-special-matrices:formula:1", stem: "Which identity relating transpose and inverse is correct?", distractors: [f("(A^T)^{-1} = A^{-1}"), f("(A^T)^{-1} = (A^{-1})^{-1}"), f("(A^T)^{-1} = A^T")], theme: "property" },
  { atomKey: "inverse-of-special-matrices:formula:2", stem: "Which inverse-of-a-scalar-multiple identity is correct?", distractors: [f("(kA)^{-1} = kA^{-1}"), f("(kA)^{-1} = \\frac{1}{k}A"), f("(kA)^{-1} = \\frac{1}{k^n}A^{-1}")], theme: "property" },
  { atomKey: "inverse-of-special-matrices:formula:3", stem: "Which inverse-of-a-power identity is correct?", distractors: [f("(A^n)^{-1} = (A^{-1})^{-n}"), f("(A^n)^{-1} = n A^{-1}"), f("(A^n)^{-1} = (A^n)^T")], theme: "property" },

  // ── moved from the FORMULA theme 2026-06-10 (Path B clean split): determinant + matrix-algebra RULES ──
  { atomKey: "det-products-scalar-powers:formula:0", stem: "Which is the determinant of a product, \\(\\det(AB)\\)?", distractors: [f("\\det A + \\det B"), f("\\det(A + B)"), f("2\\,\\det A\\,\\det B")], theme: "property" },
  { atomKey: "det-products-scalar-powers:formula:1", stem: "For an \\(n \\times n\\) matrix and scalar \\(k\\), which gives \\(\\det(kA)\\)?", distractors: [f("k\\,\\det A"), f("k^2\\,\\det A"), f("nk\\,\\det A")], theme: "property" },
  { atomKey: "adjoint-properties:formula:0", stem: "For an \\(n \\times n\\) matrix \\(A\\), which gives \\(|\\operatorname{adj}A|\\)?", distractors: [f("|A|^{\\,n}"), f("|A|^{\\,n-2}"), f("|A|^{\\,1-n}")], theme: "property" },
  { atomKey: "adjoint-properties:formula:1", stem: "For an \\(n \\times n\\) matrix \\(A\\), which gives \\(\\operatorname{adj}(\\operatorname{adj}A)\\)?", distractors: [f("|A|^{\\,n-1}A"), f("|A|^{\\,n}A"), f("|A|^{\\,n-2}A^{-1}")], theme: "property" },
  { atomKey: "transpose-rules:formula:0", stem: "Which transpose-of-a-product identity is correct?", distractors: [f("(AB)^T = A^T B^T"), f("(AB)^T = (BA)^T"), f("(AB)^T = A^T + B^T")], theme: "property" },
  { atomKey: "inverse-properties:formula:0", stem: "Which inverse-of-a-product identity is correct?", distractors: [f("(AB)^{-1} = A^{-1}B^{-1}"), f("(AB)^{-1} = (BA)^{-1}"), f("(AB)^{-1} = A^{-1} + B^{-1}")], theme: "property" },
  { atomKey: "diagonal-scalar-identity:formula:0", stem: "Which is the determinant of a diagonal matrix \\(D\\) with entries \\(d_1, \\dots, d_n\\)?", distractors: [f("\\sum_i d_i"), f("\\prod_i \\tfrac{1}{d_i}"), f("n\\prod_i d_i")], theme: "property" },
  { atomKey: "diagonal-scalar-identity:formula:1", stem: "Which is the inverse of a diagonal matrix \\(D = \\operatorname{diag}(d_1, \\dots, d_n)\\)?", distractors: [f("\\operatorname{diag}(d_1, \\dots, d_n)"), f("\\operatorname{diag}(-d_1, \\dots, -d_n)"), f("\\tfrac{1}{\\prod_i d_i}\\,I")], theme: "property" },
  { atomKey: "orthogonal-matrices:formula:0", stem: "Which is the defining property of an orthogonal matrix \\(A\\)?", distractors: [f("AA^T = I \\Rightarrow A^{-1} = A"), f("AA^T = I \\Rightarrow A^{-1} = -A^T"), f("AA^T = O \\Rightarrow A^{-1} = A^T")], theme: "property" },
  { atomKey: "orthogonal-matrices:formula:1", stem: "For an orthogonal matrix \\(A\\), the determinant \\(\\det A\\) is:", distractors: [f("\\det A = 1"), f("\\det A = 0"), f("\\det A = \\pm n")], theme: "property" },
  { atomKey: "rotation-matrices:formula:0", stem: "For rotation matrices, the product \\(R(\\theta)\\,R(\\phi)\\) equals:", correct: f("R(\\theta + \\phi)"), distractors: [f("R(\\theta - \\phi)"), f("R(\\theta\\phi)"), f("R(\\theta) + R(\\phi)")], theme: "property" },
  { atomKey: "rotation-matrices:formula:1", stem: "For a rotation matrix, \\(R(\\theta)^n\\) equals:", correct: f("R(n\\theta)"), distractors: [f("R(\\theta^n)"), f("R(\\theta/n)"), f("n\\,R(\\theta)")], theme: "property" },
  { atomKey: "minors-and-cofactors:formula:1", stem: "For \\(k \\neq i\\) (cofactors of a DIFFERENT row), \\(\\sum_j a_{ij}C_{kj}\\) equals:", correct: f("0"), distractors: [f("\\det A"), f("1"), f("|A|")], theme: "property" },
];
