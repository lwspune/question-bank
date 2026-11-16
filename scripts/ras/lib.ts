// Pure core for the RAS lane, beyond what it imports from ../upsc/lib (merge,
// catalog, row building), ../capf/lib (scoring two blind passes against a key)
// and ../mpsc/lib (the script-neutral number check).
//
// What is new here is the second language. An RAS booklet prints every item in
// Hindi and English side by side; English is the canonical `questions` row and
// Hindi a translation (migrations 0118 + 0171). Three checks guard the Hindi:
//
//   hindiStructureIssues   a GATE: present, 4 options, none blank, real
//                          Devanagari, balanced maths, tables with separators,
//                          context in both languages or neither.
//   hindiParityIssues      TRIAGE: the numbers of each field must agree across
//                          the two languages, so a misread digit in EITHER
//                          surfaces. A real printing difference trips it too,
//                          and is then waived with a reason (commit.ts refuses
//                          an unwaived one).
//   hindiBandDisagreements a GATE: the shared mergeBands compares two bands'
//                          copies of an item by their ENGLISH only, so two
//                          different readings of the Hindi would pass. This
//                          closes that.
import { findLatexImbalance, findTableWithoutSeparator, type TQ } from "../upsc/lib";
import { numberBag } from "../mpsc/lib";

export { scorePass, pickWorking, type PassScore, type HandSolutions } from "../capf/lib";

export type HindiVersion = { stem: string; options: string[]; context?: string };

export type RasQuestion = TQ & {
  hi?: HindiVersion;
  /** One plain English sentence: where the two printed versions SAY different things. */
  printNote?: string;
  figure?: { page: number; region: number[]; note?: string; watermark?: string };
};

const DEVANAGARI = /[ऀ-ॿ]/;
const LATIN_WORD = /[A-Za-z]{3,}/;

/** Text outside `\( ... \)` maths, so a LaTeX command never counts as a word. */
const prose = (s: string) => s.replace(/\\\([\s\S]*?\\\)/g, " ");

export function hindiStructureIssues(q: RasQuestion): string[] {
  const id = `Q${q.number}`;
  const hi = q.hi;
  if (!hi) return [`${id}: no Hindi version (hi)`];
  const out: string[] = [];

  const opts = Array.isArray(hi.options) ? hi.options : [];
  if (opts.length !== 4) out.push(`${id}: hi has ${opts.length} options, expected 4`);
  opts.forEach((o, i) => {
    if (typeof o !== "string" || !o.trim()) out.push(`${id}: hi option ${"ABCD"[i]} is blank`);
  });

  // English pasted into the Hindi slot is the likeliest slip. A bare maths or
  // figure item has no words in EITHER language, so it is exempt.
  if (!DEVANAGARI.test(hi.stem ?? "") && LATIN_WORD.test(prose(q.stem))) {
    out.push(`${id}: hi stem carries no Devanagari`);
  }

  const fields: [string, string | undefined][] = [
    ["hi stem", hi.stem],
    ["hi context", hi.context],
    ...opts.map((o, i): [string, string] => [`hi option ${"ABCD"[i]}`, o]),
  ];
  for (const [name, text] of fields) {
    if (!text) continue;
    const latex = findLatexImbalance(text);
    if (latex) out.push(`${id}: ${name}: ${latex}`);
    const table = findTableWithoutSeparator(text);
    if (table) out.push(`${id}: ${name}: ${table}`);
  }

  if (Boolean(q.context) !== Boolean(hi.context)) {
    out.push(`${id}: context present in ${q.context ? "English" : "Hindi"} only`);
  }
  return out;
}

const sameBag = (a: string[], b: string[]) => a.length === b.length && a.every((x, i) => x === b[i]);
const fmt = (bag: string[]) => (bag.length ? bag.join(" ") : "(none)");

export function hindiParityIssues(q: RasQuestion): string[] {
  const hi = q.hi;
  if (!hi) return [];
  const id = `Q${q.number}`;
  const out: string[] = [];
  const pair = (name: string, en: string | undefined, h: string | undefined) => {
    const a = numberBag(en ?? "");
    const b = numberBag(h ?? "");
    if (!sameBag(a, b)) out.push(`${id}: ${name} numbers differ: en ${fmt(a)} hi ${fmt(b)}`);
  };
  pair("stem", q.stem, hi.stem);
  if (q.context || hi.context) pair("context", q.context, hi.context);
  const n = Math.min(q.options.length, hi.options.length);
  for (let k = 0; k < n; k++) pair(`option ${"ABCD"[k]}`, q.options[k].text, hi.options[k]);
  return out;
}

const norm = (s: string | undefined) => (s ?? "").replace(/\s+/g, " ").trim();
const hindiFingerprint = (q: RasQuestion) =>
  [norm(q.hi?.stem), norm(q.hi?.context), ...(q.hi?.options ?? []).map(norm)].join("\u0001");

export function hindiBandDisagreements(bands: { band: string; questions: RasQuestion[] }[]): string[] {
  const seen = new Map<number, { band: string; fp: string }>();
  const out: string[] = [];
  for (const b of bands) {
    for (const q of b.questions) {
      const fp = hindiFingerprint(q);
      const prev = seen.get(q.number);
      if (!prev) seen.set(q.number, { band: b.band, fp });
      else if (prev.fp !== fp) {
        out.push(`Q${q.number}: bands ${prev.band} and ${b.band} read the Hindi differently. Resolve against the page.`);
      }
    }
  }
  return out;
}

/**
 * Phrases that mark a stored solution as a SOLVER'S NOTES rather than a
 * teacher's explanation. A blind pass's `reasoning` becomes the question's
 * solution, and the 2024 pilot shipped 43 of 149 with "Runner-up: ..." lines and
 * "my recollection" (the brief had asked for the runner-up inside `reasoning`;
 * it now has its own field). keycheck.ts refuses to write an answer carrying one.
 * Returns the classes found, in a fixed order.
 */
const VOICE: [string, RegExp][] = [
  ["runner-up", /\brunners?[- ]up\b/i],
  // A bare "I" is a Roman numeral here (statements I, II, III), so only "I" + a
  // verb counts as the first person.
  ["first person", /\bI (am|think|believe|associate|recall|read|picked|chose|would)\b|\b[Mm](y|e)\b|\bI'm\b/],
  ["guess", /\bguess(es|ed|ing)?\b/i],
  ["deriver", /\bderiver\b/i],
  ["recall", /\b(cannot|can't|do not|don't|not) recall(ed)?\b|\brecall (points|suggests|of)\b|\b(from|on|affairs) recall\b/i],
  ["hedge", /\bis understood to\b|\bnot confidently\b|\bunsure\b|\buncertain\b|\bappears (wrong|right|correct|false|true)\b|\bcannot be derived\b/i],
];

export function solverVoice(text: string): string[] {
  return VOICE.filter(([, re]) => re.test(text)).map(([name]) => name);
}

/**
 * A remark for an item whose two printed versions differ in meaning
 * (`printNote`), stored as part of the solution in each language so it shows
 * with the answer, never before the attempt. Null without a note.
 */
export function printNoteSolution(note: string | undefined): { en: string; hi: string } | null {
  if (!note) return null;
  return {
    en: `**Note on the printed paper:** the Hindi and English versions of this question differ. ${note}`,
    hi: `**मुद्रित प्रश्न-पत्र पर टिप्पणी:** इस प्रश्न के हिन्दी और अंग्रेज़ी संस्करण अलग हैं। ${note}`,
  };
}
