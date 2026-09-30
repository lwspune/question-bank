import type { ChapterNote } from "@/app/notes/_types";

export const JEE_AOI_CHAPTER: ChapterNote = {
  chapterName: "Application of Integrals",
  title: "Application of Integrals — JEE Mains Mathematics",
  intro:
    "Application of Integrals has 117 past-year questions from 2021 to 2026, and 41 of them have a numerical answer. " +
    "Every one is the same task — sketch the region, find where its boundaries meet, and integrate top minus bottom — so the pages sort the questions by the boundary that makes that task hard. " +
    "The early pages work with parabolas, lines and conics; the later ones add moduli, min and max, and trigonometric, exponential and log curves, and the last runs the area backwards to find a constant.",
  subtopicOrder: [
    "jee-aoi-vertical",
    "jee-aoi-horizontal",
    "jee-aoi-conics",
    "jee-aoi-modulus",
    "jee-aoi-maxmin",
    "jee-aoi-transcendental",
    "jee-aoi-parameters",
  ],
};
