/**
 * Content for /guide/nda-maths/principles. The principles tested in NDA
 * Mathematics, grouped by mathematical domain.
 *
 * `TOP_PRINCIPLES`: the cross-chapter principles with deep-dive pages at
 * /guide/nda-maths/principles/{slug}. Each has a `slug` and is backed by DB
 * tags in `question_principle_tags` (migration 0023). Live counts + drill
 * set come from the tag table at request time via
 * `loadPrincipleQuestionIds(slug)` — no static qCount, no curated
 * `extraQuestionIds`, no `drill[]` here. Was `TOP_20` pre-2026-05-17 strict
 * cross-chapter prune (9 single-chapter principles dropped, reborn as
 * long-tail DOMAINS entries below).
 *
 * `DOMAINS` long-tail: principles without a `slug` keep their static
 * `qCount` + `drill` + (optional) `chapters` because they have no DB
 * tagging. Their "Drill the N →" CTA uses the static subtopic filter.
 * `qCount` matches the live subtopic q-count as of OVERVIEW.asOf in
 * `nda-maths.ts`.
 */

export type PrincipleDrill = {
  chapter: string;
  subtopic?: string;
};

export type Principle = {
  /** Display name */
  name: string;
  /** Static question count — present only on long-tail (no-slug) principles.
   *  For TOP_PRINCIPLES (slugged) principles the count comes from DB tags at request
   *  time and this field is omitted. */
  qCount?: number;
  /** Approximate % HARD among questions invoking this principle. Editorial. */
  pctHard?: number;
  /** One-sentence summary shown on the card. */
  summary: string;
  /** Static drill target for /browse CTA — present only on long-tail
   *  principles. TOP_PRINCIPLES principles use `?principle=<slug>` instead. */
  drill?: PrincipleDrill[];
  /** If present, principle has a detail page at /guide/nda-maths/principles/{slug}
   *  and is backed by DB tags in `question_principle_tags`. */
  slug?: string;
  /** Optional: short list of chapter names where this principle shows up.
   *  Editorial hint for long-tail card display. */
  chapters?: string[];
};

export type Domain = {
  id: string; // "algebra"
  label: string; // "Algebra"
  blurb: string; // shown next to the count in the accordion summary
  principles: Principle[];
};

/** Top cross-chapter / highest-leverage principles. Each has a detail page
 *  at /guide/nda-maths/principles/{slug} and is backed by `question_principle_tags`
 *  in the DB; live counts are loaded at request time, never hardcoded here. */
export const TOP_PRINCIPLES: Principle[] = [
  {
    slug: "am-gm-mean-inequalities",
    name: "AM-GM / mean inequalities (incl. x + 1/x ≥ 2)",
    pctHard: 16,
    summary:
      "Whenever you need a minimum of a sum or maximum of a product under a constraint, AM-GM is the lever. Spans Sequence & Series, Application of Derivatives, Trig Identities and Logarithms; questions disguise the inequality across chapter lines.",
  },
  {
    slug: "vieta-symmetric-roots",
    name: "Vieta — sum and product of roots",
    pctHard: 43,
    summary:
      "If α, β are roots of ax² + bx + c = 0, then α + β = −b/a and αβ = c/a. Never solve; use structure. Cross-chapter into Complex Numbers, M&D, Properties of Triangle, Trig Identities, and Sequence & Series — and 43% HARD overall, third-toughest principle in the bank.",
  },
  {
    slug: "ap-three-term",
    name: "AP three-term: 2b = a + c",
    pctHard: 28,
    summary:
      "If a, b, c are in AP, then 2b = a + c. The bank disguises this across Lines (collinearity, family of lines), Logarithms, M&D, P&C, Probability, Properties of Triangle, Inverse Trig, and Trig Identities — nine chapters of cross-chapter reach.",
  },
  {
    slug: "compound-angle",
    name: "Compound angle: sin/cos/tan(A ± B)",
    pctHard: 24,
    summary:
      "The base trig identity that unlocks double angle, product-to-sum, and most identity manipulation. Tagged across Trig Identities + Trig Equations.",
  },
  {
    slug: "double-angle",
    name: "Double / half-angle formulas",
    pctHard: 44,
    summary:
      "sin 2A = 2 sin A cos A and cousins. 44% HARD overall — second-hardest principle in the bank after Sine/Cosine rules. Splits across Trig Identities Multi/Half-Angle and Properties of Triangle.",
  },
  {
    slug: "sine-cosine-rules",
    name: "Sine rule + Cosine rule",
    pctHard: 57,
    summary:
      "a/sin A = 2R and c² = a² + b² − 2ab cos C. The hardest principle in the live bank — 57% of tagged questions are HARD. Drives every \"solve the triangle\" problem; also surfaces in Height & Distance and inside trig-laden determinants and in-circle problems.",
  },
  {
    slug: "cube-roots-of-unity",
    name: "Cube roots of unity (1 + ω + ω² = 0, ω³ = 1)",
    pctHard: 41,
    summary:
      "Pairs with Vieta in the ω-Vieta compound. Beyond the named subtopic, ω appears explicitly inside Complex Numbers' modulus problems, M&D's special determinants, and Quadratic Equation questions where x² + x + 1 = 0 unlocks ω³ = 1 simplifications.",
  },
  {
    slug: "inclusion-exclusion",
    name: "Inclusion-Exclusion (sets + probability)",
    pctHard: 14,
    summary:
      "n(A∪B) = n(A) + n(B) − n(A∩B) and the three-set generalisation. The complement form 1 − P(none) is the other face of the same identity, used heavily in Binomial Distribution and Probability via Counting questions.",
  },
  {
    slug: "binomial-coefficient-identities",
    name: "Pascal / binomial-coefficient identities",
    pctHard: 19,
    summary:
      "ΣC(n,r) = 2ⁿ, C(n,r) = C(n,n−r), Pascal's rule. Spans Binomial Theorem and P&C primarily, plus M&D / Sets / Statistics questions where the identity is the key step.",
  },
  {
    slug: "modulus-absolute-value",
    name: "Modulus / absolute value behaviour",
    pctHard: 14,
    summary:
      "Splitting |·| at its zero. The principle behind the 2023 modulus spike — the broadest cross-chapter reach in the bank at 11 chapters, from limits and derivatives through definite integrals, areas, equations and relations. Includes the disguised form, where √(f²) is really |f|.",
  },
  {
    slug: "greatest-integer-function",
    name: "Greatest integer / floor behaviour",
    pctHard: 24,
    summary:
      "[x] = n on [n, n+1), jumping by 1 at each integer — the discrete cousin of modulus. Every NDA trap lives at the integer boundary: one-sided limits, the derivative that is 0 on the interior and undefined at the ends, and integrals that split interval by interval. Spans Limits & Continuity, Definite Integration, Functions, Differentiation and Apps of Integration.",
  },
  {
    slug: "piecewise-defined-functions",
    name: "Piecewise definitions — continuity and differentiability at the join",
    pctHard: 22,
    summary:
      "A function given by cases, where everything happens at the join. Match one-sided limits to make it continuous; match one-sided derivatives to make it differentiable — that is how NDA hides a two-equation solve for a and b inside a continuity question. Concentrated in Limits & Continuity, with Differentiation, Functions and App of Derivatives.",
  },
];

/** All principles grouped by domain. TOP_PRINCIPLES entries appear in their domain
 *  AND have the slug set (the same Principle object is referenced).
 *  Long-tail (no-slug) principles below carry static qCount + drill since
 *  they have no DB tagging. */
export const DOMAINS: Domain[] = [
  {
    id: "algebra",
    label: "Algebra",
    blurb: "Polynomial identities, sequences, inequalities, logarithms.",
    principles: [
      TOP_PRINCIPLES.find((p) => p.slug === "vieta-symmetric-roots")!,
      TOP_PRINCIPLES.find((p) => p.slug === "am-gm-mean-inequalities")!,
      TOP_PRINCIPLES.find((p) => p.slug === "ap-three-term")!,
      {
        name: "GP three-term: b² = ac",
        qCount: 19,
        summary: "Multiplicative counterpart to AP. Pairs with AM-GM in the bank's highest-yield compound recipe.",
        drill: [{ chapter: "Sequence & Series", subtopic: "Geometric Progressions" }],
      },
      {
        name: "Sum of n terms (S_n) — AP / GP / special series",
        qCount: 42,
        summary: "Sₙ for AP, GP, and special telescoping series. Knowing the closed forms saves 2-3 minutes per question.",
        drill: [{ chapter: "Sequence & Series", subtopic: "Arithmetic Progressions" }],
      },
      {
        name: "AM ≥ GM ≥ HM chain",
        qCount: 5,
        summary: "Stronger than AM-GM alone — chains three means with equality iff all values equal.",
        drill: [{ chapter: "Sequence & Series", subtopic: "Harmonic Progressions and the Three Means" }],
      },
      {
        name: "Algebraic identity expansion: (a±b)², (a+b+c)², a³+b³+c³−3abc",
        qCount: 59,
        summary: "The pre-Vieta toolkit. The trick is recognising structure before brute-forcing.",
        drill: [{ chapter: "Matrices & Determinants", subtopic: "Determinant Properties, Operations, and Sums" }],
      },
      {
        name: "Symmetric polynomial: αⁿ + βⁿ recurrence",
        qCount: 26,
        summary: "If α, β are roots and Sₙ = αⁿ + βⁿ, then Sₙ₊₁ = (α + β)Sₙ − αβ·Sₙ₋₁.",
        drill: [{ chapter: "Quadratic Equations", subtopic: "Vieta's Relations and Root-Coefficient Identities" }],
      },
      {
        name: "Logarithm laws (log ab, log aⁿ, change of base)",
        qCount: 16,
        summary: "Pairs with AP/GP and trig equations frequently. Memorise three; derive the rest.",
        drill: [{ chapter: "Logarithms", subtopic: "Logarithm Identities, Change of Base, and Sums" }],
      },
      {
        name: "Divisibility, prime factorisation, modular arithmetic",
        qCount: 13,
        summary: "Binary numbers, factorial divisibility, Legendre's formula. Rarely tested but easy when present.",
        drill: [{ chapter: "Binary Numbers" }],
      },
    ],
  },
  {
    id: "trigonometry",
    label: "Trigonometry",
    blurb: "Identities, equations, inverse trig, triangle theorems.",
    principles: [
      TOP_PRINCIPLES.find((p) => p.slug === "double-angle")!,
      TOP_PRINCIPLES.find((p) => p.slug === "compound-angle")!,
      TOP_PRINCIPLES.find((p) => p.slug === "sine-cosine-rules")!,
      {
        name: "Triangle identity A + B + C = π",
        qCount: 14,
        summary: "Unlocks tan A + tan B + tan C = tan A · tan B · tan C and similar projection identities.",
        drill: [{ chapter: "Properties of Triangle", subtopic: "Triangle Identities — A+B+C=π, Half-Angle, and Double-Angle" }],
      },
      {
        name: "sin²θ + cos²θ = 1 / Pythagorean identities",
        qCount: 38,
        summary: "1 + tan² = sec², 1 + cot² = csc². The substrate of every trig manipulation.",
        drill: [{ chapter: "Trigonometric Identities", subtopic: "Compound Angle Formulas" }],
      },
      {
        name: "Sum-to-product / product-to-sum identities",
        qCount: 27,
        summary: "2 sin A cos B = sin(A+B) + sin(A−B) and cousins. Used to telescope or factor trig sums.",
        drill: [{ chapter: "Trigonometric Identities", subtopic: "Product-to-Sum and Sum-to-Product Identities" }],
      },
      {
        name: "Specific values + quadrant analysis",
        qCount: 21,
        summary: "Standard values at 30°/45°/60°/90° plus sign by quadrant. The lowest-level skill but tested everywhere.",
        drill: [{ chapter: "Trigonometric Identities", subtopic: "Specific Values and Quadrants" }],
      },
      {
        name: "Inverse trig identities (sin⁻¹ + cos⁻¹ = π/2)",
        qCount: 17,
        summary: "Principal-range rules + sum/difference of inverse trig. The chapter is short and high-yield.",
        drill: [{ chapter: "Inverse Trigonometry", subtopic: "Identities, Properties, and Sum-Difference Formulas" }],
      },
    ],
  },
  {
    id: "complex-numbers",
    label: "Complex Numbers",
    blurb: "Modulus, argument, roots of unity, De Moivre.",
    principles: [
      TOP_PRINCIPLES.find((p) => p.slug === "cube-roots-of-unity")!,
      {
        name: "Modulus / argument / conjugate",
        qCount: 39,
        summary: "|z|² = z·z̄, arg z, polar form. The base of every complex-number question.",
        drill: [{ chapter: "Complex Numbers", subtopic: "Modulus, Argument, and Conjugate" }],
      },
      {
        name: "Powers and nth roots of unity / De Moivre",
        qCount: 15,
        summary: "(cos θ + i sin θ)ⁿ = cos nθ + i sin nθ. Tested rarely but elegant.",
        drill: [{ chapter: "Complex Numbers", subtopic: "Powers and Roots" }],
      },
      {
        name: "Conjugate-pair cancellation",
        qCount: 8,
        summary: "(√2 + 1)ⁿ + (√2 − 1)ⁿ is always an integer because the irrational parts cancel. NDA loves this.",
        drill: [{ chapter: "Binomial Theorem", subtopic: "Integer and Fractional Parts of Binomial Expressions" }],
      },
    ],
  },
  {
    id: "calculus",
    label: "Calculus",
    blurb: "Limits, differentiation, integration, ODEs. NDA's largest topic cluster.",
    principles: [
      TOP_PRINCIPLES.find((p) => p.slug === "piecewise-defined-functions")!,
      {
        name: "Standard limits + L'Hôpital",
        qCount: 31,
        summary: "lim sin x / x = 1, lim (1 + 1/x)ˣ = e, indeterminate forms via L'Hôpital.",
        drill: [{ chapter: "Limits & Continuity", subtopic: "Limit Evaluation Techniques — L'Hôpital, Rationalization, Standard Forms" }],
      },
      {
        name: "Continuity at a point",
        qCount: 34,
        summary: "Left limit = right limit = f(c). Piecewise problems pair this with modulus.",
        drill: [{ chapter: "Limits & Continuity", subtopic: "Continuity and Differentiability — Piecewise, Modulus, Composed, Oscillatory" }],
      },
      {
        name: "Extrema via first/second derivative test",
        qCount: 38,
        summary: "f'(x) = 0 at critical points, f''(x) tells you max vs min. AM-GM is often the shorter alternative.",
        drill: [{ chapter: "Application of Derivatives", subtopic: "Monotonicity, Extrema, and Critical Points" }],
      },
      {
        name: "King's property of definite integrals",
        qCount: 32,
        summary: "∫₀ᵃ f(x)dx = ∫₀ᵃ f(a−x)dx. Reduces many hard-looking integrals to plug-and-add.",
        drill: [{ chapter: "Definite Integration", subtopic: "Properties of Definite Integrals — Symmetry, King's, Odd/Even" }],
      },
      {
        name: "Chain rule / logarithmic differentiation",
        qCount: 48,
        summary: "(f(g(x)))' = f'(g(x))·g'(x). Plus log-differentiation for products of powers.",
        drill: [{ chapter: "Differentiation", subtopic: "Differentiation Techniques — Chain Rule, Logarithmic, Composite Functions" }],
      },
      {
        name: "Parametric / implicit / higher-order derivatives",
        qCount: 21,
        summary: "When y is given via parameter t or implicitly via F(x, y) = 0.",
        drill: [{ chapter: "Differentiation", subtopic: "Parametric, Implicit, and Higher-Order Derivatives" }],
      },
      {
        name: "One-sided limits + greatest integer / |x| limits",
        qCount: 16,
        summary: "[x] and |x| at integers — left and right limits diverge. NDA loves the edge cases.",
        drill: [{ chapter: "Limits & Continuity", subtopic: "One-Sided Limits, Greatest Integer, and Absolute Value Limits" }],
      },
      {
        name: "Integration by substitution",
        qCount: 17,
        summary: "Algebraic, trig, and composite substitutions. Practice ~20 standard forms.",
        drill: [{ chapter: "Indefinite Integration", subtopic: "Integration by Substitution — Algebraic, Trigonometric, and Composite Forms" }],
      },
      {
        name: "Integration by partial fractions",
        qCount: 7,
        summary: "Rational integrands decompose. NDA-style: assume coefficients, compare numerators.",
        drill: [{ chapter: "Indefinite Integration", subtopic: "Integration by Partial Fractions" }],
      },
      {
        name: "e^x[f(x) + f'(x)] formula",
        qCount: 13,
        summary: "Pattern recognition — if the integrand is e^x times f + f', the integral is e^x · f.",
        drill: [{ chapter: "Indefinite Integration", subtopic: "Standard Forms — Exponential, Logarithmic, and Paired Trigonometric Integrals" }],
      },
      {
        name: "Odd / even function integrals",
        qCount: 17,
        summary: "∫₋ₐᵃ f(x)dx = 0 if f odd, 2∫₀ᵃ if even. Spotting the symmetry is the trick.",
        drill: [{ chapter: "Definite Integration", subtopic: "Integration of Absolute Value, Piecewise, and Greatest Integer Functions" }],
      },
      {
        name: "Area bounded by curves",
        qCount: 16,
        summary: "Setting up the right integral with correct limits is 80% of the work; computing is mechanical.",
        drill: [{ chapter: "Applications of Integration", subtopic: "Area Bounded by a Curve, Lines, and Axes" }],
      },
      {
        name: "Order / degree / formation of ODE",
        qCount: 22,
        summary: "Order = highest derivative, degree = highest power once free of fractional/derivative forms.",
        drill: [{ chapter: "Differential Equations", subtopic: "Order, Degree, and Solutions of ODE" }],
      },
      {
        name: "Separable / first-order linear / IVP ODE",
        qCount: 29,
        summary: "Separation of variables + integrating-factor for first-order linear ODE.",
        drill: [{ chapter: "Differential Equations", subtopic: "Solving and Verifying ODEs — Separable, IVP, and Applications" }],
      },
    ],
  },
  {
    id: "coordinate-3d-geometry",
    label: "Coordinate / 3D Geometry",
    blurb: "Lines, circles, conics, planes, spheres.",
    principles: [
      {
        name: "Distance formula (2D and 3D)",
        qCount: 22,
        summary: "d² = Σ(xᵢ − yᵢ)². Trivial but appears everywhere.",
        drill: [{ chapter: "Lines", subtopic: "Distance, Section, and Locus" }],
      },
      {
        name: "Section formula (m:n internal / external + midpoint)",
        qCount: 22,
        summary: "Point dividing a segment in m:n. Centroid, in-centre, circumcentre all build from this.",
        drill: [{ chapter: "Lines", subtopic: "Distance, Section, and Locus" }],
      },
      {
        name: "Slope and equation of line",
        qCount: 27,
        summary: "Point-slope, two-point, intercept forms. Family of lines through a point.",
        drill: [{ chapter: "Lines", subtopic: "Equation, Slope, and Family of Lines" }],
      },
      {
        name: "Equation of circle: (x−h)² + (y−k)² = r²",
        qCount: 11,
        summary: "Centre + radius from general form via completing the square.",
        drill: [{ chapter: "Circles", subtopic: "Circle Equation — Centre, Radius, Diameter, and Properties" }],
      },
      {
        name: "Parabola y² = 4ax + properties + latus rectum",
        qCount: 13,
        summary: "Focus, directrix, latus rectum, focal chord. The vocabulary is tested as much as the math.",
        drill: [{ chapter: "Conics", subtopic: "Parabola — Equation, Properties, and Latus Rectum" }],
      },
      {
        name: "Ellipse: foci, eccentricity, focal distances",
        qCount: 14,
        summary: "x²/a² + y²/b² = 1 with e² = 1 − b²/a². Sum of focal distances = 2a.",
        drill: [{ chapter: "Conics", subtopic: "Ellipse — Foci, Eccentricity, and Focal Distances" }],
      },
      {
        name: "Hyperbola: foci and eccentricity",
        qCount: 4,
        summary: "x²/a² − y²/b² = 1 with e² = 1 + b²/a². Asymptotes slope ±b/a.",
        drill: [{ chapter: "Conics", subtopic: "Hyperbola — Foci and Eccentricity" }],
      },
      {
        name: "Direction cosines / ratios: l² + m² + n² = 1",
        qCount: 24,
        summary: "Direction cosines square-sum to 1 — the 3D unit-vector identity.",
        drill: [{ chapter: "3D Geometry", subtopic: "Direction Cosines and Ratios" }],
      },
      {
        name: "Line / plane / sphere in 3D",
        qCount: 25,
        summary: "Vector form, Cartesian form, foot of perpendicular, distance between skew lines.",
        drill: [
          { chapter: "3D Geometry", subtopic: "The Straight Line in 3D" },
          { chapter: "3D Geometry", subtopic: "The Plane" },
        ],
      },
      {
        name: "Triangle / parallelogram / quadrilateral configurations",
        qCount: 32,
        summary: "Coordinate-geometry questions about polygons (area, centroid, type of triangle).",
        drill: [{ chapter: "Lines", subtopic: "Triangles, Quadrilaterals, and Polygons" }],
      },
    ],
  },
  {
    id: "vectors",
    label: "Vectors",
    blurb: "Dot, cross, scalar triple product, position vectors.",
    principles: [
      {
        name: "Dot product: a · b = |a||b| cos θ",
        qCount: 32,
        summary: "Angle between vectors, projection, perpendicularity test.",
        drill: [{ chapter: "Vectors", subtopic: "Dot Product and Angle" }],
      },
      {
        name: "Cross product / scalar triple product / coplanarity",
        qCount: 37,
        summary: "Area, volume, coplanarity test via determinant.",
        drill: [{ chapter: "Vectors", subtopic: "Cross Product and Triple Product" }],
      },
      {
        name: "Position vectors + section formula (vector form)",
        qCount: 6,
        summary: "r = (1−t)a + tb for the line; (mb + na)/(m+n) for the section.",
        drill: [{ chapter: "Vectors", subtopic: "Position Vectors and Section" }],
      },
    ],
  },
  {
    id: "combinatorics",
    label: "Combinatorics",
    blurb: "Permutations, combinations, counting under constraints.",
    principles: [
      TOP_PRINCIPLES.find((p) => p.slug === "binomial-coefficient-identities")!,
      {
        name: "Permutations n! / (n−r)! + arrangements with restrictions",
        qCount: 17,
        summary: "Standard arrangements, plus boys-girls-together, no-two-X-adjacent, vowel constraints.",
        drill: [{ chapter: "Permutation & Combination", subtopic: "Arrangements with Restrictions" }],
      },
      {
        name: "Combinations C(n, r) + selection problems",
        qCount: 11,
        summary: "n!/(r!(n−r)!). Compute small cases by hand; recognise C(n,r) = C(n, n−r).",
        drill: [{ chapter: "Permutation & Combination", subtopic: "Combinations" }],
      },
      {
        name: "Forming numbers from given digits",
        qCount: 20,
        summary: "Digit-arrangement counting with constraints (no zero in lead, even, prime, etc.).",
        drill: [{ chapter: "Permutation & Combination", subtopic: "Forming Numbers from Digits" }],
      },
      {
        name: "Geometric counting (lines, triangles from points)",
        qCount: 13,
        summary: "How many lines/triangles can be drawn from n points (no 3 collinear).",
        drill: [{ chapter: "Permutation & Combination", subtopic: "Geometric Counting" }],
      },
    ],
  },
  {
    id: "probability",
    label: "Probability",
    blurb: "Classical, conditional, independent events, binomial distribution.",
    principles: [
      TOP_PRINCIPLES.find((p) => p.slug === "inclusion-exclusion")!,
      {
        name: "Conditional probability + Bayes' theorem",
        qCount: 29,
        summary: "P(A|B) = P(A ∩ B) / P(B). Watch for the \"given that\" framing — many classical-looking questions are conditional.",
        drill: [{ chapter: "Probability", subtopic: "Conditional Probability, Total Probability, and Bayes' Theorem" }],
      },
      {
        name: "Classical probability: favourable / total",
        qCount: 46,
        summary: "The base. Sample-space construction is usually the actual work.",
        drill: [{ chapter: "Probability", subtopic: "Probability via Counting" }],
      },
      {
        name: "Independent events: P(A ∩ B) = P(A) · P(B)",
        qCount: 16,
        summary: "Independence vs mutual exclusivity — students confuse them. Independence multiplies; ME adds.",
        drill: [{ chapter: "Probability", subtopic: "Independent Events" }],
      },
      {
        name: "Event algebra (inclusion-exclusion, mutually exclusive)",
        qCount: 21,
        summary: "Compute P(A∪B), P(A∩B), P(Aᶜ) given various relations.",
        drill: [{ chapter: "Probability", subtopic: "Event Algebra — Inclusion-Exclusion, Mutually Exclusive, Exhaustive" }],
      },
      {
        name: "P(at least one) = 1 − P(none)",
        qCount: 18,
        summary: "When 'at least one X' is the question, complement is almost always faster.",
        drill: [{ chapter: "Probability", subtopic: "Probability via Counting" }],
      },
      {
        name: "Binomial distribution B(n, p)",
        qCount: 15,
        summary: "P(X=k) = C(n,k)p^k q^(n-k); mean = np, variance = npq. One chapter, two formulas.",
        drill: [{ chapter: "Binomial Distribution", subtopic: "Computing Binomial Probabilities — Exact, At-Least, and Complementary Events" }],
      },
      {
        name: "Probability with stock constructs (dice, coins, balls)",
        qCount: 18,
        summary: "Same skeleton, different surface. Recognise the sample-space template.",
        drill: [{ chapter: "Probability", subtopic: "Probability via Counting" }],
      },
    ],
  },
  {
    id: "statistics",
    label: "Statistics",
    blurb: "Central tendency, dispersion, regression, frequency distributions.",
    principles: [
      {
        name: "Measures of central tendency",
        qCount: 75,
        summary: "Mean, median, mode for grouped and ungrouped data. The single highest-yield subtopic for a weak student.",
        drill: [{ chapter: "Statistics", subtopic: "Measures of Central Tendency — Mean, Median, Mode" }],
      },
      {
        name: "Variance / SD / mean deviation",
        qCount: 44,
        summary: "σ² = E[(X − μ)²]. Mean deviation about mean vs median is a common trap.",
        drill: [{ chapter: "Statistics", subtopic: "Dispersion — Standard Deviation, Variance, Mean Deviation" }],
      },
      {
        name: "Coefficient of variation",
        qCount: 44,
        summary: "CV = σ/μ × 100. Used to compare variability across data sets of different scales.",
        drill: [{ chapter: "Statistics", subtopic: "Dispersion — Standard Deviation, Variance, Mean Deviation" }],
      },
      {
        name: "Regression equation + correlation coefficient",
        qCount: 27,
        summary: "y = bx + a, with b = r·σ_y/σ_x. Two regression lines intersect at (x̄, ȳ).",
        drill: [{ chapter: "Statistics", subtopic: "Regression and Correlation" }],
      },
      {
        name: "Frequency distribution + histogram + cumulative",
        qCount: 14,
        summary: "Class boundaries, frequency density (when widths differ), ogive.",
        drill: [{ chapter: "Statistics", subtopic: "Frequency Distributions and Graphical Representation" }],
      },
    ],
  },
  {
    id: "sets-functions",
    label: "Sets, Functions & Relations",
    blurb: "Set operations, function properties, modulus and floor.",
    principles: [
      TOP_PRINCIPLES.find((p) => p.slug === "modulus-absolute-value")!,
      TOP_PRINCIPLES.find((p) => p.slug === "greatest-integer-function")!,
      {
        name: "Set operations (union, intersection, complement, difference)",
        qCount: 23,
        summary: "De Morgan, distributivity, symmetric difference. Read each statement carefully.",
        drill: [{ chapter: "Sets & Relations", subtopic: "Set Operations, Identities, and Cartesian Products of Sets" }],
      },
      {
        name: "Function: domain, range, properties",
        qCount: 48,
        summary: "Domain restrictions from √, log, 1/x; range from value-set analysis.",
        drill: [{ chapter: "Functions", subtopic: "Domain, Range, and Function Properties" }],
      },
      {
        name: "Composition and inverse of functions",
        qCount: 28,
        summary: "(f ∘ g)(x) and f⁻¹. The composition order matters; inverse exists only for bijections.",
        drill: [{ chapter: "Functions", subtopic: "Composition and Inverse of Functions" }],
      },
      {
        name: "Functional equations",
        qCount: 18,
        summary: "f(x + 1) = ... or 4f(x) − f(1/x) = ... — solve for the unknown function.",
        drill: [{ chapter: "Functions", subtopic: "Functional Equations" }],
      },
      // 2026-08-19: the long-tail "Greatest integer / floor function" (7 q,
      // Functions-only, static drill) was REMOVED when greatest-integer became a
      // slugged TOP_PRINCIPLES entry. The TOP entry strictly supersedes it — 29 q
      // across 5 chapters, DB-tagged, with a detail page — and keeping both would
      // render two near-identical cards in this domain AND double-count those 7
      // questions in the domain total, which sums live TOP counts + static qCounts.
      {
        name: "Relations (reflexive, symmetric, transitive)",
        qCount: 19,
        summary: "Equivalence relation = R, S, T. Each property tested with concrete relations.",
        drill: [{ chapter: "Sets & Relations", subtopic: "Relations — Properties, Cartesian Product, and Counting" }],
      },
    ],
  },
  {
    id: "matrices-determinants",
    label: "Matrices & Determinants",
    blurb: "Determinants, adjoints, inverses, special matrices.",
    principles: [
      {
        name: "Determinant evaluation by row/column ops",
        qCount: 59,
        summary: "Largest single-chapter principle. Cofactor expansion + row/column operations + special determinant patterns (trig, complex, polynomial).",
        drill: [{ chapter: "Matrices & Determinants", subtopic: "Determinant Properties, Operations, and Sums" }],
      },
      {
        name: "Adjoint, inverse: A · adj(A) = det(A) · I",
        qCount: 28,
        summary: "A⁻¹ = adj(A) / det(A). Adjoint properties are tested directly (e.g., adj(adj(A)) = det(A)^(n−2) · A).",
        drill: [{ chapter: "Matrices & Determinants", subtopic: "Cofactors, Adjoint, and Inverse" }],
      },
      {
        name: "Special matrices (skew-symmetric, diagonal, idempotent, orthogonal)",
        qCount: 22,
        summary: "Each type has 1-2 defining properties; questions test which one applies.",
        drill: [{ chapter: "Matrices & Determinants", subtopic: "Special Matrices — Skew-Symmetric, Diagonal, Idempotent, Orthogonal, Rotation" }],
      },
      {
        name: "Linear systems / Cramer's rule / consistency",
        qCount: 8,
        summary: "Δ, Δₓ, Δᵧ, Δ_z. Consistency conditions are the most tested aspect.",
        drill: [{ chapter: "Matrices & Determinants", subtopic: "Linear Systems — Consistency, Cramer's Rule, Solution Space" }],
      },
    ],
  },
];
