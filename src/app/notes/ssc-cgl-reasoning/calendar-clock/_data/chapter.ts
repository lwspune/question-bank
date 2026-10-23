import type { ChapterNote } from "@/app/notes/_types";

export const SSC_CALENDAR_CLOCK_CHAPTER: ChapterNote = {
  chapterName: "Calendar and Clock",
  title: "Calendar and Clock: SSC CGL Reasoning",
  intro:
    "Calendar and Clock has 9 questions in the SSC CGL Tier I bank, five from the 2023 shifts and four from the 2025 shifts, and all nine are about the calendar: none asks about a clock. " +
    "Seven are EASY and two MODERATE. " +
    "Every one rests on a single fact: the week repeats every 7 days, so only the remainder after dividing by 7 moves the weekday. " +
    "Turn each question into a count of days, take that remainder, and move along the week; done that way, each takes a few seconds.",
  cardBlurb:
    "Counting dates, odd days, the weekday after a number of days or years, month lengths and the leap-year rule.",
  subtopicOrder: ["ssc-rcc-calendar"],
};
