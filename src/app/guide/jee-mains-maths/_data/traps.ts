/**
 * Content for /guide/jee-mains-maths/traps — the mistakes that cost marks on JEE Mains Mathematics,
 * bucketed by the strategy tier whose marks they cost.
 *
 * WHAT MAKES THIS LIST DIFFERENT FROM CDS'S. JEE Mains pays +4 and takes −1 on both formats, so a
 * blind guess on a four-option MCQ is worth +0.25 on average: the paper-wide habit is to leave no MCQ
 * blank, but never to guess a numeric answer. Maths also shares one three-hour clock with Physics and
 * Chemistry, so a stuck Maths question costs marks in the other two subjects.
 *
 * `affects` holds playbook slugs. EMPTY means the trap is paper-wide. Prose carries no bank figures.
 */

import type { TrapShape } from "./types";

export const TRAP_SHAPES: TrapShape[] = [
  // -------- Paper-wide --------
  {
    id: "blank-mcq",
    title: "The blank MCQ — expected marks thrown away",
    bucket: "paper",
    affects: [],
    mechanic:
      "A right answer earns 4 and a wrong one loses 1. A blind guess among four options is worth 1/4 × 4 − 3/4 × 1 = +0.25 on average, and with one option ruled out it is worth 1/3 × 4 − 2/3 × 1 ≈ +0.67.",
    fix:
      "Before time runs out, answer every MCQ. Rule out what you can on sight — a sign that cannot be right, a value outside the allowed range — and pick from what is left.",
  },
  {
    id: "numeric-guess",
    title: "The guessed numeric answer — almost always −1",
    bucket: "paper",
    affects: [],
    mechanic:
      "A numeric answer has no options, so a guess is almost certainly wrong. It carries the same −1 as a wrong MCQ, so its expected value is close to −1.",
    fix:
      "Enter a numeric answer only when you have worked it out. If you have not, leave it blank; the MCQ rule does not carry over.",
  },
  {
    id: "numeric-entry",
    title: "A right method, a wrong entry",
    bucket: "paper",
    affects: [],
    mechanic:
      "The numeric answer is expected as an integer and must be entered exactly. A rounding slip, a unit left unconverted or a factor dropped at the last line scores −1, the same as a wrong method.",
    fix:
      "If the working ends in a non-integer, treat it as a sign of a slip and recheck the last steps. Reread what the question asks for — the value, its square, a sum of parts — before typing.",
  },
  {
    id: "shared-clock",
    title: "The stuck Maths question on a shared clock",
    bucket: "paper",
    affects: [],
    mechanic:
      "Maths, Physics and Chemistry share one three-hour clock, and every question pays the same 4 marks. Ten minutes on one hard integral can cost several questions you would have answered in a minute each in another subject.",
    fix:
      "Two passes. On the first, answer what opens up quickly and mark the rest. If a question has not opened up in about three minutes, mark it, move on, and come back only once every subject has had its first pass.",
  },

  // -------- Cornerstone --------
  {
    id: "shifted-conic",
    title: "Features that do not move with the centre",
    bucket: "cornerstone",
    affects: ["conic-sections"],
    mechanic:
      "The standard results — focus (a, 0), directrix x = −a, the slope-form tangent — are for a conic at the origin. For (y − k)² = 4a(x − h) the focus is (h + a, k), and a distractor keeps (a, 0).",
    fix:
      "Complete the square first and read off the centre or vertex. Work in shifted coordinates, then shift every feature back by the same (h, k).",
  },
  {
    id: "ellipse-hyperbola-signs",
    title: "The ellipse result used on a hyperbola",
    bucket: "cornerstone",
    affects: ["conic-sections"],
    mechanic:
      "The two curves share formulas up to one sign: b² = a²(1 − e²) against b² = a²(e² − 1), the tangency condition c² = a²m² + b² against c² = a²m² − b², the director circle radius² a² + b² against a² − b². Options are built from the other curve's sign.",
    fix:
      "Name the curve before you write any formula. For a hyperbola, every b² term changes sign; check the eccentricity comes out above 1.",
  },
  {
    id: "line-plane-sine",
    title: "Cosine where the line-plane angle needs sine",
    bucket: "cornerstone",
    affects: ["three-dimensional-geometry", "vector-algebra"],
    mechanic:
      "The dot product of the line's direction with the plane's normal gives the angle with the normal. The angle with the plane is its complement, so the formula uses sin θ, and the cosine value appears among the options.",
    fix:
      "Line with line or plane with plane: cosine. Line with plane: sine. Take the absolute value of the dot product for the acute angle.",
  },
  {
    id: "not-transitive",
    title: "Reflexive and symmetric is not an equivalence",
    bucket: "cornerstone",
    affects: ["relations-and-functions"],
    mechanic:
      "Many relations in these questions are reflexive and symmetric but fail transitivity, such as |a − b| ≤ 1: 1 is related to 2 and 2 to 3, but 1 is not related to 3. The option calling it an equivalence relation is the trap.",
    fix:
      "Test transitivity with a chain that crosses the limit, not with nearby points. One failing chain settles it.",
  },
  {
    id: "domain-gaps",
    title: "A domain read off the simplified formula",
    bucket: "cornerstone",
    affects: ["relations-and-functions", "inverse-trigonometric-functions", "limits-and-continuity"],
    mechanic:
      "The domain of f(g(x)) excludes every x where g is undefined, even when the composite simplifies to a formula defined there. A denominator, a logarithm or an inverse-trig argument outside [−1, 1] leaves gaps that the simplified formula hides.",
    fix:
      "Write down the domain of the inner function first, then add the condition that its value lies in the outer function's domain. Simplify only after that.",
  },
  {
    id: "bound-not-reached",
    title: "A bound that is never reached",
    bucket: "cornerstone",
    affects: ["sequences-and-series", "application-of-derivatives", "complex-numbers", "trigonometric-identities"],
    mechanic:
      "AM–GM, the triangle inequality and |sin x| ≤ 1 give bounds, but a bound is the least or greatest value only if equality can happen. If the equal-pieces point is negative or outside the stated range, the true extreme is elsewhere.",
    fix:
      "After finding a bound, find the point where equality holds and check it is allowed. If it is not, the bound is an option built to catch you.",
  },

  // -------- Core --------
  {
    id: "greatest-integer-negative",
    title: "The greatest integer of a negative number",
    bucket: "core",
    affects: ["definite-integration", "limits-and-continuity"],
    mechanic:
      "[x] is the next integer to the left, so [−0.3] = −1, not 0. On an interval below zero, taking [x] as the integer part toward zero shifts every piece by one.",
    fix:
      "Split the interval at every integer and write [x] on each piece before integrating. On negative pieces, check one value such as [−0.5] = −1.",
  },
  {
    id: "signed-area",
    title: "The signed integral given as the area",
    bucket: "core",
    affects: ["application-of-integrals", "definite-integration"],
    mechanic:
      "The integral of sin x from 0 to 2π is 0, but the area is 4. Where a curve crosses the axis, or the upper and lower curves swap, the integral cancels pieces that the area adds.",
    fix:
      "Find every crossing inside the interval, split there, and add the pieces as positive numbers.",
  },
  {
    id: "unbounded-region",
    title: "A region with no x ≥ 0",
    bucket: "core",
    affects: ["application-of-integrals"],
    mechanic:
      "Without x ≥ 0, a region such as xy ≤ k, 1 ≤ y ≤ x² includes every x ≤ −1, where xy ≤ 0 ≤ k always holds, so it is unbounded. The printed options assume the first quadrant.",
    fix:
      "Sketch the region on both sides of the y-axis. If one side runs off to infinity, answer for x ≥ 0, the region the options assume.",
  },
  {
    id: "at-least-one",
    title: "Choosing the 'at least one' first",
    bucket: "core",
    affects: ["permutations-and-combinations", "probability"],
    mechanic:
      "Picking one required item first and then filling the rest freely counts the same selection several times, once for each required item it contains. The inflated count sits among the options.",
    fix:
      "Count the complement: total minus the selections with none. Or split by exactly one, exactly two and so on, and add.",
  },
  {
    id: "conjugate-roots",
    title: "Conjugate roots without real coefficients",
    bucket: "core",
    affects: ["complex-numbers", "quadratic-equations"],
    mechanic:
      "Non-real roots come in conjugate pairs only when the coefficients are real. With a complex coefficient, one root being 2 + i says nothing about 2 − i.",
    fix:
      "Check the coefficients before using the conjugate. If they are complex, use the sum and product of the roots instead.",
  },
  {
    id: "squaring-extra-root",
    title: "The extra root from squaring",
    bucket: "core",
    affects: ["complex-numbers", "inverse-trigonometric-functions", "trigonometric-equations"],
    mechanic:
      "Squaring both sides also solves the equation with the opposite sign. Roots of that other equation survive into the answer, and taking tangents of both sides does the same with the range of an angle.",
    fix:
      "Put every root back into the original equation. A modulus is never negative, and an inverse-trig sum must land in its range.",
  },
  {
    id: "vanishing-x2",
    title: "The x² coefficient that can vanish",
    bucket: "core",
    affects: ["quadratic-equations", "relations-and-functions"],
    mechanic:
      "When the leading coefficient holds a parameter, the value that makes it 0 leaves a linear equation, and the discriminant test does not apply to it. That value is often the one the options include or leave out.",
    fix:
      "Set the leading coefficient to 0 first and solve that case on its own. Then run the discriminant for the rest.",
  },
  {
    id: "discriminant-equality",
    title: "D > 0 where the question allows D = 0",
    bucket: "core",
    affects: ["quadratic-equations", "application-of-derivatives"],
    mechanic:
      "Real roots means D ≥ 0; distinct real roots means D > 0. 'Increasing for all x' likewise allows f′ to touch 0 at one point, so options that differ only at the boundary value test this.",
    fix:
      "Read whether the question says real, distinct or equal. Then test the boundary value itself before choosing between a strict and a non-strict answer.",
  },

  // -------- Long tail --------
  {
    id: "principal-values",
    title: "An angle outside the principal range",
    bucket: "longtail",
    affects: ["inverse-trigonometric-functions", "complex-numbers", "differentiation"],
    mechanic:
      "sin⁻¹ and tan⁻¹ return angles in [−π/2, π/2] and cos⁻¹ in [0, π], so sin⁻¹(sin 2) is π − 2, not 2. For z = −1 + i, tan⁻¹(y/x) gives −π/4 but arg z is 3π/4.",
    fix:
      "Before cancelling an inverse with its function, check the angle lies in the principal range; if not, move it there. For arg z, check which quadrant z is in.",
  },
  {
    id: "determinant-scaling",
    title: "|kA| taken as k|A|",
    bucket: "longtail",
    affects: ["matrices", "determinants"],
    mechanic:
      "For an n × n matrix, |kA| = kⁿ|A| and |adj A| = |A|ⁿ⁻¹, so for a 3 × 3 matrix |2A| = 8|A|. Dividing by a negative |A| also flips a sign that options are built to catch.",
    fix:
      "Write the order n next to every determinant step. Carry the sign of |A| through any division.",
  },
  {
    id: "one-sided-limits",
    title: "One side of the limit taken for both",
    bucket: "longtail",
    affects: ["limits-and-continuity", "differentiation"],
    mechanic:
      "At an integer n, [x] tends to n − 1 from the left and n from the right, and |x|/x tends to −1 and 1 at 0. The limit exists only when both sides agree, and the same holds for the left and right derivatives.",
    fix:
      "At every integer point of [x], every zero of a modulus and every joint of a piecewise function, work out the left and right values separately.",
  },
  {
    id: "interval-endpoints",
    title: "Solutions and extremes at the endpoints",
    bucket: "longtail",
    affects: ["trigonometric-equations", "application-of-derivatives"],
    mechanic:
      "On [0, 2π], sin x = 0 has three solutions, 0, π and 2π; on (0, 2π) it has one. A greatest or least value on a closed interval can sit at an endpoint rather than at a turning point.",
    fix:
      "Read whether the interval is open or closed, then test each endpoint. Also check that no denominator such as tan x vanishes at a solution you counted.",
  },
];
