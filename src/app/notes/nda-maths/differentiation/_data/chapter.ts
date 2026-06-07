import type { ChapterNote } from "@/app/notes/_types";

export const DIFFERENTIATION_CHAPTER: ChapterNote = {
  chapterName: "Differentiation",
  title: "Differentiation — NDA Mathematics",
  intro:
    "Differentiation is a high-volume NDA chapter — around 85 past-year questions across 2017–2026, " +
    "and a prerequisite for Application of Derivatives, Limits & Continuity, and much of the calculus " +
    "that follows. Most marks are won by recognising which TOOL a problem wants: a standard derivative, " +
    "the chain rule, logarithmic differentiation for variable exponents, or a simplify-first trick on a " +
    "messy inverse-trig expression. Work the three notes in order — first the core techniques (standard " +
    "derivatives, the rules, chain and logarithmic differentiation), then the advanced forms (parametric, " +
    "implicit, and higher-order derivatives), and finally differentiability itself (when the derivative " +
    "exists at all — corners, the modulus, and the greatest-integer function). The traps are predictable: " +
    "forgetting to convert degrees to radians, mishandling a power tower, or assuming a continuous " +
    "function must be differentiable.",
  subtopicOrder: [
    "diff-core-techniques",
    "diff-parametric-implicit-higher",
    "diff-differentiability",
  ],
};
