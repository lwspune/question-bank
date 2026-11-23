import type { ChapterNote } from "@/app/notes/_types";

export const HSC_PH_AC_CHAPTER: ChapterNote = {
  chapterName: "AC Circuits",
  title: "AC Circuits: Maharashtra HSC Physics",
  intro:
    "AC Circuits has 64 questions in this bank: every exercise and solved example in the Balbharati textbook, and the board's past papers from 2017 to 2026. " +
    "Twenty-five were set in board papers, fifteen of them from 2024 to 2026, and all but five ask for a written answer. " +
    "The board's favourite is the impedance of a series LCR circuit, derived with a phasor diagram, followed by the average power, the resonant frequency, and definitions of reactance and impedance. " +
    "The calculations are short: read the peak value and frequency from e = e₀ sin ωt, find a reactance, then a current. " +
    "Marks go to the labelled phasor diagram, the formula, the substitution with units, and the answer with its unit. " +
    "Learn the phase of current against voltage for each element first, because every later idea is built on it.",
  cardBlurb:
    "Average and rms values, phasors and reactance, the impedance of a series LCR circuit, average power and power factor, LC oscillations, and series and parallel resonance with the Q factor.",
  subtopicOrder: ["hscp-ac-rms", "hscp-ac-phasors", "hscp-ac-power", "hscp-ac-lc", "hscp-ac-resonance"],
};
