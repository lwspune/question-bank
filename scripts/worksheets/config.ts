// Shared config for the Cadetprep "Worksheets - 11th+12th" ingestion pipeline.
//
// Source: born-digital Excel worksheets under SOURCE_ROOT — the LWS Cadetprep
// NDA Maths tree. ONLY the Concept Practice buckets are ingested (user's call
// 2026-08-05): the PYQs folders are excluded (the NDA bank already serves the
// PYQ corpus), Formula Revision / Quizzes are out of scope for now.
//
// Every worksheet is the same 15-column LMS-export template (see lib.ts).
// Taxonomy truth is THIS registry — folder = chapter, file = subtopic — never
// the sheets' unreliable Subject column.
//
// These are practice questions: committed question_kind='practice',
// visibility='PRIVATE' until the blind key-verification pass clears them.
import { join } from "node:path";

export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f"; // LWS Pune
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
export const EXAM_ID = "9fabd0f7-50bf-4b58-82fa-4ff50a906bf8"; // Worksheets - 11th+12th
export const SUBJECT_NAME = "Mathematics";

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\Cadetprep\\NDA\\Maths";

export const OUT = join(__dirname, "out"); // gitignored: verification packets etc.
export const DATA = join(__dirname, "data"); // committed: overrides + verification verdicts

/** One worksheet file → one subtopic. `file` is relative to the chapter dir. */
export type FileEntry = { file: string; subtopicName: string };

export type Chapter = {
  id: string; // slug — names data/<id>.overrides.json + out/ artifacts
  chapterName: string; // canonical DB chapter (auto-created on first commit)
  dir: string; // absolute path to the folder holding the worksheet files
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  note: string; // questions.pyq_note provenance text
  files: FileEntry[]; // IN ORDER — index+1 is the fileIndex in question ids ("03-17")
};

export const CHAPTERS: Record<string, Chapter> = {
  "trig-identities": {
    id: "trig-identities",
    chapterName: "Trigonometric Identities",
    dir: join(SOURCE_ROOT, "05. Trigono", "Concept Practice"),
    sourceFile: "Cadetprep_Worksheets_Trigonometric_Identities",
    note: "Cadetprep concept-practice worksheet — Trigonometric Identities",
    files: [
      { file: "01. Trigono - Fundamental Trigonometric Identities.xlsx", subtopicName: "Fundamental Trigonometric Identities" },
      { file: "02. T-ratio in different quadrants.xlsx", subtopicName: "T-Ratios in Different Quadrants" },
      { file: "03. T-ratio of allied angles.xlsx", subtopicName: "T-Ratios of Allied Angles" },
      { file: "04. Graph, Domain, Range of T-Functions.xlsx", subtopicName: "Graphs, Domain and Range of T-Functions" },
      { file: "05. Trigono - Sum and Difference Identities.xlsx", subtopicName: "Sum and Difference Identities" },
      { file: "06. Double, Triple, and Fifth Angle.xlsx", subtopicName: "Double, Triple and Fifth Angle Formulas" },
      { file: "07. Trigono - Product-to-Sum and Sum-to-Product Identities.xlsx", subtopicName: "Product-to-Sum and Sum-to-Product Identities" },
      { file: "08. Trigono - T-Equations.xlsx", subtopicName: "Trigonometric Equations" },
    ],
  },
  "angle-measurement": {
    id: "angle-measurement",
  chapterName: "Angle and Measurement",
  dir: join(SOURCE_ROOT, "01. Angle and Measurement", "Concept Practice"),
  sourceFile: "Cadetprep_Worksheets_Angle_and_Measurement",
  note: "Cadetprep concept-practice worksheet — Angle and Measurement",
  files: [
    // 01 + 03 are legacy BIFF .xls, 04 is xlsx mislabeled .xls — SheetJS sniffs content.
    { file: "01. Basic Concepts.xls", subtopicName: "Basic Concepts of Angles" },
    { file: "02. Systems of Angle Measurement.xlsx", subtopicName: "Systems of Angle Measurement" },
    { file: "03. Relation Between Angle Arc and Sector.xls", subtopicName: "Angle, Arc and Sector" },
    // 9 rows carry Excel date-coercion damage ("3:16 4/11" → 2025-04-11 03:16:00);
    // every option is reconstructed via overrides (clock times are exactly computable).
    { file: "04. Clock Angle Problems.xls", subtopicName: "Clock Angle Problems" },
  ],
  },
  "sets-relations": {
    id: "sets-relations",
  chapterName: "Sets and Relations",
  dir: join(SOURCE_ROOT, "02. Sets", "Concept Practice"),
  sourceFile: "Cadetprep_Worksheets_Sets_and_Relations",
  note: "Cadetprep concept-practice worksheet — Sets and Relations",
  files: [
    { file: "01. Sets - Basics.xlsx", subtopicName: "Set Basics" },
    { file: "02. Sets - Types of Sets.xlsx", subtopicName: "Types of Sets" },
    { file: "03. Sets - Operations.xlsx", subtopicName: "Set Operations" },
    { file: "04. Sets - Applications.xlsx", subtopicName: "Applications of Sets" },
    { file: "05. Relations - Orders Pair and Cartesian Product.xlsx", subtopicName: "Ordered Pairs and Cartesian Product" },
    { file: "06. Relations - Definition.xlsx", subtopicName: "Introduction to Relations" },
    { file: "07. Relations Types of Relations.xlsx", subtopicName: "Types of Relations" },
  ],
  },
  "complex-numbers": {
    id: "complex-numbers",
    chapterName: "Complex Numbers",
    dir: join(SOURCE_ROOT, "03. Complex Numbers", "01. Concept Practice"),
    sourceFile: "Cadetprep_Worksheets_Complex_Numbers",
    note: "Cadetprep concept-practice worksheet — Complex Numbers",
    files: [
      { file: "01. Definition of imaginary & complex numbers.xlsx", subtopicName: "Imaginary and Complex Numbers" },
      { file: "02. Powers of i.xlsx", subtopicName: "Powers of i" },
      { file: "03. Algebra of complex numbers.xlsx", subtopicName: "Algebra of Complex Numbers" },
      { file: "04. Conjugate and Modulus of a Complex Number.xlsx", subtopicName: "Conjugate and Modulus" },
      { file: "05. Argument.xlsx", subtopicName: "Argument" },
      { file: "06. Square Root.xlsx", subtopicName: "Square Root of a Complex Number" },
      { file: "07. Argand Plane.xlsx", subtopicName: "Argand Plane" },
      { file: "08. Polar and Euler Form.xlsx", subtopicName: "Polar and Euler Form" },
      { file: "09. Operation on Polar and Euler Form.xlsx", subtopicName: "Operations in Polar and Euler Form" },
      { file: "10. Cube root of Unity.xlsx", subtopicName: "Cube Roots of Unity" },
    ],
  },
  "logarithms": {
    id: "logarithms",
    chapterName: "Logarithms",
    dir: join(SOURCE_ROOT, "04. Logarithm", "01. Concept Practice"),
    sourceFile: "Cadetprep_Worksheets_Logarithms",
    note: "Cadetprep concept-practice worksheet — Logarithms",
    // The chapter's "03. Quizzes" folder (60 q, date-coercion + missing keys) is
    // deliberately NOT here — out of scope per the Concept-Practice-only rule.
    files: [
      { file: "01. Exponential to Log.xlsx", subtopicName: "Exponential to Logarithmic Form" },
      { file: "02. Log to Exponential.xlsx", subtopicName: "Logarithmic to Exponential Form" },
      { file: "03. Properties.xlsx", subtopicName: "Properties of Logarithms" },
      { file: "04. Logarithmic Expressions.xlsx", subtopicName: "Logarithmic Expressions" },
      { file: "05. Logarithmic Equations.xlsx", subtopicName: "Logarithmic Equations" },
      { file: "06. Mixed.xlsx", subtopicName: "Mixed Practice" },
    ],
  },
  "quadratic-equations": {
    id: "quadratic-equations",
    chapterName: "Quadratic Equations",
    dir: join(SOURCE_ROOT, "04. Quadratic Equations", "Concept Practice"),
    sourceFile: "Cadetprep_Worksheets_Quadratic_Equations",
    note: "Cadetprep concept-practice worksheet — Quadratic Equations",
    // CURATED (2026-08-06 analysis): "05. QE - Minima and Maxima.xlsx" is a 20/20
    // exact-stem duplicate of the _new file — only _new is ingested. The two
    // formula files ("Formula Revision_old.xlsx" ⊂ "QE_Formula_revision.xlsx")
    // are the Formula Revision content class, out of the Concept-Practice scope.
    files: [
      { file: "01. QE - Fundamentals.xlsx", subtopicName: "Fundamentals of Quadratic Equations" },
      { file: "02. QE - Factorization Methods.xlsx", subtopicName: "Factorization Methods" },
      { file: "03. QE- Nature of Roots.xlsx", subtopicName: "Nature of Roots" },
      { file: "04. QE- Relationship betn Roots and Coefficients.xlsx", subtopicName: "Roots and Coefficients" },
      { file: "05. QE - Minima and Maxima_new.xlsx", subtopicName: "Minima and Maxima" },
    ],
  },
  "permutations-combinations": {
    id: "permutations-combinations",
    chapterName: "Permutations and Combinations",
    dir: join(SOURCE_ROOT, "09. Permutations and Combinations", "Concept_Practice"),
    sourceFile: "Cadetprep_Worksheets_Permutations_and_Combinations",
    note: "Cadetprep concept-practice worksheet — Permutations and Combinations",
    files: [
      { file: "01. Fundamentals.xlsx", subtopicName: "Counting Fundamentals" },
      { file: "02. Linear Permutations.xlsx", subtopicName: "Linear Permutations" },
      { file: "03. Permutations with Restrictions.xlsx", subtopicName: "Permutations with Restrictions" },
      { file: "04. Circular Permutations.xlsx", subtopicName: "Circular Permutations" },
      { file: "05. Advanced Permutation Topics.xlsx", subtopicName: "Advanced Permutation Topics" },
      { file: "06. Combinations Basics.xlsx", subtopicName: "Combinations Basics" },
      { file: "07. Combinations with Restrictions.xlsx", subtopicName: "Combinations with Restrictions" },
      { file: "08. Distribution of Distinct Objects.xlsx", subtopicName: "Distribution of Distinct Objects" },
      { file: "09. Distribution of Identical Objects.xlsx", subtopicName: "Distribution of Identical Objects" },
    ],
  },
  "derivatives": {
    id: "derivatives",
    chapterName: "Derivatives",
    dir: join(SOURCE_ROOT, "16. Derivatives", "Concept_Practice"),
    sourceFile: "Cadetprep_Worksheets_Derivatives",
    note: "Cadetprep concept-practice worksheet — Derivatives",
    // All 10 files are legacy BIFF .xls (SheetJS sniffs content). Order = teaching
    // sequence (foundations → techniques → applications), not the alphabetical dir listing.
    files: [
      { file: "Continuity&Differentiability.xls", subtopicName: "Continuity and Differentiability" },
      { file: "Basic-Differentiation-Rules.xls", subtopicName: "Basic Differentiation Rules" },
      { file: "Advanced-Differentiation-Techniques.xls", subtopicName: "Advanced Differentiation Techniques" },
      { file: "Derivatives-Special-Functions.xls", subtopicName: "Derivatives of Special Functions" },
      { file: "Higher-Order-Derivatives.xls", subtopicName: "Higher-Order Derivatives" },
      { file: "Tangents&Normals.xls", subtopicName: "Tangents and Normals" },
      { file: "Rate-of-Change-Problems.xls", subtopicName: "Rate of Change" },
      { file: "Monotonicity&Critical-Points.xls", subtopicName: "Monotonicity and Critical Points" },
      { file: "Maxima&Minima.xls", subtopicName: "Maxima and Minima" },
      { file: "Verification&Proof-Problems.xls", subtopicName: "Verification and Proof Problems" },
    ],
  },
  // ─── Root-layout chapters (folders 06-30): the subtopic worksheets sit directly
  // in the chapter folder — same 15-col template, same content class as the
  // Concept Practice folders; scope re-opened by the user 2026-08-07. ───
  "functions": {
    id: "functions",
    chapterName: "Functions",
    dir: join(SOURCE_ROOT, "06. Functions"),
    sourceFile: "Cadetprep_Worksheets_Functions",
    note: "Cadetprep concept-practice worksheet — Functions",
    files: [
      { file: "01. Basics Function Theory.xlsx", subtopicName: "Basic Function Theory" },
      { file: "02. Types of Functions.xlsx", subtopicName: "Types of Functions" },
      { file: "03. Even and Odd functions.xlsx", subtopicName: "Even and Odd Functions" },
      { file: "04. Basic Operations.xlsx", subtopicName: "Operations on Functions" },
      { file: "05. Functions - Composite Functions.xlsx", subtopicName: "Composite Functions" },
      { file: "06. Inverse Functions.xlsx", subtopicName: "Inverse Functions" },
    ],
  },
  "straight-lines": {
    id: "straight-lines",
    chapterName: "Straight Lines",
    dir: join(SOURCE_ROOT, "07. Straight Lines"),
    sourceFile: "Cadetprep_Worksheets_Straight_Lines",
    note: "Cadetprep concept-practice worksheet — Straight Lines",
    files: [
      { file: "01. Basics.xlsx", subtopicName: "Coordinate Basics" },
      { file: "02. Equation of a Straight Line.xlsx", subtopicName: "Equation of a Straight Line" },
      { file: "03. Slope and Angle Concepts.xlsx", subtopicName: "Slope and Inclination" },
      { file: "04. Angle Between Two Lines.xlsx", subtopicName: "Angle Between Two Lines" },
      { file: "05. Distance Formulas.xlsx", subtopicName: "Distance Formulas" },
      { file: "06. Parallel and Perpendicular Lines.xlsx", subtopicName: "Parallel and Perpendicular Lines" },
      { file: "07. Concurrent Lines.xlsx", subtopicName: "Concurrent Lines" },
      { file: "08. Position of Point with Respect to Line.xlsx", subtopicName: "Position of a Point Relative to a Line" },
    ],
  },
  vectors: {
    id: "vectors",
    chapterName: "Vectors",
    dir: join(SOURCE_ROOT, "19. Vectors"),
    sourceFile: "Cadetprep_Worksheets_Vectors",
    note: "Cadetprep concept-practice worksheet — Vectors",
    // CURATED: "02. Vector Algebra_v2.xlsx" excluded — exact duplicate of the base
    // file (39/39 rows identical incl. options+keys, census 2026-08-07). Each
    // subtopic pairs a base file with a "_new" variant; both map to ONE subtopic.
    // Shared stems across pairs: exact dups dedup via content_hash at commit,
    // re-authored distractor variants are kept (user's keep-duplicates ruling).
    // The census's two apparent cross-file key conflicts dissolved on inspection:
    // a sign-stripping normalizer had collapsed DIFFERENT questions (a·b = ±|a||b|;
    // b with ±k̂) into "same stem". All four keys verified correct by the blind pass.
    files: [
      { file: "01. Fundamental Concepts.xlsx", subtopicName: "Fundamental Concepts" },
      { file: "01. Fundamental Concepts_new.xlsx", subtopicName: "Fundamental Concepts" },
      { file: "02. Vector Algebra.xlsx", subtopicName: "Vector Algebra" },
      { file: "02. Vector Algebra_new.xlsx", subtopicName: "Vector Algebra" },
      { file: "03. Unit Vector and Directions.xlsx", subtopicName: "Unit Vectors and Directions" },
      { file: "03. Unit Vector and Directions_new.xlsx", subtopicName: "Unit Vectors and Directions" },
      { file: "04. Position Vector and Geometric Applications.xlsx", subtopicName: "Position Vectors and Geometric Applications" },
      { file: "04. Position Vector and Geometric Applications_new.xlsx", subtopicName: "Position Vectors and Geometric Applications" },
      { file: "05. Scalar Product.xlsx", subtopicName: "Scalar Product" },
      { file: "05. Scalar Product_new.xlsx", subtopicName: "Scalar Product" },
      { file: "06. Vector Product.xlsx", subtopicName: "Vector Product" },
      { file: "06. Vector Product_new.xlsx", subtopicName: "Vector Product" },
      { file: "07. Triple Products.xlsx", subtopicName: "Triple Products" },
      { file: "07. Triple Products_new.xlsx", subtopicName: "Triple Products" },
      { file: "08. Vector Relationships.xlsx", subtopicName: "Vector Relationships" },
      { file: "08. Vector Relationships_new.xlsx", subtopicName: "Vector Relationships" },
      { file: "09. Special Angles.xlsx", subtopicName: "Special Angles" },
      { file: "09. Special Angles_new.xlsx", subtopicName: "Special Angles" },
      { file: "10. Applications.xlsx", subtopicName: "Applications" },
      { file: "10. Applications_new.xlsx", subtopicName: "Applications" },
    ],
  },
  "indefinite-integration": {
    id: "indefinite-integration",
    chapterName: "Indefinite Integration",
    dir: join(SOURCE_ROOT, "17. Indefinite_Integration"),
    sourceFile: "Cadetprep_Worksheets_Indefinite_Integration",
    note: "Cadetprep concept-practice worksheet — Indefinite Integration",
    // "04. Integration By Parts_old.xlsx" kept: 9 of its 11 q are unique
    // (2 re-authored twins of base rows, 1 with a conflicting key — settled by
    // the blind pass). Maps to the same subtopic as the base file.
    files: [
      { file: "01. Core Concepts.xlsx", subtopicName: "Core Concepts" },
      { file: "02. Basic Integrals.xlsx", subtopicName: "Basic Integrals" },
      { file: "03. Substitution Method.xlsx", subtopicName: "Substitution Method" },
      { file: "04. Integration By Parts.xlsx", subtopicName: "Integration by Parts" },
      { file: "04. Integration By Parts_old.xlsx", subtopicName: "Integration by Parts" },
      { file: "05. Partial Fractions.xlsx", subtopicName: "Partial Fractions" },
      { file: "06. Algebraic_Integrals.xlsx", subtopicName: "Algebraic Integrals" },
      { file: "07. Trigonometric_Integrals.xlsx", subtopicName: "Trigonometric Integrals" },
      { file: "08. Logarithmic_and_Exponential_Integrals.xlsx", subtopicName: "Logarithmic and Exponential Integrals" },
      { file: "09. Composite and Special Structure Integrals.xlsx", subtopicName: "Composite and Special Integrals" },
    ],
  },
  circles: {
    id: "circles",
    chapterName: "Circles",
    dir: join(SOURCE_ROOT, "11. Circles"),
    sourceFile: "Cadetprep_Worksheets_Circles",
    note: "Cadetprep concept-practice worksheet — Circles",
    // Legacy BIFF .xls files — SheetJS sniffs content, parses fine.
    files: [
      { file: "1)Basics.xls", subtopicName: "Basics" },
      { file: "2)Points&Lines.xls", subtopicName: "Points and Lines" },
      { file: "3)Tangent.xls", subtopicName: "Tangents" },
      { file: "4)Normal.xls", subtopicName: "Normals" },
      { file: "5)Intersection.xls", subtopicName: "Intersections" },
      { file: "6)Special-Circles.xls", subtopicName: "Special Circles" },
      { file: "7)Advanced-Circle.xls", subtopicName: "Advanced Problems" },
      { file: "8)Optimization.xls", subtopicName: "Optimization" },
      { file: "9)Co-ordinate.xls", subtopicName: "Coordinate Applications" },
    ],
  },
  "sequence-series": {
    id: "sequence-series",
    chapterName: "Sequence and Series",
    dir: join(SOURCE_ROOT, "08. Sequence and Series"),
    sourceFile: "Cadetprep_Worksheets_Sequence_Series",
    note: "Cadetprep concept-practice worksheet — Sequence and Series",
    files: [
      { file: "01. Fundamentals.xlsx", subtopicName: "Fundamentals" },
      { file: "02. Arithmetic Progression.xlsx", subtopicName: "Arithmetic Progression" },
      { file: "03. Geometric Progression.xlsx", subtopicName: "Geometric Progression" },
      { file: "04. Harmonic Progression.xlsx", subtopicName: "Harmonic Progression" },
      { file: "05. Arithmetic-Geometric Progression.xlsx", subtopicName: "Arithmetic-Geometric Progression" },
      { file: "06. AM, GM, HM.xlsx", subtopicName: "AM, GM and HM" },
      { file: "07. Relationship between means.xlsx", subtopicName: "Relationship Between Means" },
      { file: "08. Special Series and Sequences.xlsx", subtopicName: "Special Series" },
    ],
  },
  "binomial-theorem": {
    id: "binomial-theorem",
    chapterName: "Binomial Theorem",
    dir: join(SOURCE_ROOT, "10. Binomial Theorem"),
    sourceFile: "Cadetprep_Worksheets_Binomial_Theorem",
    note: "Cadetprep concept-practice worksheet — Binomial Theorem",
    files: [
      { file: "Binomial-Expansion.xls", subtopicName: "Binomial Expansion" },
      { file: "Pascal-Triangle.xls", subtopicName: "Pascal's Triangle" },
      { file: "(r+1)th-Term.xls", subtopicName: "General Term" },
      { file: "Middle-Term-Analysis.xls", subtopicName: "Middle Term" },
      { file: "Independant-Term.xls", subtopicName: "Term Independent of x" },
      { file: "Greatest-Coefficient.xls", subtopicName: "Greatest Term and Coefficient" },
      { file: "Coefficient-Properties&Relations.xls", subtopicName: "Coefficient Properties" },
      { file: "Sum-of-Binomial-Coefficients.xls", subtopicName: "Sum of Coefficients" },
      { file: "Rational-Index&Fractional-Powers.xls", subtopicName: "Rational Index" },
    ],
  },
  limits: {
    id: "limits",
    chapterName: "Limits",
    dir: join(SOURCE_ROOT, "12. Limits"),
    sourceFile: "Cadetprep_Worksheets_Limits",
    note: "Cadetprep concept-practice worksheet — Limits",
    files: [
      { file: "Introduction.xls", subtopicName: "Introduction" },
      { file: "Concept&Definition.xls", subtopicName: "Concept and Definition" },
      { file: "Direct-Substitution-Method.xls", subtopicName: "Direct Substitution" },
      { file: "Factorization-Method.xls", subtopicName: "Factorization Method" },
      { file: "Algebraic&Functions.xls", subtopicName: "Algebraic Limits" },
      { file: "LHL&RHL.xls", subtopicName: "One-Sided Limits" },
    ],
  },
  "height-distance": {
    id: "height-distance",
    chapterName: "Height and Distance",
    dir: join(SOURCE_ROOT, "13. Height&Distance"),
    sourceFile: "Cadetprep_Worksheets_Height_Distance",
    note: "Cadetprep concept-practice worksheet — Height and Distance",
    files: [
      { file: "Line of Sight&HorizontalReference.xls", subtopicName: "Line of Sight and Horizontal Reference" },
      { file: "Angle-of-Elevation.xls", subtopicName: "Angle of Elevation" },
      { file: "Angle-of-Depression.xls", subtopicName: "Angle of Depression" },
      { file: "Tower_Building-Height-Calculations.xls", subtopicName: "Tower and Building Heights" },
      { file: "Shadow-Problem.xls", subtopicName: "Shadow Problems" },
      { file: "Ladder-Problems.xls", subtopicName: "Ladder Problems" },
      { file: "Balloon&Aerial-Objects.xls", subtopicName: "Balloons and Aerial Objects" },
      { file: "Moving-Observer-Problems.xls", subtopicName: "Moving Observer Problems" },
    ],
  },
  "matrices-determinants": {
    id: "matrices-determinants",
    chapterName: "Matrices and Determinants",
    dir: join(SOURCE_ROOT, "18. Determinants&Matrices"),
    sourceFile: "Cadetprep_Worksheets_Matrices_Determinants",
    note: "Cadetprep concept-practice worksheet — Matrices and Determinants",
    // Legacy BIFF .xls — SheetJS sniffs content. File order = the folder's own
    // 1)…7) numbering, which is already the teaching sequence (matrices → determinants).
    files: [
      { file: "1)Basic-Matrix.xls", subtopicName: "Matrix Basics" },
      { file: "2)Matrix-Operations.xls", subtopicName: "Matrix Operations" },
      { file: "3)Special-Matrices.xls", subtopicName: "Special Matrices" },
      { file: "4)Determinant-Basic.xls", subtopicName: "Determinant Basics" },
      { file: "5)Determinant-Properties.xls", subtopicName: "Properties of Determinants" },
      { file: "6)Determinant-Calculation.xls", subtopicName: "Evaluating Determinants" },
      { file: "7)Adjoint&Inverse.xls", subtopicName: "Adjoint and Inverse" },
    ],
  },
  "inverse-trigonometry": {
    id: "inverse-trigonometry",
    chapterName: "Inverse Trigonometry",
    dir: join(SOURCE_ROOT, "15. Inverse-Trigonometery"),
    sourceFile: "Cadetprep_Worksheets_Inverse_Trigonometry",
    note: "Cadetprep concept-practice worksheet — Inverse Trigonometry",
    // Files are unnumbered; order is the teaching sequence (definitions → values →
    // properties → compound-angle formulas → calculus), not the alphabetical listing.
    files: [
      { file: "Core-Fundamentals.xls", subtopicName: "Core Fundamentals" },
      { file: "Standard-Values.xls", subtopicName: "Standard Values" },
      { file: "Fundamental-Properties.xls", subtopicName: "Fundamental Properties" },
      { file: "Addition&Subtraction-Formulas.xls", subtopicName: "Addition and Subtraction Formulas" },
      { file: "Calculus-Applications.xls", subtopicName: "Calculus Applications" },
    ],
  },
  inequalities: {
    id: "inequalities",
    chapterName: "Inequalities",
    dir: join(SOURCE_ROOT, "14. Inequalities"),
    sourceFile: "Cadetprep_Worksheets_Inequalities",
    note: "Cadetprep concept-practice worksheet — Inequalities",
    // Filenames are irregular on purpose — "2) Quadratic-Inequalities .xls" carries a
    // trailing space before the extension and files 2/4 a space after the paren.
    files: [
      { file: "1)Linear-Inequalities.xls", subtopicName: "Linear Inequalities" },
      { file: "2) Quadratic-Inequalities .xls", subtopicName: "Quadratic Inequalities" },
      { file: "3)Advanced-Ineqality.xls", subtopicName: "Advanced Inequalities" },
      { file: "4) Modulus-Inequality.xls", subtopicName: "Modulus Inequalities" },
      { file: "5)Rational-Irrational-Inequalities.xls", subtopicName: "Rational and Irrational Inequalities" },
    ],
  },
  // ─── Batch J: the remaining eight chapters with content, which complete the
  // source. Chapters 22 and 29 hold no worksheet files at all (empty/duplicate
  // placeholders) and are deliberately absent from this registry.
  //
  // NOTE ON KEY SKEW: six of these eight already sit at ~25% per letter, unlike
  // every earlier chapter (A ran 41-57%). Either they are a later, better-QC'd
  // generation, or the keys were assigned to hit a distribution rather than
  // derived — the second reading would make them WORSE, not better, and the
  // rebalance step cannot help because there is nothing to rebalance. The blind
  // pass is the only thing that settles it.
  "geometry-3d": {
    id: "geometry-3d",
    chapterName: "3D Geometry",
    dir: join(SOURCE_ROOT, "24. 3D - Line and Plane"),
    sourceFile: "Cadetprep_Worksheets_3D_Geometry",
    note: "Cadetprep concept-practice worksheet — 3D Geometry",
    files: [
      { file: "01. Foundational Concepts.xlsx", subtopicName: "Foundational Concepts" },
      // The filename reads "Direction and Ratios"; the subtopic is spelled correctly.
      { file: "02. Direction Cosines and Direction and Ratios.xlsx", subtopicName: "Direction Cosines and Direction Ratios" },
      { file: "03. Equation of Line.xlsx", subtopicName: "Equation of a Line" },
      { file: "04. Angle and Relationships between Lines.xlsx", subtopicName: "Angle and Relationships Between Lines" },
      { file: "05. Distance Between Lines.xlsx", subtopicName: "Distance Between Lines" },
      { file: "06. Equation of Plane.xlsx", subtopicName: "Equation of a Plane" },
      { file: "07. Angle and Relationships between Plane.xlsx", subtopicName: "Angle and Relationships Between Planes" },
      { file: "08. Line and Plane Intersection.xlsx", subtopicName: "Line and Plane Intersection" },
      { file: "09. Sphere.xlsx", subtopicName: "Sphere" },
    ],
  },
  probability: {
    id: "probability",
    chapterName: "Probability",
    dir: join(SOURCE_ROOT, "20. Probability"),
    sourceFile: "Cadetprep_Worksheets_Probability",
    note: "Cadetprep concept-practice worksheet — Probability",
    files: [
      { file: "01. Fundamental Concepts.xlsx", subtopicName: "Fundamental Concepts" },
      { file: "02. Probability Definition and Theorems.xlsx", subtopicName: "Definition and Theorems" },
      { file: "03. Conditional Probability.xlsx", subtopicName: "Conditional Probability" },
      { file: "04. Independant Events.xlsx", subtopicName: "Independent Events" },
      { file: "05. Bayes Theorem.xlsx", subtopicName: "Bayes' Theorem" },
      { file: "06. Random Variables and Distributions.xlsx", subtopicName: "Random Variables and Distributions" },
      { file: "07. Binomial Distribution.xlsx", subtopicName: "Binomial Distribution" },
    ],
  },
  statistics: {
    id: "statistics",
    chapterName: "Statistics",
    dir: join(SOURCE_ROOT, "25. Statistics"),
    sourceFile: "Cadetprep_Worksheets_Statistics",
    note: "Cadetprep concept-practice worksheet — Statistics",
    files: [
      { file: "01. Classification of Data.xlsx", subtopicName: "Classification of Data" },
      { file: "02. Frequency Distribution.xlsx", subtopicName: "Frequency Distribution" },
      { file: "03. Cumulative Frequency Distribution.xlsx", subtopicName: "Cumulative Frequency Distribution" },
      { file: "04. Graphical Representation.xlsx", subtopicName: "Graphical Representation" },
      { file: "05. Measures of Central Tendency.xlsx", subtopicName: "Measures of Central Tendency" },
      { file: "06. Variance and Standard Deviation.xlsx", subtopicName: "Variance and Standard Deviation" },
      { file: "07. Correlation and Regression.xlsx", subtopicName: "Correlation and Regression" },
    ],
  },
  "properties-of-triangle": {
    id: "properties-of-triangle",
    chapterName: "Properties of Triangle",
    dir: join(SOURCE_ROOT, "23. Properties of Triangle"),
    sourceFile: "Cadetprep_Worksheets_Properties_of_Triangle",
    note: "Cadetprep concept-practice worksheet — Properties of Triangle",
    // Files 05 and 06 carry "Formula" in their names but are ORDINARY concept
    // practice, not the out-of-scope Formula Revision content class.
    files: [
      { file: "01. Fundamentals.xlsx", subtopicName: "Fundamentals" },
      { file: "02. Sine Rule.xlsx", subtopicName: "Sine Rule" },
      { file: "03. Cosine Rule.xlsx", subtopicName: "Cosine Rule" },
      { file: "04. Projection Rule.xlsx", subtopicName: "Projection Rule" },
      { file: "05. Half Angle Formula.xlsx", subtopicName: "Half-Angle Formulae" },
      { file: "06. Herons Formula.xlsx", subtopicName: "Heron's Formula" },
      { file: "07. Napiers Analogy.xlsx", subtopicName: "Napier's Analogy" },
    ],
  },
  "definite-integration": {
    id: "definite-integration",
    chapterName: "Definite Integration",
    dir: join(SOURCE_ROOT, "21. Definite_Inegration"),
    sourceFile: "Cadetprep_Worksheets_Definite_Integration",
    note: "Cadetprep concept-practice worksheet — Definite Integration",
    files: [
      { file: "01. Fundamental Concepts.xlsx", subtopicName: "Fundamental Concepts" },
      { file: "02. Properties.xlsx", subtopicName: "Properties of Definite Integrals" },
      { file: "03. Substitution Method.xlsx", subtopicName: "Substitution Method" },
      { file: "04. Integration by Parts.xlsx", subtopicName: "Integration by Parts" },
      { file: "05. Special Functions.xlsx", subtopicName: "Special Functions" },
    ],
  },
  conics: {
    id: "conics",
    chapterName: "Conics",
    dir: join(SOURCE_ROOT, "28. Conics"),
    sourceFile: "Cadetprep_Worksheets_Conics",
    note: "Cadetprep concept-practice worksheet — Conics",
    files: [
      { file: "01. General Concepts.xlsx", subtopicName: "General Concepts" },
      { file: "02. Parabola.xlsx", subtopicName: "Parabola" },
      { file: "03. Ellipse.xlsx", subtopicName: "Ellipse" },
      { file: "04. Hyperbola.xlsx", subtopicName: "Hyperbola" },
    ],
  },
  "differential-equations": {
    id: "differential-equations",
    chapterName: "Differential Equations",
    dir: join(SOURCE_ROOT, "27. Differential Equations"),
    sourceFile: "Cadetprep_Worksheets_Differential_Equations",
    note: "Cadetprep concept-practice worksheet — Differential Equations",
    // Folder "29. Differential Equations" is an empty duplicate — no files.
    files: [
      { file: "01. Basic Concepts.xlsx", subtopicName: "Basic Concepts" },
      { file: "02. Formation of DE.xlsx", subtopicName: "Formation of Differential Equations" },
      { file: "03. Solving DE.xlsx", subtopicName: "Solving Differential Equations" },
      { file: "04. General Soln and Particular Soln.xlsx", subtopicName: "General and Particular Solutions" },
    ],
  },
  "applications-of-derivatives": {
    id: "applications-of-derivatives",
    chapterName: "Applications of Derivatives",
    dir: join(SOURCE_ROOT, "30. AOD"),
    sourceFile: "Cadetprep_Worksheets_Applications_of_Derivatives",
    note: "Cadetprep concept-practice worksheet — Applications of Derivatives",
    files: [
      { file: "01. NDA_AoD_Tangents_Normals_Rate_of_Change.xlsx", subtopicName: "Tangents, Normals and Rate of Change" },
      { file: "02. NDA_AoD_Increasing_Decreasing_Functions.xlsx", subtopicName: "Increasing and Decreasing Functions" },
      { file: "03. NDA_AoD_Maxima_Minima.xlsx", subtopicName: "Maxima and Minima" },
      { file: "04. NDA_AoD_Applied_Maxima_Minima.xlsx", subtopicName: "Applied Maxima and Minima" },
    ],
  },
  "binary-numbers": {
    id: "binary-numbers",
    chapterName: "Binary Numbers",
    dir: join(SOURCE_ROOT, "26. Binary Numbers"),
    sourceFile: "Cadetprep_Worksheets_Binary_Numbers",
    note: "Cadetprep concept-practice worksheet — Binary Numbers",
    // "Binary_Syllabus.docx" in the same folder is a syllabus doc, not a worksheet.
    files: [
      { file: "01. Basic Concepts.xlsx", subtopicName: "Basic Concepts" },
      { file: "02. Conversions.xlsx", subtopicName: "Conversions" },
      { file: "03. Binary Aritmetics.xlsx", subtopicName: "Binary Arithmetic" },
    ],
  },
};

export function requireChapter(id: string | undefined): Chapter {
  if (!id || !CHAPTERS[id]) {
    throw new Error(`Unknown chapter "${id}". Known: ${Object.keys(CHAPTERS).join(", ")}`);
  }
  return CHAPTERS[id];
}
