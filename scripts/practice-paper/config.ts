/**
 * Registry + shared helpers for ingesting a teacher-authored LWS test paper
 * (an existing printed PDF) into the system. One paper = one `PAPERS` entry +
 * one `data/<slug>.records.json` transcription. Three CLIs read this:
 *
 *   build-tags.ts <slug>          -> the nda-tracker tagged-enrichment XLSX (ALL questions, OMR Q-order)
 *   commit-paper.ts <slug> --apply -> commit rows as PRIVATE practice + create the /dashboard/papers paper
 *   flip-public.ts  <slug> --apply -> flip ONLY status:"new" rows to PUBLIC (the dedup gate)
 *
 * The whole printed test goes into the paper + the Excel (OMR parity); only the
 * NON-duplicate, non-flawed questions (status:"new") ever become PUBLIC practice,
 * so the browsable bank stays deduped while the paper stays a faithful full test.
 *
 * Records are vision-transcribed by hand (the irreducible core). This module only
 * carries the per-paper config + the pure record->row adapters used by every CLI,
 * so the three scripts share ONE code path. See .claude/commands/lws-test-ingest.md.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { contentHash } from "../../src/lib/upload/hash";
import type { ParsedRowPayload, OptionLabel, Difficulty } from "../../src/lib/upload/validate";
import type { QuestionRow, OptionRow } from "../../src/lib/questions/query";

// LWS Pune org + admin (same identities as the practice pipeline) — default NDA exam.
// Imported locally (so examIdOf can reference EXAM_ID) AND re-exported for the CLIs.
import { ORG_ID, EXAM_ID, CREATED_BY } from "../practice/config";
export { ORG_ID, EXAM_ID, CREATED_BY };

export const DATA = join(__dirname, "data"); // committed transcriptions (source of truth)
const LABELS: OptionLabel[] = ["A", "B", "C", "D"];
const DIFFICULTIES = new Set<Difficulty>(["EASY", "MODERATE", "HARD"]);

/** One transcribed MCQ from the printed paper, in PRINTED option order. */
export type PaperRec = {
  n: number; // printed question number (drives OMR Q-order)
  stem: string; // LaTeX-bearing (\(...\))
  optA: string; optB: string; optC: string; optD: string;
  answer: "A" | "B" | "C" | "D"; // key for THIS paper's option order (derived if the PDF has no key)
  solution: string;
  difficulty: Difficulty;
  subtopic: string; // one of spec.subtopics
  /** "new" = genuinely new -> PUBLIC-eligible; "dup" = already in the bank; "flawed" = bad options.
   *  dup + flawed stay PRIVATE (paper-backing only). Missing => "new". */
  status?: "new" | "dup" | "flawed";
  reviewNote?: string; // surfaced in dry-runs; for low-confidence / flawed items
  /** Multi-chapter papers (a mock spanning chapters): the canonical DB chapter for
   *  THIS question. Single-chapter papers omit it (falls back to spec.chapterName). */
  chapter?: string;
};

export type PaperSpec = {
  slug: string;
  title: string; // /dashboard/papers title, as a teacher would name it
  recordsFile: string; // data/<file> (defaults to <slug>.records.json)
  outName: string; // generated-papers/<outName>.xlsx
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  subjectName: string; // DB subject ("Mathematics", "Geography", ...)
  // Single-chapter mode: set chapterName + subtopics (the common case). Multi-chapter
  // mode (a mock spanning chapters): set `chapters` (chapter -> its valid subtopics)
  // and put a `chapter` on each record. The paper still files everything under ONE
  // `section`; only the BANK rows go to their per-record chapter.
  chapterName?: string; // canonical DB chapter (single-chapter mode; must already exist)
  subtopics?: string[]; // valid DB subtopics for that chapter
  chapters?: Record<string, string[]>; // multi-chapter mode: chapter -> valid subtopics
  pyqNote: string; // questions.pyq_note
  examName: string; // display name for the QuestionRow ("NDA")
  examId?: string; // DB exam id; defaults to the NDA EXAM_ID. Set for a non-NDA exam (e.g. Foundation Course).
  section: { key: string; label: string }; // single section the paper files all questions under
  bankAdd: boolean; // commit-paper commits rows + creates the paper; if false it's Excel-only
};

export const PAPERS: Record<string, PaperSpec> = {
  // LWS "Matrices 6M QP 13-6-26" — 40-q NDA Maths test, no printed key (answers derived).
  "matrices-test": {
    slug: "matrices-test",
    title: "NDA Matrices Test (6M QP 13-6-26)",
    recordsFile: "matrices-test.records.json",
    outName: "Tags_NDA_Matrices_Test",
    sourceFile: "NDA_Maths_Practice__Matrices_Test_6M_QP.pdf",
    subjectName: "Mathematics",
    chapterName: "Matrices & Determinants",
    subtopics: [
      "Cofactors, Adjoint, and Inverse",
      "Determinant Properties, Operations, and Sums",
      "Linear Systems — Consistency, Cramer's Rule, Solution Space",
      "Matrix Operations, Polynomials, and Equations",
      "Special Determinants — Trig, Complex, Roots of Unity, Polynomial",
      "Special Matrices — Skew-Symmetric, Diagonal, Idempotent, Orthogonal, Rotation",
    ],
    pyqNote: "NDA Maths practice — LWS Matrices Test (6M QP 13-6-26)",
    examName: "NDA",
    section: { key: "matrices-determinants", label: "Matrices & Determinants" },
    bankAdd: true,
  },

  // LWS "Vectors_QP (B 13-6-26)" — 120-q NDA Vector Test (verified key). Excel-only
  // for now (bankAdd:false): not committed to the bank / no paper unless promoted.
  "vectors-b": {
    slug: "vectors-b",
    title: "NDA Vector Test (B 13-6-26)",
    recordsFile: "vectors-b.records.json",
    outName: "Tags_NDA_LWS_Vector_Test_B",
    sourceFile: "NDA_Maths_Practice__Vectors_Test_B.pdf",
    subjectName: "Mathematics",
    chapterName: "Vectors",
    subtopics: [
      "Position Vectors and Section",
      "Magnitude, Components, Projection, and Direction Cosines",
      "Dot Product and Angle",
      "Cross Product and Triple Product",
      "Vector Geometry — Triangles, Parallelograms, Quadrilaterals",
    ],
    pyqNote: "NDA Maths practice — LWS Vector Test (B 13-6-26)",
    examName: "NDA",
    section: { key: "vectors", label: "Vectors" },
    bankAdd: true,
  },

  // LWS "Acids Bases and Salts Test" — 75-q Foundation Course (Class 9/10 NCERT)
  // Chemistry test, no printed key (answers derived). Semantic dedup found ALL 75
  // already PUBLIC in the Foundation "Acids, Bases and Salts" chapter, so this is
  // Excel-only (bankAdd:false): emit the OMR tagged sheet, don't re-commit dups or
  // create a paper. See the lws-test-ingest decision log (2026-06-20).
  "foundation-abs-test": {
    slug: "foundation-abs-test",
    title: "Foundation Acids, Bases and Salts Test",
    recordsFile: "foundation-abs-test.records.json",
    outName: "Tags_Foundation_Acids_Bases_Salts",
    sourceFile: "Foundation_Chemistry__Acids_Bases_and_Salts_Test.pdf",
    subjectName: "Chemistry",
    chapterName: "Acids, Bases and Salts",
    examId: "22d88324-5624-486e-aaa1-52ccaf4e1281", // Foundation Course (not the default NDA EXAM_ID)
    subtopics: [
      "Indicators and the pH Scale",
      "Acids, Bases and Their Properties",
      "Salts — Preparation, Properties and Uses",
      "Neutralization and Reactions of Acids and Bases",
    ],
    pyqNote: "Foundation Chemistry practice — LWS Acids, Bases and Salts Test",
    examName: "Foundation Course",
    section: { key: "acids-bases-salts", label: "Acids, Bases and Salts" },
    bankAdd: false,
  },

  // LWS "APJ Maths Mock 5" — 120-q NDA Maths MOCK spanning 11 chapters, no printed
  // key (answers derived + verified). First MULTI-CHAPTER paper (uses `chapters` +
  // per-record `chapter`). Semantic dedup vs the 5,200-q NDA Maths bank: 68 dup /
  // 48 new / 4 flawed. The whole 120-q test is committed PRIVATE + filed in one
  // "APJ Maths Mock 5" paper section (OMR Q-order); only the 48 new flip PUBLIC.
  // Re-derivation surfaced 4 EXISTING bank wrong-keys (logged to SUGGESTIONS.md).
  "apj-maths-mock-5": {
    slug: "apj-maths-mock-5",
    title: "NDA Maths — APJ Mock 5",
    recordsFile: "apj-maths-mock-5.records.json",
    outName: "Tags_NDA_APJ_Maths_Mock_5",
    sourceFile: "NDA_Maths_Practice__APJ_Maths_Mock_5.pdf",
    subjectName: "Mathematics",
    chapters: {
      "Limits & Continuity": [
        "Limit Evaluation Techniques — L'Hôpital, Rationalization, Standard Forms",
        "One-Sided Limits, Greatest Integer, and Absolute Value Limits",
        "Continuity and Differentiability — Piecewise, Modulus, Composed, Oscillatory",
      ],
      "Differentiation": [
        "Differentiation Techniques — Chain Rule, Logarithmic, Composite Functions",
        "Parametric, Implicit, and Higher-Order Derivatives",
        "Differentiability of Absolute Value, Piecewise, and Greatest Integer Functions",
      ],
      "Application of Derivatives": [
        "Tangents and Slopes",
        "Monotonicity, Extrema, and Critical Points",
        "Optimisation — Geometric, Trigonometric, AM-GM",
      ],
      "Trigonometric Identities": [
        "Specific Values and Quadrants",
        "Compound Angle Formulas",
        "Multiple and Half-Angle Formulas",
        "Product-to-Sum and Sum-to-Product Identities",
        "Maximum and Minimum of Trigonometric Expressions",
      ],
      "Trigonometric Equations": [
        "General Solutions and Counting Solutions of Trigonometric Equations",
        "Solving Specific Forms — Double-Angle, Product, Logarithmic, and Vieta",
        "Simultaneous and Combined Trigonometric Systems",
      ],
      "Properties of Triangle": [
        "Sine and Cosine Rules — Solving Triangles",
        "Triangle Identities — A+B+C=π, Half-Angle, and Double-Angle",
        "In-circle and Regular Polygon Geometry",
      ],
      "Complex Numbers": [
        "Modulus, Argument, and Conjugate",
        "Powers and Roots",
        "Cube Roots of Unity",
      ],
      "Lines": [
        "Equation, Slope, and Family of Lines",
        "Distance, Section, and Locus",
        "Angle Between Lines, Parallelism, and Perpendicularity",
        "Triangles, Quadrilaterals, and Polygons",
      ],
      "Circles": [
        "Circle Equation — Centre, Radius, Diameter, and Properties",
        "Circles Through Given Points and Concyclicity",
        "Inscribed Geometry, Tangents, and Segments",
      ],
      "Matrices & Determinants": [
        "Matrix Operations, Polynomials, and Equations",
        "Special Matrices — Skew-Symmetric, Diagonal, Idempotent, Orthogonal, Rotation",
        "Determinant Properties, Operations, and Sums",
        "Special Determinants — Trig, Complex, Roots of Unity, Polynomial",
        "Cofactors, Adjoint, and Inverse",
        "Linear Systems — Consistency, Cramer's Rule, Solution Space",
      ],
      "Sequence & Series": [
        "Arithmetic Progressions",
        "Geometric Progressions",
        "Harmonic Progressions and the Three Means",
        "Interrelating AP, GP and HP",
        "Special Series and Special Sums",
      ],
    },
    pyqNote: "NDA Maths practice — LWS APJ Maths Mock 5",
    examName: "NDA",
    section: { key: "apj-maths-mock-5", label: "APJ Maths Mock 5" },
    bankAdd: true,
  },

  // LWS "Part Of Speech Test" — 80-q NDA English grammar test, no printed key
  // (answers derived from the underlined word in each sentence). Dedup found all
  // 80 NEW vs the 108-q NDA Grammar bank, so it's a full ingest (paper + bank +
  // Excel). All map to the "Parts of Speech" subtopic.
  "parts-of-speech-test": {
    slug: "parts-of-speech-test",
    title: "NDA Parts of Speech Test",
    recordsFile: "parts-of-speech-test.records.json",
    outName: "Tags_NDA_Parts_of_Speech_Test",
    sourceFile: "NDA_English_Practice__Parts_of_Speech_Test.pdf",
    subjectName: "English",
    chapterName: "Grammar",
    subtopics: ["Parts of Speech"],
    pyqNote: "NDA English practice — LWS Parts of Speech Test",
    examName: "NDA",
    section: { key: "grammar", label: "Grammar" },
    bankAdd: true,
  },
};

export function requirePaper(slug: string | undefined): PaperSpec {
  if (!slug || !PAPERS[slug]) {
    throw new Error(`unknown paper "${slug}". Known: ${Object.keys(PAPERS).join(", ")}`);
  }
  return PAPERS[slug];
}

export function loadRecords(spec: PaperSpec): PaperRec[] {
  const recs: PaperRec[] = JSON.parse(readFileSync(join(DATA, spec.recordsFile), "utf-8"));
  return recs.sort((a, b) => a.n - b.n);
}

export const statusOf = (r: PaperRec): "new" | "dup" | "flawed" => r.status ?? "new";

/** The DB exam id for a paper — its own examId override, else the default NDA EXAM_ID. */
export const examIdOf = (spec: PaperSpec): string => spec.examId ?? EXAM_ID;

/** The canonical DB chapter a record files under: its own `chapter`, else the paper's
 *  single `chapterName`. Throws if neither is set (mis-configured record). */
export function chapterOf(spec: PaperSpec, r: PaperRec): string {
  const ch = r.chapter ?? spec.chapterName;
  if (!ch) throw new Error(`Q${r.n}: no chapter (record has no \`chapter\` and spec has no \`chapterName\`)`);
  return ch;
}

/** Valid DB subtopics for a chapter under this paper: the multi-chapter `chapters`
 *  entry, else the single-chapter `subtopics`. Throws if neither is configured. */
export function subtopicsFor(spec: PaperSpec, chapter: string): string[] {
  const subs = spec.chapters?.[chapter] ?? spec.subtopics;
  if (!subs) throw new Error(`no subtopics configured for chapter "${chapter}"`);
  return subs;
}

/** All chapters this paper touches (for logging) — `chapters` keys or the single chapter. */
export const chaptersOf = (spec: PaperSpec): string[] =>
  spec.chapters ? Object.keys(spec.chapters) : spec.chapterName ? [spec.chapterName] : [];

/** Hard-validate a record set; throws on the first problem (transcription bug). */
export function validateRecords(spec: PaperSpec, recs: PaperRec[]): void {
  const seen = new Set<number>();
  for (const r of recs) {
    if (seen.has(r.n)) throw new Error(`duplicate question number ${r.n}`);
    seen.add(r.n);
    if (!LABELS.includes(r.answer as OptionLabel)) throw new Error(`Q${r.n}: bad answer "${r.answer}"`);
    if (!DIFFICULTIES.has(r.difficulty)) throw new Error(`Q${r.n}: bad difficulty "${r.difficulty}"`);
    const ch = chapterOf(spec, r);
    if (spec.chapters && !spec.chapters[ch]) throw new Error(`Q${r.n}: chapter not in spec.chapters: "${ch}"`);
    const subs = new Set(subtopicsFor(spec, ch));
    if (!subs.has(r.subtopic)) throw new Error(`Q${r.n}: subtopic not valid for chapter "${ch}": "${r.subtopic}"`);
    for (const [lab, val] of [["A", r.optA], ["B", r.optB], ["C", r.optC], ["D", r.optD]] as const) {
      if (!val || !val.trim()) throw new Error(`Q${r.n}: empty option ${lab}`);
    }
  }
}

/** Record -> a QuestionRow for buildTagRows (the OMR/tagged-Excel path). */
export function recToQuestionRow(spec: PaperSpec, r: PaperRec): QuestionRow {
  const texts: Record<OptionLabel, string> = { A: r.optA, B: r.optB, C: r.optC, D: r.optD };
  const options: OptionRow[] = LABELS.map((label) => ({
    label, text: texts[label], isCorrect: label === r.answer, imageUrl: null,
  }));
  return {
    id: `${spec.slug}-${r.n}`,
    text: r.stem,
    context: null,
    difficulty: r.difficulty,
    solution: r.solution,
    imageUrl: null,
    setId: null,
    questionNumber: String(r.n),
    pyqYear: null,
    pyqMonth: null,
    pyqNote: null,
    exam: { id: spec.examName.toLowerCase(), name: spec.examName },
    subject: { id: spec.subjectName.toLowerCase(), name: spec.subjectName },
    chapter: { id: chapterOf(spec, r).toLowerCase().replace(/[^a-z0-9]+/g, "-"), name: chapterOf(spec, r) },
    subtopic: { id: r.subtopic, name: r.subtopic },
    options,
  };
}

/** Record -> a ParsedRowPayload for commitStaged (the bank-ingestion path). */
export function recToParsedRow(spec: PaperSpec, r: PaperRec): ParsedRowPayload {
  const texts: Record<OptionLabel, string> = { A: r.optA, B: r.optB, C: r.optC, D: r.optD };
  const options = LABELS.map((label) => ({ label, text: texts[label], isCorrect: label === r.answer }));
  return {
    sourceRow: r.n,
    questionNumber: String(r.n),
    subjectName: spec.subjectName,
    chapterName: chapterOf(spec, r),
    subtopicName: r.subtopic,
    text: r.stem,
    difficulty: r.difficulty,
    solution: r.solution,
    options,
    contentHash: contentHash(r.stem, [r.optA, r.optB, r.optC, r.optD], r.answer),
  };
}
