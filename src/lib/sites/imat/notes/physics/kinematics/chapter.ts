import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_PHY_KIN_CHAPTER: ChapterNote = {
  chapterName: "Kinematics",
  title: "Kinematics: Describing Motion",
  intro:
    "Kinematics has 8 past questions since 2011, and the ministry papers from 2023 on have asked 4 of them. " +
    "The ministry questions are short: a definition, an average velocity from two legs of a journey, or whether one car catches another in a given time. " +
    "The work is reading the motion carefully, keeping displacement apart from distance, and converting km/h to m/s before any formula. " +
    "Most wrong options come from adding vectors as plain numbers or from using a constant-acceleration equation where the acceleration is not constant.",
  subtopicOrder: ["imat-kin-describing", "imat-kin-accelerated", "imat-kin-projectile-circular"],
};
