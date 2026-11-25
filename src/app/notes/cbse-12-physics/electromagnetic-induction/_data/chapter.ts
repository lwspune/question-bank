import type { ChapterNote } from "@/app/notes/_types";

export const CB_PH_EI_CHAPTER: ChapterNote = {
  chapterName: "Electromagnetic Induction",
  title: "Electromagnetic Induction: CBSE Class 12 Physics",
  intro:
    "Electromagnetic Induction has 117 questions in this bank: every example and exercise in the NCERT chapter, and CBSE's board papers from 2023 to 2026. " +
    "Ninety-nine were set in board papers, and the board asks this chapter in every format: one-mark MCQs and assertion-reason items, short numericals, a case study and five-mark derivations. " +
    "The derivations to know are the mutual inductance of two coaxial solenoids, the self-inductance of a long solenoid, the energy stored in an inductor, the emf of a rod rotating about one end and the emf of an ac generator. " +
    "Marks go to the steps: a law stated with its condition, the direction of an induced current with the reason from Lenz's law, the formula, the substitution with units, and a labelled diagram or graph where one is asked. " +
    "Faraday's law comes first, because every later page is one more way of changing the flux.",
  cardBlurb:
    "Magnetic flux and Faraday's law, Lenz's law and energy, the motional emf of sliding and rotating rods, mutual and self-inductance with the energy an inductor stores, and the ac generator.",
  subtopicOrder: [
    "cbp-ei-faraday",
    "cbp-ei-lenz",
    "cbp-ei-motional",
    "cbp-ei-inductance",
    "cbp-ei-generator",
  ],
};
