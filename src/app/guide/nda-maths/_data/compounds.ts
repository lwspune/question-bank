/**
 * Content for /guide/nda-maths/compound-tricks. Each compound describes a
 * PAIR of principles that co-occurs disproportionately in HARD questions.
 *
 * Chapter / subtopic names are resolved to UUIDs at request time via
 * resolveTaxonomy so the file stays env-agnostic.
 *
 * Number provenance (refreshed 2026-05-17 against the 2,160-q bank):
 *   - `bankPctHard` is bank-wide HARD% (live 487/2160 = 22.5%).
 *   - `soloA.qCount` / `soloB.qCount` are live subtopic q-counts.
 *   - `qCount` + `pctHard`: ω + Vieta is DB-derived (intersection of
 *     `question_principle_tags` for both slugs); the other three remain
 *     editorial estimates of "questions where both principles are the
 *     lever in sequence" because only ω and Vieta are both TOP_11
 *     (the others involve a long-tail principle without DB tagging).
 */

export type CompoundRecipe = {
  name: string; // "AM-GM + GP"
  principleA: string;
  principleB: string;
  /** Questions where both principles co-occur (raw count). */
  qCount: number;
  /** Percentage of those q tagged HARD. */
  pctHard: number;
  /** Bank-wide HARD rate (for comparison). */
  bankPctHard: number;
  description: string;
  /** 1-2 sample question stems showing the disguise. */
  examples: string[];
  /** Filter to drill the compound (best single subtopic that captures most). */
  drillFilter: {
    chapter: string;
    subtopic?: string;
    note?: string; // optional clarifier like "best single subtopic"
  };
  /** Solo-drill filters for each principle of the pair. */
  soloA: {
    chapter: string;
    subtopic?: string;
    qCount: number;
  };
  soloB: {
    chapter: string;
    subtopic?: string;
    qCount: number;
  };
};

export const COMPOUNDS: CompoundRecipe[] = [
  {
    name: "AM-GM + GP three-term",
    principleA: "AM-GM",
    principleB: "GP",
    qCount: 20,
    pctHard: 35,
    bankPctHard: 22.5,
    description:
      "When a question asks for a minimum or maximum given a GP constraint, direct calculus rarely works — you need AM ≥ GM with equality at x = y = z. The GP relation b² = ac then closes the system. The chapter label might say Sequence & Series or Logarithms, but the technique is the same compound.",
    examples: [
      "If a, b, c are in GP with abc = 8, find the minimum of a + b + c.",
      "If log₁₀x, log₁₀y, log₁₀z are in AP, what is the relation between x, y, z?",
    ],
    drillFilter: {
      chapter: "Sequence & Series",
      subtopic: "Geometric and Harmonic Progressions, AM-GM-HM Relations",
      note: "Best single drill — the GP/HP/AM-GM-HM subtopic is the compound's natural home.",
    },
    soloA: {
      chapter: "Application of Derivatives",
      subtopic: "Optimisation — Geometric, Trigonometric, AM-GM",
      qCount: 30,
    },
    soloB: {
      chapter: "Sequence & Series",
      subtopic: "Geometric and Harmonic Progressions, AM-GM-HM Relations",
      qCount: 37,
    },
  },
  {
    name: "AP + GP",
    principleA: "AP",
    principleB: "GP",
    qCount: 10,
    pctHard: 40,
    bankPctHard: 22.5,
    description:
      "Two sequences interleaved. Common pattern: 'if a, b, c are in AP and b, c, d are in GP, find d'. The trick is to spot the chain — applying 2b = a+c and c² = bd gives a system of two equations in three unknowns, which closes via ratios.",
    examples: [
      "If a, b, c are in AP and a², b², c² are in GP, find the common ratio.",
      "If p, q, r in AP and 1/p, 1/q, 1/r in HP, prove the sequence is constant.",
    ],
    drillFilter: {
      chapter: "Sequence & Series",
      subtopic: "Arithmetic Progression — Sum, nth Term, Ratios",
    },
    soloA: {
      chapter: "Sequence & Series",
      subtopic: "Arithmetic Progression — Sum, nth Term, Ratios",
      qCount: 43,
    },
    soloB: {
      chapter: "Sequence & Series",
      subtopic: "Geometric and Harmonic Progressions, AM-GM-HM Relations",
      qCount: 37,
    },
  },
  {
    name: "ω + Vieta",
    principleA: "Cube roots of unity",
    principleB: "Vieta",
    qCount: 6,
    pctHard: 67,
    bankPctHard: 22.5,
    description:
      "Cube roots of unity treated as polynomial roots. The classic shape: 'if α, β are roots of x² + x + 1 = 0, find α^n + β^n'. The roots are ω, ω² — and ω satisfies 1 + ω + ω² = 0 with ω³ = 1. Powers cycle every 3, so the answer is a small case match. DB-tagged intersection: 6 q · 67% HARD (4 of 6) — the most HARD-concentrated compound on this page.",
    examples: [
      "If α, β are roots of x² − x + 1 = 0, find (α − 1/α)² + (β − 1/β²)² + (α − 1/β⁴)².",
      "If 1, ω, ω² are cube roots of unity, evaluate |a + bω + cω²|² given a + b + c = 0.",
    ],
    drillFilter: {
      chapter: "Complex Numbers",
      subtopic: "Cube Roots of Unity",
      note: "The Cube Roots of Unity subtopic (18 q) is where most ω + Vieta lives.",
    },
    soloA: {
      chapter: "Complex Numbers",
      subtopic: "Cube Roots of Unity",
      qCount: 18,
    },
    soloB: {
      chapter: "Quadratic Equations",
      subtopic: "Vieta's Relations and Root-Coefficient Identities",
      qCount: 26,
    },
  },
  {
    name: "Extrema + Logarithms",
    principleA: "Extrema",
    principleB: "Log",
    qCount: 5,
    pctHard: 40,
    bankPctHard: 22.5,
    description:
      "Finding the minimum or maximum of a logarithmic expression. Standard mistake: differentiate, set f'(x) = 0, lose to bad algebra. The shorter path is AM-GM on the arguments inside the log, then apply log monotonicity. log(AM) ≥ log(GM) gives the bound for free.",
    examples: [
      "Find the minimum value of log_{10}(x² + 2x + 11) for real x.",
      "If x, y > 0 and x + y = 1, find the maximum of log x + log y.",
    ],
    drillFilter: {
      chapter: "Application of Derivatives",
      subtopic: "Monotonicity, Extrema, and Critical Points",
    },
    soloA: {
      chapter: "Application of Derivatives",
      subtopic: "Monotonicity, Extrema, and Critical Points",
      qCount: 38,
    },
    soloB: {
      chapter: "Logarithms",
      subtopic: "Logarithm Identities, Change of Base, and Sums",
      qCount: 16,
    },
  },
];
