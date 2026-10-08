/**
 * IMAT pipeline, pure core (spec tests/imat-lib.test.ts).
 *
 * THE KEY. The ministry (MUR) prints the correct answer as option A in every
 * question: the 2023 paper says so on its last page, and 2025 and 2026
 * highlight A in all 60 questions. So the transcription keeps the options in
 * PRINTED order, A first, and this module marks A correct and then shuffles.
 *
 * THE SHUFFLE IS FROZEN. `shuffleOrder` decides which letter each printed
 * option is shown under, and `content_hash` includes the answer letter. If the
 * algorithm or the seed format ever changes, every IMAT row hashes differently
 * and a re-run duplicates the whole corpus. Change it only together with a
 * deliberate re-ingest.
 */
import { createHash } from "node:crypto";
import { contentHash } from "../../src/lib/upload/hash";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import type { ParsedRowPayload, StoredOptionLabel } from "../../src/lib/upload/validate";

export type ImatSection = "reading" | "logic" | "biology" | "chemistry" | "physmath";

/** Questions per section, the same in 2023, 2024, 2025 and 2026 (60 in all). */
export const SECTION_COUNTS: Record<ImatSection, number> = {
  reading: 4,
  logic: 5,
  biology: 23,
  chemistry: 15,
  physmath: 13,
};

/** The section headings as printed on the paper. */
export const SECTION_TITLES: Record<ImatSection, string> = {
  reading: "Reading skills and knowledge acquired during studies",
  logic: "Logical reasoning and problem-solving",
  biology: "Biology",
  chemistry: "Chemistry",
  physmath: "Physics and Mathematics",
};

/** Bank subjects. "Physics and Mathematics" is split by question (owner, 2026-10-08). */
export const SUBJECT_OF_SECTION: Record<Exclude<ImatSection, "physmath">, string> = {
  reading: "Reading Skills and General Knowledge",
  logic: "Logical Reasoning and Problem Solving",
  biology: "Biology",
  chemistry: "Chemistry",
};

export const SUBJECTS: readonly string[] = [
  "Reading Skills and General Knowledge",
  "Logical Reasoning and Problem Solving",
  "Biology",
  "Chemistry",
  "Physics",
  "Mathematics",
];

/** One question as transcribed: options in PRINTED order, so options[0] is correct. */
export type ImatQuestion = {
  n: number;
  section: ImatSection;
  /** Required for section "physmath"; ignored otherwise. */
  subject?: "Physics" | "Mathematics";
  chapter: string;
  subtopic?: string;
  context?: string;
  text: string;
  options: string[];
};

const LABELS: readonly StoredOptionLabel[] = ["A", "B", "C", "D", "E"];

/**
 * A fixed permutation of [0..4] for a seed: entry k is the PRINTED index of
 * the option shown under letter k. Fisher-Yates driven by sha256(seed) bytes.
 */
export function shuffleOrder(seed: string): number[] {
  const bytes = createHash("sha256").update(seed).digest();
  const order = [0, 1, 2, 3, 4];
  for (let i = order.length - 1, k = 0; i > 0; i--, k++) {
    const j = bytes[k] % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export function seedFor(year: number, n: number): string {
  return `imat:${year}:${n}`;
}

function refuseLiteralNewline(where: string, value: string | undefined): void {
  if (value && normalizeNewlines(value) !== value) {
    throw new Error(`${where}: literal backslash-n in the text; fix the transcription`);
  }
}

export function subjectOf(q: ImatQuestion): string {
  if (q.section !== "physmath") return SUBJECT_OF_SECTION[q.section];
  if (q.subject !== "Physics" && q.subject !== "Mathematics") {
    throw new Error(`Q${q.n}: a Physics and Mathematics question needs subject Physics or Mathematics`);
  }
  return q.subject;
}

/** One transcribed question -> the row commitStaged stores. */
export function buildRow(year: number, q: ImatQuestion): ParsedRowPayload {
  const where = `${year} Q${q.n}`;
  if (q.options.length !== 5) {
    throw new Error(`${where}: IMAT questions have five options, got ${q.options.length}`);
  }
  const printed = q.options.map((o) => o.trim());
  if (printed.some((o) => o.length === 0)) throw new Error(`${where}: an empty option`);
  if (new Set(printed).size !== printed.length) throw new Error(`${where}: duplicate options`);
  refuseLiteralNewline(`${where} text`, q.text);
  refuseLiteralNewline(`${where} context`, q.context);
  printed.forEach((o, i) => refuseLiteralNewline(`${where} option ${i + 1}`, o));

  const order = shuffleOrder(seedFor(year, q.n));
  const options = order.map((printedIndex, k) => ({
    label: LABELS[k],
    text: printed[printedIndex],
    isCorrect: printedIndex === 0,
  }));
  const answer = options.find((o) => o.isCorrect)!.label;
  const text = q.text.trim();

  return {
    sourceRow: q.n,
    questionNumber: String(q.n),
    subjectName: subjectOf(q),
    chapterName: q.chapter,
    subtopicName: q.subtopic,
    context: q.context?.trim() || undefined,
    text,
    // IMAT publishes no difficulty; MODERATE is the bank's neutral value.
    difficulty: "MODERATE",
    options,
    contentHash: contentHash(text, options.map((o) => o.text), answer),
  };
}

/** Whole-paper checks: numbers 1..60 once each, and the official section shape. */
export function validatePaper(questions: readonly ImatQuestion[]): string[] {
  const errors: string[] = [];
  const total = Object.values(SECTION_COUNTS).reduce((a, b) => a + b, 0);
  const seen = new Map<number, number>();
  for (const q of questions) seen.set(q.n, (seen.get(q.n) ?? 0) + 1);
  for (let n = 1; n <= total; n++) {
    const c = seen.get(n) ?? 0;
    if (c === 0) errors.push(`question ${n} is missing`);
    if (c > 1) errors.push(`question ${n} appears ${c} times`);
  }
  for (const n of seen.keys()) {
    if (n < 1 || n > total) errors.push(`question ${n} is outside 1..${total}`);
  }
  for (const [section, want] of Object.entries(SECTION_COUNTS)) {
    const got = questions.filter((q) => q.section === section).length;
    if (got !== want) errors.push(`section ${section}: ${got} questions, the paper has ${want}`);
  }
  return errors;
}
