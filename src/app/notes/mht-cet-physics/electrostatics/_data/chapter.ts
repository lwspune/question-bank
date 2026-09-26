import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_ELECTROSTATICS_CHAPTER: ChapterNote = {
  chapterName: "Electrostatics",
  title: "Electrostatics — MHT-CET Physics",
  intro:
    "Electrostatics is the largest Physics chapter in the MHT-CET bank: 163 past-year questions, about one in five HARD. " +
    "It runs on a short list of relations — Coulomb's law and the superposition of fields, Gauss's law, V = kq/r with E = −dV/dx, the energy of a group of charges, " +
    "C = ε₀A/d with its series and parallel rules, and U = ½CV². " +
    "The pages follow that order: charges and fields, Gauss's law, the dipole, potential and energy, then three pages on capacitors — combinations, dielectrics, and stored energy. " +
    "Potential is the largest single page, and the three capacitor pages together hold two in five of the chapter's questions. Every PYQ is tagged.",
  cardBlurb:
    "Coulomb's law and field superposition, Gauss's law, the dipole, potential and the energy of charges, then capacitors — combinations, dielectrics and stored energy. MHT-CET Electrostatics with every past-year question tagged.",
  subtopicOrder: [
    "cetp-coulomb-field",
    "cetp-gauss",
    "cetp-dipole",
    "cetp-potential",
    "cetp-capacitance",
    "cetp-dielectrics",
    "cetp-capacitor-energy",
  ],
};
