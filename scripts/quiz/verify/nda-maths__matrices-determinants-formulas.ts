/**
 * NDA Maths · Matrices & Determinants · the FORMULA theme — CONSTRUCTION formulas
 * only ("how do I compute X?"). The rule/identity atoms (det(AB), det(kA), adjoint
 * properties, orthogonal, diagonal, transpose, inverse, rotation, …) were moved to
 * the `property` theme on 2026-06-10 (Path B clean split — see ...-properties.ts).
 * Skipped (judgment): complex-entry-determinants:* (i-powers), cramers-rule:1/2
 * (redundant y,z), inverse-via-adjoint:1 ((|A|≠0) condition).
 *   npm run quiz:verify nda-maths__matrices-determinants-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    atomKey: "cramers-rule:formula:0",
    stem: "By Cramer's rule (system determinant \\(\\Delta\\)), the solution for \\(x\\) is:",
    distractors: [f("x = \\frac{\\Delta}{\\Delta_x}"), f("x = \\frac{\\Delta_y}{\\Delta}"), f("x = \\Delta_x \\cdot \\Delta")],
    theme: "formula",
  },
  {
    atomKey: "inverse-via-adjoint:formula:0",
    stem: "Which is the formula for the inverse \\(A^{-1}\\) via the adjoint?",
    distractors: [f("A^{-1} = |A|\\,\\operatorname{adj}A"), f("A^{-1} = \\frac{1}{|A|}A^T"), f("A^{-1} = |A|\\,A^T")],
    theme: "formula",
  },
  {
    atomKey: "minors-and-cofactors:formula:0",
    stem: "Expanding along row \\(i\\), \\(\\sum_j a_{ij}C_{ij}\\) equals:",
    correct: f("\\det A"),
    distractors: [f("0"), f("|A|^2"), f("\\operatorname{adj}A")],
    theme: "formula",
  },
  {
    atomKey: "roots-of-unity-determinants:formula:0",
    stem: "For \\(\\omega\\) a non-real cube root of unity, which holds?",
    distractors: [f("\\omega^2 = 1"), f("\\omega^3 = -1"), f("\\omega^3 = \\omega")],
    theme: "formula",
  },
  {
    atomKey: "roots-of-unity-determinants:formula:1",
    stem: "For \\(\\omega\\) a non-real cube root of unity, the sum \\(1 + \\omega + \\omega^2\\) is:",
    correct: f("0"),
    distractors: [f("1"), f("\\omega"), f("3")],
    theme: "formula",
  },

  // ── auto-atom fixes (2026-06-11) ──────────────────────────────────
  {
    atomKey: "evaluating-determinants:formula:0",
    stem: "For a 2×2 matrix, \\(\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = \\)?",
    distractors: [
      f("\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad + bc"),
      f("\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = bc - ad"),
      f("\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ab - cd"),
    ],
    theme: "formula",
  },
  {
    atomKey: "adjoint:formula:0",
    stem: "For an \\(n \\times n\\) matrix \\(A\\), the product \\(A(\\operatorname{adj}A)\\) equals:",
    distractors: [
      f("A(\\operatorname{adj}A) = (\\operatorname{adj}A)A = |A|"),
      f("A(\\operatorname{adj}A) = (\\operatorname{adj}A)A = |A|^2\\,I_n"),
      f("A(\\operatorname{adj}A) = (\\operatorname{adj}A)A = I_n"),
    ],
    theme: "formula",
  },
  {
    atomKey: "matrix-multiplication:formula:0",
    stem: "The product of \\(A_{m\\times n}\\) and \\(B_{n\\times p}\\) (when conformable) has order:",
    distractors: [
      f("A_{m\\times n}\\, B_{n\\times p} = (AB)_{n\\times n}"),
      f("A_{m\\times n}\\, B_{n\\times p} = (AB)_{p\\times m}"),
      f("A_{m\\times n}\\, B_{n\\times p} = (AB)_{m\\times n}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "matrix-polynomials-and-equations:formula:0",
    stem: "The Cayley–Hamilton relation for a 2×2 matrix \\(A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\) is:",
    distractors: [
      f("A^2 - (a - d)\\,A + (ad - bc)\\,I = O"),
      f("A^2 - (a + d)\\,A + (ad + bc)\\,I = O"),
      f("A^2 + (a + d)\\,A + (ad - bc)\\,I = O"),
    ],
    theme: "formula",
  },
  {
    atomKey: "symmetric-and-skew-symmetric:formula:0",
    stem: "Any square matrix \\(A\\) decomposes into a symmetric and a skew-symmetric part as:",
    distractors: [
      f("A = \\underbrace{(A + A^T)}_{\\text{symmetric}} + \\underbrace{(A - A^T)}_{\\text{skew-symmetric}}"),
      f("A = \\underbrace{\\tfrac12(A + A^T)}_{\\text{symmetric}} - \\underbrace{\\tfrac12(A - A^T)}_{\\text{skew-symmetric}}"),
      f("A = \\underbrace{\\tfrac12(A - A^T)}_{\\text{symmetric}} + \\underbrace{\\tfrac12(A + A^T)}_{\\text{skew-symmetric}}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "cyclic-determinants:formula:0",
    stem: "The circulant determinant \\(\\begin{vmatrix} a & b & c \\\\ b & c & a \\\\ c & a & b \\end{vmatrix}\\) equals:",
    distractors: [
      f("\\begin{vmatrix}a&b&c\\\\b&c&a\\\\c&a&b\\end{vmatrix} = a^3+b^3+c^3-3abc"),
      f("\\begin{vmatrix}a&b&c\\\\b&c&a\\\\c&a&b\\end{vmatrix} = -(a^3+b^3+c^3+3abc)"),
      f("\\begin{vmatrix}a&b&c\\\\b&c&a\\\\c&a&b\\end{vmatrix} = -3abc"),
    ],
    theme: "formula",
  },
  {
    atomKey: "factor-theorem-determinants:formula:0",
    stem: "The Vandermonde determinant \\(\\begin{vmatrix} 1 & 1 & 1 \\\\ a & b & c \\\\ a^2 & b^2 & c^2 \\end{vmatrix}\\) equals:",
    distractors: [
      f("\\begin{vmatrix}1&1&1\\\\a&b&c\\\\a^2&b^2&c^2\\end{vmatrix} = (a-b)(b-c)(a-c)"),
      f("\\begin{vmatrix}1&1&1\\\\a&b&c\\\\a^2&b^2&c^2\\end{vmatrix} = (a+b)(b+c)(c+a)"),
      f("\\begin{vmatrix}1&1&1\\\\a&b&c\\\\a^2&b^2&c^2\\end{vmatrix} = (a-b)(b-c)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "binomial-coefficient-determinants:formula:0",
    stem: "Pascal's identity (used to simplify binomial-coefficient determinants via \\(C_j \\to C_{j-1} + C_j\\)) is:",
    distractors: [
      f("\\binom{n}{r} + \\binom{n}{r-1} = \\binom{n+1}{r+1}"),
      f("\\binom{n}{r} + \\binom{n}{r+1} = \\binom{n+1}{r}"),
      f("\\binom{n}{r} + \\binom{n+1}{r} = \\binom{n+1}{r+1}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "differentiating-a-determinant:formula:0",
    stem: "For a 3-row determinant with differentiable rows \\(R_1, R_2, R_3\\), the derivative \\(\\dfrac{d}{dx}\\begin{vmatrix} R_1 \\\\ R_2 \\\\ R_3 \\end{vmatrix}\\) equals:",
    distractors: [
      f("\\begin{vmatrix}R_1'\\\\R_2\\\\R_3\\end{vmatrix} + \\begin{vmatrix}R_1\\\\R_2'\\\\R_3\\end{vmatrix}"),
      f("\\begin{vmatrix}R_1'\\\\R_2'\\\\R_3'\\end{vmatrix}"),
      f("\\begin{vmatrix}R_1'\\\\R_2\\\\R_3\\end{vmatrix} + \\begin{vmatrix}R_1\\\\R_2'\\\\R_3\\end{vmatrix} - \\begin{vmatrix}R_1\\\\R_2\\\\R_3'\\end{vmatrix}"),
    ],
    theme: "formula",
  },
];
