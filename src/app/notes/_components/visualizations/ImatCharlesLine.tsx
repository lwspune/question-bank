/**
 * Static figure: Charles's law. Volume against Celsius temperature for two
 * samples of gas at constant pressure. Each is a straight line; extended
 * (dashed) back to zero volume, both meet the temperature axis at the same
 * point, −273 °C, which is 0 K.
 *
 * Sample A is the concept's self-check: 500 cm³ at 7 °C becomes 625 cm³ at
 * 77 °C. Sample B is a smaller amount of gas (280 cm³ at 7 °C), so its line is
 * less steep but ends at the same point. A second row of axis labels gives
 * the kelvin value under each Celsius tick.
 *
 * Pedagogical aim: see why gas-law ratios need kelvin: the volume is
 * proportional to T in K, not to the Celsius number. Pinned by
 * tests/notes-imat-visuals-chem2.test.ts. Server component, no client state.
 */

export const ABSOLUTE_ZERO_C = -273;

export const toKelvin = (c: number) => c - ABSOLUTE_ZERO_C;

export type GasSample = { label: string; v0: number; t0C: number; stroke: string; fill: string; text: string };

export const SAMPLES: readonly GasSample[] = [
  {
    label: "Sample A",
    v0: 500,
    t0C: 7,
    stroke: "stroke-sky-600 dark:stroke-sky-400",
    fill: "fill-sky-600 dark:fill-sky-400",
    text: "fill-sky-700 dark:fill-sky-300",
  },
  {
    label: "Sample B",
    v0: 280,
    t0C: 7,
    stroke: "stroke-amber-600 dark:stroke-amber-400",
    fill: "fill-amber-600 dark:fill-amber-400",
    text: "fill-amber-700 dark:fill-amber-300",
  },
];

/** Volume (cm³) of a sample at tC °C, pressure constant: V/T is fixed, T in kelvin. */
export function volumeAt(s: GasSample, tC: number): number {
  return (s.v0 / toKelvin(s.t0C)) * toKelvin(tC);
}

/** The self-check's two marked points on sample A. */
export const MARKED = [
  { tC: 7, v: 500 },
  { tC: 77, v: 625 },
] as const;

/** The measured (solid) part of each line; below it the line is extended, dashed. */
export const MEASURED_FROM_C = -50;

// Plot geometry (viewBox units).
const W = 320;
const H = 214;
const PL = 42;
const PR = 308;
const PT = 14;
const PB = 160;
export const T_AXIS = { min: -300, max: 100 } as const;
export const V_AXIS_MAX = 700;

const xOf = (c: number) => PL + ((c - T_AXIS.min) / (T_AXIS.max - T_AXIS.min)) * (PR - PL);
const yOf = (v: number) => PB - (v / V_AXIS_MAX) * (PB - PT);

const AXIS = "text-muted-foreground/60";

/** Each line's name sits beside its dashed part, A above its line and B below, clear of the marked points. */
function labelPos(s: GasSample): { x: number; y: number; textAnchor: "start" | "end" } {
  if (s === SAMPLES[0]) return { x: xOf(-150) - 2, y: yOf(volumeAt(s, -150)) - 6, textAnchor: "end" };
  return { x: xOf(-120) + 4, y: yOf(volumeAt(s, -120)) + 14, textAnchor: "start" };
}

export default function ImatCharlesLine() {
  const x0 = xOf(ABSOLUTE_ZERO_C);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · Charles&apos;s law: volume against temperature
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Volume against temperature in degrees Celsius for two gas samples at constant pressure. Both are straight lines which, extended, reach zero volume at minus 273 degrees Celsius, which is 0 kelvin. Sample A goes from 500 cubic centimetres at 7 degrees to 625 at 77 degrees."
      >
        {/* Axes: the temperature axis is the V = 0 line */}
        <line x1={PL} y1={PT} x2={PL} y2={PB} stroke="currentColor" className={AXIS} />
        <line x1={PL} y1={PB} x2={PR} y2={PB} stroke="currentColor" className={AXIS} />
        {[0, 200, 400, 600].map((t) => (
          <g key={`v${t}`}>
            <line x1={PL - 3} y1={yOf(t)} x2={PL} y2={yOf(t)} stroke="currentColor" className={AXIS} />
            <text x={PL - 5} y={yOf(t) + 3} textAnchor="end" className="fill-muted-foreground text-[10px] tabular-nums">
              {t}
            </text>
          </g>
        ))}
        <text x={10} y={(PT + PB) / 2} textAnchor="middle" transform={`rotate(-90 10 ${(PT + PB) / 2})`} className="fill-muted-foreground text-[10px]">
          volume (cm³)
        </text>

        {/* Temperature ticks: °C row, then K row */}
        {[-200, -100, 0, 100].map((t) => (
          <g key={`t${t}`}>
            <line x1={xOf(t)} y1={PB} x2={xOf(t)} y2={PB + 3} stroke="currentColor" className={AXIS} />
            <text x={xOf(t)} y={PB + 13} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
              {t < 0 ? `−${-t}` : t}
            </text>
            <text x={xOf(t)} y={PB + 25} textAnchor="middle" className="fill-muted-foreground/80 text-[9px] tabular-nums">
              {toKelvin(t)} K
            </text>
          </g>
        ))}
        <text x={PR} y={PB + 38} textAnchor="end" className="fill-muted-foreground text-[10px]">
          temperature (°C, with K below)
        </text>

        {/* Absolute zero */}
        <line x1={x0} y1={PB} x2={x0} y2={PB + 3} stroke="currentColor" className="text-rose-600 dark:text-rose-400" />
        <circle cx={x0} cy={PB} r={3.5} className="fill-rose-600 dark:fill-rose-400" />
        <text x={x0 - 2} y={PB + 13} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          −273
        </text>
        <text x={x0 - 2} y={PB + 25} textAnchor="middle" className="fill-rose-700 text-[9px] font-semibold dark:fill-rose-300">
          0 K
        </text>
        <line x1={x0} y1={PB - 4} x2={x0} y2={66} strokeDasharray="1 3" stroke="currentColor" className="text-rose-600 dark:text-rose-400" />
        <text x={x0 - 4} y={60} className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          absolute zero
        </text>

        {/* The two lines: dashed extension, then the measured part */}
        {SAMPLES.map((s) => {
          const mx = xOf(MEASURED_FROM_C);
          const my = yOf(volumeAt(s, MEASURED_FROM_C));
          const ex = xOf(T_AXIS.max);
          const ey = yOf(volumeAt(s, T_AXIS.max));
          return (
            <g key={s.label}>
              <line x1={x0} y1={PB} x2={mx} y2={my} strokeDasharray="4 3" className={s.stroke} strokeWidth={1.5} />
              <line x1={mx} y1={my} x2={ex} y2={ey} className={s.stroke} strokeWidth={2.2} />
              <text {...labelPos(s)} className={`${s.text} text-[11px] font-semibold`}>
                {s.label}
              </text>
            </g>
          );
        })}

        {/* Sample A's self-check points */}
        {MARKED.map((m) => (
          <g key={m.tC}>
            <circle cx={xOf(m.tC)} cy={yOf(m.v)} r={3.5} className={SAMPLES[0].fill} />
            <text
              x={m.tC > 50 ? xOf(m.tC) - 6 : xOf(m.tC) + 6}
              y={m.tC > 50 ? yOf(m.v) - 4 : yOf(m.v) + 12}
              textAnchor={m.tC > 50 ? "end" : "start"}
              className="fill-foreground text-[10px] tabular-nums"
            >
              {m.v} at {m.tC} °C
            </text>
          </g>
        ))}
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        At constant pressure each line is straight. Extended back (dashed), both reach zero volume at the same point:
        −273 °C, which is 0 K. Sample A is the self-check: 500 cm³ at 7 °C (280 K) becomes 625 cm³ at 77 °C (350 K),
        1.25 times bigger, just as 350 K is 1.25 times 280 K. In °C, 77 is 11 times 7, so a Celsius ratio gives the
        wrong answer. Real gases turn liquid before absolute zero, so the dashed part is an extension, not a measurement.
      </p>
    </div>
  );
}
