import type { ChapterNote } from "@/app/notes/_types";

export const HSC_CH_SO_CHAPTER: ChapterNote = {
  chapterName: "Solutions",
  title: "Solutions: Maharashtra HSC Chemistry",
  intro:
    "Solutions has 103 questions in this bank: every exercise and solved problem in the Balbharati textbook, and the board's past papers from 2014 to 2026. " +
    "Forty-six were set in board papers, twenty-one of them from 2024 to 2026, and all but nine of the forty-six ask for a written answer." +
    "The board keeps coming back to three things: finding the molar mass of a solute from a colligative property, the van't Hoff factor of an electrolyte, and the definitions of osmosis, osmotic pressure and isotonic solutions. " +
    "Marks go to the steps. In a numerical, write the data given, the formula, the substitution with units and the answer with its unit; in a derivation, put each step on its own line. " +
    "Every colligative property grows from one idea, that a nonvolatile solute lowers the vapour pressure of the solvent, so learn Raoult's law well before the later pages.",
  cardBlurb:
    "Solubility and Henry's law, Raoult's law for volatile and nonvolatile solutes, the four colligative properties with the molar mass from each, osmosis and isotonic solutions, and the van't Hoff factor for electrolytes.",
  subtopicOrder: [
    "hscc-so-solubility",
    "hscc-so-liquids",
    "hscc-so-colligative",
    "hscc-so-lowering",
    "hscc-so-boiling",
    "hscc-so-freezing",
    "hscc-so-osmotic",
    "hscc-so-electrolytes",
  ],
};
