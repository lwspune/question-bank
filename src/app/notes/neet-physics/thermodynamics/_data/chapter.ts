import type { ChapterNote } from "@/app/notes/_types";

export const NEET_PH_TD_CHAPTER: ChapterNote = {
  chapterName: "Thermodynamics",
  title: "Thermodynamics: NEET Physics",
  intro:
    "Thermodynamics has 8 past-year questions in NEET Physics, from 2022 to 2026: 4 EASY and 4 MODERATE. " +
    "Seven of the eight papers asked it, once each, except Re-NEET 2026 with two; NEET 2021 asked none. " +
    "Three come with a P-V graph, so learn to read work off a graph as an area. " +
    "Nearly every question is one law used once: the first law with its signs, the rule for one kind of process, or the Carnot efficiency with temperatures in kelvin. " +
    "Marks are lost on signs and units, not on hard algebra. Work through the pages in order, from heat and work to the engines that turn one into the other.",
  cardBlurb:
    "State variables, the first law, work as the area under a P-V graph, isothermal and adiabatic processes, heat engines, refrigerators and the Carnot engine.",
  subtopicOrder: ["nph-td-first-law", "nph-td-processes"],
};
