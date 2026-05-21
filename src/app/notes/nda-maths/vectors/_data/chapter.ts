import type { ChapterNote } from "@/app/notes/_types";

export const VECTORS_CHAPTER: ChapterNote = {
  chapterName: "Vectors",
  title: "Vectors — NDA Mathematics",
  intro:
    "A vector is a quantity with both magnitude AND direction — an arrow, not a " +
    "number. This chapter builds vectors from the ground up: first what they are " +
    "and how to add, scale, and anchor them at an origin; then the four " +
    "operations — dot, cross, projection, section — that turn vector algebra " +
    "into a powerful tool for distance, angle, area, and 3-D geometry. New to " +
    "vectors? Start with Position Vectors below; the other four subtopics are " +
    "applications of what you build there.",
  subtopicOrder: [
    "position-vectors-section",
    "magnitude-components-projection",
    "dot-product-angle",
    "cross-product-triple-product",
    "vector-geometry",
  ],
};
