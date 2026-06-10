/**
 * Surface tension + capillary rise — a narrow tube dipped in liquid shows the
 * liquid climbing above the outside level, with a concave meniscus (water,
 * which wets glass). The rise is higher in the narrower bore (h proportional
 * to 1/r). The skin of the surface is drawn as a taut membrane.
 *
 * Server component — static 2-D.
 */
export default function SurfaceTensionMeniscus() {
  const dishTop = 210;
  const dishBot = 270;
  const dishLeft = 40;
  const dishRight = 520;

  // two tubes: wide (left) rises little, narrow (right) rises a lot
  const wide = { x: 150, w: 44, rise: 40 };
  const narrow = { x: 360, w: 20, rise: 90 };

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 560 300"
        className="w-full"
        role="img"
        aria-label="Two capillary tubes in a dish of water; the narrower tube shows a higher rise with a concave meniscus"
      >
        {/* dish of liquid */}
        <rect x={dishLeft} y={dishTop} width={dishRight - dishLeft} height={dishBot - dishTop} className="fill-sky-400/25 stroke-sky-700 dark:stroke-sky-300" strokeWidth="2" />
        <line x1={dishLeft} y1={dishTop} x2={dishRight} y2={dishTop} className="stroke-sky-600 dark:stroke-sky-300" strokeWidth="2" />

        {[wide, narrow].map((t) => {
          const lvl = dishTop - t.rise;
          return (
            <g key={t.x}>
              {/* tube walls */}
              <line x1={t.x - t.w / 2} y1={30} x2={t.x - t.w / 2} y2={dishBot} className="stroke-slate-500 dark:stroke-slate-300" strokeWidth="2" />
              <line x1={t.x + t.w / 2} y1={30} x2={t.x + t.w / 2} y2={dishBot} className="stroke-slate-500 dark:stroke-slate-300" strokeWidth="2" />
              {/* liquid inside the tube */}
              <rect x={t.x - t.w / 2 + 1} y={lvl} width={t.w - 2} height={dishBot - lvl} className="fill-sky-400/35" />
              {/* concave meniscus */}
              <path d={`M ${t.x - t.w / 2 + 1} ${lvl} Q ${t.x} ${lvl + 14} ${t.x + t.w / 2 - 1} ${lvl}`} className="fill-none stroke-sky-700 dark:stroke-sky-300" strokeWidth="2" />
              {/* rise marker */}
              <line x1={t.x + t.w / 2 + 10} y1={lvl + 7} x2={t.x + t.w / 2 + 10} y2={dishTop} className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="1.4" strokeDasharray="3 3" />
              <text x={t.x + t.w / 2 + 16} y={(lvl + dishTop) / 2} fontSize="12" fontWeight="600" className="fill-indigo-900 dark:fill-indigo-100">h</text>
            </g>
          );
        })}

        <text x={wide.x} y={26} textAnchor="middle" fontSize="11" className="fill-indigo-900 dark:fill-indigo-100">wide bore</text>
        <text x={narrow.x} y={26} textAnchor="middle" fontSize="11" className="fill-indigo-900 dark:fill-indigo-100">narrow bore</text>
        <text x={280} y={296} textAnchor="middle" fontSize="12" className="fill-indigo-900 dark:fill-indigo-100">Narrower tube to higher rise: h proportional to 1/r</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Surface tension pulls water up a narrow tube (capillary rise) and forms a
        concave meniscus. The thinner the bore, the higher it climbs.
      </p>
    </div>
  );
}
