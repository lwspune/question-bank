/**
 * The malaria transmission cycle: female Anopheles mosquito (the vector) bites
 * a human and injects Plasmodium (the parasite), which multiplies in the liver
 * then in red blood cells. Another mosquito picks the parasite back up at its
 * next blood meal — closing the loop. Static SVG, server component.
 */
export default function MicroMalariaCycle() {
  const nodes = [
    { x: 56, y: 40, label: "Female Anopheles", sub: "(vector)", cls: "fill-amber-100/70 stroke-amber-600 dark:fill-amber-900/40" },
    { x: 232, y: 40, label: "Human blood", sub: "bitten", cls: "fill-rose-100/70 stroke-rose-600 dark:fill-rose-900/40" },
    { x: 232, y: 150, label: "Liver", sub: "Plasmodium multiplies", cls: "fill-indigo-100/70 stroke-indigo-600 dark:fill-indigo-900/40" },
    { x: 56, y: 150, label: "Red blood cells", sub: "parasite replicates", cls: "fill-sky-100/70 stroke-sky-600 dark:fill-sky-900/40" },
  ];
  return (
    <div className="mx-auto max-w-lg rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 320 210" className="w-full" role="img" aria-label="Malaria cycle: a female Anopheles mosquito bites a human and injects Plasmodium; the parasite multiplies in the liver then in red blood cells; another mosquito picks it up at its next blood meal, closing the loop.">
        <defs>
          <marker id="micro-malaria-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" className="fill-slate-500" />
          </marker>
        </defs>
        {/* clockwise loop arrows */}
        <line x1="108" y1="40" x2="180" y2="40" className="stroke-slate-500" strokeWidth="1.6" markerEnd="url(#micro-malaria-arrow)" />
        <line x1="232" y1="68" x2="232" y2="122" className="stroke-slate-500" strokeWidth="1.6" markerEnd="url(#micro-malaria-arrow)" />
        <line x1="180" y1="150" x2="112" y2="150" className="stroke-slate-500" strokeWidth="1.6" markerEnd="url(#micro-malaria-arrow)" />
        <line x1="56" y1="122" x2="56" y2="68" className="stroke-slate-500" strokeWidth="1.6" markerEnd="url(#micro-malaria-arrow)" />
        {nodes.map((n) => (
          <g key={n.label}>
            <rect x={n.x - 48} y={n.y - 20} width="96" height="40" rx="7" className={n.cls} strokeWidth="1.6" />
            <text x={n.x} y={n.y - 2} textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8.6" fontWeight="600">{n.label}</text>
            <text x={n.x} y={n.y + 11} textAnchor="middle" className="fill-slate-500 dark:fill-slate-300" fontSize="7.4">{n.sub}</text>
          </g>
        ))}
        <text x="160" y="105" textAnchor="middle" className="fill-slate-500" fontSize="8" fontWeight="600">Plasmodium</text>
      </svg>
      <p className="mt-1 text-center text-xs text-slate-500">
        Vector = the carrier (mosquito). Pathogen = the parasite (Plasmodium). The bank loves to swap them.
      </p>
    </div>
  );
}
