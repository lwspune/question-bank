import type { ChapterNote } from "@/app/notes/_types";

export const JEE_CH_BOND_CHAPTER: ChapterNote = {
  chapterName: "Chemical Bonding and Molecular Structure",
  title: "Chemical Bonding and Molecular Structure — JEE Mains Chemistry",
  intro:
    "Chemical Bonding and Molecular Structure has 176 past-year questions from 2021 to 2026, and 54 of them ask for a number rather than an option. " +
    "Most of those numbers are counts: how many species in a list are linear, polar or paramagnetic, how many lone pairs sit on a central atom, how many σ and π bonds a chain holds. " +
    "Each count rests on a short routine done the same way every time, so a careful count of electrons and electron pairs is worth more here than any formula. " +
    "The rest of the chapter is orders and exceptions worth knowing by heart, such as NF₃ against NH₃ or O₂⁺ against O₂⁻.",
  subtopicOrder: [
    "jch-bond-lewis",
    "jch-bond-ionic",
    "jch-bond-params",
    "jch-bond-vsepr",
    "jch-bond-shapes",
    "jch-bond-hybrid",
    "jch-bond-mot",
    "jch-bond-dipole",
  ],
};
