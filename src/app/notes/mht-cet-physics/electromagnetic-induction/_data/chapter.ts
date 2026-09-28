import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_EMI_CHAPTER: ChapterNote = {
  chapterName: "Electromagnetic Induction",
  title: "Electromagnetic Induction — MHT-CET Physics",
  intro:
    "Electromagnetic Induction has 119 past-year questions in the MHT-CET bank, and only 11 of them are HARD. " +
    "It starts from one idea — a changing magnetic flux drives an e.m.f., in the direction that opposes the change — and applies it to a rod moving through a field, a coil whose own current is changing, and a pair of coils that share flux. " +
    "Self-inductance is the biggest page: how L depends on turns, length and area, the energy an inductor stores, and inductors in series and parallel. Every PYQ is tagged.",
  cardBlurb:
    "Magnetic flux, Faraday's and Lenz's laws, induced charge, motional e.m.f. and rotating rods, self-inductance and the energy it stores, mutual inductance and coupling, and transformers and generators — every MHT-CET past-year question tagged.",
  subtopicOrder: [
    "cetp-emi-faraday-lenz",
    "cetp-emi-motional",
    "cetp-emi-self-inductance",
    "cetp-emi-mutual",
  ],
};
