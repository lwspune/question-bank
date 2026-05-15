/**
 * Content for /guide/nda-maths/traps. Distractor design patterns measured
 * against the live NDA Mathematics PUBLIC bank (1,320 q across 11 papers).
 *
 * Every number here is derived from a SQL query, not a hand-estimate — see
 * the 2026-05-15 "Traps section rewrite" decision-log entry in CLAUDE.md
 * for the queries and rationale.
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
  { label: "A", count: 314, pct: 23.8 },
  { label: "B", count: 363, pct: 27.5 },
  { label: "C", count: 368, pct: 27.9 },
  { label: "D", count: 275, pct: 20.8 },
];

/** Same distribution, broken out by difficulty. The HARD column reverses
 *  the overall ranking — A becomes the most common, D the rarest. */
export type PositionalBiasByDifficulty = {
  label: "A" | "B" | "C" | "D";
  easy: number;
  moderate: number;
  hard: number;
};

export const POSITIONAL_BIAS_BY_DIFFICULTY: PositionalBiasByDifficulty[] = [
  { label: "A", easy: 86, moderate: 138, hard: 90 },
  { label: "B", easy: 109, moderate: 176, hard: 78 },
  { label: "C", easy: 109, moderate: 171, hard: 88 },
  { label: "D", easy: 71, moderate: 138, hard: 66 },
];

// ─────────────────────────────────────────────────────────────────────
// Distractor heatmaps

export type DistractorCell = {
  chapter: string;
  difficulty: "EASY" | "MODERATE" | "HARD";
  pct: number;
  qCount: number;
};

/** Sign-flip distractor rate by chapter × difficulty.
 *  Detector: per question, a wrong option whose text == "-" prepended to
 *  the correct option's text (or vice versa), after stripping `\(…\)`
 *  wrappers. Conservative — only catches the literal case. */
export const SIGN_FLIP_CELLS: DistractorCell[] = [
  { chapter: "Limits & Continuity", difficulty: "HARD", pct: 62.5, qCount: 8 },
  { chapter: "Logarithms", difficulty: "HARD", pct: 50.0, qCount: 2 },
  { chapter: "Differentiation", difficulty: "HARD", pct: 38.5, qCount: 13 },
  { chapter: "Differentiation", difficulty: "MODERATE", pct: 35.0, qCount: 20 },
  { chapter: "Trigonometric Identities", difficulty: "HARD", pct: 32.0, qCount: 25 },
  { chapter: "Differentiation", difficulty: "EASY", pct: 31.3, qCount: 16 },
  { chapter: "Limits & Continuity", difficulty: "EASY", pct: 27.8, qCount: 18 },
  { chapter: "Complex Numbers", difficulty: "MODERATE", pct: 25.0, qCount: 24 },
  { chapter: "Indefinite Integration", difficulty: "HARD", pct: 25.0, qCount: 8 },
  { chapter: "Trigonometric Identities", difficulty: "EASY", pct: 23.8, qCount: 21 },
  { chapter: "Indefinite Integration", difficulty: "MODERATE", pct: 23.1, qCount: 13 },
  { chapter: "Quadratic Equations", difficulty: "MODERATE", pct: 21.4, qCount: 14 },
];

/** Factor-of-2 distractor rate by chapter × difficulty. The dominant trap
 *  in NDA Maths — more frequent than sign-flip across almost every chapter.
 *  Detector: per question, a wrong option whose first integer is exactly
 *  2× or ½× the correct option's first integer. */
export const FACTOR2_CELLS: DistractorCell[] = [
  { chapter: "Sets & Relations", difficulty: "EASY", pct: 90.0, qCount: 10 },
  { chapter: "Indefinite Integration", difficulty: "HARD", pct: 80.0, qCount: 5 },
  { chapter: "Lines", difficulty: "HARD", pct: 66.7, qCount: 12 },
  { chapter: "Limits & Continuity", difficulty: "HARD", pct: 66.7, qCount: 6 },
  { chapter: "Applications of Integration", difficulty: "EASY", pct: 66.7, qCount: 6 },
  { chapter: "Vectors", difficulty: "MODERATE", pct: 64.5, qCount: 31 },
  { chapter: "Permutation & Combination", difficulty: "MODERATE", pct: 63.0, qCount: 27 },
  { chapter: "Application of Derivatives", difficulty: "MODERATE", pct: 62.5, qCount: 16 },
  { chapter: "Conics", difficulty: "EASY", pct: 62.5, qCount: 8 },
  { chapter: "Complex Numbers", difficulty: "EASY", pct: 62.5, qCount: 8 },
  { chapter: "Complex Numbers", difficulty: "HARD", pct: 55.6, qCount: 9 },
  { chapter: "Definite Integration", difficulty: "EASY", pct: 58.3, qCount: 12 },
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
    rule: "Verify the sign. 62% of HARD limit questions include a sign-flip distractor.",
    catches: "sign",
  },
  {
    chapter: "Differentiation",
    rule: "Verify the sign even on easy problems. d/dx(sin x) = cos x — but the sign-flip distractor is present in 31% of EASY differentiation q.",
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
    rule: "Verify the factor of 2. Triangle area, midpoint, intercept lengths — 67% of HARD line questions include a ×2 or ×½ wrong option.",
    catches: "factor",
  },
  {
    chapter: "Vectors",
    rule: "Verify the factor of 2. Magnitude vs sum of components, dot product vs cross — 65% of MODERATE vector q have factor-2 distractors.",
    catches: "factor",
  },
  {
    chapter: "Permutation & Combination",
    rule: "Verify whether the arrangement counts each pair twice. Boys-girls-together, geometric counting — factor-2 errors are in 63% of MODERATE P&C.",
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
  topFactor2: { pct: 90, chapter: "Sets & Relations", difficulty: "EASY" as const },
  /** Highest sign-flip cell — Limits & Continuity HARD. */
  topSignFlip: { pct: 62, chapter: "Limits & Continuity", difficulty: "HARD" as const },
  /** Number of verification rules. */
  rules: VERIFICATION_RULES.length,
};
