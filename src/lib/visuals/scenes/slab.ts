/**
 * Glass slab: a ray through a parallel-sided slab and its lateral shift,
 * Δ = t sin(i − r) / cos r. Drawn to scale, so the shift drawn is the shift
 * checked. Params: thickness (cm), mu, incidence ("critical" or degrees),
 * optional thicknessLabel / muLabel. Beats: incidence, refraction, emergence, shift.
 */
import { arcPath, arrowHead, lerp, line, num, onCircle, text } from "../geometry";
import { finite, obj, optionalLabel, ParamError, safely } from "../params";
import type { Scene, Shape, Tone } from "../types";

export interface SlabParams {
  thickness: number;
  mu: number;
  incidence: number; // radians
  critical: boolean;
  thicknessLabel: string;
  muLabel: string;
}

type Pt = [number, number];

const TOP = 60;
const BOT = 226;
const ENTRY_X = 110;

export function slabGeometry(p: SlabParams) {
  const scale = (BOT - TOP) / p.thickness; // px per cm
  const i = p.incidence;
  const r = Math.asin(Math.sin(i) / p.mu);
  const entry: Pt = [ENTRY_X, TOP];
  const exit: Pt = [ENTRY_X + (BOT - TOP) * Math.tan(r), BOT];
  const u: Pt = [Math.sin(i), Math.cos(i)]; // direction of travel in air (screen y down)
  const start: Pt = [entry[0] - 70 * u[0], entry[1] - 70 * u[1]];
  const out: Pt = [exit[0] + 60 * u[0], exit[1] + 60 * u[1]];
  const along = (exit[0] - entry[0]) * u[0] + (exit[1] - entry[1]) * u[1];
  const foot: Pt = [entry[0] + along * u[0], entry[1] + along * u[1]];
  const dashEnd: Pt = [entry[0] + (along + 75) * u[0], entry[1] + (along + 75) * u[1]];
  return { scale, i, r, entry, exit, u, start, out, foot, dashEnd };
}

function ray(a: Pt, b: Pt, q: number, tone: Tone): Shape[] {
  const e = lerp(a, b, q);
  const shapes: Shape[] = [line(a[0], a[1], e[0], e[1], { stroke: tone, width: 3, cap: "round" })];
  if (q > 0.55) {
    const m = lerp(a, b, 0.55);
    shapes.push(arrowHead(m[0], m[1], Math.atan2(b[1] - a[1], b[0] - a[0]), tone));
  }
  return shapes;
}

const deg = (rad: number) => num((rad * 180) / Math.PI, 1);

export const slab: Scene<SlabParams> = {
  id: "slab",
  beats: ["incidence", "refraction", "emergence", "shift"],

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      const thickness = finite(o, "thickness");
      if (!(thickness > 0) || thickness > 100) throw new ParamError("thickness must be more than 0 and at most 100");
      const mu = finite(o, "mu");
      if (!(mu > 1) || mu > 4) throw new ParamError("mu must be more than 1 and at most 4");
      let incidence: number;
      const critical = o.incidence === "critical";
      if (critical) incidence = Math.asin(1 / mu);
      else {
        const d = finite(o, "incidence");
        if (!(d > 0 && d < 90)) throw new ParamError('incidence must be "critical" or degrees between 0 and 90');
        incidence = (d * Math.PI) / 180;
      }
      return {
        thickness,
        mu,
        incidence,
        critical,
        thicknessLabel: optionalLabel(o, "thicknessLabel") ?? `${num(thickness)} cm`,
        muLabel: optionalLabel(o, "muLabel") ?? num(mu),
      };
    }),

  check: (p) => {
    const r = Math.asin(Math.sin(p.incidence) / p.mu);
    return (p.thickness * Math.sin(p.incidence - r)) / Math.cos(r);
  },

  checkText: (_p, value) => `The gap measured on the to-scale drawing is ${value.toFixed(2)} cm.`,

  viewBox: () => ({ w: 340, h: 290 }),

  duration: (beat) => ({ incidence: 1100, refraction: 1200, emergence: 1300, shift: 1200 })[beat] ?? 1200,

  frame(p, { played, t }) {
    const g = slabGeometry(p);
    const prog = (beat: string) => {
      const k = played.indexOf(beat);
      return k === -1 ? 0 : k === played.length - 1 ? t : 1;
    };
    const s: Shape[] = [
      { kind: "rect", x: 16, y: TOP, w: 308, h: BOT - TOP, fill: "glass" },
      line(16, TOP, 324, TOP, { stroke: "brand", width: 1.5 }),
      line(16, BOT, 324, BOT, { stroke: "brand", width: 1.5 }),
      text(316, TOP + 18, `glass, μ = ${p.muLabel}`, { tone: "muted", size: 11.5, anchor: "end" }),
      text(316, TOP - 8, "air", { tone: "muted", size: 11.5, anchor: "end" }),
      text(316, BOT + 18, "air", { tone: "muted", size: 11.5, anchor: "end" }),
      line(g.entry[0], 20, g.entry[0], 104, { stroke: "muted", width: 1.2, dash: "4 4" }),
    ];

    // The incoming ray is always there; it only animates when its beat is playing.
    const pIn = played.includes("incidence") ? prog("incidence") : 1;
    s.push(...ray(g.start, g.entry, pIn, "fg"));
    s.push({ kind: "path", d: arcPath(g.entry[0], g.entry[1], 26, Math.PI / 2, Math.PI / 2 + g.i), stroke: "fg", width: 1.5 });
    const [ix, iy] = onCircle(g.entry[0], g.entry[1], 40, (Math.PI * 8) / 9);
    s.push(text(ix - 6, iy + 4, `i = ${deg(g.i)}°`, { size: 12, weight: 600, anchor: "end" }));

    const pR = prog("refraction");
    if (pR > 0) {
      s.push(...ray(g.entry, g.exit, pR, "brand"));
      s.push({ kind: "path", d: arcPath(g.entry[0], g.entry[1], 32, -Math.PI / 2, -Math.PI / 2 + g.r), stroke: "brand", width: 1.5 });
      // Right of the refracted ray: 40° below the face, 52 px out.
      const [rx, ry] = onCircle(g.entry[0], g.entry[1], 52, (-Math.PI * 2) / 9);
      s.push(text(rx + 4, ry + 4, `r = ${deg(g.r)}°`, { tone: "brand", size: 12, weight: 600 }));
    }

    const pE = prog("emergence");
    if (pE > 0) {
      const d = lerp(g.entry, g.dashEnd, pE);
      s.push(
        line(g.exit[0], BOT - 30, g.exit[0], BOT + 30, { stroke: "muted", width: 1.2, dash: "4 4" }),
        line(g.entry[0], g.entry[1], d[0], d[1], { stroke: "muted", width: 2, dash: "6 5" }),
        ...ray(g.exit, g.out, pE, "fg"),
      );
    }

    const pS = prog("shift");
    if (pS > 0) {
      const e = lerp(g.foot, g.exit, pS);
      const n: Pt = [g.exit[0] - g.foot[0], g.exit[1] - g.foot[1]];
      const nl = Math.hypot(n[0], n[1]) || 1;
      const nu: Pt = [n[0] / nl, n[1] / nl];
      const A: Pt = [g.foot[0] + 8 * nu[0], g.foot[1] + 8 * nu[1]];
      s.push(
        line(g.foot[0], g.foot[1], e[0], e[1], { stroke: "amber", width: 3.5, cap: "round" }),
        {
          kind: "polyline",
          points: [A, [A[0] + 8 * g.u[0], A[1] + 8 * g.u[1]], [g.foot[0] + 8 * g.u[0], g.foot[1] + 8 * g.u[1]]],
          stroke: "amber",
          width: 1.5,
        },
        line(34, TOP + 4, 34, BOT - 4, { stroke: "fg", width: 1.2 }),
        arrowHead(34, TOP + 2, -Math.PI / 2, "fg"),
        arrowHead(34, BOT - 2, Math.PI / 2, "fg"),
        text(42, (TOP + BOT) / 2 + 4, `t = ${p.thicknessLabel}`, { size: 12, weight: 600 }),
      );
      if (pS > 0.5) {
        const mx = Math.min(320, Math.max(20, (g.foot[0] + g.exit[0]) / 2 - 12));
        const my = Math.min(284, Math.max(12, (g.foot[1] + g.exit[1]) / 2 - 6));
        s.push(text(mx, my, "Δ", { tone: "amber", size: 16, weight: 700, anchor: "middle" }));
      }
    }
    return s;
  },
};
