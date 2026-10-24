import type { ChapterNote } from "@/app/notes/_types";

export const AF_CL_CHAPTER: ChapterNote = {
  chapterName: "Clock",
  title: "Clock: AFCAT Numerical Ability",
  intro:
    "Clock is a small chapter of 147 practice questions, about half of them EASY, and none yet from an AFCAT paper. " +
    "Almost all of it grows from two speeds: the minute hand turns 6° a minute and the hour hand half a degree, so the minute hand gains 5.5° every minute. " +
    "That one fact gives the angle at any time, the moments when the hands meet or stand at a given angle, and how often that happens in a day. " +
    "The hardest questions run the angle formula backwards and need both of its answers. Mirror images and faulty clocks need no angles at all: one is a subtraction from 11:60, the other a rate per hour.",
  cardBlurb:
    "Hand speeds, the angle at any time, when the hands coincide, oppose or form an angle, mirror images and clocks that gain or lose.",
  subtopicOrder: ["af-cl-speeds", "af-cl-angle", "af-cl-given", "af-cl-mirror", "af-cl-faulty"],
};
