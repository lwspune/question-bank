import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_GRAV_CHAPTER: ChapterNote = {
  chapterName: "Gravitation",
  title: "Gravitation — JEE Mains Physics",
  intro:
    "Gravitation has 128 past-year questions from 2021 to 2026, and 11 of them ask for a number rather than an option. " +
    "Most questions compare a quantity on one planet, at one height or in one orbit with the same quantity somewhere else, so the constants cancel and the work is in choosing the right formula. " +
    "Marks are lost on distances, not on algebra: a height used where the formula wants the distance from the centre, a separation of 2r written as r, or the constant-g equations used over a distance comparable to the earth's radius.",
  subtopicOrder: [
    "jph-grav-field",
    "jph-grav-height",
    "jph-grav-depth",
    "jph-grav-escape",
    "jph-grav-satellites",
    "jph-grav-kepler",
  ],
};
