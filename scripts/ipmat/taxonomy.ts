/**
 * Phase 2 of the IPMAT pipeline: the source's labels -> our taxonomy.
 *
 * THE SUBJECT AXIS FOLLOWS NDA AND CDS. Both discard the paper structure and
 * name subjects academically: NDA Paper II GAT covers English plus eight GK
 * subjects, and there is no "GAT" or "Paper II" subject anywhere -- a Physics
 * question from Paper II Part B simply sits under `Physics`. CDS does the same
 * across its three papers.
 *
 * So a question's subject comes from WHAT IT IS ABOUT -- its chapter -- not from
 * which section of the paper it appeared in. Three subjects, shared by all three
 * exams: Mathematics, Logical Reasoning, English. The section is not lost; it
 * stays on the row via `source_file` (`ipmat/jipmat-2025-QA`) for the mock
 * blueprints, which is the one place it is load-bearing.
 *
 * THIS REPLACED A SECTION-NAMED AXIS on 2026-09-22, and the gain was measured:
 * 147 chapter rows became 114. It collapsed the 26 Indore quant chapters that
 * existed TWICE -- once under a "Quantitative Ability (Short Answer)" subject
 * and once under "Quantitative Ability (MCQ)" -- and it fixed the section leaks:
 * Rohtak carried a one-question "Linear Equations" chapter under Logical
 * Reasoning, and "Clocks and Calendars" under Quantitative Ability, because the
 * exam had filed a few questions in the other section.
 *
 * WHAT WAS GIVEN UP, stated plainly: SA vs MCQ is no longer a subject. It is not
 * lost -- `question_format` records those 148 typed-answer rows as `numeric` and
 * /browse's Format filter (All / MCQ / Written / Numeric) exposes them, which is
 * the right axis for a format distinction.
 *
 * WHY RE-AUTHOR THE LABELS AT ALL. The source's topic names are afterboards'
 * editorial work, not the exam's, so they are not ours to ship. They are also
 * dirty in ways that would become permanent taxonomy rows: three spellings of
 * Active & Passive, two of Linear Equation(s), two of Direct & Indirect,
 * singular and plural Bar Graph(s), and `Tabular Data` filed under two topics.
 *
 * HOUSE STYLE IS CDS'S -- the closest analogue in the bank, an aptitude exam
 * over the same ground, whose 26 Mathematics chapters spell "and" out rather
 * than using ampersands. Sixteen chapter names are taken verbatim from CDS, and
 * with `English` as the subject name `English > Reading Comprehension` is now
 * one chapter spanning NDA, CDS and all three IPMATs.
 *
 * NO CATCH-ALL CHAPTER. The source's `Miscellaneous` subtopics are folded into
 * the real chapter they belong to; a catch-all CHAPTER collects whatever does
 * not fit and rots, which is a standing lesson here.
 *
 * Spec: tests/ipmat-taxonomy.test.ts -- completeness is asserted in BOTH
 * directions in two places: every source pair maps and every map entry matches a
 * real row; every chapter has a subject and every subject owns a chapter.
 */
export type TaxonomyTarget = { chapter: string; subtopic: string };

/** The three academic subjects, in the order they are presented. */
export const IPMAT_SUBJECTS = ["Mathematics", "Logical Reasoning", "English"] as const;
export type IpmatSubject = (typeof IPMAT_SUBJECTS)[number];

/** The key a source row is looked up by. */
export function sourceKey(topic: string | null, subtopic: string | null): string {
  return `${topic ?? "?"} > ${subtopic ?? "?"}`;
}

const t = (chapter: string, subtopic: string): TaxonomyTarget => ({ chapter, subtopic });

/**
 * Every (topic > subtopic) pair the corpus contains, mapped to our names.
 *
 * Grouped by our CHAPTER so the shape of the result is readable, and so a
 * chapter that has quietly collected too much is visible in review.
 */
export const TAXONOMY_MAP: Record<string, TaxonomyTarget> = {
  // ---------------------------------------------------------------- algebra
  "Algebra > Progression & Series": t("Sequence and Series", "Arithmetic and Geometric Progressions"),
  "Algebra > Functions": t("Functions", "Domain, Range and Composition"),
  "Algebra > Polynomials": t("Polynomials", "Roots and Factorisation"),
  "Algebra > Quadratic Equations": t("Quadratic Equations", "Roots and Discriminant"),
  // Two spellings in the source; one subtopic here.
  "Algebra > Linear Equation": t("Linear Equations", "Simultaneous Equations"),
  "Algebra > Linear Equations": t("Linear Equations", "Simultaneous Equations"),
  "Algebra > Inequalities": t("Inequalities", "Solving Inequalities"),
  "Algebra > Modulus": t("Modulus", "Absolute Value Equations and Inequalities"),
  "Algebra > Indices": t("Surds and Indices", "Laws of Indices"),
  "Algebra > Identities": t("Algebraic Identities", "Standard Identities and Simplification"),
  "Algebra > Minima & Maxima": t("Maxima and Minima", "Extrema of Algebraic Expressions"),

  // ------------------------------------------------------------ modern math
  "Modern Math > Logarithms": t("Logarithms", "Laws of Logarithms"),
  "Modern Math > Permutation & Combination": t("Permutations and Combinations", "Arrangements and Selections"),
  "Modern Math > Probability": t("Probability", "Classical Probability"),
  "Modern Math > Set Theory": t("Set Theory", "Venn Diagrams and Cardinality"),
  "Modern Math > Matrices & Determinants": t("Matrices and Determinants", "Determinants and Inverses"),
  "Modern Math > Binomial Theorem": t("Binomial Theorem", "General and Middle Terms"),

  // ---------------------------------------------------------- number system
  // One chapter with many subtopics, the way CDS files its 12.
  "Number System > Remainder": t("Number System", "Remainders"),
  "Number System > Divisibility Rules": t("Number System", "Divisibility"),
  "Number System > Factorisation": t("Number System", "Factors and Multiples"),
  "Number System > Integral Solutions": t("Number System", "Integral Solutions"),
  "Number System > HCF & LCM": t("Number System", "HCF and LCM"),
  "Number System > Unit Digit": t("Number System", "Unit Digit and Cyclicity"),
  // The source's catch-all lands in a real chapter, never a catch-all chapter.
  "Number System > Miscellaneous": t("Number System", "Properties of Numbers"),

  // --------------------------------------------------------------- arithmetic
  "Arithmetic > Percentages": t("Percentage, Profit and Loss", "Percentages"),
  "Arithmetic > Profit & Loss": t("Percentage, Profit and Loss", "Profit, Loss and Discount"),
  "Arithmetic > Ratio, Proportion & Variation": t("Ratio, Proportion and Variation", "Ratio and Proportion"),
  "Arithmetic > Simple & Compound Interest": t("Simple and Compound Interest", "Simple and Compound Interest"),
  "Arithmetic > Time & Work": t("Time and Work", "Work, Rate and Efficiency"),
  "Arithmetic > Time, Speed & Distance": t("Time, Speed and Distance", "Speed, Trains and Boats"),
  "Arithmetic > Averages": t("Averages", "Averages and Weighted Averages"),
  "Arithmetic > Mean, Median & Mode": t("Statistics", "Mean, Median and Mode"),
  "Arithmetic > Mixture & Alligation": t("Mixtures and Alligation", "Mixtures and Alligation"),

  // ----------------------------------------------------------------- geometry
  "Geometry > Triangles": t("Triangles", "Similarity, Congruence and Area"),
  "Geometry > Circles": t("Circles", "Chords, Tangents and Angles"),
  "Geometry > Quadrilaterals": t("Quadrilaterals and Polygons", "Quadrilaterals"),
  "Geometry > Polygons": t("Quadrilaterals and Polygons", "Regular Polygons"),
  "Geometry > Solids": t("Mensuration 3D", "Surface Area and Volume"),
  "Geometry > Trigonometry": t("Trigonometric Ratios and Identities", "Ratios, Identities and Heights"),
  "Geometry > Straight Lines": t("Coordinate Geometry", "Straight Lines"),
  "Geometry > Conic Sections": t("Coordinate Geometry", "Conic Sections"),
  "Geometry > Coordinate Geometry": t("Coordinate Geometry", "Points, Distance and Section Formula"),

  // ------------------------------------------------------ data interpretation
  // Indore files Tabular Data under Data Interpretation; JIPMAT files the same
  // skill under Logical Reasoning. One chapter either way.
  "Data Interpretation > Tabular Data": t("Data Interpretation", "Tables"),
  "Logical Reasoning > Tabular Data": t("Data Interpretation", "Tables"),
  "Data Interpretation > Bar Graphs": t("Data Interpretation", "Bar Graphs"),
  "Data Interpretation > Bar Graph": t("Data Interpretation", "Bar Graphs"),
  "Data Interpretation > Pie Chart": t("Data Interpretation", "Pie Charts"),

  // ------------------------------------------------------- logical reasoning
  "Logical Reasoning > Arrangements": t("Arrangements and Puzzles", "Seating and Linear Arrangements"),
  "Logical Reasoning > Puzzles": t("Arrangements and Puzzles", "Grid and Matrix Puzzles"),
  "Logical Reasoning > Ranking": t("Arrangements and Puzzles", "Order and Ranking"),
  "Logical Reasoning > Coding & Decoding": t("Coding and Decoding", "Letter and Number Coding"),
  "Logical Reasoning > Blood Relations": t("Blood Relations", "Family Trees"),
  "Logical Reasoning > Directions": t("Directions and Distances", "Direction Sense"),
  // NOT "Series and Sequences": that is word-for-word confusable with the maths
  // chapter "Sequence and Series", and both landed in Rohtak's Quantitative
  // Ability subject (4 questions and 1) under names a reader cannot tell apart.
  "Logical Reasoning > Logical Sequence": t("Pattern Recognition", "Number and Letter Series"),
  "Logical Reasoning > Odd One Out": t("Pattern Recognition", "Odd One Out"),
  "Logical Reasoning > Analogy": t("Pattern Recognition", "Analogies"),
  "Logical Reasoning > Syllogism": t("Syllogisms and Venn Diagrams", "Syllogisms"),
  "Logical Reasoning > Venn Diagram": t("Syllogisms and Venn Diagrams", "Venn Diagrams"),
  "Logical Reasoning > Dices & Cubes": t("Dice and Cubes", "Dice, Cubes and Nets"),
  "Logical Reasoning > Clocks & Calendar": t("Clocks and Calendars", "Clocks and Calendars"),
  "Logical Reasoning > Inequalities": t("Coded Inequalities", "Coded Inequalities"),
  "Logical Reasoning > Input & Output": t("Input and Output", "Machine Input and Output"),
  "Logical Reasoning > Mathematical Operations": t("Mathematical Operations", "Symbol Substitution"),
  "Logical Reasoning > Tournaments": t("Games and Tournaments", "Tournament Tables"),
  "Logical Reasoning > Weights": t("Games and Tournaments", "Weighing and Balancing"),
  "Logical Reasoning > Miscellaneous": t("Arrangements and Puzzles", "Grid and Matrix Puzzles"),

  // -------------------------------------------------------- critical reasoning
  "Critical Reasoning > Statement & Conclusion": t("Critical Reasoning", "Statement and Conclusion"),
  "Critical Reasoning > Statements & Assumptions": t("Critical Reasoning", "Statement and Assumption"),
  "Critical Reasoning > Assertion & Reason": t("Critical Reasoning", "Assertion and Reason"),
  "Critical Reasoning > Weak & Strong Argument": t("Critical Reasoning", "Strong and Weak Arguments"),
  // Rohtak files three of these under Verbal Ability; same chapter.
  "Verbal Ability > Critical Reasoning": t("Critical Reasoning", "Statement and Conclusion"),

  // ------------------------------------------------------------ verbal ability
  "Verbal Ability > Reading Comprehension": t("Reading Comprehension", "Passage Comprehension"),
  "Verbal Ability > Conversation Analysis": t("Reading Comprehension", "Transcript and Dialogue"),
  "Verbal Ability > Parasummary": t("Reading Comprehension", "Paragraph Summary"),
  "Verbal Ability > Sentence Completion": t("Sentence Completion", "Fill in the Blanks"),
  "Verbal Ability > Paracompletion": t("Sentence Completion", "Paragraph Completion"),
  "Verbal Ability > Parajumbles": t("Sentence Rearrangement", "Parajumbles"),
  "Verbal Ability > Sentence Correction": t("Sentence Correction", "Correcting the Sentence"),
  "Verbal Ability > Incorrect Word": t("Spotting Errors", "Incorrect Word Usage"),
  "Verbal Ability > Vocabulary": t("Vocabulary", "Word Meaning"),
  "Verbal Ability > Spelling": t("Vocabulary", "Spelling"),
  "Verbal Ability > Verbal Analogies": t("Vocabulary", "Verbal Analogies"),
  "Verbal Ability > Idioms & Phrasal Verbs": t("Idioms and Phrases", "Idioms and Phrasal Verbs"),
  "Verbal Ability > Figures of Speech": t("Idioms and Phrases", "Figures of Speech"),
  "Verbal Ability > Grammar": t("Grammar", "Usage and Agreement"),

  // ------------------------------------------------------------------ vocabulary
  "Vocabulary > Synonym": t("Vocabulary", "Synonyms"),
  "Vocabulary > Antonym": t("Vocabulary", "Antonyms"),
  "Vocabulary > Definition": t("Vocabulary", "Word Meaning"),
  "Vocabulary > Idioms": t("Idioms and Phrases", "Idioms and Phrasal Verbs"),
  "Vocabulary > Phrases": t("Idioms and Phrases", "One-Word Substitution"),

  // --------------------------------------------------------------------- grammar
  "Grammar > Grammatical Error": t("Spotting Errors", "Grammatical Error"),
  "Grammar > Parts of Speech": t("Grammar", "Parts of Speech"),
  "Grammar > Tenses": t("Grammar", "Tenses"),
  "Grammar > Subject Verb Agreement": t("Grammar", "Subject-Verb Agreement"),
  "Grammar > Punctuations": t("Grammar", "Punctuation"),
  // Three spellings of one thing in the source.
  "Grammar > Active & Passive": t("Grammar", "Active and Passive Voice"),
  "Grammar > Active & Passive Voice": t("Grammar", "Active and Passive Voice"),
  "Grammar > Passive & Active": t("Grammar", "Active and Passive Voice"),
  // Two spellings of one thing.
  "Grammar > Direct & Indirect": t("Grammar", "Direct and Indirect Speech"),
  "Grammar > Direct & Indirect Speech": t("Grammar", "Direct and Indirect Speech"),
};

/**
 * Which subject owns each chapter.
 *
 * ONE ENTRY PER CHAPTER, deliberately, rather than a subject on every
 * `TAXONOMY_MAP` row: there are 100 source pairs but only ~53 chapters, and a
 * per-row subject would let two pairs pointing at the same chapter disagree
 * about which subject it belongs to. Asserted complete in both directions.
 *
 * Data Interpretation sits under Logical Reasoning. It is a reasoning skill,
 * and the source already agrees — JIPMAT files it under its Logical Reasoning
 * topic, and only Indore gives it a topic of its own.
 */
export const CHAPTER_SUBJECT: Record<string, IpmatSubject> = {
  // ---------------------------------------------------------- Mathematics
  "Sequence and Series": "Mathematics",
  Functions: "Mathematics",
  Polynomials: "Mathematics",
  "Quadratic Equations": "Mathematics",
  "Linear Equations": "Mathematics",
  Inequalities: "Mathematics",
  Modulus: "Mathematics",
  "Surds and Indices": "Mathematics",
  "Algebraic Identities": "Mathematics",
  "Maxima and Minima": "Mathematics",
  Logarithms: "Mathematics",
  "Permutations and Combinations": "Mathematics",
  Probability: "Mathematics",
  "Set Theory": "Mathematics",
  "Matrices and Determinants": "Mathematics",
  "Binomial Theorem": "Mathematics",
  "Number System": "Mathematics",
  "Percentage, Profit and Loss": "Mathematics",
  "Ratio, Proportion and Variation": "Mathematics",
  "Simple and Compound Interest": "Mathematics",
  "Time and Work": "Mathematics",
  "Time, Speed and Distance": "Mathematics",
  Averages: "Mathematics",
  Statistics: "Mathematics",
  "Mixtures and Alligation": "Mathematics",
  Triangles: "Mathematics",
  Circles: "Mathematics",
  "Quadrilaterals and Polygons": "Mathematics",
  "Mensuration 3D": "Mathematics",
  "Trigonometric Ratios and Identities": "Mathematics",
  "Coordinate Geometry": "Mathematics",

  // ----------------------------------------------------- Logical Reasoning
  "Data Interpretation": "Logical Reasoning",
  "Arrangements and Puzzles": "Logical Reasoning",
  "Coding and Decoding": "Logical Reasoning",
  "Blood Relations": "Logical Reasoning",
  "Directions and Distances": "Logical Reasoning",
  "Pattern Recognition": "Logical Reasoning",
  "Syllogisms and Venn Diagrams": "Logical Reasoning",
  "Dice and Cubes": "Logical Reasoning",
  "Clocks and Calendars": "Logical Reasoning",
  "Coded Inequalities": "Logical Reasoning",
  "Input and Output": "Logical Reasoning",
  "Mathematical Operations": "Logical Reasoning",
  "Games and Tournaments": "Logical Reasoning",
  "Critical Reasoning": "Logical Reasoning",

  // ---------------------------------------------------------------- English
  "Reading Comprehension": "English",
  "Sentence Completion": "English",
  "Sentence Rearrangement": "English",
  "Sentence Correction": "English",
  "Spotting Errors": "English",
  Vocabulary: "English",
  "Idioms and Phrases": "English",
  Grammar: "English",
};

/** The subject owning a chapter, or null when the chapter is unknown. */
export function subjectOf(chapter: string): IpmatSubject | null {
  return CHAPTER_SUBJECT[chapter] ?? null;
}

/**
 * Resolve a source row to our (subject, chapter, subtopic).
 *
 * Takes no exam and no section: the subject follows the CHAPTER now, so the
 * same source pair resolves identically everywhere. That is the point of the
 * NDA/CDS convention — `Logical Reasoning > Logical Sequence` appears in the QA
 * section three times, and under the old axis those three landed in a different
 * subject from their 27 siblings.
 *
 * Null when the pair is unmapped or its chapter has no subject — never a guess.
 */
export function resolveTaxonomy(
  topic: string | null,
  subtopic: string | null
): { subject: IpmatSubject; chapter: string; subtopic: string } | null {
  const target = TAXONOMY_MAP[sourceKey(topic, subtopic)];
  if (!target) return null;
  const subject = subjectOf(target.chapter);
  if (!subject) return null;
  return { subject, chapter: target.chapter, subtopic: target.subtopic };
}

/** Distinct chapter names the map produces, sorted. */
export function mappedChapters(): string[] {
  return [...new Set(Object.values(TAXONOMY_MAP).map((x) => x.chapter))].sort();
}

/** Distinct (chapter, subtopic) pairs the map produces, sorted. */
export function mappedSubtopics(): { chapter: string; subtopic: string }[] {
  const seen = new Map<string, { chapter: string; subtopic: string }>();
  for (const v of Object.values(TAXONOMY_MAP)) {
    seen.set(`${v.chapter}||${v.subtopic}`, { chapter: v.chapter, subtopic: v.subtopic });
  }
  return [...seen.values()].sort(
    (a, b) => a.chapter.localeCompare(b.chapter) || a.subtopic.localeCompare(b.subtopic)
  );
}
