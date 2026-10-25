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
 *   increasingOn / decreasingOn
 *                 is the curve rising (falling) on the keyed interval: the
 *                 rising stretches are shaded and the interval is checked
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
  | { kind: "increasingOn" | "decreasingOn"; interval: [number, number]; intervalLabel: string };

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

/** Roots of d in [a, b] by sampling for sign changes, then bisection. Points where d is not finite are skipped. */
function rootsOf(d: Fn, a: number, b: number): number[] {
  const out: number[] = [];
  const push = (r: number) => {
    if (!out.some((o) => Math.abs(o - r) < 1e-7 * Math.max(1, Math.abs(r)))) out.push(r);
  };
  let px = a;
  let pv = d(a);
  if (Number.isFinite(pv) && Math.abs(pv) < 1e-12) push(a);
  for (let i = 1; i <= SAMPLES; i++) {
    const x = a + ((b - a) * i) / SAMPLES;
    const v = d(x);
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
  rising: [number, number][];
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
  if (p.ask.kind === "slopePoint") {
    const target = p.ask.slope;
    const eps = (b - a) * 1e-4;
    const rs = rootsOf((x) => slopeAt(p.f, x) - target, a + eps, b - eps);
    if (rs.length === 1) point = [rs[0], p.f(rs[0])];
  }
  const sign = p.ask.kind === "decreasingOn" ? -1 : 1;
  const rising = intervalsWhere((x) => sign * slopeAt(p.f, x) > 0, a, b);
  const facts = { crossings, point, rising };
  factCache.set(p, facts);
  return facts;
}

/** Is f' strictly of one sign at every sampled interior point of [lo, hi]? */
function monotoneOn(f: Fn, [lo, hi]: [number, number], sign: 1 | -1): boolean {
  const n = 400;
  for (let i = 1; i < n; i++) {
    const s = slopeAt(f, lo + ((hi - lo) * i) / n);
    if (!Number.isFinite(s) || sign * s <= 0) return false;
  }
  return true;
}

function niceStep(span: number, maxTicks: number): number {
  const raw = span / maxTicks;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  for (const m of [1, 2, 5, 10]) if (m * mag >= raw) return m * mag;
  return 10 * mag;
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
      } else if (a.kind === "slopePoint") {
        if (a.normal !== undefined && typeof a.normal !== "boolean") throw new ParamError("normal must be true or false");
        ask = { kind: "slopePoint", slope: finite(a, "slope"), normal: a.normal === true, pointLabel: optionalLabel(a, "pointLabel") };
      } else if (a.kind === "increasingOn" || a.kind === "decreasingOn") {
        const interval = pair(a, "interval");
        if (!(interval[1] > interval[0]) || interval[0] < x[0] || interval[1] > x[1]) throw new ParamError("interval must run forward inside the window");
        ask = { kind: a.kind, interval, intervalLabel: optionalLabel(a, "intervalLabel") ?? `${num(interval[0])} < x < ${num(interval[1])}` };
      } else {
        throw new ParamError("ask.kind must be crossings, slopePoint, increasingOn or decreasingOn");
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
      case "increasingOn":
        return monotoneOn(p.f, p.ask.interval, 1) ? 1 : 0;
      case "decreasingOn":
        return monotoneOn(p.f, p.ask.interval, -1) ? 1 : 0;
    }
  },

  checkText(p, value) {
    switch (p.ask.kind) {
      case "crossings":
        return `The curve meets the line${p.g.length > 1 ? "s" : ""} at ${value} points in the window.`;
      case "slopePoint":
        return Number.isFinite(value) ? `The tangent has slope ${num(p.ask.slope)} at x = ${value.toFixed(4)} on the drawing.` : "No single point has that slope in the window.";
      case "increasingOn":
      case "decreasingOn": {
        const verb = p.ask.kind === "increasingOn" ? "rises" : "falls";
        return value === 1 ? `The curve ${verb} at every point of ${p.ask.intervalLabel} on the drawing.` : `The curve does not ${verb.slice(0, -1)} everywhere on ${p.ask.intervalLabel}.`;
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
      for (let i = 0; i <= 240; i++) {
        const x = xa + ((xb - xa) * i) / 240;
        if (x > upto + 1e-12) break;
        const v = fn(x);
        if (!Number.isFinite(v)) {
          flush();
          continue;
        }
        const py = clampY(Y(v));
        if (seg.length && Math.abs(py - seg[seg.length - 1][1]) > P.b - P.t) flush();
        seg.push([X(x), py]);
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
      if (ps > 0.6) {
        const [lo, hi] = p.ask.interval;
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

    // A tangent sliding along the curve to the point with the asked slope.
    if (p.ask.kind === "slopePoint" && facts.point) {
      const [x0, y0] = facts.point;
      const pt = prog("tangent");
      if (pt > 0 && pm === 0) {
        const start = xa + (xb - xa) * 0.6;
        const xt = start + (x0 - start) * pt;
        const yt = p.f(xt);
        const s = slopeAt(p.f, xt);
        if (Number.isFinite(yt) && Number.isFinite(s)) {
          const dx = (xb - xa) * 0.18;
          over.push(
            line(X(xt - dx), clampY(Y(yt - s * dx)), X(xt + dx), clampY(Y(yt + s * dx)), { stroke: "amber", width: 2.2, cap: "round" }),
            dot(X(xt), clampY(Y(yt)), 3.5, "amber"),
            text(P.r - 2, P.t + 2, `tangent slope ${num(s)}`, { tone: "amber", size: 12, weight: 700, anchor: "end" }),
          );
        }
      }
      if (pm > 0) {
        const dx = (xb - xa) * 0.2;
        over.push(line(X(x0 - dx), clampY(Y(y0 - p.ask.slope * dx)), X(x0 + dx), clampY(Y(y0 + p.ask.slope * dx)), { stroke: "amber", width: 2, cap: "round" }));
        if (p.ask.normal) {
          if (p.ask.slope === 0) {
            // A horizontal tangent has a vertical normal.
            over.push(line(X(x0), P.t + 20, X(x0), P.b, { stroke: "fg", width: 1.8, dash: "5 4", opacity: pm }));
          } else {
            const m = -1 / p.ask.slope;
            over.push(line(X(x0 - dx), clampY(Y(y0 - m * dx)), X(x0 + dx), clampY(Y(y0 + m * dx)), { stroke: "fg", width: 1.8, dash: "5 4", opacity: pm }));
          }
        }
        // The label goes in whichever of the four spots round the point is
        // farthest from the curve, the tangent and the normal, so it never sits
        // on a line wherever the point falls.
        const label = p.ask.pointLabel ?? `(${num(x0, 3)}, ${num(y0, 3)})`;
        const halfW = label.length * 3.4;
        const px = X(x0);
        const py = clampY(Y(y0));
        const obstacles: [number, number][] = [];
        for (let i = 0; i <= 120; i++) {
          const xs = xa + ((xb - xa) * i) / 120;
          const v = p.f(xs);
          if (Number.isFinite(v)) obstacles.push([X(xs), Y(v)]);
          const along = xs - x0;
          if (Math.abs(along) <= dx) {
            obstacles.push([X(xs), Y(y0 + p.ask.slope * along)]);
            if (p.ask.normal && p.ask.slope !== 0) obstacles.push([X(xs), Y(y0 - along / p.ask.slope)]);
          }
        }
        // Near and far spots on both sides; a far one gets a leader line back to the point.
        if (p.ask.normal && p.ask.slope === 0) {
          for (let yy = P.t + 20; yy <= P.b; yy += 4) obstacles.push([px, yy]);
        }
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
        // Clear room decides; nearness only breaks near-ties. Room is capped at 12 px, so once a
        // spot is clear enough the nearest clear spot wins instead of the emptiest corner.
        const score = (s: [number, number, "start" | "end"]) => Math.min(room(s), 12) - 0.02 * Math.hypot(s[0] - px, s[1] - py);
        const [lx, ly, anchor] = spots.reduce((best, s) => (score(s) > score(best) ? s : best), spots[0]);
        if (Math.hypot(lx - px, ly - py) > 30) {
          over.push(line(px, py, lx + (anchor === "start" ? -3 : 3), ly - 4, { stroke: "good", width: 1, opacity: 0.7 }));
        }
        over.push(
          dot(px, py, 5.5, "good", { stroke: "card", width: 2 }),
          text(lx, ly, label, { tone: "good", size: 12, weight: 700, anchor }),
          text(P.r - 2, P.t + 2, p.ask.normal ? "tangent slope " + num(p.ask.slope) + ", normal dashed" : "tangent slope " + num(p.ask.slope), { tone: "amber", size: 11, weight: 600, anchor: "end" }),
        );
      }
    }

    return [...under, ...axes, ...curves, ...over];
  },
};
