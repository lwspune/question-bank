import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_AC_CHAPTER: ChapterNote = {
  chapterName: "Alternating Current",
  title: "Alternating Current — JEE Mains Physics",
  intro:
    "Alternating Current has 113 past-year questions from 2021 to 2026, and 38 of them ask for a number rather than an option. " +
    "More than half are about the series LCR circuit and its resonance, and they rest on three facts: meters and ratings give rms values, an inductor's reactance rises with frequency while a capacitor's falls, and voltages and reactances in series combine at right angles rather than by plain addition. " +
    "The arithmetic is short once those are in place. Marks are lost on mixing peak and rms values, on using f where ω belongs, and on a transformer ratio turned upside down.",
  subtopicOrder: [
    "jph-ac-rms",
    "jph-ac-reactance",
    "jph-ac-impedance",
    "jph-ac-resonance",
    "jph-ac-lc-transformer",
  ],
};
