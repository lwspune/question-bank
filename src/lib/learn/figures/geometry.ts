// Copied from Concept Ladder (src/figures/geometry.ts, afca8bf).
import type { Figure, Pt } from "../types";

/**
 * Geometry for Argand-plane figures. Plane coordinates are [re, im]; SVG
 * coordinates are pixels in a frame WIDTH wide, with the imaginary axis up.
 * Equal scale on both axes, so circles stay round.
 */

export type View = Figure["view"];

export const WIDTH = 400;
/** A chart's plot height; its x and y scales differ. */
export const CHART_HEIGHT = 240;

export type Frame = {
  width: number;
  height: number;
  /** Pixels per unit. */
  scale: number;
  px: (p: Pt) => [number, number];
};

export function frameFor(view: View, chart?: Figure["chart"]): Frame {
  const [x0, x1] = view.x;
  const [y0, y1] = view.y;
  const scale = WIDTH / (x1 - x0);
  const yScale = chart ? CHART_HEIGHT / (y1 - y0) : scale;
  return {
    width: WIDTH,
    height: (y1 - y0) * yScale,
    scale,
    px: ([x, y]) => [(x - x0) * scale, (y1 - y) * yScale],
  };
}

/** A chart's ticks: every multiple of `step` from lo to hi, both ends included. */
export function chartTicks(lo: number, hi: number, step: number): number[] {
  const out: number[] = [];
  for (let k = Math.ceil(lo / step - 1e-9); k * step <= hi + 1e-9; k++) out.push(Math.round(k * step * 1e6) / 1e6);
  return out;
}

/** Rounds to 2 decimals for compact SVG paths (and avoids "-0"). */
export function fmt(n: number): string {
  const r = Math.round(n * 100) / 100;
  return String(r === 0 ? 0 : r);
}

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Liang–Barsky: the part of p + t·d with t in [tMin, tMax] inside the view, or null. */
function clipParametric(view: View, p: Pt, d: Pt, tMin: number, tMax: number): [Pt, Pt] | null {
  let t0 = tMin;
  let t1 = tMax;
  const edges: [number, number][] = [
    [-d[0], p[0] - view.x[0]],
    [d[0], view.x[1] - p[0]],
    [-d[1], p[1] - view.y[0]],
    [d[1], view.y[1] - p[1]],
  ];
  for (const [q, r] of edges) {
    if (q === 0) {
      if (r < 0) return null; // parallel to this edge and outside it
      continue;
    }
    const t = r / q;
    if (q < 0) t0 = Math.max(t0, t);
    else t1 = Math.min(t1, t);
  }
  if (t0 > t1) return null;
  return [
    [p[0] + t0 * d[0], p[1] + t0 * d[1]],
    [p[0] + t1 * d[0], p[1] + t1 * d[1]],
  ];
}

/** The visible part of the whole line through a and b. */
export function clipLine(view: View, a: Pt, b: Pt): [Pt, Pt] | null {
  return clipParametric(view, a, [b[0] - a[0], b[1] - a[1]], -Infinity, Infinity);
}

/** The visible part of the ray from `from` in direction `angle` degrees. */
export function clipRay(view: View, from: Pt, angle: number): [Pt, Pt] | null {
  return clipParametric(view, from, [Math.cos(rad(angle)), Math.sin(rad(angle))], 0, Infinity);
}

const onCircle = (c: Pt, r: number, deg: number): Pt => [c[0] + r * Math.cos(rad(deg)), c[1] + r * Math.sin(rad(deg))];

/** Anticlockwise span from `from` to `to`, in (0, 360]. */
function span(from: number, to: number): number {
  const s = (((to - from) % 360) + 360) % 360;
  return s === 0 && to !== from ? 360 : s;
}

/**
 * SVG path for an arc of the circle (centre, r), anticlockwise from `from` to
 * `to` degrees. With the imaginary axis up, anticlockwise on the plane is
 * anticlockwise on screen: SVG sweep-flag 0.
 */
export function arcPath(f: Frame, centre: Pt, r: number, from: number, to: number): string {
  const s = span(from, to);
  const R = fmt(r * f.scale);
  const pt = (deg: number) => f.px(onCircle(centre, r, deg)).map(fmt).join(" ");
  if (s >= 360) {
    return `M ${pt(from)} A ${R} ${R} 0 1 0 ${pt(from + 180)} A ${R} ${R} 0 1 0 ${pt(from)}`;
  }
  return `M ${pt(from)} A ${R} ${R} 0 ${s > 180 ? 1 : 0} 0 ${pt(from + s)}`;
}

/** Arrowhead triangle at `to`, pointing away from `from`; `size` in pixels. */
export function arrowHead(f: Frame, from: Pt, to: Pt, size = 11): string {
  const [ax, ay] = f.px(from);
  const [bx, by] = f.px(to);
  const len = Math.hypot(bx - ax, by - ay) || 1;
  const ux = (bx - ax) / len;
  const uy = (by - ay) / len;
  const back = [bx - ux * size, by - uy * size];
  const wing = size * 0.45;
  return [
    [bx, by],
    [back[0] - uy * wing, back[1] + ux * wing],
    [back[0] + uy * wing, back[1] - ux * wing],
  ]
    .map((p) => p.map(fmt).join(","))
    .join(" ");
}

/** The view enlarged by its own size on every side, so fills reach past the edges. */
function bigRect(view: View): Pt[] {
  const w = view.x[1] - view.x[0];
  const h = view.y[1] - view.y[0];
  const [x0, x1, y0, y1] = [view.x[0] - w, view.x[1] + w, view.y[0] - h, view.y[1] + h];
  return [
    [x0, y0],
    [x1, y0],
    [x1, y1],
    [x0, y1],
  ];
}

/** Sutherland–Hodgman against one edge: the part of the (enlarged) view left of a→b. */
export function halfPlanePolygon(view: View, a: Pt, b: Pt): Pt[] {
  const side = (p: Pt) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
  const poly = bigRect(view);
  const out: Pt[] = [];
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    const sp = side(p);
    const sq = side(q);
    if (sp >= 0) out.push(p);
    if ((sp >= 0) !== (sq >= 0)) {
      const t = sp / (sp - sq);
      out.push([p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]);
    }
  }
  return out;
}

export function polygonPath(f: Frame, poly: Pt[]): string {
  if (poly.length === 0) return "";
  return poly.map((p, i) => `${i === 0 ? "M" : "L"} ${f.px(p).map(fmt).join(" ")}`).join(" ") + " Z";
}

/** A sector from `centre`, anticlockwise from `from` to `to` degrees, reaching past the view. */
export function sectorPath(f: Frame, view: View, centre: Pt, from: number, to: number): string {
  const s = span(from, to);
  if (s >= 360) return polygonPath(f, bigRect(view));
  const corners = bigRect(view);
  const R = Math.max(...corners.map(([x, y]) => Math.hypot(x - centre[0], y - centre[1])));
  const c = f.px(centre).map(fmt).join(" ");
  const p = (deg: number) => f.px(onCircle(centre, R, deg)).map(fmt).join(" ");
  const Rp = fmt(R * f.scale);
  return `M ${c} L ${p(from)} A ${Rp} ${Rp} 0 ${s > 180 ? 1 : 0} 0 ${p(from + s)} Z`;
}

/** The enlarged view with a circular hole: fill with even-odd to keep the outside of the disc. */
export function outsideDiscPath(f: Frame, view: View, centre: Pt, r: number): string {
  return `${polygonPath(f, bigRect(view))} ${arcPath(f, centre, r, 0, 360)} Z`;
}

/** Whole-number ticks strictly inside (lo, hi), skipping 0, thinned to at most ten. */
export function ticks(lo: number, hi: number): number[] {
  for (const step of [1, 2, 5, 10, 20, 50, 100]) {
    const out: number[] = [];
    for (let v = Math.ceil(lo / step) * step; v < hi; v += step) {
      if (v > lo && v !== 0) out.push(v);
    }
    if (out.length <= 10) return out;
  }
  return [];
}

/**
 * Points along one branch of a hyperbola, from below (or left of) the view to
 * beyond it, so the frame clips the ends. Opening along x:
 * (cx + branch·a·cosh t, cy + b·sinh t); along y, the same with the axes swapped.
 */
export function hyperbolaPoints(view: View, centre: Pt, a: number, b: number, axis: "x" | "y", branch: 1 | -1, samples = 96): Pt[] {
  const [cx, cy] = centre;
  const reach = Math.max(...[...view.x, ...view.y].map((v, i) => Math.abs(v - (i < 2 ? cx : cy))));
  const tMax = Math.asinh((reach * 1.5) / b) + 0.1;
  const out: Pt[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = -tMax + (2 * tMax * i) / samples;
    const along = branch * a * Math.cosh(t);
    const across = b * Math.sinh(t);
    out.push(axis === "x" ? [cx + along, cy + across] : [cx + across, cy + along]);
  }
  return out;
}
