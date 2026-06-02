import type { ChapterNote } from "@/app/notes/_types";

export const NDA_INDEFINITE_INTEGRATION_CHAPTER: ChapterNote = {
  chapterName: "Indefinite Integration",
  title: "Indefinite Integration — NDA Maths",
  intro:
    "Indefinite Integration is a pure-technique chapter: there is no theory to memorise, only a toolbox of " +
    "methods and the judgement to pick the right one. 40 PYQs span 2017–2026, and only 6 of them are EASY — " +
    "the NDA reliably makes you simplify, substitute, or decompose before a standard formula appears. " +
    "The notes teach in four movements, easiest tool first: " +
    "(1) Foundations & Standard Forms — what an antiderivative is, the +C, the standard-formula table, the " +
    "exponential/logarithm laws that collapse a scary integrand to a one-liner, and the recurring eˣ-pattern " +
    "and paired-integral shapes; " +
    "(2) Integration by Substitution — the single highest-yield method (17 PYQs), built on the reverse chain " +
    "rule and the f′(x)/f(x) → ln pattern; " +
    "(3) Integration by Parts — LIATE, the ∫ln x family, and the (ln x)⁻ⁿ cancellation; " +
    "(4) Integration by Partial Fractions — the recurring 1/(x(xⁿ+1)) shape, substitute-then-decompose, and " +
    "the express-the-numerator trick. Every PYQ is tagged — learn the pattern, drill the bank, recover the marks.",
  subtopicOrder: [
    "ii-standard-forms",
    "ii-substitution",
    "ii-by-parts",
    "ii-partial-fractions",
  ],
};
