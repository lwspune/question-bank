/**
 * Deep-dives for eight /guide/jee-mains-maths playbooks: Determinants, Statistics, Application of
 * Derivatives, Trigonometric Identities, Inverse Trigonometric Functions, Indefinite Integration,
 * Differentiation and Trigonometric Equations. Sub-skills follow each chapter's /notes page order.
 * Prose carries no bank figures — the pages print counts and rates from generated data.
 */
import type { PlaybookDetail } from "./types";

export const PLAYBOOK_DETAILS_C: Record<string, PlaybookDetail> = {
  determinants: {
    slug: "determinants",
    trigger: "A system of three linear equations with a constant left open, or the determinant of kA, adj A or a matrix whose entries depend on x.",
    story: [
      "Most of this chapter is not about determinants for their own sake. It is systems of three equations in three unknowns with one or two constants left open, and the question asks which values give infinitely many solutions, none, or exactly one. The work is Δ = 0 and one Cramer determinant, or spotting that one equation is a combination of the other two.",
      "The order of checks is fixed. Δ ≠ 0 means exactly one solution. Δ = 0 with any of Δx, Δy, Δz non-zero means none. Δ = 0 with all three zero usually means infinitely many, but confirm by elimination. Time goes on the questions that list several statements about a system, and on counting the values of an angle in an interval that make Δ = 0.",
      "The last pages are shorter: chains of |kA| and |adj A|, patterned determinants reduced by row and column operations, and determinants in x that are simplified, differentiated or integrated. The adjoint rules are shared with Matrices, and a determinant in θ set to zero is finished with the tools of Trigonometric Equations.",
    ],
    subSkills: [
      { name: "Infinitely many solutions", description: "Write the third equation as a combination of the first two, or set Δ = 0 and one Cramer determinant to zero, and solve for both constants." },
      { name: "No solution", description: "Δ = 0 with at least one of Δx, Δy, Δz non-zero; test each root of Δ, because some give infinitely many instead." },
      { name: "Classifying a system", description: "Exactly one solution when Δ ≠ 0; test each statement in the options on its own." },
      { name: "Homogeneous systems", description: "A non-trivial solution exists exactly when Δ = 0; with an angle in the coefficients, solve that equation in the given interval." },
      { name: "Determinants of kA and adj A", description: "For an n × n matrix, |kA| = kⁿ|A|, |adj A| = |A| to the power n − 1, and |AB| = |A||B|." },
      { name: "Row and column operations", description: "Take out common factors and create zeros before expanding; rows built from an A.P., powers or factorials collapse quickly." },
      { name: "Determinants as functions of x", description: "Reduce to one expression, then find its range or roots; to differentiate, differentiate one row at a time and add." },
    ],
    traps: [
      { name: "The order of the matrix", description: "|2A| for a 3 × 3 matrix is 8|A|, not 2|A|. Every power in the adjoint chain depends on n." },
      { name: "Δ = 0 is not yet infinitely many", description: "A root of Δ can leave the system with no solution. Check the Cramer determinants, or eliminate, before choosing." },
      { name: "Scaling one row", description: "Multiplying a single row by k multiplies the determinant by k, not by kⁿ." },
    ],
    relatedSlugs: ["matrices", "trigonometric-equations"],
  },

  statistics: {
    slug: "statistics",
    trigger: "A mean and a variance or standard deviation are given, and some of the data is missing, wrong, shifted or combined with another group.",
    story: [
      "Nearly every question here is a variance question, and nearly every one rests on two totals: Σx and Σx². The variance is σ² = Σx²/n − x̄², so Σx² = n(σ² + x̄²). Once both totals are known, missing values, corrected data and combined groups are a few lines of arithmetic.",
      "The pages build those totals from different starting points: given sums of shifted values, two unknown observations, a wrongly recorded value, two groups put together. Adding a constant to every value leaves the variance unchanged; multiplying by a multiplies it by a². Mean deviation and frequency tables come last and are more mechanical.",
      "Time goes on arithmetic, not ideas. A numeric-answer question gives no options to check against, so write the two totals down first, before any formula. Sums of an A.P. and of the squares of natural numbers come from Sequences and Series.",
    ],
    subSkills: [
      { name: "Variance from sums and shifts", description: "σ² = Σx²/n − x̄²; for y = ax + b the mean is ax̄ + b and the variance a²σ²." },
      { name: "Finding unknown observations", description: "Two unknowns give their sum from the mean and the sum of their squares from the variance; together these fix both." },
      { name: "Correcting data and combining groups", description: "Rebuild Σx and Σx² from the recorded data, swap the wrong value, then recompute; for two groups add the totals." },
      { name: "Mean deviation", description: "(1/n)Σ|x − c| about the mean, the median or the mode; sort the data before picking the median." },
      { name: "Frequency distributions", description: "Mean Σfx/N and variance Σfx²/N − x̄²; grouped median l + ((N/2 − F)/f) × h." },
    ],
    traps: [
      { name: "Dropping the square of the mean", description: "Σx² = n(σ² + x̄²), not nσ². Without the x̄² term the sum of squares comes out too small, sometimes negative." },
      { name: "Group variances do not average", description: "The combined variance also carries a term for the gap between the two group means; it is zero only when the means are equal." },
      { name: "The sign of the scale", description: "The variance is multiplied by a², so a and −a give the same spread. A fixed variance usually allows two values of a." },
      { name: "Mean deviation is not the SD", description: "The mean deviation takes absolute distances and never exceeds the standard deviation; an option equal to the SD is a distractor." },
    ],
    relatedSlugs: ["sequences-and-series", "probability"],
  },

  "application-of-derivatives": {
    slug: "application-of-derivatives",
    trigger: "A slope or a rate, where a function rises or falls, how many real roots an equation has, or the greatest or least value of something.",
    story: [
      "The chapter opens with the derivative as a slope and a rate — tangents, normals, curves meeting at an angle, related rates — and then uses its sign. The largest group of questions asks for a maximum or a minimum: local ones from sign changes of f′, the greatest and least values on an interval, and word problems.",
      "The routine questions are one derivative and one sign chart. Time goes where the sign chart hides a trap: a double zero of f′ that is not an extremum, a corner where f′ does not exist, an endpoint higher than every local maximum, or a parameter that must keep f′ ≥ 0 for every x. Working backwards, from where a cubic's extrema sit to its coefficients, also takes longer.",
      "Every derivative comes from Differentiation. When f′ is a quadratic that must keep one sign, the condition is a discriminant from Quadratic Equations, and tangents and shortest distances to curves lean on Straight Lines and Conic Sections.",
    ],
    subSkills: [
      { name: "Tangents, normals and rates", description: "Tangent slope f′(a), normal slope −1/f′(a); differentiate a relation in time before putting in the instant's values." },
      { name: "Increasing and decreasing functions", description: "Read the sign of f′; for f increasing on all of ℝ with a quadratic f′, need a positive leading coefficient and discriminant ≤ 0." },
      { name: "Counting real roots", description: "A strictly monotonic function has at most one root; otherwise the signs of the local maximum and minimum values decide." },
      { name: "Local maxima and minima", description: "An extremum needs f′ to change sign; check corners and cusps where f′ does not exist." },
      { name: "Functions built from their extrema", description: "Each extremum gives f′ = 0 there; a limit or a given value fixes the remaining coefficients." },
      { name: "Greatest and least values, and optimisation", description: "On a closed interval compare critical values with the endpoint values; in a word problem reduce to one variable and stay inside its allowed range." },
      { name: "Rolle's and mean value theorems", description: "Equal end values force a zero of f′; k distinct zeros of f give at least k − 1 zeros of f′." },
    ],
    traps: [
      { name: "Even powers do not change sign", description: "A factor like (x − a)² in f′ gives a critical point that is not a maximum or a minimum." },
      { name: "The endpoints count", description: "On a closed interval the greatest or least value can sit at an endpoint, beyond every local extremum." },
      { name: "Normal, not tangent", description: "A normal parallel to a line of slope m needs f′ = −1/m. Solving f′ = m finds the tangent instead." },
      { name: "Each piece is not the union", description: "1/x decreases on x < 0 and on x > 0, but not on their union. Options often differ only in this." },
    ],
    relatedSlugs: ["differentiation", "quadratic-equations", "conic-sections"],
  },

  "trigonometric-identities": {
    slug: "trigonometric-identities",
    trigger: "A trigonometric expression must be reduced to a single number, or its greatest and least values found, with no equation to solve.",
    story: [
      "This chapter is the formula kit for the rest of trigonometry. The first pages build it: compound angles with signs fixed by the quadrant, double and triple angles, and exact values at 15°, 18° and 36°. The later pages use it to collapse powers, long products and sums to one number.",
      "Most questions are evaluations: a product like cos A cos 2A cos 4A, a sum of fourth or sixth powers, cos(α + β) from two given ratios. Each has one identity that does the work. Time goes when that identity is missed and the expression is expanded instead. The range questions reduce to a sin θ + b cos θ, or to a quantity such as sin²θ cos²θ with a known range.",
      "Everything here is used again: Trigonometric Equations solves what this chapter simplifies, and Inverse Trigonometric Functions reads its values off the same angle formulas.",
    ],
    subSkills: [
      { name: "Compound angles", description: "sin(A ± B), cos(A ± B) and tan(A ± B), with each ratio's sign fixed by its quadrant first." },
      { name: "Standard values and multiple angles", description: "sin 18° = (√5 − 1)/4, cos 36° = (√5 + 1)/4; sin 3θ = 3 sin θ − 4 sin³θ and cos 3θ = 4 cos³θ − 3 cos θ." },
      { name: "Powers of sine and cosine", description: "With p = sin²θ cos²θ, sin⁴θ + cos⁴θ = 1 − 2p and sin⁶θ + cos⁶θ = 1 − 3p." },
      { name: "Products and telescoping", description: "cos A cos 2A … cos 2ⁿ⁻¹A = sin 2ⁿA / (2ⁿ sin A); sin θ sin(60° − θ) sin(60° + θ) = (1/4) sin 3θ; multiply a spaced sum by 2 sin(d/2)." },
      { name: "Maximum, minimum and range", description: "a sin θ + b cos θ lies between −√(a² + b²) and √(a² + b²); p = sin²θ cos²θ lies between 0 and 1/4." },
    ],
    traps: [
      { name: "The triangle gives the size, not the sign", description: "sin x = −3/5 in the third quadrant gives cos x = −4/5, not +4/5. Fix every sign from the quadrant before substituting." },
      { name: "sin 18° and cos 36° swapped", description: "(√5 − 1)/4 is about 0.31 and (√5 + 1)/4 about 0.81. A value above 1/2 cannot be sin 18°." },
      { name: "The bound needs one angle", description: "√(a² + b²) bounds a sin θ + b cos θ only when both terms share the angle; sin θ + cos 2θ is not of that form." },
      { name: "p stops at 1/4", description: "sin²θ cos²θ = (1/4) sin²2θ, so its greatest value is 1/4, not 1." },
    ],
    relatedSlugs: ["trigonometric-equations", "inverse-trigonometric-functions"],
  },

  "inverse-trigonometric-functions": {
    slug: "inverse-trigonometric-functions",
    trigger: "sin⁻¹, cos⁻¹ or tan⁻¹ of a number or an expression, a sum of inverse tangents, or an equation in inverse functions.",
    story: [
      "Every question here turns on the principal ranges: sin⁻¹ in [−π/2, π/2], cos⁻¹ in [0, π], tan⁻¹ in (−π/2, π/2). The first pages evaluate and simplify inside those ranges — sin⁻¹(sin 3) = π − 3, a ratio read off a right triangle, an expression in x simplified by putting x = sin θ or tan θ.",
      "The later pages put the tools to work: sums of inverse tangents, often a telescoping series whose general term splits as tan⁻¹(next) − tan⁻¹(this), and equations whose roots must be checked against the ranges. Some questions want a numerical answer, where a lost sign has no option to expose it.",
      "Time goes on branch choices. sin⁻¹(2x√(1 − x²)) and tan⁻¹ a + tan⁻¹ b each change formula outside an interval, and squaring an equation brings in false roots. The same simplifications shorten derivatives in Differentiation, and the telescoping idea is the one used in Sequences and Series.",
    ],
    subSkills: [
      { name: "Domain, range and principal values", description: "Where each inverse is defined, what values it takes, and how sin⁻¹(sin x) is brought back into the principal range." },
      { name: "Values of inverse expressions", description: "Read each angle off a right triangle, then use the double-, half- or triple-angle formulas; take the sign from the range." },
      { name: "Simplifying by substitution", description: "Put x = sin θ, cos θ or tan θ, track the interval of θ, and use sin⁻¹x + cos⁻¹x = π/2." },
      { name: "Sums and telescoping series", description: "tan⁻¹ a + tan⁻¹ b = tan⁻¹((a + b)/(1 − ab)) when ab < 1; write each term of a series as a difference of two inverse tangents." },
      { name: "Equations", description: "Combine terms, take a tangent, sine or cosine, solve, then check every root in the original equation." },
    ],
    traps: [
      { name: "sin⁻¹(sin x) is not always x", description: "sin⁻¹(sin 3) = π − 3, because 3 lies outside [−π/2, π/2]. Check the answer lies in the principal range." },
      { name: "When the product exceeds 1", description: "For positive a and b with ab > 1, tan⁻¹ a + tan⁻¹ b = π + tan⁻¹((a + b)/(1 − ab)). The bare formula gives a negative angle." },
      { name: "Taking tangents or squaring adds roots", description: "Every root of the resulting polynomial must be put back into the original equation; a negative root often fails." },
      { name: "A triangle has no signs", description: "cos⁻¹ of a negative number lies in (π/2, π), so its cosine and tangent are negative even though the triangle gives positive ratios." },
    ],
    relatedSlugs: ["differentiation", "trigonometric-identities", "sequences-and-series"],
  },

  "indefinite-integration": {
    slug: "indefinite-integration",
    trigger: "An antiderivative is asked for, usually with a given value to fix the constant or a printed form whose coefficients must be read off.",
    story: [
      "Questions rarely stop at the antiderivative. A given value fixes the constant and the question asks for the value at another point, or the result is matched to a printed form such as A ln|…| + B tan⁻¹(…) + C and the question asks for A + B. So the integral must be exact, constant and all.",
      "The first three pages reduce an integrand to a standard form: a substitution that clears a root or a high power of x, partial fractions or a completed square, and trigonometric integrands turned into algebra with t = tan x or t = sin x ± cos x. The last page is integration by parts, the pattern eˣ(f + f′), and integrands that are already the derivative of a product or a quotient.",
      "Choosing t is the whole question; once it is right, the integral is a power of t. When stuck, differentiating each option is often quicker than integrating, and it checks the answer either way. The same techniques run through Definite Integration and Differential Equations.",
    ],
    subSkills: [
      { name: "Algebraic substitution", description: "Put t equal to a root to clear it; for two linear factors use their ratio; take a power of x out of a long expression." },
      { name: "Rational functions and standard forms", description: "Divide first if the top's degree is not lower, then split into partial fractions, complete the square, or put t = x ± 1/x." },
      { name: "Trigonometric integrals", description: "Divide through to write everything in tan x or cot x, or put t = sin x, cos x, or sin x ± cos x." },
      { name: "Integration by parts and reverse differentiation", description: "∫u dv = uv − ∫v du; ∫eˣ(f + f′) dx = eˣ f + C; spot a product or quotient derivative in the integrand." },
    ],
    traps: [
      { name: "Given values are in x", description: "With x = t⁶, the point x = 64 is t = 2, not t = 64. Convert the point before fixing the constant." },
      { name: "Match the substitution to the top", description: "For x² + 1 on top put t = x − 1/x; for x² − 1 put t = x + 1/x. The other choice leaves no dt." },
      { name: "Signs alternate in repeated parts", description: "∫x² cos x dx = x² sin x + 2x cos x − 2 sin x + C. One wrong sign changes every value computed from it." },
      { name: "Cot brings a minus sign", description: "With t = cot x, dt = −cosec²x dx, so every term of the answer changes sign." },
    ],
    relatedSlugs: ["definite-integration", "differential-equations", "differentiation"],
  },

  differentiation: {
    slug: "differentiation",
    trigger: "The derivative of a composite, implicit, parametric or inverse function, or whether a function is differentiable at a point.",
    story: [
      "The chapter has two halves. One computes a derivative, and the work is almost always in the simplification before it: an inverse-trig expression that collapses to a multiple of tan⁻¹ x, a power that is easier after taking logs, a curve given by a parameter. The other asks whether a derivative exists: where two pieces join, where a modulus, a max or a min has a corner, and where the greatest integer function jumps.",
      "The computing half is fast when the simplification is seen and slow when it is not; the chain rule applied blindly works but costs minutes. The existence half is a count with traps: a zero inside a modulus is only a candidate, a jump is both a discontinuity and a point of non-differentiability, and continuity must hold before slopes are matched.",
      "Functional equations such as f(x + y) = f(x) f(y) sit here too, solved by fixing f(0) first. The chapter lies between Limits and Continuity, which supplies the definitions, and Application of Derivatives, which uses every rule.",
    ],
    subSkills: [
      { name: "Chain rule and inverse-trig simplification", description: "Simplify by x = tan θ or a similar substitution first; for g = f⁻¹, g′(k) = 1/f′(a) where f(a) = k." },
      { name: "Implicit, parametric and logarithmic differentiation", description: "dy/dx = (dy/dt)/(dx/dt); d²y/dx² is the t-derivative of dy/dx divided by dx/dt; take logs of powers like xˣ." },
      { name: "Functional equations and derivative constants", description: "Fix f(0) from the relation first; treat f′(1) inside a polynomial as a number, not a function." },
      { name: "Differentiability of piecewise functions", description: "Continuity at the join, then equal left and right derivatives; at a single point, use the limit that defines f′." },
      { name: "Counting non-differentiable points", description: "List the zeros inside each modulus, the crossings of a max or min, and the jumps of [x], then test each one." },
    ],
    traps: [
      { name: "Not the ratio of second derivatives", description: "For x = t², y = t³, the ratio of second derivatives gives 3t, but d²y/dx² = 3/(4t)." },
      { name: "The branch decides the answer", description: "cos⁻¹(cos x) = x only on [0, π]; on [π, 2π] it is 2π − x, with derivative −1." },
      { name: "Matching slopes is not enough", description: "Equal one-sided slopes at a jump do not make f differentiable; check continuity first." },
      { name: "A jump counts twice", description: "When a question adds the points of discontinuity and of non-differentiability, each jump belongs to both counts." },
    ],
    relatedSlugs: ["application-of-derivatives", "limits-and-continuity", "inverse-trigonometric-functions"],
  },

  "trigonometric-equations": {
    slug: "trigonometric-equations",
    trigger: "The number of solutions of a trigonometric equation in a given interval, or the values of a constant for which a solution exists.",
    story: [
      "Most questions ask only how many solutions lie in an interval, so the general solution is a tool, not the answer. The usual route is to reduce everything to one ratio of one angle — by a quadratic in sin θ or cos θ, a product-to-sum step, or a multiple-angle identity — solve for the ratio, drop values outside [−1, 1], and count angles period by period.",
      "The count is where marks are lost. A value of ±1 is reached once per period, not twice; a closed interval can hold a root at each end; two families of roots can overlap; and collapsing to tan 3x can admit roots where an original tan x is undefined. Marking each root on the interval is safer than trusting a formula.",
      "The rest turns on ranges: f(x) = k has a solution only when k lies in the range of f, and a cos x + b sin x = c needs c² ≤ a² + b². Some equations are settled only by bounds or a graph. The identities come from Trigonometric Identities, and a determinant in θ set to zero in Determinants ends here.",
    ],
    subSkills: [
      { name: "Quadratic in one ratio", description: "Solve for sin θ, cos θ, sec θ or cosec θ, discard roots outside the range, then count the angles in the interval." },
      { name: "Product-to-sum and multiple angles", description: "Turn products into sums to reach cos A = cos B or a product equal to zero, or collapse to one ratio of 3x or 4x." },
      { name: "Range and existence of solutions", description: "f(x) = k is solvable exactly when k is in the range of f; write a cos x + b sin x as √(a² + b²) cos(x − α)." },
      { name: "Exponential, bounded and graphical equations", description: "For a > 1, a to the power sin²x lies in [1, a]; sides that meet only at their bounds; a line against the graph of tan x." },
    ],
    traps: [
      { name: "±1 and the endpoints", description: "cos θ = −1 has one root per period, and on [−π, π] it holds at both ends." },
      { name: "Cancelling a ratio", description: "In sin θ cos θ = sin θ, cancelling sin θ loses θ = π. Factor as sin θ(cos θ − 1) = 0." },
      { name: "Overlapping families", description: "Two families of roots can share some angles; adding the two counts without removing the shared ones overcounts." },
      { name: "Squaring adds roots", description: "Squaring a cos x = c − b sin x also admits roots of a cos x = −(c − b sin x); check each root, or use the auxiliary angle." },
    ],
    relatedSlugs: ["trigonometric-identities", "determinants", "quadratic-equations"],
  },
};
