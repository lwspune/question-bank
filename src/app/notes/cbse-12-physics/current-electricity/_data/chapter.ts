import type { ChapterNote } from "@/app/notes/_types";

export const CB_PH_CE_CHAPTER: ChapterNote = {
  chapterName: "Current Electricity",
  title: "Current Electricity: CBSE Class 12 Physics",
  intro:
    "Current Electricity has 181 questions in this bank: every example and exercise of the NCERT chapter, and CBSE's board papers from 2023 to 2026. " +
    "One hundred and sixty-five of them come from board papers, spread across every year from 2023 to 2026. " +
    "The board asks short numericals on drift speed, resistance, temperature and cells; derivations of the current in terms of drift velocity, the resistivity in terms of relaxation time, the emf of cells in parallel and the balance of a Wheatstone bridge; graphs such as terminal voltage against current; and networks solved with Kirchhoff's rules, often from a figure in a case study. " +
    "Marks go to the steps: the formula, the substitution with units and the answer with its unit. In a derivation, write one step a line and name every symbol; in a graph, label both axes.",
  cardBlurb:
    "Current and Ohm's law, drift of electrons and resistivity, how resistivity changes with temperature, electrical power, resistors in series and parallel, cells and their emf, and Kirchhoff's rules with the Wheatstone bridge.",
  subtopicOrder: [
    "cbp-ce-ohm",
    "cbp-ce-drift",
    "cbp-ce-temperature",
    "cbp-ce-power",
    "cbp-ce-combination",
    "cbp-ce-cells",
    "cbp-ce-kirchhoff",
  ],
};
