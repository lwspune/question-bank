/**
 * Content for /guide/nda-english/trends.
 *
 * Per-chapter year-on-year volume, 2017–2026. SQL-derived against the 900-q
 * PUBLIC NDA English bank as of OVERVIEW.asOf.
 *
 * Paper-set sizes: NDA GAT English half is ~50 q per paper, with NDA-1 +
 * NDA-2 each year except 2020 (COVID-cancelled NDA-2). So most years have
 * ~100 q tagged; 2020 has ~50; 2026 has 50 (NDA-1 only).
 *
 * The notable shifts (in the bank window):
 *   1. Grammar EXPLODED 2024+ — 0 q 2017–2018, 10 q 2019–2020, then 30/40/18.
 *      A real format change, not noise.
 *   2. Spotting Errors went quiet in 2024–25 (0/0), returned 2026 (5).
 *   3. Cloze Test gap: 2018→2024 absent, then 20 in 2024.
 *   4. Vocabulary held steady ~30–45/year — the constant of the GAT.
 */

export type DriftRow = {
  chapter: string;
  counts: Record<2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026, number>;
};

export const DRIFT_ROWS: DriftRow[] = [
  { chapter: "Vocabulary",             counts: { 2017: 30, 2018: 30, 2019: 40, 2020: 20, 2021: 40, 2022: 40, 2023: 45, 2024: 20, 2025: 30, 2026: 21 } },
  { chapter: "Spotting Errors",        counts: { 2017: 20, 2018: 10, 2019: 10, 2020: 10, 2021: 20, 2022: 20, 2023: 20, 2024: 0,  2025: 0,  2026: 5  } },
  { chapter: "Sentence Rearrangement", counts: { 2017: 14, 2018: 10, 2019: 10, 2020: 10, 2021: 10, 2022: 20, 2023: 10, 2024: 10, 2025: 20, 2026: 0  } },
  { chapter: "Grammar",                counts: { 2017: 0,  2018: 0,  2019: 10, 2020: 10, 2021: 0,  2022: 0,  2023: 0,  2024: 30, 2025: 40, 2026: 18 } },
  { chapter: "Idioms and Phrases",     counts: { 2017: 0,  2018: 10, 2019: 10, 2020: 0,  2021: 20, 2022: 20, 2023: 10, 2024: 10, 2025: 0,  2026: 6  } },
  { chapter: "Reading Comprehension",  counts: { 2017: 6,  2018: 20, 2019: 10, 2020: 0,  2021: 0,  2022: 0,  2023: 5,  2024: 10, 2025: 10, 2026: 0  } },
  { chapter: "Fill in the Blanks",     counts: { 2017: 10, 2018: 15, 2019: 10, 2020: 0,  2021: 10, 2022: 0,  2023: 10, 2024: 0,  2025: 0,  2026: 0  } },
  { chapter: "Cloze Test",             counts: { 2017: 20, 2018: 5,  2019: 0,  2020: 0,  2021: 0,  2022: 0,  2023: 0,  2024: 20, 2025: 0,  2026: 0  } },
];

export const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;

export type DriftCallout = {
  icon: "up" | "down";
  title: string;
  description: string;
  /** Optional drill target — chapter + subtopic(s) + year(s). */
  drill?: {
    chapter: string;
    subtopic?: string;
    pyqYears?: number[];
    qCount: number;
    label: string;
  };
};

export const DRIFT_CALLOUTS: DriftCallout[] = [
  {
    icon: "up",
    title: "Grammar exploded post-2024 — from 0 to 40 q/year",
    description:
      "The single biggest drift in NDA English. 2017–2018 had ZERO Grammar questions. 2019–2020 introduced 10/year. Then 2024+ broke wide open — 30, 40, 18 in the half-paper. Sentence Completion (30 q across 2 years) and Discourse Markers (20 q) were essentially invented for the post-2024 papers. If you only practiced 2017–2022 papers, you are seriously under-prepared for the modern format.",
    drill: {
      chapter: "Grammar",
      pyqYears: [2024, 2025, 2026],
      qCount: 88,
      label: "Drill the 88 post-2024 Grammar questions",
    },
  },
  {
    icon: "down",
    title: "Spotting Errors went silent in 2024–25, returned in 2026",
    description:
      "After holding a steady 10–20 q/paper-set for 2017–2023, Spotting Errors completely disappeared in 2024 and 2025 — zero questions both years. The 2026 NDA-1 brought it back with 5 q. The likely explanation: the format-change that expanded Grammar absorbed the Errors-style rule-testing questions into the new Sentence Completion format. If 2026 NDA-2 doubles down, expect Spotting Errors to land at ~10 q again.",
    drill: {
      chapter: "Spotting Errors",
      pyqYears: [2021, 2022, 2023],
      qCount: 60,
      label: "Drill the 60 mid-window Spotting Errors questions",
    },
  },
  {
    icon: "up",
    title: "Cloze Test returned in 2024 after a 6-year gap",
    description:
      "Cloze Test was a 2017–2018 feature (25 q across those two years), then disappeared entirely 2019–2023. The 2024 paper brought it back at 20 q (4 cloze passages × 5 blanks). The principle: paper-setters cycle question formats — when something disappears, it's pause-not-removal. The Cloze toolkit is the same as Grammar's Discourse Markers — drill those if Cloze appears again.",
    drill: {
      chapter: "Cloze Test",
      pyqYears: [2017, 2018, 2024],
      qCount: 45,
      label: "Drill the 45 Cloze questions",
    },
  },
  {
    icon: "down",
    title: "Fill in the Blanks faded after 2023",
    description:
      "FIB had a 2017–2023 baseline of 10–15 q/year, then dropped to 0 across 2024, 2025, and 2026 NDA-1. The likely cause: Sentence Completion (new in 2024) tests the same vocab-in-context skill in a slightly different format. If FIB returns, the Synonyms playbook word work covers it.",
  },
];
