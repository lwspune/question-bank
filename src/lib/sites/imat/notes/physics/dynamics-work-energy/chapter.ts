import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_PHY_DYN_CHAPTER: ChapterNote = {
  chapterName: "Dynamics, Work and Energy",
  title: "Dynamics, Work and Energy: Forces, Momentum and Energy",
  intro:
    "Dynamics, Work and Energy has 18 past questions since 2011, and the ministry papers from 2023 on have asked 6 of them. " +
    "The ministry questions are one or two steps: a kinetic energy from a speed in km/h, what friction does to mechanical energy, an elastic collision, gravity at a height above the Earth, and the engine force on a car at steady speed and while it accelerates. " +
    "The older papers added balanced beams, which need the principle of moments. " +
    "The difficulty sits in finding the resultant of all the forces before using F = ma, and in remembering that momentum is conserved in every collision while kinetic energy is conserved only in elastic ones.",
  subtopicOrder: [
    "imat-dyn-newton",
    "imat-dyn-forces",
    "imat-dyn-momentum",
    "imat-dyn-work-energy",
    "imat-dyn-conservation-power",
    "imat-dyn-moments",
  ],
};
