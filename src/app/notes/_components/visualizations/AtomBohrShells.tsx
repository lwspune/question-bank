/**
 * Bohr model of the atom: a small dense nucleus surrounded by electron shells
 * (K, L, M ...) of fixed capacity 2n^2. Shown for sodium (Z = 11), electron
 * configuration 2, 8, 1 — the single outer electron makes its valency 1.
 * Static SVG.
 */
export default function AtomBohrShells() {
  const cx = 110;
  const cy = 110;
  // shell radius, electron count, label, capacity
  const shells = [
    { r: 30, n: 2, label: "K", cap: "2" },
    { r: 58, n: 8, label: "L", cap: "8" },
    { r: 86, n: 1, label: "M", cap: "18" },
  ];
  const eDot = "fill-rose-500 stroke-rose-700 dark:fill-rose-400";
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 300 230" className="w-full" role="img" aria-label="Bohr model of a sodium atom. A central nucleus with 11 protons is surrounded by three electron shells: K holds 2 electrons, L holds 8, and M holds 1. Each shell n holds at most 2 n squared electrons. The single outermost electron gives sodium a valency of 1.">
        <text x="110" y="16" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Sodium atom (2, 8, 1)</text>
        {/* shells */}
        {shells.map((s) => (
          <circle key={s.label} cx={cx} cy={cy} r={s.r} className="fill-none stroke-indigo-400/70 dark:stroke-indigo-500/60" strokeWidth="1.2" />
        ))}
        {/* nucleus */}
        <circle cx={cx} cy={cy} r="13" className="fill-indigo-600 stroke-indigo-800 dark:fill-indigo-500" strokeWidth="1.4" />
        <text x={cx} y={cy + 3.5} textAnchor="middle" className="fill-white" fontSize="9" fontWeight="700">+11</text>
        {/* electrons on each shell */}
        {shells.map((s) =>
          Array.from({ length: s.n }).map((_, i) => {
            const a = (2 * Math.PI * i) / s.n - Math.PI / 2;
            const ex = cx + s.r * Math.cos(a);
            const ey = cy + s.r * Math.sin(a);
            return <circle key={`${s.label}-${i}`} cx={ex.toFixed(1)} cy={ey.toFixed(1)} r="4.5" className={eDot} strokeWidth="1" />;
          })
        )}
        {/* shell labels + capacity legend on the right */}
        <g>
          <text x="210" y="60" className="fill-slate-600 dark:fill-slate-300" fontSize="9.5" fontWeight="600">Shell capacity = 2n²</text>
          <text x="210" y="80" className="fill-slate-600 dark:fill-slate-300" fontSize="9">K (n=1): max 2</text>
          <text x="210" y="98" className="fill-slate-600 dark:fill-slate-300" fontSize="9">L (n=2): max 8</text>
          <text x="210" y="116" className="fill-slate-600 dark:fill-slate-300" fontSize="9">M (n=3): max 18</text>
          <circle cx="216" cy="146" r="4.5" className={eDot} strokeWidth="1" />
          <text x="226" y="149" className="fill-slate-500" fontSize="8.5">= electron</text>
        </g>
        <text x="110" y="222" textAnchor="middle" className="fill-rose-600 dark:fill-rose-300" fontSize="8.5">1 outer electron → valency 1</text>
      </svg>
    </div>
  );
}
