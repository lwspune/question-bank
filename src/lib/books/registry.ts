/**
 * The book registry — what a "book" IS, declared as data.
 *
 * A book here is a DERIVED VIEW over questions that already exist in the bank.
 * It stores no content and duplicates nothing: it names a subject, the SECTIONS
 * each chapter is split into, and the chapters to draw them into, in order.
 *
 * SECTIONS ARE PER-BOOK, and that is what makes a second book possible. The
 * first version hardcoded `[nda, cds]` in order.ts behind a `"NDA" | "CDS"`
 * union; a book over one exam, or three, could not have used it. What is NOT
 * here is how to read an exam's SITTING — that is a property of the exam
 * (`EXAM_SITTING` in order.ts), true for every book containing it, so a new
 * book inheriting NDA does not restate NDA's rule.
 *
 * CHAPTER NAMES MUST MATCH THE DB EXACTLY. They are matched by name against
 * `chapters.name`, and a near-miss does not error — it silently yields an empty
 * chapter. `tests/books-registry.test.ts` is the standing guard: it resolves
 * every name against the live bank in every exam the book draws from, and fails
 * in both directions.
 */
import type { BookSectionDef, SubtopicGroupDef } from "./order";

export type BookChapter = {
  /** URL segment. Stable — it is the shareable link to a chapter of the book. */
  slug: string;
  /** Must equal `chapters.name` in the bank, character for character. */
  name: string;
  /**
   * Opt-in subtopic grouping (layout A), in print order.
   *
   * ONLY set this where NO SET SPANS A SUBTOPIC — measured per chapter, since
   * a set takes the subtopic of its first question. Vocabulary, Sentence
   * Rearrangement and Fill in the Blanks are clean (0 spanning sets). Grammar
   * (18 of 72), Spotting Errors (28 of 37) and Reading Comprehension (49 of 65)
   * are NOT: grouping them would tear questions away from their passage.
   *
   * `directions` is an authored line replacing the per-set Directions for the
   * whole block. Set it only where every set genuinely shares one instruction.
   * Omit it and the block keeps its per-set Directions, which is right for the
   * catch-all subtopics that mix task types.
   */
  groupSubtopics?: SubtopicGroupDef[];
};

export type BookDefinition = {
  slug: string;
  title: string;
  /** One line under the title, describing what the book is. */
  subtitle: string;
  /** Matched against `subjects.name`. */
  subject: string;
  /** Every chapter is split into these, in this order. */
  sections: BookSectionDef[];
  chapters: BookChapter[];
};

/**
 * Chapter order is EDITORIAL, not derived.
 *
 * It runs heaviest-first by combined question count, which is how the `/guide`
 * subjects tier their chapters. It is a hand-written list rather than a
 * `count desc` sort because a derived order would silently reshuffle the book
 * on every ingest, and a book's chapter order should change only when someone
 * decides it should.
 */
export const NDA_CDS_ENGLISH: BookDefinition = {
  slug: "nda-cds-english",
  title: "NDA / CDS English PYQ Master",
  subtitle:
    "Every English past-year question from both exams, chapter by chapter — NDA first, then CDS, oldest to newest.",
  subject: "English",
  sections: [
    { key: "nda", title: "NDA PYQ", exam: "NDA" },
    { key: "cds", title: "CDS PYQ", exam: "CDS" },
  ],
  chapters: [
    {
      slug: "vocabulary",
      name: "Vocabulary",
      // 0 of 91 sets span a subtopic. Synonyms and Antonyms carry an authored
      // line because all 65 of their sets say the same thing in 22 different
      // wordings; the other two mix task types (Word Definition alone spans
      // Match-List, word-pair meaning and single-word meaning), so no single
      // line would be true of them and they keep their per-set Directions.
      groupSubtopics: [
        {
          name: "Synonyms",
          directions:
            "Each item consists of a sentence with an underlined word or words, followed by four options. Select the option nearest in meaning to the underlined part.",
        },
        {
          name: "Antonyms",
          directions:
            "Each item consists of a sentence with an underlined word or words, followed by four options. Select the option opposite in meaning to the underlined part.",
        },
        { name: "Word Definition" },
        { name: "Confusable Word Pairs" },
      ],
    },
    {
      slug: "grammar",
      name: "Grammar",
      // 18 of 75 sets span a subtopic, ALL of them in CDS — and every one mixes
      // ONLY the three merged below, never any other subtopic (measured:
      // `npx tsx scripts/books/subtopic-report.ts --chapter=grammar --spanning`).
      //
      // They interleave because they are ONE task. Those CDS papers print a
      // single instruction — "fill the blank with the appropriate word" — over
      // ten questions, and the three subtopics classify what the ANSWER turned
      // out to be, not what the student was asked to do. CDS says so itself:
      // three of its "Preposition Usage" sets are headed "select the most
      // appropriate preposition OR DETERMINER". Merging them takes the chapter
      // to 0 spanning sets and 0 questions printed under a wrong heading,
      // without splitting a set or re-tagging the bank.
      //
      // NO authored `directions` on any block, deliberately. Parts of Speech
      // and Sentence Completion would each take one (all their wordings are the
      // same task), but writing that prose needs the full Directions text read
      // rather than the measured claim that it exists. Correct Sentence
      // Identification can never take one: its five CDS wordings are five
      // different tasks — combining two sentences, choosing which of two uses a
      // word correctly, a word used variously across S1/S2/S3. Per-set
      // Directions are always correct, so they stay.
      groupSubtopics: [
        {
          name: "Prepositions, Determiners and Connectors",
          members: [
            "Preposition Usage",
            "Discourse Markers and Connectors",
            "Articles, Determiners and Quantifiers",
          ],
        },
        { name: "Parts of Speech" },
        { name: "Sentence Completion" },
        { name: "Correct Sentence Identification" },
        { name: "Direct and Indirect Speech" },
        { name: "Active and Passive Voice" },
        // NDA only — CDS has never asked it, so it prints a blank CDS cell.
        { name: "Subject-Verb Agreement" },
      ],
    },
    {
      slug: "sentence-rearrangement",
      name: "Sentence Rearrangement",
      // 0 of 55 sets span a subtopic. Both blocks are genuinely one task type,
      // but the two differ from each other, so each carries its own line.
      groupSubtopics: [
        {
          name: "Sentence Part Rearrangement (PQRS)",
          directions:
            "Each item is a sentence whose parts have been jumbled and labelled P, Q, R and S. Select the sequence that produces the correct sentence.",
        },
        {
          name: "Paragraph Sequencing (S1–S6)",
          directions:
            "Each item is a passage of six sentences. The first and sixth are given as S1 and S6; the middle four have been jumbled and labelled P, Q, R and S. Select the correct order.",
        },
      ],
    },
    { slug: "spotting-errors", name: "Spotting Errors" },
    { slug: "reading-comprehension", name: "Reading Comprehension" },
    { slug: "idioms-and-phrases", name: "Idioms and Phrases" },
    { slug: "cloze-test", name: "Cloze Test" },
    {
      slug: "fill-in-the-blanks",
      name: "Fill in the Blanks",
      // 0 of 11 sets span a subtopic.
      groupSubtopics: [
        {
          name: "Contextual Fill-in-Blank",
          directions:
            "Each sentence has a blank space followed by four options. Select the word or group of words most appropriate for the blank.",
        },
        { name: "Contextual Word Selection (Phrasal Verbs and Collocations)" },
      ],
    },
  ],
};


/**
 * MHT-CET Mathematics — the second book, and structurally the opposite of the
 * first. Measured against the live bank before it was written:
 *
 * SUBJECT IS "Maths", NOT "Mathematics". Nine other exams in this bank spell it
 * "Mathematics"; MHT-CET and JEE Mains do not. It is matched against
 * `subjects.name`, and a near-miss does not error — it yields an EMPTY BOOK.
 * tests/books-registry.test.ts is what catches it.
 *
 * ONE SECTION. The English book's two halves exist so a chapter can carry two
 * exams' take on one subtopic; with a single exam that reason disappears, and a
 * second section would print a heading over nothing. The contents table
 * degrades honestly to a single column of per-subtopic ranges.
 *
 * EVERY CHAPTER GROUPS BY SUBTOPIC, which is free here and was not in English.
 * The gate for layout A is "no set spans a subtopic", and `set_id` is NULL on
 * all 2,228 rows — a maths question is standalone, where 3,175 of the English
 * book's 3,180 sit in a shared-passage set. So the gate is satisfied VACUOUSLY
 * in all 27 chapters, and the three English chapters that can never group have
 * no counterpart here.
 *
 * NO AUTHORED `directions`. An English block can carry one because 65 sets say
 * the same thing 22 ways; a maths question states its own task in its stem, so
 * a block-wide instruction would be invented text, not a de-duplicated one.
 *
 * SUBTOPIC ORDER is the /notes teaching order (`subtopics.order_index`) for the
 * seven chapters that have one, and descending question count for the rest.
 * Baked in rather than derived for the same reason chapter order is: a derived
 * order silently reshuffles the book on every ingest.
 *
 * CHAPTER ORDER is heaviest-first, as in the English book. Note the tail is
 * genuinely thin and syllabus movement is real: Conic Sections first appears in
 * 2023, and Measures of Dispersion was last asked in 2024.
 *
 * REPEATS ARE THIS BOOK'S DISTINGUISHING PROBLEM. MHT-CET re-asks questions, so
 * 122 of its 2,228 rows are a repeated stem and would print adjacent under one
 * heading. They are collapsed by curation and the survivor carries a recurrence
 * line — see src/lib/books/recurrence.ts, which also explains why the count is
 * in SITTINGS and never in rows.
 */
export const MHT_CET_MATHS: BookDefinition = {
  slug: "mht-cet-maths",
  title: "MHT-CET Mathematics PYQ Master",
  subtitle:
    "Every MHT-CET Mathematics past-year question, chapter by chapter and subtopic by subtopic, oldest sitting first.",
  subject: "Maths",
  sections: [{ key: "cet", title: "MHT-CET PYQ", exam: "MHT-CET" }],
  chapters: [
    {
      slug: "vectors",
      name: "Vectors",
      // 228 q across 6 subtopics, in the /notes teaching order (subtopics.order_index).
      groupSubtopics: [
        { name: "Magnitude, Components, and Unit Vectors" }, // 10
        { name: "Vector Geometry — Section Formula, Triangle, and Parallelogram" }, // 16
        { name: "Linear Combinations, Collinearity, and Coplanarity" }, // 15
        { name: "Dot Product, Angle, and Perpendicularity" }, // 50
        { name: "Cross Product, Angle, and Area" }, // 66
        { name: "Scalar Triple Product, Coplanarity, and Volume" }, // 71
      ],
    },
    {
      slug: "line-and-plane",
      name: "Line and Plane",
      // 205 q across 7 subtopics, in the /notes teaching order (subtopics.order_index).
      groupSubtopics: [
        { name: "Line — Equation, Direction Cosines, and Vector Form" }, // 29
        { name: "Plane — Equation, Normal, and Construction" }, // 47
        { name: "Angles — Line, Plane, and Direction Conditions" }, // 29
        { name: "Distances in 3-D" }, // 33
        { name: "Foot of Perpendicular, Image, and Projection" }, // 19
        { name: "Intersection, Coplanarity, and Skew Lines" }, // 37
        { name: "Tetrahedron Geometry — Centroid, Volume, and Vertices" }, // 11
      ],
    },
    {
      slug: "applications-of-derivative",
      name: "Applications of Derivative",
      // 183 q across 7 subtopics, in the /notes teaching order (subtopics.order_index).
      groupSubtopics: [
        { name: "Tangents, Normals, and the Slope of a Curve" }, // 35
        { name: "Angle Between Curves and Orthogonality" }, // 8
        { name: "Approximations using Differentials" }, // 11
        { name: "Rate of Change and Related Rates" }, // 40
        { name: "Increasing and Decreasing Functions" }, // 29
        { name: "Maxima, Minima, and Optimisation" }, // 42
        { name: "Rolle's Theorem and Mean Value Theorem" }, // 18
      ],
    },
    {
      slug: "indefinite-integration",
      name: "Indefinite Integration",
      // 159 q across 6 subtopics, in the /notes teaching order (subtopics.order_index).
      groupSubtopics: [
        { name: "Foundations and Standard Formulae" }, // 8
        { name: "Integration by Substitution" }, // 51
        { name: "Trigonometric Integrals - Powers and Identities" }, // 12
        { name: "Rational Functions and Partial Fractions" }, // 27
        { name: "Trigonometric Integrals - Rational and Substitution Forms" }, // 35
        { name: "Integration by Parts" }, // 26
      ],
    },
    {
      slug: "differential-equations",
      name: "Differential Equations",
      // 144 q across 6 subtopics, in the /notes teaching order (subtopics.order_index).
      groupSubtopics: [
        { name: "Order, Degree, Formation of ODE, and Verification of Solutions" }, // 33
        { name: "Variable-Separable Equations" }, // 33
        { name: "Homogeneous and Reducible Equations" }, // 16
        { name: "Linear Differential Equations (Integrating Factor)" }, // 24
        { name: "Growth, Decay, and Continuous Models" }, // 33
        { name: "Newton's Law of Cooling" }, // 5
      ],
    },
    {
      slug: "differentiation",
      name: "Differentiation",
      // 141 q across 6 subtopics, in the /notes teaching order (subtopics.order_index).
      groupSubtopics: [
        { name: "Foundations, Chain Rule & Differentiability" }, // 21
        { name: "Logarithmic Differentiation" }, // 25
        { name: "Implicit Differentiation & Special Forms" }, // 31
        { name: "Inverse Functions & Inverse Trigonometric Differentiation" }, // 39
        { name: "Parametric, Higher-Order Derivatives & Relations" }, // 18
        { name: "Derivative of One Function with Respect to Another" }, // 7
      ],
    },
    {
      slug: "probability-distribution",
      name: "Probability Distribution",
      // 115 q across 4 subtopics, in the /notes teaching order (subtopics.order_index).
      groupSubtopics: [
        { name: "Classical Probability, Addition Theorem and Odds" }, // 21
        { name: "Conditional Probability, Independence and Bayes' Theorem" }, // 26
        { name: "Discrete Random Variables, PMF and CDF" }, // 31
        { name: "Expectation, Variance and Standard Deviation" }, // 37
      ],
    },
    {
      slug: "trigonometry-i",
      name: "Trigonometry - I",
      // 99 q across 2 subtopics, in descending question count.
      groupSubtopics: [
        { name: "Trig Identities, Compound Angle, and Equations" }, // 77
        { name: "Properties of Triangle" }, // 22
      ],
    },
    {
      slug: "limits",
      name: "Limits",
      // 93 q across 2 subtopics, in descending question count.
      groupSubtopics: [
        { name: "Continuity at a Point — Finding Parameters" }, // 47
        { name: "Limit Evaluation Techniques" }, // 46
      ],
    },
    {
      slug: "trigonometry-ii",
      name: "Trigonometry - II",
      // 90 q across 3 subtopics, in descending question count.
      groupSubtopics: [
        { name: "Properties of Triangles — Sine/Cosine Rules and Projection" }, // 52
        { name: "Inverse Trigonometry — Identities, Equations, and Principal Values" }, // 21
        { name: "Trigonometric Identities and Compound/Half-Angle Formulas" }, // 17
      ],
    },
    {
      slug: "mathematical-logic",
      name: "Mathematical Logic",
      // 88 q across 3 subtopics, in descending question count.
      groupSubtopics: [
        { name: "Negation, Equivalence, Tautology, and Switch Circuits" }, // 47
        { name: "Truth Tables and Truth Values" }, // 27
        { name: "Converse, Inverse, and Contrapositive" }, // 14
      ],
    },
    {
      slug: "definite-integration",
      name: "Definite Integration",
      // 73 q across 2 subtopics, in descending question count.
      groupSubtopics: [
        { name: "Symmetry, King's Property, and Absolute Value" }, // 42
        { name: "Substitution and Standard Form" }, // 31
      ],
    },
    {
      slug: "inverse-trigonometric-functions",
      name: "Inverse Trigonometric Functions",
      // 73 q across 1 subtopic, in descending question count.
      groupSubtopics: [
        { name: "Inverse Trigonometric Functions — Identities, Equations, Principal Values, and Sums" }, // 73
      ],
    },
    {
      slug: "binomial-distribution",
      name: "Binomial Distribution",
      // 60 q across 4 subtopics, in the /notes teaching order (subtopics.order_index).
      groupSubtopics: [
        { name: "The Binomial Setting and Probability Mass Function" }, // 10
        { name: "Computing Binomial Probabilities" }, // 20
        { name: "Mean, Variance and Standard Deviation of a Binomial Variable" }, // 15
        { name: "Parameter Estimation and the Probability Ratio" }, // 15
      ],
    },
    {
      slug: "determinants-and-matrices",
      name: "Determinants and Matrices",
      // 50 q across 3 subtopics, in descending question count.
      groupSubtopics: [
        { name: "Inverse, Cayley-Hamilton, and Matrix Polynomial" }, // 27
        { name: "Adjoint, Determinant, and A·adj(A) Identity" }, // 14
        { name: "System of Linear Equations and Symmetric Matrices" }, // 9
      ],
    },
    {
      slug: "applications-of-definite-integral",
      name: "Applications of Definite Integral",
      // 47 q across 2 subtopics, in descending question count.
      groupSubtopics: [
        { name: "Area Bounded by Curves, Axes, and Lines" }, // 43
        { name: "Definite Integral as Application" }, // 4
      ],
    },
    {
      slug: "circle",
      name: "Circle",
      // 47 q across 3 subtopics, in descending question count.
      groupSubtopics: [
        { name: "Tangent, Locus, and Equation Construction" }, // 27
        { name: "Equation of Circle from Diameter, Centre, and Concentric Conditions" }, // 11
        { name: "Two Circles — Tangency, Common Tangents, and Relative Position" }, // 9
      ],
    },
    {
      slug: "complex-numbers",
      name: "Complex Numbers",
      // 46 q across 2 subtopics, in descending question count.
      groupSubtopics: [
        { name: "Algebraic Equations, Locus, and Cube Roots" }, // 24
        { name: "Modulus, Argument, and Polar Form" }, // 22
      ],
    },
    {
      slug: "linear-programming",
      name: "Linear Programming",
      // 46 q across 2 subtopics, in descending question count.
      groupSubtopics: [
        { name: "Feasible Region — Identification, Constraints, Classification" }, // 23
        { name: "Objective Function — Maximisation and Minimisation" }, // 23
      ],
    },
    {
      slug: "straight-line",
      name: "Straight Line",
      // 46 q across 2 subtopics, in descending question count.
      groupSubtopics: [
        { name: "Section Formula, Concurrency, Foot of Perpendicular, and Distance" }, // 27
        { name: "Equation of Line — Rotation, Angle, and Bisector" }, // 19
      ],
    },
    {
      slug: "pair-of-straight-lines",
      name: "Pair of Straight Lines",
      // 45 q across 2 subtopics, in descending question count.
      groupSubtopics: [
        { name: "Combined Equation and Condition for Pair of Lines" }, // 28
        { name: "Angle, Distance, and Geometry of Pair" }, // 17
      ],
    },
    {
      slug: "permutations-and-combinations",
      name: "Permutations and Combinations",
      // 43 q across 2 subtopics, in descending question count.
      groupSubtopics: [
        { name: "Selection and Arrangement with Constraints" }, // 33
        { name: "Counting and Geometric Applications" }, // 10
      ],
    },
    {
      slug: "sets-relations-and-functions",
      name: "Sets, Relations and Functions",
      // 41 q across 4 subtopics, in descending question count.
      groupSubtopics: [
        { name: "Domain and Range of Functions" }, // 17
        { name: "Composition of Functions" }, // 12
        { name: "Inverse, Composite, and Special Function Equations" }, // 9
        { name: "Sets, Inclusion-Exclusion, and Cartesian Products" }, // 3
      ],
    },
    {
      slug: "measures-of-dispersion",
      name: "Measures of Dispersion",
      // 32 q across 1 subtopic, in descending question count.
      groupSubtopics: [
        { name: "Mean, Variance, Standard Deviation, and Transformations" }, // 32
      ],
    },
    {
      slug: "conic-sections",
      name: "Conic Sections",
      // 19 q across 1 subtopic, in descending question count.
      groupSubtopics: [
        { name: "Conic Properties — Eccentricity, Orthogonality, and Intersection" }, // 19
      ],
    },
    {
      slug: "sequences-and-series",
      name: "Sequences and Series",
      // 10 q across 1 subtopic, in descending question count.
      groupSubtopics: [
        { name: "Sequences and Series — AP, HP, Logarithmic and Power Sums" }, // 10
      ],
    },
    {
      slug: "quadratic-equations",
      name: "Quadratic Equations",
      // 5 q across 1 subtopic, in descending question count.
      groupSubtopics: [
        { name: "Roots — Nature, Vieta's Relations, and Conditions" }, // 5
      ],
    },
  ],
};

export const BOOKS: BookDefinition[] = [NDA_CDS_ENGLISH, MHT_CET_MATHS];

export function getBookBySlug(slug: string): BookDefinition | null {
  return BOOKS.find((b) => b.slug === slug) ?? null;
}

export function getBookChapter(
  book: BookDefinition,
  chapterSlug: string
): BookChapter | null {
  return book.chapters.find((c) => c.slug === chapterSlug) ?? null;
}

/** The distinct exams a book draws on, in section order. */
export function bookExams(book: BookDefinition): string[] {
  return Array.from(new Set(book.sections.map((s) => s.exam)));
}
