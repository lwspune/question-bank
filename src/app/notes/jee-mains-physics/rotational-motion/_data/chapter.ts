import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_ROT_CHAPTER: ChapterNote = {
  chapterName: "System of Particles and Rotational Motion",
  title: "System of Particles and Rotational Motion — JEE Mains Physics",
  intro:
    "System of Particles and Rotational Motion has 168 past-year questions from 2021 to 2026, and 74 of them ask for a number rather than an option. " +
    "More than a quarter of them build a moment of inertia, from the standard results, the two axis theorems, or by adding and removing parts. " +
    "Torque, angular momentum and rolling then reuse those values, and most rolling questions turn on one number, k²/R², fixed by the body's shape. " +
    "The algebra is short. Marks are lost on the wrong axis, a forgotten piece of mass, or ½mv² written for a body that is also spinning.",
  subtopicOrder: [
    "jph-rot-com",
    "jph-rot-torque",
    "jph-rot-moi",
    "jph-rot-axes",
    "jph-rot-dynamics",
    "jph-rot-angmom",
    "jph-rot-rolling",
    "jph-rot-incline",
  ],
};
