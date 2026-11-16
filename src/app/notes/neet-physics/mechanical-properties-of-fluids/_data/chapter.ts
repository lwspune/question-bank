import type { ChapterNote } from "@/app/notes/_types";

export const NEET_PH_FL_CHAPTER: ChapterNote = {
  chapterName: "Mechanical Properties of Fluids",
  title: "Mechanical Properties of Fluids: NEET Physics",
  intro:
    "Mechanical Properties of Fluids has 11 past-year questions in NEET Physics, from 2021 to 2026: 2 EASY, 8 MODERATE and 1 HARD. " +
    "Every one of the eight papers asked it, once or twice each. " +
    "Five of the eleven come with a figure (two graphs, two tubes and a tank), so read what the figure shows before you reach for a formula. " +
    "Most questions need one idea and a line or two of working: pressure that grows with depth, water that speeds up where a pipe narrows, a viscous force that balances a weight, or the extra pressure under a curved surface. " +
    "Marks are lost on small slips: the atmosphere left inside an absolute pressure, the second surface of a soap bubble forgotten, or a terminal velocity scaled by r instead of r².",
  cardBlurb:
    "Pressure with depth, Pascal's law and floating, continuity and Bernoulli's principle, viscosity, Stokes' law and terminal velocity, surface tension, drops and bubbles, and capillary rise.",
  subtopicOrder: ["nph-fl-pressure", "nph-fl-viscosity", "nph-fl-surface"],
};
