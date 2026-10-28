/**
 * Function graph: y = f(x) drawn from a formula, for the questions whose
 * solution is about a curve's shape even when it is written as algebra.
 * Three kinds of question (params.ask):
 *
 *   crossings     count the solutions of f(x) = g(x) in the window: the curve
 *                 meets one or more lines or curves g, and the points are counted
 *   slopePoint    the one point where the tangent has a given slope: a tangent
 *                 slides along the curve until its slope matches, then the point
 *                 (and, with normal: true, the normal) appear
 *   slopePoints   every point with a given tangent slope (two, say): their
 *                 count, or the sum of their x, is the answer
 *   increasingOn / decreasingOn
 *                 is the curve rising (falling) on the keyed interval, or on
 *                 each piece of a keyed union: the rising stretches are shaded
 *                 and every piece is checked
 *   extrema       the curve's local maxima and minima (scope "local": every one
 *                 in the window, found where f' changes sign), or its greatest
 *                 and least values on a closed interval (scope "absolute", `on`,
 *                 endpoints included), checked against the stated `expect`
 *                 list; the value is how many of them disagree, so 0 passes
 *
 * Formulas use lib/visuals/expr (never eval). Beats: curve, compare, mark,
 * tangent, shade.
 */
import { compileExpr } from "../expr";
import { dot, line, num, text } from "../geometry";
import { finite, obj, optionalLabel, pair, ParamError, plainLabel, safely } from "../params";
import type { Scene, Shape } from "../types";
import { piFraction } from "./circleArc";

type Fn = (x: number) => number;

type Ask =
  | { kind: "crossings" }
  | { kind: "slopePoint"; slope: number; normal: boolean; pointLabel: string | undefined }
  | { kind: "slopePoints"; slope: number; normal: boolean; report: "count" | "sumX" | "sumY"; pointLabels: string[] }
  | { kind: "increasingOn" | "decreasingOn"; intervals: [number, number][]; intervalLabel: string }
  | { kind: "extrema"; scope: "local" | "absolute"; on: [number, number]; expect: Extremum[]; pointLabels: string[] };

interface Extremum {
  type: "max" | "min";
  /** null: the answer gives only the value (absolute scope). */
  x: number | null;
  y: number;
}

export interface FunctionGraphParams {
  f: Fn;
  fLabel: string;
  g: { fn: Fn; label: string }[];
  x: [number, number];
  y: [number, number];
  xTicks: "pi" | "number";
  ask: Ask;
}

const W = 340;
const H = 260;
const P = { l: 36, r: 330, t: 20, b: 222 };
const SAMPLES = 3000;

function slopeAt(f: Fn, x: number): number {
  const h = 1e-6 * Math.max(1, Math.abs(x));
  return (f(x + h) - f(x - h)) / (2 * h);
}

/**
 * Roots of d in [a, b] by sampling for sign changes, then bisection, plus the
 * roots where d only touches zero (a double root: (x - 1)^2, sin x = 1), found
 * as a local minimum of |d| that is zero to rounding. Points where d is not
 * finite are skipped.
 */
function rootsOf(d: Fn, a: number, b: number): number[] {
  const out: number[] = [];
  const push = (r: number) => {
    if (!out.some((o) => Math.abs(o - r) < 1e-7 * Math.max(1, Math.abs(r)))) out.push(r);
  };
  const step = (b - a) / SAMPLES;
  const near: [number, number][] = [];
  let px = a;
  let pv = d(a);
  let ppv = NaN;
  if (Number.isFinite(pv) && Math.abs(pv) < 1e-12) push(a);
  let biggest = Number.isFinite(pv) ? Math.abs(pv) : 0;
  for (let i = 1; i <= SAMPLES; i++) {
    const x = a + ((b - a) * i) / SAMPLES;
    const v = d(x);
    if (Number.isFinite(v)) biggest = Math.max(biggest, Math.abs(v));
    // pv is a local minimum of |d| with d the same sign either side: a touch candidate round px.
    if ([ppv, pv, v].every(Number.isFinite) && Math.abs(pv) <= Math.abs(ppv) && Math.abs(pv) < Math.abs(v) && Math.sign(ppv) === Math.sign(pv) && Math.sign(pv) === Math.sign(v)) near.push([px - step, x]);
    ppv = pv;
    if (Number.isFinite(v) && Math.abs(v) < 1e-12) push(x);
    else if (Number.isFinite(v) && Number.isFinite(pv) && Math.abs(pv) >= 1e-12 && Math.sign(v) !== Math.sign(pv)) {
      let lo = px;
      let hi = x;
      for (let k = 0; k < 80; k++) {
        const m = (lo + hi) / 2;
        const mv = d(m);
        if (!Number.isFinite(mv)) break;
        if (Math.sign(mv) === Math.sign(d(lo))) lo = m;
        else hi = m;
      }
      const r = (lo + hi) / 2;
      // A sign change across a pole (tan x at pi/2) is not a root: the value there is huge, not zero.
      if (Math.abs(d(r)) < 1e-6) push(r);
    }
    px = x;
    pv = v;
  }
  // Touches: narrow each candidate to the least |d| (golden section); it counts only when that is zero to
  // rounding, and only where no root was already found within two samples (rounding near a double root can
  // flip the sign and give the sign-change pass the same root).
  const tiny = Math.max(1e-10, 1e-12 * biggest);
  const found = [...out];
  for (let [lo, hi] of near) {
    const g = (Math.sqrt(5) - 1) / 2;
    for (let k = 0; k < 120; k++) {
      const m1 = hi - g * (hi - lo);
      const m2 = lo + g * (hi - lo);
      if (Math.abs(d(m1)) <= Math.abs(d(m2))) hi = m2;
      else lo = m1;
    }
    const r = (lo + hi) / 2;
    if (Math.abs(d(r)) < tiny && !found.some((o) => Math.abs(o - r) < 2 * step)) push(r);
  }
  return out.sort((p, q) => p - q);
}

function intervalsWhere(pred: (x: number) => boolean, a: number, b: number): [number, number][] {
  const out: [number, number][] = [];
  let start: number | null = null;
  const n = 600;
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    const ok = pred(x);
    if (ok && start === null) start = x;
    if (!ok && start !== null) {
      out.push([start, x]);
      start = null;
    }
  }
  if (start !== null) out.push([start, b]);
  return out;
}

export interface FunctionGraphFacts {
  crossings: [number, number][];
  point: [number, number] | null;
  /** Every point with the asked slope (slopePoint and slopePoints). */
  points: [number, number][];
  rising: [number, number][];
  /** local: every local max and min; absolute: the greatest and the least value on `on`. */
  extrema: { type: "max" | "min"; x: number; y: number }[];
}

const factCache = new WeakMap<FunctionGraphParams, FunctionGraphFacts>();

/** What the scene computes from its own model: crossings, the slope point, where the curve rises. Cached per params. */
export function functionGraphFacts(p: FunctionGraphParams): FunctionGraphFacts {
  const hit = factCache.get(p);
  if (hit) return hit;
  const [a, b] = p.x;
  const crossings = p.g.flatMap((g) => rootsOf((x) => p.f(x) - g.fn(x), a, b).map((x): [number, number] => [x, p.f(x)]));
  crossings.sort((m, n) => m[0] - n[0]);
  let point: [number, number] | null = null;
  let points: [number, number][] = [];
  if (p.ask.kind === "slopePoint" || p.ask.kind === "slopePoints") {
    const target = p.ask.slope;
    const eps = (b - a) * 1e-4;
    points = rootsOf((x) => slopeAt(p.f, x) - target, a + eps, b - eps).map((x): [number, number] => [x, p.f(x)]);
    if (points.length === 1) point = points[0];
  }
  const sign = p.ask.kind === "decreasingOn" ? -1 : 1;
  const rising = intervalsWhere((x) => sign * slopeAt(p.f, x) > 0, a, b);
  const extrema = p.ask.kind === "extrema" ? extremaOf(p.f, p.ask.on, p.ask.scope) : [];
  const facts = { crossings, point, points, rising, extrema };
  factCache.set(p, facts);
  return facts;
}

/**
 * Local scope: every point of (lo, hi) where f' changes sign, + to - a maximum
 * and - to + a minimum (a touch with no change, x^3 at 0, is neither). Absolute
 * scope: the greatest and least of f over [lo, hi], from the endpoints and the
 * points where f' = 0.
 */
function extremaOf(f: Fn, [lo, hi]: [number, number], scope: "local" | "absolute"): { type: "max" | "min"; x: number; y: number }[] {
  const eps = (hi - lo) * 1e-4;
  const crit = rootsOf((x) => slopeAt(f, x), lo + eps, hi - eps);
  if (scope === "local") {
    const d = (hi - lo) * 1e-3;
    const out: { type: "max" | "min"; x: number; y: number }[] = [];
    for (const r of crit) {
      const [sl, sr] = [slopeAt(f, r - d), slopeAt(f, r + d)];
      const y = f(r);
      if (!Number.isFinite(y)) continue;
      if (sl > 0 && sr < 0) out.push({ type: "max", x: r, y });
      else if (sl < 0 && sr > 0) out.push({ type: "min", x: r, y });
    }
    return out;
  }
  const cands = [lo, hi, ...crit].map((x) => ({ x, y: f(x) })).filter((c) => Number.isFinite(c.y));
  if (!cands.length) return [];
  const top = cands.reduce((m, c) => (c.y > m.y ? c : m));
  const bottom = cands.reduce((m, c) => (c.y < m.y ? c : m));
  return [{ type: "max", ...top }, { type: "min", ...bottom }];
}

/** How many stated extrema the drawing does not bear out (0 = all of them, and no others for local scope). */
function extremaMisses(found: { type: "max" | "min"; x: number; y: number }[], ask: Extract<Ask, { kind: "extrema" }>): number {
  const close = (u: number, v: number) => Math.abs(u - v) <= 1e-4 * (1 + Math.abs(v));
  if (ask.scope === "local") {
    if (found.length !== ask.expect.length) return Math.max(1, Math.abs(found.length - ask.expect.length));
    const want = [...ask.expect].sort((m, n) => (m.x ?? 0) - (n.x ?? 0));
    return want.filter((e, i) => !(found[i].type === e.type && close(found[i].x, e.x ?? NaN) && close(found[i].y, e.y))).length;
  }
  return ask.expect.filter((e) => {
    const g = found.find((h) => h.type === e.type);
    return !g || !close(g.y, e.y) || (e.x !== null && !close(g.x, e.x));
  }).length;
}

/** The extrema the picture marks: all local ones, or the asked greatest/least values. */
function shownExtrema(p: FunctionGraphParams): { type: "max" | "min"; x: number; y: number }[] {
  const ask = p.ask;
  if (ask.kind !== "extrema") return [];
  const found = functionGraphFacts(p).extrema;
  return ask.scope === "local" ? found : found.filter((e) => ask.expect.some((w) => w.type === e.type));
}

/**
 * Is f strictly monotone on [lo, hi] in the given direction? f' may vanish at
 * isolated points (x^3 rises straight through x = 0), so a sample there is
 * allowed; f' of the wrong sign anywhere, or f failing to move between two
 * samples (a flat stretch), is not.
 */
function monotoneOn(f: Fn, [lo, hi]: [number, number], sign: 1 | -1): boolean {
  const n = 400;
  // Interior points only: an endpoint may sit on the edge of the domain (log x at 0).
  const xs = Array.from({ length: n - 1 }, (_, i) => lo + ((hi - lo) * (i + 1)) / n);
  const slopes = xs.map((x) => slopeAt(f, x));
  if (!slopes.every(Number.isFinite)) return false;
  const tol = 1e-7 * Math.max(1, ...slopes.map(Math.abs));
  if (slopes.some((s) => sign * s < -tol)) return false;
  const ys = xs.map((x) => f(x));
  if (!ys.every(Number.isFinite)) return false;
  for (let i = 1; i < ys.length; i++) if (sign * (ys[i] - ys[i - 1]) <= 0) return false;
  return true;
}

function niceStep(span: number, maxTicks: number): number {
  const raw = span / maxTicks;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  for (const m of [1, 2, 5, 10]) if (m * mag >= raw) return m * mag;
  return 10 * mag;
}

/** Points along the curve, in pixels, for labels to keep clear of. */
function curveObstacles(p: FunctionGraphParams, X: (x: number) => number, Y: (y: number) => number): [number, number][] {
  const [xa, xb] = p.x;
  const out: [number, number][] = [];
  for (let i = 0; i <= 120; i++) {
    const xs = xa + ((xb - xa) * i) / 120;
    const v = p.f(xs);
    if (Number.isFinite(v)) out.push([X(xs), Y(v)]);
  }
  return out;
}

/** A dot at each point (pixels) and its label in the clearest of several spots round it; a far spot gets a leader line. */
function placeMarks(over: Shape[], obstacles: [number, number][], pts: [number, number][], labels: string[]) {
  pts.forEach(([px, py], i) => {
    const label = labels[i];
    const halfW = label.length * 3.4;
    const spots: [number, number, "start" | "end"][] = [];
    for (const ox of [10, 30, 55]) {
      for (const oy of [-12, -32, -55, -80, 22, 42, 64]) spots.push([px + ox, py + oy, "start"], [px - ox, py + oy, "end"]);
    }
    const room = ([sx, sy, anchor]: [number, number, "start" | "end"]) => {
      const cx = anchor === "start" ? sx + halfW : sx - halfW;
      const cy = sy - 4;
      if (cx - halfW < 2 || cx + halfW > W - 2 || cy < P.t + 14 || cy > P.b) return -1;
      // Distance from each obstacle to the label's whole box (half-height 8): 0 means it touches the text.
      return Math.min(...obstacles.map(([ox, oy]) => Math.max(Math.abs(ox - cx) - halfW, Math.abs(oy - cy) - 8, 0)));
    };
    // Clear room decides; nearness only breaks near-ties (room capped at 12 px).
    const score = (s: [number, number, "start" | "end"]) => Math.min(room(s), 12) - 0.02 * Math.hypot(s[0] - px, s[1] - py);
    const [lx, ly, anchor] = spots.reduce((best, s) => (score(s) > score(best) ? s : best), spots[0]);
    if (Math.hypot(lx - px, ly - py) > 30) {
      over.push(line(px, py, lx + (anchor === "start" ? -3 : 3), ly - 4, { stroke: "good", width: 1, opacity: 0.7 }));
    }
    over.push(dot(px, py, 5.5, "good", { stroke: "card", width: 2 }), text(lx, ly, label, { tone: "good", size: 12, weight: 700, anchor }));
    // A placed label is an obstacle for the next one.
    const cx = anchor === "start" ? lx + halfW : lx - halfW;
    for (let k = -4; k <= 4; k++) obstacles.push([cx + (halfW * k) / 4, ly - 4]);
  });
}

function compile(src: unknown, field: string): Fn {
  const r = compileExpr(src);
  if ("error" in r) throw new ParamError(`${field}: ${r.error}`);
  return r.fn;
}

export const functionGraph: Scene<FunctionGraphParams> = {
  id: "functionGraph",
  beats: ["curve", "compare", "mark", "tangent", "shade"],

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      const f = compile(o.f, "f");
      const w = obj(o.window);
      const x = pair(w, "x");
      const y = pair(w, "y");
      if (!(x[1] > x[0]) || !(y[1] > y[0])) throw new ParamError("window must run forward in x and y");
      const gSrc = o.g === undefined ? [] : o.g;
      if (!Array.isArray(gSrc) || gSrc.length > 4) throw new ParamError("g must be a list of at most 4 formulas");
      const gLabels = o.gLabels === undefined ? [] : o.gLabels;
      if (!Array.isArray(gLabels)) throw new ParamError("gLabels must be a list");
      const g = gSrc.map((src, i) => ({
        fn: compile(src, `g[${i}]`),
        label: gLabels[i] === undefined ? plainLabel(String(src), `g[${i}]`, 24) : plainLabel(gLabels[i], `gLabels[${i}]`),
      }));
      const xTicks = o.xTicks === "pi" ? "pi" : o.xTicks === undefined || o.xTicks === "number" ? "number" : null;
      if (!xTicks) throw new ParamError('xTicks must be "pi" or "number"');
      const a = obj(o.ask);
      let ask: Ask;
      if (a.kind === "crossings") {
        if (!g.length) throw new ParamError("crossings needs at least one line or curve in g");
        ask = { kind: "crossings" };
      } else if (a.kind === "slopePoint" || a.kind === "slopePoints") {
        if (a.normal !== undefined && typeof a.normal !== "boolean") throw new ParamError("normal must be true or false");
        const slope = finite(a, "slope");
        if (a.kind === "slopePoint") {
          ask = { kind: "slopePoint", slope, normal: a.normal === true, pointLabel: optionalLabel(a, "pointLabel") };
        } else {
          const report = a.report;
          if (report !== "count" && report !== "sumX" && report !== "sumY") throw new ParamError('report must be "count", "sumX" or "sumY"');
          const labels = a.pointLabels === undefined ? [] : a.pointLabels;
          if (!Array.isArray(labels) || labels.length > 4) throw new ParamError("pointLabels must be a list of at most 4");
          ask = { kind: "slopePoints", slope, normal: a.normal === true, report, pointLabels: labels.map((l, i) => plainLabel(l, `pointLabels[${i}]`)) };
        }
      } else if (a.kind === "increasingOn" || a.kind === "decreasingOn") {
        // One interval (`interval`, the original form, still stored on early visuals)
        // or a union of up to 3 (`intervals`).
        if (a.interval !== undefined && a.intervals !== undefined) throw new ParamError("give interval or intervals, not both");
        const raw = a.intervals === undefined ? [pair(a, "interval")] : a.intervals;
        if (!Array.isArray(raw) || raw.length < 1 || raw.length > 3) throw new ParamError("intervals must be a list of 1 to 3 pairs");
        const intervals = raw.map((iv, i) => pair({ [`intervals[${i}]`]: iv }, `intervals[${i}]`));
        intervals.forEach(([lo, hi], i) => {
          if (!(hi > lo) || lo < x[0] || hi > x[1]) throw new ParamError(`interval ${i + 1} must run forward inside the window`);
          if (i > 0 && lo < intervals[i - 1][1]) throw new ParamError("intervals must be in order and must not overlap");
        });
        ask = {
          kind: a.kind,
          intervals,
          intervalLabel: optionalLabel(a, "intervalLabel", 32) ?? intervals.map(([lo, hi]) => `${num(lo)} < x < ${num(hi)}`).join(" or "),
        };
      } else if (a.kind === "extrema") {
        if (a.scope !== "local" && a.scope !== "absolute") throw new ParamError('extrema needs scope "local" or "absolute"');
        const on = a.on === undefined ? x : pair(a, "on");
        if (!(on[1] > on[0]) || on[0] < x[0] || on[1] > x[1]) throw new ParamError("on must run forward inside the window");
        if (!Array.isArray(a.expect) || a.expect.length > 4) throw new ParamError("expect must be a list of at most 4 extrema");
        const expect = a.expect.map((raw, i): Extremum => {
          const e = obj(raw);
          if (e.type !== "max" && e.type !== "min") throw new ParamError(`expect[${i}].type must be "max" or "min"`);
          if (a.scope === "local" && e.x === undefined) throw new ParamError(`expect[${i}] needs x for a local extremum`);
          return { type: e.type, x: e.x === undefined ? null : finite(e, "x"), y: finite(e, "y") };
        });
        if (a.scope === "absolute" && (!expect.length || new Set(expect.map((e) => e.type)).size !== expect.length)) throw new ParamError("absolute extrema expect one max and/or one min");
        const labels = a.pointLabels === undefined ? [] : a.pointLabels;
        if (!Array.isArray(labels) || labels.length > 4) throw new ParamError("pointLabels must be a list of at most 4");
        ask = { kind: "extrema", scope: a.scope, on, expect, pointLabels: labels.map((l, i) => plainLabel(l, `pointLabels[${i}]`)) };
      } else {
        throw new ParamError("ask.kind must be crossings, slopePoint, slopePoints, increasingOn, decreasingOn or extrema");
      }
      return { f, fLabel: optionalLabel(o, "fLabel", 32) ?? "y = f(x)", g, x, y, xTicks, ask };
    }),

  check(p) {
    const facts = functionGraphFacts(p);
    switch (p.ask.kind) {
      case "crossings":
        return facts.crossings.length;
      case "slopePoint":
        return facts.point ? facts.point[0] : NaN;
      case "slopePoints":
        if (!facts.points.length) return NaN;
        if (p.ask.report === "count") return facts.points.length;
        return facts.points.reduce((sum, [px, py]) => sum + (p.ask.kind === "slopePoints" && p.ask.report === "sumY" ? py : px), 0);
      case "increasingOn":
        return p.ask.intervals.every((iv) => monotoneOn(p.f, iv, 1)) ? 1 : 0;
      case "decreasingOn":
        return p.ask.intervals.every((iv) => monotoneOn(p.f, iv, -1)) ? 1 : 0;
      case "extrema":
        return extremaMisses(facts.extrema, p.ask);
    }
  },

  checkText(p, value) {
    switch (p.ask.kind) {
      case "crossings":
        return `The curve meets the line${p.g.length > 1 ? "s" : ""} at ${value} points in the window.`;
      case "slopePoint":
        return Number.isFinite(value) ? `The tangent has slope ${num(p.ask.slope)} at x = ${value.toFixed(4)} on the drawing.` : "No single point has that slope in the window.";
      case "slopePoints": {
        const n = functionGraphFacts(p).points.length;
        const what = p.ask.report === "count" ? `${n} point${n === 1 ? "" : "s"}` : `${n} point${n === 1 ? "" : "s"}, ${p.ask.report === "sumX" ? "x" : "y"} adding up to ${num(value, 4)}`;
        return `The tangent has slope ${num(p.ask.slope)} at ${what} on the drawing.`;
      }
      case "increasingOn":
      case "decreasingOn": {
        const verb = p.ask.kind === "increasingOn" ? "rises" : "falls";
        return value === 1 ? `The curve ${verb} at every point of ${p.ask.intervalLabel} on the drawing.` : `The curve does not ${verb.slice(0, -1)} everywhere on ${p.ask.intervalLabel}.`;
      }
      case "extrema": {
        const absolute = p.ask.scope === "absolute";
        const word = (t: "max" | "min") => (absolute ? (t === "max" ? "greatest value" : "least value") : t === "max" ? "local maximum" : "local minimum");
        const list = shownExtrema(p).map((e) => `a ${word(e.type)} at (${num(e.x, 4)}, ${num(e.y, 4)})`).join(" and ");
        const found = list ? `The curve has ${list}` : "The curve has no local maximum or minimum here";
        return value === 0 ? `${found}, as stated.` : `${found}; the stated answer differs.`;
      }
    }
  },

  viewBox: () => ({ w: W, h: H }),

  duration: (beat) => ({ curve: 1400, compare: 900, mark: 1600, tangent: 1800, shade: 1300 })[beat] ?? 1300,

  frame(p, { played, t }) {
    const [xa, xb] = p.x;
    const [ya, yb] = p.y;
    const X = (x: number) => P.l + ((x - xa) / (xb - xa)) * (P.r - P.l);
    const Y = (y: number) => P.b - ((y - ya) / (yb - ya)) * (P.b - P.t);
    const clampY = (v: number) => Math.max(P.t - 30, Math.min(P.b + 30, v));
    const prog = (beat: string) => {
      const i = played.indexOf(beat);
      return i === -1 ? 0 : i === played.length - 1 ? t : 1;
    };
    const facts = functionGraphFacts(p);
    const under: Shape[] = [];
    const axes: Shape[] = [];
    const curves: Shape[] = [];
    const over: Shape[] = [];

    // Axes and ticks.
    const axisY = ya <= 0 && yb >= 0 ? Y(0) : P.b;
    const axisX = xa <= 0 && xb >= 0 ? X(0) : P.l;
    axes.push(line(P.l, axisY, P.r, axisY, { stroke: "muted", width: 1.2 }), line(axisX, P.t, axisX, P.b, { stroke: "muted", width: 1.2 }));
    const xStep = p.xTicks === "pi" ? ([Math.PI / 4, Math.PI / 2, Math.PI, 2 * Math.PI].find((s) => (xb - xa) / s <= 8) ?? 2 * Math.PI) : niceStep(xb - xa, 7);
    for (let k = Math.ceil(xa / xStep - 1e-9); k * xStep <= xb + 1e-9; k++) {
      const v = k * xStep;
      if (Math.abs(v) < 1e-12) continue;
      // A negative pi tick reads "−π/4", not "−0.79".
      const frac = p.xTicks === "pi" ? piFraction(Math.abs(v)) : null;
      const label = frac ? (v < 0 ? `−${frac}` : frac) : num(v);
      axes.push(line(X(v), axisY - 3, X(v), axisY + 3, { stroke: "muted", width: 1 }), text(X(v), Math.min(H - 4, axisY + 15), label, { tone: "muted", size: 10, anchor: "middle" }));
    }
    const yStep = niceStep(yb - ya, 5);
    for (let k = Math.ceil(ya / yStep - 1e-9); k * yStep <= yb + 1e-9; k++) {
      const v = k * yStep;
      if (Math.abs(v) < 1e-12) continue;
      axes.push(line(axisX - 3, Y(v), axisX + 3, Y(v), { stroke: "muted", width: 1 }));
      // No number in the top row, where the curve's own label sits.
      if (Y(v) > P.t + 14) axes.push(text(Math.max(2, axisX - 5), Y(v) + 3, num(v), { tone: "muted", size: 10, anchor: "end" }));
    }

    // A curve as polylines, broken where it leaves the domain or jumps (a pole).
    const plot = (fn: Fn, upto: number, tone: "brand" | "amber", width: number) => {
      let seg: [number, number][] = [];
      const flush = () => {
        if (seg.length > 1) curves.push({ kind: "polyline", points: seg, stroke: tone, width });
        seg = [];
      };
      // Off-frame stretches are not drawn: the line runs to the edge and stops,
      // and picks up again at the edge when the curve comes back (an asymptote
      // used to leave a flat stub running along the edge).
      let wasOut = false;
      let prev: [number, number] | null = null;
      for (let i = 0; i <= 240; i++) {
        const x = xa + ((xb - xa) * i) / 240;
        if (x > upto + 1e-12) break;
        const v = fn(x);
        if (!Number.isFinite(v)) {
          flush();
          wasOut = false;
          prev = null;
          continue;
        }
        const raw = Y(v);
        const point: [number, number] = [X(x), clampY(raw)];
        const out = raw < P.t - 30 || raw > P.b + 30;
        if (out) {
          if (!wasOut && seg.length) seg.push(point);
          flush();
        } else {
          if (seg.length && Math.abs(point[1] - seg[seg.length - 1][1]) > P.b - P.t) flush();
          if (wasOut && prev) seg.push(prev);
          seg.push(point);
        }
        wasOut = out;
        prev = point;
      }
      flush();
    };

    const pc = played.includes("curve") ? prog("curve") : 1;
    plot(p.f, xa + (xb - xa) * pc, "brand", 3);
    over.push(text(P.l + 6, P.t + 2, p.fLabel, { tone: "brand", size: 12, weight: 600 }));

    // The second curve or lines: drawn once compare (or mark) has started.
    const pg = played.includes("compare") ? prog("compare") : played.includes("mark") ? 1 : 0;
    if (pg > 0) {
      p.g.forEach((g, i) => {
        plot(g.fn, xa + (xb - xa) * pg, "amber", 2);
        if (pg === 1) {
          const ly = Y(g.fn(xb));
          over.push(text(P.r - 2, Math.max(P.t + 12, Math.min(P.b - 4, (Number.isFinite(ly) ? ly : P.t) - 5 - i * 0)), g.label, { tone: "amber", size: 11, weight: 600, anchor: "end" }));
        }
      });
    }

    // Rising (falling) stretches, behind the curve.
    const ps = prog("shade");
    if (ps > 0 && (p.ask.kind === "increasingOn" || p.ask.kind === "decreasingOn")) {
      const reach = xa + (xb - xa) * ps;
      for (const [s, e] of facts.rising) {
        if (s >= reach) continue;
        under.push({ kind: "rect", x: X(s), y: P.t, w: X(Math.min(e, reach)) - X(s), h: P.b - P.t, fill: "goodSoft" });
      }
      if (ps > 0.6 && p.ask.intervals.length > 1) {
        // A union: a band per piece, and the label in the header row, since one
        // label cannot sit beside two bands.
        const word = p.ask.kind === "increasingOn" ? "rising" : "falling";
        for (const [lo, hi] of p.ask.intervals) over.push({ kind: "rect", x: X(lo), y: axisY - 4, w: X(hi) - X(lo), h: 8, rx: 4, fill: "good" });
        over.push(text(P.r - 2, P.t + 2, `${word}: ${p.ask.intervalLabel}`, { tone: "good", size: 11, weight: 700, anchor: "end" }));
      } else if (ps > 0.6) {
        const [lo, hi] = p.ask.intervals[0];
        // The label goes just above or just below the band, whichever is farther
        // from the curve over the label's width.
        // Candidates: centred, or slid to either end of the band; above or below it.
        const half = p.ask.intervalLabel.length * 3.2;
        const fit = (x: number) => Math.min(P.r - half - 2, Math.max(P.l + half + 2, x));
        const clearance = (cx: number, yy: number) => {
          if (yy < P.t + 26 || yy > H - 4) return -1;
          let d = Infinity;
          for (let i = 0; i <= 40; i++) {
            const px = cx - half + (2 * half * i) / 40;
            const v = p.f(xa + ((px - P.l) / (P.r - P.l)) * (xb - xa));
            if (Number.isFinite(v)) d = Math.min(d, Math.abs(Y(v) - (yy - 4)));
          }
          return d;
        };
        let lx = fit((X(lo) + X(hi)) / 2);
        let ly = axisY - 10;
        let best = -Infinity;
        // ...or just past either end, for a band about as narrow as its label.
        for (const cx of [fit((X(lo) + X(hi)) / 2), fit(X(lo) + half), fit(X(hi) - half), fit(X(hi) + half + 6), fit(X(lo) - half - 6)]) {
          for (const yy of [axisY - 10, axisY + 28]) {
            // Room decides, capped so a clear centred spot is not passed over for an end.
            const score = Math.min(clearance(cx, yy), 14) - 0.01 * Math.abs(cx - (X(lo) + X(hi)) / 2);
            if (score > best) {
              best = score;
              lx = cx;
              ly = yy;
            }
          }
        }
        const word = p.ask.kind === "increasingOn" ? "rising" : "falling";
        over.push({ kind: "rect", x: X(lo), y: axisY - 4, w: X(hi) - X(lo), h: 8, rx: 4, fill: "good" });
        if (best >= 6) {
          over.push(
            text(lx, Math.max(P.t + 26, ly), p.ask.intervalLabel, { tone: "good", size: 11, weight: 700, anchor: "middle" }),
            text(P.r - 2, P.t + 2, `shaded: ${word}`, { tone: "good", size: 10.5, anchor: "end" }),
          );
        } else {
          // No clear spot near the band (a curve swinging both ways): the interval
          // goes in the header row, which is always free.
          over.push(text(P.r - 2, P.t + 2, `${word}: ${p.ask.intervalLabel}`, { tone: "good", size: 11, weight: 700, anchor: "end" }));
        }
      }
    }

    // Crossings counted one by one.
    const pm = prog("mark");
    if (pm > 0 && p.ask.kind === "crossings") {
      const shown = Math.min(facts.crossings.length, Math.ceil(facts.crossings.length * pm - 1e-9));
      facts.crossings.slice(0, shown).forEach(([cx, cy]) => over.push(dot(X(cx), clampY(Y(cy)), 4.5, "good", { stroke: "card", width: 1.5 })));
      over.push(text(P.r - 2, P.t + 2, `${shown} solution${shown === 1 ? "" : "s"}`, { tone: "good", size: 13, weight: 700, anchor: "end" }));
    }

    // A tangent sliding along the curve to the point(s) with the asked slope.
    if (p.ask.kind === "slopePoint" || p.ask.kind === "slopePoints") {
      const ask = p.ask;
      const marked = ask.kind === "slopePoint" ? (facts.point ? [facts.point] : []) : facts.points;
      const labels = marked.map(([x0, y0], i) => (ask.kind === "slopePoint" ? ask.pointLabel : ask.pointLabels[i]) ?? `(${num(x0, 3)}, ${num(y0, 3)})`);
      const dx = (xb - xa) * (marked.length > 1 ? 0.12 : 0.2);
      const pt = prog("tangent");
      if (pt > 0 && pm === 0 && marked.length) {
        // One point: slide to it from the right. Several: sweep across the window, left to right.
        const from = marked.length > 1 ? xa + (xb - xa) * 0.04 : xa + (xb - xa) * 0.6;
        const to = marked.length > 1 ? xb - (xb - xa) * 0.04 : marked[0][0];
        const xt = from + (to - from) * pt;
        const yt = p.f(xt);
        const s = slopeAt(p.f, xt);
        if (Number.isFinite(yt) && Number.isFinite(s)) {
          const d = (xb - xa) * 0.18;
          over.push(
            line(X(xt - d), clampY(Y(yt - s * d)), X(xt + d), clampY(Y(yt + s * d)), { stroke: "amber", width: 2.2, cap: "round" }),
            dot(X(xt), clampY(Y(yt)), 3.5, "amber"),
            text(P.r - 2, P.t + 2, `tangent slope ${num(s)}`, { tone: "amber", size: 12, weight: 700, anchor: "end" }),
          );
        }
        // Points already passed by the sweep stay marked.
        if (marked.length > 1) for (const [x0, y0] of marked) if (x0 <= xt) over.push(dot(X(x0), clampY(Y(y0)), 5, "good", { stroke: "card", width: 2 }));
      }
      if (pm > 0 && marked.length) {
        // Every line drawn round the points, so no label lands on one.
        const obstacles = curveObstacles(p, X, Y);
        for (const [x0, y0] of marked) {
          over.push(line(X(x0 - dx), clampY(Y(y0 - ask.slope * dx)), X(x0 + dx), clampY(Y(y0 + ask.slope * dx)), { stroke: "amber", width: 2, cap: "round" }));
          for (let k = -10; k <= 10; k++) {
            const along = (dx * k) / 10;
            obstacles.push([X(x0 + along), Y(y0 + ask.slope * along)]);
          }
          if (ask.normal) {
            if (ask.slope === 0) {
              // A horizontal tangent has a vertical normal.
              over.push(line(X(x0), P.t + 20, X(x0), P.b, { stroke: "fg", width: 1.8, dash: "5 4", opacity: pm }));
              for (let yy = P.t + 20; yy <= P.b; yy += 4) obstacles.push([X(x0), yy]);
            } else {
              const m = -1 / ask.slope;
              over.push(line(X(x0 - dx), clampY(Y(y0 - m * dx)), X(x0 + dx), clampY(Y(y0 + m * dx)), { stroke: "fg", width: 1.8, dash: "5 4", opacity: pm }));
              for (let k = -10; k <= 10; k++) {
                const along = (dx * k) / 10;
                obstacles.push([X(x0 + along), Y(y0 + m * along)]);
              }
            }
          }
        }
        placeMarks(over, obstacles, marked.map(([x0, y0]): [number, number] => [X(x0), clampY(Y(y0))]), labels);
        const head = ask.kind === "slopePoints" ? `${marked.length} points with tangent slope ${num(ask.slope)}` : `tangent slope ${num(ask.slope)}`;
        over.push(text(P.r - 2, P.t + 2, ask.normal ? `${head}, normal dashed` : head, { tone: "amber", size: 11, weight: 600, anchor: "end" }));
      }
    }

    // Extrema: a dot and a label at each, and the interval's ends for absolute scope.
    if (p.ask.kind === "extrema" && pm > 0) {
      const ask = p.ask;
      if (ask.scope === "absolute" && (ask.on[0] > xa || ask.on[1] < xb)) {
        for (const e of ask.on) over.push(line(X(e), P.t + 16, X(e), P.b, { stroke: "muted", width: 1.2, dash: "4 4" }));
      }
      const shown = shownExtrema(p);
      placeMarks(
        over,
        curveObstacles(p, X, Y),
        shown.map((e): [number, number] => [X(e.x), clampY(Y(e.y))]),
        shown.map((e, i) => ask.pointLabels[i] ?? `${e.type} (${num(e.x, 3)}, ${num(e.y, 3)})`),
      );
      const head = ask.scope === "absolute" ? `greatest and least, ${num(ask.on[0], 3)} ≤ x ≤ ${num(ask.on[1], 3)}` : "local max and min";
      over.push(text(P.r - 2, P.t + 2, head, { tone: "good", size: 11, weight: 600, anchor: "end" }));
    }

    // The header (top right) drops to a second row when it would run into the
    // curve's name (top left). Widths are estimated from the font sizes used.
    const nameEnd = P.l + 6 + p.fLabel.length * 6.4;
    for (const s of over) {
      if (s.kind === "text" && s.anchor === "end" && s.y === P.t + 2) {
        const start = s.x - s.text.length * (s.size ?? 13) * 0.52;
        if (start < nameEnd + 8) s.y = P.t + 17;
      }
    }

    return [...under, ...axes, ...curves, ...over];
  },
};
