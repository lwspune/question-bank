import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_COMPLEX_NUMBERS_CHAPTER: ChapterNote = {
  chapterName: "Complex Numbers",
  title: "Complex Numbers — MHT-CET Maths",
  intro:
    "Complex Numbers is one question a paper and one of the more forgiving chapters in MHT-CET Maths: under a third of its past-year questions are HARD, and the " +
    "same handful of stems recur across sittings with the numbers unchanged. The work is algebra with one extra rule (i² = −1) and one extra picture (the Argand plane), " +
    "and almost every question is a conjugate multiplication, a modulus property, a quadrant check on an argument, or a modulus condition read as a circle or a line. " +
    "Work the pages below in order: the algebra page fixes the habits the other two assume, the modulus-and-argument page is where most of the marks are, and the locus " +
    "page turns the chapter's one geometric idea — distance in the plane — into the greatest-and-least-modulus shape that also appears in the Circle chapter. Every PYQ is tagged.",
  cardBlurb:
    "Algebra with i, modulus and argument in the Argand plane, and the locus questions — the one-a-paper MHT-CET chapter where the same stems recur year after year.",
  subtopicOrder: [
    "cetcn-algebra-and-cube-roots",
    "cetcn-modulus-argument-polar",
    "cetcn-locus",
  ],
};
