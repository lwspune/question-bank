/**
 * The plant-kingdom progression as a left-to-right ladder of increasing
 * complexity: Thallophyta (algae) → Bryophyta (mosses, "amphibians") →
 * Pteridophyta (ferns, first vascular) → Gymnosperms (naked seeds) →
 * Angiosperms (enclosed seeds, flowering). Each step adds the feature the
 * NDA keys on. Static SVG, server component.
 */
export default function BiodivPlantProgression() {
  const steps = [
    { label: "Thallophyta", gain: ["No body", "differentiation (algae)"], cls: "fill-teal-100/70 stroke-teal-600 dark:fill-teal-900/40" },
    { label: "Bryophyta", gain: ["Land plant, but", "NO vascular tissue"], cls: "fill-cyan-100/70 stroke-cyan-600 dark:fill-cyan-900/40" },
    { label: "Pteridophyta", gain: ["First TRUE", "vascular tissue"], cls: "fill-emerald-100/70 stroke-emerald-600 dark:fill-emerald-900/40" },
    { label: "Gymnosperms", gain: ["First SEEDS —", "naked (no fruit)"], cls: "fill-lime-100/70 stroke-lime-600 dark:fill-lime-900/40" },
    { label: "Angiosperms", gain: ["Seeds in fruit;", "flowers"], cls: "fill-amber-100/70 stroke-amber-600 dark:fill-amber-900/40" },
  ];
  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 130"
        className="w-full"
        role="img"
        aria-label="The plant kingdom increases in complexity left to right: Thallophyta are algae with no body differentiation; Bryophyta are land plants with no vascular tissue (the amphibians of the plant kingdom); Pteridophyta are the first plants with true vascular tissue; Gymnosperms are the first seed plants with naked seeds not enclosed in fruit; Angiosperms are flowering plants whose seeds are enclosed in fruit."
      >
        {steps.map((s, i) => {
          const x = 6 + i * 112;
          const y = 26;
          return (
            <g key={s.label}>
              <rect x={x} y={y} width="100" height="58" rx="6" className={s.cls} strokeWidth="1.6" />
              <text x={x + 50} y={y + 20} textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="9.5" fontWeight="700">{s.label}</text>
              <text x={x + 50} y={y + 38} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="6.8">{s.gain[0]}</text>
              <text x={x + 50} y={y + 48} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="6.8">{s.gain[1]}</text>
              {i < steps.length - 1 && (
                <line
                  x1={x + 100} y1={y + 29}
                  x2={x + 112} y2={y + 29}
                  className="stroke-slate-500" strokeWidth="1.8" markerEnd="url(#biodiv-plant-arrow)"
                />
              )}
            </g>
          );
        })}
        <defs>
          <marker id="biodiv-plant-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-slate-500" />
          </marker>
        </defs>
        <text x="280" y="118" textAnchor="middle" className="fill-slate-500" fontSize="8">Increasing complexity → vascular tissue → seeds → flowers/fruit</text>
      </svg>
    </div>
  );
}
