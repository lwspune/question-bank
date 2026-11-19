/**
 * Static figure: a balanced Wheatstone bridge (concept jpce-wheatstone). Arms P
 * and Q make one branch, R and S the other; P and R both touch the input point,
 * as the concept's trap insists. The middle arm (a galvanometer here) joins the
 * P-Q junction to the R-S junction.
 *
 * Numbers: the worked example, P = 3 Ω, Q = 6 Ω, R = 4 Ω on 12 V, balanced, so
 * S = QR/P = 8 Ω. Each branch is a divider: the P-Q junction sits at
 * 12 × 6/9 = 8 V and the R-S junction at 12 × 8/12 = 8 V, the same, so the
 * middle arm carries nothing (the example's 10 Ω there carries nothing too).
 * The branches, 9 Ω and 12 Ω, are then in parallel: 36/7 Ω and 7/3 A.
 * Pinned by tests/notes-jee-visuals-phys-b.test.ts. Server component.
 */

/** The worked example, in ohms and volts. */
export const BRIDGE = { P: 3, Q: 6, R: 4, V: 12 } as const;

/** S for balance: P/Q = R/S. */
export const balancingS = (P: number, Q: number, R: number) => (Q * R) / P;

/** Potential of the junction between a top arm `a` (from the input) and bottom arm `b`, with the output at 0 V. */
export const junctionPotential = (V: number, a: number, b: number) => (V * b) / (a + b);

/** Equivalent resistance of a balanced bridge: (P + Q) in parallel with (R + S). */
export const balancedReq = (P: number, Q: number, R: number, S: number) => ((P + Q) * (R + S)) / (P + Q + R + S);

// Geometry (viewBox units).
export const NODES = {
  input: { x: 60, y: 110 },
  top: { x: 160, y: 42 },
  output: { x: 260, y: 110 },
  bottom: { x: 160, y: 178 },
} as const;

type Pt = { x: number; y: number };
const r2 = (n: number) => Math.round(n * 100) / 100;

function Resistor({ a, b, label, dx, dy, anchor }: { a: Pt; b: Pt; label: string; dx: number; dy: number; anchor: "start" | "end" }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const angle = r2((Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI);
  return (
    <g>
      <rect x={mx - 16} y={my - 5} width={32} height={10} strokeWidth={1.5} transform={`rotate(${angle} ${mx} ${my})`} className="fill-background stroke-foreground" />
      <text x={mx + dx} y={my + dy} textAnchor={anchor} className="fill-foreground text-[11px] font-semibold">
        {label}
      </text>
    </g>
  );
}

export default function JeeWheatstoneBridge() {
  const { P, Q, R, V } = BRIDGE;
  const S = balancingS(P, Q, R);
  const vTop = junctionPotential(V, P, Q);
  const vBottom = junctionPotential(V, R, S);
  const n = NODES;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a balanced Wheatstone bridge
      </p>
      <svg
        viewBox="0 0 320 236"
        className="block h-auto w-full"
        role="img"
        aria-label="A Wheatstone bridge driven by 12 volts. P is 3 ohms and Q is 6 ohms in the upper branch, R is 4 ohms and S is 8 ohms in the lower branch, with P and R meeting at the input. Both middle junctions are at 8 volts, so no current flows through the galvanometer joining them."
      >
        {/* Arms */}
        <line x1={n.input.x} y1={n.input.y} x2={n.top.x} y2={n.top.y} strokeWidth={1.5} className="stroke-foreground" />
        <line x1={n.top.x} y1={n.top.y} x2={n.output.x} y2={n.output.y} strokeWidth={1.5} className="stroke-foreground" />
        <line x1={n.input.x} y1={n.input.y} x2={n.bottom.x} y2={n.bottom.y} strokeWidth={1.5} className="stroke-foreground" />
        <line x1={n.bottom.x} y1={n.bottom.y} x2={n.output.x} y2={n.output.y} strokeWidth={1.5} className="stroke-foreground" />
        <Resistor a={n.input} b={n.top} label={`P = ${P} Ω`} dx={-12} dy={-12} anchor="end" />
        <Resistor a={n.top} b={n.output} label={`Q = ${Q} Ω`} dx={12} dy={-12} anchor="start" />
        <Resistor a={n.input} b={n.bottom} label={`R = ${R} Ω`} dx={-12} dy={20} anchor="end" />
        <Resistor a={n.bottom} b={n.output} label={`S = ${S} Ω`} dx={12} dy={20} anchor="start" />

        {/* The middle arm: a galvanometer */}
        <line x1={n.top.x} y1={n.top.y} x2={n.bottom.x} y2={n.bottom.y} strokeWidth={1.5} className="stroke-foreground" />
        <circle cx={160} cy={110} r={13} strokeWidth={1.5} className="fill-background stroke-foreground" />
        <text x={160} y={114.5} textAnchor="middle" className="fill-foreground text-[12px] font-bold">
          G
        </text>
        <text x={178} y={106} className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
          no current
        </text>
        <text x={178} y={120} className="fill-emerald-700 text-[10px] dark:fill-emerald-300">
          8 V = 8 V
        </text>

        {/* Junction potentials */}
        {[n.input, n.top, n.output, n.bottom].map((p) => (
          <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r={3} className="fill-foreground" />
        ))}
        <text x={160} y={30} textAnchor="middle" className="fill-sky-700 text-[11px] font-semibold tabular-nums dark:fill-sky-300">
          {vTop} V
        </text>
        <text x={160} y={198} textAnchor="middle" className="fill-sky-700 text-[11px] font-semibold tabular-nums dark:fill-sky-300">
          {vBottom} V
        </text>
        <text x={n.input.x + 8} y={n.input.y + 4} className="fill-sky-700 text-[10px] tabular-nums dark:fill-sky-300">
          {V} V
        </text>
        <text x={n.output.x - 8} y={n.output.y + 4} textAnchor="end" className="fill-sky-700 text-[10px] tabular-nums dark:fill-sky-300">
          0 V
        </text>

        {/* The cell, + side to the input */}
        <polyline points={`${n.input.x},${n.input.y} 22,${n.input.y} 22,214 154,214`} fill="none" strokeWidth={1.5} className="stroke-foreground" />
        <polyline points={`166,214 298,214 298,${n.output.y} ${n.output.x},${n.output.y}`} fill="none" strokeWidth={1.5} className="stroke-foreground" />
        <line x1={154} y1={202} x2={154} y2={226} strokeWidth={2} className="stroke-foreground" />
        <line x1={166} y1={208} x2={166} y2={220} strokeWidth={4} className="stroke-foreground" />
        <text x={147} y={206} textAnchor="end" className="fill-foreground text-[11px] font-semibold">
          +
        </text>
        <text x={174} y={210} className="fill-foreground text-[11px] font-semibold">
          −
        </text>
        <text x={160} y={234} textAnchor="middle" className="fill-foreground text-[10px] tabular-nums">
          {V} V
        </text>
      </svg>

      <p className="mt-2 text-sm font-medium text-foreground tabular-nums">
        Balance: P/Q = R/S, so 3/6 = 4/S and S = {S} Ω
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        Each branch divides the 12 V in the same ratio: 12 × 6/9 = 8 V at the P–Q junction and 12 × 8/12 = 8 V at the R–S junction. Equal
        potentials, so nothing flows across the middle arm, whatever it is (the 10 Ω there in the example carries none either). Remove it: 9 Ω
        and 12 Ω in parallel give 36/7 Ω, and the cell supplies 7/3 A.
      </p>
    </div>
  );
}
