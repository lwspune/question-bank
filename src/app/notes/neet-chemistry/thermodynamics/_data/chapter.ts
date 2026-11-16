import type { ChapterNote } from "@/app/notes/_types";

export const NEET_CH_TH_CHAPTER: ChapterNote = {
  chapterName: "Thermodynamics",
  title: "Thermodynamics: NEET Chemistry",
  intro:
    "Thermodynamics has 18 past-year questions in NEET Chemistry, from 2021 to 2026: 5 EASY, 10 MODERATE and 3 HARD. " +
    "Every one of the eight papers asked it, one to three times each, and 13 of the 18 are from 2024 or later. " +
    "Most need one short calculation with a sign rule attached: ΔU = q + w with work done on the system counted as positive, ΔH = ΔU + ΔnRT counting only the moles of gas, ΔG = ΔH − TΔS with ΔS turned into kJ first, and ΔG° = −2.303RT log K. " +
    "So marks are lost on signs and units, not on hard algebra: learn each rule with its sign and its unit. " +
    "Work through the pages in order, from the first law to Gibbs energy.",
  cardBlurb:
    "Systems, state functions and the first law, work of expansion, enthalpy and ΔH = ΔU + ΔnRT, formation and combustion enthalpies, Hess's law and bond enthalpy, entropy, Gibbs energy and the equilibrium constant.",
  subtopicOrder: ["nch-th-first-law", "nch-th-enthalpy", "nch-th-spontaneity"],
};
