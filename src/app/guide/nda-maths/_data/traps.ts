/**
 * Content for /guide/nda-maths/traps. Distractor design patterns measured
 * against the live NDA Mathematics PUBLIC bank (2,160 q across 18 papers).
 *
 * Every number here is derived from a SQL query, not a hand-estimate.
 * Refreshed 2026-05-17 after the 2017–2020 PYQ uploads expanded the bank
 * from 1,320 → 2,160 q. Detector definitions are unchanged from the
 * 2026-05-15 ship; the cells just got bigger samples and the rates shifted.
 *
 * Sign-flip detector: per question, a wrong option whose text == "-"
 * prepended to the correct option's text (or vice versa), after stripping
 * `\(…\)` wrappers. Conservative — only catches the literal case.
 *
 * Factor-of-2 detector: per question, a wrong option whose first integer
 * is exactly 2× or ½× the correct option's first integer.
 */

// ─────────────────────────────────────────────────────────────────────
// Positional bias

export type PositionalBiasRow = {
  label: "A" | "B" | "C" | "D";
  count: number;
  pct: number;
};

/** Correct-answer position distribution across the bank, overall. */
export const POSITIONAL_BIAS: PositionalBiasRow[] = [
  { label: "A", count: 537, pct: 24.9 },
  { label: "B", count: 613, pct: 28.4 },
  { label: "C", count: 592, pct: 27.4 },
  { label: "D", count: 418, pct: 19.4 },
];

/** Same distribution, broken out by difficulty. On HARD, A catches up
 *  to C (both ≈ 28%) and B drops to ≈ 25% — closer to flat than the
 *  overall B/C lead. D remains the rarest at every difficulty. */
export type PositionalBiasByDifficulty = {
  label: "A" | "B" | "C" | "D";
  easy: number;
  moderate: number;
  hard: number;
};

export const POSITIONAL_BIAS_BY_DIFFICULTY: PositionalBiasByDifficulty[] = [
  { label: "A", easy: 152, moderate: 253, hard: 132 },
  { label: "B", easy: 197, moderate: 295, hard: 121 },
  { label: "C", easy: 184, moderate: 274, hard: 134 },
  { label: "D", easy: 129, moderate: 189, hard: 100 },
];

// ─────────────────────────────────────────────────────────────────────
// Distractor heatmaps

export type DistractorCell = {
  chapter: string;
  difficulty: "EASY" | "MODERATE" | "HARD";
  pct: number;
  qCount: number;
};

/** Sign-flip distractor rate by chapter × difficulty. Top 12 cells. */
export const SIGN_FLIP_CELLS: DistractorCell[] = [
  { chapter: "Limits & Continuity", difficulty: "HARD", pct: 45.5, qCount: 11 },
  { chapter: "Differentiation", difficulty: "EASY", pct: 26.9, qCount: 26 },
  { chapter: "Differentiation", difficulty: "MODERATE", pct: 25.6, qCount: 39 },
  { chapter: "Differentiation", difficulty: "HARD", pct: 25.0, qCount: 20 },
  { chapter: "Complex Numbers", difficulty: "HARD", pct: 25.0, qCount: 16 },
  { chapter: "Trigonometric Identities", difficulty: "HARD", pct: 23.4, qCount: 47 },
  { chapter: "Complex Numbers", difficulty: "MODERATE", pct: 22.9, qCount: 35 },
  { chapter: "Limits & Continuity", difficulty: "EASY", pct: 21.2, qCount: 33 },
  { chapter: "Trigonometric Identities", difficulty: "EASY", pct: 18.2, qCount: 33 },
  { chapter: "Limits & Continuity", difficulty: "MODERATE", pct: 16.2, qCount: 37 },
  { chapter: "Indefinite Integration", difficulty: "MODERATE", pct: 16.0, qCount: 25 },
  { chapter: "Matrices & Determinants", difficulty: "HARD", pct: 13.5, qCount: 52 },
];

/** Factor-of-2 distractor rate by chapter × difficulty. Top 12 cells
 *  picked for variety + sample size (qCount ≥ 10 except where the
 *  cell is so striking that the 7–9 sample still earns its place). */
export const FACTOR2_CELLS: DistractorCell[] = [
  { chapter: "Sets & Relations", difficulty: "EASY", pct: 82.4, qCount: 17 },
  { chapter: "Complex Numbers", difficulty: "EASY", pct: 80.0, qCount: 10 },
  { chapter: "Definite Integration", difficulty: "EASY", pct: 80.0, qCount: 10 },
  { chapter: "Complex Numbers", difficulty: "HARD", pct: 71.4, qCount: 14 },
  { chapter: "Limits & Continuity", difficulty: "MODERATE", pct: 65.4, qCount: 26 },
  { chapter: "Vectors", difficulty: "MODERATE", pct: 65.0, qCount: 40 },
  { chapter: "Differentiation", difficulty: "EASY", pct: 64.7, qCount: 17 },
  { chapter: "Application of Derivatives", difficulty: "MODERATE", pct: 61.5, qCount: 26 },
  { chapter: "Matrices & Determinants", difficulty: "MODERATE", pct: 57.9, qCount: 38 },
  { chapter: "Lines", difficulty: "HARD", pct: 57.9, qCount: 19 },
  { chapter: "Functions", difficulty: "MODERATE", pct: 55.9, qCount: 34 },
  { chapter: "Permutation & Combination", difficulty: "MODERATE", pct: 54.3, qCount: 35 },
];

// ─────────────────────────────────────────────────────────────────────
// Worked-example UUIDs by trap category. Resolved server-side at request
// time via loadWorkedExamples.

export const FACTOR2_EXAMPLE_IDS: string[] = [
  "9e869f60-e400-4bde-8036-dc36bf83a2a9", // Lines HARD — intercepts sum: correct 3, wrong 6 (×2)
  "445c48fe-564e-4590-a82e-e943440c957c", // P&C HARD — triangles in 10-gon: correct 50, wrongs 25/100 (×½, ×2)
];

export const SIGN_FLIP_EXAMPLE_IDS: string[] = [
  "13579642-a081-446d-a30d-234c0bc227d9", // Limits HARD — piecewise h(x): correct -3/2, wrong 3/2
  "0172c63d-85ef-48d2-9c28-660a04c9f092", // Trig Id HARD — cot 2x cot 4x − …: correct 1, wrong -1
];

export const DOMAIN_MISS_EXAMPLE_IDS: string[] = [
  "7fbd6238-f30f-4eef-9704-192290046493", // Inverse Trig MOD — 4 sin⁻¹x + cos⁻¹x = π → sin⁻¹x + 4 cos⁻¹x
];

// ─────────────────────────────────────────────────────────────────────
// Deep-dive case study. A single HARD question whose 4 options each
// represent a distinct trap shape — the one artefact that teaches the
// trap-spotting pattern.

export type CaseStudyOption = {
  label: "A" | "B" | "C" | "D";
  /** Plain English label of what the option represents. */
  trap:
    | "correct"
    | "sign-flip"
    | "sign-flip + factor"
    | "factor"
    | "domain miss"
    | "method miss";
  /** One-sentence explanation of how a student would arrive at this. */
  why: string;
};

export const CASE_STUDY = {
  /** trig-identities-hard cos(α+2β) — strong because every wrong option
   *  represents a distinct compounding of sign vs magnitude errors. */
  questionId: "2461e050-67e1-4037-ae22-9108a000b300",
  options: [
    {
      label: "A" as const,
      trap: "sign-flip + factor" as const,
      why:
        "−1/√2. Comes from mis-computing α+2β as 3π/4 (sign + magnitude both wrong). Two errors compound — students who didn't sanity-check the quadrant land here.",
    },
    {
      label: "B" as const,
      trap: "sign-flip" as const,
      why:
        "−1/2. The pure sign-flip trap. Correct magnitude (1/2) but the student picked the negative — likely from cos(π − x) confusion or quadrant misidentification.",
    },
    {
      label: "C" as const,
      trap: "correct" as const,
      why:
        "1/2. tan α = 1/7 + sin β = 1/√10 with both in (0, π/2) ⇒ α+2β = π/3 ⇒ cos(α+2β) = 1/2.",
    },
    {
      label: "D" as const,
      trap: "factor" as const,
      why:
        "1/√2. Right sign, wrong magnitude — student treated α+2β as π/4. Often a sign of arithmetic shortcuts on inverse-trig conversions.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// Per-chapter verification rules, grouped by the trap category they catch.

export type VerificationRule = {
  chapter: string;
  rule: string;
  /** Which trap shape this rule defends against. */
  catches: "sign" | "quadrant" | "factor" | "domain" | "framing" | "index";
};

export const VERIFICATION_RULES: VerificationRule[] = [
  {
    chapter: "Limits & Continuity",
    rule: "Verify the sign. 46% of HARD limit questions include a sign-flip distractor.",
    catches: "sign",
  },
  {
    chapter: "Differentiation",
    rule: "Verify the sign even on easy problems. d/dx(sin x) = cos x — but the sign-flip distractor is present in 27% of EASY differentiation q.",
    catches: "sign",
  },
  {
    chapter: "Trigonometric Identities",
    rule: "Verify the quadrant. cos 60° vs cos 120° — the wrong-sign equivalent is almost always one of the 4 options.",
    catches: "quadrant",
  },
  {
    chapter: "Complex Numbers",
    rule: "Verify the argument quadrant. arg z can be θ or θ + π depending on which sign convention you used.",
    catches: "quadrant",
  },
  {
    chapter: "Inverse Trigonometry",
    rule: "Verify the principal range. sin⁻¹(−x) = −sin⁻¹(x), but cos⁻¹(−x) = π − cos⁻¹(x). Different rules.",
    catches: "domain",
  },
  {
    chapter: "Lines",
    rule: "Verify the factor of 2. Triangle area, midpoint, intercept lengths — 58% of HARD line questions include a ×2 or ×½ wrong option.",
    catches: "factor",
  },
  {
    chapter: "Vectors",
    rule: "Verify the factor of 2. Magnitude vs sum of components, dot product vs cross — 65% of MODERATE vector q have factor-2 distractors.",
    catches: "factor",
  },
  {
    chapter: "Permutation & Combination",
    rule: "Verify whether the arrangement counts each pair twice. Boys-girls-together, geometric counting — factor-2 errors are in 54% of MODERATE P&C.",
    catches: "factor",
  },
  {
    chapter: "Statistics",
    rule: "Verify which formula: σ² with n vs n−1 (sample vs population); mean of grouped data vs ungrouped.",
    catches: "framing",
  },
  {
    chapter: "Matrices & Determinants",
    rule: "Verify the row/column index. a_{ij} not a_{ji}; cofactor of (i, j) involves (−1)^(i+j).",
    catches: "index",
  },
  {
    chapter: "Probability",
    rule: "Verify the framing. Many questions LOOK like classical probability but actually want conditional — check for \"given that\".",
    catches: "framing",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Headline numbers used in the hero stats.

export const TRAP_HEADLINE = {
  /** Number of distinct trap categories surfaced on the page. */
  categories: 4,
  /** Highest factor-of-2 cell — Sets & Relations EASY. */
  topFactor2: { pct: 82, chapter: "Sets & Relations", difficulty: "EASY" as const },
  /** Highest sign-flip cell — Limits & Continuity HARD. */
  topSignFlip: { pct: 46, chapter: "Limits & Continuity", difficulty: "HARD" as const },
  /** Number of verification rules. */
  rules: VERIFICATION_RULES.length,
};
