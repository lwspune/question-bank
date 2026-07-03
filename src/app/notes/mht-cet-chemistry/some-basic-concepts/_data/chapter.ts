import type { ChapterNote } from "@/app/notes/_types";

export const SOME_BASIC_CONCEPTS_CHAPTER: ChapterNote = {
  chapterName: "Some Basic Concepts of Chemistry",
  title: "Some Basic Concepts of Chemistry — MHT-CET Chemistry",
  intro:
    "This is the arithmetic backbone of MHT-CET Chemistry — the chapter that turns grams, litres, molecule-counts and pressures into each other. It is heavily tested (85 PYQs) and mostly straightforward: master a handful of bridges and nearly every question falls in one or two steps. " +
    "It teaches in six movements, foundations first: " +
    "(1) SI units, physical properties and average atomic mass — the measurement groundwork; " +
    "(2) the named laws of chemical combination and percentage composition; " +
    "(3) the mole concept and its interconversions — the engine room: n = m/M, n = V/22.4, N = n·NA, and vapour density; " +
    "(4) stoichiometry and concentration — reading mole ratios off a balanced equation, limiting reagent, combining gas volumes and H2O2 volume strength; " +
    "(5) the gas laws and the ideal gas equation PV = nRT; " +
    "(6) real gases, Dalton's law of partial pressures and the kinetic theory of gases. " +
    "Mostly formula concepts with worked numbers; the named laws and KTG postulates live in reference tables. Every PYQ tagged.",
  subtopicOrder: [
    "cetsbcc-si-units",
    "cetsbcc-laws-of-combination",
    "cetsbcc-mole-interconversions",
    "cetsbcc-stoichiometry-concentration",
    "cetsbcc-gas-laws",
    "cetsbcc-dalton-ktg",
  ],
};
