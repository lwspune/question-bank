/**
 * The reflex arc as a five-box flow: receptor → sensory neuron → spinal cord
 * → motor neuron → effector. The signal loops through the spinal cord, not
 * the brain — which is why reflexes are fast. Static SVG.
 */
export default function HpReflexArc() {
  const boxes = [
    { label: "Receptor", cls: "fill-sky-100/70 stroke-sky-600 dark:fill-sky-900/40" },
    { label: "Sensory neuron", cls: "fill-indigo-100/70 stroke-indigo-600 dark:fill-indigo-900/40" },
    { label: "Spinal cord", cls: "fill-rose-100/70 stroke-rose-600 dark:fill-rose-900/40" },
    { label: "Motor neuron", cls: "fill-indigo-100/70 stroke-indigo-600 dark:fill-indigo-900/40" },
    { label: "Effector", cls: "fill-emerald-100/70 stroke-emerald-600 dark:fill-emerald-900/40" },
  ];
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 320 110" className="w-full" role="img" aria-label="The reflex arc flows in one direction: receptor to sensory neuron to spinal cord to motor neuron to effector. The signal is processed in the spinal cord, not the brain.">
        {boxes.map((b, i) => {
          const y = 18 + (i % 2) * 44; // zig-zag so 5 boxes fit
          const x = 6 + i * 62;
          return (
            <g key={b.label}>
              <rect x={x} y={y} width="56" height="34" rx="6" className={`${b.cls}`} strokeWidth="1.6" />
              <text x={x + 28} y={y + 21} textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="8.2" fontWeight="600">{b.label}</text>
              {i < boxes.length - 1 && (
                <line
                  x1={x + 56} y1={y + 17}
                  x2={x + 68} y2={18 + ((i + 1) % 2) * 44 + 17}
                  className="stroke-slate-500" strokeWidth="1.6" markerEnd="url(#hp-arrow)"
                />
              )}
            </g>
          );
        })}
        <defs>
          <marker id="hp-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-slate-500" />
          </marker>
        </defs>
        <text x="160" y="106" textAnchor="middle" className="fill-slate-500" fontSize="8">Processed in the spinal cord — not the brain (so it&rsquo;s fast)</text>
      </svg>
    </div>
  );
}
