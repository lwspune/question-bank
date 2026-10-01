import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_OSC_CHAPTER: ChapterNote = {
  chapterName: "Oscillations",
  title: "Oscillations — JEE Mains Physics",
  intro:
    "Oscillations has 120 past-year questions from 2021 to 2026, and 38 of them ask for a number rather than an option. " +
    "Nearly all of it is one motion, simple harmonic motion, and almost every question comes down to two numbers, ω and the amplitude, from which a phase, a time, a speed or an energy follows in a line or two. " +
    "The harder step is usually finding ω for a new set-up: a cut spring, a block between two springs, a lift, a height above the earth. Marks are lost on a factor: springs read as series when they act in parallel, half the amplitude taken as half the time, or a height R taken as a distance R from the centre.",
  subtopicOrder: [
    "jph-osc-kinematics",
    "jph-osc-timing",
    "jph-osc-springs",
    "jph-osc-pendulum",
    "jph-osc-energy",
  ],
};
