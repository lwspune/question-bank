/**
 * Static figure: a ball falling through a liquid reaches its terminal velocity
 * (concept jpfluid-terminal-speed). Left: the three forces once it falls
 * steadily, drawn to scale. Weight ∝ ρ, buoyancy ∝ σ and, at the terminal
 * velocity, drag = weight − buoyancy ∝ ρ − σ, so the drag and buoyancy arrows
 * stacked end to end are exactly as long as the weight arrow. Right: the
 * velocity-time graph, rising with a slope that keeps falling and levelling off
 * at v_T.
 *
 * Numbers: the worked example, a steel ball of radius 0.15 cm and density
 * 7.8 g/cm³ in oil of density 0.9 g/cm³ and viscosity 15 poise, in CGS:
 * v_T = 2r²(ρ − σ)g/9η = 2 × 0.0225 × 6.9 × 1000/(9 × 15) = 2.3 cm/s.
 * The curve is v = v_T(1 − e^(−t/τ)), drag growing in proportion to v.
 * Pinned by tests/notes-jee-visuals-phys-b.test.ts. Server component.
 */

/** The worked example, CGS: r in cm, densities in g/cm³, η in poise, g in cm/s². */
export const BALL_EXAMPLE = { r: 0.15, rho: 7.8, sigma: 0.9, eta: 15, g: 1000 } as const;

/** Terminal velocity v_T = 2r²(ρ − σ)g/9η. */
export function terminalVelocity(p: { r: number; rho: number; sigma: number; eta: number; g: number } = BALL_EXAMPLE): number {
  return (2 * p.r * p.r * (p.rho - p.sigma) * p.g) / (9 * p.eta);
}

/** Viewbox units per g/cm³ of density, for the force arrows (each force ∝ a density × (4/3)πr³g). */
export const FORCE_SCALE = 7;

/** Arrow lengths at the terminal velocity: weight down; drag and buoyancy up, end to end. */
export function forceArrows(p = BALL_EXAMPLE) {
  return {
    weight: p.rho * FORCE_SCALE,
    buoyancy: p.sigma * FORCE_SCALE,
    drag: (p.rho - p.sigma) * FORCE_SCALE,
  };
}

/** Speed after t time constants: v = v_T(1 − e^(−t)). */
export const speedAt = (tOverTau: number, vT: number) => vT * (1 - Math.exp(-tOverTau));

// Graph geometry (viewBox units): t from 0 to 5τ, v from 0 to 3 cm/s.
export const GRAPH = { x0: 172, x1: 306, y0: 176, y1: 40, tMax: 5, vMax: 3 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;
const gx = (t: number) => r2(GRAPH.x0 + (t / GRAPH.tMax) * (GRAPH.x1 - GRAPH.x0));
const gy = (v: number) => r2(GRAPH.y0 - (v / GRAPH.vMax) * (GRAPH.y0 - GRAPH.y1));

export function curvePoints(samples = 100): string {
  const vT = terminalVelocity();
  const out: string[] = [];
  for (let k = 0; k <= samples; k++) {
    const t = (k / samples) * GRAPH.tMax;
    out.push(`${gx(t)},${gy(speedAt(t, vT))}`);
  }
  return out.join(" ");
}

const BALL = { x: 50, y: 108, r: 11 } as const;

function Arrow({ x, y1, y2, cls, fill }: { x: number; y1: number; y2: number; cls: string; fill: string }) {
  const down = y2 > y1;
  const head = down ? `${x},${r2(y2)} ${x - 4},${r2(y2 - 7)} ${x + 4},${r2(y2 - 7)}` : `${x},${r2(y2)} ${x - 4},${r2(y2 + 7)} ${x + 4},${r2(y2 + 7)}`;
  return (
    <g>
      <line x1={x} y1={r2(y1)} x2={x} y2={r2(down ? y2 - 6 : y2 + 6)} strokeWidth={2.5} className={cls} />
      <polygon points={head} className={fill} />
    </g>
  );
}

export default function JeeTerminalVelocity() {
  const vT = terminalVelocity();
  const f = forceArrows();
  const top = BALL.y - BALL.r;
  const bottom = BALL.y + BALL.r;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a ball reaching its terminal velocity
      </p>
      <svg
        viewBox="0 0 320 200"
        className="block h-auto w-full"
        role="img"
        aria-label="A steel ball falling through oil with three forces: its weight down, and the viscous drag and the buoyancy up, which together equal the weight once it falls at its terminal velocity. Beside it, the velocity-time graph rises with a falling slope and levels off at 2.3 centimetres per second."
      >
        {/* The liquid and the ball */}
        <rect x={12} y={22} width={130} height={168} rx={4} className="fill-sky-100 dark:fill-sky-950/60" />
        <text x={136} y={36} textAnchor="end" className="fill-sky-800 text-[10px] dark:fill-sky-300">
          oil
        </text>
        <circle cx={BALL.x} cy={BALL.y} r={BALL.r} className="fill-slate-500 dark:fill-slate-400" />
        <text x={BALL.x + BALL.r + 4} y={BALL.y + 4} className="fill-foreground text-[10px]">
          steel ball
        </text>

        {/* Upward: drag, then buoyancy stacked on it; downward: weight */}
        <Arrow x={BALL.x} y1={top} y2={top - f.drag} cls="stroke-rose-600 dark:stroke-rose-400" fill="fill-rose-600 dark:fill-rose-400" />
        <line x1={BALL.x} y1={r2(top - f.drag)} x2={BALL.x} y2={r2(top - f.drag - f.buoyancy)} strokeWidth={2.5} className="stroke-emerald-600 dark:stroke-emerald-400" />
        <Arrow x={BALL.x} y1={bottom} y2={bottom + f.weight} cls="stroke-indigo-600 dark:stroke-indigo-400" fill="fill-indigo-600 dark:fill-indigo-400" />

        <text x={BALL.x + 8} y={r2(top - f.drag / 2)} className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          drag 6πηrv
        </text>
        <text x={BALL.x + 8} y={r2(top - f.drag - 1)} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          + buoyancy
        </text>
        <text x={BALL.x + 8} y={r2(bottom + f.weight / 2 + 4)} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          weight
        </text>
        <text x={77} y={185} textAnchor="middle" className="fill-foreground text-[10px]">
          up = down: no net force
        </text>

        {/* The velocity-time graph */}
        <line x1={GRAPH.x0} y1={GRAPH.y0} x2={GRAPH.x1} y2={GRAPH.y0} className="stroke-muted-foreground" />
        <line x1={GRAPH.x0} y1={GRAPH.y0} x2={GRAPH.x0} y2={GRAPH.y1 - 6} className="stroke-muted-foreground" />
        {[0, 1, 2, 3].map((v) => (
          <text key={v} x={GRAPH.x0 - 4} y={gy(v) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
            {v}
          </text>
        ))}
        <text x={GRAPH.x0 - 6} y={GRAPH.y1 - 12} className="fill-muted-foreground text-[10px]">
          v (cm/s)
        </text>
        <text x={GRAPH.x1} y={GRAPH.y0 + 14} textAnchor="end" className="fill-muted-foreground text-[10px]">
          time t
        </text>
        <line x1={GRAPH.x0} y1={gy(vT)} x2={GRAPH.x1} y2={gy(vT)} strokeDasharray="4 3" className="stroke-muted-foreground" />
        <polyline points={curvePoints()} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-indigo-600 dark:stroke-indigo-400" />
        <text x={GRAPH.x1} y={gy(vT) - 6} textAnchor="end" className="fill-indigo-700 text-[11px] font-semibold tabular-nums dark:fill-indigo-300">
          v<tspan dy={3} className="text-[8px]">T</tspan>
          <tspan dy={-3}> = {vT.toFixed(1)} cm/s</tspan>
        </text>
        <text x={gx(2)} y={gy(1)} className="fill-muted-foreground text-[10px]">
          slope falls
        </text>
      </svg>

      <p className="mt-2 text-sm font-medium text-foreground tabular-nums">
        v<sub>T</sub> = 2r²(ρ − σ)g/9η = 2 × 0.0225 × 6.9 × 1000/(9 × 15) = {vT.toFixed(1)} cm/s
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        A steel ball of radius 0.15 cm (ρ = 7.8 g/cm³) in oil, all in CGS. As it speeds up, the drag 6πηrv grows, until drag plus buoyancy
        equals the weight. The arrows are to scale: the drag is then ρ − σ = 6.9 parts to the weight&apos;s 7.8 and the buoyancy&apos;s 0.9. From
        there the ball falls at a constant speed, with zero acceleration.
      </p>
    </div>
  );
}
