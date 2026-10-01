import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_THERMO_CHAPTER: ChapterNote = {
  chapterName: "Thermodynamics",
  title: "Thermodynamics — JEE Mains Physics",
  intro:
    "Thermodynamics has 125 past-year questions from 2021 to 2026, and 21 of them ask for a number rather than an option. " +
    "One law carries the chapter: the heat given to a gas goes into its internal energy and into the work it does, Q = ΔU + W, with work done by the gas counted positive. Which process the gas follows decides how that heat splits, and adiabatic processes alone take nearly a quarter of the questions. " +
    "Twenty-eight questions come with a figure, most of them a graph of a process, where work is an area and its sign comes from the direction. Marks are lost on Cp used for ΔU, on °C used in an efficiency, and on a semi-axis read off the wrong scale.",
  subtopicOrder: [
    "jph-thermo-first-law",
    "jph-thermo-heat-capacity",
    "jph-thermo-processes",
    "jph-thermo-adiabatic",
    "jph-thermo-cycles",
    "jph-thermo-engines",
  ],
};
