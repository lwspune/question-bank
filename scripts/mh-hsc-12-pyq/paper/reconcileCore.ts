/**
 * Pure core of the RECONCILE correction: pair each shipped bank row with the
 * transcription row of the printed paper it came from, and say what correcting
 * it would change. Tested in tests/mh-hsc-12-reconcile.test.ts; no IO here.
 *
 * The compilation rows were typed by hand from the papers, so a pair differs in
 * two very different ways. Typesetting (math spacing, `\dfrac` against `\frac`,
 * a line break, a blank's length) changes nothing a student reads. Content (a
 * word, a number, an option, the key) is a claim about the printed page, and is
 * only ever corrected after someone has looked at the page. `classifyPair`
 * separates the two so the second kind can be gated.
 */

export type BankSide = {
  id: string;
  ref: string | null; // questions.question_number
  text: string;
  context: string | null;
  options: { label: string; text: string; is_correct: boolean }[];
  contentHash: string;
  format: string;
};

export type PaperSide = {
  ref: string;
  stem: string;
  context: string | null;
  options: { label: string; text: string }[];
  answer: string | null;
  contentHash: string;
  format: string;
};

export type Pair = { paperRef: string; rowId: string; how: "manual" | "ref" | "content" };

const MATH = /\\\((.*?)\\\)|\\\[(.*?)\\\]/gs;

/**
 * The words and numbers a piece of text says, in order, with typesetting
 * folded away. Deliberately harsh on formatting and deliberately literal on
 * content: `0.20` and `0.25` stay different, and so do `-8` and `8`.
 */
export function contentTokens(s: string | null | undefined): string[] {
  // A \text{...} group's braces are typesetting; unwrapped first so they cannot
  // pass for a closing bracket in front of a sign.
  let t = String(s ?? "").replace(/\\(?:text|mathrm|mathbf|operatorname)\s*\{([^{}]*)\}/g, " $1 ");
  // Inside math, spaces carry no meaning, so a sign always sits on its number.
  // A command name is closed off first: removing the space in `\mu F` would
  // otherwise read it as one command, `\muF`.
  t = t.replace(MATH, (_m, a: string | undefined, b: string | undefined) =>
    ` ${(a ?? b ?? "").replace(/\\([A-Za-z]+)/g, "\\$1\u0001").replace(/\s+/g, "").replace(/\u0001/g, " ")} `,
  );
  t = t
    .replace(/\^\{?\\circ\}?|[º°]/g, " circ ")
    .replace(/\\[dt]frac/g, "\\frac")
    .replace(/\\(text|mathrm|mathbf|operatorname|left|right|displaystyle|quad|qquad)\b/g, " ")
    .replace(/\\[,;:! ]/g, " ")
    .replace(/\\rbrack/g, " ")
    .replace(/\\lbrack/g, " ")
    .replace(/\\([A-Za-z]+)/g, " $1 ")
    .replace(/[‐-―−]/g, "-")
    .replace(/_+/g, " ");
  const out: string[] = [];
  for (const m of t.matchAll(/-?\d+(?:\.\d+)?|[A-Za-z]+/g)) {
    const tok = m[0];
    // A dash after a digit or a closing bracket is a subtraction; anywhere else
    // (after a comma, a word, an opening brace) it is a sign. Both renderings of
    // a text go through the same rule, which is what the comparison needs.
    const before = t.slice(0, m.index).trimEnd().slice(-1);
    out.push(tok.startsWith("-") && /[0-9)\]}]/.test(before) ? tok.slice(1) : tok.toLowerCase());
  }
  return out;
}

export type TextChange = { kind: "same" | "format" | "content"; onlyA: string[]; onlyB: string[] };

/** Compare two renderings of one text. */
export function compareText(a: string | null | undefined, b: string | null | undefined): TextChange {
  const A = String(a ?? "");
  const B = String(b ?? "");
  if (A.trim() === B.trim()) return { kind: "same", onlyA: [], onlyB: [] };
  const ta = contentTokens(A);
  const tb = contentTokens(B);
  if (ta.join(" ") === tb.join(" ")) return { kind: "format", onlyA: [], onlyB: [] };
  const left = [...tb];
  const onlyA: string[] = [];
  for (const t of ta) {
    const i = left.indexOf(t);
    if (i >= 0) left.splice(i, 1);
    else onlyA.push(t);
  }
  return { kind: "content", onlyA, onlyB: left };
}

/** Share of tokens two texts have in common. */
function overlap(a: string, b: string): number {
  const A = new Set(contentTokens(a));
  const B = new Set(contentTokens(b));
  if (!A.size || !B.size) return 0;
  const shared = [...A].filter((t) => B.has(t)).length;
  return shared / new Set([...A, ...B]).size;
}

/** The printed question number a ref belongs to: `Q. 29(ii)` and `Q.29.b` are 29. */
const topNumber = (ref: string | null) => /(\d+)/.exec(String(ref ?? ""))?.[1] ?? "?";

/**
 * Pair bank rows with transcription rows, one to one.
 *
 * Order of trust: a hand pairing, then the same normalised ref on exactly one
 * row each side, then the closest content WITHIN one printed number (the
 * compilation repeats a bare number for both halves of a split question). A
 * pair is never made across printed numbers, and never on a weak overlap, so
 * what is left over is reported rather than guessed.
 */
export function autoPair(
  bank: BankSide[],
  paper: PaperSide[],
  normalise: (raw: string | null) => string | null,
  manual: Record<string, string> = {},
): { pairs: Pair[]; unpairedBank: string[]; unpairedPaper: string[] } {
  const pairs: Pair[] = [];
  const usedRows = new Set<string>();
  const usedRefs = new Set<string>();

  for (const [paperRef, rowId] of Object.entries(manual)) {
    if (usedRows.has(rowId)) throw new Error(`hand pairing names row ${rowId} twice`);
    if (!paper.some((p) => p.ref === paperRef)) throw new Error(`hand pairing names unknown ref ${paperRef}`);
    if (!bank.some((b) => b.id === rowId)) throw new Error(`hand pairing names unknown row ${rowId}`);
    pairs.push({ paperRef, rowId, how: "manual" });
    usedRows.add(rowId);
    usedRefs.add(paperRef);
  }

  const byRef = new Map<string, BankSide[]>();
  for (const b of bank) {
    if (usedRows.has(b.id)) continue;
    const r = normalise(b.ref);
    if (r) byRef.set(r, [...(byRef.get(r) ?? []), b]);
  }
  const paperByRef = new Map<string, PaperSide[]>();
  for (const p of paper) {
    if (usedRefs.has(p.ref)) continue;
    const r = normalise(p.ref);
    if (r) paperByRef.set(r, [...(paperByRef.get(r) ?? []), p]);
  }
  for (const [r, ps] of paperByRef) {
    const bs = byRef.get(r) ?? [];
    if (ps.length === 1 && bs.length === 1 && overlap(ps[0].stem, bs[0].text) >= 0.2) {
      pairs.push({ paperRef: ps[0].ref, rowId: bs[0].id, how: "ref" });
      usedRows.add(bs[0].id);
      usedRefs.add(ps[0].ref);
    }
  }

  const candidates: { p: PaperSide; b: BankSide; score: number }[] = [];
  for (const p of paper) {
    if (usedRefs.has(p.ref)) continue;
    for (const b of bank) {
      if (usedRows.has(b.id) || topNumber(b.ref) !== topNumber(p.ref)) continue;
      const score = overlap(p.stem, b.text);
      if (score >= 0.5) candidates.push({ p, b, score });
    }
  }
  for (const c of candidates.sort((x, y) => y.score - x.score)) {
    if (usedRows.has(c.b.id) || usedRefs.has(c.p.ref)) continue;
    pairs.push({ paperRef: c.p.ref, rowId: c.b.id, how: "content" });
    usedRows.add(c.b.id);
    usedRefs.add(c.p.ref);
  }

  const order = new Map(paper.map((p, i) => [p.ref, i]));
  pairs.sort((x, y) => (order.get(x.paperRef) ?? 0) - (order.get(y.paperRef) ?? 0));
  return {
    pairs,
    unpairedBank: bank.filter((b) => !usedRows.has(b.id)).map((b) => b.id),
    unpairedPaper: paper.filter((p) => !usedRefs.has(p.ref)).map((p) => p.ref),
  };
}

export type PairClass = {
  kind: "same" | "format" | "content" | "key" | "format-mismatch";
  /** Which fields differ in content: "stem", "context", "option B", ... */
  where: string[];
  detail: string[];
};

/** What correcting `bank` to `paper` would change, worst class first. */
export function classifyPair(bank: BankSide, paper: PaperSide): PairClass {
  if (bank.contentHash === paper.contentHash) return { kind: "same", where: [], detail: [] };
  if (bank.format !== paper.format) {
    return { kind: "format-mismatch", where: [], detail: [`${bank.format} -> ${paper.format}`] };
  }
  const where: string[] = [];
  const detail: string[] = [];
  const look = (name: string, a: string | null, b: string | null) => {
    const c = compareText(a, b);
    if (c.kind !== "content") return;
    where.push(name);
    detail.push(`${name}: bank [${c.onlyA.join(" ")}] paper [${c.onlyB.join(" ")}]`);
  };
  look("stem", bank.text, paper.stem);
  look("context", bank.context, paper.context);
  if (bank.format === "mcq") {
    const labels = [...new Set([...bank.options.map((o) => o.label), ...paper.options.map((o) => o.label)])].sort();
    for (const l of labels) {
      look(`option ${l}`, bank.options.find((o) => o.label === l)?.text ?? null, paper.options.find((o) => o.label === l)?.text ?? null);
    }
    const bankKey = bank.options.find((o) => o.is_correct)?.label ?? null;
    const paperKey = paper.answer?.trim().toUpperCase() || null;
    if (bankKey !== paperKey) {
      return { kind: "key", where: [...where, "key"], detail: [...detail, `key: bank ${bankKey} paper ${paperKey}`] };
    }
  }
  // Fingerprints differ but no field says anything different: typesetting only.
  return { kind: where.length ? "content" : "format", where, detail };
}
