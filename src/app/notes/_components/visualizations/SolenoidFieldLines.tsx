/**
 * Solenoid field (side view) — a uniform field inside (parallel arrows) and a
 * bar-magnet-like external loop, with one end acting as N and the other as S.
 * Current dots (⊙, out of page) on top and crosses (⊗, into page) on the
 * bottom set the field direction by the right-hand rule. B = μ₀nI inside.
 *
 * Server component — static 2-D.
 */
export default function SolenoidFieldLines() {
  const x0 = 170;
  const x1 = 380;
  const cy = 150;
  const half = 32;
  const top = cy - half;
  const bot = cy + half;
  const turns = 7;
  const xs = Array.from({ length: turns }, (_, i) => x0 + ((i + 0.5) * (x1 - x0)) / turns);

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="Side view of a solenoid with a uniform internal magnetic field and external loops, behaving like a bar magnet"
      >
        <defs>
          <marker id="sol-arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* external return loops (N right → S left), like a bar magnet */}
        <path d={`M ${x1} ${top + 6} C ${x1 + 70} ${cy - 80}, ${x0 - 70} ${cy - 80}, ${x0} ${top + 6}`} className="fill-none stroke-indigo-500/60" strokeWidth="1.5" />
        <line x1={cy + 130} y1={cy - 72} x2={cy + 126} y2={cy - 72} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2" markerEnd="url(#sol-arrow)" />
        <path d={`M ${x1} ${bot - 6} C ${x1 + 70} ${cy + 80}, ${x0 - 70} ${cy + 80}, ${x0} ${bot - 6}`} className="fill-none stroke-indigo-500/60" strokeWidth="1.5" />
        <line x1={cy + 130} y1={cy + 72} x2={cy + 126} y2={cy + 72} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2" markerEnd="url(#sol-arrow)" />

        {/* coil body */}
        <rect x={x0} y={top} width={x1 - x0} height={half * 2} rx={4} className="fill-amber-500/10 stroke-amber-600/70 dark:stroke-amber-400/70" strokeWidth="1.5" />

        {/* turns: current OUT of page on top (dots), INTO page on bottom (crosses) */}
        {xs.map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={top} r={4.5} className="fill-amber-50 stroke-amber-700 dark:fill-amber-950 dark:stroke-amber-300" strokeWidth="1.5" />
            <circle cx={x} cy={top} r={1.4} className="fill-amber-700 dark:fill-amber-300" />
            <g className="stroke-amber-700 dark:stroke-amber-300" strokeWidth="1.5">
              <line x1={x - 3.2} y1={bot - 3.2} x2={x + 3.2} y2={bot + 3.2} />
              <line x1={x - 3.2} y1={bot + 3.2} x2={x + 3.2} y2={bot - 3.2} />
            </g>
          </g>
        ))}

        {/* uniform interior field — parallel arrows pointing toward N (right) */}
        {[cy - 14, cy, cy + 14].map((y) => (
          <line key={y} x1={x0 + 16} y1={y} x2={x1 - 16} y2={y} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2" markerEnd="url(#sol-arrow)" />
        ))}

        {/* pole equivalence */}
        <text x={x0 - 16} y={cy + 6} textAnchor="middle" fontSize="18" fontWeight="700" className="fill-sky-700 dark:fill-sky-300">S</text>
        <text x={x1 + 16} y={cy + 6} textAnchor="middle" fontSize="18" fontWeight="700" className="fill-rose-700 dark:fill-rose-300">N</text>

        <text x={280} y={232} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-indigo-700 dark:fill-indigo-300">B = μ₀nI — uniform inside</text>
        <text x={280} y={252} textAnchor="middle" fontSize="11" className="fill-slate-500">a current-carrying solenoid acts like a bar magnet</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Inside a long solenoid the field is strong and uniform (B = μ₀nI);
        outside, the loops close like a bar magnet&apos;s, with N and S ends.
      </p>
    </div>
  );
}
