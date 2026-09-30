/**
 * Deep-dives for eight /guide/jee-mains-maths playbooks: Probability, Binomial Theorem, Application
 * of Integrals, Complex Numbers, Quadratic Equations, Limits and Continuity, Straight Lines and
 * Matrices. Prose carries no bank figures — the pages print counts and rates from generated data.
 */
import type { PlaybookDetail } from "./types";

export const PLAYBOOK_DETAILS_B: Record<string, PlaybookDetail> = {
  probability: {
    slug: "probability",
    trigger:
      "The chance of an event: balls from bags, dice, a number picked at random, a 'given that', or a distribution with a mean and a variance.",
    story: [
      "Much of Probability on JEE Mains is counting in disguise. Counting favourable outcomes and the dice, digits and divisibility page are two counts and a division, and the counts come from Permutations and Combinations. Get the sample space right first; the division is the easy part.",
      "The rest is formula work. Among the formula pages, Bayes' theorem comes up most often: total probability over the bags, then one branch divided by the total. The binomial distribution and random variables ask for a probability, a mean or a variance. Trials repeated until a success sum a geometric series, and quadratics with random coefficients turn a probability into a discriminant condition.",
      "Time goes on setting up, not on arithmetic. Most wrong answers count ordered outcomes in one place and unordered ones in another, or use a denominator that has lost a ball. When a numeric-answer question gives the probability as m/n in lowest terms and asks for m + n, reduce the fraction fully before adding.",
    ],
    subSkills: [
      { name: "Counting favourable outcomes", description: "Selections by combinations, ordered results by permutations — both counts over the same sample space." },
      { name: "Dice, digits and divisibility", description: "List ordered outcomes on dice, including odd or weighted faces; count numbers with a digit or divisibility property." },
      { name: "Random coefficients", description: "Turn 'real roots' into b² ≥ 4ac, or another inequality into a condition on the outcomes, then count." },
      { name: "Addition, conditional and independent events", description: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B), P(A | B) = P(A ∩ B)/P(B), independence as a product, repeated trials as a geometric series." },
      { name: "Total probability and Bayes' theorem", description: "Sum over every bag or machine with its prior, then divide the branch asked for by that total." },
      { name: "Binomial distribution", description: "P(X = r) = C(n, r) pʳ qⁿ⁻ʳ; mean np and variance npq, so q = variance ÷ mean." },
      { name: "Random variables", description: "Make the probabilities add to 1, then E(X) = Σ x P(x) and Var(X) = E(X²) − (E(X))²." },
    ],
    traps: [
      { name: "Ordered and unordered mixed", description: "(1, 3) and (3, 1) are two outcomes on two dice. Count the favourable cases and the sample space the same way, or the answer doubles or halves." },
      { name: "The bag after a transfer", description: "The receiving bag holds one more ball; its old total in the denominator is wrong. Unequal priors must stay in every product." },
      { name: "Squaring the wrong thing", description: "E(X²) = Σ x² P(x). Squaring the probabilities, or using (E(X))² in place of E(X²), gives a wrong variance." },
      { name: "The variance is the smaller", description: "Since q < 1, npq < np. When the mean and variance come from one quadratic, the mean is the larger root." },
    ],
    relatedSlugs: ["permutations-and-combinations", "quadratic-equations", "statistics"],
  },

  "binomial-theorem": {
    slug: "binomial-theorem",
    trigger:
      "A power of a bracket: one coefficient, the constant term, a sum of C(n, r) terms, or the remainder of a large power.",
    story: [
      "The general term T(r + 1) = C(n, r) aⁿ⁻ʳ bʳ does most of the chapter's work. Set the power of x to what is asked, solve for r, and read the coefficient. Consecutive coefficients, products of brackets and rational terms are the same step with a different condition on r.",
      "The second half is sums of binomial coefficients. Substitute x = 1, −1 or a complex root into an expansion; differentiate it for r·C(n, r); integrate it for C(n, r)/(r + 1); multiply two expansions for a product of coefficients. Once you name which of these a sum is, it closes in two lines. The time goes on naming it.",
      "Most answers are whole numbers, so the chapter suits numeric-answer questions. Remainders of large powers write the base as a multiple of the divisor plus or minus 1 and expand. The coefficient sums share their tools with Sequences and Series and with Definite Integration.",
    ],
    subSkills: [
      { name: "The general term", description: "T(r + 1) = C(n, r) aⁿ⁻ʳ bʳ; set the power of x and solve for r. Simplify the bracket first when it factors." },
      { name: "Consecutive coefficients and special terms", description: "C(n, r)/C(n, r − 1) = (n − r + 1)/r turns three consecutive coefficients into two linear equations; middle and end terms by symmetry." },
      { name: "Products and three-term brackets", description: "A coefficient of a product is a short sum of products; a three-term bracket is factored or expanded with the multinomial term." },
      { name: "Rational terms and integral parts", description: "A term is rational when both exponents are whole; (a + √b)ⁿ + (a − √b)ⁿ is an integer." },
      { name: "Coefficient sums", description: "x = 1 gives the sum of all coefficients, x = −1 the alternating sum; differentiate for Σ r·C(n, r) = n·2ⁿ⁻¹." },
      { name: "Fractions and products of coefficients", description: "Integrate for C(n, r)/(r + 1); Σ C(m, r) C(n, k − r) = C(m + n, k)." },
      { name: "Hockey stick and geometric sums", description: "C(r, r) + C(r + 1, r) + … + C(n, r) = C(n + 1, r + 1); a sum of powers of (1 + x) is a geometric series." },
      { name: "Remainders and divisibility", description: "Write the base as kd ± 1, expand, and only the last term survives division by d." },
    ],
    traps: [
      { name: "The index is r + 1", description: "The term containing bʳ is the (r + 1)-th. 'The 7th term' means r = 6." },
      { name: "The sign of the second term", description: "In (x − 1/x)ⁿ each term carries (−1)ʳ. Dropping it flips the sign of every odd-r coefficient." },
      { name: "Only one exponent checked", description: "For a rational term in (a^(1/p) + b^(1/q))ⁿ, both (n − r)/p and r/q must be whole numbers." },
      { name: "A left-over factor", description: "2¹⁰⁰ = 2 · 8³³, so its remainder on division by 7 is 2, not 1. A factor outside the bracket stays in the answer." },
    ],
    relatedSlugs: ["sequences-and-series", "permutations-and-combinations", "definite-integration"],
  },

  "application-of-integrals": {
    slug: "application-of-integrals",
    trigger:
      "The area of a region bounded by curves and lines, usually one that must be sketched before any integral is written.",
    story: [
      "Every question is the same two steps: sketch the region, then integrate top minus bottom in x or right minus left in y. The integral is rarely hard. The time goes on the sketch — where the curves meet, which one is on top, and where the top changes.",
      "Parabolas against lines are the core, with vertical strips for curves like y = x² and horizontal strips for sideways parabolas like y² = 4ax. Then come circles and ellipses cut by a parabola or a line, modulus curves that fold into V shapes, and boundaries set by the min or max of two curves. Trigonometric, exponential and reciprocal curves put a trig value or a log into the answer.",
      "The last page turns the question round: the area is given and a constant in a curve is asked. It is the same integral followed by an equation. The chapter leans on Definite Integration for the evaluation and on Conic Sections for the curves; πr², πab and the area of a circular segment save an integral when they fit.",
    ],
    subSkills: [
      { name: "Vertical strips", description: "Area = ∫ (top − bottom) dx between the meeting points; split the interval where the top or bottom changes." },
      { name: "Horizontal strips", description: "For a sideways parabola, integrate right minus left in y, with limits taken from the y-values of the meeting points." },
      { name: "Circles, ellipses and other conics", description: "Use πr², πab or a segment area for the standard pieces; integrate only what no formula covers." },
      { name: "Modulus curves", description: "Solve each arm of a V separately; |f(x)| reflects the part of f below the x-axis upward." },
      { name: "Max, min and piecewise boundaries", description: "The boundary follows the lower or higher of two curves and switches where they cross; [x²] jumps at x = 1, √2, √3." },
      { name: "Trigonometric, exponential and reciprocal curves", description: "sin x and cos x cross where tan x = 1; ∫ aˣ dx = aˣ/ln a; y = k/x gives a log." },
      { name: "Unknown parameters", description: "Write the area in terms of the constant, set it equal to the value given, and keep the root the conditions allow." },
    ],
    traps: [
      { name: "Signed integral for area", description: "∫ sin x dx from 0 to 2π is 0, but the area is 4. Split wherever the curve crosses the axis and add the pieces as positive numbers." },
      { name: "Limits in the wrong variable", description: "For horizontal strips the limits are y-values. Using the x-values of the meeting points gives a different region." },
      { name: "The lower branch", description: "y² = kx also has y = −√(kx). If the region is not limited to y ≥ 0, include the part below the axis or double by symmetry." },
      { name: "Minor segment for major", description: "The segment formula gives the smaller piece. When the larger portion is asked, subtract from πr²." },
    ],
    relatedSlugs: ["definite-integration", "conic-sections", "application-of-derivatives"],
  },

  "complex-numbers": {
    slug: "complex-numbers",
    trigger:
      "i, z and its conjugate, a modulus or an argument, a locus drawn by a condition on z, or a power of ω.",
    story: [
      "Complex Numbers splits into algebra and geometry. The algebra pages — real and imaginary parts, equations in z and z̄, polar form, roots of unity, quadratics with complex roots — reward the right form: z = x + iy to compare parts, z = r(cos θ + i sin θ) for powers and rotations, and ω to reduce a power by its remainder.",
      "The geometry pages read each condition as a shape. |z − a| = |z − b| is a line; |z − a| = k|z − b| with k ≠ 1 is a circle; a fixed argument of (z − a)/(z − b) is an arc. The greatest or least distance from a point to a circle is the centre distance plus or minus the radius. Draw the shape before any algebra.",
      "Most questions end quickly once the form is chosen. Time is lost when a geometric condition is expanded into x and y and the result is a messy equation that a sketch would have read off. The chapter meets Quadratic Equations through complex roots, and Straight Lines and Conic Sections through its loci.",
    ],
    subSkills: [
      { name: "Algebra of complex numbers", description: "Real and imaginary parts, equations in z and z̄ solved by comparing parts, and |z₁z₂| = |z₁||z₂|." },
      { name: "Polar form and De Moivre", description: "Principal argument in (−π, π]; (cos θ + i sin θ)ⁿ = cos nθ + i sin nθ; multiplying by cos α + i sin α turns about the origin by α." },
      { name: "Roots of unity", description: "1 + ω + ω² = 0 and ω³ = 1, so any power of ω reduces by its remainder on division by 3." },
      { name: "Quadratics with complex roots", description: "Sum and product as usual; high powers of the roots by a recurrence or by polar form." },
      { name: "Lines and circles", description: "|z − a| = |z − b| is the perpendicular bisector of a and b; a ratio of distances other than 1 is a circle." },
      { name: "Arcs and conic loci", description: "A fixed argument of (z − a)/(z − b) is an arc through a and b; |z − a| + |z − b| = 2k is an ellipse when 2k > |a − b|." },
      { name: "Regions and extreme distances", description: "On a circle with centre c₀ and radius r, |z − c| runs from ||c − c₀| − r| to |c − c₀| + r; check the extreme point lies in the region." },
    ],
    traps: [
      { name: "The inverse tangent is not the argument", description: "tan⁻¹(y/x) lies in (−π/2, π/2). For a point with x < 0, add or subtract π to reach the right quadrant." },
      { name: "Conjugate roots without real coefficients", description: "Roots come in conjugate pairs only when every coefficient is real; z² − (3 + i)z + (2 + 2i) = 0 has roots 2 and 1 + i." },
      { name: "One arc, not the whole circle", description: "arg((z − a)/(z − b)) = θ is one arc; the other arc has argument θ − π. A point on the wrong arc is a distractor." },
      { name: "A bound that is never reached", description: "The triangle inequality gives a bound; it is the answer only if some z allowed by the question attains it." },
    ],
    relatedSlugs: ["quadratic-equations", "conic-sections", "straight-lines"],
  },

  "quadratic-equations": {
    slug: "quadratic-equations",
    trigger:
      "Roots α and β of a quadratic, a condition on those roots, or an equation that becomes a quadratic after a substitution.",
    story: [
      "The chapter is built on Vieta: α + β = −b/a and αβ = c/a. Most conditions on the roots — a fixed difference, one root twice the other, α² + β², even α²⁵ + β²⁵ — become equations in the sum and product. High powers use the recurrence the equation itself gives: aPₙ + bPₙ₋₁ + cPₙ₋₂ = 0, where Pₙ = αⁿ + βⁿ.",
      "The other half is equations that are quadratic in disguise. Exponential equations take t = aˣ, logarithmic ones take logs or change the base, a repeated block such as x + 1/x becomes the unknown, and moduli split the number line at their critical points. Each substitution limits which roots count: aˣ is positive, a log needs a valid base, |x| is never negative. Most wrong answers keep a root that should have been dropped.",
      "The discriminant page decides real, equal or rational roots, and places the roots against a number using the discriminant, the sign of f(k) and the vertex. Questions that ask for the number of real roots, or the sum of all of them, reward a careful count more than hard algebra. The chapter feeds Complex Numbers, and Probability when coefficients are rolled on dice.",
    ],
    subSkills: [
      { name: "Roots and coefficients", description: "α + β = −b/a, αβ = c/a; for a cubic the signs of sum, pair sum and product go minus, plus, minus." },
      { name: "Symmetric functions and power sums", description: "α² + β² = (α + β)² − 2αβ; high powers by aPₙ + bPₙ₋₁ + cPₙ₋₂ = 0." },
      { name: "Common roots and new equations", description: "Eliminate the x² term to find a shared root; an equation with given roots is x² − (sum)x + (product) = 0." },
      { name: "Discriminant and location of roots", description: "With real coefficients, D > 0, D = 0, D < 0 give distinct real, equal and non-real roots; place roots with D, a·f(k) and the vertex −b/2a." },
      { name: "Modulus and greatest integer", description: "Split at the critical points, or take |x| as the unknown when the equation is even in x; {x} lies in [0, 1)." },
      { name: "Equations reducible to quadratics", description: "t = aˣ, a log, or a repeated block as the unknown; check each t against the values its block can take." },
    ],
    traps: [
      { name: "The sum is −b/a, not −b", description: "Read the sum and product only after dividing by the leading coefficient." },
      { name: "A root the substitution cannot reach", description: "t = aˣ must be positive and t = |x| cannot be negative; such roots give no x. And t = 0 for |x| gives one root, not two." },
      { name: "The leading coefficient can vanish", description: "When a holds a parameter, the value that makes it 0 leaves a linear equation, where the discriminant test does not apply." },
      { name: "The vertex condition left out", description: "D ≥ 0 and a·f(k) > 0 hold both when both roots exceed k and when both are below it. The vertex −b/2a decides which." },
    ],
    relatedSlugs: ["complex-numbers", "sequences-and-series", "probability"],
  },

  "limits-and-continuity": {
    slug: "limits-and-continuity",
    trigger:
      "A limit that starts as 0/0, ∞/∞, ∞ − ∞ or 1^∞, or a piecewise function whose constants are fixed by continuity.",
    story: [
      "Most limits reduce to a short list: sin x/x → 1, (eˣ − 1)/x → 1, ln(1 + x)/x → 1, and the 1^∞ rule — if f → 1 and g → ∞, f^g tends to e raised to lim g(f − 1). Series expansions of sin x, cos x, eˣ and ln(1 + x) settle the rest, and they are the quickest route when a question asks for the constants that make a limit finite.",
      "Limits at infinity compare the highest powers or rationalise a surd. A limit of a sum either closes the sum first or reads it as a Riemann sum, which is Definite Integration in another form. Limits via derivatives spot a difference quotient or use L'Hospital's rule, and an integral with a variable limit is differentiated by the Leibniz rule.",
      "Continuity at a point is usually one equation: left limit = right limit = f(a), solved for the constants. Counting points of discontinuity or non-differentiability takes longer — list every jump of a greatest-integer term and every corner of a modulus, then test each point, because a zero factor can hide a jump. These counts suit numeric-answer questions.",
    ],
    subSkills: [
      { name: "Standard limits and algebraic forms", description: "sin x/x, (eˣ − 1)/x, ln(1 + x)/x; factorise or rationalise to remove the factor that gives 0." },
      { name: "Series expansions", description: "sin x = x − x³/6 + …, cos x = 1 − x²/2 + …, eˣ = 1 + x + x²/2 + …; set the lower coefficients to zero for a finite limit." },
      { name: "1^∞ limits", description: "If f → 1 and g → ∞, then f^g → e raised to lim g(f − 1)." },
      { name: "Limits at infinity and of sums", description: "Divide by the highest power; (1/n) Σ f(k/n) for k = 1 to n tends to ∫ f(x) dx from 0 to 1." },
      { name: "Limits via derivatives and integrals", description: "A difference quotient is a derivative; L'Hospital needs 0/0 or ∞/∞; the derivative of ∫ g(t) dt from a to u(x) is g(u(x)) · u′(x)." },
      { name: "Greatest integer and one-sided limits", description: "Ask which side of the integer the inside approaches; |x| and √(x²) need both sides checked." },
      { name: "Continuity at a point", description: "Left limit = right limit = f(a); solve for the unknown constants." },
      { name: "Counting discontinuities", description: "List jumps of [ ] and corners of | |, then test each; for f(g(x)) also solve g(x) = each bad point of f." },
    ],
    traps: [
      { name: "The argument does not match", description: "sin 3x/x tends to 3, not 1. Make the angle and the denominator the same before using the standard limit." },
      { name: "Expanding too little", description: "Stop a series too early and everything cancels to 0/0 again. Expand each function up to the power of x in the denominator." },
      { name: "Infinity minus infinity is not 0", description: "√(x² + x) − x tends to 1/2. Rationalise before comparing." },
      { name: "A zero factor hides a jump", description: "x[x] is continuous at 0 because the jump of [x] is multiplied by 0. Test each candidate point instead of counting integer crossings." },
    ],
    relatedSlugs: ["differentiation", "definite-integration", "relations-and-functions"],
  },

  "straight-lines": {
    slug: "straight-lines",
    trigger:
      "Lines in the xy-plane: slopes, the distance from a point to a line, an image in a line, a centre of a triangle, or a locus.",
    story: [
      "Straight Lines is coordinate geometry with a small toolkit: the slope, the angle formula tan θ = |(m₁ − m₂)/(1 + m₁m₂)|, the distance |ax₁ + by₁ + c|/√(a² + b²), and the image formula. Almost every question is two or three of these in a row.",
      "The centres of a triangle are the most common setting — above all the orthocentre, found from two altitudes or given and worked back to a vertex. Forms of a line and the angle between lines, areas from coordinates, images and reflected rays, and distances between parallel lines follow. Bisectors, pairs of lines and locus are the smaller pages.",
      "Few questions are hard. The cost is that many have two answers — two slopes from one modulus, two signs from one area, three positions for a parallelogram's fourth vertex — and the options test whether you kept both. Lines also carry Conic Sections and Complex Numbers, where a tangent or a locus ends as a line.",
    ],
    subSkills: [
      { name: "Slope, angle and forms of a line", description: "tan θ = |(m₁ − m₂)/(1 + m₁m₂)|; intercept form x/a + y/b = 1; normal form x cos α + y sin α = p." },
      { name: "Distance and parallel lines", description: "|ax₁ + by₁ + c|/√(a² + b²) from a point; |c₁ − c₂|/√(a² + b²) between parallel lines written with the same a and b." },
      { name: "Image of a point and reflected rays", description: "(x − x₁)/a = (y − y₁)/b = −2(ax₁ + by₁ + c)/(a² + b²); a reflected ray passes through the image of the source." },
      { name: "Angle bisectors and pairs of lines", description: "Bisectors: (a₁x + b₁y + c₁)/√(a₁² + b₁²) = ±(a₂x + b₂y + c₂)/√(a₂² + b₂²); for ax² + 2hxy + by² = 0, tan θ = |2√(h² − ab)/(a + b)|." },
      { name: "Centres of a triangle", description: "Orthocentre from two altitudes, circumcentre from two perpendicular bisectors, centroid as the mean of the vertices, incentre weighted by the opposite sides." },
      { name: "Area of triangles and quadrilaterals", description: "Area = ½|x₁(y₂ − y₃) + x₂(y₃ − y₁) + x₃(y₁ − y₂)|; in a parallelogram ABCD, A + C = B + D." },
      { name: "Family of lines and locus", description: "L₁ + λL₂ = 0 passes through the meeting point of L₁ and L₂; eliminate the parameter to get a locus." },
    ],
    traps: [
      { name: "Normal form without a unit normal", description: "3x + 4y = 10 must be divided by 5 first, giving p = 2. Reading p = 10 from the raw equation is wrong." },
      { name: "Foot for image", description: "With factor 1 the formula gives the foot of the perpendicular; with 2 it gives the image. The midpoint of a point and its image lies on the line." },
      { name: "One sign from a modulus", description: "An area of 4 means the bracket is 8 or −8, and a given angle gives two slopes. Dropping one loses half the answers." },
      { name: "Parallel lines not matched", description: "x + 2y + 1 = 0 and 2x + 4y + 7 = 0: double the first before using |c₁ − c₂|/√(a² + b²)." },
    ],
    relatedSlugs: ["conic-sections", "complex-numbers", "three-dimensional-geometry"],
  },

  matrices: {
    slug: "matrices",
    trigger:
      "A square matrix with a high power, an inverse or adjoint, a transpose condition, or a count of matrices with a given property.",
    story: [
      "Powers of a matrix are the centre of the chapter. A matrix may repeat with a period, be I + N with N nilpotent, satisfy A² = A or A² = I, or satisfy its own characteristic equation by Cayley–Hamilton. In each case a high power reduces to a short expression, and the work is spotting the pattern before multiplying anything.",
      "Adjoint and inverse questions are identity questions: |kA| = kⁿ|A|, A · adj A = |A| I, |adj A| = |A|ⁿ⁻¹ and adj(adj A) = |A|ⁿ⁻² A. They finish in a few lines of exponent arithmetic for anyone who knows them, and they overlap with Determinants. Symmetric, skew-symmetric and orthogonal matrices test the definitions and the split of any square matrix into a symmetric part plus a skew part.",
      "The algebra page — multiplication, transpose, trace, counting matrices with given entries — is the base for all of it. Few questions need long entry-by-entry work. The costly errors carry rules from numbers into matrices: AB ≠ BA in general, AB = O does not force A = O or B = O, and (A + B)² is not A² + 2AB + B² unless AB = BA.",
    ],
    subSkills: [
      { name: "Matrix algebra", description: "Multiplication row by column, trace as the diagonal sum, (AB)ᵀ = BᵀAᵀ, and counting matrices whose entries meet a condition." },
      { name: "Powers and Cayley–Hamilton", description: "Find the period, write A = I + N, use A² = A or A² = I, or reduce with A² − (tr A)A + (det A)I = O for a 2 × 2 matrix." },
      { name: "Symmetric, skew-symmetric and orthogonal", description: "A = ½(A + Aᵀ) + ½(A − Aᵀ); a skew-symmetric matrix has a zero diagonal; AAᵀ = I gives det A = ±1." },
      { name: "Adjoint, inverse and determinant identities", description: "|kA| = kⁿ|A|, |adj A| = |A|ⁿ⁻¹, adj(adj A) = |A|ⁿ⁻² A, and A⁻¹ = adj A/|A| when |A| ≠ 0." },
    ],
    traps: [
      { name: "kⁿ, not k", description: "For an n × n matrix, det(kA) = kⁿ det A. Options built on k det A are distractors." },
      { name: "The wrong exponent on the adjoint", description: "|adj A| = |A|ⁿ⁻¹, not |A|ⁿ; for a 3 × 3 matrix |adj(adj A)| = |A|⁴, not |A|²." },
      { name: "Number rules in matrices", description: "AB ≠ BA in general, so (A + B)(A − B) is A² − B² only when A and B commute." },
      { name: "Orthogonal means det ±1", description: "AAᵀ = I gives (det A)² = 1, so det A can be −1 as well as +1." },
    ],
    relatedSlugs: ["determinants", "permutations-and-combinations"],
  },
};
