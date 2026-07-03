import type { ChapterNote } from "@/app/notes/_types";

export const CHEMICAL_BONDING_CHAPTER: ChapterNote = {
  chapterName: "Chemical Bonding and Molecular Structure",
  title: "Chemical Bonding and Molecular Structure — MHT-CET Chemistry",
  intro:
    "How atoms join and what shape the result takes — a heavily tested MHT-CET chapter (65 PYQs) that rewards a few master tables (VSEPR shapes, hybridization, molecular-orbital filling) plus one clean formula (bond order). " +
    "It teaches in five movements, foundations first: " +
    "(1) ionic and covalent bonding — the octet rule, Lewis structures, Fajans' rules and formal charge; " +
    "(2) hybridization — the steric-number method (sp, sp², sp³, sp³d, sp³d²) and bond angles; " +
    "(3) VSEPR theory — predicting molecular geometry from bond pairs and lone pairs; " +
    "(4) molecular orbital theory — bond order = ½(N_b − N_a), magnetic behaviour and stability; " +
    "(5) dipole moment, polarity and intermolecular forces — why symmetric molecules are non-polar, and hydrogen bonding. " +
    "The shape, hybridization, MOT and IMF tables carry the recall load; bond order and dipole moment carry the computation. Every PYQ tagged.",
  subtopicOrder: [
    "cetcb-ionic-covalent-lewis",
    "cetcb-hybridization",
    "cetcb-vsepr-geometry",
    "cetcb-mot-bond-order",
    "cetcb-polarity-imf",
  ],
};
