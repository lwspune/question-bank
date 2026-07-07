// Pure assembly logic for NEET (UG) ingestion — testable, no I/O.
//
// Input (per paper, per subject block, produced by the vision-transcription agents):
//   questions[] — one entry per Q: subject + chapter (from NEET_CHAPTERS) + subtopic +
//                 stem (LaTeX) + 4 options in PRINTED order (1..4) + the booklet's
//                 official answer + worked solution (LaTeX) + difficulty + confidence.
//
// The booklet prints options as (1)(2)(3)(4); the bank stores A/B/C/D. We map
// POSITIONALLY: printed option 1 → A, ... 4 → D, and "Answer (N)" → that letter.
//
// Output: RawRow[] (subject/chapter/subtopic/text/options/answer/difficulty/solution),
// ready for validateRow → commitStaged.
import type { RawRow } from "../../src/lib/upload/validate";
import { NEET_CHAPTERS, allowedSubjectsForNumber, type NeetSubject } from "./config";

export type NQ = {
  number: number;
  subject: NeetSubject;
  chapter: string; // must be one of NEET_CHAPTERS[subject]
  subtopic: string; // free-form, auto-created
  stem: string; // clean question content (LaTeX; may embed a GFM pipe-table for match-columns)
  options: string[]; // exactly 4, in printed order (1..4)
  answer: string | number; // "Answer (2)" | "(2)" | 2 | "B" — normalized to A|B|C|D
  solution: string; // worked solution (LaTeX)
  difficulty: string; // EASY|MODERATE|HARD (synonyms self-healed)
  confidence: string; // HIGH|MED|LOW
  hasFigure?: boolean; // stem needs a diagram (figure-attach pass)
  reasoning?: string;
};

export type Flag = { number: number; reason: string };
export type BuildResult = { rows: RawRow[]; flags: Flag[] };

const LETTERS = ["A", "B", "C", "D"] as const;

/** Printed option number (1..4) → bank label (A..D). */
export function optionLetter(n: number): string {
  if (!Number.isInteger(n) || n < 1 || n > 4) throw new Error(`option index out of range: ${n}`);
  return LETTERS[n - 1];
}

/** Normalize the booklet's answer form to A|B|C|D. Returns "" when unparseable. */
export function parseAnswer(raw: string | number): string {
  if (typeof raw === "number") return raw >= 1 && raw <= 4 ? optionLetter(raw) : "";
  const s = String(raw ?? "").trim();
  if (!s) return "";
  const up = s.toUpperCase();
  if (["A", "B", "C", "D"].includes(up)) return up; // already a letter
  // "Answer (2)", "Ans. (2)", "(2)", "2" → the single 1..4 digit
  const digits = s.match(/\d/g);
  if (digits && digits.length === 1) {
    const n = Number(digits[0]);
    return n >= 1 && n <= 4 ? optionLetter(n) : "";
  }
  return "";
}

/** Balanced inline-math delimiters \( \) across a field. */
export function findLatexImbalance(str: string): string | null {
  const open = (str.match(/\\\(/g) || []).length;
  const close = (str.match(/\\\)/g) || []).length;
  if (open !== close) return `unbalanced \\( (${open}) vs \\) (${close})`;
  return null;
}

/**
 * Self-heal recurring transcription-agent quirks before buildRecords:
 *  - `options` emitted as an object `{ "1": "...", ... }` instead of an ordered array
 *  - difficulty synonyms / casing ("medium", "easy") instead of EASY|MODERATE|HARD
 *  - `answer` in any booklet form → the A|B|C|D letter
 */
export function normalizeQuestions(raw: unknown[]): NQ[] {
  const diffMap: Record<string, string> = { easy: "EASY", moderate: "MODERATE", hard: "HARD", medium: "MODERATE" };
  return (raw as Record<string, unknown>[]).map((q) => {
    let options = q.options as unknown;
    if (options && !Array.isArray(options) && typeof options === "object") {
      // order by numeric key (1..4) so positional → A..D mapping stays correct
      options = Object.entries(options as Record<string, unknown>)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([, v]) => (typeof v === "string" ? v : ((v as { text?: string })?.text ?? "")));
    }
    const d = String(q.difficulty ?? "").trim();
    const difficulty = ["EASY", "MODERATE", "HARD"].includes(d.toUpperCase())
      ? d.toUpperCase()
      : (diffMap[d.toLowerCase()] ?? "MODERATE");
    const answer = parseAnswer(q.answer as string | number);
    return { ...(q as object), options, difficulty, answer } as NQ;
  });
}

export function buildRecords(questions: NQ[], questionCount = 180): BuildResult {
  const rows: RawRow[] = [];
  const flags: Flag[] = [];

  for (const q of questions) {
    // subject-block cross-check (catches a mis-tagged subject; the Biology block allows either)
    const allowed = allowedSubjectsForNumber(q.number, questionCount);
    if (allowed.length && q.subject && !allowed.includes(q.subject)) {
      flags.push({ number: q.number, reason: `subject "${q.subject}" not allowed for the Q${q.number} block (${allowed.join(" or ")})` });
    }
    // chapter must be in the subject's canonical catalog
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

/** Coverage + structural + collision checks over the assembled rows. */
export function validateRows(rows: RawRow[], qFrom: number, qTo: number): string[] {
  const errs: string[] = [];
  const nums = new Set(rows.map((r) => Number(r.questionNumber)));
  for (let n = qFrom; n <= qTo; n++) if (!nums.has(n)) errs.push(`missing Q${n}`);

  const seen = new Map<string, number>();
  for (const r of rows) {
    const opts = [r.optionA, r.optionB, r.optionC, r.optionD];
    const filled = opts.filter((o) => o && o.trim());
    if (filled.length !== 4) errs.push(`Q${r.questionNumber}: needs exactly 4 options (got ${filled.length} non-blank)`);
    if (opts.some((o) => !o || !o.trim())) errs.push(`Q${r.questionNumber}: blank option`);
    if (!["A", "B", "C", "D"].includes((r.answer || "").toUpperCase())) errs.push(`Q${r.questionNumber}: bad answer "${r.answer}"`);

    for (const [name, val] of [
      ["stem", r.question],
      ["A", r.optionA], ["B", r.optionB], ["C", r.optionC], ["D", r.optionD],
      ["sol", r.solution],
    ] as [string, string | undefined][]) {
      const bad = val ? findLatexImbalance(val) : null;
      if (bad) errs.push(`Q${r.questionNumber} ${name}: ${bad}`);
    }

    // content_hash mirror: normalized stem + SORTED options + answer (matches the DB hash)
    const key = [
      r.question.replace(/\s+/g, " ").trim(),
      ...opts.map((o) => (o || "").replace(/\s+/g, " ").trim()).sort(),
      (r.answer || "").toUpperCase(),
    ].join("\n");
    if (seen.has(key)) errs.push(`Q${r.questionNumber}: content_hash collision with Q${seen.get(key)}`);
    seen.set(key, Number(r.questionNumber));
  }
  return errs;
}
