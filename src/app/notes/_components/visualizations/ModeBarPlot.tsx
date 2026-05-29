/**
 * Static figure: the mode as the tallest bar in a frequency plot.
 *
 * Pedagogical aim: the mode is the most frequent value — read it straight off
 * the highest bar. Server component — no client state.
 */

const DATA = [
  { label: "A", f: 3 },
  { label: "B", f: 5 },
  { label: "C", f: 2 },
  { label: "D", f: 7 },
  { label: "E", f: 4 },
];
const MAXF = Math.max(...DATA.map((d) => d.f));
const MODE_I = DATA.findIndex((d) => d.f === MAXF);

const W = 320;
const H = 200;
const PADL = 28;
const PADB = 28;
const PADT = 14;
const BARW = 40;
const GAP = 14;

export default function ModeBarPlot() {
  const innerH = H - PADT - PADB;
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · mode = the tallest bar
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto max-w-[320px] mx-auto" role="img" aria-label="Bar chart of frequencies with the mode bar highlighted">
        <line x1={PADL} y1={H - PADB} x2={W - 8} y2={H - PADB} stroke="currentColor" className="text-muted-foreground/40" />
        <line x1={PADL} y1={PADT} x2={PADL} y2={H - PADB} stroke="currentColor" className="text-muted-foreground/40" />

        {DATA.map((d, i) => {
          const barH = (d.f / MAXF) * innerH;
          const bx = PADL + 10 + i * (BARW + GAP);
          const by = H - PADB - barH;
          const isMode = i === MODE_I;
          return (
            <g key={d.label}>
              <rect x={bx} y={by} width={BARW} height={barH} rx={2} className={isMode ? "fill-indigo-600/85 dark:fill-indigo-400/85" : "fill-sky-500/40"} />
              <text x={bx + BARW / 2} y={by - 4} textAnchor="middle" className="fill-foreground text-[10px] font-medium tabular-nums">{d.f}</text>
              <text x={bx + BARW / 2} y={H - PADB + 14} textAnchor="middle" className="fill-muted-foreground text-[10px]">{d.label}</text>
            </g>
          );
        })}
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        The mode is the value with the highest frequency — category{" "}
        <span className="font-medium text-indigo-700 dark:text-indigo-300">D</span> here. Data can have two
        modes (bimodal) or none (all equal); the mode is the only average that also works for non-numeric
        categories.
      </p>
    </div>
  );
}
