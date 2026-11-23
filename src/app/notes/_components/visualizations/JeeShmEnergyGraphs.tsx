/**
 * Static figure: kinetic and potential energy in SHM, against displacement and
 * against time (concept jposc-energy-graphs).
 *
 * Total energy E = 8 J (the concept's practice item) and period T = 0.2 s (its
 * self-check: kinetic energy returns to its maximum every 0.1 s = T/2).
 * Left, against x: U = ½kx² is an upward parabola, K = ½k(A² − x²) a downward
 * one, and they add to a flat line at E. They cross only at x = ±A/√2, where
 * each is E/2 = 4 J.
 * Right, against t from the mean: K = (E/2)(1 + cos 2ωt) and U = (E/2)(1 − cos 2ωt).
 * Each repeats every T/2 = 0.1 s, never goes below zero, and K = U at four
 * instants per period: T/8, 3T/8, 5T/8, 7T/8. Each averages E/2 = 4 J.
 * Values pinned by tests/notes-jee-visuals-phys-a.test.ts. Server component.
 */

/** Total energy (J) and period (s). */
export const SHM = { E: 8, T: 0.2 } as const;

/** Potential energy at displacement x, as a fraction u = x/A of the amplitude. */
export const uOfX = (u: number, E: number = SHM.E) => E * u * u;
/** Kinetic energy at displacement x = uA. */
export const kOfX = (u: number, E: number = SHM.E) => E * (1 - u * u);

/** Kinetic energy at time t, starting at the mean position: (E/2)(1 + cos 2ωt). */
export function kOfT(t: number, E: number = SHM.E, T: number = SHM.T): number {
  return (E / 2) * (1 + Math.cos((4 * Math.PI * t) / T));
}
/** Potential energy at time t, starting at the mean position: (E/2)(1 − cos 2ωt). */
export function uOfT(t: number, E: number = SHM.E, T: number = SHM.T): number {
  return (E / 2) * (1 - Math.cos((4 * Math.PI * t) / T));
}

/** Where K = U against x: x = ±A/√2, as fractions of A. */
export const EQUAL_X = [-1 / Math.SQRT2, 1 / Math.SQRT2] as const;

/** The four instants per period where K = U. */
export function equalTimes(T: number = SHM.T): number[] {
  return [1, 3, 5, 7].map((k) => (k * T) / 8);
}

/** Average of a function over one period by sampling (for the test). */
export function periodAverage(f: (t: number) => number, T: number = SHM.T, n = 4000): number {
  let s = 0;
  for (let k = 0; k < n; k++) s += f(((k + 0.5) * T) / n);
  return s / n;
}

const r2 = (n: number) => Math.round(n * 100) / 100;
type Panel = { x0: number; x1: number; y0: number; y1: number };
const PX: Panel = { x0: 30, x1: 146, y0: 40, y1: 150 };
const PT: Panel = { x0: 186, x1: 310, y0: 40, y1: 150 };
const E_AXIS = 10;

const xs = (u: number) => r2(PX.x0 + ((u + 1) / 2) * (PX.x1 - PX.x0));
const ts = (t: number) => r2(PT.x0 + (t / SHM.T) * (PT.x1 - PT.x0));
const ey = (p: Panel, e: number) => r2(p.y1 - (e / E_AXIS) * (p.y1 - p.y0));

function poly(n: number, at: (k: number) => { x: number; y: number }): string {
  return Array.from({ length: n + 1 }, (_, k) => at(k))
    .map((p) => `${p.x},${p.y}`)
    .join(" ");
}

const K_STROKE = "stroke-sky-600 dark:stroke-sky-400";
const K_TEXT = "fill-sky-700 dark:fill-sky-300";
const U_STROKE = "stroke-amber-600 dark:stroke-amber-400";
const U_TEXT = "fill-amber-700 dark:fill-amber-300";

function Frame({ p, xLabel, yLabel = true }: { p: Panel; xLabel: string; yLabel?: boolean }) {
  return (
    <g>
      {[4, 8].map((e) => (
        <g key={e}>
          <line x1={p.x0} y1={ey(p, e)} x2={p.x1} y2={ey(p, e)} strokeDasharray="2 3" className="stroke-border" />
          <text x={p.x0 - 4} y={ey(p, e) + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
            {e}
          </text>
        </g>
      ))}
      <line x1={p.x0} y1={p.y1} x2={p.x1} y2={p.y1} className="stroke-muted-foreground" />
      <line x1={p.x0} y1={p.y1} x2={p.x0} y2={p.y0 - 6} className="stroke-muted-foreground" />
      {yLabel && (
        <text x={p.x0 - 4} y={p.y0 - 12} className="fill-muted-foreground text-[10px]">
          energy (J)
        </text>
      )}
      <text x={p.x1} y={p.y1 + 24} textAnchor="end" className="fill-muted-foreground text-[10px]">
        {xLabel}
      </text>
    </g>
  );
}

export default function JeeShmEnergyGraphs() {
  const N = 80;
  const uX = poly(N, (k) => {
    const u = -1 + (2 * k) / N;
    return { x: xs(u), y: ey(PX, uOfX(u)) };
  });
  const kX = poly(N, (k) => {
    const u = -1 + (2 * k) / N;
    return { x: xs(u), y: ey(PX, kOfX(u)) };
  });
  const kT = poly(N, (k) => {
    const t = (k * SHM.T) / N;
    return { x: ts(t), y: ey(PT, kOfT(t)) };
  });
  const uT = poly(N, (k) => {
    const t = (k * SHM.T) / N;
    return { x: ts(t), y: ey(PT, uOfT(t)) };
  });
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · kinetic and potential energy in simple harmonic motion
      </p>
      <svg
        viewBox="0 0 320 210"
        className="block h-auto w-full"
        role="img"
        aria-label="Left: energy against displacement for an oscillator with total energy 8 joules. Potential energy is an upward parabola, zero at the mean and 8 joules at the extremes; kinetic energy is a downward parabola, 8 joules at the mean and zero at the extremes; they add to a flat line at 8 joules and cross at plus and minus A over root 2, where each is 4 joules. Right: energy against time over one period of 0.2 seconds. Kinetic energy starts at 8 joules, potential at zero; each repeats every 0.1 seconds, and they are equal at four instants per period."
      >
        {/* Against displacement */}
        <Frame p={PX} xLabel="displacement x" />
        {[
          { u: -1, s: "−A" },
          { u: 0, s: "0" },
          { u: 1, s: "A" },
        ].map(({ u, s }) => (
          <text key={s} x={xs(u)} y={PX.y1 + 11} textAnchor="middle" className="fill-muted-foreground text-[10px]">
            {s}
          </text>
        ))}
        <line x1={PX.x0} y1={ey(PX, 8)} x2={PX.x1} y2={ey(PX, 8)} strokeWidth={2} className="stroke-foreground" />
        <polyline points={uX} fill="none" strokeWidth={2.2} className={U_STROKE} />
        <polyline points={kX} fill="none" strokeWidth={2.2} strokeDasharray="5 3" className={K_STROKE} />
        {EQUAL_X.map((u) => (
          <g key={u}>
            <line x1={xs(u)} y1={ey(PX, 4)} x2={xs(u)} y2={PX.y1} strokeDasharray="2 2" className="stroke-muted-foreground" />
            <circle cx={xs(u)} cy={ey(PX, 4)} r={2.8} className="fill-foreground" />
          </g>
        ))}
        <text x={(PX.x0 + PX.x1) / 2} y={ey(PX, 8) - 4} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          E = K + U
        </text>
        <text x={xs(0)} y={ey(PX, 4) + 2} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          K = U
        </text>
        <text x={xs(0)} y={ey(PX, 4) + 14} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          at ±A/√2
        </text>
        <text x={xs(0)} y={ey(PX, 0.5) - 3} textAnchor="middle" className={`${U_TEXT} text-[11px] font-semibold`}>
          U
        </text>
        <text x={xs(0) + 8} y={ey(PX, 8) + 13} className={`${K_TEXT} text-[11px] font-semibold`}>
          K
        </text>

        {/* Against time */}
        <Frame p={PT} xLabel="time t (s)" yLabel={false} />
        {[0, 0.1, 0.2].map((t) => (
          <text key={t} x={ts(t)} y={PT.y1 + 11} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
            {t}
          </text>
        ))}
        <line x1={PT.x0} y1={ey(PT, 8)} x2={PT.x1} y2={ey(PT, 8)} strokeWidth={2} className="stroke-foreground" />
        <polyline points={uT} fill="none" strokeWidth={2.2} className={U_STROKE} />
        <polyline points={kT} fill="none" strokeWidth={2.2} strokeDasharray="5 3" className={K_STROKE} />
        {equalTimes().map((t) => (
          <circle key={t} cx={ts(t)} cy={ey(PT, 4)} r={2.8} className="fill-foreground" />
        ))}
        <text x={ts(0) + 4} y={ey(PT, 8) + 13} className={`${K_TEXT} text-[11px] font-semibold`}>
          K
        </text>
        <text x={ts(SHM.T / 4)} y={ey(PT, 8) + 13} textAnchor="middle" className={`${U_TEXT} text-[11px] font-semibold`}>
          U
        </text>
        {/* T/2: K repeats */}
        <line x1={ts(0)} y1={PT.y0 - 2} x2={ts(SHM.T / 2)} y2={PT.y0 - 2} strokeWidth={1.2} className={K_STROKE} />
        <line x1={ts(0)} y1={PT.y0 - 6} x2={ts(0)} y2={PT.y0 + 2} strokeWidth={1.2} className={K_STROKE} />
        <line x1={ts(SHM.T / 2)} y1={PT.y0 - 6} x2={ts(SHM.T / 2)} y2={PT.y0 + 2} strokeWidth={1.2} className={K_STROKE} />
        <text x={ts(SHM.T / 4)} y={PT.y0 - 6} textAnchor="middle" className={`${K_TEXT} text-[9px] tabular-nums`}>
          T/2 = 0.1 s
        </text>

        <g className="text-[10px]">
          <text x={(PX.x0 + PX.x1) / 2} y={194} textAnchor="middle" className="fill-muted-foreground">
            parabolas that add to E
          </text>
          <text x={(PT.x0 + PT.x1) / 2} y={194} textAnchor="middle" className="fill-muted-foreground">
            each repeats every T/2
          </text>
          <text x={160} y={207} textAnchor="middle" className="fill-muted-foreground">
            K dashed, U solid, dots where K = U = 4 J
          </text>
        </g>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Total energy 8 J, period T = 0.2 s. Against x, U = ½kx² and K = ½k(A² − x²) are parabolas whose sum is flat at E; they are equal only
        at x = ±A/√2, each then 4 J. Against t, starting at the mean, K and U go as cos² and sin² of ωt: frequency 2f, period T/2 = 0.1 s, never
        below zero, equal at four instants per period. Over a period each averages E/2 = 4 J.
      </p>
    </div>
  );
}
