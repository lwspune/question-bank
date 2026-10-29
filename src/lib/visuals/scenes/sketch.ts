/**
 * Sketch: a one-question animation for a solution no shared scene fits (owner,
 * 2026-10-29). It is built from computed objects, never drawn by hand:
 *
 *   vars    named numbers, each a formula of the ones before it
 *   points  named points, coordinates as formulas of the vars
 *   items   what is drawn (point, segment, line, arrow, polygon, circle, arc,
 *           angle, curve, label), each on one step s1..s8; a label may print a
 *           var as {name} or {formula}; `labelAt` (+ `pos`) places a segment's,
 *           line's or curve's name where it reads clearly
 *   assert  facts the picture must satisfy ("c^2 = a^2 + b^2"); one that fails
 *           refuses the picture, so a drawing that contradicts itself cannot ship
 *   answer  a formula of the vars: the value checked against the key
 *
 * One unit is the same length on both axes, so lengths and angles are true.
 * Everything a visual names must sit inside its view. Formulas use
 * lib/visuals/expr (never eval). Spec: tests/visuals-sketch.test.ts.
 */
import { compileExpr } from "../expr";
import { arcPath, arrowHead, dot, fracText, line, lerp, num, progressOf, text } from "../geometry";
import { parseVars, value } from "../namedVars";
import { obj, ParamError, plainLabel, safely } from "../params";
import type { Scene, Shape, Tone } from "../types";

const STEPS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] as const;
const W = 340;
const H = 260;
const PAD = 14;
const LIMITS = { vars: 30, points: 26, items: 40, asserts: 12 };
const TONES = new Set<Tone>(["fg", "muted", "brand", "amber", "good", "bad"]);
type Pos = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
const POS: Record<Pos, [number, number, "start" | "middle" | "end"]> = {
  n: [0, -9, "middle"],
  s: [0, 16, "middle"],
  e: [8, 4, "start"],
  w: [-8, 4, "end"],
  ne: [6, -7, "start"],
  nw: [-6, -7, "end"],
  se: [6, 15, "start"],
  sw: [-6, 15, "end"],
};

type Pt = [number, number];
type Item =
  | { kind: "point"; at: Pt; label?: string; pos: Pos }
  | { kind: "segment" | "arrow"; from: Pt; to: Pt; label?: string; dash: boolean; labelAt?: [Pt, Pos] }
  | { kind: "line"; through: [Pt, Pt]; label?: string; dash: boolean; labelAt?: [Pt, Pos] }
  | { kind: "polygon"; points: Pt[] }
  | { kind: "circle"; center: Pt; r: number; dash: boolean }
  | { kind: "arc"; center: Pt; r: number; from: number; to: number }
  | { kind: "angle"; at: Pt; from: Pt; to: Pt; label?: string }
  | { kind: "curve"; fn: (x: number) => number; x: [number, number]; label?: string; labelAt?: [Pt, Pos] }
  | { kind: "label"; at: Pt; text: string; pos: Pos };

export interface SketchParams {
  view: { x: [number, number]; y: [number, number] };
  axes: boolean;
  title?: string;
  items: (Item & { step: string; tone: Tone })[];
  answer: number;
  asserts: number;
}

/** A label with {formula} parts filled in from the vars (fractions where they are fractions). */
function fill(template: unknown, vars: Record<string, number>, field: string): string {
  if (typeof template !== "string") throw new ParamError(`${field} must be text`);
  const out = template.replace(/\{([^{}]+)\}/g, (_, src: string) => fracText(value(src, vars, field)));
  return plainLabel(out, field, 40);
}

/** Check one stated fact: "lhs = rhs", "lhs < rhs" or "lhs > rhs". */
function holds(fact: unknown, vars: Record<string, number>, i: number): boolean {
  if (typeof fact !== "string") throw new ParamError(`assert[${i}] must be text`);
  const m = /^([^=<>]+)(=|<|>)([^=<>]+)$/.exec(fact);
  if (!m) throw new ParamError(`assert[${i}] must read "a = b", "a < b" or "a > b"`);
  const [l, r] = [value(m[1].trim(), vars, `assert[${i}]`), value(m[3].trim(), vars, `assert[${i}]`)];
  if (m[2] === "=") return Math.abs(l - r) <= 1e-6 * (1 + Math.abs(r));
  return m[2] === "<" ? l < r : l > r;
}

const posOf = (v: unknown): Pos => {
  if (v === undefined) return "ne";
  if (typeof v !== "string" || !(v in POS)) throw new ParamError("pos must be one of n, s, e, w, ne, nw, se, sw");
  return v as Pos;
};

export const sketch: Scene<SketchParams> = {
  id: "sketch",
  beats: STEPS,

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      // Named numbers, each from the ones before it.
      const vars = parseVars(o.vars, LIMITS.vars);

      const w = obj(o.view);
      const range = (k: "x" | "y"): [number, number] => {
        const v = w[k];
        if (!Array.isArray(v) || v.length !== 2) throw new ParamError(`view.${k} must be two values`);
        const r: [number, number] = [value(v[0], vars, `view.${k}`), value(v[1], vars, `view.${k}`)];
        if (!(r[1] > r[0])) throw new ParamError(`view.${k} must run forward`);
        return r;
      };
      const view = { x: range("x"), y: range("y") };
      const inside = ([px, py]: Pt) => px >= view.x[0] - 1e-9 && px <= view.x[1] + 1e-9 && py >= view.y[0] - 1e-9 && py <= view.y[1] + 1e-9;

      const points: Record<string, Pt> = {};
      const psrc = o.points === undefined ? {} : obj(o.points);
      if (Object.keys(psrc).length > LIMITS.points) throw new ParamError(`at most ${LIMITS.points} points`);
      for (const [n, v] of Object.entries(psrc)) {
        if (!/^[A-Z][A-Za-z0-9']{0,3}$/.test(n)) throw new ParamError(`"${n}" cannot be a point name (a capital letter, then up to 3 more)`);
        if (!Array.isArray(v) || v.length !== 2) throw new ParamError(`points.${n} must be [x, y]`);
        const p: Pt = [value(v[0], vars, `points.${n}`), value(v[1], vars, `points.${n}`)];
        if (!inside(p)) throw new ParamError(`point ${n} lies outside the view`);
        points[n] = p;
      }
      const pt = (v: unknown, field: string): Pt => {
        if (typeof v === "string") {
          const p = points[v];
          if (!p) throw new ParamError(`${field}: no point named ${v}`);
          return p;
        }
        if (Array.isArray(v) && v.length === 2) {
          const p: Pt = [value(v[0], vars, field), value(v[1], vars, field)];
          if (!inside(p)) throw new ParamError(`${field} lies outside the view`);
          return p;
        }
        throw new ParamError(`${field} must be a point name or [x, y]`);
      };

      if (!Array.isArray(o.items) || o.items.length === 0 || o.items.length > LIMITS.items) throw new ParamError(`items must be a list of 1 to ${LIMITS.items}`);
      const items = o.items.map((raw2, i): SketchParams["items"][number] => {
        const it = obj(raw2);
        const f = `items[${i}]`;
        const step = it.step;
        if (typeof step !== "string" || !(STEPS as readonly string[]).includes(step)) throw new ParamError(`${f}.step must be one of s1 to s8`);
        const tone = (it.tone ?? (it.kind === "curve" ? "brand" : it.kind === "line" ? "amber" : it.kind === "polygon" || it.kind === "angle" ? "good" : "fg")) as Tone;
        if (!TONES.has(tone)) throw new ParamError(`${f}.tone must be fg, muted, brand, amber, good or bad`);
        const label = it.label === undefined ? undefined : fill(it.label, vars, `${f}.label`);
        const dash = it.dash === true;
        const base = { step, tone };
        const labelAt: [Pt, Pos] | undefined = it.labelAt === undefined ? undefined : [pt(it.labelAt, `${f}.labelAt`), posOf(it.pos ?? "e")];
        switch (it.kind) {
          case "point":
            return { ...base, kind: "point", at: pt(it.at, `${f}.at`), label, pos: posOf(it.pos) };
          case "segment":
          case "arrow":
            return { ...base, kind: it.kind, from: pt(it.from, `${f}.from`), to: pt(it.to, `${f}.to`), label, dash, labelAt };
          case "line": {
            if (!Array.isArray(it.through) || it.through.length !== 2) throw new ParamError(`${f}.through must be two points`);
            const t: [Pt, Pt] = [pt(it.through[0], `${f}.through`), pt(it.through[1], `${f}.through`)];
            if (Math.hypot(t[1][0] - t[0][0], t[1][1] - t[0][1]) < 1e-9) throw new ParamError(`${f}.through needs two different points`);
            return { ...base, kind: "line", through: t, label, dash, labelAt };
          }
          case "polygon": {
            if (!Array.isArray(it.points) || it.points.length < 3 || it.points.length > 12) throw new ParamError(`${f}.points must be 3 to 12 points`);
            return { ...base, kind: "polygon", points: it.points.map((q, k) => pt(q, `${f}.points[${k}]`)) };
          }
          case "circle":
          case "arc": {
            const center = pt(it.center, `${f}.center`);
            const r = value(it.r, vars, `${f}.r`);
            if (!(r > 0)) throw new ParamError(`${f}.r must be positive`);
            if (it.kind === "circle") return { ...base, kind: "circle", center, r, dash };
            const [a, b] = [value(it.from, vars, `${f}.from`), value(it.to, vars, `${f}.to`)];
            if (!(b > a)) throw new ParamError(`${f}: an arc runs anticlockwise, from < to (degrees)`);
            return { ...base, kind: "arc", center, r, from: a, to: b };
          }
          case "angle":
            return { ...base, kind: "angle", at: pt(it.at, `${f}.at`), from: pt(it.from, `${f}.from`), to: pt(it.to, `${f}.to`), label };
          case "curve": {
            const r = compileExpr(it.f, vars);
            if ("error" in r) throw new ParamError(`${f}.f: ${r.error}`);
            if (!Array.isArray(it.x) || it.x.length !== 2) throw new ParamError(`${f}.x must be two values`);
            const x: [number, number] = [value(it.x[0], vars, `${f}.x`), value(it.x[1], vars, `${f}.x`)];
            if (!(x[1] > x[0]) || x[0] < view.x[0] - 1e-9 || x[1] > view.x[1] + 1e-9) throw new ParamError(`${f}.x must run forward inside the view`);
            return { ...base, kind: "curve", fn: r.fn, x, label, labelAt };
          }
          case "label":
            return { ...base, kind: "label", at: pt(it.at, `${f}.at`), text: fill(it.text, vars, `${f}.text`), pos: posOf(it.pos ?? "e") };
          default:
            throw new ParamError(`${f}.kind must be point, segment, arrow, line, polygon, circle, arc, angle, curve or label`);
        }
      });

      const asserts = o.assert === undefined ? [] : o.assert;
      if (!Array.isArray(asserts) || asserts.length > LIMITS.asserts) throw new ParamError(`assert must be a list of at most ${LIMITS.asserts}`);
      asserts.forEach((a, i) => {
        if (!holds(a, vars, i)) throw new ParamError(`assert[${i}] does not hold: ${String(a)}`);
      });

      const title = o.title === undefined ? undefined : plainLabel(o.title, "title", 40);
      return { view, axes: o.axes === true, title, items, answer: value(o.answer, vars, "answer"), asserts: asserts.length };
    }),

  check: (p) => p.answer,

  checkText(p, v) {
    const facts = p.asserts ? `; ${p.asserts} stated fact${p.asserts === 1 ? "" : "s"} hold${p.asserts === 1 ? "s" : ""}` : "";
    return `The drawing works out ${num(v, 4)}${facts}.`;
  },

  viewBox: () => ({ w: W, h: H }),

  duration: () => 1200,

  frame(p, { played, t }) {
    const [xa, xb] = p.view.x;
    const [ya, yb] = p.view.y;
    const k = Math.min((W - 2 * PAD) / (xb - xa), (H - 2 * PAD) / (yb - ya));
    const ox = (W - k * (xb - xa)) / 2;
    const oy = (H - k * (yb - ya)) / 2;
    const X = (x: number) => ox + (x - xa) * k;
    const Y = (y: number) => H - oy - (y - ya) * k;
    const S = ([x, y]: Pt): Pt => [X(x), Y(y)];
    // Shaded regions go first, under the axes, so a half-plane never hides them.
    const fills: Shape[] = [];
    const under: Shape[] = [];
    const mid: Shape[] = [];
    const over: Shape[] = [];

    if (p.axes) {
      const ay = ya <= 0 && yb >= 0 ? Y(0) : null;
      const ax = xa <= 0 && xb >= 0 ? X(0) : null;
      if (ay !== null) under.push(line(X(xa), ay, X(xb), ay, { stroke: "muted", width: 1.2 }), text(X(xb) - 2, ay - 5, "x", { tone: "muted", size: 11, anchor: "end", italic: true }));
      if (ax !== null) under.push(line(ax, Y(ya), ax, Y(yb), { stroke: "muted", width: 1.2 }), text(ax + 5, Y(yb) + 11, "y", { tone: "muted", size: 11, italic: true }));
      if (ay !== null && ax !== null) under.push(text(ax - 4, ay + 13, "O", { tone: "muted", size: 10, anchor: "end" }));
    }

    const at = (q: Pt, pos: Pos): [number, number, "start" | "middle" | "end"] => {
      const [dx, dy, anchor] = POS[pos];
      const [sx, sy] = S(q);
      return [sx + dx, sy + dy, anchor];
    };

    const placed = ([q, pos]: [Pt, Pos], label: string, tone: Tone): Shape => {
      const [lx, ly, anchor] = at(q, pos);
      return text(lx, ly, label, { tone, size: 12, weight: 600, anchor });
    };

    for (const it of p.items) {
      const pr = progressOf(it.step, played, t);
      if (pr <= 0) continue;
      const stroke = it.tone;
      switch (it.kind) {
        case "point": {
          const [sx, sy] = S(it.at);
          over.push(dot(sx, sy, 4.5 * Math.min(1, pr * 1.5), stroke, { stroke: "card", width: 1.5 }));
          if (it.label && pr >= 0.5) {
            const [lx, ly, anchor] = at(it.at, it.pos);
            over.push(text(lx, ly, it.label, { tone: stroke, size: 12, weight: 600, anchor }));
          }
          break;
        }
        case "segment":
        case "arrow": {
          const a = S(it.from);
          const b = lerp(a, S(it.to), pr);
          mid.push(line(a[0], a[1], b[0], b[1], { stroke, width: 2.2, dash: it.dash ? "5 4" : undefined }));
          if (it.kind === "arrow" && pr > 0.05) mid.push(arrowHead(b[0], b[1], Math.atan2(b[1] - a[1], b[0] - a[0]), stroke));
          if (it.label && pr === 1) {
            if (it.labelAt) over.push(placed(it.labelAt, it.label, stroke));
            else {
              const m = lerp(a, b, 0.5);
              over.push(text(m[0] + 6, m[1] - 6, it.label, { tone: stroke, size: 12, weight: 600 }));
            }
          }
          break;
        }
        case "line": {
          const ends = clipLine(it.through[0], it.through[1], p.view);
          if (!ends) break;
          const a = S(ends[0]);
          const b = lerp(a, S(ends[1]), pr);
          mid.push(line(a[0], a[1], b[0], b[1], { stroke, width: 2, dash: it.dash ? "5 4" : undefined }));
          if (it.label && pr === 1) over.push(it.labelAt ? placed(it.labelAt, it.label, stroke) : text(S(ends[1])[0] - 4, S(ends[1])[1] + (S(ends[1])[1] < H / 2 ? 14 : -6), it.label, { tone: stroke, size: 11, weight: 600, anchor: "end" }));
          break;
        }
        case "polygon": {
          const pts = it.points.map(S);
          const d = `M${pts.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(" L")} Z`;
          fills.push({ kind: "path", d, fill: "goodSoft", stroke, width: 1.5, opacity: pr });
          break;
        }
        case "circle":
        case "arc": {
          const [cx, cy] = S(it.center);
          const [a, b] = it.kind === "circle" ? [0, 2 * Math.PI] : [(it.from * Math.PI) / 180, (it.to * Math.PI) / 180];
          const d = arcPath(cx, cy, it.r * k, a, a + (b - a) * pr);
          if (d) mid.push({ kind: "path", d, stroke, width: 2, dash: it.kind === "circle" && it.dash ? "5 4" : undefined });
          break;
        }
        case "angle": {
          const [vx, vy] = S(it.at);
          const [fx, fy] = S(it.from);
          const [tx, ty] = S(it.to);
          // Screen y grows down: maths angles are taken with -dy.
          let a1 = Math.atan2(-(fy - vy), fx - vx);
          let a2 = Math.atan2(-(ty - vy), tx - vx);
          let sweep = a2 - a1;
          while (sweep <= -Math.PI) sweep += 2 * Math.PI;
          while (sweep > Math.PI) sweep -= 2 * Math.PI;
          if (sweep < 0) [a1, a2, sweep] = [a2, a1, -sweep];
          const r = 16;
          if (Math.abs(sweep - Math.PI / 2) < 1e-6) {
            const u: Pt = [Math.cos(a1), -Math.sin(a1)];
            const v: Pt = [Math.cos(a1 + sweep), -Math.sin(a1 + sweep)];
            const s = 11 * pr;
            const p1: Pt = [vx + u[0] * s, vy + u[1] * s];
            const p3: Pt = [vx + v[0] * s, vy + v[1] * s];
            const p2: Pt = [p1[0] + v[0] * s, p1[1] + v[1] * s];
            mid.push({ kind: "path", d: `M${p1[0].toFixed(2)} ${p1[1].toFixed(2)} L${p2[0].toFixed(2)} ${p2[1].toFixed(2)} L${p3[0].toFixed(2)} ${p3[1].toFixed(2)}`, stroke, width: 1.6 });
          } else {
            const d = arcPath(vx, vy, r, a1, a1 + sweep * pr);
            if (d) mid.push({ kind: "path", d, stroke, width: 1.8 });
          }
          if (it.label && pr === 1) {
            const m = a1 + sweep / 2;
            over.push(text(vx + Math.cos(m) * (r + 12), vy - Math.sin(m) * (r + 12) + 4, it.label, { tone: stroke, size: 11, weight: 600, anchor: "middle" }));
          }
          break;
        }
        case "curve": {
          const [lo, hi] = it.x;
          const upto = lo + (hi - lo) * pr;
          let seg: Pt[] = [];
          const flush = () => {
            if (seg.length > 1) mid.push({ kind: "polyline", points: seg, stroke, width: 2.6 });
            seg = [];
          };
          for (let i = 0; i <= 200; i++) {
            const x = lo + ((hi - lo) * i) / 200;
            if (x > upto + 1e-12) break;
            const y = it.fn(x);
            if (!Number.isFinite(y) || y < ya - (yb - ya) || y > yb + (yb - ya)) {
              flush();
              continue;
            }
            seg.push([X(x), Math.max(Y(yb) - 20, Math.min(Y(ya) + 20, Y(y)))]);
          }
          flush();
          if (it.label && pr === 1 && it.labelAt) over.push(placed(it.labelAt, it.label, stroke));
          else if (it.label && pr === 1) {
            const y = it.fn(hi);
            if (Number.isFinite(y)) over.push(text(X(hi) - 4, Math.max(Y(yb) + 12, Math.min(Y(ya) - 4, Y(y) - 6)), it.label, { tone: stroke, size: 12, weight: 600, anchor: "end" }));
          }
          break;
        }
        case "label": {
          const [lx, ly, anchor] = at(it.at, it.pos);
          over.push(text(lx, ly, it.text, { tone: stroke, size: 13, weight: 700, anchor, opacity: pr }));
          break;
        }
      }
    }
    if (p.title) over.push(text(W - 4, 14, p.title, { tone: "good", size: 11, weight: 600, anchor: "end" }));
    tidyLabels(over);
    return [...fills, ...under, ...mid, ...over];
  },
};

/**
 * Keep every label inside the picture and off the labels placed before it:
 * slide it in from an edge, then, if it still lands on an earlier one, try
 * rows above and below. Widths are estimated from the font size. Earlier
 * items keep their place, so a label does not jump when a later one appears.
 */
function tidyLabels(shapes: Shape[]): void {
  type T = Extract<Shape, { kind: "text" }>;
  const placed: { l: number; r: number; t: number; b: number }[] = [];
  const boxOf = (s: T, y = s.y) => {
    const size = s.size ?? 12;
    const w = s.text.length * size * 0.56;
    const l = s.anchor === "end" ? s.x - w : s.anchor === "middle" ? s.x - w / 2 : s.x;
    return { l, r: l + w, t: y - size, b: y + 3 };
  };
  const hits = (a: { l: number; r: number; t: number; b: number }) => placed.some((q) => a.l < q.r && q.l < a.r && a.t < q.b && q.t < a.b);
  for (const s of shapes) {
    if (s.kind !== "text") continue;
    const size = s.size ?? 12;
    let b = boxOf(s);
    if (b.l < 2) s.x += 2 - b.l;
    else if (b.r > W - 2) s.x -= b.r - (W - 2);
    b = boxOf(s);
    if (hits(b)) {
      const h = size + 3;
      for (const dy of [h, -h, 2 * h, -2 * h, 3 * h, -3 * h]) {
        const y = s.y + dy;
        if (y - size < 2 || y + 3 > H - 2) continue;
        if (!hits(boxOf(s, y))) {
          s.y = y;
          break;
        }
      }
      b = boxOf(s);
    }
    placed.push(b);
  }
}

/** The part of the line through a and b that lies inside the view (Liang-Barsky), or null. */
function clipLine(a: Pt, b: Pt, view: { x: [number, number]; y: [number, number] }): [Pt, Pt] | null {
  const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
  let lo = -Infinity;
  let hi = Infinity;
  const edges: [number, number][] = [
    [-dx, a[0] - view.x[0]],
    [dx, view.x[1] - a[0]],
    [-dy, a[1] - view.y[0]],
    [dy, view.y[1] - a[1]],
  ];
  for (const [pp, q] of edges) {
    if (Math.abs(pp) < 1e-15) {
      if (q < 0) return null;
      continue;
    }
    const r = q / pp;
    if (pp < 0) lo = Math.max(lo, r);
    else hi = Math.min(hi, r);
  }
  if (lo > hi) return null;
  return [
    [a[0] + lo * dx, a[1] + lo * dy],
    [a[0] + hi * dx, a[1] + hi * dy],
  ];
}
