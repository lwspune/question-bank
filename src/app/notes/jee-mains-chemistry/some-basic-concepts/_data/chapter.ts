import type { ChapterNote } from "@/app/notes/_types";

export const JEE_CH_SBC_CHAPTER: ChapterNote = {
  chapterName: "Some Basic Concepts of Chemistry",
  title: "Some Basic Concepts of Chemistry — JEE Mains Chemistry",
  intro:
    "Some Basic Concepts of Chemistry has 205 past-year questions from 2021 to 2026, and 111 of them ask for a number rather than a choice of option. " +
    "Almost every one is arithmetic on the mole: turn what the stem gives into moles, apply a ratio from a formula or a balanced equation, and turn the answer back into grams, litres or a concentration. " +
    "The bank also files gas laws, oxidation numbers and titrations under this chapter, so they are taught here too. " +
    "Order matters, because concentration needs the mole and titrations need both concentration and the electron counts from redox balancing. " +
    "The ideas are not hard; units, molar volumes and n-factors decide the marks.",
  subtopicOrder: [
    "jch-sbc-mole",
    "jch-sbc-formula",
    "jch-sbc-stoichiometry",
    "jch-sbc-gases",
    "jch-sbc-molarity",
    "jch-sbc-concentration",
    "jch-sbc-redox",
    "jch-sbc-titration",
  ],
};
