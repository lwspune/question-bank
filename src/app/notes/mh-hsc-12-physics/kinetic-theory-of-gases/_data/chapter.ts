import type { ChapterNote } from "@/app/notes/_types";

export const HSC_PH_KT_CHAPTER: ChapterNote = {
  chapterName: "Kinetic Theory of Gases and Radiation",
  title: "Kinetic Theory of Gases and Radiation: Maharashtra HSC Physics",
  intro:
    "Kinetic Theory of Gases and Radiation has 80 questions in this bank: every exercise and solved example in the Balbharati textbook, and the board's past papers from 2016 to 2026. " +
    "Thirty-eight were set in board papers, nineteen of them from 2024 to 2026, and twenty-six of the thirty-eight ask for a written answer. " +
    "The chapter has two halves. In the gas half, the board asks you to derive the pressure of a gas, prove that the rms speed varies as the square root of the absolute temperature, and prove Mayer's relation. " +
    "In the radiation half, it asks you to explain Ferry's blackbody and the spectral distribution curves, state and prove Kirchhoff's law, and calculate with Stefan's and Wien's laws. " +
    "Marks go to the steps: a labelled diagram where one is asked, the formula, the substitution with units, and the answer. " +
    "The commonest lost mark in this chapter is a temperature left in Celsius, so convert to kelvin before anything else.",
  cardBlurb:
    "The gas laws, pressure, rms speed and temperature from kinetic theory, equipartition and specific heats, then heat radiation: absorption, the perfect blackbody, and Stefan's, Kirchhoff's and Wien's laws.",
  subtopicOrder: [
    "hscp-kt-gas",
    "hscp-kt-pressure",
    "hscp-kt-rms",
    "hscp-kt-equipartition",
    "hscp-kt-mayer",
    "hscp-kt-absorption",
    "hscp-kt-blackbody",
    "hscp-kt-kirchhoff",
    "hscp-kt-wien",
  ],
};
