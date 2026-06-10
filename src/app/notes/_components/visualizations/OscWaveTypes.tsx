/**
 * Transverse versus longitudinal waves. The transverse wave (top) shows the
 * medium displaced perpendicular to the direction of travel (a sine shape with
 * crests and troughs). The longitudinal wave (bottom) shows compressions and
 * rarefactions — particle displacement parallel to travel. Both panels carry an
 * arrow marking the direction of propagation. Reinforces the two wave families
 * and that both transport energy without transporting matter.
 *
 * Server component — static 2-D.
 */
export default function OscWaveTypes() {
  // transverse sine
  const tx0 = 70;
  const ty0 = 55;
  const tw = 400;
  const tamp = 26;
  const tperiod = 100;
  const tpts: string[] = [];
  for (let x = 0; x <= tw; x += 3) {
    const y = ty0 - tamp * Math.sin((2 * Math.PI * x) / tperiod);
    tpts.push(`${tx0 + x},${y.toFixed(1)}`);
  }

  // longitudinal: vertical lines, bunched (compressions) and spread (rarefactions)
  const lx0 = 70;
  const ly = 175;
  const lh = 34;
  const lines: number[] = [];
  for (let x = 0; x <= tw; x += 4) {
    // density modulated by a sine so lines bunch then spread
    const d = 1 + 0.85 * Math.sin((2 * Math.PI * x) / 110);
    lines.push(x * d * 0.55);
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 540 235"
        className="w-full"
        role="img"
        aria-label="Top: a transverse wave with crests and troughs, displacement perpendicular to travel. Bottom: a longitudinal wave with compressions and rarefactions, displacement parallel to travel. Both travel to the right."
      >
        <defs>
          <marker id="osc-wt-ax" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-slate-500 dark:fill-slate-400" />
          </marker>
        </defs>

        {/* TRANSVERSE */}
        <text x={tx0} y={22} fontSize="12" fontWeight="600" className="fill-indigo-700 dark:fill-indigo-300">Transverse</text>
        <line x1={tx0} y1={ty0} x2={tx0 + tw + 14} y2={ty0} className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="3 4" />
        <polyline points={tpts.join(" ")} fill="none" className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2.4" />
        <text x={tx0 + tperiod / 4} y={ty0 - tamp - 6} textAnchor="middle" fontSize="10" className="fill-slate-500">crest</text>
        <text x={tx0 + (3 * tperiod) / 4} y={ty0 + tamp + 14} textAnchor="middle" fontSize="10" className="fill-slate-500">trough</text>
        {/* propagation arrow */}
        <line x1={tx0 + tw - 30} y1={ty0 + 42} x2={tx0 + tw + 14} y2={ty0 + 42} className="stroke-slate-500" strokeWidth="1.6" markerEnd="url(#osc-wt-ax)" />
        <text x={tx0 + tw - 70} y={ty0 + 46} fontSize="10" className="fill-slate-500">travel</text>

        {/* LONGITUDINAL */}
        <text x={lx0} y={130} fontSize="12" fontWeight="600" className="fill-indigo-700 dark:fill-indigo-300">Longitudinal</text>
        {lines.map((x, i) => (
          <line
            key={i}
            x1={lx0 + x}
            y1={ly - lh / 2}
            x2={lx0 + x}
            y2={ly + lh / 2}
            className="stroke-indigo-500/80 dark:stroke-indigo-400/80"
            strokeWidth="1.3"
          />
        ))}
        <text x={lx0 + 8} y={ly + lh / 2 + 16} fontSize="10" className="fill-slate-500">compression</text>
        <text x={lx0 + 150} y={ly + lh / 2 + 16} fontSize="10" className="fill-slate-500">rarefaction</text>
        {/* propagation arrow */}
        <line x1={lx0 + tw - 30} y1={ly + lh / 2 + 26} x2={lx0 + tw + 14} y2={ly + lh / 2 + 26} className="stroke-slate-500" strokeWidth="1.6" markerEnd="url(#osc-wt-ax)" />
        <text x={lx0 + tw - 70} y={ly + lh / 2 + 30} fontSize="10" className="fill-slate-500">travel</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        In a transverse wave the medium moves perpendicular to travel (crests and
        troughs); in a longitudinal wave it moves parallel (compressions and
        rarefactions). Both carry energy without carrying matter.
      </p>
    </div>
  );
}
