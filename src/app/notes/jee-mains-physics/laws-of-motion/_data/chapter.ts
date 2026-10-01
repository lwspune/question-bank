import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_LOM_CHAPTER: ChapterNote = {
  chapterName: "Laws of Motion",
  title: "Laws of Motion — JEE Mains Physics",
  intro:
    "Laws of Motion has 101 past-year questions from 2021 to 2026, and 15 of them ask for a number rather than an option. " +
    "Almost all of them are solved the same way: draw each body on its own, mark every force on it, and write F = ma along the direction it can move. " +
    "Friction takes about three questions in ten, and most of those are really about the normal reaction, because a force at an angle or a tilted surface changes N and the friction with it. " +
    "Marks are lost on a sign or a direction: a pseudo force put along the acceleration instead of against it, a rebound's momentum change taken as mv instead of 2mv, or kinetic friction used before checking that the block moves at all.",
  subtopicOrder: [
    "jph-lom-momentum",
    "jph-lom-equilibrium",
    "jph-lom-pulleys",
    "jph-lom-friction",
    "jph-lom-frames",
  ],
};
