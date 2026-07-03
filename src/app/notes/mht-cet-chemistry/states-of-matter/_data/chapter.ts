import type { ChapterNote } from "@/app/notes/_types";

export const STATES_OF_MATTER_CHAPTER: ChapterNote = {
  chapterName: "States of Matter",
  title: "States of Matter — MHT-CET Chemistry",
  intro:
    "The gas-phase chapter of MHT-CET Chemistry — a compact, calculation-friendly topic (32 PYQs) built on the gas laws and one master equation, PV = nRT. " +
    "It teaches in two movements: " +
    "(1) the gas laws and the ideal gas equation — Boyle's, Charles', Gay-Lussac's and the combined gas law, then PV = nRT with its unit-matched R values; " +
    "(2) real gases, Dalton's law of partial pressures and the kinetic theory of gases — partial pressure from mole fraction, root-mean-square speed, the KTG postulates and van der Waals deviation. " +
    "Almost every question is a one- or two-step plug-in; the recurring traps are units (kelvin, matching R) and remembering that partial pressure tracks moles, not mass. Every PYQ tagged.",
  subtopicOrder: ["cetsom-gas-laws", "cetsom-dalton-ktg"],
};
