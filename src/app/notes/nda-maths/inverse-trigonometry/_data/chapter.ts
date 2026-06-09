import type { ChapterNote } from "@/app/notes/_types";

export const INVERSE_TRIGONOMETRY_CHAPTER: ChapterNote = {
  chapterName: "Inverse Trigonometry",
  title: "Inverse Trigonometry — NDA Maths",
  intro:
    "Inverse trigonometry asks the reverse question — given a ratio, which angle produced it? — with one twist: the answer must lie in a fixed principal-value range. 34 PYQs span 2017–2026, formula-heavy and unforgiving on the range. " +
    "The notes teach in three movements, foundations first: " +
    "(1) Identities, Properties & Sum-Difference — the principal-value branches, the odd/even rules, the complementary identities (sin⁻¹x + cos⁻¹x = π/2), and the tan⁻¹a ± tan⁻¹b sum formula with its 2 tan⁻¹ substitutions; " +
    "(2) Evaluation of Composite Expressions — reducing sin⁻¹(sin x) to the principal value, peeling nested compositions from the inside out, and the double/half-angle compositions; " +
    "(3) Solving Equations & Geometric Applications — solving inverse-trig equations via the complementary identity (watching the validity of the sum formula), and angle-of-elevation problems. " +
    "Fix the principal range first; every clean answer depends on it. Every PYQ is tagged.",
  subtopicOrder: [
    "it-identities-properties",
    "it-composite-evaluation",
    "it-solving-equations",
  ],
};
