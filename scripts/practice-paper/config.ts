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
};

export type PaperSpec = {
  slug: string;
  title: string; // /dashboard/papers title, as a teacher would name it
  recordsFile: string; // data/<file> (defaults to <slug>.records.json)
  outName: string; // generated-papers/<outName>.xlsx
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  subjectName: string; // DB subject ("Mathematics", "Geography", ...)
  chapterName: string; // canonical DB chapter (must already exist)
  subtopics: string[]; // valid DB subtopics for this chapter (records validated against this)
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

/** Hard-validate a record set; throws on the first problem (transcription bug). */
export function validateRecords(spec: PaperSpec, recs: PaperRec[]): void {
  const subs = new Set(spec.subtopics);
  const seen = new Set<number>();
  for (const r of recs) {
    if (seen.has(r.n)) throw new Error(`duplicate question number ${r.n}`);
    seen.add(r.n);
    if (!LABELS.includes(r.answer as OptionLabel)) throw new Error(`Q${r.n}: bad answer "${r.answer}"`);
    if (!DIFFICULTIES.has(r.difficulty)) throw new Error(`Q${r.n}: bad difficulty "${r.difficulty}"`);
    if (!subs.has(r.subtopic)) throw new Error(`Q${r.n}: subtopic not in spec: "${r.subtopic}"`);
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
    chapter: { id: spec.section.key, name: spec.chapterName },
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
    chapterName: spec.chapterName,
    subtopicName: r.subtopic,
    text: r.stem,
    difficulty: r.difficulty,
    solution: r.solution,
    options,
    contentHash: contentHash(r.stem, [r.optA, r.optB, r.optC, r.optD], r.answer),
  };
}
