/**
 * Static figure: the four successive ionisation energies of the concept's
 * worked example, 578, 1817, 2745 and 11 577 kJ/mol (aluminium), as bars on a
 * LINEAR scale, so the jump looks as big as it is. The rise between each pair
 * is printed above; the big one comes after the 3rd electron, so the 4th
 * comes from a full inner shell: 3 outer electrons, group 13.
 *
 * Pedagogical aim: read the group from where the big jump falls, using the
 * differences, as the worked example does. Pinned by
 * tests/notes-imat-visuals-chem2.test.ts. Server component, no client state.
 */

/** Aluminium's first four ionisation energies, kJ/mol (the worked example's values). */
export const IE_ALUMINIUM = [578, 1817, 2745, 11577] as const;

/** Rise from each ionisation energy to the next. */
export function steps(values: readonly number[]): number[] {
  return values.slice(1).map((v, i) => v - values[i]);
}

/** Number of electrons removed before the biggest rise (the outer electrons). */
export function electronsBeforeJump(values: readonly number[]): number {
  const s = steps(values);
  return s.indexOf(Math.max(...s)) + 1;
}

/** Main-group number from the count of outer electrons (1, 2, then 13 to 18). */
export function groupFromOuterElectrons(n: number): number {
  return n <= 2 ? n : n + 10;
}

export const Y_MAX = 12000;

const W = 320;
const H = 214;
const PL = 50;
const PT = 30;
const PB = 164;
const BAR_W = 40;
const GAP = 22;
const X0 = PL + 18;

export const barX = (i: number) => X0 + i * (BAR_W + GAP);
const yOf = (v: number) => PB - (v / Y_MAX) * (PB - PT);
const fmt = (v: number) => (v >= 10000 ? `${Math.floor(v / 1000)} ${String(v % 1000).padStart(3, "0")}` : String(v));
const ORD = ["1st", "2nd", "3rd", "4th"];
const AXIS = "text-muted-foreground/60";

export default function ImatIonisationJumps() {
  const n = electronsBeforeJump(IE_ALUMINIUM);
  const rises = steps(IE_ALUMINIUM);
  const jumpX = barX(n) - GAP / 2;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · successive ionisation energies of aluminium
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Bar chart on a linear scale of aluminium's first four ionisation energies: 578, 1817, 2745 and 11 577 kilojoules per mole. The rises are 1239, 928 and 8832. The big jump comes before the 4th electron, which comes from a full inner shell, so aluminium has 3 outer electrons and is in group 13."
      >
        {/* Axes */}
        <line x1={PL} y1={PT} x2={PL} y2={PB} stroke="currentColor" className={AXIS} />
        <line x1={PL} y1={PB} x2={W - 8} y2={PB} stroke="currentColor" className={AXIS} />
        {[0, 4000, 8000, 12000].map((t) => (
          <g key={t}>
            <line x1={PL - 3} y1={yOf(t)} x2={PL} y2={yOf(t)} stroke="currentColor" className={AXIS} />
            <text x={PL - 5} y={yOf(t) + 3} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
              {fmt(t)}
            </text>
          </g>
        ))}
        <text x={10} y={(PT + PB) / 2} textAnchor="middle" transform={`rotate(-90 10 ${(PT + PB) / 2})`} className="fill-muted-foreground text-[9px]">
          kJ/mol (linear scale)
        </text>

        {/* Rises between neighbours */}
        <text x={PL} y={14} textAnchor="end" className="fill-muted-foreground text-[9px]">
          rise:
        </text>
        {rises.map((r, i) => {
          const big = i + 1 === n;
          return (
            <text
              key={i}
              x={barX(i + 1) - GAP / 2}
              y={14}
              textAnchor="middle"
              className={`${big ? "fill-rose-700 font-semibold dark:fill-rose-300" : "fill-muted-foreground"} text-[10px] tabular-nums`}
            >
              +{r}
            </text>
          );
        })}

        {/* Bars */}
        {IE_ALUMINIUM.map((v, i) => {
          const inner = i >= n;
          const x = barX(i);
          return (
            <g key={i}>
              <rect
                x={x}
                y={yOf(v)}
                width={BAR_W}
                height={PB - yOf(v)}
                rx={2}
                className={inner ? "fill-rose-500/80 dark:fill-rose-400/80" : "fill-sky-500/80 dark:fill-sky-400/80"}
              />
              <text x={x + BAR_W / 2} y={yOf(v) - 4} textAnchor="middle" className="fill-foreground text-[10px] font-medium tabular-nums">
                {fmt(v)}
              </text>
              <text x={x + BAR_W / 2} y={PB + 12} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {ORD[i]}
              </text>
            </g>
          );
        })}

        {/* The jump */}
        <line x1={jumpX} y1={yOf(IE_ALUMINIUM[n - 1])} x2={jumpX} y2={yOf(IE_ALUMINIUM[n]) + 4} strokeDasharray="3 2" stroke="currentColor" className="text-rose-600 dark:text-rose-400" strokeWidth={1.5} />
        <path d={`M${jumpX - 4},${yOf(IE_ALUMINIUM[n]) + 8} L${jumpX},${yOf(IE_ALUMINIUM[n])} L${jumpX + 4},${yOf(IE_ALUMINIUM[n]) + 8} Z`} className="fill-rose-600 dark:fill-rose-400" />
        <text x={jumpX - 8} y={66} textAnchor="end" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          big jump: the 4th electron
        </text>
        <text x={jumpX - 8} y={78} textAnchor="end" className="fill-rose-700 text-[10px] dark:fill-rose-300">
          comes from a full inner shell
        </text>

        {/* What it reveals */}
        <line x1={barX(0)} y1={PB + 18} x2={barX(n - 1) + BAR_W} y2={PB + 18} className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.5} />
        <text x={(barX(0) + barX(n - 1) + BAR_W) / 2} y={PB + 30} textAnchor="middle" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          {n} outer electrons
        </text>
        <line x1={barX(n)} y1={PB + 18} x2={barX(n) + BAR_W} y2={PB + 18} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth={1.5} />
        <text x={barX(n) + BAR_W / 2} y={PB + 30} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          inner shell
        </text>
        <text x={W / 2} y={PB + 46} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          {n} electrons before the jump: group {groupFromOuterElectrons(n)} (aluminium)
        </text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        The bars use a linear scale, so the jump is drawn as big as it really is. Each value is higher than the one
        before, but the rises are 1239 and 928, then 8832: the 4th electron must be pulled from a full inner shell,
        much closer to the nucleus. Three electrons come off before the jump, so there are 3 outer electrons and the
        element is in group 13.
      </p>
    </div>
  );
}
