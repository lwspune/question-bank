import type { ChapterNote } from "@/app/notes/_types";

export const NEET_CH_SO_CHAPTER: ChapterNote = {
  chapterName: "Solutions",
  title: "Solutions: NEET Chemistry",
  intro:
    "Solutions has 15 past-year questions in NEET Chemistry, from 2021 to 2026: 2 EASY, 12 MODERATE and 1 HARD. " +
    "Every paper except NEET 2023 asked it, and 12 of the 15 are from 2024 or later. " +
    "Five ask for a number: a vapour pressure, a mass of solute or solvent, a temperature from an osmotic pressure plot. Four more need a short calculation to rank solutions or test a statement. Marks are lost on small slips: dividing by the solution instead of the solvent, taking a 3 : 2 ratio as mole fractions of 3 and 2, or forgetting that Na₂SO₄ gives three ions. " +
    "The rest test facts you can learn once: which mixtures deviate from Raoult's law and why, and what a larger Henry's law constant means. " +
    "Work through the pages in order, from concentration to colligative properties.",
  cardBlurb:
    "Types of solutions and concentration terms, solubility and Henry's law, Raoult's law with ideal and non-ideal solutions and azeotropes, and the colligative properties with osmotic pressure and the van 't Hoff factor.",
  subtopicOrder: ["nch-so-concentration", "nch-so-raoult", "nch-so-colligative"],
};
