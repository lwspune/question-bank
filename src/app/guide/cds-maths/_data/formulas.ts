/**
 * Content for /guide/cds-maths/formulas — the formulas and results CDS Elementary Mathematics actually
 * tests, one group per playbook chapter, in strategy order (cornerstone, quick-win, selective).
 *
 * PLAIN TEXT + UNICODE, NOT LaTeX: the shared FormulaSheet prints `formula` as raw text, so LaTeX
 * would ship as literal markup (see GUIDE_TEMPLATES.md). Each entry earns its place by being what a
 * subtopic of the 2016-2026 bank turns on; it is not a syllabus dump.
 */

export type FormulaEntry = {
  id: string;
  name: string;
  formula: string;
  legend: string[];
  notes?: string;
};

export type FormulaGroup = {
  chapter: string;
  playbookSlug: string;
  formulas: FormulaEntry[];
};

export const FORMULA_GROUPS: FormulaGroup[] = [
  {
    chapter: "Trigonometric Ratios and Identities",
    playbookSlug: "trigonometry",
    formulas: [
      { id: "pythagorean-identities", name: "The three identities", formula: "sin²θ + cos²θ = 1     sec²θ − tan²θ = 1     cosec²θ − cot²θ = 1", legend: ["θ = any angle"] },
      { id: "reciprocal-pairs", name: "The reciprocal pairs", formula: "(sec θ + tan θ)(sec θ − tan θ) = 1     (cosec θ + cot θ)(cosec θ − cot θ) = 1", legend: ["from the identities above"], notes: "If sec θ + tan θ = p, then sec θ − tan θ = 1/p." },
      { id: "complementary", name: "Complementary angles", formula: "sin(90° − θ) = cos θ     tan(90° − θ) = cot θ     sec(90° − θ) = cosec θ", legend: ["θ = acute angle"], notes: "tan 1° · tan 2° · … · tan 89° = 1, because each tan θ pairs with tan(90° − θ) = cot θ." },
      { id: "trig-bounds", name: "Greatest and least values", formula: "−√(a² + b²) ≤ a sin θ + b cos θ ≤ √(a² + b²)     x + 1/x ≥ 2 for x > 0", legend: ["a, b = constants"], notes: "sin θ and cos θ never exceed 1 in size, so values like sin θ = 1.2 are impossible." },
    ],
  },
  {
    chapter: "Number System",
    playbookSlug: "number-system",
    formulas: [
      { id: "hcf-lcm", name: "HCF and LCM of two numbers", formula: "HCF × LCM = a × b", legend: ["a, b = two positive integers"], notes: "True for TWO numbers only." },
      { id: "divisor-count", name: "Number of divisors", formula: "N = pᵃ qᵇ rᶜ  ⇒  divisors = (a + 1)(b + 1)(c + 1)", legend: ["p, q, r = distinct primes"] },
      { id: "trailing-zeros", name: "Trailing zeros of n!", formula: "⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + …", legend: ["⌊ ⌋ = whole-number part"] },
      { id: "unit-digit", name: "Unit digits of powers", formula: "unit digit of aⁿ repeats every 4 powers; use n mod 4 (0 → 4)", legend: ["a = base, n = exponent"] },
    ],
  },
  {
    chapter: "Mensuration 2D",
    playbookSlug: "mensuration-2d",
    formulas: [
      { id: "heron", name: "Heron's formula", formula: "Area = √(s(s − a)(s − b)(s − c)),   s = (a + b + c)/2", legend: ["a, b, c = sides"] },
      { id: "equilateral", name: "Equilateral triangle", formula: "Area = (√3/4) a²     height = (√3/2) a     inradius = a/(2√3)     circumradius = a/√3", legend: ["a = side"] },
      { id: "sector", name: "Sector and arc", formula: "Arc = (θ/360) × 2πr     Sector area = (θ/360) × πr²", legend: ["θ = angle at centre in degrees"], notes: "A sector's perimeter adds two radii to the arc." },
      { id: "inradius", name: "Inradius of any triangle", formula: "r = Area / s", legend: ["s = semi-perimeter"] },
    ],
  },
  {
    chapter: "Mensuration 3D",
    playbookSlug: "mensuration-3d",
    formulas: [
      { id: "cuboid", name: "Cuboid", formula: "V = lbh     TSA = 2(lb + bh + hl)     diagonal = √(l² + b² + h²)", legend: ["l, b, h = length, breadth, height"] },
      { id: "cylinder-cone", name: "Cylinder and cone", formula: "Cylinder: V = πr²h, CSA = 2πrh     Cone: V = ⅓πr²h, CSA = πrl, l = √(r² + h²)", legend: ["r = radius, h = height, l = slant height"] },
      { id: "sphere", name: "Sphere and hemisphere", formula: "Sphere: V = ⁴⁄₃πr³, SA = 4πr²     Solid hemisphere: V = ⅔πr³, TSA = 3πr²", legend: ["r = radius"] },
      { id: "frustum", name: "Frustum", formula: "V = ⅓πh(R² + r² + Rr)     CSA = πl(R + r)", legend: ["R, r = end radii, h = height, l = slant height"] },
      { id: "scaling", name: "Scaling", formula: "lengths × k  ⇒  areas × k²,  volumes × k³", legend: ["k = scale factor"] },
    ],
  },
  {
    chapter: "Triangles",
    playbookSlug: "triangles",
    formulas: [
      { id: "classify", name: "Classify by the largest side", formula: "c² = a² + b²: right     c² < a² + b²: acute     c² > a² + b²: obtuse", legend: ["c = largest side"] },
      { id: "altitude-hypotenuse", name: "Altitude to the hypotenuse", formula: "h² = pq     h = ab/c", legend: ["p, q = parts of the hypotenuse; a, b = legs; c = hypotenuse"] },
      { id: "apollonius", name: "Apollonius (median)", formula: "AB² + AC² = 2(AD² + BD²)", legend: ["D = midpoint of BC"], notes: "The centroid divides each median 2 : 1 from the vertex." },
      { id: "similar-areas", name: "Similar triangles", formula: "area ratio = (side ratio)²", legend: [] },
    ],
  },
  {
    chapter: "Statistics",
    playbookSlug: "statistics",
    formulas: [
      { id: "mean-shift", name: "Mean under a change", formula: "x → x + c: mean + c     x → kx: mean × k     Σ(x − x̄) = 0", legend: ["c, k = constants"] },
      { id: "grouped-median", name: "Median of grouped data", formula: "Median = l + ((n/2 − cf) / f) × h", legend: ["l = lower limit of median class", "cf = cumulative frequency before it", "f = its frequency, h = class width"] },
      { id: "empirical", name: "Mean, median and mode", formula: "Mode ≈ 3 Median − 2 Mean", legend: ["for a moderately skewed distribution"] },
    ],
  },
  {
    chapter: "Ratio, Proportion and Variation",
    playbookSlug: "ratio",
    formulas: [
      { id: "componendo", name: "Componendo-dividendo", formula: "a/b = c/d  ⇒  (a + b)/(a − b) = (c + d)/(c − d)", legend: [] },
      { id: "variation", name: "Variation", formula: "x ∝ y: x = ky     x ∝ 1/y: xy = k", legend: ["k = constant"] },
      { id: "alligation", name: "Alligation", formula: "cheaper : dearer = (d − m) : (m − c)", legend: ["c, d = prices of the two; m = mean price"] },
    ],
  },
  {
    chapter: "Time, Speed and Distance",
    playbookSlug: "tsd",
    formulas: [
      { id: "avg-speed", name: "Average speed over equal distances", formula: "2uv / (u + v)", legend: ["u, v = the two speeds"], notes: "Not (u + v)/2." },
      { id: "relative-speed", name: "Relative speed", formula: "towards each other: u + v     same direction: u − v", legend: [] },
      { id: "boats", name: "Boats and streams", formula: "boat = (down + up)/2     stream = (down − up)/2", legend: [] },
      { id: "clock", name: "Clock hands", formula: "angle = |30H − 5.5M|", legend: ["H = hour, M = minutes"] },
    ],
  },
  {
    chapter: "Percentage, Profit and Loss",
    playbookSlug: "percentage",
    formulas: [
      { id: "successive", name: "Two successive changes", formula: "net % = a + b + ab/100", legend: ["a, b = the changes (negative for a fall)"] },
      { id: "reverse", name: "Reversing a percentage", formula: "x is r% more than y  ⇒  y is (r/(100 + r)) × 100% less than x", legend: [] },
      { id: "profit", name: "Profit and discount", formula: "SP = CP(1 + p/100)     SP = MP(1 − d/100)", legend: ["p = profit %, d = discount %"] },
    ],
  },
  {
    chapter: "Data Interpretation",
    playbookSlug: "data-interpretation",
    formulas: [
      { id: "pie-share", name: "Pie-chart share", formula: "share = angle / 360°     value = share × total", legend: [] },
      { id: "pct-change", name: "Percentage change", formula: "(new − old) / old × 100", legend: [] },
    ],
  },
  {
    chapter: "Averages",
    playbookSlug: "averages",
    formulas: [
      { id: "total", name: "Mean and total", formula: "total = mean × count", legend: [] },
      { id: "weighted", name: "Combined mean", formula: "(n₁x̄₁ + n₂x̄₂) / (n₁ + n₂)", legend: ["n = group sizes, x̄ = group means"] },
    ],
  },
  {
    chapter: "Time and Work",
    playbookSlug: "time-work",
    formulas: [
      { id: "together", name: "Two workers together", formula: "time = ab / (a + b)", legend: ["a, b = days each takes alone"] },
      { id: "man-days", name: "Man-days", formula: "M₁D₁H₁ / W₁ = M₂D₂H₂ / W₂", legend: ["M = men, D = days, H = hours, W = work"] },
    ],
  },
  {
    chapter: "Simple and Compound Interest",
    playbookSlug: "interest",
    formulas: [
      { id: "si", name: "Simple interest", formula: "SI = PRT / 100", legend: ["P = principal, R = rate %, T = years"] },
      { id: "ci", name: "Compound amount", formula: "A = P(1 + R/100)ⁿ", legend: ["n = years (half-yearly: R/2 and 2n)"] },
      { id: "ci-si", name: "CI − SI for 2 years", formula: "P(R/100)²", legend: [] },
    ],
  },
  {
    chapter: "Algebraic Identities and Simplification",
    playbookSlug: "algebraic-identities",
    formulas: [
      { id: "reciprocal-sums", name: "Reciprocal sums", formula: "x + 1/x = k  ⇒  x² + 1/x² = k² − 2,   x³ + 1/x³ = k³ − 3k", legend: [] },
      { id: "cube-identity", name: "The cube identity", formula: "a³ + b³ + c³ − 3abc = (a + b + c)(a² + b² + c² − ab − bc − ca)", legend: [], notes: "If a + b + c = 0, then a³ + b³ + c³ = 3abc." },
      { id: "three-squares", name: "Square of a trinomial", formula: "(a + b + c)² = a² + b² + c² + 2(ab + bc + ca)", legend: [] },
    ],
  },
  {
    chapter: "Quadratic Equations",
    playbookSlug: "quadratic-equations",
    formulas: [
      { id: "vieta", name: "Sum and product of roots", formula: "α + β = −b/a     αβ = c/a", legend: ["ax² + bx + c = 0"] },
      { id: "discriminant", name: "Nature of roots", formula: "D = b² − 4ac:  D > 0 real and distinct, D = 0 equal, D < 0 not real", legend: [] },
      { id: "form", name: "Forming an equation", formula: "x² − (α + β)x + αβ = 0", legend: [] },
    ],
  },
  {
    chapter: "Surds, Indices and Simplification",
    playbookSlug: "surds-indices",
    formulas: [
      { id: "indices", name: "Laws of indices", formula: "aᵐ · aⁿ = aᵐ⁺ⁿ     (aᵐ)ⁿ = aᵐⁿ     a⁻ⁿ = 1/aⁿ     a⁰ = 1", legend: [] },
      { id: "rationalise", name: "Rationalising", formula: "1/(√a + √b) = (√a − √b)/(a − b)", legend: [] },
      { id: "surd-root", name: "Square root of a surd", formula: "√(a + 2√b) = √x + √y  where x + y = a, xy = b", legend: [] },
    ],
  },
  {
    chapter: "Polynomials",
    playbookSlug: "polynomials",
    formulas: [
      { id: "remainder", name: "Remainder and factor theorems", formula: "remainder of p(x) ÷ (x − a) = p(a);   (x − a) is a factor ⇔ p(a) = 0", legend: [] },
      { id: "cubes", name: "Sum and difference of cubes", formula: "a³ ± b³ = (a ± b)(a² ∓ ab + b²)", legend: [] },
    ],
  },
  {
    chapter: "Circles",
    playbookSlug: "circles",
    formulas: [
      { id: "chord", name: "Chord and distance", formula: "r² = d² + (c/2)²", legend: ["d = distance of chord from centre, c = chord"] },
      { id: "tangent", name: "Tangent length", formula: "PT = √(OP² − r²)", legend: ["O = centre, P = external point"] },
      { id: "power", name: "Power of a point", formula: "PA × PB = PC × PD = PT²", legend: ["chords or secants through P; PT = tangent"] },
      { id: "common-tangent", name: "Common tangents", formula: "direct: √(d² − (r₁ − r₂)²)     transverse: √(d² − (r₁ + r₂)²)", legend: ["d = distance between centres"] },
    ],
  },
  {
    chapter: "Quadrilaterals",
    playbookSlug: "quadrilaterals",
    formulas: [
      { id: "rhombus", name: "Rhombus", formula: "area = ½ d₁d₂     side² = (d₁/2)² + (d₂/2)²", legend: ["d₁, d₂ = diagonals"] },
      { id: "trapezium", name: "Trapezium", formula: "area = ½(a + b)h", legend: ["a, b = parallel sides"] },
    ],
  },
  {
    chapter: "Heights and Distances",
    playbookSlug: "heights",
    formulas: [
      { id: "height", name: "One line of sight", formula: "height = distance × tan θ", legend: ["θ = angle of elevation"] },
      { id: "complementary-elevations", name: "Complementary elevations", formula: "height = √(ab)", legend: ["a, b = distances with elevations α and 90° − α"] },
    ],
  },
  {
    chapter: "Logarithms",
    playbookSlug: "logarithms",
    formulas: [
      { id: "log-laws", name: "Laws of logarithms", formula: "log ab = log a + log b     log aⁿ = n log a     log_b a = log a / log b", legend: [] },
      { id: "digits", name: "Number of digits", formula: "digits of N = ⌊log₁₀ N⌋ + 1", legend: [] },
    ],
  },
  {
    chapter: "Linear Equations",
    playbookSlug: "linear-equations",
    formulas: [
      { id: "consistency", name: "Two equations in two unknowns", formula: "a₁/a₂ ≠ b₁/b₂: one solution     a₁/a₂ = b₁/b₂ ≠ c₁/c₂: none     all equal: infinitely many", legend: [] },
    ],
  },
];

/** Quick stats for the formulas hero — derived, never hard-coded. */
export const FORMULA_STATS = {
  formulas: FORMULA_GROUPS.reduce((s, g) => s + g.formulas.length, 0),
  chapters: FORMULA_GROUPS.length,
};
