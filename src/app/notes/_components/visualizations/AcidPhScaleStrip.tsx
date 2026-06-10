/**
 * The pH scale from 0 to 14 as a coloured strip: strongly acidic (red) at 0,
 * neutral (green) at 7, strongly basic (blue/violet) at 14, with common
 * substances placed at their approximate pH. Static SVG.
 */
export default function AcidPhScaleStrip() {
  const x0 = 24;
  const x14 = 286;
  const y = 70;
  const px = (ph: number) => x0 + (ph / 14) * (x14 - x0);
  const ticks = [0, 2, 4, 6, 7, 8, 10, 12, 14];
  const subs: { ph: number; label: string; up?: boolean }[] = [
    { ph: 1, label: "stomach acid", up: true },
    { ph: 3, label: "vinegar / lemon", up: false },
    { ph: 5.5, label: "rain", up: true },
    { ph: 7, label: "pure water", up: false },
    { ph: 9, label: "baking soda", up: true },
    { ph: 11, label: "ammonia", up: false },
    { ph: 13, label: "lye (NaOH)", up: true },
  ];
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 310 150" className="w-full" role="img" aria-label="The pH scale from 0 to 14. Below 7 is acidic (stomach acid near 1, vinegar and lemon near 3), 7 is neutral (pure water), above 7 is basic (baking soda near 9, ammonia near 11, lye near 13). Acidity increases toward 0 and alkalinity increases toward 14.">
        <text x="155" y="16" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">The pH scale</text>
        <defs>
          <linearGradient id="phGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="68%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
        <rect x={x0} y={y} width={x14 - x0} height="16" rx="3" fill="url(#phGrad)" />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={px(t)} y1={y + 16} x2={px(t)} y2={y + 21} className="stroke-slate-500" strokeWidth="1" />
            <text x={px(t)} y={y + 31} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="8" fontWeight={t === 7 ? 700 : 400}>{t}</text>
          </g>
        ))}
        {/* labels: acidic / neutral / basic */}
        <text x={px(2)} y={y - 8} textAnchor="middle" className="fill-rose-600 dark:fill-rose-300" fontSize="8.5" fontWeight="600">ACIDIC</text>
        <text x={px(7)} y={y + 47} textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300" fontSize="8.5" fontWeight="600">neutral</text>
        <text x={px(12)} y={y - 8} textAnchor="middle" className="fill-sky-700 dark:fill-sky-300" fontSize="8.5" fontWeight="600">BASIC (ALKALINE)</text>
        {/* substances */}
        {subs.map((s) => (
          <g key={s.label}>
            <line x1={px(s.ph)} y1={s.up ? y - 2 : y + 18} x2={px(s.ph)} y2={s.up ? y - 16 : y + 32} className="stroke-slate-400" strokeWidth="0.8" />
            <text x={px(s.ph)} y={s.up ? y - 18 : y + 41} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300" fontSize="7.5">{s.label}</text>
          </g>
        ))}
        <text x="155" y="142" textAnchor="middle" className="fill-slate-500" fontSize="8">Drinking water sits in the safe band pH 6.5–8.5.</text>
      </svg>
    </div>
  );
}
