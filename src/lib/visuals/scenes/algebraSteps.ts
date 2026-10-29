/**
 * Algebra steps: the written working itself animates, one line at a time, a
 * changed term coloured in its old line and its new one (owner, 2026-10-29).
 * For a solution no picture helps: identities, find-k, an expression of the
 * roots, division.
 *
 *   lines   up to 10, each on a step s1..s8, shown as KaTeX (`tex`). A term is
 *           marked {{1:...}}, {{2:...}} or {{3:...}}; the same number in two
 *           lines links them by colour. Each line says how it is checked:
 *             expr  `f`, a formula; it must equal the previous expr line's f
 *                   at several values of x (a constant chain is just compared)
 *             eq    `lhs` and `rhs`, formulas in x; every root must satisfy it
 *             calc  `f` and `value`, formulas: the worked number must equal the
 *                   stated one (`dp`: the decimals shown, for a rounded "≈")
 *             note  no maths to check (the last "x = 2 or 3" line, a remark)
 *           and may carry a short plain `note` shown under it.
 *   roots   formulas: the values of the unknown the equations must hold at. An
 *           eq line may carry its own `roots` instead (one line solves for p,
 *           the next for c).
 *   vars    named numbers, as in the sketch scene (lib/visuals/namedVars).
 *   answer  a formula: the value checked against the key.
 *
 * Formulas always use x for the unknown, whatever letter the tex shows (k, m).
 * Spec: tests/visuals-algebra.test.ts.
 */
import { compileExpr } from "../expr";
import { text } from "../geometry";
import { parseVars, value } from "../namedVars";
import { obj, ParamError, plainLabel, safely } from "../params";
import type { Scene, Shape } from "../types";

const STEPS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] as const;
const W = 340;
const ROW = 34;
/** A row holding a built-up fraction, a sum or an integral needs more height, or KaTeX's output is cut off. */
const TALL_ROW = 54;
const TALL = /[\\](d?frac|binom|sum|int|prod|begin|over)(?![a-zA-Z])/;
/** A small \tfrac is fine alone, but under a root (or a power) it pushes the line past the row. */
const TALL_UNDER = /[\\]sqrt\s*(\[[^\]]*\])?\s*\{[^}]*[\\]tfrac|[\\]tfrac[^=]*\}\s*\^/;
const rowOf = (l: Line) => (TALL.test(l.tex) || TALL_UNDER.test(l.tex) ? TALL_ROW : ROW);
const NOTE = 15;
const TOP = 10;
const MAX_LINES = 10;
const SAMPLES = [-1.7, -0.4, 0.3, 1.9, 2.6, 3.4];

interface Line {
  step: string;
  tex: string;
  kind: "expr" | "eq" | "calc" | "note";
  note?: string;
}

export interface AlgebraParams {
  lines: Line[];
  answer: number;
  checked: number;
}

/** {{n:...}} -> \htmlClass{viz-mark-n}{...}, braces inside the term balanced. */
function marks(tex: string, field: string): string {
  let out = "";
  let i = 0;
  while (i < tex.length) {
    const at = tex.indexOf("{{", i);
    if (at === -1) {
      out += tex.slice(i);
      break;
    }
    out += tex.slice(i, at);
    const m = /^\{\{([1-3]):/.exec(tex.slice(at));
    if (!m) {
      // {{4:...}} is a mark with no such colour; anything else is ordinary TeX
      // braces (\dfrac{{{1:...}}}{2} puts a mark inside the fraction's own brace).
      if (/^\{\{\d:/.test(tex.slice(at))) throw new ParamError(`${field}: a mark is {{1:...}}, {{2:...}} or {{3:...}}`);
      out += "{";
      i = at + 1;
      continue;
    }
    let j = at + m[0].length;
    let depth = 0;
    const start = j;
    for (; j < tex.length; j++) {
      if (tex[j] === "{") depth++;
      else if (tex[j] === "}") {
        if (depth === 0 && tex[j + 1] === "}") break;
        depth--;
      }
    }
    if (j >= tex.length) throw new ParamError(`${field}: a mark is not closed with }}`);
    out += `\\htmlClass{viz-mark-${m[1]}}{${tex.slice(start, j)}}`;
    i = j + 2;
  }
  return out;
}

function fn(src: unknown, vars: Record<string, number>, field: string): (x: number) => number {
  const r = compileExpr(src, vars);
  if ("error" in r) throw new ParamError(`${field}: ${r.error}`);
  return r.fn;
}

const near = (a: number, b: number) => Math.abs(a - b) <= 1e-6 * (1 + Math.abs(a) + Math.abs(b));

export const algebraSteps: Scene<AlgebraParams> = {
  id: "algebraSteps",
  beats: STEPS,

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      const vars = parseVars(o.vars, 20);
      const roots = o.roots === undefined ? undefined : o.roots;
      if (roots !== undefined && (!Array.isArray(roots) || roots.length < 1 || roots.length > 4)) throw new ParamError("roots must be a list of 1 to 4 values");
      const rootValues = (roots ?? []).map((r, i) => value(r, vars, `roots[${i}]`));
      if (!Array.isArray(o.lines) || o.lines.length < 2 || o.lines.length > MAX_LINES) throw new ParamError(`lines must be a list of 2 to ${MAX_LINES}`);
      let prev: ((x: number) => number) | null = null;
      let checked = 0;
      const lines = o.lines.map((raw2, i): Line => {
        const l = obj(raw2);
        const f = `line ${i + 1}`;
        if (typeof l.step !== "string" || !(STEPS as readonly string[]).includes(l.step)) throw new ParamError(`${f}: step must be one of s1 to s8`);
        if (typeof l.tex !== "string" || !l.tex.trim() || l.tex.length > 140) throw new ParamError(`${f}: tex must be 1 to 140 characters`);
        if (/\\(htmlClass|href|url|htmlId|htmlStyle|htmlData|includegraphics)/.test(l.tex)) throw new ParamError(`${f}: tex may not use \\htmlClass, \\href or other HTML commands (mark terms with {{1:...}})`);
        // A backslash lost on the way in: "\t" of "\text" read as a TAB, or "\frac" left as "frac".
        if (/[\x00-\x1f]/.test(l.tex)) throw new ParamError(`${f}: tex holds a control character (a lost backslash: write \\\\text, not \\text, inside a JSON string)`);
        if (/(^|[^\\a-zA-Z])(d?frac|tfrac|sqrt|cdot|times|Rightarrow|quad|text|left|right)(?![a-zA-Z])/.test(l.tex)) throw new ParamError(`${f}: tex has a TeX command without its backslash (frac, sqrt, text...)`);
        const tex = marks(l.tex, f);
        const note = l.note === undefined ? undefined : plainLabel(l.note, `${f} note`, 44);
        if (l.kind === "expr") {
          const g = fn(l.f, vars, `${f} f`);
          if (prev) {
            const p0 = prev;
            const pts = SAMPLES.filter((x) => Number.isFinite(p0(x)) && Number.isFinite(g(x)));
            if (pts.length < 3) throw new ParamError(`${f}: too few points to compare with the line before`);
            if (!pts.every((x) => near(p0(x), g(x)))) throw new ParamError(`${f} does not equal the line before it`);
          }
          prev = g;
          checked++;
          return { step: l.step, tex, kind: "expr", note };
        }
        if (l.kind === "eq") {
          // A line may solve for its own unknown (p, then c), so its own roots replace the shared ones.
          if (l.roots !== undefined && (!Array.isArray(l.roots) || l.roots.length < 1 || l.roots.length > 4)) throw new ParamError(`${f}: roots must be a list of 1 to 4 values`);
          const own = Array.isArray(l.roots) ? l.roots.map((r, j) => value(r, vars, `${f} roots[${j}]`)) : rootValues;
          if (!own.length) throw new ParamError(`${f}: an eq line needs roots to check against`);
          const [lhs, rhs] = [fn(l.lhs, vars, `${f} lhs`), fn(l.rhs, vars, `${f} rhs`)];
          for (const r of own) if (!near(lhs(r), rhs(r))) throw new ParamError(`${f} does not hold at x = ${r}`);
          checked++;
          return { step: l.step, tex, kind: "eq", note };
        }
        if (l.kind === "calc") {
          const [got, want] = [value(l.f, vars, `${f} f`), value(l.value, vars, `${f} value`)];
          if (l.dp !== undefined && (typeof l.dp !== "number" || !Number.isInteger(l.dp) || l.dp < 0 || l.dp > 8)) throw new ParamError(`${f}: dp must be a whole number of decimals, 0 to 8`);
          const ok = l.dp === undefined ? near(got, want) : Math.abs(got - want) <= 0.5 * 10 ** -(l.dp as number) + 1e-12;
          if (!ok) throw new ParamError(`${f}: the worked value ${got} is not the stated ${want}`);
          checked++;
          return { step: l.step, tex, kind: "calc", note };
        }
        if (l.kind === "note") return { step: l.step, tex, kind: "note", note };
        throw new ParamError(`${f}: kind must be expr, eq, calc or note`);
      });
      if (!checked) throw new ParamError("at least one line must be an expr, eq or calc line, so something is checked");
      return { lines, answer: value(o.answer, vars, "answer"), checked };
    }),

  check: (p) => p.answer,

  checkText: (p) => `All ${p.checked} checked lines hold (rewrites agree with the line before, equations hold at the roots, worked values match).`,

  viewBox: (p) => ({ w: W, h: TOP * 2 + p.lines.reduce((h, l) => h + rowOf(l) + (l.note ? NOTE : 0), 0) }),

  duration: () => 1100,

  frame(p, { played, t }) {
    const out: Shape[] = [];
    let y = TOP;
    const current = played[played.length - 1];
    for (const l of p.lines) {
      const i = played.indexOf(l.step);
      const pr = i === -1 ? 0 : i === played.length - 1 ? t : 1;
      const row = rowOf(l);
      const rowH = row + (l.note ? NOTE : 0);
      // A faint rule under every row, like ruled paper, so the working's space shows before it fills.
      out.push({ kind: "line", x1: 10, y1: y + row - 1, x2: W - 10, y2: y + row - 1, stroke: "line", width: 1, opacity: 0.6 });
      if (pr > 0) {
        if (l.step === current) out.push({ kind: "rect", x: 2, y: y + 1, w: W - 4, h: rowH - 2, rx: 6, fill: "soft", opacity: Math.min(1, pr * 2) });
        // Every line starts at full size; the browser shrinks one that KaTeX draws wider than the box (lib/visuals/fitMath).
        out.push({ kind: "math", x: 10, y: y + 2 + (1 - pr) * 6, w: W - 20, h: row - 4, tex: l.tex, tone: l.kind === "note" ? "good" : "fg", size: 16, opacity: pr });
        if (l.note && pr === 1) out.push(text(18, y + row + NOTE - 6, l.note, { tone: "muted", size: 11, italic: true }));
      }
      y += rowH;
    }
    return out;
  },
};
