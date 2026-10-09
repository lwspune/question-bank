import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_PHY_HTH_CHAPTER: ChapterNote = {
  chapterName: "Heat and Thermodynamics",
  title: "Heat and Thermodynamics: Calorimetry, Gases and the Laws",
  intro:
    "Heat and Thermodynamics has 13 past questions since 2011, and the ministry papers from 2023 on have asked 3 of them. " +
    "Most are short calculations: rearranging Q = mcΔT, finding a latent heat, or applying a gas law. " +
    "The rest ask which statements are true about a gas held at constant temperature or a solid that is melting, so you need the reasons as well as the formulas. " +
    "The difficulty is in the bookkeeping: kelvin rather than Celsius, seconds rather than minutes, and no missing term in an energy balance.",
  subtopicOrder: [
    "imat-hth-temperature",
    "imat-hth-calorimetry",
    "imat-hth-ideal-gas",
    "imat-hth-first-law",
    "imat-hth-second-law",
  ],
};
