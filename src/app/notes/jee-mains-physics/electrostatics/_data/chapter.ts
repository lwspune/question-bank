import type { ChapterNote } from "@/app/notes/_types";

export const JEE_PH_ES_CHAPTER: ChapterNote = {
  chapterName: "Electrostatics",
  title: "Electrostatics — JEE Mains Physics",
  intro:
    "Electrostatics has 251 past-year questions from 2021 to 2026, and 70 of them ask for a number rather than an option. " +
    "Capacitors take 81 of them, about one in three: reducing networks, placing dielectric slabs and sharing charge between two capacitors. " +
    "The rest move from force to field, flux and potential, and most of those are solved with one idea used carefully: add the effects of each charge, or let a symmetry cancel what it can. " +
    "Marks are lost on small things: adding field sizes without their directions, the factor of 2 between a dipole's axial and equatorial fields, a slab put in series when it sits side by side, or energy worked out before asking whether Q or V stays fixed.",
  subtopicOrder: [
    "jph-es-coulomb",
    "jph-es-field",
    "jph-es-gauss",
    "jph-es-potential",
    "jph-es-dipole",
    "jph-es-motion",
    "jph-es-capacitance",
    "jph-es-slabs",
    "jph-es-energy",
  ],
};
