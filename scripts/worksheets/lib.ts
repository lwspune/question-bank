// Pure helpers for the Cadetprep "Worksheets - 11th+12th" ingestion pipeline.
// Unit-tested in tests/worksheets-lib.test.ts. No IO here — commit.ts reads the
// Excel files (SheetJS handles both .xlsx and legacy .xls) and hands this module
// arrays-of-arrays.
//
// Source format: the 15-column LMS-export template every Cadetprep worksheet
// uses — QUESTION TEXT | Subject | MARKS | NEG | DIFFICULTY | TYPE | OPTION ×4 |
// Correct Answers | SOLUTION | … . The Subject column is unreliable (mixes
// "Maths", "NDA>Maths>X", even "AFCAT>…") and is ignored; taxonomy comes from
// the config registry (folder = chapter, file = subtopic).
import { contentHash } from "../../src/lib/upload/hash";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import type { ParsedRowPayload, OptionLabel, Difficulty } from "../../src/lib/upload/validate";

const LABELS: OptionLabel[] = ["A", "B", "C", "D"];

/** Source difficulty vocabulary → the bank's enum. "Very Hard" folds into HARD. */
export function normalizeDifficulty(raw: string): Difficulty {
  const d = raw.trim().toLowerCase();
  if (d === "easy") return "EASY";
  if (d === "medium" || d === "moderate") return "MODERATE";
  if (d === "hard" || d === "very hard") return "HARD";
  throw new Error(`Unknown difficulty "${raw}"`);
}

/** One question as read from a worksheet sheet, before overrides. */
export type WorksheetQuestion = {
  file: string; // file key (for messages)
  row: number; // 1-based xlsx row of the data row (header = row 1)
  stem: string;
  options: string[]; // exactly 4, positional A..D
  answer: string; // source letter, normalised uppercase (may be invalid — overrides can rescue)
  difficulty: string; // source vocabulary; validated in buildWorksheetRows
  solution: string;
};

export type ParseSheetResult = { questions: WorksheetQuestion[]; errors: string[] };

/**
 * Parse a sheet's array-of-arrays into questions. Handles the two layout
 * variants seen in the corpus: the standard 15-col template, and the same
 * template with a leading "Sr No" column (offset by one).
 */
export function parseSheet(fileKey: string, aoa: (string | number | null | undefined)[][]): ParseSheetResult {
  if (aoa.length === 0) throw new Error(`${fileKey}: sheet is empty`);
  const hdr = aoa[0].map((c) => String(c ?? "").trim());
  const off = hdr[0] === "Sr No" ? 1 : 0;
  if (hdr[off] !== "QUESTION TEXT") {
    throw new Error(`${fileKey}: unexpected header — expected "QUESTION TEXT" at column ${off}, got "${hdr[off]}"`);
  }
  const cell = (r: (string | number | null | undefined)[], i: number): string =>
    String(r[off + i] ?? "").trim();

  const questions: WorksheetQuestion[] = [];
  const errors: string[] = [];
  for (let i = 1; i < aoa.length; i++) {
    const r = aoa[i];
    if (!r || !cell(r, 0)) continue; // blank row
    questions.push({
      file: fileKey,
      row: i + 1,
      stem: cell(r, 0),
      options: [cell(r, 6), cell(r, 7), cell(r, 8), cell(r, 9)],
      answer: cell(r, 10).toUpperCase(),
      difficulty: cell(r, 4),
      solution: cell(r, 11),
    });
  }
  return { questions, errors };
}

/**
 * Per-question repair, keyed "<fileIndex 2-digit>-<xlsx row>" (e.g. "07-19") in
 * data/<chapterId>.overrides.json. Every override carries a human `reason` —
 * the adjudication record.
 */
export type WorksheetOverride = {
  answer?: string; // corrected key letter
  options?: Partial<Record<OptionLabel, string>>; // repaired option text by letter
  solution?: string; // clean rewritten solution (replaces the source's)
  stem?: string; // repaired stem
  exclude?: boolean; // drop the row entirely (defective beyond repair)
  reason: string;
};

export type Flag = { id: string; reason: string };
export type BuildContext = {
  chapterName: string;
  subtopicName: string;
  fileIndex: number; // 1-based position of the file within the chapter
  subjectName?: string; // default "Mathematics"
};
export type BuildResult = { rows: ParsedRowPayload[]; flags: Flag[]; excluded: string[] };

// AI-authored solutions in this corpus sometimes contain inline waffle
// ("Wait, this matches option C, not A. Let me recalculate…"). Those must be
// rewritten before shipping — the probe flags them for the override pass.
const SELF_TALK = /\b(wait|let me (re)?(calculate|consider|check|verify)|looking at the options|doesn'?t match|does not match)\b/i;
const OPTION_MENTION = /\boption\s+[A-D]\b/i;

export function questionId(fileIndex: number, row: number): string {
  return `${String(fileIndex).padStart(2, "0")}-${row}`;
}

/**
 * Merge parsed questions + overrides into commit-ready rows.
 * Hard errors throw (an unrescued invalid answer letter, a missing option) —
 * they mean the source needs an override, not a silent skip. Soft conditions
 * (duplicate options, self-talk solutions, option-letter mentions, missing
 * solutions) become flags for the review pass.
 */
export function buildWorksheetRows(
  ctx: BuildContext,
  questions: WorksheetQuestion[],
  overrides: Record<string, WorksheetOverride>
): BuildResult {
  const rows: ParsedRowPayload[] = [];
  const flags: Flag[] = [];
  const excluded: string[] = [];

  for (const q of questions) {
    const id = questionId(ctx.fileIndex, q.row);
    const ov = overrides[id];
    if (ov?.exclude) {
      excluded.push(id);
      continue;
    }

    const stem = normalizeNewlines((ov?.stem ?? q.stem).trim());
    const optionTexts = LABELS.map((l, i) => {
      const t = ov?.options?.[l] ?? q.options[i];
      return normalizeNewlines(String(t ?? "").trim());
    });
    if (optionTexts.some((t) => !t)) {
      throw new Error(`${id}: missing option text (override needed)`);
    }
    const nonEmpty = optionTexts.filter(Boolean);
    if (new Set(nonEmpty).size < nonEmpty.length) {
      flags.push({ id, reason: "duplicate options — repair a distractor or verify intent" });
    }

    const answer = (ov?.answer ?? q.answer).trim().toUpperCase();
    if (!LABELS.includes(answer as OptionLabel)) {
      throw new Error(`${id}: answer letter "${answer}" invalid — supply an override`);
    }

    const solutionRaw = (ov?.solution ?? q.solution).trim();
    if (!solutionRaw) {
      flags.push({ id, reason: "no solution in source" });
    } else if (!ov?.solution) {
      if (SELF_TALK.test(solutionRaw)) {
        flags.push({ id, reason: "solution contains self-talk — rewrite via override" });
      } else if (OPTION_MENTION.test(solutionRaw)) {
        flags.push({ id, reason: "solution references an option letter — verify it names the keyed letter" });
      }
    }
    const solution = solutionRaw ? normalizeNewlines(solutionRaw) : undefined;

    const difficulty = normalizeDifficulty(q.difficulty);
    const options = LABELS.map((l, i) => ({
      label: l,
      text: optionTexts[i],
      isCorrect: l === answer,
    }));

    rows.push({
      sourceRow: ctx.fileIndex * 1000 + q.row, // unique across the chapter's files
      questionNumber: id,
      subjectName: ctx.subjectName ?? "Mathematics",
      chapterName: ctx.chapterName,
      subtopicName: ctx.subtopicName,
      text: stem,
      difficulty,
      solution,
      options,
      contentHash: contentHash(stem, optionTexts, answer),
    });
  }

  return { rows, flags, excluded };
}
