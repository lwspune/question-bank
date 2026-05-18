/**
 * Content for /guide/nda-history/trends.
 *
 * Per-chapter year-on-year volume, 2017–2026. SQL-derived against the 260-q
 * PUBLIC NDA History bank as of OVERVIEW.asOf.
 *
 * Paper-set sizes: NDA PART A History is ~14 q per single paper (range
 * 10–19 across 18 papers in the bank; avg 14.4). NDA-1 + NDA-2 each year
 * except 2020 (NDA-2 COVID-cancelled — single paper) and 2026 NDA-2 (not
 * yet held — also single paper). Year totals below = sum across both
 * papers of the year (so 2020 + 2026 are roughly half a normal year).
 *
 * The HEADLINE for NDA History trends — same framing as Chemistry /
 * Biology / Geography, opposite of Physics — is paper has NOT consistently
 * hardened. %HARD bounces 19% (2017) to 42% (2021 peak) to 10% (2026-1
 * lowest). 2021 was an outlier-high HARD year; 2026 NDA-1 the easiest.
 * No monotonic trajectory. Drill ALL 10 years equally.
 *
 * SECOND HEADLINE — chapter MIX shifted dramatically:
 *   - 2017–2020 papers were MODERN-DOMINATED (~55–65% of paper Modern
 *     India; very little Ancient: 0–3 q/yr).
 *   - 2022–2024 papers saw Ancient SURGE (9 + 10 + 8 q/yr — Ancient
 *     all-time chapter peaks for those 3 years), while Modern faded to
 *     ~8–11 q/yr.
 *   - 2025+ papers spread more evenly across all 4 eras.
 *   So the bank-average "Modern is 47%" stat is SKEWED by 2017–2020
 *   papers. Recent papers are closer to 30–40% Modern.
 *
 * Notable shifts (in the bank window):
 *   1. Paper has NOT consistently hardened. 2018 + 2019 + 2021 + 2022 all
 *      had >30% HARD; 2017 + 2020 + 2025 + 2026-1 were <30%. Recent
 *      average (2022–2026): ~26%. No drift to lock in.
 *   2. Ancient India surged from ~2 q/yr (2017–20) to 9 + 10 + 8 + 6
 *      q/yr (2022–25). Chapter went from negligible to ~25% of paper.
 *   3. Modern India dominated 2017–2020 (21 + 11 + 17 + 13 q/yr = 65% of
 *      paper avg) but faded post-2022 (15 + 8 + 11 + 10 + 2 q/yr).
 *   4. World History 2019 + 2025 outlier spikes (13 + 3 q/yr — but 2019
 *      alone was 35% of that paper, a single-year anomaly).
 */

export type DriftRow = {
  chapter: string;
  counts: Record<2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026, number>;
};

export const DRIFT_ROWS: DriftRow[] = [
  { chapter: "Modern India", counts: { 2017: 21, 2018: 11, 2019: 17, 2020: 13, 2021: 14, 2022: 15, 2023: 8, 2024: 11, 2025: 10, 2026: 2 } },
  { chapter: "Medieval India", counts: { 2017: 7, 2018: 10, 2019: 5, 2020: 0, 2021: 6, 2022: 4, 2023: 7, 2024: 7, 2025: 6, 2026: 1 } },
  { chapter: "Ancient India", counts: { 2017: 3, 2018: 1, 2019: 2, 2020: 0, 2021: 2, 2022: 9, 2023: 10, 2024: 8, 2025: 6, 2026: 3 } },
  { chapter: "World History", counts: { 2017: 1, 2018: 5, 2019: 13, 2020: 1, 2021: 4, 2022: 2, 2023: 6, 2024: 2, 2025: 3, 2026: 4 } },
];

export const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;

/** SQL-derived %HARD by year. The headline NON-drift in the bank — paper
 *  did NOT consistently harden across the 10-year window (contrast Physics's
 *  monotonic hardening, mirror Chemistry/Biology/Geography stable-but-wavy). */
export type HardByYear = {
  year: number;
  totalQ: number;
  hardQ: number;
  pctHard: number;
};

export const HARD_BY_YEAR: HardByYear[] = [
  { year: 2017, totalQ: 32, hardQ: 6, pctHard: 19 },
  { year: 2018, totalQ: 27, hardQ: 10, pctHard: 37 },
  { year: 2019, totalQ: 37, hardQ: 13, pctHard: 35 },
  { year: 2020, totalQ: 14, hardQ: 4, pctHard: 29 },
  { year: 2021, totalQ: 26, hardQ: 11, pctHard: 42 },
  { year: 2022, totalQ: 30, hardQ: 10, pctHard: 33 },
  { year: 2023, totalQ: 31, hardQ: 8, pctHard: 26 },
  { year: 2024, totalQ: 28, hardQ: 8, pctHard: 29 },
  { year: 2025, totalQ: 25, hardQ: 5, pctHard: 20 },
  { year: 2026, totalQ: 10, hardQ: 1, pctHard: 10 },
];

export type DriftCallout = {
  icon: "up" | "down" | "spike" | "flat";
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
    icon: "flat",
    title:
      "The headline: paper has NOT consistently hardened — drill all 10 years equally",
    description:
      "%HARD bounces 19% (2017) to 42% (2021 peak) to 10% (2026-1 lowest). 2018 + 2019 + 2021 + 2022 all carried >30% HARD; 2017 + 2025 + 2026-1 were <25%. Recent average (2022–2026): ~26% HARD. There's no monotonic trend to lock in — the paper is genuinely wavy year-to-year. Translation: drill 2017 papers as seriously as 2024 papers. Contrast NDA Physics (2% → 44% over the same window, monotonic hardening) — History doesn't behave that way. The difficulty FLOOR is stable; only the variance is high.",
    drill: {
      chapter: "Modern India",
      pyqYears: [2017, 2018, 2019, 2020],
      qCount: 62,
      label: "Drill 2017–2020 Modern India (the older Modern-heavy cohort)",
    },
  },
  {
    icon: "spike",
    title:
      "Ancient India SURGED 2022–2024 (9 + 10 + 8 q/yr) from a ~2 baseline — pre-2022 prep is wrong",
    description:
      "Through 2017–2021 the Ancient India chapter held 0–3 q/year (avg ~1.6 q/yr — almost negligible). Starting 2022 it jumped to 9 + 10 + 8 + 6 + 3 q/yr (Apr-2026 NDA-1). The chapter went from ~5% of paper to ~25% in three years. If your coaching-class History prep predates 2022, you're under-investing in Harappan + Literature + Mauryan content — the chapter that was 1 q/yr in 2017 is now ~3 q/yr in 2024. The Literature and Inscriptions subtopic (12 q · 42% HARD) is the biggest beneficiary of this surge.",
    drill: {
      chapter: "Ancient India",
      pyqYears: [2022, 2023, 2024, 2025],
      qCount: 33,
      label: "Drill 2022–2025 Ancient India (the surge cohort)",
    },
  },
  {
    icon: "down",
    title:
      "Modern India dominated 2017–2020 (~55% of paper) but faded post-2022 — the 47% bank stat is skewed",
    description:
      "2017–2020 papers carried 21 + 11 + 17 + 13 = 62 of 110 Modern India q (56% of the chapter's bank in just 4 years × 7 papers, vs the chapter's true 47% bank share). Post-2022 the chapter settled to ~8–11 q/yr (~28% of paper). The headline number 'Modern India is 47%' is skewed by old papers — recent papers are closer to 30–40% Modern. The chapter is still the bank's largest by far, but don't OVER-prep it relative to recent papers. Freedom Movement (56 q) accounts for 46% of the chapter — drill that core regardless of year-balance shifts.",
    drill: {
      chapter: "Modern India",
      pyqYears: [2022, 2023, 2024, 2025, 2026],
      qCount: 46,
      label: "Drill 2022–2026 Modern India (the recent cohort)",
    },
  },
  {
    icon: "up",
    title:
      "World History stays small but the 2019 spike (13 q in one year) reminds you not to drop it",
    description:
      "2017–2018 had 1 + 5 = 6 World History q. 2019 alone had 13 (35% of the entire 2019 paper!). 2020–2026 settled to 1–6 q/yr (~10% of paper). The chapter is the smallest by bank share (16%) AND has the lowest %HARD (20%) — quick-win territory. The 2019 spike was a single-year anomaly (driven by an unusual Enlightenment + Industrial Revolution batch) but proves the chapter can re-spike unpredictably. Drill the chronology cluster + Enlightenment subtopic cold — they cover all 4 World History subtopics' likely HARDs cheaply.",
    drill: {
      chapter: "World History",
      pyqYears: [2019, 2023, 2025, 2026],
      qCount: 26,
      label: "Drill 2019 + 2023 + 2025 + 2026 World History (recent + spike year)",
    },
  },
];
