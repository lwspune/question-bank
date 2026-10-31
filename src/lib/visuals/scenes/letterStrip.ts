/**
 * Coding-Decoding (owner, 2026-10-31): a letter code worked on an A-Z ruler.
 * The rule is written once as a pipeline of steps and proved on the
 * question's own example words, each of which must give its printed code;
 * the asked word is then put through it and the option with that code is
 * the answer. Each step adds a row of letter tiles; a letter that moves
 * jumps along the ruler as it changes.
 *
 *   examples  0 to 3 of { word, code }: the pairs the question gives.
 *   rule      1 to 4 steps, applied in order. A step may name a stretch of
 *             the word with `from`/`to` (1-based; -1 is the last letter),
 *             or (shift, opposite, numbers) list its letters with `at`:
 *               { op: "shift", by }       by a number, a list repeated along
 *                                         the stretch, "position" or "-position"
 *               { op: "opposite" }        A and Z, B and Y (positions add to 27)
 *               { op: "reverse" }         { op: "swapPairs" }   { op: "swap", a, b }
 *               { op: "numbers", f? }     each letter as f(x), x its position,
 *                                         written one after another (last step)
 *               { op: "sum", f?, then? }  f(x) added up, then `then` of the
 *                                         total (last step)
 *             `show` (plain text) replaces a step's own caption.
 *   ask       { word } (how is it written) or { code } (which word gives it).
 *   options   the options as printed. Codes compare as capital letters and
 *             digits only, so "13 20 6" equals "13206".
 *
 * The check is the number of the one option that matches (1 for A), 0 when
 * none or several do; the picture names it by its letter. Beats: example, check, apply, answer.
 */
import { compileExpr } from "../expr";
import { arrowHead, easeInOut, lerp, num, progressOf, round, text } from "../geometry";
import { obj, ParamError, plainLabel, safely } from "../params";
import type { Scene, Shape, Tone } from "../types";

export type Step =
  | { op: "shift"; by: number | number[] | "position" | "-position"; from?: number; to?: number; at?: number[]; show?: string }
  | { op: "opposite"; from?: number; to?: number; at?: number[]; show?: string }
  | { op: "reverse" | "swapPairs"; from?: number; to?: number; show?: string }
  | { op: "swap"; a: number; b: number; show?: string }
  | { op: "numbers"; f?: string; from?: number; to?: number; at?: number[]; show?: string }
  | { op: "sum"; f?: string; then?: string; show?: string };

/** One step's effect on one word: the new row and how it was made. */
interface Stage {
  caption: string;
  cells: string[];
  /** For a reorder: the old index each new cell came from. */
  perm?: number[];
  /** For a letter step: the indices it changed, in order, with the ruler move each made. */
  moves?: { at: number; from: number; to: number; tag: string }[];
  /** The sum line under a sum step. */
  sumLine?: string;
}

interface Run {
  word: string;
  stages: Stage[];
  code: string;
}

export interface StripParams {
  examples: { run: Run; printed: string }[];
  steps: Step[];
  ask: "word" | "code";
  /** The asked word worked through (for a decode, the matching option's word). */
  target: Run | undefined;
  askedCode: string;
  options: string[];
  answer: number;
}

const MAX_LETTERS = 12;
const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const W = 360;
const CELL = 13;
const RX0 = (W - 26 * CELL) / 2;
const RT = 34;
const RULER_BOTTOM = 66;
const TW = 28;
const TH = 24;
const GAP = 20;
const HEAD = 18;
const LINE = 18;

const letterOf = (k: number) => "ABCDE"[k - 1];
const norm = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, "");
const signed = (d: number) => (d >= 0 ? `+${d}` : `−${-d}`);
const pretty = (f: string) => f.replace(/\s+/g, " ").replace(/\bx\b/g, "n").replace(/-/g, "−").replace(/\*/g, "×");

function fn(src: unknown, field: string): (x: number) => number {
  const r = compileExpr(src, {});
  if ("error" in r) throw new ParamError(`${field}: ${r.error}`);
  return r.fn;
}

/** A stretch's 0-based [start, end] on a word of n letters. */
function stretch(s: { from?: number; to?: number }, n: number, word: string): [number, number] {
  const at = (v: number) => (v > 0 ? v : n + 1 + v);
  const a = at(s.from ?? 1);
  const b = at(s.to ?? -1);
  if (!(a >= 1 && b <= n && a <= b)) throw new ParamError(`${word}: letters ${s.from ?? 1} to ${s.to ?? -1} are off the word (stretch has ${n} positions)`);
  return [a - 1, b - 1];
}

const span = (a: number, b: number, n: number) => (a === 0 && b === n - 1 ? "" : a === b ? ` (letter ${a + 1})` : ` (letters ${a + 1}–${b + 1})`);

/** The letters a step changes, in order, and how its caption names them. */
function targets(s: { from?: number; to?: number; at?: number[] }, n: number, word: string): { idx: number[]; where: string } {
  if (s.at) {
    const idx = [...new Set(s.at.map((v) => stretch({ from: v, to: v }, n, word)[0]))].sort((x, y) => x - y);
    const names = idx.map((i) => String(i + 1));
    const where = idx.length === n ? "" : names.length === 1 ? ` (letter ${names[0]})` : ` (letters ${names.slice(0, -1).join(", ")} and ${names.at(-1)})`;
    return { idx, where };
  }
  const [a, b] = stretch(s, n, word);
  return { idx: Array.from({ length: b - a + 1 }, (_, k) => a + k), where: span(a, b, n) };
}

function shiftCaption(by: number | number[] | "position" | "-position", count: number): string {
  if (by === "position") return "+1, +2, +3 … by place";
  if (by === "-position") return "−1, −2, −3 … by place";
  if (typeof by === "number" || by.length === 1) return `each letter ${signed(typeof by === "number" ? by : by[0])}`;
  const used = by.slice(0, count);
  const shown = used.slice(0, 6).map(signed).join(" ") + (used.length > 6 ? " …" : "");
  return by.length < count ? `${shown} repeated` : shown;
}

/** Put a word through the steps, keeping every row. */
function run(word: string, steps: Step[]): Run {
  const n = word.length;
  let cells = word.split("");
  const stages: Stage[] = [];
  let code = "";
  for (const s of steps) {
    if (s.op === "reverse" || s.op === "swapPairs" || s.op === "swap") {
      const perm = cells.map((_, i) => i);
      let caption: string;
      if (s.op === "swap") {
        const [a] = stretch({ from: s.a, to: s.a }, n, word);
        const [b] = stretch({ from: s.b, to: s.b }, n, word);
        [perm[a], perm[b]] = [perm[b], perm[a]];
        caption = `swap letters ${a + 1} and ${b + 1}`;
      } else {
        const [a, b] = stretch(s, n, word);
        if (s.op === "reverse") for (let i = a; i <= b; i++) perm[i] = b - (i - a);
        else for (let i = a; i + 1 <= b; i += 2) [perm[i], perm[i + 1]] = [i + 1, i];
        caption = (s.op === "reverse" ? "reverse" : "swap in pairs") + span(a, b, n);
      }
      cells = perm.map((j) => cells[j]);
      stages.push({ caption: s.show ?? caption, cells, perm });
      continue;
    }
    if (s.op === "sum") {
      const f = fn(s.f ?? "x", "sum.f");
      const vals = cells.map((c) => f(ABC.indexOf(c) + 1));
      const total = vals.reduce((a, b) => a + b, 0);
      const out = s.then === undefined ? total : fn(s.then, "sum.then")(total);
      if (![...vals, out].every((v) => Number.isInteger(v))) throw new ParamError(`${word}: the sum step must give whole numbers`);
      let line = `${vals.map(num).join(" + ")} = ${num(total)}`;
      if (s.then !== undefined && out !== total) line += `;  ${pretty(s.then).replace(/\bn\b/g, num(total))} = ${num(out)}`;
      const moves = cells.map((c, i) => ({ at: i, from: ABC.indexOf(c), to: -1, tag: `${c} = ${ABC.indexOf(c) + 1}` }));
      stages.push({ caption: s.show ?? (s.f && s.f.trim() !== "x" ? `${pretty(s.f)}, added up` : "letter numbers, added up"), cells: vals.map(num), moves, sumLine: line });
      code = String(out);
      continue;
    }
    if (s.op === "numbers") {
      const f = fn(s.f ?? "x", "numbers.f");
      const { idx, where } = targets(s, n, word);
      const next = [...cells];
      const moves: Stage["moves"] = [];
      for (const i of idx) {
        const pos = ABC.indexOf(cells[i]) + 1;
        const v = f(pos);
        if (!Number.isInteger(v) || v < 0) throw new ParamError(`${word}: ${cells[i]} gives ${v}, not a whole number`);
        next[i] = String(v);
        moves.push({ at: i, from: pos - 1, to: -1, tag: v === pos ? `${cells[i]} = ${pos}` : `${cells[i]} = ${pos} → ${v}` });
      }
      cells = next;
      stages.push({ caption: (s.show ?? (s.f && s.f.trim() !== "x" ? `letter number ${pretty(s.f)}` : "letter number")) + where, cells, moves });
      code = cells.join("");
      continue;
    }
    // shift / opposite: one letter at a time along the stretch
    if (s.op !== "shift" && s.op !== "opposite") throw new ParamError(`unknown step ${s.op}`);
    const { idx, where } = targets(s, n, word);
    const next = [...cells];
    const moves: Stage["moves"] = [];
    for (const [k, i] of idx.entries()) {
      const from = ABC.indexOf(cells[i]);
      if (from < 0) throw new ParamError(`${word}: a letter step after a number step`);
      let to: number;
      let tag: string;
      if (s.op === "opposite") {
        to = 25 - from;
        tag = `${ABC[from]}↔${ABC[to]}`;
      } else {
        const d = s.by === "position" ? k + 1 : s.by === "-position" ? -(k + 1) : typeof s.by === "number" ? s.by : s.by[k % s.by.length];
        to = (((from + d) % 26) + 26) % 26;
        // A jump past Z (or A) comes round the other end; say so, or the arc's direction misleads.
        tag = signed(d) + (from + d > 25 ? " past Z" : from + d < 0 ? " past A" : "");
      }
      next[i] = ABC[to];
      moves.push({ at: i, from, to, tag });
    }
    cells = next;
    const caption = s.op === "opposite" ? "opposite letter (A↔Z)" : shiftCaption(s.by, idx.length);
    stages.push({ caption: (s.show ?? caption) + where, cells, moves });
  }
  return { word, stages, code: code || cells.join("") };
}

/** The code a word gets under the steps (for tests and the brief's own checks). */
export function applyRule(word: string, steps: Step[]): string {
  return run(word, steps).code;
}

function readWord(v: unknown, field: string): string {
  if (typeof v !== "string") throw new ParamError(`${field} must be a word`);
  const w = v.trim().toUpperCase();
  if (!/^[A-Z]+$/.test(w)) throw new ParamError(`${field} must be letters only`);
  if (w.length < 2 || w.length > MAX_LETTERS) throw new ParamError(`${field} must be 2 to ${MAX_LETTERS} letters`);
  return w;
}

function readStep(raw: unknown, i: number, last: boolean): Step {
  const s = obj(raw);
  const f = `rule[${i}]`;
  const pos = (k: string) => {
    const v = s[k];
    if (v === undefined) return undefined;
    if (!Number.isInteger(v) || v === 0 || Math.abs(v as number) > MAX_LETTERS) throw new ParamError(`${f}.${k} must be a letter position (1 to 12, or -1 for the last)`);
    return v as number;
  };
  const show = s.show === undefined ? undefined : plainLabel(s.show, `${f}.show`, 34);
  const where = { from: pos("from"), to: pos("to") };
  let at: number[] | undefined;
  if (s.at !== undefined) {
    if (!Array.isArray(s.at) || s.at.length < 1 || s.at.length > MAX_LETTERS || !s.at.every((v) => Number.isInteger(v) && v !== 0 && Math.abs(v) <= MAX_LETTERS))
      throw new ParamError(`${f}.at must list letter positions (1 to 12, or -1 for the last)`);
    if (where.from !== undefined || where.to !== undefined) throw new ParamError(`${f}: give at, or from and to, not both`);
    if (s.op !== "shift" && s.op !== "opposite" && s.op !== "numbers") throw new ParamError(`${f}: only shift, opposite and numbers take at`);
    at = s.at as number[];
  }
  switch (s.op) {
    case "shift": {
      const by = s.by;
      const okNum = (v: unknown) => Number.isInteger(v) && Math.abs(v as number) <= 25;
      if (!(by === "position" || by === "-position" || okNum(by) || (Array.isArray(by) && by.length >= 1 && by.length <= MAX_LETTERS && by.every(okNum))))
        throw new ParamError(`${f}.by must be a whole number, a list of them, "position" or "-position"`);
      return { op: "shift", by: by as number | number[] | "position" | "-position", ...where, at, show };
    }
    case "opposite":
      return { op: "opposite", ...where, at, show };
    case "reverse":
    case "swapPairs":
      return { op: s.op, ...where, show };
    case "swap": {
      const a = pos("a");
      const b = pos("b");
      if (a === undefined || b === undefined) throw new ParamError(`${f}: a swap names its two letters, a and b`);
      return { op: "swap", a, b, show };
    }
    case "numbers":
    case "sum": {
      if (!last) throw new ParamError(`${f}: a ${s.op} step must be the last step`);
      const formula = (k: string) => (s[k] === undefined ? undefined : typeof s[k] === "string" ? (s[k] as string) : String(s[k]));
      if (s.op === "numbers") return { op: "numbers", f: formula("f"), ...where, at, show };
      return { op: "sum", f: formula("f"), then: formula("then"), show };
    }
    default:
      throw new ParamError(`${f}.op must be one of shift, opposite, reverse, swapPairs, swap, numbers, sum`);
  }
}

// ---- layout ----

const blockHeight = (r: Run) => HEAD + r.stages.length * (TH + GAP) + TH + (r.stages.at(-1)?.sumLine ? LINE : 0) + LINE;

function layout(p: StripParams) {
  let y = RULER_BOTTOM + 8;
  const ex = p.examples.length ? y : -1;
  if (p.examples.length) y += blockHeight(p.examples[0].run);
  const checks = y;
  y += Math.max(0, p.examples.length - 1) * LINE + (p.examples.length > 1 ? 6 : 0);
  const target = y;
  y += p.target ? blockHeight(p.target) : HEAD + LINE;
  return { ex, checks, target, h: y + 6 };
}

const tileX = (n: number, i: number) => (W - n * TW + 4) / 2 + i * TW;
const rulerX = (i: number) => RX0 + i * CELL + CELL / 2;

export const letterStrip: Scene<StripParams> = {
  id: "letterStrip",
  beats: ["example", "check", "apply", "answer"],

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      if (!Array.isArray(o.rule) || o.rule.length < 1 || o.rule.length > 4) throw new ParamError("rule must be a list of 1 to 4 steps");
      const steps = o.rule.map((s, i, all) => readStep(s, i, i === all.length - 1));
      const exRaw = o.examples ?? [];
      if (!Array.isArray(exRaw) || exRaw.length > 3) throw new ParamError("examples must be a list of up to 3");
      const examples = exRaw.map((e, i) => {
        const eo = obj(e);
        const word = readWord(eo.word, `examples[${i}].word`);
        const printed = plainLabel(eo.code, `examples[${i}].code`, 40);
        const r = run(word, steps);
        if (norm(r.code) !== norm(printed)) throw new ParamError(`the rule gives ${r.code} for ${word}, not ${printed}`);
        return { run: r, printed };
      });
      if (!Array.isArray(o.options) || o.options.length < 2 || o.options.length > 5) throw new ParamError("options must be a list of 2 to 5");
      const options = o.options.map((v, i) => plainLabel(String(v), `options[${i}]`, 40));
      const ask = obj(o.ask);
      let target: Run | undefined;
      let askedCode: string;
      let answer = 0;
      if (ask.word !== undefined) {
        target = run(readWord(ask.word, "ask.word"), steps);
        askedCode = target.code;
        const hits = options.map((v, i) => (norm(v) === norm(target!.code) ? i + 1 : 0)).filter(Boolean);
        answer = hits.length === 1 ? hits[0] : 0;
        return { examples, steps, ask: "word", target, askedCode, options, answer } satisfies StripParams;
      }
      askedCode = plainLabel(ask.code, "ask.code", 40);
      const runs = options.map((v) => (/^[A-Za-z]{2,12}$/.test(v.trim()) ? run(v.trim().toUpperCase(), steps) : undefined));
      const hits = runs.map((r, i) => (r && norm(r.code) === norm(askedCode) ? i + 1 : 0)).filter(Boolean);
      if (hits.length === 1) {
        answer = hits[0];
        target = runs[answer - 1];
      }
      return { examples, steps, ask: "code", target, askedCode, options, answer } satisfies StripParams;
    }),

  check: (p) => p.answer,

  checkText: (p, value) => {
    const proved = p.examples.length ? `The rule gives ${p.examples.map((e) => e.run.word).join(" and ")} their printed codes; ` : "";
    if (!value) return `${proved}no single option matches what the rule gives.`;
    const t = p.target!;
    return p.ask === "word" ? `${proved}${t.word} becomes ${t.code}, option ${letterOf(value)}.` : `${proved}${t.word} becomes ${p.askedCode}, option ${letterOf(value)}.`;
  },

  viewBox: (p) => ({ w: W, h: layout(p).h }),

  duration: (beat) => ({ example: 6000, check: 1500, apply: 6000, answer: 1200 })[beat] ?? 1200,

  frame(p, { played, t }) {
    const out: Shape[] = [];
    const L = layout(p);
    const pe = prog("example");
    const pc = prog("check");
    const pa = prog("apply");
    const pn = prog("answer");

    // The ruler, always there: A to Z with each letter's place under it.
    for (let i = 0; i < 26; i++) {
      out.push({ kind: "rect", x: round(RX0 + i * CELL), y: RT, w: CELL, h: 16, stroke: "line", fill: "card", width: 0.8 });
      out.push(text(round(rulerX(i)), RT + 12, ABC[i], { tone: "fg", size: 9.5, weight: 600, anchor: "middle" }));
      out.push(text(round(rulerX(i)), RT + 26, String(i + 1), { tone: "muted", size: 7, anchor: "middle" }));
    }

    if (L.ex >= 0) {
      const e = p.examples[0];
      if (pe > 0) block(e.run, L.ex, pe, `${e.run.word} → ${e.printed}`, `${e.printed} ✓`);
    }
    if (p.examples.length > 1 && pc > 0) {
      p.examples.slice(1).forEach((e, k) => {
        const shown = Math.max(0, Math.min(1, pc * (p.examples.length - 1) - k));
        if (shown <= 0) return;
        out.push(text(W / 2, L.checks + 13 + k * LINE, `${e.run.word} → ${e.run.code} ${shown >= 0.5 ? "✓" : ""}`.trim(), { tone: shown >= 0.5 ? "good" : "muted", size: 11.5, weight: 600, anchor: "middle", opacity: Math.min(1, shown * 2) }));
      });
    }
    if (pa > 0) {
      if (p.target) {
        const head = p.ask === "word" ? `${p.target.word} → ?` : `? → ${p.askedCode}`;
        block(p.target, L.target, pa, head, undefined);
      } else {
        out.push(text(W / 2, L.target + 13, `? → ${p.askedCode}`, { tone: "fg", size: 12, weight: 700, anchor: "middle" }));
      }
    }
    if (pn > 0) {
      const y = p.target ? L.target + blockHeight(p.target) - 5 : L.target + HEAD + 12;
      const msg = !p.answer
        ? "no single option matches"
        : p.ask === "word"
          ? `${p.target!.word} → ${p.target!.code}: option ${letterOf(p.answer)}`
          : `${p.target!.word} → ${p.askedCode}: option ${letterOf(p.answer)}`;
      out.push(text(W / 2, y, msg, { tone: p.answer ? "good" : "bad", size: 12.5, weight: 700, anchor: "middle", opacity: Math.min(1, pn * 2) }));
    }
    return out;

    function block(r: Run, y0: number, progress: number, head: string, done: string | undefined) {
      const n = r.word.length;
      const K = r.stages.length;
      out.push(text(W / 2, y0 + 12, head, { tone: "muted", size: 11, weight: 600, anchor: "middle" }));
      const rowY = (k: number) => y0 + HEAD + k * (TH + GAP);
      r.word.split("").forEach((c, i) => tile(tileX(n, i), rowY(0), c, "line", "fg"));
      let prevCells = r.word.split("");
      r.stages.forEach((st, k0) => {
        const k = k0 + 1;
        const q = Math.max(0, Math.min(1, progress * K - k0));
        if (q <= 0) {
          prevCells = st.cells;
          return;
        }
        out.push(text(W / 2, rowY(k) - GAP / 2 + 4, st.caption, { tone: "amber", size: 10, weight: 600, anchor: "middle", opacity: Math.min(1, q * 4) }));
        const m = st.cells.length;
        if (st.perm) {
          const e = easeInOut(q);
          st.cells.forEach((c, j) => {
            const [x, yy] = lerp([tileX(n, st.perm![j]), rowY(k - 1)], [tileX(m, j), rowY(k)], e);
            tile(x, yy, c, st.perm![j] === j ? "line" : "brand", "fg");
          });
        } else {
          const moves = st.moves ?? [];
          const share = st.sumLine ? 0.75 : 1;
          const qm = Math.min(1, q / share);
          const changed = new Set(moves.map((mv) => mv.at));
          st.cells.forEach((c, j) => {
            if (!changed.has(j)) tile(tileX(m, j), rowY(k), c, "line", "muted");
          });
          moves.forEach((mv, i) => {
            if (qm * moves.length >= i + 0.6) tile(tileX(m, mv.at), rowY(k), st.cells[mv.at], "brand", "fg");
          });
          const active = Math.floor(qm * moves.length);
          if (qm < 1 && active < moves.length) jump(moves[active], tileX(n, moves[active].at), rowY(k - 1), prevCells[moves[active].at]);
          if (st.sumLine && q > share) out.push(text(W / 2, rowY(k) + TH + 14, st.sumLine, { tone: "fg", size: 10.5, weight: 600, anchor: "middle", opacity: Math.min(1, (q - share) * 4) }));
        }
        prevCells = st.cells;
      });
      if (done && progress >= 0.98) {
        const y = rowY(K) + TH + (r.stages.at(-1)?.sumLine ? LINE : 0) + 14;
        out.push(text(W / 2, y, done, { tone: "good", size: 11.5, weight: 700, anchor: "middle" }));
      }
    }

    function tile(x: number, y: number, c: string, stroke: Tone, tone: Tone) {
      out.push({ kind: "rect", x: round(x), y: round(y), w: TW - 4, h: TH, rx: 4, stroke, fill: "card", width: stroke === "brand" ? 1.6 : 1 });
      out.push(text(round(x + (TW - 4) / 2), round(y + TH / 2 + 4.5), c, { tone, size: c.length > 2 ? 9.5 : 12, weight: 700, anchor: "middle" }));
    }

    /** One letter's move on the ruler, with its source tile outlined. */
    function jump(mv: { from: number; to: number; tag: string }, tx: number, ty: number, letter: string) {
      out.push({ kind: "rect", x: round(tx - 2), y: round(ty - 2), w: TW, h: TH + 4, rx: 5, stroke: "amber", width: 1.6 });
      out.push({ kind: "rect", x: round(RX0 + mv.from * CELL), y: RT, w: CELL, h: 16, stroke: "amber", fill: "soft", width: 1.6 });
      out.push(text(round(rulerX(mv.from)), RT + 12, letter, { tone: "fg", size: 9.5, weight: 700, anchor: "middle" }));
      if (mv.to < 0) {
        out.push(text(round(Math.min(W - 40, Math.max(40, rulerX(mv.from)))), RT - 6, mv.tag, { tone: "amber", size: 10.5, weight: 700, anchor: "middle" }));
        return;
      }
      out.push({ kind: "rect", x: round(RX0 + mv.to * CELL), y: RT, w: CELL, h: 16, stroke: "good", fill: "goodSoft", width: 1.6 });
      out.push(text(round(rulerX(mv.to)), RT + 12, ABC[mv.to], { tone: "fg", size: 9.5, weight: 700, anchor: "middle" }));
      const x1 = rulerX(mv.from);
      const x2 = rulerX(mv.to);
      const h = 6 + Math.min(14, Math.abs(mv.to - mv.from) * 1.2);
      const mx = (x1 + x2) / 2;
      out.push({ kind: "path", d: `M${round(x1)} ${RT} Q${round(mx)} ${round(RT - 2 * h)} ${round(x2)} ${RT}`, stroke: "amber", width: 1.6 });
      out.push(arrowHead(round(x2), RT, Math.atan2(2 * h, (x2 - x1) / 2), "amber", 5));
      out.push(text(round(Math.min(W - 24, Math.max(24, mx))), round(RT - h - 4), mv.tag, { tone: "amber", size: 10.5, weight: 700, anchor: "middle" }));
    }

    function prog(beat: string) {
      const order = ["example", "check", "apply", "answer"];
      const later = order.slice(order.indexOf(beat) + 1);
      if (!played.includes(beat) && later.some((b) => played.includes(b))) return 1;
      return progressOf(beat, played, t);
    }
  },
};
