/**
 * Deep-dive content for the 11 CORNERSTONE + QUICK-WIN playbooks of
 * /guide/mht-cet-maths/playbooks/{slug}.
 *
 * Split from the long-tail file because the 22 chapter deep-dives are authored
 * in two part-files; both import PlaybookDetail from ./types so neither has to
 * import the module that merges them (that would be a cycle).
 *
 * Every statistic below comes from the shipped bank measurement: 2,228 PUBLIC
 * PYQs across 45 shifts, 2021-2025. Chapter-level figures (q, q/paper, %HARD)
 * match playbooks.ts; subtopic figures are the per-subtopic q and %HARD from
 * the same measurement. Nothing here is estimated.
 *
 * exampleQuestionIds is deliberately empty everywhere — inventing UUIDs ships
 * dead links, and the drill CTAs already resolve through the taxonomy.
 */

import type { PlaybookDetail } from "./types";

export const CORE_PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  // CORNERSTONE

  "line-and-plane": {
    slug: "line-and-plane",
    trigger:
      "Anything stated in three coordinates: a line through two points, a plane through a normal, a distance, an angle, a foot of perpendicular, or two lines you are asked to test for intersection.",
    story: [
      "205 q at 4.96 per paper makes this the single heaviest chapter on recent MHT-CET papers — roughly ten marks, every time. It is also 42% HARD, and the important structural fact is that the HARD does not concentrate. Seven subtopics, and the top two carry only 47% of the chapter's HARD between them. Compare that with Vectors, where two subtopics carry 74%. There is no cherry-pick available here: you own the whole chapter or you lose ten marks.",
      "The cheapest corner is Line — Equation, Direction Cosines, and Vector Form: 29 q at 21% HARD, the lowest rate in the chapter and the foundation everything else stands on. The most expensive is Intersection, Coplanarity, and Skew Lines at 62% HARD, which is exactly where a student who learned formulas without learning the geometry falls over. Learn in that order, not in book order.",
      "Almost every question in this chapter is one of two moves wearing different clothes: an ANGLE between two objects, or a DISTANCE from a point to an object. Perpendicularity is just angle 90 and parallelism is just angle 0 — the survey found the angle idea running through 87 q across 7 chapters and perpendicularity through 83 q across 7. Once you see that, the seven subtopics stop being seven separate syllabi.",
      "At 1.8 minutes a question you cannot afford to derive a standard result on the paper. The direction-ratio, normal-form, distance and coplanarity formulas have to be automatic, and the 3-D picture has to be sketchable in ten seconds.",
    ],
    subSkills: [
      {
        name: "Line — equation, direction cosines, and vector form",
        description:
          "Write a line three ways (vector, symmetric, parametric) and move between them without thinking. Direction ratios are any proportional triple; direction cosines are the normalised ones, and their squares sum to 1. 29 q at 21% HARD — the cheapest block in the chapter and the one everything else assumes.",
      },
      {
        name: "Plane — equation, normal, and construction",
        description:
          "Build a plane from a normal and a point, from three points, or from a line plus a point. The normal vector IS the plane for exam purposes. 47 q at 38% HARD, the largest subtopic here.",
      },
      {
        name: "Angles — line, plane, and direction conditions",
        description:
          "Line-to-line uses the two direction vectors; plane-to-plane uses the two normals; line-to-plane uses direction against normal and then takes the complement — this is where the sine-versus-cosine slip lives. 29 q at 45% HARD.",
      },
      {
        name: "Distances in 3-D",
        description:
          "Point to plane, point to line, and the shortest distance between two skew lines. Three different formulas with one shared shape: project a connecting vector onto the perpendicular direction, then take the modulus. 33 q at 42% HARD.",
      },
      {
        name: "Foot of perpendicular, image, and projection",
        description:
          "Drop a perpendicular by parametrising the line, imposing the perpendicularity condition, and solving for the parameter. The image is the foot doubled, not the foot. 19 q at 53% HARD.",
      },
      {
        name: "Intersection, coplanarity, and skew lines",
        description:
          "Two lines in space usually miss each other. Coplanarity is a vanishing 3x3 determinant built from the two directions and the joining vector — the same degeneracy test that appears as concurrency in 2-D and as scalar triple product zero in Vectors. 37 q at 62% HARD, the hardest cell in the chapter.",
      },
      {
        name: "Tetrahedron geometry — centroid, volume, and vertices",
        description:
          "A small, closed block: centroid as the average of four vertices, volume as one sixth of a scalar triple product. 11 q at 27% HARD, so it is cheap once the triple product is already yours.",
      },
    ],
    traps: [
      {
        name: "Direction ratios used as direction cosines",
        description:
          "A distractor built by plugging unnormalised ratios straight into a cosine formula. If the triple's squares do not sum to 1, it is not a set of direction cosines. Check before you use it.",
      },
      {
        name: "Line-to-plane angle given as the direction-normal angle",
        description:
          "The angle between a line and a plane is the COMPLEMENT of the angle between the line's direction and the plane's normal. The wrong option is the uncomplemented value, and it is always present.",
      },
      {
        name: "Foot of perpendicular offered where the image was asked",
        description:
          "The image sits twice as far along the same perpendicular. Both points appear as options, and the foot is the more tempting-looking of the two because it comes out of the algebra first.",
      },
      {
        name: "Skew treated as intersecting",
        description:
          "Solving two of the three parametric equations always produces a parameter pair. The third equation is what tells you whether the lines actually meet, and skipping it turns a skew pair into a fabricated intersection point.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["vectors", "straight-line"],
  },

  vectors: {
    slug: "vectors",
    trigger:
      "Quantities with direction: a dot or cross product, an area, a volume, a coplanarity test, or a geometry statement (median, centroid, parallelogram) posed in position vectors.",
    story: [
      "228 q makes Vectors the largest chapter in the bank and 55% HARD makes it the hardest of the six cornerstones. Unlike Line and Plane, though, this chapter DOES cherry-pick, and that changes how you attack it. Scalar Triple Product (71 q, 72% HARD) and Cross Product (66 q, 64%) carry 74% of the chapter's HARD between them. Dot Product is 50 q at 28% HARD — a fifth of the chapter's volume at half the difficulty rate.",
      "So the order is not negotiable: secure Dot Product first. It is the cheapest large block, it is where perpendicularity lives, and it is the prerequisite for reading a cross-product question correctly. Then Cross Product, then the Scalar Triple Product last, when you have the machinery to see it as a determinant rather than a formula to memorise.",
      "The triple product is worth singling out because it is the chapter's real workhorse idea. A vanishing 3x3 determinant is a universal degeneracy test that surfaces in five or six chapters — as coplanarity here, as coplanarity of lines in Line and Plane, as collinearity of points, and as concurrency of lines in 2-D. Learning it once in vector form pays four times.",
      "MHT-CET has no negative marking, and Vectors is where that matters most. A perpendicularity claim can be checked by taking one dot product per option; a coplanarity claim can be checked by evaluating one determinant. When the clock is short, verifying the four options is often faster than solving the stem — and there is no cost to a wrong guess.",
    ],
    subSkills: [
      {
        name: "Magnitude, components, and unit vectors",
        description:
          "Resolve into components, take a magnitude, and normalise. 10 q at 30% HARD — small, but every other subtopic assumes it and the normalisation step is where careless marks go.",
      },
      {
        name: "Dot product, angle, and perpendicularity",
        description:
          "The scalar product gives an angle, a projection, and the perpendicularity test (dot product zero). 50 q at 28% HARD: the cheap third of the chapter and the block to bank first.",
      },
      {
        name: "Vector geometry — section formula, triangle, and parallelogram",
        description:
          "Position vectors for midpoints, medians, centroids and diagonals. 16 q at 50% HARD. Mostly a translation skill: turn a geometry sentence into a vector equation, then the algebra is short.",
      },
      {
        name: "Cross product, angle, and area",
        description:
          "The vector product gives a perpendicular direction, a sine, and an area. Triangle area is HALF the cross-product magnitude; parallelogram area is the whole of it. 66 q at 64% HARD.",
      },
      {
        name: "Linear combinations, collinearity, and coplanarity",
        description:
          "Express one vector in terms of others and read off dependence. Three points are collinear when two of their joining vectors are parallel. 15 q at 53% HARD, and it is the conceptual bridge into the triple product.",
      },
      {
        name: "Scalar triple product, coplanarity, and volume",
        description:
          "One determinant answers three questions: the volume of a parallelepiped, one sixth of it for a tetrahedron, and coplanarity when it vanishes. 71 q at 72% HARD — the largest and hardest subtopic in the chapter, and the last one to learn.",
      },
    ],
    traps: [
      {
        name: "Scalar answer offered for a vector question",
        description:
          "A dot product is a number and a cross product is a vector. Options that mix the two types are the fastest elimination on the paper — check the type of the answer before you compute anything.",
      },
      {
        name: "Triangle area without the half",
        description:
          "The cross-product magnitude is the parallelogram area. The distractor is exactly double the correct triangle area, and it is present in nearly every area question.",
      },
      {
        name: "Signed triple product taken as a volume",
        description:
          "The scalar triple product carries a sign that depends on the ordering of the vectors. Volume is its modulus, so the negative of the right answer sits in the option list.",
      },
      {
        name: "Coplanarity confused with parallelism",
        description:
          "Triple product zero means the three vectors lie in one plane, not that any two of them point the same way. The trap option asserts a parallelism condition instead.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["line-and-plane", "determinants-and-matrices", "straight-line"],
  },

  "applications-of-derivative": {
    slug: "applications-of-derivative",
    trigger:
      "A derivative used for something rather than computed: a maximum, a rate, a tangent slope, an interval of increase, an approximation, or a mean-value statement.",
    story: [
      "183 q at 3.81 per paper and only 23% HARD. This is the cheapest cornerstone by some distance and, measured as marks per hour of preparation, the best chapter on the paper. Seven subtopics and not one of them is above 31% HARD — there is no expensive corner to be afraid of here, which is not true of any other cornerstone.",
      "Approximations using Differentials is the extreme case: 11 q and 0% HARD across the whole bank. Angle Between Curves and Orthogonality is 8 q at 13%, and Rolle's Theorem and Mean Value Theorem is 18 q at 17%. That is 37 questions of nearly-free content sitting inside a cornerstone, which is an unusual thing to find and worth taking early.",
      "The volume, though, sits in Maxima, Minima and Optimisation (42 q) and Rate of Change and Related Rates (40 q). Both are word problems, and the difficulty is almost never the calculus — it is setting up the right function or the right chain of dependencies before differentiating. Drill the setup, not the differentiation; the differentiation is Differentiation's job.",
      "One efficiency note that pays at 1.8 minutes a question: optimisation questions in this chapter frequently have a geometric shortcut, and the survey found the same shortcut in other chapters too. A maximum distance from a point to a circle is centre distance plus radius; no calculus is required. Recognising when the calculus can be skipped is a time lever, not a stylistic preference.",
    ],
    subSkills: [
      {
        name: "Approximations using differentials",
        description:
          "A small change in x produces roughly the derivative times that change in y. 11 q at 0% HARD — the only subtopic in the subject that has never produced a HARD question apart from Linear Programming's objective function. Learn it in one sitting.",
      },
      {
        name: "Tangents, normals, and the slope of a curve",
        description:
          "The derivative at a point is the tangent slope; the normal slope is its negative reciprocal. 35 q at 29% HARD. Everything later in the chapter reads slopes off this skill.",
      },
      {
        name: "Angle between curves and orthogonality",
        description:
          "Find the intersection point, take both tangent slopes, then apply the two-line angle formula. Orthogonal curves are the product of slopes equal to minus one — the same perpendicularity condition Straight Line uses. 8 q at 13% HARD.",
      },
      {
        name: "Rate of change and related rates",
        description:
          "Differentiate a geometric relation with respect to time and substitute the instantaneous values LAST. 40 q at 20% HARD, and the second-largest block in the chapter.",
      },
      {
        name: "Increasing and decreasing functions",
        description:
          "Sign of the first derivative on an interval. The work is solving an inequality cleanly and reporting the interval in the form the options use. 29 q at 31% HARD.",
      },
      {
        name: "Maxima, minima, and optimisation",
        description:
          "Build the objective, reduce it to one variable using the constraint, then differentiate. 42 q at 29% HARD, the largest subtopic. The reduction step is where the marks are won and lost.",
      },
      {
        name: "Rolle's theorem and mean value theorem",
        description:
          "Three hypotheses to check before any conclusion: continuity on the closed interval, differentiability on the open one, and for Rolle equal endpoint values. 18 q at 17% HARD, and mostly hypothesis-checking rather than computation.",
      },
    ],
    traps: [
      {
        name: "Conclusion applied where a hypothesis fails",
        description:
          "A Rolle or MVT question set on a function with a corner or a discontinuity in the interval. The trap option reports the value the theorem would give if it applied. Check the three hypotheses first, every time.",
      },
      {
        name: "Tangent slope offered where the normal was asked",
        description:
          "The derivative value and its negative reciprocal both appear in the option list. Read the question word before you compute.",
      },
      {
        name: "Substituting the instant before differentiating",
        description:
          "In a related-rates problem, putting the numerical values in first freezes the variable and kills the rate. Differentiate the general relation, then substitute.",
      },
      {
        name: "Local extremum reported as global",
        description:
          "On a closed interval the answer can sit at an endpoint where the derivative never vanishes. The critical-point value is the distractor.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["differentiation", "limits", "straight-line"],
  },

  "differential-equations": {
    slug: "differential-equations",
    trigger:
      "An equation containing a derivative — either to be classified (order, degree, formation) or to be solved, plus the growth, decay and cooling word problems that reduce to one.",
    story: [
      "144 q at 3.35 per paper and 38% HARD. The structural fact that should shape your preparation is that the six subtopics split by SOLUTION METHOD — variable-separable, homogeneous, linear with an integrating factor — and that is exactly how the exam sets them. So the first move on any stem is not to solve, it is to CLASSIFY. Get the classification right and the solution is a standard procedure; get it wrong and you lose the whole 1.8 minutes.",
      "Order, Degree, Formation of ODE, and Verification of Solutions is 33 q at 24% HARD and is nearly free. It asks for recognition, not integration: read the highest derivative, read its power, count the arbitrary constants. Take this block first — it is a quarter of the chapter's questions at two thirds of the chapter's difficulty rate.",
      "Linear Differential Equations (Integrating Factor) is where the chapter gets expensive: 24 q at 63% HARD, the highest rate here. Newton's Law of Cooling is only 5 q but runs 60% HARD, so it is genuinely optional. The three mid-weight blocks — Growth and Decay (33 q, 27%), Variable-Separable (33 q, 39%) and Homogeneous and Reducible (16 q, 38%) — are where the reliable marks are.",
      "Verification questions are the clearest place in the subject where no negative marking changes tactics. If the stem gives a differential equation and four candidate solutions, differentiating each candidate and substituting is mechanical and always terminates. Solving the equation from scratch may not.",
    ],
    subSkills: [
      {
        name: "Order, degree, formation, and verification",
        description:
          "Order is the highest derivative present; degree is its power once the equation is made polynomial in derivatives. Forming an ODE from a family means differentiating as many times as there are arbitrary constants. 33 q at 24% HARD.",
      },
      {
        name: "Variable-separable equations",
        description:
          "Get all the y with dy and all the x with dx, then integrate both sides and keep one arbitrary constant. 33 q at 39% HARD. The integration, not the separation, is usually the hard part — which is why Indefinite Integration comes first.",
      },
      {
        name: "Homogeneous and reducible equations",
        description:
          "Recognise that every term has the same total degree, substitute y = vx, and the equation becomes separable. Reducible forms are a shift of origin away from homogeneous. 16 q at 38% HARD.",
      },
      {
        name: "Linear equations and the integrating factor",
        description:
          "Put the equation in the standard first-order linear form, build the integrating factor, multiply through, and integrate. 24 q at 63% HARD — the hardest block in the chapter and the one to learn once the easier three are secure.",
      },
      {
        name: "Growth, decay, and continuous models",
        description:
          "Word problems whose rate is proportional to the amount present. They all reduce to the same separable equation; the work is translating the sentence and fixing the constant from the given condition. 33 q at 27% HARD.",
      },
      {
        name: "Newton's law of cooling",
        description:
          "A named special case of the same proportional-rate model, with the ambient temperature as an offset. 5 q at 60% HARD — low volume, high cost, so it is a reasonable thing to leave until everything else is done.",
      },
    ],
    traps: [
      {
        name: "Degree quoted for an equation that has none",
        description:
          "Degree is only defined once the equation is polynomial in its derivatives. If a derivative sits inside a radical, a trigonometric function or an exponential and cannot be cleared, degree is not defined — and a numeric option is offered anyway.",
      },
      {
        name: "Wrong count of arbitrary constants",
        description:
          "The order of the ODE formed from a family equals the number of independent arbitrary constants, not the number of letters in the equation. A fixed parameter dressed up as a constant inflates the order by one.",
      },
      {
        name: "Integrating factor built for the wrong variable",
        description:
          "Some stems are linear in x as a function of y, not y as a function of x. Applying the standard form to the wrong variable produces a clean-looking answer that solves a different equation.",
      },
      {
        name: "Constant of integration dropped or misplaced",
        description:
          "Options that differ only in where the arbitrary constant sits, or in whether it is inside a logarithm. Apply the given initial condition and the ambiguity disappears.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["indefinite-integration", "applications-of-derivative", "differentiation"],
  },

  "indefinite-integration": {
    slug: "indefinite-integration",
    trigger:
      "An antiderivative with no limits — and the immediate question of which of the four techniques (substitution, parts, partial fractions, trigonometric identity) the integrand is asking for.",
    story: [
      "159 q at 3.35 per paper and 51% HARD. This is a cornerstone you can neither skip nor rush. It also contains the single hardest subtopic in the whole subject: Trigonometric Integrals - Rational and Substitution Forms, 35 q at 74% HARD. Nothing else in MHT-CET Maths runs that high.",
      "There is a cheap corner, and it is small but real. Foundations and Standard Formulae (8 q, 13% HARD) plus Trigonometric Integrals - Powers and Identities (12 q, 8% HARD) come to 20 q at roughly a tenth the difficulty rate of the chapter as a whole. Take those two first: they are a fifth of a paper's integration marks for a fraction of the effort, and the standard-formula list is a prerequisite for everything else anyway.",
      "The bulk is Integration by Substitution (51 q, 51% HARD), Rational Functions and Partial Fractions (27 q, 48%) and Integration by Parts (26 q, 54%). These are all recognition problems dressed as computation problems: the skill being tested is choosing the technique in the first fifteen seconds. A student who can classify an integrand quickly finishes this chapter comfortably; a student who tries substitution on everything runs out of clock.",
      "This chapter is the clearest example of the no-negative-marking lever in the subject. The answer is a closed-form expression, so differentiating a candidate option is a legitimate and often much faster route than integrating the stem. When two techniques both look plausible and the clock is tight, differentiate rather than integrate.",
    ],
    subSkills: [
      {
        name: "Foundations and standard formulae",
        description:
          "The standard integral list, cold, including the inverse-trigonometric and logarithmic forms. 8 q at 13% HARD directly, and an unavoidable prerequisite for the other five subtopics.",
      },
      {
        name: "Trigonometric integrals — powers and identities",
        description:
          "Reduce powers and products of sine and cosine using double-angle and product-to-sum identities before integrating. 12 q at 8% HARD — the second-cheapest block in the chapter.",
      },
      {
        name: "Integration by substitution",
        description:
          "Spot that part of the integrand is the derivative of another part, substitute, and change the differential with it. 51 q at 51% HARD: the largest block, and the technique the other techniques fall back on.",
      },
      {
        name: "Rational functions and partial fractions",
        description:
          "Factor the denominator, decompose, and integrate term by term. Repeated factors and irreducible quadratics each need their own decomposition shape. 27 q at 48% HARD.",
      },
      {
        name: "Integration by parts",
        description:
          "Choose which factor to differentiate and which to integrate, then apply the formula — and recognise the cases that return to the original integral and are solved by rearrangement. 26 q at 54% HARD.",
      },
      {
        name: "Trigonometric integrals — rational and substitution forms",
        description:
          "Integrands that are rational in sine and cosine, handled by the half-angle substitution or by splitting the numerator to match the denominator's derivative. 35 q at 74% HARD, the highest of any subtopic in the subject. Learn it last and expect it to cost real time.",
      },
    ],
    traps: [
      {
        name: "Substitution without changing the differential",
        description:
          "Replacing the expression but keeping the original dx. The resulting answer is off by a factor and that factor is exactly what one distractor uses.",
      },
      {
        name: "Missing modulus inside a logarithm",
        description:
          "Standard logarithmic antiderivatives carry an absolute value. Options identical apart from the modulus are common, and the version without it is the trap.",
      },
      {
        name: "Partial fractions with the wrong decomposition shape",
        description:
          "A repeated linear factor needs a term for each power, and an irreducible quadratic needs a linear numerator. Using the simple shape produces a decomposition that cannot reproduce the original fraction.",
      },
      {
        name: "Antiderivative of a lookalike integrand",
        description:
          "A distractor that is a perfectly valid antiderivative — of a slightly different function. Differentiating it and comparing with the stem exposes it in seconds.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["definite-integration", "differential-equations", "differentiation"],
  },

  differentiation: {
    slug: "differentiation",
    trigger:
      "A derivative to be computed, where the shape of the function — implicit, parametric, logarithmic, inverse trigonometric — names the method before you start.",
    story: [
      "141 q at 3.15 per paper and 47% HARD. The subtopics here are method-pure: each one drills exactly one technique, and the exam sets them the same way. That is good news, because it means the chapter is learnable in six discrete pieces rather than as one undifferentiated mass — but it also means the exam expects you to identify the method from the shape of the function within a few seconds.",
      "Start with Foundations, Chain Rule and Differentiability (21 q, 29% HARD), which is the cheapest block and underlies all five others. Then Logarithmic Differentiation (25 q, 44%), which is a single trick applied consistently. Implicit Differentiation and Special Forms (31 q, 52%) and Parametric, Higher-Order Derivatives and Relations (18 q, 50%) come next. Inverse Functions and Inverse Trigonometric Differentiation is the biggest single block at 39 q and 49% HARD, and it deserves the most drilling time.",
      "Derivative of One Function with Respect to Another deserves an explicit warning: 7 q at 71% HARD, the worst marks-per-minute cell in the chapter. That is fewer than one appearance in six papers, at the highest difficulty rate here. Learn it last, and if it turns up when the clock is short, mark an option and move on — MHT-CET has no negative marking, so an unanswered question and a wrong one cost exactly the same.",
      "One measured overlap to plan around: inverse trigonometry appears BOTH as its own chapter (73 q) and as a subtopic inside Trigonometry - II (21 q), and its differentiation lives here. The pre-simplification step — recognising a standard substitution that collapses a monstrous inverse-trig expression into something linear — is usually the entire question, and it is a trigonometry skill, not a calculus one.",
    ],
    subSkills: [
      {
        name: "Foundations, chain rule, and differentiability",
        description:
          "Product, quotient and chain rules applied without hesitation, plus the definition-based questions about where a function is differentiable. 21 q at 29% HARD — the cheapest block and the base for everything else.",
      },
      {
        name: "Logarithmic differentiation",
        description:
          "Take logarithms first when the function is a product of many factors or has a variable in the exponent, then differentiate implicitly. 25 q at 44% HARD. One trick, applied the same way every time.",
      },
      {
        name: "Implicit differentiation and special forms",
        description:
          "Differentiate both sides with respect to x, attaching the derivative factor to every y term, then solve for it. 31 q at 52% HARD, the second-largest block.",
      },
      {
        name: "Parametric, higher-order derivatives, and relations",
        description:
          "Divide the two parameter derivatives for the first derivative; for the second, differentiate that result with respect to the parameter and divide again. 18 q at 50% HARD, and the second-derivative step is where most of the difficulty sits.",
      },
      {
        name: "Inverse functions and inverse trigonometric differentiation",
        description:
          "Simplify the inverse-trigonometric expression with a substitution BEFORE differentiating. 39 q at 49% HARD — the largest single block in the chapter, and the simplification is usually the whole question.",
      },
      {
        name: "Derivative of one function with respect to another",
        description:
          "Differentiate both functions with respect to the shared variable and take the ratio. 7 q at 71% HARD: the worst marks-per-minute cell in the chapter, so it goes last in the learning order.",
      },
    ],
    traps: [
      {
        name: "Chain factor dropped on a composite",
        description:
          "Differentiating the outer function correctly and forgetting the inner derivative. The result is a clean expression that is present in the options, which is what makes it convincing.",
      },
      {
        name: "Implicit derivative missing on a y term",
        description:
          "Treating y as a constant partway through. Every y that gets differentiated must carry the derivative factor — including inside products and powers.",
      },
      {
        name: "Variable base and variable exponent handled as one rule",
        description:
          "A function with a variable in both base and exponent is neither a power rule nor an exponential rule case. Both single-rule answers appear as distractors; logarithmic differentiation is the only correct route.",
      },
      {
        name: "Second parametric derivative taken as a ratio of second derivatives",
        description:
          "The second derivative is not the ratio of the two second parameter derivatives. It requires differentiating the first result and dividing by the parameter derivative again.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["applications-of-derivative", "limits", "inverse-trigonometric-functions"],
  },

  // QUICK-WIN

  "probability-distribution": {
    slug: "probability-distribution",
    trigger:
      "A random variable with a probability table, an expectation or variance to compute, a conditional statement, or a plain counting probability.",
    story: [
      "115 q at 2.65 per paper and 20% HARD. This is the highest-weight Quick-Win in the subject and it is worth stating the trade plainly: over five marks a paper at roughly a fifth of the HARD rate of the calculus cornerstones. On a 90-minute paper with no negative marking, that is the best exchange of preparation time for marks available outside Applications of Derivative.",
      "The difficulty is genuinely concentrated in one place. Classical Probability, Addition Theorem and Odds is 21 q at 10% HARD. Discrete Random Variables, PMF and CDF is 31 q at 19%, and Expectation, Variance and Standard Deviation is 37 q at 19% — the largest block and still under a fifth HARD. Only Conditional Probability, Independence and Bayes' Theorem (26 q, 31%) has any real teeth, and even that is below the subject average of 38.4%.",
      "Almost every question in the first three subtopics runs the same pipeline: build or read a probability table, check it sums to 1, then apply a formula to it. That check is not busywork — a large share of the medium-difficulty questions in this chapter ARE the check, presented as finding an unknown constant in the table.",
      "Two habits pay here. Write the distribution as an explicit table before doing anything, because it makes the sum-to-one check free. And when the options are numbers, remember that a probability outside the zero-to-one range is an immediate elimination, which at 1.8 minutes a question is a real lever.",
    ],
    subSkills: [
      {
        name: "Classical probability, addition theorem, and odds",
        description:
          "Favourable over total, the addition rule for unions, and converting between probability and odds. 21 q at 10% HARD — the cheapest block in the chapter and the place to start.",
      },
      {
        name: "Discrete random variables, PMF and CDF",
        description:
          "Read or construct a probability mass function, enforce that it sums to 1, and move between the mass function and the cumulative function. 31 q at 19% HARD.",
      },
      {
        name: "Expectation, variance, and standard deviation",
        description:
          "Expectation as the probability-weighted sum, variance as the mean of squares minus the square of the mean, and the standard deviation as its root. 37 q at 19% HARD — the largest block, and almost entirely mechanical once the table is written.",
      },
      {
        name: "Conditional probability, independence, and Bayes' theorem",
        description:
          "Conditioning restricts the sample space; independence means the conditioning changes nothing; Bayes reverses the direction of the conditioning. 26 q at 31% HARD, the only demanding block here.",
      },
    ],
    traps: [
      {
        name: "Distribution that does not sum to one",
        description:
          "A table with an unknown constant where the intended step is solving for it. Options computed from the unnormalised table are supplied, and they look entirely reasonable.",
      },
      {
        name: "Conditional probability taken in the wrong direction",
        description:
          "The probability of A given B and the probability of B given A are different numbers and both appear as options. This is the standard Bayes distractor.",
      },
      {
        name: "Independent read as mutually exclusive",
        description:
          "Two events cannot generally be both, and the two assumptions give different answers for the same stem. Read which one the question actually states.",
      },
      {
        name: "Odds reported as a probability",
        description:
          "Odds in favour of three to two is a probability of three fifths, not three halves, and odds against reverses it. Both wrong readings are offered.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["binomial-distribution", "permutations-and-combinations"],
  },

  "mathematical-logic": {
    slug: "mathematical-logic",
    trigger:
      "Statements, connectives and quantifiers — or a switch circuit diagram, which is the same thing drawn differently.",
    story: [
      "88 q at 1.92 per paper and 31% HARD. This is the one chapter in MHT-CET Maths with its own execution mode: around 70% of its stems ask which of the four statements is true, against roughly 0% everywhere else in the subject. Every other chapter hands you a problem to solve; this one hands you four claims to adjudicate. That difference is worth more than any formula on this page, because it changes what you do when you read the question.",
      "The 31% HARD figure overstates the cost, and it is worth understanding why. The difficulty here is front-loaded into learning ONE technique — build the truth table — which then applies to essentially every question in the chapter. Once that technique is automatic, a HARD logic question and a MODERATE one take about the same amount of time. Compare that with Indefinite Integration, where every new integrand is a fresh recognition problem.",
      "Switch circuits sit inside the largest subtopic (Negation, Equivalence, Tautology, and Switch Circuits, 47 q at 36% HARD) and intimidate students who have not been told the translation. It is two rules: switches in series are AND, switches in parallel are OR. After that a circuit is a logical expression and the same truth table answers it.",
      "The tactic follows from the execution mode. With four claims and no negative marking, building the truth table and evaluating all four options is a complete method that always terminates — and a partially built table plus elimination still beats leaving the question blank, because a blank and a wrong answer cost the same nothing.",
    ],
    subSkills: [
      {
        name: "Truth tables and truth values",
        description:
          "Construct the table for any compound statement and read the truth value off it. 27 q at 26% HARD, and the technique that every other skill in this chapter runs on. Learn it first and learn it properly.",
      },
      {
        name: "Converse, inverse, and contrapositive",
        description:
          "Given a conditional, write its three relatives and know that only the contrapositive is logically equivalent to it. 14 q at 21% HARD — the cheapest block in the chapter and pure pattern work.",
      },
      {
        name: "Negation, equivalence, and tautology",
        description:
          "Negate compound statements and quantified statements, test two expressions for equivalence, and classify a statement as a tautology or a contradiction from its final column. Part of the 47 q, 36% HARD subtopic.",
      },
      {
        name: "Switch circuits",
        description:
          "Translate a circuit into a logical expression — series is AND, parallel is OR — then simplify or test it exactly as you would any other statement. Also part of the 47 q block, and much cheaper than it looks.",
      },
    ],
    traps: [
      {
        name: "Negation of a conditional written as another conditional",
        description:
          "Denying an implication asserts the antecedent and denies the consequent; it is not another implication. The tempting wrong option negates both parts and keeps the arrow.",
      },
      {
        name: "Converse offered where the contrapositive is asked",
        description:
          "Only the contrapositive shares the truth value of the original. Converse and inverse are equivalent to each other and to neither, and all three appear in the option list.",
      },
      {
        name: "Quantifier negated without negating the predicate",
        description:
          "Negating a for-all statement gives a there-exists statement whose inner claim is ALSO negated. Options that flip only the quantifier are the standard distractor.",
      },
      {
        name: "Parallel branch read as an AND",
        description:
          "In a switch circuit, current flows if EITHER parallel branch is closed. Reading parallel as AND inverts the expression and produces a clean but wrong simplification.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["probability-distribution", "linear-programming"],
  },

  "binomial-distribution": {
    slug: "binomial-distribution",
    trigger:
      "A fixed number of independent trials with two outcomes and a constant success probability — coins, defective items, targets hit, questions guessed.",
    story: [
      "60 q at 1.27 per paper and 22% HARD. A small, closed chapter with four subtopics and genuinely no surprises: the whole thing is one probability model and the four questions you can ask about it. That combination — low volume but low variance in what is asked — makes it one of the most reliable banks of marks on the paper.",
      "Mean, Variance and Standard Deviation of a Binomial Variable is 15 q at 13% HARD and is pure formula recall: the mean is the number of trials times the success probability, and the variance multiplies that by the failure probability. The Binomial Setting and Probability Mass Function is 10 q at 10% HARD. That is 25 questions of near-free content in a 60-question chapter.",
      "The two remaining blocks are Computing Binomial Probabilities (20 q, 30% HARD) and Parameter Estimation and the Probability Ratio (15 q, 27%). The second is the one students meet least often in school: you are given the mean and the variance, or a ratio of two consecutive probabilities, and asked to recover the number of trials and the success probability. It is short algebra once you have seen it, and worth an explicit drill.",
      "Before any of that, check that the setting is actually binomial. Fixed number of trials, exactly two outcomes, independence between trials, and a success probability that does not change. Sampling without replacement fails the last two and the chapter's formulas do not apply.",
    ],
    subSkills: [
      {
        name: "The binomial setting and probability mass function",
        description:
          "Verify the four conditions, then write the mass function with its combinatorial coefficient. 10 q at 10% HARD — the cheapest block and the gate for everything else.",
      },
      {
        name: "Mean, variance, and standard deviation of a binomial variable",
        description:
          "Mean is trials times success probability; variance multiplies by the failure probability; standard deviation is its root. 15 q at 13% HARD and pure recall — bank it in one sitting.",
      },
      {
        name: "Computing binomial probabilities",
        description:
          "Exactly-k, at-least-k and at-most-k probabilities, using the complement whenever the direct sum is longer. 20 q at 30% HARD, the largest block in the chapter.",
      },
      {
        name: "Parameter estimation and the probability ratio",
        description:
          "Recover the number of trials and the success probability from the mean and variance, or from the ratio of two consecutive terms. 15 q at 27% HARD, and short algebra once the setup is familiar.",
      },
    ],
    traps: [
      {
        name: "Variance taken as mean times success probability",
        description:
          "Variance uses the FAILURE probability as its third factor. The mean-times-p value is always among the options and is the most-taken wrong answer in this chapter's shape.",
      },
      {
        name: "At-least-one computed as a direct sum",
        description:
          "At least one is one minus the probability of none, a single term. Attempting the full sum invites an arithmetic slip and burns far more than 1.8 minutes.",
      },
      {
        name: "Combinatorial coefficient omitted",
        description:
          "The probability of a specific sequence is not the probability of that many successes. The uncounted value appears as a distractor and is smaller by exactly the coefficient.",
      },
      {
        name: "Sampling without replacement treated as binomial",
        description:
          "Drawing without replacement changes the success probability between trials, so the model does not apply. The binomial answer is supplied anyway.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["probability-distribution", "permutations-and-combinations"],
  },

  "linear-programming": {
    slug: "linear-programming",
    trigger:
      "A set of linear inequalities plus something to maximise or minimise — or a feasible region to identify, classify, or read corners from.",
    story: [
      "46 q at 1.00 per paper and 4% HARD. This is the lowest-HARD chapter in the subject by a wide margin, and one of its two subtopics — Objective Function, Maximisation and Minimisation, 23 q — has NEVER produced a HARD question across the whole 45-shift bank. Two marks that should take under a minute. Do this one first, every time you sit a paper.",
      "The method does not vary. Translate the sentence into inequalities, plot the constraints, identify the feasible region, list its corner points, and evaluate the objective at each corner. The optimum of a linear objective over a convex polygon always sits at a corner, so there is nothing to search — you are comparing at most four or five numbers.",
      "Feasible Region — Identification, Constraints, Classification is 23 q at 9% HARD and carries whatever difficulty the chapter has. The questions that misbehave are the ones about the region itself: whether it is bounded, whether it is empty, which half-plane a given inequality selects. Those are worth five minutes of deliberate practice, and then the chapter is finished.",
      "Because the answers are numbers produced by arithmetic at corner points, this is a chapter where checking beats guessing even under time pressure — and with no negative marking there is never a reason to leave one of these blank.",
    ],
    subSkills: [
      {
        name: "Translating constraints into inequalities",
        description:
          "Turn at most, at least, and not more than into the correct inequality direction, and never forget the non-negativity constraints that the wording leaves implicit.",
      },
      {
        name: "Plotting and identifying the feasible region",
        description:
          "Draw each boundary line, choose the correct half-plane with a test point, and take the intersection. 23 q at 9% HARD across this subtopic — the only place difficulty appears in this chapter.",
      },
      {
        name: "Classifying the region — bounded, unbounded, empty",
        description:
          "An unbounded region may have a minimum and no maximum, or the reverse; an empty region has no solution at all. Recognising which case you are in is what separates the 9% HARD questions from the rest.",
      },
      {
        name: "Evaluating the objective at corner points",
        description:
          "Find the corners as intersections of constraint boundaries, evaluate the objective at each, and take the best. 23 q at 0% HARD — no question in this subtopic has ever been rated HARD.",
      },
    ],
    traps: [
      {
        name: "Optimum reported for an unbounded region",
        description:
          "If the region is unbounded in the direction the objective improves, no maximum exists. A numeric value is still offered, and it is the largest corner value.",
      },
      {
        name: "Corner point that fails one constraint",
        description:
          "Two boundary lines meet at a point that lies outside the region because a third constraint excludes it. Test every candidate corner against ALL constraints before evaluating.",
      },
      {
        name: "Inequality direction reversed",
        description:
          "At most and at least map to opposite half-planes, and a single reversal produces a different region with entirely different corners and a clean-looking wrong answer.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["straight-line", "applications-of-derivative"],
  },

  "straight-line": {
    slug: "straight-line",
    trigger:
      "A line in the plane: a point dividing a segment, a distance from a point, three lines tested for concurrency, an angle between two lines, or a bisector.",
    story: [
      "46 q at 0.96 per paper and 22% HARD. Two broad subtopics, both routine coordinate geometry, and the reason this sits in the Quick-Win strand rather than the long tail is not its size — it is that it shares its whole toolkit with Line and Plane, a cornerstone worth 4.96 questions a paper. Section formula, foot of perpendicular, distance from a point, angle between two objects: every one of these is the 2-D version of a move you already have to own. Once the cornerstone is yours, this chapter costs almost nothing on top.",
      "Section Formula, Concurrency, Foot of Perpendicular, and Distance is 27 q at 19% HARD, the cheaper of the two blocks. Equation of Line — Rotation, Angle, and Bisector is 19 q at 26%. Neither is expensive, and there is no HARD concentration to route around.",
      "One idea in here pays well beyond this chapter. Concurrency of three lines is a vanishing 3x3 determinant, and the survey found that same determinant working as a universal degeneracy test across five or six chapters — as collinearity of three points, as coplanarity of lines in three dimensions, and as scalar triple product zero in Vectors. Learn the test once and recognise its four costumes.",
      "The same is true of the angle condition. The survey counted the angle-between-two-objects idea across 87 q in 7 chapters and perpendicularity across 83 q in 7. Here it is the slope-product condition; in Vectors it is a dot product; in Pair of Straight Lines it is a coefficient sum. One idea, four dialects.",
    ],
    subSkills: [
      {
        name: "Section formula, distance, and the foot of perpendicular",
        description:
          "Internal and external division, the distance from a point to a line, and dropping a perpendicular onto a line. 27 q at 19% HARD — the cheapest block, and directly transferable to Line and Plane.",
      },
      {
        name: "Concurrency of three lines",
        description:
          "Three lines are concurrent when the determinant of their coefficients vanishes. The same test reads as collinearity of points and coplanarity in three dimensions. Part of the 27 q block.",
      },
      {
        name: "Equation of a line in its standard forms",
        description:
          "Slope-intercept, point-slope, two-point, intercept and normal forms, and moving between them to match whichever form the options use. Part of the 19 q, 26% HARD subtopic.",
      },
      {
        name: "Angle between lines, bisectors, and rotation",
        description:
          "The slope-product condition for perpendicularity, the tangent formula for a general angle, both angle bisectors, and the effect of rotating a line about a point. 19 q at 26% HARD.",
      },
    ],
    traps: [
      {
        name: "Perpendicularity applied to a vertical line",
        description:
          "The slope-product condition needs both slopes to exist. A line parallel to the y-axis has no slope, and the formula silently produces a wrong answer rather than failing.",
      },
      {
        name: "The other angle bisector",
        description:
          "Two lines have two bisectors, at right angles to each other, and both appear in the options. The question usually specifies the one containing the origin or the acute one — read which.",
      },
      {
        name: "Distance formula without the modulus",
        description:
          "The point-to-line distance is a non-negative quantity. The signed value, which the algebra produces first, is offered as a distractor and is the negative of the right answer.",
      },
      {
        name: "Concurrency claimed for parallel lines",
        description:
          "A vanishing determinant is necessary but does not by itself place three lines through one point — a set of parallel or coincident lines can satisfy it. Check that the lines actually meet.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["line-and-plane", "pair-of-straight-lines", "circle"],
  },
};
