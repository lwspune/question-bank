import type { ChapterNote } from "@/app/notes/_types";

export const CB_CH_EC_CHAPTER: ChapterNote = {
  chapterName: "Electrochemistry",
  title: "Electrochemistry: CBSE Class 12 Chemistry",
  intro:
    "Electrochemistry has 217 questions in this bank: every example and exercise of the NCERT chapter, and CBSE's board papers from 2022 to 2026. " +
    "One hundred and seventy-four come from board papers, and fifty-nine of the board items are one-mark MCQs or assertion-reason items. " +
    "Every year the board sets a cell to solve with the Nernst equation, ΔrG° or Kc from E°cell, the molar conductivity and degree of dissociation of a weak acid, and Kohlrausch's law; since 2023 it has also asked every year how many faradays a change needs. It also asks why conductivity falls on dilution, what forms when aqueous NaCl is electrolysed, and which cell is used in hearing aids, inverters or the Apollo programme. " +
    "Marks go to the steps: the balanced cell reaction and its n, the formula, the substitution with units, and the answer with its unit and sign. In a \"give reason\" answer, name the quantity you mean, such as conductivity or molar conductivity.",
  cardBlurb:
    "Galvanic cells and electrode potentials, the Nernst equation with Gibbs energy and Kc, conductivity and Kohlrausch's law, Faraday's laws and the products of electrolysis, batteries, fuel cells and corrosion.",
  subtopicOrder: [
    "cbc-ec-cells",
    "cbc-ec-galvanic",
    "cbc-ec-nernst",
    "cbc-ec-conductance",
    "cbc-ec-electrolysis",
    "cbc-ec-batteries",
    "cbc-ec-fuel",
    "cbc-ec-corrosion",
  ],
};
