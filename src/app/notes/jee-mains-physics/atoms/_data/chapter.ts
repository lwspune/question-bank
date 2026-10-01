import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_ATOM_CHAPTER: ChapterNote = {
  chapterName: "Atoms",
  title: "Atoms — JEE Mains Physics",
  intro:
    "Atoms has 92 past-year questions from 2021 to 2026, and 29 of them ask for a number rather than an option. " +
    "Most rest on three results of Bohr's model: the radius goes as n²/Z, the speed as Z/n, and the energy as −13.6 Z²/n² eV. " +
    "So many of the questions are ratios that the constants cancel and the working is short. " +
    "Marks are lost on reading the question: the second excited state taken as n = 2, the series limit taken as the longest line, or a photon treated like an electron that can hand over part of its energy. " +
    "Rutherford's scattering experiment and X-rays take only a few questions each.",
  subtopicOrder: [
    "jph-atom-rutherford",
    "jph-atom-orbits",
    "jph-atom-spectra",
    "jph-atom-transitions",
  ],
};
