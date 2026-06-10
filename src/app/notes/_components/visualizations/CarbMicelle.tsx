/**
 * A soap micelle: in water, soap molecules surround an oil droplet with their
 * hydrophobic TAILS pointing INWARD onto the oil and their hydrophilic ionic
 * HEADS pointing OUTWARD into the water. This is the orientation the NDA tests
 * (the trap reverses it — heads do NOT face the oil). Static SVG.
 */
export default function CarbMicelle() {
  const n = 14;
  const cx = 110;
  const cy = 115;
  const oilR = 34; // oil droplet radius
  const tailLen = 22;
  const head = "fill-rose-500 stroke-rose-700 dark:fill-rose-400";
  const tail = "stroke-amber-600 dark:stroke-amber-400";
  return (
    <div className="mx-auto max-w-sm rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 300 230" className="w-full" role="img" aria-label="A soap micelle in water. An oil droplet sits in the centre. Soap molecules surround it with their oily hydrophobic tails pointing inward onto the oil and their ionic hydrophilic heads pointing outward into the surrounding water. The heads face the water, not the oil.">
        <text x="110" y="16" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Soap micelle in water</text>
        {/* water background hint */}
        <circle cx={cx} cy={cy} r={oilR + tailLen + 12} className="fill-sky-100/40 stroke-sky-300/60 dark:fill-sky-950/30" strokeWidth="1" strokeDasharray="3 3" />
        {/* oil droplet */}
        <circle cx={cx} cy={cy} r={oilR} className="fill-amber-200/70 stroke-amber-500 dark:fill-amber-800/40" strokeWidth="1.4" />
        <text x={cx} y={cy + 3} textAnchor="middle" className="fill-amber-700 dark:fill-amber-200" fontSize="9" fontWeight="600">oil / dirt</text>
        {/* soap molecules: tail from oil surface outward, head at the tip */}
        {Array.from({ length: n }).map((_, i) => {
          const a = (2 * Math.PI * i) / n - Math.PI / 2;
          const ux = Math.cos(a);
          const uy = Math.sin(a);
          const x1 = cx + oilR * ux;
          const y1 = cy + oilR * uy;
          const x2 = cx + (oilR + tailLen) * ux;
          const y2 = cy + (oilR + tailLen) * uy;
          const hx = cx + (oilR + tailLen + 5) * ux;
          const hy = cy + (oilR + tailLen + 5) * uy;
          return (
            <g key={i}>
              <line x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)} className={tail} strokeWidth="1.8" />
              <circle cx={hx.toFixed(1)} cy={hy.toFixed(1)} r="4.5" className={head} strokeWidth="1" />
            </g>
          );
        })}
        {/* legend */}
        <circle cx="232" cy="40" r="4.5" className={head} strokeWidth="1" />
        <text x="242" y="43" className="fill-slate-600 dark:fill-slate-300" fontSize="8.5">ionic head → water</text>
        <line x1="226" y1="58" x2="238" y2="58" className={tail} strokeWidth="1.8" />
        <text x="242" y="61" className="fill-slate-600 dark:fill-slate-300" fontSize="8.5">oily tail → oil</text>
        <text x="110" y="220" textAnchor="middle" className="fill-rose-600 dark:fill-rose-300" fontSize="8.5">Heads face WATER, tails face OIL (the common trap reverses this)</text>
      </svg>
    </div>
  );
}
