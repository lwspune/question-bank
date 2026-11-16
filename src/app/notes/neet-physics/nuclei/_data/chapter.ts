import type { ChapterNote } from "@/app/notes/_types";

export const NEET_PH_NU_CHAPTER: ChapterNote = {
  chapterName: "Nuclei",
  title: "Nuclei: NEET Physics",
  intro:
    "Nuclei has 11 past-year questions in NEET Physics, from 2021 to 2026: 5 EASY, 5 MODERATE and 1 HARD. " +
    "Seven of the eight papers asked it, one to three times each; NEET 2025 did not. " +
    "None of the 11 comes with a figure, and most take one or two steps: a cube root for a radius, a multiplication by 931.5 for an energy, a count of half-lives. " +
    "Marks are lost on small slips: a nucleus's volume taken to grow as the cube root of A instead of as A, binding energies per nucleon subtracted without first multiplying by A, or beta-minus and beta-plus moving Z the wrong way. " +
    "Work through the pages in order, from the size of a nucleus to the energy it can release and the ways it decays.",
  cardBlurb:
    "The size and density of a nucleus, mass defect and binding energy, Q values, fission, fusion and reactors, alpha, beta and gamma decay, and half-life and activity.",
  subtopicOrder: ["nph-nu-size", "nph-nu-energy", "nph-nu-decay"],
};
