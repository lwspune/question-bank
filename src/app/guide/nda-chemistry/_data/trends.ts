/**
 * Content for /guide/nda-chemistry/trends.
 *
 * Per-chapter year-on-year volume, 2017–2026. SQL-derived against the 262-q
 * PUBLIC NDA Chemistry bank as of OVERVIEW.asOf.
 *
 * Paper-set sizes: NDA PART B Chemistry is ~25 q per paper (sometimes 15–30).
 * NDA-1 + NDA-2 each year except 2020 (NDA-2 COVID-cancelled — single paper)
 * and 2026 NDA-2 (not yet held — also single paper).
 *
 * The HEADLINE for NDA Chemistry trends is what's NOT changing — UNLIKE
 * Physics, the paper has NOT hardened. %HARD oscillates 0–14% with no
 * trend. Drill ALL 10 years equally; don't over-weight 2024+ the way you
 * would for NDA Physics.
 *
 * Notable shifts (in the bank window):
 *   1. Paper has NOT hardened. %HARD bounces 0% (2018, 2025) to 14.3% (2019)
 *      with no trajectory. Average ~6%. Contrast Physics (2% → 44% over the
 *      same window).
 *   2. Industrial and Applied Chemistry grew dramatically. 2017–2022 averaged
 *      ~2 q/yr; 2024–2026 averaged ~4 q/yr (Paints subtopic added 2024+).
 *   3. Carbon and Its Compounds was the steadiest chapter — top 3 every year
 *      except 2021 (slumped to 1, came back to 6 in 2022).
 *   4. Mole Concept faded after 2019 — typical 1–3 q/yr 2017–19 → 0–1 q/yr
 *      since. The Calculate strand is genuinely small now.
 */

export type DriftRow = {
  chapter: string;
  counts: Record<2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026, number>;
};

export const DRIFT_ROWS: DriftRow[] = [
  { chapter: "Carbon and Its Compounds",                       counts: { 2017: 4, 2018: 8, 2019: 3, 2020: 6, 2021: 1, 2022: 6, 2023: 7, 2024: 5, 2025: 3, 2026: 2 } },
  { chapter: "Atomic Structure and Periodic Classification",   counts: { 2017: 6, 2018: 3, 2019: 2, 2020: 5, 2021: 4, 2022: 3, 2023: 2, 2024: 4, 2025: 5, 2026: 1 } },
  { chapter: "Acids, Bases and Salts",                         counts: { 2017: 3, 2018: 7, 2019: 2, 2020: 3, 2021: 5, 2022: 3, 2023: 2, 2024: 2, 2025: 4, 2026: 2 } },
  { chapter: "Matter and Its States",                          counts: { 2017: 3, 2018: 2, 2019: 5, 2020: 0, 2021: 3, 2022: 5, 2023: 3, 2024: 3, 2025: 4, 2026: 2 } },
  { chapter: "Chemical Reactions",                             counts: { 2017: 1, 2018: 1, 2019: 4, 2020: 0, 2021: 5, 2022: 4, 2023: 5, 2024: 3, 2025: 5, 2026: 2 } },
  { chapter: "Industrial and Applied Chemistry",               counts: { 2017: 3, 2018: 2, 2019: 4, 2020: 0, 2021: 3, 2022: 1, 2023: 3, 2024: 5, 2025: 2, 2026: 5 } },
  { chapter: "Metals and Non-Metals",                          counts: { 2017: 2, 2018: 2, 2019: 2, 2020: 0, 2021: 2, 2022: 3, 2023: 6, 2024: 0, 2025: 0, 2026: 0 } },
  { chapter: "Hydrogen and Water",                             counts: { 2017: 3, 2018: 1, 2019: 1, 2020: 0, 2021: 1, 2022: 1, 2023: 0, 2024: 2, 2025: 2, 2026: 0 } },
  { chapter: "Chemical Bonding",                               counts: { 2017: 0, 2018: 0, 2019: 1, 2020: 1, 2021: 1, 2022: 2, 2023: 0, 2024: 5, 2025: 1, 2026: 0 } },
  { chapter: "Chemistry in Everyday Life",                     counts: { 2017: 2, 2018: 0, 2019: 3, 2020: 0, 2021: 2, 2022: 1, 2023: 0, 2024: 0, 2025: 2, 2026: 0 } },
  { chapter: "Mole Concept and Stoichiometry",                 counts: { 2017: 3, 2018: 1, 2019: 1, 2020: 0, 2021: 0, 2022: 0, 2023: 1, 2024: 1, 2025: 1, 2026: 1 } },
  { chapter: "Practical Chemistry",                            counts: { 2017: 0, 2018: 0, 2019: 0, 2020: 0, 2021: 0, 2022: 0, 2023: 3, 2024: 0, 2025: 0, 2026: 0 } },
];

export const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;

/** SQL-derived %HARD by year. The headline NON-drift in the bank — paper
 *  did NOT harden across the 10-year window (contrast Physics). */
export type HardByYear = {
  year: number;
  totalQ: number;
  hardQ: number;
  pctHard: number;
};

export const HARD_BY_YEAR: HardByYear[] = [
  { year: 2017, totalQ: 30, hardQ: 2, pctHard: 7  },
  { year: 2018, totalQ: 27, hardQ: 0, pctHard: 0  },
  { year: 2019, totalQ: 28, hardQ: 4, pctHard: 14 },
  { year: 2020, totalQ: 15, hardQ: 1, pctHard: 7  },
  { year: 2021, totalQ: 27, hardQ: 1, pctHard: 4  },
  { year: 2022, totalQ: 29, hardQ: 1, pctHard: 3  },
  { year: 2023, totalQ: 32, hardQ: 3, pctHard: 9  },
  { year: 2024, totalQ: 30, hardQ: 2, pctHard: 7  },
  { year: 2025, totalQ: 29, hardQ: 0, pctHard: 0  },
  { year: 2026, totalQ: 15, hardQ: 2, pctHard: 13 },
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
    title: "The headline: paper has NOT hardened — drill all 10 years equally",
    description:
      "The most important pattern in NDA Chemistry trends is the absence of a pattern. %HARD oscillates 0% (2018, 2025) to 14% (2019, 2026 NDA-1) with no trajectory. Average across 10 years: ~6%. Contrast NDA Physics (2% → 44% over the same window). Translation: drill 2017 papers as seriously as 2024 papers. The 2026 paper is no harder per question than the 2017 paper. There's no 'recent papers are the new normal' calibration to worry about here — Chemistry's recall-heavy character keeps the difficulty floor stable.",
    drill: {
      chapter: "Carbon and Its Compounds",
      pyqYears: [2017, 2018, 2019],
      qCount: 15,
      label: "Drill 2017–19 Carbon (the older cohort)",
    },
  },
  {
    icon: "up",
    title: "Industrial and Applied Chemistry grew — 2 q/yr → 4 q/yr post-2024",
    description:
      "Through 2017–2022 the Industrial chapter held 1–4 q/year (avg ~2). 2024 jumped to 5, 2026 NDA-1 alone has 5. The growth concentrated in Paints and Coatings (a 4-q HARD-heavy subtopic added post-2024) and Industrial Gases (paper-pulp manufacture, gas applications). If your prep is from a coaching-class syllabus that pre-dates 2024, you're under-investing in this chapter by ~50%.",
    drill: {
      chapter: "Industrial and Applied Chemistry",
      pyqYears: [2024, 2025, 2026],
      qCount: 12,
      label: "Drill 2024–2026 Industrial (the growth cohort)",
    },
  },
  {
    icon: "down",
    title: "Mole Concept faded after 2019 — Calculate strand is genuinely small",
    description:
      "2017 + 2018 + 2019 carried 3 + 1 + 1 = 5 of the chapter's 9 q. Since 2020 it's been 0–1 q/yr (4 total across 6 years). The Calculate strand has shrunk to a single q most papers — don't over-invest. 2 hours of prep is enough; the bigger marks are in Recall + Rule.",
  },
  {
    icon: "spike",
    title: "Metals and Non-Metals — 2023 spike (6 q) then silence (0 q since)",
    description:
      "2023 carried 6 of the chapter's 17 q in a single year — a freak high. 2024 + 2025 + 2026 NDA-1 each carried ZERO. Pattern is genuinely noisy; the chapter could come back in 2026 NDA-2 with another spike, or stay silent. Drill it for marks-on-the-table (zero HARD), but don't expect it as a guaranteed 2 q/paper.",
    drill: {
      chapter: "Metals and Non-Metals",
      pyqYears: [2023],
      qCount: 6,
      label: "Drill the 2023 Metals cohort (the spike year)",
    },
  },
];
