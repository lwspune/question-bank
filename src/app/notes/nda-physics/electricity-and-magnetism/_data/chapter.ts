import type { ChapterNote } from "@/app/notes/_types";

export const ELECTRICITY_AND_MAGNETISM_CHAPTER: ChapterNote = {
  chapterName: "Electricity and Magnetism",
  title: "Electricity and Magnetism — NDA Physics",
  intro:
    "Electricity and Magnetism is the single biggest chapter in NDA Physics — 93 PYQs across 2017–2026 and the bank's #1 HARD pool. " +
    "It teaches in four movements that follow the physics itself: " +
    "(1) Electrostatics — charges at rest: what charge is, how things get charged, Coulomb's law, the electric field, potential, and how conductors behave (shielding, lightning rods); " +
    "(2) Current electricity — charges in motion: current and Ohm's law, resistance and resistivity, series-parallel networks, electrical power and heating, and cells with EMF and Kirchhoff's laws; " +
    "(3) Magnetism — moving charges make fields: magnets and field lines, the magnetic field of a current (wire, solenoid, coil), and the force a field exerts back on a moving charge or a current (Fleming's rules); " +
    "(4) Devices and safety — the recall layer: heating elements, fuses, transformers, generators, and household wiring. " +
    "The marquee subtopic is Combination of Resistors (16 q at 38% HARD) — master series-parallel reduction and you own the chapter's hardest marks. " +
    "Drill the formula, drill the table, walk out with the marks.",
  subtopicOrder: [
    "em-electrostatics",
    "em-current-and-ohms-law",
    "em-resistance-and-resistivity",
    "em-resistor-combinations",
    "em-power-and-energy",
    "em-cells-and-kirchhoff",
    "em-magnetism-and-effects",
    "em-magnetic-force",
    "em-electrical-devices",
  ],
};
