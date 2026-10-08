import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_CHE_SOL_CHAPTER: ChapterNote = {
  chapterName: "Solutions and Concentration",
  title: "Solutions: Solubility, Concentration and Dilution",
  intro:
    "Solutions and Concentration has 16 past questions since 2011, and the ministry papers from 2023 on have asked 2 of them. " +
    "Both ministry questions were short calculations: how much water dilutes a solution to a lower concentration, and how many moles of one ion are in a volume of a salt solution. " +
    "The older papers mixed recall about solubility and mixtures with unit conversions between grams, moles, millilitres and litres. " +
    "Most mistakes here are a missing factor: millilitres left unconverted, a molar mass forgotten, or two ions from one formula counted as one.",
  subtopicOrder: [
    "imat-sol-mixtures",
    "imat-sol-solubility",
    "imat-sol-concentration",
    "imat-sol-dilution",
    "imat-sol-colligative",
  ],
};
