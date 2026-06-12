/**
 * NDA Maths · Permutation & Combination · FORMULA-recall MCQs.
 * One entry per ` \qquad `-split piece of each enriched `formula.latex` bundle
 * (keys <conceptSlug>:formula:<i>, i from 0). Distractors are full-equation
 * permutations of the SAME formula (no LHS/length tell).
 *   npm run quiz:verify nda-maths__permutation-combination-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── pc-fundamental-counting : permutations / combinations / link ──
  {
    atomKey: "pc-fundamental-counting:formula:0",
    stem: "Which is the formula for the number of permutations \\(^nP_r\\)?",
    distractors: [f("^nP_r=\\dfrac{n!}{r!\\,(n-r)!}"), f("^nP_r=\\dfrac{n!}{r!}"), f("^nP_r=\\dfrac{(n-r)!}{n!}")],
    theme: "formula",
  },
  {
    atomKey: "pc-fundamental-counting:formula:1",
    stem: "Which is the formula for the number of combinations \\(^nC_r\\)?",
    distractors: [f("^nC_r=\\dfrac{n!}{(n-r)!}"), f("^nC_r=\\dfrac{r!\\,(n-r)!}{n!}"), f("^nC_r=\\dfrac{n!}{r!\\,(n+r)!}")],
    theme: "formula",
  },
  {
    atomKey: "pc-fundamental-counting:formula:2",
    stem: "Which identity correctly links \\(^nP_r\\) and \\(^nC_r\\)?",
    distractors: [f("^nP_r=\\dfrac{^nC_r}{r!}"), f("^nC_r=\\,^nP_r\\cdot r!"), f("^nP_r=\\,^nC_r\\cdot(n-r)!")],
    theme: "formula",
  },

  // ── pc-factorial-properties : trailing zeros of n! ──
  {
    atomKey: "pc-factorial-properties:formula:0",
    stem: "Which is the formula for the number of trailing zeros of \\(n!\\)?",
    distractors: [
      f("Z(n!)=\\left\\lfloor\\dfrac{n}{2}\\right\\rfloor+\\left\\lfloor\\dfrac{n}{4}\\right\\rfloor+\\left\\lfloor\\dfrac{n}{8}\\right\\rfloor+\\cdots"),
      f("Z(n!)=\\left\\lfloor\\dfrac{n}{5}\\right\\rfloor+\\left\\lfloor\\dfrac{n}{10}\\right\\rfloor+\\left\\lfloor\\dfrac{n}{15}\\right\\rfloor+\\cdots"),
      f("Z(n!)=\\left\\lfloor\\dfrac{n}{10}\\right\\rfloor+\\left\\lfloor\\dfrac{n}{100}\\right\\rfloor+\\cdots"),
    ],
    theme: "formula",
  },

  // ── pc-binomial-coefficient-identities : symmetry / Pascal / row-sum / absorption ──
  {
    atomKey: "pc-binomial-coefficient-identities:formula:0",
    stem: "Which is the symmetry identity for binomial coefficients?",
    distractors: [f("^nC_r=\\,^nC_{r-n}"), f("^nC_r=\\,^{n-r}C_n"), f("^nC_r=\\,^nC_n - \\,^nC_r")],
    theme: "formula",
  },
  {
    atomKey: "pc-binomial-coefficient-identities:formula:1",
    stem: "Which is Pascal's rule for binomial coefficients?",
    distractors: [f("^nC_r+\\,^nC_{r-1}=\\,^{n+1}C_{r-1}"), f("^nC_r+\\,^nC_{r+1}=\\,^{n+1}C_r"), f("^nC_r-\\,^nC_{r-1}=\\,^{n-1}C_r")],
    theme: "formula",
  },
  {
    atomKey: "pc-binomial-coefficient-identities:formula:2",
    stem: "Which gives the sum of all binomial coefficients in row \\(n\\)?",
    distractors: [f("\\sum_{r=0}^{n}{}^nC_r=2^{n-1}"), f("\\sum_{r=0}^{n}{}^nC_r=n^2"), f("\\sum_{r=0}^{n}{}^nC_r=2^n-1")],
    theme: "formula",
  },
  {
    atomKey: "pc-binomial-coefficient-identities:formula:3",
    stem: "Which is the absorption (committee–chair) identity?",
    distractors: [f("r\\cdot{}^nC_r=(n-1)\\cdot{}^{n-1}C_{r-1}"), f("r\\cdot{}^nC_r=n\\cdot{}^{n-1}C_r"), f("n\\cdot{}^nC_r=r\\cdot{}^{n-1}C_{r-1}")],
    theme: "formula",
  },

  // ── pc-sum-of-numbers : sum-of-all-numbers formula ──
  {
    atomKey: "pc-sum-of-numbers:formula:0",
    stem: "Which is the formula for the sum of all \\(n\\)-digit numbers formed from \\(n\\) distinct digits (no repetition)?",
    distractors: [
      f("\\text{Sum}=n!\\times(\\text{sum of digits})\\times\\underbrace{111\\ldots1}_{n\\text{ ones}}"),
      f("\\text{Sum}=(n-1)!\\times(\\text{product of digits})\\times\\underbrace{111\\ldots1}_{n\\text{ ones}}"),
      f("\\text{Sum}=(n-1)!\\times(\\text{sum of digits})\\times n"),
    ],
    theme: "formula",
  },

  // ── pc-points-and-polygons : lines / triangles / diagonals / parallelograms ──
  {
    atomKey: "pc-points-and-polygons:formula:0",
    stem: "Which gives the number of lines through \\(n\\) points, no three collinear?",
    distractors: [f("\\text{lines}=\\,^nP_2"), f("\\text{lines}=\\,^nC_3"), f("\\text{lines}=\\dfrac{n(n-3)}{2}")],
    theme: "formula",
  },
  {
    atomKey: "pc-points-and-polygons:formula:1",
    stem: "Which gives the number of triangles from \\(n\\) points, no three collinear?",
    distractors: [f("\\text{triangles}=\\,^nC_2"), f("\\text{triangles}=\\,^nP_3"), f("\\text{triangles}=\\dfrac{n(n-3)}{2}")],
    theme: "formula",
  },
  {
    atomKey: "pc-points-and-polygons:formula:2",
    stem: "Which is the formula for the number of diagonals of a convex \\(n\\)-gon?",
    distractors: [f("\\text{diagonals}=\\dfrac{n(n-1)}{2}"), f("\\text{diagonals}=\\,^nC_3"), f("\\text{diagonals}=\\dfrac{n(n-2)}{2}")],
    theme: "formula",
  },
  {
    atomKey: "pc-points-and-polygons:formula:3",
    stem: "Which gives the number of parallelograms from \\(m\\) and \\(n\\) families of parallel lines?",
    distractors: [f("\\text{parallelograms}=\\,^mC_2+\\,^nC_2"), f("\\text{parallelograms}=\\,^mC_3\\cdot{}^nC_3"), f("\\text{parallelograms}=m\\cdot n")],
    theme: "formula",
  },
];
