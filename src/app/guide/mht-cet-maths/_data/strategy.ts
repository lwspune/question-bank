/**
 * Content for /guide/mht-cet-maths/strategy.
 *
 * THE ONE FACT THAT SHAPES THIS WHOLE FILE: MHT-CET has NO NEGATIVE MARKING.
 * Every NDA strategy guide in this repo is built on an attempt-versus-skip
 * axis, because a wrong NDA answer costs a third of a right one. That axis
 * does not exist here. Nothing is deducted, so a blank and a wrong answer are
 * worth exactly the same, and there is never a reason to leave a bubble empty.
 *
 * What replaces it is ORDER and TIME BUDGET. Paper I is Mathematics only:
 * 50 questions x 2 marks = 100 marks in 90 minutes, which is 1.8 minutes per
 * question with nothing left over. So the strategic questions are "which
 * questions do I answer first" and "how long am I allowed to stay on this
 * one", never "do I attempt it at all". `DrillPosture` below is built on that.
 *
 * TIERING is on RECENT weightage (2025-2026, 39 shifts) plus %HARD, not on
 * lifetime average: MHT-CET moved its syllabus for 2025, 2026 kept the move,
 * and a lifetime average hides it in both directions. See TAIL_CHAPTERS.
 *
 * NUMBERS. Chapter q-counts and %HARD are lifetime figures over the 3,388
 * PUBLIC past-year questions (68 shifts, 2021-2026, 26 chapters). q/paper
 * figures quoted in prose are the recent-weightage numbers. A strand's
 * `qCount` is the sum of its chapters' lifetime counts and `pctOfBank` is that
 * sum as a share of 3,388: those two are addition, not new measurements. The
 * three strands plus the four tail chapters below reconcile to 3,388 exactly
 * (1,905 + 540 + 830 + 113), re-measured 2026-10-13 after the 26 shifts of
 * 2026 went PUBLIC with their difficulty re-graded onto the 2021-2025 scale.
 * On that re-measure the recent window moved from 2024-2025 to 2025-2026 and
 * Conic Sections crossed the 0.9 line (0.67 -> 1.08), moving from the tail
 * block into the long tail. Earlier re-measures: 2026-09-28 (label fix),
 * 2026-09-26 (Trigonometry - I carved into Trigonometric Functions and
 * Trigonometry - II, and Trigonometry - II crossed the line, 0.88 -> 0.92).
 *
 * Difficulty split across the bank: EASY 466 (13.8%) · MODERATE 1,742 (51.4%)
 * · HARD 1,180 (34.8%).
 *
 * `mustDrill` / `skipSubtopics` / `targetHard` hold canonical DB subtopic
 * names, resolved to UUIDs at request time for /browse drill links. A typo
 * silently produces an empty drill and no error — copy, never retype.
 */

import type { Difficulty } from "@/lib/questions/filters";

/**
 * How to attack a chapter on an exam with NO NEGATIVE MARKING.
 *
 * These are about ORDER and TIME BUDGET, not about attempt-versus-skip. On
 * this paper you answer all 50 questions; the posture says when in the 90
 * minutes you get to this chapter and how long you may stay on it.
 */
export type DrillPosture =
  /** Cheap and fast. Answer on the opening sweep, at or under the 1.8-minute
   *  budget, and bank the marks before the clock starts to hurt. */
  | "bank-first"
  /** A chapter whose HARD load is spread across its subtopics rather than
   *  pooled in one or two, so there is nothing to cherry-pick: you own the
   *  whole chapter in prep, and you give its questions the full budget. */
  | "own-outright"
  /** A chapter that DOES cherry-pick. Its cheap subtopics are answered on the
   *  first sweep; its expensive ones are left for the second pass, and in prep
   *  the cheap ones are secured before the expensive ones are touched. */
  | "split-pass"
  /** Roughly a question a paper and expensive per question. Comes last, on
   *  whatever time is left — and every one of them still gets an answer,
   *  because a guess costs nothing. */
  | "last-pass-guess";

export type StrandChapter = {
  chapter: string;
  /** Lifetime PUBLIC PYQ count for the chapter (of 3,388). */
  qCount: number;
  pctHard: number;
  posture: DrillPosture;
  /** Subtopics to drill, in prep order — cheapest first where the chapter
   *  cherry-picks. Each becomes a "Drill" CTA. */
  mustDrill: string[];
  /** Subtopics to deprioritise IN PREP — last in the queue, first to go if
   *  time runs out before the exam. This is never an instruction to leave a
   *  question blank on the paper: with no negative marking you answer every
   *  one of them. */
  skipSubtopics?: string[];
  /** Subtopics whose HARD pool is dense enough to deserve extra timed reps. */
  targetHard?: string[];
  /** Expected recent q/paper and the marks that implies at 2 marks each. */
  expectedYieldPerPaper: string;
  studyHours: number;
  /** 1-2 sentence pitch shown at the top of the card. */
  summary: string;
};

export type StrategyStrand = {
  id: "cornerstone" | "quickwin" | "longtail";
  label: string;
  /** Sum of the strand's chapters' lifetime q-counts. */
  qCount: number;
  /** That sum as a share of the 3,388-question bank. */
  pctOfBank: number;
  /** One-paragraph "what this strand is" pitch. */
  pitch: string;
  /** The prep approach — what makes this strand distinct. */
  approach: string[];
  chapters: StrandChapter[];
};

/**
 * Headline numbers shown in the strategy hero.
 *
 * Paper I is Mathematics only: 50 q x 2 marks = 100 marks in 90 minutes.
 * paperQ * marksPerCorrect === totalMarks holds exactly (50 * 2 === 100), the
 * invariant the sibling-guide test asserts.
 *
 * penaltyPerWrong is 0 — MHT-CET deducts nothing for a wrong answer. That is
 * a real property of this exam, not a placeholder, and it is why
 * targetAttempts MUST equal paperQ: a blank scores the same as a wrong
 * answer, so leaving any of the 50 unanswered is strictly worse than guessing
 * it. There is no accuracy-versus-attempts trade-off to make here. (Note for
 * whoever adds this guide to tests/guide-strategy-headline.test.ts: that
 * suite's "penaltyPerWrong ~ marksPerCorrect / 3" case encodes the NDA -1/3
 * scheme and does not apply to MHT-CET.)
 *
 * The target is internally consistent rather than aspirational: 50 attempts
 * at 70% accuracy is 35 correct, which is 70 marks.
 */
export const STRATEGY_HEADLINE = {
  paperQ: 50,
  totalMarks: 100,
  marksPerCorrect: 2,
  penaltyPerWrong: 0,
  targetMarks: 70,
  targetAttempts: 50,
  targetAccuracyPct: 70,
  durationMin: 90,
  minutesPerQuestion: 1.8,
};

export const CORNERSTONE_STRAND: StrategyStrand = {
  id: "cornerstone",
  label:
    "Cornerstone — Vectors · Line and Plane · Applications of Derivative · Trigonometric Functions · Indefinite Integration · Differential Equations · Differentiation (1,905 q · 56% of bank)",
  qCount: 1905,
  pctOfBank: 56,
  pitch:
    "Seven chapters carry over 27 questions per paper on 2025-2026 shifts — 55% of a 50-question paper, or about 55 of the 100 marks. Nothing else on this exam concentrates like that, and it is why prep here is not a question of coverage: you cannot reach a good score without these seven, and you cannot reach one on these seven alone either. Because there is no negative marking, the cost of a weak cornerstone is never a wrong answer you should have skipped — it is minutes. A Vectors triple-product question you half-remember eats four minutes of a 90-minute paper and takes two long-tail questions down with it. Order and time discipline decide this paper; selection does not.",
  approach: [
    "Do these seven in prep before anything else, and do them properly — 1.8 minutes per question means a technique you can only half-execute is worth less than one you have never seen, because the half-remembered one is the one you will spend five minutes on.",
    "All seven have shipped teaching notes at /notes/mht-cet-maths — line-and-plane, vectors, applications-of-derivative, trigonometric-functions, differential-equations, indefinite-integration, differentiation. Read a chapter's notes once, then drill subtopic by subtopic; do not read all seven end-to-end first.",
    "Two of them behave in opposite ways and you should know which before you plan your hours. Line and Plane spreads its 35% HARD across all seven of its subtopics, so there is no cheap half to bank. Vectors is the opposite: at 50% HARD overall it looks worse, but Dot Product, Angle, and Perpendicularity is 76 questions at 28% HARD, a genuinely cheap quarter of the biggest chapter in the bank. Secure that before you touch Scalar Triple Product at 63%.",
    "Applications of Derivative is the best marks-per-hour chapter on the paper and it is a cornerstone: 3.23 q/paper at 20% HARD, seven subtopics and none above 31%. Approximations using Differentials is 16 questions at 0% HARD. It ran 4.48 a paper in 2023-24 and is lighter now, but it is still worth more than any chapter outside this strand. Treat it as a bank-first chapter even though its volume puts it here.",
    "Trigonometric Functions is the chapter most students under-rate, because the name is unfamiliar: it is the Std XII trigonometry chapter, and it holds trigonometric equations, inverse trigonometry and solution of triangle under one heading. It is the second-largest chapter in the bank and the third-heaviest on recent papers, 4.46 q/paper across 2025-2026. Its three parts cost about the same (equations 69 q at 42% HARD, solution of triangle 107 q at 40%, inverse trigonometry 136 q at 41%), and they are moving differently: between 2023-24 and 2025-26 solution of triangle rose from 1.26 to 1.85 a paper, while equations fell from 1.33 to 0.85 and inverse trigonometry from 2.33 to 1.77. The cheap page is inverse-trig values at 24% HARD, with inverse-trig equations at 31%; the expensive one is inverse-trig identities at 65%.",
    "On the paper, cornerstone questions are not all attempted at the same time. The bank-first and split-pass cheap halves go on the opening sweep with the quick-wins; the expensive halves wait for the second pass, when you know how much clock you actually have.",
  ],
  chapters: [
    {
      chapter: "Line and Plane",
      qCount: 304,
      pctHard: 35,
      posture: "own-outright",
      mustDrill: [
        "Plane — Equation, Normal, and Construction",
        "Line — Equation, Direction Cosines, and Vector Form",
        "Distances in 3-D",
        "Angles — Line, Plane, and Direction Conditions",
        "Tetrahedron Geometry — Centroid, Volume, and Vertices",
        "Intersection, Coplanarity, and Skew Lines",
        "Foot of Perpendicular, Image, and Projection",
      ],
      targetHard: [
        "Intersection, Coplanarity, and Skew Lines",
        "Foot of Perpendicular, Image, and Projection",
      ],
      expectedYieldPerPaper: "4.69 q/paper · about 9 marks",
      studyHours: 16,
      summary:
        "304 q · 35% HARD · the heaviest chapter on recent papers, ahead of Vectors and Trigonometric Functions. Seven subtopics and the HARD is spread rather than pooled, so this chapter does not cherry-pick: you own all seven or you lose nine marks. The cheap pages are Line — Equation, Direction Cosines, and Vector Form (18% HARD) and the small tetrahedron page (13%).",
    },
    {
      chapter: "Vectors",
      qCount: 334,
      pctHard: 50,
      posture: "split-pass",
      mustDrill: [
        "Dot Product, Angle, and Perpendicularity",
        "Magnitude, Components, and Unit Vectors",
        "Cross Product, Angle, and Area",
        "Vector Geometry — Section Formula, Triangle, and Parallelogram",
        "Linear Combinations, Collinearity, and Coplanarity",
        "Scalar Triple Product, Coplanarity, and Volume",
      ],
      targetHard: [
        "Scalar Triple Product, Coplanarity, and Volume",
        "Cross Product, Angle, and Area",
      ],
      expectedYieldPerPaper: "4.49 q/paper · about 9 marks",
      studyHours: 18,
      summary:
        "334 q · 50% HARD · the largest chapter in the bank and the hardest cornerstone. It DOES cherry-pick, which is what makes it manageable: Dot Product (76 q, 28% HARD) is the cheap block, while Scalar Triple Product (100 q, 63%) and Cross Product (83 q, 64%) carry most of the pain. Bank the cheap block on the first sweep; leave triple products for the second pass.",
    },
    {
      chapter: "Applications of Derivative",
      qCount: 253,
      pctHard: 20,
      posture: "bank-first",
      mustDrill: [
        "Approximations using Differentials",
        "Rate of Change and Related Rates",
        "Angle Between Curves and Orthogonality",
        "Rolle's Theorem and Mean Value Theorem",
        "Maxima, Minima, and Optimisation",
        "Tangents, Normals, and the Slope of a Curve",
        "Increasing and Decreasing Functions",
      ],
      expectedYieldPerPaper: "3.23 q/paper · about 6 marks",
      studyHours: 12,
      summary:
        "253 q · 20% HARD · the cheapest cornerstone by a distance and the best marks-per-hour chapter on the paper. Seven subtopics, none above 31% HARD, and Approximations using Differentials is 16 q at 0% HARD. Volume puts it in the cornerstone strand; behaviour puts it on your opening sweep.",
    },
    {
      chapter: "Trigonometric Functions",
      qCount: 312,
      pctHard: 41,
      posture: "split-pass",
      mustDrill: [
        "Trigonometric Equations and General Solutions",
        "Solution of Triangle — Sine, Cosine and Projection Rules",
        "Inverse Trigonometric Functions — Principal Values and Evaluation",
        "Inverse Trigonometric Equations",
      ],
      targetHard: [
        "Inverse Trigonometric Identities — Sums, Substitution and Telescoping",
      ],
      expectedYieldPerPaper: "4.46 q/paper · about 9 marks",
      studyHours: 12,
      summary:
        "312 q · 41% HARD · the second-largest chapter in the bank and the third-heaviest on recent papers, 4.46 q/paper across 2025-2026. Three parts over six notes pages: equations (69 q, 42% HARD), solution of triangle (107 q across the rules page and the half-angle page, 40%) and inverse trigonometry (136 q across values, identities and equations, 41%). The parts cost about the same, so the chapter is drilled whole — but inside inverse trigonometry the identities page is 65% HARD while the values page is 24% and the equations page 31%, so bank those two first. Solution of triangle is the part that is rising.",
    },
    {
      chapter: "Differential Equations",
      qCount: 216,
      pctHard: 33,
      posture: "split-pass",
      mustDrill: [
        "Order, Degree, Formation of ODE, and Verification of Solutions",
        "Growth, Decay, and Continuous Models",
        "Variable-Separable Equations",
        "Homogeneous and Reducible Equations",
        "Linear Differential Equations (Integrating Factor)",
      ],
      skipSubtopics: ["Newton's Law of Cooling"],
      targetHard: ["Linear Differential Equations (Integrating Factor)"],
      expectedYieldPerPaper: "3.38 q/paper · about 7 marks",
      studyHours: 12,
      summary:
        "216 q · 33% HARD · six subtopics that split by SOLUTION METHOD, which is exactly how the questions are set. Order/Degree/Formation (58 q, 21% HARD) is recognition work and near-free; Linear (Integrating Factor) at 54% is where it gets expensive. Newton's Law of Cooling is 9 q lifetime at 44% HARD — last in the prep queue, and still answered on the paper.",
    },
    {
      chapter: "Indefinite Integration",
      qCount: 249,
      pctHard: 48,
      posture: "split-pass",
      mustDrill: [
        "Foundations and Standard Formulae",
        "Trigonometric Integrals - Powers and Identities",
        "Integration by Substitution",
        "Rational Functions and Partial Fractions",
        "Integration by Parts",
        "Trigonometric Integrals - Rational and Substitution Forms",
      ],
      targetHard: [
        "Trigonometric Integrals - Rational and Substitution Forms",
        "Integration by Substitution",
      ],
      expectedYieldPerPaper: "3.51 q/paper · about 7 marks",
      studyHours: 14,
      summary:
        "249 q · 48% HARD · one of the three most expensive cornerstones per question, with Vectors and Differentiation. Its cheap corner is real but small: Foundations (20 q, 5%) and Trigonometric Integrals - Powers and Identities (19 q, 26%) are 39 questions of cheap marks. Everything else sits at 43% or worse, and Trigonometric Integrals - Rational and Substitution Forms is 46 q at 76% HARD.",
    },
    {
      chapter: "Differentiation",
      qCount: 237,
      pctHard: 47,
      posture: "split-pass",
      mustDrill: [
        "Foundations, Chain Rule & Differentiability",
        "Logarithmic Differentiation",
        "Inverse Functions & Inverse Trigonometric Differentiation",
        "Parametric, Higher-Order Derivatives & Relations",
        "Implicit Differentiation & Special Forms",
      ],
      skipSubtopics: ["Derivative of One Function with Respect to Another"],
      targetHard: [
        "Inverse Functions & Inverse Trigonometric Differentiation",
        "Implicit Differentiation & Special Forms",
      ],
      expectedYieldPerPaper: "3.59 q/paper · about 7 marks",
      studyHours: 12,
      summary:
        "237 q · 47% HARD. Foundations, Chain Rule & Differentiability (45 q, 31% HARD) is the cheapest entry, with Logarithmic Differentiation (32 q, 34%) next; the two biggest HARD pools, Inverse Trigonometric Differentiation (59 q, 53%) and Implicit & Special Forms (43 q, 58%), are where the marks and the minutes both are. Derivative of One Function with Respect to Another is 16 q at 63% HARD and goes last.",
    },
  ],
};

export const QUICKWIN_STRAND: StrategyStrand = {
  id: "quickwin",
  label:
    "Quick-Win — Probability Distribution · Mathematical Logic · Binomial Distribution · Linear Programming · Straight Line (540 q · 16% of bank)",
  qCount: 540,
  pctOfBank: 16,
  pitch:
    "Bank these first. Five chapters worth 7.9 questions a paper at an average well below the bank's 34.8% HARD, and the point of doing them first is not that they are worth more — every question on this paper is worth exactly 2 marks — but that they are worth the same for a third of the time. Linear Programming is the cleanest example on the whole exam: 69 questions at 3% HARD, and its corner-point page has produced 28 questions and NEVER a single HARD one. Marks secured in the first twenty minutes are marks the clock cannot take back later.",
  approach: [
    "Attempt every question from these five chapters on the opening sweep, before you look at a triple product or an integrating factor. Roughly 8 questions, roughly 16 marks, and most of them inside the 1.8-minute budget rather than over it.",
    "Probability Distribution and Binomial Distribution both have shipped teaching notes at /notes/mht-cet-maths (probability-distribution, binomial-distribution). Together they are 245 questions at 18% and 16% HARD — the largest block of cheap marks in the bank.",
    "Linear Programming is 69 q at 3% HARD across four notes pages (/notes/mht-cet-maths/linear-programming), and three of them have never produced a HARD question. If you are short on time before the exam, this is the highest-certainty chapter you can add.",
    "Mathematical Logic is 151 q at 23% HARD and is now the heaviest chapter in this strand at 2.38 a paper. Its HARD is concentrated in one small subtopic: Switching Circuits, 17 q at 53%. Everything else runs 10-26% HARD — Negation of Statements and Quantifiers (21 q, 10%), Finding Truth Values of Component Statements (31 q, 16%), Converse, Inverse, and Contrapositive (28 q, 21%) — and all of it is mechanical once you have drilled the forms.",
    "One chapter outside this strand belongs in the same habit: Sets, Relations and Functions is 66 q at 12% HARD — genuinely cheap marks — but only 0.87 q/paper on recent shifts, just under the line, which is why it has no playbook. Its four notes pages are at /notes/mht-cet-maths/sets-relations-and-functions; drill it with the tail chapters below, and answer it on the opening sweep when it appears.",
  ],
  chapters: [
    {
      chapter: "Probability Distribution",
      qCount: 159,
      pctHard: 18,
      posture: "bank-first",
      mustDrill: [
        "Classical Probability, Addition Theorem and Odds",
        "Discrete Random Variables, PMF and CDF",
        "Expectation, Variance and Standard Deviation",
        "Conditional Probability, Independence and Bayes' Theorem",
      ],
      expectedYieldPerPaper: "2.31 q/paper · about 5 marks",
      studyHours: 8,
      summary:
        "159 q · 18% HARD · the biggest quick-win by lifetime count and the tenth-heaviest chapter on recent papers. Three of its four subtopics sit at 17% HARD or below; only Conditional Probability, Independence and Bayes' Theorem (37 q, 27%) costs real time.",
    },
    {
      chapter: "Mathematical Logic",
      qCount: 151,
      pctHard: 23,
      posture: "bank-first",
      mustDrill: [
        "Statements, Connectives and Truth Tables",
        "Negation of Statements and Quantifiers",
        "Converse, Inverse, and Contrapositive",
        "Finding Truth Values of Component Statements",
        "Logical Equivalence and Algebra of Statements",
      ],
      targetHard: ["Switching Circuits"],
      expectedYieldPerPaper: "2.38 q/paper · about 5 marks",
      studyHours: 6,
      summary:
        "151 q · 23% HARD. Almost pure procedure: build the table, apply the equivalence, read the switch circuit. The 23% is not spread evenly — Switching Circuits is 17 q at 53% HARD, the densest block in the chapter, while Negation of Statements and Quantifiers is 21 q at 10%. Drill the standard circuit forms rather than reasoning each one out fresh.",
    },
    {
      chapter: "Binomial Distribution",
      qCount: 86,
      pctHard: 16,
      posture: "bank-first",
      mustDrill: [
        "The Binomial Setting and Probability Mass Function",
        "Mean, Variance and Standard Deviation of a Binomial Variable",
        "Parameter Estimation and the Probability Ratio",
        "Computing Binomial Probabilities",
      ],
      expectedYieldPerPaper: "1.10 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "86 q · 16% HARD across four small subtopics, two of which are at 12% and 9%. Computing binomial probabilities carries more questions than anything else here (38 q), and mean = np with variance = npq is pure recall; recognising the binomial setting is most of the work.",
    },
    {
      chapter: "Linear Programming",
      qCount: 69,
      pctHard: 3,
      posture: "bank-first",
      mustDrill: [
        "Corner-Point Method — Maximum and Minimum of the Objective Function",
        "Feasible Region — Half-Plane Tests, Bounded, Unbounded and Empty",
      ],
      expectedYieldPerPaper: "1.00 q/paper · 2 marks",
      studyHours: 3,
      summary:
        "69 q · 3% HARD · the cheapest chapter in the bank by some margin. The corner-point page is 28 questions and has never produced a HARD one; the feasible-region page is 16 at 0%; both HARD questions sit on the 11-question reading-constraints-off-a-figure page. Three hours of drilling buys a question a paper at near-certainty.",
    },
    {
      chapter: "Straight Line",
      qCount: 75,
      pctHard: 15,
      posture: "bank-first",
      mustDrill: [
        "Distance — From a Point, Between Parallels, Along a Direction and the Foot of the Perpendicular",
        "Forms of a Line, Intersections and Concurrency",
      ],
      expectedYieldPerPaper: "1.13 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "75 q · 15% HARD across four notes pages, with five of its 11 HARD questions on the slope-and-angle page. Worth more than its q/paper suggests because the techniques repeat elsewhere: the foot-of-perpendicular and distance work here is the 2-D dialect of Line and Plane, and the perpendicularity condition m1*m2 = -1 is the same idea as the vector dot product being zero.",
    },
  ],
};

export const LONGTAIL_STRAND: StrategyStrand = {
  id: "longtail",
  label:
    "Long Tail — Limits · Definite Integration · Determinants and Matrices · Circle · Applications of Definite Integral · Complex Numbers · Conic Sections · Pair of Straight Lines · Permutations and Combinations · Trigonometry - II (830 q · 24% of bank)",
  qCount: 830,
  pctOfBank: 24,
  pitch:
    "Ten chapters at roughly one to two and a half questions a paper each, and mostly 24-56% HARD — expensive per mark, and collectively too big to ignore at about 13 questions a paper. These come last, on the time remaining after the cornerstones and quick-wins are banked. And you still answer every single one of them, including the ones you have not prepared: there is no negative marking, so an unread Pair of Straight Lines question costs nothing to guess and a blank is strictly worse than a guess. Prep them in weightage order and stop where your hours stop; the paper will not punish the gap the way an NDA paper would.",
  approach: [
    "Every chapter here has shipped teaching notes at /notes/mht-cet-maths, with every PYQ tagged to a page.",
    "Limits is the sharpest example of a chapter that does not cherry-pick: 137 q at 56% HARD, and the four limit pages and the three continuity pages sit at the same difficulty (55% and 57%) — Exponential-Logarithmic Limits is 71% HARD, Continuity at a Point 68%, Trigonometric Limits 67%. There is no cheap half to take. Prepare the whole toolkit or none of it, and on the paper give these questions the second pass, not the first.",
    "Two chapters here reward a technique that skips calculus entirely, and at 1.8 minutes a question that is a time lever rather than an elegance: the greatest and least modulus of a complex number on a disc, and the maximum perpendicular distance from a point on a circle, are the same move — distance to the centre plus or minus the radius.",
    "Two chapters here have moved since 2023-24 and deserve more hours than the strand label suggests. Definite Integration rose from 1.30 to 2.36 a paper, and Conic Sections arrived from nothing to about one a paper in both 2025 and 2026, so no pre-2025 paper will have trained you on it.",
    "A vanishing 3x3 determinant is the universal degeneracy test across this strand and the cornerstones both — concurrency of lines, collinearity of points, coplanarity of lines, scalar triple product equal to zero. Learning it once in Determinants and Matrices pays in four other chapters.",
  ],
  chapters: [
    {
      chapter: "Limits",
      qCount: 137,
      pctHard: 56,
      posture: "last-pass-guess",
      mustDrill: [
        "Continuity at a Point — Finding f(c) and the Parameter",
        "Continuity of Piecewise Functions — Junction Conditions and Parameter Systems",
        "Algebraic Limits — Factorisation, Rationalisation and the xⁿ − aⁿ Form",
      ],
      targetHard: [
        "Trigonometric Limits — sin x/x and the 1 − cos x Family",
        "Exponential, Logarithmic and 1^∞ Limits",
        "Continuity at a Point — Finding f(c) and the Parameter",
      ],
      expectedYieldPerPaper: "1.97 q/paper · about 4 marks",
      studyHours: 6,
      summary:
        "137 q · 56% HARD · the highest %HARD of any chapter in this strand, and it does not cherry-pick: the limit pages and the continuity pages average 55% and 57% HARD, and four of the seven pages are at 50% or above. Two questions a paper at full price. Prepare the whole toolkit or accept that you are guessing them — which, on this exam, is a legitimate choice.",
    },
    {
      chapter: "Definite Integration",
      qCount: 132,
      pctHard: 44,
      posture: "last-pass-guess",
      mustDrill: [
        "Odd and Even Integrands — Symmetric Limits",
        "King's Property — f(a + b − x) and the f/(f + g) Family",
        "Modulus and Greatest-Integer Integrands — Split the Interval",
        "Evaluating Definite Integrals — Standard Forms, Algebraic Substitution and By Parts",
      ],
      targetHard: ["Trigonometric Definite Integrals — tan x = t, Half-Angle Forms and Powers"],
      expectedYieldPerPaper: "2.36 q/paper · about 5 marks",
      studyHours: 5,
      summary:
        "132 q · 44% HARD, and the fastest-growing chapter on the paper: 1.30 a paper in 2023-24, 2.36 in 2025-26, most of the rise on the evaluation page (45 q, 42%). The three property pages — odd/even symmetry (18 q, 50%), King's property (28 q, 50%) and modulus/greatest-integer splitting (25 q, 20%) — are 71 of the 132, and each is exactly the kind of one-line trick that turns a four-minute integral into a thirty-second one. The trigonometric block (16 q) is the expensive corner at 69% HARD.",
    },
    {
      chapter: "Determinants and Matrices",
      qCount: 102,
      pctHard: 35,
      posture: "last-pass-guess",
      mustDrill: [
        "Inverse of a Matrix — Adjoint Formula, Products and Verification",
        "Cayley–Hamilton, Matrix Polynomials and Powers",
        "Systems of Linear Equations and Symmetric, Skew-Symmetric Matrices",
        "Determinants, Cofactors and the Adjoint Identities",
      ],
      targetHard: ["Determinants, Cofactors and the Adjoint Identities"],
      expectedYieldPerPaper: "1.77 q/paper · about 4 marks",
      studyHours: 4,
      summary:
        "102 q · 35% HARD, and the determinant and adjoint identities page is 56%. It ran 1.08 a paper in 2025 and 2.12 in 2026, and it is worth more than its strand suggests, because the vanishing-determinant degeneracy test learned here reappears as concurrency, collinearity, coplanarity and the scalar triple product across four other chapters.",
    },
    {
      chapter: "Circle",
      qCount: 71,
      pctHard: 28,
      posture: "last-pass-guess",
      mustDrill: [
        "Equation of a Circle — Centre-Radius, General, Diameter and Parametric Forms",
        "Concentric Circles and Circles Touching a Line or an Axis",
        "Distance From a Point to a Circle — Greatest, Least, a Line Cutting the Circle and the Segment Area",
      ],
      skipSubtopics: [
        "Two Circles — Touching, Common Tangents and Relative Position",
      ],
      expectedYieldPerPaper: "1.05 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "71 q · 28% HARD. The equation page (22 q, 23%) and the concentric-and-touching page (10 q, 30%) are the entry, and the distance page (9 q) has never produced a HARD question; Tangents (21 q, 38%) and Two Circles (9 q, 44%) are the expensive corners and go last in the queue. The greatest-and-least-distance move here is the same as the complex-modulus-on-a-disc one.",
    },
    {
      chapter: "Conic Sections",
      qCount: 44,
      pctHard: 27,
      posture: "last-pass-guess",
      mustDrill: ["Parabola", "Ellipse and Hyperbola"],
      expectedYieldPerPaper: "1.08 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "44 q · 27% HARD, and 42 of the 44 are from 2025 and 2026: the chapter the 2025 syllabus added and 2026 kept, at about one question a paper. Two notes pages at the same cost, the parabola (18 q, 28%) and the ellipse with the hyperbola (26 q, 27%), and tangents run through both (18 of the 44 stems name one). No pre-2025 paper will have trained you on it, so drill it from 2025 and 2026 papers.",
    },
    {
      chapter: "Complex Numbers",
      qCount: 67,
      pctHard: 24,
      posture: "split-pass",
      mustDrill: [
        "Modulus and Argument — Polar Form, De Moivre and Square Roots",
        "Locus in the Argand Plane — Circles, Lines and Greatest/Least Modulus",
      ],
      targetHard: ["Algebra of Complex Numbers — Conjugates, Powers of i and Cube Roots of Unity"],
      expectedYieldPerPaper: "0.95 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "67 q · 24% HARD, and it splits: Modulus and Argument is 26 q at 19% HARD and Locus 11 q at 18%, while Algebra with the cube roots of unity is 30 q at 30%. Take the modulus and locus pages on the first sweep — the greatest-and-least-modulus shape is answered by distance to the centre plus or minus the radius, with no calculus at all.",
    },
    {
      chapter: "Applications of Definite Integral",
      qCount: 78,
      pctHard: 24,
      posture: "last-pass-guess",
      mustDrill: [
        "Area Under a Curve — Between a Curve and an Axis",
        "Area Between Two Curves — Intersections First",
      ],
      expectedYieldPerPaper: "1.21 q/paper · about 2 marks",
      studyHours: 3,
      summary:
        "78 q · 24% HARD, and 65 of those 78 are the two area pages — under one curve (29 q, 10% HARD) and between two curves (36 q, 31%). That makes it the most concentrated chapter in this strand and a cheap three hours; the circle, ellipse and hyperbola page (13 q, 38%) is the only corner that needs a standard result learnt cold.",
    },
    {
      chapter: "Pair of Straight Lines",
      qCount: 73,
      pctHard: 42,
      posture: "last-pass-guess",
      mustDrill: [
        "Joint Equation of Two Lines — Product of Linear Factors and the Triangle They Form",
        "Angle Between the Pair — Perpendicular Pairs, Lines at a Given Angle and the Bisectors",
      ],
      targetHard: ["Slopes of a Homogeneous Pair — Sum, Product and Ratio Conditions"],
      expectedYieldPerPaper: "1.13 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "73 q · 42% HARD. The joint-equation page runs 18% HARD and the other three run 47-56%, the slopes page densest at 56%. It is formula-driven rather than insight-driven, which makes it a good late addition: the perpendicularity condition here is a + b = 0, the pair-of-lines dialect of the same idea that is m1*m2 = -1 for lines and a zero dot product for vectors.",
    },
    {
      chapter: "Permutations and Combinations",
      qCount: 65,
      pctHard: 34,
      posture: "last-pass-guess",
      mustDrill: [
        "Arrangements with Constraints — Together, Never Together, Fixed Positions and Repeated Letters",
        "Counting Numbers and Geometric Figures — Digits, Divisibility, Points and Polygons",
      ],
      expectedYieldPerPaper: "0.97 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "65 q · 34% HARD. One of the most error-prone chapters on the paper: the failure mode is a mis-set-up count rather than a mis-executed formula, and Circular Arrangements and Selections with Conditions (9 q each) run 56% HARD. Drill the constraint shapes — together, never together, at least, at most — rather than the formulas; the identities page (12 q, 8%) and the digit and polygon counts (19 q, 26%) are the cheapest marks here.",
    },
    {
      chapter: "Trigonometry - II",
      qCount: 61,
      pctHard: 48,
      posture: "last-pass-guess",
      mustDrill: ["Multiple and Sub-multiple Angles", "Sum-to-Product and Product Formulas"],
      expectedYieldPerPaper: "0.92 q/paper · about 2 marks",
      studyHours: 3,
      summary:
        "61 q · 48% HARD. The HARD questions sit mostly on two pages: multiple angles (13 of 20) and sum-to-product (9 of 14); compound angles is 7 of 27. 11 of its 29 HARD questions ask for a value at fixed angles (π/8, π/24, 9°, 10°, 18°, 20°) that falls to a known value or a product trick rather than to long algebra, so learn sin 18°, cos 36° and tan(π/8) first; the conditional identities (α + β + γ = π and the like) are the expensive half and belong on the second pass.",
    },
  ],
};

export const STRATEGY_STRANDS = [
  CORNERSTONE_STRAND,
  QUICKWIN_STRAND,
  LONGTAIL_STRAND,
];

/**
 * Whether a tail chapter is worth preparing at all right now.
 *
 * "dropped" is a measured claim, not a prediction: Measures of Dispersion ran
 * a question a paper across 27 shifts in 2023-24 and then scored ZERO across
 * all 39 papers of 2025 and 2026. "entering" is its mirror image, kept for a
 * chapter that arrives below the line: Conic Sections held it until
 * 2026-10-13, when its 2025-2026 rate (1.08) cleared the playbook line.
 */
export type TailStatus = "live" | "entering" | "dropped";

export type TailChapter = {
  chapter: string;
  qCount: number;
  /** Recent weightage (2025-2026, 39 shifts). All are below the 0.9 q/paper
   *  line, which is why none of these ships a playbook. */
  qPerPaper: number;
  pctHard: number;
  status: TailStatus;
  note: string;
};

/**
 * The four chapters below the 0.9 q/paper line: no playbook, listed here so
 * the 26-chapter bank is accounted for rather than quietly truncated at 22.
 *
 * The 2025 syllabus shift is the reason this block matters more than its
 * question counts suggest: a student prepping from 2023-24 papers spends real
 * hours on a chapter that is dead.
 */
export const TAIL_CHAPTERS: TailChapter[] = [
  {
    chapter: "Sets, Relations and Functions",
    qCount: 66,
    qPerPaper: 0.87,
    pctHard: 12,
    status: "live",
    note: "The one genuine cheap-marks chapter below the line: 12% HARD, the third-lowest in the bank after Linear Programming and the dropped Measures of Dispersion. Just below the playbook line on volume alone (0.87 a paper); drill it with the quick-wins.",
  },
  {
    chapter: "Measures of Dispersion",
    qCount: 30,
    qPerPaper: 0,
    pctHard: 10,
    status: "dropped",
    note: "DROPPED after 2024, and 2026 confirmed it. It ran 1.0 question per paper across 27 shifts in 2023-24 and then scored ZERO across all 39 papers of 2025 and 2026. At 10% HARD it used to be one of the cheapest chapters on the exam, which is exactly why it is a trap now: it is pleasant to revise and worth nothing. Its notes (/notes/mht-cet-maths/measures-of-dispersion) exist as a formula rehearsal for Probability Distribution, not as a paper topic. Do not spend hours here.",
  },
  {
    chapter: "Sequences and Series",
    qCount: 11,
    qPerPaper: 0.18,
    pctHard: 36,
    status: "live",
    note: "11 questions in 68 shifts at 36% HARD. Read the standard AP, GP and sum formulas once so a question is recognisable; do not drill it.",
  },
  {
    chapter: "Quadratic Equations",
    qCount: 6,
    qPerPaper: 0.1,
    pctHard: 33,
    status: "live",
    note: "6 questions in 68 shifts, the smallest chapter in the bank. The roots-and-coefficients relations are worth knowing because they surface inside other chapters; the chapter itself is not worth a session.",
  },
];

export const DIFFICULTIES_EASY_MOD: Difficulty[] = ["EASY", "MODERATE"];
