/**
 * Content for /guide/mht-cet-maths/formulas.
 *
 * The formula compendium — a single-page index of the formulas MHT-CET Maths
 * Paper I actually tests, grouped by chapter, ordered by recent weightage
 * (cornerstone chapters first, then quick-wins, then the long tail).
 *
 * RENDERING CONVENTION — plain text + unicode, NOT LaTeX. This mirrors
 * src/app/guide/nda-physics/_data/formulas.ts exactly: the shared
 * FormulaSheet renderer prints `formula` as raw text inside a font-mono
 * block, so a backslash-LaTeX string would ship as literal markup. Plain
 * text also keeps the page a server component, copies cleanly into a
 * student's notes, and reads correctly to a screen reader. Full typesetting
 * is reserved for the worked examples on the playbook detail pages.
 *
 * Paper I is 50 questions in 90 minutes — 1.8 minutes each — and there is no
 * negative marking. That budget is why several `notes` rows below point at a
 * formula that replaces a calculus routine with one line of arithmetic.
 *
 * Editorial curation, not an exhaustive syllabus dump: each entry earns its
 * place by carrying a subtopic that appears in the 2021-2025 MHT-CET bank.
 */

export type FormulaEntry = {
  /** Stable identifier (kebab-case). */
  id: string;
  /** What it's called. */
  name: string;
  /** The formula in plain-text + unicode. */
  formula: string;
  /** Symbol legend — one line per variable. */
  legend: string[];
  /** Optional trap/precondition. Where students go wrong. */
  notes?: string;
};

export type FormulaGroup = {
  /** Chapter — canonical bank name, matches PLAYBOOKS[].chapter. */
  chapter: string;
  /** Playbook slug — used to link the group header to its deep-dive. */
  playbookSlug: string;
  formulas: FormulaEntry[];
};

export const FORMULA_GROUPS: FormulaGroup[] = [
  {
    chapter: "Line and Plane",
    playbookSlug: "line-and-plane",
    formulas: [
      {
        id: "direction-cosines",
        name: "Direction cosines and direction ratios",
        formula: "l² + m² + n² = 1     l = a/√(a²+b²+c²),  m = b/√(a²+b²+c²),  n = c/√(a²+b²+c²)",
        legend: [
          "a, b, c = direction ratios (any non-zero multiple works)",
          "l, m, n = direction cosines (a specific, normalised triple)",
        ],
        notes:
          "Ratios are NOT unique, cosines are. l²+m²+n²=1 is the check that you divided by the right magnitude; if it does not come to 1 you have direction ratios, not cosines.",
      },
      {
        id: "line-equations",
        name: "Equation of a line — vector and cartesian form",
        formula: "r = a + λb     (x − x₁)/a₁ = (y − y₁)/a₂ = (z − z₁)/a₃",
        legend: [
          "a = position vector of a known point on the line",
          "b = direction vector, components a₁, a₂, a₃",
          "λ = scalar parameter",
        ],
        notes:
          "Line through two points: b = (position of B) − (position of A). A zero in a denominator is shorthand for that coordinate being constant, not an error.",
      },
      {
        id: "plane-equations",
        name: "Equation of a plane",
        formula: "r · n = d     ax + by + cz + d = 0     r · n̂ = p (normal form)",
        legend: [
          "n = normal vector, components a, b, c",
          "n̂ = unit normal",
          "p = perpendicular distance of the plane from the origin",
        ],
        notes:
          "The coefficients of x, y, z ARE the normal — read them straight off. Plane through a point A with normal n: r · n = a · n.",
      },
      {
        id: "angle-line-plane",
        name: "Angles — line-line, plane-plane, line-plane",
        formula:
          "lines:  cos θ = |b₁·b₂| / (|b₁||b₂|)\nplanes: cos θ = |n₁·n₂| / (|n₁||n₂|)\nline & plane: sin θ = |b·n| / (|b||n|)",
        legend: [
          "b, b₁, b₂ = direction vectors of the lines",
          "n, n₁, n₂ = normal vectors of the planes",
          "θ = acute angle between the two objects",
        ],
        notes:
          "The line-and-plane case uses SIN, not cos — this is the single most-repeated slip in the chapter. Reason: you measure the angle to the plane but compute with its normal, so the two are complementary.",
      },
      {
        id: "point-plane-distance",
        name: "Distance of a point from a plane",
        formula: "d = |ax₁ + by₁ + cz₁ + d₀| / √(a² + b² + c²)",
        legend: [
          "(x₁, y₁, z₁) = the point",
          "ax + by + cz + d₀ = 0 = the plane",
        ],
        notes:
          "Two parallel planes: put both in the same normal coefficients first, then d = |d₁ − d₂| / √(a²+b²+c²). Forgetting to re-scale one equation is the usual error.",
      },
      {
        id: "skew-distance",
        name: "Shortest distance between two skew lines",
        formula: "d = |(a₂ − a₁) · (b₁ × b₂)| / |b₁ × b₂|",
        legend: [
          "a₁, a₂ = points on the two lines",
          "b₁, b₂ = their direction vectors",
        ],
        notes:
          "Only valid when b₁ × b₂ ≠ 0. If the lines are PARALLEL the denominator vanishes and you must use d = |(a₂ − a₁) × b| / |b| instead. Check for parallelism before reaching for this.",
      },
      {
        id: "coplanarity-lines",
        name: "Condition for two lines to be coplanar (intersecting)",
        formula: "(a₂ − a₁) · (b₁ × b₂) = 0",
        legend: [
          "Same symbols as the shortest-distance formula",
          "Left side = the scalar triple product [a₂ − a₁, b₁, b₂]",
        ],
        notes:
          "Shared with Vectors: this is the scalar triple product = 0 test wearing a 3-D geometry costume. Zero triple product means shortest distance zero means coplanar. One idea, three chapter dialects.",
      },
      {
        id: "foot-and-image",
        name: "Foot of perpendicular and image of a point in a plane",
        formula:
          "(x − x₁)/a = (y − y₁)/b = (z − z₁)/c = −k(ax₁ + by₁ + cz₁ + d₀)/(a² + b² + c²)\nfoot: k = 1     image: k = 2",
        legend: [
          "(x₁, y₁, z₁) = the given point",
          "a, b, c = normal coefficients of the plane",
          "k = 1 for the foot, k = 2 for the mirror image",
        ],
        notes:
          "The image is exactly twice as far along the same normal as the foot. Solving the foot and then forgetting to double is the standard half-mark loss.",
      },
    ],
  },
  {
    chapter: "Vectors",
    playbookSlug: "vectors",
    formulas: [
      {
        id: "magnitude-unit",
        name: "Magnitude and unit vector",
        formula: "|a| = √(a₁² + a₂² + a₃²)     â = a / |a|",
        legend: [
          "a₁, a₂, a₃ = components along i, j, k",
          "â = unit vector in the direction of a",
        ],
        notes:
          "A unit vector along a GIVEN direction is the cheapest sub-step in the chapter and appears inside almost every other formula here. Get it wrong once and everything downstream is wrong.",
      },
      {
        id: "dot-product",
        name: "Dot product and the angle between two vectors",
        formula:
          "a · b = |a||b| cos θ = a₁b₁ + a₂b₂ + a₃b₃     cos θ = (a · b)/(|a||b|)",
        legend: [
          "θ = angle between a and b",
          "Result is a SCALAR",
        ],
        notes:
          "a · b = 0 means perpendicular — the same condition as m₁m₂ = −1 for lines and a + b = 0 for a pair of lines. The perpendicularity test appears across 7 chapters in 4 different dialects; learn it once.",
      },
      {
        id: "projection",
        name: "Projection of one vector on another",
        formula:
          "scalar projection of a on b = (a · b)/|b|\nvector projection = ((a · b)/|b|²) b",
        legend: [
          "b = the vector you project ONTO",
          "|b|² = b · b",
        ],
        notes:
          "Note which vector sits in the denominator. Projection of a on b is not the projection of b on a unless the magnitudes are equal.",
      },
      {
        id: "cross-product",
        name: "Cross product",
        formula:
          "|a × b| = |a||b| sin θ     a × b = −(b × a)     a × b ⊥ both a and b",
        legend: [
          "Result is a VECTOR perpendicular to the plane of a and b",
          "Components come from the 3x3 determinant with i, j, k in the first row",
        ],
        notes:
          "Anti-commutative — swapping the order flips the sign, unlike the dot product. a × b = 0 means parallel or collinear.",
      },
      {
        id: "area-triangle-parallelogram",
        name: "Area of a triangle and a parallelogram",
        formula:
          "triangle (adjacent sides a, b):      A = ½|a × b|\nparallelogram (adjacent sides):      A = |a × b|\nparallelogram (diagonals d₁, d₂):   A = ½|d₁ × d₂|",
        legend: [
          "a, b = vectors along two adjacent sides from the same vertex",
          "d₁, d₂ = the two diagonals",
        ],
        notes:
          "Read the question for SIDES versus DIAGONALS — the half appears in opposite places in the two parallelogram forms, which is exactly what the distractors are built from.",
      },
      {
        id: "scalar-triple-product",
        name: "Scalar triple product, volume and coplanarity",
        formula:
          "[a b c] = a · (b × c) = det of the 3x3 component matrix\nvolume of parallelepiped = |[a b c]|\nvolume of tetrahedron = (1/6)|[a b c]|\ncoplanar ⟺ [a b c] = 0",
        legend: [
          "[a b c] = scalar triple product (a scalar)",
          "Cyclic rotation leaves it unchanged; swapping any two vectors flips the sign",
        ],
        notes:
          "This is the bank's single densest vectors subtopic (71 q) and its hardest (72% HARD). The zero-determinant test is universal: it is concurrency of lines, collinearity of points, coplanarity of vectors and coplanarity of two 3-D lines, all the same computation.",
      },
      {
        id: "collinear-coplanar-conditions",
        name: "Collinearity and coplanarity conditions",
        formula:
          "collinear vectors:  a × b = 0,  or b = λa\ncollinear points A, B, C:  AB = λ·AC\ncoplanar vectors:  [a b c] = 0,  or c = xa + yb",
        legend: [
          "λ, x, y = scalars",
          "AB, AC = vectors between the position vectors of the points",
        ],
        notes:
          "Two equivalent routes each time — a determinant, or a linear combination. On a 1.8 minute budget the determinant is usually faster; the linear combination is faster when the question already hands you the scalars.",
      },
      {
        id: "section-formula-vectors",
        name: "Section formula (vector form)",
        formula:
          "internal (ratio m:n):  r = (m·b + n·a)/(m + n)\nexternal (ratio m:n):  r = (m·b − n·a)/(m − n)\nmidpoint:              r = (a + b)/2",
        legend: [
          "a, b = position vectors of the two endpoints",
          "m:n = the dividing ratio",
        ],
        notes:
          "Same formula as coordinate geometry in Straight Line, written with position vectors instead of coordinates. Centroid of a triangle = (a + b + c)/3.",
      },
    ],
  },
  {
    chapter: "Applications of Derivative",
    playbookSlug: "applications-of-derivative",
    formulas: [
      {
        id: "tangent-normal",
        name: "Tangent and normal to a curve",
        formula:
          "slope of tangent  m = dy/dx at (x₁, y₁)\ntangent:  y − y₁ = m(x − x₁)\nnormal:   y − y₁ = (−1/m)(x − x₁)",
        legend: [
          "(x₁, y₁) = point of contact, which must lie ON the curve",
          "m = value of the derivative AT that point, a number not a function",
        ],
        notes:
          "Two failure modes: leaving dy/dx as an expression instead of evaluating it, and a vertical tangent where dy/dx is undefined (there the tangent is x = x₁ and the normal is horizontal).",
      },
      {
        id: "rate-of-change",
        name: "Rate of change and related rates",
        formula: "dy/dt = (dy/dx) · (dx/dt)",
        legend: [
          "t = time (or whatever the independent variable is)",
          "dx/dt = the rate you are GIVEN, dy/dt = the rate asked for",
        ],
        notes:
          "This is the chain rule from Differentiation applied to time. Write the geometric relation first (V = (4/3)πr³, A = πr² …), then differentiate both sides with respect to t, then substitute — substituting the numeric value too early is the usual wreck.",
      },
      {
        id: "increasing-decreasing",
        name: "Increasing and decreasing test",
        formula:
          "f'(x) > 0 on an interval ⟹ f is increasing there\nf'(x) < 0 on an interval ⟹ f is decreasing there",
        legend: ["f'(x) = first derivative", "Test applies on an INTERVAL, not at a point"],
        notes:
          "Find the critical points, then test the SIGN of f' in each interval between them — do not test the value of f. Strictly-increasing versus non-decreasing matters when f' vanishes at isolated points.",
      },
      {
        id: "second-derivative-test",
        name: "Maxima and minima (second-derivative test)",
        formula:
          "f'(c) = 0 and f''(c) < 0 ⟹ local MAXIMUM at c\nf'(c) = 0 and f''(c) > 0 ⟹ local MINIMUM at c\nf''(c) = 0 ⟹ test fails, use the first-derivative sign change",
        legend: [
          "c = critical point where f'(c) = 0",
          "f''(c) = second derivative evaluated at c",
        ],
        notes:
          "Sign convention is the trap: NEGATIVE second derivative gives the MAXIMUM. For an optimisation word problem also check the endpoints of the feasible domain — the absolute extremum is not always at a critical point.",
      },
      {
        id: "rolle-lmvt",
        name: "Rolle's theorem and Lagrange's mean value theorem",
        formula:
          "Rolle: f continuous on [a,b], differentiable on (a,b), f(a) = f(b) ⟹ ∃ c in (a,b) with f'(c) = 0\nLMVT: f continuous on [a,b], differentiable on (a,b) ⟹ ∃ c in (a,b) with f'(c) = (f(b) − f(a))/(b − a)",
        legend: [
          "[a, b] = closed interval (continuity)",
          "(a, b) = open interval (differentiability)",
          "c = the guaranteed interior point",
        ],
        notes:
          "Rolle is LMVT with f(a) = f(b). The exam more often tests whether the HYPOTHESES hold than the value of c — a modulus function on an interval containing its corner fails differentiability, so neither theorem applies.",
      },
      {
        id: "approximation-differentials",
        name: "Approximation using differentials",
        formula: "f(x + Δx) ≈ f(x) + f'(x)·Δx     Δy ≈ (dy/dx)·Δx",
        legend: [
          "x = a nearby value at which f is easy to evaluate exactly",
          "Δx = the small increment (signed)",
        ],
        notes:
          "The bank's only 0% HARD subtopic in this chapter (11 q). Pick x to be the nearest perfect square, cube or standard angle, keep the sign of Δx, and work in RADIANS for trigonometric cases.",
      },
      {
        id: "angle-between-curves",
        name: "Angle between two curves and orthogonality",
        formula:
          "tan θ = |(m₁ − m₂)/(1 + m₁m₂)|     orthogonal ⟺ m₁m₂ = −1",
        legend: [
          "m₁, m₂ = the two tangent slopes at the point of intersection",
          "θ = acute angle between the curves",
        ],
        notes:
          "Identical formula to the angle between two straight lines — the curves only supply the slopes. Find the intersection point FIRST; the angle is defined there and nowhere else.",
      },
    ],
  },
  {
    chapter: "Differential Equations",
    playbookSlug: "differential-equations",
    formulas: [
      {
        id: "order-degree",
        name: "Order and degree",
        formula:
          "order  = order of the highest derivative present\ndegree = power of that highest derivative, after clearing radicals and fractions",
        legend: [
          "Degree is defined only when the equation is polynomial in its derivatives",
        ],
        notes:
          "Degree is undefined if a derivative sits inside sin, log or an exponential. Clear the radicals BEFORE reading the degree — an unsimplified equation reads the wrong number.",
      },
      {
        id: "variable-separable",
        name: "Variable-separable equations",
        formula: "f(y) dy = g(x) dx  ⟹  ∫f(y) dy = ∫g(x) dx + c",
        legend: ["c = arbitrary constant of integration"],
        notes:
          "One constant, added once, on one side. If an initial condition is given, substitute it immediately to fix c rather than carrying it through the algebra.",
      },
      {
        id: "homogeneous-substitution",
        name: "Homogeneous equations (substitution)",
        formula:
          "dy/dx = F(y/x)   put y = vx,  dy/dx = v + x·(dv/dx)   ⟹ separable in v and x",
        legend: [
          "v = y/x, the new dependent variable",
          "F = a function of the ratio y/x alone",
        ],
        notes:
          "The product-rule term x·(dv/dx) is the step people drop. If the equation is homogeneous in x instead, substitute x = vy. Homogeneous here means same total degree in every term, unrelated to the linear-algebra sense.",
      },
      {
        id: "linear-integrating-factor",
        name: "Linear equations — integrating factor",
        formula:
          "dy/dx + P(x)·y = Q(x)     IF = e^(∫P dx)     y·(IF) = ∫Q·(IF) dx + c",
        legend: [
          "P, Q = functions of x only",
          "IF = integrating factor",
        ],
        notes:
          "PRECONDITION: the equation must already be in dy/dx + Py = Q with the coefficient of dy/dx equal to 1. Divide through first — reading P off an unnormalised equation is the commonest error, and this is the chapter's hardest subtopic at 63% HARD. The mirror form dx/dy + Px = Q with IF = e^(∫P dy) is used just as often.",
      },
      {
        id: "growth-decay",
        name: "Growth and decay",
        formula: "dN/dt = k·N  ⟹  N = N₀ e^(kt)",
        legend: [
          "N₀ = amount at t = 0",
          "k > 0 for growth, k < 0 for decay",
          "half-life: N = N₀/2",
        ],
        notes:
          "Two unknowns, N₀ and k, so you need two data points. Solve for k as a ratio (take logs of N₂/N₁) rather than evaluating exponentials numerically — the answers are usually left in terms of logs.",
      },
      {
        id: "newton-cooling",
        name: "Newton's law of cooling",
        formula:
          "dθ/dt = −k(θ − θ₀)  ⟹  θ − θ₀ = (θ₁ − θ₀) e^(−kt)",
        legend: [
          "θ = temperature of the body at time t",
          "θ₀ = ambient (surrounding) temperature, a constant",
          "θ₁ = initial temperature of the body",
        ],
        notes:
          "It is the decay model applied to the EXCESS temperature θ − θ₀, not to θ. Only 5 q in the bank but 60% HARD — the difficulty is entirely in remembering to subtract the ambient temperature first.",
      },
    ],
  },
  {
    chapter: "Indefinite Integration",
    playbookSlug: "indefinite-integration",
    formulas: [
      {
        id: "standard-integrals",
        name: "Standard integrals",
        formula:
          "∫xⁿ dx = x^(n+1)/(n+1) + c  (n ≠ −1)     ∫(1/x) dx = ln|x| + c\n∫eˣ dx = eˣ + c     ∫aˣ dx = aˣ/ln a + c\n∫sin x dx = −cos x + c     ∫cos x dx = sin x + c     ∫sec²x dx = tan x + c",
        legend: ["c = arbitrary constant", "n = any real number other than −1"],
        notes:
          "The n = −1 exception is not a technicality — it is what makes a log appear from nowhere in partial-fraction answers. The modulus in ln|x| matters for definite work later.",
      },
      {
        id: "standard-trig-log",
        name: "Standard integrals giving logs",
        formula:
          "∫tan x dx = ln|sec x| + c     ∫cot x dx = ln|sin x| + c\n∫sec x dx = ln|sec x + tan x| + c     ∫cosec x dx = ln|cosec x − cot x| + c",
        legend: ["All four are recall, not derivation"],
        notes:
          "Sign traps: cot gives +ln|sin x| but tan gives +ln|sec x| = −ln|cos x|. Options are routinely built from the equivalent-but-differently-signed form, so recognise −ln|cos x| as the same answer.",
      },
      {
        id: "quadratic-denominators",
        name: "Integrals with a quadratic denominator",
        formula:
          "∫dx/(x² + a²) = (1/a)tan⁻¹(x/a) + c\n∫dx/(x² − a²) = (1/2a)ln|(x − a)/(x + a)| + c\n∫dx/(a² − x²) = (1/2a)ln|(a + x)/(a − x)| + c",
        legend: ["a = a positive constant"],
        notes:
          "The middle and last differ ONLY in which term is subtracted, and the printed options exploit exactly that. For a general quadratic, complete the square first to reach one of these three shapes.",
      },
      {
        id: "surd-denominators",
        name: "Integrals with a surd denominator",
        formula:
          "∫dx/√(a² − x²) = sin⁻¹(x/a) + c\n∫dx/√(x² + a²) = ln|x + √(x² + a²)| + c\n∫dx/√(x² − a²) = ln|x + √(x² − a²)| + c",
        legend: ["a = a positive constant"],
        notes:
          "Which of a² and x² comes first decides between an inverse sine and a log. Complete the square to convert an arbitrary quadratic under the root into one of these.",
      },
      {
        id: "integration-by-parts",
        name: "Integration by parts",
        formula:
          "∫u·v dx = u·∫v dx − ∫[(du/dx)·∫v dx] dx\nchoose u by ILATE: Inverse, Log, Algebraic, Trigonometric, Exponential",
        legend: [
          "u = the function you DIFFERENTIATE",
          "v = the function you INTEGRATE",
        ],
        notes:
          "ILATE picks u, and picking it backwards makes the second integral worse than the first. ∫ln x dx and ∫sin⁻¹x dx are by parts with v = 1 — the hidden second factor students never see.",
      },
      {
        id: "exponential-special",
        name: "The e^x [f + f'] shortcut",
        formula: "∫eˣ[f(x) + f'(x)] dx = eˣ·f(x) + c",
        legend: ["f'(x) = derivative of f(x)"],
        notes:
          "Recognising this pattern converts a two-round by-parts problem into one line — a real time lever at 1.8 minutes per question. The variant ∫e^(ax)[a·f + f'] dx = e^(ax)·f(x) + c is asked too.",
      },
      {
        id: "partial-fractions",
        name: "Partial fractions",
        formula:
          "P(x)/[(x−a)(x−b)] = A/(x−a) + B/(x−b)\nrepeated factor: A/(x−a) + B/(x−a)²\nirreducible quadratic: (Ax + B)/(x² + px + q)",
        legend: [
          "P(x) = numerator, degree must be LESS than the denominator",
          "A, B = constants found by substituting the roots",
        ],
        notes:
          "PRECONDITION: if the numerator degree is greater than or equal to the denominator degree, do the long division FIRST. Skipping that step is the standard wrong start.",
      },
      {
        id: "trig-substitutions",
        name: "Trigonometric substitutions",
        formula:
          "√(a² − x²) → x = a sin θ\n√(a² + x²) → x = a tan θ\n√(x² − a²) → x = a sec θ\nrational in sin x and cos x → t = tan(x/2), sin x = 2t/(1+t²), cos x = (1−t²)/(1+t²), dx = 2dt/(1+t²)",
        legend: ["θ, t = the new variable of integration"],
        notes:
          "The half-angle substitution is the fallback for a/(b + c·sin x) type integrals, and it is the chapter's most expensive subtopic at 74% HARD. For a + b·cos²x forms, divide through by cos²x and try t = tan x instead — far shorter.",
      },
    ],
  },
  {
    chapter: "Differentiation",
    playbookSlug: "differentiation",
    formulas: [
      {
        id: "standard-derivatives",
        name: "Standard derivatives",
        formula:
          "d/dx(xⁿ) = n·xⁿ⁻¹     d/dx(eˣ) = eˣ     d/dx(aˣ) = aˣ·ln a     d/dx(ln x) = 1/x\nd/dx(sin x) = cos x     d/dx(cos x) = −sin x     d/dx(tan x) = sec²x\nd/dx(cot x) = −cosec²x     d/dx(sec x) = sec x·tan x     d/dx(cosec x) = −cosec x·cot x",
        legend: ["n = any real constant", "a > 0, a ≠ 1"],
        notes:
          "Every co-function (cos, cot, cosec) carries a minus sign. That single pattern removes half the sign errors in the chapter.",
      },
      {
        id: "product-quotient-chain",
        name: "Product, quotient and chain rules",
        formula:
          "product:  (uv)' = u'v + uv'\nquotient: (u/v)' = (u'v − uv')/v²\nchain:    dy/dx = (dy/du)·(du/dx)",
        legend: ["u, v = differentiable functions of x", "u = an intermediate function in the chain rule"],
        notes:
          "The quotient rule's numerator is NOT symmetric — the derivative of the top comes first. The chain rule is also the engine behind related rates in Applications of Derivative and behind implicit and parametric differentiation below.",
      },
      {
        id: "inverse-trig-derivatives",
        name: "Derivatives of inverse trigonometric functions",
        formula:
          "d/dx(sin⁻¹x) = 1/√(1 − x²)      d/dx(cos⁻¹x) = −1/√(1 − x²)\nd/dx(tan⁻¹x) = 1/(1 + x²)        d/dx(cot⁻¹x) = −1/(1 + x²)\nd/dx(sec⁻¹x) = 1/(|x|√(x² − 1))  d/dx(cosec⁻¹x) = −1/(|x|√(x² − 1))",
        legend: ["Domains: |x| < 1 for the first four, |x| > 1 for the last two"],
        notes:
          "The bank's largest differentiation subtopic (39 q, 49% HARD). Almost every such question is easier after a SIMPLIFYING substitution — x = tan θ for 2x/(1+x²) or (1−x²)/(1+x²) shapes — rather than differentiating the printed expression directly.",
      },
      {
        id: "implicit-differentiation",
        name: "Implicit differentiation",
        formula:
          "Differentiate every term with respect to x, treating y as a function of x, then solve for dy/dx.\nd/dx(y²) = 2y·(dy/dx)     d/dx(xy) = y + x·(dy/dx)",
        legend: ["Used when the relation cannot be solved for y explicitly"],
        notes:
          "Every y that gets differentiated drags a dy/dx factor with it. The xy term needs the product rule as well — dropping one of its two pieces is the classic slip.",
      },
      {
        id: "logarithmic-differentiation",
        name: "Logarithmic differentiation",
        formula:
          "y = [f(x)]^g(x)  ⟹  ln y = g(x)·ln f(x)  ⟹  (1/y)·(dy/dx) = derivative of the right side\ndy/dx = y · (that derivative)",
        legend: ["f(x) > 0 for the log to exist"],
        notes:
          "Required when the exponent is itself a function of x — neither the power rule nor the exponential rule applies to xˣ. Also the fastest route for a long product or quotient of many factors. Remember to multiply back by y at the end.",
      },
      {
        id: "parametric-differentiation",
        name: "Parametric and higher-order derivatives",
        formula:
          "dy/dx = (dy/dt)/(dx/dt)\nd²y/dx² = [d/dt(dy/dx)] / (dx/dt)",
        legend: ["t = the parameter", "dx/dt ≠ 0"],
        notes:
          "The second derivative is NOT (d²y/dt²)/(d²x/dt²). You must differentiate dy/dx with respect to t and then divide by dx/dt again — the single most-tested trap in this subtopic.",
      },
      {
        id: "derivative-wrt-another",
        name: "Derivative of one function with respect to another",
        formula: "du/dv = (du/dx) / (dv/dx)",
        legend: ["u, v = both functions of the same variable x"],
        notes:
          "Only 7 q in the bank but 71% HARD — the chapter's hardest subtopic. It is the parametric formula with x playing the role of the parameter. Simplify both functions with a substitution before differentiating; the ratio usually collapses to a constant.",
      },
    ],
  },
  {
    chapter: "Probability Distribution",
    playbookSlug: "probability-distribution",
    formulas: [
      {
        id: "classical-probability",
        name: "Classical probability, addition theorem and odds",
        formula:
          "P(A) = n(A)/n(S)\nP(A ∪ B) = P(A) + P(B) − P(A ∩ B)\nmutually exclusive: P(A ∩ B) = 0\nodds in favour a : b  ⟹  P = a/(a + b)",
        legend: [
          "n(S) = total number of equally likely outcomes",
          "n(A) = outcomes favourable to A",
        ],
        notes:
          "Odds are a RATIO of favourable to unfavourable, probability is favourable over total — converting one to the other by writing a/b is the standard error. P(A') = 1 − P(A) turns most at-least-one questions into one subtraction.",
      },
      {
        id: "conditional-independence",
        name: "Conditional probability and independence",
        formula:
          "P(A | B) = P(A ∩ B)/P(B),  P(B) ≠ 0\nmultiplication: P(A ∩ B) = P(B)·P(A | B)\nindependent ⟺ P(A ∩ B) = P(A)·P(B)",
        legend: ["P(A | B) = probability of A GIVEN that B has occurred"],
        notes:
          "Independent and mutually exclusive are opposite ideas, not synonyms: two events with non-zero probability cannot be both. Watch the order of the conditioning bar; P(A|B) and P(B|A) are different numbers.",
      },
      {
        id: "bayes-theorem",
        name: "Bayes' theorem",
        formula:
          "P(Aᵢ | B) = P(Aᵢ)·P(B | Aᵢ) / Σⱼ P(Aⱼ)·P(B | Aⱼ)",
        legend: [
          "A₁, A₂, … = mutually exclusive and exhaustive causes",
          "B = the observed event",
          "The denominator is the total probability of B",
        ],
        notes:
          "Bayes reverses the conditioning: you are given P(B given cause) and asked for P(cause given B). Identify which one the question hands you before writing anything — reading it the wrong way round produces a plausible wrong option every time.",
      },
      {
        id: "pmf-cdf",
        name: "Probability mass function and distribution function",
        formula:
          "0 ≤ p(xᵢ) ≤ 1  and  Σ p(xᵢ) = 1\nF(x) = P(X ≤ x) = Σ over all xᵢ ≤ x of p(xᵢ)",
        legend: [
          "X = discrete random variable",
          "p(xᵢ) = probability that X takes the value xᵢ",
          "F(x) = cumulative distribution function",
        ],
        notes:
          "Σp = 1 is how you find an unknown k in a printed table — it is the whole of many questions. F is a running total and is non-decreasing, so P(a < X ≤ b) = F(b) − F(a).",
      },
      {
        id: "expectation-variance",
        name: "Expectation, variance and standard deviation",
        formula:
          "E(X) = μ = Σ xᵢ·p(xᵢ)\nVar(X) = σ² = Σ xᵢ²·p(xᵢ) − [E(X)]² = E(X²) − [E(X)]²\nSD = σ = √Var(X)",
        legend: [
          "μ = mean of the distribution",
          "σ² = variance, σ = standard deviation",
        ],
        notes:
          "Compute E(X²) with the SQUARED x values against the SAME probabilities — squaring the products instead of the values is the usual wreck. Variance can never be negative; a negative result means you subtracted before squaring the mean.",
      },
    ],
  },
  {
    chapter: "Mathematical Logic",
    playbookSlug: "mathematical-logic",
    formulas: [
      {
        id: "de-morgan-logic",
        name: "De Morgan's laws and negation of an implication",
        formula:
          "~(p ∧ q) ≡ ~p ∨ ~q\n~(p ∨ q) ≡ ~p ∧ ~q\n~(p → q) ≡ p ∧ ~q\n~(p ↔ q) ≡ (p ∧ ~q) ∨ (q ∧ ~p)",
        legend: [
          "~ = negation, ∧ = and, ∨ = or",
          "→ = implication, ↔ = biconditional",
        ],
        notes:
          "Negating an implication produces an AND, never another implication — this is the single most-tested equivalence in the chapter and the distractors are always the plausible ~p → ~q.",
      },
      {
        id: "implication-equivalences",
        name: "Converse, inverse, contrapositive",
        formula:
          "statement:      p → q\nconverse:       q → p\ninverse:        ~p → ~q\ncontrapositive: ~q → ~p\np → q ≡ ~p ∨ q ≡ contrapositive",
        legend: ["p = hypothesis (antecedent), q = conclusion (consequent)"],
        notes:
          "A statement is logically equivalent to its CONTRAPOSITIVE only. The converse and the inverse are equivalent to each other but not to the original — the paper tests exactly this pairing.",
      },
      {
        id: "tautology-contradiction",
        name: "Tautology, contradiction and quantifier negation",
        formula:
          "tautology    = last column of the truth table is all T\ncontradiction = last column is all F\ncontingency   = a mix\n~(∀x, p(x)) ≡ ∃x, ~p(x)     ~(∃x, p(x)) ≡ ∀x, ~p(x)",
        legend: [
          "∀ = for all, ∃ = there exists",
          "T, F = truth values",
        ],
        notes:
          "For two statement letters the table has 4 rows, for three it has 8. Negating a quantifier flips it as well as the predicate — dropping the flip is the standard error.",
      },
      {
        id: "switch-circuits",
        name: "Switching circuits",
        formula:
          "switches in SERIES   = conjunction  (p ∧ q)\nswitches in PARALLEL = disjunction  (p ∨ q)\nS' (complementary switch) = ~p\ncurrent flows ⟺ the corresponding statement is T",
        legend: [
          "p, q = the switch states (closed = T, open = F)",
        ],
        notes:
          "Series is AND because BOTH switches must be closed; parallel is OR because EITHER suffices. Simplify with the distributive and absorption laws before drawing — the questions asking for the simplest equivalent circuit are entirely algebra.",
      },
    ],
  },
  {
    chapter: "Binomial Distribution",
    playbookSlug: "binomial-distribution",
    formulas: [
      {
        id: "binomial-pmf",
        name: "Binomial probability mass function",
        formula: "P(X = r) = ⁿCᵣ · pʳ · q^(n−r),   r = 0, 1, 2, …, n,   q = 1 − p",
        legend: [
          "n = number of independent trials (fixed in advance)",
          "p = probability of success on ONE trial (same every trial)",
          "r = number of successes",
        ],
        notes:
          "The binomial setting needs all four: fixed n, two outcomes, constant p, independent trials. Drawing without replacement breaks constant p and is not binomial.",
      },
      {
        id: "binomial-mean-variance",
        name: "Mean, variance and standard deviation",
        formula: "mean = np     variance = npq     SD = √(npq)",
        legend: ["n = trials, p = success probability, q = 1 − p"],
        notes:
          "Since q < 1, the variance is ALWAYS less than the mean for a binomial — a printed variance exceeding the mean means the distribution is not binomial, and that is a whole question type. Given mean and variance, divide to get q, then p = 1 − q, then n = mean/p.",
      },
      {
        id: "binomial-ratio",
        name: "Successive-term ratio",
        formula: "P(X = r+1)/P(X = r) = [(n − r)/(r + 1)]·(p/q)",
        legend: ["Same symbols as the pmf"],
        notes:
          "Turns most-likely-value and parameter-estimation questions into one inequality instead of evaluating every term. Set the ratio greater than 1 to find where the probabilities stop rising.",
      },
    ],
  },
  {
    chapter: "Straight Line",
    playbookSlug: "straight-line",
    formulas: [
      {
        id: "line-forms",
        name: "Forms of the equation of a line",
        formula:
          "slope-intercept:  y = mx + c\npoint-slope:      y − y₁ = m(x − x₁)\ntwo-point:        (y − y₁)/(y₂ − y₁) = (x − x₁)/(x₂ − x₁)\nintercept:        x/a + y/b = 1\nnormal:           x·cos α + y·sin α = p",
        legend: [
          "m = slope = tan θ, θ = angle with the positive x-axis",
          "a, b = x- and y-intercepts",
          "p = perpendicular distance from the origin, α = angle that perpendicular makes with the x-axis",
        ],
        notes:
          "Pick the form that matches what you are GIVEN rather than converting everything to y = mx + c. A vertical line has no slope and no slope-intercept form at all.",
      },
      {
        id: "point-line-distance",
        name: "Distance from a point to a line, and between parallel lines",
        formula:
          "d = |ax₁ + by₁ + c| / √(a² + b²)\nparallel lines ax+by+c₁=0 and ax+by+c₂=0:  d = |c₁ − c₂| / √(a² + b²)",
        legend: ["(x₁, y₁) = the point", "ax + by + c = 0 = the line"],
        notes:
          "For the parallel case the coefficients a and b must be IDENTICAL in both equations — rescale one first. Direct sibling of the point-to-plane distance in Line and Plane: same structure, one dimension up.",
      },
      {
        id: "angle-between-lines",
        name: "Angle between two lines, perpendicularity and parallelism",
        formula:
          "tan θ = |(m₁ − m₂)/(1 + m₁m₂)|\nperpendicular ⟺ m₁m₂ = −1     parallel ⟺ m₁ = m₂",
        legend: ["m₁, m₂ = the two slopes", "θ = acute angle between the lines"],
        notes:
          "Also used for the angle between curves and for pairs of lines. In terms of coefficients: perpendicular ⟺ a₁a₂ + b₁b₂ = 0, which is the dot product of the two normals — the vectors dialect of the same condition.",
      },
      {
        id: "section-concurrency",
        name: "Section formula and concurrency",
        formula:
          "internal division m:n:  ((mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n))\nmidpoint:  ((x₁+x₂)/2, (y₁+y₂)/2)\ncentroid:  ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3)\nthree lines concurrent ⟺ the 3x3 determinant of their coefficients = 0",
        legend: ["m:n = dividing ratio", "Rows of the determinant are (a, b, c) for each line"],
        notes:
          "Concurrency of three lines, collinearity of three points and coplanarity of three vectors are all the SAME vanishing 3x3 determinant. Recognising that saves you learning three tests.",
      },
    ],
  },
  {
    chapter: "Definite Integration",
    playbookSlug: "definite-integration",
    formulas: [
      {
        id: "fundamental-theorem",
        name: "Fundamental theorem of calculus",
        formula: "∫ from a to b of f(x) dx = F(b) − F(a),  where F'(x) = f(x)",
        legend: [
          "a, b = lower and upper limits",
          "F = any antiderivative of f",
        ],
        notes:
          "No constant of integration survives — it cancels in the subtraction. On substitution you must CHANGE THE LIMITS to the new variable, or convert back before substituting; mixing the two is the standard wreck.",
      },
      {
        id: "kings-property",
        name: "King's property",
        formula: "∫ from a to b of f(x) dx = ∫ from a to b of f(a + b − x) dx",
        legend: ["a, b = the SAME limits on both sides"],
        notes:
          "PRECONDITION: the limits must be unchanged. Add the two forms to make the integrand collapse — the classic use is f(x)/(f(x) + f(a+b−x)), whose answer is always (b − a)/2. A genuine time lever: it turns an unsolvable integral into arithmetic.",
      },
      {
        id: "even-odd-symmetry",
        name: "Even and odd symmetry",
        formula:
          "∫ from −a to a of f(x) dx = 2·∫ from 0 to a of f(x) dx   if f(−x) = f(x)  (even)\n∫ from −a to a of f(x) dx = 0                                if f(−x) = −f(x) (odd)\n∫ from 0 to 2a of f(x) dx = 2·∫ from 0 to a of f(x) dx  if f(2a − x) = f(x), else 0 if f(2a − x) = −f(x)",
        legend: ["a > 0", "Limits must be symmetric about the origin for the first two"],
        notes:
          "Check the symmetry BEFORE integrating — recognising an odd integrand over a symmetric interval turns the question into the single character 0. Products: odd x odd = even, odd x even = odd.",
      },
      {
        id: "additivity-modulus",
        name: "Additivity and absolute-value integrands",
        formula:
          "∫ from a to b = ∫ from a to c + ∫ from c to b\n∫ from a to b of f = −∫ from b to a of f",
        legend: ["c = any point, usually where the integrand changes sign"],
        notes:
          "This is how you handle |f(x)| and greatest-integer integrands: split at every point where the expression inside changes sign, drop the modulus with the correct sign on each piece, and add. Integrating |x| straight through is always wrong.",
      },
    ],
  },
  {
    chapter: "Applications of Definite Integral",
    playbookSlug: "applications-of-definite-integral",
    formulas: [
      {
        id: "area-under-curve",
        name: "Area under a curve",
        formula:
          "about the x-axis:  A = ∫ from a to b of |y| dx\nabout the y-axis:  A = ∫ from c to d of |x| dy",
        legend: [
          "a, b = x-limits of the region",
          "c, d = y-limits when integrating with respect to y",
        ],
        notes:
          "The modulus matters: where the curve dips below the axis the integral is negative but the AREA is not. Split at each x-intercept and add the magnitudes. Sketch first — the limits usually come from the sketch, not the algebra.",
      },
      {
        id: "area-between-curves",
        name: "Area between two curves",
        formula:
          "A = ∫ from a to b of (y_upper − y_lower) dx\na and b are the x-coordinates of the intersection points",
        legend: [
          "y_upper = the curve on top over that interval",
          "y_lower = the curve underneath",
        ],
        notes:
          "Solve the two equations simultaneously FIRST to get the limits. If the curves cross inside the interval, upper and lower swap and you must split there. Integrating with respect to y is often shorter for a region bounded left-and-right.",
      },
    ],
  },
  {
    chapter: "Trigonometry - I",
    playbookSlug: "trigonometry-i",
    formulas: [
      {
        id: "compound-angles",
        name: "Compound angle formulas",
        formula:
          "sin(A ± B) = sin A·cos B ± cos A·sin B\ncos(A ± B) = cos A·cos B ∓ sin A·sin B\ntan(A ± B) = (tan A ± tan B)/(1 ∓ tan A·tan B)",
        legend: ["A, B = any two angles"],
        notes:
          "The cosine and tangent formulas carry the OPPOSITE sign in the second half — cos(A+B) has a minus. That flip is where most sign errors in the chapter start.",
      },
      {
        id: "multiple-angles",
        name: "Multiple and half angle formulas",
        formula:
          "sin 2A = 2 sin A·cos A = 2t/(1 + t²)\ncos 2A = cos²A − sin²A = 1 − 2sin²A = 2cos²A − 1 = (1 − t²)/(1 + t²)\ntan 2A = 2 tan A/(1 − tan²A) = 2t/(1 − t²)\nsin 3A = 3 sin A − 4 sin³A     cos 3A = 4 cos³A − 3 cos A",
        legend: ["t = tan A (or tan(A/2) for the half-angle reading)"],
        notes:
          "The three cos 2A forms exist so you can choose the one that cancels what is already in the question. The t-forms are the same substitution used for rational trigonometric integrals in Indefinite Integration.",
      },
      {
        id: "general-solutions",
        name: "General solutions of trigonometric equations",
        formula:
          "sin θ = sin α  ⟹  θ = nπ + (−1)ⁿ·α\ncos θ = cos α  ⟹  θ = 2nπ ± α\ntan θ = tan α  ⟹  θ = nπ + α",
        legend: ["n = any integer", "α = the principal solution"],
        notes:
          "Three different patterns — the sine one alternates sign with n, the cosine one takes plus-or-minus, the tangent one neither. Squaring during the solve introduces extraneous roots; substitute back and discard.",
      },
      {
        id: "properties-of-triangle-i",
        name: "Properties of a triangle — area and half-angle",
        formula:
          "area Δ = ½·ab·sin C = √(s(s−a)(s−b)(s−c)) = abc/(4R)\ns = (a + b + c)/2     r = Δ/s     R = abc/(4Δ)\ntan(A/2) = √[(s−b)(s−c) / (s(s−a))]",
        legend: [
          "a, b, c = side lengths, A, B, C = opposite angles",
          "s = semi-perimeter, Δ = area",
          "r = inradius, R = circumradius",
        ],
        notes:
          "Heron's form needs no angle at all — reach for it when only the three sides are given. Shared with Trigonometry - II, which carries the sine and cosine rules for the same triangle.",
      },
    ],
  },
  {
    chapter: "Trigonometry - II",
    playbookSlug: "trigonometry-ii",
    formulas: [
      {
        id: "sine-rule",
        name: "Sine rule",
        formula: "a/sin A = b/sin B = c/sin C = 2R",
        legend: [
          "a, b, c = sides opposite angles A, B, C",
          "R = circumradius of the triangle",
        ],
        notes:
          "Use it when you have a side and its OPPOSITE angle. The 2R tail is what links a triangle question to its circumcircle in one step.",
      },
      {
        id: "cosine-rule",
        name: "Cosine rule",
        formula:
          "a² = b² + c² − 2bc·cos A     cos A = (b² + c² − a²)/(2bc)",
        legend: ["Same side and angle labelling as the sine rule"],
        notes:
          "Use it when you have three sides, or two sides and the INCLUDED angle — the case the sine rule cannot start. A negative cosine means the angle is obtuse, which is often the whole question.",
      },
      {
        id: "projection-rule",
        name: "Projection rule",
        formula:
          "a = b·cos C + c·cos B     b = c·cos A + a·cos C     c = a·cos B + b·cos A",
        legend: ["Each side is the sum of the projections of the other two"],
        notes:
          "The fastest route for identities that mix sides and cosines, because it is linear in the sides where the cosine rule is quadratic. This chapter's largest subtopic (52 q) is these three rules together.",
      },
      {
        id: "inverse-trig-overlap",
        name: "Inverse trigonometry inside this chapter",
        formula:
          "sin⁻¹x + cos⁻¹x = π/2     tan⁻¹x + cot⁻¹x = π/2     sec⁻¹x + cosec⁻¹x = π/2",
        legend: ["Valid on each function's principal domain"],
        notes:
          "MEASURED TRAP: inverse trigonometry appears BOTH as its own chapter (73 q) and as a 21-question subtopic inside Trigonometry - II. Drill only one and you miss roughly a fifth of the topic. Full identity list is in the Inverse Trigonometric Functions group.",
      },
    ],
  },
  {
    chapter: "Inverse Trigonometric Functions",
    playbookSlug: "inverse-trigonometric-functions",
    formulas: [
      {
        id: "principal-values",
        name: "Principal value branches",
        formula:
          "sin⁻¹x ∈ [−π/2, π/2]     cos⁻¹x ∈ [0, π]     tan⁻¹x ∈ (−π/2, π/2)\ncosec⁻¹x ∈ [−π/2, π/2] minus {0}     sec⁻¹x ∈ [0, π] minus {π/2}     cot⁻¹x ∈ (0, π)",
        legend: ["Ranges, not domains — this is the OUTPUT interval"],
        notes:
          "Every inverse-trig answer must land in its principal branch. An answer of 7π/6 for a sin⁻¹ is wrong however correct the algebra was, and that is precisely what the extra options are for.",
      },
      {
        id: "complementary-identities",
        name: "Complementary and negative-argument identities",
        formula:
          "sin⁻¹x + cos⁻¹x = π/2     tan⁻¹x + cot⁻¹x = π/2     sec⁻¹x + cosec⁻¹x = π/2\nsin⁻¹(−x) = −sin⁻¹x     tan⁻¹(−x) = −tan⁻¹x\ncos⁻¹(−x) = π − cos⁻¹x     cot⁻¹(−x) = π − cot⁻¹x",
        legend: ["x in the domain of the relevant function"],
        notes:
          "The negative-argument rule SPLITS: sin and tan are odd and just flip sign, cos and cot subtract from π. Treating all six the same is the classic error.",
      },
      {
        id: "sum-formulas-inverse",
        name: "Sum formulas with their conditions",
        formula:
          "tan⁻¹x + tan⁻¹y = tan⁻¹[(x + y)/(1 − xy)]           if xy < 1\n                 = π + tan⁻¹[(x + y)/(1 − xy)]       if x, y > 0 and xy > 1\n                 = −π + tan⁻¹[(x + y)/(1 − xy)]      if x, y < 0 and xy > 1\ntan⁻¹x − tan⁻¹y = tan⁻¹[(x − y)/(1 + xy)]           if xy > −1",
        legend: ["x, y = real arguments"],
        notes:
          "PRECONDITION: the xy < 1 test decides whether a π correction is needed, and every wrong option in this question type is the uncorrected value. Check the product before you apply the formula, not after.",
      },
      {
        id: "double-angle-inverse",
        name: "Double-argument conversions",
        formula:
          "2 tan⁻¹x = sin⁻¹[2x/(1 + x²)] = cos⁻¹[(1 − x²)/(1 + x²)] = tan⁻¹[2x/(1 − x²)]\n2 sin⁻¹x = sin⁻¹[2x·√(1 − x²)]",
        legend: ["Conditions: |x| ≤ 1 for the sine form, |x| < 1 for the tangent form"],
        notes:
          "Recognising 2x/(1+x²) or (1−x²)/(1+x²) inside an inverse function and substituting x = tan θ collapses most of these questions to one line. The same substitution is the shortcut in inverse-trig differentiation.",
      },
    ],
  },
  {
    chapter: "Complex Numbers",
    playbookSlug: "complex-numbers",
    formulas: [
      {
        id: "modulus-conjugate",
        name: "Modulus, conjugate and argument",
        formula:
          "z = x + iy     |z| = √(x² + y²)     z̄ = x − iy\nz·z̄ = |z|²     z⁻¹ = z̄/|z|²     arg z = tan⁻¹(y/x), adjusted for the quadrant",
        legend: ["x = real part, y = imaginary part", "z̄ = conjugate of z"],
        notes:
          "The quadrant adjustment on the argument is the trap — tan⁻¹(y/x) alone cannot distinguish the first quadrant from the third. Always place the point before quoting the argument.",
      },
      {
        id: "polar-euler",
        name: "Polar and Euler form, De Moivre's theorem",
        formula:
          "z = r(cos θ + i sin θ) = r·e^(iθ),  r = |z|, θ = arg z\n(cos θ + i sin θ)ⁿ = cos nθ + i sin nθ\n|z₁z₂| = |z₁||z₂|     arg(z₁z₂) = arg z₁ + arg z₂",
        legend: ["r = modulus", "θ = argument in radians", "n = integer"],
        notes:
          "Powers and roots are far cheaper in polar form than by binomial expansion — converting first is a time decision, not a stylistic one.",
      },
      {
        id: "cube-roots-unity",
        name: "Cube roots of unity",
        formula:
          "1, ω, ω²  with  ω = (−1 + i√3)/2\nω³ = 1     1 + ω + ω² = 0     ω̄ = ω²",
        legend: ["ω = a non-real cube root of unity"],
        notes:
          "Reduce any exponent modulo 3 first (ω¹⁰⁰ = ω¹), then use 1 + ω + ω² = 0 to kill whole blocks. Almost every cube-roots question is one of those two moves.",
      },
      {
        id: "locus-extremum",
        name: "Locus and greatest/least modulus",
        formula:
          "|z − z₀| = r  is a circle, centre z₀, radius r\n|z − z₁| = |z − z₂|  is the perpendicular bisector of the segment joining z₁ and z₂\nfor z on |z − z₀| = r:  greatest |z| = |z₀| + r,  least |z| = |z₀| − r",
        legend: ["z₀ = fixed centre", "r = radius"],
        notes:
          "The extremum needs NO calculus: the nearest and farthest points lie on the line through the origin and the centre. The identical move solves maximum perpendicular distance from a point on a circle in the Circle chapter. At 1.8 minutes a question, avoiding calculus is a time lever, not just elegance.",
      },
    ],
  },
  {
    chapter: "Determinants and Matrices",
    playbookSlug: "determinants-and-matrices",
    formulas: [
      {
        id: "adjoint-inverse",
        name: "Adjoint, inverse and the A·adj(A) identity",
        formula:
          "A·adj(A) = adj(A)·A = |A|·I\nA⁻¹ = adj(A)/|A|,  valid only when |A| ≠ 0\nadj(A) = transpose of the cofactor matrix",
        legend: [
          "A = square matrix of order n",
          "I = identity matrix of the same order",
          "|A| = determinant of A",
        ],
        notes:
          "The chapter's hardest subtopic (64% HARD) is built almost entirely on this one identity. It is the fastest route to adj(A) when A⁻¹ is already known: adj(A) = |A|·A⁻¹.",
      },
      {
        id: "determinant-properties",
        name: "Determinant and adjoint properties",
        formula:
          "|AB| = |A|·|B|     |kA| = kⁿ·|A|     |Aᵀ| = |A|     |A⁻¹| = 1/|A|\n|adj A| = |A|^(n−1)     adj(adj A) = |A|^(n−2)·A\n(AB)⁻¹ = B⁻¹A⁻¹     (Aᵀ)⁻¹ = (A⁻¹)ᵀ",
        legend: ["n = order of the square matrix", "k = a scalar"],
        notes:
          "|kA| = kⁿ|A|, NOT k|A| — the scalar multiplies every one of the n rows. The reversed order in (AB)⁻¹ = B⁻¹A⁻¹ is the other standard slip.",
      },
      {
        id: "area-determinant",
        name: "Area of a triangle and collinearity by determinant",
        formula:
          "area = ½·|det[[x₁, y₁, 1], [x₂, y₂, 1], [x₃, y₃, 1]]|\nthree points are collinear ⟺ that determinant = 0",
        legend: ["(x₁,y₁), (x₂,y₂), (x₃,y₃) = the three vertices"],
        notes:
          "Same vanishing 3x3 determinant as concurrency of three lines (Straight Line) and coplanarity of three vectors (Vectors). Keep the modulus — a determinant can come out negative, an area cannot.",
      },
      {
        id: "system-of-equations",
        name: "System of linear equations",
        formula:
          "AX = B,  X = A⁻¹B\nunique solution ⟺ |A| ≠ 0\nCramer: x = D₁/D, y = D₂/D, z = D₃/D  with D = |A| ≠ 0",
        legend: [
          "A = coefficient matrix, X = variable column, B = constants column",
          "Dᵢ = D with its i-th column replaced by B",
        ],
        notes:
          "|A| ≠ 0 is the whole condition for a unique solution — the usual question hands you a parameter and asks for the value that makes |A| = 0. When |A| = 0 the system is either inconsistent or has infinitely many solutions, never exactly one.",
      },
    ],
  },
  {
    chapter: "Circle",
    playbookSlug: "circle",
    formulas: [
      {
        id: "circle-forms",
        name: "Standard, general and diameter forms",
        formula:
          "standard: (x − h)² + (y − k)² = r²,  centre (h, k), radius r\ngeneral:  x² + y² + 2gx + 2fy + c = 0,  centre (−g, −f), radius √(g² + f² − c)\ndiameter: (x − x₁)(x − x₂) + (y − y₁)(y − y₂) = 0",
        legend: [
          "(h, k) = centre, r = radius",
          "(x₁,y₁), (x₂,y₂) = the ends of a diameter",
        ],
        notes:
          "In the general form the centre is MINUS the half-coefficients — the sign flip is the standard slip. If g² + f² − c is negative the equation represents no real circle, which is itself a question type. Concentric circles differ only in c.",
      },
      {
        id: "tangent-conditions",
        name: "Tangent condition and tangent length",
        formula:
          "y = mx + c touches x² + y² = a²  ⟺  c² = a²(1 + m²)\ntangent at (x₁, y₁) on x² + y² = a²:  x·x₁ + y·y₁ = a²\nlength of tangent from (x₁, y₁) = √(x₁² + y₁² + 2gx₁ + 2fy₁ + c)",
        legend: [
          "a = radius of the circle centred at the origin",
          "The tangent-length expression is S₁, the circle equation evaluated at the point",
        ],
        notes:
          "Every tangency question reduces to one idea: perpendicular distance from the centre to the line equals the radius. Derive rather than memorise if the circle is not centred at the origin. S₁ > 0 means the point is outside, = 0 on, < 0 inside.",
      },
      {
        id: "two-circles",
        name: "Relative position of two circles",
        formula:
          "touch externally:  d = r₁ + r₂\ntouch internally:  d = |r₁ − r₂|\nintersect at two points: |r₁ − r₂| < d < r₁ + r₂\northogonal: 2g₁g₂ + 2f₁f₂ = c₁ + c₂",
        legend: [
          "d = distance between the two centres",
          "r₁, r₂ = the two radii",
        ],
        notes:
          "The chapter's hardest subtopic (56% HARD) and it is entirely this comparison — compute d and both radii, then read off the case. Number of common tangents follows: 4 externally separate, 3 touching externally, 2 intersecting, 1 touching internally, 0 nested.",
      },
      {
        id: "circle-extremum",
        name: "Greatest and least distance from a point to a circle",
        formula:
          "for a point P outside:  maximum distance = d + r,  minimum distance = d − r",
        legend: ["d = distance from P to the centre", "r = radius"],
        notes:
          "No calculus. Identical move to the greatest and least modulus of z on a circle in Complex Numbers — distance to centre plus-or-minus radius. Recognising the pair is worth real time on a 90-minute paper.",
      },
    ],
  },
  {
    chapter: "Pair of Straight Lines",
    playbookSlug: "pair-of-straight-lines",
    formulas: [
      {
        id: "homogeneous-pair",
        name: "Pair of lines through the origin",
        formula:
          "ax² + 2hxy + by² = 0 represents two lines through the origin\nm₁ + m₂ = −2h/b     m₁·m₂ = a/b",
        legend: [
          "m₁, m₂ = slopes of the two lines",
          "a, h, b = coefficients of the combined equation",
        ],
        notes:
          "These are just the sum and product of roots of bm² + 2hm + a = 0. Almost every question about the two lines is answerable from the sum and product without ever separating them.",
      },
      {
        id: "pair-angle-conditions",
        name: "Angle between the pair, perpendicularity and coincidence",
        formula:
          "tan θ = |2√(h² − ab) / (a + b)|\nperpendicular ⟺ a + b = 0     coincident ⟺ h² = ab\nreal and distinct ⟺ h² > ab",
        legend: ["θ = acute angle between the two lines"],
        notes:
          "a + b = 0 is the perpendicularity test in this chapter's dialect — the same idea as m₁m₂ = −1 for lines and dot product = 0 for vectors, which the guide's traps page treats as one condition across 7 chapters. It follows directly: the tan formula has a + b in the denominator, so a + b = 0 sends θ to 90 degrees.",
      },
      {
        id: "general-pair-condition",
        name: "General second-degree equation as a pair of lines",
        formula:
          "ax² + 2hxy + by² + 2gx + 2fy + c = 0 is a pair of lines\n⟺ abc + 2fgh − af² − bg² − ch² = 0\n(equivalently: the 3x3 determinant of [[a,h,g],[h,b,f],[g,f,c]] = 0)",
        legend: ["a, b, c, f, g, h = the six coefficients of the general conic"],
        notes:
          "Another appearance of a vanishing determinant as a degeneracy test — a pair of lines is precisely a DEGENERATE conic. Point of intersection: solve ax + hy + g = 0 and hx + by + f = 0 simultaneously.",
      },
      {
        id: "parallel-pair-distance",
        name: "Distance between the lines of a parallel pair",
        formula: "d = 2·√[(g² − ac)/(a(a + b))]",
        legend: ["Applies when the pair is parallel, i.e. h² = ab"],
        notes:
          "Only meaningful for a parallel pair; check h² = ab before applying it. For a pair meeting at a point the distance is zero by definition.",
      },
    ],
  },
];

/** Quick stats for the formulas hero — derived, never hard-coded. */
export const FORMULA_STATS = {
  formulas: FORMULA_GROUPS.reduce((s, g) => s + g.formulas.length, 0),
  chapters: FORMULA_GROUPS.length,
};
