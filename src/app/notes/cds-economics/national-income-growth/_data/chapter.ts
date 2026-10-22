import type { ChapterNote } from "@/app/notes/_types";

export const CDS_EC_NATIONAL_INCOME_CHAPTER: ChapterNote = {
  chapterName: "National Income, Growth and Development Indicators",
  title: "National Income and Development: CDS Economics",
  intro:
    "National Income, Growth and Development Indicators has 79 past-year questions in CDS General Knowledge, from 2016 (II) to 2026 (II), and 32 of them are HARD. " +
    "It is growing: 24 of the 79 come from the papers of 2024 to 2026, and the two papers of 2026 set ten between them. " +
    "Two kinds of question share the chapter. The concept items ask what a measure includes, who proposed an idea or which curve plots what, and a short chain of definitions answers them. " +
    "The report items quote an index, a survey or a rank, and those figures change, so every rank and figure here carries the year it holds for.",
  cardBlurb:
    "GDP to national income, the macro schools and curves, employment rates, poverty lines and the MPI, the HDI and global rankings, and India's industrial indices and schemes.",
  subtopicOrder: [
    "cdsec-ni-measures",
    "cdsec-ni-theory",
    "cdsec-ni-employment",
    "cdsec-ni-poverty",
    "cdsec-ni-development",
    "cdsec-ni-industry",
  ],
};
