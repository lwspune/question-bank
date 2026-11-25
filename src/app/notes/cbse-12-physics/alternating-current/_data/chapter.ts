import type { ChapterNote } from "@/app/notes/_types";

export const CB_PH_AC_CHAPTER: ChapterNote = {
  chapterName: "Alternating Current",
  title: "Alternating Current: CBSE Class 12 Physics",
  intro:
    "Alternating Current has 97 questions in this bank: every example and exercise in the NCERT chapter, and CBSE's board papers from 2023 to 2026. " +
    "Seventy-nine were set in board papers, between sixteen and twenty-two in each year, as one-mark MCQs and assertion-reason items, short numericals and five-mark long answers. " +
    "The derivations the board asks are the rms value of a current, the current and reactance of a capacitor, the impedance and phase angle of a series LCR circuit from its phasor diagram, the average power, the condition for resonance and the turns ratio of a transformer. " +
    "Marks go to the steps: a labelled phasor diagram, graph or transformer diagram, the formula, the substitution with units, the answer, and a clear statement of whether the current leads or lags. " +
    "Start with the resistor, because every later page uses peak and rms values.",
  cardBlurb:
    "Peak, rms and average values, the reactance of an inductor and a capacitor, impedance and resonance in a series LCR circuit, power and the power factor, and the transformer.",
  subtopicOrder: ["cbp-ac-resistor", "cbp-ac-reactance", "cbp-ac-lcr", "cbp-ac-power", "cbp-ac-transformer"],
};
