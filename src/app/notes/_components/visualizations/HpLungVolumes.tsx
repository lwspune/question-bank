/**
 * Lung volumes as a stacked bar (rough spirometry proportions). Tidal volume
 * (~500 mL) is visibly the smallest band; IRV is the largest; residual volume
 * is the air that can never be exhaled. Static SVG.
 */
export default function HpLungVolumes() {
  // (label, approx mL, colour class)
  const bands = [
    { label: "IRV", ml: 3000, cls: "fill-indigo-300/70 stroke-indigo-600 dark:fill-indigo-800/50" },
    { label: "Tidal volume", ml: 500, cls: "fill-rose-400/80 stroke-rose-600 dark:fill-rose-700/60" },
    { label: "ERV", ml: 1100, cls: "fill-sky-300/70 stroke-sky-600 dark:fill-sky-800/50" },
    { label: "Residual", ml: 1200, cls: "fill-slate-300/70 stroke-slate-500 dark:fill-slate-700/60" },
  ];
  const total = bands.reduce((a, b) => a + b.ml, 0);
  const H = 150;
  let y = 20;
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 260 200" className="w-full" role="img" aria-label="Stacked bar of lung volumes. Tidal volume (about 500 millilitres) is the smallest band; inspiratory reserve volume is the largest; residual volume is the air that always remains and cannot be exhaled.">
        <text x="130" y="13" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="9" fontWeight="600">Lung volumes (approx.)</text>
        {bands.map((b) => {
          const h = (b.ml / total) * H;
          const rect = (
            <g key={b.label}>
              <rect x="60" y={y} width="70" height={h} className={`${b.cls}`} strokeWidth="1.4" />
              <text x="138" y={y + h / 2 + 3} className="fill-slate-700 dark:fill-slate-100" fontSize="9" fontWeight={b.label === "Tidal volume" ? 700 : 500}>
                {b.label}
              </text>
              <text x="232" y={y + h / 2 + 3} textAnchor="end" className="fill-slate-500" fontSize="8">{b.ml} mL</text>
            </g>
          );
          y += h;
          return rect;
        })}
        <text x="60" y={H + 36} className="fill-rose-600 dark:fill-rose-300" fontSize="8.5">Tidal volume = a normal quiet breath, the smallest band.</text>
      </svg>
    </div>
  );
}
