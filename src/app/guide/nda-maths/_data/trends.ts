/**
 * Content for /guide/nda-maths/trends. Year-by-year principle prevalence,
 * the 4 biggest drifts, and a "practice 2025+2026 first" recommendation.
 *
 * Numbers come from the principle-tagging analysis (counts per paper-set).
 * Note: 2021–2025 = 240 q each (NDA 1 + NDA 2 shifts); 2026 = 120 q (NDA 2
 * hasn't been written yet at the snapshot date).
 */

export type DriftRow = {
  principle: string;
  /** Counts indexed by year 2021..2026. */
  counts: { 2021: number; 2022: number; 2023: number; 2024: number; 2025: number; 2026: number };
};

export const DRIFT_ROWS: DriftRow[] = [
  { principle: "Vieta / sum-product of roots", counts: { 2021: 13, 2022: 10, 2023: 11, 2024: 8, 2025: 4, 2026: 5 } },
  { principle: "AM-GM family", counts: { 2021: 10, 2022: 10, 2023: 6, 2024: 4, 2025: 11, 2026: 2 } },
  { principle: "AP / GP relations", counts: { 2021: 9, 2022: 7, 2023: 8, 2024: 7, 2025: 8, 2026: 5 } },
  { principle: "Cube roots of unity (ω)", counts: { 2021: 1, 2022: 0, 2023: 4, 2024: 3, 2025: 3, 2026: 1 } },
  { principle: "Double-angle / half-angle", counts: { 2021: 2, 2022: 3, 2023: 6, 2024: 0, 2025: 5, 2026: 3 } },
  { principle: "Triangle (sine/cosine rules)", counts: { 2021: 3, 2022: 5, 2023: 6, 2024: 7, 2025: 5, 2026: 3 } },
  { principle: "Conditional probability / Bayes", counts: { 2021: 3, 2022: 5, 2023: 3, 2024: 2, 2025: 4, 2026: 2 } },
  { principle: "Inclusion-exclusion", counts: { 2021: 4, 2022: 11, 2023: 1, 2024: 3, 2025: 6, 2026: 5 } },
  { principle: "Modulus / absolute value", counts: { 2021: 4, 2022: 4, 2023: 15, 2024: 10, 2025: 15, 2026: 1 } },
  { principle: "Limits / L'Hôpital", counts: { 2021: 6, 2022: 6, 2023: 11, 2024: 3, 2025: 8, 2026: 3 } },
  { principle: "Differentiability conditions", counts: { 2021: 5, 2022: 1, 2023: 8, 2024: 2, 2025: 7, 2026: 6 } },
  { principle: "Extrema (max/min)", counts: { 2021: 10, 2022: 12, 2023: 10, 2024: 14, 2025: 6, 2026: 6 } },
  { principle: "Determinants", counts: { 2021: 11, 2022: 6, 2023: 8, 2024: 3, 2025: 4, 2026: 7 } },
];

export const YEARS = [2021, 2022, 2023, 2024, 2025, 2026] as const;

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
    title: "Modulus jumped 4 → 15 in 2023",
    description:
      "The single biggest principle drift in 5 years. Stayed elevated through 2024 and 2025. If you only practiced pre-2023 papers, you are undertrained on |x| and [x] questions.",
    drill: {
      chapter: "Limits & Continuity",
      subtopic: "One-Sided Limits, Greatest Integer, and Absolute Value Limits",
      qCount: 15,
      label: "Drill 15 modulus-in-limits questions",
    },
  },
  {
    icon: "down",
    title: "Vieta dropped 13 → 5",
    description:
      "NDA is moving away from \"roots of equation\" framings. Still 4-5 questions per paper, but no longer the dominant trick it was in 2021.",
    drill: {
      chapter: "Quadratic Equations",
      subtopic: "Vieta's Relations and Root-Coefficient Identities",
      qCount: 19,
      label: "Drill 19 Vieta questions",
    },
  },
  {
    icon: "up",
    title: "Cube roots of unity appeared post-2022",
    description:
      "Barely existed in 2021–22 (0–1 q per paper-set). Now consistently 3 q across 2023–25. Drill the ω³ = 1, 1+ω+ω² = 0 patterns.",
    drill: {
      chapter: "Complex Numbers",
      subtopic: "Cube Roots of Unity",
      qCount: 12,
      label: "Drill 12 cube-roots-of-unity questions",
    },
  },
  {
    icon: "down",
    title: "Determinants halved since 2021",
    description:
      "From 11 q in 2021 down to 3-4 in 2024-25. Counter to popular belief that M&D is always 10/paper — the aggregate is, but determinant-specific has shrunk and matrix operations took over.",
    drill: {
      chapter: "Matrices & Determinants",
      subtopic: "Determinant Properties, Operations, and Sums",
      qCount: 39,
      label: "Drill 39 determinant questions",
    },
  },
];
