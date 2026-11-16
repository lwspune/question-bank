import type { ChapterNote } from "@/app/notes/_types";

export const NEET_PH_EI_CHAPTER: ChapterNote = {
  chapterName: "Electromagnetic Induction",
  title: "Electromagnetic Induction: NEET Physics",
  intro:
    "Electromagnetic Induction has 12 past-year questions in NEET Physics, from 2021 to 2026: 3 EASY and 9 MODERATE. " +
    "Every one of the eight papers asked it at least once, and Re-NEET 2026 asked it three times. " +
    "Most of these questions need one formula and two or three lines of working, so marks are lost on small slips: the angle in BA cos θ taken from the plane instead of the normal, the turns per unit length in a solenoid's inductance not squared, or the sign of L dI/dt missed when a current is falling. " +
    "Four come with a figure, and two of those are about the direction of a current or the shape of a graph rather than a number. " +
    "Work through the pages in order, from flux and Faraday's law to the inductance of coils.",
  cardBlurb:
    "Magnetic flux and Faraday's law, Lenz's law and eddy currents, the emf of a moving rod and of a rotating coil, mutual and self-inductance, inductors in a circuit and the energy they store.",
  subtopicOrder: ["nph-ei-faraday", "nph-ei-inductance"],
};
