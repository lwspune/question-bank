import type { ChapterNote } from "@/app/notes/_types";

export const HSC_PH_EM_CHAPTER: ChapterNote = {
  chapterName: "Electromagnetic Induction",
  title: "Electromagnetic Induction: Maharashtra HSC Physics",
  intro:
    "Electromagnetic Induction has 70 questions in this bank: every exercise and solved example in the Balbharati textbook, and the board's past papers from 2016 to 2026. " +
    "Thirty-four were set in board papers, nineteen of them from 2024 to 2026, and all but six ask for a written answer. " +
    "The board keeps coming back to a few long answers: the transformer with a labelled diagram, the motional e.m.f. of a sliding rod, the e.m.f. of a rod rotating about one end, and the energy stored in an inductor. " +
    "It also asks you to state Faraday's laws, define self and mutual inductance, and solve short numericals on inductance and turns. " +
    "Marks go to the steps: a labelled diagram, the formula, the substitution with units, and the answer with its unit. " +
    "Every result in the chapter comes from Faraday's laws, so start there and take the pages in order.",
  cardBlurb:
    "Faraday's and Lenz's laws, motional e.m.f. of sliding and rotating rods, induction in a still coil, generators and back e.m.f., eddy currents, self and mutual inductance, and the transformer.",
  subtopicOrder: [
    "hscp-em-faraday",
    "hscp-em-lenz",
    "hscp-em-motional",
    "hscp-em-stationary",
    "hscp-em-generators",
    "hscp-em-eddy",
    "hscp-em-self",
    "hscp-em-mutual",
  ],
};
