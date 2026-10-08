/**
 * IMAT pipeline, pure core (spec tests/imat-lib.test.ts).
 *
 * TWO KEY MODES (keyModeFor).
 * - "printed-a", the ministry's papers (2023+): the correct answer is printed
 *   as option A in every question (each paper says so). The transcription
 *   keeps PRINTED order, A first; this module marks A correct and shuffles.
 * - "printed-key", Cambridge's papers (2011-2022): the answer key is printed
 *   at the back, the answers are spread across A-E already, and the printed
 *   order is kept. Each question carries its keyed letter in `answer`.
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

/**
 * A paper's shape: its blocks in printed order, each with the sections its
 * questions may be filed under and how many questions it holds. Cambridge's
 * first block ("General Knowledge and Logical Reasoning") is split by
 * question into reading or logic, as "Physics and Mathematics" is by subject.
 */
export type ShapeBlock = { sections: readonly ImatSection[]; count: number };

/** The ministry's shape, the same in 2023, 2024, 2025 and 2026 (60 in all). */
export const MUR_SHAPE: readonly ShapeBlock[] = [
  { sections: ["reading"], count: 4 },
  { sections: ["logic"], count: 5 },
  { sections: ["biology"], count: 23 },
  { sections: ["chemistry"], count: 15 },
  { sections: ["physmath"], count: 13 },
];

/** Confirmed shapes. A Cambridge year is added once read off its paper. */
/** Cambridge 2015-2020 (60 q): General Knowledge and Logical Reasoning 22 · Biology 18 · Chemistry 12 · Physics and Mathematics 8. */
const CAMBRIDGE_60: readonly ShapeBlock[] = [
  { sections: ["reading", "logic"], count: 22 },
  { sections: ["biology"], count: 18 },
  { sections: ["chemistry"], count: 12 },
  { sections: ["physmath"], count: 8 },
];

export const PAPER_SHAPES: Record<number, readonly ShapeBlock[]> = {
  // 2014 alone: 23 logic + 4 general knowledge, 15 biology, 10 chemistry, 8 physics and maths.
  2014: [
    { sections: ["reading", "logic"], count: 27 },
    { sections: ["biology"], count: 15 },
    { sections: ["chemistry"], count: 10 },
    { sections: ["physmath"], count: 8 },
  ],
  2015: CAMBRIDGE_60,
  2016: CAMBRIDGE_60,
  2017: CAMBRIDGE_60,
  2018: CAMBRIDGE_60,
  2019: CAMBRIDGE_60,
  2020: CAMBRIDGE_60,
  // 2022: 10 logic + 10 general knowledge, 15 biology, 15 chemistry, 10 physics and maths.
  2022: [
    { sections: ["reading", "logic"], count: 20 },
    { sections: ["biology"], count: 15 },
    { sections: ["chemistry"], count: 15 },
    { sections: ["physmath"], count: 10 },
  ],
  2023: MUR_SHAPE,
  2024: MUR_SHAPE,
  2025: MUR_SHAPE,
  2026: MUR_SHAPE,
};

export type KeyMode = "printed-a" | "printed-key";

/**
 * 2022 was set by Cambridge, but the only copy we hold is laid out the
 * ministry's way: the correct answer is option A in every question. It
 * prints no key and does not say so, so this rests on solving each of its
 * 60 questions (every one came out A), recorded in data/2022.questions.json.
 */
const PRINTED_A_YEARS: ReadonlySet<number> = new Set([2022]);

export function keyModeFor(year: number): KeyMode {
  return year >= 2023 || PRINTED_A_YEARS.has(year) ? "printed-a" : "printed-key";
}

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

/** One question as transcribed, options in PRINTED order (on a ministry paper, options[0] is correct). */
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
  /** The paper itself repeats a distractor (2025 Q51); kept as printed, by name. */
  duplicateOptionsAsPrinted?: boolean;
  /** Free-text provenance note for a person reading the data. Not stored. */
  note?: string;
  /** The question needs a figure attached from this page of the paper. */
  figure?: { page: number; note: string; file?: string };
  /** Cambridge papers only: the printed key's letter. */
  answer?: StoredOptionLabel;
  /** The options are pictures: text stays empty, one image per option. */
  optionImages?: boolean;
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
  const mode = keyModeFor(year);
  if (mode === "printed-a" && q.answer) {
    throw new Error(`${where}: a ministry paper's key is printed A; remove the answer field`);
  }
  if (mode === "printed-key" && !q.answer) {
    throw new Error(`${where}: a Cambridge question needs its printed key in the answer field`);
  }
  const correctIndex = mode === "printed-a" ? 0 : LABELS.indexOf(q.answer!);
  const printed = q.options.map((o) => o.trim());
  if (q.optionImages) {
    if (printed.some((o) => o.length > 0)) throw new Error(`${where}: picture options keep empty text`);
  } else {
    if (printed.some((o) => o.length === 0)) throw new Error(`${where}: an empty option`);
    if (printed.some((o, i) => i !== correctIndex && o === printed[correctIndex])) {
      throw new Error(`${where}: the correct option is duplicated, so the key would be ambiguous`);
    }
    if (new Set(printed).size !== printed.length && !q.duplicateOptionsAsPrinted) {
      throw new Error(`${where}: duplicate options`);
    }
  }
  refuseLiteralNewline(`${where} text`, q.text);
  refuseLiteralNewline(`${where} context`, q.context);
  printed.forEach((o, i) => refuseLiteralNewline(`${where} option ${i + 1}`, o));

  const order = mode === "printed-a" ? shuffleOrder(seedFor(year, q.n)) : [0, 1, 2, 3, 4];
  const options = order.map((printedIndex, k) => ({
    label: LABELS[k],
    text: printed[printedIndex],
    isCorrect: printedIndex === correctIndex,
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

/**
 * Whole-paper checks: numbers 1..N once each, and every question inside the
 * block its number falls in, filed under one of that block's sections.
 * `shape` defaults to the year's confirmed shape; a year without one is refused.
 */
export function validatePaper(
  year: number,
  questions: readonly ImatQuestion[],
  shape: readonly ShapeBlock[] | undefined = PAPER_SHAPES[year]
): string[] {
  if (!shape) return [`${year}: no confirmed shape; read it off the paper and add it to PAPER_SHAPES`];
  const errors: string[] = [];
  const total = shape.reduce((a, b) => a + b.count, 0);
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
  for (const q of questions) {
    let start = 1;
    for (const block of shape) {
      if (q.n >= start && q.n < start + block.count) {
        if (!block.sections.includes(q.section)) {
          errors.push(`Q${q.n}: filed as ${q.section}, but its block holds ${block.sections.join("/")}`);
        }
        break;
      }
      start += block.count;
    }
  }
  return errors;
}
