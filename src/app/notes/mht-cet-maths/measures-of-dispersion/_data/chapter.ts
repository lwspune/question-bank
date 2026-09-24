import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_DISPERSION_CHAPTER: ChapterNote = {
  chapterName: "Measures of Dispersion",
  title: "Measures of Dispersion — MHT-CET Maths",
  intro:
    "Measures of Dispersion was dropped from the MHT-CET Maths paper after 2024: it ran one question a paper across the 2023 and 2024 shifts and then scored zero " +
    "across every 2025 paper. The notes are here because the bank has its past-year questions and because the same two formulas — the variance as " +
    "Σx²/n − x̄², and the shift-and-scale rules — are exactly what the Probability Distribution chapter's mean-and-variance questions use. Fewer than one in ten of " +
    "these questions is HARD. The three pages below run from computing a variance out of sums, through what happens to mean and variance when every observation " +
    "is shifted or scaled, to the standard-series results and the two-missing-observations stem that was set five times. Every PYQ is tagged. Treat the chapter " +
    "as a formula rehearsal for Probability Distribution, not as a paper topic.",
  cardBlurb:
    "Dropped from the paper after 2024, kept as a formula rehearsal — variance from sums, the shift-and-scale rules and the standard-series results, with every past-year question tagged.",
  subtopicOrder: [
    "cetdisp-mean-and-variance-from-sums",
    "cetdisp-shift-and-scale",
    "cetdisp-standard-series-and-missing-observations",
  ],
};
