import type { ChapterNote } from "@/app/notes/_types";

export const NEET_PH_MM_CHAPTER: ChapterNote = {
  chapterName: "Magnetism and Matter",
  title: "Magnetism and Matter: NEET Physics",
  intro:
    "Magnetism and Matter has 8 past-year questions in NEET Physics, from 2023 to 2024: 2 EASY, 4 MODERATE and 2 HARD. " +
    "Only three of the eight papers asked it: NEET 2023 once, NEET 2024 three times and Re-NEET 2024 four times; none since 2024. " +
    "The questions are short. Six are about a bar magnet: the moment left after bending it, its energy and oscillations in a uniform field, and the zero net flux through a closed surface. Two ask for the exact ranges of susceptibility that set diamagnetic, paramagnetic and ferromagnetic materials apart. " +
    "Marks are lost on small slips: a bent magnet given its old length, an oscillation period turned upside down, or a diamagnet's relative permeability taken as negative. " +
    "The magnetic moment of a current loop is taught in Moving Charges and Magnetism; this chapter starts from the bar magnet.",
  cardBlurb:
    "The bar magnet as a dipole, bent magnets, torque, energy and oscillations in a uniform field, Gauss's law for magnetism, magnetisation and susceptibility, and diamagnetic, paramagnetic and ferromagnetic materials.",
  subtopicOrder: ["nph-mm-dipole", "nph-mm-materials"],
};
