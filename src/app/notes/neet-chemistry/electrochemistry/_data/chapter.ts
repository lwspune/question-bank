import type { ChapterNote } from "@/app/notes/_types";

export const NEET_CH_EC_CHAPTER: ChapterNote = {
  chapterName: "Electrochemistry",
  title: "Electrochemistry: NEET Chemistry",
  intro:
    "Electrochemistry has 16 past-year questions in NEET Chemistry, from 2021 to 2026: 1 EASY, 10 MODERATE and 5 HARD. " +
    "Every one of the eight papers asked it, one to three times each, and 9 of the 16 are from 2024 or later. " +
    "Twelve are numerical, and each needs one formula in one or two steps: a cell potential as a difference of two electrode potentials, the Nernst equation, ΔG° = −nFE°, molar conductivity from conductivity, Kohlrausch's law, or the mass deposited in electrolysis. " +
    "So the marks are lost on units and signs: minutes not turned into seconds, joules read as kilojoules, an oxidation potential taken for a reduction potential, or the 1000 left out of molar conductivity. " +
    "Work through the pages in order, from cells and their potentials to conductance and then electrolysis.",
  cardBlurb:
    "Galvanic cells, electrode potentials and the Nernst equation, E°cell with Gibbs energy and K, conductivity and molar conductivity, Kohlrausch's law, Faraday's laws, batteries, fuel cells and corrosion.",
  subtopicOrder: ["nch-ec-cells", "nch-ec-conductance", "nch-ec-electrolysis"],
};
