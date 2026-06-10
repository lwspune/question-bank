/**
 * Bohr atom — discrete energy levels (n = 1, 2, 3, ...) drawn as horizontal
 * rungs that crowd together towards 0 eV. An electron dropping to a lower
 * level emits a photon (downward arrow); absorbing a photon lifts it up.
 * Shows the hydrogen ground-state energy -13.6 eV. Static 2-D server component.
 */
export default function BohrEnergyLevels() {
  // y positions for n = 1..4 (n=1 lowest energy = lowest on the chart)
  const levels = [
    { n: 1, y: 230, label: "-13.6 eV" },
    { n: 2, y: 150, label: "-3.4 eV" },
    { n: 3, y: 105, label: "-1.5 eV" },
    { n: 4, y: 80, label: "-0.85 eV" },
  ];
  const xL = 120;
  const xR = 400;

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 520 280"
        className="w-full"
        role="img"
        aria-label="Bohr model energy levels for hydrogen: discrete rungs crowding toward zero, with a photon emitted when an electron drops from n=3 to n=2"
      >
        <defs>
          <marker id="bohr-arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-amber-600 dark:fill-amber-400" />
          </marker>
        </defs>

        {/* ionisation line at 0 eV */}
        <line x1={xL} y1="45" x2={xR} y2="45" className="stroke-slate-400" strokeWidth="1.5" strokeDasharray="5 4" />
        <text x={xR + 6} y="49" fontSize="12" className="fill-slate-600 dark:fill-slate-400">0 eV (free)</text>

        {/* energy levels */}
        {levels.map((lv) => (
          <g key={lv.n}>
            <line x1={xL} y1={lv.y} x2={xR} y2={lv.y} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2.5" />
            <text x={xL - 10} y={lv.y + 4} textAnchor="end" fontSize="13" fontWeight="700" className="fill-indigo-700 dark:fill-indigo-300">
              n = {lv.n}
            </text>
            <text x={xR + 6} y={lv.y + 4} fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">{lv.label}</text>
          </g>
        ))}

        {/* emission transition: n=3 -> n=2 (photon out) */}
        <line x1="260" y1="105" x2="260" y2="150" className="stroke-amber-600 dark:stroke-amber-400" strokeWidth="2.5" markerEnd="url(#bohr-arrow)" />
        <text x="272" y="132" fontSize="12" fontWeight="700" className="fill-amber-700 dark:fill-amber-400">
          emits photon
        </text>

        <text x="260" y="270" textAnchor="middle" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">
          Electron drops to a lower orbit and releases energy as light
        </text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Energy is quantised: an electron can sit only on a rung, never between
        them. Ground state of hydrogen is -13.6 eV, so its ionisation energy is
        13.6 eV.
      </p>
    </div>
  );
}
