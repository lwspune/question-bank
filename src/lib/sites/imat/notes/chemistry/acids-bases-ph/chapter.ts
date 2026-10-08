import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_CHE_ABP_CHAPTER: ChapterNote = {
  chapterName: "Acids, Bases and pH",
  title: "Acids, Bases and pH: Definitions, pH Calculations, Salts and Buffers",
  intro:
    "Acids, Bases and pH has 22 past questions since 2011, and the ministry papers from 2023 on have asked 10 of them. " +
    "That is two or three in every recent paper, which makes it one of the most reliable sources of marks in the chemistry section. " +
    "The questions mix recall (which theory a reaction fits, which salt gives a basic solution, which acid is weak) with short pH arithmetic done without a calculator. " +
    "The difficulty sits in the logarithm: one pH unit is a factor of ten, and a base's concentration gives the pOH before it gives the pH.",
  subtopicOrder: [
    "imat-abp-definitions-page",
    "imat-abp-ph-scale-page",
    "imat-abp-strong-page",
    "imat-abp-weak-page",
    "imat-abp-salts-page",
    "imat-abp-titration-page",
  ],
};
