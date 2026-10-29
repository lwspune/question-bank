/** Small drawing helpers shared by the scenes. Pure. Angles in radians, maths direction (anticlockwise, y up). */
import type { Shape, Style, Tone } from "./types";

export const TAU = Math.PI * 2;

export const round = (n: number) => Math.round(n * 100) / 100;

export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** A point on a circle; screen y grows downward, so sin is subtracted. */
export function onCircle(cx: number, cy: number, r: number, a: number): [number, number] {
  return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
}

/** SVG path for an arc from angle a to b (b > a), drawn anticlockwise. Empty when there is nothing to draw. */
export function arcPath(cx: number, cy: number, r: number, a: number, b: number, move = true): string {
  if (b - a <= 1e-6) return "";
  if (b - a >= TAU - 1e-4) return arcPath(cx, cy, r, a, a + Math.PI, move) + " " + arcPath(cx, cy, r, a + Math.PI, b, false);
  const [x1, y1] = onCircle(cx, cy, r, a);
  const [x2, y2] = onCircle(cx, cy, r, b);
  const large = b - a > Math.PI ? 1 : 0;
  return `${move ? `M${round(x1)} ${round(y1)} ` : ""}A${r} ${r} 0 ${large} 0 ${round(x2)} ${round(y2)}`;
}

/** A filled sector from angle 0 to a. */
export function sectorPath(cx: number, cy: number, r: number, a: number): string {
  if (a <= 1e-6) return "";
  return `M${cx} ${cy} L${round(cx + r)} ${cy} ${arcPath(cx, cy, r, 0, a, false)} Z`;
}

export const line = (x1: number, y1: number, x2: number, y2: number, style: Style): Shape => ({ kind: "line", x1, y1, x2, y2, ...style });

export const dot = (cx: number, cy: number, r: number, fill: Tone, style: Style = {}): Shape => ({ kind: "circle", cx, cy, r, fill, ...style });

export function text(
  x: number,
  y: number,
  t: string,
  opts: Partial<Omit<Extract<Shape, { kind: "text" }>, "kind" | "x" | "y" | "text">> = {},
): Shape {
  return { kind: "text", x, y, text: t, tone: opts.tone ?? "fg", ...opts };
}

/** A small filled arrowhead at (x, y) pointing along screen angle `ang`. */
export function arrowHead(x: number, y: number, ang: number, fill: Tone, size = 7): Shape {
  const a1 = ang + 2.6;
  const a2 = ang - 2.6;
  return {
    kind: "path",
    d: `M${round(x)} ${round(y)} L${round(x + size * Math.cos(a1))} ${round(y + size * Math.sin(a1))} L${round(x + size * Math.cos(a2))} ${round(y + size * Math.sin(a2))} Z`,
    fill,
  };
}

export const lerp = (a: [number, number], b: [number, number], t: number): [number, number] => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** Progress of `beat` given the frame state: 0 not yet played, 1 done, t while it plays. */
export function progressOf(beat: string, played: readonly string[], t: number): number {
  const i = played.indexOf(beat);
  if (i === -1) return 0;
  return i === played.length - 1 ? t : 1;
}

/** Format a number for a label: up to 2 decimals, a true minus sign. */
export function num(n: number, digits = 2): string {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(digits).replace(/\.?0+$/, "");
  return s.startsWith("-") ? "−" + s.slice(1) : s;
}

/** n/π as "2π", "π", "1.25π". */
export function piMultiple(v: number): string {
  const k = v / Math.PI;
  const r = Math.round(k);
  if (Math.abs(k - r) < 1e-9 && r > 0) return r === 1 ? "π" : `${r}π`;
  return `${k.toFixed(2)}π`;
}

/** A value as a fraction with a small denominator when it is one ("5/7", "−1/3"), else a decimal. */
export function fracText(v: number): string {
  if (Math.abs(v) < 1e-12) return "0";
  for (let q = 1; q <= 24; q++) {
    const n = Math.round(v * q);
    if (Math.abs(v * q - n) < 1e-7 * q) return q === 1 ? num(n) : `${n < 0 ? "−" : ""}${Math.abs(n)}/${q}`;
  }
  return num(v, 3);
}
