/**
 * Static figure: internal vs external division of segment AB in ratio m:n,
 * showing the two section-formula points on parallel tracks.
 *
 * Pedagogical aim: internal division lands P between A and B; external division
 * lands Q outside the segment, which is why its formula has a minus sign.
 * Server component — no client state.
 */

const W = 360;
const AX = 64;
const BX = 184;
const QX = 304; // external point for 2:1 ⇒ 2B − A
const PX = 144; // internal point for 2:1 ⇒ A + (2/3)(B − A)

const Dot = ({ x, y, cls }: { x: number; y: number; cls: string }) => (
  <circle cx={x} cy={y} r={4} className={cls} />
);

export default function SectionFormula() {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · section formula (internal vs external), m : n = 2 : 1
      </p>

      <svg viewBox={`0 0 ${W} 170`} className="block w-full h-auto" role="img" aria-label="Internal and external division of a segment in ratio two to one">
        {/* internal track */}
        <text x={AX - 6} y={36} textAnchor="end" className="fill-muted-foreground text-[10px]">internal</text>
        <line x1={AX} y1={48} x2={BX} y2={48} stroke="currentColor" className="text-foreground/70" strokeWidth={2} />
        <Dot x={AX} y={48} cls="fill-sky-600 dark:fill-sky-400" />
        <Dot x={BX} y={48} cls="fill-amber-600 dark:fill-amber-400" />
        <Dot x={PX} y={48} cls="fill-indigo-600 dark:fill-indigo-400" />
        <text x={AX} y={36} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[12px] font-semibold">A</text>
        <text x={BX} y={36} textAnchor="middle" className="fill-amber-700 dark:fill-amber-300 text-[12px] font-semibold">B</text>
        <text x={PX} y={70} textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300 text-[12px] font-semibold">P</text>
        <text x={(AX + PX) / 2} y={62} textAnchor="middle" className="fill-muted-foreground text-[9px]">2</text>
        <text x={(PX + BX) / 2} y={62} textAnchor="middle" className="fill-muted-foreground text-[9px]">1</text>

        {/* external track */}
        <text x={AX - 6} y={128} textAnchor="end" className="fill-muted-foreground text-[10px]">external</text>
        <line x1={AX} y1={120} x2={QX} y2={120} stroke="currentColor" className="text-foreground/40" strokeWidth={2} strokeDasharray="2 3" />
        <line x1={AX} y1={120} x2={BX} y2={120} stroke="currentColor" className="text-foreground/70" strokeWidth={2} />
        <Dot x={AX} y={120} cls="fill-sky-600 dark:fill-sky-400" />
        <Dot x={BX} y={120} cls="fill-amber-600 dark:fill-amber-400" />
        <Dot x={QX} y={120} cls="fill-rose-600 dark:fill-rose-400" />
        <text x={AX} y={108} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[12px] font-semibold">A</text>
        <text x={BX} y={108} textAnchor="middle" className="fill-amber-700 dark:fill-amber-300 text-[12px] font-semibold">B</text>
        <text x={QX} y={142} textAnchor="middle" className="fill-rose-700 dark:fill-rose-300 text-[12px] font-semibold">Q</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Internal: P = (m·b + n·a)/(m + n) sits between A and B. External: Q = (m·b − n·a)/(m − n) sits beyond B
        — the minus sign is what pushes it outside. The midpoint is the m = n case, (a + b)/2.
      </p>
    </div>
  );
}
