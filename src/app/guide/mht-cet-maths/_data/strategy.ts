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
 * TIERING is on RECENT weightage (2024-2025, 26 shifts) plus %HARD, not on
 * lifetime average — MHT-CET moved its syllabus for 2025 and a lifetime
 * average hides the move in both directions. See TAIL_CHAPTERS.
 *
 * NUMBERS. Chapter q-counts and %HARD are lifetime figures over the 2,228
 * PUBLIC past-year questions (45 shifts, 2021-2025, 27 chapters, 85
 * subtopics). q/paper figures quoted in prose are the recent-weightage
 * numbers. A strand's `qCount` is the sum of its chapters' lifetime counts and
 * `pctOfBank` is that sum as a share of 2,228 — those two are addition, not
 * new measurements. The three strands plus the five tail chapters below
 * reconcile to 2,228 exactly (1,060 + 355 + 706 + 107).
 *
 * Difficulty split across the bank: EASY 227 (10.2%) · MODERATE 1,145 (51.4%)
 * · HARD 856 (38.4%).
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
  /** Lifetime PUBLIC PYQ count for the chapter (of 2,228). */
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
  /** That sum as a share of the 2,228-question bank. */
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
    "Cornerstone — Line and Plane · Vectors · Applications of Derivative · Differential Equations · Indefinite Integration · Differentiation (1,060 q · 48% of bank)",
  qCount: 1060,
  pctOfBank: 48,
  pitch:
    "Six chapters carry 23.43 questions per paper — 47% of a 50-question paper, or 47 of the 100 marks. Nothing else on this exam concentrates like that, and it is why prep here is not a question of coverage: you cannot reach a good score without these six, and you cannot reach one on these six alone either. Because there is no negative marking, the cost of a weak cornerstone is never a wrong answer you should have skipped — it is minutes. A Vectors triple-product question you half-remember eats four minutes of a 90-minute paper and takes two long-tail questions down with it. Order and time discipline decide this paper; selection does not.",
  approach: [
    "Do these six in prep before anything else, and do them properly — 1.8 minutes per question means a technique you can only half-execute is worth less than one you have never seen, because the half-remembered one is the one you will spend five minutes on.",
    "All six have shipped teaching notes at /notes/mht-cet-maths — line-and-plane, vectors, applications-of-derivative, differential-equations, indefinite-integration, differentiation. Read the chapter's notes once, then drill subtopic by subtopic; do not read all six end-to-end first.",
    "Two of them do NOT cherry-pick and you should know which before you plan your hours. Line and Plane spreads 42% HARD across all seven of its subtopics, so there is no cheap third to bank. Vectors is the opposite: at 55% HARD overall it looks worse, but Dot Product, Angle, and Perpendicularity is 50 questions at 28% HARD — a genuinely cheap third of the biggest chapter in the bank. Secure that before you touch Scalar Triple Product at 72%.",
    "Applications of Derivative is the best marks-per-hour chapter on the paper and it is a cornerstone: 3.81 q/paper at 23% HARD, seven subtopics and none above 31%. Approximations using Differentials is 11 questions at 0% HARD. Treat it as a bank-first chapter even though its volume puts it here.",
    "On the paper, cornerstone questions are not all attempted at the same time. The bank-first and split-pass cheap halves go on the opening sweep with the quick-wins; the expensive halves wait for the second pass, when you know how much clock you actually have.",
  ],
  chapters: [
    {
      chapter: "Line and Plane",
      qCount: 205,
      pctHard: 42,
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
        "205 q · 42% HARD · the heaviest chapter on recent papers. Seven subtopics and the HARD is spread rather than pooled, so this chapter does not cherry-pick: you own all seven or you lose ten marks. Only Line — Equation, Direction Cosines, and Vector Form is genuinely cheap at 21% HARD.",
    },
    {
      chapter: "Vectors",
      qCount: 228,
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
      expectedYieldPerPaper: "4.81 q/paper · about 10 marks",
      studyHours: 18,
      summary:
        "228 q · 55% HARD · the largest chapter in the bank and the hardest cornerstone. It DOES cherry-pick, which is what makes it manageable: Dot Product (50 q, 28% HARD) is the cheap third, while Scalar Triple Product (71 q, 72%) and Cross Product (66 q, 64%) carry most of the pain. Bank the cheap third on the first sweep; leave triple products for the second pass.",
    },
    {
      chapter: "Applications of Derivative",
      qCount: 183,
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
      expectedYieldPerPaper: "3.81 q/paper · about 8 marks",
      studyHours: 12,
      summary:
        "183 q · 23% HARD · the cheapest cornerstone by a distance and the best marks-per-hour chapter on the paper. Seven subtopics, none above 31% HARD, and Approximations using Differentials is 11 q at 0% HARD. Volume puts it in the cornerstone strand; behaviour puts it on your opening sweep.",
    },
    {
      chapter: "Differential Equations",
      qCount: 144,
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
      expectedYieldPerPaper: "3.35 q/paper · about 7 marks",
      studyHours: 12,
      summary:
        "144 q · 38% HARD · six subtopics that split by SOLUTION METHOD, which is exactly how the questions are set. Order/Degree/Formation (33 q, 24% HARD) is recognition work and near-free; Linear (Integrating Factor) at 63% is where it gets expensive. Newton's Law of Cooling is 5 q lifetime at 60% HARD — last in the prep queue, and still answered on the paper.",
    },
    {
      chapter: "Indefinite Integration",
      qCount: 159,
      pctHard: 51,
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
      expectedYieldPerPaper: "3.35 q/paper · about 7 marks",
      studyHours: 14,
      summary:
        "159 q · 51% HARD · the most expensive cornerstone per question. Its cheap corner is real but small: Foundations (8 q, 13%) and Trigonometric Integrals - Powers and Identities (12 q, 8%) are 20 questions of near-free marks. Everything else sits at 48% or worse, and Trigonometric Integrals - Rational and Substitution Forms is 35 q at 74% HARD.",
    },
    {
      chapter: "Differentiation",
      qCount: 141,
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
      expectedYieldPerPaper: "3.15 q/paper · about 6 marks",
      studyHours: 12,
      summary:
        "141 q · 47% HARD. Foundations, Chain Rule & Differentiability (21 q, 29% HARD) is the only cheap entry; the two biggest subtopics — Inverse Trigonometric Differentiation (39 q, 49%) and Implicit & Special Forms (31 q, 52%) — are where the marks and the minutes both are. Derivative of One Function with Respect to Another is 7 q at 71% HARD and goes last.",
    },
  ],
};

export const QUICKWIN_STRAND: StrategyStrand = {
  id: "quickwin",
  label:
    "Quick-Win — Probability Distribution · Mathematical Logic · Binomial Distribution · Linear Programming · Straight Line (355 q · 16% of bank)",
  qCount: 355,
  pctOfBank: 16,
  pitch:
    "Bank these first. Five chapters worth 7.8 questions a paper at an average well below the bank's 38.4% HARD, and the point of doing them first is not that they are worth more — every question on this paper is worth exactly 2 marks — but that they are worth the same for a third of the time. Linear Programming is the cleanest example on the whole exam: 46 questions at 4% HARD, and its Objective Function — Maximisation and Minimisation subtopic has produced 23 questions and NEVER a single HARD one. Marks secured in the first twenty minutes are marks the clock cannot take back later.",
  approach: [
    "Attempt every question from these five chapters on the opening sweep, before you look at a triple product or an integrating factor. Roughly 8 questions, roughly 16 marks, and most of them inside the 1.8-minute budget rather than over it.",
    "Probability Distribution and Binomial Distribution both have shipped teaching notes at /notes/mht-cet-maths (probability-distribution, binomial-distribution). Together they are 175 questions at 20% and 22% HARD — the largest block of cheap marks in the bank.",
    "Linear Programming is 46 q at 4% HARD across just two subtopics, and one of them has never produced a HARD question. If you are short on time before the exam, this is the highest-certainty chapter you can add.",
    "Mathematical Logic is 88 q at 31% HARD and the HARD sits almost entirely in Negation, Equivalence, Tautology, and Switch Circuits (47 q, 36%). Truth Tables (27 q, 26%) and Converse, Inverse, and Contrapositive (14 q, 21%) are mechanical once you have drilled the forms.",
    "One chapter outside this strand belongs in the same habit: Sets, Relations and Functions is 41 q at 12% HARD — genuinely cheap marks — but only 0.73 q/paper on recent shifts, which is why it has no playbook. Drill it with the tail chapters below, and answer it on the opening sweep when it appears.",
  ],
  chapters: [
    {
      chapter: "Probability Distribution",
      qCount: 115,
      pctHard: 20,
      posture: "bank-first",
      mustDrill: [
        "Classical Probability, Addition Theorem and Odds",
        "Discrete Random Variables, PMF and CDF",
        "Expectation, Variance and Standard Deviation",
        "Conditional Probability, Independence and Bayes' Theorem",
      ],
      expectedYieldPerPaper: "2.65 q/paper · about 5 marks",
      studyHours: 8,
      summary:
        "115 q · 20% HARD · the biggest quick-win and the sixth-heaviest chapter on recent papers. Three of its four subtopics sit at 19% HARD or below; only Conditional Probability, Independence and Bayes' Theorem (26 q, 31%) costs real time.",
    },
    {
      chapter: "Mathematical Logic",
      qCount: 88,
      pctHard: 31,
      posture: "bank-first",
      mustDrill: [
        "Converse, Inverse, and Contrapositive",
        "Truth Tables and Truth Values",
        "Negation, Equivalence, Tautology, and Switch Circuits",
      ],
      targetHard: ["Negation, Equivalence, Tautology, and Switch Circuits"],
      expectedYieldPerPaper: "1.92 q/paper · about 4 marks",
      studyHours: 6,
      summary:
        "88 q · 31% HARD. Almost pure procedure: build the table, apply the equivalence, read the switch circuit. The 31% is concentrated in the switch-circuit and tautology subtopic (47 q, 36%), which rewards drilling the standard circuit forms rather than reasoning each one out fresh.",
    },
    {
      chapter: "Binomial Distribution",
      qCount: 60,
      pctHard: 22,
      posture: "bank-first",
      mustDrill: [
        "The Binomial Setting and Probability Mass Function",
        "Mean, Variance and Standard Deviation of a Binomial Variable",
        "Parameter Estimation and the Probability Ratio",
        "Computing Binomial Probabilities",
      ],
      expectedYieldPerPaper: "1.27 q/paper · about 3 marks",
      studyHours: 4,
      summary:
        "60 q · 22% HARD across four small subtopics, two of which are at 13% and 10%. Mean = np and variance = npq carry more questions than anything else here; recognising the binomial setting is most of the work.",
    },
    {
      chapter: "Linear Programming",
      qCount: 46,
      pctHard: 4,
      posture: "bank-first",
      mustDrill: [
        "Objective Function — Maximisation and Minimisation",
        "Feasible Region — Identification, Constraints, Classification",
      ],
      expectedYieldPerPaper: "1.00 q/paper · 2 marks",
      studyHours: 3,
      summary:
        "46 q · 4% HARD · the cheapest chapter in the bank by some margin. Objective Function — Maximisation and Minimisation is 23 questions and has never produced a HARD one; Feasible Region is 23 questions at 9%. Three hours of drilling buys a question a paper at near-certainty.",
    },
    {
      chapter: "Straight Line",
      qCount: 46,
      pctHard: 22,
      posture: "bank-first",
      mustDrill: [
        "Section Formula, Concurrency, Foot of Perpendicular, and Distance",
        "Equation of Line — Rotation, Angle, and Bisector",
      ],
      expectedYieldPerPaper: "0.96 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "46 q · 22% HARD across two subtopics. Worth more than its q/paper suggests because the techniques repeat elsewhere: the foot-of-perpendicular and distance work here is the 2-D dialect of Line and Plane, and the perpendicularity condition m1*m2 = -1 is the same idea as the vector dot product being zero.",
    },
  ],
};

export const LONGTAIL_STRAND: StrategyStrand = {
  id: "longtail",
  label:
    "Long Tail — Limits · Trigonometry - II · Inverse Trigonometric Functions · Trigonometry - I · Definite Integration · Determinants and Matrices · Circle · Complex Numbers · Applications of Definite Integral · Pair of Straight Lines · Permutations and Combinations (706 q · 32% of bank)",
  qCount: 706,
  pctOfBank: 32,
  pitch:
    "Eleven chapters at roughly one to two questions a paper each, and mostly 33-56% HARD — expensive per mark, and collectively too big to ignore at about 16 questions a paper. These come last, on the time remaining after the cornerstones and quick-wins are banked. And you still answer every single one of them, including the ones you have not prepared: there is no negative marking, so an unread Pair of Straight Lines question costs nothing to guess and a blank is strictly worse than a guess. Prep them in weightage order and stop where your hours stop; the paper will not punish the gap the way an NDA paper would.",
  approach: [
    "None of these has shipped teaching notes yet — the eight /notes/mht-cet-maths chapters are the six cornerstones plus Probability Distribution and Binomial Distribution. Work these from the playbooks and timed /browse drills instead.",
    "Limits is the sharpest example of a chapter that does not cherry-pick: 93 q at 56% HARD across exactly two subtopics, Continuity at a Point — Finding Parameters (47 q, 57%) and Limit Evaluation Techniques (46 q, 54%). There is no cheap half to take. Prepare both or neither, and on the paper give them the second pass, not the first.",
    "There is a measured taxonomy overlap worth planning around: inverse trigonometry appears BOTH as its own chapter (73 q) AND as a subtopic inside Trigonometry - II (21 q). Drill only one and you miss a fifth of the topic.",
    "Two chapters here reward a technique that skips calculus entirely, and at 1.8 minutes a question that is a time lever rather than an elegance: the greatest and least modulus of a complex number on a disc, and the maximum perpendicular distance from a point on a circle, are the same move — distance to the centre plus or minus the radius.",
    "A vanishing 3x3 determinant is the universal degeneracy test across this strand and the cornerstones both — concurrency of lines, collinearity of points, coplanarity of lines, scalar triple product equal to zero. Learning it once in Determinants and Matrices pays in four other chapters.",
  ],
  chapters: [
    {
      chapter: "Limits",
      qCount: 93,
      pctHard: 56,
      posture: "last-pass-guess",
      mustDrill: [
        "Limit Evaluation Techniques",
        "Continuity at a Point — Finding Parameters",
      ],
      targetHard: [
        "Continuity at a Point — Finding Parameters",
        "Limit Evaluation Techniques",
      ],
      expectedYieldPerPaper: "2.08 q/paper · about 4 marks",
      studyHours: 6,
      summary:
        "93 q · 56% HARD · the highest %HARD of any chapter in this strand, and it does not cherry-pick: both subtopics are above 54%. Two questions a paper at full price. Prepare both halves or accept that you are guessing them — which, on this exam, is a legitimate choice.",
    },
    {
      chapter: "Trigonometry - II",
      qCount: 90,
      pctHard: 49,
      posture: "last-pass-guess",
      mustDrill: [
        "Properties of Triangles — Sine/Cosine Rules and Projection",
        "Inverse Trigonometry — Identities, Equations, and Principal Values",
        "Trigonometric Identities and Compound/Half-Angle Formulas",
      ],
      targetHard: [
        "Trigonometric Identities and Compound/Half-Angle Formulas",
      ],
      expectedYieldPerPaper: "2.08 q/paper · about 4 marks",
      studyHours: 6,
      summary:
        "90 q · 49% HARD. Properties of Triangles (52 q, 42%) is over half the chapter and the cheapest part of it. Note the overlap: its Inverse Trigonometry subtopic (21 q) is the same material as the separate Inverse Trigonometric Functions chapter (73 q) — drill them together, not twice.",
    },
    {
      chapter: "Inverse Trigonometric Functions",
      qCount: 73,
      pctHard: 37,
      posture: "last-pass-guess",
      mustDrill: [
        "Inverse Trigonometric Functions — Identities, Equations, Principal Values, and Sums",
      ],
      expectedYieldPerPaper: "2.04 q/paper · about 4 marks",
      studyHours: 5,
      summary:
        "73 q · 37% HARD in a single subtopic — the whole chapter is one drill. Two questions a paper, and cheaper than most of this strand. Its 21 sibling questions inside Trigonometry - II mean the real footprint is 94 questions, which moves it up the queue.",
    },
    {
      chapter: "Trigonometry - I",
      qCount: 99,
      pctHard: 37,
      posture: "last-pass-guess",
      mustDrill: [
        "Trig Identities, Compound Angle, and Equations",
        "Properties of Triangle",
      ],
      expectedYieldPerPaper: "1.85 q/paper · about 4 marks",
      studyHours: 6,
      summary:
        "99 q · 37% HARD · the largest chapter in this strand by lifetime count. Trig Identities, Compound Angle, and Equations is 77 of those 99 at 36% HARD, so almost all of the return sits in one drill. Properties of Triangle here overlaps the same-named material in Trigonometry - II.",
    },
    {
      chapter: "Definite Integration",
      qCount: 73,
      pctHard: 45,
      posture: "last-pass-guess",
      mustDrill: [
        "Symmetry, King's Property, and Absolute Value",
        "Substitution and Standard Form",
      ],
      targetHard: ["Substitution and Standard Form"],
      expectedYieldPerPaper: "1.85 q/paper · about 4 marks",
      studyHours: 5,
      summary:
        "73 q · 45% HARD. Symmetry, King's Property, and Absolute Value (42 q, 38%) is the cheaper and larger half, and King's property is exactly the kind of one-line trick that turns a four-minute integral into a thirty-second one. Substitution and Standard Form is 31 q at 55%.",
    },
    {
      chapter: "Determinants and Matrices",
      qCount: 50,
      pctHard: 48,
      posture: "last-pass-guess",
      mustDrill: [
        "Inverse, Cayley-Hamilton, and Matrix Polynomial",
        "System of Linear Equations and Symmetric Matrices",
        "Adjoint, Determinant, and A·adj(A) Identity",
      ],
      targetHard: ["Adjoint, Determinant, and A·adj(A) Identity"],
      expectedYieldPerPaper: "1.12 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "50 q · 48% HARD, and the Adjoint and A·adj(A) subtopic is 64%. Worth more than one question a paper suggests, because the vanishing-determinant degeneracy test learned here reappears as concurrency, collinearity, coplanarity and the scalar triple product across four other chapters.",
    },
    {
      chapter: "Circle",
      qCount: 47,
      pctHard: 38,
      posture: "last-pass-guess",
      mustDrill: [
        "Equation of Circle from Diameter, Centre, and Concentric Conditions",
        "Tangent, Locus, and Equation Construction",
        "Two Circles — Tangency, Common Tangents, and Relative Position",
      ],
      skipSubtopics: [
        "Two Circles — Tangency, Common Tangents, and Relative Position",
      ],
      expectedYieldPerPaper: "1.04 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "47 q · 38% HARD. Equation construction from diameter or centre (11 q, 27%) is the cheap entry; Two Circles — Tangency (9 q, 56%) is 9 questions in five years at the highest price in the chapter and goes last in the queue. The maximum-distance-from-a-point trick here is the same move as the complex-modulus-on-a-disc one.",
    },
    {
      chapter: "Complex Numbers",
      qCount: 46,
      pctHard: 33,
      posture: "split-pass",
      mustDrill: [
        "Modulus, Argument, and Polar Form",
        "Algebraic Equations, Locus, and Cube Roots",
      ],
      targetHard: ["Algebraic Equations, Locus, and Cube Roots"],
      expectedYieldPerPaper: "1.00 q/paper · 2 marks",
      studyHours: 4,
      summary:
        "46 q · 33% HARD, and it splits cleanly: Modulus, Argument, and Polar Form is 22 q at 18% HARD, while Algebraic Equations, Locus, and Cube Roots is 24 q at 46%. Take the modulus half on the first sweep — the greatest-and-least-modulus shape is answered by distance to the centre plus or minus the radius, with no calculus at all.",
    },
    {
      chapter: "Applications of Definite Integral",
      qCount: 47,
      pctHard: 36,
      posture: "last-pass-guess",
      mustDrill: ["Area Bounded by Curves, Axes, and Lines"],
      skipSubtopics: ["Definite Integral as Application"],
      expectedYieldPerPaper: "1.00 q/paper · 2 marks",
      studyHours: 3,
      summary:
        "47 q · 36% HARD, and 43 of those 47 are one subtopic — Area Bounded by Curves, Axes, and Lines at 33% HARD. That makes it the most concentrated chapter in this strand and a cheap three hours. Definite Integral as Application is 4 questions in five years at 75% HARD; it is not worth planning around.",
    },
    {
      chapter: "Pair of Straight Lines",
      qCount: 45,
      pctHard: 40,
      posture: "last-pass-guess",
      mustDrill: [
        "Combined Equation and Condition for Pair of Lines",
        "Angle, Distance, and Geometry of Pair",
      ],
      expectedYieldPerPaper: "1.00 q/paper · 2 marks",
      studyHours: 4,
      summary:
        "45 q · 40% HARD across two evenly-priced subtopics (39% and 41%), so there is no cheap half. It is formula-driven rather than insight-driven, which makes it a good late addition: the perpendicularity condition here is a + b = 0, the pair-of-lines dialect of the same idea that is m1*m2 = -1 for lines and a zero dot product for vectors.",
    },
    {
      chapter: "Permutations and Combinations",
      qCount: 43,
      pctHard: 42,
      posture: "last-pass-guess",
      mustDrill: [
        "Selection and Arrangement with Constraints",
        "Counting and Geometric Applications",
      ],
      expectedYieldPerPaper: "1.00 q/paper · 2 marks",
      studyHours: 4,
      summary:
        "43 q · 42% HARD. The smallest chapter with a playbook and one of the most error-prone: both subtopics sit near 40%, and the failure mode is a mis-set-up count rather than a mis-executed formula. Drill the constraint shapes — at least one of, none of, all together, never together — rather than the formulas.",
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
 * all 14 papers of 2025. "entering" is its mirror image — Conic Sections had
 * 3 questions before 2025 and 16 in 2025 alone.
 */
export type TailStatus = "live" | "entering" | "dropped";

export type TailChapter = {
  chapter: string;
  qCount: number;
  /** Recent weightage (2024-2025, 26 shifts). All are below the 0.9 q/paper
   *  line, which is why none of these ships a playbook. */
  qPerPaper: number;
  pctHard: number;
  status: TailStatus;
  note: string;
};

/**
 * The five chapters below the 0.9 q/paper line — no playbook, listed here so
 * the 27-chapter bank is accounted for rather than quietly truncated at 22.
 *
 * The 2025 syllabus shift is the reason this block matters more than its
 * question counts suggest: a student prepping from 2023-24 papers spends real
 * hours on a chapter that is dead and gets blindsided by one that is live.
 */
export const TAIL_CHAPTERS: TailChapter[] = [
  {
    chapter: "Sets, Relations and Functions",
    qCount: 41,
    qPerPaper: 0.73,
    pctHard: 12,
    status: "live",
    note: "The one genuine cheap-marks chapter below the line — 12% HARD, the second-lowest in the bank after Linear Programming. Below the playbook line on volume alone; drill it with the quick-wins.",
  },
  {
    chapter: "Conic Sections",
    qCount: 19,
    qPerPaper: 0.69,
    pctHard: 42,
    status: "entering",
    note: "ENTERED in 2025: 3 questions across 2021-2024, then 16 in 2025 alone. Its lifetime weightage understates it badly, and a student prepping from 2023-24 papers has never seen it. Expensive at 42% HARD, but no longer optional.",
  },
  {
    chapter: "Measures of Dispersion",
    qCount: 32,
    qPerPaper: 0.46,
    pctHard: 9,
    status: "dropped",
    note: "DROPPED after 2024. It ran 1.0 question per paper across 29 shifts in 2023-24 and then scored ZERO across all 14 papers of 2025. At 9% HARD it used to be one of the cheapest chapters on the exam, which is exactly why it is a trap now: it is pleasant to revise and worth nothing. Do not spend hours here.",
  },
  {
    chapter: "Sequences and Series",
    qCount: 10,
    qPerPaper: 0.31,
    pctHard: 40,
    status: "live",
    note: "10 questions in 45 shifts at 40% HARD. Read the standard AP, GP and sum formulas once so a question is recognisable; do not drill it.",
  },
  {
    chapter: "Quadratic Equations",
    qCount: 5,
    qPerPaper: 0.15,
    pctHard: 20,
    status: "live",
    note: "5 questions in 45 shifts — the smallest chapter in the bank. The roots-and-coefficients relations are worth knowing because they surface inside other chapters; the chapter itself is not worth a session.",
  },
];

export const DIFFICULTIES_EASY_MOD: Difficulty[] = ["EASY", "MODERATE"];
