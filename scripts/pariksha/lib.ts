// Pure assembly logic for Pariksha (Vidhya Vikashni) ingestion — testable, no I/O.
//
// Reuses the NEET pure helpers (optionLetter / parseAnswer / findLatexImbalance /
// normalizeQuestions / validateRows) — same (1)(2)(3)(4)→A/B/C/D positional convention
// and the same structural checks. What differs from NEET:
//   • No fixed 4-block subject layout — a Pariksha test is single-subject (or a full
//     4-section mock), so buildRecords validates chapter ∈ catalog but skips the
//     Q-number→subject block cross-check.
//   • Answer keys are read from the PDF TEXT layer (extractAnswerKeyFromText), not vision.
import type { RawRow } from "../../src/lib/upload/validate";
import { NEET_CHAPTERS, type NeetSubject } from "./config";
import {
  optionLetter,
  parseAnswer,
  findLatexImbalance,
  normalizeQuestions,
  validateRows,
  type NQ,
  type Flag,
  type BuildResult,
} from "../neet/lib";

export { optionLetter, parseAnswer, findLatexImbalance, normalizeQuestions, validateRows };
export type { NQ, Flag, BuildResult };

/**
 * Extract the official answer key from a "+"/answer file's full text layer.
 * ParikshaGruh prints `Answer : X` (X ∈ A-D) once per question, in continuous 1..N
 * order across sections — so the i-th match is Q(i+1)'s key. Returns [] when the file
 * carries no keys (the 7 keyless tests). Pure over the text string.
 */
export function extractAnswerKeyFromText(fullText: string): string[] {
  const out: string[] = [];
  const re = /Answer\s*:\s*([A-D])/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(fullText)) !== null) out.push(m[1].toUpperCase());
  return out;
}

/**
 * Assemble RawRows from normalized questions. Validates each question's chapter is in
 * its subject's NCERT catalog (subtopic is free-form / auto-created). No subject-block
 * cross-check (unlike NEET) — Pariksha tests aren't the fixed 45-per-subject layout.
 */
export function buildRecords(questions: NQ[]): BuildResult {
  const rows: RawRow[] = [];
  const flags: Flag[] = [];

  for (const q of questions) {
    const catalog = NEET_CHAPTERS[q.subject as NeetSubject];
    if (!catalog) {
      flags.push({ number: q.number, reason: `unknown subject "${q.subject}"` });
    } else if (!catalog.includes(q.chapter)) {
      flags.push({ number: q.number, reason: `chapter "${q.chapter}" is not in the ${q.subject} catalog` });
    }

    const o = q.options ?? [];
    rows.push({
      sourceRow: q.number,
      questionNumber: String(q.number),
      subject: q.subject,
      chapter: q.chapter,
      subtopic: q.subtopic,
      question: (q.stem ?? "").trim(),
      optionA: o[0] ?? "",
      optionB: o[1] ?? "",
      optionC: o[2] ?? "",
      optionD: o[3] ?? "",
      answer: String(q.answer ?? ""),
      difficulty: q.difficulty,
      solution: (q.solution ?? "").trim() || undefined,
    });
  }
  return { rows, flags };
}
