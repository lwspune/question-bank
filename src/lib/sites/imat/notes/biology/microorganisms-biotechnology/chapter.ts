import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_BIO_MBT_CHAPTER: ChapterNote = {
  chapterName: "Microorganisms and Biotechnology",
  title: "Microorganisms and Biotechnology: Microbes, Viruses and Gene Technology",
  intro:
    "Microorganisms and Biotechnology has 19 past questions since 2011, and the ministry papers from 2023 on have asked 5 of them. " +
    "Almost all of them test recall: one fact about a bacterial cell or a virus, or which enzyme does which job, often in a 'which statements are correct' format. " +
    "The ministry papers have so far kept to single facts about prokaryotic cells and the enzymes of gene technology. " +
    "The few calculations (fragments of a cut plasmid, doubling of bacteria and of PCR copies) are short but trap-laden: a circle cut n times gives n pieces, and growth multiplies by powers of two.",
  subtopicOrder: [
    "imat-mbt-bacteria",
    "imat-mbt-viruses",
    "imat-mbt-microbes-disease",
    "imat-mbt-recombinant",
    "imat-mbt-dna-analysis",
    "imat-mbt-applications",
  ],
};
