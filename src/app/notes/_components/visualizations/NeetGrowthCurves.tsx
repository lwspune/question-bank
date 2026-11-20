/**
 * Static figure: arithmetic and geometric growth side by side, in the NEET
 * concept's own terms (nbopg-growth-rate).
 *
 * Arithmetic: after mitosis only one daughter cell keeps dividing, so the cell
 * count goes 1, 2, 3 and length against time is a straight line,
 * Lt = L0 + rt. The line drawn is the concept's worked example: a stem of
 * 15 cm growing 5 cm a day reaches 55 cm at 8 days and 75 cm at 12 days.
 * Geometric: both daughter cells keep dividing, 1, 2, 4, and the curve is
 * sigmoid, with a lag phase, a log (exponential) phase and a stationary phase.
 *
 * The concept's second trap (linear is arithmetic, sigmoid is geometric) is
 * the whole layout. The line, its points and the sigmoid's phases are
 * exported and pinned by tests/notes-w2-06.test.ts. Server component.
 */

/** The worked example: L0 = 15 cm, r = 5 cm a day. */
export const ARITH = { L0: 15, r: 5 } as const;

export function lengthAt(t: number): number {
  return ARITH.L0 + ARITH.r * t;
}

/** The two marked points of the worked example. */
export const MARKS = [8, 12].map((t) => ({ t, L: lengthAt(t) }));

/** Cells after each round of division: one daughter keeps dividing, or both do. */
export const ARITH_CELLS = [1, 2, 3] as const;
export const GEO_CELLS = [1, 2, 4] as const;

/** Sigmoid on a 0 to 10 time scale, size 0 to 1. */
export const SIGMOID = { t0: 5, k: 1.3 } as const;
export function sigmoid(t: number): number {
  return 1 / (1 + Math.exp(-SIGMOID.k * (t - SIGMOID.t0)));
}

/** Phase boundaries on the sigmoid's time scale. */
export const PHASES = [
  { name: "lag", from: 0, to: 3 },
  { name: "log", from: 3, to: 7 },
  { name: "stationary", from: 7, to: 10 },
] as const;

const L_PLOT = { x0: 32, y0: 222, w: 116, h: 104, tMax: 13, Lmax: 80 } as const;
const G_PLOT = { x0: 186, y0: 222, w: 120, h: 104, tMax: 10 } as const;

const lx = (t: number) => Math.round((L_PLOT.x0 + (t / L_PLOT.tMax) * L_PLOT.w) * 100) / 100;
const ly = (L: number) => Math.round((L_PLOT.y0 - (L / L_PLOT.Lmax) * L_PLOT.h) * 100) / 100;
const gx = (t: number) => Math.round((G_PLOT.x0 + (t / G_PLOT.tMax) * G_PLOT.w) * 100) / 100;
const gy = (s: number) => Math.round((G_PLOT.y0 - (0.04 + 0.9 * s) * G_PLOT.h) * 100) / 100;

const sigmoidPath = Array.from({ length: 41 }, (_, i) => {
  const t = (i / 40) * G_PLOT.tMax;
  return `${i === 0 ? "M" : "L"}${gx(t)},${gy(sigmoid(t))}`;
}).join(" ");

const DIVIDING = "fill-emerald-400 stroke-emerald-800 dark:fill-emerald-600 dark:stroke-emerald-300";
const MATURE = "fill-background stroke-emerald-800 dark:stroke-emerald-300";

function Cell({ x, y, dividing }: { x: number; y: number; dividing: boolean }) {
  return <circle cx={x} cy={y} r={5.5} className={dividing ? DIVIDING : MATURE} strokeWidth={1.1} />;
}

export default function NeetGrowthCurves() {
  const rowY = [30, 50, 70];
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · arithmetic and geometric growth
      </p>
      <svg
        viewBox="0 0 320 250"
        className="block h-auto w-full"
        role="img"
        aria-label="Left, arithmetic growth: only one daughter cell keeps dividing and length rises in a straight line, 15 cm at the start, 55 cm at 8 days, 75 cm at 12 days. Right, geometric growth: both daughter cells keep dividing and size follows an S shaped curve with lag, log and stationary phases"
      >
        <line x1={160} y1={6} x2={160} y2={244} className="stroke-border" strokeWidth={1} />
        <text x={8} y={14} className="fill-foreground text-[11px] font-bold">
          Arithmetic
        </text>
        <text x={168} y={14} className="fill-foreground text-[11px] font-bold">
          Geometric
        </text>

        {/* Arithmetic lineage: one daughter keeps dividing. */}
        <g className="stroke-muted-foreground" strokeWidth={0.9}>
          <line x1={80} y1={rowY[0]} x2={66} y2={rowY[1]} />
          <line x1={80} y1={rowY[0]} x2={94} y2={rowY[1]} />
          <line x1={66} y1={rowY[1]} x2={66} y2={rowY[2]} />
          <line x1={94} y1={rowY[1]} x2={80} y2={rowY[2]} />
          <line x1={94} y1={rowY[1]} x2={108} y2={rowY[2]} />
        </g>
        <Cell x={80} y={rowY[0]} dividing />
        <Cell x={66} y={rowY[1]} dividing={false} />
        <Cell x={94} y={rowY[1]} dividing />
        <Cell x={66} y={rowY[2]} dividing={false} />
        <Cell x={80} y={rowY[2]} dividing={false} />
        <Cell x={108} y={rowY[2]} dividing />
        <text x={80} y={90} textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
          only one daughter keeps dividing
        </text>

        {/* Geometric lineage: both daughters keep dividing. */}
        <g className="stroke-muted-foreground" strokeWidth={0.9}>
          <line x1={240} y1={rowY[0]} x2={222} y2={rowY[1]} />
          <line x1={240} y1={rowY[0]} x2={258} y2={rowY[1]} />
          <line x1={222} y1={rowY[1]} x2={213} y2={rowY[2]} />
          <line x1={222} y1={rowY[1]} x2={231} y2={rowY[2]} />
          <line x1={258} y1={rowY[1]} x2={249} y2={rowY[2]} />
          <line x1={258} y1={rowY[1]} x2={267} y2={rowY[2]} />
        </g>
        {[
          [240, rowY[0]],
          [222, rowY[1]],
          [258, rowY[1]],
          [213, rowY[2]],
          [231, rowY[2]],
          [249, rowY[2]],
          [267, rowY[2]],
        ].map(([x, y]) => (
          <Cell key={`${x}-${y}`} x={x} y={y} dividing />
        ))}
        <text x={240} y={90} textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
          both daughters keep dividing
        </text>

        {/* Arithmetic graph: the worked example. */}
        <text x={90} y={104} textAnchor="middle" className="fill-foreground text-[10.5px] font-semibold">
          Lₜ = L₀ + rt: a line
        </text>
        <line x1={L_PLOT.x0} y1={L_PLOT.y0} x2={L_PLOT.x0 + L_PLOT.w} y2={L_PLOT.y0} className="stroke-foreground" strokeWidth={1} />
        <line x1={L_PLOT.x0} y1={L_PLOT.y0} x2={L_PLOT.x0} y2={L_PLOT.y0 - L_PLOT.h} className="stroke-foreground" strokeWidth={1} />
        {MARKS.map((m) => (
          <g key={m.t}>
            <line x1={L_PLOT.x0} y1={ly(m.L)} x2={lx(m.t)} y2={ly(m.L)} strokeDasharray="2 2" className="stroke-muted-foreground" strokeWidth={0.8} />
            <line x1={lx(m.t)} y1={L_PLOT.y0} x2={lx(m.t)} y2={ly(m.L)} strokeDasharray="2 2" className="stroke-muted-foreground" strokeWidth={0.8} />
            <text x={L_PLOT.x0 - 3} y={ly(m.L) + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
              {m.L}
            </text>
            <text x={lx(m.t)} y={L_PLOT.y0 + 10} textAnchor="middle" className="fill-muted-foreground text-[9px]">
              {m.t}
            </text>
          </g>
        ))}
        <text x={L_PLOT.x0 - 3} y={ly(ARITH.L0) + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
          {ARITH.L0}
        </text>
        <text x={L_PLOT.x0 - 3} y={L_PLOT.y0 + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
          0
        </text>
        <line
          x1={lx(0)}
          y1={ly(lengthAt(0))}
          x2={lx(L_PLOT.tMax)}
          y2={ly(lengthAt(L_PLOT.tMax))}
          className="stroke-emerald-700 dark:stroke-emerald-400"
          strokeWidth={2}
        />
        {MARKS.map((m) => (
          <circle key={`d-${m.t}`} cx={lx(m.t)} cy={ly(m.L)} r={2.6} className="fill-emerald-700 dark:fill-emerald-400" />
        ))}
        <text x={L_PLOT.x0 + 4} y={L_PLOT.y0 - L_PLOT.h + 2} className="fill-muted-foreground text-[9px]">
          length (cm)
        </text>
        <text x={L_PLOT.x0 + L_PLOT.w} y={L_PLOT.y0 + 22} textAnchor="end" className="fill-muted-foreground text-[9px]">
          time (days)
        </text>

        {/* Geometric graph: sigmoid. */}
        <text x={246} y={104} textAnchor="middle" className="fill-foreground text-[10.5px] font-semibold">
          sigmoid (S shaped)
        </text>
        <line x1={G_PLOT.x0} y1={G_PLOT.y0} x2={G_PLOT.x0 + G_PLOT.w} y2={G_PLOT.y0} className="stroke-foreground" strokeWidth={1} />
        <line x1={G_PLOT.x0} y1={G_PLOT.y0} x2={G_PLOT.x0} y2={G_PLOT.y0 - G_PLOT.h} className="stroke-foreground" strokeWidth={1} />
        {PHASES.slice(1).map((p) => (
          <line key={p.name} x1={gx(p.from)} y1={G_PLOT.y0} x2={gx(p.from)} y2={G_PLOT.y0 - G_PLOT.h + 10} strokeDasharray="2 2" className="stroke-muted-foreground" strokeWidth={0.8} />
        ))}
        <path d={sigmoidPath} fill="none" className="stroke-emerald-700 dark:stroke-emerald-400" strokeWidth={2} />
        <text x={gx(1.5)} y={G_PLOT.y0 - 22} textAnchor="middle" className="fill-foreground text-[9.5px] font-semibold">
          lag
        </text>
        <text x={gx(5) + 12} y={gy(0.5) + 4} className="fill-foreground text-[9.5px] font-semibold">
          log
        </text>
        <text x={gx(8.5)} y={gy(1) - 6} textAnchor="middle" className="fill-foreground text-[9.5px] font-semibold">
          stationary
        </text>
        <text x={G_PLOT.x0 + 4} y={G_PLOT.y0 - G_PLOT.h + 2} className="fill-muted-foreground text-[9px]">
          size
        </text>
        <text x={G_PLOT.x0 + G_PLOT.w} y={G_PLOT.y0 + 22} textAnchor="end" className="fill-muted-foreground text-[9px]">
          time
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Left: a stem of 15 cm growing 5 cm a day is 55 cm at 8 days and 75 cm at 12 days. Right: geometric growth is slow at
        first, then rapid, then slows when nutrients run short: W₁ = W₀eʳᵗ.
      </p>
    </div>
  );
}
