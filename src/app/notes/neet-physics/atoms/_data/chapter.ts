import type { ChapterNote } from "@/app/notes/_types";

export const NEET_PH_AT_CHAPTER: ChapterNote = {
  chapterName: "Atoms",
  title: "Atoms: NEET Physics",
  intro:
    "Atoms has 11 past-year questions in NEET Physics, from 2022 to 2026: 2 EASY, 6 MODERATE and 3 HARD. " +
    "Seven of the eight papers asked it, once or twice each; only NEET 2021 did not. " +
    "Most need only a line or two of working from a few results: the orbit radius growing as n², the energy as −13.6/n² eV, and the Rydberg formula for the lines of the spectrum. " +
    "Marks are lost on small slips: taking the first excited state as n = 1, mixing up the level a series ends on, or forgetting that a bigger energy jump gives a shorter wavelength. " +
    "Work through the pages in order, from Rutherford's nucleus to Bohr's orbits and the spectrum they explain.",
  cardBlurb:
    "Alpha-particle scattering and Rutherford's nucleus, the energy of an orbiting electron, Bohr's postulates, orbit radius, speed and energy levels, and the hydrogen spectrum with its series.",
  subtopicOrder: ["nph-at-rutherford", "nph-at-bohr", "nph-at-spectrum"],
};
