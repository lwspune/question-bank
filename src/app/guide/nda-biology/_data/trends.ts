/**
 * Content for /guide/nda-biology/trends.
 *
 * Per-chapter year-on-year volume, 2017–2026. SQL-derived against the 190-q
 * PUBLIC NDA Biology bank as of OVERVIEW.asOf.
 *
 * Paper-set sizes: NDA PART B Biology is ~10–11 q per single paper (range
 * 9–13 across the bank; avg 10.6). NDA-1 + NDA-2 each year except 2020
 * (NDA-2 COVID-cancelled — single paper) and 2026 NDA-2 (not yet held —
 * also single paper). Year totals below = sum across both papers of the
 * year (so 2020 + 2026 are roughly half a normal year).
 *
 * The HEADLINE for NDA Biology trends — same as Chemistry — is what's NOT
 * changing. UNLIKE Physics (which hardened 22× per question 2021→2026),
 * Biology has stayed essentially flat. %HARD oscillates 0–9% with no
 * trajectory. Average ~2.6%. Drill ALL 10 years equally; don't over-weight
 * 2024+.
 *
 * Notable shifts (in the bank window):
 *   1. Paper has NOT hardened. %HARD bounces 0% (2017, 2019, 2022, 2024,
 *      2025, 2026) to 9% (2021) with no trajectory. 4 chapters carry ZERO
 *      HARD across the entire 10-year window.
 *   2. Cell Biology grew dramatically in 2022–2024 (3 → 8 → 6 → 10 q/yr)
 *      then dropped back to 2 q in 2025. The 2024 spike is the chapter's
 *      all-time high.
 *   3. Microbiology and Disease faded after 2019. 2017–19 averaged ~5 q/yr;
 *      2020–26 averages ~1 q/yr (with a brief 3-q recovery in 2025).
 *   4. Reproduction had a 2023 SPIKE (7 q in a single year — the chapter's
 *      all-time high) then silence. Pattern is genuinely noisy.
 */

export type DriftRow = {
  chapter: string;
  counts: Record<2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026, number>;
};

export const DRIFT_ROWS: DriftRow[] = [
  { chapter: "Human Physiology",                counts: { 2017: 7, 2018: 7, 2019: 3, 2020: 3, 2021: 6, 2022: 5, 2023: 0, 2024: 7, 2025: 9, 2026: 5 } },
  { chapter: "Cell Biology",                    counts: { 2017: 2, 2018: 5, 2019: 5, 2020: 2, 2021: 3, 2022: 8, 2023: 6, 2024: 10, 2025: 2, 2026: 1 } },
  { chapter: "Plant Biology",                   counts: { 2017: 3, 2018: 4, 2019: 3, 2020: 2, 2021: 8, 2022: 1, 2023: 2, 2024: 2, 2025: 1, 2026: 3 } },
  { chapter: "Microbiology and Disease",        counts: { 2017: 7, 2018: 2, 2019: 5, 2020: 1, 2021: 1, 2022: 1, 2023: 1, 2024: 0, 2025: 3, 2026: 0 } },
  { chapter: "Reproduction",                    counts: { 2017: 0, 2018: 0, 2019: 0, 2020: 1, 2021: 1, 2022: 3, 2023: 7, 2024: 0, 2025: 0, 2026: 1 } },
  { chapter: "Ecology and Environment",         counts: { 2017: 0, 2018: 2, 2019: 1, 2020: 4, 2021: 1, 2022: 0, 2023: 3, 2024: 1, 2025: 0, 2026: 0 } },
  { chapter: "Biodiversity and Classification", counts: { 2017: 0, 2018: 3, 2019: 2, 2020: 0, 2021: 1, 2022: 2, 2023: 2, 2024: 1, 2025: 0, 2026: 0 } },
  { chapter: "Genetics and Evolution",          counts: { 2017: 1, 2018: 0, 2019: 0, 2020: 0, 2021: 1, 2022: 0, 2023: 0, 2024: 0, 2025: 2, 2026: 0 } },
  { chapter: "Biochemistry",                    counts: { 2017: 0, 2018: 0, 2019: 0, 2020: 0, 2021: 0, 2022: 0, 2023: 2, 2024: 0, 2025: 2, 2026: 0 } },
];

export const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;

/** SQL-derived %HARD by year. The headline NON-drift in the bank — paper
 *  did NOT harden across the 10-year window (contrast Physics, mirror
 *  Chemistry). */
export type HardByYear = {
  year: number;
  totalQ: number;
  hardQ: number;
  pctHard: number;
};

export const HARD_BY_YEAR: HardByYear[] = [
  { year: 2017, totalQ: 20, hardQ: 0, pctHard: 0 },
  { year: 2018, totalQ: 23, hardQ: 1, pctHard: 4 },
  { year: 2019, totalQ: 19, hardQ: 0, pctHard: 0 },
  { year: 2020, totalQ: 13, hardQ: 0, pctHard: 0 },
  { year: 2021, totalQ: 22, hardQ: 2, pctHard: 9 },
  { year: 2022, totalQ: 20, hardQ: 0, pctHard: 0 },
  { year: 2023, totalQ: 23, hardQ: 1, pctHard: 4 },
  { year: 2024, totalQ: 21, hardQ: 0, pctHard: 0 },
  { year: 2025, totalQ: 19, hardQ: 0, pctHard: 0 },
  { year: 2026, totalQ: 10, hardQ: 0, pctHard: 0 },
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
      "The most important pattern in NDA Biology trends is the absence of a pattern. %HARD oscillates 0% (2017, 2019, 2020, 2022, 2024, 2025, 2026) to 9% (2021, 2 HARDs) with no trajectory. Average across 10 years: 2.6%. Only 4 HARDs across the entire 190-q bank. Contrast NDA Physics (2% → 44% over the same window) and even Chemistry (which oscillates 0–14%). Translation: drill 2017 papers as seriously as 2024 papers. The 2026 paper is no harder per question than the 2017 paper. Biology's near-pure recall character keeps the difficulty floor stable.",
    drill: {
      chapter: "Human Physiology",
      pyqYears: [2017, 2018, 2019],
      qCount: 17,
      label: "Drill 2017–19 Human Physiology (the older cohort)",
    },
  },
  {
    icon: "up",
    title: "Cell Biology grew dramatically 2022–2024",
    description:
      "Through 2017–2021 the Cell Biology chapter held 2–5 q/year (avg ~3.4). 2022 jumped to 8, 2023 was 6, 2024 hit 10 (the chapter's all-time high). Then 2025 dropped to 2, 2026 NDA-1 to 1. The growth concentrated in Cell Organelles + Functions (17 of 44 chapter q overall). If your prep is from a coaching-class syllabus that pre-dates 2022, you're under-investing in this chapter — it's now the SECOND largest after Human Physiology.",
    drill: {
      chapter: "Cell Biology",
      pyqYears: [2022, 2023, 2024],
      qCount: 24,
      label: "Drill 2022–2024 Cell Biology (the growth cohort)",
    },
  },
  {
    icon: "down",
    title: "Microbiology and Disease faded after 2019 — still tested, less frequently",
    description:
      "2017–19 carried 7 + 2 + 5 = 14 of the chapter's 21 q. Since 2020 it's been 0–3 q/yr (7 total across 7 years). 2024 + 2026 NDA-1 each carried ZERO. Don't drop the chapter — when it appears, every question is named-fact recall (disease↔pathogen), zero HARD, easy marks. But adjust expectations: it's no longer the steady 2–3 q/paper it was pre-2020.",
    drill: {
      chapter: "Microbiology and Disease",
      pyqYears: [2017, 2018, 2019],
      qCount: 14,
      label: "Drill 2017–2019 Microbiology (the high-frequency era)",
    },
  },
  {
    icon: "spike",
    title: "Reproduction 2023 spike (7 q) then silence",
    description:
      "2023 carried 7 of the chapter's 13 q in a single year — the chapter's all-time high. 2024 + 2025 each carried ZERO; 2026 NDA-1 has 1. Pattern is genuinely noisy — the chapter could come back in 2026 NDA-2 with another spike, or stay silent. Drill the 2023 cohort for the lever practice (pollination types, double fertilisation, oestrus cycle); don't expect 7 q again in any single year.",
    drill: {
      chapter: "Reproduction",
      pyqYears: [2023],
      qCount: 7,
      label: "Drill the 2023 Reproduction cohort (the spike year)",
    },
  },
];
