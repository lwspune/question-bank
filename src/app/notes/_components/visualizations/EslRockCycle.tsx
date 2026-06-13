/**
 * The rock cycle as a triangle of the three rock families — igneous,
 * sedimentary, metamorphic — joined by the processes that convert one into the
 * next (melting, weathering + lithification, heat + pressure). Static SVG,
 * server component.
 */
export default function EslRockCycle() {
  const nodes = [
    { x: 200, y: 36, label: "Igneous", sub: "cooled magma/lava", cls: "fill-rose-200/80 stroke-rose-700 dark:fill-rose-900/50" },
    { x: 70, y: 200, label: "Sedimentary", sub: "compacted sediment", cls: "fill-amber-200/80 stroke-amber-700 dark:fill-amber-900/50" },
    { x: 330, y: 200, label: "Metamorphic", sub: "heat + pressure", cls: "fill-violet-200/80 stroke-violet-700 dark:fill-violet-900/50" },
  ];
  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 400 270"
        className="w-full"
        role="img"
        aria-label="The rock cycle. Three rock families sit at the corners of a triangle: igneous (cooled from magma or lava), sedimentary (loose sediment weathered, lithified and compacted), and metamorphic (older rock changed by heat and pressure). Arrows around the triangle show that each family can transform into the others — weathering and lithification make sedimentary rock, heat and pressure make metamorphic rock, and melting then cooling returns to igneous rock."
      >
        {/* connecting arrows */}
        <path d="M 175 70 L 95 168" className="fill-none stroke-slate-400" strokeWidth="1.4" markerEnd="url(#rcarr)" />
        <text x="108" y="120" className="fill-slate-500" fontSize="6.5" transform="rotate(50 108 120)">weathering →</text>
        <path d="M 110 210 L 290 210" className="fill-none stroke-slate-400" strokeWidth="1.4" markerEnd="url(#rcarr)" />
        <text x="160" y="224" className="fill-slate-500" fontSize="6.5">heat + pressure →</text>
        <path d="M 305 168 L 225 70" className="fill-none stroke-slate-400" strokeWidth="1.4" markerEnd="url(#rcarr)" />
        <text x="262" y="120" className="fill-slate-500" fontSize="6.5" transform="rotate(-50 262 120)">melt + cool →</text>

        {nodes.map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="40" className={n.cls} strokeWidth="1.6" />
            <text x={n.x} y={n.y - 2} textAnchor="middle" className="fill-slate-800 dark:fill-slate-100" fontSize="9" fontWeight="700">{n.label}</text>
            <text x={n.x} y={n.y + 11} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="6">{n.sub}</text>
          </g>
        ))}

        <text x="200" y="262" textAnchor="middle" className="fill-slate-500" fontSize="7.5">Rocks never stay in one form — they recycle endlessly</text>

        <defs>
          <marker id="rcarr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" className="fill-slate-400" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
