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

/**
 * Correct-answer rebalancing (the source generates keys skewed toward A/B —
 * A 32% / B 30% / C 19% / D 19% on the first 691 shipped questions). A shuffle
 * entry `"<id>": "D"` means: swap the correct option's TEXT with option D's
 * text and move the key to D — a single transposition, applied AFTER overrides.
 * Plans live in data/<chapterId>.shuffles.json (committed) so re-ingestion is
 * deterministic and idempotent.
 */
export type ShufflePlan = Record<string, string>;

// Rows whose option ORDER carries meaning must never be shuffled: combo/positional
// options ("Both …", "All of the above", "None of these") or a solution that
// references an option letter.
const POSITIONAL_OPTION = /\b(both|neither|all of the above|none of (the above|these))\b/i;
const SOLUTION_LETTER_REF = /\boption\s+\(?[A-D]\)?\b/i;

export function isShuffleEligible(optionTexts: string[], solution: string): boolean {
  if (optionTexts.some((t) => POSITIONAL_OPTION.test(t))) return false;
  if (solution && SOLUTION_LETTER_REF.test(solution)) return false;
  return true;
}

export type ShuffleRow = { id: string; answer: string; eligible: boolean };

export function letterDistribution(rows: ShuffleRow[]): Record<string, number> {
  const d: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const r of rows) d[r.answer] = (d[r.answer] ?? 0) + 1;
  return d;
}

/**
 * Deterministic minimal-move rebalance: targets are n/4 rounded, with the
 * remainder given to the currently-largest letters (fewest moves). Surplus
 * letters donate their ELIGIBLE rows (in id order) to deficit letters.
 * Ineligible rows never move; if eligibility runs out, the plan stops short
 * (best-effort) rather than forcing a move.
 */
export function planShuffles(rows: ShuffleRow[]): ShufflePlan {
  const counts = letterDistribution(rows);
  const n = rows.length;
  const base = Math.floor(n / 4);
  let remainder = n - base * 4;
  const targets: Record<string, number> = { A: base, B: base, C: base, D: base };
  // hand the +1s to the letters with the highest current counts
  for (const l of LABELS.slice()
    .sort((a, b) => counts[b] - counts[a] || a.localeCompare(b))
    .slice(0, remainder)) {
    targets[l] += 1;
  }

  const surplus: Record<string, number> = {};
  const deficit: Record<string, number> = {};
  for (const l of LABELS) {
    const diff = counts[l] - targets[l];
    if (diff > 0) surplus[l] = diff;
    else if (diff < 0) deficit[l] = -diff;
  }

  const plan: ShufflePlan = {};
  const donors = LABELS.filter((l) => surplus[l]).sort((a, b) => surplus[b] - surplus[a]);
  const receivers = LABELS.filter((l) => deficit[l]);
  for (const from of donors) {
    const candidates = rows
      .filter((r) => r.answer === from && r.eligible)
      .sort((a, b) => a.id.localeCompare(b.id));
    for (const row of candidates) {
      if (surplus[from] <= 0) break;
      const to = receivers.find((l) => deficit[l] > 0);
      if (!to) break;
      plan[row.id] = to;
      surplus[from]--;
      deficit[to]--;
    }
  }
  return plan;
}

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
  overrides: Record<string, WorksheetOverride>,
  shuffles: ShufflePlan = {}
): BuildResult {
  const rows: ParsedRowPayload[] = [];
  const flags: Flag[] = [];
  const excluded: string[] = [];
  const ids = new Set(questions.map((q) => questionId(ctx.fileIndex, q.row)));
  for (const key of Object.keys(shuffles)) {
    if (key.startsWith(`${String(ctx.fileIndex).padStart(2, "0")}-`) && !ids.has(key)) {
      throw new Error(`shuffle entry "${key}" matches no question`);
    }
  }

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

    let answer = (ov?.answer ?? q.answer).trim().toUpperCase();
    if (!LABELS.includes(answer as OptionLabel)) {
      throw new Error(`${id}: answer letter "${answer}" invalid — supply an override`);
    }

    // Rebalance shuffle (after overrides): transpose the correct option's text
    // with the target letter's text and move the key there.
    const target = shuffles[id]?.trim().toUpperCase();
    if (target && target !== answer) {
      if (!LABELS.includes(target as OptionLabel)) {
        throw new Error(`${id}: shuffle target "${target}" invalid`);
      }
      const fromIdx = LABELS.indexOf(answer as OptionLabel);
      const toIdx = LABELS.indexOf(target as OptionLabel);
      [optionTexts[fromIdx], optionTexts[toIdx]] = [optionTexts[toIdx], optionTexts[fromIdx]];
      answer = target;
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
