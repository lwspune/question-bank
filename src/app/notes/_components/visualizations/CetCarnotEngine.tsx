/**
 * Static figure: a Carnot engine between a source and a sink (concept
 * cetp-td-carnot-efficiency), with the numbers of the concept's definition:
 * source 227 °C = 500 K, sink 27 °C = 300 K, so η = 1 − 300/500 = 40%, and
 * 50 kJ taken in gives 20 kJ of work. The other 30 kJ goes to the sink.
 *
 * The temperatures are shown in kelvin beside degrees Celsius (the concept's
 * trap: 1 − 27/227 is wrong). The strip on the right lists the cycle in the
 * concept's order, starting with isothermal expansion at T₁.
 * Server component, pure SVG. Pinned by tests/notes-w2-19.test.ts.
 */

/** The concept's example, temperatures in °C and heat in kJ. */
export const ENGINE = { sourceC: 227, sinkC: 27, Q1: 50 } as const;

export const kelvin = (c: number) => c + 273;

/** η = 1 − T₂/T₁, kelvin. */
export const efficiency = (t1: number, t2: number) => 1 - t2 / t1;

/** Work from heat taken in: W = ηQ₁. */
export const workOut = () => efficiency(kelvin(ENGINE.sourceC), kelvin(ENGINE.sinkC)) * ENGINE.Q1;

/** Heat given to the sink: Q₁ − W. */
export const heatToSink = () => ENGINE.Q1 - workOut();

/** The wrong sum the concept warns about: Celsius in the ratio. */
export const celsiusMistake = () => 1 - ENGINE.sinkC / ENGINE.sourceC;

/** The cycle, in the concept's order. */
export const CYCLE: readonly string[] = [
  "isothermal expansion at T₁",
  "adiabatic expansion",
  "isothermal compression at T₂",
  "adiabatic compression",
];

const round = (n: number) => Math.round(n * 1000) / 1000;

function Arrow({ x1, y1, x2, y2, tone }: { x1: number; y1: number; x2: number; y2: number; tone: string }) {
  const horizontal = y1 === y2;
  const tip = horizontal
    ? `${x2},${y2} ${x2 - 9},${y2 - 5} ${x2 - 9},${y2 + 5}`
    : `${x2},${y2} ${x2 - 5},${y2 - 9} ${x2 + 5},${y2 - 9}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={horizontal ? x2 - 8 : x2} y2={horizontal ? y2 : y2 - 8} strokeWidth={6} className={`stroke-current ${tone}`} />
      <polygon points={tip} className={`fill-current ${tone}`} />
    </g>
  );
}

export default function CetCarnotEngine() {
  const t1 = kelvin(ENGINE.sourceC);
  const t2 = kelvin(ENGINE.sinkC);
  const eta = round(efficiency(t1, t2));
  const cx = 82;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · a Carnot engine between a source and a sink
      </p>
      <svg
        viewBox="0 0 320 250"
        className="block h-auto w-full"
        role="img"
        aria-label="A hot source at 227 degrees Celsius, 500 kelvin, gives 50 kilojoules to the engine. The engine does 20 kilojoules of work and gives the other 30 kilojoules to a sink at 27 degrees Celsius, 300 kelvin. Efficiency is 1 minus 300 over 500, which is 40 percent, the same as 20 over 50. Beside it, the four steps of the cycle in order: isothermal expansion at T1, adiabatic expansion, isothermal compression at T2, adiabatic compression."
      >
        {/* Source */}
        <rect x={10} y={8} width={144} height={34} rx={6} strokeWidth={1.5} className="fill-rose-100 stroke-rose-600 dark:fill-rose-950 dark:stroke-rose-400" />
        <text x={cx} y={23} textAnchor="middle" className="fill-rose-900 text-[11px] font-semibold dark:fill-rose-100">
          Source T₁ = {t1} K
        </text>
        <text x={cx} y={36} textAnchor="middle" className="fill-rose-800 text-[10px] dark:fill-rose-200">
          ({ENGINE.sourceC} °C)
        </text>

        {/* Q1 in */}
        <Arrow x1={cx} y1={42} x2={cx} y2={86} tone="text-rose-500 dark:text-rose-400" />
        <text x={cx + 10} y={68} className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-300">
          Q₁ = {ENGINE.Q1} kJ in
        </text>

        {/* Engine */}
        <circle cx={cx} cy={110} r={24} strokeWidth={1.5} className="fill-background stroke-foreground" />
        <text x={cx} y={114} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          engine
        </text>

        {/* Work out */}
        <Arrow x1={cx + 24} y1={110} x2={cx + 76} y2={110} tone="text-emerald-500 dark:text-emerald-400" />
        <text x={cx + 50} y={98} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
          W = {round(workOut())} kJ
        </text>

        {/* Rest to the sink */}
        <Arrow x1={cx} y1={134} x2={cx} y2={178} tone="text-sky-500 dark:text-sky-400" />
        <text x={cx + 10} y={160} className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          {ENGINE.Q1} − {round(workOut())} = {round(heatToSink())} kJ
        </text>

        {/* Sink */}
        <rect x={10} y={178} width={144} height={34} rx={6} strokeWidth={1.5} className="fill-sky-100 stroke-sky-600 dark:fill-sky-950 dark:stroke-sky-400" />
        <text x={cx} y={193} textAnchor="middle" className="fill-sky-900 text-[11px] font-semibold dark:fill-sky-100">
          Sink T₂ = {t2} K
        </text>
        <text x={cx} y={206} textAnchor="middle" className="fill-sky-800 text-[10px] dark:fill-sky-200">
          ({ENGINE.sinkC} °C)
        </text>

        {/* The cycle, in order */}
        <text x={190} y={22} className="fill-foreground text-[11px] font-semibold">
          The cycle, in order
        </text>
        {CYCLE.map((step, i) => (
          <g key={step}>
            <circle cx={198} cy={40 + i * 26} r={7} className="fill-indigo-100 stroke-indigo-500 dark:fill-indigo-950 dark:stroke-indigo-400" />
            <text x={198} y={43.5 + i * 26} textAnchor="middle" className="fill-indigo-800 text-[10px] font-bold dark:fill-indigo-200">
              {i + 1}
            </text>
            <text x={209} y={43.5 + i * 26} className="fill-foreground text-[10px]">
              {step.split(" at ")[0]}
            </text>
            {step.includes(" at ") ? (
              <text x={209} y={54.5 + i * 26} className="fill-muted-foreground text-[10px]">
                at {step.split(" at ")[1]}
              </text>
            ) : null}
          </g>
        ))}

        {/* The sum */}
        <text x={160} y={232} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
          η = 1 − T₂/T₁ = 1 − {t2}/{t1} = {Math.round(eta * 100)}% = W/Q₁ = 20/50
        </text>
        <text x={160} y={246} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          kelvin, not °C: 1 − 27/227 is wrong
        </text>
      </svg>
      <p className="mt-2 text-sm text-foreground">
        The engine takes Q₁ from the source, turns the fraction η into work and gives the rest to the sink. Its efficiency depends only
        on the two temperatures in kelvin.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Lower the sink, or heat the source, and η rises. Run backwards, the engine is a refrigerator.
      </p>
    </div>
  );
}
