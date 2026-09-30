import type { ChapterNote } from "@/app/notes/_types";

export const JEE_CH_ORM_CHAPTER: ChapterNote = {
  chapterName: "Organic Reaction Mechanisms",
  title: "Organic Reaction Mechanisms — JEE Mains Chemistry",
  intro:
    "Organic Reaction Mechanisms has 48 past-year questions from 2021 to 2026, and 8 of them ask for a number rather than an option. " +
    "Most of them need two or three organic chapters at once: an addition from one, a named reaction from another, a laboratory test from a third. " +
    "Thirteen are match lists, so a clean table of names, reagents and colours earns as many marks as the mechanisms do. " +
    "For a reaction scheme, count the carbons first, mark the steps that add or remove carbon, and only then follow the functional group through each reagent.",
  subtopicOrder: [
    "jch-orm-additions",
    "jch-orm-carbonyl",
    "jch-orm-roadmaps",
    "jch-orm-named",
    "jch-orm-tests",
  ],
};
