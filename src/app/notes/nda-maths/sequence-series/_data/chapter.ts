import type { ChapterNote } from "@/app/notes/_types";

export const SEQUENCE_SERIES_CHAPTER: ChapterNote = {
  chapterName: "Sequence & Series",
  title: "Sequence & Series — NDA Mathematics",
  intro:
    "Sequence & Series is one of the highest-yield chapters in NDA Mathematics — 89 past-year " +
    "questions across 2017–2026, four to six marks on almost every paper, sitting mostly in the " +
    "EASY–MODERATE band. The whole chapter grows from two engines repeated in richer settings: the " +
    "arithmetic progression (constant difference) and the geometric progression (constant ratio). " +
    "Master those two, add the harmonic progression and the three means, and the rest is the exam's " +
    "favourite trick — turning one kind of progression into another by taking logs or reciprocals. " +
    "Work through the five notes below in order: arithmetic progressions first, then geometric, then " +
    "harmonic progressions and the means, then the interrelating-progressions genre that NDA loves, " +
    "and finally the special sums. Do that and most of the bank becomes one-line substitution.",
  subtopicOrder: [
    "seq-arithmetic-progressions",
    "seq-geometric-progressions",
    "seq-harmonic-means",
    "seq-interrelating-progressions",
    "seq-special-series",
  ],
};
