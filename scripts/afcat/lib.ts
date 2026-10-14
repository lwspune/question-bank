// Pure helpers for the AFCAT practice ingestion pipeline. No IO: the extract
// CLIs read the source files (pandoc for .docx, PyMuPDF for .pdf) and hand this
// module plain text. Unit-tested in tests/afcat-quiz-parse.test.ts.
//
// The LWS quizzes were written in at least five layouts — "1." / "Q1." / "1:"
// numbering, "(a)" / "a)" / "A)" option markers, options inline on the stem
// line, two to a line, or one to a line — and their answer keys in four more.
// One tolerant parser covers them all, because a per-file parser would be
// eight parsers that each only one file ever exercises.
import { planShuffles } from "../worksheets/lib";

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
  flags?: string[]; // extraction findings for the adjudicator
  section?: string; // Group B: the "Type-" heading the question sits under
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
 * What an option's text is worth, as a comparable key. Currency, thousands
 * commas and a trailing unit are dropped; a percent sign and a direction word
 * ("increase", "loss") are KEPT, because "2% increase" and "2% decrease" are
 * different answers. Ratios reduce by their common factor and stay apart from
 * fractions. Anything else compares as its lowercased text.
 */
function optionValueKey(text: string): string {
  let t = text.trim().toLowerCase().replace(/rs\.?|₹/g, "").replace(/(\d),(?=\d)/g, "$1").trim();
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
  if (/^\d+(?:\s*:\s*\d+)+$/.test(t)) {
    const parts = t.split(":").map((p) => Number(p.trim()));
    const g = parts.reduce(gcd);
    return `ratio ${parts.map((p) => p / g).join(":")}${percent} ${direction}`;
  }
  const v = numericValue(t);
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
    const m = l.match(/^Type\s*-\s*(.*)$/i);
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
  for (const raw of lines) {
    const l = raw.trim();
    // several "n. x)" entries on one line, letters only
    if (/^(?:\d{1,2}\s*\.\s*\(?[a-dA-D]\)\s*){2,}$/.test(l)) {
      for (const m of l.matchAll(/(\d{1,2})\s*\.\s*\(?([a-dA-D])\)/g)) out.set(Number(m[1]), { letter: m[2].toUpperCase(), value: "" });
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
