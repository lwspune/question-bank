/**
 * Circle arc: arc length, radius and the angle at the centre (s = rθ).
 * Params: radius, arc (same unit), unit, optional arcLabel / radiusLabel
 * (plain text such as "π"). Beats: oneRadian (an arc equal to the radius is
 * 1 rad), compare (the arc grows to its length beside a radius ruler), angle
 * (the sector, its angle, and how many fit in a turn when that is a whole number).
 */
import { arcPath, dot, line, num, onCircle, sectorPath, text, TAU } from "../geometry";
import { finite, obj, optionalLabel, ParamError, plainLabel, safely } from "../params";
import type { Scene, Shape } from "../types";

export interface CircleArcParams {
  radius: number;
  arc: number;
  unit: string;
  arcLabel: string;
  radiusLabel: string;
}

const CX = 100;
const CY = 125;
const R = 80;
const RIGHT = 206;
const RULER_FITS = 1.6; // a bar of 80θ px fits beside the circle up to θ ≈ 1.6

/** θ as a fraction of π when it is one (π/4, 2π/3, 3π), else null. */
export function piFraction(theta: number): string | null {
  for (let k = 1; k <= 12; k++) {
    const m = Math.round((theta * k) / Math.PI);
    if (m > 0 && Math.abs(theta - (m * Math.PI) / k) < 1e-9) {
      let g = m;
      let d = k;
      for (let x = Math.min(g, d); x > 1; x--) if (g % x === 0 && d % x === 0) { g /= x; d /= x; }
      const top = g === 1 ? "π" : `${g}π`;
      return d === 1 ? top : `${top}/${d}`;
    }
  }
  return null;
}

function base(theta: number, radiusLabel: string): Shape[] {
  const [ax, ay] = onCircle(CX, CY, R, theta);
  const out: Shape[] = [{ kind: "circle", cx: CX, cy: CY, r: R, stroke: "line", width: 2 }];
  if (theta > 1e-6) {
    out.push({ kind: "path", d: sectorPath(CX, CY, R, theta), fill: "soft" });
    out.push({ kind: "path", d: arcPath(CX, CY, R, 0, theta), stroke: "amber", width: 5, cap: "round" });
  }
  out.push(
    line(CX, CY, CX + R, CY, { stroke: "brand", width: 3, cap: "round" }),
    line(CX, CY, ax, ay, { stroke: "fg", width: 2 }),
    dot(CX, CY, 3.5, "fg"),
    text(CX + R / 2, CY + 18, radiusLabel, { tone: "brand", weight: 600, anchor: "middle" }),
  );
  return out;
}

function ruler(y: number, len: number, unitPx: number, units: number, tone: "brand" | "amber", label: string): Shape[] {
  const out: Shape[] = [line(RIGHT, y, RIGHT + len, y, { stroke: tone, width: 7, cap: "butt" }), text(RIGHT, y - 10, label, { tone: "muted", size: 11.5 })];
  for (let c = 0; c <= Math.floor(units + 1e-9); c++) {
    const x = RIGHT + c * unitPx;
    if (x <= RIGHT + len + 0.01) out.push(line(x, y + 6, x, y + 11, { stroke: "muted", width: 1.2 }));
  }
  return out;
}

export const circleArc: Scene<CircleArcParams> = {
  id: "circleArc",
  beats: ["oneRadian", "compare", "angle"],

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      const radius = finite(o, "radius");
      const arc = finite(o, "arc");
      if (!(radius > 0) || !(arc > 0)) throw new ParamError("radius and arc must be positive");
      if (arc / radius > TAU + 1e-9) throw new ParamError("the arc is longer than the whole circle");
      const unit = plainLabel(o.unit ?? "cm", "unit", 6);
      return {
        radius,
        arc,
        unit,
        arcLabel: optionalLabel(o, "arcLabel") ?? num(arc),
        radiusLabel: optionalLabel(o, "radiusLabel") ?? `${num(radius)} ${unit}`,
      };
    }),

  check: (p) => p.arc / p.radius,

  checkText: (p, value) => `Arc ÷ radius on the drawing = ${num(p.arc)} ÷ ${num(p.radius)} = ${value.toFixed(3)} rad.`,

  viewBox: () => ({ w: 340, h: 240 }),

  duration: (beat) => ({ oneRadian: 1500, compare: 1800, angle: 1400 })[beat] ?? 1500,

  frame(p, { played, t }) {
    const mode = played[played.length - 1];
    const theta = p.arc / p.radius;
    const unitPx = R / p.radius;
    const rulers = theta <= RULER_FITS;

    if (mode === "oneRadian") {
      const th = t;
      const [mx, my] = onCircle(CX, CY, R + 12, th / 2);
      const out = [...base(th, "r")];
      if (t > 0.3) out.push(text(mx + 4, my, "arc = r", { tone: "amber", weight: 700 }));
      out.push(
        text(CX + 22, CY - 6, `${th.toFixed(2)} rad`, { size: 11, weight: 600 }),
        text(RIGHT, 112, "arc length = r × θ", { weight: 600 }),
        text(RIGHT, 138, "arc = r  →  θ = 1 rad", { tone: "muted", size: 12.5 }),
      );
      if (t === 1) out.push(text(RIGHT, 176, "1 rad ≈ 57.3°", { size: 19, weight: 700 }));
      return out;
    }

    const showRulers = (grow: number): Shape[] =>
      rulers
        ? [
            ...ruler(70, R, unitPx, p.radius, "brand", `radius · ${p.radiusLabel}`),
            ...ruler(126, R * theta * grow, unitPx, p.arc, "amber", `arc · ${p.arcLabel}${p.arcLabel === num(p.arc) ? "" : ` ≈ ${num(p.arc)}`} ${p.unit}`),
          ]
        : [text(RIGHT, 92, `arc = ${p.arcLabel} ${p.unit}`, { weight: 600 }), text(RIGHT, 118, `radius = ${p.radiusLabel}`, { weight: 600 })];

    const equation = `${num(p.radius)}θ = ${p.arcLabel}`;

    if (mode === "compare") {
      return [...base(theta * t, p.radiusLabel), ...showRulers(t), ...(t === 1 ? [text(RIGHT, 184, equation, { size: 19, weight: 700 })] : [])];
    }

    // angle
    const frac = piFraction(theta);
    const k = Math.round(TAU / theta);
    const slices = Math.abs(TAU / theta - k) < 1e-9 && k >= 2 && k <= 12 ? k : 0;
    const out: Shape[] = [];
    for (let j = 1; j < slices; j++) {
      const [x, y] = onCircle(CX, CY, R, j * theta);
      out.push(line(CX, CY, x, y, { stroke: "muted", width: 1, dash: "3 4", opacity: t }));
    }
    const [lx, ly] = onCircle(CX, CY, 30, theta / 2);
    out.push(
      ...base(theta, p.radiusLabel),
      { kind: "path", d: arcPath(CX, CY, 18, 0, theta), stroke: "fg", width: 1.5 },
      text(lx + 4, ly + 4, frac ?? theta.toFixed(2), { size: 12, weight: 700 }),
      ...showRulers(1),
      text(RIGHT, 180, `θ = ${frac ?? theta.toFixed(3)} rad`, { size: 19, weight: 700, tone: "good" }),
      text(RIGHT, 202, slices ? `= ${num((theta * 180) / Math.PI, 1)}°, 1/${slices} of a turn` : `= ${num((theta * 180) / Math.PI, 1)}°`, {
        tone: "muted",
        size: 11.5,
        opacity: Math.max(0.15, t),
      }),
    );
    return out;
  },
};
