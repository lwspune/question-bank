/**
 * Content for /guide/nda-geography/trends.
 *
 * Per-chapter year-on-year volume, 2017–2026. SQL-derived against the 345-q
 * PUBLIC NDA Geography bank as of OVERVIEW.asOf.
 *
 * Paper-set sizes: NDA PART A Geography is ~19 q per single paper (range
 * 17–21 across the bank; avg 19.2). NDA-1 + NDA-2 each year except 2020
 * (NDA-2 COVID-cancelled — single paper) and 2026 NDA-2 (not yet held —
 * also single paper). Year totals below = sum across both papers of the
 * year (so 2020 + 2026 are roughly half a normal year).
 *
 * The HEADLINE for NDA Geography trends — same as Chemistry/Biology — is
 * what's NOT changing. UNLIKE Physics (which hardened 22× per question
 * 2021→2026), Geography has stayed essentially wavy. %HARD oscillates
 * 6% (2019) to 42% (2018) with no monotonic trajectory. 2018 was an
 * outlier high; 2025 also high but no consistent direction. Drill ALL 10
 * years equally; don't over-weight 2024+.
 *
 * Notable shifts (in the bank window):
 *   1. Paper has NOT consistently hardened. %HARD bounces 6% (2019) to
 *      42% (2018) with no trajectory. Recent average (2022–2026): ~21%.
 *      No drift to lock in.
 *   2. Climatology spiked in 2024 (11 q in single year — chapter all-time
 *      high) then returned to 8 (2025) and 5 (2026 NDA-1). Pattern is
 *      noisy.
 *   3. Earth's Structure DOMINATED since 2021 (12+12+10+7+8+9 = 58 of 74
 *      chapter q from 2021–26). The chapter has cemented as a recall +
 *      apply workhorse.
 *   4. Indian Geography Physical had 2017 spike (14 q, then declined).
 *      Recent years (2019–2026) average 5–10 q/year. The Rivers subtopic
 *      (27 q) is the biggest pool; Forests (14 q) carries the densest HARD.
 */

export type DriftRow = {
  chapter: string;
  counts: Record<2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026, number>;
};

export const DRIFT_ROWS: DriftRow[] = [
  { chapter: "Indian Geography — Economy, Resources and Transport", counts: { 2017: 17, 2018: 11, 2019: 5, 2020: 6, 2021: 9, 2022: 4, 2023: 8, 2024: 6, 2025: 11, 2026: 4 } },
  { chapter: "Earth's Structure, Landforms and Geological Time", counts: { 2017: 1, 2018: 7, 2019: 8, 2020: 0, 2021: 12, 2022: 12, 2023: 10, 2024: 7, 2025: 8, 2026: 9 } },
  { chapter: "Indian Geography — Physical Features", counts: { 2017: 14, 2018: 8, 2019: 6, 2020: 4, 2021: 5, 2022: 7, 2023: 7, 2024: 10, 2025: 5, 2026: 1 } },
  { chapter: "Climatology, Atmosphere and Weather", counts: { 2017: 2, 2018: 10, 2019: 7, 2020: 2, 2021: 5, 2022: 3, 2023: 4, 2024: 11, 2025: 8, 2026: 5 } },
  { chapter: "World and Human Geography", counts: { 2017: 3, 2018: 1, 2019: 3, 2020: 8, 2021: 1, 2022: 5, 2023: 3, 2024: 1, 2025: 0, 2026: 0 } },
  { chapter: "Earth in Space, Maps and Coordinates", counts: { 2017: 1, 2018: 0, 2019: 3, 2020: 0, 2021: 4, 2022: 5, 2023: 4, 2024: 2, 2025: 2, 2026: 1 } },
  { chapter: "Oceanography", counts: { 2017: 1, 2018: 1, 2019: 4, 2020: 1, 2021: 2, 2022: 0, 2023: 2, 2024: 2, 2025: 6, 2026: 0 } },
];

export const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;

/** SQL-derived %HARD by year. The headline NON-drift in the bank — paper
 *  did NOT consistently harden across the 10-year window (contrast Physics,
 *  mirror Chemistry/Biology with extra noise). */
export type HardByYear = {
  year: number;
  totalQ: number;
  hardQ: number;
  pctHard: number;
};

export const HARD_BY_YEAR: HardByYear[] = [
  { year: 2017, totalQ: 39, hardQ: 8, pctHard: 21 },
  { year: 2018, totalQ: 38, hardQ: 16, pctHard: 42 },
  { year: 2019, totalQ: 36, hardQ: 2, pctHard: 6 },
  { year: 2020, totalQ: 21, hardQ: 3, pctHard: 14 },
  { year: 2021, totalQ: 38, hardQ: 3, pctHard: 8 },
  { year: 2022, totalQ: 36, hardQ: 7, pctHard: 19 },
  { year: 2023, totalQ: 38, hardQ: 5, pctHard: 13 },
  { year: 2024, totalQ: 39, hardQ: 8, pctHard: 21 },
  { year: 2025, totalQ: 40, hardQ: 12, pctHard: 30 },
  { year: 2026, totalQ: 20, hardQ: 4, pctHard: 20 },
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
    title: "The headline: paper has NOT consistently hardened — drill all 10 years equally",
    description:
      "%HARD bounces 6% (2019) to 42% (2018) with no monotonic trajectory. 2018 was an outlier high (16 HARD in 38 q). 2025 hardened again (12 HARD in 40 q · 30%). 2019 + 2021 were unusually easy. Recent average (2022–2026): ~21% HARD. There's no drift to lock in — the paper is genuinely noisy year-to-year. Translation: drill 2017 papers as seriously as 2024 papers. Contrast NDA Physics (2% → 44% over the same window, monotonic hardening) — Geography doesn't behave like that. Its difficulty floor is stable; only the variance is high.",
    drill: {
      chapter: "Indian Geography — Economy, Resources and Transport",
      pyqYears: [2017, 2018, 2019],
      qCount: 33,
      label: "Drill 2017–19 Indian Geography Economy (the older cohort)",
    },
  },
  {
    icon: "spike",
    title: "Climatology 2024 spike (11 q) and 2025 (8 q) — paper got more weather-heavy",
    description:
      "Through 2017–2023 the Climatology chapter held 2–10 q/year (avg ~4.6). 2024 jumped to 11 (chapter all-time high), 2025 held at 8, 2026 NDA-1 dropped to 5. The growth concentrated in Cyclones + Atmospheric Layers (16 + 12 = 28 of 57 chapter q overall). If your prep is from a coaching-class syllabus that pre-dates 2024, you're under-investing in this chapter — it's grown into the 4th-largest after the two Indian Geography chapters + Earth's Structure.",
    drill: {
      chapter: "Climatology, Atmosphere and Weather",
      pyqYears: [2024, 2025],
      qCount: 19,
      label: "Drill 2024–2025 Climatology (the growth cohort)",
    },
  },
  {
    icon: "up",
    title: "Earth's Structure dominated since 2021 (58 of 74 chapter q from 2021–26)",
    description:
      "2017–2020 carried only 16 of the chapter's 74 q. Since 2021: 12 + 12 + 10 + 7 + 8 + 9 = 58 q. The chapter has cemented as a recall + apply workhorse. Earth's Interior + Plate Tectonics (15 q · 33% HARD) is the densest-HARD subtopic in the chapter — drill it cold. Plate-boundary type, seismic-wave shadow zones, rock-cycle classification are all repeat-tested across these years.",
    drill: {
      chapter: "Earth's Structure, Landforms and Geological Time",
      pyqYears: [2021, 2022, 2023, 2024, 2025, 2026],
      qCount: 58,
      label: "Drill 2021–2026 Earth's Structure (the dominant cohort)",
    },
  },
  {
    icon: "down",
    title: "Indian Geography Physical had 2017 spike (14 q), then declined — still tested, less so",
    description:
      "2017 carried 14 of the chapter's 67 q in a single year — the chapter's all-time high (driven by a big Forests + Rivers + Mountains batch). Since 2018, the chapter has averaged 6–8 q/year. 2026 NDA-1 dropped to 1 (could come back in 2026 NDA-2). Don't drop the chapter — Indian Rivers, Lakes and Water Bodies (27 q · 11% HARD) is the workhorse subtopic, and Forests + Natural Vegetation (14 q · 29% HARD) now carries the chapter's densest HARD pool. But adjust expectations: it's no longer the 14-q chapter it was in 2017.",
    drill: {
      chapter: "Indian Geography — Physical Features",
      pyqYears: [2024],
      qCount: 10,
      label: "Drill 2024 Indian Geography Physical (recent recovery year)",
    },
  },
];
