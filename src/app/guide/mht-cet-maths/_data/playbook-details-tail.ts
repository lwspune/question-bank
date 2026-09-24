/**
 * Deep-dive content for the 11 LONG-TAIL playbooks of /guide/mht-cet-maths.
 *
 * Split out of playbook-details.ts so the 22 chapter deep-dives can be
 * authored in two part-files; both import PlaybookDetail from ./types to
 * avoid a cycle with the module that merges them.
 *
 * The tail is defined by RECENT weightage (2024-2025, 26 shifts): each of
 * these chapters runs at roughly one question a paper and most of them are
 * 33-56% HARD. The honest framing throughout is that a tail chapter is worth
 * about two marks and most of them are expensive to buy. Because MHT-CET has
 * NO NEGATIVE MARKING you still answer every one of them — so the advice here
 * is about time budget and about which corner of each chapter is cheap, never
 * about attempt-versus-skip.
 *
 * exampleQuestionIds are deliberately empty: inventing UUIDs ships dead links.
 */

import type { PlaybookDetail } from "./types";

export const TAIL_PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  limits: {
    slug: "limits",
    trigger:
      "A limit that comes out 0/0 or infinity/infinity, or a piecewise function carrying an unknown constant that is asked to be continuous.",
    story: [
      "89 q, 1.99/paper, 55% HARD — the hardest chapter in the subject by rate. It is also the one chapter in the tail with nowhere to hide: the four limit pages run 44-67% HARD and the three continuity pages 50-58%, so every page is above the paper's overall 38.4% HARD line. There is no cheap corner to cherry-pick.",
      "The two halves ask for different work. Continuity is really equation-solving wearing a calculus costume: write the left-hand limit, the right-hand limit and the value at the point, set all three equal, and solve for the one or two unknowns. It is the more mechanical of the two despite carrying a comparable HARD rate, and it is where a student with a reliable method banks the chapter's marks — 44 of the 89 questions are continuity problems.",
      "Limit Evaluation is recognition, not computation. Almost every question is one of a short list of standard forms in disguise, and the win is deciding within about fifteen seconds which tool applies — factorise, rationalise, divide by the highest power, or quote a standard limit. At 1.8 minutes a question, a limit you have to experiment on has already cost you a question elsewhere.",
      "Practical consequence: give this chapter a hard time cap. Two questions a paper at 56% HARD is four marks that will not come cheaply, and with no negative marking an unresolved limit is still worth a marked option rather than a blank.",
    ],
    subSkills: [
      {
        name: "Limits — Existence, One-Sided Limits and Limits at Infinity",
        description:
          "Compute the two sides separately whenever |x| or [x] is in play — x/(|x| + x^2) has no limit at 0 while |x|/(|x| + x^2) tends to 1 — and settle a ratio at infinity by its leading powers, replacing any finite sum by its closed form first.",
      },
      {
        name: "Algebraic Limits — Factorisation, Rationalisation and the xⁿ − aⁿ Form",
        description:
          "Substitute first; on 0/0 factor and cancel, rationalise (both floors if both carry surds, twice for a nested root), or quote (x^n - a^n)/(x - a) = n a^(n-1). Read [f(x) - f(a)]/(x - a) as f'(a), and remember a finite limit forces the numerator to vanish.",
      },
      {
        name: "Trigonometric Limits — sin x/x and the 1 − cos x Family",
        description:
          "sin x / x and tan x / x tending to 1, (1 - cos kx)/x^2 tending to k^2/2, an identity applied before the limit, the shift x = pi/2 - h, degrees converted by pi/180, and one more term of the series when the first order cancels.",
      },
      {
        name: "Exponential, Logarithmic and 1^∞ Limits",
        description:
          "(a^x - 1)/x tending to log a and log(1 + x)/x tending to 1; (bc)^x - b^x - c^x + 1 factors as (b^x - 1)(c^x - 1); t = a^x turns mixed exponents into algebra; and any 1^infinity form is e to the limit of (f - 1)g.",
      },
      {
        name: "Continuity at a Point — Finding f(c) and the Parameter",
        description:
          "Every 'find k' or 'find f(0)' stem is a limit from the pages above set equal to a value. Carry a parameter inside the formula through the standard limits as a symbol, and differentiate an integral with a variable upper limit by the chain rule.",
      },
      {
        name: "Continuity of Piecewise Functions — Junction Conditions and Parameter Systems",
        description:
          "Count the junctions first — two unknowns need two junctions — then write left = right = value at each, using the piece whose inequality owns the point for the value. Solve the inequality that defines the pieces before writing any equation.",
      },
      {
        name: "Discontinuities of [x], |x| and sgn x — Counting the Points",
        description:
          "[x] jumps at every integer and [g(x)] wherever g crosses one; (x - a)/|x - a| is a jump of size 2 that no f(a) can bridge; and a factor that vanishes at the jump swallows it, so [x] sin(pi x) is continuous everywhere.",
      },
    ],
    traps: [
      {
        name: "Value instead of limit",
        description:
          "The distractor is f(a) computed by direct substitution, which is only the answer when f is continuous there. If substitution gives an indeterminate form, the value and the limit are different numbers.",
      },
      {
        name: "Comparing the wrong terms at infinity",
        description:
          "For a ratio of polynomials as x tends to infinity, only the leading powers matter. The wrong option comes from comparing constant terms or from keeping a lower-order term that vanishes.",
      },
      {
        name: "Modulus at zero",
        description:
          "For expressions like |x| / x the one-sided limits are +1 and -1, so the limit does NOT exist. Both 1 and -1 will be offered; 'does not exist' is the answer.",
      },
      {
        name: "One raised to infinity treated as one",
        description:
          "1^infinity is an indeterminate form, not 1. It needs the exponential-limit treatment, and the option reading 1 is planted for exactly this slip.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["differentiation", "indefinite-integration", "trigonometry-i"],
  },

  "trigonometry-i": {
    slug: "trigonometry-i",
    trigger:
      "A compound, allied or multiple-angle identity to simplify, or a trigonometric equation to be solved for a general solution.",
    story: [
      "77 q in a single subtopic, 1.31/paper, 36% HARD. One undivided block means there is nothing to cherry-pick and nothing to skip: you prepare the chapter or you do not.",
      "It is one of the few live chapters moving DOWN — 1.71 q/paper across the lifetime window against 1.31 across the 26 shifts of 2024-2025 — while its Std XII neighbour Trigonometric Functions moves the other way, 3.73 to 4.31. A student prioritising from lifetime frequency alone over-invests here and under-invests there. Prepare Trigonometric Functions first.",
      "The subtopic is genuinely MIXED, and knowing that changes how you drill it: Std XI compound, allied and multiple-angle identity work sits alongside Std XII trigonometric equations and general solutions. The two demand different closing moves — an identity question ends in a simplification, an equation question ends in a general-solution form with an integer parameter — so read the ask before choosing a method.",
      "At 36% HARD it is one of the softer chapters outside the quick-wins, and the identities it drills are reused inside Indefinite Integration and Definite Integration, which is most of the argument for giving it an afternoon.",
    ],
    subSkills: [
      {
        name: "Allied and compound angles",
        description:
          "sin(A plus or minus B), cos(A plus or minus B), tan(A plus or minus B), and the allied-angle reductions for pi/2 plus or minus x and pi plus or minus x. Everything else in the chapter is built on these.",
      },
      {
        name: "Multiple and half angles",
        description:
          "Double and triple-angle forms, and the half-angle substitutions. The three expressions for cos 2A are the ones to hold — which you pick decides whether the question is one line or five.",
      },
      {
        name: "Factorisation and defactorisation",
        description:
          "Sum-to-product and product-to-sum. A sum of sines or cosines that refuses to simplify is almost always asking for this.",
      },
      {
        name: "General solutions",
        description:
          "sin x = sin y gives x = n pi + (-1)^n y; cos x = cos y gives x = 2 n pi plus or minus y; tan x = tan y gives x = n pi + y. Std XII material that lives in this chapter, and the most commonly mis-stated trio on the paper.",
      },
      {
        name: "Principal versus general solution",
        description:
          "A question asking for the principal solution wants the values in a stated interval, not the parameterised family. Reading which was asked is worth more marks here than any identity.",
      },
    ],
    traps: [
      {
        name: "The wrong general-solution form",
        description:
          "The sine form carries (-1)^n and the cosine form carries plus-or-minus. Option sets routinely offer the cosine form for a sine equation; they differ only in that one symbol.",
      },
      {
        name: "Principal solution returned as general",
        description:
          "Both appear in the option set. The parameterised answer to a principal-solution question is the planted one, and it looks more complete.",
      },
      {
        name: "Roots lost to squaring",
        description:
          "Squaring to clear a radical introduces extraneous roots and silently drops sign information. The distractor is the count of solutions BEFORE checking each one back in the original equation.",
      },
      {
        name: "Interval endpoints",
        description:
          "Counting solutions in [0, 2 pi] versus (0, 2 pi) differs by the endpoints, and the two counts are both offered.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["trigonometric-functions", "indefinite-integration", "definite-integration"],
  },

  "definite-integration": {
    slug: "definite-integration",
    trigger:
      "An integral carrying numeric limits — especially symmetric limits, limits running 0 to a, or an absolute value or piecewise expression inside.",
    story: [
      "68 q, 1.72/paper, 47% HARD, and the chapter splits into a recognition half and a grind half. The three property pages — odd and even symmetry, King's property, modulus and greatest-integer splitting — are 43 q at 42% HARD; the two evaluation pages are 25 q at 56%.",
      "The 43-q property block is the highest-leverage recognition anywhere in the calculus block. Once the property is spotted the question collapses in a single line — an odd integrand over symmetric limits is zero with no antiderivative computed at all, and King's property turns an unintegrable-looking expression into twice something trivial or into a constant. At 1.8 minutes a question, that is worth more than the two marks it scores.",
      "The other half is ordinary integration with limits attached, which makes it Indefinite Integration (162 q, 3.41/paper, 52% HARD) plus one extra step. Its 56% HARD rate is real, but so is the transfer: everything invested in the cornerstone integration chapter is paid back here, so this half needs almost no separate preparation.",
      "Order of attack follows directly: scan every definite integral for a property BEFORE reaching for a technique. Ten seconds of looking saves a minute of integrating on roughly three of every five questions in this chapter.",
    ],
    subSkills: [
      {
        name: "Evaluating Definite Integrals — Standard Forms, Algebraic Substitution and By Parts",
        description:
          "Integrate, then evaluate at the upper limit minus the lower. When you substitute, change the limits to the new variable rather than back-substituting at the end; split a numerator against a quadratic; use by parts for inverse trig and e^x (f + f'), and the reduction I_n + I_(n-2) = 1/(n-1) for powers of tan.",
      },
      {
        name: "Trigonometric Definite Integrals — tan x = t, Half-Angle Forms and Powers",
        description:
          "Divide by a power of cos x and put tan x = t (limits 0 to 1 at pi/4, 1/sqrt3 at pi/6); 1 + cos x = 2 cos^2(x/2); the Weierstrass result for 1/(a + b cos x) over 0 to pi is pi/sqrt(a^2 - b^2). The 73% HARD corner of the chapter.",
      },
      {
        name: "Odd and Even Integrands — Symmetric Limits",
        description:
          "Over -a to a, an odd integrand gives zero and an even integrand gives twice the integral from 0 to a. Test the parity first, split a mixed integrand into its odd and even parts, and shift the variable when the interval is symmetric about a point other than 0.",
      },
      {
        name: "King's Property — f(a + b − x) and the f/(f + g) Family",
        description:
          "The integral from a to b of f(x) equals the integral of f(a + b - x). Adding the two forms cancels the awkward part: f/(f + g) over a to b is (b - a)/2, x f(sin x) over 0 to pi is (pi/2) times the integral of f(sin x), and f(x)/(1 + e^x) over -a to a is the integral of f over 0 to a.",
      },
      {
        name: "Modulus and Greatest-Integer Integrands — Split the Interval",
        description:
          "Find where the expression inside changes sign or where [x] steps, split the interval there, and integrate each piece with its own sign or constant. A modulus integrated as if it were the bare expression is the commonest wrong answer.",
      },
    ],
    traps: [
      {
        name: "Substituting without changing limits",
        description:
          "The limits belong to the original variable. Evaluating the new antiderivative at the old limits gives a plausible number, and it is on the option list.",
      },
      {
        name: "Odd integrand, asymmetric limits",
        description:
          "The zero shortcut needs limits of the form -a to a. Applying it to 0 to a, or to -a to 2a, produces zero where the answer is not zero.",
      },
      {
        name: "Signed integral offered as area",
        description:
          "Where the integrand dips below the axis, the integral and the area differ. If the question says area, split at the crossing and take magnitudes.",
      },
      {
        name: "Swapped limits",
        description:
          "Reversing the limits negates the integral. A distractor equal to the correct answer with the opposite sign usually means exactly this.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: [
      "indefinite-integration",
      "applications-of-definite-integral",
      "limits",
    ],
  },

  "determinants-and-matrices": {
    slug: "determinants-and-matrices",
    trigger:
      "A matrix raised to a power, an adjoint or an inverse asked for, or a 3x3 determinant set equal to zero.",
    story: [
      "49 q, 1.10/paper, 49% HARD. Small and expensive — but it carries a compensation the rest of the tail does not: its content is a short list of identities that are memorisable and, unlike most tail material, reusable elsewhere on the paper.",
      "Determinants, Cofactors and the Adjoint Identities is the chapter's hardest corner at 69% HARD across 16 q, and simultaneously its most learnable. Three lines answer most of it directly: A times adj(A) equals |A| times the identity, the determinant of adj(A) is |A| raised to (n - 1), and |kA| is k^n times |A| for an n by n matrix. Those are recall, not derivation.",
      "The transferable idea is the vanishing determinant as a universal degeneracy test. A survey of the bank found it across five to six chapters and roughly 19 to 30 questions, surfacing as concurrency of three lines, collinearity of three points, coplanarity of two lines, the condition for a general second-degree equation to be a pair of lines, and the scalar triple product being zero. Learning to read 'determinant equals zero' as 'these objects are degenerate' pays well outside this chapter.",
      "Systems of Linear Equations and Symmetric, Skew-Symmetric Matrices (8 q, 38% HARD) is half solving and half classification: a non-zero determinant means a unique solution, a zero determinant means either no solution or infinitely many, and telling those two apart is the whole question.",
    ],
    subSkills: [
      {
        name: "Determinants, Cofactors and the Adjoint Identities",
        description:
          "Expansion along a row with cofactors (an alien expansion gives zero), the adjoint as the transposed cofactor matrix, and three recalled identities — A adj(A) = |A| I, |adj A| = |A|^(n-1), |kA| = k^n |A| — that convert the chapter's 69%-HARD corner into one-liners. The A adj(A) = A A^T stem is two equations, one from the off-diagonal and one from the diagonal.",
      },
      {
        name: "Inverse of a Matrix — Adjoint Formula, Products and Verification",
        description:
          "A inverse equals adj(A) divided by |A|, defined only when |A| is non-zero; for an expression like A^2 - 5A or A + B, form the matrix first, then invert. Note the order reversal: (AB) inverse equals B inverse times A inverse, so B inverse = (AB) inverse times A. Unknown entries come from A A inverse = I.",
      },
      {
        name: "Cayley–Hamilton, Matrix Polynomials and Powers",
        description:
          "A 2x2 matrix satisfies A^2 - (trace) A + |A| I = 0, so A inverse = (trace I - A)/|A| gives alpha and beta on sight, a factored polynomial in A gives A inverse in one line, and a high power of A reduces through the cycle at which A^m returns to a scalar times I.",
      },
      {
        name: "Systems of Linear Equations and Symmetric, Skew-Symmetric Matrices",
        description:
          "Solve AX = B by elimination when the coefficients are small integers; a homogeneous system has non-trivial solutions exactly when the determinant vanishes; any square matrix splits into (M + M^T)/2 plus (M - M^T)/2, and an odd-order skew-symmetric matrix is singular.",
      },
    ],
    traps: [
      {
        name: "Scalar multiple of a matrix",
        description:
          "|kA| is k^n |A| for an n by n matrix, not k |A|. For 3x3 that is a factor of k^3, and the option built on k |A| is always present.",
      },
      {
        name: "Determinant of the adjoint",
        description:
          "|adj A| is |A|^(n-1), not |A|. For 3x3 that squares the determinant, so the wrong option is the un-squared value.",
      },
      {
        name: "Assuming commutativity",
        description:
          "AB is not BA in general, so (AB) inverse is B inverse A inverse and (AB) transpose is B transpose A transpose. The un-reversed order is the distractor.",
      },
      {
        name: "Zero determinant read as no solution",
        description:
          "A singular system may still have infinitely many solutions. An option asserting 'no solution' on the strength of |A| = 0 alone is the trap.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["vectors", "line-and-plane", "pair-of-straight-lines"],
  },

  circle: {
    slug: "circle",
    trigger:
      "A second-degree equation with equal coefficients on x squared and y squared, a tangency condition, or a distance measured from a point to a circle.",
    story: [
      "47 q, 1.04/paper, 38% HARD. Two-thirds of it is ordinary coordinate geometry at ordinary cost: Tangent, Locus, and Equation Construction is 27 q at 37%, and Equation of Circle from Diameter, Centre, and Concentric Conditions is 11 q at 27% — the second-softest subtopic in the whole long tail. The expensive corner is Two Circles — Tangency, Common Tangents, and Relative Position, only 9 q but 56% HARD.",
      "The chapter's most reusable move is not calculus. The greatest and least distance from an external point to a circle is the distance to the centre plus or minus the radius, full stop. The identical move answers 'greatest and least modulus of z on a disc' in Complex Numbers and 'maximum perpendicular distance from a point on a circle' here. At 1.8 minutes a question, replacing a calculus optimisation with one distance computation is a time lever, not merely an elegance.",
      "Everything else is centre-and-radius bookkeeping. Read the centre as (-g, -f) and the radius as the square root of g squared plus f squared minus c, then compare a distance against that radius: less than means inside, equal means tangent, greater means outside. That one comparison drives point position, line position and the two-circle classification alike.",
      "The two-circle corner is worth learning as a table rather than as a derivation: compare the distance between the centres against the sum and the absolute difference of the radii, and the number of common tangents (0, 1, 2, 3 or 4) follows from which case you are in.",
    ],
    subSkills: [
      {
        name: "Centre and radius from the general equation",
        description:
          "For x^2 + y^2 + 2gx + 2fy + c = 0 the centre is (-g, -f) and the radius is the square root of (g^2 + f^2 - c). If that quantity is negative there is no real circle — a question that engineers this is testing whether you checked.",
      },
      {
        name: "Constructing the equation",
        description:
          "From centre and radius; from the two endpoints of a diameter using the diameter form; and from a concentric condition, where only the constant term changes.",
      },
      {
        name: "Position of a point and of a line",
        description:
          "Substitute the point into the left-hand side and read the sign; for a line, compare the perpendicular distance from the centre against the radius.",
      },
      {
        name: "Tangent, normal and length of tangent",
        description:
          "Condition of tangency is distance-from-centre equals radius. The length of the tangent from an external point is the square root of the left-hand side evaluated at that point. The normal always passes through the centre.",
      },
      {
        name: "Two circles",
        description:
          "Compare the distance between centres d against r1 + r2 and |r1 - r2|. Externally tangent when d = r1 + r2, internally tangent when d = |r1 - r2|, and the common-tangent count follows.",
      },
      {
        name: "Geometric extremum without calculus",
        description:
          "Greatest distance from an external point equals distance to centre plus radius; least equals distance to centre minus radius. Same move as the Complex Numbers modulus-on-a-disc family.",
      },
    ],
    traps: [
      {
        name: "Radius left unsquare-rooted",
        description:
          "g^2 + f^2 - c is the radius SQUARED. The option quoting it directly as the radius is standard, and it looks right.",
      },
      {
        name: "Centre sign",
        description:
          "The centre is (-g, -f), not (g, f). The sign-flipped centre, and every answer derived from it, is on the option list.",
      },
      {
        name: "Unnormalised coefficients",
        description:
          "If the coefficients of x^2 and y^2 are not 1, divide the whole equation through first. Reading g and f off the un-normalised form corrupts both centre and radius.",
      },
      {
        name: "Tangent count from the wrong case",
        description:
          "Touching internally gives 1 common tangent and touching externally gives 3; intersecting gives 2 and separated gives 4. Confusing the two tangency cases is the commonest error in the 56%-HARD corner.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["complex-numbers", "straight-line", "pair-of-straight-lines"],
  },

  "complex-numbers": {
    slug: "complex-numbers",
    trigger:
      "An i in the expression — a modulus or argument asked for, a cube root of unity, or a locus described by a modulus condition.",
    story: [
      "45 q, 0.98/paper, 31% HARD, and it splits about as cleanly as any chapter in the bank. Modulus and Argument is 18 q at 28% HARD and Locus 12 q at 17% — the softest pages anywhere in the long tail. Algebra with the cube roots of unity is 15 q at 47%. Every PYQ is tagged to one of the three notes pages at /notes/mht-cet-maths/complex-numbers.",
      "That asymmetry IS the strategy. Own the modulus and locus pages and treat the algebra page as opportunistic: under 30% HARD at one question a paper is about as close to free marks as the tail offers, and it is reachable with the identities of Trigonometry - I plus De Moivre's theorem.",
      "The harder page runs largely on omega and on a polynomial evaluated at a complex x. Three facts about the cube roots of unity answer the omega stems: omega cubed is 1, 1 + omega + omega squared is 0, and powers of omega cycle with period 3. The polynomial stems are answered by the minimal quadratic of the given root, never by direct substitution.",
      "Locus questions are circles and lines in disguise — a condition of the form |z - a| = r is a circle of radius r centred at a. That is also where the cross-chapter extremum lives: the greatest and least modulus of z on such a disc is |a| plus or minus r, exactly the Circle chapter's distance-to-centre move, with no calculus and no differentiation of a modulus.",
    ],
    subSkills: [
      {
        name: "Algebra of Complex Numbers — Conjugates, Powers of i and Cube Roots of Unity",
        description:
          "Reduce powers of i modulo 4, rationalise by the conjugate, equate real and imaginary parts, evaluate a polynomial at a complex root via its minimal quadratic, and reduce powers of omega modulo 3.",
      },
      {
        name: "Modulus and Argument — Polar Form, De Moivre and Square Roots",
        description:
          "Moduli multiply and divide, so never expand for a modulus. The argument comes from the ratio of the parts AND the quadrant, never the ratio alone. z = r(cos theta + i sin theta) makes powers routine; |z| + z = a + ib has a closed form.",
      },
      {
        name: "Locus in the Argand Plane — Circles, Lines and Greatest/Least Modulus",
        description:
          "|z - a| = r is a circle; |z - a| = |z - b| is the perpendicular bisector; a purely-imaginary quotient is a circle after rationalising; greatest and least |z| on a disc are |a| + r and |a| - r.",
      },
    ],
    traps: [
      {
        name: "Argument from the ratio alone",
        description:
          "The arctangent of the ratio gives a reference angle. Points in the second and third quadrants need pi added or subtracted, and the un-adjusted angle is always an option.",
      },
      {
        name: "Modulus distributed over a sum",
        description:
          "|z1 z2| = |z1| |z2| is true; |z1 + z2| = |z1| + |z2| is not, except in a degenerate case. The additive version is a planted distractor.",
      },
      {
        name: "Principal argument out of range",
        description:
          "The principal argument lies in (-pi, pi]. A value outside that interval must be shifted by 2 pi, and the unshifted value is offered.",
      },
      {
        name: "Unreduced powers of omega",
        description:
          "omega^4 is omega and omega^5 is omega squared. Leaving a high power unreduced produces an expression that looks unlike any option, which usually means the reduction was skipped.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["circle", "trigonometry-i", "straight-line"],
  },

  "applications-of-definite-integral": {
    slug: "applications-of-definite-integral",
    trigger:
      "The word area, together with two curves — or a curve, an axis and a pair of bounding lines.",
    story: [
      "44 q, 0.94/paper, 32% HARD — but effectively a one-skill chapter. The two area pages — under one curve and between two curves — are 35 of the 44 questions, at 29% HARD. The circle, ellipse and hyperbola page is 9 questions at 44% HARD and needs exactly one standard result learnt cold.",
      "That concentration makes it a cheaper page than its headline suggests. One skill, learned once, answers 35 of 44 — which is the opposite shape from Limits, where 89 questions are spread across seven pages with no cheap one among them.",
      "The skill is not the integration; it is the setup. Find where the curves meet, decide which one is on top over each stretch, decide whether the region is simpler in x or in y, and split the interval wherever the top curve changes. Get that right and what remains is an integral you already know how to do.",
      "It sits directly downstream of Definite Integration (68 q, 1.72/paper) and Indefinite Integration (162 q, 3.41/paper, 52% HARD). If antiderivatives are not fluent this chapter is unreachable; if they are, it is close to free — which is why it belongs late in a plan rather than early.",
    ],
    subSkills: [
      {
        name: "Area Under a Curve — Between a Curve and an Axis",
        description:
          "Sketch, find where the curve meets the axis, and integrate y dx (or x dy for a horizontal strip); where the curve crosses the axis, integrate the modulus piece by piece. Includes the curve-with-unknown-coefficients and the divide-the-area-in-half stems.",
      },
      {
        name: "Area Between Two Curves — Intersections First",
        description:
          "Solve the curves simultaneously for the limits, then integrate upper minus lower (or right minus left for a horizontal strip), splitting wherever the curves swap places. A question is almost never wrong at the integration step and almost always wrong at the intersections.",
      },
      {
        name: "Areas of Circles, Ellipses and Hyperbolas — Sectors, Segments and Standard Integrals",
        description:
          "The integral of sqrt(a^2 - x^2) and sqrt(x^2 - a^2) learnt cold, the sector formula (1/2) r^2 theta, the quarter-ellipse pi ab/4, and symmetry — computing a quarter or half and multiplying — instead of integrating the whole region.",
      },
    ],
    traps: [
      {
        name: "Signed integral offered as area",
        description:
          "A region below the x-axis contributes a negative integral. Area needs the magnitude, or a split at the axis crossing; the signed value is on the option list.",
      },
      {
        name: "A missed intersection",
        description:
          "Two curves may meet at more points than the obvious one. A limit taken from the wrong root produces a clean-looking but wrong number.",
      },
      {
        name: "Curves the wrong way round",
        description:
          "Integrating lower minus upper gives the correct magnitude with a minus sign in front, and that negative is a supplied option.",
      },
      {
        name: "Forcing the wrong variable",
        description:
          "A region bounded on the left and right by curves is one integral in y and two or three in x. Choosing x out of habit turns a one-step question into a three-step one, which at 1.8 minutes is the real cost.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["definite-integration", "indefinite-integration", "circle"],
  },

  "pair-of-straight-lines": {
    slug: "pair-of-straight-lines",
    trigger:
      "A homogeneous second-degree expression in x and y, or a general second-degree equation asked whether it represents two straight lines.",
    story: [
      "45 q, 1.00/paper, 40% HARD — and the 40% overstates how hard it is to PREPARE. This is the most closed chapter on the paper: essentially every question reduces to reading a, h and b out of a combined equation and applying one item from a short list of conditions. The two subtopics behave alike (Combined Equation and Condition, 28 q at 39%; Angle, Distance, and Geometry of Pair, 17 q at 41%), so there is no cherry-picking, but equally no surprise.",
      "The conditions are the cross-chapter angle family speaking this chapter's dialect. Perpendicularity is a + b = 0 here, where straight lines say m1 times m2 equals -1, vectors say the dot product is zero, and Line and Plane says it through the direction vectors and the plane normal. A survey of the bank puts perpendicularity at 83 q across 7 chapters and the parent idea, angle between two objects, at 87 q across 7 — so the formula learned here is being tested four more times under other names.",
      "The other reusable piece is the degeneracy test. A general second-degree equation represents a pair of lines exactly when a particular 3x3 determinant vanishes — the same universal condition that shows up as concurrency of three lines, collinearity of three points, coplanarity, and a zero scalar triple product, measured across five to six chapters and roughly 19 to 30 questions.",
      "Practical upshot: this is the tail chapter with the best ratio of preparation time to reliability. A checklist of six conditions, drilled once, holds up across all 45 questions.",
    ],
    subSkills: [
      {
        name: "Reading a, h and b",
        description:
          "For ax^2 + 2hxy + by^2 the coefficient of xy is 2h, so h is HALF of what is printed. Every other formula in the chapter depends on getting this right.",
      },
      {
        name: "Condition for real, distinct lines",
        description:
          "h^2 greater than ab gives two distinct real lines, h^2 equal to ab gives coincident lines, and h^2 less than ab gives no real lines (only the origin).",
      },
      {
        name: "Separating the pair",
        description:
          "Factorise the homogeneous expression into two linear factors, or solve it as a quadratic in y/x to get the two slopes. The slopes satisfy sum = -2h/b and product = a/b.",
      },
      {
        name: "Angle between the pair",
        description:
          "tan theta is the modulus of 2 times the square root of (h^2 - ab), all over (a + b). Perpendicular exactly when a + b = 0; coincident exactly when h^2 = ab.",
      },
      {
        name: "The general second-degree case",
        description:
          "Before applying any homogeneous result to an equation carrying x, y or constant terms, check the 3x3 determinant condition. If it does not vanish, the equation is a conic, not a pair.",
      },
      {
        name: "Distances and bisectors",
        description:
          "Distance between the two lines of a parallel pair, and the combined equation of the angle bisectors of the pair. Short, formula-driven, and the whole of the smaller subtopic.",
      },
    ],
    traps: [
      {
        name: "2h read as h",
        description:
          "The single commonest slip in the chapter. Using the printed xy coefficient as h doubles it, and every downstream answer — angle, condition, slopes — lands on a supplied wrong option.",
      },
      {
        name: "Perpendicularity confused with h = 0",
        description:
          "a + b = 0 is the perpendicular condition. h = 0 only means the pair is symmetric about the axes, which is a different statement entirely.",
      },
      {
        name: "Coincident read as non-existent",
        description:
          "h^2 = ab gives two coincident real lines, not zero lines. The option asserting no lines exist is the trap.",
      },
      {
        name: "Homogeneous formula on a general equation",
        description:
          "Applying the angle or perpendicularity condition to an equation with linear terms, without first verifying the determinant condition, answers a question that was never asked.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["straight-line", "determinants-and-matrices", "circle"],
  },

  "permutations-and-combinations": {
    slug: "permutations-and-combinations",
    trigger:
      "A count of ways — arrangements, selections, seatings, handshakes, or the lines and triangles determined by a set of points.",
    story: [
      "42 q, 0.98/paper, 40% HARD, and it is the least mechanical chapter on the paper. No formula rescues a misread constraint: once the model is right the arithmetic is trivial, and when the model is wrong the arithmetic is worthless. That is why it is the single question most likely to eat five minutes of a 90-minute paper. Every PYQ is tagged to one of the five notes pages at /notes/mht-cet-maths/permutations-and-combinations.",
      "The constraint questions — arrangements (10 q, 50% HARD), selections (7 q, 43%) and circular seatings (6 q, 83%) — run on a short recurring list: objects that stay together, objects never together, fixed positions, repeated letters, at least and at most. Each has one standard handling. Learning the handlings is far more productive than grinding assorted problems.",
      "Because there is NO NEGATIVE MARKING, the discipline here is a time cap rather than a skip decision. Give the question ninety seconds; if the model has not resolved by then, mark the option whose order of magnitude matches your partial reasoning and move on. This is the chapter where that rule earns the most, because the downside of persisting is two or three other questions.",
      "The cheaper corners are the identities page (8 q, none HARD) and the numbers-and-figures page (11 q, 36%): digit counts with a leading-zero exclusion, divisibility by the last digits or the digit sum, handshakes and diagonals as an nC2 equation, and triangles from points with the collinear picks subtracted. Three or four closed results cover them, so they are worth banking even though each is small.",
    ],
    subSkills: [
      {
        name: "Fundamental Principle, nPr and nCr — Definitions and Identities",
        description:
          "Multiply stages, add alternatives; nPr is nCr times r factorial; symmetry, Pascal's rule and the ratio of consecutive coefficients settle every equation-style stem; nPr and nCr are defined only for whole numbers n >= r >= 0.",
      },
      {
        name: "Arrangements with Constraints — Together, Never Together, Fixed Positions and Repeated Letters",
        description:
          "Divide by k! per repeated letter; glue a together-group into a block and permute inside it; keep items apart by complement or by the gaps; fill a fixed position first and LIST the adjacent pairs that remain.",
      },
      {
        name: "Selections with Conditions — At Least, At Most, Included and Excluded",
        description:
          "List the cases for at least and at most and add the products of nCr terms; subtract the forbidden selection when it is one simple case; multiply by the team size when a captain is chosen after the team.",
      },
      {
        name: "Circular Arrangements",
        description:
          "n distinct people around a table give (n - 1)!; girls apart go into the b gaps between b boys (not b + 1); a glued block of k among n leaves (n - k)! times k!; alternating seats fix the frame.",
      },
      {
        name: "Counting Numbers and Geometric Figures — Digits, Divisibility, Points and Polygons",
        description:
          "No leading zero; divisibility by 3 through the digit sum and by 25 through the last two digits; gcd conditions via inclusion-exclusion; nC2 handshakes and diagonals; nC3 triangles minus the collinear picks.",
      },
    ],
    traps: [
      {
        name: "Order counted where it does not matter",
        description:
          "Using nPr for a selection inflates the answer by exactly r factorial. Both values are on the option list, which is why the inflated one is so easy to accept.",
      },
      {
        name: "Block forgotten from the inside",
        description:
          "Grouping objects that must stay together and then failing to permute within the block undercounts by the factorial of the block size.",
      },
      {
        name: "At least one, computed directly",
        description:
          "'At least one' is total minus none. Adding up the cases directly is slower and usually double-counts overlapping cases; the direct-sum answer is a supplied distractor.",
      },
      {
        name: "Circular counted as linear",
        description:
          "n factorial instead of (n - 1) factorial for a round table. The linear value is offered, and it is exactly n times too large.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["probability-distribution", "binomial-distribution"],
  },
};
