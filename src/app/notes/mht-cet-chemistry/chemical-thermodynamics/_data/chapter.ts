import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_THERMODYNAMICS_CHAPTER: ChapterNote = {
  chapterName: "Chemical Thermodynamics and Energetics",
  title: "Chemical Thermodynamics and Energetics — MHT-CET Chemistry",
  intro:
    "Chemical Thermodynamics is about three questions a paper in MHT-CET Chemistry and almost never HARD — one in thirty of its past-year questions. " +
    "Most of the marks sit on the first law and its sign convention: ΔU = q + w with w = −P_ext ΔV, the unit conversion 1 dm³ bar = 100 J, and the reversible " +
    "isothermal work −2.303 nRT log(V₂/V₁). The rest is ΔH = ΔU + Δn_g RT, enthalpies of formation combined into a reaction enthalpy, ΔS_surr = −ΔH/T, " +
    "and ΔG = ΔH − TΔS with its zero at equilibrium. The pages follow the book from systems to Gibbs energy, and the first-law page is the one to drill. Every PYQ is tagged.",
  cardBlurb:
    "Systems and processes, the first law with its sign convention and work terms, ΔH against ΔU, enthalpies of formation and bond enthalpies, entropy and Gibbs energy — MHT-CET Chemical Thermodynamics with every past-year question tagged.",
  subtopicOrder: [
    "cetth-systems-and-processes",
    "cetth-first-law",
    "cetth-enthalpy",
    "cetth-thermochemistry",
    "cetth-entropy",
    "cetth-gibbs-energy",
  ],
};
