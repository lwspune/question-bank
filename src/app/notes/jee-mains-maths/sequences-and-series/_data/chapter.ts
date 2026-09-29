import type { ChapterNote } from "@/app/notes/_types";

export const JEE_SEQUENCES_CHAPTER: ChapterNote = {
  chapterName: "Sequences and Series",
  title: "Sequences and Series — JEE Mains Mathematics",
  intro:
    "Sequences and Series has 221 past-year questions from 2021 to 2026, between 29 and 47 in every year. " +
    "The pages start with arithmetic and geometric progressions, then the conditions and means that join them, then infinite geometric series. " +
    "The second half is about adding up series that are not progressions: standard sums, telescoping, and arithmetico-geometric and exponential series.",
  subtopicOrder: [
    "jee-seq-ap",
    "jee-seq-common",
    "jee-seq-gp",
    "jee-seq-means",
    "jee-seq-infinite-gp",
    "jee-seq-sigma",
    "jee-seq-telescoping",
    "jee-seq-agp",
  ],
};
