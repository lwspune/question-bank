import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_SEMI_CHAPTER: ChapterNote = {
  chapterName: "Semiconductor Electronics",
  title: "Semiconductor Electronics — JEE Mains Physics",
  intro:
    "Semiconductor Electronics has 145 past-year questions from 2021 to 2026, and 23 of them ask for a number rather than an option. " +
    "Logic gates are close to four questions in ten, and almost all of them are a drawn circuit: write each gate's output, simplify, then read off a gate, a truth table or a waveform. " +
    "Diodes, from the junction itself to the Zener regulator, take about half, and they hold most of the numerical answers. Transistors have had no question since 2023. " +
    "Marks are lost on a direction: a battery read the wrong way round, a diode's bias judged by the sign of a voltage instead of which side is higher, or a Zener assumed to break down without checking.",
  subtopicOrder: [
    "jph-semi-junction",
    "jph-semi-diodes",
    "jph-semi-zener",
    "jph-semi-transistor",
    "jph-semi-gates",
    "jph-semi-tables",
  ],
};
