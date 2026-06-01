/**
 * Static content + numbers for the /guide/nda-maths route.
 *
 * Live CTA counts come from the existing /browse facet RPCs (see
 * src/app/guide/_components/BrowseLink.tsx); the narrative numbers here are a
 * snapshot updated manually when new papers land. `OVERVIEW.asOf` documents
 * the snapshot date so readers know what they're looking at.
 *
 * CHAPTER_TABLE drives the bank-breakdown table on the overview page. Each
 * row's `qCount` + `pctTotal` + `pctHard` are SQL-derived against the live
 * bank as of `OVERVIEW.asOf`; `focus` is editorial — the top 1–2 subtopics
 * with counts plus any noteworthy context.
 */

export type GuideRoute = {
  slug: string; // path segment after /guide/nda-maths (or "" for the landing)
  label: string; // side-nav and breadcrumb label
  blurb: string; // one-line description for the landing-page card
};

/** The 6 main routes under /guide/nda-maths, in reading order. */
export const ROUTES: GuideRoute[] = [
  {
    slug: "",
    label: "Overview",
    blurb:
      "How NDA Mathematics actually works — what the 2,160-question bank reveals.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb: "Score 100+ marks with 50 hours of focused, evidence-led prep.",
  },
  {
    slug: "principles",
    label: "Principles",
    blurb:
      "79 atoms behind every question. Drill the 11 cross-chapter principles first.",
  },
  {
    slug: "compound-tricks",
    label: "Compound Tricks",
    blurb:
      "4 principle pairs that spike HARD — 40–67% HARD vs 22.5% bank average. The chains paper-setters love.",
  },
  {
    slug: "trends",
    label: "Trends",
    blurb:
      "How NDA Maths has shifted from 2017 to 2026, and what to practice first.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "Distractor patterns NDA reuses. The last-step verification rules that recover marks.",
  },
];

export type Overview = {
  totalQ: number;
  papers: number;
  chapters: number;
  principles: number;
  difficulty: { easy: number; moderate: number; hard: number };
  asOf: string; // ISO date, e.g. "2026-05-17"
};

/** Snapshot of the bank's shape as of the date below. */
export const OVERVIEW: Overview = {
  totalQ: 2160,
  papers: 18,
  chapters: 31,
  principles: 79,
  difficulty: { easy: 662, moderate: 1011, hard: 487 },
  asOf: "2026-05-17",
};

export type ChapterRow = {
  chapter: string;
  qCount: number;
  /** % of bank total (1 decimal). */
  pctTotal: number;
  /** % HARD within chapter (rounded integer). */
  pctHard: number;
  /** Top 1–2 subtopics with counts, plus optional one-line context. */
  focus: string;
};

/** 31 NDA Maths chapters, ordered by question count descending. SQL-derived
 *  against the 2,160-q PUBLIC bank as of OVERVIEW.asOf. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Matrices & Determinants",
    qCount: 170,
    pctTotal: 7.9,
    pctHard: 31,
    focus:
      "Determinant Properties (59), Matrix Operations (33). Highest-reliability chapter — 8–11 q/paper.",
  },
  {
    chapter: "Probability",
    qCount: 162,
    pctTotal: 7.5,
    pctHard: 17,
    focus:
      "Counting (46), Conditional/Bayes (29), Event Algebra (21). Mostly classical; Bayes is the harder slice.",
  },
  {
    chapter: "Statistics",
    qCount: 160,
    pctTotal: 7.4,
    pctHard: 13,
    focus:
      "Central Tendency (75), Dispersion (44). Gentlest chapter in the bank — best marks-per-hour.",
  },
  {
    chapter: "Trigonometric Identities",
    qCount: 138,
    pctTotal: 6.4,
    pctHard: 34,
    focus:
      "Compound Angle (38), Multi/Half-Angle (30), Product-to-Sum (27). High-HARD — cherry-pick by subtopic.",
  },
  {
    chapter: "Functions",
    qCount: 109,
    pctTotal: 5.0,
    pctHard: 10,
    focus:
      "Domain/Range (48), Composition (28). High-easy ratio — low-cost wins, skip Functional Equations.",
  },
  {
    chapter: "Vectors",
    qCount: 97,
    pctTotal: 4.5,
    pctHard: 20,
    focus:
      "Cross/Triple Product (37), Dot Product (32). Four formulas cover ~70%.",
  },
  {
    chapter: "Lines",
    qCount: 97,
    pctTotal: 4.5,
    pctHard: 21,
    focus:
      "Triangles/Quads (32), Equation+Slope (27), Distance+Section (22).",
  },
  {
    chapter: "Sequence & Series",
    qCount: 89,
    pctTotal: 4.1,
    pctHard: 21,
    focus:
      "AP (43), GP+HP+AM-GM-HM (37). Six formulas dominate; AM-GM is the cross-chapter lever.",
  },
  {
    chapter: "3D Geometry",
    qCount: 89,
    pctTotal: 4.1,
    pctHard: 22,
    focus:
      "Direction Cosines (24), Foundations/Distance (20), Sphere (20), The Plane (14), Lines (11).",
  },
  {
    chapter: "Differentiation",
    qCount: 85,
    pctTotal: 3.9,
    pctHard: 24,
    focus:
      "Chain Rule + Logarithmic (48), Parametric/Implicit (21). Differentiability questions overlap with Limits & Continuity.",
  },
  {
    chapter: "Limits & Continuity",
    qCount: 81,
    pctTotal: 3.8,
    pctHard: 14,
    focus:
      "Continuity/Differentiability (34), Limit Techniques (31). Edge cases with |x|, ⌊x⌋ are the lever.",
  },
  {
    chapter: "Permutation & Combination",
    qCount: 78,
    pctTotal: 3.6,
    pctHard: 19,
    focus:
      "Digit-Forming (20), Factorials (17), Arrangements with Restrictions (17).",
  },
  {
    chapter: "Application of Derivatives",
    qCount: 73,
    pctTotal: 3.4,
    pctHard: 16,
    focus:
      "Monotonicity/Extrema (38), Optimisation — AM-GM compound (30).",
  },
  {
    chapter: "Complex Numbers",
    qCount: 72,
    pctTotal: 3.3,
    pctHard: 22,
    focus:
      "Modulus/Argument (39), Cube Roots of Unity (18), Powers/Roots (15).",
  },
  {
    chapter: "Sets & Relations",
    qCount: 69,
    pctTotal: 3.2,
    pctHard: 13,
    focus:
      "Counting Sets + Inclusion-Exclusion (27), Set Operations (23). Easy 2–3 marks if given an hour.",
  },
  {
    chapter: "Definite Integration",
    qCount: 66,
    pctTotal: 3.1,
    pctHard: 20,
    focus:
      "Properties — King's, symmetry (32), |x|/floor integrals (17).",
  },
  {
    chapter: "Quadratic Equations",
    qCount: 63,
    pctTotal: 2.9,
    pctHard: 40,
    focus:
      "Vieta's Relations (26), Nature of Roots (21). High-HARD; AM-GM + ω compounds live here.",
  },
  {
    chapter: "Differential Equations",
    qCount: 63,
    pctTotal: 2.9,
    pctHard: 29,
    focus:
      "Separable/IVP (29), Order/Degree (22).",
  },
  {
    chapter: "Binomial Theorem",
    qCount: 54,
    pctTotal: 2.5,
    pctHard: 17,
    focus:
      "Coefficients & Specific Terms (29), Sum Identities (14).",
  },
  {
    chapter: "Properties of Triangle",
    qCount: 49,
    pctTotal: 2.3,
    pctHard: 45,
    focus:
      "Sine/Cosine Rules (29), Triangle Identities (14). High-HARD — punishing yield.",
  },
  {
    chapter: "Indefinite Integration",
    qCount: 40,
    pctTotal: 1.9,
    pctHard: 23,
    focus:
      "Substitution (17), Standard Forms — exp/log (13).",
  },
  {
    chapter: "Conics",
    qCount: 38,
    pctTotal: 1.8,
    pctHard: 21,
    focus:
      "Ellipse (14), Parabola (13).",
  },
  {
    chapter: "Inverse Trigonometry",
    qCount: 34,
    pctTotal: 1.6,
    pctHard: 24,
    focus:
      "Identities + Sum-Difference (17), Composite Evaluation (11).",
  },
  {
    chapter: "Trigonometric Equations",
    qCount: 33,
    pctTotal: 1.5,
    pctHard: 33,
    focus:
      "Specific Forms — double-angle, product (13), General Solutions (13).",
  },
  {
    chapter: "Binomial Distribution",
    qCount: 30,
    pctTotal: 1.4,
    pctHard: 10,
    focus:
      "Computing Probabilities (15), Mean/Variance (15). One chapter, two formulas — 60 minutes, 2 marks.",
  },
  {
    chapter: "Logarithms",
    qCount: 27,
    pctTotal: 1.3,
    pctHard: 19,
    focus:
      "Identities + Change of Base (16), Log Equations (11).",
  },
  {
    chapter: "Circles",
    qCount: 27,
    pctTotal: 1.3,
    pctHard: 41,
    focus:
      "Circle Equation — centre/radius (11). High-HARD for the size.",
  },
  {
    chapter: "Applications of Integration",
    qCount: 25,
    pctTotal: 1.2,
    pctHard: 20,
    focus:
      "Area Bounded by Curve (16).",
  },
  {
    chapter: "Height & Distance",
    qCount: 24,
    pctTotal: 1.1,
    pctHard: 71,
    focus:
      "Angles of Elevation (16). Hardest chapter in the bank — 71% HARD.",
  },
  {
    chapter: "Binary Numbers",
    qCount: 13,
    pctTotal: 0.6,
    pctHard: 31,
    focus: "Tiny chapter — 0.7 q/paper average.",
  },
  {
    chapter: "Linear Inequalities",
    qCount: 5,
    pctTotal: 0.2,
    pctHard: 0,
    focus: "Near-irrelevant — 0.3 q/paper, zero HARD across the bank.",
  },
];
