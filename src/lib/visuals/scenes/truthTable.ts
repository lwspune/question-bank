/**
 * Truth table: the statement letters, then each statement the solution builds,
 * filled row by row, then the answer read off the table. Every value is worked
 * out by the scene (lib/visuals/logic.ts), never typed in by the drafter, so a
 * keyed option that does not hold on every row is refused.
 *
 *   columns  [{ f: "(p & ~q) -> r", label? }]: the statements the solution works
 *            through, in order (the asked statements are added at the end)
 *   ask      equivalent { a, b }            1 when a and b agree on every row
 *            classify   { f, expect }       expect tautology | contradiction | contingency
 *            solve      { f, value, expect } the rows where f has that value all give the
 *                                            letters in expect (e.g. { p: true, q: false })
 *            evaluate   { at, f: [..], expect: [..] }  the values at one row
 *            transform  { of, op, equals }  op negation | converse | inverse | contrapositive | dual
 *
 * Beats: vars, columns, answer.
 */
import { line, progressOf, text } from "../geometry";
import { classify, equivalent, evaluate, parseLogic, rows as allRows, showLogic, transform, varsOf, type Logic, type Transform } from "../logic";
import { obj, optionalLabel, ParamError, plainLabel, safely } from "../params";
import type { Scene, Shape } from "../types";

type Kind = "tautology" | "contradiction" | "contingency";

type Ask =
  | { kind: "equivalent"; a: Logic; b: Logic }
  | { kind: "classify"; f: Logic; expect: Kind }
  | { kind: "solve"; f: Logic; value: boolean; expect: Record<string, boolean> }
  | { kind: "evaluate"; at: Record<string, boolean>; f: Logic[]; expect: boolean[] }
  | { kind: "transform"; of: Logic; op: Transform; made: Logic; equals: Logic }
  | { kind: "transforms"; of: Logic; ops: { op: Transform; made: Logic; equals: Logic }[] };

interface Column {
  f: Logic;
  label: string;
}

export interface TruthParams {
  vars: string[];
  columns: Column[];
  ask: Ask;
  askLabel: string | undefined;
  /** What each letter stands for, in table order ("p: it is raining"). */
  letters: string[];
  /** The answer in words, one or two lines; shown, never checked. */
  say: string[];
}

export interface TruthFacts {
  vars: string[];
  rows: Record<string, boolean>[];
  columns: Column[];
  /** values[c][r]: column c at row r. */
  values: boolean[][];
  value: number;
  /** Rows the answer picks out (solve, evaluate). */
  lit: number[];
  /** Columns the answer compares. */
  marked: number[];
}

const VAR_W = 26;
const PAD = 10;
const TOP = 30;
const HEAD = 26;
/** The header row when a heading wraps onto two lines. */
const HEAD2 = 40;
const ROW = 20;
/** Wider than this and a phone shrinks the table's text below about 9 px. */
const MAX_W = 440;
const MIN_W = 340;

/**
 * A heading longer than 12 characters goes on two lines, split after the main
 * connective (the one outside every bracket) nearest the middle: "(∼p ∨ q) →" over
 * "(p ∨ ∼q)". Failing that, at the space nearest the middle.
 */
export function headingLines(label: string): string[] {
  if (label.length <= 12) return [label];
  const spaces: { at: number; main: boolean }[] = [];
  let depth = 0;
  for (let i = 0; i < label.length; i++) {
    const c = label[i];
    if (c === "(" || c === "[") depth++;
    else if (c === ")" || c === "]") depth--;
    else if (c === " " && i > 0 && "→↔∧∨".includes(label[i - 1])) spaces.push({ at: i, main: depth === 0 });
    else if (c === " " && depth === 0) spaces.push({ at: i, main: false });
  }
  if (!spaces.length) return [label];
  const mid = label.length / 2;
  const best = (xs: { at: number }[]) => xs.reduce((m, x) => (Math.abs(x.at - mid) < Math.abs(m.at - mid) ? x : m));
  const mains = spaces.filter((x) => x.main);
  const cut = best(mains.length ? mains : spaces).at;
  return [label.slice(0, cut), label.slice(cut + 1)];
}

const LEGEND_LINE = 15;
const legendH = (p: { letters: string[] }) => (p.letters.length ? p.letters.length * LEGEND_LINE + 6 : 0);
const sayH = (p: { say: string[] }) => (p.say.length ? p.say.length * LEGEND_LINE + 10 : 0);

/** A sentence longer than 62 characters goes on two lines, split at the space nearest the middle. */
function sayLines(s: string): string[] {
  if (s.length <= 62) return [s];
  const mid = s.length / 2;
  let cut = -1;
  for (let i = 0; i < s.length; i++) if (s[i] === " " && (cut < 0 || Math.abs(i - mid) < Math.abs(cut - mid))) cut = i;
  return cut < 0 ? [s] : [s.slice(0, cut), s.slice(cut + 1)];
}

const colWidth = (label: string) => Math.max(34, Math.ceil(Math.max(...headingLines(label).map((l) => l.length)) * 6.6) + 14);
const headOf = (p: { columns: Column[] }) => (p.columns.some((c) => headingLines(c.label).length > 1) ? HEAD2 : HEAD);

function formula(v: unknown, field: string): Logic {
  if (typeof v !== "string") throw new ParamError(`${field} must be a formula`);
  try {
    return parseLogic(v);
  } catch (e) {
    throw new ParamError(`${field}: ${(e as Error).message}`);
  }
}

function bool(v: unknown, field: string): boolean {
  if (v === true || v === "T") return true;
  if (v === false || v === "F") return false;
  throw new ParamError(`${field} must be true or false`);
}

const cache = new WeakMap<TruthParams, TruthFacts>();

export function truthFacts(p: TruthParams): TruthFacts {
  const hit = cache.get(p);
  if (hit) return hit;
  const rows = allRows(p.vars);
  const values = p.columns.map((c) => rows.map((env) => evaluate(c.f, env)));
  const find = (f: Logic) => p.columns.findIndex((c) => showLogic(c.f) === showLogic(f));
  const a = p.ask;
  let value = 0;
  let lit: number[] = [];
  let marked: number[] = [];
  switch (a.kind) {
    case "equivalent":
      value = equivalent(a.a, a.b) ? 1 : 0;
      marked = [find(a.a), find(a.b)];
      break;
    case "classify":
      value = classify(a.f) === a.expect ? 1 : 0;
      marked = [find(a.f)];
      break;
    case "solve": {
      const c = find(a.f);
      lit = rows.map((_, r) => r).filter((r) => values[c][r] === a.value);
      value = lit.length > 0 && lit.every((r) => Object.entries(a.expect).every(([k, v]) => rows[r][k] === v)) ? 1 : 0;
      marked = [c];
      break;
    }
    case "evaluate": {
      const r = rows.findIndex((env) => p.vars.every((k) => env[k] === a.at[k]));
      lit = [r];
      marked = a.f.map(find);
      value = a.f.every((f, i) => values[find(f)][r] === a.expect[i]) ? 1 : 0;
      break;
    }
    case "transform":
      value = equivalent(a.made, a.equals) ? 1 : 0;
      marked = [find(a.made), find(a.equals)];
      break;
    case "transforms":
      value = a.ops.every((o) => equivalent(o.made, o.equals)) ? 1 : 0;
      marked = [...new Set(a.ops.flatMap((o) => [find(o.made), find(o.equals)]))];
      break;
  }
  const facts: TruthFacts = { vars: p.vars, rows, columns: p.columns, values, value, lit, marked };
  cache.set(p, facts);
  return facts;
}

const tf = (v: boolean) => (v ? "T" : "F");

function box(p: TruthParams): { w: number; h: number } {
  const table = PAD * 2 + p.vars.length * VAR_W + p.columns.reduce((s, c) => s + colWidth(c.label), 0);
  return { w: Math.max(MIN_W, table), h: TOP + legendH(p) + headOf(p) + (1 << p.vars.length) * ROW + 10 + sayH(p) };
}

function header(p: TruthParams, f: TruthFacts): string {
  const a = p.ask;
  switch (a.kind) {
    case "equivalent":
      return f.value ? "every row agrees: equivalent" : "the columns differ: not equivalent";
    case "classify": {
      const k = classify(a.f);
      return k === "tautology" ? "always T: a tautology" : k === "contradiction" ? "always F: a contradiction" : "both T and F: a contingency";
    }
    case "solve": {
      const keys = Object.keys(a.expect).sort();
      return `${tf(a.value)} only when ${keys.join(", ")} = ${keys.map((k) => tf(a.expect[k])).join(", ")}`;
    }
    case "evaluate":
      return `values: ${a.expect.map(tf).join(", ")}`;
    case "transform":
      return f.value ? `the ${a.op} matches, row by row` : `the ${a.op} does not match`;
    case "transforms":
      return f.value ? `each one matches, row by row` : `one of them does not match`;
  }
}

export const truthTable: Scene<TruthParams> = {
  id: "truthTable",
  beats: ["vars", "columns", "answer"],

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      const columns: Column[] = [];
      // A statement already in the table keeps its label; a new one is labelled with its formula,
      // or with its role ("statement", "keyed option") when the formula is too long to head a column.
      const add = (f: Logic, label?: string, role?: string) => {
        if (columns.some((c) => showLogic(c.f) === showLogic(f))) return;
        const formulaText = showLogic(f);
        const shown = label ?? (formulaText.length <= 32 || !role ? formulaText : role);
        if (shown.length > 32) throw new ParamError(`the column ${shown} is too long to draw: give it a short label`);
        columns.push({ f, label: plainLabel(shown, "column label", 32) });
      };
      if (o.columns !== undefined) {
        if (!Array.isArray(o.columns) || o.columns.length > 6) throw new ParamError("columns must be a list of at most 6");
        o.columns.forEach((c, i) => {
          const q = obj(c);
          add(formula(q.f, `columns[${i}].f`), optionalLabel(q, "label", 32));
        });
      }

      const a = obj(o.ask);
      let ask: Ask;
      switch (a.kind) {
        case "equivalent": {
          const [x, y] = [formula(a.a, "ask.a"), formula(a.b, "ask.b")];
          add(x, undefined, "given");
          add(y, undefined, "keyed option");
          ask = { kind: "equivalent", a: x, b: y };
          break;
        }
        case "classify": {
          const f = formula(a.f, "ask.f");
          if (a.expect !== "tautology" && a.expect !== "contradiction" && a.expect !== "contingency") throw new ParamError('ask.expect must be "tautology", "contradiction" or "contingency"');
          add(f, undefined, "statement");
          ask = { kind: "classify", f, expect: a.expect };
          break;
        }
        case "solve": {
          const f = formula(a.f, "ask.f");
          const e = obj(a.expect);
          const fv = varsOf(f);
          const expect: Record<string, boolean> = {};
          for (const [k, v] of Object.entries(e)) {
            if (!fv.includes(k)) throw new ParamError(`ask.expect names ${k}, which is not in the statement`);
            expect[k] = bool(v, `ask.expect.${k}`);
          }
          if (!Object.keys(expect).length) throw new ParamError("ask.expect must give at least one letter");
          add(f, undefined, "statement");
          ask = { kind: "solve", f, value: bool(a.value, "ask.value"), expect };
          break;
        }
        case "evaluate": {
          if (!Array.isArray(a.f) || !a.f.length || a.f.length > 4) throw new ParamError("ask.f must be a list of 1 to 4 formulas");
          if (!Array.isArray(a.expect) || a.expect.length !== a.f.length) throw new ParamError("ask.expect must give one value per formula");
          const fs = a.f.map((v, i) => formula(v, `ask.f[${i}]`));
          const at: Record<string, boolean> = {};
          for (const [k, v] of Object.entries(obj(a.at))) at[k] = bool(v, `ask.at.${k}`);
          for (const k of varsOf(...fs)) if (!(k in at)) throw new ParamError(`ask.at must give a value for ${k}`);
          fs.forEach((f, i) => add(f, undefined, `statement ${i + 1}`));
          ask = { kind: "evaluate", at, f: fs, expect: a.expect.map((v, i) => bool(v, `ask.expect[${i}]`)) };
          break;
        }
        case "transform": {
          const ops: Transform[] = ["negation", "converse", "inverse", "contrapositive", "dual"];
          if (!ops.includes(a.op as Transform)) throw new ParamError(`ask.op must be ${ops.join(", ")}`);
          const of = formula(a.of, "ask.of");
          const equals = formula(a.equals, "ask.equals");
          let made: Logic;
          try {
            made = transform(of, a.op as Transform);
          } catch (e) {
            throw new ParamError(`ask: no ${String(a.op)}: ${(e as Error).message}`);
          }
          add(of, undefined, "given");
          add(made, undefined, `its ${String(a.op)}`);
          add(equals, undefined, "keyed option");
          ask = { kind: "transform", of, op: a.op as Transform, made, equals };
          break;
        }
        case "transforms": {
          // Converse, inverse and contrapositive asked together: each is formed by the scene and checked.
          const ops: Transform[] = ["negation", "converse", "inverse", "contrapositive", "dual"];
          if (!Array.isArray(a.ops) || a.ops.length < 1 || a.ops.length > 3) throw new ParamError("ask.ops must be a list of 1 to 3");
          const of = formula(a.of, "ask.of");
          add(of, undefined, "given");
          const list = a.ops.map((raw2, i) => {
            const q = obj(raw2);
            if (!ops.includes(q.op as Transform)) throw new ParamError(`ask.ops[${i}].op must be ${ops.join(", ")}`);
            let made: Logic;
            try {
              made = transform(of, q.op as Transform);
            } catch (e) {
              throw new ParamError(`ask.ops[${i}]: no ${String(q.op)}: ${(e as Error).message}`);
            }
            const equals = formula(q.equals, `ask.ops[${i}].equals`);
            add(made, undefined, `its ${String(q.op)}`);
            add(equals, undefined, `keyed ${String(q.op)}`);
            return { op: q.op as Transform, made, equals };
          });
          ask = { kind: "transforms", of, ops: list };
          break;
        }
        default:
          throw new ParamError("ask.kind must be equivalent, classify, solve, evaluate, transform or transforms");
      }

      const vars = varsOf(...columns.map((c) => c.f));
      if (ask.kind === "evaluate") for (const k of Object.keys(ask.at)) if (!vars.includes(k)) vars.push(k);
      vars.sort();
      if (vars.length === 0) throw new ParamError("the statements have no letters");
      if (vars.length > 4) throw new ParamError(`at most 4 statement letters (this has ${vars.join(", ")})`);
      if (columns.length > 8) throw new ParamError("at most 8 statement columns in all");
      const width = PAD * 2 + vars.length * VAR_W + columns.reduce((s, c) => s + colWidth(c.label), 0);
      if (width > MAX_W) throw new ParamError(`the table is too wide (${width} px): fewer columns or shorter labels`);
      // Sentences in words: what each letter stands for, and the answer as the solution words it.
      const letters: string[] = [];
      if (o.letters !== undefined) {
        const given = obj(o.letters);
        for (const k of Object.keys(given)) if (!vars.includes(k)) throw new ParamError(`letters names ${k}, which is not in the table`);
        for (const k of vars) if (given[k] !== undefined) letters.push(`${k}: ${plainLabel(given[k], `letters.${k}`, 46)}`);
      }
      const sayText = optionalLabel(o, "say", 120);
      return { vars, columns, ask, askLabel: optionalLabel(a, "label", 40), letters, say: sayText ? sayLines(sayText) : [] };
    }),

  check: (p) => truthFacts(p).value,

  checkText(p, value) {
    const f = truthFacts(p);
    const a = p.ask;
    switch (a.kind) {
      case "equivalent":
        return value ? "The two statements agree on every row of the table." : "The two statements differ on at least one row.";
      case "classify":
        return `The statement is a ${classify(a.f)} (keyed: ${a.expect}).`;
      case "solve":
        return value ? `Every row where the statement is ${tf(a.value)} has the keyed values.` : `The rows where the statement is ${tf(a.value)} do not all have the keyed values (${f.lit.length} such row${f.lit.length === 1 ? "" : "s"}).`;
      case "evaluate":
        return value ? "At the given truth values the statements take the keyed values." : "At the given truth values the statements do not take the keyed values.";
      case "transform":
        return value ? `The ${a.op} agrees with the keyed statement on every row.` : `The ${a.op} differs from the keyed statement on at least one row.`;
      case "transforms":
        return value
          ? `The ${a.ops.map((o) => o.op).join(", ")} each agree with the keyed statement on every row.`
          : `At least one of the ${a.ops.map((o) => o.op).join(", ")} differs from the keyed statement.`;
    }
  },

  viewBox: (p) => box(p),

  duration: (beat) => ({ vars: 1400, columns: 2400, answer: 1200 })[beat] ?? 1300,

  frame(p, { played, t }) {
    const TOPP = TOP + legendH(p);
    const f = truthFacts(p);
    const { w } = box(p);
    const tableW = p.vars.length * VAR_W + p.columns.reduce((s, c) => s + colWidth(c.label), 0);
    const x0 = (w - tableW) / 2;
    const xs: number[] = [];
    let x = x0;
    for (let i = 0; i < p.vars.length; i++) {
      xs.push(x);
      x += VAR_W;
    }
    const varEnd = x;
    for (const c of p.columns) {
      xs.push(x);
      x += colWidth(c.label);
    }
    const widths = [...p.vars.map(() => VAR_W), ...p.columns.map((c) => colWidth(c.label))];
    const head = headOf(p);
    const rowY = (r: number) => TOPP + head + r * ROW;
    const n = f.rows.length;
    const under: Shape[] = [];
    const grid: Shape[] = [];
    const cells: Shape[] = [];
    const over: Shape[] = [];

    // Grid and header.
    grid.push(line(x0, TOPP + head, x0 + tableW, TOPP + head, { stroke: "muted", width: 1.2 }));
    grid.push(line(varEnd, TOPP + 4, varEnd, rowY(n), { stroke: "muted", width: 1.2 }));
    for (let r = 1; r < n; r++) grid.push(line(x0, rowY(r), x0 + tableW, rowY(r), { stroke: "line", width: 0.8 }));
    p.vars.forEach((v, i) => cells.push(text(xs[i] + VAR_W / 2, TOPP + head - 9, v, { tone: "fg", size: 12.5, weight: 700, anchor: "middle", italic: true })));
    p.columns.forEach((c, j) => {
      const ls = headingLines(c.label);
      ls.forEach((l, k) => cells.push(text(xs[p.vars.length + j] + widths[p.vars.length + j] / 2, TOPP + head - 9 - (ls.length - 1 - k) * 13, l, { tone: "amber", size: 11, weight: 600, anchor: "middle" })));
    });

    const cell = (col: number, r: number, v: boolean, opacity = 1) =>
      text(xs[col] + widths[col] / 2, rowY(r) + 14, tf(v), { tone: v ? "good" : "muted", size: 12, weight: v ? 700 : 400, anchor: "middle", opacity });

    // What each letter stands for, from the start.
    p.letters.forEach((l, i) => cells.push(text(PAD, TOP + 10 + i * LEGEND_LINE, l, { tone: "muted", size: 11.5, italic: true })));

    // The letters, row by row.
    const pv = prog("vars");
    const shownRows = Math.floor(pv * n + 1e-9);
    for (let r = 0; r < shownRows; r++) p.vars.forEach((v, i) => cells.push(cell(i, r, f.rows[r][v])));

    // The statements, column by column.
    const pc = prog("columns");
    p.columns.forEach((_, j) => {
      const share = Math.max(0, Math.min(1, pc * p.columns.length - j));
      const upto = Math.floor(share * n + 1e-9);
      for (let r = 0; r < upto; r++) cells.push(cell(p.vars.length + j, r, f.values[j][r]));
    });

    // The answer: the compared columns outlined, the picked rows lit, the header.
    const pa = prog("answer");
    if (pa > 0) {
      for (const j of f.marked) {
        if (j < 0) continue;
        const col = p.vars.length + j;
        over.push({ kind: "rect", x: xs[col] + 1, y: TOPP + 2, w: widths[col] - 2, h: rowY(n) - TOPP - 2, rx: 5, stroke: "good", width: 2, opacity: pa });
      }
      for (const r of f.lit) under.push({ kind: "rect", x: x0, y: rowY(r) + 1, w: tableW, h: ROW - 2, rx: 3, fill: "goodSoft", opacity: pa });
      if (pa > 0.6) over.push(text(w / 2, 18, p.askLabel ?? header(p, f), { tone: "good", size: 12.5, weight: 700, anchor: "middle" }));
      p.say.forEach((l, i) => over.push(text(w / 2, rowY(n) + 20 + i * LEGEND_LINE, l, { tone: "good", size: 12, weight: 600, anchor: "middle", opacity: pa })));
    }
    return [...under, ...grid, ...cells, ...over];

    // A beat counts as done once any later beat has played, so a step list that skips one
    // (straight from the letters to the answer) still shows the whole table.
    function prog(beat: string) {
      const order = ["vars", "columns", "answer"];
      const later = order.slice(order.indexOf(beat) + 1);
      if (!played.includes(beat) && later.some((b) => played.includes(b))) return 1;
      return progressOf(beat, played, t);
    }
  },
};
