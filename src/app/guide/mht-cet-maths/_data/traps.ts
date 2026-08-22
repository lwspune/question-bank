/**
 * Content for /guide/mht-cet-maths/traps.
 *
 * MHT-CET Maths trap shapes, bucketed by the strategy strand whose marks the
 * trap actually costs you.
 *
 * TWO THINGS MAKE THIS EXAM'S TRAP LIST DIFFERENT FROM NDA'S OR JEE'S, AND
 * BOTH ARE STRUCTURAL RATHER THAN MATHEMATICAL:
 *
 *   1. THERE IS NO NEGATIVE MARKING. A blank and a wrong answer score
 *      identically. Every habit imported from an exam that penalises a wrong
 *      answer is actively harmful here, and the first trap below is exactly
 *      that habit. The strategic axis in MHT-CET is ORDER and TIME, never
 *      attempt-versus-skip.
 *   2. PAPER I IS MATHS ALONE — 50 questions, 2 marks each, 100 marks, 90
 *      minutes. That is 1.8 minutes per question and every question is worth
 *      the same 2 marks, so a hard question and an easy one pay identically.
 *      Several traps below are time traps rather than mathematical ones,
 *      because at 1.8 minutes a question that is where the marks are lost.
 *
 * `bucket` = the strand whose marks this trap costs you, which is NOT always
 * the strand the question appears in. The Permutations and Combinations time
 * trap is bucketed cornerstone because the marks it eats are cornerstone
 * marks, not because P&C is a cornerstone chapter (it is long tail).
 *
 * `affects` holds playbook slugs and every one must resolve in playbooks.ts —
 * a typo silently renders a dead cross-link. An EMPTY `affects` is deliberate
 * and means the trap is paper-wide rather than chapter-specific.
 *
 * `exampleQuestionId` is omitted throughout. Inventing UUIDs ships dead links.
 */

export type TrapBucket = "cornerstone" | "quickwin" | "longtail";

export type TrapShape = {
  id: string;
  /** Title shown in the page section. */
  title: string;
  /** The strand whose marks this trap costs you. */
  bucket: TrapBucket;
  /** Playbook slugs. Empty = the trap is paper-wide, not chapter-specific. */
  affects: string[];
  /** The mechanic — how the trap works. */
  mechanic: string;
  /** The fix — the verification habit that avoids it. */
  fix: string;
  /** Optional worked-example UUID. Left unset — see the module note. */
  exampleQuestionId?: string;
};

export const TRAP_SHAPES: TrapShape[] = [
  // -------- Cornerstone — where the marks actually go --------
  {
    id: "blank-answer-habit",
    title: "Leaving a question blank — the single most expensive habit in this exam",
    bucket: "cornerstone",
    affects: [],
    mechanic:
      "MHT-CET has NO negative marking. A blank and a wrong answer are worth exactly the same: zero. Students arrive with reflexes built on exams that deduct for a wrong answer, and those reflexes say leave it if you are not sure. Here that reflex converts a free attempt into a guaranteed zero. There is no such thing as a risky guess on this paper — there is only an answered question and an unanswered one, and only one of them can score. On a 50-question, 100-mark paper, ten blanks are ten questions you have chosen not to be paid for.",
    fix:
      "Never hand back a mark. Mark every uncertain question as you pass it so you can find it again, and reserve the last five minutes purely to fill every remaining blank — eliminate what you can, then commit to something. Walking out with an unfilled answer is the only unforced error on this paper that costs you marks with certainty rather than probability.",
  },
  {
    id: "time-sink-pnc",
    title: "The five-minute counting question — 1.8 minutes is the whole budget",
    bucket: "cornerstone",
    affects: ["permutations-and-combinations"],
    mechanic:
      "50 questions in 90 minutes is 1.8 minutes each, and all 50 pay 2 marks whether they took twenty seconds or seven minutes. Permutations and Combinations is the classic sinkhole: 43 q at 42% HARD, 1.00 a paper, and its Selection and Arrangement with Constraints subtopic (33 q, 42% HARD) produces problems that feel tractable for minute after minute and then do not come out. Five minutes spent there is not five minutes — it is the Applications of Derivative questions you never reached, and that chapter runs 3.81 a paper at only 23% HARD.",
    fix:
      "Put a hard cap on any single question: if you have not seen the STRUCTURE within about three minutes, answer it and move. Not skip — answer, because a blank scores the same as a wrong guess. The chapters that punish a slow start (P&C, Limits at 56% HARD, Indefinite Integration at 51%) should be visited on the second pass, after the cheap marks are banked.",
  },
  {
    id: "perpendicularity-dialects",
    title: "One condition, four chapter dialects — perpendicularity",
    bucket: "cornerstone",
    affects: ["vectors", "line-and-plane", "straight-line", "pair-of-straight-lines", "circle"],
    mechanic:
      "Perpendicularity is 83 questions spread across 7 chapters, and it is written a different way in each one: m1*m2 = -1 for straight lines and conics, dot product = 0 for vectors, a + b = 0 for a pair of lines, and cross product of the direction vectors for line and plane. Students learn the dialect of whichever chapter they revised most recently and then fail to recognise the same condition when it turns up wearing another chapter's clothes. The words move too — perpendicular, normal to, at right angles, orthogonal, and cuts at 90 degrees are all the same instruction.",
    fix:
      "Keep one card with all four forms on it and read it before every mock. When a question says perpendicular in any of its wordings, first ask what OBJECTS you are holding — two slopes, two vectors, a pair of lines, or a line and a plane — and write the matching form immediately, before touching the algebra. The same discipline covers parallelism (43 q across 5 chapters) and the parent idea, angle between two objects (87 q across 7 chapters): perpendicular is just angle 90, parallel is angle 0.",
  },
  {
    id: "degeneracy-determinant",
    title: "Concurrency, collinearity, coplanarity and triple product are ONE test",
    bucket: "cornerstone",
    affects: ["vectors", "line-and-plane", "straight-line", "determinants-and-matrices"],
    mechanic:
      "Four question types that look unrelated on the page are the same test wearing four names: three lines are concurrent, three points are collinear, two lines are coplanar, and the scalar triple product is zero. Every one of them is a 3x3 determinant set equal to zero. This shape carries roughly 19 to 30 questions across 5 or 6 chapters. Memorised as four separate recipes it becomes four chances to reach for the wrong one under time pressure; recognised as one idea it is a single reflex.",
    fix:
      "Treat the words concurrent, collinear, coplanar, and lie in one plane as a single instruction: build the 3x3 and set it to zero. This pays hardest in Vectors, where Scalar Triple Product, Coplanarity, and Volume is both the biggest subtopic (71 q) and the hardest (72% HARD) — the recognition is most of the work, and the arithmetic that follows is routine.",
  },
  {
    id: "vectors-wrong-entry-point",
    title: "Starting Vectors at the top of the chapter — it cherry-picks, so cherry-pick it",
    bucket: "cornerstone",
    affects: ["vectors"],
    mechanic:
      "Vectors is the largest chapter in the bank (228 q, 4.81 a paper) and the hardest cornerstone at 55% HARD, so it feels like the place to grind first. But its difficulty is concentrated, not spread: Scalar Triple Product is 71 q at 72% HARD and Cross Product is 66 q at 64%, while Dot Product, Angle, and Perpendicularity is 50 q at only 28%. Working the chapter in listed order means opening on the two most expensive subtopics in it and burning the hours where the return is worst.",
    fix:
      "Secure Dot Product, Angle, and Perpendicularity (50 q, 28% HARD) and Magnitude, Components, and Unit Vectors (10 q, 30%) first, then come back for the triple product. Note that the sister cornerstone does NOT behave this way: Line and Plane spreads its HARD across seven subtopics, so there is no cheap half to take first — you own that chapter whole or you lose the marks. Check the shape of a chapter before deciding how to enter it.",
  },
  {
    id: "integrate-before-classifying",
    title: "Integrating before deciding WHICH method the integrand wants",
    bucket: "cornerstone",
    affects: ["indefinite-integration", "definite-integration"],
    mechanic:
      "Indefinite Integration is 159 q at 51% HARD and almost all of that difficulty is form recognition rather than algebra — Trigonometric Integrals - Rational and Substitution Forms alone runs 35 q at 74% HARD, the highest of any cornerstone subtopic. The trap is starting to integrate before deciding whether the integrand is asking for substitution, by parts, or partial fractions. Two minutes into the wrong method there is no cheap way back, and at 1.8 minutes a question you are already over budget.",
    fix:
      "Spend the first fifteen seconds classifying, not integrating: is there an inner function whose derivative is sitting outside (substitution), a product of two unlike species (by parts), or a rational function with a factorable denominator (partial fractions)? The easy end of this chapter is pure recognition too — Foundations and Standard Formulae is 8 q at 13% HARD and Trigonometric Integrals - Powers and Identities is 12 q at 8% — so the recognition drill and the cheap marks are the same drill.",
  },
  {
    id: "inverse-trig-substitution-missed",
    title: "Differentiating an inverse-trig expression raw instead of substituting first",
    bucket: "cornerstone",
    affects: ["differentiation", "inverse-trigonometric-functions"],
    mechanic:
      "Differentiation is 141 q at 47% HARD and its largest subtopic, Inverse Functions & Inverse Trigonometric Differentiation, is 39 q at 49% HARD. Nearly all of that difficulty is one missed move. When an inverse trig function wraps a rational expression in x — forms like (1-x^2)/(1+x^2) or 2x/(1-x^2) — the expression is asking to be rewritten with a trig substitution before anything is differentiated. Differentiate it raw and you get an answer that is correct, unrecognisable, and matches none of the four options, which then costs you a second pass to discover you were right all along.",
    fix:
      "When you see an inverse trig function wrapped around a rational expression in x, try the standard substitutions first (x = tan theta, x = sin theta, x = cos theta) and simplify the ARGUMENT before differentiating. While you are in this chapter, note Derivative of One Function with Respect to Another: only 7 q but 71% HARD, the highest in the chapter, and it is always just dy/dx divided by dz/dx.",
  },

  // -------- Quick-win — cheap marks lost to procedure, not to difficulty --------
  {
    id: "logic-negation-mechanics",
    title: "Negating a compound statement without flipping the connective",
    bucket: "quickwin",
    affects: ["mathematical-logic"],
    mechanic:
      "Mathematical Logic is 88 q at 1.92 a paper and only 31% HARD, which makes it one of the best marks-per-minute chapters on the paper — and its biggest subtopic, Negation, Equivalence, Tautology, and Switch Circuits, is 47 q at 36% HARD. The recurring error is mechanical rather than conceptual: negating p and q without turning the and into an or, or negating an implication as another implication instead of as a conjunction. These are marks lost to sloppiness in a chapter that is otherwise close to free.",
    fix:
      "Memorise three lines cold and nothing else in this chapter is hard: the negation of (p and q) is (not p or not q); the negation of (p or q) is (not p and not q); the negation of (p implies q) is (p and not q). For switch circuits, series is AND and parallel is OR. Those four facts plus a truth table cover the bulk of an 88-question chapter.",
  },
  {
    id: "lpp-corner-point-shortcut",
    title: "Stopping at the first good corner point in a Linear Programming problem",
    bucket: "quickwin",
    affects: ["linear-programming"],
    mechanic:
      "Linear Programming is the cheapest chapter that ships as a playbook: 46 q, 1.00 a paper, 4% HARD, and its Objective Function — Maximisation and Minimisation subtopic is 23 q at 0% HARD. There is essentially no mathematics available to get wrong, which is exactly why the losses here are procedural — reading an inequality on the wrong side of its line, forgetting the non-negativity constraints so the region is too big, or evaluating the objective at two corner points, seeing an improvement, and stopping there.",
    fix:
      "Draw the region, list EVERY corner point including the axis intercepts, evaluate the objective at all of them, and only then choose. There is no shortcut and none is needed: this chapter should close in well under 1.8 minutes a question, and the time it gives back is what pays for Vectors later in the paper.",
  },
  {
    id: "variance-vs-sd-selection",
    title: "Answering with the variance when the standard deviation was asked",
    bucket: "quickwin",
    affects: ["probability-distribution", "binomial-distribution"],
    mechanic:
      "Probability Distribution (115 q, 2.65 a paper, 20% HARD) and Binomial Distribution (60 q, 1.27 a paper, 22% HARD) are the two cheapest large chapters in the bank, and the marks lost in them are lost to formula SELECTION rather than to reasoning. Variance for a general discrete variable is E(X^2) minus (E(X))^2; for a binomial it is npq; the standard deviation is the square root of whichever of those applies. Option sets in these chapters routinely include the variance where the standard deviation was asked, and np where npq was asked — both are answers to a question adjacent to the one on the page.",
    fix:
      "Underline the quantity actually requested — mean, variance, or standard deviation — before computing anything. For a binomial, write n, p and q down first, then mean = np, variance = npq, standard deviation = the square root of npq. Expectation, Variance and Standard Deviation is the largest subtopic in Probability Distribution at 37 q and only 19% HARD, so getting the selection reflex right is worth real marks for very little study.",
  },

  // -------- Long tail — scope and technique traps --------
  {
    id: "inverse-trig-taxonomy-split",
    title: "Inverse trigonometry lives in TWO chapters — drill one and you miss a fifth of it",
    bucket: "longtail",
    affects: ["inverse-trigonometric-functions", "trigonometry-ii"],
    mechanic:
      "This bank files inverse trigonometry in two places. It has its own chapter, Inverse Trigonometric Functions, holding 73 q at 37% HARD. A second block of 21 q sits as a subtopic named Inverse Trigonometry — Identities, Equations, and Principal Values INSIDE Trigonometry - II, at 52% HARD. A student who drills the chapter and calls the topic done has covered roughly four fifths of it, and the fifth they missed is the harder fifth — 52% HARD against 37%. Nothing on a syllabus document exposes this; it is a property of how the questions were classified.",
    fix:
      "Treat inverse trigonometry as one topic across two drill links and run both. The split matters in the other direction as well: Trigonometry - II is nominally a triangle-properties chapter (Properties of Triangles, 52 q) but a third of it is inverse trig and half-angle identity work, so revising it as trigonometry alone leaves the same hole.",
  },
  {
    id: "dead-chapter-dispersion",
    title: "Revising Measures of Dispersion because every practice paper has one",
    bucket: "longtail",
    affects: [],
    mechanic:
      "Measures of Dispersion is the most attractive-looking dead chapter in the bank: 32 questions lifetime at only 9% HARD, so it reads as guaranteed cheap marks, and it appears in essentially every 2023 and 2024 paper a student practises — 1.0 question per paper across those 29 shifts. It then scored ZERO across all 14 shifts of 2025. The mirror image is Conic Sections, which carried 3 questions in the whole bank before 2025 and then 16 in 2025 alone, at 42% HARD.",
    fix:
      "Date every practice paper you sit and weight what you learn from it accordingly. Anything drilled from 2023-24 trains you on a chapter that no longer appears and never shows you one that now does. Give Measures of Dispersion no revision time, and put Conic Sections on the list — at 42% HARD it is not a chapter that can be picked up in the hall.",
  },
  {
    id: "calculus-where-geometry-answers",
    title: "Differentiating a distance when the answer is centre-distance plus-or-minus radius",
    bucket: "longtail",
    affects: ["complex-numbers", "circle", "applications-of-derivative"],
    mechanic:
      "Two questions from different chapters are the same move in disguise. The greatest and least modulus of z on a given disc (Complex Numbers) and the maximum perpendicular distance from a point to a point on a circle (Circle) both LOOK like optimisation problems, and both pull a well-drilled student into setting up a derivative. Both answers are one line: the distance from the point to the centre, plus or minus the radius. The calculus route reaches the same answer several minutes later, which on a 1.8-minute budget is the difference between two questions and one.",
    fix:
      "Before differentiating anything in a question with a circle, disc, or sphere in it, ask whether the extreme point lies on the line through the centre — for round objects it almost always does, and then the answer is centre-distance plus-or-minus radius. Avoiding calculus here is a time lever, not an elegance preference: the marks are identical and the minutes are not.",
  },
  {
    id: "definite-integral-brute-force",
    title: "Evaluating a definite integral directly when it was built to be collapsed",
    bucket: "longtail",
    affects: ["definite-integration"],
    mechanic:
      "The largest subtopic in Definite Integration is Symmetry, King's Property, and Absolute Value at 42 q and 38% HARD, and those questions are constructed so that the direct antiderivative is long, ugly, or not available at all. The intended route collapses the integral in one line. A student who starts integrating either runs out of time or, worse, produces a confident answer having integrated straight across a point where a modulus changes sign — which is wrong rather than merely slow.",
    fix:
      "Run three checks before writing an antiderivative. Are the limits symmetric about zero, so an odd part vanishes and an even part doubles? Does replacing x by a+b-x reproduce the integrand, so King's property applies? Does the integrand contain a modulus or a floor that changes sign inside the limits, so the interval must be split at that point? One of the three usually turns the question into a single line.",
  },
];

/** Index by bucket — used by the /traps page sectioning. */
export const TRAPS_BY_BUCKET: Record<TrapBucket, TrapShape[]> = {
  cornerstone: TRAP_SHAPES.filter((t) => t.bucket === "cornerstone"),
  quickwin: TRAP_SHAPES.filter((t) => t.bucket === "quickwin"),
  longtail: TRAP_SHAPES.filter((t) => t.bucket === "longtail"),
};

export const TRAP_HEADLINE = {
  shapes: TRAP_SHAPES.length,
  topAffects: Math.max(...TRAP_SHAPES.map((t) => t.affects.length)),
};
