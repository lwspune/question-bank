// Pure core for the military-school lane, beyond what it imports from
// ../upsc/lib (band merge, catalog check, crosstab, records) and ../capf/lib.
//
// NTA's AISSEE key differs from UPSC's in three ways, all handled here:
//   - options are numbered 1-4, not lettered (we store A-D);
//   - a withdrawn item reads "DROP", not "X";
//   - an item where NTA accepted two options reads "1,2". It has no single
//     correct letter, so it ships with the accepted letter a blind pass reached,
//     a notice naming both, and grace in mocks (keycheck.ts).

import { subjectiveContentHash } from "../../src/lib/upload/hash";
import type { Difficulty, ParsedRowPayload } from "../../src/lib/upload/validate";

const NUM_TO_LETTER: Record<string, string> = { "1": "A", "2": "B", "3": "C", "4": "D" };

// ---------------------------------------------------------------------------
// Written papers (RIMC Maths and English): no options, a model answer instead.
// Each RIMC subject is its own paper, so a paper is either all-MCQ (the shared
// UPSC machinery) or all-written (below); none mixes the two.

/** One written item as transcribed. `number` is the lane's running count
 *  (1..N, the coverage gate); `label` is the PRINTED number ("1(a)", "Q.7"),
 *  which becomes the row's question_number. */
export type WrittenItem = {
  number: number;
  label: string;
  stem: string;
  context?: string;
  setLabel?: string;
  subject: string;
  chapter: string;
  subtopic?: string;
  difficulty: string;
  marks: number;
  /** An open-ended task (essay, letter, story): its answer is one sample, never compared. */
  open?: boolean;
  options?: unknown[];
};

const unbalancedMath = (s: string) => (s.match(/\\\(/g) ?? []).length !== (s.match(/\\\)/g) ?? []).length;

export function validateWritten(items: WrittenItem[]): string[] {
  const errs: string[] = [];
  const seen = new Set<number>();
  const labels = new Map<string, number>();
  for (const q of items) {
    const at = `Q${q.number}`;
    if (seen.has(q.number)) errs.push(`${at}: numbered twice`);
    seen.add(q.number);
    if (!q.stem || !q.stem.trim()) errs.push(`${at}: empty stem`);
    if (q.options && q.options.length) errs.push(`${at}: a written item carries options`);
    if (!q.label || !q.label.trim()) errs.push(`${at}: printed label missing`);
    else if (labels.has(q.label)) errs.push(`${at}: printed label ${q.label} is also Q${labels.get(q.label)}'s`);
    else labels.set(q.label, q.number);
    if (!(q.marks > 0)) errs.push(`${at}: marks missing`);
    for (const [f, v] of [["stem", q.stem], ["context", q.context]] as const) {
      if (v && unbalancedMath(v)) errs.push(`${at}: unbalanced \\( \\) delimiter in ${f}`);
    }
    if (!q.chapter) errs.push(`${at}: chapter missing`);
  }
  const max = Math.max(0, ...seen);
  for (let n = 1; n <= max; n++) if (!seen.has(n)) errs.push(`Q${n}: missing (numbering must run 1..${max})`);
  return errs;
}

/** Reduce a final answer to what matters for agreement: case, spacing, maths
 *  delimiters, thousands commas, a currency word and a closing full stop. */
function normAnswer(s: string): string {
  return s
    .toLowerCase()
    .replace(/\\[()]/g, "")
    .replace(/\$/g, "")
    .replace(/(rs\.?|₹|inr)/g, "")
    .replace(/(\d),(\d{3})\b/g, "$1$2")
    .replace(/\s+/g, "")
    .replace(/[.]+$/, "");
}

export function compareWritten(a: string | undefined, b: string | undefined, open = false): "AGREE" | "DISPUTE" | "OPEN" | "MISSING" {
  if (open) return "OPEN";
  if (a === undefined || b === undefined || !a.trim() || !b.trim()) return "MISSING";
  const x = normAnswer(a);
  const y = normAnswer(b);
  if (x === y) return "AGREE";
  const nx = Number(x);
  const ny = Number(y);
  if (x !== "" && y !== "" && Number.isFinite(nx) && Number.isFinite(ny) && nx === ny) return "AGREE";
  return "DISPUTE";
}

const DIFF: Record<string, Difficulty> = { EASY: "EASY", MEDIUM: "MODERATE", MODERATE: "MODERATE", HARD: "HARD" };

/** The row a written item becomes: subjective, no options, the model answer in
 *  `solution`, hashed on stem + context (never the answer, so a later answer
 *  fix keeps the row's identity). */
export function writtenPayload(q: WrittenItem, solution: string, sourceRow: number): ParsedRowPayload {
  const difficulty = DIFF[String(q.difficulty ?? "").toUpperCase()];
  if (!difficulty) throw new Error(`Q${q.number}: difficulty ${JSON.stringify(q.difficulty)} is not EASY/MEDIUM/HARD`);
  return {
    sourceRow,
    questionNumber: q.label,
    ...(q.setLabel ? { setLabel: q.setLabel } : {}),
    subjectName: q.subject,
    chapterName: q.chapter,
    ...(q.subtopic ? { subtopicName: q.subtopic } : {}),
    ...(q.context ? { context: q.context } : {}),
    text: q.stem,
    difficulty,
    solution,
    questionFormat: "subjective",
    options: [],
    contentHash: subjectiveContentHash(q.stem, q.context ?? null),
  };
}

export type NtaKey = {
  /** Question number -> letter, or "X" for a dropped item. Feeds parseOfficialKey. */
  key: Record<string, string>;
  /** Items with more than one accepted option, letters in printed order. */
  multi: Record<string, string[]>;
};

/**
 * Turn a vision read of NTA's key (question -> cell text) into letters.
 * REFUSES an unreadable cell and a short key: a misread "5" or a missed column
 * must stop the run, never fall through to a derived answer.
 *
 * `held`: numbers the paper deliberately leaves out (config `held`, e.g. the
 * Hindi language section of a Hindi-medium copy). Only those may be absent;
 * they never become withdrawn (X) items.
 */
export function normaliseNtaKey(raw: Record<string, string>, total: number, held: number[] = []): NtaKey {
  const skip = new Set(held);
  const key: Record<string, string> = {};
  const multi: Record<string, string[]> = {};
  for (const [k, v] of Object.entries(raw)) {
    const n = Number(k);
    if (!Number.isInteger(n) || n < 1 || n > total) throw new Error(`key has Q${k}, outside 1..${total}`);
    const cell = String(v ?? "").trim().toUpperCase();
    if (cell === "DROP" || cell === "X") {
      key[String(n)] = "X";
      continue;
    }
    const parts = cell.split(/\s*,\s*/).filter(Boolean);
    const letters = parts.map((p) => NUM_TO_LETTER[p]);
    if (!parts.length || letters.some((l) => !l)) {
      throw new Error(`Q${n}: key cell ${JSON.stringify(v)} is not 1-4, a list of them, or DROP`);
    }
    key[String(n)] = letters[0];
    if (letters.length > 1) multi[String(n)] = letters;
  }
  const missing: number[] = [];
  for (let n = 1; n <= total; n++) if (!(String(n) in key) && !skip.has(n)) missing.push(n);
  if (missing.length) {
    throw new Error(
      `key is missing ${missing.length} of ${total} question(s): Q${missing.slice(0, 12).join(", Q")}` +
        `${missing.length > 12 ? ", ..." : ""}. A partial key must not be used as a full one.`
    );
  }
  return { key, multi };
}

/** The letter to ship for a two-answer item: one a blind pass reached, else the first. */
export function resolveAccepted(accepted: string[], a: string | undefined, b: string | undefined): string {
  const up = (x: string | undefined) => (x ?? "").trim().toUpperCase();
  if (accepted.includes(up(a))) return up(a);
  if (accepted.includes(up(b))) return up(b);
  return accepted[0];
}

export type AcceptedScore = {
  scored: number;
  match: number;
  mismatched: number[];
  byConfidence: Record<string, { ok: number; of: number }>;
};

/** Score a blind pass against a key, counting any accepted letter as right. */
export function scoreAccepted(
  key: Record<string, string>,
  multi: Record<string, string[]>,
  pass: { number: number; answer: string; confidence?: string }[]
): AcceptedScore {
  const s: AcceptedScore = { scored: 0, match: 0, mismatched: [], byConfidence: {} };
  for (const d of [...pass].sort((x, y) => x.number - y.number)) {
    const official = key[String(d.number)];
    if (!official || official === "X") continue;
    const accepted = multi[String(d.number)] ?? [official];
    const ok = accepted.includes(d.answer.trim().toUpperCase());
    s.scored++;
    if (ok) s.match++;
    else s.mismatched.push(d.number);
    const c = (d.confidence ?? "").trim().toUpperCase() || "?";
    s.byConfidence[c] ??= { ok: 0, of: 0 };
    s.byConfidence[c].of++;
    if (ok) s.byConfidence[c].ok++;
  }
  return s;
}
