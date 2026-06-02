import type { ChapterNote } from "@/app/notes/_types";

export const INDEFINITE_INTEGRATION_CHAPTER: ChapterNote = {
  chapterName: "Indefinite Integration",
  title: "Indefinite Integration — MHT-CET Maths",
  intro:
    "Indefinite Integration is one of the densest MHT-CET Maths chapters — 121 PYQs across 2021–2025, " +
    "and the HARDEST by difficulty mix (about 60% are HARD). It is pure technique: there is no theory to " +
    "memorise, only a toolbox of methods and the judgement to pick the right one. The chapter teaches in " +
    "six movements, easiest tool first: " +
    "(1) Foundations — what an antiderivative is, the +C, the standard-formula table, and the algebra you do BEFORE integrating; " +
    "(2) Substitution — the single highest-yield method (44 PYQs), built on the f'(x)/f(x) → log pattern; " +
    "(3) Trigonometric Integrals I — power-reduction and identity simplification; " +
    "(4) Rational Functions and Partial Fractions — standard quadratic forms, completing the square, and decomposition (the arctan-quadratic machinery the next movement leans on); " +
    "(5) Trigonometric Integrals II — rational-in-sin/cos, the half-angle (Weierstrass) substitution, and the fractional-power tan trick, the chapter's hard core; " +
    "(6) Integration by Parts — LIATE, the cyclic integrals, and the recurring eˣ[f(x)+f'(x)] family. " +
    "Every PYQ is tagged — learn the pattern, drill the bank, recover the marks.",
  subtopicOrder: [
    "fundamentals",
    "substitution",
    "trigonometric-integrals-powers",
    "rational-and-partial-fractions",
    "trigonometric-integrals-rational",
    "integration-by-parts",
  ],
};
