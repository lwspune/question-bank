/**
 * Static figure: the spin-only magnetic moment against the number of unpaired
 * d electrons, in the NEET concept's numbers (nchdf-spin-only).
 *
 * μ = √(n(n+2)) BM for n = 1 to 5 gives 1.73, 2.83, 3.87, 4.90 and 5.92 BM.
 * Under each bar, five d boxes with n unpaired electrons, and the ions the
 * concept names for that n (Ti³⁺ and Cu²⁺; V³⁺ and Ni²⁺; Cr²⁺ and Fe²⁺; Fe³⁺
 * from its worked example). It names no ion for n = 3, so neither does the
 * figure.
 *
 * The data are exported and pinned by tests/notes-w2-17.test.ts.
 * Server component, no client state.
 */

/** Spin-only moment in BM, to 2 decimals. */
export function spinOnly(n: number): number {
  return Math.round(Math.sqrt(n * (n + 2)) * 100) / 100;
}

export type Bar = { n: number; ions: readonly string[] };

export const BARS: readonly Bar[] = [
  { n: 1, ions: ["Ti³⁺", "Cu²⁺"] },
  { n: 2, ions: ["V³⁺", "Ni²⁺"] },
  { n: 3, ions: [] },
  { n: 4, ions: ["Cr²⁺", "Fe²⁺"] },
  { n: 5, ions: ["Fe³⁺"] },
];

export const AXIS_X = 44;
export const BASE_Y = 170;
/** Drawing units per BM. */
export const SCALE = 22;
export const BAR_W = 26;

export function barX(i: number): number {
  return 76 + i * 52;
}

export function barTop(n: number): number {
  return Math.round((BASE_Y - spinOnly(n) * SCALE) * 100) / 100;
}

const BOX = 9;

function DBoxes({ cx, n }: { cx: number; n: number }) {
  const left = cx - (5 * BOX) / 2;
  return (
    <g>
      {Array.from({ length: 5 }, (_, i) => {
        const x = left + i * BOX;
        return (
          <g key={i}>
            <rect x={x} y={190} width={BOX} height={11} strokeWidth={0.8} className="fill-background stroke-foreground" />
            {i < n && (
              <path d={`M ${x + BOX / 2} 199 L ${x + BOX / 2} 192.5 M ${x + BOX / 2 - 2} 195 L ${x + BOX / 2} 192.5 L ${x + BOX / 2 + 2} 195`} fill="none" strokeWidth={1} className="stroke-rose-600 dark:stroke-rose-400" />
            )}
          </g>
        );
      })}
    </g>
  );
}

export default function NeetSpinOnlyMoment() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · spin-only magnetic moment and unpaired electrons
      </p>
      <svg
        viewBox="0 0 320 252"
        className="block h-auto w-full"
        role="img"
        aria-label="Bar chart of spin-only magnetic moment against the number of unpaired d electrons: 1.73 BM for one, 2.83 for two, 3.87 for three, 4.90 for four and 5.92 for five. Ti3+ and Cu2+ have one, V3+ and Ni2+ two, Cr2+ and Fe2+ four, Fe3+ five."
      >
        <text x={180} y={16} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          μ = √(n(n + 2)) BM
        </text>

        {/* Axes. */}
        <line x1={AXIS_X} y1={BASE_Y} x2={312} y2={BASE_Y} strokeWidth={1} className="stroke-foreground" />
        <line x1={AXIS_X} y1={BASE_Y} x2={AXIS_X} y2={30} strokeWidth={1} className="stroke-foreground" />
        {[0, 2, 4, 6].map((v) => (
          <g key={v}>
            <line x1={AXIS_X - 4} y1={BASE_Y - v * SCALE} x2={AXIS_X} y2={BASE_Y - v * SCALE} strokeWidth={1} className="stroke-foreground" />
            <text x={AXIS_X - 7} y={BASE_Y - v * SCALE + 3.5} textAnchor="end" className="fill-muted-foreground text-[10px]">
              {v}
            </text>
          </g>
        ))}
        <text x={6} y={26} className="fill-foreground text-[10px] font-semibold">
          μ (BM)
        </text>

        {BARS.map((b, i) => {
          const x = barX(i);
          const top = barTop(b.n);
          return (
            <g key={b.n}>
              <rect
                x={x - BAR_W / 2}
                y={top}
                width={BAR_W}
                height={Math.round((BASE_Y - top) * 100) / 100}
                rx={2}
                className="fill-violet-400 dark:fill-violet-500"
              />
              <text x={x} y={top - 5} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                {spinOnly(b.n).toFixed(2)}
              </text>
              <text x={x} y={184} textAnchor="middle" className="fill-foreground text-[10px]">
                n = {b.n}
              </text>
              <DBoxes cx={x} n={b.n} />
              {b.ions.map((ion, k) => (
                <text key={ion} x={x} y={215 + k * 12} textAnchor="middle" className="fill-sky-700 text-[10px] dark:fill-sky-300">
                  {ion}
                </text>
              ))}
            </g>
          );
        })}

        <text x={178} y={248} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          n = number of unpaired d electrons
        </text>
      </svg>
    </div>
  );
}
