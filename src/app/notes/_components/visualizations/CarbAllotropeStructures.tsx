/**
 * The four crystalline allotropes of carbon as schematic structures:
 * diamond (sp3 3-D tetrahedral network), graphite (sp2 stacked layers held by
 * weak forces), fullerene C60 (closed cage), graphene (single one-atom sheet).
 * Same element, four structures, four very different materials. Static SVG.
 */
export default function CarbAllotropeStructures() {
  const atom = "fill-indigo-500 stroke-indigo-700 dark:fill-indigo-400";
  const bond = "stroke-slate-500 dark:stroke-slate-300";
  const layerBond = "stroke-slate-400 dark:stroke-slate-400";
  const weak = "stroke-slate-400 dark:stroke-slate-500";
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox="0 0 320 300" className="w-full" role="img" aria-label="Four crystalline allotropes of carbon. Diamond is a three-dimensional tetrahedral network of sp3 carbons (hardest, insulator). Graphite is flat sp2 layers held together by weak forces so they slide (soft, conductor). Fullerene C60 is a closed cage that looks like a football (the purest form). Graphene is a single one-atom-thick sheet (thinnest and strongest).">
        {/* DIAMOND — top-left */}
        <g>
          <text x="80" y="18" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Diamond</text>
          <line x1="80" y1="60" x2="50" y2="40" className={bond} strokeWidth="1.6" />
          <line x1="80" y1="60" x2="110" y2="40" className={bond} strokeWidth="1.6" />
          <line x1="80" y1="60" x2="55" y2="92" className={bond} strokeWidth="1.6" />
          <line x1="80" y1="60" x2="108" y2="92" className={bond} strokeWidth="1.6" />
          <circle cx="50" cy="40" r="6" className={atom} strokeWidth="1.3" />
          <circle cx="110" cy="40" r="6" className={atom} strokeWidth="1.3" />
          <circle cx="55" cy="92" r="6" className={atom} strokeWidth="1.3" />
          <circle cx="108" cy="92" r="6" className={atom} strokeWidth="1.3" />
          <circle cx="80" cy="60" r="7" className={atom} strokeWidth="1.3" />
          <text x="80" y="116" textAnchor="middle" className="fill-slate-500" fontSize="8.5">sp³ 3-D network · hardest · insulator</text>
        </g>
        {/* GRAPHITE — top-right */}
        <g>
          <text x="240" y="18" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Graphite</text>
          {[34, 58, 82].map((yy, i) => (
            <g key={i}>
              <line x1="190" y1={yy} x2="290" y2={yy} className={layerBond} strokeWidth="1.4" />
              {[200, 222, 244, 266].map((xx) => (
                <circle key={xx} cx={xx} cy={yy} r="4.5" className={atom} strokeWidth="1.1" />
              ))}
            </g>
          ))}
          {[210, 255].map((xx) => (
            <g key={xx}>
              <line x1={xx} y1="38" x2={xx} y2="54" className={weak} strokeWidth="1" strokeDasharray="2 2" />
              <line x1={xx} y1="62" x2={xx} y2="78" className={weak} strokeWidth="1" strokeDasharray="2 2" />
            </g>
          ))}
          <text x="240" y="116" textAnchor="middle" className="fill-slate-500" fontSize="8.5">sp² layers (weak forces) · soft · conductor</text>
        </g>
        {/* FULLERENE — bottom-left */}
        <g>
          <text x="80" y="158" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Fullerene (C₆₀)</text>
          <circle cx="80" cy="215" r="38" className="fill-indigo-100/60 stroke-indigo-500 dark:fill-indigo-900/40" strokeWidth="1.6" />
          <polygon points="80,188 98,201 91,222 69,222 62,201" className="fill-none stroke-slate-500 dark:stroke-slate-300" strokeWidth="1.2" />
          <line x1="98" y1="201" x2="116" y2="208" className={bond} strokeWidth="1" />
          <line x1="91" y1="222" x2="104" y2="240" className={bond} strokeWidth="1" />
          <line x1="69" y1="222" x2="56" y2="240" className={bond} strokeWidth="1" />
          <line x1="62" y1="201" x2="44" y2="208" className={bond} strokeWidth="1" />
          <text x="80" y="270" textAnchor="middle" className="fill-slate-500" fontSize="8.5">closed cage (football) · purest form</text>
        </g>
        {/* GRAPHENE — bottom-right */}
        <g>
          <text x="240" y="158" textAnchor="middle" className="fill-slate-700 dark:fill-slate-100" fontSize="11" fontWeight="700">Graphene</text>
          {[0, 1].map((row) =>
            [0, 1, 2].map((col) => {
              const cx = 205 + col * 30 + (row % 2) * 15;
              const cy = 195 + row * 26;
              return (
                <polygon
                  key={`${row}-${col}`}
                  points={hexPoints(cx, cy, 9)}
                  className="fill-indigo-100/50 stroke-indigo-500 dark:fill-indigo-900/30"
                  strokeWidth="1.2"
                />
              );
            })
          )}
          <text x="240" y="270" textAnchor="middle" className="fill-slate-500" fontSize="8.5">single one-atom sheet · thinnest, strongest</text>
        </g>
      </svg>
    </div>
  );
}

function hexPoints(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}
