/**
 * Static figure: a sample space of equally likely outcomes (a die) with an
 * event marked as a subset — P(E) = favourable / total.
 *
 * Pedagogical aim: an event is a SUBSET of the sample space; for equally likely
 * outcomes its probability is just the count ratio. Server component.
 */

const FACES = [1, 2, 3, 4, 5, 6];
const startX = 40;
const dx = 44;
const cy = 70;

export default function SampleSpaceEvent() {
  const x = (i: number) => startX + i * dx;
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · event = subset of the sample space
      </p>

      <svg viewBox="0 0 320 150" className="block w-full h-auto" role="img" aria-label="Six equally likely die outcomes with the event roll at least four marked">
        <rect x={10} y={20} width={300} height={92} rx={8} className="fill-muted/20 stroke-border" strokeWidth={1} />
        <text x={300} y={36} textAnchor="end" className="fill-muted-foreground text-[10px]">S</text>

        {/* event enclosure around 4,5,6 */}
        <rect x={x(3) - 18} y={44} width={dx * 2 + 36} height={52} rx={12} className="fill-indigo-500/12 stroke-indigo-500/60" strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={x(4)} y={112} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300 text-[10px] font-semibold">E = roll ≥ 4</text>

        {FACES.map((f, i) => {
          const inE = f >= 4;
          return (
            <g key={f}>
              <circle cx={x(i)} cy={cy} r={11} className={inE ? "fill-indigo-600/85 dark:fill-indigo-400/85" : "fill-sky-500/45"} />
              <text x={x(i)} y={cy + 4} textAnchor="middle" className={inE ? "fill-white text-[11px] font-semibold" : "fill-foreground text-[11px] font-semibold"}>{f}</text>
            </g>
          );
        })}
      </svg>

      <div className="mt-2 text-sm">
        <span className="font-medium text-foreground">P(E) = favourable / total = 3 / 6 = </span>
        <span className="tabular-nums">1/2</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        The sample space S is all six equally likely outcomes; the event E is the subset {"{4, 5, 6}"}. For
        equally likely outcomes, P(E) is simply the number of favourable outcomes over the total.
      </p>
    </div>
  );
}
