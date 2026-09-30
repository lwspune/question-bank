/**
 * Deep-dives for eight /guide/jee-mains-maths playbooks: Conic Sections, Three Dimensional Geometry,
 * Relations and Functions, Sequences and Series, Definite Integration, Permutations and
 * Combinations, Vector Algebra and Differential Equations. Prose carries no bank figures — the
 * pages print counts and rates from the generated matrix.
 */
import type { PlaybookDetail } from "./types";

export const PLAYBOOK_DETAILS_A: Record<string, PlaybookDetail> = {
  "conic-sections": {
    slug: "conic-sections",
    trigger: "A circle, parabola, ellipse or hyperbola given by its equation, a focus or an eccentricity, or a line asked to touch one.",
    story: [
      "The chapter runs circle first — its equation, its chords and tangents, then two circles together — and then gives the parabola, the ellipse and the hyperbola two pages each: the curve itself, then its tangents and normals. A last page joins two different curves.",
      "Most questions are two steps: read the curve's numbers from its equation (centre and radius; a, b and e; the a of y² = 4ax), then compute what is asked. Marks slip in completing the square and in dividing out the x² coefficient, not in the formulas.",
      "Time goes on tangents. One condition answers most of them: distance from the centre = radius for a circle, c = a/m for y² = 4ax, c² = a²m² + b² for an ellipse, c² = a²m² − b² for a hyperbola. Common-tangent questions apply two of these to one line. Focal chords and loci lean on the parametric point (at², 2at) and on straight lines.",
    ],
    subSkills: [
      { name: "The equation of a circle", description: "Make the x² and y² coefficients 1, read the centre (−g, −f) and radius √(g² + f² − c), and build a circle from points, tangents or intercepts." },
      { name: "Chords and tangents of a circle", description: "Compare the distance from the centre with r; T = S₁ gives the chord with a given midpoint, √S₁ the tangent length from a point." },
      { name: "Two circles and families", description: "Compare the distance between centres with r₁ + r₂ and |r₁ − r₂|; S₁ − S₂ = 0 is the common chord, S₁ + λS₂ = 0 the circles through the meeting points." },
      { name: "The parabola and its tangents", description: "Write points as (at², 2at); t₁t₂ = −1 for a focal chord; tangent y = mx + a/m; normal y = mx − 2am − am³." },
      { name: "The ellipse and its tangents", description: "b² = a²(1 − e²), latus rectum 2b²/a, SP + S′P = 2a; tangent condition c² = a²m² + b²; director circle x² + y² = a² + b²." },
      { name: "The hyperbola and its tangents", description: "b² = a²(e² − 1), |SP − S′P| = 2a, tangent condition c² = a²m² − b²; often paired with an ellipse through shared foci." },
      { name: "Common tangents and two curves", description: "One line, two tangency conditions with the same slope; the angle between curves from their slopes at the meeting point." },
    ],
    traps: [
      { name: "Reading g and f too early", description: "In 2x² + 2y² − 8x + 12y + 6 = 0 the centre is (2, −3), not (4, −6). Divide by the x² coefficient before reading anything." },
      { name: "Ellipse and hyperbola rules swapped", description: "b² = a²(1 − e²) with e < 1 is the ellipse; b² = a²(e² − 1) with e > 1 is the hyperbola. The tangency conditions differ by the sign of b² the same way, and the swapped value is usually an option." },
      { name: "−1 for the focus, −4 for the vertex", description: "On y² = 4ax a focal chord has t₁t₂ = −1, while a chord that subtends a right angle at the vertex has t₁t₂ = −4." },
      { name: "Features of the unshifted curve", description: "For (y − k)² = 4a(x − h) the focus is (h + a, k) and the directrix x = h − a. Shift a moved ellipse or hyperbola to the origin before using a tangency condition." },
    ],
    relatedSlugs: ["straight-lines", "quadratic-equations", "application-of-derivatives"],
  },

  "three-dimensional-geometry": {
    slug: "three-dimensional-geometry",
    trigger: "A line in symmetric or vector form, a plane's equation, or a point to be dropped onto, reflected in or measured from either.",
    story: [
      "Two objects run through the whole chapter: the general point of a line, (x₁ + at, y₁ + bt, z₁ + ct), and the normal of a plane. Almost every question writes one of them and imposes a condition with the other.",
      "The shortest distance between skew lines and the foot or image of a point in a line are the most common single tasks, and each is one formula once the directions are read correctly. Plane questions are mostly about finding the normal: a cross product of two directions, or the λ in P₁ + λP₂ = 0.",
      "Time goes in reading the equations. A line written with (2 − x)/3 has direction ratio −3 for x, and two parallel planes must share the same a, b, c before their constants are compared. The chapter is vector algebra in coordinates: the dot, cross and triple products carry it.",
    ],
    subSkills: [
      { name: "Direction ratios and lines", description: "Divide ratios by their length to get direction cosines; the cross product of two directions gives a line perpendicular to both." },
      { name: "Foot, image and distance from a line", description: "Make the join from the point to the line's general point perpendicular to the direction; the image is 2M − P." },
      { name: "Skew and parallel lines", description: "Shortest distance |(a₂ − a₁) · (d₁ × d₂)| / |d₁ × d₂|; for non-parallel lines, zero means they meet." },
      { name: "The equation of a plane", description: "Point and normal, three points, intercepts, or the family P₁ + λP₂ = 0 through a line of intersection." },
      { name: "Distance, foot and image in a plane", description: "|ax₁ + by₁ + cz₁ + d| / √(a² + b² + c²); the foot and image lie along the normal, found with one parameter." },
      { name: "Lines meeting planes", description: "Put the line's general point into the plane; the angle uses sin θ = |d · n| / (|d||n|)." },
    ],
    traps: [
      { name: "Denominators read as direction ratios", description: "In (2 − x)/3 = (3y − 2)/k the ratio for x is −3 and for y is k/3. Rewrite so x, y and z each carry coefficient +1 first." },
      { name: "Planes not matched before subtracting", description: "2x + y − 2z = 1 and 4x + 2y − 4z = 11 are parallel, but their distance is |11/2 − 1| / 3 = 3/2, not |11 − 1| / 3." },
      { name: "Cosine for the line–plane angle", description: "The dot product with the normal gives the angle with the normal. The angle with the plane is its complement, so the formula has sin θ." },
      { name: "Two equations are not enough", description: "Any two coordinates can be solved for the two parameters. The lines meet only if the third coordinate also agrees, and each line needs its own parameter." },
    ],
    relatedSlugs: ["vector-algebra", "straight-lines", "determinants"],
  },

  "relations-and-functions": {
    slug: "relations-and-functions",
    trigger: "A relation on a finite set, functions between finite sets to count, or a formula whose domain, range, inverse or functional rule is asked.",
    story: [
      "The chapter splits into two halves. The relations half — sets, the three properties and counting pairs — is careful counting and is often set as a numeric-answer question, with no options to check against. The functions half is domain, range, counting maps, composition and functional equations.",
      "Domain questions usually ask for a sum of interval endpoints, so one missed excluded point changes the answer. The conditions stack: a square root needs its argument ≥ 0, a log needs > 0, a log in a denominator also needs its argument ≠ 1, and sin⁻¹ and cos⁻¹ need −1 to 1.",
      "Counting functions is permutations and combinations in disguise: nᵐ maps from an m-set to an n-set, n!/(n − m)! one-one maps, onto maps by inclusion–exclusion. Functional equations reward substitution — x = y = 0, then y = −x or x → 1/x — rather than guessing a formula.",
    ],
    subSkills: [
      { name: "Sets and inclusion–exclusion", description: "n(A ∪ B) = n(A) + n(B) − n(A ∩ B); a set with n elements has 2ⁿ subsets." },
      { name: "Reflexive, symmetric, transitive", description: "Prove a property with a general argument; break one with a single counterexample." },
      { name: "Counting relations", description: "Count ordered pairs; on n elements there are 2^(n² − n) reflexive relations and 2^(n(n + 1)/2) symmetric ones." },
      { name: "Domain", description: "List the conditions from roots, logs, denominators and inverse trigonometric functions, then intersect them." },
      { name: "Range, one-one and onto", description: "Bound the function, use the discriminant in x, or use monotonicity; onto means the range equals the codomain." },
      { name: "Counting functions", description: "nᵐ maps, n!/(n − m)! one-one maps, onto maps by inclusion–exclusion." },
      { name: "Composition, inverses and functional equations", description: "f∘g applies g first; iterate until f repeats; solve a rule such as f(x + y) = f(x) + f(y) by substituting convenient values." },
    ],
    traps: [
      { name: "A log in a denominator", description: "1/log u needs u > 0 and u ≠ 1. The missing point is the usual gap between two options." },
      { name: "Reflexive and symmetric but not transitive", description: "|a − b| ≤ 1 relates 1 to 2 and 2 to 3 but not 1 to 3. Test a chain that crosses the limit before calling a relation an equivalence." },
      { name: "Onto depends on the codomain", description: "The same formula can be onto one codomain and not another. Compare the range with the stated codomain." },
      { name: "Greatest integer back to intervals", description: "[x] ≤ −3 means x < −2, not x ≤ −3: every x with integer part −3 lies in [−3, −2)." },
    ],
    relatedSlugs: ["permutations-and-combinations", "inverse-trigonometric-functions", "limits-and-continuity"],
  },

  "sequences-and-series": {
    slug: "sequences-and-series",
    trigger: "Terms said to be in AP, GP or HP, a sum to n terms or to infinity, or a series whose kth term must be found.",
    story: [
      "The chapter runs from progressions to series. AP and GP questions usually give two conditions and ask for a later term or a sum; the work is two equations in a and d, or in a and r, solved by dividing one by the other.",
      "The series pages cost more time. Σk, Σk² and Σk³ handle a polynomial kth term; telescoping handles a term that splits as f(k) − f(k + 1); multiplying by the ratio and subtracting handles an arithmetico-geometric series. In each, finding the kth term is the real step.",
      "Common terms of two progressions are often set as numeric-answer questions. GPs also hide inside functions such as f(x + y) = f(x)f(y) and inside recurrences. AM–GM gives the least and greatest values here and returns in quadratic equations, the binomial theorem and calculus.",
    ],
    subSkills: [
      { name: "Arithmetic progressions and common terms", description: "aₙ = a + (n − 1)d, Sₙ = n/2 (2a + (n − 1)d); the common terms of two APs with whole-number steps form an AP with step lcm(d₁, d₂), if they share any term at all." },
      { name: "Geometric progressions", description: "aₙ = arⁿ⁻¹; divide two conditions to find r; spot a GP in a function rule or a recurrence." },
      { name: "Means and AM–GM", description: "2b = a + c in AP, b² = ac in GP, b = 2ac/(a + c) in HP; A ≥ G ≥ H for positive numbers; AM–GM for extremes." },
      { name: "Infinite GPs", description: "Sum a/(1 − r) for |r| < 1; the squares form a GP with ratio r²." },
      { name: "Sums by standard formulas", description: "Σk = n(n + 1)/2, Σk² = n(n + 1)(2n + 1)/6, Σk³ = (n(n + 1)/2)²; find Tₖ from differences." },
      { name: "Telescoping sums", description: "Write Tₖ as f(k) − f(k + 1) so the middle cancels, using partial fractions, surds or factorials." },
      { name: "Arithmetico-geometric and exponential series", description: "Multiply by r and subtract; Σ 1/k! gives e, and Σ xᵏ/k from k = 1 gives −ln(1 − x)." },
    ],
    traps: [
      { name: "Steps, not terms", description: "From the pth term to the qth there are q − p steps. With n means inserted between two numbers there are n + 1 steps, not n." },
      { name: "The rejected ratio", description: "A quadratic in r often has roots t and 1/t. An increasing GP of positive terms keeps the root above 1, and a sum to infinity rejects any root with |r| ≥ 1." },
      { name: "The ½ in a telescoping split", description: "1/(k(k + 2)) = ½(1/k − 1/(k + 2)). Dropping the ½ doubles the answer, and a gap of two leaves two terms at each end, not one." },
      { name: "AM–GM without the equality case", description: "The bound is the answer only if the equal-pieces point is allowed: positive, and inside any stated range." },
    ],
    relatedSlugs: ["binomial-theorem", "quadratic-equations", "definite-integration"],
  },

  "definite-integration": {
    slug: "definite-integration",
    trigger: "An integral with limits, especially one that looks impossible directly, carries [x], {x} or |x|, has a variable limit, or is a limit of a long sum.",
    story: [
      "Direct evaluation — one good substitution, parts or partial fractions — and piecewise integrands with [x], {x} or |x| carry much of the chapter. Piecewise questions are routine once the interval is split where the formula changes.",
      "The property pages save the most time. When a direct attack looks hopeless, write the integral again with x → a + b − x and add the two forms. Over −a to a, drop the odd part; a denominator 1 + bˣ pairs with its reflection and halves the integral of an even numerator. Spotting the pattern is the whole skill.",
      "Leibniz's rule turns an integral equation into a differential equation, which links the chapter to differential equations. Limits of sums become an integral through (1/n) Σ f(k/n). Reduction formulas and Beta integrals ask for a relation between members of a family, not a single value.",
    ],
    subSkills: [
      { name: "Evaluating directly", description: "Substitute and change the limits; integrate by parts and work out the boundary term; split into partial fractions." },
      { name: "The a + b − x property", description: "∫ from a to b of f(x) dx equals ∫ from a to b of f(a + b − x) dx; add the two forms. x → 1/x does the same on 1/a to a." },
      { name: "Odd, even and periodic integrands", description: "On −a to a odd parts vanish and even parts double; over n whole periods the integral is n times one period." },
      { name: "Greatest integer, modulus and max–min", description: "Split at the integers for [x], at the roots for |f(x)|, and where the two curves cross for max or min." },
      { name: "Leibniz's rule and integral equations", description: "d/dx of ∫ from g(x) to h(x) of f(t) dt is f(h)h′ − f(g)g′; an integral with constant limits is an unknown constant." },
      { name: "Reduction formulas and Beta integrals", description: "Link Iₙ to Iₙ₋₁ by parts; ∫ from 0 to 1 of x^(m − 1)(1 − x)^(n − 1) dx is B(m, n)." },
      { name: "Limits of sums", description: "lim (1/n) Σ f(k/n) = ∫ from 0 to 1 of f(x) dx, with the upper limit set by the range of k." },
    ],
    traps: [
      { name: "Old limits after a substitution", description: "With t = tan x, x = π/2 becomes t → ∞; with t = tan(x/2) it becomes t = 1. Keeping the old limits is the most common slip." },
      { name: "The greatest integer of a negative", description: "[−0.3] = −1, not 0. On an interval below zero, [x] is the next integer to the left." },
      { name: "The wrong period", description: "|sin x| repeats every π, not 2π. Using the longer period halves the number of copies and halves the answer." },
      { name: "The missing chain factor", description: "An upper limit x² brings a factor 2x in Leibniz's rule, and the lower limit enters with a minus sign." },
    ],
    relatedSlugs: ["indefinite-integration", "application-of-integrals", "differential-equations"],
  },

  "permutations-and-combinations": {
    slug: "permutations-and-combinations",
    trigger: "A count of arrangements, selections, numbers built from digits, distributions or figures formed by points, usually with a restriction.",
    story: [
      "Much of the chapter is set as numeric-answer questions, where there are no options to catch a slip. Forming numbers from digits, selections and counting divisors carry most of it; each is a case split followed by a product of simple counts.",
      "The first decision is the whole question: does order matter, are the objects identical, are the boxes distinct. Get it wrong and every later step can be right while the answer is wrong. For 'at least' or 'not' conditions, count the complement.",
      "The chapter feeds the binomial theorem, probability, and relations and functions: counting functions, matrices and subsets uses the same position-by-position product. The rank of a word in dictionary order is one fixed procedure and is quick to score.",
    ],
    subSkills: [
      { name: "Arrangements with restrictions", description: "Blocks for 'together', gaps for 'apart', (n − 1)! around a table, n!/(p! q!) for repeated items." },
      { name: "Dictionary rank", description: "Go letter by letter and count the words that start with a smaller letter; recompute the divisor when a repeated letter is used up." },
      { name: "Forming numbers from digits", description: "Fill the restricted places first; 0 cannot lead; split by the last digit for divisibility conditions." },
      { name: "Selections and committees", description: "nCr for choices; split 'at least' conditions into exact cases, or use the complement." },
      { name: "Distributions and counting objects", description: "n identical objects into r distinct boxes: (n + r − 1)C(r − 1); distinct objects by onto maps; functions, matrices and subsets filled position by position." },
      { name: "Points, lines and polygons", description: "Choose vertices and subtract collinear triples; an n-gon has nC2 − n diagonals." },
      { name: "Divisors and factorials", description: "The power of a prime p in n! is [n/p] + [n/p²] + …; divisors from prime powers; multiples in a range by inclusion–exclusion." },
    ],
    traps: [
      { name: "'Not all together' is not 'no two together'", description: "'The vowels never all together' is the total minus the all-together case and allows two vowels side by side. 'No two vowels together' uses the gap method." },
      { name: "Zero in the leading place", description: "When 0 is available, the first digit has one fewer choice. If the last digit must be even, split into 'ends in 0' and 'does not'." },
      { name: "Choosing 'at least one' first", description: "Picking one woman and then any others counts the same committee several times. Split into exact cases instead." },
      { name: "Product for the overlap", description: "Numbers divisible by both 4 and 6 are the multiples of 12, the lcm, not of 24." },
    ],
    relatedSlugs: ["binomial-theorem", "probability", "relations-and-functions"],
  },

  "vector-algebra": {
    slug: "vector-algebra",
    trigger: "Vectors given by components or only by lengths and angles, with a dot, cross or triple product, a projection, or an unknown vector to find.",
    story: [
      "Vector equations — r × a = b × a, or a × c = b with a · c given — are the most frequent single type. They look different but reduce to two facts: a cross product of zero means two vectors are parallel, and crossing again with a known vector brings out the unknown.",
      "Magnitude questions give no components, only lengths and angles, so the only tool is |v|² = v · v, expanded. Cross-product questions are mostly areas; triple-product questions are coplanarity tests or volumes, one determinant each.",
      "The chapter is the toolkit for three-dimensional geometry: the cross product gives a normal, and the scalar triple product gives the shortest distance between skew lines. Most questions are short, and marks are lost to sign and order slips rather than to hard ideas.",
    ],
    subSkills: [
      { name: "Dot product: angles and projections", description: "cos θ = a · b / (|a||b|); scalar projection a · b / |b|, vector projection (a · b / |b|²) b." },
      { name: "Magnitudes", description: "|a + b|² = |a|² + |b|² + 2a · b; for unit vectors |a × b| = sin θ." },
      { name: "Cross product: areas and normals", description: "Triangle ½|a × b|; parallelogram |a × b| from sides or ½|d₁ × d₂| from diagonals; |a × b|² + (a · b)² = |a|²|b|²." },
      { name: "Vector equations", description: "(r − b) × a = 0 gives r = b + λa; for a × c = b, cross both sides with a and use the given a · c." },
      { name: "Triple products", description: "[a b c] is a determinant and a volume, zero for coplanar vectors; a × (b × c) = (a · c)b − (a · b)c." },
      { name: "Vectors in geometry", description: "Section formula, centroid and collinearity; â + b̂ lies along the angle bisector." },
    ],
    traps: [
      { name: "Order in the cross product", description: "c × b = −(b × c), so a × c = c × b gives (a + b) × c = 0, not (a − b) × c = 0." },
      { name: "Not associative", description: "a × (b × c) and (a × b) × c are different vectors. Check which pair is inside the bracket before expanding." },
      { name: "Projection divided by the wrong power", description: "The scalar projection divides by |b|; the projection vector divides by |b|² and then multiplies by b." },
      { name: "Edges, not positions", description: "Four points are coplanar when the three edges from one of them are coplanar. Testing the four position vectors tests something else." },
    ],
    relatedSlugs: ["three-dimensional-geometry", "determinants", "straight-lines"],
  },

  "differential-equations": {
    slug: "differential-equations",
    trigger: "A relation between y, x and dy/dx, a curve fixed by its tangent or normal, a growth or cooling rate, or a function defined by an integral of itself.",
    story: [
      "The chapter comes down to three solving methods — separate the variables, put y = vx, or use the integrating factor — plus the pages that disguise one of them. Separable and linear equations are routine: the work is the integral and the constant from the given point.",
      "Time goes on recognising the form. An equation linear in x rather than y, a Bernoulli equation, a substitution for tan y or e^(sin y), or an integrating factor that is just a denominator: each becomes routine after one move. Questions that never print an equation — an integral equation or a limit — produce one when differentiated.",
      "The answer is often a second step: a value of the solution, its maximum, or an integral of it, which draws on application of derivatives and definite integration. Forming an equation and reading its order and degree is short, but the degree is read only after radicals are cleared.",
    ],
    subSkills: [
      { name: "Forming an equation", description: "Differentiate once per arbitrary constant and eliminate them; read the degree only after clearing radicals." },
      { name: "Separating the variables", description: "Put every y on one side, integrate, fix C; when the slope depends on ax + by + c, substitute t = ax + by + c." },
      { name: "Homogeneous equations", description: "y = vx turns dy/dx = f(y/x) into a separable equation; shift the origin first when the two lines meet." },
      { name: "Linear equations", description: "For dy/dx + Py = Q, multiply by e^(∫P dx) so y · IF = ∫ Q · IF dx; a long P is often the derivative of a log." },
      { name: "Reducible to linear", description: "Take x as the unknown function of y, divide a Bernoulli equation by a power of y, or substitute for tan y or e^(sin y)." },
      { name: "Using the solution", description: "Fix the constant by a limit where no point is given, then maximise, differentiate or integrate the solution." },
      { name: "Hidden equations and rates", description: "Differentiate an integral equation and get the starting value from the lower limit; translate tangent, normal, growth and cooling conditions." },
    ],
    traps: [
      { name: "Standard form first", description: "In xy′ + 2y = x², P is 2/x, not 2. The coefficient of y′ must be 1 before the integrating factor is found." },
      { name: "The tan x integrating factor", description: "∫ tan x dx = ln sec x, so P = tan x gives the factor sec x and P = −tan x gives cos x. Swapping them is the common slip." },
      { name: "The constant added too late", description: "From ln y = x² + C the solution is y = Ae^(x²), not e^(x²) + C." },
      { name: "Cooling the whole temperature", description: "In Newton's law of cooling the excess T − A decays like e^(−kt), not T itself." },
    ],
    relatedSlugs: ["definite-integration", "indefinite-integration", "application-of-derivatives"],
  },
};
