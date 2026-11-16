import type { ChapterNote } from "@/app/notes/_types";

export const NEET_CH_SB_CHAPTER: ChapterNote = {
  chapterName: "Some Basic Concepts of Chemistry",
  title: "Some Basic Concepts of Chemistry: NEET Chemistry",
  intro:
    "Some Basic Concepts of Chemistry has 13 past-year questions in NEET Chemistry, from 2021 to 2026: 4 EASY, 8 MODERATE and 1 HARD. " +
    "Every one of the eight papers asked it, and 10 of the 13 are from 2024 or later. " +
    "Eleven of them are calculations, and each one starts the same way: turn the given mass, volume or number of particles into moles. The steps are short, so marks are lost on small slips: molecules counted as atoms, a purity left out, millilitres not turned into litres, or a mass ratio used where the balanced equation gives a mole ratio. " +
    "The other two test rules: rounding off a number ending in 5, and the law Dalton's atomic theory could not explain. " +
    "Work through the pages in order, since each one builds on the mole.",
  cardBlurb:
    "Significant figures and rounding off, the laws of chemical combination, the mole and Avogadro's number, empirical formulae, and stoichiometry with purity, limiting reagents and gas volumes.",
  subtopicOrder: ["nch-sb-measurement", "nch-sb-mole", "nch-sb-stoichiometry"],
};
