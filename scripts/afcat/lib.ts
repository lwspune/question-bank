// Pure helpers for the AFCAT practice ingestion pipeline. No IO: the extract
// CLIs read the source files (pandoc for .docx, PyMuPDF for .pdf) and hand this
// module plain text. Unit-tested in tests/afcat-quiz-parse.test.ts.
//
// The LWS quizzes were written in at least five layouts — "1." / "Q1." / "1:"
// numbering, "(a)" / "a)" / "A)" option markers, options inline on the stem
// line, two to a line, or one to a line — and their answer keys in four more.
// One tolerant parser covers them all, because a per-file parser would be
// eight parsers that each only one file ever exercises.
import { normalizeDifficulty, planShuffles } from "../worksheets/lib";
import type { AfcatOverride } from "./overrides";

/**
 * One question as committed to data/<chapter>/<file>.source.json — the
 * transcription every later step reads, whichever group it came from. The
 * source's key and solution are kept as EVIDENCE: the blind pass never sees
 * them, and the shipped solution is authored, not copied.
 */
export type SourceRecord = {
  n: number; // printed question number
  stem: string;
  options: string[]; // exactly 4, printed order
  key: string | null; // the source's answer letter, if it prints one
  keyValue?: string; // what the source's key says in words beside the letter
  keySolution?: string; // the source's worked solution, if any
  difficulty?: string; // Group D: the sheet's own difficulty label (Easy / Medium / Hard)
  flags?: string[]; // extraction findings for the adjudicator
  section?: string; // Group B/C: the heading the question sits under
  pyq?: PyqSitting; // Group C: an AFCAT past-year question (ingested as question_kind pyq)
  figure?: { page: number; bbox: [number, number, number, number]; pad?: number }; // Group C: the book figure to crop (PDF points; pad defaults to 6)
};

export type SourceFile = { path: string; group: string; questions: SourceRecord[] };

export type QuizQuestion = {
  n: number; // printed question number
  stem: string;
  options: string[]; // exactly 4, positional A..D, in printed order
  answer?: string; // only when the quiz prints "Answer: X)" inline
};

export type QuizKeyEntry = {
  letter: string; // A..D
  value: string; // the answer TEXT the key states beside its letter ("" if none)
  solution: string; // the key's worked solution ("" if none)
};

// A question starts with a number at the start of a line: "1. ", "Q1. ", "Q.1 ", "1: ".
const Q_START = /^\s*(?:Q\.?\s*)?(\d{1,3})\s*[.:)]\s+(.*)$/;
// An option marker, at the start or after whitespace: "(a)" (a space after it is
// optional; the P&L quiz prints "(b)₹620") or a bare "a)" / "A)", which needs
// the space so that "a)b" inside a stem is not read as an option.
const OPTION_MARKER = /(^|\s)(?:\(([A-Da-d])\)|([A-Da-d])\)(?=\s))/g;
const ANSWER_LINE = /^\s*Answer\s*[:\-]\s*\(?([A-Da-d])\)?/i;
const RULE_LINE = /^\s*[-_=*]{3,}\s*$/;
const KEY_HEADING = /^\s*answer\s+key\b/i;
const TRAILING_DASH = /\s*[–—-]+\s*$/;

const squash = (s: string) => s.replace(/\s+/g, " ").trim();

type Marker = { letter: string; start: number; end: number };

/** Find the first A, B, C, D marker run (same case) in order. */
function findOptionRun(text: string): Marker[] | null {
  const markers: Marker[] = [];
  for (const m of text.matchAll(OPTION_MARKER)) {
    const start = (m.index ?? 0) + m[1].length;
    markers.push({ letter: m[2] ?? m[3], start, end: (m.index ?? 0) + m[0].length });
  }
  for (let i = 0; i < markers.length; i++) {
    const a = markers[i].letter;
    if (a !== "A" && a !== "a") continue;
    const want = a === "A" ? ["B", "C", "D"] : ["b", "c", "d"];
    const run = [markers[i]];
    let from = i + 1;
    for (const w of want) {
      const j = markers.findIndex((mk, k) => k >= from && mk.letter === w);
      if (j < 0) break;
      run.push(markers[j]);
      from = j + 1;
    }
    if (run.length === 4) return run;
  }
  return null;
}

/**
 * Split quiz text into questions. Numbering must run in sequence: a line that
 * starts with a number which is not the next question's number is treated as
 * a continuation of the current stem (a wrapped "40. minutes" must not become
 * question 40). Text before the first question (titles, a chatty preamble) is
 * ignored. A question whose four options cannot be found is reported in
 * `errors` and skipped, never guessed.
 */
export function parseQuizQuestions(text: string): { questions: QuizQuestion[]; errors: string[]; keyText: string } {
  type Block = { n: number; lines: string[]; answer?: string };
  const blocks: Block[] = [];
  let cur: Block | null = null;

  // A quiz may print its own key after an "ANSWER KEY" heading; everything from
  // there on is key, not question text (its "1. (c) 48" lines would otherwise
  // be read as a continuation of the last question).
  const all = text.split(/\r?\n/);
  const keyAt = all.findIndex((l) => KEY_HEADING.test(l));
  const keyText = keyAt < 0 ? "" : all.slice(keyAt + 1).join("\n");

  for (const raw of keyAt < 0 ? all : all.slice(0, keyAt)) {
    const m = raw.match(Q_START);
    if (m && (cur === null || Number(m[1]) === cur.n + 1)) {
      cur = { n: Number(m[1]), lines: [m[2]] };
      blocks.push(cur);
      continue;
    }
    if (!cur) continue;
    if (RULE_LINE.test(raw)) continue;
    const a = raw.match(ANSWER_LINE);
    if (a) {
      cur.answer = a[1].toUpperCase();
      continue;
    }
    cur.lines.push(raw);
  }

  const questions: QuizQuestion[] = [];
  const errors: string[] = [];
  for (const b of blocks) {
    const body = b.lines.join("\n");
    const run = findOptionRun(body);
    if (!run) {
      errors.push(`Q${b.n}: could not find four options A-D in order`);
      continue;
    }
    const stem = squash(body.slice(0, run[0].start)).replace(TRAILING_DASH, "");
    const options = run.map((mk, k) => {
      if (k < 3) return squash(body.slice(mk.end, run[k + 1].start));
      const lineEnd = body.indexOf("\n", mk.end);
      const tail = lineEnd < 0 ? "" : squash(body.slice(lineEnd));
      if (tail) errors.push(`Q${b.n}: text after option D ignored: "${tail.slice(0, 60)}"`);
      return squash(lineEnd < 0 ? body.slice(mk.end) : body.slice(mk.end, lineEnd));
    });
    const q: QuizQuestion = { n: b.n, stem, options };
    if (b.answer) q.answer = b.answer;
    questions.push(q);
  }
  return { questions, errors, keyText };
}

// "Q1. Answer: B) ...", "Question 1: Answer - B) ...", "Question 1 - ANSWER: C".
const KEY_HEADER = /^\s*(?:Q\.?|Question)\s*(\d{1,3})\s*[.:\-–]?\s*Answer\s*[:\-–]\s*\(?([A-Da-d])\)?\s*(.*)$/i;
const GRID_LINE = /^\s*(?:\d{1,3}\s+[A-D]\s*)+$/;

/**
 * Read an answer key in any of the four layouts the quiz keys use. Returns
 * question number -> {letter, value, solution}. `value` is the answer the key
 * states in words beside its letter, kept so the extractor can catch a key
 * whose letter and value disagree (the Mixtures key answers Q1 "B) 50 liters"
 * though no option is 50).
 */
export function parseQuizKey(text: string): Map<number, QuizKeyEntry> {
  const key = new Map<number, QuizKeyEntry>();
  const lines = text.split(/\r?\n/);

  type Open = { n: number; letter: string; value: string; head: string; body: string[] };
  let open: Open | null = null;
  const close = () => {
    if (!open) return;
    let value = open.value;
    const body: string[] = [];
    for (const l of open.body) {
      const a = l.match(/^\s*Answer\s*[:\-]\s*\(?([A-Da-d])\)\s*(.*)$/i);
      if (a) {
        if (!value) value = squash(a[2]);
        continue;
      }
      if (RULE_LINE.test(l) || !l.trim()) continue;
      body.push(l.trim());
    }
    const solution = [open.head, ...body].filter(Boolean).join("\n");
    key.set(open.n, { letter: open.letter, value, solution });
    open = null;
  };

  for (const l of lines) {
    const m = l.match(KEY_HEADER);
    if (m) {
      close();
      const rest = m[3].trim();
      const sep = rest.indexOf(" - ");
      open = {
        n: Number(m[1]),
        letter: m[2].toUpperCase(),
        value: squash(sep < 0 ? rest : rest.slice(0, sep)),
        head: sep < 0 ? "" : rest.slice(sep + 3).trim(),
        body: [],
      };
      continue;
    }
    if (open) open.body.push(l);
  }
  close();

  // "1.  (c) 48" — one entry per line, as printed at the end of the Ratio quiz.
  if (key.size === 0) {
    for (const l of lines) {
      const m = l.match(/^\s*(\d{1,3})\s*[.)]\s*\(([a-dA-D])\)\s*(.*)$/);
      if (m) key.set(Number(m[1]), { letter: m[2].toUpperCase(), value: squash(m[3]), solution: "" });
    }
  }

  if (key.size === 0) {
    for (const l of lines) {
      if (!GRID_LINE.test(l)) continue;
      for (const m of l.matchAll(/(\d{1,3})\s+([A-D])\b/g)) {
        key.set(Number(m[1]), { letter: m[2], value: "", solution: "" });
      }
    }
  }
  return key;
}

// A solution naming an option by letter: "option C", "answer is B", "(b)".
// The keyword half ignores case; a bare letter must be a capital so the article
// "a" ("the answer is a multiple of 7") is not read as option A.
const LETTER_REF = [
  /(?:[Oo]ption|[Aa]nswer|[Cc]hoice)s?\s*(?:is\s+)?\(?[A-D]\)?(?![A-Za-z])/,
  /(?:^|[\s,;:])\([a-dA-D]\)(?=[\s.,;:]|$)/,
];
const CONTROL_CHAR = /[\x00-\x09\x0B\x0C\x0E-\x1F]/;
const DIFFICULTIES = new Set(["EASY", "MODERATE", "HARD"]);

/**
 * Check one pass-1 output file before it is merged. The solution field is
 * PUBLISHED, so it is held to the editorial contract in AGENT_BRIEF.md; the
 * id checks exist because an agent that drops a row and pads the tail keeps
 * the count right while every later verdict lands on the wrong question.
 */
export function validatePass1(
  verdicts: Record<string, unknown>[],
  packetIds: string[],
  subtopics: string[]
): string[] {
  const problems: string[] = [];
  const seen = new Map<string, number>();
  for (const v of verdicts) seen.set(String(v.id), (seen.get(String(v.id)) ?? 0) + 1);
  for (const id of packetIds) if (!seen.has(id)) problems.push(`${id}: missing from the agent output`);
  for (const [id, n] of seen) {
    if (!packetIds.includes(id)) problems.push(`${id}: not in the packet`);
    if (n > 1) problems.push(`${id}: appears more than once`);
  }

  for (const v of verdicts) {
    const id = String(v.id);
    const derived = String(v.derived ?? "");
    if (!/^[A-DX]$/.test(derived)) problems.push(`${id}: derived "${derived}" is not A-D or X`);
    if (!subtopics.includes(String(v.subtopic))) problems.push(`${id}: subtopic "${v.subtopic}" is not in the chapter list`);
    if (!DIFFICULTIES.has(String(v.difficulty))) problems.push(`${id}: difficulty "${v.difficulty}" is not EASY/MODERATE/HARD`);
    const sol = String(v.solution ?? "");
    if (!sol.trim()) problems.push(`${id}: solution is empty`);
    else {
      if (LETTER_REF.some((re) => re.test(sol))) problems.push(`${id}: solution names an option letter`);
      if (sol.includes("—")) problems.push(`${id}: solution contains an em dash`);
      if (CONTROL_CHAR.test(sol)) problems.push(`${id}: solution contains a control character (a LaTeX backslash was eaten)`);
    }
    if (derived === "X" && !String(v.note ?? "").trim()) {
      problems.push(`${id}: X needs a note saying what was computed or why the stem fails`);
    }
  }
  return problems;
}

const numbers = (s: string) =>
  (s.replace(/(\d),(?=\d{3}\b)/g, "$1").match(/\d+(?:\.\d+)?/g) ?? []).map(Number);
const words = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Does the key's stated value agree with the option its letter points at?
 * Compared on the NUMBERS each carries when the option has any (so "17.14
 * days" matches "17.14" and "Rs. 6,000" matches "Rs. 6,000"), otherwise on
 * the letters and digits alone.
 */
export function keyValueMatches(keyValue: string, optionText: string): boolean {
  const on = numbers(optionText);
  if (on.length) {
    const kn = numbers(keyValue);
    return kn.length === on.length && kn.every((x, i) => Math.abs(x - on[i]) < 1e-9);
  }
  const k = words(keyValue);
  const o = words(optionText);
  return !!k && !!o && (k.includes(o) || o.includes(k));
}

const UNIT_SUFFIX = /\s*(?:liters?|litres?|days?|kg|km\/hr|km\/h|m\/s|mph|km|m|cm|g|sec|seconds|hours?|hrs?|years?|minutes|mins?)\.?$/;
const DIRECTION_SUFFIX = /\s*(increase|decrease|profit|loss|gain)$/;
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

/** One number: an integer, decimal, fraction, or mixed number ("27 7/9"). */
function plainNumber(t: string): number | null {
  let m = t.match(/^(\d+(?:\.\d+)?)$/);
  if (m) return Number(m[1]);
  m = t.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
  if (m) return Number(m[1]) / Number(m[2]);
  m = t.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (m) return Number(m[1]) + Number(m[2]) / Number(m[3]);
  return null;
}

/** A sum of products of plain numbers ("6/10 × 5/9", "6/10 + 5/10"), or null. */
function numericValue(t: string): number | null {
  let total = 0;
  for (const term of t.split("+")) {
    let product = 1;
    for (const factor of term.split(/[×*]/)) {
      const v = plainNumber(factor.trim());
      if (v === null) return null;
      product *= v;
    }
    total += product;
  }
  return total;
}

/**
 * Option markup to plain arithmetic: drop the math delimiters, \frac{a}{b} to
 * (a)/(b), \times and \cdot to ×, \% to %, \text{..} to its words, spacing
 * commands and braces away. Anything it does not know stays as it was, so an
 * expression it cannot read compares as text and is never merged by mistake.
 */
function latexToPlain(text: string): string {
  let t = text.replace(/\\\(|\\\)|\$/g, "");
  // A whole number right before a fraction is a mixed number: 1\frac{3}{4} is 1 + 3/4.
  t = t.replace(/(\d+)\s*\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, "($1+($2)/($3))");
  let prev = "";
  while (prev !== t) {
    prev = t;
    t = t
      .replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, "($1)/($2)")
      .replace(/\\sqrt\[([^\]{}]*)\]\{([^{}]*)\}/g, "(($2)^(1/($1)))")
      .replace(/\\sqrt\{([^{}]*)\}/g, "(($1)^(1/2))")
      .replace(/\^\{([^{}]*)\}/g, "^($1)");
  }
  // A number or bracket written before a bracket multiplies it: 2\sqrt{8} is 2 x root 8.
  t = t.replace(/([\d)])\s*(?=\()/g, "$1×");
  t = t
    .replace(/\\text\{([^{}]*)\}/g, "$1")
    .replace(/\\(?:times|cdot)/g, "×")
    .replace(/\\%/g, "%")
    .replace(/\\[,;: ]|\\!/g, "")
    .replace(/[{}]/g, "");
  return t.replace(/\s+/g, " ").trim();
}

/**
 * Value of a plain arithmetic expression (digits, . + - × * / and brackets),
 * by recursive descent; null for anything else. No eval.
 */
function arithmeticValue(s: string): number | null {
  if (!/^[\d\s.+\-×*/()^]+$/.test(s) || !/\d/.test(s)) return null;
  const src = s.replace(/\s+/g, "");
  let i = 0;
  const expr = (): number | null => {
    let v = term();
    while (v !== null && (src[i] === "+" || src[i] === "-")) {
      const op = src[i++];
      const r = term();
      if (r === null) return null;
      v = op === "+" ? v + r : v - r;
    }
    return v;
  };
  const term = (): number | null => {
    let v = factor();
    while (v !== null && (src[i] === "×" || src[i] === "*" || src[i] === "/")) {
      const op = src[i++];
      const r = factor();
      if (r === null || (op === "/" && r === 0)) return null;
      v = op === "/" ? v / r : v * r;
    }
    return v;
  };
  // A power binds tighter than a sign and groups to the right: 2^3^2 is 2^9.
  const factor = (): number | null => {
    if (src[i] === "-") {
      i++;
      const v = factor();
      return v === null ? null : -v;
    }
    const base = atom();
    if (base === null || src[i] !== "^") return base;
    i++;
    const exp = factor();
    if (exp === null) return null;
    const v = Math.pow(base, exp);
    return Number.isFinite(v) ? v : null;
  };
  const atom = (): number | null => {
    if (src[i] === "(") {
      i++;
      const v = expr();
      if (src[i] !== ")") return null;
      i++;
      return v;
    }
    const m = src.slice(i).match(/^\d+(?:\.\d+)?/);
    if (!m) return null;
    i += m[0].length;
    return Number(m[0]);
  };
  const v = expr();
  return v !== null && i === src.length ? v : null;
}

/**
 * What an option's text is worth, as a comparable key. Currency, thousands
 * commas and a trailing unit are dropped; a percent sign and a direction word
 * ("increase", "loss") are KEPT, because "2% increase" and "2% decrease" are
 * different answers. Ratios reduce by their common factor and stay apart from
 * fractions. Anything else compares as its lowercased text.
 */
function optionValueKey(text: string): string {
  let t = latexToPlain(text).trim().toLowerCase().replace(/rs\.?|₹/g, "").replace(/(\d),(?=\d)/g, "$1").trim();
  t = t.replace(UNIT_SUFFIX, "").trim();
  let direction = "";
  const d = t.match(DIRECTION_SUFFIX);
  if (d && /\d/.test(t)) {
    direction = d[1];
    t = t.slice(0, d.index).trim();
  }
  let percent = "";
  if (t.endsWith("%")) {
    percent = "%";
    t = t.slice(0, -1).trim();
  }
  // A ratio has no zero term; "9:00" and "3:00" are clock times and compare as text.
  if (/^\d+(?:\s*:\s*\d+)+$/.test(t) && !t.split(":").some((p) => Number(p.trim()) === 0)) {
    const parts = t.split(":").map((p) => Number(p.trim()));
    const g = parts.reduce(gcd);
    return `ratio ${parts.map((p) => p / g).join(":")}${percent} ${direction}`;
  }
  const v = numericValue(t) ?? arithmeticValue(t);
  if (v !== null) return `num ${Math.round(v * 1e9) / 1e9}${percent} ${direction}`;
  return `text ${text.trim().toLowerCase().replace(/\s+/g, " ")}`;
}

/**
 * Groups of option letters whose texts are EQUAL IN VALUE ("1/2" and "26/52",
 * "2:5" and "6:15", the same text printed twice). Such a row is defective
 * whichever letter is keyed: two right answers when the key is one of them,
 * or two distractors a student can rule out together. Empty = clean.
 */
export function equalValueOptions(optionTexts: string[]): string[][] {
  const byValue = new Map<string, string[]>();
  optionTexts.forEach((text, i) => {
    const k = optionValueKey(text);
    byValue.set(k, [...(byValue.get(k) ?? []), "ABCD"[i]]);
  });
  return [...byValue.values()].filter((letters) => letters.length > 1);
}

// ---------------------------------------------------------------------------
// Group B: the "Errorless" PDF sheets. pdf-words.py dumps each page's words
// with their positions; these turn that into question lines and key blocks.

/** [x0, y0, x1, y1, text], PDF points from the top-left. */
export type PdfWord = [number, number, number, number, string];
export type PdfPage = { width: number; height: number; words: PdfWord[]; images?: number[][] };

/** The sheets' font maps ligatures to odd code points: "ff" comes out as U+01AF. */
export const fixLigatures = (s: string) => s.replace(/Ư/g, "ff").replace(/ﬁ/g, "fi").replace(/ﬂ/g, "fl");

function toLines(words: PdfWord[]): string[] {
  const lines: { y: number; words: PdfWord[] }[] = [];
  for (const w of [...words].sort((a, b) => a[1] - b[1] || a[0] - b[0])) {
    const l = lines.find((x) => Math.abs(x.y - w[1]) < 3);
    if (l) l.words.push(w);
    else lines.push({ y: w[1], words: [w] });
  }
  return lines.map((l) => fixLigatures(l.words.sort((a, b) => a[0] - b[0]).map((w) => w[4]).join(" ")));
}

/**
 * One Errorless page in reading order: the left column top to bottom, then the
 * right. Everything below an ANSWERS heading in that heading's column is the
 * section's key and goes to `keyBlocks` (one block per heading, empty when the
 * key is a picture), never to `lines`, so question text cannot carry a key and
 * the blind pass never sees one. The page number in the footer band is dropped.
 */
export function errorlessPage(page: PdfPage, footerY = 725): { lines: string[]; keyBlocks: string[][] } {
  const mid = page.width / 2;
  const words = page.words.filter((w) => w[1] < footerY);
  const heads = words.filter((w) => /^ANSWERS?$/i.test(w[4]));
  const inKey = new Set<PdfWord>();
  const keyBlocks: string[][] = [];
  for (const h of heads) {
    const left = h[0] < mid;
    const block = words.filter((w) => w !== h && (w[0] < mid) === left && w[1] > h[1] + 2);
    block.forEach((w) => inKey.add(w));
    inKey.add(h);
    keyBlocks.push(toLines(block));
  }
  const rest = words.filter((w) => !inKey.has(w));
  return {
    lines: [...toLines(rest.filter((w) => w[0] < mid)), ...toLines(rest.filter((w) => w[0] >= mid))],
    keyBlocks,
  };
}

/**
 * Split an Errorless sheet's lines at its "Type-" headings. A heading can wrap,
 * so the title runs until question 1. Text before the first heading is an
 * error, not something to drop silently.
 */
export function splitTypeSections(lines: string[]): { title: string; lines: string[] }[] {
  const out: { title: string; lines: string[]; inTitle: boolean }[] = [];
  for (const l of lines) {
    const m = l.match(/^Type\s*[-:]\s*(.*)$/i);
    if (m) {
      out.push({ title: m[1], lines: [], inTitle: true });
      continue;
    }
    const cur = out[out.length - 1];
    if (!cur) throw new Error(`text before the first Type- heading: "${l}"`);
    if (cur.inTitle && !/^\d+\.\s/.test(l)) cur.title += ` ${l}`;
    else {
      cur.inTitle = false;
      cur.lines.push(l);
    }
  }
  return out.map(({ title, lines }) => ({ title: title.replace(/\(\s*\d+\s*questions?\s*\)/i, "").replace(/\s+/g, " ").trim(), lines }));
}

/**
 * An Errorless section's key, from the lines under its ANSWERS heading. Three
 * layouts occur: a list ("1. c) 15 liters", letter + the value it stands for),
 * several letters to a line ("1. c) 2. a) 3. d)")
 * and a grid ("Q1 - c, Q2 - a,"). A line matching none of them is an error: a
 * skipped line would leave a question without its key.
 */
export function parseErrorlessKey(lines: string[]): Map<number, { letter: string; value: string }> {
  const out = new Map<number, { letter: string; value: string }>();
  // A letters-only grid can wrap mid-entry ("10." ends one line, "c)" starts the
  // next), so first try the whole block as one run.
  const joined = lines.map((l) => l.trim()).join(" ");
  if (lines.length > 1 && /^(?:(?:Q\.?\s*)?\d{1,2}\s*\.?\s*\(?[a-dA-D]\)\s*){2,}$/.test(joined)) {
    for (const m of joined.matchAll(/(?:Q\.?\s*)?(\d{1,2})\s*\.?\s*\(?([a-dA-D])\)/g)) out.set(Number(m[1]), { letter: m[2].toUpperCase(), value: "" });
    return out;
  }
  for (const raw of lines) {
    const l = raw.trim();
    // several "n. x)" or "Q.n x)" entries on one line, letters only
    if (/^(?:(?:Q\.?\s*)?\d{1,2}\s*\.?\s*\(?[a-dA-D]\)\s*){2,}$/.test(l)) {
      for (const m of l.matchAll(/(?:Q\.?\s*)?(\d{1,2})\s*\.?\s*\(?([a-dA-D])\)/g)) out.set(Number(m[1]), { letter: m[2].toUpperCase(), value: "" });
      continue;
    }
    const list = l.match(/^(\d{1,2})\s*[.)]\s*\(?([a-dA-D])\)\s*(.*)$/);
    if (list) {
      out.set(Number(list[1]), { letter: list[2].toUpperCase(), value: list[3].trim() });
      continue;
    }
    const grid = [...l.matchAll(/Q\s*(\d{1,2})\s*[-–:]\s*\(?([a-dA-D])\)?/g)];
    if (grid.length && l.replace(/Q\s*\d{1,2}\s*[-–:]\s*\(?[a-dA-D]\)?\s*,?/g, "").trim() === "") {
      for (const g of grid) out.set(Number(g[1]), { letter: g[2].toUpperCase(), value: "" });
      continue;
    }
    throw new Error(`cannot read key line: "${l}"`);
  }
  return out;
}

/**
 * The chapter's answer-letter rebalance when some files are already in the
 * database. content_hash includes the answer letter, so a committed row must
 * never move: its existing plan entry is kept and it is ineligible, but it still
 * counts towards the balance. New rows are planned from their unshuffled
 * answers, so the caller builds frozen rows WITH their existing entries and new
 * rows without.
 */
export function planChapterShuffles(
  rows: { id: string; answer: string; eligible: boolean; frozen: boolean }[],
  existing: Record<string, string>
): Record<string, string> {
  const plan = planShuffles(rows.map((r) => ({ id: r.id, answer: r.answer, eligible: r.eligible && !r.frozen })));
  const out: Record<string, string> = {};
  for (const r of rows) {
    if (r.frozen) {
      if (existing[r.id]) out[r.id] = existing[r.id];
    } else if (plan[r.id]) out[r.id] = plan[r.id];
  }
  return out;
}

/**
 * Apply a file's recorded source repairs (config `textFixes`). Each `find` must
 * match exactly once, so a fix cannot silently stop applying or hit twice.
 */
export function applyTextFixes(text: string, fixes: { find: string; replace: string }[], label: string): string {
  let out = text;
  for (const f of fixes) {
    const hits = out.split(f.find).length - 1;
    if (hits !== 1) throw new Error(`${label}: text fix "${f.find}" matched ${hits} times (want exactly 1)`);
    out = out.replace(f.find, f.replace);
  }
  return out;
}

/**
 * Put a section's question blocks into number order. Some Errorless sheets run
 * a section's left column on into the next page before its right column, so
 * the text arrives as 1-8, 15-18, 9-14, 19-20. Reordered ONLY when the leading
 * numbers are exactly 1..N, each once: anything else is returned untouched, so
 * the parser's gap and sequence checks still see it.
 */
export function reorderQuestionBlocks(lines: string[]): string[] {
  const pre: string[] = [];
  const blocks: { n: number; lines: string[] }[] = [];
  for (const l of lines) {
    const m = l.match(/^(\d{1,3})\.\s/);
    if (m) blocks.push({ n: Number(m[1]), lines: [l] });
    else if (blocks.length) blocks[blocks.length - 1].lines.push(l);
    else pre.push(l);
  }
  const nums = blocks.map((b) => b.n).sort((a, b) => a - b);
  if (!nums.every((n, i) => n === i + 1)) return lines;
  return [...pre, ...[...blocks].sort((a, b) => a.n - b.n).flatMap((b) => b.lines)];
}

/** An AFCAT sitting a past-year question was set in (Group C books print it as "2019 II"). */
export type PyqSitting = { year: number; sitting: "I" | "II" };

/**
 * questions.pyq_note for an AFCAT past-year question, in the bank's convention
 * ("CDS (I) 2018 — Elementary Mathematics"). The bracket says where it came
 * from; publicPyqNote strips it before display, so only the sitting shows.
 */
export function pyqNoteOf(p: PyqSitting): string {
  return `AFCAT (${p.sitting}) ${p.year} — Numerical Ability [from a published compilation (Conquer the Sky AFCAT), not the original paper; the answer was derived by a blind pass and checked against the book's key]`;
}

/**
 * Split a file's built rows into commit groups: every practice row together,
 * then one group per AFCAT sitting (commitStaged sets question_kind, pyq_year
 * and pyq_note per call). Row order is kept within each group. A row with no
 * source record is an error: guessing its kind would mislabel a past question.
 */
export function commitGroups<R extends { questionNumber?: string }>(
  rows: R[],
  records: Map<string, { pyq?: PyqSitting }>
): { kind: "practice" | "pyq"; year?: number; note?: string; rows: R[] }[] {
  const practice: R[] = [];
  const bySitting = new Map<string, { p: PyqSitting; rows: R[] }>();
  for (const r of rows) {
    const rec = records.get(r.questionNumber ?? "");
    if (!rec) throw new Error(`${r.questionNumber}: no source record`);
    if (!rec.pyq) practice.push(r);
    else {
      const k = `${rec.pyq.year}-${rec.pyq.sitting}`;
      if (!bySitting.has(k)) bySitting.set(k, { p: rec.pyq, rows: [] });
      bySitting.get(k)!.rows.push(r);
    }
  }
  return [
    ...(practice.length ? [{ kind: "practice" as const, rows: practice }] : []),
    ...[...bySitting.values()].map((s) => ({ kind: "pyq" as const, year: s.p.year, note: pyqNoteOf(s.p), rows: s.rows })),
  ];
}

// ---------------------------------------------------------------------------
// Group D: Cadetprep AFCAT Excel sheets. They carry a worked solution per row,
// AI-written like the NDA worksheets'. Where the blind pass agrees with the
// key, that solution is published as it stands, provided it meets the same
// contract an authored solution does; every other row needs one written by
// hand (data/... authored file) before the chapter can build.

const SOURCE_SELF_TALK = /\b(wait|let me (re)?(calculate|consider|check|verify)|looking at the options|doesn'?t match|does not match|recheck)\b/i;

const SOURCE_HEDGE = /\b(closest|nearest (option|simple|given|answer)|(as per|according to) (the )?(option|distribution)|option pattern|distribution requirement)\b/i;

/** `\/` (a LaTeX italic correction) where the sheet lost "₹ ... per": renders as a bare number. */
export const BROKEN_UNIT = /\\\//;

/**
 * Some Cadetprep sheets write the currency inside the math zone: `\(Rs. 900\)`
 * renders "Rs." as italic letters with no space, and `\(₹240\)` makes KaTeX
 * warn (no font metrics for ₹ in math). Move it out in front.
 */
export function liftCurrencyOutOfMath(text: string): string {
  return text
    .replace(/\\\(\s*Rs\.\s*/g, "Rs. \\(")
    .replace(/\\\(\s*₹\s*/g, "₹\\(")
    .replace(/(Rs\.\s*|₹)\\\(\\\)\s*/g, "$1")
    .replace(/(Rs\.\s*|₹)\\\(\\ \s*/g, "$1\\(");
}

/** A backslash before a digit: no LaTeX command starts with one, so it is a lost `\(` or `\)`. */
const BARE_MATH = /\\[0-9]/;

/**
 * One Cadetprep sheet (Time & Work, M1D1-M2D2) lost the brackets of every
 * delimiter: `\18\` for `\(18\)`, `\\frac{1}{3}\` for `\(\frac{1}{3}\)`.
 * Restores the two shapes its stems and options use; anything else is left
 * for the solution contract (BARE_MATH) to refuse.
 */
export function repairBareMath(text: string): string {
  return text
    .replace(/\\\\(frac\{[^{}]*\}\{[^{}]*\})\\(?![a-zA-Z])/g, "\\(\\$1\\)")
    .replace(/\\([0-9][0-9.,]*)\\(?![a-zA-Z])/g, "\\($1\\)");
}

/** Why a source solution cannot be published as it stands, or null if it can. */
export function sourceSolutionProblem(solution: string): string | null {
  const s = solution ?? "";
  if (!s.trim()) return "empty";
  if (LETTER_REF.some((re) => re.test(s))) return "names an option letter";
  if (SOURCE_SELF_TALK.test(s)) return "self-talk";
  // A generator that computed one value and then keyed "the closest option"
  // (or kept a letter "as per distribution"): the key was picked, not derived.
  if (SOURCE_HEDGE.test(s)) return "settles for the closest option";
  if (BROKEN_UNIT.test(s)) return "broken unit (\\/)";
  if (BARE_MATH.test(s)) return "bare math delimiters (\\20\\ for \\(20\\))";
  if (s.includes("—")) return "em dash";
  if (CONTROL_CHAR.test(s)) return "control character";
  // A sheet written with a chat tool kept its source tags ("[web:77]").
  if (/\[web:\d+\]/.test(s)) return "chat citation tag";
  return null;
}

export type CadetprepRecord = { id: string; key: string; keySolution: string; difficulty: string; options?: string[] };
export type AuthoredSolution = { solution: string; subtopic?: string; difficulty?: "EASY" | "MODERATE" | "HARD"; note?: string };

/**
 * Turn blind verdicts into pass-1 verdicts for a Cadetprep file. A row is
 * adopted when the blind letter equals the key and the source solution passes
 * `sourceSolutionProblem`; an authored solution always wins. Everything else is
 * returned as a to-do with its reason, and the caller refuses to write until
 * the list is empty. A disputed key still needs its override: this only
 * supplies the published fields.
 */
export function adoptVerdicts(input: {
  blind: Record<string, [string, string] | [string, string, string]>;
  records: CadetprepRecord[];
  authored: Record<string, AuthoredSolution>;
  subtopic: string;
}): {
  derived: { id: string; derived: string; value: string; confidence: "high"; note: string; subtopic: string; difficulty: "EASY" | "MODERATE" | "HARD"; solution: string }[];
  todo: { id: string; reason: string }[];
} {
  const ids = new Set(input.records.map((r) => r.id));
  const stray = Object.keys(input.blind).filter((id) => !id.startsWith("_") && !ids.has(id));
  if (stray.length) throw new Error(`blind verdicts for rows not in the file: ${stray.join(", ")}`);
  const derived: ReturnType<typeof adoptVerdicts>["derived"] = [];
  const todo: { id: string; reason: string }[] = [];
  for (const r of input.records) {
    const b = input.blind[r.id];
    if (!b) {
      todo.push({ id: r.id, reason: "no blind verdict" });
      continue;
    }
    const [letter, value, rowSubtopic] = b;
    const subtopic = rowSubtopic ?? input.subtopic;
    const a = input.authored[r.id];
    const difficulty = a?.difficulty ?? normalizeDifficulty(r.difficulty);
    if (a) {
      derived.push({ id: r.id, derived: letter, value, confidence: "high", note: a.note ?? "solution authored", subtopic: a.subtopic ?? subtopic, difficulty, solution: a.solution });
      continue;
    }
    // A blind pick of the key's equal-valued twin (4/52 where the key is 1/13)
    // agrees on the value; fix-equal-values repairs the twin afterwards.
    const twin = letter !== r.key && !!r.options && equalValueOptions(r.options).some((g) => g.includes(letter) && g.includes(r.key));
    if (letter !== r.key && !twin) {
      todo.push({ id: r.id, reason: `dispute: blind ${letter} vs key ${r.key}` });
      continue;
    }
    const problem = sourceSolutionProblem(r.keySolution);
    if (problem) {
      todo.push({ id: r.id, reason: `source solution unusable: ${problem}` });
      continue;
    }
    const note = twin ? "blind picked the key's equal-valued twin; source solution adopted" : "blind agrees with key; source solution adopted";
    derived.push({ id: r.id, derived: r.key, value, confidence: "high", note, subtopic, difficulty, solution: r.keySolution.trim() });
  }
  return { derived, todo };
}

// ---------------------------------------------------------------------------
// Proposing repairs for options equal in value (the Cadetprep sheets print the
// answer twice on most rows, 6/13 beside 24/52). The keyed value stays; if an
// unsimplified copy is keyed while its simplest form is also printed, the
// answer moves to the simplest form. Every other duplicate becomes a near miss
// of the same shape, checked to differ from all four options. A duplicate it
// cannot reshape returns null: that row is the adjudicator's.

type Shape = { kind: "frac"; a: number; b: number } | { kind: "ratio"; parts: number[] } | { kind: "num"; v: number; dp: number };

function shapeOf(text: string): Shape | null {
  const t = text.trim();
  let m = t.match(/^\\\(\s*\\[dt]?frac\{\s*(-?\d+)\s*\}\{\s*(-?\d+)\s*\}\s*\\\)$/) ?? t.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (m) return { kind: "frac", a: Number(m[1]), b: Number(m[2]) };
  m = t.match(/^\\\(\s*(\d+(?:\s*:\s*\d+)+)\s*\\\)$/) ?? t.match(/^(\d+(?:\s*:\s*\d+)+)$/);
  if (m) return { kind: "ratio", parts: m[1].split(":").map((p) => Number(p.trim())) };
  m = t.match(/^\\\(\s*(-?\d+(?:\.\d+)?)\s*\\\)$/) ?? t.match(/^(-?\d+(?:\.\d+)?)$/);
  if (m) return { kind: "num", v: Number(m[1]), dp: (m[1].split(".")[1] ?? "").length };
  return null;
}

function renderShape(s: Shape, latex: boolean): string {
  const body = s.kind === "frac" ? `\\frac{${s.a}}{${s.b}}` : s.kind === "ratio" ? s.parts.join(":") : s.v.toFixed(s.dp);
  if (!latex) return s.kind === "frac" ? `${s.a}/${s.b}` : body;
  return `\\(${body}\\)`;
}

function nearMisses(s: Shape): Shape[] {
  const steps = [1, -1, 2, -2, 3, -3];
  if (s.kind === "frac") {
    const proper = Math.abs(s.a) < s.b; // a probability-like fraction stays below 1
    return [...steps.map((d) => ({ ...s, a: s.a + d })), ...steps.map((d) => ({ ...s, b: s.b + d }))].filter(
      (c) => c.a !== 0 && c.b > 0 && Math.sign(c.a) === Math.sign(s.a || 1) && (!proper || Math.abs(c.a) < c.b)
    );
  }
  if (s.kind === "ratio") {
    const out: Shape[] = [];
    for (let i = 0; i < s.parts.length; i++) for (const d of steps) {
      const parts = [...s.parts];
      parts[i] += d;
      if (parts[i] > 0) out.push({ kind: "ratio", parts });
    }
    return out;
  }
  const unit = 10 ** -s.dp;
  return steps.map((d) => ({ ...s, v: Math.round((s.v + d * unit) * 10 ** s.dp) / 10 ** s.dp })).filter((c) => (s.v > 0 ? c.v > 0 : true));
}

const isLowestTerms = (text: string): boolean => {
  const s = shapeOf(text);
  if (!s) return false;
  if (s.kind === "frac") return gcd(Math.abs(s.a), s.b) === 1 && s.b !== 1;
  if (s.kind === "ratio") return s.parts.reduce(gcd) === 1;
  return true;
};

export function proposeEqualValueRepair(
  options: string[],
  key: string
): { options: Partial<Record<"A" | "B" | "C" | "D", string>>; answer?: "A" | "B" | "C" | "D" } | null {
  const groups = equalValueOptions(options);
  if (!groups.length) return null;
  const current = [...options];
  const out: { options: Partial<Record<"A" | "B" | "C" | "D", string>>; answer?: "A" | "B" | "C" | "D" } = { options: {} };
  for (const group of groups) {
    let keeper = group.find((l) => isLowestTerms(options["ABCD".indexOf(l)])) ?? group[0];
    if (group.includes(key)) {
      keeper = isLowestTerms(options["ABCD".indexOf(key)]) ? key : group.find((l) => isLowestTerms(options["ABCD".indexOf(l)])) ?? key;
      if (keeper !== key) out.answer = keeper as "A";
    }
    for (const letter of group) {
      if (letter === keeper) continue;
      const i = "ABCD".indexOf(letter);
      const shape = shapeOf(options[i]);
      if (!shape) return null;
      const latex = options[i].trim().startsWith("\\(");
      let placed = false;
      for (const c of nearMisses(shape)) {
        const cand = renderShape(c, latex);
        const trial = current.map((o, j) => (j === i ? cand : o));
        if (!equalValueOptions(trial).some((g) => g.includes(letter))) {
          current[i] = cand;
          out.options[letter as "A"] = cand;
          placed = true;
          break;
        }
      }
      if (!placed) return null;
    }
  }
  return equalValueOptions(current).length ? null : out;
}

/**
 * Rows whose built subtopic differs from the live one (sync-subtopics.ts). A notes
 * re-cut changes subtopics after commit, and commit.ts skips the row because
 * subtopic_id is not in content_hash. A built row with no live row is reported, not
 * skipped silently.
 */
export function planSubtopicMoves(
  built: { questionNumber: string; subtopic: string }[],
  live: { id: string; questionNumber: string; subtopic: string | null }[]
): { moves: { id: string; questionNumber: string; from: string | null; to: string }[]; missing: string[] } {
  const byNumber = new Map(live.map((l) => [l.questionNumber, l]));
  const moves: { id: string; questionNumber: string; from: string | null; to: string }[] = [];
  const missing: string[] = [];
  for (const b of built) {
    const l = byNumber.get(b.questionNumber);
    if (!l) missing.push(b.questionNumber);
    else if (l.subtopic !== b.subtopic) moves.push({ id: l.id, questionNumber: b.questionNumber, from: l.subtopic, to: b.subtopic });
  }
  return { moves, missing };
}

/**
 * A stem repair keeps the blind pass's solution, which was written for the misprinted
 * stem. Three Ratio rows shipped that way (2026-10-22): "the question as printed has no
 * answer" under a stem that had been fixed. So a stem override carries a rewritten
 * `solution`, or `solutionStands` saying why the old one still fits.
 */
export function staleSolutionOverride(ov: AfcatOverride): boolean {
  return Boolean(ov.stem && !ov.exclude && !ov.solution && !ov.solutionStands);
}

/**
 * Which retired subtopic to rename into each new name (sync-subtopics.ts), so a merge
 * keeps the biggest source's id and every /browse link that carries it. A name that
 * already exists, or a subtopic the chapter keeps, is never renamed.
 */
export function pickRenames(
  moves: { from: string | null; to: string }[],
  keep: string[],
  existing: Set<string>
): Record<string, string> {
  const counts = new Map<string, Map<string, number>>();
  for (const m of moves) {
    if (!m.from || keep.includes(m.from) || existing.has(m.to)) continue;
    const c = counts.get(m.to) ?? new Map<string, number>();
    c.set(m.from, (c.get(m.from) ?? 0) + 1);
    counts.set(m.to, c);
  }
  const renames: Record<string, string> = {};
  for (const [to, c] of counts) {
    const [from] = [...c].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0];
    if (!(from in renames)) renames[from] = to;
  }
  return renames;
}

export type RecutPlan = {
  /** The chapter's new closed subtopic list, in teaching order. */
  subtopics: string[];
  /** Whole-subtopic merges and renames: old name -> new name. */
  renames: Record<string, string>;
  /** Single rows: question id -> new subtopic, with the reason recorded in overrides.json. */
  moves: Record<string, { to: string; reason: string }>;
};

/**
 * Apply a /notes re-cut to a chapter's pass-1 values and overrides (recut.ts). Renames
 * rewrite derived.json and any override that names the old subtopic; moves become
 * `subtopic` overrides with a reason. Returns problems instead of a half-applied plan:
 * a row left outside the new list, a move of an unknown row, a listed subtopic with no row.
 */
export function applyRecutPlan<D extends { id: string; subtopic: string }, O extends { reason?: string; subtopic?: string; exclude?: boolean }>(
  plan: RecutPlan,
  input: { derived: D[]; overrides: Record<string, O> }
): { derived: D[]; overrides: Record<string, O>; problems: string[] } {
  const rename = (s: string) => plan.renames[s] ?? s;
  const problems: string[] = [];
  const derived = input.derived.map((r) => ({ ...r, subtopic: rename(r.subtopic) }));
  const overrides: Record<string, O> = {};
  for (const [id, o] of Object.entries(input.overrides)) overrides[id] = o.subtopic ? { ...o, subtopic: rename(o.subtopic) } : { ...o };
  const ids = new Set(derived.map((r) => r.id));
  for (const [id, m] of Object.entries(plan.moves)) {
    if (!ids.has(id)) {
      problems.push(`move ${id}: no such row`);
      continue;
    }
    const prev = overrides[id];
    const why = `Notes re-cut: ${m.reason}`;
    // Re-applying a plan must not record the same reason twice.
    const reason = !prev?.reason ? why : prev.reason.includes(why) ? prev.reason : `${prev.reason} ${why}`;
    overrides[id] = { ...(prev ?? {}), subtopic: m.to, reason } as O;
  }
  const held = new Set<string>();
  for (const r of derived) {
    if (overrides[r.id]?.exclude) continue; // excluded at ingest: never built, never shipped
    const s = overrides[r.id]?.subtopic ?? r.subtopic;
    held.add(s);
    if (!plan.subtopics.includes(s)) problems.push(`${r.id}: subtopic "${s}" not in the new list`);
  }
  for (const s of plan.subtopics) if (!held.has(s)) problems.push(`subtopic "${s}" would hold no row`);
  return { derived, overrides, problems };
}

/**
 * Rewrite one chapter's `subtopics: [...]` in config.ts source and rename the file-level
 * `subtopic:` defaults inside that chapter's block only (another chapter may use the same
 * names). Throws if the block or its list is not found.
 */
export function rewriteChapterSubtopics(src: string, chapterId: string, subtopics: string[], renames: Record<string, string>): string {
  const nl = src.includes("\r\n") ? "\r\n" : "\n";
  // A one-word id is written unquoted (`  average: {`), a hyphenated one quoted.
  const head = [`  "${chapterId}": {`, `  ${chapterId}: {`].find((h) => src.includes(h));
  if (!head) throw new Error(`config.ts: no chapter block "${chapterId}"`);
  const start = src.indexOf(head);
  const rest = src.slice(start + head.length);
  const next = rest.search(/\r?\n {2}"?[\w-]+"?: \{|\r?\n\};/);
  const end = start + head.length + (next < 0 ? rest.length : next);
  let block = src.slice(start, end);
  const open = block.indexOf("subtopics: [");
  if (open < 0) throw new Error(`config.ts: chapter "${chapterId}" has no subtopics list`);
  const close = block.indexOf("]", open);
  const indent = block.slice(block.lastIndexOf("\n", open) + 1, open);
  const list = ["subtopics: [", ...subtopics.map((s) => `${indent}  ${JSON.stringify(s)},`), `${indent}]`].join(nl);
  block = block.slice(0, open) + list + block.slice(close + 1);
  for (const [from, to] of Object.entries(renames)) block = block.split(`subtopic: ${JSON.stringify(from)}`).join(`subtopic: ${JSON.stringify(to)}`);
  return src.slice(0, start) + block + src.slice(end);
}
