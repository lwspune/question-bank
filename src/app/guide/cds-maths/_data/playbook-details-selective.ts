/**
 * Deep-dives for the Selective playbooks of /guide/cds-maths: algebra and the remaining geometry, at
 * 19-39% HARD. Counts match CHAPTER_TABLE.
 */
import type { PlaybookDetail } from "./types";

export const SELECTIVE_PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  "algebraic-identities": {
    slug: "algebraic-identities",
    trigger: "An expression to simplify, or a value of one symmetric expression given and another asked.",
    story: [
      "98 questions, about 4.7 a paper, and the hardest chapter in the bank at 39% HARD. It cherry-picks: conditional identities (16 questions, 69% HARD) and symmetric and cyclic expressions (6 of 6 HARD) are the pool.",
      "The cheap pages are the standard expansions and the cube identity: if a + b + c = 0 then a³ + b³ + c³ = 3abc. When a question gives values, substituting simple numbers that satisfy the condition is often the fastest check.",
    ],
    subSkills: [
      { name: "Squares and cubes of a binomial", description: "(a ± b)² and (a ± b)³, and working backwards from a sum and a product." },
      { name: "Reciprocal sums", description: "From x + 1/x = k: x² + 1/x² = k² − 2 and x³ + 1/x³ = k³ − 3k." },
      { name: "Three variables", description: "(a + b + c)² = Σa² + 2Σab; the cube identity and a + b + c = 0." },
      { name: "Least values", description: "A sum of squares is least when each square is zero." },
      { name: "Conditional identities", description: "Use the given condition to replace one variable, or test with numbers that satisfy it." },
    ],
    traps: [
      { name: "x² + 1/x² from x + 1/x", description: "It is k² − 2, not k²." },
      { name: "a + b + c = 0 not given", description: "Without it, a³ + b³ + c³ − 3abc is (a + b + c)(Σa² − Σab), not zero." },
    ],
    relatedSlugs: ["polynomials", "surds-indices", "quadratic-equations"],
  },
  "quadratic-equations": {
    slug: "quadratic-equations",
    trigger: "A quadratic to solve or form, or a question about its roots without solving it.",
    story: [
      "89 questions, about 4.2 a paper, at 24% HARD spread thinly over nine subtopics. Common roots, maximum and minimum, and word problems have never set a HARD question.",
      "Most questions never need the roots themselves: the sum −b/a, the product c/a and the discriminant answer them.",
    ],
    subSkills: [
      { name: "Sum and product of roots", description: "α + β = −b/a, αβ = c/a, and expressions like α² + β² built from them." },
      { name: "Nature of roots", description: "The discriminant b² − 4ac: positive, zero or negative." },
      { name: "Forming an equation", description: "x² − (sum)x + (product) = 0." },
      { name: "Roots in a relation", description: "One root twice the other, or roots in a ratio." },
    ],
    traps: [
      { name: "Sign of the sum", description: "The sum of roots is −b/a, not b/a." },
      { name: "Real and equal", description: "A zero discriminant gives equal roots; 'real' includes equal." },
    ],
    relatedSlugs: ["polynomials", "algebraic-identities"],
  },
  "surds-indices": {
    slug: "surds-indices",
    trigger: "Powers, roots and surds to simplify or compare, or an equation in exponents.",
    story: [
      "82 questions, falling from 4.6 a paper to 3.0. Equations with surds are 71% HARD; fractions, exponential equations and square roots of surds are almost free.",
    ],
    subSkills: [
      { name: "Laws of indices", description: "aᵐ × aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐⁿ, a⁰ = 1." },
      { name: "Exponential equations", description: "Write both sides to the same base and equate the powers." },
      { name: "Rationalising", description: "Multiply by the conjugate: 1/(√a + √b) = (√a − √b)/(a − b)." },
      { name: "Square roots of surds", description: "√(a + 2√b) = √x + √y where x + y = a and xy = b." },
    ],
    traps: [
      { name: "Adding surds", description: "√2 + √3 is not √5." },
      { name: "Comparing surds", description: "Raise to a common power before comparing cube and square roots." },
    ],
    relatedSlugs: ["algebraic-identities", "logarithms", "number-system"],
  },
  polynomials: {
    slug: "polynomials",
    trigger: "A polynomial divided by (x − a), a factor to test, or the HCF and LCM of two expressions.",
    story: [
      "79 questions, about 3.8 a paper, at 19% HARD. The factor theorem has never set a HARD question; HCF and LCM of polynomials is the largest page (25 questions) and holds 6 of the 15 HARD.",
    ],
    subSkills: [
      { name: "Remainder theorem", description: "The remainder on division by (x − a) is p(a)." },
      { name: "Factor theorem", description: "(x − a) is a factor exactly when p(a) = 0." },
      { name: "Factorisation", description: "Splitting the middle term, and a³ ± b³." },
      { name: "HCF and LCM", description: "Factorise both fully; HCF takes the common factors, LCM all of them." },
    ],
    traps: [
      { name: "Dividing by (x + a)", description: "Put x = −a, not +a." },
      { name: "HCF × LCM", description: "For two polynomials it equals their product only up to a constant factor." },
    ],
    relatedSlugs: ["quadratic-equations", "algebraic-identities", "number-system"],
  },
  circles: {
    slug: "circles",
    trigger: "Chords, tangents, angles in a circle, or two circles touching.",
    story: [
      "69 questions, about 3.3 a paper, at 26% HARD. Tangents from an external point have never set a HARD question; the HARD is spread over the chord, circumcircle and touching-circle pages.",
      "Almost every question rests on two right triangles: radius, half-chord and distance from the centre; and radius, tangent and the line to the centre.",
    ],
    subSkills: [
      { name: "Chords", description: "The perpendicular from the centre bisects a chord: r² = d² + (c/2)²." },
      { name: "Angles in a circle", description: "The angle at the centre is twice the angle at the circumference; opposite angles of a cyclic quadrilateral add to 180°." },
      { name: "Tangents", description: "A tangent is perpendicular to the radius; the two tangents from a point are equal." },
      { name: "Power of a point", description: "Intersecting chords: AP × PB = CP × PD; tangent² = product of the secant parts." },
      { name: "Two circles", description: "Direct common tangent √(d² − (r₁ − r₂)²); touching externally d = r₁ + r₂." },
    ],
    traps: [
      { name: "Parallel chords", description: "Same side of the centre: subtract the distances; opposite sides: add them. The question may not say which." },
      { name: "The reflex angle", description: "An inscribed angle over 90° stands on the major arc; the central angle is 360° minus twice it." },
    ],
    relatedSlugs: ["triangles", "quadrilaterals", "mensuration-2d"],
  },
  quadrilaterals: {
    slug: "quadrilaterals",
    trigger: "A parallelogram, rhombus, trapezium or cyclic quadrilateral with sides, angles or diagonals given.",
    story: [
      "54 questions, rising from 2.4 a paper in 2016-2020 to 3.7 in 2024-2026, at 20% HARD. Rhombus and kite has never set a HARD question; the general-quadrilateral page is the expensive one at 36%.",
    ],
    subSkills: [
      { name: "Parallelograms", description: "Diagonals bisect each other; area = base × height." },
      { name: "Rhombus and kite", description: "Diagonals meet at right angles; area = ½ d₁d₂; side² = (d₁/2)² + (d₂/2)²." },
      { name: "Trapeziums", description: "Area = ½(a + b)h; the diagonals divide each other in the ratio of the parallel sides." },
      { name: "Cyclic quadrilaterals", description: "Opposite angles add to 180°." },
    ],
    traps: [
      { name: "Rhombus diagonals", description: "They are perpendicular but not equal — that would be a square." },
    ],
    relatedSlugs: ["triangles", "circles", "mensuration-2d"],
  },
  heights: {
    slug: "heights",
    trigger: "An angle of elevation or depression and a height or distance to find.",
    story: [
      "41 questions, about two a paper, at 34% HARD, the second-highest in the bank. Towers on plane figures (5 of 7 HARD) is the pool; one line of sight and two points of observation are the pages to bank.",
      "Every question is one or two right triangles sharing a height or a ground distance. Standard angles (30°, 45°, 60°) make the tangents exact.",
    ],
    subSkills: [
      { name: "One line of sight", description: "height = distance × tan θ." },
      { name: "Two observation points", description: "Same side: subtract the distances; opposite sides: add them." },
      { name: "Observer above the ground", description: "Split the object at the observer's eye level into two triangles." },
      { name: "Towers on plane figures", description: "The ground distances come from the figure (a square's diagonal, a hexagon's side)." },
    ],
    traps: [
      { name: "Complementary angles", description: "Elevations α and 90° − α from distances a and b give height √(ab)." },
      { name: "Depression equals elevation", description: "The angle of depression from A to B equals the angle of elevation from B to A." },
    ],
    relatedSlugs: ["trigonometry", "triangles"],
  },
  logarithms: {
    slug: "logarithms",
    trigger: "A logarithm to simplify, a number's digit count, or an equation with logs.",
    story: [
      "33 questions, about 1.6 a paper, at 24% HARD — and most of that (5 of 8) is the equations page. The laws and digit counting are cheap.",
    ],
    subSkills: [
      { name: "The laws", description: "log ab = log a + log b, log aⁿ = n log a, log_b a = log a ÷ log b." },
      { name: "Digit counting", description: "A number whose log has characteristic k has k + 1 digits." },
      { name: "Log equations", description: "Combine into one log, then remove it; check every root keeps the arguments positive." },
    ],
    traps: [
      { name: "log(a + b)", description: "It is not log a + log b." },
      { name: "Roots that break the domain", description: "A root that makes a log's argument negative must be rejected." },
    ],
    relatedSlugs: ["surds-indices", "number-system"],
  },
  "linear-equations": {
    slug: "linear-equations",
    trigger: "Two unknowns and two conditions, an age problem, or a word problem to turn into equations.",
    story: [
      "40 questions, but fading: 2.7 a paper in 2016-2020 and one question in the six 2024-2026 papers. It is still worth learning, because turning words into two equations is how most arithmetic questions are solved.",
    ],
    subSkills: [
      { name: "Solving a pair", description: "Elimination or substitution; a pair with proportional coefficients has no unique solution." },
      { name: "Word problems", description: "One equation per condition; name the unknowns first." },
      { name: "Age problems", description: "Everyone ages by the same number of years." },
      { name: "Integral solutions", description: "Count the whole-number solutions of ax + by = c by stepping through one variable." },
    ],
    traps: [
      { name: "Consistency", description: "a₁/a₂ = b₁/b₂ ≠ c₁/c₂ means no solution, not infinitely many." },
    ],
    relatedSlugs: ["ratio", "averages", "tsd"],
  },
};
