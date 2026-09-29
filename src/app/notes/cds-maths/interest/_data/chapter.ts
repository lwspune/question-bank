import type { ChapterNote } from "@/app/notes/_types";

export const CDS_INTEREST_CHAPTER: ChapterNote = {
  chapterName: "Simple and Compound Interest",
  title: "Simple and Compound Interest — CDS Elementary Mathematics",
  intro:
    "Simple and Compound Interest has 34 past-year questions in CDS Elementary Mathematics, in 20 of the twenty-one sittings from 2016 (II) to 2026 (II). " +
    "Simple and compound interest account for 13 each, and five are HARD: nearly every one is SI = PRT/100 or A = P(1 + r)ⁿ read in the right direction. " +
    "The pages go from simple interest to compound interest and end with the CI − SI gap and instalments.",
  cardBlurb:
    "Simple interest, compound interest with half-yearly and quarterly periods, doubling times, the CI minus SI gap, and equal instalments.",
  subtopicOrder: [
    "cds-in-simple",
    "cds-in-compound",
    "cds-in-difference",
  ],
};
