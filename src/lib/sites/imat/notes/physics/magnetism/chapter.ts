import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_PHY_MAG_CHAPTER: ChapterNote = {
  chapterName: "Magnetism",
  title: "Magnetism: Fields, Forces and Induction",
  intro:
    "Magnetism has 4 past questions since 2011, and the ministry papers from 2023 on have asked 1 of them. " +
    "The questions are mostly reasoning rather than arithmetic: deciding whether something can be repelled by a magnet, which way an induced current flows, or what a magnetic field does to a moving charge. " +
    "The difficulty sits in the direction rules and in a few exact facts, such as a magnetic force never changing a particle's speed. " +
    "Learn the handful of formulas as proportions, because the options usually test how one quantity scales with another.",
  subtopicOrder: ["imat-mag-fields", "imat-mag-induction"],
};
