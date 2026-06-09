import type { ChapterNote } from "@/app/notes/_types";

export const QUADRATIC_EQUATIONS_CHAPTER: ChapterNote = {
  chapterName: "Quadratic Equations",
  title: "Quadratic Equations — NDA Maths",
  intro:
    "Quadratic Equations is a high-yield, high-difficulty chapter: 63 PYQs span 2017–2026 and 40% of them are HARD — " +
    "the densest HARD profile of any NDA Maths topic this size. Almost nothing here is brute-force; the marks come from " +
    "recognising a structure (a vanishing coefficient sum, a symmetric function of the roots, a hidden cube root of unity) " +
    "and applying one clean relation. The notes teach in three movements, foundations first: " +
    "(1) Nature of Roots & Boundary Conditions — what a quadratic is and the three ways to solve one, then the discriminant " +
    "that decides whether the roots are real, equal or complex, the difference of the roots, the a+b+c=0 shortcut, and where " +
    "the roots sit relative to an interval; " +
    "(2) Vieta's Relations — sum and product of the roots and the symmetric-function machinery (α²+β², α³+β³) that turns most " +
    "'find the value' and 'form the equation' questions into one substitution; " +
    "(3) Special Quadratics — the recurring cube-roots-of-unity hook (x²+x+1=0 ⇒ ω), modulus and logarithmic equations that " +
    "reduce to a quadratic, and parametric/constructed forms. " +
    "Vieta is the chapter's centre of gravity and pairs with cube roots of unity in the ω+Vieta compound — drill the relation, " +
    "not the algebra. Every PYQ is tagged.",
  subtopicOrder: [
    "qe-nature-of-roots",
    "qe-vieta-relations",
    "qe-special-quadratics",
  ],
};
