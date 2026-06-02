/**
 * Content for /guide/nda-physics/trends.
 *
 * Per-chapter year-on-year volume, 2017–2026. SQL-derived against the 449-q
 * PUBLIC NDA Physics bank as of OVERVIEW.asOf.
 *
 * Paper-set sizes: NDA PART B Physics is ~25 q per paper (sometimes 20–28).
 * NDA-1 + NDA-2 each year except 2020 (NDA-2 COVID-cancelled — half-year) and
 * 2026 NDA-2 (not yet held — also half-year). Affects the year-vs-year
 * comparison: 2020 and 2026 totals are ~half of other years; reason about
 * SHARES, not absolute counts in those years.
 *
 * The notable shifts (in the bank window):
 *   1. The paper HARDENED dramatically. HARD share went from 2% (2021)
 *      → 44% (2026 NDA-1). The 2026 paper has more HARD questions in
 *      25 questions than the 2021 paper had in 52.
 *   2. E&M tripled in 2022 (5→16 q) and held. The single biggest format shift.
 *   3. Laws of Motion grew 3× in 2023–24 (typical 3–5 → 7, 10).
 *   4. Modern Physics faded after 2021 (6 q/yr → 0–3 q/yr).
 */

export type DriftRow = {
  chapter: string;
  counts: Record<2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026, number>;
};

export const DRIFT_ROWS: DriftRow[] = [
  { chapter: "Light and Optics",                          counts: { 2017: 12, 2018: 10, 2019: 8,  2020: 9,  2021: 18, 2022: 7,  2023: 8,  2024: 9,  2025: 10, 2026: 6  } },
  { chapter: "Electricity and Magnetism",                 counts: { 2017: 9,  2018: 10, 2019: 9,  2020: 8,  2021: 5,  2022: 16, 2023: 11, 2024: 12, 2025: 11, 2026: 2  } },
  { chapter: "Laws of Motion and Forces",                 counts: { 2017: 0,  2018: 5,  2019: 5,  2020: 0,  2021: 3,  2022: 3,  2023: 7,  2024: 10, 2025: 4,  2026: 4  } },
  { chapter: "Heat and Thermodynamics",                   counts: { 2017: 7,  2018: 7,  2019: 7,  2020: 0,  2021: 2,  2022: 4,  2023: 1,  2024: 2,  2025: 5,  2026: 4  } },
  { chapter: "Sound",                                     counts: { 2017: 3,  2018: 4,  2019: 4,  2020: 2,  2021: 5,  2022: 8,  2023: 3,  2024: 1,  2025: 3,  2026: 1  } },
  { chapter: "Modern Physics",                            counts: { 2017: 6,  2018: 1,  2019: 6,  2020: 0,  2021: 6,  2022: 0,  2023: 2,  2024: 3,  2025: 1,  2026: 0  } },
  { chapter: "Kinematics and Motion",                     counts: { 2017: 2,  2018: 3,  2019: 4,  2020: 0,  2021: 2,  2022: 3,  2023: 4,  2024: 3,  2025: 2,  2026: 1  } },
  { chapter: "Work, Energy and Power",                    counts: { 2017: 2,  2018: 0,  2019: 2,  2020: 0,  2021: 4,  2022: 3,  2023: 2,  2024: 3,  2025: 4,  2026: 3  } },
  { chapter: "Fluid Mechanics and Properties of Matter",  counts: { 2017: 1,  2018: 3,  2019: 1,  2020: 1,  2021: 2,  2022: 4,  2023: 4,  2024: 2,  2025: 4,  2026: 1  } },
  { chapter: "Gravitation",                               counts: { 2017: 3,  2018: 2,  2019: 2,  2020: 1,  2021: 0,  2022: 0,  2023: 2,  2024: 4,  2025: 1,  2026: 2  } },
  { chapter: "Units, Measurement and Dimensions",         counts: { 2017: 3,  2018: 3,  2019: 2,  2020: 1,  2021: 2,  2022: 1,  2023: 0,  2024: 0,  2025: 2,  2026: 0  } },
  { chapter: "Oscillations and Waves",                    counts: { 2017: 2,  2018: 3,  2019: 1,  2020: 0,  2021: 1,  2022: 2,  2023: 1,  2024: 1,  2025: 1,  2026: 1  } },
  { chapter: "Astronomy and Space",                       counts: { 2017: 0,  2018: 0,  2019: 2,  2020: 0,  2021: 1,  2022: 0,  2023: 0,  2024: 0,  2025: 1,  2026: 0  } },
  { chapter: "Energy Sources",                            counts: { 2017: 0,  2018: 0,  2019: 0,  2020: 0,  2021: 1,  2022: 0,  2023: 0,  2024: 0,  2025: 1,  2026: 0  } },
];

export const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;

/** SQL-derived %HARD by year. The headline drift in the bank — paper
 *  hardened 22× per question over the 10-year window. */
export type HardByYear = {
  year: number;
  totalQ: number;
  hardQ: number;
  pctHard: number;
};

export const HARD_BY_YEAR: HardByYear[] = [
  { year: 2017, totalQ: 50, hardQ: 5,  pctHard: 10 },
  { year: 2018, totalQ: 51, hardQ: 9,  pctHard: 18 },
  { year: 2019, totalQ: 53, hardQ: 5,  pctHard: 9  },
  { year: 2020, totalQ: 22, hardQ: 2,  pctHard: 9  },
  { year: 2021, totalQ: 52, hardQ: 1,  pctHard: 2  },
  { year: 2022, totalQ: 51, hardQ: 4,  pctHard: 8  },
  { year: 2023, totalQ: 45, hardQ: 10, pctHard: 22 },
  { year: 2024, totalQ: 50, hardQ: 14, pctHard: 28 },
  { year: 2025, totalQ: 50, hardQ: 2,  pctHard: 4  },
  { year: 2026, totalQ: 25, hardQ: 11, pctHard: 44 },
];

export type DriftCallout = {
  icon: "up" | "down" | "spike";
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
    icon: "spike",
    title: "The paper hardened 22× per question — 2% HARD (2021) to 44% (2026)",
    description:
      "The single most important shift in NDA Physics. 2021 was the easiest paper-year in the window (1 HARD across 52 q = 2%). 2024 jumped to 28%. 2026 NDA-1 alone has 11 HARD in 25 q = 44%. Per question, the 2026 paper is ~22× more difficulty-dense than 2021. Translation: if you've practiced 2017–2022 papers, the absolute number of HARD questions you've seen is dwarfed by what 2024–2026 throws at you in a single paper. Drill recent papers ruthlessly.",
    drill: {
      chapter: "Electricity and Magnetism",
      pyqYears: [2024, 2025, 2026],
      qCount: 25,
      label: "Drill 2024–2026 E&M (the HARD-heavy bucket)",
    },
  },
  {
    icon: "up",
    title: "E&M tripled in 2022 and held — 5 q → 16 q overnight",
    description:
      "Through 2017–2021 the E&M chapter held a steady 5–10 q/year. 2022 jumped to 16 q (highest single-year for any chapter in the bank). 2023–2025 settled at 11–12 q. If you've calibrated your prep against the 2017–2021 baseline, you're underweighting the bank's #1 HARD pool by half. Combination of Resistors (the 38% HARD subtopic) absorbed most of the new q.",
    drill: {
      chapter: "Electricity and Magnetism",
      subtopic: "Combination of Resistors",
      qCount: 16,
      label: "Drill the 16-q Combination-of-Resistors HARD pool",
    },
  },
  {
    icon: "up",
    title: "Laws of Motion grew 3× in 2023–2024",
    description:
      "Typical 3–5 q/year through 2017–2022 (with 0 in 2017 and 2020). Then 2023 = 7 q, 2024 = 10 q. Settled back to 4 in 2025 and 4 in 2026 NDA-1. The growth was concentrated in Newton's Laws statement-truth and Conservation of Momentum — both are calculation-light, so the trend is more 'NDA likes Newton recently' than 'paper got harder here.'",
    drill: {
      chapter: "Laws of Motion and Forces",
      pyqYears: [2023, 2024],
      qCount: 17,
      label: "Drill 2023–24 Laws of Motion (the growth years)",
    },
  },
  {
    icon: "down",
    title: "Modern Physics faded post-2021 — 6 q → 0–3 q/year",
    description:
      "2017, 2019, 2021 each carried 6 q of Modern Physics. Then 2022=0, 2023=2, 2024=3, 2025=1, 2026=0. Cumulative for the chapter dropped from a 6-q-per-year norm to a 1-q-per-year norm. Don't over-invest — the 25-q chapter total looks more substantial than its annual yield, which is ~1 q/paper today. Still drillable for marginal marks (0% HARD throughout).",
  },
];
