/**
 * The English word games' words (2026-11-17): every word is a real
 * past-year synonym or antonym question from the bank, used as it is (its
 * options, its key, its stored explanation). Nothing is written by hand.
 *
 * Pure: scripts/play/build-words.ts reads the bank and calls these to write
 * public/data/play-words.json, which the games fetch. Spec:
 * tests/play-words-extract.test.ts.
 */

export type WordKind = "synonym" | "antonym";
export type WordGroup = "ssc" | "nda" | "cds" | "other";

/** One bank row as the build script reads it. */
export type BankWordRow = {
  id: string;
  text: string;
  context: string | null;
  subtopic: string;
  exam: string;
  pyqYear: number | null;
  pyqNote: string | null;
  solution: string | null;
  options: { label: string; text: string; isCorrect: boolean }[];
};

/** One playable word, as stored in the games' word file. */
export type WordEntry = {
  /** The question's id. */
  id: string;
  /** Lower case, letters only. */
  word: string;
  kind: WordKind;
  group: WordGroup;
  exam: string;
  year: number | null;
  note: string | null;
  /** The question's sentence, when it has one beyond the word itself. */
  sentence: string | null;
  /** Option texts in label order (A, B, C, D[, E]). */
  options: string[];
  /** Index of the right option. */
  answer: number;
  solution: string;
};

const WORD = /^[A-Za-z]+$/;

/** The single word a synonym/antonym stem asks about, or null. */
export function extractHeadword(text: string): string | null {
  const found = new Set<string>();
  const add = (w: string) => found.add(w.trim());

  for (const m of text.matchAll(/\\underline\{\\text(?:it)?\{([^{}]*)\}\}/g)) add(m[1]);
  for (const m of text.matchAll(/\*\*([^*]+)\*\*/g)) add(m[1]);
  for (const m of text.matchAll(/([A-Za-z]+)\s*\[underlined\]/g)) add(m[1]);

  if (found.size === 0) {
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
    const last = lines[lines.length - 1];
    if (lines.length > 1 && last && WORD.test(last)) add(last);
  }

  const words = [...found];
  if (words.length !== 1) {
    // The same word marked twice is still one word.
    const lower = new Set(words.map((w) => w.toLowerCase()));
    if (words.length === 0 || lower.size !== 1) return null;
  }
  const w = words[0];
  return WORD.test(w) ? w : null;
}

/** Synonym or antonym: the stem first, then the directions, then the subtopic. */
export function wordKind(text: string, context: string | null, subtopic: string): WordKind | null {
  const decide = (s: string): WordKind | null => {
    const anti = /\bantonym|opposite/i.test(s);
    const syn = /\bsynonym|nearest in meaning|closest in meaning|similar in meaning|same in meaning|same meaning|meaning of the/i.test(s);
    if (anti && !syn) return "antonym";
    if (syn && !anti) return "synonym";
    return null;
  };
  return decide(text) ?? (context ? decide(context) : null) ?? decide(subtopic);
}

export function examGroup(exam: string): WordGroup {
  if (/^SSC\b/.test(exam)) return "ssc";
  if (exam === "NDA") return "nda";
  if (exam === "CDS") return "cds";
  return "other";
}

const INSTRUCTION = /^(select|identify|choose|which|pick|find|in the following)/i;

/**
 * The sentence the word sits in, without the instruction line; null when the
 * stem is only an instruction and the word.
 */
export function promptSentence(text: string): string | null {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const rest = lines.filter((l, i) => !(i === 0 && lines.length > 1 && INSTRUCTION.test(l)));
  if (rest.length === 0) return null;
  const joined = rest.join(" ");
  if (lines.length === 1 && INSTRUCTION.test(joined)) return null;
  // Only the word left (bare or bold): nothing to show beyond it.
  if (/^\**[A-Za-z]+\**$/.test(joined)) return null;
  // Some NDA stems mark the word in words: draw it underlined like the rest.
  return joined.replace(/([A-Za-z]+)\s*\[underlined\]/g, "\\(\\underline{\\text{$1}}\\)");
}

export function toWordEntry(row: BankWordRow): WordEntry | null {
  const head = extractHeadword(row.text);
  if (!head) return null;
  const kind = wordKind(row.text, row.context, row.subtopic);
  if (!kind) return null;
  const solution = row.solution?.trim();
  if (!solution) return null;

  const opts = [...row.options].sort((a, b) => a.label.localeCompare(b.label));
  if (opts.length < 4 || opts.length > 5) return null;
  if (opts.some((o) => !o.text.trim())) return null;
  const right = opts.flatMap((o, i) => (o.isCorrect ? [i] : []));
  if (right.length !== 1) return null;

  return {
    id: row.id,
    word: head.toLowerCase(),
    kind,
    group: examGroup(row.exam),
    exam: row.exam,
    year: row.pyqYear,
    note: row.pyqNote,
    sentence: promptSentence(row.text),
    options: opts.map((o) => o.text.trim()),
    answer: right[0],
    solution,
  };
}

/** One entry per word: the most recent paper's question (then the lowest id), sorted by word. */
export function dedupeWords(entries: WordEntry[]): WordEntry[] {
  const best = new Map<string, WordEntry>();
  for (const e of entries) {
    const cur = best.get(e.word);
    if (
      !cur ||
      (e.year ?? 0) > (cur.year ?? 0) ||
      ((e.year ?? 0) === (cur.year ?? 0) && e.id < cur.id)
    ) {
      best.set(e.word, e);
    }
  }
  return [...best.values()].sort((a, b) => (a.word < b.word ? -1 : a.word > b.word ? 1 : 0));
}

const KINDS: WordKind[] = ["synonym", "antonym"];
const GROUPS: WordGroup[] = ["ssc", "nda", "cds", "other"];

function isEntry(v: unknown): v is WordEntry {
  if (typeof v !== "object" || v === null) return false;
  const e = v as Record<string, unknown>;
  const str = (x: unknown) => typeof x === "string" && x.length > 0;
  const strOrNull = (x: unknown) => x === null || typeof x === "string";
  return (
    str(e.id) &&
    typeof e.word === "string" &&
    /^[a-z]+$/.test(e.word) &&
    KINDS.includes(e.kind as WordKind) &&
    GROUPS.includes(e.group as WordGroup) &&
    str(e.exam) &&
    (e.year === null || (typeof e.year === "number" && Number.isInteger(e.year))) &&
    strOrNull(e.note) &&
    strOrNull(e.sentence) &&
    Array.isArray(e.options) &&
    e.options.length >= 4 &&
    e.options.length <= 5 &&
    e.options.every(str) &&
    typeof e.answer === "number" &&
    Number.isInteger(e.answer) &&
    e.answer >= 0 &&
    e.answer < e.options.length &&
    str(e.solution)
  );
}

/** The downloaded word file's entries; null when it is not a v1 file at all. */
export function parseWordFile(json: unknown): WordEntry[] | null {
  if (typeof json !== "object" || json === null || Array.isArray(json)) return null;
  const f = json as Record<string, unknown>;
  if (f.v !== 1 || !Array.isArray(f.words)) return null;
  return f.words.filter(isEntry);
}
