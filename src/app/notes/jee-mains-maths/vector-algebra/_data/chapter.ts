import type { ChapterNote } from "@/app/notes/_types";

export const JEE_VECTOR_ALGEBRA_CHAPTER: ChapterNote = {
  chapterName: "Vector Algebra",
  title: "Vector Algebra — JEE Mains Mathematics",
  intro:
    "Vector Algebra has 182 past-year questions from 2021 to 2026, and 2023 alone has 44. " +
    "The pages build from the dot product to the cross product, then to equations in an unknown vector and the triple products. " +
    "The last page uses vectors for points, triangle centres and rotation. " +
    "Most questions give vectors in components and ask for one number, so the work is careful arithmetic with the right identity.",
  subtopicOrder: [
    "jee-vec-dot",
    "jee-vec-magnitude",
    "jee-vec-cross",
    "jee-vec-equations",
    "jee-vec-triple",
    "jee-vec-geometry",
  ],
};
