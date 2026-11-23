import type { ChapterNote } from "@/app/notes/_types";

export const HSC_MA_DI_CHAPTER: ChapterNote = {
  chapterName: "Definite Integration",
  title: "Definite Integration: Maharashtra HSC Mathematics",
  intro:
    "Definite Integration has 127 questions in this bank: the solved examples and exercises of the chapter in the Balbharati Part II textbook, and the board's past papers from 2016 to 2026. " +
    "Fifteen were set in board papers, twelve of them from 2024 to 2026, and all but three ask for a written answer. " +
    "The board's favourite long question is a proof: prove a property of definite integrals, then use it in a 'hence' part. Its shorter questions ask for a direct evaluation, usually after a trigonometric identity or a substitution. " +
    "Marks go to the steps: the substitution with its new limits, the property named on the line where it is used, the two forms (i) and (ii) added together, and the antiderivative written in brackets with its limits before the values are put in. " +
    "Take the pages in order, because each one uses the results of the page before it.",
  cardBlurb:
    "The definite integral as a limit of a sum, the fundamental theorem, substitution, standard forms and integration by parts with limits, and the eight properties with their proofs.",
  subtopicOrder: ["hscm-di-limit", "hscm-di-fundamental", "hscm-di-methods", "hscm-di-properties"],
};
