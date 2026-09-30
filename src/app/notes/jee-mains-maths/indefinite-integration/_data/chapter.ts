import type { ChapterNote } from "@/app/notes/_types";

export const JEE_INDEFINITE_INTEGRATION_CHAPTER: ChapterNote = {
  chapterName: "Indefinite Integration",
  title: "Indefinite Integration — JEE Mains Mathematics",
  intro:
    "Indefinite Integration has 46 past-year questions from 2021 to 2026, and 14 of them ask for a numerical answer. " +
    "Most go one step past the antiderivative: a given value fixes the constant, or the answer is matched to a printed form to read off a coefficient. " +
    "The first three pages reduce an integrand to a standard form by substitution, splitting or completing a square; the last page covers integration by parts and integrands that are already a derivative.",
  subtopicOrder: [
    "jee-ii-substitution",
    "jee-ii-rational",
    "jee-ii-trig",
    "jee-ii-parts",
  ],
};
