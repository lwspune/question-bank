import type { ChapterNote } from "@/app/notes/_types";

export const NEET_CH_SA_CHAPTER: ChapterNote = {
  chapterName: "Structure of Atom",
  title: "Structure of Atom: NEET Chemistry",
  intro:
    "Structure of Atom has 15 past-year questions in NEET Chemistry, from 2021 to 2026: 4 EASY, 9 MODERATE and 2 HARD. " +
    "Every one of the eight papers asked it, and 9 of the 15 are from 2024 or later. " +
    "Six of them ask for a number: a wavelength, a count of photons, the radius or energy of a Bohr orbit, or a ratio of wavelengths. Each needs one formula and one scaling rule, so marks are lost on small slips: Z used where Z² belongs, a power of ten dropped in a unit change, or a ratio of wavelengths left upside down. " +
    "The rest test rules you can learn once: what each quantum number tells, how many nodes an orbital has, and the order in which orbitals fill. " +
    "Work through the pages in order, from the particles in an atom to its electronic configuration.",
  cardBlurb:
    "Subatomic particles and isotopes, wavelength and photons, the Bohr model and the hydrogen spectrum, quantum numbers, the shapes and nodes of orbitals, and filling orbitals by the (n + l) rule, Pauli's principle and Hund's rule.",
  subtopicOrder: ["nch-sa-particles", "nch-sa-bohr", "nch-sa-orbitals"],
};
