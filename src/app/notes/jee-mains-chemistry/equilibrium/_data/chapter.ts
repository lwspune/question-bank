import type { ChapterNote } from "@/app/notes/_types";

export const JEE_CH_EQ_CHAPTER: ChapterNote = {
  chapterName: "Equilibrium",
  title: "Equilibrium — JEE Mains Chemistry",
  intro:
    "Equilibrium has 131 past-year questions from 2021 to 2026, and 60 of them ask for a number rather than an option. " +
    "It is a calculation chapter: nearly every question writes one equilibrium expression and solves it for a concentration, a partial pressure, a degree of dissociation, a pH or a solubility. " +
    "The gas-phase pages come first because the ionic pages reuse their tools; Ka, a buffer and Ksp are the same expression written for ions in water. " +
    "The recall that remains is short but exact: what pressure, an inert gas or a catalyst does to an equilibrium, and which indicator suits which titration.",
  subtopicOrder: [
    "jch-eq-constant",
    "jch-eq-composition",
    "jch-eq-dissociation",
    "jch-eq-le-chatelier",
    "jch-eq-ph",
    "jch-eq-buffer",
    "jch-eq-hydrolysis",
    "jch-eq-ksp",
  ],
};
