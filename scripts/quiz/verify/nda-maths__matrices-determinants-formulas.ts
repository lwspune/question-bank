/**
 * NDA Maths · Matrices & Determinants · per-FORMULA recall MCQs (bundle-split).
 * Skipped (judgment): complex-entry-determinants:* (just i-powers, off-target for
 * a Matrices formula quiz), cramers-rule:1/2 (redundant y,z — same rule as x),
 * inverse-via-adjoint:1 ((|A|≠0) condition).
 *   npm run quiz:verify nda-maths__matrices-determinants-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    atomKey: "adjoint-properties:formula:0",
    stem: "For an \\(n \\times n\\) matrix \\(A\\), which gives \\(|\\operatorname{adj}A|\\)?",
    distractors: [f("|A|^{\\,n}"), f("|A|^{\\,n-2}"), f("|A|^{\\,1-n}")],
    theme: "formula",
  },
  {
    atomKey: "adjoint-properties:formula:1",
    stem: "For an \\(n \\times n\\) matrix \\(A\\), which gives \\(\\operatorname{adj}(\\operatorname{adj}A)\\)?",
    distractors: [f("|A|^{\\,n-1}A"), f("|A|^{\\,n}A"), f("|A|^{\\,n-2}A^{-1}")],
    theme: "formula",
  },
  {
    atomKey: "cramers-rule:formula:0",
    stem: "By Cramer's rule (system determinant \\(\\Delta\\)), the solution for \\(x\\) is:",
    distractors: [f("x = \\frac{\\Delta}{\\Delta_x}"), f("x = \\frac{\\Delta_y}{\\Delta}"), f("x = \\Delta_x \\cdot \\Delta")],
    theme: "formula",
  },
  {
    atomKey: "det-products-scalar-powers:formula:0",
    stem: "Which is the determinant of a product, \\(\\det(AB)\\)?",
    distractors: [f("\\det A + \\det B"), f("\\det(A + B)"), f("2\\,\\det A\\,\\det B")],
    theme: "formula",
  },
  {
    atomKey: "det-products-scalar-powers:formula:1",
    stem: "For an \\(n \\times n\\) matrix and scalar \\(k\\), which gives \\(\\det(kA)\\)?",
    distractors: [f("k\\,\\det A"), f("k^2\\,\\det A"), f("nk\\,\\det A")],
    theme: "formula",
  },
  {
    atomKey: "diagonal-scalar-identity:formula:0",
    stem: "Which is the determinant of a diagonal matrix \\(D\\) with entries \\(d_1, \\dots, d_n\\)?",
    distractors: [f("\\sum_i d_i"), f("\\prod_i \\tfrac{1}{d_i}"), f("n\\prod_i d_i")],
    theme: "formula",
  },
  {
    atomKey: "diagonal-scalar-identity:formula:1",
    stem: "Which is the inverse of a diagonal matrix \\(D = \\operatorname{diag}(d_1, \\dots, d_n)\\)?",
    distractors: [
      f("\\operatorname{diag}(d_1, \\dots, d_n)"),
      f("\\operatorname{diag}(-d_1, \\dots, -d_n)"),
      f("\\tfrac{1}{\\prod_i d_i}\\,I"),
    ],
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
    atomKey: "minors-and-cofactors:formula:1",
    stem: "For \\(k \\neq i\\) (cofactors of a DIFFERENT row), \\(\\sum_j a_{ij}C_{kj}\\) equals:",
    correct: f("0"),
    distractors: [f("\\det A"), f("1"), f("|A|")],
    theme: "property",
  },
  {
    atomKey: "orthogonal-matrices:formula:0",
    stem: "Which is the defining property of an orthogonal matrix \\(A\\)?",
    distractors: [f("AA^T = I \\Rightarrow A^{-1} = A"), f("AA^T = I \\Rightarrow A^{-1} = -A^T"), f("AA^T = O \\Rightarrow A^{-1} = A^T")],
    theme: "formula",
  },
  {
    atomKey: "orthogonal-matrices:formula:1",
    stem: "For an orthogonal matrix \\(A\\), the determinant \\(\\det A\\) is:",
    distractors: [f("\\det A = 1"), f("\\det A = 0"), f("\\det A = \\pm n")],
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
  {
    atomKey: "rotation-matrices:formula:0",
    stem: "For rotation matrices, the product \\(R(\\theta)\\,R(\\phi)\\) equals:",
    correct: f("R(\\theta + \\phi)"),
    distractors: [f("R(\\theta - \\phi)"), f("R(\\theta\\phi)"), f("R(\\theta) + R(\\phi)")],
    theme: "formula",
  },
  {
    atomKey: "rotation-matrices:formula:1",
    stem: "For a rotation matrix, \\(R(\\theta)^n\\) equals:",
    correct: f("R(n\\theta)"),
    distractors: [f("R(\\theta^n)"), f("R(\\theta/n)"), f("n\\,R(\\theta)")],
    theme: "formula",
  },
];
