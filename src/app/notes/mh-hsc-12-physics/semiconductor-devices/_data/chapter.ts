import type { ChapterNote } from "@/app/notes/_types";

export const HSC_PH_SD_CHAPTER: ChapterNote = {
  chapterName: "Semiconductor Devices",
  title: "Semiconductor Devices: Maharashtra HSC Physics",
  intro:
    "Semiconductor Devices has 57 questions in this bank: every exercise and solved example in the Balbharati textbook, and the board's past papers from 2017 to 2026. " +
    "Twenty-seven were set in board papers, and all but seven of those ask for a written answer. " +
    "The board asks you to explain a rectifier with a neat circuit diagram and waveforms, explain how a Zener diode regulates voltage, state the advantages of an LED or a photodiode, derive the relation between the current gains of a transistor, and write the Boolean expression of a logic gate. " +
    "Marks go to a labelled diagram, the bias of each junction stated first, the steps in order and, for a calculation, the formula, the substitution with units and the answer. " +
    "A few older papers asked about p-type and n-type semiconductors and transistor regions that the present book does not teach. The pages say which, so you can give them less time.",
  cardBlurb:
    "Half wave and full wave rectifiers, ripple and filters, the Zener regulator, the photodiode, solar cell and LED, the transistor and its current gains, the common emitter amplifier and logic gates.",
  subtopicOrder: [
    "hscp-sd-rectifier",
    "hscp-sd-ripple",
    "hscp-sd-zener",
    "hscp-sd-optodiodes",
    "hscp-sd-transistor",
    "hscp-sd-amplifier",
    "hscp-sd-gates",
  ],
};
