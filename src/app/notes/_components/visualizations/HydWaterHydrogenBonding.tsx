/**
 * Hydrogen bonding in water and ice. Each water molecule (one O, two H) forms
 * hydrogen bonds (dashed) to its neighbours. In ice these bonds lock the
 * molecules into an OPEN hexagonal cage with empty space in the middle — so ice
 * is LESS dense than liquid water and floats, and water reaches maximum density
 * at 4 C. Static SVG.
 */
export default function HydWaterHydrogenBonding() {
  const O = "fill-rose-500 stroke-rose-700 dark:fill-rose-400";
  const H = "fill-slate-200 stroke-slate-500 dark:fill-slate-300";
  const hb = "stroke-sky-500 dark:stroke-sky-400";
  // six water O positions on a hexagon (open ring)
  const cx = 120;
  const cy = 105;
  const R = 56;
  const oxys = Array.from({ length: 6 }).map((_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 320 210" className="w-full" role="img" aria-label="Hydrogen bonding in ice. Six water molecules sit at the corners of an open hexagonal ring, joined by hydrogen bonds, with empty space in the middle. This open cage makes ice less dense than liquid water, so ice floats, and water reaches its maximum density at 4 degrees Celsius.">
        <text x="120" y="16" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Hydrogen bonding in ice</text>
        {/* hydrogen bonds around the ring (dashed) */}
        {oxys.map((o, i) => {
          const n = oxys[(i + 1) % 6];
          return <line key={`hb${i}`} x1={o.x.toFixed(1)} y1={o.y.toFixed(1)} x2={n.x.toFixed(1)} y2={n.y.toFixed(1)} className={hb} strokeWidth="1.3" strokeDasharray="3 3" />;
        })}
        {/* empty-centre label */}
        <text x={cx} y={cy + 3} textAnchor="middle" className="fill-slate-400" fontSize="8" fontStyle="italic">open space</text>
        {/* water molecules: O + 2 H pointing roughly outward */}
        {oxys.map((o, i) => {
          const ang = Math.atan2(o.y - cy, o.x - cx);
          const h1 = { x: o.x + 13 * Math.cos(ang - 0.5), y: o.y + 13 * Math.sin(ang - 0.5) };
          const h2 = { x: o.x + 13 * Math.cos(ang + 0.5), y: o.y + 13 * Math.sin(ang + 0.5) };
          return (
            <g key={`w${i}`}>
              <line x1={o.x} y1={o.y} x2={h1.x.toFixed(1)} y2={h1.y.toFixed(1)} className="stroke-slate-400" strokeWidth="1.4" />
              <line x1={o.x} y1={o.y} x2={h2.x.toFixed(1)} y2={h2.y.toFixed(1)} className="stroke-slate-400" strokeWidth="1.4" />
              <circle cx={h1.x.toFixed(1)} cy={h1.y.toFixed(1)} r="3.5" className={H} strokeWidth="0.9" />
              <circle cx={h2.x.toFixed(1)} cy={h2.y.toFixed(1)} r="3.5" className={H} strokeWidth="0.9" />
              <circle cx={o.x.toFixed(1)} cy={o.y.toFixed(1)} r="7" className={O} strokeWidth="1.2" />
            </g>
          );
        })}
        {/* legend */}
        <circle cx="232" cy="44" r="6" className={O} strokeWidth="1.2" />
        <text x="244" y="47" className="fill-slate-600 dark:fill-slate-300" fontSize="8.5">oxygen</text>
        <circle cx="232" cy="64" r="3.5" className={H} strokeWidth="0.9" />
        <text x="244" y="67" className="fill-slate-600 dark:fill-slate-300" fontSize="8.5">hydrogen</text>
        <line x1="226" y1="82" x2="240" y2="82" className={hb} strokeWidth="1.3" strokeDasharray="3 3" />
        <text x="244" y="85" className="fill-slate-600 dark:fill-slate-300" fontSize="8.5">hydrogen bond</text>
        <text x="120" y="198" textAnchor="middle" className="fill-sky-600 dark:fill-sky-300" fontSize="8.5">Open cage → ice less dense → floats; densest water at 4 °C</text>
      </svg>
    </div>
  );
}
