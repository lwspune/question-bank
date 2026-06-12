/**
 * A food chain as a horizontal flow (producer to top carnivore) plus an
 * energy pyramid showing the 10% law: only about a tenth of the energy at
 * one trophic level passes to the next, so the bars shrink sharply upward.
 * Static SVG, server component.
 */
export default function EcoFoodChainPyramid() {
  const chain = [
    { label: "Grass", sub: "Producer", cls: "fill-emerald-100/70 stroke-emerald-600 dark:fill-emerald-900/40" },
    { label: "Grasshopper", sub: "Primary consumer", cls: "fill-lime-100/70 stroke-lime-600 dark:fill-lime-900/40" },
    { label: "Frog", sub: "Secondary consumer", cls: "fill-sky-100/70 stroke-sky-600 dark:fill-sky-900/40" },
    { label: "Snake", sub: "Tertiary consumer", cls: "fill-indigo-100/70 stroke-indigo-600 dark:fill-indigo-900/40" },
  ];
  const energy = [
    { label: "Producers", value: "1000 units", w: 200 },
    { label: "Primary consumers", value: "100 units", w: 130 },
    { label: "Secondary consumers", value: "10 units", w: 70 },
    { label: "Top consumers", value: "1 unit", w: 32 },
  ];
  return (
    <div className="mx-auto max-w-lg rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 360 260" className="w-full" role="img" aria-label="A food chain flows in one direction from grass (producer) to grasshopper (primary consumer) to frog (secondary consumer) to snake (tertiary consumer), each linked by an arrow showing who eats whom. Below it, an energy pyramid shows the ten percent law: producers hold 1000 units of energy, primary consumers 100, secondary consumers 10, and top consumers only 1 unit, so each higher trophic level has roughly one tenth the energy of the level below it.">
        <text x="180" y="14" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="9.5" fontWeight="700">Food chain — energy flows one way</text>
        {chain.map((b, i) => {
          const x = 8 + i * 88;
          const y = 26;
          return (
            <g key={b.label}>
              <rect x={x} y={y} width="78" height="40" rx="6" className={`${b.cls}`} strokeWidth="1.6" />
              <text x={x + 39} y={y + 18} textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="9" fontWeight="700">{b.label}</text>
              <text x={x + 39} y={y + 31} textAnchor="middle" className="fill-slate-500 dark:fill-slate-300" fontSize="6.6">{b.sub}</text>
              {i < chain.length - 1 && (
                <line x1={x + 78} y1={y + 20} x2={x + 88} y2={y + 20} className="stroke-slate-500" strokeWidth="1.8" markerEnd="url(#eco-arrow)" />
              )}
            </g>
          );
        })}
        <text x="180" y="92" textAnchor="middle" className="fill-slate-500" fontSize="7">Arrows point toward who receives the energy (the eater)</text>

        <text x="180" y="116" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="9.5" fontWeight="700">Energy pyramid — the 10% law</text>
        {energy.map((e, i) => {
          const y = 128 + i * 32;
          const x = 180 - e.w / 2;
          const shades = [
            "fill-emerald-200/70 stroke-emerald-600 dark:fill-emerald-900/40",
            "fill-lime-200/70 stroke-lime-600 dark:fill-lime-900/40",
            "fill-sky-200/70 stroke-sky-600 dark:fill-sky-900/40",
            "fill-indigo-200/70 stroke-indigo-600 dark:fill-indigo-900/40",
          ];
          return (
            <g key={e.label}>
              <rect x={x} y={y} width={e.w} height="26" rx="3" className={shades[i]} strokeWidth="1.4" />
              <text x={180} y={y + 12} textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="7.4" fontWeight="600">{e.label}</text>
              <text x={180} y={y + 21} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="6.8">{e.value}</text>
            </g>
          );
        })}
        <text x="180" y="256" textAnchor="middle" className="fill-slate-500" fontSize="7">Only ~10% of energy passes up each level — the rest is lost as heat</text>
        <defs>
          <marker id="eco-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-slate-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
