/**
 * Pure core of the MPSC Group B & C ingestion — no I/O, all unit-tested
 * (tests/mpsc-lib.test.ts).
 *
 * Every MPSC question is printed TWICE, Marathi then English, and the booklet's
 * own instruction 4(b) says that where the two disagree through a printing
 * error the candidate should consult the other version — neither language is
 * declared authoritative. That makes the pair a free independent check on the
 * transcription: `parityIssues` compares the structure and every number of the
 * two versions, so a misread digit or a dropped statement in EITHER language
 * surfaces as a disagreement. It is triage, not a verdict — a real printing
 * error in the booklet trips it too, and that is worth knowing as well.
 */

export type Lang = "en" | "mr";
export type KeyLetter = "A" | "B" | "C" | "D" | "#";

export type Version = {
  stem: string;
  context?: string;
  options: string[];
};

/** One transcribed question: shared metadata plus both printed versions. */
export type BilingualQuestion = {
  n: number;
  subject: string;
  chapter: string;
  subtopic: string;
  difficulty: "EASY" | "MODERATE" | "HARD";
  en: Version;
  mr: Version;
  /**
   * The question depends on a printed figure. `box` is [x0, y0, x1, y1] in pixels
   * of the 130-dpi page render (extract.py render), on PDF page `page`. Only a
   * figure with NO language-specific text is cropped — one image serves both
   * versions. A chart whose labels are words (a pie chart of expenses) is
   * transcribed as a table in each language instead, so it stays answerable
   * and readable in either.
   */
  figure?: { page: number; box: [number, number, number, number] };
};

const DEVANAGARI_ZERO = 0x0966;

export function devanagariDigitsToAscii(s: string): string {
  return s.replace(/[०-९]/g, (d) => String(d.charCodeAt(0) - DEVANAGARI_ZERO));
}

/**
 * Every number in a string as a sorted multiset, script-neutral: Devanagari
 * digits are converted, and thousands separators dropped so `1,000` and `1000`
 * agree. Decimals stay whole.
 */
export function numberBag(s: string): string[] {
  const ascii = devanagariDigitsToAscii(s);
  const hits = ascii.match(/\d+(?:,\d{2,3})*(?:\.\d+)?/g) ?? [];
  return hits.map((h) => h.replace(/,/g, "")).sort();
}

const ANSWER: Record<string, KeyLetter> = { "1": "A", "2": "B", "3": "C", "4": "D", "#": "#" };

/**
 * Parse an MPSC answer-key token stream. The key prints one row per question —
 * `q, setA, setB, setC, setD`, answers as 1-4 — in two columns that interleave
 * in the text layer, so rows are keyed by their own number, never by position.
 * `#` marks a question the Commission cancelled. Nothing is guessed: an
 * unreadable token or a duplicate row is reported and the row dropped.
 */
export function parseKeyTokens(tokens: string[]): {
  rows: Map<number, KeyLetter[]>;
  errors: string[];
} {
  const clean = tokens.map((t) => t.trim()).filter((t) => t !== "");
  const rows = new Map<number, KeyLetter[]>();
  const errors: string[] = [];

  let i = 0;
  for (; i + 5 <= clean.length; i += 5) {
    const [qTok, ...ans] = clean.slice(i, i + 5);
    const q = Number(qTok);
    if (!Number.isInteger(q) || q < 1) {
      errors.push(`bad question number token: ${qTok}`);
      continue;
    }
    const bad = ans.filter((a) => !(a in ANSWER));
    if (bad.length) {
      errors.push(`Q${q}: unreadable answer token(s) ${bad.join(" ")}`);
      continue;
    }
    if (rows.has(q)) {
      errors.push(`Q${q}: appears twice`);
      continue;
    }
    rows.set(q, ans.map((a) => ANSWER[a]));
  }
  if (i < clean.length) errors.push(`trailing partial group: ${clean.slice(i).join(" ")}`);
  return { rows, errors };
}

/**
 * Parse a key from its printed LINES (words grouped by y-position, sorted by x).
 * A flat token stream is not safe: the text layer's column order differs from
 * key to key, so groups of five straddle rows. A line holds one or two whole
 * `q A B C D` groups; a line of 1-2 tokens is a page-number footer and is set
 * aside (returned in `ignored` so it stays visible); any other length means a
 * cell was lost, and the line is refused rather than let it shift the answers.
 */
export function parseKeyLines(lines: string[][]): {
  rows: Map<number, KeyLetter[]>;
  errors: string[];
  ignored: string[][];
} {
  const groups: string[] = [];
  const errors: string[] = [];
  const ignored: string[][] = [];
  lines.forEach((raw, i) => {
    const line = raw.map((t) => t.trim()).filter((t) => t !== "");
    if (line.length === 0) return;
    if (line.length <= 2) {
      ignored.push(line);
      return;
    }
    if (line.length % 5 !== 0) {
      errors.push(`line ${i + 1} has ${line.length} tokens (not a multiple of 5): ${line.join(" ")}`);
      return;
    }
    groups.push(...line);
  });
  const parsed = parseKeyTokens(groups);
  return { rows: parsed.rows, errors: [...errors, ...parsed.errors], ignored };
}

const fmt = (bag: string[]) => `[${bag.join(",")}]`;
const sameBag = (a: string[], b: string[]) => a.length === b.length && a.every((v, k) => v === b[k]);
const lineCount = (s: string) => s.split("\n").filter((l) => l.trim() !== "").length;

/** Structural + numeric disagreements between the English and Marathi versions. */
export function parityIssues(q: BilingualQuestion): string[] {
  const out: string[] = [];
  const { en, mr } = q;

  for (const [lang, v] of [["en", en], ["mr", mr]] as const) {
    if (v.options.length !== 4) out.push(`${lang} has ${v.options.length} options, expected 4`);
  }

  if (Boolean(en.context) !== Boolean(mr.context)) {
    out.push(`context present in ${en.context ? "en" : "mr"} only`);
  } else if (en.context && mr.context) {
    const a = numberBag(en.context);
    const b = numberBag(mr.context);
    if (!sameBag(a, b)) out.push(`context numbers differ: en ${fmt(a)} mr ${fmt(b)}`);
  }

  const se = numberBag(en.stem);
  const sm = numberBag(mr.stem);
  if (!sameBag(se, sm)) out.push(`stem numbers differ: en ${fmt(se)} mr ${fmt(sm)}`);

  const le = lineCount(en.stem);
  const lm = lineCount(mr.stem);
  if (le !== lm) out.push(`stem line count differs: en ${le}, mr ${lm}`);

  const n = Math.min(en.options.length, mr.options.length);
  for (let k = 0; k < n; k++) {
    const a = numberBag(en.options[k]);
    const b = numberBag(mr.options[k]);
    if (!sameBag(a, b)) out.push(`option ${"ABCD"[k]} numbers differ: en ${fmt(a)} mr ${fmt(b)}`);
  }
  return out;
}

/** The upload-row shape commitStaged validates (src/lib/upload/validate.ts RawRow). */
export type MpscRow = {
  sourceRow: number;
  questionNumber: string;
  subject: string;
  chapter: string;
  subtopic: string;
  context?: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: "A" | "B" | "C" | "D" | "CANCELLED";
  difficulty: string;
  cancelledNote?: string;
};

/**
 * English rows for commitStaged, keyed from the Set-A letter. The ENGLISH
 * version is the canonical row (hash, key, search); Marathi is written after
 * the commit as a translation of it.
 *
 * A question the Commission CANCELLED (`#` in the final key) is KEPT — it was
 * printed and sat — as a `CANCELLED` row carrying `cancelledNote`, with no
 * option marked correct (migration 0119 enforces that at the DB). Its number is
 * also returned in `cancelled`. A question the key does not cover at all is an
 * error — that is a transcription or key defect.
 */
export function buildRecords(
  questions: BilingualQuestion[],
  key: Record<number, KeyLetter>,
  cancelledNote = "Cancelled by MPSC in its final answer key. No option is correct."
): { rows: MpscRow[]; cancelled: number[]; errors: string[] } {
  const rows: MpscRow[] = [];
  const cancelled: number[] = [];
  const errors: string[] = [];
  for (const q of questions) {
    const k = key[q.n];
    if (!k) {
      errors.push(`Q${q.n}: no key entry`);
      continue;
    }
    if (k === "#") cancelled.push(q.n);
    const [a, b, c, d] = q.en.options;
    rows.push({
      sourceRow: q.n,
      questionNumber: String(q.n),
      subject: q.subject,
      chapter: q.chapter,
      subtopic: q.subtopic,
      ...(q.en.context ? { context: q.en.context } : {}),
      question: q.en.stem,
      optionA: a,
      optionB: b,
      optionC: c,
      optionD: d,
      answer: k === "#" ? "CANCELLED" : k,
      difficulty: q.difficulty,
      ...(k === "#" ? { cancelledNote } : {}),
    });
  }
  return { rows, cancelled, errors };
}
