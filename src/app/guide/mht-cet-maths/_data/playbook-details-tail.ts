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
      "93 q, 2.08/paper, 56% HARD — the hardest chapter in the subject by rate. It is also the one chapter in the tail with nowhere to hide: Continuity at a Point runs 57% HARD across 47 q and Limit Evaluation Techniques runs 54% across 46 q, so both halves are above the paper's overall 38.4% HARD line. There is no cheap corner to cherry-pick.",
      "The two halves ask for different work. Continuity at a Point is really equation-solving wearing a calculus costume: write the left-hand limit, the right-hand limit and the value at the point, set all three equal, and solve for the one or two unknowns. It is the more mechanical of the two despite carrying the higher HARD rate, and it is where a student with a reliable method banks the chapter's marks.",
      "Limit Evaluation is recognition, not computation. Almost every question is one of a short list of standard forms in disguise, and the win is deciding within about fifteen seconds which tool applies — factorise, rationalise, divide by the highest power, or quote a standard limit. At 1.8 minutes a question, a limit you have to experiment on has already cost you a question elsewhere.",
      "Practical consequence: give this chapter a hard time cap. Two questions a paper at 56% HARD is four marks that will not come cheaply, and with no negative marking an unresolved limit is still worth a marked option rather than a blank.",
    ],
    subSkills: [
      {
        name: "The standard limits, cold",
        description:
          "sin x / x and tan x / x tending to 1, (a^x - 1)/x tending to ln a, (1 + x)^(1/x) tending to e, and (x^n - a^n)/(x - a) tending to n a^(n-1). Most Limit Evaluation questions are one of these after one algebraic step.",
      },
      {
        name: "Indeterminate-form triage",
        description:
          "Name the form first: 0/0, infinity/infinity, infinity minus infinity, 0 times infinity, or 1 raised to infinity. The form dictates the method, and misnaming it is what turns a 40-second question into a four-minute one.",
      },
      {
        name: "Algebraic reduction",
        description:
          "Factorise and cancel for 0/0 in polynomials; rationalise when a surd sits in numerator or denominator; divide numerator and denominator by the highest power of x for limits at infinity.",
      },
      {
        name: "One-sided limits and the continuity test",
        description:
          "Continuity at x = a needs three things to agree: the left-hand limit, the right-hand limit and f(a). Test all three separately — a function can have a limit at a point and still be discontinuous there.",
      },
      {
        name: "Parameter hunting",
        description:
          "Given a piecewise f with unknowns a and b, continuity gives one equation per junction point. Two unknowns need two junctions, or one junction plus a differentiability condition. Set up the equations before touching algebra.",
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

  "trigonometry-ii": {
    slug: "trigonometry-ii",
    trigger:
      "A triangle labelled with sides a, b, c and angles A, B, C — or an inverse-trig expression turning up inside a chapter you were not expecting it in.",
    story: [
      "90 q, 2.08/paper, 49% HARD. The chapter is dominated by Properties of Triangles — Sine/Cosine Rules and Projection, 52 of the 90 questions at 42% HARD. That block is both the largest and the least punishing part of the chapter, and it is where preparation should go first.",
      "The other two subtopics are small and expensive: Inverse Trigonometry sits at 52% HARD across 21 q, and Trigonometric Identities and Compound/Half-Angle Formulas at 65% HARD across 17 q — the second-highest HARD rate of any subtopic in the long tail. With the whole chapter running about two questions a paper, that 17-q corner is the honest place to give a question your best guess and move on.",
      "The measured taxonomy overlap matters here more than anywhere else on the paper. Inverse trigonometry is filed BOTH as the 21-q subtopic in this chapter and as its own 73-q chapter, so the bank holds 94 inverse-trig questions in two places. Drill only the standalone chapter and you skip 21 of them — and they are the harder 21, at 52% against the standalone chapter's 37%.",
      "The triangle work is closed and reusable: sine rule, cosine rule, projection formula, and the area forms. Recognition is most of the skill — decide from what you are given (three sides, two sides and the included angle, two angles and a side) which rule opens the question.",
    ],
    subSkills: [
      {
        name: "Sine rule and circumradius",
        description:
          "a / sin A = b / sin B = c / sin C = 2R. The 2R is the half most often dropped, and it is what turns a triangle question into a circumradius question.",
      },
      {
        name: "Cosine rule, both directions",
        description:
          "Use it forwards to find a side from two sides and the included angle, and backwards, as cos A = (b^2 + c^2 - a^2) / 2bc, to find an angle from three sides.",
      },
      {
        name: "Projection formula",
        description:
          "a = b cos C + c cos B and its two cousins. Cheap to memorise and it collapses a family of 'prove or simplify' questions in one line.",
      },
      {
        name: "Area and half-angle forms",
        description:
          "Area = (1/2) ab sin C, Heron's form with the semi-perimeter s, and the relations linking area to the inradius r and circumradius R. These are the bridge between a triangle question and a circle question.",
      },
      {
        name: "Inverse-trig block",
        description:
          "Principal-value ranges, the complementary identities, and the sum formulas with their side conditions. Shared verbatim with the Inverse Trigonometric Functions playbook — learn it once, it answers 94 questions across the two chapters.",
      },
      {
        name: "Compound and half-angle identities",
        description:
          "sin(A plus or minus B), cos(A plus or minus B), tan(A plus or minus B), and the half-angle and multiple-angle forms. This is the chapter's 65% HARD corner and the last thing to reach.",
      },
    ],
    traps: [
      {
        name: "The overlap itself",
        description:
          "Treating this chapter as triangles-only. A fifth of its questions are inverse trigonometry, and a study plan built on the chapter name alone walks past them.",
      },
      {
        name: "R instead of 2R",
        description:
          "a / sin A equals 2R, not R. The distractor is exactly half or exactly double the correct circumradius.",
      },
      {
        name: "The ambiguous case",
        description:
          "Two sides and a non-included angle can determine two different triangles. The option offering a single answer where two are valid — or the one quoting the obtuse solution when only the acute is admissible — is the planted one.",
      },
      {
        name: "Degrees where radians are meant",
        description:
          "Principal values in the inverse-trig subtopic are stated in radians. An option set mixing pi/6 with 30 is signalling this trap.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["inverse-trigonometric-functions", "trigonometry-i", "vectors"],
  },

  "inverse-trigonometric-functions": {
    slug: "inverse-trigonometric-functions",
    trigger:
      "An expression built from arcsin, arccos or arctan — a sum to be collapsed, an equation to be solved, or a principal value to be named.",
    story: [
      "73 q in a single subtopic, 2.04/paper, 37% HARD. Being one undivided block means there is nothing to cherry-pick, but it also means the chapter has one syllabus rather than three: identities, equations, principal values and sums, all drawn from the same short closed list. At 37% HARD it is materially cheaper than Limits at 56% or Trigonometry - II at 49%.",
      "It is one of the few chapters moving in the right direction. Its weightage has RISEN from 1.66 lifetime to 2.04 recent — the opposite of Trigonometry - I, which has fallen from 2.20 to 1.85. A student prioritising from lifetime frequency alone under-invests here and over-invests there.",
      "Add the overlap and the chapter is bigger than its headline. Trigonometry - II carries a further 21 inverse-trig questions at 52% HARD, so the real target is 94 questions. This chapter is the softer 73 of them; treat the Trigonometry - II subtopic as the hard tail of the same topic rather than as separate material.",
      "The work is almost entirely about staying inside the principal branch. The algebra is short; the marks are lost by producing a technically valid value that lies outside the allowed range.",
    ],
    subSkills: [
      {
        name: "Principal-value ranges, cold",
        description:
          "arcsin lands in [-pi/2, pi/2], arccos in [0, pi], arctan in (-pi/2, pi/2). Nothing else in this chapter is safe until these three are automatic.",
      },
      {
        name: "Complementary identities",
        description:
          "arcsin x + arccos x = pi/2, arctan x + arccot x = pi/2, arcsec x + arccosec x = pi/2. These collapse a whole family of sum questions to a single constant.",
      },
      {
        name: "Sum and difference of arctan",
        description:
          "arctan x + arctan y = arctan((x + y)/(1 - xy)), valid only while xy is less than 1. Outside that, add or subtract pi to land back in the principal branch — the side condition is the point of the formula, not a footnote.",
      },
      {
        name: "Converting between inverse functions",
        description:
          "Rewriting arcsin as arctan, or arccos as arcsin, using a right triangle drawn from the given ratio. This is what makes a mixed-function expression collapse.",
      },
      {
        name: "Solving inverse-trig equations",
        description:
          "Take the appropriate trig function of both sides, solve the resulting algebraic equation, then discard every root whose corresponding value falls outside the principal range. The discard step is the marked one.",
      },
    ],
    traps: [
      {
        name: "The arctan sum without its condition",
        description:
          "The unadjusted arctan((x + y)/(1 - xy)) is always offered. When xy exceeds 1 the true answer differs from it by pi, and the raw value is the distractor.",
      },
      {
        name: "Range violation",
        description:
          "An algebraically correct value outside the principal branch. Both it and the corrected value appear in the option set; only one lies in range.",
      },
      {
        name: "arcsin(sin x) assumed to be x",
        description:
          "True only for x in [-pi/2, pi/2]. Outside that range the answer is pi - x or x minus a multiple of 2 pi, and the option reading plain x is the trap.",
      },
      {
        name: "Domain of the argument ignored",
        description:
          "arcsin and arccos accept only inputs in [-1, 1]. A question engineered so that a careless substitution produces an argument outside that range is testing whether you checked.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["trigonometry-ii", "trigonometry-i", "differentiation"],
  },

  "trigonometry-i": {
    slug: "trigonometry-i",
    trigger:
      "An identity to simplify or prove, a general solution of a trigonometric equation, or a compound-angle expansion.",
    story: [
      "99 q lifetime — the largest chapter in the long tail by raw count — but only 1.85/paper on recent shifts. That gap is the story: its weightage has FALLEN from 2.20 to 1.85, the largest decline of any live chapter. Preparing from lifetime frequency over-invests here, and the correction is to hold it at the tail's normal budget rather than treating it as a big chapter.",
      "37% HARD, and 77 of the 99 questions sit in a single subtopic (Trig Identities, Compound Angle, and Equations) at 36% — a large and comparatively soft block by long-tail standards, where Limits runs 56% and Trigonometry - II 49%.",
      "The bank files triangle work under two chapter headings: Properties of Triangle here at 22 q, and Properties of Triangles — Sine/Cosine Rules and Projection in Trigonometry - II at 52 q. A drill link to one covers only part of the material, so plan both together.",
      "Beyond its own marks, this chapter is infrastructure. The identities feed trigonometric limits, the substitution and trigonometric-integral work in Indefinite Integration (159 q, 3.35/paper, 51% HARD), and the polar form in Complex Numbers. Weak identities are felt three chapters away, which is why it stays on the plan even as its own weightage falls.",
    ],
    subSkills: [
      {
        name: "The identity toolkit",
        description:
          "Pythagorean, reciprocal and quotient identities, plus the standard values at 0, 30, 45, 60 and 90 degrees. Everything downstream assumes these are instant.",
      },
      {
        name: "Compound angles",
        description:
          "sin(A plus or minus B), cos(A plus or minus B), tan(A plus or minus B). Note that cosine flips the sign: cos(A + B) = cos A cos B - sin A sin B.",
      },
      {
        name: "Multiple and half angles",
        description:
          "The double-angle forms, the three expressions for cos 2A, the half-angle substitutions, and sum-to-product and product-to-sum conversions. Choosing the right one of the three cos 2A forms is usually what makes an expression collapse.",
      },
      {
        name: "General solutions",
        description:
          "sin x = sin a gives x = n pi + (-1)^n a; cos x = cos a gives x = 2 n pi plus or minus a; tan x = tan a gives x = n pi + a. Learn which family each equation belongs to before solving.",
      },
      {
        name: "Triangle relations",
        description:
          "Sine, cosine and projection rules, shared with Trigonometry - II. Same content, second home.",
      },
    ],
    traps: [
      {
        name: "Principal solution offered for a general one",
        description:
          "The question asks for the general solution and the distractor gives the principal value, or the reverse. Read the demand before solving.",
      },
      {
        name: "Roots lost by dividing",
        description:
          "Cancelling a common trigonometric factor discards every root that makes that factor zero. Factorise and set each factor to zero instead — the option with fewer roots is the planted one.",
      },
      {
        name: "Cosine compound-angle sign",
        description:
          "cos(A + B) carries a minus and cos(A - B) a plus, which is the opposite of the sine formulas. The sign-swapped option is standard.",
      },
      {
        name: "Extraneous roots from squaring",
        description:
          "Squaring both sides to remove a surd or a mixed expression introduces roots that do not satisfy the original equation. Every root must be substituted back.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["trigonometry-ii", "inverse-trigonometric-functions", "limits"],
  },

  "definite-integration": {
    slug: "definite-integration",
    trigger:
      "An integral carrying numeric limits — especially symmetric limits, limits running 0 to a, or an absolute value or piecewise expression inside.",
    story: [
      "73 q, 1.85/paper, 45% HARD, and the chapter splits into a recognition half and a grind half. Symmetry, King's Property and Absolute Value is 42 q at 38% HARD; Substitution and Standard Form is 31 q at 55%.",
      "The 42-q half is the highest-leverage recognition anywhere in the calculus block. Once the property is spotted the question collapses in a single line — an odd integrand over symmetric limits is zero with no antiderivative computed at all, and King's property turns an unintegrable-looking expression into twice something trivial or into a constant. At 1.8 minutes a question, that is worth more than the two marks it scores.",
      "The other half is ordinary integration with limits attached, which makes it Indefinite Integration (159 q, 3.35/paper, 51% HARD) plus one extra step. Its 55% HARD rate is real, but so is the transfer: everything invested in the cornerstone integration chapter is paid back here, so this half needs almost no separate preparation.",
      "Order of attack follows directly: scan every definite integral for a property BEFORE reaching for a technique. Ten seconds of looking saves a minute of integrating on roughly three of every five questions in this chapter.",
    ],
    subSkills: [
      {
        name: "Standard-form evaluation with limits",
        description:
          "Integrate, then evaluate at the upper limit minus the lower. When you substitute, change the limits to the new variable rather than back-substituting at the end — it is faster and removes a whole class of error.",
      },
      {
        name: "Even and odd over symmetric limits",
        description:
          "Over -a to a, an odd integrand gives zero and an even integrand gives twice the integral from 0 to a. Test the parity of the integrand first, before anything else.",
      },
      {
        name: "King's property",
        description:
          "The integral from a to b of f(x) equals the integral of f(a + b - x). Adding the two forms usually cancels the awkward part and leaves a constant times the length of the interval.",
      },
      {
        name: "Absolute value and piecewise integrands",
        description:
          "Find where the expression inside changes sign, split the interval there, and integrate each piece with the correct sign. A modulus integrated as if it were the bare expression is the commonest wrong answer.",
      },
      {
        name: "Periodicity and interval-shifting properties",
        description:
          "For a periodic integrand, the integral over a whole number of periods reduces to a multiple of the integral over one period, and the starting point of the interval does not matter.",
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
      "50 q, 1.12/paper, 48% HARD. Small and expensive — but it carries a compensation the rest of the tail does not: its content is a short list of identities that are memorisable and, unlike most tail material, reusable elsewhere on the paper.",
      "Adjoint, Determinant, and A·adj(A) Identity is the chapter's hardest corner at 64% HARD across 14 q, and simultaneously its most learnable. Three lines answer most of it directly: A times adj(A) equals |A| times the identity, the determinant of adj(A) is |A| raised to (n - 1), and |kA| is k^n times |A| for an n by n matrix. Those are recall, not derivation.",
      "The transferable idea is the vanishing determinant as a universal degeneracy test. A survey of the bank found it across five to six chapters and roughly 19 to 30 questions, surfacing as concurrency of three lines, collinearity of three points, coplanarity of two lines, the condition for a general second-degree equation to be a pair of lines, and the scalar triple product being zero. Learning to read 'determinant equals zero' as 'these objects are degenerate' pays well outside this chapter.",
      "System of Linear Equations and Symmetric Matrices (9 q, 44% HARD) is classification, not solving: a non-zero determinant means a unique solution, a zero determinant means either no solution or infinitely many, and telling those two apart is the whole question.",
    ],
    subSkills: [
      {
        name: "Determinant evaluation and properties",
        description:
          "Expansion along the sparsest row or column, plus the row and column operations that create zeros. Extracting a common factor from a row multiplies the determinant by that factor once, not n times.",
      },
      {
        name: "The adjoint identities",
        description:
          "A adj(A) = adj(A) A = |A| I; |adj A| = |A|^(n-1); adj(adj A) = |A|^(n-2) A for an invertible n by n matrix. Pure recall, and it converts several 64%-HARD questions into one-liners.",
      },
      {
        name: "Inverse and its algebra",
        description:
          "A inverse equals adj(A) divided by |A|, defined only when |A| is non-zero. Note the order reversal: (AB) inverse equals B inverse times A inverse.",
      },
      {
        name: "Cayley-Hamilton and matrix polynomials",
        description:
          "A matrix satisfies its own characteristic equation, which lets a high power of A be reduced to a linear combination of A and I. This is the standard route for A^n questions.",
      },
      {
        name: "Consistency of a linear system",
        description:
          "Compute the determinant of the coefficient matrix first. Non-zero means a unique solution; zero sends you to the numerator determinants to decide between inconsistent and infinitely many.",
      },
      {
        name: "Determinant as a degeneracy test",
        description:
          "Recognise the same 3x3-equals-zero condition when it appears as concurrency, collinearity, coplanarity or a scalar triple product. One computation, four chapter dialects.",
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
      "46 q, 1.00/paper, 33% HARD, and it splits about as cleanly as any chapter in the bank. Modulus, Argument, and Polar Form is 22 q at 18% HARD — the softest subtopic anywhere in the long tail. Algebraic Equations, Locus, and Cube Roots is 24 q at 46%.",
      "That asymmetry IS the strategy. Own the polar half and treat the other as opportunistic: 18% HARD at one question a paper is about as close to free marks as the tail offers, and it is reachable with the identities of Trigonometry - I plus De Moivre's theorem.",
      "The harder half runs largely on omega. Three facts about the cube roots of unity answer most of it: omega cubed is 1, 1 + omega + omega squared is 0, and powers of omega cycle with period 3 so any exponent can be reduced modulo 3. That is recall, not technique, which makes even the 46% corner tractable.",
      "Locus questions are circles and lines in disguise — a condition of the form |z - a| = r is a circle of radius r centred at a. That is also where the cross-chapter extremum lives: the greatest and least modulus of z on such a disc is |a| plus or minus r, exactly the Circle chapter's distance-to-centre move, with no calculus and no differentiation of a modulus.",
    ],
    subSkills: [
      {
        name: "Algebra and the conjugate",
        description:
          "Add, multiply, and rationalise a denominator by multiplying by the conjugate. z times its conjugate equals |z| squared — the identity that removes almost every fraction in the chapter.",
      },
      {
        name: "Modulus and argument",
        description:
          "|z| is the square root of (real part squared plus imaginary part squared). The argument comes from the ratio of the parts AND the quadrant of the point, never from the ratio alone.",
      },
      {
        name: "Polar form and De Moivre",
        description:
          "Write z as r(cos theta + i sin theta), then z^n is r^n (cos n theta + i sin n theta). This is what makes high powers and nth roots routine instead of expansive.",
      },
      {
        name: "Cube roots of unity",
        description:
          "omega^3 = 1 and 1 + omega + omega^2 = 0. Reduce every exponent modulo 3 first, then use the sum identity to collapse what remains.",
      },
      {
        name: "Locus from a modulus or argument condition",
        description:
          "|z - a| = r is a circle; |z - a| = |z - b| is the perpendicular bisector of the segment joining a and b; a fixed argument is a ray. Translate the condition into geometry before doing any algebra.",
      },
      {
        name: "Extremum on a disc",
        description:
          "Greatest and least |z| subject to |z - a| = r are |a| + r and |a| - r. Recognise it and the question is one subtraction, not an optimisation.",
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
      "47 q, 1.00/paper, 36% HARD — but effectively a one-skill chapter. Area Bounded by Curves, Axes, and Lines is 43 of the 47 questions, at 33% HARD. The remaining subtopic is 4 questions at 75% HARD and does not justify a place in a study plan.",
      "That concentration makes it a cheaper page than its headline suggests. One skill, learned once, answers 43 of 47 — which is the opposite shape from Limits, where 93 questions are split across two equally hard halves with no cheap entry point.",
      "The skill is not the integration; it is the setup. Find where the curves meet, decide which one is on top over each stretch, decide whether the region is simpler in x or in y, and split the interval wherever the top curve changes. Get that right and what remains is an integral you already know how to do.",
      "It sits directly downstream of Definite Integration (73 q, 1.85/paper) and Indefinite Integration (159 q, 3.35/paper, 51% HARD). If antiderivatives are not fluent this chapter is unreachable; if they are, it is close to free — which is why it belongs late in a plan rather than early.",
    ],
    subSkills: [
      {
        name: "Sketch and intersections",
        description:
          "Draw the region, however roughly, and solve the curves simultaneously for the limits. A question is almost never wrong at the integration step and almost always wrong at this one.",
      },
      {
        name: "Choosing the strip",
        description:
          "A vertical strip integrates in x and needs the curves as y in terms of x; a horizontal strip integrates in y. Pick the one that avoids splitting the region.",
      },
      {
        name: "Top minus bottom",
        description:
          "The integrand is upper curve minus lower curve over the interval, or right curve minus left for a horizontal strip. Order matters: reversing it gives the negative of the area.",
      },
      {
        name: "Splitting at a crossover",
        description:
          "Where the curves swap places inside the interval, break the integral at the crossing point and take each piece with its own top curve.",
      },
      {
        name: "Standard regions and symmetry",
        description:
          "Circle, parabola, ellipse and line combinations recur. Exploiting symmetry — computing a quarter or half and multiplying — is usually faster than integrating the whole region.",
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
      "43 q, 1.00/paper, 42% HARD, and it is the least mechanical chapter on the paper. No formula rescues a misread constraint: once the model is right the arithmetic is trivial, and when the model is wrong the arithmetic is worthless. That is why it is the single question most likely to eat five minutes of a 90-minute paper.",
      "Selection and Arrangement with Constraints carries 33 of the 43 questions at 42% HARD. The constraints themselves are a short recurring list — certain objects must stay together, certain objects must never be together, some positions are fixed, repetition is or is not allowed — and each has one standard handling. Learning the four handlings is far more productive than grinding assorted problems.",
      "Because there is NO NEGATIVE MARKING, the discipline here is a time cap rather than a skip decision. Give the question ninety seconds; if the model has not resolved by then, mark the option whose order of magnitude matches your partial reasoning and move on. This is the chapter where that rule earns the most, because the downside of persisting is two or three other questions.",
      "Counting and Geometric Applications (10 q, 40% HARD) is the narrower and more mechanical corner: lines and triangles from n points with collinear subsets subtracted, diagonals of a polygon, and similar. Three or four closed results cover it, so it is worth banking even though the subtopic is small.",
    ],
    subSkills: [
      {
        name: "Fundamental counting principle",
        description:
          "Multiply when choices happen in sequence and every stage is required; add when the cases are alternatives that cannot both happen. Deciding add-versus-multiply is the first and most consequential step.",
      },
      {
        name: "Permutation versus combination",
        description:
          "Order matters means nPr; order does not means nCr; and nPr is nCr times r factorial. Almost every over-count in this chapter is a permutation used where a combination belonged.",
      },
      {
        name: "Repetition and identical objects",
        description:
          "Arrangements of n objects of which some are identical divide n factorial by the factorials of the repeat counts. Arrangements with unlimited repetition over r places from n symbols are n^r.",
      },
      {
        name: "Constraint handling",
        description:
          "Objects that must stay together: glue them into one block, arrange the blocks, then permute inside the block. Objects that must never be together: arrange the rest first, then place them in the gaps. Fixed positions: fill those first and count what is left.",
      },
      {
        name: "Circular arrangements",
        description:
          "n distinct objects around a circle give (n - 1) factorial, because rotations are the same arrangement. Halve it again when reflections also count as the same, such as an unmarked necklace.",
      },
      {
        name: "Geometric counting",
        description:
          "From n points with no three collinear: nC2 lines and nC3 triangles. When m of them ARE collinear, subtract mC2 lines and mC3 triangles and add one line back.",
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
