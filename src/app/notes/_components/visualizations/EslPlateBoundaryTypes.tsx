/**
 * The three plate-boundary types side by side: convergent (one plate subducts,
 * building a trench + volcanic arc), divergent (plates pull apart at a ridge,
 * making new crust), and transform (plates slide past on a strike-slip fault).
 * Static SVG, server component.
 */
export default function EslPlateBoundaryTypes() {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 540 180"
        className="w-full"
        role="img"
        aria-label="Three plate boundary types. Convergent: two plates collide and the denser oceanic plate subducts beneath the other, forming a deep trench and a volcanic arc. Divergent: two plates move apart at a mid-ocean ridge where rising magma creates new crust. Transform: two plates slide horizontally past each other along a strike-slip fault."
      >
        {/* CONVERGENT */}
        <text x="90" y="14" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="9" fontWeight="700">Convergent</text>
        <rect x="20" y="60" width="70" height="22" className="fill-sky-300/70 stroke-sky-700 dark:fill-sky-900/50" strokeWidth="1.2" />
        <polygon points="90,60 160,60 160,82 110,82" className="fill-amber-300/70 stroke-amber-700 dark:fill-amber-900/50" strokeWidth="1.2" />
        {/* subducting slab going down */}
        <polygon points="90,60 110,82 100,120 80,98" className="fill-sky-400/70 stroke-sky-700 dark:fill-sky-900/60" strokeWidth="1" />
        <path d="M 30 70 L 36 70 M 150 70 L 144 70" className="stroke-slate-600" strokeWidth="1.4" markerEnd="url(#arr)" />
        <polygon points="125,48 132,60 118,60" className="fill-rose-500/80 stroke-rose-700" strokeWidth="0.8" />
        <text x="125" y="44" textAnchor="middle" className="fill-slate-500" fontSize="6">volcano</text>
        <text x="92" y="95" textAnchor="middle" className="fill-slate-500" fontSize="6">trench</text>
        <text x="90" y="140" textAnchor="middle" className="fill-slate-500" fontSize="7">subduction → trench + arc</text>
        <text x="90" y="151" textAnchor="middle" className="fill-slate-500" fontSize="6.5">(Andes, Himalayas)</text>

        {/* DIVERGENT */}
        <text x="270" y="14" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="9" fontWeight="700">Divergent</text>
        <rect x="200" y="60" width="58" height="22" className="fill-sky-300/70 stroke-sky-700 dark:fill-sky-900/50" strokeWidth="1.2" />
        <rect x="282" y="60" width="58" height="22" className="fill-sky-300/70 stroke-sky-700 dark:fill-sky-900/50" strokeWidth="1.2" />
        <polygon points="270,82 262,60 278,60" className="fill-rose-500/80 stroke-rose-700" strokeWidth="0.8" />
        <path d="M 240 71 L 232 71 M 300 71 L 308 71" className="stroke-slate-600" strokeWidth="1.4" markerEnd="url(#arr)" />
        <text x="270" y="95" textAnchor="middle" className="fill-slate-500" fontSize="6">ridge (new crust)</text>
        <text x="270" y="140" textAnchor="middle" className="fill-slate-500" fontSize="7">sea-floor spreading</text>
        <text x="270" y="151" textAnchor="middle" className="fill-slate-500" fontSize="6.5">(Mid-Atlantic Ridge)</text>

        {/* TRANSFORM */}
        <text x="455" y="14" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="9" fontWeight="700">Transform</text>
        <rect x="385" y="58" width="140" height="24" className="fill-amber-200/70 stroke-amber-700 dark:fill-amber-900/40" strokeWidth="0.8" />
        <line x1="455" y1="50" x2="455" y2="90" className="stroke-slate-700" strokeWidth="1.6" />
        <path d="M 420 67 L 412 67 M 490 73 L 498 73" className="stroke-slate-600" strokeWidth="1.4" markerEnd="url(#arr)" />
        <text x="455" y="100" textAnchor="middle" className="fill-slate-500" fontSize="6">strike-slip fault</text>
        <text x="455" y="140" textAnchor="middle" className="fill-slate-500" fontSize="7">plates slide past</text>
        <text x="455" y="151" textAnchor="middle" className="fill-slate-500" fontSize="6.5">(San Andreas)</text>

        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-slate-600" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
