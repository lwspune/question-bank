import type { ChapterNote } from "@/app/notes/_types";

export const DIFFERENTIATION_CHAPTER: ChapterNote = {
  chapterName: "Differentiation",
  title: "Differentiation — MHT-CET Maths",
  intro:
    "Differentiation is the single most-tested calculus chapter in MHT-CET Maths — 103 PYQs across 2021–2025, and the HARDEST " +
    "by difficulty mix (about 45% are HARD). It is almost pure technique: a small toolbox of rules, and the judgement to pick " +
    "the right one for the shape in front of you. The chapter teaches in six movements, each resting on the tools laid before it: " +
    "(1) Foundations, Chain Rule & Differentiability — the standard-derivative table, the product/quotient/chain rules, iterated " +
    "compositions f(f(x)), simplify-before-you-differentiate, and where a derivative fails to exist; " +
    "(2) Logarithmic Differentiation — take logs first when y is a product, quotient, or variable power, with the signature " +
    "[(x+1)(2x+1)⋯(nx+1)] \"value at x=0\" pattern that the paper loves; " +
    "(3) Implicit Differentiation & Special Forms — F(x,y)=0, the recurring log(x+y)=2xy, prove-the-relation problems, " +
    "self-referential infinite expressions, and functional equations; " +
    "(4) Inverse Functions & Inverse Trigonometric Differentiation — the chapter's biggest pool (29 q): the inverse-function rule, " +
    "the inverse-trig derivative table, the substitution-collapse that turns a scary inverse-trig into a multiple of an angle, the " +
    "tan⁻¹ addition formula, and one inverse-trig differentiated with respect to another; " +
    "(5) Parametric, Higher-Order Derivatives & Relations — the dy/dx = ẏ/ẋ recipe, the second-derivative chain, proving a given " +
    "differential relation, and the nth-derivative standard results; " +
    "(6) Derivative of One Function with Respect to Another — the du/dv = (du/dx)/(dv/dx) move. " +
    "Every PYQ is tagged — learn the pattern, drill the bank, recover the marks.",
  subtopicOrder: [
    "foundations-chain",
    "logarithmic",
    "implicit-special",
    "inverse-functions",
    "parametric-higher",
    "derivative-wrt",
  ],
};
