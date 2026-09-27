import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_SEMI_CHAPTER: ChapterNote = {
  chapterName: "Semiconductor Devices",
  title: "Semiconductor Devices — MHT-CET Physics",
  intro:
    "Semiconductor Devices has 127 past-year questions in the MHT-CET bank and only a handful are HARD, but more than a third of them hang on a drawing — a logic circuit, a diode network, a biased junction. " +
    "The pages run from the material to the devices: energy bands and doping, the p-n junction, diode circuits and rectifiers, the special-purpose diodes, the transistor, and logic gates. " +
    "For the figure questions the method matters more than memory: decide each diode's bias, or carry 0s and 1s through each gate, before looking at the options. Every PYQ is tagged.",
  cardBlurb:
    "Energy bands and doping, the p-n junction and its biasing, diode circuits and rectifiers, Zener, LED, photodiode and solar cell, the transistor and CE amplifier, and logic gates — MHT-CET Semiconductor Devices with every past-year question tagged.",
  subtopicOrder: [
    "cetp-band-theory",
    "cetp-pn-junction",
    "cetp-diode-circuits",
    "cetp-special-diodes",
    "cetp-transistors",
    "cetp-logic-gates",
  ],
};
