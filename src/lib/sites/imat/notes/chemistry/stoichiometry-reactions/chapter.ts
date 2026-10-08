import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_CHE_STO_CHAPTER: ChapterNote = {
  chapterName: "Stoichiometry and Reactions",
  title: "Stoichiometry: Moles, Equations and Yield",
  intro:
    "Stoichiometry and Reactions has 22 past questions since 2011, and the ministry papers from 2023 on have asked 4 of them. " +
    "Almost every question is a short calculation built on one chain: mass to moles, moles through the ratio in a balanced equation, then back to mass or to a number of particles. " +
    "The ministry papers asked for a percentage yield, the reactant that runs out first, and the number of atoms in a small mass of gas. " +
    "The difficulty is in the bookkeeping, not the chemistry: a two-atom molecule, a coefficient that is not 1, or a reactant left over at the end.",
  subtopicOrder: [
    "imat-sto-mole",
    "imat-sto-formulas",
    "imat-sto-equations",
    "imat-sto-types",
    "imat-sto-reacting",
  ],
};
