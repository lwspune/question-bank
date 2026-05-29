/**
 * Static figure: three Venn panels for the core event operations —
 * union A∪B, intersection A∩B, and complement A′.
 *
 * Pedagogical aim: a quick visual dictionary for translating "or / and / not"
 * into shaded regions. Server component — no client state.
 */

export default function SetOperationsVenn() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · union, intersection, complement
      </p>

      <svg viewBox="0 0 360 140" className="block w-full h-auto" role="img" aria-label="Three Venn diagrams: union, intersection and complement">
        <defs>
          <clipPath id="venn-inter">
            <circle cx={164} cy={56} r={30} />
          </clipPath>
          <mask id="venn-comp">
            <rect x={246} y={14} width={108} height={84} fill="white" />
            <circle cx={300} cy={56} r={32} fill="black" />
          </mask>
        </defs>

        {/* Union */}
        <rect x={6} y={14} width={108} height={84} rx={6} className="fill-muted/20 stroke-border" strokeWidth={1} />
        <circle cx={44} cy={56} r={30} className="fill-indigo-500/35 stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.5} />
        <circle cx={76} cy={56} r={26} className="fill-indigo-500/35 stroke-amber-600 dark:stroke-amber-400" strokeWidth={1.5} />
        <text x={36} y={60} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">A</text>
        <text x={84} y={60} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">B</text>
        <text x={60} y={120} textAnchor="middle" className="fill-foreground text-[11px] font-medium">A ∪ B</text>
        <text x={60} y={134} textAnchor="middle" className="fill-muted-foreground text-[9px]">in A or B</text>

        {/* Intersection */}
        <rect x={126} y={14} width={108} height={84} rx={6} className="fill-muted/20 stroke-border" strokeWidth={1} />
        <circle cx={164} cy={56} r={30} className="fill-none stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.5} />
        <circle cx={196} cy={56} r={26} clipPath="url(#venn-inter)" className="fill-indigo-500/55" />
        <circle cx={196} cy={56} r={26} className="fill-none stroke-amber-600 dark:stroke-amber-400" strokeWidth={1.5} />
        <text x={156} y={60} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">A</text>
        <text x={204} y={60} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">B</text>
        <text x={180} y={120} textAnchor="middle" className="fill-foreground text-[11px] font-medium">A ∩ B</text>
        <text x={180} y={134} textAnchor="middle" className="fill-muted-foreground text-[9px]">in both</text>

        {/* Complement */}
        <rect x={246} y={14} width={108} height={84} rx={6} className="fill-rose-500/30" mask="url(#venn-comp)" />
        <rect x={246} y={14} width={108} height={84} rx={6} className="fill-none stroke-border" strokeWidth={1} />
        <circle cx={300} cy={56} r={32} className="fill-none stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.5} />
        <text x={300} y={60} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">A</text>
        <text x={300} y={120} textAnchor="middle" className="fill-foreground text-[11px] font-medium">A′</text>
        <text x={300} y={134} textAnchor="middle" className="fill-muted-foreground text-[9px]">not in A</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Union</span> (A ∪ B) is everything in A or B;{" "}
        <span className="font-medium text-foreground">intersection</span> (A ∩ B) is the lens in both;{" "}
        <span className="font-medium text-foreground">complement</span> (A′) is everything outside A. These
        map &quot;or / and / not&quot; straight onto regions.
      </p>
    </div>
  );
}
