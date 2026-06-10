import type { ChapterNote } from "@/app/notes/_types";

export const MOLE_CONCEPT_CHAPTER: ChapterNote = {
  chapterName: "Mole Concept and Stoichiometry",
  title: "Mole Concept and Stoichiometry — NDA Chemistry",
  intro:
    "This is the one calculate-it chapter of NDA Chemistry — small in question count (9 PYQs across 2017–2026) but the only place the paper asks you to do arithmetic rather than recall a fact. " +
    "Almost every question reduces to one habit: convert whatever you are given (grams, litres at STP, a number of molecules) into MOLES first, then convert moles into whatever the question wants. " +
    "Get the mole bridge right and the chapter is free marks. " +
    "It teaches in two movements: " +
    "(1) Mole concept, Avogadro's law and molar calculations — the mole as a counting unit, Avogadro's number, molar mass, the three conversions (mass, particle count, volume at STP) and mass-percent; " +
    "(2) Stoichiometry and the laws of chemical combination — reading mole ratios off a balanced equation, equivalent weight, and the named laws (conservation of mass, definite and multiple proportions, Avogadro's law). " +
    "Mostly formula concepts with worked numbers; the named laws live in one reference table. Every PYQ tagged.",
  subtopicOrder: ["mole-molar-calculations", "mole-stoichiometry-laws"],
};
