/**
 * Content for /guide/nda-maths/principles. The 70+ principles tested in
 * NDA Mathematics, grouped by mathematical domain.
 *
 * Top 20 cross-chapter principles get a `slug` — the index page links them
 * to a detail page at /guide/nda-maths/principles/{slug} (built in phases
 * 5-6). All others link directly to /browse with the relevant filters.
 *
 * Each principle's `drill` is the best single (chapter, subtopic) pair to
 * deep-link to. Some principles span multiple subtopics; the drill picks
 * the most representative one.
 */

export type PrincipleDrill = {
  chapter: string;
  subtopic?: string;
};

export type Principle = {
  /** Display name */
  name: string;
  /** Count of bank questions the drill CTA will actually deliver — the sum
   *  of `drill` subtopic counts plus `extraQuestionIds.length`. Refitted
   *  against the live bank, so `qCount === Drill the N` is always true. */
  qCount: number;
  /** Approximate % HARD among questions invoking this principle. */
  pctHard?: number;
  /** One-sentence summary shown on the card. */
  summary: string;
  /** Subtopic(s) the "Drill →" CTA pre-filters /browse with. A multi-entry
   *  list is used for cross-chapter principles (e.g. modulus appears in 5
   *  subtopics across 4 chapters). Single-entry is the common case. */
  drill: PrincipleDrill[];
  /** Curated question UUIDs where the principle IS the lever but the
   *  question lives in a subtopic whose name doesn't carry the keyword
   *  (e.g. Vieta usage inside Complex Numbers > Modulus). OR'd with the
   *  subtopic filter on /browse so the drill returns the principle's full
   *  reach. Empty / absent = no curation done yet. */
  extraQuestionIds?: string[];
  /** If present, principle has a detail page at /guide/nda-maths/principles/{slug}. */
  slug?: string;
  /** Optional: short list of chapter names where this principle shows up,
   *  used in the top-20 table to surface cross-chapter spread. */
  chapters?: string[];
};

export type Domain = {
  id: string; // "algebra"
  label: string; // "Algebra"
  blurb: string; // shown next to the count in the accordion summary
  principles: Principle[];
};

/** Top-20 cross-chapter / highest-leverage principles. Sorted by spread×count.
 *  Detail pages for these are built in phases 5 (first 5) and 6 (next 15). */
export const TOP_20: Principle[] = [
  {
    slug: "am-gm-mean-inequalities",
    name: "AM-GM / mean inequalities (incl. x + 1/x ≥ 2)",
    qCount: 34,
    pctHard: 23,
    summary: "Whenever you need a minimum of a sum or maximum of a product under a constraint, AM-GM is the lever. Lives in the Seq & Series means subtopic and the App-of-Deriv optimisation subtopic.",
    drill: [
      { chapter: "Sequence & Series", subtopic: "Geometric and Harmonic Progressions, AM-GM-HM Relations" },
      { chapter: "Application of Derivatives", subtopic: "Optimisation — Geometric, Trigonometric, AM-GM" },
    ],
    chapters: ["Seq & Series", "App of Deriv"],
  },
  {
    slug: "vieta-symmetric-roots",
    name: "Vieta — sum and product of roots",
    qCount: 37,
    pctHard: 39,
    summary: "If α, β are roots of ax² + bx + c = 0, then α + β = −b/a and αβ = c/a. Never solve; use structure. The 10 curated extras catch Vieta usage inside Complex Numbers, M&D, Properties of Triangle, and the Compound Angle subtopic.",
    drill: [
      { chapter: "Quadratic Equations", subtopic: "Vieta's Relations and Root-Coefficient Identities" },
      { chapter: "Trigonometric Equations", subtopic: "Solving Specific Forms — Double-Angle, Product, Logarithmic, and Vieta" },
    ],
    extraQuestionIds: [
      // Complex Numbers — α,β as roots, Vieta-flavoured
      "027719b9-051f-4e8d-a967-12c070ca6228", // α,β of x²-x+1=0, |α¹⁰⁰+β¹⁰⁰|/|α¹⁰⁰-β¹⁰⁰|
      "47f7748f-de22-4166-bdc0-844666002769", // 2-i√3 is a root, find a+b via conjugate-root + Vieta
      // M&D — Vieta on determinant-generated polynomial
      "1d443095-7a8e-4650-9a4c-5df399205fe0", // sum of roots of det equation
      // Properties of Triangle — tanα, tanβ as roots
      "afc74373-cb7a-4a02-a6d8-dff336fe36b5", // 7x²-6x+1=0, tanα tanβ, 2α+2β are triangle angles
      // Quadratic Equations — Vieta inside sibling subtopics
      "9982905e-9f4b-4b5b-a5a1-e2a657479db0", // a,b,c in GP for ax²+bx+c=0
      "f2b6b888-8586-45d4-b97f-8f0fc428edf9", // equal roots → relation among a,b,c
      "0b373f1b-bac1-47e3-9632-b730be7e4f20", // one root known, find the other via product
      "b3c82565-0ca3-4ac1-a18b-7359ac97277e", // α³,β³ as new roots — Vieta squared
      "f8491cd6-b9ea-4292-aa7a-ed331c39c835", // construct quadratic whose roots are a,b
      // Trigonometric Identities — Vieta + compound angle
      "6531efe3-56e2-457a-a839-9cdcb95b8f4c", // tanα, tanβ roots of x²-6x+8=0, find cos(2α+2β)
    ],
    chapters: ["Quad Eq", "Trig Eq", "Complex", "M&D", "Triangle", "Trig Identities"],
  },
  {
    slug: "ap-three-term",
    name: "AP three-term: 2b = a + c",
    qCount: 27,
    pctHard: 23,
    summary: "If a, b, c are in AP, then 2b = a + c. Appears under different disguises (logs in AP, C(n,r) in AP, sides of triangle in AP) but the canonical home is the Seq & Series AP subtopic.",
    drill: [
      { chapter: "Sequence & Series", subtopic: "Arithmetic Progression — Sum, nth Term, Ratios" },
    ],
    chapters: ["Seq & Series"],
  },
  {
    slug: "gp-three-term",
    name: "GP three-term: b² = ac",
    qCount: 20,
    pctHard: 38,
    summary: "Multiplicative counterpart to AP. Pairs with AM-GM in the bank's highest-yield compound recipe.",
    drill: [
      { chapter: "Sequence & Series", subtopic: "Geometric and Harmonic Progressions, AM-GM-HM Relations" },
    ],
    chapters: ["Seq & Series"],
  },
  {
    slug: "compound-angle",
    name: "Compound angle: sin/cos/tan(A ± B)",
    qCount: 19,
    pctHard: 19,
    summary: "The base trig identity that unlocks double angle, product-to-sum, and most identity manipulation.",
    drill: [
      { chapter: "Trigonometric Identities", subtopic: "Compound Angle Formulas" },
    ],
    chapters: ["Trig Identities"],
  },
  {
    slug: "double-angle",
    name: "Double / half-angle formulas",
    qCount: 28,
    pctHard: 50,
    summary: "The hardest principle in the bank (50% HARD rate). sin 2A = 2 sin A cos A and cousins.",
    drill: [
      { chapter: "Trigonometric Identities", subtopic: "Multiple and Half-Angle Formulas" },
      { chapter: "Properties of Triangle", subtopic: "Triangle Identities — A+B+C=π, Half-Angle, and Double-Angle" },
    ],
    chapters: ["Trig Identities", "Properties of Triangle"],
  },
  {
    slug: "triangle-a-plus-b-plus-c-pi",
    name: "Triangle identity A + B + C = π",
    qCount: 9,
    pctHard: 47,
    summary: "Unlocks tan A + tan B + tan C = tan A · tan B · tan C and similar projection identities.",
    drill: [
      { chapter: "Properties of Triangle", subtopic: "Triangle Identities — A+B+C=π, Half-Angle, and Double-Angle" },
    ],
    chapters: ["Properties of Triangle"],
  },
  {
    slug: "sine-cosine-rules",
    name: "Sine rule + Cosine rule",
    qCount: 28,
    pctHard: 35,
    summary: "a/sin A = 2R and c² = a² + b² − 2ab cos C. Drives every \"solve the triangle\" problem; also surfaces in Height & Distance.",
    drill: [
      { chapter: "Properties of Triangle", subtopic: "Sine and Cosine Rules — Solving Triangles" },
      { chapter: "Height & Distance", subtopic: "Heights and Distances from Angles of Elevation" },
    ],
    chapters: ["Properties of Triangle", "Height & Distance"],
  },
  {
    slug: "cube-roots-of-unity",
    name: "Cube roots of unity (1 + ω + ω² = 0, ω³ = 1)",
    qCount: 12,
    pctHard: 47,
    summary: "Pairs with Vieta in the ω-Vieta compound — the third hardest recipe in the bank.",
    drill: [
      { chapter: "Complex Numbers", subtopic: "Cube Roots of Unity" },
    ],
    chapters: ["Complex"],
  },
  {
    slug: "inclusion-exclusion",
    name: "Inclusion-Exclusion (sets + probability)",
    qCount: 24,
    pctHard: 13,
    summary: "n(A∪B) = n(A) + n(B) − n(A∩B) and the three-set generalisation. Lives in two chapters; same trick.",
    drill: [
      { chapter: "Sets & Relations", subtopic: "Counting Sets, Subsets, and Inclusion-Exclusion" },
      { chapter: "Probability", subtopic: "Event Algebra — Inclusion-Exclusion, Mutually Exclusive, Exhaustive" },
    ],
    chapters: ["Sets & Relations", "Probability"],
  },
  {
    slug: "conditional-probability-bayes",
    name: "Conditional probability + Bayes' theorem",
    qCount: 16,
    pctHard: 16,
    summary: "P(A|B) = P(A ∩ B) / P(B). Watch for the \"given that\" framing — many classical-looking questions are conditional.",
    drill: [
      { chapter: "Probability", subtopic: "Conditional Probability, Total Probability, and Bayes' Theorem" },
    ],
    chapters: ["Probability"],
  },
  {
    slug: "binomial-coefficient-identities",
    name: "Pascal / binomial-coefficient identities",
    qCount: 37,
    pctHard: 22,
    summary: "ΣC(n,r) = 2ⁿ, C(n,r) = C(n,n−r), Pascal's rule. Spans Binomial Theorem and P&C, three subtopics total.",
    drill: [
      { chapter: "Binomial Theorem", subtopic: "Coefficients and Specific Terms in Expansion" },
      { chapter: "Binomial Theorem", subtopic: "Sums of Binomial Coefficients — Alternating, Weighted, and Symmetric" },
      { chapter: "Permutation & Combination", subtopic: "Factorials and Binomial Coefficients" },
    ],
    chapters: ["Binomial Theorem", "P&C"],
  },
  {
    slug: "modulus-absolute-value",
    name: "Modulus / absolute value behaviour",
    qCount: 61,
    pctHard: 15,
    summary: "Piecewise splitting at zero. The principle behind the 2023 modulus spike — five named subtopics across four chapters cover it explicitly.",
    drill: [
      { chapter: "Limits & Continuity", subtopic: "Continuity and Differentiability — Piecewise, Modulus, Composed, Oscillatory" },
      { chapter: "Limits & Continuity", subtopic: "One-Sided Limits, Greatest Integer, and Absolute Value Limits" },
      { chapter: "Definite Integration", subtopic: "Integration of Absolute Value, Piecewise, and Greatest Integer Functions" },
      { chapter: "Differentiation", subtopic: "Differentiability of Absolute Value, Piecewise, and Greatest Integer Functions" },
      { chapter: "Functions", subtopic: "Greatest Integer Function" },
    ],
    chapters: ["Limits & Continuity", "Def Int", "Diff", "Functions"],
  },
  {
    slug: "extrema-derivatives",
    name: "Extrema via first/second derivative test",
    qCount: 42,
    pctHard: 19,
    summary: "f'(x) = 0 at critical points, f''(x) tells you max vs min. AM-GM is often the shorter alternative — the Optimisation subtopic shares ground with that principle.",
    drill: [
      { chapter: "Application of Derivatives", subtopic: "Monotonicity, Extrema, and Critical Points" },
      { chapter: "Application of Derivatives", subtopic: "Optimisation — Geometric, Trigonometric, AM-GM" },
    ],
    chapters: ["App of Deriv"],
  },
  {
    slug: "standard-limits-lhopital",
    name: "Standard limits + L'Hôpital",
    qCount: 17,
    pctHard: 22,
    summary: "lim sin x / x = 1, lim (1 + 1/x)ˣ = e, indeterminate forms via L'Hôpital.",
    drill: [
      { chapter: "Limits & Continuity", subtopic: "Limit Evaluation Techniques — L'Hôpital, Rationalization, Standard Forms" },
    ],
    chapters: ["Limits & Continuity"],
  },
  {
    slug: "continuity-conditions",
    name: "Continuity at a point",
    qCount: 18,
    pctHard: 12,
    summary: "Left limit = right limit = f(c). Piecewise problems pair this with modulus.",
    drill: [
      { chapter: "Limits & Continuity", subtopic: "Continuity and Differentiability — Piecewise, Modulus, Composed, Oscillatory" },
    ],
    chapters: ["Limits & Continuity"],
  },
  {
    slug: "differentiability-conditions",
    name: "Differentiability at a point",
    qCount: 29,
    pctHard: 12,
    summary: "Differentiability ⇒ continuity (not the converse). Modulus and greatest-integer are the standard counter-examples.",
    drill: [
      { chapter: "Limits & Continuity", subtopic: "Continuity and Differentiability — Piecewise, Modulus, Composed, Oscillatory" },
      { chapter: "Differentiation", subtopic: "Differentiability of Absolute Value, Piecewise, and Greatest Integer Functions" },
    ],
    chapters: ["Limits & Continuity", "Differentiation"],
  },
  {
    slug: "kings-property-integrals",
    name: "King's property of definite integrals",
    qCount: 20,
    pctHard: 22,
    summary: "∫₀ᵃ f(x)dx = ∫₀ᵃ f(a−x)dx. Reduces many hard-looking integrals to plug-and-add.",
    drill: [
      { chapter: "Definite Integration", subtopic: "Properties of Definite Integrals — Symmetry, King's, Odd/Even" },
    ],
    chapters: ["Definite Integration"],
  },
  {
    slug: "determinant-properties",
    name: "Determinant evaluation by row/column ops",
    qCount: 53,
    pctHard: 31,
    summary: "Largest single principle in the bank (53 q across 2 subtopics). Cofactor expansion + row/column operations + special determinant patterns (trig, complex, polynomial).",
    drill: [
      { chapter: "Matrices & Determinants", subtopic: "Determinant Properties, Operations, and Sums" },
      { chapter: "Matrices & Determinants", subtopic: "Special Determinants — Trig, Complex, Roots of Unity, Polynomial" },
    ],
    chapters: ["M&D"],
  },
  {
    slug: "central-tendency-statistics",
    name: "Measures of central tendency",
    qCount: 48,
    pctHard: 9,
    summary: "Mean, median, mode for grouped and ungrouped data. The single highest-yield subtopic for a weak student.",
    drill: [
      { chapter: "Statistics", subtopic: "Measures of Central Tendency — Mean, Median, Mode" },
    ],
    chapters: ["Statistics"],
  },
];

/** All principles grouped by domain. Top-20 entries appear in their domain
 *  AND have the slug set (the same Principle object is referenced). */
export const DOMAINS: Domain[] = [
  {
    id: "algebra",
    label: "Algebra",
    blurb: "Polynomial identities, sequences, inequalities, logarithms.",
    principles: [
      TOP_20.find((p) => p.slug === "vieta-symmetric-roots")!,
      TOP_20.find((p) => p.slug === "am-gm-mean-inequalities")!,
      TOP_20.find((p) => p.slug === "ap-three-term")!,
      TOP_20.find((p) => p.slug === "gp-three-term")!,
      {
        name: "Sum of n terms (S_n) — AP / GP / special series",
        qCount: 32,
        summary: "Sₙ for AP, GP, and special telescoping series. Knowing the closed forms saves 2-3 minutes per question.",
        drill: [{ chapter: "Sequence & Series", subtopic: "Arithmetic Progression — Sum, nth Term, Ratios" }],
      },
      {
        name: "AM ≥ GM ≥ HM chain",
        qCount: 25,
        summary: "Stronger than AM-GM alone — chains three means with equality iff all values equal.",
        drill: [{ chapter: "Sequence & Series", subtopic: "Geometric and Harmonic Progressions, AM-GM-HM Relations" }],
      },
      {
        name: "Algebraic identity expansion: (a±b)², (a+b+c)², a³+b³+c³−3abc",
        qCount: 25,
        summary: "The pre-Vieta toolkit. The trick is recognising structure before brute-forcing.",
        drill: [{ chapter: "Matrices & Determinants", subtopic: "Determinant Properties, Operations, and Sums" }],
      },
      {
        name: "Symmetric polynomial: αⁿ + βⁿ recurrence",
        qCount: 15,
        summary: "If α, β are roots and Sₙ = αⁿ + βⁿ, then Sₙ₊₁ = (α + β)Sₙ − αβ·Sₙ₋₁.",
        drill: [{ chapter: "Quadratic Equations", subtopic: "Vieta's Relations and Root-Coefficient Identities" }],
      },
      {
        name: "Logarithm laws (log ab, log aⁿ, change of base)",
        qCount: 30,
        summary: "Pairs with AP/GP and trig equations frequently. Memorise three; derive the rest.",
        drill: [{ chapter: "Logarithms", subtopic: "Logarithm Identities, Change of Base, and Sums" }],
      },
      {
        name: "Divisibility, prime factorisation, modular arithmetic",
        qCount: 15,
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
      TOP_20.find((p) => p.slug === "double-angle")!,
      TOP_20.find((p) => p.slug === "compound-angle")!,
      TOP_20.find((p) => p.slug === "triangle-a-plus-b-plus-c-pi")!,
      TOP_20.find((p) => p.slug === "sine-cosine-rules")!,
      {
        name: "sin²θ + cos²θ = 1 / Pythagorean identities",
        qCount: 35,
        summary: "1 + tan² = sec², 1 + cot² = csc². The substrate of every trig manipulation.",
        drill: [{ chapter: "Trigonometric Identities", subtopic: "Compound Angle Formulas" }],
      },
      {
        name: "Sum-to-product / product-to-sum identities",
        qCount: 15,
        summary: "2 sin A cos B = sin(A+B) + sin(A−B) and cousins. Used to telescope or factor trig sums.",
        drill: [{ chapter: "Trigonometric Identities", subtopic: "Product-to-Sum and Sum-to-Product Identities" }],
      },
      {
        name: "Specific values + quadrant analysis",
        qCount: 60,
        summary: "Standard values at 30°/45°/60°/90° plus sign by quadrant. The lowest-level skill but tested everywhere.",
        drill: [{ chapter: "Trigonometric Identities", subtopic: "Specific Values and Quadrants" }],
      },
      {
        name: "Inverse trig identities (sin⁻¹ + cos⁻¹ = π/2)",
        qCount: 25,
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
      TOP_20.find((p) => p.slug === "cube-roots-of-unity")!,
      {
        name: "Modulus / argument / conjugate",
        qCount: 25,
        summary: "|z|² = z·z̄, arg z, polar form. The base of every complex-number question.",
        drill: [{ chapter: "Complex Numbers", subtopic: "Modulus, Argument, and Conjugate" }],
      },
      {
        name: "Powers and nth roots of unity / De Moivre",
        qCount: 10,
        summary: "(cos θ + i sin θ)ⁿ = cos nθ + i sin nθ. Tested rarely but elegant.",
        drill: [{ chapter: "Complex Numbers", subtopic: "Powers and Roots" }],
      },
      {
        name: "Conjugate-pair cancellation",
        qCount: 5,
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
      TOP_20.find((p) => p.slug === "standard-limits-lhopital")!,
      TOP_20.find((p) => p.slug === "continuity-conditions")!,
      TOP_20.find((p) => p.slug === "differentiability-conditions")!,
      TOP_20.find((p) => p.slug === "extrema-derivatives")!,
      TOP_20.find((p) => p.slug === "kings-property-integrals")!,
      {
        name: "Chain rule / logarithmic differentiation",
        qCount: 25,
        summary: "(f(g(x)))' = f'(g(x))·g'(x). Plus log-differentiation for products of powers.",
        drill: [{ chapter: "Differentiation", subtopic: "Differentiation Techniques — Chain Rule, Logarithmic, Composite Functions" }],
      },
      {
        name: "Parametric / implicit / higher-order derivatives",
        qCount: 20,
        summary: "When y is given via parameter t or implicitly via F(x, y) = 0.",
        drill: [{ chapter: "Differentiation", subtopic: "Parametric, Implicit, and Higher-Order Derivatives" }],
      },
      {
        name: "One-sided limits + greatest integer / |x| limits",
        qCount: 15,
        summary: "[x] and |x| at integers — left and right limits diverge. NDA loves the edge cases.",
        drill: [{ chapter: "Limits & Continuity", subtopic: "One-Sided Limits, Greatest Integer, and Absolute Value Limits" }],
      },
      {
        name: "Integration by substitution",
        qCount: 15,
        summary: "Algebraic, trig, and composite substitutions. Practice ~20 standard forms.",
        drill: [{ chapter: "Indefinite Integration", subtopic: "Integration by Substitution — Algebraic, Trigonometric, and Composite Forms" }],
      },
      {
        name: "Integration by partial fractions",
        qCount: 8,
        summary: "Rational integrands decompose. NDA-style: assume coefficients, compare numerators.",
        drill: [{ chapter: "Indefinite Integration", subtopic: "Integration by Partial Fractions" }],
      },
      {
        name: "e^x[f(x) + f'(x)] formula",
        qCount: 10,
        summary: "Pattern recognition — if the integrand is e^x times f + f', the integral is e^x · f.",
        drill: [{ chapter: "Indefinite Integration", subtopic: "Standard Forms — Exponential, Logarithmic, and Paired Trigonometric Integrals" }],
      },
      {
        name: "Odd / even function integrals",
        qCount: 12,
        summary: "∫₋ₐᵃ f(x)dx = 0 if f odd, 2∫₀ᵃ if even. Spotting the symmetry is the trick.",
        drill: [{ chapter: "Definite Integration", subtopic: "Integration of Absolute Value, Piecewise, and Greatest Integer Functions" }],
      },
      {
        name: "Area bounded by curves",
        qCount: 19,
        summary: "Setting up the right integral with correct limits is 80% of the work; computing is mechanical.",
        drill: [{ chapter: "Applications of Integration", subtopic: "Area Bounded by a Curve, Lines, and Axes" }],
      },
      {
        name: "Order / degree / formation of ODE",
        qCount: 18,
        summary: "Order = highest derivative, degree = highest power once free of fractional/derivative forms.",
        drill: [{ chapter: "Differential Equations", subtopic: "Order, Degree, and Solutions of ODE" }],
      },
      {
        name: "Separable / first-order linear / IVP ODE",
        qCount: 13,
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
        qCount: 18,
        summary: "d² = Σ(xᵢ − yᵢ)². Trivial but appears everywhere.",
        drill: [{ chapter: "Lines", subtopic: "Distance, Section, and Locus" }],
      },
      {
        name: "Section formula (m:n internal / external + midpoint)",
        qCount: 12,
        summary: "Point dividing a segment in m:n. Centroid, in-centre, circumcentre all build from this.",
        drill: [{ chapter: "Lines", subtopic: "Distance, Section, and Locus" }],
      },
      {
        name: "Slope and equation of line",
        qCount: 16,
        summary: "Point-slope, two-point, intercept forms. Family of lines through a point.",
        drill: [{ chapter: "Lines", subtopic: "Equation, Slope, and Family of Lines" }],
      },
      {
        name: "Equation of circle: (x−h)² + (y−k)² = r²",
        qCount: 12,
        summary: "Centre + radius from general form via completing the square.",
        drill: [{ chapter: "Circles", subtopic: "Circle Equation — Centre, Radius, Diameter, and Properties" }],
      },
      {
        name: "Parabola y² = 4ax + properties + latus rectum",
        qCount: 11,
        summary: "Focus, directrix, latus rectum, focal chord. The vocabulary is tested as much as the math.",
        drill: [{ chapter: "Conics", subtopic: "Parabola — Equation, Properties, and Latus Rectum" }],
      },
      {
        name: "Ellipse: foci, eccentricity, focal distances",
        qCount: 7,
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
        qCount: 22,
        summary: "Direction cosines square-sum to 1 — the 3D unit-vector identity.",
        drill: [{ chapter: "3D Geometry", subtopic: "Direction Cosines and Ratios" }],
      },
      {
        name: "Line / plane / sphere in 3D",
        qCount: 29,
        summary: "Vector form, Cartesian form, foot of perpendicular, distance between skew lines.",
        drill: [{ chapter: "3D Geometry", subtopic: "Lines and Planes in 3D" }],
      },
      {
        name: "Triangle / parallelogram / quadrilateral configurations",
        qCount: 28,
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
        qCount: 20,
        summary: "Angle between vectors, projection, perpendicularity test.",
        drill: [{ chapter: "Vectors", subtopic: "Dot Product and Angle" }],
      },
      {
        name: "Cross product / scalar triple product / coplanarity",
        qCount: 27,
        summary: "Area, volume, coplanarity test via determinant.",
        drill: [{ chapter: "Vectors", subtopic: "Cross Product and Triple Product" }],
      },
      {
        name: "Position vectors + section formula (vector form)",
        qCount: 5,
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
      TOP_20.find((p) => p.slug === "binomial-coefficient-identities")!,
      {
        name: "Permutations n! / (n−r)! + arrangements with restrictions",
        qCount: 22,
        summary: "Standard arrangements, plus boys-girls-together, no-two-X-adjacent, vowel constraints.",
        drill: [{ chapter: "Permutation & Combination", subtopic: "Arrangements with Restrictions" }],
      },
      {
        name: "Combinations C(n, r) + selection problems",
        qCount: 8,
        summary: "n!/(r!(n−r)!). Compute small cases by hand; recognise C(n,r) = C(n, n−r).",
        drill: [{ chapter: "Permutation & Combination", subtopic: "Combinations" }],
      },
      {
        name: "Forming numbers from given digits",
        qCount: 13,
        summary: "Digit-arrangement counting with constraints (no zero in lead, even, prime, etc.).",
        drill: [{ chapter: "Permutation & Combination", subtopic: "Forming Numbers from Digits" }],
      },
      {
        name: "Geometric counting (lines, triangles from points)",
        qCount: 9,
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
      TOP_20.find((p) => p.slug === "inclusion-exclusion")!,
      TOP_20.find((p) => p.slug === "conditional-probability-bayes")!,
      {
        name: "Classical probability: favourable / total",
        qCount: 25,
        summary: "The base. Sample-space construction is usually the actual work.",
        drill: [{ chapter: "Probability", subtopic: "Probability via Counting" }],
      },
      {
        name: "Independent events: P(A ∩ B) = P(A) · P(B)",
        qCount: 10,
        summary: "Independence vs mutual exclusivity — students confuse them. Independence multiplies; ME adds.",
        drill: [{ chapter: "Probability", subtopic: "Independent Events" }],
      },
      {
        name: "Event algebra (inclusion-exclusion, mutually exclusive)",
        qCount: 11,
        summary: "Compute P(A∪B), P(A∩B), P(Aᶜ) given various relations.",
        drill: [{ chapter: "Probability", subtopic: "Event Algebra — Inclusion-Exclusion, Mutually Exclusive, Exhaustive" }],
      },
      {
        name: "P(at least one) = 1 − P(none)",
        qCount: 10,
        summary: "When 'at least one X' is the question, complement is almost always faster.",
        drill: [{ chapter: "Probability", subtopic: "Probability with Dice" }],
      },
      {
        name: "Binomial distribution B(n, p)",
        qCount: 21,
        summary: "P(X=k) = C(n,k)p^k q^(n-k); mean = np, variance = npq. One chapter, two formulas.",
        drill: [{ chapter: "Binomial Distribution", subtopic: "Computing Binomial Probabilities — Exact, At-Least, and Complementary Events" }],
      },
      {
        name: "Probability with stock constructs (dice, coins, balls)",
        qCount: 23,
        summary: "Same skeleton, different surface. Recognise the sample-space template.",
        drill: [{ chapter: "Probability", subtopic: "Probability with Dice" }],
      },
    ],
  },
  {
    id: "statistics",
    label: "Statistics",
    blurb: "Central tendency, dispersion, regression, frequency distributions.",
    principles: [
      TOP_20.find((p) => p.slug === "central-tendency-statistics")!,
      {
        name: "Variance / SD / mean deviation",
        qCount: 27,
        summary: "σ² = E[(X − μ)²]. Mean deviation about mean vs median is a common trap.",
        drill: [{ chapter: "Statistics", subtopic: "Dispersion — Standard Deviation, Variance, Mean Deviation" }],
      },
      {
        name: "Coefficient of variation",
        qCount: 5,
        summary: "CV = σ/μ × 100. Used to compare variability across data sets of different scales.",
        drill: [{ chapter: "Statistics", subtopic: "Dispersion — Standard Deviation, Variance, Mean Deviation" }],
      },
      {
        name: "Regression equation + correlation coefficient",
        qCount: 11,
        summary: "y = bx + a, with b = r·σ_y/σ_x. Two regression lines intersect at (x̄, ȳ).",
        drill: [{ chapter: "Statistics", subtopic: "Regression and Correlation" }],
      },
      {
        name: "Frequency distribution + histogram + cumulative",
        qCount: 7,
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
      TOP_20.find((p) => p.slug === "modulus-absolute-value")!,
      {
        name: "Set operations (union, intersection, complement, difference)",
        qCount: 11,
        summary: "De Morgan, distributivity, symmetric difference. Read each statement carefully.",
        drill: [{ chapter: "Sets & Relations", subtopic: "Set Operations, Identities, and Cartesian Products of Sets" }],
      },
      {
        name: "Function: domain, range, properties",
        qCount: 22,
        summary: "Domain restrictions from √, log, 1/x; range from value-set analysis.",
        drill: [{ chapter: "Functions", subtopic: "Domain, Range, and Function Properties" }],
      },
      {
        name: "Composition and inverse of functions",
        qCount: 16,
        summary: "(f ∘ g)(x) and f⁻¹. The composition order matters; inverse exists only for bijections.",
        drill: [{ chapter: "Functions", subtopic: "Composition and Inverse of Functions" }],
      },
      {
        name: "Functional equations",
        qCount: 16,
        summary: "f(x + 1) = ... or 4f(x) − f(1/x) = ... — solve for the unknown function.",
        drill: [{ chapter: "Functions", subtopic: "Functional Equations" }],
      },
      {
        name: "Greatest integer / floor function",
        qCount: 28,
        summary: "[x] behaviour at integers, in limits, in integrals. Edge-case heavy.",
        drill: [{ chapter: "Functions", subtopic: "Greatest Integer Function" }],
      },
      {
        name: "Relations (reflexive, symmetric, transitive)",
        qCount: 12,
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
      TOP_20.find((p) => p.slug === "determinant-properties")!,
      {
        name: "Adjoint, inverse: A · adj(A) = det(A) · I",
        qCount: 17,
        summary: "A⁻¹ = adj(A) / det(A). Adjoint properties are tested directly (e.g., adj(adj(A)) = det(A)^(n−2) · A).",
        drill: [{ chapter: "Matrices & Determinants", subtopic: "Cofactors, Adjoint, and Inverse" }],
      },
      {
        name: "Special matrices (skew-symmetric, diagonal, idempotent, orthogonal)",
        qCount: 18,
        summary: "Each type has 1-2 defining properties; questions test which one applies.",
        drill: [{ chapter: "Matrices & Determinants", subtopic: "Special Matrices — Skew-Symmetric, Diagonal, Idempotent, Orthogonal, Rotation" }],
      },
      {
        name: "Linear systems / Cramer's rule / consistency",
        qCount: 7,
        summary: "Δ, Δₓ, Δᵧ, Δ_z. Consistency conditions are the most tested aspect.",
        drill: [{ chapter: "Matrices & Determinants", subtopic: "Linear Systems — Consistency, Cramer's Rule, Solution Space" }],
      },
    ],
  },
];
