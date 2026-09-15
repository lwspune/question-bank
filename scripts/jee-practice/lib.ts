// Pure helpers for the JEE (Mains) SGIMA practice-booklet ingestion pipeline.
// Unit-tested in tests/jee-practice-lib.test.ts. No IO here.
//
// The booklet prints MCQ options as `1) 2) 3) 4)` and an answer key per LEVEL as
// a block `01) 4  02) 1  03) 1 …` (question-number ) option-NUMBER). We map the
// option number POSITIONALLY to a letter (1→A … 4→D) and attach it to the level's
// questions by their within-level number. Worked Examples (`W.E-N`) are subjective
// (free-response) rows carrying the booklet's own solution.
//
// The heavy lifting (MCQ/subjective row assembly, ref-uniqueness, subtopic +
// difficulty validation, content_hash) is the State Board `buildRecords` — we
// adapt the transcription records into its `SBQuestion` shape and delegate.
import {
  buildRecords as sbBuildRecords,
  latexImbalances,
  type SBQuestion,
  type BuildChapter,
} from "../stateboard/lib";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";

const LETTERS = ["A", "B", "C", "D"] as const;

/** A unique exercise-set label. The booklet splits a chapter into LEVEL sets,
 *  some with Class-Work / Home-Work variants — so "II (C.W)" and "II (H.W)" are
 *  DIFFERENT sets with different KEYs. Transcription normalises the banner to a
 *  compact label ("I-HW", "II-CW", "II-HW", "III", "IV"); the same label keys
 *  the questions AND the KEY block. */
export type Level = string;

/** Printed option number (1..4) → bank label (A..D). */
export function optionLetter(n: number): string {
  if (!Number.isInteger(n) || n < 1 || n > 4) throw new Error(`option number out of range: ${n}`);
  return LETTERS[n - 1];
}

/** Difficulty floor for a LEVEL when a question doesn't set its own, from the
 *  leading roman tier (C.W/H.W doesn't change difficulty): I → EASY, II → MODERATE,
 *  III/IV+ → HARD. Unrecognised → MODERATE. */
export function difficultyForLevel(label: string): string {
  const m = label.toUpperCase().match(/\b(I{1,3}|IV|V?I{0,3})\b/);
  const roman = m?.[1] ?? "";
  if (roman === "I") return "EASY";
  if (roman === "II") return "MODERATE";
  if (["III", "IV", "V", "VI"].includes(roman)) return "HARD";
  return "MODERATE";
}

/** One transcribed record (MCQ from a LEVEL set, or a Worked Example). */
export type JQ = {
  /** Human-facing provenance ref → questions.question_number. Unique within the
   *  chapter, e.g. "Lvl II Q13" (MCQ) or "W.E-3" (worked example). */
  ref: string;
  kind: "mcq" | "we";
  level?: Level; // MCQ only — which LEVEL set (drives key lookup + difficulty)
  num?: number; // MCQ only — within-level question number (matches the KEY block)
  subtopic: string; // one of the chapter's canonical subtopics
  difficulty?: string; // optional; defaults from LEVEL_DIFFICULTY (MCQ) / MODERATE (W.E)
  stem: string; // LaTeX-bearing (\(...\)); GFM pipe-tables allowed for match-lists
  context?: string; // shared instruction for statement/match questions
  options?: { label: string; text: string }[]; // MCQ — exactly A,B,C,D
  solution?: string; // W.E — the booklet's worked solution
  hasFigure?: boolean; // stem needs a diagram (figure-attach pass)
};

/** A per-part transcription fragment written by a vision agent for a page range.
 *  Carries every question on those pages plus any `LEVEL-N-KEY` blocks that appear
 *  there (keyed by level). Questions carry their own level+num, so a level's
 *  questions and its KEY block may land in different fragments — merge stitches by
 *  level. */
export type Fragment = {
  questions: JQ[];
  keyBlocks?: Record<string, string>; // e.g. { "II": "01) 4  02) 1  03) 1" }
};

export type Flag = { ref: string; reason: string };
export type AssembleResult = { rows: ParsedRowPayload[]; flags: Flag[] };

/**
 * Parse a `LEVEL-N-KEY` block into question-number → letter. Tolerant of the
 * scan's spacing/newlines: `01) 4`, `1) 4`, `01)4`, `12) 3`, across lines.
 * First occurrence of a number wins. Option numbers outside 1..4 are skipped.
 */
export function parseKeyBlock(text: string): Map<number, string> {
  const out = new Map<number, string>();
  const re = /(\d{1,3})\s*\)\s*([1-4])\b/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const n = Number(m[1]);
    if (!out.has(n)) out.set(n, optionLetter(Number(m[2])));
  }
  return out;
}

/** Adapt the transcription records + per-level KEY blocks into `SBQuestion`s. */
function toSBQuestions(questions: JQ[], keyBlocks: Record<string, string>): { sb: SBQuestion[]; flags: Flag[] } {
  const flags: Flag[] = [];
  const keyMaps = new Map<string, Map<number, string>>();
  for (const [lvl, block] of Object.entries(keyBlocks)) keyMaps.set(lvl, parseKeyBlock(block));

  const sb: SBQuestion[] = [];
  for (const q of questions) {
    if (q.kind === "we") {
      sb.push({
        ref: q.ref,
        bucket: "solved",
        format: "subjective",
        subtopic: q.subtopic,
        difficulty: q.difficulty ?? "MODERATE",
        stem: q.stem,
        context: q.context,
        // forwarded so a mis-typed W.E carrying options trips the downstream
        // subjective-must-not-carry-options guard instead of silently dropping them
        options: q.options,
        solution: q.solution,
      });
      continue;
    }
    // MCQ — resolve the answer from its level's KEY block by within-level number.
    let answer: string | undefined;
    if (q.level && q.num != null) {
      const km = keyMaps.get(q.level);
      if (!km) flags.push({ ref: q.ref, reason: `no KEY block for LEVEL ${q.level}` });
      else {
        answer = km.get(q.num);
        if (!answer) flags.push({ ref: q.ref, reason: `LEVEL ${q.level} KEY has no entry for Q${q.num}` });
      }
    } else {
      flags.push({ ref: q.ref, reason: "MCQ missing level/num — cannot resolve answer" });
    }
    sb.push({
      ref: q.ref,
      bucket: "exercise-mcq",
      format: "mcq",
      subtopic: q.subtopic,
      difficulty: q.difficulty ?? (q.level ? difficultyForLevel(q.level) : "MODERATE"),
      stem: q.stem,
      context: q.context,
      options: q.options,
      answer,
    });
  }
  return { sb, flags };
}

/**
 * Assemble commit-ready rows from the transcription. Resolves MCQ answers from
 * the per-level KEY blocks, then delegates row construction to the State Board
 * builder (ref-uniqueness, subtopic/difficulty checks, content_hash, the
 * mcq/subjective split). Hard transcription mistakes throw; soft conditions
 * (an MCQ with no resolvable key, a W.E with no solution) become flags.
 */
export function assembleRows(chapter: BuildChapter, questions: JQ[], keyBlocks: Record<string, string>): AssembleResult {
  const { sb, flags } = toSBQuestions(questions, keyBlocks);
  const { rows, flags: sbFlags } = sbBuildRecords(chapter, sb);
  return { rows, flags: [...flags, ...sbFlags] };
}

/**
 * Per-level key-coverage cross-check: every level with questions must have a KEY
 * block, and the count of key entries should match the number of questions in
 * that level (a mismatch means a dropped/extra question or a mis-transcribed key).
 * Returns human-readable warnings (not a hard error — surfaced for review).
 */
export function keyCoverageWarnings(questions: JQ[], keyBlocks: Record<string, string>): string[] {
  const warns: string[] = [];
  const perLevel = new Map<string, number>();
  for (const q of questions) {
    if (q.kind === "mcq" && q.level) perLevel.set(q.level, (perLevel.get(q.level) ?? 0) + 1);
  }
  for (const [lvl, count] of [...perLevel].sort()) {
    const block = keyBlocks[lvl];
    if (!block) {
      warns.push(`LEVEL ${lvl}: ${count} questions but NO KEY block`);
      continue;
    }
    const keys = parseKeyBlock(block).size;
    if (keys !== count) warns.push(`LEVEL ${lvl}: ${count} questions but KEY has ${keys} entries`);
  }
  return warns;
}

export { latexImbalances };
export type { BuildChapter };
