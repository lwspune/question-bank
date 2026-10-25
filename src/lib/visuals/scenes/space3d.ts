/**
 * 3D lines and planes: points, lines and planes drawn in a fixed three-quarter
 * view, for questions whose solution works in space. The scene works out the
 * constructions itself (a foot of a perpendicular, an image in a plane, where a
 * line meets a plane, the common perpendicular of skew lines), so an agent never
 * supplies a computed point.
 *
 *   points    { id, at: [x, y, z], label?, beat? }
 *   lines     { id, through: [p, q] } | { id, point: [x, y, z] | p, dir: [a, b, c] }
 *   planes    { id, eq: [a, b, c, d] }   for ax + by + cz = d
 *   derived   { id, kind: "foot", from: p, to: line | plane }
 *             { id, kind: "image", of: p, in: plane }
 *             { id, kind: "meet", line, plane }
 *   segments  { from, to, label? }
 *   view      { az, el } in degrees; without it the scene picks the view that
 *             shows the planes face-on and the answer least foreshortened
 *
 * The answer (params.ask) is measured on the scene's own model: distance (any two
 * of point, line, plane), angle (line or plane with line or plane, radians,
 * acute), projection (a segment's length projected on a plane), coord (one
 * coordinate of a point). Each may be squared and/or multiplied, as in 2D.
 * A line passing behind a plane is drawn faint where the plane hides it.
 * Beats: given, derived, construct, answer.
 */
import { dot as dotShape, line, num, text } from "../geometry";
import { finite, obj, optionalLabel, ParamError, safely } from "../params";
import type { Scene, Shape } from "../types";

type V3 = [number, number, number];
type Beat = "given" | "derived" | "construct";

const add = (p: V3, q: V3): V3 => [p[0] + q[0], p[1] + q[1], p[2] + q[2]];
const sub = (p: V3, q: V3): V3 => [p[0] - q[0], p[1] - q[1], p[2] - q[2]];
const mul = (p: V3, k: number): V3 => [p[0] * k, p[1] * k, p[2] * k];
const dt = (p: V3, q: V3) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
const cross = (p: V3, q: V3): V3 => [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]];
const len = (p: V3) => Math.sqrt(dt(p, p));
const unit = (p: V3): V3 => mul(p, 1 / len(p));

interface Pt {
  id: string;
  at: V3;
  label: string;
  beat: Beat;
}
interface Ln {
  id: string;
  a: V3;
  /** Unit direction. */
  u: V3;
  label: string | undefined;
  beat: Beat;
}
interface Pl {
  id: string;
  /** Unit normal; the plane is n . x = d. */
  n: V3;
  d: number;
  label: string | undefined;
  beat: Beat;
}
interface Seg {
  from: V3;
  to: V3;
  label: string | undefined;
  beat: Beat;
}

type Ask =
  | { kind: "distance"; from: string; to: string }
  | { kind: "angle"; between: [string, string] }
  | { kind: "projection"; from: string; to: string; onto: string }
  | { kind: "coord"; point: string; axis: 0 | 1 | 2 };

export interface SpaceParams {
  points: Pt[];
  lines: Ln[];
  planes: Pl[];
  segments: Seg[];
  ask: Ask;
  askLabel: string | undefined;
  report: { squared: boolean; times: number };
  /** Null: the scene chooses (spaceView). */
  view: { az: number; el: number } | null;
}

type Mark =
  | { kind: "segment"; from: V3; to: V3 }
  | { kind: "angle"; at: V3; u: V3; v: V3; angle: number }
  | { kind: "projection"; a: V3; b: V3; a2: V3; b2: V3 }
  | { kind: "coord"; from: V3; to: V3 }
  | { kind: "none" };

export interface SpaceFacts {
  value: number;
  measured: number;
  /** Every named point, given and derived. */
  points: Record<string, V3>;
  mark: Mark;
}

const footOnPlane = (p: V3, pl: Pl): V3 => sub(p, mul(pl.n, dt(pl.n, p) - pl.d));
const footOnLine = (p: V3, l: Ln): V3 => add(l.a, mul(l.u, dt(sub(p, l.a), l.u)));

/** Closest points of two lines (the ends of the common perpendicular); for parallel lines, l2's point and its foot on l1. */
function closest(l1: Ln, l2: Ln): [V3, V3] {
  const w = sub(l1.a, l2.a);
  const b = dt(l1.u, l2.u);
  const den = 1 - b * b;
  if (den < 1e-12) return [footOnLine(l2.a, l1), l2.a];
  const dd = dt(l1.u, w);
  const e = dt(l2.u, w);
  const s = (b * e - dd) / den;
  const t = (e - b * dd) / den;
  return [add(l1.a, mul(l1.u, s)), add(l2.a, mul(l2.u, t))];
}

function measure(p: SpaceParams, pts: Record<string, V3>): { value: number; mark: Mark } {
  const ln = (id: string) => p.lines.find((l) => l.id === id);
  const pl = (id: string) => p.planes.find((q) => q.id === id);
  const ask = p.ask;
  switch (ask.kind) {
    case "distance": {
      const [A, B] = [pts[ask.from], pts[ask.to]];
      const [lA, lB] = [ln(ask.from), ln(ask.to)];
      const [pA, pB] = [pl(ask.from), pl(ask.to)];
      if (A && B) return { value: len(sub(A, B)), mark: { kind: "segment", from: A, to: B } };
      const P = A ?? B;
      const L = lA ?? lB;
      const S = pA ?? pB;
      if (P && S) {
        const F = footOnPlane(P, S);
        return { value: len(sub(P, F)), mark: { kind: "segment", from: P, to: F } };
      }
      if (P && L) {
        const F = footOnLine(P, L);
        return { value: len(sub(P, F)), mark: { kind: "segment", from: P, to: F } };
      }
      if (lA && lB) {
        const [F1, F2] = closest(lA, lB);
        return { value: len(sub(F1, F2)), mark: { kind: "segment", from: F1, to: F2 } };
      }
      if (L && S) {
        if (Math.abs(dt(L.u, S.n)) > 1e-9) return { value: 0, mark: { kind: "none" } };
        const F = footOnPlane(L.a, S);
        return { value: len(sub(L.a, F)), mark: { kind: "segment", from: L.a, to: F } };
      }
      // Two planes.
      const [s1, s2] = [pA!, pB!];
      if (len(cross(s1.n, s2.n)) > 1e-9) return { value: 0, mark: { kind: "none" } };
      const on = mul(s1.n, s1.d);
      const F = footOnPlane(on, s2);
      return { value: len(sub(on, F)), mark: { kind: "segment", from: on, to: F } };
    }
    case "angle": {
      const [x, y] = ask.between;
      const dirOf = (id: string): { v: V3; plane: boolean } => (ln(id) ? { v: ln(id)!.u, plane: false } : { v: pl(id)!.n, plane: true });
      const [dx, dy] = [dirOf(x), dirOf(y)];
      const c = Math.min(1, Math.abs(dt(dx.v, dy.v)));
      if (dx.plane !== dy.plane) {
        // Line with plane: the angle between the line and its projection on the plane.
        const L = ln(dx.plane ? y : x)!;
        const S = pl(dx.plane ? x : y)!;
        const angle = Math.asin(c);
        const along = dt(L.u, S.n);
        const at = Math.abs(along) > 1e-9 ? add(L.a, mul(L.u, (S.d - dt(S.n, L.a)) / along)) : footOnPlane(L.a, S);
        const u = along < 0 ? mul(L.u, -1) : L.u;
        const proj = sub(u, mul(S.n, dt(u, S.n)));
        const v = len(proj) > 1e-9 ? unit(proj) : perpendicular(S.n);
        return { value: angle, mark: { kind: "angle", at, u: mul(u, -1), v: mul(v, -1), angle } };
      }
      const angle = Math.acos(c);
      if (!dx.plane) {
        const [l1, l2] = [ln(x)!, ln(y)!];
        const [at] = closest(l1, l2);
        const v = dt(l1.u, l2.u) < 0 ? mul(l2.u, -1) : l2.u;
        return { value: angle, mark: { kind: "angle", at, u: l1.u, v, angle } };
      }
      // Plane with plane: the normals, from a point on their line of intersection.
      const [s1, s2] = [pl(x)!, pl(y)!];
      const dir = cross(s1.n, s2.n);
      let at: V3 = mul(s1.n, s1.d);
      if (len(dir) > 1e-9) {
        // The point of the intersection line nearest the origin.
        const m = len(dir) ** 2;
        at = mul(add(mul(cross(s2.n, dir), s1.d), mul(cross(dir, s1.n), s2.d)), 1 / m);
      }
      const v = dt(s1.n, s2.n) < 0 ? mul(s2.n, -1) : s2.n;
      return { value: angle, mark: { kind: "angle", at, u: s1.n, v, angle } };
    }
    case "projection": {
      const [A, B] = [pts[ask.from], pts[ask.to]];
      const S = pl(ask.onto)!;
      const [a2, b2] = [footOnPlane(A, S), footOnPlane(B, S)];
      return { value: len(sub(a2, b2)), mark: { kind: "projection", a: A, b: B, a2, b2 } };
    }
    case "coord": {
      const P = pts[ask.point];
      const base: V3 = [...P];
      base[ask.axis] = 0;
      return { value: P[ask.axis], mark: { kind: "coord", from: base, to: P } };
    }
  }
}

/** Some unit vector perpendicular to v. */
function perpendicular(v: V3): V3 {
  const axis: V3 = Math.abs(v[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  return unit(cross(v, axis));
}

const factCache = new WeakMap<SpaceParams, SpaceFacts>();

export function spaceFacts(p: SpaceParams): SpaceFacts {
  const hit = factCache.get(p);
  if (hit) return hit;
  const points = Object.fromEntries(p.points.map((q) => [q.id, q.at])) as Record<string, V3>;
  const m = measure(p, points);
  const value = (p.report.squared ? m.value * m.value : m.value) * p.report.times;
  const facts = { value, measured: m.value, points, mark: m.mark };
  factCache.set(p, facts);
  return facts;
}

// --- parsing --------------------------------------------------------------

function v3(o: Record<string, unknown>, key: string): V3 {
  const v = o[key];
  if (!Array.isArray(v) || v.length !== 3 || !v.every((x) => typeof x === "number" && Number.isFinite(x))) throw new ParamError(`${key} must be three numbers`);
  return [v[0], v[1], v[2]];
}

function beatOf(o: Record<string, unknown>, fallback: Beat): Beat {
  if (o.beat === undefined) return fallback;
  if (o.beat === "given" || o.beat === "derived" || o.beat === "construct") return o.beat;
  throw new ParamError('beat must be "given", "derived" or "construct"');
}

function list(o: Record<string, unknown>, key: string, max: number): Record<string, unknown>[] {
  const v = o[key] === undefined ? [] : o[key];
  if (!Array.isArray(v) || v.length > max) throw new ParamError(`${key} must be a list of at most ${max}`);
  return v.map((x) => obj(x));
}

const coordLabel = (q: V3) => `(${q.map((c) => num(c)).join(", ")})`;

export const space3d: Scene<SpaceParams> = {
  id: "space3d",
  beats: ["given", "derived", "construct", "answer"],

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      const ids = new Set<string>();
      const claim = (v: unknown, where: string) => {
        if (typeof v !== "string" || !/^[A-Za-z][A-Za-z0-9']{0,5}$/.test(v)) throw new ParamError(`${where}: id must be a short name (letters and digits)`);
        if (ids.has(v)) throw new ParamError(`id ${v} is used twice`);
        ids.add(v);
        return v;
      };
      const label = (q: Record<string, unknown>, at: V3 | null) => (q.label === "" ? "" : optionalLabel(q, "label") ?? (at ? coordLabel(at) : undefined));

      const points: Pt[] = list(o, "points", 8).map((q, i) => {
        const at = v3(q, "at");
        return { id: claim(q.id, `points[${i}]`), at, label: label(q, at)!, beat: beatOf(q, "given") };
      });
      const pointAt = (id: unknown, where: string): V3 => {
        const q = points.find((pp) => pp.id === id);
        if (!q) throw new ParamError(`${where}: no point named ${String(id)}`);
        return q.at;
      };

      const lines: Ln[] = list(o, "lines", 4).map((q, i) => {
        const id = claim(q.id, `lines[${i}]`);
        let a: V3;
        let u: V3;
        if (q.through !== undefined) {
          if (!Array.isArray(q.through) || q.through.length !== 2) throw new ParamError(`${id}: through must name two points`);
          a = pointAt(q.through[0], id);
          const b = pointAt(q.through[1], id);
          if (len(sub(b, a)) < 1e-9) throw new ParamError(`${id}: through names the same point twice`);
          u = unit(sub(b, a));
        } else {
          a = typeof q.point === "string" ? pointAt(q.point, id) : v3(q, "point");
          const d = v3(q, "dir");
          if (len(d) < 1e-12) throw new ParamError(`${id}: dir must not be zero`);
          u = unit(d);
        }
        return { id, a, u, label: optionalLabel(q, "label"), beat: beatOf(q, "given") };
      });

      const planes: Pl[] = list(o, "planes", 3).map((q, i) => {
        const id = claim(q.id, `planes[${i}]`);
        const e = q.eq;
        if (!Array.isArray(e) || e.length !== 4 || !e.every((x) => typeof x === "number" && Number.isFinite(x))) throw new ParamError(`${id}: eq must be four numbers [a, b, c, d]`);
        const nr: V3 = [e[0], e[1], e[2]];
        const m = len(nr);
        if (m < 1e-12) throw new ParamError(`${id}: the normal (a, b, c) must not be zero`);
        return { id, n: mul(nr, 1 / m), d: (e[3] as number) / m, label: optionalLabel(q, "label"), beat: beatOf(q, "given") };
      });
      const lineNamed = (v: unknown, where: string) => lines.find((l) => l.id === v) ?? (() => { throw new ParamError(`${where}: no line named ${String(v)}`); })();
      const planeNamed = (v: unknown, where: string) => planes.find((l) => l.id === v) ?? (() => { throw new ParamError(`${where}: no plane named ${String(v)}`); })();

      for (const [i, q] of list(o, "derived", 4).entries()) {
        const id = claim(q.id, `derived[${i}]`);
        let at: V3;
        if (q.kind === "foot") {
          const P = pointAt(q.from, id);
          const L = lines.find((l) => l.id === q.to);
          const S = planes.find((l) => l.id === q.to);
          if (!L && !S) throw new ParamError(`${id}: foot needs to naming a line or plane`);
          at = L ? footOnLine(P, L) : footOnPlane(P, S!);
        } else if (q.kind === "image") {
          const P = pointAt(q.of, id);
          at = sub(mul(footOnPlane(P, planeNamed(q.in, id)), 2), P);
        } else if (q.kind === "meet") {
          const L = lineNamed(q.line, id);
          const S = planeNamed(q.plane, id);
          const along = dt(L.u, S.n);
          if (Math.abs(along) < 1e-9) throw new ParamError(`${id}: ${L.id} is parallel to ${S.id}, so they do not meet`);
          at = add(L.a, mul(L.u, (S.d - dt(S.n, L.a)) / along));
        } else {
          throw new ParamError(`${id}: kind must be foot, image or meet`);
        }
        points.push({ id, at, label: label(q, at)!, beat: beatOf(q, "derived") });
      }

      const segments: Seg[] = list(o, "segments", 6).map((q, i) => ({ from: pointAt(q.from, `segments[${i}]`), to: pointAt(q.to, `segments[${i}]`), label: optionalLabel(q, "label"), beat: beatOf(q, "construct") }));

      const isPoint = (v: unknown) => points.some((q) => q.id === v);
      const isLine = (v: unknown) => lines.some((q) => q.id === v);
      const isPlane = (v: unknown) => planes.some((q) => q.id === v);
      const a = obj(o.ask);
      let ask: Ask;
      if (a.kind === "distance") {
        if (![a.from, a.to].every((v) => isPoint(v) || isLine(v) || isPlane(v))) throw new ParamError("ask: distance needs from and to naming a point, line or plane");
        ask = { kind: "distance", from: a.from as string, to: a.to as string };
      } else if (a.kind === "angle") {
        if (!Array.isArray(a.between) || a.between.length !== 2 || !a.between.every((v) => isLine(v) || isPlane(v))) throw new ParamError("ask: angle needs between naming two, each a line or plane");
        ask = { kind: "angle", between: [a.between[0], a.between[1]] as [string, string] };
      } else if (a.kind === "projection") {
        if (!isPoint(a.from) || !isPoint(a.to)) throw new ParamError("ask: projection runs from a point to a point");
        if (!isPlane(a.onto)) throw new ParamError("ask: projection needs onto naming a plane");
        ask = { kind: "projection", from: a.from as string, to: a.to as string, onto: a.onto as string };
      } else if (a.kind === "coord") {
        if (!isPoint(a.point)) throw new ParamError("ask: coord needs a point");
        const axis = { x: 0, y: 1, z: 2 }[String(a.axis)];
        if (axis === undefined) throw new ParamError('ask: axis must be "x", "y" or "z"');
        ask = { kind: "coord", point: a.point as string, axis: axis as 0 | 1 | 2 };
      } else {
        throw new ParamError("ask.kind must be distance, angle, projection or coord");
      }
      if (a.squared !== undefined && typeof a.squared !== "boolean") throw new ParamError("ask: squared must be true or false");
      const times = a.times === undefined ? 1 : finite(a, "times");
      if (times === 0) throw new ParamError("ask: times must not be 0");

      let view: SpaceParams["view"] = null;
      if (o.view !== undefined) {
        const vw = obj(o.view);
        view = { az: finite(vw, "az", { min: -180, max: 180 }), el: finite(vw, "el", { min: 5, max: 60 }) };
      }
      return { points, lines, planes, segments, ask, askLabel: optionalLabel(a, "label", 32), report: { squared: a.squared === true, times }, view };
    }),

  check: (p) => spaceFacts(p).value,

  checkText(p, value) {
    if (!Number.isFinite(value)) return "The drawing has no single value for this.";
    const m = spaceFacts(p).measured;
    const v = num(m, 4);
    const base = {
      distance: `The shortest distance measured on the drawing is ${v}.`,
      angle: `The angle measured on the drawing is ${num((m * 180) / Math.PI, 2)}° (${v} rad).`,
      projection: `The projection measured on the plane is ${v} long.`,
      coord: `The point's coordinate is ${v}.`,
    }[p.ask.kind];
    const how = [p.report.squared ? "squared" : "", p.report.times !== 1 ? `times ${num(p.report.times)}` : ""].filter(Boolean).join(" and ");
    return how ? `${base} ${how[0].toUpperCase()}${how.slice(1)}, that gives ${num(value, 4)}.` : base;
  },

  viewBox: (p) => ({ w: W, h: layout(p).h }),

  duration: (beat) => ({ given: 1600, derived: 1400, construct: 1300, answer: 1400 })[beat] ?? 1300,

  frame(p, state) {
    return drawFrame(p, state);
  },
};

// --- view -----------------------------------------------------------------

const W = 340;
/** The band above the drawing holds the axis tripod (left) and the header (right). */
const TOP = 48;
const MARGIN = 16;

function basis(azDeg: number, elDeg: number) {
  const az = (azDeg * Math.PI) / 180;
  const el = (elDeg * Math.PI) / 180;
  const camera: V3 = [Math.cos(el) * Math.cos(az), Math.cos(el) * Math.sin(az), Math.sin(el)];
  const right = unit([-camera[1], camera[0], 0]);
  return { camera, right, up: cross(camera, right) };
}

const viewCache = new WeakMap<SpaceParams, { az: number; el: number; camera: V3; right: V3; up: V3 }>();

/**
 * The view: the visual's own, or the one (az every 15 degrees, el 15 to 40) where
 * every plane faces the viewer best and the answer's segment or angle arc is
 * least foreshortened, with a slight pull toward the usual textbook view.
 */
export function spaceView(p: SpaceParams) {
  const hit = viewCache.get(p);
  if (hit) return hit;
  let chosen = p.view;
  if (!chosen) {
    const mk = spaceFacts(p).mark;
    let bestScore = -Infinity;
    chosen = { az: 35, el: 22 };
    for (let az = -180; az < 180; az += 15) {
      for (const el of [15, 22, 30, 40]) {
        const { camera } = basis(az, el);
        const facing = p.planes.length ? Math.min(...p.planes.map((s) => Math.abs(dt(s.n, camera)))) : 1;
        let shown = 1;
        const along = (a: V3, b: V3) => {
          const d = sub(b, a);
          const m = len(d);
          return m < 1e-9 ? 1 : Math.sqrt(Math.max(0, 1 - (dt(d, camera) / m) ** 2));
        };
        if (mk.kind === "segment" || mk.kind === "coord") shown = along(mk.from, mk.to);
        if (mk.kind === "projection") shown = along(mk.a2, mk.b2);
        if (mk.kind === "angle") {
          const m = cross(mk.u, mk.v);
          shown = len(m) < 1e-9 ? 1 : Math.abs(dt(unit(m), camera));
        }
        const score = Math.min(facing, 0.7) + Math.min(shown, 0.9) - 0.002 * Math.abs(az - 35) / 15 - 0.004 * Math.abs(el - 22);
        if (score > bestScore) {
          bestScore = score;
          chosen = { az, el };
        }
      }
    }
  }
  const out = { ...chosen, ...basis(chosen.az, chosen.el) };
  viewCache.set(p, out);
  return out;
}

interface Layout {
  h: number;
  /** World point to screen point, and its depth toward the camera. */
  px: (q: V3) => [number, number];
  depth: (q: V3) => number;
  camera: V3;
  /** Drawn extent of each line: its two ends. */
  lineEnds: Record<string, [V3, V3]>;
  /** Each plane's patch corners, in order. */
  patches: Record<string, V3[]>;
  size: number;
}

const layoutCache = new WeakMap<SpaceParams, Layout>();

function layout(p: SpaceParams): Layout {
  const hit = layoutCache.get(p);
  if (hit) return hit;
  const facts = spaceFacts(p);
  const { camera, right, up } = spaceView(p);

  // What the picture must show: every point and the answer's own points.
  const core: V3[] = [...Object.values(facts.points)];
  const mk = facts.mark;
  if (mk.kind === "segment" || mk.kind === "coord") core.push(mk.from, mk.to);
  if (mk.kind === "projection") core.push(mk.a, mk.b, mk.a2, mk.b2);
  if (mk.kind === "angle") core.push(mk.at);
  if (!core.length) {
    for (const l of p.lines) core.push(l.a);
    for (const s of p.planes) core.push(mul(s.n, s.d));
  }
  const c = mul(core.reduce((s, q) => add(s, q), [0, 0, 0] as V3), 1 / core.length);
  for (const l of p.lines) core.push(footOnLine(c, l));
  for (const s of p.planes) core.push(footOnPlane(c, s));
  const E = Math.max(1.5, ...core.map((q) => len(sub(q, c))));

  const lineEnds: Record<string, [V3, V3]> = {};
  for (const l of p.lines) {
    const ts = core.map((q) => dt(sub(q, l.a), l.u));
    const t0 = Math.min(-E * 0.6, ...ts) - 0.35 * E;
    const t1 = Math.max(E * 0.6, ...ts) + 0.35 * E;
    lineEnds[l.id] = [add(l.a, mul(l.u, t0)), add(l.a, mul(l.u, t1))];
  }
  const patches: Record<string, V3[]> = {};
  for (const s of p.planes) {
    const anchor = footOnPlane(c, s);
    const e1 = perpendicular(s.n);
    const e2 = cross(s.n, e1);
    let h1 = 0.7 * E;
    let h2 = 0.7 * E;
    for (const q of core) {
      const r = sub(footOnPlane(q, s), anchor);
      h1 = Math.max(h1, Math.abs(dt(r, e1)) + 0.25 * E);
      h2 = Math.max(h2, Math.abs(dt(r, e2)) + 0.25 * E);
    }
    patches[s.id] = [
      add(anchor, add(mul(e1, -h1), mul(e2, -h2))),
      add(anchor, add(mul(e1, h1), mul(e2, -h2))),
      add(anchor, add(mul(e1, h1), mul(e2, h2))),
      add(anchor, add(mul(e1, -h1), mul(e2, h2))),
    ];
  }

  // Fit everything drawn into the box, one scale for both screen axes.
  const all: V3[] = [...core, ...Object.values(lineEnds).flat(), ...Object.values(patches).flat()];
  const sx = all.map((q) => dt(q, right));
  const sy = all.map((q) => dt(q, up));
  const [x0, x1, y0, y1] = [Math.min(...sx), Math.max(...sx), Math.min(...sy), Math.max(...sy)];
  const bw = Math.max(1e-9, x1 - x0);
  const bh = Math.max(1e-9, y1 - y0);
  const scale = Math.min((W - 2 * MARGIN) / bw, (350 - TOP - MARGIN) / bh);
  const h = Math.max(240, TOP + bh * scale + MARGIN);
  const ox = MARGIN + ((W - 2 * MARGIN) - bw * scale) / 2;
  const oy = TOP + ((h - TOP - MARGIN) - bh * scale) / 2;
  const out: Layout = {
    h,
    px: (q) => [ox + (dt(q, right) - x0) * scale, oy + (y1 - dt(q, up)) * scale],
    depth: (q) => dt(q, camera),
    camera,
    lineEnds,
    patches,
    size: E,
  };
  layoutCache.set(p, out);
  return out;
}

function inPolygon([x, y]: [number, number], poly: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function drawFrame(p: SpaceParams, { played, t }: { played: readonly string[]; t: number }): Shape[] {
  const facts = spaceFacts(p);
  const L = layout(p);
  const H = L.h;
  const prog = (beat: string) => {
    const i = played.indexOf(beat);
    if (i === -1) return beat === "given" ? 1 : 0;
    return i === played.length - 1 ? t : 1;
  };
  const share = (beat: Beat, index: number, count: number) => Math.max(0, Math.min(1, prog(beat) * count - index));

  const patchPx = Object.fromEntries(Object.entries(L.patches).map(([id, cs]) => [id, cs.map(L.px)])) as Record<string, [number, number][]>;
  /** Is a world point hidden behind a drawn plane (on its far side and inside its patch on screen)? */
  const hidden = (q: V3, shownPlanes: Pl[]) =>
    shownPlanes.some((s) => (dt(s.n, q) - s.d) * dt(s.n, L.camera) < -1e-9 && inPolygon(L.px(q), patchPx[s.id]));

  const under: Shape[] = [];
  const draw: Shape[] = [];
  const over: Shape[] = [];
  const obstacles: [number, number][] = [];

  // Orientation tripod, top left.
  const tri: V3[] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  const o2 = L.px([0, 0, 0]);
  const tx = 24;
  const ty = 28;
  ["x", "y", "z"].forEach((name, i) => {
    const e = L.px(tri[i]);
    const v: [number, number] = [e[0] - o2[0], e[1] - o2[1]];
    const m = Math.hypot(v[0], v[1]) || 1;
    const end: [number, number] = [tx + (v[0] / m) * 13, ty + (v[1] / m) * 13];
    under.push(line(tx, ty, end[0], end[1], { stroke: "muted", width: 1.2 }));
    over.push(text(tx + (v[0] / m) * 20, ty + (v[1] / m) * 20 + 3, name, { tone: "muted", size: 10, anchor: "middle" }));
    obstacles.push(end, [tx + (v[0] / m) * 20, ty + (v[1] / m) * 20]);
  });

  // Labels avoid everything that will ever be drawn, so they keep their place.
  const sample = (a: V3, b: V3, n: number) => {
    for (let i = 0; i <= n; i++) obstacles.push(L.px(add(a, mul(sub(b, a), i / n))));
  };
  for (const l of p.lines) sample(...L.lineEnds[l.id], 60);
  for (const s of p.planes) L.patches[s.id].forEach((q, i, cs) => sample(q, cs[(i + 1) % 4], 30));
  for (const sg of p.segments) sample(sg.from, sg.to, 20);
  for (const q of p.points) obstacles.push(L.px(q.at));
  const mk = facts.mark;
  if (mk.kind === "segment" || mk.kind === "coord") sample(mk.from, mk.to, 30);
  if (mk.kind === "projection") {
    sample(mk.a2, mk.b2, 30);
    sample(mk.a, mk.a2, 15);
    sample(mk.b, mk.b2, 15);
  }
  if (mk.kind === "angle") {
    sample(mk.at, add(mk.at, mul(mk.u, L.size * 0.6)), 15);
    sample(mk.at, add(mk.at, mul(mk.v, L.size * 0.6)), 15);
  }

  const place = (anchors: [number, number][], label: string, size: number) => {
    const wdt = label.length * size * 0.56;
    let best: { x: number; y: number; anchor: "start" | "end"; from: [number, number]; far: boolean } | null = null;
    let bestScore = -Infinity;
    for (const a of anchors) {
      for (const ox of [8, 22, 42, 70]) {
        for (const oy of [-9, -24, -42, -64, 18, 33, 50, 72]) {
          for (const anchor of ["start", "end"] as const) {
            const sx = anchor === "start" ? a[0] + ox : a[0] - ox;
            const sy = a[1] + oy;
            const left = anchor === "start" ? sx : sx - wdt;
            if (left < 2 || left + wdt > W - 2 || sy - size < TOP - 2 || sy > H - 4) continue;
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
    const b = best ?? { x: Math.min(W - 2, anchors[0][0] + 8), y: Math.max(TOP + 10, anchors[0][1] - 9), anchor: "start" as const, from: anchors[0], far: false };
    const left = b.anchor === "start" ? b.x : b.x - wdt;
    for (let i = 0; i <= 6; i++) for (const dy of [-0.8, -0.35, 0.1]) obstacles.push([left + (wdt * i) / 6, b.y + size * dy]);
    return b;
  };
  type Placed = ReturnType<typeof place>;
  const labelShapes = (pl: Placed, label: string, tone: "fg" | "brand" | "amber" | "good", size: number, opacity = 1): Shape[] => [
    ...(pl.far ? [line(pl.from[0], pl.from[1], pl.x + (pl.anchor === "start" ? -3 : 3), pl.y - 4, { stroke: tone, width: 1, opacity: 0.6 * opacity })] : []),
    text(pl.x, pl.y, label, { tone, size, weight: 600, anchor: pl.anchor, opacity }),
  ];

  // Place every label once, in a fixed order.
  const planeLabel = new Map<string, Placed>();
  for (const s of p.planes) if (s.label) planeLabel.set(s.id, place(L.patches[s.id].map(L.px), s.label, 11));
  const lineLabel = new Map<string, Placed>();
  for (const l of p.lines) {
    const [a, b] = L.lineEnds[l.id];
    if (l.label) lineLabel.set(l.id, place([0.9, 0.1, 0.5].map((f) => L.px(add(a, mul(sub(b, a), f)))), l.label, 11));
  }
  const pointLabel = new Map<string, Placed>();
  for (const q of p.points) if (q.label) pointLabel.set(q.id, place([L.px(q.at)], q.label, 11));

  // Planes shown so far hide what is behind them.
  const shownPlanes = p.planes.filter((s) => prog(s.beat) > 0);

  type Item = { beat: Beat; draw: (k: number) => void };
  const items: Item[] = [];
  for (const s of p.planes) {
    items.push({
      beat: s.beat,
      draw: (k) => {
        const cs = patchPx[s.id];
        under.push({ kind: "path", d: "M" + cs.map((q) => q.map((v) => Math.round(v * 100) / 100).join(" ")).join(" L") + " Z", fill: "soft", stroke: "brand", width: 1.2, opacity: 0.85 * k });
        const lab = planeLabel.get(s.id);
        if (lab && k > 0.5 && s.label) over.push(...labelShapes(lab, s.label, "brand", 11, Math.min(1, (k - 0.5) * 2)));
      },
    });
  }
  for (const l of p.lines) {
    items.push({
      beat: l.beat,
      draw: (k) => {
        const [a, b] = L.lineEnds[l.id];
        const n = 60;
        const upto = Math.round(n * k);
        // Runs of visible and hidden pieces, each drawn as one straight line.
        let start = 0;
        let state = hidden(add(a, mul(sub(b, a), 0.5 / n)), shownPlanes);
        const flush = (i0: number, i1: number, hid: boolean) => {
          if (i1 <= i0) return;
          const [p0, p1] = [L.px(add(a, mul(sub(b, a), i0 / n))), L.px(add(a, mul(sub(b, a), i1 / n)))];
          draw.push(line(p0[0], p0[1], p1[0], p1[1], hid ? { stroke: "amber", width: 1.8, dash: "4 3", opacity: 0.4 } : { stroke: "amber", width: 2.2, cap: "round" }));
        };
        for (let i = 1; i < upto; i++) {
          const hid = hidden(add(a, mul(sub(b, a), (i + 0.5) / n)), shownPlanes);
          if (hid !== state) {
            flush(start, i, state);
            start = i;
            state = hid;
          }
        }
        flush(start, upto, state);
        const lab = lineLabel.get(l.id);
        if (lab && k > 0.6 && l.label) over.push(...labelShapes(lab, l.label, "amber", 11));
      },
    });
  }
  for (const sg of p.segments) {
    items.push({
      beat: sg.beat,
      draw: (k) => {
        const [a, b] = [L.px(sg.from), L.px(sg.to)];
        draw.push(line(a[0], a[1], a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, { stroke: "fg", width: 1.6, dash: "5 4" }));
      },
    });
  }
  for (const q of p.points) {
    items.push({
      beat: q.beat,
      draw: (k) => {
        const [x, y] = L.px(q.at);
        const faint = hidden(q.at, shownPlanes);
        over.push(dotShape(x, y, 4 * Math.min(1, k * 1.6), "fg", { stroke: "card", width: 1.5, opacity: faint ? 0.45 : 1 }));
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

  // The answer.
  const pa = prog("answer");
  if (pa > 0 && played.includes("answer")) {
    const seg = (a: V3, b: V3, style: "strong" | "guide") => {
      const [p0, p1] = [L.px(a), L.px(b)];
      if (style === "guide") draw.push(line(p0[0], p0[1], p1[0], p1[1], { stroke: "muted", width: 1.4, dash: "4 4" }));
      else over.push(line(p0[0], p0[1], p0[0] + (p1[0] - p0[0]) * pa, p0[1] + (p1[1] - p0[1]) * pa, { stroke: "good", width: 4, cap: "round" }));
    };
    const ends = (a: V3, b: V3) => {
      if (pa < 1) return;
      for (const q of [a, b]) {
        const [x, y] = L.px(q);
        over.push(dotShape(x, y, 3.5, "good"));
      }
    };
    if (mk.kind === "segment" || mk.kind === "coord") {
      seg(mk.from, mk.to, "strong");
      ends(mk.from, mk.to);
    } else if (mk.kind === "projection") {
      seg(mk.a, mk.a2, "guide");
      seg(mk.b, mk.b2, "guide");
      seg(mk.a2, mk.b2, "strong");
      ends(mk.a2, mk.b2);
    } else if (mk.kind === "angle") {
      const r = L.size * 0.45;
      const w = sub(mk.v, mul(mk.u, dt(mk.v, mk.u)));
      const wn = len(w) > 1e-9 ? unit(w) : perpendicular(mk.u);
      const arc: [number, number][] = [];
      for (let i = 0; i <= 24; i++) {
        const th = (mk.angle * pa * i) / 24;
        arc.push(L.px(add(mk.at, add(mul(mk.u, r * Math.cos(th)), mul(wn, r * Math.sin(th))))));
      }
      seg(mk.at, add(mk.at, mul(mk.u, r * 1.4)), "guide");
      seg(mk.at, add(mk.at, mul(mk.v, r * 1.4)), "guide");
      over.push({ kind: "polyline", points: arc, stroke: "good", width: 3 });
    }
    if (pa > 0.6) over.push(text(W - 6, 17, p.askLabel ?? defaultLabel(p, facts.value), { tone: "good", size: 12.5, weight: 700, anchor: "end" }));
  }

  return [...under, ...draw, ...over];
}

function defaultLabel(p: SpaceParams, v: number): string {
  const n = Number.isFinite(v) ? num(v, 3) : "?";
  const name = { distance: "shortest distance", angle: "angle (rad)", projection: "projection", coord: "coordinate" }[p.ask.kind];
  const what = `${p.report.times !== 1 ? `${num(p.report.times)} × ` : ""}${p.report.squared ? `(${name})²` : name}`;
  return `${what} = ${n}`;
}
