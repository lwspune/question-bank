import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_CHE_BND_CHAPTER: ChapterNote = {
  chapterName: "Chemical Bonding",
  title: "Chemical Bonding: Bonds, Shapes and Forces",
  intro:
    "Chemical Bonding has 24 past questions since 2011, and the ministry papers from 2023 on have asked 5 of them. " +
    "Almost none of them need a calculation: they ask you to classify a bond, predict a shape, decide whether a molecule is polar, or explain a boiling point. " +
    "The difficulty sits in chains of reasoning, because polarity depends on shape, and shape depends on lone pairs you have to count first. " +
    "The commonest wrong answers confuse the forces between molecules with the bonds inside them, so keep those two ideas apart throughout.",
  subtopicOrder: [
    "imat-bnd-types",
    "imat-bnd-lewis",
    "imat-bnd-shapes",
    "imat-bnd-forces",
    "imat-bnd-structures",
  ],
};
