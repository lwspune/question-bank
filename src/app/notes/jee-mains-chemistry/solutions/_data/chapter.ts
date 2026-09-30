import type { ChapterNote } from "@/app/notes/_types";

export const JEE_CH_SOL_CHAPTER: ChapterNote = {
  chapterName: "Solutions",
  title: "Solutions — JEE Mains Chemistry",
  intro:
    "Solutions has 110 past-year questions from 2021 to 2026, and 60 of them ask for a number rather than an option. " +
    "Almost every one is a single formula with new numbers: Henry's law, Raoult's law, ΔT = K·m or π = iCRT, with the van 't Hoff factor multiplying each colligative effect for a salt or a weak acid. " +
    "What decides the marks is the concentration each formula wants: a mole fraction for vapour pressure, moles per kilogram of solvent for boiling and freezing points, and moles per litre of solution for osmotic pressure.",
  subtopicOrder: [
    "jch-sol-henry",
    "jch-sol-raoult",
    "jch-sol-rlvp",
    "jch-sol-bpfp",
    "jch-sol-osmotic",
    "jch-sol-vanthoff",
  ],
};
