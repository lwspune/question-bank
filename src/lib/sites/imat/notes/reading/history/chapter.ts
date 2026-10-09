import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_REA_HIS_CHAPTER: ChapterNote = {
  chapterName: "History",
  title: "History: A Revision Checklist from Antiquity to the European Union",
  intro:
    "History has 23 past questions since 2011, and the ministry papers from 2023 on have asked 2 of them. " +
    "There is no fixed syllabus, so every question is pure recall of something a European secondary school student is expected to know: a date, a name, a treaty, the author of a famous work. " +
    "The ministry questions so far have been about ancient Rome and the late Middle Ages, while the older papers leaned heavily on the history of science and medicine. " +
    "The difficulty is breadth, not depth: learn one anchor date and one fact per event in the tables, and use the dates to answer the ordering and odd-one-out questions.",
  subtopicOrder: [
    "imat-his-ancient",
    "imat-his-medieval",
    "imat-his-revolutions",
    "imat-his-twentieth",
    "imat-his-science",
  ],
};
