import type { ChapterNote } from "@/app/notes/_types";

export const JEE_CH_THERMO_CHAPTER: ChapterNote = {
  chapterName: "Chemical Thermodynamics",
  title: "Chemical Thermodynamics — JEE Mains Chemistry",
  intro:
    "Chemical Thermodynamics has 128 past-year questions from 2021 to 2026, and 77 of them ask for a numerical answer rather than an option. " +
    "Almost every mark rests on two habits: one sign convention, with work done on the system counted positive, and one unit check, joules against kilojoules. " +
    "The early pages settle heat, work and internal energy; the middle pages find an enthalpy change by whatever route the data allow; the last pages decide whether a change goes on its own, and how far.",
  subtopicOrder: [
    "jch-thermo-first-law",
    "jch-thermo-work",
    "jch-thermo-calorimetry",
    "jch-thermo-hess",
    "jch-thermo-phase",
    "jch-thermo-bond",
    "jch-thermo-spontaneity",
    "jch-thermo-equilibrium",
  ],
};
