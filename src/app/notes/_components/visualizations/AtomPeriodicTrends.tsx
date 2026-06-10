/**
 * Periodic trends over a schematic periodic-table grid. Across a period (left to
 * right) atomic radius DECREASES while ionization energy and electronegativity
 * INCREASE; down a group radius INCREASES while ionization energy and
 * electronegativity DECREASE. Static SVG.
 */
export default function AtomPeriodicTrends() {
  const cols = 6;
  const rows = 4;
  const x0 = 70;
  const y0 = 40;
  const w = 22;
  const h = 22;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={x0 + c * w}
          y={y0 + r * h}
          width={w - 2}
          height={h - 2}
          rx="2"
          className="fill-indigo-100/60 stroke-indigo-400 dark:fill-indigo-900/30 dark:stroke-indigo-600"
          strokeWidth="1"
        />
      );
    }
  }
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 300 200" className="w-full" role="img" aria-label="Periodic trends. Across a period from left to right, atomic radius decreases while ionization energy and electronegativity increase. Down a group, atomic radius increases while ionization energy and electronegativity decrease.">
        {cells}
        {/* across-period arrow (top): IE + electronegativity increase to the right */}
        <defs>
          <marker id="trendArrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-rose-600 dark:fill-rose-400" />
          </marker>
        </defs>
        <line x1="72" y1="28" x2="196" y2="28" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="1.6" markerEnd="url(#trendArrow)" />
        <text x="134" y="22" textAnchor="middle" className="fill-rose-600 dark:fill-rose-300" fontSize="8.5" fontWeight="600">Ionization energy, electronegativity →</text>
        {/* down-group arrow (left): atomic radius increases downward */}
        <line x1="58" y1="44" x2="58" y2="120" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth="1.6" markerEnd="url(#trendArrowDown)" />
        <marker id="trendArrowDown" markerWidth="7" markerHeight="7" refX="3" refY="5" orient="auto">
          <path d="M0,0 L6,0 L3,6 Z" className="fill-sky-600 dark:fill-sky-400" />
        </marker>
        <text x="50" y="84" textAnchor="middle" className="fill-sky-600 dark:fill-sky-300" fontSize="8.5" fontWeight="600" transform="rotate(-90 50 84)">Atomic radius ↑</text>
        {/* summary line */}
        <text x="150" y="156" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="9">Across a period →: radius smaller, IE &amp; EN larger</text>
        <text x="150" y="172" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="9">Down a group ↓: radius larger, IE &amp; EN smaller</text>
      </svg>
    </div>
  );
}
