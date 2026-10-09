import type { ChapterNote } from "@/app/notes/_types";

export const IMAT_LOG_CRT_CHAPTER: ChapterNote = {
  chapterName: "Critical Thinking",
  title: "Critical Thinking: Arguments, Assumptions and Flaws",
  intro:
    "Critical Thinking has 119 past questions since 2011, and the ministry papers from 2023 on have asked 2 of them. " +
    "Almost all of them come from the Cambridge papers, where each item was a short argument followed by one question about its conclusion, its hidden assumption, its flaw, or the fact that would make it stronger or weaker. " +
    "No outside knowledge is needed: the work is reading closely and testing every option against the passage alone. " +
    "The difficulty sits in the options, which reuse the passage's own words and differ from the right answer by one small step too far.",
  subtopicOrder: [
    "imat-crt-structure",
    "imat-crt-inference",
    "imat-crt-assumptions",
    "imat-crt-evaluate",
    "imat-crt-flaws",
    "imat-crt-patterns",
  ],
};
