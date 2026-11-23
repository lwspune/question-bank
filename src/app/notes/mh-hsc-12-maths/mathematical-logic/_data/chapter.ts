import type { ChapterNote } from "@/app/notes/_types";

export const HSC_MA_ML_CHAPTER: ChapterNote = {
  chapterName: "Mathematical Logic",
  title: "Mathematical Logic: Maharashtra HSC Mathematics",
  intro:
    "Mathematical Logic has 308 questions in this bank: every exercise and solved example in the Balbharati textbook, and the board's past papers from 2015 to 2026. " +
    "Forty-two were set in board papers, twenty-two of them from 2024 to 2026, and all but eight ask for a written answer. " +
    "The board asks you to build a truth table and say whether a pattern is a tautology, a contradiction or a contingency, to negate a statement or write its dual, to write a converse or contrapositive, to prove an equivalence with or without a truth table, and above all to work with switching circuits, which gave eleven of the board's questions. " +
    "Marks go to the working: the letters you define, every column of the truth table, the name of the law on each line, and a sentence of conclusion. " +
    "Every page uses the truth values of the five connectives, so start with statements and connectives and take the pages in order.",
  cardBlurb:
    "Statements and connectives, truth tables, tautologies and contradictions, quantifiers, duals and negations, converse and contrapositive, the algebra of statements, and switching circuits.",
  subtopicOrder: [
    "hscm-ml-connectives",
    "hscm-ml-tables",
    "hscm-ml-tautology",
    "hscm-ml-negation",
    "hscm-ml-converse",
    "hscm-ml-algebra",
    "hscm-ml-switching",
  ],
};
