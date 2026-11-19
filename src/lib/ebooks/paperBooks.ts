/**
 * The Solved Papers books (2026-10-26), one per board subject with stored
 * papers. Kept apart from lib/ebooks/catalog, which loads the whole notes
 * library, so the store page can name a book's shelf and subject without it;
 * the catalog re-exports these. Pinned by tests/ebook-catalog.test.ts.
 */
import { slugify } from "@/lib/slug";
import type { BookPaperRule } from "./boardPapers";

/**
 * A Solved Papers book: stored board papers (migration 0146), each as it was
 * set and then solved. Its chapters are PAPERS, read from the database at
 * build time (lib/ebooks/boardPapers picks them), so it has no fixed chapter
 * list; its sample is the newest paper.
 */
export type PapersEbook = {
  kind: "papers";
  slug: string;
  /** Printed on the cover: "Maharashtra HSC Class 12 Physics". */
  title: string;
  subtitle: string;
  /** EXAM_REGISTRY slug. */
  examSlug: string;
  /** subjects.name, exactly as stored. */
  subject: string;
  rule: BookPaperRule;
  /** The cover's two lines: "Maharashtra HSC Class 12" over "Physics". */
  board: string;
  subjectTitle: string;
};

/** Every board subject with stored papers, and how many of its papers a book carries. */
const BOARD_PAPER_SUBJECTS: { examSlug: string; board: string; subject: string; title?: string; rule: BookPaperRule }[] = [
  ...["Physics", "Chemistry", "Mathematics", "Biology", "Geography"].map((subject) => ({
    examSlug: "mh-hsc-12",
    board: "Maharashtra HSC Class 12",
    subject,
    rule: "every" as const,
  })),
  ...["Algebra", "Geometry", "Science and Technology I", "Science and Technology II", "History", "Geography"].map((subject) => ({
    examSlug: "mh-ssc-10",
    board: "Maharashtra SSC Class 10",
    subject,
    // The SSC History paper carries Political Science as its second part.
    title: subject === "History" ? "History and Political Science" : undefined,
    rule: "every" as const,
  })),
  ...["Mathematics", "Science"].map((subject) => ({ examSlug: "cbse-10", board: "CBSE Class 10", subject, rule: "first-set-per-year" as const })),
  ...["Physics", "Chemistry", "Mathematics", "Biology"].map((subject) => ({
    examSlug: "cbse-12",
    board: "CBSE Class 12",
    subject,
    rule: "first-set-per-year" as const,
  })),
];

const slugPart = slugify;

/**
 * A Repeated PYQs book (2026-10-26): from a subject's homework plan, every
 * question the board asked again and every type it keeps asking, chapter by
 * chapter (lib/ebooks/repeats). One per subject with a plan; the plan is found
 * by exam + subject at build time.
 */
export type RepeatsEbook = Omit<PapersEbook, "kind" | "rule"> & {
  kind: "repeats";
  /**
   * Who set the papers, for the book's wording: "board" (the board books) or
   * "exam" (JEE Mains, MHT-CET, SSC CGL, 2026-11-16), whose books never say "board".
   */
  examiner: "board" | "exam";
  /** Several subjects' plans read in turn into one book (lib/ebooks/repeats repeatChaptersOfSubjects). */
  planSubjects?: readonly string[];
  /** A pinned chapter order per subject (subjects.name), where chapters.order_index is not a full order. */
  chapterOrder?: Readonly<Record<string, readonly string[]>>;
};

/** Every board subject with a homework plan (CBSE 12 Biology since 2026-11-16, once its plan existed). */
const PLAN_SUBJECTS: { examSlug: string; board: string; subjects: string[] }[] = [
  { examSlug: "mh-hsc-12", board: "Maharashtra HSC Class 12", subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "Geography"] },
  {
    examSlug: "mh-ssc-10",
    board: "Maharashtra SSC Class 10",
    subjects: ["Algebra", "Geometry", "Science and Technology I", "Science and Technology II", "History", "Political Science", "Geography"],
  },
  { examSlug: "cbse-12", board: "CBSE Class 12", subjects: ["Physics", "Chemistry", "Mathematics"] },
  { examSlug: "cbse-10", board: "CBSE Class 10", subjects: ["Mathematics", "Science"] },
];

/** Chapter-wise PYQs read every board subject above; Repeated PYQs add the ones whose plan came later. */
const REPEATS_BOARD_SUBJECTS = PLAN_SUBJECTS.map((b) =>
  b.examSlug === "cbse-12" ? { ...b, subjects: [...b.subjects, "Biology"] } : b
);

const BOARD_REPEATS: RepeatsEbook[] = REPEATS_BOARD_SUBJECTS.flatMap((b) =>
  b.subjects.map((subject) => ({
    kind: "repeats" as const,
    examiner: "board" as const,
    slug: `${b.examSlug}-${slugPart(subject)}-repeated-pyqs`,
    examSlug: b.examSlug,
    subject,
    board: b.board,
    subjectTitle: subject,
    title: `${b.board} ${subject}`,
    subtitle: "Every question the board asked again, and every type it keeps asking, chapter by chapter, with a worked solution to each.",
  }))
);

/*
 * Pinned chapter orders (2026-11-16), by chapters.name exactly as stored: the
 * JEE Main syllabus order, MHT-CET's Balbharati book order, and for SSC the
 * order a student learns the topics.
 * A chapter these lists do not name stops the build (pinChapterOrder). The
 * SSC general-studies names carry the database's dash, written as — so
 * this file holds no dash of its own.
 */
const D = "—";
const JEE_ORDER: Record<string, readonly string[]> = {
  Maths: [
    "Relations and Functions", "Complex Numbers", "Quadratic Equations", "Matrices", "Determinants",
    "Permutations and Combinations", "Binomial Theorem", "Sequences and Series", "Limits and Continuity", "Differentiation",
    "Application of Derivatives", "Indefinite Integration", "Definite Integration", "Application of Integrals",
    "Differential Equations", "Straight Lines", "Conic Sections", "Three Dimensional Geometry", "Vector Algebra",
    "Statistics", "Probability", "Trigonometric Identities", "Trigonometric Equations", "Inverse Trigonometric Functions",
    "Properties of Triangle", "Height & Distance", "Mathematical Reasoning",
  ],
  Physics: [
    "Units and Measurements", "Motion in a Straight Line", "Motion in a Plane", "Laws of Motion", "Work, Energy and Power",
    "System of Particles and Rotational Motion", "Gravitation", "Mechanical Properties of Solids",
    "Mechanical Properties of Fluids", "Thermal Properties of Matter", "Thermodynamics", "Kinetic Theory", "Oscillations",
    "Waves", "Electrostatics", "Current Electricity", "Moving Charges and Magnetism", "Magnetism and Matter",
    "Electromagnetic Induction", "Alternating Current", "Electromagnetic Waves", "Ray Optics", "Wave Optics",
    "Dual Nature of Radiation and Matter", "Atoms", "Nuclei", "Semiconductor Electronics", "Communication Systems",
  ],
  Chemistry: [
    "Some Basic Concepts of Chemistry", "Structure of Atom", "Classification of Elements and Periodicity",
    "Chemical Bonding and Molecular Structure", "Chemical Thermodynamics", "Equilibrium", "Hydrogen",
    "The s-Block Elements", "The p-Block Elements", "Organic Chemistry - Some Basic Principles and Techniques",
    "Organic Reaction Mechanisms", "Hydrocarbons", "Environmental Chemistry", "Solid State", "Solutions",
    "Electrochemistry", "Chemical Kinetics", "Surface Chemistry", "General Principles and Processes of Isolation of Elements",
    "The d- and f-Block Elements", "Coordination Compounds", "Haloalkanes and Haloarenes", "Alcohols, Phenols and Ethers",
    "Aldehydes, Ketones and Carboxylic Acids", "Amines", "Biomolecules", "Polymers", "Chemistry in Everyday Life",
  ],
};
/**
 * MHT-CET: the Balbharati books, Class XI then XII (lib/notes/bookOrder has
 * each notes chapter's position). chapters.order_index here is the order the
 * chapters were written in, not the book's. Maths is the CET PYQ book's own
 * order (tests/ebook-catalog.test.ts holds the two together).
 */
const CET_ORDER: Record<string, readonly string[]> = {
  Maths: [
    "Trigonometry - II", "Determinants and Matrices", "Straight Line", "Circle", "Conic Sections",
    "Measures of Dispersion", "Complex Numbers", "Quadratic Equations", "Sequences and Series",
    "Permutations and Combinations", "Sets, Relations and Functions", "Limits",
    "Mathematical Logic", "Trigonometric Functions", "Pair of Straight Lines", "Vectors", "Line and Plane",
    "Linear Programming", "Differentiation", "Applications of Derivative", "Indefinite Integration",
    "Definite Integration", "Applications of Definite Integral", "Differential Equations", "Probability Distribution",
    "Binomial Distribution",
  ],
  Physics: [
    "Units and Measurement", "Motion in a Plane", "Laws of Motion", "Gravitation", "Mechanical Properties of Solids",
    "Thermal Properties of Matter", "Sound", "Optics (Ray)",
    "Rotational Dynamics", "Mechanical Properties of Fluids", "Kinetic Theory of Gases", "Thermodynamics",
    "Oscillations", "Superposition of Waves", "Wave Optics", "Electrostatics", "Current Electricity",
    "Magnetic Fields Due to Electric Current", "Magnetic Materials", "Electromagnetic Induction", "AC Circuits",
    "Dual Nature of Radiation and Matter", "Structure of Atoms and Nuclei", "Semiconductor Devices",
  ],
  Chemistry: [
    "Some Basic Concepts of Chemistry", "Structure of Atom", "Chemical Bonding and Molecular Structure",
    "Redox Reactions", "Modern Periodic Table", "Elements of Group 1 and 2", "Elements of Group 13, 14 and 15",
    "States of Matter", "Surface Chemistry", "Basic Principles of Organic Chemistry", "Alkanes", "Alkenes", "Alkynes",
    "Aromatic Compounds",
    "Solid State", "Solutions and Colligative Properties", "Ionic Equilibria", "Chemical Thermodynamics and Energetics",
    "Electrochemistry", "Chemical Kinetics", "Elements of Group 16, 17 and 18",
    "Transition and Inner Transition Elements", "Coordination Compounds", "Halogen Derivatives of Alkanes",
    "Alcohols, Phenols and Ethers", "Aldehydes, Ketones and Carboxylic Acids", "Amines", "Biomolecules",
    "Introduction to Polymer Chemistry", "Green Chemistry and Nanochemistry",
  ],
};
const SSC_ORDER: Record<string, readonly string[]> = {
  "Quantitative Aptitude": [
    "Number System", "Surds, Indices and Simplification", "Algebraic Identities and Simplification", "Polynomials",
    "Linear Equations", "Quadratic Equations", "Inequalities", "Sequence and Series", "Sets",
    "Ratio, Proportion and Variation", "Percentage, Profit and Loss", "Simple and Compound Interest", "Averages",
    "Time and Work", "Time, Speed and Distance", "Lines, Angles and Polygons", "Triangles", "Quadrilaterals", "Circles",
    "Coordinate Geometry", "Mensuration 2D", "Mensuration 3D", "Trigonometric Ratios and Identities",
    "Heights and Distances", "Statistics", "Data Interpretation",
  ],
  Reasoning: [
    "Analogy", "Classification", "Series", "Missing Number", "Coding-Decoding", "Alphabet and Number Tests",
    "Mathematical Operations", "Arithmetic Reasoning", "Blood Relations", "Order, Ranking and Arrangement",
    "Calendar and Clock", "Inequalities", "Syllogism", "Statement-Based Reasoning", "Venn Diagrams", "Dice and Cubes",
    "Figure Counting", "Mirror and Water Images", "Paper Folding and Cutting", "Embedded Figures and Pattern Completion",
    "Non-Verbal Series and Analogy",
  ],
  English: [
    "Vocabulary", "Idioms and Phrases", "Grammar", "Spotting Errors", "Fill in the Blanks", "Sentence Rearrangement",
    "Cloze Test", "Reading Comprehension",
  ],
  History: ["Ancient India", "Medieval India", "Modern India", "World History"],
  Geography: [
    "Earth in Space, Maps and Coordinates", "Earth's Structure, Landforms and Geological Time",
    "Climatology, Atmosphere and Weather", "Oceanography", "World and Human Geography",
    `Indian Geography ${D} Physical Features`, `Indian Geography ${D} Economy, Resources and Transport`,
  ],
  Polity: [
    `Indian Constitution ${D} Making, Foundation and Amendments`, "Fundamental Rights, DPSP and Local Governance",
    `Government Structure ${D} Parliament, Judiciary and Constitutional Bodies`,
    "World Polity, Democracy and International Relations",
  ],
  Economics: [
    `Microeconomics ${D} Demand, Supply and Market Structure`, "National Income, Growth and Development Indicators",
    "Money, Banking and Public Finance", "Indian Economy",
  ],
  Physics: [
    "Units, Measurement and Dimensions", "Kinematics and Motion", "Laws of Motion and Forces", "Gravitation",
    "Fluid Mechanics and Properties of Matter", "Heat and Thermodynamics", "Sound", "Light and Optics",
    "Electricity and Magnetism", "Modern Physics", "Electronics and Computer Fundamentals", "Energy Sources",
    "Astronomy and Space",
  ],
  Chemistry: [
    "Matter and Its States", "Atomic Structure and Periodic Classification", "Chemical Bonding",
    "Mole Concept and Stoichiometry", "Chemical Reactions", "Acids, Bases and Salts", "Metals and Non-Metals",
    "Carbon and Its Compounds", "Chemistry in Everyday Life", "Industrial and Applied Chemistry",
  ],
  Biology: [
    "Cell Biology", "Biochemistry", "Biodiversity and Classification", "Plant Biology", "Human Physiology",
    "Reproduction", "Genetics and Evolution", "Microbiology and Disease", "Ecology and Environment",
  ],
  // The settled facts moved out of Current Affairs on 2026-11-19 (scripts/ssc-cgl/static-gk), in taxonomy order.
  "Static GK": [
    "Art and Culture", "Festivals, Fairs and Important Days", "Books and Authors", "Awards and Honours",
    "Sports and Games", "Firsts, Symbols and Institutions", "Science, Space and Environment Facts",
  ],
};

/**
 * Competitive exams' Repeated PYQs (2026-11-16), from the same homework plans.
 * `subject` is subjects.name ("Maths"); `subjectTitle` what the store and the
 * cover print ("Mathematics", the CET books' own word). The SSC general
 * subjects are one book, each too thin alone (8 to 67 repeats).
 */
const EXAM_REPEATS: RepeatsEbook[] = [
  ...(["Maths", "Physics", "Chemistry"] as const).flatMap((subject) => {
    const subjectTitle = subject === "Maths" ? "Mathematics" : subject;
    return [
      { examSlug: "jee-mains", board: "JEE Mains", subject, subjectTitle, chapterOrder: { [subject]: JEE_ORDER[subject] } },
      { examSlug: "mht-cet", board: "MHT-CET", subject, subjectTitle, chapterOrder: { [subject]: CET_ORDER[subject] } },
    ];
  }),
  ...(["Quantitative Aptitude", "Reasoning", "English"] as const).map((subject) => ({
    examSlug: "ssc-cgl",
    board: "SSC CGL",
    subject,
    subjectTitle: subject,
    chapterOrder: { [subject]: SSC_ORDER[subject] },
  })),
  {
    examSlug: "ssc-cgl",
    board: "SSC CGL",
    subject: "General Awareness",
    subjectTitle: "General Awareness",
    planSubjects: ["History", "Geography", "Polity", "Economics", "Physics", "Chemistry", "Biology", "Static GK"],
    chapterOrder: SSC_ORDER,
  },
].map((b) => ({
  kind: "repeats" as const,
  examiner: "exam" as const,
  slug: `${b.examSlug}-${slugPart(b.subject)}-repeated-pyqs`,
  ...b,
  title: `${b.board} ${b.subjectTitle}`,
  subtitle: `Every question ${b.board} asked again, and every type it keeps asking, ${"planSubjects" in b ? "subject by subject" : "chapter by chapter"}, with a worked solution to each.`,
}));

export const REPEATS_EBOOKS: readonly RepeatsEbook[] = [...BOARD_REPEATS, ...EXAM_REPEATS];

/**
 * A Chapter-wise PYQs book (2026-10-27): every board question, chapter by
 * chapter, grouped by marks (lib/ebooks/chapterwise). CBSE reads the same one
 * paper a year as its Solved Papers book (owner); Maharashtra reads every PYQ
 * from its homework plan, repeats printed once with their "Asked N times" line.
 */
export type ChapterwiseEbook = Omit<PapersEbook, "kind" | "rule"> & { kind: "chapterwise"; source: "papers" | "plan" };

export const CHAPTERWISE_EBOOKS: readonly ChapterwiseEbook[] = [
  ...PLAN_SUBJECTS.filter((b) => !b.examSlug.startsWith("cbse")).flatMap((b) =>
    b.subjects.map((subject) => ({ examSlug: b.examSlug, board: b.board, subject, source: "plan" as const }))
  ),
  ...["Mathematics", "Science"].map((subject) => ({ examSlug: "cbse-10", board: "CBSE Class 10", subject, source: "papers" as const })),
  ...["Physics", "Chemistry", "Mathematics", "Biology"].map((subject) => ({
    examSlug: "cbse-12",
    board: "CBSE Class 12",
    subject,
    source: "papers" as const,
  })),
].map((b) => ({
  kind: "chapterwise" as const,
  slug: `${b.examSlug}-${slugPart(b.subject)}-chapterwise-pyqs`,
  examSlug: b.examSlug,
  subject: b.subject,
  source: b.source,
  board: b.board,
  subjectTitle: b.subject,
  title: `${b.board} ${b.subject}`,
  subtitle:
    b.source === "plan"
      ? "Every board question, chapter by chapter, grouped by marks, with a worked solution to each."
      : "One board paper from each year, regrouped chapter by chapter and by marks, with a worked solution to each.",
}));

/**
 * A Textbook Solutions book (2026-10-27): one textbook's exercises in the
 * book's own order (the /board reader's section -> block -> question), each
 * question under the book's number with its solution right after it. One per
 * board subject with textbook questions on /board. `part` names one volume of
 * a textbook printed in two parts, by its first and last chapter.
 */
export type TextbookEbook = Omit<PapersEbook, "kind" | "rule"> & {
  kind: "textbook";
  part?: { label: string; first: string; last: string };
};

const TEXTBOOK_SUBJECTS: { examSlug: string; board: string; subjects: string[] }[] = [
  { examSlug: "mh-hsc-12", board: "Maharashtra HSC Class 12", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Geography"] },
  { examSlug: "mh-sb-11", board: "Maharashtra Class 11", subjects: ["Mathematics", "Physics", "Chemistry", "Biology"] },
  {
    examSlug: "mh-ssc-10",
    board: "Maharashtra SSC Class 10",
    subjects: ["Algebra", "Geometry", "Science and Technology I", "Science and Technology II", "History", "Political Science", "Geography"],
  },
  { examSlug: "mh-sb-9", board: "Maharashtra Class 9", subjects: ["Mathematics", "Geography", "History", "Political Science"] },
  { examSlug: "cbse-12", board: "CBSE Class 12", subjects: ["Mathematics", "Physics", "Chemistry", "Biology"] },
  { examSlug: "cbse-11", board: "CBSE Class 11", subjects: ["Mathematics", "Physics", "Chemistry", "Biology"] },
  { examSlug: "cbse-10", board: "CBSE Class 10", subjects: ["Mathematics", "Science", "Social Science"] },
];

/**
 * Textbooks split into two volumes (2026-10-27): a book over about 500 pages
 * is cut at the textbook's own Part I / Part II, which Balbharati prints as two
 * books. Measured: MH Class 11 Maths ran 835 pages whole; HSC 12 Maths is the
 * biggest textbook here (about 2,500 questions). By chapter name, first and last.
 */
const PARTS: Record<string, { label: string; first: string; last: string }[]> = {
  "mh-hsc-12:Mathematics": [
    { label: "Part I", first: "Mathematical Logic", last: "Linear Programming" },
    { label: "Part II", first: "Differentiation", last: "Binomial Distribution" },
  ],
  "mh-sb-11:Mathematics": [
    { label: "Part I", first: "Angle and its Measurement", last: "Probability" },
    { label: "Part II", first: "Complex Numbers", last: "Differentiation" },
  ],
};

export const TEXTBOOK_EBOOKS: readonly TextbookEbook[] = TEXTBOOK_SUBJECTS.flatMap((b) =>
  b.subjects.flatMap((subject) => {
    const base = {
      kind: "textbook" as const,
      examSlug: b.examSlug,
      subject,
      board: b.board,
      subjectTitle: subject,
      subtitle: "Every textbook exercise in the book's own order, with a worked solution right under each question.",
    };
    const parts = PARTS[`${b.examSlug}:${subject}`];
    if (!parts) return [{ ...base, slug: `${b.examSlug}-${slugPart(subject)}-textbook-solutions`, title: `${b.board} ${subject}` }];
    return parts.map((part, i) => ({
      ...base,
      part,
      subjectTitle: `${subject} ${part.label}`,
      slug: `${b.examSlug}-${slugPart(subject)}-part-${i + 1}-textbook-solutions`,
      title: `${b.board} ${subject} ${part.label}`,
    }));
  })
);

export const PAPERS_EBOOKS: readonly PapersEbook[] = BOARD_PAPER_SUBJECTS.map((b) => ({
  kind: "papers",
  slug: `${b.examSlug}-${slugPart(b.subject)}-solved-papers`,
  examSlug: b.examSlug,
  subject: b.subject,
  rule: b.rule,
  board: b.board,
  subjectTitle: b.title ?? b.subject,
  title: `${b.board} ${b.title ?? b.subject}`,
  subtitle:
    b.rule === "every"
      ? "Every board paper, as it was set, with a worked solution to every question."
      : "One board paper from each year, as it was set, with a worked solution to every question.",
}));
