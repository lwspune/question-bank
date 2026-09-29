/**
 * Static content + numbers for the /guide/cds-maths route.
 *
 * Pulled from the live CDS Elementary Mathematics PUBLIC bank: 2,096 past-year questions across 21
 * sittings (2016-II to 2026-II), 26 chapters. Snapshot date is `OVERVIEW.asOf`. The numeric half of
 * CHAPTER_TABLE is GENERATED from the bank by generated-papers/_cds_guide_gen.py (subtopic names and
 * counts cannot be mistyped); only the closing sentence of each `focus` is editorial, and
 * tests/guide-cds-maths-playbooks.test.ts re-measures the counts against the live bank.
 *
 * Template C (chapter playbooks + tier strands + formula sheet), the MHT-CET Maths shape, with ONE
 * structural difference: CDS DEDUCTS a third of a mark for a wrong answer. So, like every NDA guide
 * and unlike MHT-CET, the strategy axis is ATTEMPT versus LEAVE — a blind guess on four options is
 * worth exactly zero on average, and removing one option makes it worth +1/9.
 *
 * TWO RATES per chapter. `qPerPaper` is the lifetime average over all 21 papers and is what the
 * tiers use. `recentPerPaper` is 2024-2026 (6 papers) and `earlyPerPaper` 2016-2020 (9 papers);
 * the guide quotes their difference only where it is large, because six papers is a small sample.
 *
 * Every answer key before 2026-II was derived by our team (UPSC published none); 2026-II used
 * UPSC's provisional key.
 */

export type GuideRoute = {
  slug: string; // path segment after /guide/cds-maths (or "" for landing)
  label: string;
  blurb: string;
};

/** The 6 main routes under /guide/cds-maths, in reading order. */
export const ROUTES: GuideRoute[] = [
  {
    slug: "",
    label: "Overview",
    blurb:
      "How CDS Elementary Maths actually works — 100 questions, 120 minutes, a third of a mark lost for each wrong answer, and what 2,096 past-year questions across 21 papers reveal.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Five chapters carry half the paper. With a one-third penalty, the decision is which questions to attempt — and when a guess is worth making.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "22 playbooks — one per chapter at 1.5 questions a paper or more. The subtopic split, where the HARD sits, and whether the chapter cherry-picks.",
  },
  {
    slug: "formulas",
    label: "Formulas",
    blurb:
      "One page of the formulas and results CDS Maths actually tests, by chapter. At 1.2 minutes a question, recall has to be instant.",
  },
  {
    slug: "trends",
    label: "Trends",
    blurb:
      "Trigonometry and Number System have risen to 13 questions a paper each; Linear Equations and Time and Work have faded. What moved between 2016-2020 and 2024-2026.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "The distractors CDS reuses: the average of two speeds, the percentage on the wrong base, the chord on the other side of the centre, and the blind guess that is worth nothing.",
  },
];

export type Overview = {
  totalQ: number;
  /** Distinct CDS sittings covered: two a year, 2016-II to 2026-II. */
  papers: number;
  yearsCovered: number;
  chapters: number;
  /** Playbook count: the 22 chapters at 1.5 q/paper or more. */
  playbooks: number;
  paper: {
    questions: number;
    marksPerQuestion: number;
    totalMarks: number;
    durationMinutes: number;
    /** A third of the question's mark is deducted for a wrong answer. */
    penaltyFraction: number;
    /** durationMinutes / questions, to 1 decimal. */
    minutesPerQuestion: number;
  };
  difficulty: { easy: number; moderate: number; hard: number };
  asOf: string; // ISO date
};

export const OVERVIEW: Overview = {
  totalQ: 2096,
  papers: 21,
  yearsCovered: 11, // 2016-2026 inclusive
  chapters: 26,
  playbooks: 22,
  paper: {
    questions: 100,
    marksPerQuestion: 1,
    totalMarks: 100,
    durationMinutes: 120,
    penaltyFraction: 1 / 3,
    minutesPerQuestion: 1.2,
  },
  // EASY 18.4% · MODERATE 63.4% · HARD 18.2%. Sums to totalQ.
  difficulty: { easy: 385, moderate: 1329, hard: 382 },
  asOf: "2026-09-29",
};

export type ChapterRow = {
  chapter: string; // canonical DB chapter name
  /** Lifetime PUBLIC PYQ count across all 21 papers. */
  qCount: number;
  /** % of the 2,096-question bank (1 decimal). */
  pctTotal: number;
  /** Lifetime questions per paper (21 papers). The number the tiers use. */
  qPerPaper: number;
  /** 2016-2020 (9 papers). */
  earlyPerPaper: number;
  /** 2024-2026 (6 papers) — a small sample; quoted only where it moved a lot. */
  recentPerPaper: number;
  /** % HARD within the chapter (rounded integer). */
  pctHard: number;
  /** Subtopic split (count · %HARD) in teaching order, then one editorial sentence. */
  focus: string;
};

/** All 26 chapters by lifetime count. The 26 qCounts sum to EXACTLY 2,096 = OVERVIEW.totalQ. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Trigonometric Ratios and Identities",
    qCount: 227,
    pctTotal: 10.8,
    qPerPaper: 10.81,
    earlyPerPaper: 8.78,
    recentPerPaper: 13.0,
    pctHard: 20,
    focus:
      "Degree, Radian and Standard Values (20 · 5% HARD), Ratios in a Right Triangle (22 · 18%), Complementary and Allied Angles (21 · 10%), Simplifying and Proving Identities (24 · 13%), Reciprocal Pairs — sec ± tan and cosec ± cot (18 · 6%), Power Identities and Given Sums (17 · 0%), Trigonometric Equations (26 · 15%), Compound and Multiple Angles (8 · 13%), Maximum, Minimum and Impossible Values (37 · 35%), Eliminating θ and Substitution Chains (34 · 47%). The largest chapter in the bank and rising: 8.8 questions a paper in 2016-2020, 13.0 in 2024-2026. Its HARD is pooled — maximum/minimum and eliminating θ hold 29 of its 46 HARD questions — so the other eight subtopics are cheap.",
  },
  {
    chapter: "Number System",
    qCount: 223,
    pctTotal: 10.6,
    qPerPaper: 10.62,
    earlyPerPaper: 9.78,
    recentPerPaper: 13.0,
    pctHard: 16,
    focus:
      "Division, Parity and Consecutive Integers (18 · 22% HARD), Place Value and Digit Problems (29 · 10%), Divisibility Rules and Missing Digits (9 · 22%), Unit Digit and Cyclicity (13 · 15%), Prime Numbers and Primality (22 · 0%), Factors, Divisor Counting and Trailing Zeros (20 · 20%), HCF and LCM Laws and Fractions (29 · 21%), HCF and LCM Applications and Remainder Recipes (21 · 0%), Remainders by Congruence and Cyclicity (26 · 27%), Divisibility by Factorisation (16 · 38%), Perfect Squares, Cubes and Difference of Squares (14 · 7%), Rational and Irrational Numbers (6 · 0%). Level with Trigonometry on recent papers at 13.0 a paper, up from 9.8. The HARD is spread across remainders, factorisation and HCF laws rather than pooled, and primes, HCF/LCM applications and irrationals carry none at all.",
  },
  {
    chapter: "Mensuration 2D",
    qCount: 197,
    pctTotal: 9.4,
    qPerPaper: 9.38,
    earlyPerPaper: 9.44,
    recentPerPaper: 9.83,
    pctHard: 23,
    focus:
      "Areas of Triangles (32 · 19% HARD), Rectangles, Squares and Other Quadrilaterals (34 · 21%), Equal Perimeters and Re-bent Wires (17 · 6%), Circumference, Wheels and Rings (19 · 5%), Arcs, Sectors and Segments (25 · 4%), Inscribed and Circumscribed Figures (32 · 34%), Touching Circles (13 · 62%), Combined and Shaded Regions (25 · 40%). Steady at about 9.4 a paper. Three subtopics are nearly free (wheels, arcs and sectors, re-bent wires) and three carry the chapter's HARD: touching circles 62%, shaded regions 40%, inscribed figures 34%.",
  },
  {
    chapter: "Mensuration 3D",
    qCount: 171,
    pctTotal: 8.2,
    qPerPaper: 8.14,
    earlyPerPaper: 8.11,
    recentPerPaper: 6.67,
    pctHard: 17,
    focus:
      "Cubes and Cuboids (20 · 5% HARD), Diagonals and Cuboid Identities (16 · 19%), Cylinders (16 · 13%), Cones (18 · 17%), Spheres, Hemispheres and Shells (10 · 10%), Frustums and Combined Solids (22 · 9%), Melting and Recasting (18 · 11%), Water — Immersion, Flow and Rainfall (17 · 6%), Scaling and Comparing Solids (19 · 32%), Solids Inside Solids (15 · 53%). Falling: 8.1 a paper in 2016-2020, 6.7 in 2024-2026. Eight of its ten subtopics are under 20% HARD; solids inside solids (53%) and scaling (32%) are where it costs.",
  },
  {
    chapter: "Triangles",
    qCount: 151,
    pctTotal: 7.2,
    qPerPaper: 7.19,
    earlyPerPaper: 7.0,
    recentPerPaper: 7.67,
    pctHard: 20,
    focus:
      "Angles of a Triangle (11 · 9% HARD), Triangle Inequalities (10 · 50%), Congruence and Similarity (13 · 23%), Parallels, Midpoints and the Bisector Theorem (17 · 6%), Ratio of Areas of Triangles (15 · 13%), Pythagoras Theorem and its Converse (22 · 18%), The Altitude to the Hypotenuse (27 · 0%), Medians and Apollonius Theorem (14 · 43%), Centres of a Triangle (16 · 31%), Sine and Cosine Rules (6 · 50%). Seven a paper, steady. The altitude to the hypotenuse is 27 questions with no HARD at all; medians, triangle inequalities and the sine and cosine rules are the expensive pages.",
  },
  {
    chapter: "Algebraic Identities and Simplification",
    qCount: 98,
    pctTotal: 4.7,
    qPerPaper: 4.67,
    earlyPerPaper: 3.33,
    recentPerPaper: 4.33,
    pctHard: 39,
    focus:
      "Squares and Cubes of a Binomial (12 · 25% HARD), Reciprocal Sums x ± 1/x (11 · 27%), Sums and Products of Three Variables (11 · 9%), The Cube Identity and a + b + c = 0 (11 · 18%), Sums of Squares and Least Values (12 · 42%), Conditional Identities (16 · 69%), Rational Algebraic Expressions (19 · 37%), Symmetric and Cyclic Expressions (6 · 100%). The hardest chapter in the bank at 39% HARD, and it cherry-picks: conditional identities (69%) and symmetric expressions (6 of 6 HARD) are the pool, while three-variable sums and the cube identity are cheap.",
  },
  {
    chapter: "Quadratic Equations",
    qCount: 89,
    pctTotal: 4.2,
    qPerPaper: 4.24,
    earlyPerPaper: 3.78,
    recentPerPaper: 3.83,
    pctHard: 24,
    focus:
      "Solving and Forming Quadratic Equations (15 · 27% HARD), Symmetric Functions of the Roots (17 · 24%), Roots in a Given Relation (10 · 30%), Nature of Roots and Discriminant (14 · 14%), Perfect Squares, Signs and Location of Roots (10 · 50%), Common Roots (6 · 0%), Maximum and Minimum of Quadratic Expressions (5 · 0%), Equations Reducible to Quadratics (6 · 50%), Word Problems and Applications (6 · 0%). About four a paper at 24% HARD, spread thinly across nine subtopics — nothing to skip; common roots, maximum/minimum and word problems have never set a HARD question.",
  },
  {
    chapter: "Surds, Indices and Simplification",
    qCount: 82,
    pctTotal: 3.9,
    qPerPaper: 3.9,
    earlyPerPaper: 4.56,
    recentPerPaper: 3.0,
    pctHard: 22,
    focus:
      "Fractions and Decimals (11 · 0% HARD), Laws of Indices (16 · 25%), Exponential Equations (8 · 0%), Square Roots of Surds (11 · 9%), Surds and Rationalisation (11 · 27%), Equations with Surds (7 · 71%), Simplification of Expressions (6 · 50%), Continued Fractions and Nested Radicals (12 · 17%). Falling (4.6 to 3.0 a paper). Equations with surds are 71% HARD; fractions, exponential equations and square roots of surds are almost free.",
  },
  {
    chapter: "Statistics",
    qCount: 80,
    pctTotal: 3.8,
    qPerPaper: 3.81,
    earlyPerPaper: 3.78,
    recentPerPaper: 5.0,
    pctHard: 8,
    focus:
      "Data, Scales and Presentation (11 · 0% HARD), Frequency Tables and Cumulative Frequency (15 · 0%), Properties of the Arithmetic Mean (12 · 0%), Median of Ungrouped Data (15 · 13%), Mean, Median and Mode of Grouped Data (19 · 21%), Choosing a Measure of Central Tendency (8 · 0%). The cheapest chapter of any size: 8% HARD, and rising from 3.8 to 5.0 a paper. Four of its six subtopics have never set a HARD question.",
  },
  {
    chapter: "Polynomials",
    qCount: 79,
    pctTotal: 3.8,
    qPerPaper: 3.76,
    earlyPerPaper: 3.89,
    recentPerPaper: 4.33,
    pctHard: 19,
    focus:
      "Degree, Zeros and Coefficients (8 · 38% HARD), The Remainder Theorem (15 · 20%), The Factor Theorem (12 · 0%), Factorisation of Polynomials (19 · 16%), HCF and LCM of Polynomials (25 · 24%). About four a paper at 19% HARD. The factor theorem is free; HCF and LCM of polynomials is the largest subtopic and holds the most HARD, 6 of 15.",
  },
  {
    chapter: "Ratio, Proportion and Variation",
    qCount: 76,
    pctTotal: 3.6,
    qPerPaper: 3.62,
    earlyPerPaper: 4.0,
    recentPerPaper: 3.67,
    pctHard: 9,
    focus:
      "Ratio and Proportion (16 · 0% HARD), Ratios in Income, Savings and Ages (10 · 10%), Equal Ratios and Proportion Algebra (14 · 14%), Direct and Inverse Variation (18 · 0%), Partnership (5 · 40%), Mixtures and Alligation (13 · 15%). Under four a paper at 9% HARD. Ratio and proportion and direct and inverse variation have never set a HARD question.",
  },
  {
    chapter: "Time, Speed and Distance",
    qCount: 75,
    pctTotal: 3.6,
    qPerPaper: 3.57,
    earlyPerPaper: 4.0,
    recentPerPaper: 3.17,
    pctHard: 13,
    focus:
      "Average Speed and Speed–Time Ratios (22 · 5% HARD), Speed Changes and Equations (9 · 33%), Relative Speed: Chasing and Meeting (13 · 8%), Trains and Relative Speed (14 · 14%), Boats and Streams (7 · 0%), Races (5 · 40%), Clocks and Angles (5 · 20%). Just over three a paper at 13% HARD. Average speed is 22 questions at 5%; boats and streams has no HARD.",
  },
  {
    chapter: "Circles",
    qCount: 69,
    pctTotal: 3.3,
    qPerPaper: 3.29,
    earlyPerPaper: 3.11,
    recentPerPaper: 3.33,
    pctHard: 26,
    focus:
      "Chords and Perpendiculars (15 · 33% HARD), Angles in a Circle (13 · 23%), Circumcircle and Locus (9 · 44%), Tangents from an External Point (11 · 0%), Intersecting Chords and Power of a Point (5 · 40%), Common Tangents and Common Chords (6 · 17%), Touching Circles (10 · 30%). Just over three a paper at 26% HARD. Tangents from an external point is free; the circumcircle and locus and the chord pages carry the HARD.",
  },
  {
    chapter: "Quadrilaterals",
    qCount: 54,
    pctTotal: 2.6,
    qPerPaper: 2.57,
    earlyPerPaper: 2.44,
    recentPerPaper: 3.67,
    pctHard: 20,
    focus:
      "General Quadrilaterals and their Diagonals (11 · 36% HARD), Parallelograms (14 · 14%), Rhombus and Kite (8 · 0%), Trapeziums (8 · 25%), Cyclic Quadrilaterals (13 · 23%). Rising (2.4 to 3.7 a paper). Rhombus and kite has no HARD; the general-quadrilateral page is the expensive one at 36%.",
  },
  {
    chapter: "Data Interpretation",
    qCount: 52,
    pctTotal: 2.5,
    qPerPaper: 2.48,
    earlyPerPaper: 2.56,
    recentPerPaper: 1.67,
    pctHard: 2,
    focus:
      "Tables (24 · 0% HARD), Pie Charts (18 · 0%), Bar and Line Graphs (5 · 20%), Caselet Data Interpretation (5 · 0%). Falling (2.6 to 1.7 a paper), and the cheapest chapter in the bank: one HARD question in 52. The work is careful arithmetic on a table or chart.",
  },
  {
    chapter: "Percentage, Profit and Loss",
    qCount: 50,
    pctTotal: 2.4,
    qPerPaper: 2.38,
    earlyPerPaper: 3.0,
    recentPerPaper: 2.5,
    pctHard: 6,
    focus:
      "Percentage (14 · 7% HARD), Successive Percentage Change (12 · 0%), Profit and Loss (17 · 6%), Successive Discount and Marked Price (7 · 14%). About 2.4 a paper at 6% HARD — three HARD questions in 50.",
  },
  {
    chapter: "Averages",
    qCount: 47,
    pctTotal: 2.2,
    qPerPaper: 2.24,
    earlyPerPaper: 2.67,
    recentPerPaper: 1.83,
    pctHard: 9,
    focus:
      "Sum and Mean (20 · 10% HARD), Weighted and Combined Averages (19 · 5%), Averages of Consecutive Numbers (8 · 13%). About two a paper at 9% HARD. Every question is a total divided by a count, or a weighted mean.",
  },
  {
    chapter: "Time and Work",
    qCount: 46,
    pctTotal: 2.2,
    qPerPaper: 2.19,
    earlyPerPaper: 2.67,
    recentPerPaper: 1.33,
    pctHard: 7,
    focus:
      "Work Rates (14 · 14% HARD), Man-Days and Man-Hours (17 · 0%), Men, Women and Equivalent Workers (9 · 0%), Pipes and Cisterns (6 · 17%). Falling (2.7 to 1.3 a paper) and cheap at 7% HARD; man-days and mixed gangs have no HARD.",
  },
  {
    chapter: "Heights and Distances",
    qCount: 41,
    pctTotal: 2.0,
    qPerPaper: 1.95,
    earlyPerPaper: 2.0,
    recentPerPaper: 1.33,
    pctHard: 34,
    focus:
      "One Line of Sight (6 · 17% HARD), Two Points of Observation (19 · 21%), Observer Above the Ground (9 · 44%), Towers on Plane Figures and Bearings (7 · 71%). About two a paper but 34% HARD, the second-highest in the bank. Towers on plane figures (5 of 7 HARD) is the pool; one line of sight and two points of observation are cheap.",
  },
  {
    chapter: "Linear Equations",
    qCount: 40,
    pctTotal: 1.9,
    qPerPaper: 1.9,
    earlyPerPaper: 2.67,
    recentPerPaper: 0.17,
    pctHard: 20,
    focus:
      "Solving Linear Systems (10 · 10% HARD), Word Problems and Applications (13 · 15%), Age Problems (12 · 17%), Integral Solutions and Diophantine Equations (5 · 60%). Fading fast: 2.7 a paper in 2016-2020, one question in the six 2024-2026 papers. The integral-solutions page is the only HARD pool.",
  },
  {
    chapter: "Simple and Compound Interest",
    qCount: 34,
    pctTotal: 1.6,
    qPerPaper: 1.62,
    earlyPerPaper: 1.44,
    recentPerPaper: 2.0,
    pctHard: 15,
    focus:
      "Simple Interest (13 · 8% HARD), Compound Interest (13 · 23%), Instalments and Difference of SI and CI (8 · 13%). About two a paper on recent papers at 15% HARD; compound interest holds most of it.",
  },
  {
    chapter: "Logarithms",
    qCount: 33,
    pctTotal: 1.6,
    qPerPaper: 1.57,
    earlyPerPaper: 1.89,
    recentPerPaper: 1.33,
    pctHard: 24,
    focus:
      "Logarithm Identities and Change of Base (13 · 15% HARD), Number of Digits and Characteristic (10 · 10%), Solving Logarithmic Equations (10 · 50%). About 1.6 a paper at 24% HARD, and most of that (5 of 8) is the equations page; the laws and digit-counting pages are cheap.",
  },
  {
    chapter: "Sets",
    qCount: 28,
    pctTotal: 1.3,
    qPerPaper: 1.33,
    earlyPerPaper: 1.89,
    recentPerPaper: 0.83,
    pctHard: 14,
    focus:
      "Sets and Set Operations (8 · 13% HARD), Venn Diagrams and Inclusion-Exclusion (20 · 15%). Below the playbook line (1.3 a paper, falling). Mostly Venn-diagram counting at 15% HARD.",
  },
  {
    chapter: "Lines, Angles and Polygons",
    qCount: 22,
    pctTotal: 1.0,
    qPerPaper: 1.05,
    earlyPerPaper: 1.78,
    recentPerPaper: 0.83,
    pctHard: 0,
    focus:
      "Lines, Angles and Parallels (12 · 0% HARD), Interior and Exterior Angles of Polygons (10 · 0%). Below the playbook line (1.05 a paper, falling from 1.8) and the only chapter with no HARD question at all.",
  },
  {
    chapter: "Sequence and Series",
    qCount: 19,
    pctTotal: 0.9,
    qPerPaper: 0.9,
    earlyPerPaper: 0.89,
    recentPerPaper: 1.0,
    pctHard: 11,
    focus:
      "Progressions and Special Sums (10 · 20% HARD), Arithmetic, Geometric and Harmonic Means (9 · 0%). Below the playbook line: 19 questions in 21 papers at 11% HARD.",
  },
  {
    chapter: "Inequalities",
    qCount: 13,
    pctTotal: 0.6,
    qPerPaper: 0.62,
    earlyPerPaper: 0.33,
    recentPerPaper: 0.67,
    pctHard: 15,
    focus:
      "Solving Linear and Quadratic Inequalities (5 · 0% HARD), Signs, Powers and Comparisons (8 · 25%). The thinnest chapter: 13 questions in 21 papers, mostly data-sufficiency items on signs.",
  },
];
