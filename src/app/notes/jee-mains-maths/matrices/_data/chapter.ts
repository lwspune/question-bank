import type { ChapterNote } from "@/app/notes/_types";

export const JEE_MATRICES_CHAPTER: ChapterNote = {
  chapterName: "Matrices",
  title: "Matrices — JEE Mains Mathematics",
  intro:
    "Matrices is a near-guaranteed scorer on JEE Mains — 95 past-year questions across " +
    "2021–2025, roughly one to two questions on every shift. But JEE tests matrices very " +
    "differently from the boards: almost nothing is plug-and-chug. The four notes below teach " +
    "the exact machinery the paper rewards — the algebra and special types, then the two engines " +
    "that dominate the chapter (powers of a matrix via Cayley–Hamilton and the nilpotent I + N " +
    "trick), then symmetric / skew-symmetric / orthogonal structure, and finally the adjoint–" +
    "inverse–determinant identities (det(kA), |adj A|, adj(adj A)) that turn a scary-looking " +
    "question into one line of exponent arithmetic. Work them in order and the bank becomes " +
    "pattern-recognition.",
  subtopicOrder: [
    "jee-matrix-algebra",
    "jee-matrix-powers",
    "jee-symmetric-orthogonal",
    "jee-adjoint-inverse",
  ],
};
