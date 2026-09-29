import type { ChapterNote } from "@/app/notes/_types";

export const CDS_STATISTICS_CHAPTER: ChapterNote = {
  chapterName: "Statistics",
  title: "Statistics — CDS Elementary Mathematics",
  intro:
    "Statistics has 80 past-year questions in CDS Elementary Mathematics, from eighteen sittings between 2016 (II) and 2026 (II), and only six of them are HARD. " +
    "Almost the whole chapter is about averages — the mean, median and mode — asked of raw lists, of frequency tables and of grouped classes, often three or four items on one table. " +
    "The pages follow the kind of data: vocabulary and diagrams first, then frequency tables, the mean's properties, the median of a list, grouped data, and finally which average to choose.",
  cardBlurb:
    "Types of data and scales, classes and histograms, cumulative tables, properties of the mean, the median of a list, grouped mean, median and mode, and choosing an average.",
  subtopicOrder: [
    "cds-st-data",
    "cds-st-tables",
    "cds-st-mean",
    "cds-st-median",
    "cds-st-grouped",
    "cds-st-choosing",
  ],
};
