import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_KTG_CHAPTER: ChapterNote = {
  chapterName: "Kinetic Theory",
  title: "Kinetic Theory — JEE Mains Physics",
  intro:
    "Kinetic Theory has 110 past-year questions from 2021 to 2026, and 11 of them ask for a number rather than an option. " +
    "Most are short: change every temperature to kelvin, then apply one proportion, such as pressure with temperature, kinetic energy with temperature or the rms speed with √(T/M), or count a molecule's degrees of freedom and read off Cv and γ. " +
    "The longer ones track moles through joined vessels and mixtures, or replace a mixture by one equivalent gas. Marks are lost on a Celsius temperature in a ratio, on a vibrational mode counted once instead of twice, and on averaging γ instead of the degrees of freedom.",
  subtopicOrder: [
    "jph-ktg-gas-laws",
    "jph-ktg-kinetic-energy",
    "jph-ktg-speeds",
    "jph-ktg-dof",
    "jph-ktg-energy-mixtures",
  ],
};
