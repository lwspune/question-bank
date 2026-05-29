/**
 * Static figure: "neither A nor B" as the region outside both circles —
 * the complement of the union, P(neither) = 1 − P(A∪B).
 *
 * Pedagogical aim: "neither" is everything outside A∪B; by De Morgan it equals
 * A′∩B′. Server component — no client state.
 */

export default function NeitherComplementUnion() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · &quot;neither&quot; = (A ∪ B)′
      </p>

      <svg viewBox="0 0 320 180" className="block w-full h-auto max-w-[320px] mx-auto" role="img" aria-label="The region outside both circles is neither A nor B">
        <defs>
          <mask id="neither-mask">
            <rect x={6} y={10} width={308} height={160} fill="white" />
            <circle cx={132} cy={92} r={58} fill="black" />
            <circle cx={196} cy={92} r={52} fill="black" />
          </mask>
        </defs>

        {/* shaded "neither" = S minus the union */}
        <rect x={6} y={10} width={308} height={160} rx={6} className="fill-rose-500/25" mask="url(#neither-mask)" />
        <rect x={6} y={10} width={308} height={160} rx={6} className="fill-none stroke-border" strokeWidth={1} />

        <circle cx={132} cy={92} r={58} className="fill-none stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.5} />
        <circle cx={196} cy={92} r={52} className="fill-none stroke-amber-600 dark:stroke-amber-400" strokeWidth={1.5} />
        <text x={96} y={50} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[12px] font-semibold">A</text>
        <text x={234} y={50} textAnchor="middle" className="fill-amber-700 dark:fill-amber-300 text-[12px] font-semibold">B</text>
        <text x={300} y={26} textAnchor="end" className="fill-muted-foreground text-[10px]">S</text>
        <text x={40} y={158} textAnchor="middle" className="fill-rose-700 dark:fill-rose-300 text-[10px] font-semibold">neither</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Everything shaded lies outside both circles — that&apos;s &quot;neither A nor B&quot;, the complement of
        the union: <span className="font-medium text-foreground">P(neither) = 1 − P(A ∪ B)</span>. By De
        Morgan&apos;s law it&apos;s the same as A′ ∩ B′.
      </p>
    </div>
  );
}
