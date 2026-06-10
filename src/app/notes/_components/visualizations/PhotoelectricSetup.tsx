/**
 * Photoelectric effect setup — light of frequency f strikes a metal cathode;
 * if f is above the threshold, electrons (photoelectrons) are ejected and
 * collected at the anode, driving a current. Below threshold: no emission,
 * however bright the light. Static 2-D server component.
 */
export default function PhotoelectricSetup() {
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="Photoelectric effect: incident light ejects electrons from a metal cathode, which travel to the anode and produce a current"
      >
        <defs>
          <marker id="pe-arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" className="fill-indigo-600 dark:fill-indigo-400" />
          </marker>
        </defs>

        {/* incident light rays (top-left, wavy) */}
        <g className="stroke-amber-500" strokeWidth="2" fill="none">
          <path d="M 40 30 Q 70 45 100 60 T 160 90" markerEnd="url(#pe-arrow)" />
          <path d="M 70 20 Q 100 35 130 50 T 190 80" markerEnd="url(#pe-arrow)" />
        </g>
        <text x="40" y="22" fontSize="13" fontWeight="700" className="fill-amber-700 dark:fill-amber-400">
          Incident light (frequency f)
        </text>

        {/* cathode (metal plate, left) */}
        <rect x="170" y="80" width="16" height="140" className="fill-slate-400/60 stroke-slate-700 dark:stroke-slate-300" strokeWidth="2" />
        <text x="178" y="240" textAnchor="middle" fontSize="13" fontWeight="700" className="fill-slate-700 dark:fill-slate-300">
          Cathode
        </text>
        <text x="178" y="256" textAnchor="middle" fontSize="11" className="fill-slate-600 dark:fill-slate-400">
          (metal, emitter)
        </text>

        {/* ejected electrons travelling right */}
        <g className="fill-sky-600 dark:fill-sky-400">
          <circle cx="240" cy="120" r="7" />
          <circle cx="290" cy="150" r="7" />
          <circle cx="240" cy="180" r="7" />
        </g>
        <text x="240" y="124" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-white">e</text>
        <text x="290" y="154" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-white">e</text>
        <text x="240" y="184" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-white">e</text>
        <line x1="200" y1="150" x2="350" y2="150" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#pe-arrow)" />
        <text x="275" y="108" textAnchor="middle" fontSize="12" className="fill-sky-700 dark:fill-sky-300">
          photoelectrons
        </text>

        {/* anode (collector, right) */}
        <rect x="374" y="80" width="16" height="140" className="fill-rose-400/60 stroke-rose-700 dark:stroke-rose-300" strokeWidth="2" />
        <text x="382" y="240" textAnchor="middle" fontSize="13" fontWeight="700" className="fill-rose-700 dark:fill-rose-300">
          Anode
        </text>

        {/* external circuit with ammeter */}
        <path d="M 382 220 L 382 270 L 178 270 L 178 220" className="fill-none stroke-indigo-500" strokeWidth="2" />
        <circle cx="280" cy="270" r="18" className="fill-indigo-50 stroke-indigo-600 dark:fill-indigo-950 dark:stroke-indigo-400" strokeWidth="2" />
        <text x="280" y="275" textAnchor="middle" fontSize="14" fontWeight="700" className="fill-indigo-700 dark:fill-indigo-300">A</text>
        <text x="280" y="296" textAnchor="middle" fontSize="11" className="fill-indigo-900 dark:fill-indigo-100">
          current flows
        </text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Light above the threshold frequency ejects electrons instantly; they cross
        to the anode and a current flows. Below threshold, no electrons emerge no
        matter how bright the light.
      </p>
    </div>
  );
}
