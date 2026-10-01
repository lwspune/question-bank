import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_EMI_CHAPTER: ChapterNote = {
  chapterName: "Electromagnetic Induction",
  title: "Electromagnetic Induction — JEE Mains Physics",
  intro:
    "Electromagnetic Induction has 90 past-year questions from 2021 to 2026, and 41 of them ask for a number rather than an option. " +
    "Almost all of them come down to one law: the emf is the rate at which flux changes. The work is in seeing what changes, the field, the area, the angle or a conductor cutting across the field, and writing that change down before reaching for a formula. " +
    "The arithmetic is short. Marks are lost on factors: an angle taken from the plane instead of the normal, the wrong component of the earth's field, the half in ½Bωl², rpm left unconverted, or a current change that crosses zero.",
  subtopicOrder: [
    "jph-emi-faraday",
    "jph-emi-motional",
    "jph-emi-rotation",
    "jph-emi-inductance",
  ],
};
