/**
 * Static figure: conditioning on B shrinks the sample space to B, so
 * P(A|B) is the share of B that also lies in A — the lens over all of B.
 *
 * Pedagogical aim: "given B" means B becomes the new whole; that's why we
 * divide by P(B). Server component — no client state.
 */

export default function ConditionalRestrict() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · P(A | B) restricts the world to B
      </p>

      <svg viewBox="0 0 320 190" className="block w-full h-auto max-w-[320px] mx-auto" role="img" aria-label="Conditioning on B: B becomes the new sample space and P(A given B) is the lens over B">
        <defs>
          <clipPath id="cr-lens">
            <circle cx={132} cy={96} r={58} />
          </clipPath>
        </defs>

        {/* sample space */}
        <rect x={6} y={10} width={308} height={150} rx={6} className="fill-muted/20 stroke-border" strokeWidth={1} />
        <text x={302} y={26} textAnchor="end" className="fill-muted-foreground text-[10px]">S</text>

        {/* B = the new universe, filled */}
        <circle cx={196} cy={96} r={52} className="fill-amber-500/30 stroke-amber-600 dark:stroke-amber-400" strokeWidth={1.5} />
        {/* A outline */}
        <circle cx={132} cy={96} r={58} className="fill-none stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.5} />
        {/* A∩B lens (A clipped to ... drawn as B clipped by A) */}
        <circle cx={196} cy={96} r={52} clipPath="url(#cr-lens)" className="fill-indigo-500/55" />

        <text x={104} y={100} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[12px] font-semibold">A</text>
        <text x={232} y={100} textAnchor="middle" className="fill-amber-700 dark:fill-amber-300 text-[12px] font-semibold">B</text>
        <text x={166} y={100} textAnchor="middle" className="fill-white text-[10px] font-semibold">A∩B</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Once B is given, only the amber region counts — it&apos;s the new whole. P(A | B) is the slice of B that
        also lies in A: <span className="font-medium text-foreground">P(A | B) = P(A∩B) / P(B)</span>. Dividing
        by P(B) is exactly &quot;rescale B to be the new 100%&quot;.
      </p>
    </div>
  );
}
