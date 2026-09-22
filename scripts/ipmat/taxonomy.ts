/**
 * Phase 2 of the IPMAT pipeline: the source's labels -> our taxonomy.
 *
 * TWO AXES, DELIBERATELY SEPARATE.
 *
 *   SUBJECT  comes from the paper's SECTION (`SECTION_SUBJECTS`).
 *   CHAPTER + SUBTOPIC come from the source's topic/subtopic (`TAXONOMY_MAP`).
 *
 * They are independent. A question the source tags `Logical Reasoning >
 * Logical Sequence` can appear in the QA section — it does, three times — and
 * the section is where the exam actually put it, so that is what decides the
 * subject.
 *
 * WHY RE-AUTHOR AT ALL. Their topic names are afterboards' editorial work, not
 * the exam's, so they are not ours to ship. They are also dirty in ways that
 * would become permanent taxonomy rows: three spellings of Active & Passive,
 * two of Linear Equation(s), two of Direct & Indirect, singular and plural Bar
 * Graph(s), and `Tabular Data` filed under two different topics.
 *
 * HOUSE STYLE IS CDS'S. CDS is the closest analogue in the bank — an aptitude
 * exam over the same arithmetic/algebra/geometry ground — and its 26 Mathematics
 * chapters spell "and" out rather than using ampersands. NDA's older
 * "Matrices & Determinants" style is not copied into a new corpus. Several
 * chapter names are taken verbatim from CDS (`Number System`, `Time, Speed and
 * Distance`, `Ratio, Proportion and Variation`, `Percentage, Profit and Loss`,
 * `Simple and Compound Interest`, `Time and Work`, `Mensuration 3D`,
 * `Trigonometric Ratios and Identities`, `Sequence and Series`, `Data
 * Interpretation`, `Reading Comprehension`, `Vocabulary`, `Grammar`,
 * `Sentence Rearrangement`, `Spotting Errors`, `Idioms and Phrases`) so a
 * cross-exam chapter view between CDS and IPMAT actually lines up.
 *
 * NO CATCH-ALL CHAPTER. The source's `Miscellaneous` subtopics are folded into
 * the real chapter they belong to; a catch-all CHAPTER collects whatever does
 * not fit and rots, which is a standing lesson here.
 *
 * OPEN DECISION (raised 2026-09-22): switch the SUBJECT axis to the NDA/CDS
 * convention, which discards the paper structure and names subjects
 * academically — NDA Paper II GAT has no "GAT" subject, a Physics question from
 * it just sits under `Physics`. For IPMAT that means Mathematics / Logical
 * Reasoning / English instead of the section names below, which collapses 147
 * chapter rows to 114, removes the 26 duplicated Indore quant chapters, fixes
 * the section leaks (Rohtak has a 1-question "Linear Equations" under Logical
 * Reasoning today), and makes `English > Reading Comprehension` one chapter
 * shared with NDA and CDS. It reverses the "keep sections as subjects" call;
 * `question_format` + the /browse Format filter already carry SA vs MCQ.
 * CHEAPEST NOW, while everything is PRIVATE and nothing points at it — see the
 * Phase 5 checklist at the top of ROADMAP.md, step 1b.
 *
 * Spec: tests/ipmat-taxonomy.test.ts — and the test that matters is
 * completeness in BOTH directions: no source pair unmapped, and no map entry
 * that matches nothing.
 */
import type { IpmatExamSlug } from "./config";

export type TaxonomyTarget = { chapter: string; subtopic: string };

/**
 * Section -> subject, per exam.
 *
 * Indore's SA and MCQ sections carry the SAME seven quant topics — the split is
 * typed answer vs four options — so both subject names say "Quantitative
 * Ability" and the bracket records which. Without that the duplication reads as
 * a mistake instead of the paper's own structure. The cost is real and was
 * accepted: Indore's Algebra rows sit 48 under MCQ and 26 under SA.
 */
export const SECTION_SUBJECTS: Record<IpmatExamSlug, Record<string, string>> = {
  "ipmat-indore": {
    SA: "Quantitative Ability (Short Answer)",
    MCQ: "Quantitative Ability (MCQ)",
    VA: "Verbal Ability",
  },
  "ipmat-rohtak": {
    QA: "Quantitative Ability",
    LR: "Logical Reasoning",
    VA: "Verbal Ability",
  },
  jipmat: {
    QA: "Quantitative Ability",
    LR: "Logical Reasoning",
    VA: "Verbal Ability",
  },
};

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
 * Resolve a source row to our (subject, chapter, subtopic).
 *
 * Null when the section is not one this exam has, or the source pair is not
 * mapped — never a guess. A guessed subject would file a question under a
 * section the paper does not have.
 */
export function resolveTaxonomy(
  exam: IpmatExamSlug,
  section: string,
  topic: string | null,
  subtopic: string | null
): { subject: string; chapter: string; subtopic: string } | null {
  const subject = SECTION_SUBJECTS[exam]?.[section];
  if (!subject) return null;
  const target = TAXONOMY_MAP[sourceKey(topic, subtopic)];
  if (!target) return null;
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
