/**
 * Static figure: two panels contrasting mutually exclusive events (disjoint,
 * P(A∩B)=0) with independent events (they overlap, P(A∩B)=P(A)·P(B)≠0).
 *
 * Pedagogical aim: kill the most common probability misconception — that
 * "independent" means "no overlap". Disjoint events are NOT independent.
 * Server component — no client state.
 */

export default function ExclusiveVsIndependent() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · mutually exclusive ≠ independent
      </p>

      <svg viewBox="0 0 360 170" className="block w-full h-auto" role="img" aria-label="Left: disjoint events. Right: overlapping independent events.">
        {/* left: mutually exclusive */}
        <rect x={8} y={10} width={160} height={118} rx={6} className="fill-muted/30 stroke-border" strokeWidth={1} />
        <circle cx={58} cy={70} r={36} className="fill-sky-500/25 stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.5} />
        <circle cx={120} cy={70} r={30} className="fill-amber-500/25 stroke-amber-600 dark:stroke-amber-400" strokeWidth={1.5} />
        <text x={58} y={74} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[12px] font-semibold">A</text>
        <text x={120} y={74} textAnchor="middle" className="fill-amber-700 dark:fill-amber-300 text-[12px] font-semibold">B</text>
        <text x={88} y={150} textAnchor="middle" className="fill-foreground text-[11px] font-medium">Mutually exclusive</text>
        <text x={88} y={164} textAnchor="middle" className="fill-muted-foreground text-[10px]">P(A∩B) = 0</text>

        {/* right: independent (overlapping) */}
        <rect x={192} y={10} width={160} height={118} rx={6} className="fill-muted/30 stroke-border" strokeWidth={1} />
        <circle cx={258} cy={70} r={36} className="fill-sky-500/25 stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.5} />
        <circle cx={300} cy={70} r={30} className="fill-amber-500/25 stroke-amber-600 dark:stroke-amber-400" strokeWidth={1.5} />
        <text x={240} y={74} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[12px] font-semibold">A</text>
        <text x={318} y={74} textAnchor="middle" className="fill-amber-700 dark:fill-amber-300 text-[12px] font-semibold">B</text>
        <text x={272} y={150} textAnchor="middle" className="fill-foreground text-[11px] font-medium">Independent</text>
        <text x={272} y={164} textAnchor="middle" className="fill-muted-foreground text-[10px]">P(A∩B) = P(A)·P(B)</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Mutually exclusive events can&apos;t both happen, so they don&apos;t overlap and P(A∩B) = 0.
        Independent events <span className="font-medium text-foreground">do</span> overlap — one happening
        doesn&apos;t change the other, so P(A∩B) = P(A)·P(B). Disjoint events with non-zero probability are
        therefore <span className="font-medium text-foreground">never</span> independent.
      </p>
    </div>
  );
}
