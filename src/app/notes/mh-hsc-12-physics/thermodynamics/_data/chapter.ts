import type { ChapterNote } from "@/app/notes/_types";

export const HSC_PH_TD_CHAPTER: ChapterNote = {
  chapterName: "Thermodynamics",
  title: "Thermodynamics: Maharashtra HSC Physics",
  intro:
    "Thermodynamics has 64 questions in this bank: every exercise and solved example in the Balbharati textbook, and the board's past papers from 2017 to 2026. " +
    "Thirty were set in board papers, twenty of them from 2024 to 2026, and all but seven ask for a written answer. " +
    "The board asks you to define an equilibrium or a process, derive the work done in an isothermal change, explain a cyclic process with a p-V diagram, and calculate with the first law, the adiabatic relations or the Carnot formulas. " +
    "Marks go to the steps: the sign of each term in Q = ΔU + W, a labelled p-V diagram with arrows, temperatures in kelvin, and the answer with its unit. " +
    "The first law and the work done by a gas carry the whole chapter, so start with heat and work and take the pages in order.",
  cardBlurb:
    "Heat, internal energy and work, the first law and its signs, equilibrium and the zeroth law, the isothermal, adiabatic and cyclic processes, heat engines, refrigerators, the second law and the Carnot engine.",
  subtopicOrder: [
    "hscp-td-energy",
    "hscp-td-firstlaw",
    "hscp-td-states",
    "hscp-td-processes",
    "hscp-td-engines",
    "hscp-td-refrigerators",
    "hscp-td-secondlaw",
    "hscp-td-carnot",
  ],
};
