// Shared config for the NDA Maths *practice*-question ingestion pipeline.
//
// Source: the "Mathematics for N.D.A and N.A" practice book, as born-digital
// PDFs under SOURCE_ROOT (outside the repo). The math is lossy in the text
// layer (dropped set/relational operators, collapsed superscripts) + the layout
// is two-column, so transcription is VISION-driven: render.ts rasterises the
// relevant pages, a human/Claude transcribes them to out/<topic>.questions.json,
// and commit.ts merges that with the parsed answer key + transcribed solutions.
//
// These are NOT past-year questions — committed with question_kind='practice'
// and visibility='PRIVATE' (post-commit UPDATE, mirroring JEE's visibility flip).
import { join } from "node:path";

// LWS Pune org + admin (same as the JEE pipeline) — NDA exam + Mathematics.
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
export const EXAM_ID = "e4e753d1-c84a-45a8-93ad-6f0bf9733c95"; // NDA
export const SUBJECT_NAME = "Mathematics";

// Root of the loose practice PDFs (the .rar booklets are legacy PageMaker .pmd
// source files — not ingestable — so only the exported PDFs are used).
export const SOURCE_ROOT = "C:\\tmp\\Practice\\Maths";

export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs (regenerable by render.ts)
export const DATA = join(__dirname, "data"); // committed: the vision transcription (curated source of truth)

export type PageRange = { pdf: string; pages: number[] }; // 0-based PDF page indices

export type Topic = {
  id: string; // slug, used for out/<id>.*.json + source_file
  chapterName: string; // canonical DB chapter (must already exist)
  qFrom: number; // first practice question number (inclusive)
  qTo: number; // last (inclusive)
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  questionPages: PageRange; // pages holding the question stems+options
  answerKey: { pdf: string }; // text-layer answer-letter list (whole-Algebra, parsed for [qFrom,qTo])
  solutionPages: PageRange; // pages holding the worked solutions (same Q-numbering)
  // Canonical DB subtopic names for this chapter — transcription must map each
  // question's `subtopic` to one of these (verified at commit).
  subtopics: string[];
};

// Pilot: Algebra → Sequence & Series, Q406–489 (~84 q).
export const TOPICS: Record<string, Topic> = {
  "sequence-series": {
    id: "sequence-series",
    chapterName: "Sequence & Series",
    qFrom: 406,
    qTo: 489,
    sourceFile: "NDA_Maths_Practice__Algebra__Sequence_and_Series.pdf",
    // pages 18-21 hold Q406-480; Q481-489 spill onto page 22's left column
    // (Matrices Q490 starts on the same page — transcription stops at qTo=489).
    questionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "01. Algebra_questions.pdf"), pages: [18, 19, 20, 21, 22] },
    answerKey: { pdf: join(SOURCE_ROOT, "01. Algebra", "algebra answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "Solutions", "1st Algebra sol-2 page 211-240.pdf"), pages: [0, 1, 2, 3, 4, 5, 6, 7] },
    subtopics: [
      "Arithmetic Progressions",
      "Geometric Progressions",
      "Harmonic Progressions and the Three Means",
      "Interrelating AP, GP and HP",
      "Special Series and Special Sums",
    ],
  },

  // Algebra → Logarithms, Q959–984 (26 q), all on question page 47.
  logarithms: {
    id: "logarithms",
    chapterName: "Logarithms",
    qFrom: 959,
    qTo: 984,
    sourceFile: "NDA_Maths_Practice__Algebra__Logarithms.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "01. Algebra_questions.pdf"), pages: [47] },
    answerKey: { pdf: join(SOURCE_ROOT, "01. Algebra", "algebra answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "Solutions", "1st Algebra sol-2 page 241-253.pdf"), pages: [9, 10, 11] },
    subtopics: [
      "Logarithm Identities, Change of Base, and Sums",
      "Solving Logarithmic Equations and Applications",
    ],
  },

  // Algebra → Statistics, Q878–958 (81 q), question pages 43–46. (Q876–877 are
  // the tail of the preceding Probability Distribution section — excluded.)
  statistics: {
    id: "statistics",
    chapterName: "Statistics",
    qFrom: 878,
    qTo: 958,
    sourceFile: "NDA_Maths_Practice__Algebra__Statistics.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "01. Algebra_questions.pdf"), pages: [43, 44, 45, 46] },
    answerKey: { pdf: join(SOURCE_ROOT, "01. Algebra", "algebra answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "Solutions", "1st Algebra sol-2 page 241-253.pdf"), pages: [4, 5, 6, 7, 8, 9] },
    subtopics: [
      "Measures of Central Tendency — Mean, Median, Mode",
      "Dispersion — Standard Deviation, Variance, Mean Deviation",
      "Frequency Distributions and Graphical Representation",
      "Regression and Correlation",
    ],
  },

  // Algebra → Complex Numbers, Q87–168 (~82 q), question pages 5–8. (Q80–86 are
  // the tail of the preceding Relations section — excluded; the Complex Numbers
  // header sits mid-page-5. Quadratic Equations starts at Q169 on page 8's right
  // column, so Complex Numbers runs through Q168 — including the page-8 spillover.)
  "complex-numbers": {
    id: "complex-numbers",
    chapterName: "Complex Numbers",
    qFrom: 87,
    qTo: 168,
    sourceFile: "NDA_Maths_Practice__Algebra__Complex_Numbers.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "01. Algebra_questions.pdf"), pages: [5, 6, 7, 8] },
    answerKey: { pdf: join(SOURCE_ROOT, "01. Algebra", "algebra answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "Solutions", "1st Algebra sol-1 page 187-210.pdf"), pages: [4, 5, 6, 7, 8, 9] },
    subtopics: [
      "Modulus, Argument, and Conjugate",
      "Powers and Roots",
      "Cube Roots of Unity",
    ],
  },

  // Algebra → Quadratic Equations, Q169–232 (64 q), question pages 8–11.
  // (Starts at Q169 on page 8's right column after the Quadratic header;
  // Permutation starts at Q233 on page 11, so Quadratic runs through Q232.)
  "quadratic-equations": {
    id: "quadratic-equations",
    chapterName: "Quadratic Equations",
    qFrom: 169,
    qTo: 232,
    sourceFile: "NDA_Maths_Practice__Algebra__Quadratic_Equations.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "01. Algebra_questions.pdf"), pages: [8, 9, 10, 11] },
    answerKey: { pdf: join(SOURCE_ROOT, "01. Algebra", "algebra answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "Solutions", "1st Algebra sol-1 page 187-210.pdf"), pages: [9, 10, 11, 12, 13, 14] },
    subtopics: [
      "Nature of Roots and Boundary Conditions",
      "Vieta's Relations and Root-Coefficient Identities",
      "Special Quadratics — Parametric, Logarithmic, Constructed",
    ],
  },

  // Algebra → Sets & Relations, Q1–86 (source sections Sets Q1–35 + Relation
  // Q36–86, merged into the single NDA Maths "Sets & Relations" chapter).
  // Complex Numbers starts at Q87 on page 5, so this runs through Q86.
  "sets-relations": {
    id: "sets-relations",
    chapterName: "Sets & Relations",
    qFrom: 1,
    qTo: 86,
    sourceFile: "NDA_Maths_Practice__Algebra__Sets_and_Relations.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "01. Algebra_questions.pdf"), pages: [1, 2, 3, 4, 5] },
    answerKey: { pdf: join(SOURCE_ROOT, "01. Algebra", "algebra answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "Solutions", "1st Algebra sol-1 page 187-210.pdf"), pages: [0, 1, 2, 3, 4] },
    subtopics: [
      "Counting Sets, Subsets, and Inclusion-Exclusion",
      "Relations — Properties, Cartesian Product, and Counting",
      "Set Operations, Identities, and Cartesian Products of Sets",
    ],
  },

  // Algebra → Permutation & Combination, Q233–340 (source sections Permutation
  // Q233–282 + Combination Q283–340, merged into the single NDA Maths chapter).
  // Binomial Theorem starts at Q341.
  "permutation-combination": {
    id: "permutation-combination",
    chapterName: "Permutation & Combination",
    qFrom: 233,
    qTo: 340,
    sourceFile: "NDA_Maths_Practice__Algebra__Permutation_and_Combination.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "01. Algebra_questions.pdf"), pages: [11, 12, 13, 14, 15] },
    answerKey: { pdf: join(SOURCE_ROOT, "01. Algebra", "algebra answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "Solutions", "1st Algebra sol-1 page 187-210.pdf"), pages: [13, 14, 15, 16, 17, 18, 19, 20] },
    subtopics: [
      "Arrangements with Restrictions",
      "Combinations",
      "Factorials and Binomial Coefficients",
      "Forming Numbers from Digits",
      "Geometric Counting",
    ],
  },

  // Algebra → Binomial Theorem, Q341–405. Solutions Q341–387 are in sol-1
  // (pages 20–23); Q388–405 spill into sol-2 page 0 — render that ad-hoc if a
  // late-question key dispute arises. Sequence & Series starts at Q406.
  "binomial-theorem": {
    id: "binomial-theorem",
    chapterName: "Binomial Theorem",
    qFrom: 341,
    qTo: 405,
    sourceFile: "NDA_Maths_Practice__Algebra__Binomial_Theorem.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "01. Algebra_questions.pdf"), pages: [16, 17, 18] },
    answerKey: { pdf: join(SOURCE_ROOT, "01. Algebra", "algebra answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "Solutions", "1st Algebra sol-1 page 187-210.pdf"), pages: [20, 21, 22, 23] },
    subtopics: [
      "Coefficients and Specific Terms in Expansion",
      "Integer and Fractional Parts of Binomial Expressions",
      "Remainders and Divisibility via Binomial Expansion",
      "Sums of Binomial Coefficients — Alternating, Weighted, and Symmetric",
    ],
  },

  // Algebra → Matrices & Determinants, Q490–703 (source sections Matrices
  // Q490–546 + Determinants Q547–676 + System of Equations Q677–703, all merged
  // into the single NDA Maths chapter — System maps to the "Linear Systems"
  // subtopic). Probability starts at Q704.
  "matrices-determinants": {
    id: "matrices-determinants",
    chapterName: "Matrices & Determinants",
    qFrom: 490,
    qTo: 703,
    sourceFile: "NDA_Maths_Practice__Algebra__Matrices_and_Determinants.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "01. Algebra_questions.pdf"), pages: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32] },
    answerKey: { pdf: join(SOURCE_ROOT, "01. Algebra", "algebra answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "Solutions", "1st Algebra sol-2 page 211-240.pdf"), pages: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] },
    subtopics: [
      "Cofactors, Adjoint, and Inverse",
      "Determinant Properties, Operations, and Sums",
      "Linear Systems — Consistency, Cramer's Rule, Solution Space",
      "Matrix Operations, Polynomials, and Equations",
      "Special Determinants — Trig, Complex, Roots of Unity, Polynomial",
      "Special Matrices — Skew-Symmetric, Diagonal, Idempotent, Orthogonal, Rotation",
    ],
  },

  // Algebra → Probability, Q704–836 (source sections Probability Q704–790 +
  // Conditional Probability Q791–836 + Baye's Theorem, merged into the single
  // NDA Maths "Probability" chapter). Probability Distribution starts at Q837.
  probability: {
    id: "probability",
    chapterName: "Probability",
    qFrom: 704,
    qTo: 836,
    sourceFile: "NDA_Maths_Practice__Algebra__Probability.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "01. Algebra_questions.pdf"), pages: [33, 34, 35, 36, 37, 38, 39, 40] },
    answerKey: { pdf: join(SOURCE_ROOT, "01. Algebra", "algebra answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "Solutions", "1st Algebra sol-2 page 211-240.pdf"), pages: [22, 23, 24, 25, 26, 27, 28, 29] },
    subtopics: [
      "Bounds on Probability",
      "Conditional Probability, Total Probability, and Bayes' Theorem",
      "Event Algebra — Inclusion-Exclusion, Mutually Exclusive, Exhaustive",
      "Independent Events",
      "Probability via Counting",
    ],
  },

  // Algebra → Binomial Distribution, Q837–877 (source section "Probability
  // Distribution" — random-variable distributions, mean/variance, and binomial
  // distribution; NDA Maths' only distribution chapter is Binomial Distribution).
  // Statistics starts at Q878. Solutions Q837–877 are in the sol-2 (241–253) file.
  "binomial-distribution": {
    id: "binomial-distribution",
    chapterName: "Binomial Distribution",
    qFrom: 837,
    qTo: 877,
    sourceFile: "NDA_Maths_Practice__Algebra__Binomial_Distribution.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "01. Algebra_questions.pdf"), pages: [40, 41, 42, 43] },
    answerKey: { pdf: join(SOURCE_ROOT, "01. Algebra", "algebra answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "01. Algebra", "Solutions", "1st Algebra sol-2 page 241-253.pdf"), pages: [0, 1, 2, 3] },
    subtopics: [
      "Computing Binomial Probabilities — Exact, At-Least, and Complementary Events",
      "Mean, Variance, and Parameter Estimation in B(n, p)",
    ],
  },

  // ─── Trigonometry folder (02. Trigo) — questions numbered Q1001–1410. ───
  // The answer key is the LAST page of the questions PDF (page index 19), NOT a
  // separate file; a full-PDF text parse mis-grabs ~15 keys from question-page
  // stems that start with an a–d letter, so the key page was extracted to a
  // standalone `_trig_answers.pdf` (the parse source). Section boundaries:
  // Identities 1001–1174 · Equations 1175–1239 · Properties 1240–1290 ·
  // Inverse Trig 1291–1394 · Heights & Distances 1395–1410.

  "trigonometric-identities": {
    id: "trigonometric-identities",
    chapterName: "Trigonometric Identities",
    qFrom: 1001,
    qTo: 1174,
    sourceFile: "NDA_Maths_Practice__Trigonometry__Trigonometric_Identities.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "02. Trigo", "2 Trigonometry page 53-72.pdf"), pages: [1, 2, 3, 4, 5, 6, 7] },
    answerKey: { pdf: join(SOURCE_ROOT, "02. Trigo", "_trig_answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "02. Trigo", "Solutions", "2nd Trigonometry sol page 255-283.pdf"), pages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    subtopics: [
      "Compound Angle Formulas",
      "Maximum and Minimum of Trigonometric Expressions",
      "Multiple and Half-Angle Formulas",
      "Product-to-Sum and Sum-to-Product Identities",
      "Specific Values and Quadrants",
    ],
  },

  "trigonometric-equations": {
    id: "trigonometric-equations",
    chapterName: "Trigonometric Equations",
    qFrom: 1175,
    qTo: 1239,
    sourceFile: "NDA_Maths_Practice__Trigonometry__Trigonometric_Equations.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "02. Trigo", "2 Trigonometry page 53-72.pdf"), pages: [8, 9, 10] },
    answerKey: { pdf: join(SOURCE_ROOT, "02. Trigo", "_trig_answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "02. Trigo", "Solutions", "2nd Trigonometry sol page 255-283.pdf"), pages: [11, 12, 13, 14, 15, 16] },
    subtopics: [
      "General Solutions and Counting Solutions of Trigonometric Equations",
      "Simultaneous and Combined Trigonometric Systems",
      "Solving Specific Forms — Double-Angle, Product, Logarithmic, and Vieta",
    ],
  },

  // Source section "Properties of Triangles" -> NDA Maths "Properties of Triangle".
  "properties-of-triangle": {
    id: "properties-of-triangle",
    chapterName: "Properties of Triangle",
    qFrom: 1240,
    qTo: 1290,
    sourceFile: "NDA_Maths_Practice__Trigonometry__Properties_of_Triangle.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "02. Trigo", "2 Trigonometry page 53-72.pdf"), pages: [10, 11, 12] },
    answerKey: { pdf: join(SOURCE_ROOT, "02. Trigo", "_trig_answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "02. Trigo", "Solutions", "2nd Trigonometry sol page 255-283.pdf"), pages: [16, 17, 18, 19, 20, 21] },
    subtopics: [
      "In-circle and Regular Polygon Geometry",
      "Sine and Cosine Rules — Solving Triangles",
      "Triangle Identities — A+B+C=π, Half-Angle, and Double-Angle",
    ],
  },

  "inverse-trigonometry": {
    id: "inverse-trigonometry",
    chapterName: "Inverse Trigonometry",
    qFrom: 1291,
    qTo: 1394,
    sourceFile: "NDA_Maths_Practice__Trigonometry__Inverse_Trigonometry.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "02. Trigo", "2 Trigonometry page 53-72.pdf"), pages: [13, 14, 15, 16, 17] },
    answerKey: { pdf: join(SOURCE_ROOT, "02. Trigo", "_trig_answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "02. Trigo", "Solutions", "2nd Trigonometry sol page 255-283.pdf"), pages: [21, 22, 23, 24, 25, 26, 27, 28] },
    subtopics: [
      "Evaluation of Composite Inverse Trigonometric Expressions",
      "Identities, Properties, and Sum-Difference Formulas",
      "Solving Inverse Trigonometric Equations and Geometric Applications",
    ],
  },

  // Source section "Heights & Distances" -> NDA Maths "Height & Distance".
  "height-distance": {
    id: "height-distance",
    chapterName: "Height & Distance",
    qFrom: 1395,
    qTo: 1410,
    sourceFile: "NDA_Maths_Practice__Trigonometry__Height_and_Distance.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "02. Trigo", "2 Trigonometry page 53-72.pdf"), pages: [17, 18] },
    answerKey: { pdf: join(SOURCE_ROOT, "02. Trigo", "_trig_answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "02. Trigo", "Solutions", "2nd Trigonometry sol page 255-283.pdf"), pages: [28, 29, 30] },
    subtopics: [
      "Heights and Distances from Angles of Elevation",
      "Shadows, Leaning Structures, and Special Geometry",
    ],
  },

  // ─── Calculus folder (05. Calculus) — questions Q2101–3068 across 3 question
  // PDFs (page 111-125 / 126-143 / 145-161). The answer key is the LAST 2 pages
  // of the 3rd PDF (same gotcha as Trig) → extracted to `_calc_answers.pdf`.
  // Section→NDA-chapter map (first-Q pinned from body headers):
  //   Functions 2101-2223 (Domain&Range + Mapping + Composite&Inverse + Periodic)
  //   Limits & Continuity 2224-2381 (Limits + Continuity)
  //   Differentiation 2382-2497 (Differentiability)
  //   Application of Derivatives 2498-2677 (LMV/Rolle + Rate + Inc/Dec + Tangents + Maxima/Minima)
  //   Indefinite Integration 2678-2748 · Definite Integration 2749-2885
  //   Applications of Integration 2886-2950 (Area Under the Curve)
  //   Differential Equations 2951-3068 (Order&Degree + Formation&General Solution)

  "functions": {
    id: "functions",
    chapterName: "Functions",
    qFrom: 2101,
    qTo: 2223,
    sourceFile: "NDA_Maths_Practice__Calculus__Functions.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "05. Calculus", "4. Calculus page 111-125.pdf"), pages: [1, 2, 3, 4, 5, 6] },
    answerKey: { pdf: join(SOURCE_ROOT, "05. Calculus", "_calc_answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "05. Calculus", "Solutions", "5th Calculus-1 sol page 333-352.pdf"), pages: [0, 1, 2, 3, 4, 5, 6, 7] },
    subtopics: [
      "Composition and Inverse of Functions",
      "Domain, Range, and Function Properties",
      "Function Definition and Classification — Injectivity, Surjectivity, Bijectivity",
      "Functional Equations",
      "Greatest Integer Function",
    ],
  },

  "limits-continuity": {
    id: "limits-continuity",
    chapterName: "Limits & Continuity",
    qFrom: 2224,
    qTo: 2381,
    sourceFile: "NDA_Maths_Practice__Calculus__Limits_and_Continuity.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "05. Calculus", "4. Calculus page 111-125.pdf"), pages: [7, 8, 9, 10, 11, 12, 13, 14] },
    answerKey: { pdf: join(SOURCE_ROOT, "05. Calculus", "_calc_answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "05. Calculus", "Solutions", "5th Calculus-1 sol page 333-352.pdf"), pages: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] },
    subtopics: [
      "Continuity and Differentiability — Piecewise, Modulus, Composed, Oscillatory",
      "Limit Evaluation Techniques — L'Hôpital, Rationalization, Standard Forms",
      "One-Sided Limits, Greatest Integer, and Absolute Value Limits",
    ],
  },

  "differentiation": {
    id: "differentiation",
    chapterName: "Differentiation",
    qFrom: 2382,
    qTo: 2497,
    sourceFile: "NDA_Maths_Practice__Calculus__Differentiation.pdf",
    questionPages: { pdf: join(SOURCE_ROOT, "05. Calculus", "4. Calculus page 126-143.pdf"), pages: [0, 1, 2, 3, 4, 5] },
    answerKey: { pdf: join(SOURCE_ROOT, "05. Calculus", "_calc_answers.pdf") },
    solutionPages: { pdf: join(SOURCE_ROOT, "05. Calculus", "Solutions", "5th Calculus-2 sol page 353-368.pdf"), pages: [0, 1, 2, 3, 4, 5, 6] },
    subtopics: [
      "Differentiability of Absolute Value, Piecewise, and Greatest Integer Functions",
      "Differentiation Techniques — Chain Rule, Logarithmic, Composite Functions",
      "Parametric, Implicit, and Higher-Order Derivatives",
    ],
  },
};

export const questionsJsonPath = (topicId: string) => join(DATA, `${topicId}.questions.json`);
export const solutionsJsonPath = (topicId: string) => join(DATA, `${topicId}.solutions.json`);

export function requireTopic(id: string | undefined): Topic {
  if (!id || !TOPICS[id]) {
    throw new Error(`unknown topic "${id}". Known: ${Object.keys(TOPICS).join(", ")}`);
  }
  return TOPICS[id];
}
