import type { ChapterNote } from "@/app/notes/_types";

export const NEET_CH_CK_CHAPTER: ChapterNote = {
  chapterName: "Chemical Kinetics",
  title: "Chemical Kinetics: NEET Chemistry",
  intro:
    "Chemical Kinetics has 19 past-year questions in NEET Chemistry, from 2021 to 2026: 4 EASY, 13 MODERATE and 2 HARD. " +
    "Every one of the eight papers asked it, two or three times each, and 13 of the 19 are from 2024 or later. " +
    "Ten of them are about temperature: the Arrhenius equation, its plot and activation energy. " +
    "Eleven need a short calculation, usually with logs, and six come with a plot or an energy profile to read. " +
    "Marks are lost on small slips: log used where ln belongs, Celsius left unconverted to kelvin, or the amount reacted put in place of the amount left. " +
    "Work through the pages in order, from what a rate is to how temperature changes it.",
  cardBlurb:
    "The rate of a reaction, rate laws, order, molecularity and the units of k, zero-order and first-order reactions with their half-lives and plots, and activation energy, catalysts and the Arrhenius equation.",
  subtopicOrder: ["nch-ck-rate", "nch-ck-integrated", "nch-ck-temperature"],
};
