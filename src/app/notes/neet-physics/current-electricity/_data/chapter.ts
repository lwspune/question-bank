import type { ChapterNote } from "@/app/notes/_types";

export const NEET_PH_CE_CHAPTER: ChapterNote = {
  chapterName: "Current Electricity",
  title: "Current Electricity: NEET Physics",
  intro:
    "Current Electricity has 29 past-year questions in NEET Physics, from 2021 to 2026: 9 EASY, 17 MODERATE and 3 HARD. " +
    "Every one of the eight papers asked it, three to five times each, except Re-NEET 2026 with one. " +
    "Thirteen come with a circuit figure, so the first skill is reading a circuit: find what is in series, what is in parallel, and whether a bridge is balanced before writing any equation. " +
    "The numbers are small and the steps are few, so marks are lost on small slips: a stretched wire's resistance scaled by n instead of n², the larger current given to the larger resistor, or a cell's internal resistance left out. " +
    "Work through the pages in order, from what a current is to the bridges that measure resistance.",
  cardBlurb:
    "Drift velocity and resistivity, resistance and temperature, series and parallel resistors, power and ratings, cells and internal resistance, Kirchhoff's rules and the Wheatstone and metre bridges.",
  subtopicOrder: ["nph-ce-drift", "nph-ce-combinations", "nph-ce-power", "nph-ce-kirchhoff"],
};
