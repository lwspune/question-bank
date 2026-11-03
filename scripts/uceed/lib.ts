/**
 * The pure core of the UCEED lane: one paper's transcription + IIT Bombay's final key ->
 * the rows the bank can store today, the rows it cannot yet (held, with the reason), and
 * every issue that must stop a commit. Spec: tests/uceed-lib.test.ts.
 *
 * Held, not dropped: an MSQ (the bank has no multiple-select format) and a NAT keyed as a
 * RANGE (questions.numeric_answer holds one exact value). Both stay in the transcription
 * and commit when the bank can hold them (README "Held rows").
 *
 * The key is IIT Bombay's own, published as final, so it is the answer of record: a
 * question is never committed on anything else.
 */
import { numericContentHash } from "../../src/lib/upload/hash";
import type { ParsedRowPayload } from "../../src/lib/upload/validate";
import { figureAwareHash } from "../ssc-cgl/figures";
import type { CommitRow } from "../ssc-cgl/rows";

export type Section = "NAT" | "MSQ" | "MCQ";
type Letter = "A" | "B" | "C" | "D";

export type UceedQuestion = {
  n: number;
  type: Section;
  text: string;
  /** A-D for MCQ/MSQ; "[figure]" when the options are drawn inside the figure. Empty for NAT. */
  options: { label: string; text: string }[];
  /** The question carries one figure (figures/<year>/Q<nn>.png). */
  figure: boolean;
  /** "none" once a person has looked at a figure the watermark gate flags (blue by content). */
  watermark?: "none";
  subject: string | null;
  chapter: string | null;
  subtopic: string | null;
  difficulty: string | null;
  solution: string | null;
};
export type UceedPaper = { year: number; questions: UceedQuestion[] };

export type KeyEntry =
  | { n: number; type: "MCQ"; value: string }
  | { n: number; type: "NAT"; value: number }
  | { n: number; type: "NAT"; range: [number, number] }
  | { n: number; type: "MSQ"; sets: string[][] };
export type UceedKey = { year: number; answers: KeyEntry[] };

type Editorial = { subject: string; chapter: string; subtopic: string; difficulty: string; solution: string };
export type PlannedRow = Editorial & { n: number; text: string; figure: boolean } & (
    | { format: "mcq"; options: { label: Letter; text: string }[]; answer: Letter }
    | { format: "numeric"; numericAnswer: number }
  );
export type HeldReason = "msq" | "range";
export type Plan = { rows: PlannedRow[]; held: { n: number; reason: HeldReason }[]; issues: string[] };

const FIGURE_OPTION = "[figure]";
const LETTERS: Letter[] = ["A", "B", "C", "D"];
/** The owner's no-dash rule for visible text, the same tell as scripts/lib/voiceProbe.ts
 *  (a plain " - " stays legal: it is a minus sign in "100 - 64"). */
const DASH = /—| – | -- /;
const DIFFICULTY = { easy: "EASY", moderate: "MODERATE", hard: "HARD" } as const;

export function planPaper(paper: UceedPaper, key: UceedKey): Plan {
  const issues: string[] = [];
  const rows: PlannedRow[] = [];
  const held: Plan["held"] = [];
  const byN = new Map(key.answers.map((a) => [a.n, a]));

  for (const q of paper.questions) {
    const k = byN.get(q.n);
    if (!k) {
      issues.push(`Q${q.n}: not in the key`);
      continue;
    }
    if (k.type !== q.type) {
      issues.push(`Q${q.n}: paper says ${q.type}, key says ${k.type}`);
      continue;
    }
    const before = issues.length;
    if (q.type !== "NAT" && q.options.map((o) => o.label).join() !== LETTERS.join()) {
      issues.push(`Q${q.n}: options must be A, B, C, D`);
    }
    if (q.options.some((o) => o.text === FIGURE_OPTION) && !q.figure) {
      issues.push(`Q${q.n}: options are in the figure but the question has no figure`);
    }
    for (const field of ["subject", "chapter", "subtopic", "difficulty", "solution"] as const) {
      if (!q[field]?.trim()) issues.push(`Q${q.n}: no ${field}`);
    }
    if (q.difficulty?.trim() && !(q.difficulty.trim().toLowerCase() in DIFFICULTY)) {
      issues.push(`Q${q.n}: difficulty must be Easy, Moderate or Hard`);
    }
    if (q.solution && DASH.test(q.solution)) issues.push(`Q${q.n}: solution has a dash, write a full stop or comma`);
    if (issues.length > before) continue;

    if (k.type === "MSQ") {
      held.push({ n: q.n, reason: "msq" });
      continue;
    }
    if (k.type === "NAT" && "range" in k) {
      held.push({ n: q.n, reason: "range" });
      continue;
    }
    const editorial = q as UceedQuestion & Editorial;
    const base = {
      n: q.n,
      text: q.text,
      figure: q.figure,
      subject: editorial.subject,
      chapter: editorial.chapter,
      subtopic: editorial.subtopic,
      difficulty: editorial.difficulty.trim(),
      solution: editorial.solution.trim(),
    };
    if (k.type === "NAT") {
      rows.push({ ...base, format: "numeric", numericAnswer: k.value });
      continue;
    }
    if (!LETTERS.includes(k.value as Letter)) {
      issues.push(`Q${q.n}: key "${k.value}" is not A-D`);
      continue;
    }
    rows.push({
      ...base,
      format: "mcq",
      options: q.options.map((o) => ({ label: o.label as Letter, text: o.text })),
      answer: k.value as Letter,
    });
  }
  const transcribed = new Set(paper.questions.map((q) => q.n));
  for (const a of key.answers) if (!transcribed.has(a.n)) issues.push(`Q${a.n}: in the key but not transcribed`);
  return { rows, held, issues };
}

/** An MCQ row in the shape SSC CGL's parseCommitRows takes (picture options stay "[figure]"). */
export function toCommitRow(row: PlannedRow, figurePath: string | null): CommitRow {
  if (row.format !== "mcq") throw new Error(`Q${row.n}: toCommitRow takes an MCQ`);
  const opt = (l: Letter) => row.options.find((o) => o.label === l)!.text;
  return {
    sourceRow: row.n,
    questionNumber: String(row.n),
    subject: row.subject,
    chapter: row.chapter,
    subtopic: row.subtopic,
    question: row.text,
    optionA: opt("A"),
    optionB: opt("B"),
    optionC: opt("C"),
    optionD: opt("D"),
    answer: row.answer,
    difficulty: row.difficulty,
    solution: row.solution,
    flawed: false,
    figures: { stem: figurePath, options: null },
  };
}

/**
 * A NAT row's payload. Hashed like every NAT (numericContentHash, answer excluded so a
 * key correction keeps the row's id), then with the figure's bytes folded in: UCEED asks
 * "How many ...?" of a different picture every year, and text alone would merge them.
 */
export function numericPayload(row: PlannedRow, figure: Buffer | null): ParsedRowPayload {
  if (row.format !== "numeric") throw new Error(`Q${row.n}: numericPayload takes a NAT`);
  const textHash = numericContentHash(row.text, null);
  return {
    sourceRow: row.n,
    questionNumber: String(row.n),
    subjectName: row.subject,
    chapterName: row.chapter,
    subtopicName: row.subtopic,
    text: row.text,
    difficulty: DIFFICULTY[row.difficulty.toLowerCase() as keyof typeof DIFFICULTY],
    solution: row.solution,
    questionFormat: "numeric",
    numericAnswer: row.numericAnswer,
    options: [],
    contentHash: figure ? figureAwareHash(textHash, [figure]) : textHash,
  };
}
