import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_DETERMINANTS_MATRICES_CHAPTER: ChapterNote = {
  chapterName: "Determinants and Matrices",
  title: "Determinants and Matrices — MHT-CET Maths",
  intro:
    "Determinants and Matrices is small, expensive and unusually reusable: about one question a paper, nearly half of them HARD, but the content is a " +
    "short list of identities that are recalled rather than derived, and the vanishing-determinant test learned here reappears as concurrency, collinearity, " +
    "coplanarity and the scalar triple product across four other chapters. The difficulty is not computation — a 2 × 2 inverse takes ten seconds — but " +
    "recognition: which identity turns a question about A·adj(A), a matrix polynomial or a power of A into one line. Work the pages below in order; " +
    "each identity is stated once, where it is first needed, and the later pages use it without re-deriving it. Every PYQ is tagged.",
  cardBlurb:
    "The adjoint identities, the inverse, Cayley–Hamilton and linear systems — a short list of matrix results that MHT-CET asks about once a paper and reuses across four other chapters.",
  subtopicOrder: [
    "cetdm-determinants-and-adjoint",
    "cetdm-inverse",
    "cetdm-cayley-hamilton",
    "cetdm-linear-systems-and-symmetry",
  ],
};
