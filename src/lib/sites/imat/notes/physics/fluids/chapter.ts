import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_PHY_FLUIDS_CHAPTER: ChapterNote = {
  chapterName: "Fluids",
  title: "Fluids: Pressure, Pascal and Archimedes",
  intro:
    "Fluids has 8 past questions since 2011, and the ministry papers from 2023 on have asked 2 of them. " +
    "That is fewer than one a year, but each one is short: a single law and one line of arithmetic. " +
    "The ministry papers asked for facts (which way a still liquid pushes on a wall, how deep a diver goes before the pressure doubles), while the older papers asked for a calculation with a unit conversion hidden in it. " +
    "Learn the three laws with their units and these questions take under a minute.",
  subtopicOrder: ["imat-flu-pressure", "imat-flu-buoyancy"],
};
