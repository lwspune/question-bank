import type { ChapterNote } from "@/app/notes/_types";

export const TRIGONOMETRIC_EQUATIONS_CHAPTER: ChapterNote = {
  chapterName: "Trigonometric Equations",
  title: "Trigonometric Equations — NDA Maths",
  intro:
    "A trigonometric equation has infinitely many solutions — the trick is to write the whole family with one general-solution formula, then count how many land in the interval the question asks about. 33 PYQs span 2017–2026, a third of them HARD. " +
    "The notes teach in three movements, foundations first: " +
    "(1) General & Counting Solutions — the three general-solution formulas (for sin = sin, cos = cos, tan = tan), reducing an equation to that standard shape, counting solutions in an interval, and existence/range conditions; " +
    "(2) Solving Specific Forms — trig values as the roots of a quadratic (Vieta's relations), product and sum-to-product forms, and logarithmic trig equations; " +
    "(3) Simultaneous & Combined Systems — solving two trig equations together, and reducing a combined system with a clever substitution. " +
    "Reduce to a standard form, write the general solution, then count — that is the spine of the whole chapter. Every PYQ is tagged.",
  subtopicOrder: [
    "te-general-solutions",
    "te-specific-forms",
    "te-simultaneous-systems",
  ],
};
