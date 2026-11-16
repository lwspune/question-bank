import type { ChapterNote } from "@/app/notes/_types";

export const NEET_PH_SE_CHAPTER: ChapterNote = {
  chapterName: "Semiconductor Electronics",
  title: "Semiconductor Electronics: NEET Physics",
  intro:
    "Semiconductor Electronics has 22 past-year questions in NEET Physics, from 2021 to 2026: 6 EASY, 15 MODERATE and 1 HARD. " +
    "Every one of the eight papers asked it, two or three times each. " +
    "Fourteen come with a figure (a circuit of diodes or gates, a waveform or an I-V curve), so the first skill is reading it: which way each diode points, and which gate each symbol stands for. " +
    "The arithmetic is light. Four questions ask you to judge two statements, so the facts about doping, bias and each special diode are worth learning exactly. " +
    "Work through the pages in order, from what makes a semiconductor to the logic gates.",
  cardBlurb:
    "Band gaps and doping, the p-n junction and its bias, diodes in circuits, rectifiers and filters, the Zener diode, the LED, photodiode and solar cell, and the basic logic gates.",
  subtopicOrder: ["nph-se-junction", "nph-se-devices", "nph-se-gates"],
};
