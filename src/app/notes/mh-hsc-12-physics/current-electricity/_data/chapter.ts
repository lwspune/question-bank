import type { ChapterNote } from "@/app/notes/_types";

export const HSC_PH_CE_CHAPTER: ChapterNote = {
  chapterName: "Current Electricity",
  title: "Current Electricity: Maharashtra HSC Physics",
  intro:
    "Current Electricity has 80 questions in this bank: every exercise and solved example in the Balbharati textbook, and the board's past papers from 2016 to 2026. " +
    "Thirty-three were set in board papers, nineteen of them from 2024 to 2026, and all but five ask for a written answer. " +
    "So the work is not only solving circuits. The board asks you to state a law, derive the balancing condition of a Wheatstone bridge, explain how a metre bridge or a potentiometer is used, and convert a galvanometer into an ammeter or a voltmeter. " +
    "Marks go to the steps: a labelled circuit diagram, the formula, the substitution with units, and the answer. " +
    "Everything in the chapter rests on Kirchhoff's two laws, so start there and take the pages in order.",
  cardBlurb:
    "Kirchhoff's laws and cells in parallel, the Wheatstone and metre bridges, the potentiometer for e.m.f. and internal resistance, and converting a galvanometer into an ammeter or a voltmeter.",
  subtopicOrder: ["hscp-ce-kirchhoff", "hscp-ce-bridges", "hscp-ce-potentiometer", "hscp-ce-meters"],
};
