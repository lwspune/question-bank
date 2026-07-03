import type { ChapterNote } from "@/app/notes/_types";

export const SOME_BASIC_CONCEPTS_CHAPTER: ChapterNote = {
  chapterName: "Some Basic Concepts of Chemistry",
  title: "Some Basic Concepts of Chemistry — MHT-CET Chemistry",
  intro:
    "The arithmetic backbone of MHT-CET Chemistry — the chapter that turns grams, litres and molecule-counts into each other. It is heavily tested and mostly straightforward: master a handful of bridges and nearly every question falls in one or two steps. " +
    "It teaches in four movements, foundations first: " +
    "(1) SI units, physical properties, matter classification and average atomic mass — the measurement groundwork; " +
    "(2) the laws of chemical combination, Dalton's atomic theory and percentage composition; " +
    "(3) the mole concept and its interconversions — the engine room: n = m/M, n = V/22.4, N = n·NA, and vapour density; " +
    "(4) stoichiometry and concentration — reading mole ratios off a balanced equation, limiting reagent, combining gas volumes and H2O2 volume strength. " +
    "Mostly formula concepts with worked numbers; the named laws live in reference tables. Gas laws, Dalton's law of partial pressures and the kinetic theory are taught in the separate States of Matter chapter, following the Maharashtra State Board syllabus. Every PYQ tagged.",
  subtopicOrder: [
    "cetsbcc-si-units",
    "cetsbcc-laws-of-combination",
    "cetsbcc-mole-interconversions",
    "cetsbcc-stoichiometry-concentration",
  ],
};
