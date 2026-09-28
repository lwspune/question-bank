import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_THERMO_CHAPTER: ChapterNote = {
  chapterName: "Thermodynamics",
  title: "Thermodynamics — MHT-CET Physics",
  intro:
    "Thermodynamics has 84 past-year questions in the MHT-CET bank, about one in five HARD. " +
    "One law carries the chapter: the heat given to a gas goes into its internal energy and the work it does, Q = ΔU + W. Which process the gas follows decides how the heat splits, and the adiabatic relations PV^γ = constant and TV^(γ−1) = constant carry most of the HARD questions. " +
    "A short last page turns the same ideas into the efficiency of a Carnot engine. Every PYQ is tagged.",
  cardBlurb:
    "The first law and its sign convention, how heat splits at constant pressure, the four standard processes and their graphs, adiabatic relations, and the Carnot engine and refrigerator — every MHT-CET past-year question on thermodynamics tagged.",
  subtopicOrder: ["cetp-td-first-law", "cetp-td-processes", "cetp-td-carnot"],
};
