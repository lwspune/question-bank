import type { ChapterNote } from "@/app/notes/_types";

export const NEET_PH_AC_CHAPTER: ChapterNote = {
  chapterName: "Alternating Current",
  title: "Alternating Current: NEET Physics",
  intro:
    "Alternating Current has 18 past-year questions in NEET Physics, from 2021 to 2026: 5 EASY, 13 MODERATE and none HARD. " +
    "Every one of the eight papers asked it, one to four times each. " +
    "Almost all of them are short calculations from a handful of formulas: the rms value, the two reactances, the impedance of a series circuit, the resonant frequency and the transformer's turns ratio. " +
    "Marks are lost on small slips: a peak value used where an rms value was meant, an angular frequency in rad/s read as hertz, or the inductor's and capacitor's reactances added instead of subtracted. " +
    "Work through the pages in order, from the single sine wave to the full circuit and then the transformer.",
  cardBlurb:
    "Peak and rms values, the reactance of an inductor and a capacitor, impedance and resonance in a series LCR circuit, power factor, LC oscillations and transformers.",
  subtopicOrder: ["nph-ac-reactance", "nph-ac-lcr", "nph-ac-transformer"],
};
