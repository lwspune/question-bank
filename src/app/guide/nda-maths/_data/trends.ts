/**
 * Content for /guide/nda-maths/trends. Year-by-year principle prevalence
 * across the 2017–2026 NDA Mathematics bank, the 4 biggest drifts, and a
 * "practice 2025+2026 first" recommendation.
 *
 * Counts: the first 12 rows are ONE ROW PER `TOP_PRINCIPLES` slug, read from
 * `question_principle_tags` (migration 0023) joined with `questions.pyq_year`.
 * The 4 long-tail rows (Conditional/Bayes, Determinants, Limit techniques,
 * Extrema) come from the named subtopic's year aggregation — they're
 * single-chapter principles without DB tags.
 *
 * Re-derived 2026-09-14 against the 2,280-q PUBLIC bank. TWO things moved,
 * and only one of them was the new paper:
 *
 *   1. NDA-2 2026 (written 2026-09-14) made 2026 a COMPLETE year, so its
 *      column is now a full 240-q paper-set like every year but 2020.
 *   2. The pre-2026 columns of the TAG-BACKED rows ALSO moved, because
 *      principle tagging continued after the original 2026-05-17 snapshot and
 *      this table was never re-derived. The 4 subtopic-backed rows reconciled
 *      EXACTLY for 2017–2025, which is what isolated the drift to the tag
 *      table rather than to the bank.
 *
 * The 12 tag rows sum to 529, which is the exact row count of
 * `question_principle_tags` — so every tag in the table is represented here
 * and none is double-counted. Previously the modulus row silently bundled the
 * greatest-integer and piecewise families; those now have their own rows, so
 * a reader can no longer mistake a bundled total for a single principle.
 *
 * Paper-set sizes: 240 q each for every year EXCEPT 2020, which has 120
 * because NDA-2 2020 was COVID-cancelled. 2026 is now a full 240.
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
  { principle: "Modulus / absolute value",        counts: { 2017: 11, 2018: 10, 2019: 6, 2020: 2, 2021: 5, 2022: 4, 2023: 17, 2024: 16, 2025: 11, 2026: 12 } },
  { principle: "Greatest integer / floor",        counts: { 2017: 4, 2018: 3, 2019: 0, 2020: 0, 2021: 2, 2022: 3, 2023: 4, 2024: 8, 2025: 5, 2026: 2 } },
  { principle: "Piecewise definitions",           counts: { 2017: 4, 2018: 1, 2019: 2, 2020: 0, 2021: 2, 2022: 1, 2023: 5, 2024: 0, 2025: 6, 2026: 2 } },
  { principle: "Vieta / sum-product of roots",    counts: { 2017: 9, 2018: 3, 2019: 6, 2020: 2, 2021: 7, 2022: 5, 2023: 8, 2024: 5, 2025: 2, 2026: 5 } },
  { principle: "Binomial-coefficient identities", counts: { 2017: 4, 2018: 5, 2019: 5, 2020: 3, 2021: 7, 2022: 9, 2023: 7, 2024: 3, 2025: 2, 2026: 4 } },
  { principle: "Inclusion-exclusion",             counts: { 2017: 4, 2018: 7, 2019: 7, 2020: 3, 2021: 1, 2022: 7, 2023: 1, 2024: 3, 2025: 7, 2026: 9 } },
  { principle: "Compound angle",                  counts: { 2017: 3, 2018: 5, 2019: 9, 2020: 5, 2021: 7, 2022: 2, 2023: 1, 2024: 7, 2025: 2, 2026: 7 } },
  { principle: "Sine / cosine rules",             counts: { 2017: 5, 2018: 3, 2019: 5, 2020: 2, 2021: 3, 2022: 4, 2023: 9, 2024: 2, 2025: 7, 2026: 5 } },
  { principle: "Double / half-angle",             counts: { 2017: 4, 2018: 2, 2019: 4, 2020: 5, 2021: 3, 2022: 5, 2023: 6, 2024: 3, 2025: 5, 2026: 7 } },
  { principle: "AP three-term (2b = a + c)",      counts: { 2017: 1, 2018: 3, 2019: 5, 2020: 1, 2021: 7, 2022: 2, 2023: 3, 2024: 2, 2025: 4, 2026: 5 } },
  { principle: "AM-GM family",                    counts: { 2017: 3, 2018: 3, 2019: 3, 2020: 1, 2021: 5, 2022: 3, 2023: 5, 2024: 1, 2025: 4, 2026: 4 } },
  { principle: "Cube roots of unity (ω)",         counts: { 2017: 3, 2018: 2, 2019: 2, 2020: 0, 2021: 3, 2022: 0, 2023: 5, 2024: 7, 2025: 4, 2026: 3 } },
  { principle: "Conditional probability / Bayes", counts: { 2017: 3, 2018: 5, 2019: 3, 2020: 2, 2021: 3, 2022: 4, 2023: 2, 2024: 2, 2025: 4, 2026: 3 } },
  { principle: "Determinants",                    counts: { 2017: 7, 2018: 5, 2019: 6, 2020: 2, 2021: 11, 2022: 6, 2023: 8, 2024: 3, 2025: 4, 2026: 9 } },
  { principle: "Limits / L'Hôpital",              counts: { 2017: 4, 2018: 4, 2019: 2, 2020: 4, 2021: 4, 2022: 5, 2023: 3, 2024: 1, 2025: 2, 2026: 5 } },
  { principle: "Extrema (max/min)",               counts: { 2017: 4, 2018: 3, 2019: 3, 2020: 0, 2021: 5, 2022: 4, 2023: 3, 2024: 8, 2025: 4, 2026: 6 } },
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
 * (the project's canonical convention). 2020 is now the ONLY single-paper year
 * (NDA-2 2020 was COVID-cancelled) → 19 papers, 2,280 q. NDA-2 2026 was written
 * on 2026-09-14 and ingested the same day, which is what took 2026 from one
 * paper to two and the matrix from 18 columns to 19.
 * SQL-derived snapshot; integrity-checked in tests/exam-matrix.test.ts (every
 * column sums to 120, every row total matches its cells). The 19-column
 * regeneration reproduced all 18 pre-existing columns byte-for-byte, so the
 * hand-typed history and the live bank are known to agree.
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
  { id: "26A", year: 2026, sitting: "1" }, { id: "26S", year: 2026, sitting: "2" },
];

export type ExamMatrixRow = {
  chapter: string;
  total: number;
  /** Counts aligned 1:1 to EXAM_PAPERS order. */
  counts: number[];
};

// Columns: 17A  17S  18A  18S  19A  19S  20A  21A  21S  22A  22S  23A  23S  24A  24S  25A  25S  26A  26S
export const EXAM_MATRIX: ExamMatrixRow[] = [
  { chapter: "Matrices & Determinants",     total: 181, counts: [12, 11,  3, 14,  8,  5,  8, 11, 10, 10,  9,  9, 11, 10,  8, 11, 10, 10, 11] },
  { chapter: "Probability",                 total: 176, counts: [ 8,  9,  7,  6, 14,  8,  9,  4,  8,  4, 10,  6, 12, 10, 13,  7, 14, 13, 14] },
  { chapter: "Statistics",                  total: 165, counts: [11,  8, 11, 11,  5, 11, 10, 14, 12, 12,  7, 11,  5,  8,  5,  9,  4,  6,  5] },
  { chapter: "Trigonometric Identities",    total: 145, counts: [10,  3,  5,  6, 15,  9, 16, 11,  2,  6,  9,  6,  7,  6,  5,  9,  5,  8,  7] },
  { chapter: "Functions",                   total: 115, counts: [ 7,  6,  6,  4,  6,  8,  6,  3,  3,  5,  8,  7,  9,  6, 11,  8,  5,  1,  6] },
  { chapter: "Lines",                       total: 104, counts: [ 7,  5,  9,  5,  5,  4,  6,  7,  6,  6,  3,  2,  5,  7,  5,  5,  6,  4,  7] },
  { chapter: "Vectors",                     total: 102, counts: [ 5,  5,  5,  8,  5,  5,  5,  5,  5,  5,  5,  4,  5,  5,  5,  5,  7,  8,  5] },
  { chapter: "3D Geometry",                 total:  94, counts: [ 5,  6,  5,  4,  5,  5,  5,  5,  5,  5,  4,  6,  5,  5,  6,  5,  4,  4,  5] },
  { chapter: "Sequence & Series",           total:  93, counts: [ 7,  5,  7,  5,  4,  8,  1,  4,  6,  6,  4,  4,  7,  2,  6,  4,  5,  4,  4] },
  { chapter: "Differentiation",             total:  89, counts: [ 4,  8,  4,  9,  2,  7,  2,  4,  4,  3,  5,  8,  4,  1,  2,  6,  7,  5,  4] },
  { chapter: "Limits & Continuity",         total:  87, counts: [ 4,  7,  4,  5,  2,  3,  6,  4,  5,  2,  4,  6,  7,  2,  3,  6,  4,  7,  6] },
  { chapter: "Permutation & Combination",   total:  80, counts: [ 3,  2,  4,  5,  4,  5,  3,  2,  6,  6,  5,  8,  2,  5,  4,  6,  4,  4,  2] },
  { chapter: "Application of Derivatives",  total:  76, counts: [ 4,  5,  5,  4,  3,  3,  4,  5,  8,  5,  3,  1,  4,  5,  3,  3,  4,  4,  3] },
  { chapter: "Complex Numbers",             total:  76, counts: [ 6,  3,  7,  2,  4,  3,  2,  5,  5,  2,  3,  5,  6,  5,  5,  3,  3,  3,  4] },
  { chapter: "Sets & Relations",            total:  75, counts: [ 4,  4,  4,  3,  7,  6,  5,  3,  4,  6,  6,  0,  3,  2,  4,  0,  4,  4,  6] },
  { chapter: "Definite Integration",        total:  69, counts: [ 3,  2,  6,  3,  2,  2,  1,  2,  5,  2,  3,  8,  3,  8,  5,  5,  2,  4,  3] },
  { chapter: "Differential Equations",      total:  67, counts: [ 5,  4,  5,  5,  5,  3,  5,  5,  3,  4,  3,  3,  2,  4,  2,  0,  3,  2,  4] },
  { chapter: "Quadratic Equations",         total:  67, counts: [ 3,  4,  1,  2,  3,  6,  2,  4,  5,  4,  2,  4,  4,  4,  4,  1,  6,  4,  4] },
  { chapter: "Binomial Theorem",            total:  56, counts: [ 1,  2,  4,  2,  2,  3,  3,  4,  2,  4,  4,  2,  3,  5,  4,  3,  1,  5,  2] },
  { chapter: "Properties of Triangle",      total:  52, counts: [ 1,  4,  2,  0,  2,  3,  4,  3,  1,  2,  4,  6,  2,  3,  4,  5,  0,  3,  3] },
  { chapter: "Indefinite Integration",      total:  42, counts: [ 3,  2,  1,  3,  2,  2,  4,  3,  3,  2,  3,  0,  0,  4,  2,  1,  3,  2,  2] },
  { chapter: "Conics",                      total:  40, counts: [ 1,  3,  1,  1,  3,  1,  2,  2,  2,  2,  2,  2,  5,  2,  2,  3,  2,  2,  2] },
  { chapter: "Inverse Trigonometry",        total:  36, counts: [ 1,  2,  3,  1,  3,  1,  0,  2,  2,  2,  1,  0,  3,  3,  2,  4,  2,  2,  2] },
  { chapter: "Trigonometric Equations",     total:  34, counts: [ 0,  0,  2,  3,  2,  1,  3,  2,  3,  4,  1,  2,  1,  1,  2,  1,  4,  1,  1] },
  { chapter: "Binomial Distribution",       total:  31, counts: [ 1,  3,  1,  1,  1,  1,  1,  1,  0,  3,  3,  2,  2,  1,  2,  4,  2,  1,  1] },
  { chapter: "Circles",                     total:  28, counts: [ 2,  1,  0,  2,  2,  0,  2,  1,  2,  1,  1,  2,  2,  1,  3,  2,  1,  2,  1] },
  { chapter: "Applications of Integration", total:  27, counts: [ 0,  1,  1,  0,  1,  2,  1,  1,  1,  2,  3,  1,  1,  2,  2,  0,  2,  4,  2] },
  { chapter: "Logarithms",                  total:  27, counts: [ 0,  2,  4,  3,  1,  1,  2,  1,  2,  0,  1,  2,  0,  3,  1,  0,  3,  1,  0] },
  { chapter: "Height & Distance",           total:  26, counts: [ 1,  2,  2,  2,  2,  1,  0,  2,  0,  2,  4,  2,  0,  0,  0,  2,  0,  2,  2] },
  { chapter: "Binary Numbers",              total:  14, counts: [ 1,  1,  1,  1,  0,  1,  1,  0,  0,  2,  0,  1,  0,  0,  0,  1,  3,  0,  1] },
  { chapter: "Linear Inequalities",         total:   6, counts: [ 0,  0,  0,  0,  0,  2,  1,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  1] },
];

export const DRIFT_CALLOUTS: DriftCallout[] = [
  {
    icon: "up",
    title: "Modulus jumped in 2023 and has stayed there for four paper-sets",
    description:
      "The biggest principle drift in the 10-year window. 2017–22 averaged ~6 modulus questions per paper-set; 2023–26 averaged ~14. The 2023 paper-set carried 17, up from 4 the year before, and it has not come back down — the completed 2026 pair carries 12. Note this row now counts modulus ALONE: greatest-integer and piecewise definitions have their own rows (2 and 2 in 2026), so the whole non-smooth family runs higher still. If you only practiced 2017–22 papers, you are undertrained on |x|, ⌊x⌋ and defined-by-cases questions.",
    drill: {
      chapter: "Limits & Continuity",
      subtopic: "One-Sided Limits, Greatest Integer, and Absolute Value Limits",
      qCount: 17,
      label: "Drill 17 modulus-in-limits questions",
    },
  },
  {
    icon: "up",
    title: "Vieta's 2025 collapse was a one-year dip, not a decline",
    description:
      "Read on the 2026 NDA-1 paper alone, Vieta looked like it was being retired: 9 questions in 2017, a 5–8 baseline through 2024, then 2 in 2025. The completed 2026 pair carries 5, back inside that long-run baseline. This is the clearest case on the page of a half-year reading inverting a trend — the previous version of this guide called it a plunge, and the September paper refuted it. Treat single-sitting moves in a 2–9 range as noise.",
    drill: {
      chapter: "Quadratic Equations",
      subtopic: "Vieta's Relations and Root-Coefficient Identities",
      qCount: 29,
      label: "Drill 29 Vieta questions",
    },
  },
  {
    icon: "down",
    title: "Cube roots of unity spiked 2023–24 and is easing off",
    description:
      "ω held a 2–3 q baseline through 2017–22 (it was always present — earlier guide claims of \"appeared post-2022\" were wrong on the longer window). Then 2023+2024 broke out to 5+7, and it has eased since: 4 in 2025, 3 across the full 2026 pair. Still worth the drill — the ω-Vieta compound remains a paper-setter favourite — but it is no longer accelerating.",
    drill: {
      chapter: "Complex Numbers",
      subtopic: "Cube Roots of Unity",
      qCount: 18,
      label: "Drill 18 cube-roots-of-unity questions",
    },
  },
  {
    icon: "up",
    title: "Determinants have fully recovered from their 2024–25 trough",
    description:
      "Determinant Properties hit 11 q in the 2021 paper-set, then fell to 3 and 4 in 2024 and 2025. The completed 2026 pair carries 9 — not the early signal the NDA-1 half suggested, but a confirmed return to the 2021–23 level. Matrices & Determinants as a whole is the bank's largest chapter at 181 q and a dependable 8–11 q/paper; what moves is the principle mix inside it, and right now determinant evaluation is back on top.",
    drill: {
      chapter: "Matrices & Determinants",
      subtopic: "Determinant Properties, Operations, and Sums",
      qCount: 61,
      label: "Drill 61 determinant questions",
    },
  },
];
