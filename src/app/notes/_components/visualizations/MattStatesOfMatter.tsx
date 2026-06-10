/**
 * The three states of matter by particle arrangement: solid (tightly packed,
 * ordered, fixed), liquid (close but disordered, can flow), gas (far apart,
 * fast, fills the container), with the phase changes that connect them
 * (melting/freezing, vaporization/condensation, sublimation). Static SVG.
 */
export default function MattStatesOfMatter() {
  const p = "fill-indigo-500 stroke-indigo-700 dark:fill-indigo-400";
  // solid: ordered 4x4 grid
  const solid: [number, number][] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) solid.push([26 + c * 14, 44 + r * 14]);
  // liquid: looser cluster
  const liquid: [number, number][] = [
    [130, 48], [146, 52], [162, 47], [134, 64], [152, 66], [168, 62],
    [128, 80], [144, 82], [160, 80], [138, 95], [156, 96],
  ];
  // gas: few, scattered
  const gas: [number, number][] = [[238, 46], [276, 54], [252, 74], [288, 86], [234, 92]];
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 320 200" className="w-full" role="img" aria-label="The three states of matter. In a solid, particles are tightly packed in an ordered grid with fixed positions. In a liquid, particles are still close but disordered and can flow. In a gas, particles are far apart and move freely to fill the container. Melting and vaporization add energy moving solid to liquid to gas; freezing and condensation remove it; sublimation goes straight from solid to gas.">
        {/* boxes */}
        <rect x="16" y="34" width="64" height="74" rx="3" className="fill-none stroke-slate-400 dark:stroke-slate-500" strokeWidth="1.3" />
        <rect x="120" y="34" width="64" height="74" rx="3" className="fill-none stroke-slate-400 dark:stroke-slate-500" strokeWidth="1.3" />
        <rect x="224" y="34" width="80" height="74" rx="3" className="fill-none stroke-slate-400 dark:stroke-slate-500" strokeWidth="1.3" />
        {solid.map(([x, y], i) => <circle key={`s${i}`} cx={x} cy={y} r="4.5" className={p} strokeWidth="1" />)}
        {liquid.map(([x, y], i) => <circle key={`l${i}`} cx={x} cy={y} r="4.5" className={p} strokeWidth="1" />)}
        {gas.map(([x, y], i) => <circle key={`g${i}`} cx={x} cy={y} r="4.5" className={p} strokeWidth="1" />)}
        {/* titles */}
        <text x="48" y="26" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Solid</text>
        <text x="152" y="26" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Liquid</text>
        <text x="264" y="26" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Gas</text>
        <defs>
          <marker id="phaseArrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-rose-600 dark:fill-rose-400" />
          </marker>
        </defs>
        {/* solid -> liquid */}
        <line x1="84" y1="130" x2="116" y2="130" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="1.5" markerEnd="url(#phaseArrow)" />
        <text x="100" y="124" textAnchor="middle" className="fill-rose-600 dark:fill-rose-300" fontSize="8">melting</text>
        <text x="100" y="146" textAnchor="middle" className="fill-slate-500" fontSize="7.5">(freezing ←)</text>
        {/* liquid -> gas */}
        <line x1="188" y1="130" x2="220" y2="130" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="1.5" markerEnd="url(#phaseArrow)" />
        <text x="204" y="124" textAnchor="middle" className="fill-rose-600 dark:fill-rose-300" fontSize="8">vaporization</text>
        <text x="204" y="146" textAnchor="middle" className="fill-slate-500" fontSize="7.5">(condensation ←)</text>
        {/* sublimation arc solid -> gas */}
        <path d="M48 168 Q176 188 264 168" className="fill-none stroke-sky-600 dark:stroke-sky-400" strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#phaseArrowSky)" />
        <marker id="phaseArrowSky" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" className="fill-sky-600 dark:fill-sky-400" />
        </marker>
        <text x="156" y="184" textAnchor="middle" className="fill-sky-600 dark:fill-sky-300" fontSize="8" fontWeight="600">sublimation (solid → gas, e.g. dry ice)</text>
      </svg>
    </div>
  );
}
