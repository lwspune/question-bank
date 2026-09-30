import type { ChapterNote } from "@/app/notes/_types";

export const JEE_DETERMINANTS_CHAPTER: ChapterNote = {
  chapterName: "Determinants",
  title: "Determinants — JEE Mains Mathematics",
  intro:
    "Determinants has 136 past-year questions from 2021 to 2026, and 82 of them are systems of linear equations. " +
    "The first five pages sort those systems by what the question asks for: infinitely many solutions, none, a full classification, or a non-trivial solution of a homogeneous system. " +
    "The last three pages are about determinants themselves — scalar multiples and adjoints, row and column operations, and determinants that depend on x.",
  subtopicOrder: [
    "jee-det-inf-combine",
    "jee-det-inf-cramer",
    "jee-det-no-solution",
    "jee-det-classify",
    "jee-det-homogeneous",
    "jee-det-adjoint",
    "jee-det-operations",
    "jee-det-functions",
  ],
};
