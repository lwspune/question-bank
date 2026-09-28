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
 * TIERING is on RECENT weightage (2024-2025, 25 shifts) plus %HARD, not on
 * lifetime average — MHT-CET moved its syllabus for 2025 and a lifetime
 * average hides the move in both directions. See TAIL_CHAPTERS.
 *
 * NUMBERS. Chapter q-counts and %HARD are lifetime figures over the 2,175
 * PUBLIC past-year questions (44 shifts, 2021-2025, 26 chapters, 85
 * subtopics). q/paper figures quoted in prose are the recent-weightage
 * numbers. A strand's `qCount` is the sum of its chapters' lifetime counts and
 * `pctOfBank` is that sum as a share of 2,175 — those two are addition, not
 * new measurements. The three strands plus the five tail chapters below
 * reconcile to 2,175 exactly (1,256 + 347 + 468 + 104), re-measured 2026-09-26 after 83
 * undated "2025 Shift ||" compilation rows went PRIVATE as twins of dated papers, which
 * took 2025 from 14 columns to its 13 real shifts. Trigonometry - II crossed the 0.9 line
 * (0.88 -> 0.92) on that re-measure and moved from the tail block into the long tail. The 2026-09-26 trigonometry
 * carve (Trigonometry - I emptied into Trigonometric Functions and Trigonometry - II,
 * then deleted; 26 chapters) moved +44 q into the cornerstone strand, -77 q out of the
 * long tail and +22 q into the tail block; the strand figures below carry that delta.
 *
 * Difficulty split across the bank: EASY 218 (10.0%) · MODERATE 1,127 (51.8%)
 * · HARD 830 (38.2%).
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
  /** Lifetime PUBLIC PYQ count for the chapter (of 2,175). */
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
  /** That sum as a share of the 2,175-question bank. */
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
    "Cornerstone — Vectors · Line and Plane · Applications of Derivative · Trigonometric Functions · Indefinite Integration · Differential Equations · Differentiation (1,256 q · 58% of bank)",
  qCount: 1256,
  pctOfBank: 58,
  pitch:
    "Seven chapters carry 28.72 questions per paper — 57% of a 50-question paper, or 57 of the 100 marks. Nothing else on this exam concentrates like that, and it is why prep here is not a question of coverage: you cannot reach a good score without these seven, and you cannot reach one on these seven alone either. Because there is no negative marking, the cost of a weak cornerstone is never a wrong answer you should have skipped — it is minutes. A Vectors triple-product question you half-remember eats four minutes of a 90-minute paper and takes two long-tail questions down with it. Order and time discipline decide this paper; selection does not.",
  approach: [
    "Do these seven in prep before anything else, and do them properly — 1.8 minutes per question means a technique you can only half-execute is worth less than one you have never seen, because the half-remembered one is the one you will spend five minutes on.",
    "All seven have shipped teaching notes at /notes/mht-cet-maths — line-and-plane, vectors, applications-of-derivative, trigonometric-functions, differential-equations, indefinite-integration, differentiation. Read a chapter's notes once, then drill subtopic by subtopic; do not read all seven end-to-end first.",
    "Two of them do NOT cherry-pick and you should know which before you plan your hours. Line and Plane spreads 43% HARD across all seven of its subtopics, so there is no cheap third to bank. Vectors is the opposite: at 55% HARD overall it looks worse, but Dot Product, Angle, and Perpendicularity is 48 questions at 25% HARD — a genuinely cheap third of the biggest chapter in the bank. Secure that before you touch Scalar Triple Product at 72%.",
    "Applications of Derivative is the best marks-per-hour chapter on the paper and it is a cornerstone: 3.88 q/paper at 23% HARD, seven subtopics and none above 31%. Approximations using Differentials is 12 questions at 0% HARD. Treat it as a bank-first chapter even though its volume puts it here.",
    "Trigonometric Functions is the chapter most students under-rate, because the name is unfamiliar: it is the Std XII trigonometry chapter, and it holds trigonometric equations, inverse trigonometry and solution of triangle under one heading. It is the second-largest chapter in the bank and the heaviest on recent papers, 5.04 q/paper across 2024-2025. Its three parts cost about the same (equations 47 q at 36% HARD, solution of triangle 71 q at 41%, inverse trigonometry 93 q at 37%), and they are moving differently: solution of triangle rose from 1.61 to 2.12 a paper while equations fell from 1.07 to 0.80. The cheap pages are inverse-trig values and inverse-trig equations, both under 25% HARD; the expensive one is inverse-trig identities at 63%.",
    "On the paper, cornerstone questions are not all attempted at the same time. The bank-first and split-pass cheap halves go on the opening sweep with the quick-wins; the expensive halves wait for the second pass, when you know how much clock you actually have.",
  ],
  chapters: [
    {
      chapter: "Line and Plane",
      qCount: 200,
      pctHard: 43,
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
      expectedYieldPerPaper: "4.96 q/paper · about 10 marks",
      studyHours: 16,
      summary:
        "200 q · 43% HARD · the second-heaviest chapter on recent papers, just behind Trigonometric Functions. Seven subtopics and the HARD is spread rather than pooled, so this chapter does not cherry-pick: you own all seven or you lose ten marks. Only Line — Equation, Direction Cosines, and Vector Form is genuinely cheap at 21% HARD.",
    },
    {
      chapter: "Vectors",
      qCount: 224,
      pctHard: 55,
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
      expectedYieldPerPaper: "4.84 q/paper · about 10 marks",
      studyHours: 18,
      summary:
        "224 q · 55% HARD · the largest chapter in the bank and the hardest cornerstone. It DOES cherry-pick, which is what makes it manageable: Dot Product (48 q, 25% HARD) is the cheap third, while Scalar Triple Product (71 q, 72%) and Cross Product (66 q, 64%) carry most of the pain. Bank the cheap third on the first sweep; leave triple products for the second pass.",
    },
    {
      chapter: "Applications of Derivative",
      qCount: 182,
      pctHard: 23,
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
      expectedYieldPerPaper: "3.88 q/paper · about 8 marks",
      studyHours: 12,
      summary:
        "182 q · 23% HARD · the cheapest cornerstone by a distance and the best marks-per-hour chapter on the paper. Seven subtopics, none above 31% HARD, and Approximations using Differentials is 12 q at 0% HARD. Volume puts it in the cornerstone strand; behaviour puts it on your opening sweep.",
    },
    {
      chapter: "Trigonometric Functions",
      qCount: 211,
      pctHard: 38,
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
      expectedYieldPerPaper: "5.04 q/paper · about 10 marks",
      studyHours: 12,
      summary:
        "211 q · 38% HARD · the second-largest chapter in the bank and the heaviest on recent papers, 5.04 q/paper across 2024-2025. Three parts over six notes pages: equations (47 q, 36% HARD), solution of triangle (71 q across the rules page and the half-angle page, 41%) and inverse trigonometry (94 q across values, identities and equations, 36%). The parts cost about the same, so the chapter is drilled whole — but inside inverse trigonometry the identities page is 63% HARD while the values and equations pages are under 25%, so bank those two first. Solution of triangle is the part that is rising.",
    },
    {
      chapter: "Differential Equations",
      qCount: 141,
      pctHard: 38,
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
      expectedYieldPerPaper: "3.36 q/paper · about 7 marks",
      studyHours: 12,
      summary:
        "141 q · 38% HARD · six subtopics that split by SOLUTION METHOD, which is exactly how the questions are set. Order/Degree/Formation (33 q, 24% HARD) is recognition work and near-free; Linear (Integrating Factor) at 63% is where it gets expensive. Newton's Law of Cooling is 5 q lifetime at 60% HARD — last in the prep queue, and still answered on the paper.",
    },
    {
      chapter: "Indefinite Integration",
      qCount: 159,
      pctHard: 53,
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
      expectedYieldPerPaper: "3.44 q/paper · about 7 marks",
      studyHours: 14,
      summary:
        "159 q · 53% HARD · the most expensive cornerstone per question. Its cheap corner is real but small: Foundations (8 q, 13%) and Trigonometric Integrals - Powers and Identities (11 q, 18%) are 21 questions of near-free marks. Everything else sits at 48% or worse, and Trigonometric Integrals - Rational and Substitution Forms is 36 q at 75% HARD.",
    },
    {
      chapter: "Differentiation",
      qCount: 139,
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
      expectedYieldPerPaper: "3.20 q/paper · about 6 marks",
      studyHours: 12,
      summary:
        "139 q · 47% HARD. Foundations, Chain Rule & Differentiability (22 q, 32% HARD) is the only cheap entry; the two biggest subtopics — Inverse Trigonometric Differentiation (39 q, 49%) and Implicit & Special Forms (31 q, 52%) — are where the marks and the minutes both are. Derivative of One Function with Respect to Another is 7 q at 71% HARD and goes last.",
    },
  ],
};

export const QUICKWIN_STRAND: StrategyStrand = {
  id: "quickwin",
  label:
    "Quick-Win — Probability Distribution · Mathematical Logic · Binomial Distribution · Linear Programming · Straight Line (347 q · 16% of bank)",
  qCount: 347,
  pctOfBank: 16,
  pitch:
    "Bank these first. Five chapters worth 7.8 questions a paper at an average well below the bank's 38.2% HARD, and the point of doing them first is not that they are worth more — every question on this paper is worth exactly 2 marks — but that they are worth the same for a third of the time. Linear Programming is the cleanest example on the whole exam: 45 questions at 4% HARD, and its corner-point page has produced 16 questions and NEVER a single HARD one. Marks secured in the first twenty minutes are marks the clock cannot take back later.",
  approach: [
    "Attempt every question from these five chapters on the opening sweep, before you look at a triple product or an integrating factor. Roughly 8 questions, roughly 16 marks, and most of them inside the 1.8-minute budget rather than over it.",
    "Probability Distribution and Binomial Distribution both have shipped teaching notes at /notes/mht-cet-maths (probability-distribution, binomial-distribution). Together they are 171 questions at 21% and 22% HARD — the largest block of cheap marks in the bank.",
    "Linear Programming is 45 q at 4% HARD across four notes pages (/notes/mht-cet-maths/linear-programming), and three of them have never produced a HARD question. If you are short on time before the exam, this is the highest-certainty chapter you can add.",
    "Mathematical Logic is 86 q at 29% HARD, and the HARD is concentrated in one small subtopic: Switching Circuits, 11 q at 64%. Everything else is well below the chapter average — Negation of Statements and Quantifiers (14 q, 14%), Finding Truth Values of Component Statements (16 q, 19%), Converse, Inverse, and Contrapositive (17 q, 24%) — and all of it is mechanical once you have drilled the forms.",
    "One chapter outside this strand belongs in the same habit: Sets, Relations and Functions is 40 q at 13% HARD — genuinely cheap marks — but only 0.72 q/paper on recent shifts, which is why it has no playbook. Its four notes pages are at /notes/mht-cet-maths/sets-relations-and-functions; drill it with the tail chapters below, and answer it on the opening sweep when it appears.",
  ],
  chapters: [
    {
      chapter: "Probability Distribution",
      qCount: 112,
      pctHard: 21,
      posture: "bank-first",
      mustDrill: [
        "Classical Probability, Addition Theorem and Odds",
        "Discrete Random Variables, PMF and CDF",
        "Expectation, Variance and Standard Deviation",
        "Conditional Probability, Independence and Bayes' Theorem",
      ],
      expectedYieldPerPaper: "2.64 q/paper · about 5 marks",
      studyHours: 8,
      summary:
        "112 q · 21% HARD · the biggest quick-win and the eighth-heaviest chapter on recent papers. Three of its four subtopics sit at 19% HARD or below; only Conditional Probability, Independence and Bayes' Theorem (25 q, 32%) costs real time.",
    },
    {
      chapter: "Mathematical Logic",
      qCount: 86,
      pctHard: 29,
      posture: "bank-first",
      mustDrill: [
        "Statements, Connectives and Truth Tables",
        "Negation of Statements and Quantifiers",
        "Converse, Inverse, and Contrapositive",
        "Finding Truth Values of Component Statements",
        "Logical Equivalence and Algebra of Statements",
      ],
      targetHard: ["Switching Circuits"],
      expectedYieldPerPaper: "1.92 q/paper · about 4 marks",
      studyHours: 6,
      summary:
        "86 q · 29% HARD. Almost pure procedure: build the table, apply the equivalence, read the switch circuit. The 31% is not spread evenly — Switching Circuits is 11 q at 64% HARD, the densest block in the chapter, while Negation of Statements and Quantifiers is 14 q at 14%. Drill the standard circuit forms rather than reasoning each one out fresh.",
    },
    {
      chapter: "Binomial Distribution",
      qCount: 59,
      pctHard: 22,
      posture: "bank-first",
      mustDrill: [
        "The Binomial Setting and Probability Mass Function",
        "Mean, Variance and Standard Deviation of a Binomial Variable",
        "Parameter Estimation and the Probability Ratio",
        "Computing Binomial Probabilities",
      ],
      expectedYieldPerPaper: "1.28 q/paper · about 3 marks",
      studyHours: 4,
      summary:
        "59 q · 22% HARD across four small subtopics, two of which are at 13% and 10%. Mean = np and variance = npq carry more questions than anything else here; recognising the binomial setting is most of the work.",
    },
    {
      chapter: "Linear Programming",
      qCount: 45,
      pctHard: 4,
      posture: "bank-first",
      mustDrill: [
        "Corner-Point Method — Maximum and Minimum of the Objective Function",
        "Feasible Region — Half-Plane Tests, Bounded, Unbounded and Empty",
      ],
      expectedYieldPerPaper: "1.00 q/paper · 2 marks",
      studyHours: 3,
      summary:
        "45 q · 4% HARD · the cheapest chapter in the bank by some margin. The corner-point page is 16 questions and has never produced a HARD one; the feasible-region page is 13 at 0%; both HARD questions sit on the 9-question reading-constraints-off-a-figure page. Three hours of drilling buys a question a paper at near-certainty.",
    },
    {
      chapter: "Straight Line",
      qCount: 45,
      pctHard: 20,
      posture: "bank-first",
      mustDrill: [
        "Distance — From a Point, Between Parallels, Along a Direction and the Foot of the Perpendicular",
        "Forms of a Line, Intersections and Concurrency",
      ],
      expectedYieldPerPaper: "0.96 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "45 q · 20% HARD across four notes pages, with every HARD question on the slope-and-angle page. Worth more than its q/paper suggests because the techniques repeat elsewhere: the foot-of-perpendicular and distance work here is the 2-D dialect of Line and Plane, and the perpendicularity condition m1*m2 = -1 is the same idea as the vector dot product being zero.",
    },
  ],
};

export const LONGTAIL_STRAND: StrategyStrand = {
  id: "longtail",
  label:
    "Long Tail — Limits · Definite Integration · Determinants and Matrices · Circle · Applications of Definite Integral · Complex Numbers · Pair of Straight Lines · Permutations and Combinations · Trigonometry - II (468 q · 22% of bank)",
  qCount: 468,
  pctOfBank: 22,
  pitch:
    "Nine chapters at roughly one to two questions a paper each, and mostly 31-56% HARD — expensive per mark, and collectively too big to ignore at about 11 questions a paper. These come last, on the time remaining after the cornerstones and quick-wins are banked. And you still answer every single one of them, including the ones you have not prepared: there is no negative marking, so an unread Pair of Straight Lines question costs nothing to guess and a blank is strictly worse than a guess. Prep them in weightage order and stop where your hours stop; the paper will not punish the gap the way an NDA paper would.",
  approach: [
    "Every chapter here has shipped teaching notes at /notes/mht-cet-maths, with every PYQ tagged to a page.",
    "Limits is the sharpest example of a chapter that does not cherry-pick: 90 q at 56% HARD, and the four limit pages and the three continuity pages sit at the same difficulty — Trigonometric Limits is 67% HARD, Continuity at a Point 58%, Piecewise Continuity 55%. There is no cheap half to take. Prepare the whole toolkit or none of it, and on the paper give these questions the second pass, not the first.",
    "Two chapters here reward a technique that skips calculus entirely, and at 1.8 minutes a question that is a time lever rather than an elegance: the greatest and least modulus of a complex number on a disc, and the maximum perpendicular distance from a point on a circle, are the same move — distance to the centre plus or minus the radius.",
    "A vanishing 3x3 determinant is the universal degeneracy test across this strand and the cornerstones both — concurrency of lines, collinearity of points, coplanarity of lines, scalar triple product equal to zero. Learning it once in Determinants and Matrices pays in four other chapters.",
  ],
  chapters: [
    {
      chapter: "Limits",
      qCount: 90,
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
      expectedYieldPerPaper: "2.04 q/paper · about 4 marks",
      studyHours: 6,
      summary:
        "90 q · 56% HARD · the highest %HARD of any chapter in this strand, and it does not cherry-pick: every one of its seven pages is between 44% and 67% HARD. Two questions a paper at full price. Prepare the whole toolkit or accept that you are guessing them — which, on this exam, is a legitimate choice.",
    },
    {
      chapter: "Definite Integration",
      qCount: 69,
      pctHard: 48,
      posture: "last-pass-guess",
      mustDrill: [
        "Odd and Even Integrands — Symmetric Limits",
        "King's Property — f(a + b − x) and the f/(f + g) Family",
        "Modulus and Greatest-Integer Integrands — Split the Interval",
      ],
      targetHard: ["Trigonometric Definite Integrals — tan x = t, Half-Angle Forms and Powers"],
      expectedYieldPerPaper: "1.72 q/paper · about 3 marks",
      studyHours: 5,
      summary:
        "69 q · 48% HARD. The three property pages — odd/even symmetry (11 q, 55%), King's property (17 q, 47%) and modulus/greatest-integer splitting (15 q, 27%) — are 43 of the 68, and each is exactly the kind of one-line trick that turns a four-minute integral into a thirty-second one. The trigonometric block (11 q) is the expensive corner at 73% HARD.",
    },
    {
      chapter: "Determinants and Matrices",
      qCount: 49,
      pctHard: 49,
      posture: "last-pass-guess",
      mustDrill: [
        "Inverse of a Matrix — Adjoint Formula, Products and Verification",
        "Cayley–Hamilton, Matrix Polynomials and Powers",
        "Systems of Linear Equations and Symmetric, Skew-Symmetric Matrices",
        "Determinants, Cofactors and the Adjoint Identities",
      ],
      targetHard: ["Determinants, Cofactors and the Adjoint Identities"],
      expectedYieldPerPaper: "1.12 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "49 q · 49% HARD, and the determinant and adjoint identities page is 69%. Worth more than one question a paper suggests, because the vanishing-determinant degeneracy test learned here reappears as concurrency, collinearity, coplanarity and the scalar triple product across four other chapters.",
    },
    {
      chapter: "Circle",
      qCount: 46,
      pctHard: 37,
      posture: "last-pass-guess",
      mustDrill: [
        "Equation of a Circle — Centre-Radius, General, Diameter and Parametric Forms",
        "Concentric Circles and Circles Touching a Line or an Axis",
        "Distance From a Point to a Circle — Greatest, Least, a Line Cutting the Circle and the Segment Area",
      ],
      skipSubtopics: [
        "Two Circles — Touching, Common Tangents and Relative Position",
      ],
      expectedYieldPerPaper: "1.04 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "46 q · 37% HARD. The equation page (12 q, 33%) and the concentric-and-touching page (6 q, 17%) are the cheap entry; Tangents (14 q, 50%) and Two Circles (8 q, 50%) are the expensive corners and go last in the queue. The greatest-and-least-distance move here is the same as the complex-modulus-on-a-disc one.",
    },
    {
      chapter: "Complex Numbers",
      qCount: 45,
      pctHard: 31,
      posture: "split-pass",
      mustDrill: [
        "Modulus and Argument — Polar Form, De Moivre and Square Roots",
        "Locus in the Argand Plane — Circles, Lines and Greatest/Least Modulus",
      ],
      targetHard: ["Algebra of Complex Numbers — Conjugates, Powers of i and Cube Roots of Unity"],
      expectedYieldPerPaper: "1.00 q/paper · 2 marks",
      studyHours: 4,
      summary:
        "45 q · 31% HARD, and it splits cleanly: Modulus and Argument is 18 q at 28% HARD and Locus 12 q at 17%, while Algebra with the cube roots of unity is 15 q at 47%. Take the modulus and locus pages on the first sweep — the greatest-and-least-modulus shape is answered by distance to the centre plus or minus the radius, with no calculus at all.",
    },
    {
      chapter: "Applications of Definite Integral",
      qCount: 44,
      pctHard: 32,
      posture: "last-pass-guess",
      mustDrill: [
        "Area Under a Curve — Between a Curve and an Axis",
        "Area Between Two Curves — Intersections First",
      ],
      expectedYieldPerPaper: "1.00 q/paper · 2 marks",
      studyHours: 3,
      summary:
        "44 q · 32% HARD, and 35 of those 44 are the two area pages — under one curve (14 q, 14% HARD) and between two curves (21 q, 38%). That makes it the most concentrated chapter in this strand and a cheap three hours; the circle, ellipse and hyperbola page (9 q, 44%) is the only corner that needs a standard result learnt cold.",
    },
    {
      chapter: "Pair of Straight Lines",
      qCount: 44,
      pctHard: 41,
      posture: "last-pass-guess",
      mustDrill: [
        "Joint Equation of Two Lines — Product of Linear Factors and the Triangle They Form",
        "Slopes of a Homogeneous Pair — Sum, Product and Ratio Conditions",
      ],
      targetHard: ["Angle Between the Pair — Perpendicular Pairs, Lines at a Given Angle and the Bisectors"],
      expectedYieldPerPaper: "1.00 q/paper · 2 marks",
      studyHours: 4,
      summary:
        "44 q · 41% HARD, with the cost concentrated on the angle page (12 q, 58%) while the joint-equation page runs 17%. It is formula-driven rather than insight-driven, which makes it a good late addition: the perpendicularity condition here is a + b = 0, the pair-of-lines dialect of the same idea that is m1*m2 = -1 for lines and a zero dot product for vectors.",
    },
    {
      chapter: "Permutations and Combinations",
      qCount: 42,
      pctHard: 40,
      posture: "last-pass-guess",
      mustDrill: [
        "Arrangements with Constraints — Together, Never Together, Fixed Positions and Repeated Letters",
        "Counting Numbers and Geometric Figures — Digits, Divisibility, Points and Polygons",
      ],
      expectedYieldPerPaper: "1.00 q/paper · 2 marks",
      studyHours: 4,
      summary:
        "42 q · 40% HARD. The smallest chapter with a playbook and one of the most error-prone: the failure mode is a mis-set-up count rather than a mis-executed formula, and Circular Arrangements (6 q) runs 83% HARD. Drill the constraint shapes — together, never together, at least, at most — rather than the formulas; the digit and polygon counts are the cheapest marks here.",
    },
    {
      chapter: "Trigonometry - II",
      qCount: 39,
      pctHard: 49,
      posture: "last-pass-guess",
      mustDrill: ["Multiple and Sub-multiple Angles", "Sum-to-Product and Product Formulas"],
      expectedYieldPerPaper: "0.92 q/paper · about 2 marks",
      studyHours: 3,
      summary:
        "39 q · 49% HARD. The HARD questions sit on two pages: multiple angles (9 of 13) and sum-to-product (8 of 13); compound angles is 2 of 13. Eight of its 19 HARD questions are evaluations at 18°, 20° and π/8 that fall to a memorised value rather than to algebra, so learn sin 18°, cos 36° and tan(π/8) first; the conditional identities (α + β + γ = π and the like) are the expensive half and belong on the second pass.",
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
 * a question a paper across 29 shifts in 2023-24 and then scored ZERO across
 * all 13 papers of 2025. "entering" is its mirror image — Conic Sections had
 * 3 questions before 2025 and 15 in 2025 alone.
 */
export type TailStatus = "live" | "entering" | "dropped";

export type TailChapter = {
  chapter: string;
  qCount: number;
  /** Recent weightage (2024-2025, 25 shifts). All are below the 0.9 q/paper
   *  line, which is why none of these ships a playbook. */
  qPerPaper: number;
  pctHard: number;
  status: TailStatus;
  note: string;
};

/**
 * The five chapters below the 0.9 q/paper line — no playbook, listed here so
 * the 26-chapter bank is accounted for rather than quietly truncated at 21.
 *
 * The 2025 syllabus shift is the reason this block matters more than its
 * question counts suggest: a student prepping from 2023-24 papers spends real
 * hours on a chapter that is dead and gets blindsided by one that is live.
 */
export const TAIL_CHAPTERS: TailChapter[] = [
  {
    chapter: "Sets, Relations and Functions",
    qCount: 40,
    qPerPaper: 0.72,
    pctHard: 13,
    status: "live",
    note: "The one genuine cheap-marks chapter below the line — 13% HARD, the third-lowest in the bank after Linear Programming and the dropped Measures of Dispersion. Below the playbook line on volume alone; drill it with the quick-wins.",
  },
  {
    chapter: "Conic Sections",
    qCount: 18,
    qPerPaper: 0.68,
    pctHard: 39,
    status: "entering",
    note: "ENTERED in 2025: 3 questions across 2021-2024, then 15 in 2025 alone. Its lifetime weightage understates it badly, and a student prepping from 2023-24 papers has never seen it. Expensive at 39% HARD, but no longer optional.",
  },
  {
    chapter: "Measures of Dispersion",
    qCount: 32,
    qPerPaper: 0.48,
    pctHard: 9,
    status: "dropped",
    note: "DROPPED after 2024. It ran 1.0 question per paper across 29 shifts in 2023-24 and then scored ZERO across all 13 papers of 2025. At 9% HARD it used to be one of the cheapest chapters on the exam, which is exactly why it is a trap now: it is pleasant to revise and worth nothing. Its notes (/notes/mht-cet-maths/measures-of-dispersion) exist as a formula rehearsal for Probability Distribution, not as a paper topic. Do not spend hours here.",
  },
  {
    chapter: "Sequences and Series",
    qCount: 10,
    qPerPaper: 0.32,
    pctHard: 40,
    status: "live",
    note: "10 questions in 44 shifts at 40% HARD. Read the standard AP, GP and sum formulas once so a question is recognisable; do not drill it.",
  },
  {
    chapter: "Quadratic Equations",
    qCount: 4,
    qPerPaper: 0.12,
    pctHard: 25,
    status: "live",
    note: "4 questions in 44 shifts — the smallest chapter in the bank. The roots-and-coefficients relations are worth knowing because they surface inside other chapters; the chapter itself is not worth a session.",
  },
];

export const DIFFICULTIES_EASY_MOD: Difficulty[] = ["EASY", "MODERATE"];
