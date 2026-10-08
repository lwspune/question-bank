import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_BIO_CSM_CHAPTER: ChapterNote = {
  chapterName: "Cell Structure and Membranes",
  title: "Cell Structure and Membranes",
  intro:
    "Cell Structure and Membranes has 45 past questions since 2011, and the ministry papers from 2023 on have asked 15 of them. " +
    "The ministry items are short recall: one fact about an organelle, the membrane or a transport protein, chosen from five close options. " +
    "The older papers asked the same facts inside \"which statements are correct\" lists, and added magnification sums and concentration data. " +
    "The difficulty is in near misses: a structure with RNA but no DNA, a pH on the wrong side of 7, a membrane counted once too often, a carrier protein that is not always active.",
  subtopicOrder: [
    "imat-csm-cells-size",
    "imat-csm-membrane",
    "imat-csm-transport",
    "imat-csm-endomembrane",
    "imat-csm-organelles",
    "imat-csm-cell-types",
  ],
};
