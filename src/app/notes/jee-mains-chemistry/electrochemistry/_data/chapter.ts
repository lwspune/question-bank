import type { ChapterNote } from "@/app/notes/_types";

export const JEE_CH_ELEC_CHAPTER: ChapterNote = {
  chapterName: "Electrochemistry",
  title: "Electrochemistry — JEE Mains Chemistry",
  intro:
    "Electrochemistry has 125 past-year questions from 2021 to 2026, and more than half of them ask for a number rather than a choice of option. " +
    "The Nernst equation alone carries about a quarter of the chapter, so the sign of its log term must be automatic. " +
    "Most of the numericals need only a handful of relations: E°cell as cathode minus anode, the Nernst correction, ΔG° = −nFE°, Λm = 1000κ/c with Kohlrausch's law, and Faraday's m = MIt/nF. " +
    "The rest is recall: the electrochemical series, what forms at each electrode, and the named batteries, whose questions are all multiple choice.",
  subtopicOrder: [
    "jch-elec-cells",
    "jch-elec-nernst",
    "jch-elec-energetics",
    "jch-elec-conductance",
    "jch-elec-kohlrausch",
    "jch-elec-electrolysis",
    "jch-elec-batteries",
  ],
};
