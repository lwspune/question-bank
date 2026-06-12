/**
 * Tropisms: a young seedling shows negative geotropism (shoot grows UP, away
 * from gravity) and positive geotropism (root grows DOWN, towards gravity);
 * the shoot also bends towards light (positive phototropism). Static SVG.
 */
export default function PlantTropismBending() {
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 240 200"
        className="w-full"
        role="img"
        aria-label="A seedling shows tropisms. The shoot grows upward, away from gravity — this is negative geotropism. The root grows downward, towards gravity — positive geotropism. The shoot also bends towards a light source on one side, which is positive phototropism."
      >
        {/* ground line */}
        <line x1="20" y1="120" x2="220" y2="120" className="stroke-amber-700/60" strokeWidth="2" />
        <text x="40" y="134" className="fill-amber-700 dark:fill-amber-300" fontSize="7">soil surface</text>

        {/* sun (light source) top-right */}
        <circle cx="206" cy="34" r="13" className="fill-amber-300/80 stroke-amber-500" strokeWidth="1.4" />
        <text x="206" y="55" textAnchor="middle" className="fill-amber-600 dark:fill-amber-300" fontSize="7">light</text>

        {/* shoot — grows up, bends towards light */}
        <path d="M120,120 C120,90 124,70 150,52" className="fill-none stroke-emerald-600" strokeWidth="3.2" markerEnd="url(#plant-trop-tip)" />
        <text x="92" y="78" className="fill-emerald-700 dark:fill-emerald-300" fontSize="7.5" fontWeight="700">shoot ↑</text>
        <text x="86" y="90" className="fill-slate-500" fontSize="6.5">negative geotropism</text>
        <text x="86" y="100" className="fill-slate-500" fontSize="6.5">+ phototropic bend →</text>

        {/* root — grows down, towards gravity */}
        <path d="M120,120 C118,148 122,166 116,184" className="fill-none stroke-amber-700" strokeWidth="3.2" markerEnd="url(#plant-trop-root)" />
        <text x="128" y="160" className="fill-amber-700 dark:fill-amber-300" fontSize="7.5" fontWeight="700">root ↓</text>
        <text x="128" y="172" className="fill-slate-500" fontSize="6.5">positive geotropism</text>

        {/* gravity arrow */}
        <line x1="34" y1="150" x2="34" y2="184" className="stroke-slate-500" strokeWidth="1.6" markerEnd="url(#plant-trop-g)" />
        <text x="34" y="148" textAnchor="middle" className="fill-slate-500" fontSize="7">gravity g</text>

        <defs>
          <marker id="plant-trop-tip" markerWidth="7" markerHeight="7" refX="3" refY="3" orient="auto">
            <circle cx="3" cy="3" r="2.6" className="fill-emerald-600" />
          </marker>
          <marker id="plant-trop-root" markerWidth="7" markerHeight="7" refX="3" refY="3" orient="auto">
            <circle cx="3" cy="3" r="2.6" className="fill-amber-700" />
          </marker>
          <marker id="plant-trop-g" markerWidth="7" markerHeight="7" refX="3" refY="5" orient="auto">
            <path d="M0,0 L6,0 L3,6 Z" className="fill-slate-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
