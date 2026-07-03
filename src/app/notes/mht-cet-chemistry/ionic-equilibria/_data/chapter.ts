import type { ChapterNote } from "@/app/notes/_types";

export const IONIC_EQUILIBRIA_CHAPTER: ChapterNote = {
  chapterName: "Ionic Equilibria",
  title: "Ionic Equilibria — MHT-CET Chemistry",
  intro:
    "The most heavily tested MHT-CET Chemistry chapter (127 PYQs) — and almost entirely a calculation chapter built on one idea: weak electrolytes only partly ionise, and a handful of equilibrium constants (Ka, Kb, Kw, Ksp) let you predict everything from that. " +
    "It teaches in six movements, foundations first: " +
    "(1) theories of acids and bases — Arrhenius, Bronsted-Lowry and Lewis; " +
    "(2) ionic equilibrium — Ka, Kb, degree of dissociation and Ostwald's dilution law; " +
    "(3) pH, pOH and the ionic product of water Kw; " +
    "(4) salt hydrolysis — the four salt types and their solution pH; " +
    "(5) buffer solutions and the Henderson-Hasselbalch equation; " +
    "(6) the solubility product Ksp — solubility, the common-ion effect and precipitation. " +
    "Formula concepts carry the computational core; the salt-type and Ksp-stoichiometry tables carry the recall. Every PYQ tagged.",
  subtopicOrder: [
    "cetie-acid-base-theories",
    "cetie-ka-kb-dissociation",
    "cetie-ph-poh-kw",
    "cetie-salt-hydrolysis",
    "cetie-buffers",
    "cetie-solubility-product",
  ],
};
