// Configuration of the SPI lane: the Services Preparatory Institute (Chhatrapati
// Sambhajinagar) entrance examination, sat in Class 10 by students aiming at NDA. GSPI,
// the girls' institute, sits a paper of the same shape, so one exam row covers both.
//
// A paper is two parts printed in one booklet: Part 1 Mathematical Ability, Part 2
// General Ability (English, science, social studies, defence GK, reasoning). Source
// folder: C:\Vilas\LWS_Pune\Online Courses\SPI\QustionPaper (README.md).
import { join } from "node:path";

export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f"; // LWS Pune (tenant #1)
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
export const EXAM_NAME = "SPI"; // must match the `exams` row and EXAM_REGISTRY's examName
export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\Online Courses\\SPI\\QustionPaper";
export const OUT = join(__dirname, "out"); // gitignored: page images, packets, verify drafts
export const TRANSCRIPTS = join(__dirname, "transcripts"); // committed: the source of record
export const FIGURES = join(__dirname, "figures"); // committed: figures/<paperId>/qNNN[-X].png, the booklet's own pictures

/**
 * A part of the paper. `defaultSubject` applies when a block has no `subject:` line; a part
 * without one requires the line on every block, so a forgotten line fails the check rather
 * than filing the question somewhere plausible.
 */
export type PartSpec = { from: number; to: number; title: string; subjects: readonly string[]; defaultSubject?: string };

export type Paper = {
  id: string;
  pdf: string; // relative to SOURCE_ROOT
  /** questions.source_file: one per paper, so a paper rolls back with one DELETE. */
  sourceFile: string;
  kind: "pyq" | "practice";
  pyqYear: number | null;
  pyqNote: string | null;
  /**
   * "key": the source prints a key, and the transcript's answers were checked against it.
   * "derived": no key exists; the answers are our two blind passes, adjudicated. A derived
   * paper's solutions say so (DERIVED_DISCLOSURE) and commit.ts stamps derived_model.
   */
  answerSource: "key" | "derived";
  /** Printed page numbers that hold questions (cover and rough-work pages left out). */
  pages: number[];
  parts: PartSpec[];
};

export const MATHS_PART_SUBJECTS = ["Mathematics", "Reasoning"] as const;
export const GA_PART_SUBJECTS = [
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "Geography",
  "History",
  "Polity",
  "Economics",
  "General Knowledge",
  "Reasoning",
] as const;

export const SUBJECTS: string[] = [...new Set<string>([...MATHS_PART_SUBJECTS, ...GA_PART_SUBJECTS])];

/**
 * Chapters a row may be filed under. Maths and Reasoning take SSC CGL's names (the same
 * school-level arithmetic, algebra and geometry), the General Ability subjects take NDA
 * GAT's, so a student moving between exams meets the same chapter names. The two
 * Maharashtra chapters exist because the paper asks about the state by name.
 * Subtopics are authored per row and settled in review, not fixed here.
 */
export const CATALOG: Record<string, string[]> = {
  Mathematics: [
    "Number System",
    "Surds, Indices and Simplification",
    "Algebraic Identities and Simplification",
    "Polynomials",
    "Linear Equations",
    "Quadratic Equations",
    "Sequence and Series",
    "Ratio, Proportion and Variation",
    "Percentage, Profit and Loss",
    "Simple and Compound Interest",
    "Averages",
    "Time and Work",
    "Time, Speed and Distance",
    "Lines, Angles and Polygons",
    "Triangles",
    "Quadrilaterals",
    "Circles",
    "Mensuration 2D",
    "Mensuration 3D",
    "Coordinate Geometry",
    "Trigonometric Ratios and Identities",
    "Heights and Distances",
    "Statistics",
    "Probability",
    "Sets",
    "Data Interpretation",
  ],
  Reasoning: [
    "Alphabet and Number Tests",
    "Analogy",
    "Arithmetic Reasoning",
    "Blood Relations",
    "Calendar and Clock",
    "Classification",
    "Coding-Decoding",
    "Dice and Cubes",
    "Direction Sense",
    "Embedded Figures and Pattern Completion",
    "Figure Counting",
    "Mathematical Operations",
    "Mirror and Water Images",
    "Missing Number",
    "Order, Ranking and Arrangement",
    "Paper Folding and Cutting",
    "Series",
    "Statement-Based Reasoning",
    "Syllogism",
    "Venn Diagrams",
  ],
  English: [
    "Cloze Test",
    "Fill in the Blanks",
    "Grammar",
    "Idioms and Phrases",
    "Reading Comprehension",
    "Sentence Rearrangement",
    "Spotting Errors",
    "Vocabulary",
  ],
  Physics: [
    "Units, Measurement and Dimensions",
    "Kinematics and Motion",
    "Laws of Motion and Forces",
    "Work, Energy and Power",
    "Gravitation",
    "Fluid Mechanics and Properties of Matter",
    "Heat and Thermodynamics",
    "Oscillations and Waves",
    "Sound",
    "Light and Optics",
    "Electricity and Magnetism",
    "Modern Physics",
    "Energy Sources",
    "Astronomy and Space",
  ],
  Chemistry: [
    "Matter and Its States",
    "Atomic Structure and Periodic Classification",
    "Chemical Bonding",
    "Chemical Reactions",
    "Acids, Bases and Salts",
    "Metals and Non-Metals",
    "Carbon and Its Compounds",
    "Mole Concept and Stoichiometry",
    "Hydrogen and Water",
    "Industrial and Applied Chemistry",
    "Chemistry in Everyday Life",
  ],
  Biology: [
    "Cell Biology",
    "Biodiversity and Classification",
    "Plant Biology",
    "Human Physiology",
    "Reproduction",
    "Genetics and Evolution",
    "Microbiology and Disease",
    "Ecology and Environment",
    "Biochemistry",
  ],
  Geography: [
    "Earth in Space, Maps and Coordinates",
    "Earth's Structure, Landforms and Geological Time",
    "Climatology, Atmosphere and Weather",
    "Oceanography",
    "Indian Geography — Physical Features",
    "Indian Geography — Economy, Resources and Transport",
    "Maharashtra Geography",
    "World and Human Geography",
  ],
  History: ["Ancient India", "Medieval India", "Modern India", "History of Maharashtra", "World History"],
  Polity: [
    "Indian Constitution — Making, Foundation and Amendments",
    "Fundamental Rights, DPSP and Local Governance",
    "Government Structure — Parliament, Judiciary and Constitutional Bodies",
    "World Polity, Democracy and International Relations",
  ],
  Economics: ["Indian Economy"],
  "General Knowledge": [
    "Defence and Armed Forces",
    "Awards, Honours, Books and Culture",
    "Sports",
    "National Events, Persons and India General Knowledge",
    "International Affairs and Relations",
    "Science and Technology",
    "Government Schemes, Policy and Governance",
    "Environment, Ecology and Energy",
  ],
};

const TWO_PARTS: PartSpec[] = [
  { from: 1, to: 75, title: "Part 1: Mathematical Ability", subjects: MATHS_PART_SUBJECTS, defaultSubject: "Mathematics" },
  { from: 76, to: 150, title: "Part 2: General Ability Test", subjects: GA_PART_SUBJECTS },
];

export const PAPERS: Paper[] = [
  {
    id: "2022",
    pdf: "03. QP_3\\SPI_Exam_QP.pdf",
    sourceFile: "SPI Entrance Examination 2022",
    kind: "pyq",
    pyqYear: 2022,
    pyqNote: "SPI Entrance Examination 2022",
    answerSource: "derived",
    pages: [2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16],
    parts: TWO_PARTS,
  },
];

/** The last line of every solution on a derived-key paper: students see how the answer was reached. */
export const DERIVED_DISCLOSURE =
  "*No official answer key is published for this paper. This answer was worked out independently twice and checked against the printed question.*";
export const DERIVED_MODEL = "claude-opus-5-5 · two blind passes (SPI publishes no answer key)";

export function requirePaper(id: string | undefined): Paper {
  const p = PAPERS.find((x) => x.id === id);
  if (!p) throw new Error(`unknown paper "${id ?? ""}"; known: ${PAPERS.map((x) => x.id).join(", ")}`);
  return p;
}

export function partOf(paper: Paper, n: number): PartSpec | undefined {
  return paper.parts.find((p) => n >= p.from && n <= p.to);
}

export const paperPdf = (paper: Paper): string => join(SOURCE_ROOT, paper.pdf);
