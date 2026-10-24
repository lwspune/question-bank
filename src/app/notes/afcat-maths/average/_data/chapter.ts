import type { ChapterNote } from "@/app/notes/_types";

export const AF_AV_CHAPTER: ChapterNote = {
  chapterName: "Average",
  title: "Average: AFCAT Numerical Ability",
  intro:
    "Average is the largest chapter of AFCAT Numerical Ability here, with 653 questions, and thirteen of them come from AFCAT papers of 2015 to 2019. " +
    "Those past-year questions are short: a man replaced in a group, a weight misread, a cricketer's last four matches, a family's ages, a year of household spending. " +
    "Nearly all of them, and most of the practice questions, come down to one move: turn an average into a total, change the total, and divide by the new count. " +
    "The pages teach that move first and then the stories it is used in. The HARD questions gather towards the end, where groups leave and join at once or a percentage decides who counts.",
  cardBlurb:
    "Totals and missing values, consecutive numbers and first-n formulas, values added, removed, replaced or misread, groups and overlaps, weighted and percentage averages, extremes, cricket and ages.",
  subtopicOrder: [
    "af-av-basics",
    "af-av-consecutive",
    "af-av-single",
    "af-av-groups",
    "af-av-joining",
    "af-av-weighted",
    "af-av-extremes",
    "af-av-cricket",
    "af-av-ages",
  ],
};
