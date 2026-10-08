import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_BIO_CDR_CHAPTER: ChapterNote = {
  chapterName: "Cell Division and Reproduction",
  title: "Cell Division and Reproduction: Mitosis, Meiosis and Gametes",
  intro:
    "Cell Division and Reproduction has 19 past questions since 2011, and the ministry papers from 2023 on have asked 1 of them. " +
    "Almost every question is about mitosis or meiosis: putting the stages in order, naming the stage a description shows, or counting chromosomes, chromatids and DNA at a given moment. " +
    "The difficulty is bookkeeping, not memory. Most wrong options count chromatids as chromosomes, call a cell diploid because its DNA has doubled, or swap what separates in meiosis I with what separates in meiosis II. " +
    "Learn the counts for one species and you can redo them for any species in the exam.",
  subtopicOrder: ["imat-cdr-cell-cycle", "imat-cdr-meiosis", "imat-cdr-gametes", "imat-cdr-reproduction"],
};
