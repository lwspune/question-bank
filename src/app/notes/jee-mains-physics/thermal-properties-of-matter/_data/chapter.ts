import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_THERMAL_CHAPTER: ChapterNote = {
  chapterName: "Thermal Properties of Matter",
  title: "Thermal Properties of Matter — JEE Mains Physics",
  intro:
    "Thermal Properties of Matter has 66 past-year questions from 2021 to 2026, and 19 of them ask for a number rather than an option. " +
    "Almost every one is a line or two of arithmetic once the right relation is chosen, and the relations are few: a reading is a fraction of the way between two fixed points, a length grows by αΔT, heat lost equals heat gained, and a heat current behaves like an electric current. " +
    "Marks are lost on small slips: α used for an area or a volume, ice assumed to melt completely, conductivities added for rods in series, and Celsius temperatures put into Stefan's law.",
  subtopicOrder: [
    "jph-thermal-expansion",
    "jph-thermal-calorimetry",
    "jph-thermal-conduction",
    "jph-thermal-cooling",
  ],
};
