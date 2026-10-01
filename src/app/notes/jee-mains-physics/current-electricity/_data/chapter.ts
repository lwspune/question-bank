import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_CE_CHAPTER: ChapterNote = {
  chapterName: "Current Electricity",
  title: "Current Electricity — JEE Mains Physics",
  intro:
    "Current Electricity has 230 past-year questions from 2021 to 2026, and 98 of them ask for a number rather than an option. " +
    "Nearly half come with a figure, most of them circuits, so the first skill is redrawing: name the junctions, merge points joined by plain wire, and look for symmetry or a balanced bridge before writing any equation. " +
    "After that, most questions need one of three tools: Ohm's law with the series and parallel rules, Kirchhoff's two laws, or a ratio at balance in a meter bridge or potentiometer. " +
    "Marks are lost on small things: a cell's internal resistance left out of the total, a stretched wire's resistance scaled by n instead of n², a real voltmeter read as if it were ideal, or a current given to a capacitor branch in steady state.",
  subtopicOrder: [
    "jph-ce-current",
    "jph-ce-resistance",
    "jph-ce-networks",
    "jph-ce-kirchhoff",
    "jph-ce-cells",
    "jph-ce-instruments",
    "jph-ce-power",
    "jph-ce-rc-lr",
  ],
};
