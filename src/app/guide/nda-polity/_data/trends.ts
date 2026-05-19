/**
 * Content for /guide/nda-polity/trends.
 *
 * Per-chapter year-on-year volume, 2017–2026. SQL-derived against the 90-q
 * PUBLIC NDA Polity bank as of OVERVIEW.asOf.
 *
 * Paper-set sizes: NDA PART A Polity is ~5 q per single paper (range 2–10
 * across 18 papers in the bank; avg 5.0). NDA-1 + NDA-2 each year except
 * 2020 (NDA-2 COVID-cancelled — single paper) and 2026 NDA-2 (not yet
 * held — also single paper). Year totals below = sum across both papers
 * of the year (so 2020 + 2026 are roughly half a normal year).
 *
 * The HEADLINE for NDA Polity trends — same framing as Chemistry /
 * Biology / Geography / History — paper has NOT consistently hardened.
 * %HARD bounces 0% (2020/2021 small samples) → 50% (2026 NDA-1 outlier) →
 * 44% (2017). No monotonic trajectory. Drill ALL 10 years equally.
 *
 * NOISY because of small per-paper samples (avg 5 q/paper, range 2–10).
 * The smallest GAT section we've guided — single-paper %HARD swings are
 * inherently noisy at this sample size. Don't over-interpret year-to-year
 * %HARD; the difficulty FLOOR is stable, only variance is high.
 *
 * SECONDARY HEADLINES:
 *   - 2026 NDA-1 was the HARDEST paper (50% HARD, 5 of 10 q) AND the
 *     most Govt-Structure-heavy (7 of 10 q from one chapter — single-
 *     chapter-in-one-paper bank record). Suggests recent papers may
 *     favor Govt Structure questions but sample is N=1.
 *   - 2021 was the FR/DPSP outlier (7 q of 14 — 50% of paper from one
 *     chapter; bank's other single-chapter outlier).
 *   - World Polity was ABSENT 2018+2019+2020 (3 years zero q), then
 *     1–3 q/yr 2021+. Don't drop the chapter; it can resurface.
 */

export type DriftRow = {
  chapter: string;
  counts: Record<2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026, number>;
};

export const DRIFT_ROWS: DriftRow[] = [
  { chapter: "Government Structure — Parliament, Judiciary and Constitutional Bodies", counts: { 2017: 5, 2018: 6, 2019: 2, 2020: 2, 2021: 2, 2022: 5, 2023: 2, 2024: 4, 2025: 1, 2026: 7 } },
  { chapter: "Fundamental Rights, DPSP and Local Governance", counts: { 2017: 2, 2018: 2, 2019: 3, 2020: 1, 2021: 7, 2022: 2, 2023: 1, 2024: 1, 2025: 3, 2026: 0 } },
  { chapter: "Indian Constitution — Making, Foundation and Amendments", counts: { 2017: 1, 2018: 5, 2019: 1, 2020: 0, 2021: 4, 2022: 2, 2023: 1, 2024: 3, 2025: 2, 2026: 1 } },
  { chapter: "World Polity, Democracy and International Relations", counts: { 2017: 1, 2018: 0, 2019: 0, 2020: 0, 2021: 1, 2022: 2, 2023: 1, 2024: 2, 2025: 3, 2026: 2 } },
];

export const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;

/** SQL-derived %HARD by year. The headline NON-drift in the bank — paper
 *  did NOT consistently harden across the 10-year window (contrast Physics's
 *  monotonic hardening, mirror Chemistry/Biology/Geography/History stable-
 *  but-wavy). 2026 NDA-1 was the HARDEST single paper (50%); 2020/2021 the
 *  easiest (0%). Small per-paper samples mean year-to-year %HARD is noisy
 *  by construction. */
export type HardByYear = {
  year: number;
  totalQ: number;
  hardQ: number;
  pctHard: number;
};

export const HARD_BY_YEAR: HardByYear[] = [
  { year: 2017, totalQ: 9, hardQ: 4, pctHard: 44 },
  { year: 2018, totalQ: 13, hardQ: 2, pctHard: 15 },
  { year: 2019, totalQ: 6, hardQ: 1, pctHard: 17 },
  { year: 2020, totalQ: 3, hardQ: 0, pctHard: 0 },
  { year: 2021, totalQ: 14, hardQ: 0, pctHard: 0 },
  { year: 2022, totalQ: 11, hardQ: 1, pctHard: 9 },
  { year: 2023, totalQ: 5, hardQ: 1, pctHard: 20 },
  { year: 2024, totalQ: 10, hardQ: 2, pctHard: 20 },
  { year: 2025, totalQ: 9, hardQ: 1, pctHard: 11 },
  { year: 2026, totalQ: 10, hardQ: 5, pctHard: 50 },
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
      "%HARD bounces 0% (2020 + 2021 small samples) → 9% (2022) → 50% (2026 NDA-1 outlier high) → 44% (2017 outlier high). No monotonic trajectory. The bank is genuinely wavy year-to-year — partly because per-paper sample size is small (avg 5 q/paper, range 2–10), so a single HARD multi-statement question can swing a year's %HARD by 20+ percentage points. Translation: drill 2017 papers as seriously as 2024 papers. Contrast NDA Physics (2% → 44% over the same window, monotonic hardening) — Polity doesn't behave that way. The difficulty FLOOR is stable; the variance is high.",
    drill: {
      chapter:
        "Government Structure — Parliament, Judiciary and Constitutional Bodies",
      pyqYears: [2017, 2018, 2019, 2020],
      qCount: 15,
      label: "Drill 2017–2020 Government Structure (the older cohort)",
    },
  },
  {
    icon: "spike",
    title:
      "2026 NDA-1 was the HARDEST paper AND most Govt-Structure-heavy — 7 of 10 q from one chapter",
    description:
      "April 2026 NDA-1 had 5 HARDs in 10 Polity q (50% HARD — bank's highest single-paper %HARD), AND 7 of 10 q were from Government Structure (single-chapter-in-one-paper bank record — usually it's 2–4 q from one chapter). The HARDs concentrated in Parliament (sine-die adjournment + prorogation; Speaker vs President distinction) and Judiciary (HC territorial jurisdictions match-list). Recent shift: 2024–2026 papers show Govt Structure + Constitution dominating with FR/DPSP fading (1 / 3 / 0 q across these years). Don't lock in the 2026 pattern as a trend (N=1), but DO drill 2024–2026 Govt Structure cold — that's where the recent HARDs landed.",
    drill: {
      chapter:
        "Government Structure — Parliament, Judiciary and Constitutional Bodies",
      pyqYears: [2024, 2025, 2026],
      qCount: 12,
      label: "Drill 2024–2026 Govt Structure (the recent cohort)",
    },
  },
  {
    icon: "up",
    title:
      "2021 was the FR/DPSP outlier — 7 q of 14 (50% of paper from one chapter)",
    description:
      "2021 papers carried 7 FR/DPSP questions (50% of that year's 14 Polity q — the only year where FR/DPSP dominated the paper). Pre-2021 the chapter averaged 2 q/yr; post-2021 it's settled to 1–3 q/yr. The 2021 paper was also the EASIEST (0% HARD) — many basic FR identification + DPSP attribution questions. Don't over-prep FR/DPSP relative to recent papers, but do drill the 2021 cohort to anchor on the basic FR + DPSP article-number reference (Article 19 freedoms, FRs available to citizens only vs all persons, Article 51A FD insertion via 42nd 1976).",
    drill: {
      chapter: "Fundamental Rights, DPSP and Local Governance",
      pyqYears: [2021],
      qCount: 7,
      label: "Drill 2021 FR/DPSP cohort (7 q · easy/MOD recall)",
    },
  },
  {
    icon: "down",
    title:
      "World Polity was ABSENT 2018+2019+2020 — but recent 2022+ shows steady 1–3 q/yr",
    description:
      "Through 2017–2020 World Polity contributed 1 + 0 + 0 + 0 = 1 q across 4 years (only 2017 had any). Starting 2021 it's been steady: 1 + 2 + 1 + 2 + 3 + 2 q/yr (2021–2026). Recent papers consistently include 1–3 World Polity questions — usually a UN body composition / UN peacekeeping pairs / Panchsheel / universal-franchise chronology question. The chapter is small (12 q total) but the highest %HARD (42%) — don't drop it because of the small bank share. Drill the UN + democracy + Panchsheel clusters cold for the 2 marks per recent paper.",
    drill: {
      chapter: "World Polity, Democracy and International Relations",
      pyqYears: [2022, 2023, 2024, 2025, 2026],
      qCount: 10,
      label: "Drill 2022–2026 World Polity (the recent re-emergence cohort)",
    },
  },
];
