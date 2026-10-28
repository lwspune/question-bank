/**
 * Coordinate geometry: points, circles, conics and lines on one true-scale
 * grid (a circle is drawn round), for questions whose solution places things in
 * the plane. Objects appear in the beat they belong to (`beat`): what the
 * question gives, what the solution works out, then the lines it draws.
 *
 *   points    { id, at: [x, y], label?, beat? }, or a point the scene works out from
 *             earlier points (beat "derived" by default):
 *               { id, divides: [p, q], ratio: [m, n], external? }  the point dividing pq in m : n
 *               { id, midpointOf: [p, q] }   { id, centroidOf: [p, q, r] }
 *   circles   { id, center: [x, y] | point id, r, label?, beat? }
 *   conics    { id, type: parabola | ellipse | hyperbola, ... }
 *               parabola  vertex, a, axis "x": (y-k)^2 = 4a(x-h); axis "y": (x-h)^2 = 4a(y-k)
 *               ellipse   center, a, b: (x-h)^2/a^2 + (y-k)^2/b^2 = 1
 *               hyperbola center, a, b, axis "x": (x-h)^2/a^2 - (y-k)^2/b^2 = 1 (axis "y" swaps)
 *   lines     { id, through: [p, q] } | { id, eq: [a, b, c] } (ax + by + c = 0)
 *             | { id, tangentAt: p, to: curve } | { id, tangentsFrom: p, to: curve }
 *             | { id, pair: [A, B, C, D, E, F] } (Ax² + Bxy + Cy² + Dx + Ey + F = 0, split by the scene)
 *               (tangentsFrom and pair make lines id1, id2, ... numbered by slope, lowest first)
 *   segments  { from: p, to: q, label? }
 *   locus     { fixed: p, on: circle or ellipse, ratio }: the point dividing
 *             fixed -> moving in that ratio, traced as the moving point goes round
 *
 * The answer (params.ask) is measured on the scene's own model: distance (any
 * two of point, line, circle; point to a conic), yIntercept, xIntercept, slope,
 * radius, locusRadius, chordLength, tangentLength (point to circle), area,
 * angle (between two lines: acute unless obtuse, as the angle in radians or its tan, cos or sin),
 * point (a constructed point checked against the stated answer `expect`: the value is
 * how far it misses, so 0 when it lands there) and ratio (the ratio AP : PB in which a
 * point, or a line meeting AB, divides AB, as the number AP/PB; negative when external).
 * Beats: given, derived, construct, trace, answer.
 */
import { arcPath, dot, line, num, onCircle, text } from "../geometry";
import { finite, obj, optionalLabel, pair, ParamError, safely } from "../params";
import type { Scene, Shape } from "../types";

type XY = [number, number];
type ObjBeat = "given" | "derived" | "construct";

interface Pt {
  id: string;
  at: XY;
  label: string;
  beat: ObjBeat;
  /** Worked out by the scene (divides, midpointOf, centroidOf), not given as numbers. */
  made: boolean;
}

interface Piece {
  at: (t: number) => XY;
  t0: number;
  t1: number;
}

interface Curve {
  id: string;
  kind: "circle" | "parabola" | "ellipse" | "hyperbola";
  center: XY;
  r: number;
  closed: boolean;
  pieces: Piece[];
  F: (x: number, y: number) => number;
  grad: (x: number, y: number) => XY;
  label: string | undefined;
  beat: ObjBeat;
}

interface Ln {
  id: string;
  /** a x + b y + c = 0 with a^2 + b^2 = 1. */
  a: number;
  b: number;
  c: number;
  label: string | undefined;
  beat: ObjBeat;
}

interface Seg {
  from: XY;
  to: XY;
  label: string | undefined;
  beat: ObjBeat;
}

type Ask =
  | { kind: "distance"; from: string; to: string }
  | { kind: "yIntercept" | "xIntercept" | "slope"; line: string }
  | { kind: "radius"; circle: string }
  | { kind: "locusRadius" }
  | { kind: "chordLength"; line: string; of: string }
  | { kind: "tangentLength"; from: string; to: string }
  | { kind: "area"; points: string[] }
  | { kind: "angle"; lines: [string, string]; as: "angle" | "tan" | "cos" | "sin"; obtuse: boolean }
  | { kind: "point"; point: string; expect: XY }
  | { kind: "ratio"; of: [string, string]; by: string };

export interface CoordParams {
  x: [number, number];
  y: [number, number];
  points: Pt[];
  curves: Curve[];
  lines: Ln[];
  segments: Seg[];
  touches: Record<string, XY[]>;
  locus: { fixed: XY; on: Curve; ratio: number; movingLabel: string; pointLabel: string } | null;
  ask: Ask;
  askLabel: string | undefined;
  /** The key is the measured value squared and/or times a number ("(AB)^2 =", "6 x area"). */
  report: { squared: boolean; times: number };
}

const W = 340;
const PL = 36;
const PR = 330;
const PT = 28;
/** Radius in px of the arc that marks an angle between two lines. */
const ANGLE_R = 24;
const BOTTOM = 36;

const sub = (p: XY, q: XY): XY => [p[0] - q[0], p[1] - q[1]];
const add = (p: XY, q: XY): XY => [p[0] + q[0], p[1] + q[1]];
const mul = (p: XY, k: number): XY => [p[0] * k, p[1] * k];
const len = (p: XY) => Math.hypot(p[0], p[1]);

/** Roots of g on [t0, t1] by sampling for sign changes and bisection, plus near-zero minima (a touch). */
function roots(g: (t: number) => number, t0: number, t1: number, n = 2000): number[] {
  const out: number[] = [];
  let pt = t0;
  let pv = g(t0);
  for (let i = 1; i <= n; i++) {
    const t = t0 + ((t1 - t0) * i) / n;
    const v = g(t);
    if (Number.isFinite(v) && Number.isFinite(pv) && (v === 0 || Math.sign(v) !== Math.sign(pv))) {
      let lo = pt;
      let hi = t;
      for (let k = 0; k < 90; k++) {
        const m = (lo + hi) / 2;
        if (Math.sign(g(m)) === Math.sign(g(lo))) lo = m;
        else hi = m;
      }
      out.push((lo + hi) / 2);
    }
    pt = t;
    pv = v;
  }
  return out;
}

/** Distinct points (closer than 1e-6 of the window counts as one). */
function distinct(points: XY[], tol: number): XY[] {
  const out: XY[] = [];
  for (const q of points) if (!out.some((o) => len(sub(o, q)) < tol)) out.push(q);
  return out;
}

function lineThrough(p: XY, q: XY): { a: number; b: number; c: number } {
  const d = sub(q, p);
  const L = len(d);
  const a = -d[1] / L;
  const b = d[0] / L;
  return { a, b, c: -(a * p[0] + b * p[1]) };
}

const slopeOf = (l: { a: number; b: number }) => (Math.abs(l.b) < 1e-12 ? Infinity : -l.a / l.b);

function lineHits(l: Ln, c: Curve, tol: number): XY[] {
  const hits: XY[] = [];
  for (const pc of c.pieces) {
    for (const t of roots((s) => {
      const [x, y] = pc.at(s);
      return l.a * x + l.b * y + l.c;
    }, pc.t0, pc.t1)) hits.push(pc.at(t));
  }
  return distinct(hits, tol);
}

/** The nearest point of a curve to P: dense sampling, then a golden-section refine. */
function nearestOn(c: Curve, P: XY): XY {
  let best: { pc: Piece; t: number; d: number } | null = null;
  for (const pc of c.pieces) {
    for (let i = 0; i <= 2000; i++) {
      const t = pc.t0 + ((pc.t1 - pc.t0) * i) / 2000;
      const d = len(sub(pc.at(t), P));
      if (!best || d < best.d) best = { pc, t, d };
    }
  }
  const { pc } = best!;
  const h = (pc.t1 - pc.t0) / 2000;
  let lo = Math.max(pc.t0, best!.t - h);
  let hi = Math.min(pc.t1, best!.t + h);
  const f = (t: number) => len(sub(pc.at(t), P));
  for (let k = 0; k < 100; k++) {
    const m1 = lo + (hi - lo) * 0.382;
    const m2 = lo + (hi - lo) * 0.618;
    if (f(m1) < f(m2)) hi = m2;
    else lo = m1;
  }
  return pc.at((lo + hi) / 2);
}

export interface CoordFacts {
  /** The answer: the measured value, squared and scaled as the key asks. */
  value: number;
  /** What the drawing measures before squaring or scaling. */
  measured: number;
  scale: { sx: number; sy: number };
  window: { x: [number, number]; y: [number, number] };
  h: number;
  touches: Record<string, XY[]>;
  /** What the answer beat draws, in plane coordinates. */
  mark:
    | { kind: "segment"; from: XY; to: XY; guide: [XY, XY] | null }
    | { kind: "point"; at: XY }
    | { kind: "slope"; from: XY; run: number; rise: number }
    | { kind: "polygon"; points: XY[] }
    /** An arc at the meeting point, anticlockwise from angle `from` through `span` (radians, plane coordinates). */
    | { kind: "angle"; at: XY; from: number; span: number }
    /** A segment cut at a point: the two parts in two colours. */
    | { kind: "split"; from: XY; at: XY; to: XY }
    | { kind: "none" };
}

const factCache = new WeakMap<CoordParams, CoordFacts>();

function measure(p: CoordParams): Pick<CoordFacts, "value" | "mark"> {
  const ask = p.ask;
  const point = (id: string) => p.points.find((q) => q.id === id);
  const curve = (id: string) => p.curves.find((q) => q.id === id);
  const ln = (id: string) => p.lines.find((q) => q.id === id)!;
  switch (ask.kind) {
    case "distance": {
      const A = point(ask.from)?.at;
      const B = point(ask.to)?.at;
      const lA = p.lines.find((l) => l.id === ask.from);
      const lB = p.lines.find((l) => l.id === ask.to);
      const cA = curve(ask.from);
      const cB = curve(ask.to);
      if (A && B) return { value: len(sub(A, B)), mark: { kind: "segment", from: A, to: B, guide: null } };
      const P = A ?? B;
      const L = lA ?? lB;
      const C = cA ?? cB;
      if (P && L) {
        const e = L.a * P[0] + L.b * P[1] + L.c;
        return { value: Math.abs(e), mark: { kind: "segment", from: P, to: sub(P, mul([L.a, L.b], e)), guide: null } };
      }
      if (P && C && C.kind === "circle") {
        const d = len(sub(P, C.center));
        if (d < 1e-12) return { value: NaN, mark: { kind: "none" } };
        const N = add(C.center, mul(sub(P, C.center), C.r / d));
        return { value: Math.abs(d - C.r), mark: { kind: "segment", from: P, to: N, guide: [P, C.center] } };
      }
      if (P && C) {
        const N = nearestOn(C, P);
        return { value: len(sub(P, N)), mark: { kind: "segment", from: P, to: N, guide: null } };
      }
      if (L && C) {
        const e = L.a * C.center[0] + L.b * C.center[1] + L.c;
        const F = sub(C.center, mul([L.a, L.b], e));
        if (Math.abs(e) <= C.r) return { value: 0, mark: { kind: "none" } };
        const N = add(C.center, mul(sub(F, C.center), C.r / Math.abs(e)));
        return { value: Math.abs(e) - C.r, mark: { kind: "segment", from: N, to: F, guide: [C.center, F] } };
      }
      if (lA && lB) {
        if (Math.abs(lA.a * lB.b - lA.b * lB.a) > 1e-9) return { value: 0, mark: { kind: "none" } };
        const flip = lA.a * lB.a + lA.b * lB.b < 0 ? -1 : 1;
        const value = Math.abs(lA.c - flip * lB.c);
        const on: XY = mul([lA.a, lA.b], -lA.c);
        const e = lB.a * on[0] + lB.b * on[1] + lB.c;
        return { value, mark: { kind: "segment", from: on, to: sub(on, mul([lB.a, lB.b], e)), guide: null } };
      }
      // Two circles.
      const [c1, c2] = [cA!, cB!];
      const d = len(sub(c2.center, c1.center));
      const u: XY = d < 1e-12 ? [1, 0] : mul(sub(c2.center, c1.center), 1 / d);
      if (d >= c1.r + c2.r) {
        return { value: d - c1.r - c2.r, mark: { kind: "segment", from: add(c1.center, mul(u, c1.r)), to: sub(c2.center, mul(u, c2.r)), guide: [c1.center, c2.center] } };
      }
      if (d <= Math.abs(c1.r - c2.r)) {
        const [big, small, dir] = c1.r >= c2.r ? [c1, c2, u] : [c2, c1, mul(u, -1)];
        return { value: big.r - d - small.r, mark: { kind: "segment", from: add(big.center, mul(dir, big.r)), to: add(small.center, mul(dir, small.r)), guide: [big.center, add(big.center, mul(dir, big.r))] } };
      }
      return { value: 0, mark: { kind: "none" } };
    }
    case "yIntercept": {
      const L = ln(ask.line);
      if (Math.abs(L.b) < 1e-12) return { value: NaN, mark: { kind: "none" } };
      const y = -L.c / L.b;
      return { value: y, mark: { kind: "point", at: [0, y] } };
    }
    case "xIntercept": {
      const L = ln(ask.line);
      if (Math.abs(L.a) < 1e-12) return { value: NaN, mark: { kind: "none" } };
      const x = -L.c / L.a;
      return { value: x, mark: { kind: "point", at: [x, 0] } };
    }
    case "slope": {
      const L = ln(ask.line);
      const m = slopeOf(L);
      if (!Number.isFinite(m)) return { value: NaN, mark: { kind: "none" } };
      // A run of about a fifth of the window, from the point of the line nearest the window's centre.
      const cx = (p.x[0] + p.x[1]) / 2;
      const cy = (p.y[0] + p.y[1]) / 2;
      const e = L.a * cx + L.b * cy + L.c;
      const from = sub([cx, cy], mul([L.a, L.b], e));
      const run = (p.x[1] - p.x[0]) / 5;
      return { value: m, mark: { kind: "slope", from, run, rise: m * run } };
    }
    case "radius": {
      const C = curve(ask.circle)!;
      return { value: C.r, mark: { kind: "segment", from: C.center, to: add(C.center, mul([Math.SQRT1_2, Math.SQRT1_2], C.r)), guide: null } };
    }
    case "locusRadius": {
      const lo = p.locus!;
      const center = add(lo.fixed, mul(sub(lo.on.center, lo.fixed), lo.ratio));
      const r = lo.on.r * lo.ratio;
      return { value: r, mark: { kind: "segment", from: center, to: add(center, mul([Math.SQRT1_2, -Math.SQRT1_2], r)), guide: null } };
    }
    case "chordLength": {
      const L = ln(ask.line);
      const C = curve(ask.of)!;
      const hits = lineHits(L, C, 1e-6 * (p.x[1] - p.x[0]));
      if (hits.length !== 2) return { value: NaN, mark: { kind: "none" } };
      return { value: len(sub(hits[0], hits[1])), mark: { kind: "segment", from: hits[0], to: hits[1], guide: null } };
    }
    case "tangentLength": {
      const P = point(ask.from)!.at;
      const C = curve(ask.to)!;
      const v = sub(P, C.center);
      const d = len(v);
      if (d <= C.r) return { value: NaN, mark: { kind: "none" } };
      const u = mul(v, 1 / d);
      const w: XY = [-u[1], u[0]];
      const cos = C.r / d;
      const T = add(C.center, add(mul(u, C.r * cos), mul(w, C.r * Math.sqrt(1 - cos * cos))));
      return { value: Math.sqrt(d * d - C.r * C.r), mark: { kind: "segment", from: P, to: T, guide: [C.center, T] } };
    }
    case "area": {
      const pts = ask.points.map((id) => point(id)!.at);
      let s = 0;
      pts.forEach((q, i) => {
        const r = pts[(i + 1) % pts.length];
        s += q[0] * r[1] - r[0] * q[1];
      });
      return { value: Math.abs(s) / 2, mark: { kind: "polygon", points: pts } };
    }
    case "angle": {
      const [L, M] = [ln(ask.lines[0]), ln(ask.lines[1])];
      const at = meet(L, M)!;
      // Direction angles of the two lines, and how far M turns past L (mod pi).
      const t1 = Math.atan2(L.a, -L.b);
      const t2 = Math.atan2(M.a, -M.b);
      const d = (((t2 - t1) % Math.PI) + Math.PI) % Math.PI;
      const acute = Math.min(d, Math.PI - d);
      const want = ask.obtuse ? Math.PI - acute : acute;
      const mark: CoordFacts["mark"] = Math.abs(want - d) < 1e-12 ? { kind: "angle", at, from: t1, span: d } : { kind: "angle", at, from: t2, span: Math.PI - d };
      const c = Math.cos(want);
      const value = ask.as === "angle" ? want : ask.as === "cos" ? c : ask.as === "sin" ? Math.sin(want) : Math.abs(c) < 1e-12 ? NaN : Math.tan(want);
      return { value, mark };
    }
    case "point": {
      const P = point(ask.point)!.at;
      return { value: len(sub(P, ask.expect)), mark: { kind: "point", at: P } };
    }
    case "ratio": {
      const [A, B] = ask.of.map((id) => point(id)!.at);
      const cut = cutOf(A, B, ask.by, p.points, p.lines);
      if (typeof cut === "string") return { value: NaN, mark: { kind: "none" } };
      return { value: cut.t / (1 - cut.t), mark: { kind: "split", from: A, at: cut.P, to: B } };
    }
  }
}

/**
 * Where a point (on line AB) or a line (crossing it) cuts AB: the point, and t
 * with P = A + t (B - A). AP : PB = t : (1 - t), negative outside the segment.
 */
function cutOf(A: XY, B: XY, by: unknown, points: Pt[], lines: Ln[]): { P: XY; t: number } | string {
  const d = sub(B, A);
  const dd = d[0] * d[0] + d[1] * d[1];
  const q = points.find((pp) => pp.id === by);
  const L = lines.find((l) => l.id === by);
  let P: XY;
  if (q) {
    P = q.at;
    const off = Math.abs(d[0] * (P[1] - A[1]) - d[1] * (P[0] - A[0])) / Math.sqrt(dd);
    if (off > 1e-6 * (1 + Math.sqrt(dd))) return `${q.id} is not on the line through the two points`;
  } else if (L) {
    const along = L.a * d[0] + L.b * d[1];
    if (Math.abs(along) < 1e-12) return `${L.id} is parallel to the segment, so it does not cut it`;
    const t = -(L.a * A[0] + L.b * A[1] + L.c) / along;
    P = add(A, mul(d, t));
  } else return `by must name a point or a line, not ${String(by)}`;
  const t = ((P[0] - A[0]) * d[0] + (P[1] - A[1]) * d[1]) / dd;
  if (Math.abs(1 - t) < 1e-12) return "the cut is at B itself, so there is no ratio";
  return { P, t };
}

/** Where two lines meet, or null when they are parallel. */
function meet(L: { a: number; b: number; c: number }, M: { a: number; b: number; c: number }): XY | null {
  const det = L.a * M.b - L.b * M.a;
  if (Math.abs(det) < 1e-9) return null;
  return [(L.b * M.c - M.b * L.c) / det, (M.a * L.c - L.a * M.c) / det];
}

/**
 * The two lines of a pair A x^2 + B xy + C y^2 + D x + E y + F = 0, each with
 * a^2 + b^2 = 1, or a reason it is not a real pair of distinct lines.
 */
function splitPair(coef: number[]): { a: number; b: number; c: number }[] | string {
  const k = Math.max(...coef.map(Math.abs));
  if (k === 0) return "all six coefficients are 0";
  const [a, h, b, g, f, c] = [coef[0] / k, coef[1] / (2 * k), coef[2] / k, coef[3] / (2 * k), coef[4] / (2 * k), coef[5] / k];
  const disc = h * h - a * b;
  const norm = (p: number, q: number, r: number) => {
    const n = Math.hypot(p, q);
    return { a: p / n, b: q / n, c: r / n };
  };
  if (disc < -1e-9) return "not a pair of lines (h^2 < ab)";
  if (disc > 1e-9) {
    const det = a * b - h * h;
    const x0 = (h * f - b * g) / det;
    const y0 = (g * h - a * f) / det;
    if (Math.abs(g * x0 + f * y0 + c) > 1e-7 * (1 + x0 * x0 + y0 * y0)) return "not a pair of lines (the equation does not factor)";
    const dirs: XY[] = Math.abs(b) > 1e-12 ? [1, -1].map((s): XY => [1, (-h + s * Math.sqrt(disc)) / b]) : [[0, 1], [2 * h, -a]];
    return dirs.map(([dx, dy]) => norm(dy, -dx, dx * y0 - dy * x0));
  }
  // Parallel lines: the x^2, xy, y^2 part is u^2 / s with u = p x + q y.
  if (Math.abs(a) < 1e-12 && Math.abs(b) < 1e-12) return "not a pair of lines (no second-degree term)";
  const [p, q, s] = Math.abs(a) >= Math.abs(b) ? [a, h, a] : [h, b, b];
  const lambda = Math.abs(p) >= Math.abs(q) ? (2 * g) / p : (2 * f) / q;
  if (Math.abs(2 * g - lambda * p) > 1e-7 || Math.abs(2 * f - lambda * q) > 1e-7) return "not a pair of lines (the equation does not factor)";
  // u^2 / s + lambda u + c = 0.
  const D = (s * lambda) ** 2 - 4 * s * c;
  if (D < -1e-9) return "not a pair of lines (no real line)";
  if (D < 1e-9) return "the two lines coincide";
  return [1, -1].map((sg) => norm(p, q, -(-s * lambda + sg * Math.sqrt(D)) / 2));
}

/** One scale on both axes: widen the shorter side of the window so the plot stays between 160 and 336 px tall. */
function layout(x: [number, number], y: [number, number]) {
  const pw = PR - PL;
  let [xa, xb] = x;
  let [ya, yb] = y;
  let s = pw / (xb - xa);
  if ((yb - ya) * s > 336) {
    s = 336 / (yb - ya);
    const cx = (xa + xb) / 2;
    const half = pw / s / 2;
    [xa, xb] = [cx - half, cx + half];
  } else if ((yb - ya) * s < 160) {
    const cy = (ya + yb) / 2;
    const half = 160 / s / 2;
    [ya, yb] = [cy - half, cy + half];
  }
  return { x: [xa, xb] as [number, number], y: [ya, yb] as [number, number], s, h: PT + (yb - ya) * s + BOTTOM };
}

export function coordFacts(p: CoordParams): CoordFacts {
  const hit = factCache.get(p);
  if (hit) return hit;
  const lay = layout(p.x, p.y);
  const m = measure(p);
  const value = (p.report.squared ? m.value * m.value : m.value) * p.report.times;
  const facts: CoordFacts = { ...m, value, measured: m.value, scale: { sx: lay.s, sy: lay.s }, window: { x: lay.x, y: lay.y }, h: lay.h, touches: p.touches };
  factCache.set(p, facts);
  return facts;
}

// --- parsing --------------------------------------------------------------

function beatOf(o: Record<string, unknown>, fallback: ObjBeat): ObjBeat {
  if (o.beat === undefined) return fallback;
  if (o.beat === "given" || o.beat === "derived" || o.beat === "construct") return o.beat;
  throw new ParamError('beat must be "given", "derived" or "construct"');
}

function list(o: Record<string, unknown>, key: string, max: number): Record<string, unknown>[] {
  const v = o[key] === undefined ? [] : o[key];
  if (!Array.isArray(v) || v.length > max) throw new ParamError(`${key} must be a list of at most ${max}`);
  return v.map((x) => obj(x));
}

function makeCurve(o: Record<string, unknown>, at: (o: Record<string, unknown>, key: string) => XY, span: number): Curve {
  const id = String(o.id);
  const label = optionalLabel(o, "label");
  const beat = beatOf(o, "given");
  const type = o.type;
  const axis = o.axis === undefined ? "x" : o.axis;
  if (axis !== "x" && axis !== "y") throw new ParamError(`${id}: axis must be "x" or "y"`);
  if (type === "parabola") {
    const [h, k] = at(o, "vertex");
    const a = finite(o, "a");
    if (a === 0) throw new ParamError(`${id}: a must not be 0`);
    const T = Math.sqrt((3 * span) / Math.abs(a));
    const piece: Piece = axis === "x" ? { at: (t) => [h + a * t * t, k + 2 * a * t], t0: -T, t1: T } : { at: (t) => [h + 2 * a * t, k + a * t * t], t0: -T, t1: T };
    return axis === "x"
      ? { id, kind: "parabola", center: [h, k], r: NaN, closed: false, pieces: [piece], F: (x, y) => (y - k) ** 2 - 4 * a * (x - h), grad: (x, y) => [-4 * a, 2 * (y - k)], label, beat }
      : { id, kind: "parabola", center: [h, k], r: NaN, closed: false, pieces: [piece], F: (x, y) => (x - h) ** 2 - 4 * a * (y - k), grad: (x, y) => [2 * (x - h), -4 * a], label, beat };
  }
  if (type === "ellipse" || type === "hyperbola") {
    const [h, k] = at(o, "center");
    const a = finite(o, "a", { min: 1e-9 });
    const b = finite(o, "b", { min: 1e-9 });
    if (type === "ellipse") {
      return { id, kind: "ellipse", center: [h, k], r: NaN, closed: true, pieces: [{ at: (t) => [h + a * Math.cos(t), k + b * Math.sin(t)], t0: 0, t1: 2 * Math.PI }], F: (x, y) => ((x - h) / a) ** 2 + ((y - k) / b) ** 2 - 1, grad: (x, y) => [(2 * (x - h)) / (a * a), (2 * (y - k)) / (b * b)], label, beat };
    }
    const U = Math.min(8, Math.asinh((3 * span) / Math.min(a, b)));
    const pieces: Piece[] =
      axis === "x"
        ? [1, -1].map((sg) => ({ at: (u: number): XY => [h + sg * a * Math.cosh(u), k + b * Math.sinh(u)], t0: -U, t1: U }))
        : [1, -1].map((sg) => ({ at: (u: number): XY => [h + b * Math.sinh(u), k + sg * a * Math.cosh(u)], t0: -U, t1: U }));
    return axis === "x"
      ? { id, kind: "hyperbola", center: [h, k], r: NaN, closed: false, pieces, F: (x, y) => ((x - h) / a) ** 2 - ((y - k) / b) ** 2 - 1, grad: (x, y) => [(2 * (x - h)) / (a * a), (-2 * (y - k)) / (b * b)], label, beat }
      : { id, kind: "hyperbola", center: [h, k], r: NaN, closed: false, pieces, F: (x, y) => ((y - k) / a) ** 2 - ((x - h) / b) ** 2 - 1, grad: (x, y) => [(-2 * (x - h)) / (b * b), (2 * (y - k)) / (a * a)], label, beat };
  }
  throw new ParamError(`${id}: type must be parabola, ellipse or hyperbola`);
}

export const coordGeometry: Scene<CoordParams> = {
  id: "coordGeometry",
  beats: ["given", "derived", "construct", "trace", "answer"],

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      const w = obj(o.window);
      const x = pair(w, "x");
      const y = pair(w, "y");
      if (!(x[1] > x[0]) || !(y[1] > y[0])) throw new ParamError("window must run forward in x and y");
      const span = Math.max(x[1] - x[0], y[1] - y[0]);
      const tol = 1e-6 * span;

      const ids = new Set<string>();
      const claim = (v: unknown, where: string) => {
        if (typeof v !== "string" || !/^[A-Za-z][A-Za-z0-9]{0,5}$/.test(v)) throw new ParamError(`${where}: id must be a short name (letters and digits)`);
        if (ids.has(v)) throw new ParamError(`id ${v} is used twice`);
        ids.add(v);
        return v;
      };

      const points: Pt[] = [];
      const pointAt = (id: unknown, where: string): XY => {
        const q = points.find((pp) => pp.id === id);
        if (!q) throw new ParamError(`${where}: no point named ${String(id)}`);
        return q.at;
      };
      // A constructed point names points listed before it.
      const named = (v: unknown, n: number, id: string, key: string): XY[] => {
        if (!Array.isArray(v) || v.length !== n) throw new ParamError(`${id}: ${key} must name ${n} points`);
        return v.map((w) => pointAt(w, id));
      };
      for (const [i, q] of list(o, "points", 10).entries()) {
        const id = claim(q.id, `points[${i}]`);
        let at: XY;
        let made = true;
        if (q.divides !== undefined) {
          const [P, Q] = named(q.divides, 2, id, "divides");
          if (!Array.isArray(q.ratio) || q.ratio.length !== 2 || !q.ratio.every((v) => typeof v === "number" && Number.isFinite(v) && v > 0)) throw new ParamError(`${id}: ratio must be two positive numbers [m, n]`);
          const [m, n] = q.ratio as number[];
          if (q.external !== undefined && typeof q.external !== "boolean") throw new ParamError(`${id}: external must be true or false`);
          if (q.external === true) {
            if (Math.abs(m - n) < 1e-12) throw new ParamError(`${id}: no point divides a segment externally in 1 : 1`);
            at = [(m * Q[0] - n * P[0]) / (m - n), (m * Q[1] - n * P[1]) / (m - n)];
          } else at = [(n * P[0] + m * Q[0]) / (m + n), (n * P[1] + m * Q[1]) / (m + n)];
        } else if (q.midpointOf !== undefined) {
          const [P, Q] = named(q.midpointOf, 2, id, "midpointOf");
          at = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
        } else if (q.centroidOf !== undefined) {
          const [P, Q, R] = named(q.centroidOf, 3, id, "centroidOf");
          at = [(P[0] + Q[0] + R[0]) / 3, (P[1] + Q[1] + R[1]) / 3];
        } else {
          at = pair(q, "at");
          made = false;
        }
        // An empty label is a bare dot (a helper point); no label shows the coordinates.
        points.push({ id, at, label: q.label === "" ? "" : optionalLabel(q, "label") ?? `(${num(at[0])}, ${num(at[1])})`, beat: beatOf(q, made ? "derived" : "given"), made });
      }
      const at = (q: Record<string, unknown>, key: string): XY => (typeof q[key] === "string" ? pointAt(q[key], key) : pair(q, key));

      const curves: Curve[] = [];
      for (const [i, q] of list(o, "circles", 4).entries()) {
        const id = claim(q.id, `circles[${i}]`);
        const center = at(q, "center");
        const r = finite(q, "r");
        if (!(r > 0)) throw new ParamError(`${id}: r must be positive`);
        const [h, k] = center;
        curves.push({ id, kind: "circle", center, r, closed: true, pieces: [{ at: (t) => [h + r * Math.cos(t), k + r * Math.sin(t)], t0: 0, t1: 2 * Math.PI }], F: (px, py) => (px - h) ** 2 + (py - k) ** 2 - r * r, grad: (px, py) => [2 * (px - h), 2 * (py - k)], label: optionalLabel(q, "label"), beat: beatOf(q, "given") });
      }
      for (const [i, q] of list(o, "conics", 3).entries()) {
        claim(q.id, `conics[${i}]`);
        curves.push(makeCurve(q, at, span));
      }
      const curveNamed = (id: unknown, where: string) => {
        const c = curves.find((cc) => cc.id === id);
        if (!c) throw new ParamError(`${where}: no circle or conic named ${String(id)}`);
        return c;
      };

      const lines: Ln[] = [];
      const touches: Record<string, XY[]> = {};
      for (const [i, q] of list(o, "lines", 6).entries()) {
        const id = claim(q.id, `lines[${i}]`);
        const label = optionalLabel(q, "label");
        const beat = beatOf(q, "construct");
        if (q.through !== undefined) {
          if (!Array.isArray(q.through) || q.through.length !== 2) throw new ParamError(`${id}: through must name two points`);
          const P = pointAt(q.through[0], id);
          const Q = pointAt(q.through[1], id);
          if (len(sub(P, Q)) < tol) throw new ParamError(`${id}: through names the same point twice`);
          lines.push({ id, ...lineThrough(P, Q), label, beat });
        } else if (q.eq !== undefined) {
          if (!Array.isArray(q.eq) || q.eq.length !== 3 || !q.eq.every((v) => typeof v === "number" && Number.isFinite(v))) throw new ParamError(`${id}: eq must be three numbers [a, b, c]`);
          const [a, b, c] = q.eq as number[];
          const n = Math.hypot(a, b);
          if (n === 0) throw new ParamError(`${id}: a and b cannot both be 0`);
          lines.push({ id, a: a / n, b: b / n, c: c / n, label, beat });
        } else if (q.tangentAt !== undefined) {
          const P = pointAt(q.tangentAt, id);
          const C = curveNamed(q.to, id);
          const g = C.grad(P[0], P[1]);
          if (Math.abs(C.F(P[0], P[1])) / Math.max(len(g), 1e-12) > tol * 10) throw new ParamError(`${id}: ${String(q.tangentAt)} is not on ${C.id}`);
          const n = len(g);
          lines.push({ id, a: g[0] / n, b: g[1] / n, c: -(g[0] * P[0] + g[1] * P[1]) / n, label, beat });
          touches[id] = [P];
        } else if (q.tangentsFrom !== undefined) {
          const P = pointAt(q.tangentsFrom, id);
          const C = curveNamed(q.to, id);
          const found: XY[] = [];
          for (const pc of C.pieces) {
            for (const t of roots((s) => {
              const Q = pc.at(s);
              const g = C.grad(Q[0], Q[1]);
              return (P[0] - Q[0]) * g[0] + (P[1] - Q[1]) * g[1];
            }, pc.t0, pc.t1)) found.push(pc.at(t));
          }
          const pts = distinct(found, tol * 100).filter((T) => len(sub(T, P)) > tol);
          if (!pts.length) throw new ParamError(`${id}: no tangent from ${String(q.tangentsFrom)} to ${C.id}`);
          const made = pts.map((T) => ({ T, l: lineThrough(P, T) })).sort((m, n) => slopeOf(m.l) - slopeOf(n.l));
          if (lines.length + made.length > 6) throw new ParamError("at most 6 lines in all");
          made.forEach(({ l }, k) => lines.push({ id: claim(`${id}${k + 1}`, id), ...l, label: k === 0 ? label : undefined, beat }));
          touches[id] = made.map((m) => m.T);
        } else if (q.pair !== undefined) {
          if (!Array.isArray(q.pair) || q.pair.length !== 6 || !q.pair.every((v) => typeof v === "number" && Number.isFinite(v))) throw new ParamError(`${id}: pair must be six numbers [A, B, C, D, E, F] for Ax² + Bxy + Cy² + Dx + Ey + F = 0`);
          const split = splitPair(q.pair as number[]);
          if (typeof split === "string") throw new ParamError(`${id}: ${split}`);
          if (lines.length + 2 > 6) throw new ParamError("at most 6 lines in all");
          split.sort((m, n) => slopeOf(m) - slopeOf(n)).forEach((l, k) => lines.push({ id: claim(`${id}${k + 1}`, id), ...l, label: k === 0 ? label : undefined, beat }));
        } else {
          throw new ParamError(`${id}: give through, eq, pair, tangentAt or tangentsFrom`);
        }
      }

      const segments: Seg[] = list(o, "segments", 6).map((q, i) => ({ from: pointAt(q.from, `segments[${i}]`), to: pointAt(q.to, `segments[${i}]`), label: optionalLabel(q, "label"), beat: beatOf(q, "construct") }));

      let locus: CoordParams["locus"] = null;
      if (o.locus !== undefined) {
        const lo = obj(o.locus);
        const on = curveNamed(lo.on, "locus");
        if (on.kind !== "circle" && on.kind !== "ellipse") throw new ParamError("locus: the moving point must go round a circle or an ellipse");
        const ratio = finite(lo, "ratio");
        if (!(ratio > 0 && ratio < 1)) throw new ParamError("locus: ratio must be between 0 and 1");
        locus = { fixed: pointAt(lo.fixed, "locus"), on, ratio, movingLabel: optionalLabel(lo, "movingLabel") ?? "P", pointLabel: optionalLabel(lo, "pointLabel") ?? "M" };
      }

      const a = obj(o.ask);
      const isLine = (id: unknown) => lines.some((l) => l.id === id);
      const isPoint = (id: unknown) => points.some((q) => q.id === id);
      const isCircle = (id: unknown) => curves.some((c) => c.id === id && c.kind === "circle");
      const isCurve = (id: unknown) => curves.some((c) => c.id === id);
      const needLine = (v: unknown) => {
        if (!isLine(v)) throw new ParamError(`ask: ${String(v)} must name a line`);
        return v as string;
      };
      let ask: Ask;
      switch (a.kind) {
        case "distance": {
          const kind = (v: unknown) => (isPoint(v) ? "point" : isLine(v) ? "line" : isCircle(v) ? "circle" : isCurve(v) ? "conic" : null);
          const k1 = kind(a.from);
          const k2 = kind(a.to);
          if (!k1 || !k2) throw new ParamError("ask: distance needs from and to naming a point, line, circle or conic");
          if ((k1 === "conic" || k2 === "conic") && !(k1 === "point" || k2 === "point")) throw new ParamError("ask: distance to a conic is measured from a point only");
          ask = { kind: "distance", from: a.from as string, to: a.to as string };
          break;
        }
        case "yIntercept":
        case "xIntercept":
        case "slope":
          ask = { kind: a.kind, line: needLine(a.line) };
          break;
        case "radius":
          if (!isCircle(a.circle)) throw new ParamError("ask: radius needs a circle");
          ask = { kind: "radius", circle: a.circle as string };
          break;
        case "locusRadius":
          if (!locus || locus.on.kind !== "circle") throw new ParamError("ask: locusRadius needs a locus round a circle");
          ask = { kind: "locusRadius" };
          break;
        case "chordLength":
          if (!isCurve(a.of)) throw new ParamError("ask: chordLength needs of naming a circle or conic");
          ask = { kind: "chordLength", line: needLine(a.line), of: a.of as string };
          break;
        case "tangentLength":
          if (!isPoint(a.from) || !isCircle(a.to)) throw new ParamError("ask: tangentLength runs from a point to a circle");
          ask = { kind: "tangentLength", from: a.from as string, to: a.to as string };
          break;
        case "area":
          if (!Array.isArray(a.points) || a.points.length < 3 || !a.points.every(isPoint)) throw new ParamError("ask: area needs 3 or more point names");
          ask = { kind: "area", points: a.points as string[] };
          break;
        case "angle": {
          if (!Array.isArray(a.lines) || a.lines.length !== 2 || a.lines[0] === a.lines[1]) throw new ParamError("ask: angle needs lines naming two lines");
          const [l1, l2] = [needLine(a.lines[0]), needLine(a.lines[1])];
          const as = a.as === undefined ? "angle" : a.as;
          if (as !== "angle" && as !== "tan" && as !== "cos" && as !== "sin") throw new ParamError('ask: as must be "angle", "tan", "cos" or "sin"');
          if (a.obtuse !== undefined && typeof a.obtuse !== "boolean") throw new ParamError("ask: obtuse must be true or false");
          const at = meet(lines.find((l) => l.id === l1)!, lines.find((l) => l.id === l2)!);
          if (!at) throw new ParamError(`ask: ${l1} and ${l2} are parallel (ask the distance between them instead)`);
          if (at[0] < x[0] || at[0] > x[1] || at[1] < y[0] || at[1] > y[1]) throw new ParamError(`ask: ${l1} and ${l2} meet at (${num(at[0], 3)}, ${num(at[1], 3)}), outside the window`);
          ask = { kind: "angle", lines: [l1, l2], as, obtuse: a.obtuse === true };
          break;
        }
        case "point": {
          const q = points.find((pp) => pp.id === a.point);
          if (!q) throw new ParamError("ask: point needs point naming a point");
          if (!q.made) throw new ParamError(`ask: ${q.id} is given as numbers; a point ask checks a point the scene constructed (divides, midpointOf, centroidOf)`);
          if (!Array.isArray(a.expect) || a.expect.length !== 2 || !a.expect.every((v) => typeof v === "number" && Number.isFinite(v))) throw new ParamError("ask: point needs expect, the answer's coordinates [x, y]");
          if (a.squared !== undefined || a.times !== undefined) throw new ParamError("ask: a point answer cannot be squared or scaled");
          ask = { kind: "point", point: q.id, expect: a.expect as XY };
          break;
        }
        case "ratio": {
          if (!Array.isArray(a.of) || a.of.length !== 2 || !a.of.every(isPoint) || a.of[0] === a.of[1]) throw new ParamError("ask: ratio needs of naming two points [A, B]");
          const [A, B] = (a.of as string[]).map((id) => pointAt(id, "ask"));
          if (len(sub(A, B)) < tol) throw new ParamError("ask: A and B are the same point");
          const cut = cutOf(A, B, a.by, points, lines);
          if (typeof cut === "string") throw new ParamError(`ask: ${cut}`);
          if (a.squared !== undefined || a.times !== undefined) throw new ParamError("ask: a ratio cannot be squared or scaled");
          ask = { kind: "ratio", of: a.of as [string, string], by: a.by as string };
          break;
        }
        default:
          throw new ParamError("ask.kind must be distance, yIntercept, xIntercept, slope, radius, locusRadius, chordLength, tangentLength, area, angle, point or ratio");
      }
      if (a.squared !== undefined && typeof a.squared !== "boolean") throw new ParamError("ask: squared must be true or false");
      const times = a.times === undefined ? 1 : finite(a, "times");
      if (times === 0) throw new ParamError("ask: times must not be 0");
      return { x, y, points, curves, lines, segments, touches, locus, ask, askLabel: optionalLabel(a, "label", 32), report: { squared: a.squared === true, times } };
    }),

  check: (p) => coordFacts(p).value,

  checkText(p, value) {
    if (!Number.isFinite(value)) return "The drawing has no single value for this.";
    if (p.ask.kind === "point") {
      const ask = p.ask;
      const P = p.points.find((q) => q.id === ask.point)!.at;
      const got = `(${num(P[0], 4)}, ${num(P[1], 4)})`;
      return value < 1e-9 ? `The point the scene constructs is ${got}, the stated answer.` : `The point the scene constructs is ${got}, not (${num(ask.expect[0], 4)}, ${num(ask.expect[1], 4)}).`;
    }
    const base = measuredText(p, coordFacts(p).measured);
    const how = [p.report.squared ? "squared" : "", p.report.times !== 1 ? `times ${num(p.report.times)}` : ""].filter(Boolean).join(" and ");
    return how ? `${base} ${how[0].toUpperCase()}${how.slice(1)}, that gives ${num(value, 4)}.` : base;
  },

  viewBox: (p) => ({ w: W, h: coordFacts(p).h }),

  duration: (beat) => ({ given: 1500, derived: 1400, construct: 1300, trace: 3200, answer: 1300 })[beat] ?? 1300,

  frame(p, { played, t }) {
    const facts = coordFacts(p);
    const [xa, xb] = facts.window.x;
    const [ya, yb] = facts.window.y;
    const s = facts.scale.sx;
    const H = facts.h;
    const PB = H - BOTTOM;
    const X = (v: number) => PL + (v - xa) * s;
    const Y = (v: number) => PB - (v - ya) * s;
    const px = (q: XY): XY => [X(q[0]), Y(q[1])];
    const prog = (beat: string) => {
      const i = played.indexOf(beat);
      if (i === -1) return beat === "given" ? 1 : 0;
      return i === played.length - 1 ? t : 1;
    };
    // Objects of one beat appear one after another across it.
    const share = (beat: ObjBeat, index: number, count: number) => Math.max(0, Math.min(1, prog(beat) * count - index));

    const under: Shape[] = [];
    const axes: Shape[] = [];
    const draw: Shape[] = [];
    const over: Shape[] = [];
    const obstacles: XY[] = [];

    // Axes and ticks.
    const axisY = ya <= 0 && yb >= 0 ? Y(0) : PB;
    const axisX = xa <= 0 && xb >= 0 ? X(0) : PL;
    axes.push(line(PL, axisY, PR, axisY, { stroke: "muted", width: 1.2 }), line(axisX, PT, axisX, PB, { stroke: "muted", width: 1.2 }));
    const step = (span: number, ticks: number) => {
      const raw = span / ticks;
      const mag = Math.pow(10, Math.floor(Math.log10(raw)));
      return [1, 2, 5, 10].map((m) => m * mag).find((v) => v >= raw)!;
    };
    const xs = step(xb - xa, 7);
    for (let k = Math.ceil(xa / xs - 1e-9); k * xs <= xb + 1e-9; k++) {
      const v = k * xs;
      if (Math.abs(v) < 1e-12) continue;
      const ty = Math.min(H - 4, axisY + 14);
      axes.push(line(X(v), axisY - 3, X(v), axisY + 3, { stroke: "muted", width: 1 }), text(X(v), ty, num(v), { tone: "muted", size: 10, anchor: "middle" }));
      // The tick number as a box (about 16 x 9 px), not a point.
      for (const dx of [-8, -4, 0, 4, 8]) for (const dy of [-9, -4, 1]) obstacles.push([X(v) + dx, ty + dy]);
    }
    const ys = step(yb - ya, Math.max(3, Math.round((PB - PT) / 45)));
    for (let k = Math.ceil(ya / ys - 1e-9); k * ys <= yb + 1e-9; k++) {
      const v = k * ys;
      if (Math.abs(v) < 1e-12) continue;
      axes.push(line(axisX - 3, Y(v), axisX + 3, Y(v), { stroke: "muted", width: 1 }), text(Math.max(2, axisX - 5), Y(v) + 3, num(v), { tone: "muted", size: 10, anchor: "end" }));
      for (const dx of [-20, -14, -8, -4]) for (const dy of [-5, 0, 4]) obstacles.push([axisX + dx, Y(v) + dy]);
    }

    // Plane geometry as pixels, clipped to the plot.
    const inPlot = ([qx, qy]: XY) => qx >= PL - 1 && qx <= PR + 1 && qy >= PT - 1 && qy <= PB + 1;
    const clip = (l: Ln): [XY, XY] | null => {
      const hits: XY[] = [];
      if (Math.abs(l.b) > 1e-12) for (const xv of [xa, xb]) hits.push([xv, -(l.a * xv + l.c) / l.b]);
      if (Math.abs(l.a) > 1e-12) for (const yv of [ya, yb]) hits.push([-(l.b * yv + l.c) / l.a, yv]);
      const inside = hits.filter(([hx, hy]) => hx >= xa - 1e-9 && hx <= xb + 1e-9 && hy >= ya - 1e-9 && hy <= yb + 1e-9);
      if (inside.length < 2) return null;
      inside.sort((m, n) => m[0] - n[0] || m[1] - n[1]);
      return [inside[0], inside[inside.length - 1]];
    };
    const curvePx = (c: Curve): XY[][] =>
      c.pieces.map((pc) => {
        const out: XY[] = [];
        for (let i = 0; i <= 240; i++) out.push(px(pc.at(pc.t0 + ((pc.t1 - pc.t0) * i) / 240)));
        return out;
      });
    // Split a polyline into the runs inside the plot, so a conic stops at the frame.
    const runs = (pts: XY[]): XY[][] => {
      const out: XY[][] = [];
      let cur: XY[] = [];
      for (const q of pts) {
        if (inPlot(q)) cur.push(q);
        else {
          if (cur.length > 1) out.push(cur);
          cur = [];
        }
      }
      if (cur.length > 1) out.push(cur);
      return out;
    };

    // Everything that will ever be drawn is an obstacle for labels, so a label
    // keeps its place as the animation runs.
    for (const c of p.curves) for (const piece of curvePx(c)) for (const q of piece) if (inPlot(q)) obstacles.push(q);
    for (const l of p.lines) {
      const e = clip(l);
      if (e) for (let i = 0; i <= 60; i++) obstacles.push(px([e[0][0] + ((e[1][0] - e[0][0]) * i) / 60, e[0][1] + ((e[1][1] - e[0][1]) * i) / 60]));
    }
    for (const sg of p.segments) for (let i = 0; i <= 20; i++) obstacles.push(px([sg.from[0] + ((sg.to[0] - sg.from[0]) * i) / 20, sg.from[1] + ((sg.to[1] - sg.from[1]) * i) / 20]));
    for (const q of p.points) obstacles.push(px(q.at));
    // The axes too, so a label never sits on one.
    for (let qx = PL; qx <= PR; qx += 6) obstacles.push([qx, axisY]);
    for (let qy = PT; qy <= PB; qy += 6) obstacles.push([axisX, qy]);
    if (p.locus) {
      const lo = p.locus;
      for (let i = 0; i <= 60; i++) {
        const P = lo.on.pieces[0].at((2 * Math.PI * i) / 60);
        obstacles.push(px(add(lo.fixed, mul(sub(P, lo.fixed), lo.ratio))));
      }
      // Where the moving point stops, with its letter beside it.
      const end = px(lo.on.pieces[0].at(0));
      for (const dx of [0, 8, 14, -8, -14]) obstacles.push([end[0] + dx, end[1] - 8], [end[0] + dx, end[1]]);
    }
    // And what the answer beat will draw, so no label ends up under it.
    const along = (a: XY, b: XY) => {
      for (let i = 0; i <= 30; i++) obstacles.push(px([a[0] + ((b[0] - a[0]) * i) / 30, a[1] + ((b[1] - a[1]) * i) / 30]));
    };
    const mk = facts.mark;
    if (mk.kind === "segment") {
      along(mk.from, mk.to);
      if (mk.guide) along(mk.guide[0], mk.guide[1]);
    } else if (mk.kind === "polygon") mk.points.forEach((q, i) => along(q, mk.points[(i + 1) % mk.points.length]));
    else if (mk.kind === "slope") {
      along(mk.from, [mk.from[0] + mk.run, mk.from[1]]);
      along([mk.from[0] + mk.run, mk.from[1]], [mk.from[0] + mk.run, mk.from[1] + mk.rise]);
    } else if (mk.kind === "point") obstacles.push(px(mk.at));
    else if (mk.kind === "split") {
      along(mk.from, mk.at);
      along(mk.at, mk.to);
    }
    else if (mk.kind === "angle") {
      const [cx, cy] = px(mk.at);
      for (let i = 0; i <= 12; i++) obstacles.push(onCircle(cx, cy, ANGLE_R, mk.from + (mk.span * i) / 12));
    }

    // Labels: the clearest of several spots round an anchor; a far spot gets a leader line.
    const place = (anchors: XY[], label: string, size: number): { x: number; y: number; anchor: "start" | "end"; from: XY; far: boolean } => {
      const wdt = label.length * size * 0.56;
      let best: { x: number; y: number; anchor: "start" | "end"; from: XY; far: boolean } | null = null;
      let bestScore = -Infinity;
      for (const a of anchors) {
        // Near spots first; the far ones (with a leader line) win only when nothing near is clear.
        for (const ox of [8, 22, 42, 70]) {
          for (const oy of [-9, -24, -42, -64, 18, 33, 50, 72]) {
            for (const anchor of ["start", "end"] as const) {
              const sx = anchor === "start" ? a[0] + ox : a[0] - ox;
              const sy = a[1] + oy;
              const left = anchor === "start" ? sx : sx - wdt;
              if (left < 2 || left + wdt > W - 2 || sy - size < PT - 2 || sy > H - 4) continue;
              let room = Infinity;
              for (const [qx, qy] of obstacles) room = Math.min(room, Math.max(left - qx, qx - (left + wdt), sy - size * 0.8 - qy, qy - (sy + 2), 0));
              // Room counts up to 7 px; past that nearness wins, so a short label stays by its point.
              const score = Math.min(room, 7) - 0.03 * Math.hypot(sx - a[0], sy - a[1]);
              if (score > bestScore) {
                bestScore = score;
                best = { x: sx, y: sy, anchor, from: a, far: Math.hypot(ox, oy) > 34 };
              }
            }
          }
        }
      }
      const b = best ?? { x: Math.min(W - 2, anchors[0][0] + 8), y: Math.max(PT + 10, anchors[0][1] - 9), anchor: "start" as const, from: anchors[0], far: false };
      const left = b.anchor === "start" ? b.x : b.x - wdt;
      // A placed label blocks its whole box for the labels after it.
      for (let i = 0; i <= 6; i++) for (const dy of [-0.8, -0.35, 0.1]) obstacles.push([left + (wdt * i) / 6, b.y + size * dy]);
      return b;
    };
    const labelShapes = (pl: ReturnType<typeof place>, label: string, tone: "fg" | "brand" | "amber" | "good" | "muted", size: number, opacity = 1): Shape[] => [
      ...(pl.far ? [line(pl.from[0], pl.from[1], pl.x + (pl.anchor === "start" ? -3 : 3), pl.y - 4, { stroke: tone, width: 1, opacity: 0.6 * opacity })] : []),
      text(pl.x, pl.y, label, { tone, size, weight: 600, anchor: pl.anchor, opacity }),
    ];

    // Place every label once, in a fixed order, then show each with its object.
    const curveLabel = new Map<string, ReturnType<typeof place>>();
    for (const c of p.curves) {
      if (!c.label) continue;
      const anchors = curvePx(c)
        .flat()
        .filter(inPlot)
        .filter((_, i, all) => i % Math.max(1, Math.floor(all.length / 10)) === 0);
      if (anchors.length) curveLabel.set(c.id, place(anchors, c.label, 11));
    }
    const lineLabel = new Map<string, ReturnType<typeof place>>();
    for (const l of p.lines) {
      const e = l.label ? clip(l) : null;
      if (e && l.label) lineLabel.set(l.id, place([0.85, 0.15, 0.5].map((f) => px([e[0][0] + (e[1][0] - e[0][0]) * f, e[0][1] + (e[1][1] - e[0][1]) * f])), l.label, 11));
    }
    const pointLabel = new Map<string, ReturnType<typeof place>>();
    for (const q of p.points) if (q.label && inPlot(px(q.at))) pointLabel.set(q.id, place([px(q.at)], q.label, 11));

    // Objects in beat order: curves, then lines, then segments, then points.
    type Item = { beat: ObjBeat; draw: (k: number) => void };
    const items: Item[] = [];
    for (const c of p.curves) {
      items.push({
        beat: c.beat,
        draw: (k) => {
          if (c.kind === "circle") {
            const [cx, cy] = px(c.center);
            if (k >= 1) draw.push({ kind: "circle", cx, cy, r: c.r * s, stroke: "brand", width: 2.5 });
            else draw.push({ kind: "path", d: arcPath(cx, cy, c.r * s, 0, 2 * Math.PI * k), stroke: "brand", width: 2.5 });
            if (inPlot([cx, cy])) draw.push(dot(cx, cy, 2.5, "brand", { opacity: k }));
          } else {
            const all = curvePx(c);
            const total = all.reduce((n, piece) => n + piece.length, 0);
            let left = Math.round(total * k);
            for (const piece of all) {
              const part = piece.slice(0, Math.max(0, Math.min(piece.length, left)));
              left -= piece.length;
              for (const r of runs(part)) draw.push({ kind: "polyline", points: r, stroke: "brand", width: 2.5 });
            }
          }
          const lab = curveLabel.get(c.id);
          if (lab && k > 0.5 && c.label) over.push(...labelShapes(lab, c.label, "brand", 11, Math.min(1, (k - 0.5) * 2)));
        },
      });
    }
    for (const l of p.lines) {
      items.push({
        beat: l.beat,
        draw: (k) => {
          const e = clip(l);
          if (!e) return;
          const [a, b] = [px(e[0]), px(e[1])];
          draw.push(line(a[0], a[1], a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, { stroke: "amber", width: 2.2, cap: "round" }));
          const lab = lineLabel.get(l.id);
          if (lab && k > 0.6 && l.label) over.push(...labelShapes(lab, l.label, "amber", 11));
        },
      });
    }
    for (const sg of p.segments) {
      items.push({
        beat: sg.beat,
        draw: (k) => {
          const [a, b] = [px(sg.from), px(sg.to)];
          draw.push(line(a[0], a[1], a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, { stroke: "fg", width: 1.6, dash: "5 4" }));
        },
      });
    }
    for (const q of p.points) {
      items.push({
        beat: q.beat,
        draw: (k) => {
          const [qx, qy] = px(q.at);
          if (!inPlot([qx, qy])) return;
          over.push(dot(qx, qy, 4 * Math.min(1, k * 1.6), "fg", { stroke: "card", width: 1.5 }));
          const lab = pointLabel.get(q.id);
          if (lab && k > 0.5) over.push(...labelShapes(lab, q.label, "fg", 11, Math.min(1, (k - 0.5) * 2)));
        },
      });
    }
    for (const beat of ["given", "derived", "construct"] as const) {
      const mine = items.filter((it) => it.beat === beat);
      mine.forEach((it, i) => {
        const k = share(beat, i, mine.length);
        if (k > 0) it.draw(k);
      });
    }
    // Where tangents touch.
    for (const [id, pts] of Object.entries(p.touches)) {
      const l = p.lines.find((ll) => ll.id === id || ll.id === `${id}1`);
      if (l && prog(l.beat) >= 1) for (const T of pts) if (inPlot(px(T))) over.push(dot(X(T[0]), Y(T[1]), 3.5, "amber", { stroke: "card", width: 1.2 }));
    }

    // The moving point and the point it drags, tracing the locus.
    const pt = prog("trace");
    if (p.locus && pt > 0) {
      const lo = p.locus;
      const piece = lo.on.pieces[0];
      const M = (th: number) => add(lo.fixed, mul(sub(piece.at(th), lo.fixed), lo.ratio));
      const end = 2 * Math.PI * pt;
      const trail: XY[] = [];
      for (let i = 0; i <= 120; i++) trail.push(px(M((end * i) / 120)));
      if (pt >= 1 && lo.on.kind === "circle") {
        const [cx, cy] = px(add(lo.fixed, mul(sub(lo.on.center, lo.fixed), lo.ratio)));
        draw.push({ kind: "circle", cx, cy, r: lo.on.r * lo.ratio * s, stroke: "good", width: 2.5 });
      } else draw.push({ kind: "polyline", points: trail, stroke: "good", width: 2.5 });
      const Pm = px(piece.at(end));
      const Mm = px(M(end));
      const A = px(lo.fixed);
      draw.push(line(A[0], A[1], Pm[0], Pm[1], { stroke: "amber", width: 1.8, dash: "5 4" }));
      over.push(dot(Pm[0], Pm[1], 4, "amber", { stroke: "card", width: 1.5 }), text(Pm[0] + (Pm[0] >= X(lo.on.center[0]) ? 7 : -7), Pm[1] - 6, lo.movingLabel, { tone: "amber", size: 11, weight: 700, anchor: Pm[0] >= X(lo.on.center[0]) ? "start" : "end" }));
      over.push(dot(Mm[0], Mm[1], 4.5, "good", { stroke: "card", width: 1.5 }), text(Math.min(W - 2, Mm[0] + 7), Math.max(PT + 10, Mm[1] - 7), lo.movingLabel === lo.pointLabel ? "" : lo.pointLabel, { tone: "good", size: 11, weight: 700 }));
    }

    // The answer.
    const pa = prog("answer");
    if (pa > 0 && played.includes("answer")) {
      const m = facts.mark;
      if (m.kind === "segment") {
        if (m.guide) {
          const [g1, g2] = [px(m.guide[0]), px(m.guide[1])];
          under.push(line(g1[0], g1[1], g2[0], g2[1], { stroke: "muted", width: 1.4, dash: "4 4" }));
        }
        const [a, b] = [px(m.from), px(m.to)];
        over.push(line(a[0], a[1], a[0] + (b[0] - a[0]) * pa, a[1] + (b[1] - a[1]) * pa, { stroke: "good", width: 4, cap: "round" }));
        if (pa >= 1) over.push(dot(a[0], a[1], 3.5, "good"), dot(b[0], b[1], 3.5, "good"));
      } else if (m.kind === "point") {
        const [qx, qy] = px(m.at);
        if (inPlot([qx, qy])) {
          over.push(dot(qx, qy, 5.5 * Math.min(1, pa * 1.5), "good", { stroke: "card", width: 2 }));
          // Coordinates only when they read cleanly ("(0, −1)", not "(2.828, 0)"):
          // the header already gives the exact value.
          const short = (v: number) => Math.abs(v * 100 - Math.round(v * 100)) < 1e-6;
          if (pa > 0.5 && short(m.at[0]) && short(m.at[1])) {
            const lab = `(${num(m.at[0])}, ${num(m.at[1])})`;
            over.push(...labelShapes(place([[qx, qy]], lab, 12), lab, "good", 12));
          }
        }
      } else if (m.kind === "slope") {
        const a = px(m.from);
        const b = px([m.from[0] + m.run, m.from[1]]);
        const c = px([m.from[0] + m.run, m.from[1] + m.rise]);
        over.push(line(a[0], a[1], b[0], b[1], { stroke: "good", width: 2, dash: "4 3", opacity: pa }), line(b[0], b[1], c[0], c[1], { stroke: "good", width: 2, dash: "4 3", opacity: pa }));
      } else if (m.kind === "polygon") {
        under.push({ kind: "path", d: "M" + m.points.map((q) => px(q).map((v) => Math.round(v * 100) / 100).join(" ")).join(" L") + " Z", fill: "goodSoft", stroke: "good", width: 2, opacity: pa });
      } else if (m.kind === "split") {
        const [a, c, b] = [px(m.from), px(m.at), px(m.to)];
        const part = (u: XY, v: XY, k: number, tone: "good" | "amber") => over.push(line(u[0], u[1], u[0] + (v[0] - u[0]) * k, u[1] + (v[1] - u[1]) * k, { stroke: tone, width: 4, cap: "round" }));
        // A then the part beyond the cut, each across half the beat.
        part(a, c, Math.min(1, pa * 2), "good");
        if (pa > 0.5) part(c, b, Math.min(1, (pa - 0.5) * 2), "amber");
        if (pa >= 1) over.push(dot(c[0], c[1], 5, "fg", { stroke: "card", width: 2 }));
      } else if (m.kind === "angle") {
        const [cx, cy] = px(m.at);
        const d = arcPath(cx, cy, ANGLE_R, m.from, m.from + m.span * pa);
        if (d) over.push({ kind: "path", d, stroke: "good", width: 3, cap: "round" });
        if (pa >= 1) over.push(dot(cx, cy, 3.5, "good"));
      }
      if (pa > 0.6) over.push(text(W - 6, 17, p.askLabel ?? defaultLabel(p, facts.value), { tone: "good", size: 12.5, weight: 700, anchor: "end" }));
    }

    return [...under, ...axes, ...draw, ...over].filter((sh) => sh.kind !== "text" || sh.text !== "");
  },
};

/** An angle in radians as whole degrees when it is one ("60°"), else in radians. */
function angleText(v: number): string {
  const deg = (v * 180) / Math.PI;
  return Math.abs(deg - Math.round(deg)) < 1e-6 ? `${Math.round(deg)}°` : `${num(v, 3)} rad`;
}

/** AP/PB as small whole numbers when it is a simple ratio ("2 : 7"), else to 4 places; "externally" when negative. */
function ratioText(v: number): string {
  if (!Number.isFinite(v)) return "?";
  const k = Math.abs(v);
  let r = `${num(k, 4)} : 1`;
  for (let n = 1; n <= 30; n++) {
    const m = k * n;
    if (Math.abs(m - Math.round(m)) < 1e-6 && Math.round(m) > 0) {
      r = `${Math.round(m)} : ${n}`;
      break;
    }
  }
  return v < 0 ? `${r} externally` : r;
}

function defaultLabel(p: CoordParams, v: number): string {
  const n = Number.isFinite(v) ? num(v, 3) : "?";
  if (p.ask.kind === "point") {
    const ask = p.ask;
    const P = p.points.find((q) => q.id === ask.point)!.at;
    return `${ask.point} = (${num(P[0], 3)}, ${num(P[1], 3)})`;
  }
  if (p.ask.kind === "ratio") return `ratio = ${ratioText(v)}`;
  if (p.ask.kind === "angle" && p.report.times === 1 && !p.report.squared) {
    return p.ask.as === "angle" ? `angle = ${Number.isFinite(v) ? angleText(v) : "?"}` : `${p.ask.as} θ = ${n}`;
  }
  const name = {
    distance: "shortest distance",
    yIntercept: "y-intercept",
    xIntercept: "x-intercept",
    slope: "slope",
    radius: "radius",
    locusRadius: "locus radius",
    chordLength: "chord",
    tangentLength: "tangent length",
    area: "area",
    angle: p.ask.kind === "angle" && p.ask.as !== "angle" ? `${p.ask.as} θ` : "angle",
  }[p.ask.kind];
  // A squared or scaled key reads as such: "distance² = 25", "6 × area = 36".
  const what = `${p.report.times !== 1 ? `${num(p.report.times)} × ` : ""}${p.report.squared ? `(${name})²` : name}`;
  return `${what} = ${n}`;
}

function measuredText(p: CoordParams, value: number): string {
  const v = num(value, 4);
  switch (p.ask.kind) {
    case "distance":
      return `The shortest distance measured on the drawing is ${v}.`;
    case "yIntercept":
      return `The line crosses the y-axis at y = ${v}.`;
    case "xIntercept":
      return `The line crosses the x-axis at x = ${v}.`;
    case "slope":
      return `The line rises ${v} for every 1 across.`;
    case "radius":
      return `The circle's radius is ${v}.`;
    case "locusRadius":
      return `The traced point runs round a circle of radius ${v}.`;
    case "chordLength":
      return `The line cuts a chord of length ${v}.`;
    case "tangentLength":
      return `The tangent from the point is ${v} long.`;
    case "area":
      return `The shaded figure has area ${v}.`;
    case "point":
      return `The constructed point misses the stated answer by ${v}.`;
    case "ratio":
      return `The cut divides the segment as ${ratioText(value)}.`;
    case "angle": {
      const which = p.ask.obtuse ? "obtuse" : "acute";
      return p.ask.as === "angle" ? `The lines meet at an ${which} angle of ${num(value, 4)} rad (${num((value * 180) / Math.PI, 4)}°).` : `The ${which} angle θ between the lines has ${p.ask.as} θ = ${v}.`;
    }
  }
}
