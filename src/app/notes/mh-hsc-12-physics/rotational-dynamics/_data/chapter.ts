import type { ChapterNote } from "@/app/notes/_types";

export const HSC_PH_RD_CHAPTER: ChapterNote = {
  chapterName: "Rotational Dynamics",
  title: "Rotational Dynamics: Maharashtra HSC Physics",
  intro:
    "Rotational Dynamics has 96 questions in this bank: every exercise and solved example in the Balbharati textbook, and the board's past papers from 2016 to 2026. " +
    "Fifty-six were set in board papers, twenty-two of them from 2024 to 2026, and all but twelve ask for a written answer. " +
    "The board likes derivations here: the maximum speed on a level road, the least speeds in a vertical circle, the moment of inertia of a disc, the kinetic energy of a rolling body, and the proofs of the two axes theorems and of the conservation of angular momentum. " +
    "For a derivation, marks go to a labelled diagram and every step in order. For a numerical, they go to the formula, the substitution with units and the answer with its unit. " +
    "Circular motion comes first, and the rotation of rigid bodies builds on moment of inertia, so take the pages in order.",
  cardBlurb:
    "Circular motion on level and banked roads, in a well of death and in a vertical circle, then moment of inertia, the axes theorems, torque, angular momentum and rolling.",
  subtopicOrder: [
    "hscp-rd-kinematics",
    "hscp-rd-applications",
    "hscp-rd-vertical",
    "hscp-rd-moi",
    "hscp-rd-axes",
    "hscp-rd-torque",
    "hscp-rd-conservation",
    "hscp-rd-rolling",
  ],
};
