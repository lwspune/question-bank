import type { ChapterNote } from "@/app/notes/_types";

export const STRUCTURE_OF_ATOM_CHAPTER: ChapterNote = {
  chapterName: "Structure of Atom",
  title: "Structure of Atom — MHT-CET Chemistry",
  intro:
    "The chapter that builds the atom from the inside out — and one of the most reliably tested in MHT-CET Chemistry (71 PYQs). It mixes quick recall (subatomic particles, isotopes, quantum numbers) with a solid core of computation (Bohr radii and energies, de Broglie wavelengths, Rydberg lines). " +
    "It teaches in six movements, foundations first: " +
    "(1) subatomic particles, isotopes, isobars and isoelectronic species; " +
    "(2) electromagnetic radiation and Planck's quantum — c = νλ and E = hν; " +
    "(3) Bohr's model of the hydrogen-like atom — orbit radius, energy and velocity, scaled by Z; " +
    "(4) the hydrogen spectrum and the Rydberg equation — the spectral series; " +
    "(5) the quantum-mechanical model — de Broglie, Heisenberg and the four quantum numbers; " +
    "(6) electronic configuration — Aufbau, Pauli and Hund. " +
    "Formula concepts carry the computational core; the particle table, spectral series and quantum numbers live in reference tables. Every PYQ tagged.",
  subtopicOrder: [
    "cetsoa-subatomic-particles",
    "cetsoa-em-radiation",
    "cetsoa-bohr-model",
    "cetsoa-hydrogen-spectrum",
    "cetsoa-quantum-model",
    "cetsoa-electronic-configuration",
  ],
};
