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
};

export const questionsJsonPath = (topicId: string) => join(DATA, `${topicId}.questions.json`);
export const solutionsJsonPath = (topicId: string) => join(DATA, `${topicId}.solutions.json`);

export function requireTopic(id: string | undefined): Topic {
  if (!id || !TOPICS[id]) {
    throw new Error(`unknown topic "${id}". Known: ${Object.keys(TOPICS).join(", ")}`);
  }
  return TOPICS[id];
}
