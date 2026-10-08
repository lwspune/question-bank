import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_PHY_MU_CHAPTER: ChapterNote = {
  chapterName: "Measurement and Units",
  title: "Measurement and Units: SI, Dimensions and Vectors",
  intro:
    "Measurement and Units has 5 past questions since 2011, and the ministry papers from 2023 on have asked none of them." +
    "The skills still matter, because every physics calculation on the paper hides a unit conversion or a power of ten. " +
    "The older papers asked which expressions share a unit, which quantity is a vector, and how to order sizes written with different prefixes. " +
    "The difficulty sits in breaking a derived unit into kilograms, metres and seconds, and in squaring or cubing a prefix correctly.",
  subtopicOrder: ["imat-mu-units", "imat-mu-dimensions-vectors"],
};
