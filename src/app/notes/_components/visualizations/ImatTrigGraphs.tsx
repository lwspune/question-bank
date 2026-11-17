/**
 * Static figure: the IMAT "Graphs of sine, cosine and tangent" concept, in
 * degrees from 0° to 360°.
 *
 * - sin x and cos x on one axis: both between −1 and 1, period 360°; sin starts
 *   at 0, cos at its maximum 1. Amplitude 1 and the period are marked.
 * - tan x: period 180°, every real value, dashed asymptotes at 90° and 270°.
 * - The worked example y = 3 sin(2x) + 1: amplitude 3, period 180°, midline
 *   y = 1, greatest 4 and least −2.
 *
 * Pedagogical aim: see period and amplitude on the curve, not just as numbers.
 * The functions and key values are pinned by
 * tests/notes-imat-visuals-maths.test.ts. Server component, no client state.
 */

import type { ReactNode } from "react";

const RAD = Math.PI / 180;

/** y = a sin(bx) + c with x in degrees. */
export function sineWave(xDeg: number, a: number, b: number, c: number): number {
  return a * Math.sin(b * xDeg * RAD) + c;
}

export function periodOf(b: number): number {
  return 360 / b;
}

/** Least and greatest values of a sin(bx) + c (or a cos(bx) + c). */
export function rangeOf(a: number, c: number): [number, number] {
  return [c - Math.abs(a), c + Math.abs(a)];
}

export const SIN_COS_PERIOD = 360;
export const TAN_PERIOD = 180;
/** Where cos x = 0 between 0° and 360°: tan x has no value there. */
export const TAN_ASYMPTOTES = [90, 270] as const;

/** The concept's worked example: y = 3 sin(2x) + 1. */
export const EXAMPLE = { a: 3, b: 2, c: 1 } as const;

const MINUS = "−";
const signed = (n: number) => (n < 0 ? `${MINUS}${-n}` : String(n));

// Panel geometry (viewBox units).
const W = 320;
const H = 130;
const PL = 30;
const PR = 12;
const PT = 14;
const PB = 20;
const sx = (deg: number) => PL + (deg / 360) * (W - PL - PR);

function makeY(yMin: number, yMax: number) {
  return (y: number) => PT + ((yMax - y) / (yMax - yMin)) * (H - PT - PB);
}

function path(f: (x: number) => number, from: number, to: number, sy: (y: number) => number): string {
  const n = 120;
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const x = from + (i / n) * (to - from);
    const y = Math.max(-20, Math.min(20, f(x)));
    pts.push(`${i === 0 ? "M" : "L"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
  }
  return pts.join(" ");
}

const AXIS = "text-muted-foreground/60";
const TICK = "fill-muted-foreground text-[9px] tabular-nums";

function Axes({ sy, yTicks }: { sy: (y: number) => number; yTicks: number[] }) {
  return (
    <>
      <line x1={PL} y1={PT - 4} x2={PL} y2={H - PB + 4} stroke="currentColor" className={AXIS} />
      <line x1={PL} y1={sy(0)} x2={W - PR} y2={sy(0)} stroke="currentColor" className={AXIS} />
      {[90, 180, 270, 360].map((d) => (
        <g key={d}>
          <line x1={sx(d)} y1={sy(0) - 2} x2={sx(d)} y2={sy(0) + 2} stroke="currentColor" className={AXIS} />
          <text x={sx(d)} y={H - 4} textAnchor="middle" className={TICK}>
            {d}°
          </text>
        </g>
      ))}
      {yTicks.map((y) => (
        <g key={y}>
          <line x1={PL - 3} y1={sy(y)} x2={PL} y2={sy(y)} stroke="currentColor" className={AXIS} />
          <text x={PL - 5} y={sy(y) + 3} textAnchor="end" className={TICK}>
            {signed(y)}
          </text>
        </g>
      ))}
    </>
  );
}

/** A horizontal bracket from x1 to x2 (degrees) at height y (viewBox); legs point down. */
function Bracket({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <path
      d={`M${sx(x1)},${y + 4} V${y} H${sx(x2)} V${y + 4}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      className="text-emerald-700 dark:text-emerald-300"
    />
  );
}

const PERIOD_TEXT = "fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300";
const AMP_TEXT = "fill-rose-700 text-[10px] font-semibold dark:fill-rose-300";

/** A vertical double-headed marker from y1 to y2 (viewBox) at x (degrees). */
function Amplitude({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  const X = sx(x);
  return (
    <g className="text-rose-700 dark:text-rose-300">
      <line x1={X} y1={y1} x2={X} y2={y2} stroke="currentColor" strokeWidth={1.2} />
      <path d={`M${X - 3},${y2 + 4} L${X},${y2} L${X + 3},${y2 + 4}`} fill="none" stroke="currentColor" strokeWidth={1.2} />
      <path d={`M${X - 3},${y1 - 4} L${X},${y1} L${X + 3},${y1 - 4}`} fill="none" stroke="currentColor" strokeWidth={1.2} />
    </g>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <figure className="rounded-md border border-indigo-100 bg-background/60 p-2 dark:border-indigo-900/40">
      <figcaption className="mb-1 text-xs font-semibold text-foreground">{title}</figcaption>
      {children}
    </figure>
  );
}

const SVG_CLASS = "block h-auto w-full";

function SinCos() {
  const sy = makeY(-2, 1.4);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={SVG_CLASS} role="img" aria-label="sin x and cos x from 0 to 360 degrees: both between minus 1 and 1, period 360 degrees; sin starts at 0, cos starts at 1">
      <Axes sy={sy} yTicks={[-1, 1]} />
      <path d={path((x) => Math.cos(x * RAD), 0, 360, sy)} fill="none" stroke="currentColor" strokeWidth={2} strokeDasharray="5 3" className="text-amber-600 dark:text-amber-400" />
      <path d={path((x) => Math.sin(x * RAD), 0, 360, sy)} fill="none" stroke="currentColor" strokeWidth={2.2} className="text-sky-600 dark:text-sky-400" />
      <text x={sx(100)} y={sy(1) - 4} className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">sin x</text>
      <text x={sx(352)} y={sy(1) - 4} textAnchor="end" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">cos x (dashed)</text>
      <Amplitude x={270} y1={sy(0)} y2={sy(-1)} />
      <text x={sx(270)} y={sy(-1.55)} textAnchor="middle" className={AMP_TEXT}>
        amplitude 1
      </text>
      <Bracket x1={0} x2={360} y={H - PB + 1} />
      <text x={sx(160)} y={sy(-1.55)} textAnchor="middle" className={PERIOD_TEXT}>
        period 360°
      </text>
    </svg>
  );
}

function Tan() {
  const sy = makeY(-4, 4);
  const [a1, a2] = TAN_ASYMPTOTES;
  const tan = (x: number) => Math.tan(x * RAD);
  const gap = 4;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={SVG_CLASS} role="img" aria-label="tan x from 0 to 360 degrees, period 180 degrees, with dashed vertical asymptotes at 90 and 270 degrees">
      <defs>
        <clipPath id="imat-trig-tan">
          <rect x={PL} y={PT - 4} width={W - PL - PR} height={H - PT - PB + 8} />
        </clipPath>
      </defs>
      <Axes sy={sy} yTicks={[-2, 2]} />
      {TAN_ASYMPTOTES.map((d) => (
        <g key={d}>
          <line x1={sx(d)} y1={PT - 4} x2={sx(d)} y2={H - PB + 4} stroke="currentColor" strokeDasharray="4 3" className="text-rose-600 dark:text-rose-400" />
          <text x={sx(d) - 3} y={sy(-3.4)} textAnchor="end" className="fill-rose-700 text-[9px] dark:fill-rose-300">
            x = {d}°
          </text>
        </g>
      ))}
      <g clipPath="url(#imat-trig-tan)">
        {[
          [0, a1 - gap],
          [a1 + gap, a2 - gap],
          [a2 + gap, 360],
        ].map(([from, to]) => (
          <path key={from} d={path(tan, from, to, sy)} fill="none" stroke="currentColor" strokeWidth={2.2} className="text-indigo-600 dark:text-indigo-400" />
        ))}
      </g>
      <Bracket x1={a1} x2={a2} y={PT - 1} />
      <text x={sx(180)} y={sy(3.2)} textAnchor="middle" className={PERIOD_TEXT}>
        period 180°
      </text>
      <text x={sx(200)} y={sy(-2.2)} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
        tan x
      </text>
    </svg>
  );
}

function Example() {
  const { a, b, c } = EXAMPLE;
  const [lo, hi] = rangeOf(a, c);
  const sy = makeY(-3.2, 5.6);
  const period = periodOf(b);
  const xMax = 90 / b; // first peak: 2x = 90°
  const xMin = 270 / b; // first trough: 2x = 270°
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={SVG_CLASS} role="img" aria-label="y = 3 sin 2x + 1: midline y = 1, greatest value 4, least value minus 2, amplitude 3, period 180 degrees">
      <Axes sy={sy} yTicks={[lo, c, hi]} />
      <line x1={PL} y1={sy(c)} x2={W - PR} y2={sy(c)} stroke="currentColor" strokeDasharray="4 3" className="text-muted-foreground" />
      <text x={W - PR} y={sy(c) - 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
        midline y = {c}
      </text>
      <path d={path((x) => sineWave(x, a, b, c), 0, 360, sy)} fill="none" stroke="currentColor" strokeWidth={2.2} className="text-indigo-600 dark:text-indigo-400" />
      <circle cx={sx(xMax)} cy={sy(hi)} r={3} className="fill-indigo-600 dark:fill-indigo-400" />
      <circle cx={sx(xMin)} cy={sy(lo)} r={3} className="fill-indigo-600 dark:fill-indigo-400" />
      <text x={sx(xMin) + 6} y={sy(lo) + 3} className="fill-foreground text-[10px] font-medium tabular-nums">
        least {signed(lo)}
      </text>
      <Amplitude x={xMax} y1={sy(c)} y2={sy(hi)} />
      <text x={sx(xMax) + 4} y={sy(2.5)} className={AMP_TEXT}>
        3
      </text>
      <text x={sx(95)} y={sy(4.1)} className={AMP_TEXT}>
        amplitude 3
      </text>
      <Bracket x1={0} x2={period} y={PT - 2} />
      <text x={sx(period) + 4} y={PT + 2} className={PERIOD_TEXT}>
        period 180°
      </text>
    </svg>
  );
}

export default function ImatTrigGraphs() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · sine, cosine and tangent from 0° to 360°
      </p>
      <div className="grid grid-cols-1 gap-3">
        <Panel title="y = sin x and y = cos x">
          <SinCos />
        </Panel>
        <Panel title="y = tan x">
          <Tan />
        </Panel>
        <Panel title="y = 3 sin(2x) + 1">
          <Example />
        </Panel>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        sin x and cos x stay between −1 and 1 and repeat every 360°; sin x starts at 0, cos x at 1. tan x repeats every
        180° and has no value at 90° and 270°, where the dashed asymptotes are. In y = 3 sin(2x) + 1 the 3 sets the
        amplitude, the 2 makes the wave repeat twice as often (period 360° ÷ 2 = 180°) and the + 1 lifts the midline, so
        the values run from −2 to 4.
      </p>
    </div>
  );
}
