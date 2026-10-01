import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_WAVE_CHAPTER: ChapterNote = {
  chapterName: "Waves",
  title: "Waves — JEE Mains Physics",
  intro:
    "Waves has 80 past-year questions from 2021 to 2026, and 40 of them ask for a number rather than an option. " +
    "Most are short: read ω and k off an equation, pick the right harmonic formula, or write one Doppler ratio, and the answer follows in two or three lines. " +
    "The work is in the bookkeeping. Marks are lost on a k left in cm⁻¹ when the speed is asked in m/s, on counting overtones as if they were harmonics in a closed pipe, on a temperature left in °C, and on a Doppler sign set the wrong way round.",
  subtopicOrder: [
    "jph-wave-equation",
    "jph-wave-speed",
    "jph-wave-strings",
    "jph-wave-pipes",
    "jph-wave-beats-doppler",
  ],
};
