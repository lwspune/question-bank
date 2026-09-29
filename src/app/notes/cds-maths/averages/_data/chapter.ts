import type { ChapterNote } from "@/app/notes/_types";

export const CDS_AVERAGES_CHAPTER: ChapterNote = {
  chapterName: "Averages",
  title: "Averages — CDS Elementary Mathematics",
  intro:
    "Averages has 47 past-year questions in CDS Elementary Mathematics, in 17 of the twenty-one sittings from 2016 (II) to 2026 (II). " +
    "Working through the total accounts for 20 of them and combining groups for 19, and only four are HARD: turn each mean into a total, and the arithmetic does the rest. " +
    "The pages go from totals to weighted averages and end with averages of consecutive numbers.",
  cardBlurb:
    "Sum equals count times mean, correcting a misread value, combined and weighted averages, the ratio of group sizes, and averages of consecutive numbers.",
  subtopicOrder: [
    "cds-av-totals",
    "cds-av-weighted",
    "cds-av-sequences",
  ],
};
