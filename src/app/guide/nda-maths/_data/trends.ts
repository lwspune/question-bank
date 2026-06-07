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

/**
 * Per-exam-paper distribution: chapter × every individual sitting. Each NDA
 * Maths paper is exactly 120 q; "Apr" papers are NDA-1, "Sep" papers are NDA-2
 * (the project's canonical convention). 2020 and 2026 have an April paper only
 * (NDA-2 2020 COVID-cancelled; NDA-2 2026 not yet written) → 18 papers, 2,160 q.
 * SQL-derived snapshot; integrity-checked in tests/exam-matrix.test.ts (every
 * column sums to 120, every row total matches its cells).
 */
export type ExamPaper = {
  /** Stable id, e.g. "24A" = NDA-1 2024. */
  id: string;
  year: number;
  /** "1" = NDA-1 (April), "2" = NDA-2 (September). */
  sitting: "1" | "2";
};

export const EXAM_PAPERS: ExamPaper[] = [
  { id: "17A", year: 2017, sitting: "1" }, { id: "17S", year: 2017, sitting: "2" },
  { id: "18A", year: 2018, sitting: "1" }, { id: "18S", year: 2018, sitting: "2" },
  { id: "19A", year: 2019, sitting: "1" }, { id: "19S", year: 2019, sitting: "2" },
  { id: "20A", year: 2020, sitting: "1" },
  { id: "21A", year: 2021, sitting: "1" }, { id: "21S", year: 2021, sitting: "2" },
  { id: "22A", year: 2022, sitting: "1" }, { id: "22S", year: 2022, sitting: "2" },
  { id: "23A", year: 2023, sitting: "1" }, { id: "23S", year: 2023, sitting: "2" },
  { id: "24A", year: 2024, sitting: "1" }, { id: "24S", year: 2024, sitting: "2" },
  { id: "25A", year: 2025, sitting: "1" }, { id: "25S", year: 2025, sitting: "2" },
  { id: "26A", year: 2026, sitting: "1" },
];

export type ExamMatrixRow = {
  chapter: string;
  total: number;
  /** Counts aligned 1:1 to EXAM_PAPERS order. */
  counts: number[];
};

// Columns:                          17A 17S 18A 18S 19A 19S 20A 21A 21S 22A 22S 23A 23S 24A 24S 25A 25S 26A
export const EXAM_MATRIX: ExamMatrixRow[] = [
  { chapter: "Matrices & Determinants",     total: 170, counts: [12, 11,  3, 14,  8,  5,  8, 11, 10, 10,  9,  9, 11, 10,  8, 11, 10, 10] },
  { chapter: "Probability",                 total: 162, counts: [ 8,  9,  7,  6, 14,  8,  9,  4,  8,  4, 10,  6, 12, 10, 13,  7, 14, 13] },
  { chapter: "Statistics",                  total: 160, counts: [11,  8, 11, 11,  5, 11, 10, 14, 12, 12,  7, 11,  5,  8,  5,  9,  4,  6] },
  { chapter: "Trigonometric Identities",    total: 138, counts: [10,  3,  5,  6, 15,  9, 16, 11,  2,  6,  9,  6,  7,  6,  5,  9,  5,  8] },
  { chapter: "Functions",                   total: 109, counts: [ 7,  6,  6,  4,  6,  8,  6,  3,  3,  5,  8,  7,  9,  6, 11,  8,  5,  1] },
  { chapter: "Vectors",                     total:  97, counts: [ 5,  5,  5,  8,  5,  5,  5,  5,  5,  5,  5,  4,  5,  5,  5,  5,  7,  8] },
  { chapter: "Lines",                       total:  97, counts: [ 7,  5,  9,  5,  5,  4,  6,  7,  6,  6,  3,  2,  5,  7,  5,  5,  6,  4] },
  { chapter: "Sequence & Series",           total:  89, counts: [ 7,  5,  7,  5,  4,  8,  1,  4,  6,  6,  4,  4,  7,  2,  6,  4,  5,  4] },
  { chapter: "3D Geometry",                 total:  89, counts: [ 5,  6,  5,  4,  5,  5,  5,  5,  5,  5,  4,  6,  5,  5,  6,  5,  4,  4] },
  { chapter: "Differentiation",            total:  85, counts: [ 4,  8,  4,  9,  2,  7,  2,  4,  4,  3,  5,  8,  4,  1,  2,  6,  7,  5] },
  { chapter: "Limits & Continuity",         total:  81, counts: [ 4,  7,  4,  5,  2,  3,  6,  4,  5,  2,  4,  6,  7,  2,  3,  6,  4,  7] },
  { chapter: "Permutation & Combination",   total:  78, counts: [ 3,  2,  4,  5,  4,  5,  3,  2,  6,  6,  5,  8,  2,  5,  4,  6,  4,  4] },
  { chapter: "Application of Derivatives",  total:  73, counts: [ 4,  5,  5,  4,  3,  3,  4,  5,  8,  5,  3,  1,  4,  5,  3,  3,  4,  4] },
  { chapter: "Complex Numbers",             total:  72, counts: [ 6,  3,  7,  2,  4,  3,  2,  5,  5,  2,  3,  5,  6,  5,  5,  3,  3,  3] },
  { chapter: "Sets & Relations",            total:  69, counts: [ 4,  4,  4,  3,  7,  6,  5,  3,  4,  6,  6,  0,  3,  2,  4,  0,  4,  4] },
  { chapter: "Definite Integration",        total:  66, counts: [ 3,  2,  6,  3,  2,  2,  1,  2,  5,  2,  3,  8,  3,  8,  5,  5,  2,  4] },
  { chapter: "Quadratic Equations",         total:  63, counts: [ 3,  4,  1,  2,  3,  6,  2,  4,  5,  4,  2,  4,  4,  4,  4,  1,  6,  4] },
  { chapter: "Differential Equations",      total:  63, counts: [ 5,  4,  5,  5,  5,  3,  5,  5,  3,  4,  3,  3,  2,  4,  2,  0,  3,  2] },
  { chapter: "Binomial Theorem",            total:  54, counts: [ 1,  2,  4,  2,  2,  3,  3,  4,  2,  4,  4,  2,  3,  5,  4,  3,  1,  5] },
  { chapter: "Properties of Triangle",      total:  49, counts: [ 1,  4,  2,  0,  2,  3,  4,  3,  1,  2,  4,  6,  2,  3,  4,  5,  0,  3] },
  { chapter: "Indefinite Integration",      total:  40, counts: [ 3,  2,  1,  3,  2,  2,  4,  3,  3,  2,  3,  0,  0,  4,  2,  1,  3,  2] },
  { chapter: "Conics",                      total:  38, counts: [ 1,  3,  1,  1,  3,  1,  2,  2,  2,  2,  2,  2,  5,  2,  2,  3,  2,  2] },
  { chapter: "Inverse Trigonometry",        total:  34, counts: [ 1,  2,  3,  1,  3,  1,  0,  2,  2,  2,  1,  0,  3,  3,  2,  4,  2,  2] },
  { chapter: "Trigonometric Equations",     total:  33, counts: [ 0,  0,  2,  3,  2,  1,  3,  2,  3,  4,  1,  2,  1,  1,  2,  1,  4,  1] },
  { chapter: "Binomial Distribution",       total:  30, counts: [ 1,  3,  1,  1,  1,  1,  1,  1,  0,  3,  3,  2,  2,  1,  2,  4,  2,  1] },
  { chapter: "Logarithms",                  total:  27, counts: [ 0,  2,  4,  3,  1,  1,  2,  1,  2,  0,  1,  2,  0,  3,  1,  0,  3,  1] },
  { chapter: "Circles",                     total:  27, counts: [ 2,  1,  0,  2,  2,  0,  2,  1,  2,  1,  1,  2,  2,  1,  3,  2,  1,  2] },
  { chapter: "Applications of Integration", total:  25, counts: [ 0,  1,  1,  0,  1,  2,  1,  1,  1,  2,  3,  1,  1,  2,  2,  0,  2,  4] },
  { chapter: "Height & Distance",           total:  24, counts: [ 1,  2,  2,  2,  2,  1,  0,  2,  0,  2,  4,  2,  0,  0,  0,  2,  0,  2] },
  { chapter: "Binary Numbers",              total:  13, counts: [ 1,  1,  1,  1,  0,  1,  1,  0,  0,  2,  0,  1,  0,  0,  0,  1,  3,  0] },
  { chapter: "Linear Inequalities",         total:   5, counts: [ 0,  0,  0,  0,  0,  2,  1,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0] },
];

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
