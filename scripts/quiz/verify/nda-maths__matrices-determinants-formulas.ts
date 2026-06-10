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
];
