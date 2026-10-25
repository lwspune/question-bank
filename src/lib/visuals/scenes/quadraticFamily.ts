/**
 * Quadratic family: a(λ)x² + b(λ)x + c(λ) = 0 with each coefficient linear in a
 * parameter λ, and a condition on the roots. Drag λ to move the curve; the λ
 * number line fills in condition by condition.
 *
 * Params: a, b, c as [constant, λ-coefficient]; range [lo, hi] for the number
 * line and slider; start (the slider's first value); condition; optional
 * distinct (equal roots do not count), countRange (where the self-check counts
 * integer λ, default range), xRange / yRange (the graph window), paramLabel.
 * Beats: discriminant, signs, intersection.
 */
import { dot, line, num, text } from "../geometry";
import { finite, obj, optionalLabel, pair, ParamError, safely } from "../params";
import type { Scene, Shape } from "../types";

export type RootCondition = "twoPositiveRoots" | "twoNegativeRoots" | "realRoots" | "oppositeSigns";
const CONDITIONS: readonly RootCondition[] = ["twoPositiveRoots", "twoNegativeRoots", "realRoots", "oppositeSigns"];

export interface QuadraticFamilyParams {
  a: [number, number];
  b: [number, number];
  c: [number, number];
  range: [number, number];
  start: number;
  condition: RootCondition;
  distinct: boolean;
  countRange: [number, number];
  xRange: [number, number];
  yRange: [number, number];
  paramLabel: string;
}

type Interval = [number, number];

const coef = (k: [number, number], l: number) => k[0] + k[1] * l;
const EPS = 1e-12;

function abc(p: QuadraticFamilyParams, l: number) {
  return { a: coef(p.a, l), b: coef(p.b, l), c: coef(p.c, l) };
}

/** The discriminant part alone. It ignores a = 0 so its band reads as the solution states it; holds() still excludes that λ. */
function discriminantOk(p: QuadraticFamilyParams, l: number): boolean {
  const { a, b, c } = abc(p, l);
  const d = b * b - 4 * a * c;
  return p.distinct ? d > EPS : d >= -EPS;
}

/** The sum/product part of the condition (true for realRoots, which has none). */
function signsOk(p: QuadraticFamilyParams, l: number): boolean {
  const { a, b, c } = abc(p, l);
  if (Math.abs(a) < EPS) return false;
  const sum = -b / a;
  const product = c / a;
  switch (p.condition) {
    case "twoPositiveRoots": return sum > EPS && product > EPS;
    case "twoNegativeRoots": return sum < -EPS && product > EPS;
    case "oppositeSigns": return product < -EPS;
    case "realRoots": return true;
  }
}

const holds = (p: QuadraticFamilyParams, l: number) => discriminantOk(p, l) && signsOk(p, l);

/** Where a predicate is true across [lo, hi], as closed intervals (boundaries found by bisection). */
function intervalsOf(pred: (l: number) => boolean, lo: number, hi: number): Interval[] {
  const N = 4000;
  const out: Interval[] = [];
  const edge = (x0: number, x1: number) => {
    const v0 = pred(x0);
    for (let k = 0; k < 60; k++) {
      const m = (x0 + x1) / 2;
      if (pred(m) === v0) x0 = m;
      else x1 = m;
    }
    return (x0 + x1) / 2;
  };
  let prevX = lo;
  let prev = pred(lo);
  let open: number | null = prev ? lo : null;
  for (let i = 1; i <= N; i++) {
    const x = lo + ((hi - lo) * i) / N;
    const v = pred(x);
    if (v !== prev) {
      const e = edge(prevX, x);
      if (v) open = e;
      else if (open !== null) {
        out.push([open, e]);
        open = null;
      }
    }
    prev = v;
    prevX = x;
  }
  if (open !== null) out.push([open, hi]);
  return out.filter(([a, b]) => b - a > 1e-9);
}

type Intervals = { discriminant: Interval[]; signs: Interval[]; both: Interval[] };
// The bands depend only on the params, and frame() runs every animation frame.
const intervalCache = new WeakMap<QuadraticFamilyParams, Intervals>();

export function quadraticIntervals(p: QuadraticFamilyParams): Intervals {
  const hit = intervalCache.get(p);
  if (hit) return hit;
  const [lo, hi] = p.range;
  const iv = {
    discriminant: intervalsOf((l) => discriminantOk(p, l), lo, hi),
    signs: intervalsOf((l) => signsOk(p, l), lo, hi),
    both: intervalsOf((l) => holds(p, l), lo, hi),
  };
  intervalCache.set(p, iv);
  return iv;
}

function integersHolding(p: QuadraticFamilyParams, [lo, hi]: [number, number]): number[] {
  const out: number[] = [];
  for (let l = Math.ceil(lo); l <= Math.floor(hi); l++) if (holds(p, l)) out.push(l);
  return out;
}

function roots(p: QuadraticFamilyParams, l: number): { none: true } | { none: false; r1: number; r2: number } | { degenerate: true } {
  const { a, b, c } = abc(p, l);
  if (Math.abs(a) < 1e-9) return { degenerate: true };
  const d = b * b - 4 * a * c;
  if (d < -EPS) return { none: true };
  const s = Math.sqrt(Math.max(0, d));
  const r1 = (-b - s) / (2 * a);
  const r2 = (-b + s) / (2 * a);
  return { none: false, r1: Math.min(r1, r2), r2: Math.max(r1, r2) };
}

const PHRASE: Record<RootCondition, string> = {
  twoPositiveRoots: "Two positive roots",
  twoNegativeRoots: "Two negative roots",
  realRoots: "Real roots",
  oppositeSigns: "Roots of opposite sign",
};

const SIGN_LABEL: Record<RootCondition, string> = {
  twoPositiveRoots: "sum, product > 0",
  twoNegativeRoots: "sum < 0, product > 0",
  realRoots: "any signs",
  oppositeSigns: "product < 0",
};

// Graph area and number line, in the 340 x 300 box.
const G = { x0: 30, x1: 330, y0: 10, y1: 170 };
const LINE_Y = 262;

export const quadraticFamily: Scene<QuadraticFamilyParams> = {
  id: "quadraticFamily",
  beats: ["discriminant", "signs", "intersection"],

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      const range = pair(o, "range");
      if (!(range[1] - range[0] >= 1 && range[1] - range[0] <= 40)) throw new ParamError("range must span 1 to 40");
      const start = finite(o, "start", { min: range[0], max: range[1] });
      if (typeof o.condition !== "string" || !CONDITIONS.includes(o.condition as RootCondition)) {
        throw new ParamError(`condition must be one of ${CONDITIONS.join(", ")}`);
      }
      const countRange = o.countRange === undefined ? range : pair(o, "countRange");
      if (countRange[1] - countRange[0] > 1000 || countRange[1] < countRange[0]) throw new ParamError("countRange must be a forward span of at most 1000");
      const xRange = o.xRange === undefined ? ([-3, 10] as [number, number]) : pair(o, "xRange");
      const yRange = o.yRange === undefined ? ([-10, 12] as [number, number]) : pair(o, "yRange");
      if (!(xRange[1] > xRange[0] && yRange[1] > yRange[0] && xRange[0] < 0 && yRange[0] < 0 && yRange[1] > 0)) {
        throw new ParamError("xRange and yRange must run forward and include the axes");
      }
      if (o.distinct !== undefined && typeof o.distinct !== "boolean") throw new ParamError("distinct must be true or false");
      return {
        a: pair(o, "a"),
        b: pair(o, "b"),
        c: pair(o, "c"),
        range,
        start,
        condition: o.condition as RootCondition,
        distinct: o.distinct === true,
        countRange,
        xRange,
        yRange,
        paramLabel: optionalLabel(o, "paramLabel", 3) ?? "λ",
      };
    }),

  check: (p) => integersHolding(p, p.countRange).length,

  checkText: (p) => {
    const hits = integersHolding(p, p.countRange);
    const list = hits.length ? `${p.paramLabel} = ${hits.map((h) => num(h)).join(", ")}` : "no value";
    return `Testing every integer ${p.paramLabel} from ${num(p.countRange[0])} to ${num(p.countRange[1])}: the condition holds for ${list}, so ${hits.length} ${hits.length === 1 ? "value" : "values"}.`;
  },

  viewBox: () => ({ w: 340, h: 300 }),

  duration: () => 1300,

  slider: (p) => ({ label: p.paramLabel, min: p.range[0], max: p.range[1], step: 0.1, initial: p.start }),

  status(p, l) {
    const r = roots(p, l);
    if ("degenerate" in r) return { text: `${p.paramLabel} = ${num(l, 1)} is not allowed: there is no x² term.`, tone: "bad" };
    if (r.none) return { text: "No real roots: the curve never meets the x-axis.", tone: "bad" };
    const pairText = `x = ${num(r.r1)} and ${num(r.r2)}`;
    return holds(p, l) ? { text: `${PHRASE[p.condition]}: ${pairText}`, tone: "good" } : { text: `Roots ${pairText}: condition not met.`, tone: "muted" };
  },

  frame(p, { played, t, slider }) {
    const l = slider ?? p.start;
    const [xa, xb] = p.xRange;
    const [ya, yb] = p.yRange;
    const X = (x: number) => G.x0 + ((x - xa) / (xb - xa)) * (G.x1 - G.x0);
    const Y = (y: number) => G.y1 - ((y - ya) / (yb - ya)) * (G.y1 - G.y0);
    const [lo, hi] = p.range;
    const L = (v: number) => 30 + ((v - lo) / (hi - lo)) * 300;
    const out: Shape[] = [];

    // Graph: the shaded half that the condition wants, the axes, the monic curve.
    if (p.condition === "twoPositiveRoots") {
      out.push({ kind: "rect", x: X(0), y: G.y0, w: G.x1 - X(0), h: G.y1 - G.y0, fill: "goodSoft" }, text(G.x1 - 4, G.y1 - 6, "x > 0", { tone: "good", size: 11.5, weight: 600, anchor: "end" }));
    } else if (p.condition === "twoNegativeRoots") {
      out.push({ kind: "rect", x: G.x0, y: G.y0, w: X(0) - G.x0, h: G.y1 - G.y0, fill: "goodSoft" }, text(G.x0 + 4, G.y1 - 6, "x < 0", { tone: "good", size: 11.5, weight: 600 }));
    }
    out.push(line(G.x0, Y(0), G.x1, Y(0), { stroke: "muted", width: 1.2 }), line(X(0), G.y0, X(0), G.y1, { stroke: "muted", width: 1.2 }));
    const tickStep = Math.max(1, Math.ceil((xb - xa) / 7));
    for (let x = Math.ceil(xa / tickStep) * tickStep; x <= xb; x += tickStep) {
      if (x !== 0) out.push(text(X(x), Math.min(G.y1 - 2, Y(0) + 14), num(x), { tone: "muted", size: 10, anchor: "middle" }));
    }
    const { a, b, c } = abc(p, l);
    if (Math.abs(a) >= 1e-9) {
      const pts: [number, number][] = [];
      for (let i = 0; i <= 160; i++) {
        const x = xa + ((xb - xa) * i) / 160;
        const y = x * x + (b / a) * x + c / a;
        pts.push([X(x), Math.max(G.y0 - 40, Math.min(G.y1 + 40, Y(y)))]);
      }
      out.push({ kind: "polyline", points: pts, stroke: "brand", width: 3 });
      const r = roots(p, l);
      if (!("degenerate" in r) && !r.none) {
        const tone = holds(p, l) ? "good" : "bad";
        for (const x of [r.r1, r.r2]) if (x > xa && x < xb) out.push(dot(X(x), Y(0), 5.5, tone, { stroke: "card", width: 2 }));
      }
    }
    out.push(text(G.x0 + 4, G.y0 + 12, "same roots as the equation", { tone: "muted", size: 10.5 }));

    // Number line: integer ticks, then the bands each beat adds.
    out.push(line(30, LINE_Y, 330, LINE_Y, { stroke: "fg", width: 1.5 }));
    const span = hi - lo;
    const step = span <= 12 ? 1 : span <= 24 ? 2 : 5;
    for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) {
      out.push(line(L(v), LINE_Y - 4, L(v), LINE_Y + 4, { stroke: "fg", width: 1.2 }), text(L(v), LINE_Y + 20, num(v), { tone: "muted", size: 11.5, anchor: "middle" }));
    }
    out.push(text(30, 298, p.paramLabel, { tone: "muted", size: 12, italic: true }));

    const iv = quadraticIntervals(p);
    const prog = (beat: string) => {
      const i = played.indexOf(beat);
      return i === -1 ? 0 : i === played.length - 1 ? t : 1;
    };
    const band = (ivs: Interval[], y: number, tone: "brand" | "amber", label: string, q: number) => {
      ivs.forEach(([s, e], k) => {
        const x1 = L(s);
        out.push({ kind: "rect", x: x1, y, w: Math.max(0, (L(e) - x1) * q), h: 8, rx: 4, fill: tone });
        if (k === 0 && q > 0.6) out.push(text(x1, y - 4, label, { tone, size: 11, weight: 600 }));
      });
    };
    const pd = prog("discriminant");
    if (pd > 0) band(iv.discriminant, 212, "brand", p.distinct ? "D > 0" : "D ≥ 0", pd);
    const ps = prog("signs");
    if (ps > 0 && p.condition !== "realRoots") band(iv.signs, 236, "amber", SIGN_LABEL[p.condition], ps);
    const pi = prog("intersection");
    if (pi > 0) {
      for (const [s, e] of iv.both) out.push({ kind: "rect", x: L(s), y: LINE_Y - 5, w: Math.max(0, (L(e) - L(s)) * pi), h: 10, rx: 5, fill: "good", opacity: 0.85 });
      if (pi > 0.5) for (const v of integersHolding(p, p.range)) out.push(dot(L(v), LINE_Y, 6, "good", { stroke: "card", width: 2 }));
    }
    const lx = L(l);
    out.push({ kind: "path", d: `M${lx} ${LINE_Y - 8} l-5 -8 h10 z`, fill: "fg" });
    return out;
  },
};
