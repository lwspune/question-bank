/**
 * Linear programming: the constraint lines, the feasible region they cut out,
 * its corners, and the objective line Z = ax + by sliding to the best corner.
 * The answer is worked out from the constraints themselves (corner points, and
 * an exact test for a region unbounded in a direction where Z keeps improving),
 * never from the drafter's corner list.
 *
 *   constraints  [{ a, b, op: "<=" | ">=", c, label? }]: a x + b y op c (up to 8)
 *   nonNegative  true by default: adds x >= 0, y >= 0
 *   objective    { a, b, label? }: Z = a x + b y
 *   ask          max | min | range (max - min)
 *                maxCount | minCount: 1 = one optimal corner, 2 = optimal along a
 *                  whole edge (infinitely many points)
 *                maxAt | minAt with at: [x, y] or [[x, y], ...]: 1 when the optimal
 *                  corners are exactly those, else 0
 *
 * Beats: constraints, region, corners, sweep, answer.
 */
import { dot, line, num, progressOf, text } from "../geometry";
import { finite, obj, optionalLabel, pair, ParamError, safely } from "../params";
import type { Scene, Shape } from "../types";

type XY = [number, number];

/** a x + b y <= c with a^2 + b^2 = 1. */
interface Half {
  a: number;
  b: number;
  c: number;
}

interface Constraint {
  half: Half;
  label: string | undefined;
}

type AskKind = "max" | "min" | "range" | "maxCount" | "minCount" | "maxAt" | "minAt";

export interface LpParams {
  x: [number, number];
  y: [number, number];
  constraints: Constraint[];
  halves: Half[];
  objective: { a: number; b: number; label: string | undefined };
  ask: { kind: AskKind; at: XY[]; label: string | undefined };
}

interface Optimum {
  /** Best Z over the corners (NaN when the region is empty). */
  value: number;
  /** Z keeps improving off to infinity: no optimum exists. */
  unbounded: boolean;
  /** The corners where Z is best. */
  at: XY[];
  /** Z stays at its best along a ray out of the region (an unbounded optimal edge). */
  ray: XY | null;
}

export interface LpFacts {
  corners: XY[];
  /** The feasible region clipped to the window, in plane coordinates, for shading. */
  poly: XY[];
  empty: boolean;
  max: Optimum;
  min: Optimum;
  value: number;
}

const W = 340;
const H = 300;
const PL = 40;
const PR = 330;
const PT = 30;
const PB = H - 34;

const Z = (p: LpParams, q: XY) => p.objective.a * q[0] + p.objective.b * q[1];
const span = (p: LpParams) => Math.max(p.x[1] - p.x[0], p.y[1] - p.y[0]);
const unit = (v: XY): XY => {
  const n = Math.hypot(v[0], v[1]);
  return [v[0] / n, v[1] / n];
};

function meet(h: Half, k: Half): XY | null {
  const det = h.a * k.b - h.b * k.a;
  if (Math.abs(det) < 1e-12) return null;
  // + 0 turns a -0 into 0, so a corner never reads (−0, 0).
  return [(h.c * k.b - k.c * h.b) / det + 0, (h.a * k.c - k.a * h.c) / det + 0];
}

/** Clip a convex polygon to a x + b y <= c (Sutherland-Hodgman). */
function clipTo(poly: XY[], h: Half): XY[] {
  const out: XY[] = [];
  const side = (q: XY) => h.a * q[0] + h.b * q[1] - h.c;
  for (let i = 0; i < poly.length; i++) {
    const P = poly[i];
    const Q = poly[(i + 1) % poly.length];
    const [sp, sq] = [side(P), side(Q)];
    if (sp <= 0) out.push(P);
    if ((sp < 0 && sq > 0) || (sp > 0 && sq < 0)) {
      const t = sp / (sp - sq);
      out.push([P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t]);
    }
  }
  return out;
}

function optimum(p: LpParams, corners: XY[], sign: 1 | -1): Optimum {
  if (!corners.length) return { value: NaN, unbounded: false, at: [], ray: null };
  // A recession direction d (every half has a.d <= 0) along which sign * Z grows means no optimum.
  // In the plane the best such d is a boundary direction or the objective's own direction.
  const o: XY = [p.objective.a, p.objective.b];
  const cands: XY[] = [unit([sign * o[0], sign * o[1]])];
  for (const h of p.halves) cands.push([-h.b, h.a], [h.b, -h.a]);
  const inCone = (d: XY) => p.halves.every((h) => h.a * d[0] + h.b * d[1] <= 1e-12);
  const oz = unit(o);
  let unbounded = false;
  let ray: XY | null = null;
  for (const d of cands) {
    if (!inCone(d)) continue;
    const g = sign * (oz[0] * d[0] + oz[1] * d[1]);
    if (g > 1e-9) unbounded = true;
    else if (Math.abs(g) <= 1e-9) ray = d;
  }
  const zs = corners.map((q) => sign * Z(p, q));
  const best = Math.max(...zs);
  const tol = 1e-9 * Math.max(1, ...zs.map(Math.abs));
  const at = corners.filter((_, i) => zs[i] >= best - tol);
  return { value: sign * best, unbounded, at, ray: unbounded ? null : ray };
}

const cache = new WeakMap<LpParams, LpFacts>();

export function lpFacts(p: LpParams): LpFacts {
  const hit = cache.get(p);
  if (hit) return hit;
  const tol = 1e-9 * Math.max(1, span(p));
  const feasible = (q: XY) => p.halves.every((h) => h.a * q[0] + h.b * q[1] <= h.c + tol);
  const corners: XY[] = [];
  for (let i = 0; i < p.halves.length; i++) {
    for (let j = i + 1; j < p.halves.length; j++) {
      const q = meet(p.halves[i], p.halves[j]);
      if (q && feasible(q) && !corners.some((c) => Math.hypot(c[0] - q[0], c[1] - q[1]) < 1e-7 * Math.max(1, span(p)))) corners.push(q);
    }
  }
  // Corners in order round the region.
  if (corners.length) {
    const cx = corners.reduce((s, q) => s + q[0], 0) / corners.length;
    const cy = corners.reduce((s, q) => s + q[1], 0) / corners.length;
    corners.sort((m, n) => Math.atan2(m[1] - cy, m[0] - cx) - Math.atan2(n[1] - cy, n[0] - cx));
  }
  let poly: XY[] = [
    [p.x[0], p.y[0]],
    [p.x[1], p.y[0]],
    [p.x[1], p.y[1]],
    [p.x[0], p.y[1]],
  ];
  for (const h of p.halves) poly = clipTo(poly, h);
  const empty = poly.length < 3 && corners.length === 0;
  const max = optimum(p, corners, 1);
  const min = optimum(p, corners, -1);
  const pick = (o: Optimum) => (o.unbounded ? NaN : o.value);
  const sameSet = (o: Optimum, want: XY[]) =>
    !o.unbounded && !o.ray && o.at.length === want.length && want.every((w) => o.at.some((q) => Math.hypot(q[0] - w[0], q[1] - w[1]) < 1e-6 * Math.max(1, span(p))));
  const count = (o: Optimum) => (o.unbounded || !o.at.length ? NaN : o.ray || o.at.length > 1 ? 2 : 1);
  const k = p.ask.kind;
  const atValue = (o: Optimum) => (o.unbounded || !corners.length ? NaN : sameSet(o, p.ask.at) ? 1 : 0);
  const value =
    k === "max" ? pick(max)
    : k === "min" ? pick(min)
    : k === "range" ? pick(max) - pick(min)
    : k === "maxCount" ? count(max)
    : k === "minCount" ? count(min)
    : atValue(k === "maxAt" ? max : min);
  const facts: LpFacts = { corners, poly, empty, max, min, value };
  cache.set(p, facts);
  return facts;
}

const pt = (q: XY) => `(${num(q[0])}, ${num(q[1])})`;

/** "2x + y = 20", "x − 2y = −1", "y = 3". */
function equation(a: number, b: number, c: number): string {
  const term = (k: number, v: string, first: boolean) => {
    if (k === 0) return "";
    const mag = Math.abs(k) === 1 ? v : `${num(Math.abs(k))}${v}`;
    if (first) return k < 0 ? `−${mag}` : mag;
    return k < 0 ? ` − ${mag}` : ` + ${mag}`;
  };
  const left = term(a, "x", true) + term(b, "y", a === 0);
  return `${left} = ${num(c)}`;
}

export const lpRegion: Scene<LpParams> = {
  id: "lpRegion",
  beats: ["constraints", "region", "corners", "sweep", "answer"],

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      const w = obj(o.window);
      const x = pair(w, "x");
      const y = pair(w, "y");
      if (!(x[1] > x[0]) || !(y[1] > y[0])) throw new ParamError("window must run forward in x and y");

      if (!Array.isArray(o.constraints) || o.constraints.length === 0 || o.constraints.length > 8) throw new ParamError("constraints must be a list of 1 to 8");
      const constraints: Constraint[] = o.constraints.map((r, i) => {
        const q = obj(r);
        const a = finite(q, "a");
        const b = finite(q, "b");
        const c = finite(q, "c");
        if (q.op !== "<=" && q.op !== ">=") throw new ParamError(`constraints[${i}]: op must be "<=" or ">="`);
        const n = Math.hypot(a, b);
        if (n === 0) throw new ParamError(`constraints[${i}]: a and b cannot both be 0`);
        const s = q.op === "<=" ? 1 : -1;
        return { half: { a: (s * a) / n, b: (s * b) / n, c: (s * c) / n }, label: q.label === "" ? "" : optionalLabel(q, "label") ?? equation(a, b, c) };
      });
      if (o.nonNegative !== undefined && typeof o.nonNegative !== "boolean") throw new ParamError("nonNegative must be true or false");
      const halves = constraints.map((k) => k.half);
      if (o.nonNegative !== false) halves.push({ a: -1, b: 0, c: 0 }, { a: 0, b: -1, c: 0 });

      const ob = obj(o.objective);
      const objective = { a: finite(ob, "a"), b: finite(ob, "b"), label: optionalLabel(ob, "label") };
      if (objective.a === 0 && objective.b === 0) throw new ParamError("objective: a and b cannot both be 0");

      const a = obj(o.ask);
      const kinds: AskKind[] = ["max", "min", "range", "maxCount", "minCount", "maxAt", "minAt"];
      if (!kinds.includes(a.kind as AskKind)) throw new ParamError(`ask.kind must be ${kinds.join(", ")}`);
      const kind = a.kind as AskKind;
      let at: XY[] = [];
      if (kind === "maxAt" || kind === "minAt") {
        const v = a.at;
        const isPt = (u: unknown) => Array.isArray(u) && u.length === 2 && u.every((n) => typeof n === "number" && Number.isFinite(n));
        if (isPt(v)) at = [v as XY];
        else if (Array.isArray(v) && v.length >= 1 && v.length <= 4 && v.every(isPt)) at = v as XY[];
        else throw new ParamError("ask: maxAt / minAt need at: [x, y] or a list of points");
      }
      const p: LpParams = { x, y, constraints, halves, objective, ask: { kind, at, label: optionalLabel(a, "label", 32) } };

      // Every corner must be in view: a hidden corner would hide the answer.
      const slack = 1e-9 * span(p);
      for (const q of lpFacts(p).corners) {
        if (q[0] < x[0] - slack || q[0] > x[1] + slack || q[1] < y[0] - slack || q[1] > y[1] + slack) throw new ParamError(`corner ${pt(q)} is outside the window`);
      }
      return p;
    }),

  check: (p) => lpFacts(p).value,

  checkText(p, value) {
    const f = lpFacts(p);
    if (f.empty) return "The constraints leave no feasible region: it is empty.";
    const k = p.ask.kind;
    const which = k.startsWith("min") ? f.min : f.max;
    const word = k.startsWith("min") ? "minimum" : "maximum";
    if (k === "range") {
      if (f.max.unbounded) return "Z has no maximum: the region is unbounded in a direction where Z grows.";
      if (f.min.unbounded) return "Z has no minimum: the region is unbounded in a direction where Z falls.";
      return `Z runs from ${num(f.min.value, 4)} to ${num(f.max.value, 4)} over the corners, a difference of ${num(value, 4)}.`;
    }
    if (which.unbounded) return `Z has no ${word}: the region is unbounded in a direction where Z keeps ${word === "maximum" ? "growing" : "falling"}.`;
    if (!f.corners.length) return "The region has no corner, so Z has no single best corner.";
    if (k === "max" || k === "min") return `The ${word} of Z over the corners is ${num(value, 4)}, at ${which.at.map(pt).join(" and ")}.`;
    if (k === "maxCount" || k === "minCount") return value === 2 ? `Z reaches its ${word} along a whole edge, so at infinitely many points.` : `Z reaches its ${word} at one corner only, ${pt(which.at[0])}.`;
    return value === 1 ? `The ${word} is at exactly ${p.ask.at.map(pt).join(" and ")}.` : `The ${word} is not there: it is at ${which.at.map(pt).join(" and ")}${which.ray ? " and along a whole edge" : ""}.`;
  },

  viewBox: () => ({ w: W, h: H }),

  duration: (beat) => ({ constraints: 1800, region: 1100, corners: 1200, sweep: 2600, answer: 1200 })[beat] ?? 1300,

  frame(p, { played, t }) {
    const f = lpFacts(p);
    const [xa, xb] = p.x;
    const [ya, yb] = p.y;
    const X = (v: number) => PL + ((v - xa) / (xb - xa)) * (PR - PL);
    const Y = (v: number) => PB - ((v - ya) / (yb - ya)) * (PB - PT);
    const px = (q: XY): XY => [X(q[0]), Y(q[1])];
    const prog = (beat: string) => progressOf(beat, played, t);
    const under: Shape[] = [];
    const axes: Shape[] = [];
    const draw: Shape[] = [];
    const over: Shape[] = [];
    const taken: [number, number, number, number][] = [];
    const free = (x0: number, y0: number, w0: number) => !taken.some(([a, b, c, d]) => x0 < c && x0 + w0 > a && y0 - 11 < d && y0 + 2 > b);
    const label = (x0: number, y0: number, s: string, tone: "amber" | "fg" | "brand" | "good", size = 10.5): Shape | null => {
      const w0 = s.length * size * 0.56;
      const left = Math.max(2, Math.min(W - 2 - w0, x0));
      const top = Math.max(PT - 14 + 11, Math.min(H - 4, y0));
      if (!free(left, top, w0)) return null;
      taken.push([left, top - 11, left + w0, top + 2]);
      return text(left, top, s, { tone, size, weight: 600, anchor: "start" });
    };

    // Axes and ticks.
    const axisY = ya <= 0 && yb >= 0 ? Y(0) : PB;
    const axisX = xa <= 0 && xb >= 0 ? X(0) : PL;
    axes.push(line(PL, axisY, PR, axisY, { stroke: "muted", width: 1.2 }), line(axisX, PT, axisX, PB, { stroke: "muted", width: 1.2 }));
    const step = (s: number, ticks: number) => {
      const raw = s / ticks;
      const mag = Math.pow(10, Math.floor(Math.log10(raw)));
      return [1, 2, 5, 10].map((m) => m * mag).find((v) => v >= raw)!;
    };
    const xs = step(xb - xa, 6);
    for (let k = Math.ceil(xa / xs - 1e-9); k * xs <= xb + 1e-9; k++) {
      const v = k * xs;
      if (Math.abs(v) < 1e-12) continue;
      axes.push(line(X(v), axisY - 3, X(v), axisY + 3, { stroke: "muted", width: 1 }), text(X(v), Math.min(H - 4, axisY + 14), num(v), { tone: "muted", size: 10, anchor: "middle" }));
      taken.push([X(v) - 10, axisY + 3, X(v) + 10, axisY + 16]);
    }
    const ys = step(yb - ya, 5);
    for (let k = Math.ceil(ya / ys - 1e-9); k * ys <= yb + 1e-9; k++) {
      const v = k * ys;
      if (Math.abs(v) < 1e-12) continue;
      axes.push(line(axisX - 3, Y(v), axisX + 3, Y(v), { stroke: "muted", width: 1 }), text(Math.max(2, axisX - 5), Y(v) + 3, num(v), { tone: "muted", size: 10, anchor: "end" }));
      taken.push([axisX - 26, Y(v) - 8, axisX - 3, Y(v) + 5]);
    }

    // A line a x + b y = c across the window, or null when it misses it.
    const clip = (a: number, b: number, c: number): [XY, XY] | null => {
      const hits: XY[] = [];
      if (Math.abs(b) > 1e-12) for (const xv of [xa, xb]) hits.push([xv, (c - a * xv) / b]);
      if (Math.abs(a) > 1e-12) for (const yv of [ya, yb]) hits.push([(c - b * yv) / a, yv]);
      const e = 1e-9 * span(p);
      const inside = hits.filter(([hx, hy]) => hx >= xa - e && hx <= xb + e && hy >= ya - e && hy <= yb + e);
      if (inside.length < 2) return null;
      inside.sort((m, n) => m[0] - n[0] || m[1] - n[1]);
      return [inside[0], inside[inside.length - 1]];
    };

    // Corner dots and labels first claim their room, so line labels go elsewhere.
    const pc = prog("corners");
    const cx = f.corners.reduce((s, q) => s + X(q[0]), 0) / Math.max(1, f.corners.length);
    const cy = f.corners.reduce((s, q) => s + Y(q[1]), 0) / Math.max(1, f.corners.length);
    const cornerLabels: Shape[] = [];
    f.corners.forEach((q, i) => {
      const share = Math.max(0, Math.min(1, pc * f.corners.length - i));
      if (share <= 0) return;
      const [qx, qy] = px(q);
      over.push(dot(qx, qy, 4, "fg", { stroke: "card", width: 1.5, opacity: share }));
      const s = pt(q);
      const wl = s.length * 10.5 * 0.56;
      // Outward from the region's centre first, then the other three sides.
      const right = qx >= cx;
      const below = qy >= cy;
      const spots: [number, number][] = [
        [right ? qx + 7 : qx - wl - 7, below ? qy + 14 : qy - 7],
        [right ? qx + 7 : qx - wl - 7, below ? qy - 7 : qy + 14],
        [right ? qx - wl - 7 : qx + 7, below ? qy + 14 : qy - 7],
        [right ? qx - wl - 7 : qx + 7, below ? qy - 7 : qy + 14],
      ];
      for (const [lx, ly] of spots) {
        const sh = label(lx, ly, s, "fg");
        if (sh) {
          cornerLabels.push(sh);
          break;
        }
      }
    });

    // Constraint lines, one after another, each with its equation near its top end.
    const pk = prog("constraints");
    p.constraints.forEach((k, i) => {
      const share = Math.max(0, Math.min(1, pk * p.constraints.length - i));
      if (share <= 0) return;
      const n = Math.hypot(k.half.a, k.half.b);
      const seg = clip(k.half.a / n, k.half.b / n, k.half.c / n);
      if (!seg) return;
      const [A, B] = [px(seg[0]), px(seg[1])];
      draw.push(line(A[0], A[1], A[0] + (B[0] - A[0]) * share, A[1] + (B[1] - A[1]) * share, { stroke: "amber", width: 2 }));
      if (share >= 1 && k.label) {
        for (const tt of [0.88, 0.72, 0.56, 0.4, 0.24, 0.12]) {
          const lx = A[0] + (B[0] - A[0]) * tt;
          const ly = A[1] + (B[1] - A[1]) * tt;
          const sh = label(lx + 6, ly - 6, k.label, "amber") ?? label(lx - k.label.length * 5.9 - 6, ly + 14, k.label, "amber");
          if (sh) {
            draw.push(sh);
            break;
          }
        }
      }
    });

    // The feasible region.
    const pr = prog("region");
    if (pr > 0 && f.poly.length >= 3) {
      under.push({ kind: "path", d: "M" + f.poly.map((q) => px(q).map((v) => Math.round(v * 100) / 100).join(" ")).join(" L") + " Z", fill: "goodSoft", stroke: "good", width: 1, opacity: pr });
    }
    over.push(...cornerLabels);

    // The objective line, sliding from the worst corner to the best.
    const goal = p.ask.kind.startsWith("min") ? f.min : f.max;
    const ps = prog("sweep");
    const pa = prog("answer");
    if ((ps > 0 || pa > 0) && f.corners.length) {
      const zs = f.corners.map((q) => Z(p, q));
      const best = goal.unbounded ? (p.ask.kind.startsWith("min") ? Math.min(...zs) : Math.max(...zs)) : goal.value;
      const worst = p.ask.kind.startsWith("min") ? Math.max(...zs) : Math.min(...zs);
      const k = ps > 0 ? worst + (best - worst) * ps : best;
      const seg = clip(p.objective.a, p.objective.b, k);
      if (seg) {
        const [A, B] = [px(seg[0]), px(seg[1])];
        over.push(line(A[0], A[1], B[0], B[1], { stroke: "brand", width: 2, dash: "6 4" }));
      }
    }

    // The optimum: its corner(s), an optimal edge drawn thick.
    if (pa > 0 && !goal.unbounded && goal.at.length) {
      if (goal.at.length >= 2) {
        const [A, B] = [px(goal.at[0]), px(goal.at[1])];
        over.push(line(A[0], A[1], B[0], B[1], { stroke: "good", width: 5, cap: "round", opacity: pa }));
      } else if (goal.ray) {
        const A = goal.at[0];
        const far = Math.max(xb - xa, yb - ya) * 3;
        const end: XY = [A[0] + goal.ray[0] * far, A[1] + goal.ray[1] * far];
        const [P, Q] = [px(A), px(end)];
        over.push(line(P[0], P[1], P[0] + (Q[0] - P[0]) * pa, P[1] + (Q[1] - P[1]) * pa, { stroke: "good", width: 5, cap: "round" }));
      }
      for (const q of goal.at) {
        const [qx, qy] = px(q);
        over.push(dot(qx, qy, 6 * Math.min(1, pa * 1.5), "good", { stroke: "card", width: 2 }));
      }
      if (pa > 0.6) over.push(text(W - 6, 17, p.ask.label ?? header(p, f), { tone: "good", size: 12.5, weight: 700, anchor: "end" }));
    }
    // Clip the drawing to the plot so a long ray stops at the frame.
    const inside = (s: Shape) => s.kind !== "line" || (Math.min(s.x1, s.x2) >= PL - 1 && Math.max(s.x1, s.x2) <= PR + 1 && Math.min(s.y1, s.y2) >= PT - 1 && Math.max(s.y1, s.y2) <= PB + 1);
    const clamp = (s: Shape): Shape => {
      if (s.kind !== "line" || inside(s)) return s;
      // Cut the segment at the plot box (Liang-Barsky).
      let [t0, t1] = [0, 1];
      const dx = s.x2 - s.x1;
      const dy = s.y2 - s.y1;
      for (const [q, r] of [[-dx, s.x1 - PL], [dx, PR - s.x1], [-dy, s.y1 - PT], [dy, PB - s.y1]] as [number, number][]) {
        if (q === 0) continue;
        const u = r / q;
        if (q < 0) t0 = Math.max(t0, u);
        else t1 = Math.min(t1, u);
      }
      return t0 <= t1 ? { ...s, x1: s.x1 + dx * t0, y1: s.y1 + dy * t0, x2: s.x1 + dx * t1, y2: s.y1 + dy * t1 } : { ...s, x2: s.x1, y2: s.y1, opacity: 0 };
    };
    return [...under, ...axes, ...draw, ...over].map(clamp);
  },
};

function header(p: LpParams, f: LpFacts): string {
  const k = p.ask.kind;
  const g = k.startsWith("min") ? f.min : f.max;
  const word = k.startsWith("min") ? "min" : "max";
  if (k === "range") return `max − min = ${num(f.value, 3)}`;
  if (k === "max" || k === "min") return g.at.length === 1 ? `${word} Z = ${num(g.value, 3)} at ${pt(g.at[0])}` : `${word} Z = ${num(g.value, 3)}`;
  if (k === "maxCount" || k === "minCount") return f.value === 2 ? `${word} along a whole edge` : `${word} at one corner`;
  return `${word} at ${g.at.map(pt).join(", ")}`;
}
