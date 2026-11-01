/**
 * Series (owner, 2026-11-01): a number or letter series worked from its own
 * printed terms. The rule is written once; the scene builds every term from
 * it, refuses a rule that misses a printed term, fills the one gap and picks
 * the option that matches. Three kinds:
 *
 *   numbers  terms: 3 to 9 numbers with one "?". rule:
 *              { type: "step", f, show? }   each term from the one before:
 *                                           f(x = previous term, n = step 1, 2, ...);
 *                                           f and show may be lists used in turn
 *                                           (x2, +3, x2, +3 ...)
 *              { type: "term", f, show? }   each term from its place, f(n), n = 1, 2, ...
 *              { type: "diff", f }          second differences are f(n); the first
 *                                           two terms must be printed
 *              { type: "alternate", odd, even }  two step or term rules taking turns
 *            `show` labels a step with {formula in n} filled in, e.g. "×{n+2} +1";
 *            without it a step is labelled by its difference.
 *   letters  terms: 2 to 8 clusters of 1 to 4 letters with one "?"; cols: one
 *            { by } per letter place, a whole number or a formula in n (the
 *            step), so a place can move +3, +4, +5. Letters wrap round Z to A.
 *   block    line: the printed letters with _ for each blank (spaces ignored);
 *            block: the 2 to 9 letters that repeat from the line's start.
 *
 *   options  the options as printed. Numbers compare as numbers, letters as
 *            capital letters only.
 *
 * The check is the number of the one matching option (1 for A), 0 when none or
 * several match. Beats: terms, rule, answer.
 */
import { compileExpr } from "../expr";
import { arrowHead, num, progressOf, round, text } from "../geometry";
import { obj, ParamError, plainLabel, safely } from "../params";
import type { Scene, Shape, Tone } from "../types";

type NumRule =
  | { type: "step"; f: string[]; show?: string[] }
  | { type: "term"; f: string; show?: string }
  | { type: "diff"; f: string }
  | { type: "alternate"; odd: NumRule; even: NumRule };

interface NumParams {
  kind: "numbers";
  rule: NumRule;
  /** Every term, the gap filled. */
  values: number[];
  gap: number;
  /** A label for each step between term i and term i+1 (diff: the first differences). */
  steps: string[];
  /** Second differences under the steps (diff rule only). */
  second: string[];
  /** A label under each term (term rule only). */
  under: string[];
  options: string[];
  answer: number;
}

interface LetterParams {
  kind: "letters";
  values: string[];
  gap: number;
  /** For each step, each place's move label. */
  moves: string[][];
  options: string[];
  answer: number;
}

interface BlockParams {
  kind: "block";
  block: string;
  /** The full line, blanks filled. */
  filled: string;
  blanks: number[];
  read: string;
  options: string[];
  answer: number;
}

export type SeriesParams = NumParams | LetterParams | BlockParams;

const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const W = 360;
const MAX_TERMS = 9;
const letterOf = (k: number) => "ABCDE"[k - 1];
const same = (a: number, b: number) => Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(b));
/** A term or step as printed: series decimals run to 3 or 4 places (76.8 x 0.8 = 61.44, then 49.152). */
const val = (v: number) => num(v, 4);
const signed = (d: number) => (d >= 0 ? `+${val(d)}` : val(d));
const lettersOnly = (s: string) => s.toUpperCase().replace(/[^A-Z]/g, "");
const asNumber = (s: string) => {
  const t = s.replace(/,/g, "").trim();
  return /^-?\d+(\.\d+)?$/.test(t) ? Number(t) : NaN;
};

/** A formula in x and n, compiled once per n. */
function formula(src: unknown, field: string): (x: number, n: number) => number {
  if (typeof src !== "string" || !src.trim()) throw new ParamError(`${field} must be a formula`);
  const probe = compileExpr(src, { n: 1 });
  if ("error" in probe) throw new ParamError(`${field}: ${probe.error}`);
  return (x, n) => {
    const r = compileExpr(src, { n });
    if ("error" in r) throw new ParamError(`${field}: ${r.error}`);
    return r.fn(x);
  };
}

/** "×{n+2} +1" at n = 1 is "×3 +1". */
function fillShow(show: string, n: number, field: string): string {
  return show.replace(/\{([^{}]+)\}/g, (_, src: string) => {
    const r = compileExpr(src, { n });
    if ("error" in r) throw new ParamError(`${field}: ${r.error}`);
    return num(r.fn(0));
  });
}

function readOptions(raw: unknown): string[] {
  if (!Array.isArray(raw) || raw.length < 2 || raw.length > 5) throw new ParamError("options must be a list of 2 to 5");
  return raw.map((v, i) => plainLabel(String(v), `options[${i}]`, 30));
}

function pick(options: string[], match: (o: string) => boolean): number {
  const hits = options.map((o, i) => (match(o) ? i + 1 : 0)).filter(Boolean);
  return hits.length === 1 ? hits[0] : 0;
}

/** The terms as printed: numbers (or letter clusters) and exactly one "?". */
function readTerms<T>(raw: unknown, read: (v: unknown, i: number) => T): { printed: (T | null)[]; gap: number } {
  if (!Array.isArray(raw) || raw.length < 3 || raw.length > MAX_TERMS) throw new ParamError(`terms must be a list of 3 to ${MAX_TERMS}`);
  const printed = raw.map((v, i) => (v === "?" ? null : read(v, i)));
  const gaps = printed.map((v, i) => (v === null ? i : -1)).filter((i) => i >= 0);
  if (gaps.length !== 1) throw new ParamError("terms must have exactly one ? (the term to find)");
  return { printed, gap: gaps[0] };
}

// ---- numbers ----

function readRule(raw: unknown, field: string, nested = false): NumRule {
  const r = obj(raw);
  switch (r.type) {
    case "step": {
      const fs = Array.isArray(r.f) ? r.f : [r.f];
      if (fs.length < 1 || fs.length > 4) throw new ParamError(`${field}.f must be a formula or a list of 1 to 4`);
      fs.forEach((f, i) => formula(f, `${field}.f[${i}]`));
      let shows: string[] | undefined;
      if (r.show !== undefined) {
        const raw = Array.isArray(r.show) ? r.show : [r.show];
        if (raw.length !== fs.length) throw new ParamError(`${field}.show must give one label for each formula in f`);
        shows = raw.map((v, i) => plainLabel(v, `${field}.show[${i}]`, 24));
      }
      return { type: "step", f: fs as string[], show: shows };
    }
    case "term":
      formula(r.f, `${field}.f`);
      return { type: "term", f: r.f as string, show: r.show === undefined ? undefined : plainLabel(r.show, `${field}.show`, 24) };
    case "diff":
      if (nested) throw new ParamError(`${field}: a diff rule cannot take turns`);
      formula(r.f, `${field}.f`);
      return { type: "diff", f: r.f as string };
    case "alternate":
      if (nested) throw new ParamError(`${field}: rules take turns only once`);
      return { type: "alternate", odd: readRule(r.odd, `${field}.odd`, true), even: readRule(r.even, `${field}.even`, true) };
    default:
      throw new ParamError(`${field}.type must be step, term, diff or alternate`);
  }
}

/**
 * Build the terms at the given places (0-based into the full list) from a step
 * or term rule, with a label for each term it reaches: a step's label, or a
 * term rule's `show`.
 */
function runSimple(rule: Extract<NumRule, { type: "step" | "term" }>, printed: (number | null)[], places: number[], field: string) {
  const fs = rule.type === "step" ? rule.f.map((src, i) => formula(src, `${field}.f[${i}]`)) : [formula(rule.f, `${field}.f`)];
  const out = new Map<number, number>();
  const label = new Map<number, string>();
  places.forEach((at, k) => {
    if (rule.type === "term") {
      out.set(at, fs[0](0, k + 1));
      if (rule.show) label.set(at, fillShow(rule.show, k + 1, `${field}.show`));
      return;
    }
    if (k === 0) {
      const first = printed[at];
      if (first === null) throw new ParamError("a step rule needs the first term printed");
      out.set(at, first);
      return;
    }
    const prev = out.get(places[k - 1])!;
    const turn = (k - 1) % fs.length;
    const next = fs[turn](prev, k);
    out.set(at, next);
    label.set(at, rule.show ? fillShow(rule.show[turn], k, `${field}.show`) : signed(next - prev));
  });
  return { out, label };
}

function numbers(o: Record<string, unknown>): NumParams {
  const { printed, gap } = readTerms<number>(o.terms, (v, i) => {
    if (typeof v !== "number" || !Number.isFinite(v)) throw new ParamError(`terms[${i}] must be a number or "?"`);
    return v;
  });
  const rule = readRule(o.rule, "rule");
  const n = printed.length;
  const values: number[] = new Array(n);
  let steps: string[] = new Array(n - 1).fill("");
  let second: string[] = [];
  const under: string[] = new Array(n).fill("");
  const all = Array.from({ length: n }, (_, i) => i);

  if (rule.type === "diff") {
    if (printed[0] === null || printed[1] === null) throw new ParamError("a diff rule needs the first two terms printed");
    const f = formula(rule.f, "rule.f");
    values[0] = printed[0];
    values[1] = printed[1];
    let d = printed[1] - printed[0];
    const d2: number[] = [];
    for (let i = 2; i < n; i++) {
      const dd = f(0, i - 1);
      d2.push(dd);
      d += dd;
      values[i] = values[i - 1] + d;
    }
    steps = values.slice(1).map((v, i) => signed(v - values[i]));
    second = d2.map(signed);
  } else if (rule.type === "alternate") {
    // Two series taking turns: each term's label sits under it, since its step joins it to the term two places back.
    for (const [r, places, name] of [[rule.odd, all.filter((i) => i % 2 === 0), "rule.odd"], [rule.even, all.filter((i) => i % 2 === 1), "rule.even"]] as const) {
      const { out, label } = runSimple(r as Extract<NumRule, { type: "step" | "term" }>, printed, places, name);
      out.forEach((v, at) => (values[at] = v));
      label.forEach((l, at) => (under[at] = l));
    }
  } else {
    const { out, label } = runSimple(rule, printed, all, "rule");
    out.forEach((v, at) => (values[at] = v));
    label.forEach((l, at) => (rule.type === "term" ? (under[at] = l) : (steps[at - 1] = l)));
  }

  printed.forEach((p, i) => {
    if (p !== null && !same(values[i], p)) throw new ParamError(`the rule gives ${val(values[i])} for term ${i + 1}, not ${val(p)}`);
  });
  const options = readOptions(o.options);
  const answer = pick(options, (opt) => same(asNumber(opt), values[gap]));
  return { kind: "numbers", rule, values, gap, steps, second, under, options, answer };
}

// ---- letters ----

function letters(o: Record<string, unknown>): LetterParams {
  const { printed, gap } = readTerms<string>(o.terms, (v, i) => {
    if (typeof v !== "string" || !/^[A-Za-z]{1,4}$/.test(v.trim())) throw new ParamError(`terms[${i}] must be 1 to 4 letters or "?"`);
    return v.trim().toUpperCase();
  });
  if (printed[0] === null) throw new ParamError("a letter series needs the first term printed");
  const width = printed[0].length;
  if (!printed.every((t) => t === null || t.length === width)) throw new ParamError("every term must have the same number of letters");
  if (!Array.isArray(o.cols) || o.cols.length !== width) throw new ParamError(`cols must give one step for each of the ${width} letter places`);
  const by = o.cols.map((c, j) => {
    const v = obj(c).by;
    if (Number.isInteger(v) && Math.abs(v as number) <= 25) return () => v as number;
    if (typeof v === "string") {
      const f = formula(v, `cols[${j}].by`);
      return (n: number) => {
        const s = f(0, n);
        if (!Number.isInteger(s)) throw new ParamError(`cols[${j}].by gives ${num(s)} at step ${n}, not a whole number`);
        return s;
      };
    }
    throw new ParamError(`cols[${j}].by must be a whole number or a formula in n`);
  });
  const values: string[] = [printed[0]];
  const moves: string[][] = [];
  for (let i = 1; i < printed.length; i++) {
    const prev = values[i - 1];
    const step = by.map((f) => f(i));
    values.push(prev.split("").map((c, j) => ABC[(((ABC.indexOf(c) + step[j]) % 26) + 26) % 26]).join(""));
    moves.push(step.map(signed));
  }
  printed.forEach((p, i) => {
    if (p !== null && values[i] !== p) throw new ParamError(`the steps give ${values[i]} for term ${i + 1}, not ${p}`);
  });
  const options = readOptions(o.options);
  const answer = pick(options, (opt) => lettersOnly(opt) === values[gap]);
  return { kind: "letters", values, gap, moves, options, answer };
}

// ---- block ----

function blockKind(o: Record<string, unknown>): BlockParams {
  if (typeof o.line !== "string") throw new ParamError("line must be the printed letters with _ for each blank");
  const line = o.line.replace(/\s+/g, "").toUpperCase();
  if (!/^[A-Z_]{4,40}$/.test(line) || !line.includes("_")) throw new ParamError("line must be 4 to 40 letters and blanks (_), with at least one blank");
  if (typeof o.block !== "string" || !/^[A-Za-z]{2,9}$/.test(o.block.trim())) throw new ParamError("block must be 2 to 9 letters");
  const block = o.block.trim().toUpperCase();
  const blanks: number[] = [];
  let filled = "";
  for (let i = 0; i < line.length; i++) {
    const want = block[i % block.length];
    if (line[i] === "_") blanks.push(i);
    else if (line[i] !== want) throw new ParamError(`the block puts ${want} at place ${i + 1}, but the line has ${line[i]}`);
    filled += want;
  }
  const read = blanks.map((i) => filled[i]).join("");
  const options = readOptions(o.options);
  const answer = pick(options, (opt) => lettersOnly(opt) === read);
  return { kind: "block", block, filled, blanks, read, options, answer };
}

// ---- layout and drawing ----

/** Letter tiles are narrower, so the gap between two terms holds each place's "+6". */
const termW = (p: SeriesParams, n: number) => (p.kind === "letters" ? Math.min(28, (W - 16) / n - 26) : Math.min(48, (W - 16) / n - 8));
const termX = (p: SeriesParams, n: number, i: number) => {
  const w = termW(p, n);
  const gap = (W - n * w) / (n + 1);
  return gap + i * (w + gap);
};
const TOP = 14;
const TH = 26;
const ARC = 30;

/** Where each part of a number or letter series sits, top to bottom. */
function rows(p: NumParams | LetterParams) {
  const alt = p.kind === "numbers" && p.rule.type === "alternate" ? p.rule : undefined;
  // In two series taking turns, a step series arcs (places 1, 3, 5 above the row, 2, 4, 6 below); a term series labels each term under it.
  const arcAbove = alt?.odd.type === "step";
  const arcBelow = alt?.even.type === "step";
  const top = TOP + (arcAbove ? ARC : 0);
  const below = top + (p.kind === "letters" ? p.values[0].length : 1) * (TH + 8) - 8;
  if (p.kind === "letters") return { top, below, steps: 0, second: 0, under: 0, h: below + 34 };
  const steps = p.steps.some(Boolean) ? 34 : 0;
  const second = p.second.length ? 26 : 0;
  const under = p.under.some(Boolean) && (!alt || alt.odd.type === "term" || alt.even.type === "term") ? 20 : 0;
  const lift = arcBelow ? ARC : 0;
  return { top, below, steps: steps + lift, second, under, h: below + lift + steps + second + under + 30 };
}

function height(p: SeriesParams): number {
  if (p.kind === "block") return TOP + 18 + Math.ceil(p.filled.length / p.block.length) * (TH + 6) + 34;
  return rows(p).h;
}

const answerText = (p: SeriesParams) => {
  if (!p.answer) return "no single option matches";
  const got = p.kind === "numbers" ? val(p.values[p.gap]) : p.kind === "letters" ? p.values[p.gap] : p.read;
  return `${p.kind === "block" ? "the blanks read " : "? = "}${got}: option ${letterOf(p.answer)}`;
};

export const series: Scene<SeriesParams> = {
  id: "series",
  beats: ["terms", "rule", "answer"],

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      if (o.kind === "numbers") return numbers(o);
      if (o.kind === "letters") return letters(o);
      if (o.kind === "block") return blockKind(o);
      throw new ParamError("kind must be numbers, letters or block");
    }),

  check: (p) => p.answer,

  checkText: (p, value) => {
    const base = p.kind === "block" ? `The block ${p.block} repeats through the line` : "The rule gives every printed term";
    return value ? `${base}; ${answerText(p).replace(/^\? = /, "the missing term is ")}.` : `${base}; no single option matches.`;
  },

  viewBox: (p) => ({ w: W, h: height(p) }),

  duration: (beat) => ({ terms: 1500, rule: 5000, answer: 1200 })[beat] ?? 1200,

  frame(p, { played, t }) {
    const out: Shape[] = [];
    const prog = (beat: string) => {
      const order = ["terms", "rule", "answer"];
      if (!played.includes(beat) && order.slice(order.indexOf(beat) + 1).some((b) => played.includes(b))) return 1;
      return progressOf(beat, played, t);
    };
    const pt = prog("terms");
    const pr = prog("rule");
    const pa = prog("answer");
    const H = height(p);

    if (p.kind === "block") {
      const L = p.block.length;
      const rows = Math.ceil(p.filled.length / L);
      const w = Math.min(34, (W - 16) / L - 6);
      const gap = (W - L * w) / (L + 1);
      const x = (j: number) => gap + j * (w + gap);
      const y = (r: number) => TOP + 18 + r * (TH + 6);
      if (pr > 0) out.push(text(W / 2, TOP + 6, `the block ${p.block} repeats`, { tone: "amber", size: 11, weight: 700, anchor: "middle", opacity: Math.min(1, pr * 3) }));
      const blank = new Set(p.blanks);
      const order = new Map(p.blanks.map((b, k) => [b, k]));
      for (let i = 0; i < p.filled.length; i++) {
        if (pt <= 0) break;
        const r = Math.floor(i / L);
        const j = i % L;
        const isBlank = blank.has(i);
        const shown = isBlank ? pr * p.blanks.length > order.get(i)! + 0.5 : true;
        out.push({ kind: "rect", x: round(x(j)), y: round(y(r)), w: round(w), h: TH, rx: 4, stroke: isBlank ? (shown ? "good" : "amber") : "line", fill: isBlank && shown ? "goodSoft" : "card", width: isBlank ? 1.6 : 1, dash: isBlank && !shown ? "3 2" : undefined, opacity: pt });
        out.push(text(round(x(j) + w / 2), round(y(r) + TH / 2 + 4.5), isBlank && !shown ? "_" : p.filled[i], { tone: isBlank ? "fg" : "muted", size: 12, weight: 700, anchor: "middle", opacity: pt }));
      }
      if (pa > 0) out.push(text(W / 2, H - 10, answerText(p), { tone: p.answer ? "good" : "bad", size: 12.5, weight: 700, anchor: "middle", opacity: Math.min(1, pa * 2) }));
      return out;
    }

    const vals = p.kind === "numbers" ? p.values.map((v) => val(v)) : p.values;
    const n = vals.length;
    const w = termW(p, n);
    const x = (i: number) => termX(p, n, i);
    const R = rows(p);
    const places = p.kind === "letters" ? p.values[0].length : 1;
    const rowY = (r: number) => R.top + r * (TH + 8);
    const filledGap = pa > 0.3;

    // The terms: a tile for each (a column of letter tiles for a letter series).
    for (let i = 0; i < n; i++) {
      const gapTile = i === p.gap;
      for (let r = 0; r < places; r++) {
        const ch = p.kind === "letters" ? vals[i][r] : vals[i];
        const label = gapTile && !filledGap ? "?" : ch;
        const tone: Tone = gapTile ? (filledGap ? "good" : "amber") : "line";
        out.push({ kind: "rect", x: round(x(i)), y: rowY(r), w: round(w), h: TH, rx: 4, stroke: tone, fill: gapTile && filledGap ? "goodSoft" : "card", width: gapTile ? 1.6 : 1, dash: gapTile && !filledGap ? "3 2" : undefined, opacity: pt });
        out.push(text(round(x(i) + w / 2), rowY(r) + TH / 2 + 4.5, label, { tone: "fg", size: label.length > 5 ? 9.5 : label.length > 3 ? 11 : 12.5, weight: 700, anchor: "middle", opacity: pt }));
      }
    }

    // The rule: one step at a time, left to right.
    const revealed = (k: number) => Math.max(0, Math.min(1, pr * (n - 1) - k));
    const fade = (q: number) => Math.min(1, q * 3);
    const arc = (i1: number, i2: number, up: boolean, label: string, q: number, tone: Tone) => {
      const x1 = x(i1) + w / 2;
      const x2 = x(i2) + w / 2;
      const y = up ? R.top - 3 : R.below + 3;
      const dy = up ? -18 : 14;
      const mx = (x1 + x2) / 2;
      out.push({ kind: "path", d: `M${round(x1)} ${y} Q${round(mx)} ${y + dy} ${round(x2 - 3)} ${y}`, stroke: tone, width: 1.4, opacity: fade(q) });
      out.push(arrowHead(round(x2 - 3), y, up ? Math.PI / 2 - 0.5 : -Math.PI / 2 + 0.5, tone, 4.5));
      out.push(text(round(mx), up ? y + dy - 4 : y + dy + 12, label, { tone, size: 10, weight: 700, anchor: "middle", opacity: fade(q) }));
    };

    if (p.kind === "letters") {
      for (let k = 0; k < n - 1; k++) {
        const q = revealed(k);
        if (q <= 0) continue;
        const mx = (x(k) + w + x(k + 1)) / 2;
        p.moves[k].forEach((m, r) => out.push(text(round(mx), rowY(r) + TH / 2 + 4, m, { tone: "amber", size: 9.5, weight: 700, anchor: "middle", opacity: fade(q) })));
      }
    } else if (p.rule.type === "alternate") {
      // Two series taking turns, told apart by colour: a step series arcs to the term two places on
      // (places 1, 3, 5 above the row, 2, 4, 6 below); a term series labels each of its terms under it.
      const rule = p.rule;
      for (let i = 0; i < n; i++) {
        const own = i % 2 === 0 ? rule.odd : rule.even;
        const tone: Tone = i % 2 === 0 ? "amber" : "brand";
        const q = revealed(Math.max(0, i - 1));
        if (!p.under[i] || q <= 0) continue;
        if (own.type === "step") arc(i - 2, i, i % 2 === 0, p.under[i], q, tone);
        else out.push(text(round(x(i) + w / 2), R.below + R.steps + 16, p.under[i], { tone, size: 9.5, weight: 700, anchor: "middle", opacity: fade(q) }));
      }
    } else {
      p.steps.forEach((label, k) => {
        const q = revealed(k);
        if (q > 0 && label) arc(k, k + 1, false, label, q, "amber");
      });
      if (p.second.length) {
        const y = R.below + R.steps + 18;
        if (pr > 0) out.push(text(4, y, "Δ²", { tone: "muted", size: 9, anchor: "start", opacity: fade(pr) }));
        p.second.forEach((sd, k) => {
          const q = revealed(k + 1);
          if (q > 0) out.push(text(round(x(k + 1) + w / 2), y, sd, { tone: "brand", size: 10, weight: 700, anchor: "middle", opacity: fade(q) }));
        });
      }
      if (R.under) {
        const y = R.below + R.steps + R.second + 16;
        p.under.forEach((u, i) => {
          const q = revealed(Math.max(0, i - 1));
          if (u && q > 0) out.push(text(round(x(i) + w / 2), y, u, { tone: "brand", size: 9.5, weight: 600, anchor: "middle", opacity: fade(q) }));
        });
      }
    }

    if (pa > 0) out.push(text(W / 2, H - 8, answerText(p), { tone: p.answer ? "good" : "bad", size: 12.5, weight: 700, anchor: "middle", opacity: Math.min(1, pa * 2) }));
    return out;
  },
};
