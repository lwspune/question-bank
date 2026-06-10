/**
 * Displacement-time sinusoid for simple harmonic motion. One full period T is
 * marked along the time axis; two points exactly one period apart (Δt = T) are
 * highlighted to show they share the SAME PHASE (same displacement AND same
 * direction of motion). Reinforces the rule the NDA tests: two instants are in
 * phase iff they differ by an integer multiple of T.
 *
 * Server component — static 2-D.
 */
export default function OscShmDisplacementTime() {
  const ox = 60; // origin x (t = 0)
  const oy = 120; // mid-line y (displacement = 0)
  const w = 470;
  const amp = 70; // pixel amplitude
  const period = 160; // pixels per period T

  // sine curve y(t) = oy - amp*sin(2π t / period), sampled
  const pts: string[] = [];
  for (let x = 0; x <= w - 20; x += 3) {
    const y = oy - amp * Math.sin((2 * Math.PI * x) / period);
    pts.push(`${ox + x},${y.toFixed(1)}`);
  }

  // two same-phase points one period apart: first at quarter into curve, second +T
  const p1x = ox + 40;
  const p2x = p1x + period;
  const phaseY = oy - amp * Math.sin((2 * Math.PI * 40) / period);

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 250"
        className="w-full"
        role="img"
        aria-label="Displacement versus time sine curve for simple harmonic motion. One full period T is marked, and two points one period apart are highlighted as sharing the same phase."
      >
        <defs>
          <marker id="osc-dt-ax" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-slate-500 dark:fill-slate-400" />
          </marker>
        </defs>

        {/* axes */}
        <line x1={ox} y1={oy} x2={ox + w} y2={oy} className="stroke-slate-500" strokeWidth="1.5" markerEnd="url(#osc-dt-ax)" />
        <line x1={ox} y1={oy + amp + 15} x2={ox} y2={oy - amp - 15} className="stroke-slate-500" strokeWidth="1.5" markerEnd="url(#osc-dt-ax)" />
        <text x={ox + w} y={oy + 20} textAnchor="end" fontSize="13" className="fill-slate-700 dark:fill-slate-300">time t</text>
        <text x={ox - 10} y={oy - amp - 18} textAnchor="end" fontSize="13" className="fill-slate-700 dark:fill-slate-300">x</text>

        {/* amplitude guide lines */}
        <line x1={ox} y1={oy - amp} x2={ox + w - 20} y2={oy - amp} className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="3 4" />
        <line x1={ox} y1={oy + amp} x2={ox + w - 20} y2={oy + amp} className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="3 4" />
        <text x={ox - 10} y={oy - amp + 4} textAnchor="end" fontSize="11" className="fill-slate-500">+A</text>
        <text x={ox - 10} y={oy + amp + 4} textAnchor="end" fontSize="11" className="fill-slate-500">−A</text>

        {/* the sine curve */}
        <polyline points={pts.join(" ")} fill="none" className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2.5" />

        {/* one-period span marker */}
        <line x1={p1x} y1={oy + amp + 28} x2={p2x} y2={oy + amp + 28} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="1.5" />
        <line x1={p1x} y1={oy + amp + 22} x2={p1x} y2={oy + amp + 34} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="1.5" />
        <line x1={p2x} y1={oy + amp + 22} x2={p2x} y2={oy + amp + 34} className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="1.5" />
        <text x={(p1x + p2x) / 2} y={oy + amp + 46} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-rose-700 dark:fill-rose-300">one period T</text>

        {/* the two same-phase points */}
        <circle cx={p1x} cy={phaseY} r="5" className="fill-emerald-600 dark:fill-emerald-400" />
        <circle cx={p2x} cy={phaseY} r="5" className="fill-emerald-600 dark:fill-emerald-400" />
        <text x={p1x} y={phaseY - 12} textAnchor="middle" fontSize="11" fontWeight="600" className="fill-emerald-700 dark:fill-emerald-300">same phase</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        The displacement repeats every period T. Two instants are in the same
        phase only when they are separated by a whole number of periods (Δt = nT).
      </p>
    </div>
  );
}
