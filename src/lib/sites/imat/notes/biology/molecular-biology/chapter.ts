import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_BIO_MOL_CHAPTER: ChapterNote = {
  chapterName: "Molecular Biology and Gene Expression",
  title: "Molecular Biology: DNA, RNA and Protein Synthesis",
  intro:
    "Molecular Biology and Gene Expression has 38 past questions since 2011, and the ministry papers from 2023 on have asked 13 of them. " +
    "The ministry papers mostly ask for definitions and structure facts: what translation or an anticodon is, what an operon is, what DNA and mRNA are made of. " +
    "The older papers added base-pairing arithmetic: Chargaff percentages, counts of hydrogen and phosphodiester bonds, and turning a DNA strand into mRNA, anticodons or a mutant protein. " +
    "The difficulty sits in direction and naming: which end is 5′, which strand is the template, and keeping DNA letters apart from RNA letters.",
  subtopicOrder: [
    "imat-mol-structure",
    "imat-mol-replication",
    "imat-mol-transcription",
    "imat-mol-translation",
    "imat-mol-mutations",
    "imat-mol-regulation",
  ],
};
