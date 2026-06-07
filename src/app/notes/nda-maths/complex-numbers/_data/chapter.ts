import type { ChapterNote } from "@/app/notes/_types";

export const COMPLEX_NUMBERS_CHAPTER: ChapterNote = {
  chapterName: "Complex Numbers",
  title: "Complex Numbers — NDA Mathematics",
  intro:
    "Complex Numbers is around 72 past-year NDA questions built on one idea: i² = −1 turns every quadratic " +
    "into something solvable and puts numbers on a plane. Work the three notes in order — first the fundamentals, " +
    "conjugate, modulus and argument (the Argand-plane geometry); then powers of i and De Moivre's theorem " +
    "for roots; and finally the cube roots of unity, whose identities (ω³ = 1 and 1 + ω + ω² = 0) " +
    "answer a large, predictable family of questions. The recurring trap is the principal argument's quadrant — " +
    "always place the number on the plane before reading off its angle.",
  subtopicOrder: [
    "cn-modulus-argument",
    "cn-powers-roots",
    "cn-cube-roots-unity",
  ],
};
