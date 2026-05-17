/**
 * Content for /guide/nda-maths/trends. Year-by-year principle prevalence
 * across the 2017–2026 NDA Mathematics bank, the 4 biggest drifts, and a
 * "practice 2025+2026 first" recommendation.
 *
 * Counts: 11 TOP_11 principles come from `question_principle_tags`
 * (migration 0023) joined with `questions.pyq_year`. The 4 long-tail rows
 * (Conditional/Bayes, Determinants, Limit techniques, Extrema) come from
 * the named subtopic's year aggregation — they're single-chapter principles
 * without DB tags. SQL-derived against the 2,160-q PUBLIC bank as of
 * OVERVIEW.asOf in `nda-maths.ts`.
 *
 * Paper-set sizes: 240 q each for 2017, 2018, 2019, 2021, 2022, 2023, 2024,
 * 2025 (both NDA-1 + NDA-2 papers). 2020 has 120 q because NDA-2 2020 was
 * COVID-cancelled. 2026 has 120 q because NDA-2 2026 hasn't been written
 * yet at the snapshot date.
 */

export type DriftRow = {
  principle: string;
  /** Counts indexed by year 2017..2026. */
  counts: {
    2017: number;
    2018: number;
    2019: number;
    2020: number;
    2021: number;
    2022: number;
    2023: number;
    2024: number;
    2025: number;
    2026: number;
  };
};

export const DRIFT_ROWS: DriftRow[] = [
  { principle: "Modulus / absolute value",        counts: { 2017: 14, 2018: 12, 2019: 7,  2020: 2, 2021: 7,  2022: 7,  2023: 20, 2024: 15, 2025: 17, 2026: 5 } },
  { principle: "Vieta / sum-product of roots",    counts: { 2017: 9,  2018: 3,  2019: 6,  2020: 2, 2021: 7,  2022: 5,  2023: 8,  2024: 5,  2025: 2,  2026: 2 } },
  { principle: "Binomial-coefficient identities", counts: { 2017: 4,  2018: 5,  2019: 5,  2020: 3, 2021: 7,  2022: 9,  2023: 7,  2024: 3,  2025: 2,  2026: 3 } },
  { principle: "Inclusion-exclusion",             counts: { 2017: 4,  2018: 7,  2019: 7,  2020: 3, 2021: 1,  2022: 7,  2023: 1,  2024: 3,  2025: 7,  2026: 4 } },
  { principle: "Compound angle",                  counts: { 2017: 3,  2018: 5,  2019: 9,  2020: 5, 2021: 7,  2022: 2,  2023: 1,  2024: 7,  2025: 2,  2026: 1 } },
  { principle: "Sine / cosine rules",             counts: { 2017: 5,  2018: 3,  2019: 5,  2020: 2, 2021: 3,  2022: 4,  2023: 9,  2024: 2,  2025: 7,  2026: 2 } },
  { principle: "Double / half-angle",             counts: { 2017: 4,  2018: 2,  2019: 4,  2020: 5, 2021: 3,  2022: 5,  2023: 6,  2024: 3,  2025: 5,  2026: 4 } },
  { principle: "AP three-term (2b = a + c)",      counts: { 2017: 1,  2018: 3,  2019: 5,  2020: 1, 2021: 7,  2022: 2,  2023: 3,  2024: 2,  2025: 4,  2026: 4 } },
  { principle: "AM-GM family",                    counts: { 2017: 3,  2018: 3,  2019: 3,  2020: 1, 2021: 5,  2022: 3,  2023: 5,  2024: 1,  2025: 4,  2026: 3 } },
  { principle: "Cube roots of unity (ω)",         counts: { 2017: 3,  2018: 2,  2019: 2,  2020: 0, 2021: 3,  2022: 0,  2023: 5,  2024: 7,  2025: 4,  2026: 3 } },
  { principle: "Differentiability conditions",    counts: { 2017: 6,  2018: 3,  2019: 0,  2020: 1, 2021: 2,  2022: 1,  2023: 1,  2024: 1,  2025: 4,  2026: 5 } },
  { principle: "Conditional probability / Bayes", counts: { 2017: 3,  2018: 5,  2019: 3,  2020: 2, 2021: 3,  2022: 4,  2023: 2,  2024: 2,  2025: 4,  2026: 1 } },
  { principle: "Determinants",                    counts: { 2017: 7,  2018: 5,  2019: 6,  2020: 2, 2021: 11, 2022: 6,  2023: 8,  2024: 3,  2025: 4,  2026: 7 } },
  { principle: "Limits / L'Hôpital",              counts: { 2017: 4,  2018: 4,  2019: 2,  2020: 4, 2021: 4,  2022: 5,  2023: 3,  2024: 1,  2025: 2,  2026: 2 } },
  { principle: "Extrema (max/min)",               counts: { 2017: 4,  2018: 3,  2019: 3,  2020: 0, 2021: 5,  2022: 4,  2023: 3,  2024: 8,  2025: 4,  2026: 4 } },
];

export const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;

export type DriftCallout = {
  icon: "up" | "down";
  title: string;
  description: string;
  /** Optional: chapter/subtopic + year list to deep-link from the CTA. */
  drill?: {
    chapter?: string;
    subtopic?: string;
    pyqYears?: number[];
    qCount: number;
    label: string;
  };
};

export const DRIFT_CALLOUTS: DriftCallout[] = [
  {
    icon: "up",
    title: "Modulus tripled in 2023 and stayed elevated",
    description:
      "The single biggest principle drift in the 10-year window. 2018–22 averaged ~8 q/paper-set; 2023–25 averaged ~17. The 2023 paper-set alone had 20 modulus-tagged questions, up from 7 the year before. If you only practiced 2017–22 papers, you are undertrained on |x| and ⌊x⌋ questions.",
    drill: {
      chapter: "Limits & Continuity",
      subtopic: "One-Sided Limits, Greatest Integer, and Absolute Value Limits",
      qCount: 16,
      label: "Drill 16 modulus-in-limits questions",
    },
  },
  {
    icon: "down",
    title: "Vieta plunged to 2 q/paper-set in 2025–26",
    description:
      "Vieta peaked at 9 q in 2017 and held a 5–8 q baseline through 2024. The last two paper-sets dropped to 2 q each — NDA is moving away from \"roots of equation\" framings. Still tested, but no longer the dominant trick it was a decade ago.",
    drill: {
      chapter: "Quadratic Equations",
      subtopic: "Vieta's Relations and Root-Coefficient Identities",
      qCount: 26,
      label: "Drill 26 Vieta questions",
    },
  },
  {
    icon: "up",
    title: "Cube roots of unity spiked 2023–24",
    description:
      "ω held a 2–3 q baseline through 2017–22 (it was always present — earlier guide claims of \"appeared post-2022\" were wrong on the longer window). Then 2023+2024 broke out to 5+7 q, and 2025–26 settled at 3–4. The ω-Vieta compound is now paper-setters' favourite.",
    drill: {
      chapter: "Complex Numbers",
      subtopic: "Cube Roots of Unity",
      qCount: 18,
      label: "Drill 18 cube-roots-of-unity questions",
    },
  },
  {
    icon: "down",
    title: "Determinants peaked in 2021 — and recovered in 2026",
    description:
      "Determinant Properties hit 11 q in the 2021 paper-set (the highest single-year count for any principle on this page). Settled to 3–4 q in 2024–25. The 2026 NDA-1 alone has 7 — early signal that determinant evaluation is making a comeback. M&D as a whole is still ~9 q/paper, but the principle mix inside it is shifting.",
    drill: {
      chapter: "Matrices & Determinants",
      subtopic: "Determinant Properties, Operations, and Sums",
      qCount: 59,
      label: "Drill 59 determinant questions",
    },
  },
];
