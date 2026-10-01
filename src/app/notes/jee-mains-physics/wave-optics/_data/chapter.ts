import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_WO_CHAPTER: ChapterNote = {
  chapterName: "Wave Optics",
  title: "Wave Optics — JEE Mains Physics",
  intro:
    "Wave Optics has 119 past-year questions from 2021 to 2026, and 45 of them ask for a number rather than an option. " +
    "About two in five are Young's double slit: where the fringes fall, how bright the screen is at a point, and how far a thin sheet over one slit moves the pattern. " +
    "The rest are single-slit diffraction, polarisation, the brightness of two overlapping beams, and what happens to light inside a medium. " +
    "Almost every question rests on one short relation, so the arithmetic is brief. Marks are lost on a factor: an intensity ratio used where the amplitude ratio is needed, the double slit's fringe width used for a single slit's central maximum, which is twice as wide, or the half lost at the first polaroid forgotten.",
  subtopicOrder: [
    "jph-wo-wavefronts",
    "jph-wo-superposition",
    "jph-wo-fringes",
    "jph-wo-intensity",
    "jph-wo-diffraction",
    "jph-wo-polarisation",
  ],
};
