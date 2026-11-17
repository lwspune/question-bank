/**
 * Static figure: how temperature and pH change an enzyme's rate, drawn from
 * the IMAT concept's own numbers (imat-bmo-temperature-ph).
 *
 * - Temperature: below the optimum the rate roughly doubles for every 10 °C;
 *   a human enzyme peaks at about 37 °C, then denatures and the rate falls
 *   steeply. Cold only slows it (the curve never reaches zero below 37 °C).
 *   Model: 2^(T/10) times a denaturation factor 1/(1 + e^((T − Tm)/s)), with
 *   Tm chosen so the peak falls exactly at 37 °C, scaled to 1 at the peak.
 * - pH: one bell per enzyme the concept names: pepsin about 2, salivary
 *   amylase near 7, trypsin near 8.
 *
 * The curves are exported and pinned by tests/notes-imat-visuals-biometab.test.ts.
 * Server component, no client state.
 */

export const OPTIMUM_T = 37;
const S = 2; // width of the denaturation step, °C
const Q = (S * Math.LN2) / 10;
/** Melting midpoint that puts the peak of 2^(T/10)·D(T) exactly at OPTIMUM_T. */
export const TM = OPTIMUM_T - S * Math.log(Q / (1 - Q));

const raw = (t: number) => 2 ** (t / 10) / (1 + Math.exp((t - TM) / S));

/** Relative rate at temperature t (°C): 1 at the optimum. */
export function tempRate(t: number): number {
  return raw(t) / raw(OPTIMUM_T);
}

export const PH_ENZYMES = [
  { name: "pepsin", optimum: 2, stroke: "stroke-rose-600 dark:stroke-rose-400", text: "fill-rose-700 dark:fill-rose-300" },
  { name: "amylase", optimum: 7, stroke: "stroke-sky-600 dark:stroke-sky-400", text: "fill-sky-700 dark:fill-sky-300" },
  { name: "trypsin", optimum: 8, stroke: "stroke-amber-600 dark:stroke-amber-400", text: "fill-amber-700 dark:fill-amber-300" },
] as const;

/** Relative rate of an enzyme with this optimum at a pH: 1 at the optimum. */
export function phRate(optimum: number, ph: number): number {
  return Math.exp(-((ph - optimum) ** 2) / 2);
}

// Panel geometry (viewBox units).
const W = 320;
const H = 170;
const PL = 36;
const PR = 12;
const PT = 22;
const PB = 30;
const BASE = H - PB;
const PLOT_H = BASE - PT;

const AXIS = "stroke-muted-foreground/60";

function curve(xMin: number, xMax: number, f: (x: number) => number, n = 120): string {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const v = xMin + ((xMax - xMin) * i) / n;
    const x = PL + ((v - xMin) / (xMax - xMin)) * (W - PL - PR);
    const y = BASE - f(v) * PLOT_H;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

function Axes({ ticks, xMin, xMax, xLabel }: { ticks: number[]; xMin: number; xMax: number; xLabel: string }) {
  const x = (v: number) => PL + ((v - xMin) / (xMax - xMin)) * (W - PL - PR);
  return (
    <>
      <line x1={PL} y1={PT - 6} x2={PL} y2={BASE} className={AXIS} />
      <line x1={PL} y1={BASE} x2={W - PR} y2={BASE} className={AXIS} />
      {ticks.map((t) => (
        <text key={t} x={x(t)} y={BASE + 12} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
          {t}
        </text>
      ))}
      <text x={W - PR} y={BASE + 25} textAnchor="end" className="fill-muted-foreground text-[10px]">
        {xLabel}
      </text>
      <text x={PL - 6} y={PT + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
        rate
      </text>
    </>
  );
}

function TemperaturePanel() {
  const tMax = 60;
  const x = (t: number) => PL + (t / tMax) * (W - PL - PR);
  const y = (r: number) => BASE - r * PLOT_H;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-auto w-full"
      role="img"
      aria-label="Rate against temperature for a human enzyme: it rises, roughly doubling every 10 °C, peaks at about 37 °C, then falls steeply as the enzyme denatures"
    >
      <Axes ticks={[0, 10, 20, 30, 40, 50, 60]} xMin={0} xMax={tMax} xLabel="temperature (°C)" />
      <line x1={x(OPTIMUM_T)} y1={y(1)} x2={x(OPTIMUM_T)} y2={BASE} strokeDasharray="3 3" className="stroke-indigo-400" />
      <polyline points={curve(0, tMax, tempRate)} fill="none" strokeWidth={2.5} strokeLinejoin="round" className="stroke-indigo-600 dark:stroke-indigo-400" />
      <text x={x(OPTIMUM_T)} y={PT - 8} textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
        optimum about 37 °C
      </text>
      <text x={x(1)} y={y(0.78)} className="fill-foreground text-[10px]">
        cold: slow,
      </text>
      <text x={x(1)} y={y(0.66)} className="fill-foreground text-[10px]">
        not denatured
      </text>
      <text x={x(44)} y={y(0.5)} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
        denatured
      </text>
    </svg>
  );
}

function PhPanel() {
  const phMax = 12;
  const x = (p: number) => PL + (p / phMax) * (W - PL - PR);
  const top = BASE - PLOT_H;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-auto w-full"
      role="img"
      aria-label="Rate against pH for three enzymes: pepsin peaks at about pH 2, salivary amylase near pH 7, trypsin near pH 8"
    >
      <Axes ticks={[0, 2, 4, 6, 8, 10, 12]} xMin={0} xMax={phMax} xLabel="pH" />
      {PH_ENZYMES.map((e) => (
        <polyline
          key={e.name}
          points={curve(0, phMax, (p) => phRate(e.optimum, p))}
          fill="none"
          strokeWidth={2.5}
          strokeLinejoin="round"
          className={e.stroke}
        />
      ))}
      <text x={x(2)} y={top - 6} textAnchor="middle" className={`${PH_ENZYMES[0].text} text-[10px] font-semibold`}>
        pepsin, 2
      </text>
      <text x={x(7) - 4} y={top - 6} textAnchor="end" className={`${PH_ENZYMES[1].text} text-[10px] font-semibold`}>
        amylase, 7
      </text>
      <text x={x(8) + 4} y={top - 6} className={`${PH_ENZYMES[2].text} text-[10px] font-semibold`}>
        trypsin, 8
      </text>
    </svg>
  );
}

export default function ImatEnzymeTempPh() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · enzyme rate against temperature and pH
      </p>
      <p className="mb-1 text-xs font-semibold text-foreground">Temperature (a human enzyme)</p>
      <TemperaturePanel />
      <p className="mb-1 mt-3 text-xs font-semibold text-foreground">pH (optimum pH of each enzyme)</p>
      <PhPanel />
      <p className="mt-2 text-xs text-muted-foreground">
        Below the optimum the rate roughly doubles for every 10 °C. Above it the enzyme denatures: the active
        site loses its shape and the rate falls steeply, usually for good. Cold only slows it. Each enzyme also has
        its own optimum pH: pepsin about 2, salivary amylase near 7, trypsin near 8. Two enzymes can work in the
        same solution only at a pH inside both working ranges.
      </p>
    </div>
  );
}
