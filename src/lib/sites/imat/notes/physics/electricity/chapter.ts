import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_PHY_ELE_CHAPTER: ChapterNote = {
  chapterName: "Electricity",
  title: "Electricity: Charge, Circuits and Power",
  intro:
    "Electricity has 14 past questions since 2011, and the ministry papers from 2023 on have asked 5 of them. " +
    "Most are one-line calculations: collapse a group of resistors, apply a power formula, or scale Coulomb's law. " +
    "The marks are lost on the combination rules and on a missing square, so learn which quantity is squared in each formula. " +
    "The ministry papers also ask plain facts about charge and current, such as the net charge of an atom and which way the electrons in a wire move.",
  subtopicOrder: [
    "imat-ele-charge",
    "imat-ele-potential",
    "imat-ele-current",
    "imat-ele-circuits",
    "imat-ele-power",
  ],
};
