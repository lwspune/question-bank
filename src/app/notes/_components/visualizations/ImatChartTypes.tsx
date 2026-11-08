/**
 * Static figure: the four charts the IMAT "Bar charts, line graphs and pie
 * charts" concept teaches, each drawn from numbers its own text uses.
 *
 * - Bar chart and pie chart of the worked example's survey (18 walk, 30 bus,
 *   12 car, 12 cycle of 72), in the same colours, so the two can be compared:
 *   equal bars give equal sectors.
 * - A distance-time graph: out, a flat stop, then a faster (steeper) way home.
 * - The axis trap from the practice set: 40 and 50 on an axis starting at 30,
 *   where 50 looks twice as tall but is 1.25 times as big.
 *
 * Pedagogical aim: the concept is about READING charts, so a student needs to
 * see one. The geometry is exported and pinned by
 * tests/notes-imat-chart-types.test.ts. Server component, no client state.
 */

import type { ReactNode } from "react";

export type Category = { label: string; v: number; fill: string; swatch: string };

export const SURVEY: readonly Category[] = [
  { label: "Walk", v: 18, fill: "fill-sky-500/80", swatch: "bg-sky-500" },
  { label: "Bus", v: 30, fill: "fill-amber-500/80", swatch: "bg-amber-500" },
  { label: "Car", v: 12, fill: "fill-emerald-500/80", swatch: "bg-emerald-500" },
  { label: "Cycle", v: 12, fill: "fill-rose-500/80", swatch: "bg-rose-500" },
];

/** The axis-trap pair from the concept's practice set. */
export const TRAP = { values: [40, 50] as const, axisMin: 30, axisMax: 50 };

/** A trip: minutes against kilometres from home. */
export const TRIP: readonly { t: number; d: number }[] = [
  { t: 0, d: 0 },
  { t: 30, d: 3 },
  { t: 45, d: 3 },
  { t: 60, d: 0 },
];

export function pieAngles(data: readonly { v: number }[]): number[] {
  const total = data.reduce((a, d) => a + d.v, 0);
  return data.map((d) => (d.v / total) * 360);
}

/** Drawn height of a bar on an axis running from axisMin to axisMax. */
export function barHeight(v: number, axisMin: number, axisMax: number, plotH: number): number {
  return ((v - axisMin) / (axisMax - axisMin)) * plotH;
}

export function segmentSlopes(points: readonly { t: number; d: number }[]): number[] {
  return points.slice(1).map((p, i) => (p.d - points[i].d) / (p.t - points[i].t));
}

// Shared panel geometry (viewBox units).
const W = 220;
const H = 150;
const PL = 30; // left padding for the y axis
const PT = 16;
const PB = 26;
const PLOT_H = H - PT - PB;
const BASE = H - PB;

const AXIS = "text-muted-foreground/50";
const SVG_CLASS = "block h-auto w-full max-w-[280px] mx-auto";

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <figure className="rounded-md border border-indigo-100 bg-background/60 p-3 dark:border-indigo-900/40">
      <figcaption className="mb-1 text-xs font-semibold text-foreground">{title}</figcaption>
      {children}
    </figure>
  );
}

function YTicks({ ticks, min, max }: { ticks: number[]; min: number; max: number }) {
  return (
    <>
      {ticks.map((t) => {
        const y = BASE - barHeight(t, min, max, PLOT_H);
        return (
          <g key={t}>
            <line x1={PL - 3} y1={y} x2={PL} y2={y} stroke="currentColor" className={AXIS} />
            <text x={PL - 6} y={y + 3} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
              {t}
            </text>
          </g>
        );
      })}
    </>
  );
}

function SurveyBars() {
  const barW = 30;
  const gap = 14;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={SVG_CLASS} role="img" aria-label="Bar chart of the survey: walk 18, bus 30, car 12, cycle 12, on an axis from 0 to 30">
      <line x1={PL} y1={PT} x2={PL} y2={BASE} stroke="currentColor" className={AXIS} />
      <line x1={PL} y1={BASE} x2={W - 6} y2={BASE} stroke="currentColor" className={AXIS} />
      <YTicks ticks={[0, 10, 20, 30]} min={0} max={30} />
      {SURVEY.map((d, i) => {
        const h = barHeight(d.v, 0, 30, PLOT_H);
        const x = PL + 14 + i * (barW + gap);
        return (
          <g key={d.label}>
            <rect x={x} y={BASE - h} width={barW} height={h} rx={2} className={d.fill} />
            <text x={x + barW / 2} y={BASE - h - 4} textAnchor="middle" className="fill-foreground text-[10px] font-medium tabular-nums">
              {d.v}
            </text>
            <text x={x + barW / 2} y={BASE + 14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function SurveyPie() {
  const cx = 70;
  const cy = 75;
  const r = 58;
  const angles = pieAngles(SURVEY);
  const polar = (deg: number, rad: number) => {
    const a = (deg * Math.PI) / 180;
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)] as const;
  };
  let start = -90; // first sector starts at the top
  const sectors = SURVEY.map((d, i) => {
    const angle = angles[i];
    const end = start + angle;
    const [x1, y1] = polar(start, r);
    const [x2, y2] = polar(end, r);
    const [lx, ly] = polar((start + end) / 2, r * 0.6);
    const path = `M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${angle > 180 ? 1 : 0},1 ${x2.toFixed(1)},${y2.toFixed(1)} Z`;
    start = end;
    return { ...d, angle, path, lx, ly };
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={SVG_CLASS} role="img" aria-label="Pie chart of the same survey: walk 90 degrees, bus 150, car 60, cycle 60">
      {sectors.map((s) => (
        <g key={s.label}>
          <path d={s.path} className={`${s.fill} stroke-background`} strokeWidth={1.5} />
          <text x={s.lx} y={s.ly + 3} textAnchor="middle" className="fill-white text-[10px] font-semibold tabular-nums">
            {Math.round(s.angle)}°
          </text>
        </g>
      ))}
      {sectors.map((s, i) => (
        <g key={`k-${s.label}`}>
          <rect x={146} y={38 + i * 20} width={9} height={9} rx={1.5} className={s.fill} />
          <text x={160} y={46 + i * 20} className="fill-foreground text-[10px]">
            {s.label} {s.v}
          </text>
        </g>
      ))}
    </svg>
  );
}

function TripGraph() {
  const tMax = 60;
  const dMax = 3;
  const x = (t: number) => PL + (t / tMax) * (W - PL - 10);
  const y = (d: number) => BASE - (d / dMax) * PLOT_H;
  const pts = TRIP.map((p) => `${x(p.t).toFixed(1)},${y(p.d).toFixed(1)}`).join(" ");
  const notes = [
    { t: 15, d: 1.5, label: "out", dx: -6, anchor: "end" as const },
    { t: 37.5, d: 3, label: "stop", dx: 0, anchor: "middle" as const },
    { t: 52.5, d: 1.5, label: "back", dx: 6, anchor: "start" as const },
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={SVG_CLASS} role="img" aria-label="Distance-time graph: 3 km out in 30 minutes, stopped for 15 minutes, then 3 km back in 15 minutes on a steeper line">
      <line x1={PL} y1={PT} x2={PL} y2={BASE} stroke="currentColor" className={AXIS} />
      <line x1={PL} y1={BASE} x2={W - 6} y2={BASE} stroke="currentColor" className={AXIS} />
      <YTicks ticks={[0, 1, 2, 3]} min={0} max={dMax} />
      {[0, 30, 45, 60].map((t) => (
        <text key={t} x={x(t)} y={BASE + 12} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
          {t}
        </text>
      ))}
      <text x={W - 8} y={BASE + 23} textAnchor="end" className="fill-muted-foreground text-[9px]">
        time (min)
      </text>
      <text x={PL + 4} y={PT - 5} className="fill-muted-foreground text-[9px]">
        distance (km)
      </text>
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400" />
      {notes.map((n) => (
        <text key={n.label} x={x(n.t) + n.dx} y={y(n.d) - (n.label === "stop" ? 6 : 0)} textAnchor={n.anchor} className="fill-foreground text-[10px] font-medium">
          {n.label}
        </text>
      ))}
    </svg>
  );
}

function AxisTrap() {
  const barW = 40;
  const [a, b] = TRAP.values;
  const bars = [
    { v: a, x: PL + 34 },
    { v: b, x: PL + 34 + barW + 36 },
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={SVG_CLASS} role="img" aria-label="Two bars of 40 and 50 on an axis that starts at 30: the 50 bar is drawn twice as tall though the value is only 1.25 times as big">
      <line x1={PL} y1={PT} x2={PL} y2={BASE} stroke="currentColor" className={AXIS} />
      <line x1={PL} y1={BASE} x2={W - 6} y2={BASE} stroke="currentColor" className={AXIS} />
      <YTicks ticks={[30, 40, 50]} min={TRAP.axisMin} max={TRAP.axisMax} />
      {bars.map((bar) => {
        const h = barHeight(bar.v, TRAP.axisMin, TRAP.axisMax, PLOT_H);
        return (
          <g key={bar.v}>
            <rect x={bar.x} y={BASE - h} width={barW} height={h} rx={2} className="fill-sky-500/70" />
            <text x={bar.x + barW / 2} y={BASE - h - 4} textAnchor="middle" className="fill-foreground text-[10px] font-medium tabular-nums">
              {bar.v}
            </text>
          </g>
        );
      })}
      <text x={W - 8} y={BASE + 16} textAnchor="end" className="fill-rose-700 dark:fill-rose-300 text-[10px] font-semibold">
        axis starts at 30
      </text>
    </svg>
  );
}

export default function ImatChartTypes() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-2xl mx-auto">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · four charts and what each shows best
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Panel title="Bar chart: compare sizes">
          <SurveyBars />
        </Panel>
        <Panel title="Pie chart: shares of a whole">
          <SurveyPie />
        </Panel>
        <Panel title="Distance-time graph: slope is speed">
          <TripGraph />
        </Panel>
        <Panel title="Trap: an axis that does not start at 0">
          <AxisTrap />
        </Panel>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        The bar chart and the pie chart show the same survey of 72 students. Car and cycle are equal (12 each),
        so their bars are the same height and their sectors the same angle, 60°. On the trip, the flat section is the stop,
        and the way home is steeper than the way out, so it was faster: 3 km in 15 minutes against 30. In the last
        chart the 50 bar is drawn twice as tall as the 40 bar, but 50 is only 1.25 times 40: read the values,
        not the bar lengths.
      </p>
    </div>
  );
}
