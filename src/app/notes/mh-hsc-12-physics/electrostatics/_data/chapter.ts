import type { ChapterNote } from "@/app/notes/_types";

export const HSC_PH_ES_CHAPTER: ChapterNote = {
  chapterName: "Electrostatics",
  title: "Electrostatics: Maharashtra HSC Physics",
  intro:
    "Electrostatics has 74 questions in this bank: every exercise and solved example in the Balbharati textbook, and the board's past papers from 2016 to 2026. " +
    "Thirty-four were set in board papers, seventeen of them from 2024 to 2026, and all but nine ask for a written answer. " +
    "The board asks you to derive results (the field outside a charged spherical shell, the potential of a point charge, the energy stored in a capacitor, capacitors in series), to explain ideas such as polar and non-polar dielectrics, to draw the Van de Graaff generator, and to calculate fields, potentials, capacitances and energies. " +
    "Marks go to the steps: the Gaussian surface or the labelled diagram, the formula, the substitution with units, and the answer with its unit. " +
    "Gauss' law and electric potential carry the rest of the chapter, so start with them and take the pages in order.",
  cardBlurb:
    "Gauss' law for a shell, a wire and a sheet, electric potential and equipotential surfaces, the energy of charges and dipoles, conductors and dielectrics, and capacitors with their combinations, slabs and stored energy.",
  subtopicOrder: [
    "hscp-es-gauss",
    "hscp-es-potential",
    "hscp-es-equipotential",
    "hscp-es-dipoles",
    "hscp-es-conductors",
    "hscp-es-capacitors",
    "hscp-es-dielectric",
    "hscp-es-energy",
  ],
};
