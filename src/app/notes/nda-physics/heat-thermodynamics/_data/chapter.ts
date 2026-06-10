import type { ChapterNote } from "@/app/notes/_types";

export const HEAT_THERMODYNAMICS_CHAPTER: ChapterNote = {
  chapterName: "Heat and Thermodynamics",
  title: "Heat and Thermodynamics — NDA Physics",
  intro:
    "Heat and Thermodynamics is a steady, formula-rich NDA Physics chapter — about 39 PYQs across 2017–2026 at roughly 20% HARD, and the HARD ones are almost always calorimetry or gas-process algebra you can grind out if you keep your units straight. " +
    "It teaches in four movements that follow the physics itself: " +
    "(1) Temperature and thermometry — what temperature is, the Celsius / Fahrenheit / Kelvin scales and how to convert between them, absolute zero, and how solids and liquids expand on heating; " +
    "(2) Heat, calorimetry and specific heat — heat as energy in transit, specific and latent heat, the calorimetry balance (heat lost = heat gained), the ice-melting mixing problems, plus the three modes of heat transfer (conduction, convection, radiation); " +
    "(3) Phase change and boiling — melting, vaporization, evaporation versus boiling, why pressure changes the boiling point (pressure cookers, high altitudes), and Newton's law of cooling; " +
    "(4) Thermodynamic processes — the gas laws, the first law (ΔU = Q − W), isothermal / adiabatic / isochoric / isobaric processes, and the second law. " +
    "The single biggest marks pool is calorimetry: master 'heat lost = heat gained' with the specific-heat and latent-heat terms and you own the chapter's hardest numerics. " +
    "Drill the formula, drill the table, walk out with the marks.",
  subtopicOrder: [
    "ht-temperature-and-thermometry",
    "ht-heat-calorimetry-specific-heat",
    "ht-phase-change-and-boiling",
    "ht-thermodynamic-processes",
  ],
};
