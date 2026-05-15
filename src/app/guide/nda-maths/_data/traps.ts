/**
 * Content for /guide/nda-maths/traps. Distractor design patterns and the
 * last-step verification rules that catch them.
 */

export type PositionalBiasRow = {
  label: "A" | "B" | "C" | "D";
  count: number;
  pct: number;
};

/** Correct-answer position distribution across the 1,320-q bank. */
export const POSITIONAL_BIAS: PositionalBiasRow[] = [
  { label: "A", count: 314, pct: 23.8 },
  { label: "B", count: 363, pct: 27.5 },
  { label: "C", count: 368, pct: 27.9 },
  { label: "D", count: 275, pct: 20.8 },
];

export type SignFlipCell = {
  chapter: string;
  difficulty: "EASY" | "MODERATE" | "HARD";
  pct: number;
  qCount: number;
};

/** Sign-flip rate by chapter × difficulty. Sorted desc by pct. */
export const SIGN_FLIP_CELLS: SignFlipCell[] = [
  { chapter: "Limits & Continuity", difficulty: "HARD", pct: 100, qCount: 4 },
  { chapter: "Trigonometric Identities", difficulty: "HARD", pct: 60, qCount: 5 },
  { chapter: "Differentiation", difficulty: "EASY", pct: 44, qCount: 9 },
  { chapter: "Differentiation", difficulty: "HARD", pct: 40, qCount: 5 },
  { chapter: "Functions", difficulty: "EASY", pct: 40, qCount: 5 },
  { chapter: "Lines", difficulty: "HARD", pct: 33, qCount: 3 },
  { chapter: "Limits & Continuity", difficulty: "EASY", pct: 33, qCount: 9 },
  { chapter: "Complex Numbers", difficulty: "HARD", pct: 33, qCount: 3 },
  { chapter: "Trigonometric Identities", difficulty: "EASY", pct: 29, qCount: 7 },
  { chapter: "Vectors", difficulty: "MODERATE", pct: 25, qCount: 4 },
  { chapter: "3D Geometry", difficulty: "EASY", pct: 20, qCount: 5 },
  { chapter: "Statistics", difficulty: "MODERATE", pct: 5, qCount: 21 },
];

export type VerificationRule = {
  chapter: string;
  rule: string;
};

/** Per-chapter last-step verification rules. */
export const VERIFICATION_RULES: VerificationRule[] = [
  {
    chapter: "Limits & Continuity",
    rule: "Verify the sign. Sign-flip distractors appear in 100% of HARD limit questions in the bank.",
  },
  {
    chapter: "Trigonometric Identities",
    rule: "Verify the quadrant. cos 60° vs cos 120° — the wrong-sign equivalent is almost always an option.",
  },
  {
    chapter: "Differentiation",
    rule: "Verify the sign even on easy problems. d/dx(sin x) = cos x — sign errors are the #1 cost on this chapter.",
  },
  {
    chapter: "Complex Numbers",
    rule: "Verify the argument quadrant. arg z can be θ or θ + π depending on which sign convention you used.",
  },
  {
    chapter: "Inverse Trigonometry",
    rule: "Verify the principal range. sin⁻¹(−x) = −sin⁻¹(x), but cos⁻¹(−x) = π − cos⁻¹(x). Different rules.",
  },
  {
    chapter: "Statistics",
    rule: "Verify which formula: σ² with n vs n−1 (sample vs population); mean of grouped data vs ungrouped.",
  },
  {
    chapter: "Matrices & Determinants",
    rule: "Verify the row/column index. a_{ij} not a_{ji}; cofactor of (i, j) involves (−1)^(i+j).",
  },
  {
    chapter: "Probability",
    rule: "Verify the framing. Many questions LOOK like classical probability but actually want conditional — check for \"given that\".",
  },
];
