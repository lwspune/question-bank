/**
 * Three arrow (mapping) diagrams contrasting injective, surjective and
 * bijective functions between two finite sets. A genuinely visual aid for the
 * one-one / onto / bijective definitions. Static server-component SVG.
 */
export default function FunctionMappingDiagram() {
  const W = 360;
  const H = 330;
  const leftX = 95;
  const rightX = 265;

  // Each row: label, list of [fromIndex, toIndex] arrows, dot counts.
  const rows = [
    {
      y: 30,
      label: "One-one (injective): distinct inputs → distinct outputs",
      left: 3,
      right: 4,
      arrows: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      note: "target 4 unused — one-one but not onto",
    },
    {
      y: 140,
      label: "Onto (surjective): every output is hit",
      left: 4,
      right: 3,
      arrows: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 2],
      ],
      note: "two inputs share output 3 — onto but not one-one",
    },
    {
      y: 250,
      label: "Bijective: perfect pairing (one-one AND onto)",
      left: 3,
      right: 3,
      arrows: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      note: "invertible",
    },
  ];

  const dotY = (base: number, i: number, n: number) =>
    base + 22 + i * (60 / Math.max(1, n - 1 || 1));

  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Three mapping diagrams showing injective, surjective and bijective functions between two sets"
      >
        {rows.map((row, ri) => (
          <g key={ri}>
            <text x={W / 2} y={row.y} className="fill-indigo-900 dark:fill-indigo-100" fontSize="11" fontWeight="600" textAnchor="middle">
              {row.label}
            </text>
            {/* set ovals */}
            <ellipse cx={leftX} cy={row.y + 50} rx={34} ry={46} className="fill-white/60 stroke-indigo-400/60 dark:fill-indigo-900/30" strokeWidth="1.2" />
            <ellipse cx={rightX} cy={row.y + 50} rx={34} ry={46} className="fill-white/60 stroke-indigo-400/60 dark:fill-indigo-900/30" strokeWidth="1.2" />
            {/* dots */}
            {Array.from({ length: row.left }).map((_, i) => (
              <circle key={`l${i}`} cx={leftX} cy={dotY(row.y, i, row.left)} r={5} className="fill-indigo-600 dark:fill-indigo-300" />
            ))}
            {Array.from({ length: row.right }).map((_, i) => (
              <circle key={`r${i}`} cx={rightX} cy={dotY(row.y, i, row.right)} r={5} className="fill-indigo-500/70 dark:fill-indigo-400/70" />
            ))}
            {/* arrows */}
            {row.arrows.map(([from, to], ai) => (
              <line
                key={`a${ai}`}
                x1={leftX + 8}
                y1={dotY(row.y, from, row.left)}
                x2={rightX - 8}
                y2={dotY(row.y, to, row.right)}
                className="stroke-indigo-500/80"
                strokeWidth="1.4"
                markerEnd="url(#fmd-arrow)"
              />
            ))}
            <text x={W / 2} y={row.y + 104} className="fill-indigo-700 dark:fill-indigo-300" fontSize="9.5" textAnchor="middle">
              {row.note}
            </text>
          </g>
        ))}
        <defs>
          <marker id="fmd-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-indigo-500/80" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
