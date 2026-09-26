import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_AC_CHAPTER: ChapterNote = {
  chapterName: "AC Circuits",
  title: "AC Circuits — MHT-CET Physics",
  intro:
    "AC Circuits has 129 past-year questions in the MHT-CET bank, and only about one in nine is HARD: this is a chapter of steady marks for anyone who knows its handful of relations. " +
    "They are X_L = ωL and X_C = 1/ωC, the impedance Z = √(R² + (X_L − X_C)²) with tan φ = (X_L − X_C)/R, the resonant frequency 1/2π√(LC), and the average power V_rms I_rms cos φ. " +
    "The pages build in that order, from a single element to the full series circuit, then resonance and power, and end with LC oscillations, the transformer and the generator. Every PYQ is tagged.",
  cardBlurb:
    "Peak and r.m.s. values, reactance, series LCR impedance and phase, resonance and the quality factor, power factor and wattless current, LC oscillations, the transformer and the generator — MHT-CET AC Circuits with every past-year question tagged.",
  subtopicOrder: [
    "cetp-ac-basics",
    "cetp-reactance",
    "cetp-lcr-impedance",
    "cetp-resonance",
    "cetp-ac-power",
    "cetp-lc-transformer",
  ],
};
