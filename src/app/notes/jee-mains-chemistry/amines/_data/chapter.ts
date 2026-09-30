import type { ChapterNote } from "@/app/notes/_types";

export const JEE_CH_AMINE_CHAPTER: ChapterNote = {
  chapterName: "Amines",
  title: "Amines — JEE Mains Chemistry",
  intro:
    "Amines has 160 past-year questions from 2021 to 2026, and 24 of them ask for a number. " +
    "The numbers are short stoichiometry: grams of acetanilide or dye from a given mass of aniline, litres of nitrogen from an aliphatic amine, the percentage of nitrogen in a product, or how many amines in a list pass a test. " +
    "Everything else turns on one lone pair: how freely it takes a proton, how strongly it activates a benzene ring, and what becomes of the nitrogen once it is a diazonium ion. " +
    "Multistep sequences are common, so learn each reagent together with the carbon count and the ring position it leaves behind.",
  subtopicOrder: [
    "jch-amine-basic",
    "jch-amine-prep",
    "jch-amine-hofmann",
    "jch-amine-nreact",
    "jch-amine-tests",
    "jch-amine-eas",
    "jch-amine-diazo",
    "jch-amine-azo",
  ],
};
