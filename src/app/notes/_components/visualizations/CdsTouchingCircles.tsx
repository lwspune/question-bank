/**
 * Three equal circles touching one another, with their centres joined into an equilateral
 * triangle. Inside the triangle each circle contributes a 60° sector (tinted); the curved gap
 * left between the circles is shaded.
 *
 * Why this gets a diagram: the gap question is the chapter's most repeated HARD item, and its
 * whole solution is visible in one picture — triangle of centres, minus three 60° sectors that
 * together make HALF a circle. Students who subtract a whole circle get a negative area.
 *
 * Server component — static 2-D, no interaction.
 */
export default function CdsTouchingCircles() {
  const r = 70;
  const side = 2 * r;
  const h = (Math.sqrt(3) / 2) * side;
  // Centres: equilateral triangle, base horizontal.
  const A = { x: 210 - r, y: 90 + h };
  const B = { x: 210 + r, y: 90 + h };
  const C = { x: 210, y: 90 };
  const pt = (o: { x: number; y: number }, deg: number) => ({
    x: o.x + r * Math.cos((deg * Math.PI) / 180),
    y: o.y - r * Math.sin((deg * Math.PI) / 180),
  });
  // 60° sector inside the triangle at each centre (angles measured anticlockwise from +x, y up).
  const sector = (o: { x: number; y: number }, from: number, to: number) => {
    const p1 = pt(o, from);
    const p2 = pt(o, to);
    return `M ${o.x} ${o.y} L ${p1.x} ${p1.y} A ${r} ${r} 0 0 0 ${p2.x} ${p2.y} Z`;
  };
  // Gap: bounded by three arcs between the touching points (midpoints of the sides).
  const mAB = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
  const mBC = { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2 };
  const mCA = { x: (C.x + A.x) / 2, y: (C.y + A.y) / 2 };
  const gap = `M ${mAB.x} ${mAB.y} A ${r} ${r} 0 0 1 ${mBC.x} ${mBC.y} A ${r} ${r} 0 0 1 ${mCA.x} ${mCA.y} A ${r} ${r} 0 0 1 ${mAB.x} ${mAB.y} Z`;
  return (
    <div className="mx-auto max-w-md rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg
        viewBox="0 0 420 300"
        className="w-full"
        role="img"
        aria-label="Three equal circles of radius r touch one another. Their centres are joined to form an equilateral triangle of side 2r. Inside the triangle each circle covers a 60 degree sector, and the small curved region left between the three circles is shaded."
      >
        {[A, B, C].map((o, i) => (
          <circle key={i} cx={o.x} cy={o.y} r={r} className="fill-white stroke-slate-600 dark:fill-slate-900 dark:stroke-slate-300" strokeWidth="1.5" />
        ))}
        <path d={sector(A, 0, 60)} className="fill-sky-200/70 dark:fill-sky-800/50" />
        <path d={sector(B, 120, 180)} className="fill-sky-200/70 dark:fill-sky-800/50" />
        <path d={sector(C, 240, 300)} className="fill-sky-200/70 dark:fill-sky-800/50" />
        <path d={gap} className="fill-amber-400/80 dark:fill-amber-500/70" />
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
          fill="none"
          className="stroke-indigo-600 dark:stroke-indigo-400"
          strokeWidth="2"
        />
        {[A, B, C].map((o, i) => (
          <circle key={`c${i}`} cx={o.x} cy={o.y} r={3} className="fill-indigo-700 dark:fill-indigo-300" />
        ))}
        <text x={(A.x + 210) / 2} y={A.y + 18} textAnchor="middle" className="fill-indigo-700 text-[13px] font-semibold dark:fill-indigo-300">2r</text>
        <text x={A.x + 30} y={A.y - 10} className="fill-sky-800 text-[12px] dark:fill-sky-200">60°</text>
        <text x={B.x - 52} y={B.y - 10} className="fill-sky-800 text-[12px] dark:fill-sky-200">60°</text>
        <text x={C.x - 10} y={C.y + 40} className="fill-sky-800 text-[12px] dark:fill-sky-200">60°</text>
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Gap = triangle of centres − three 60° sectors = √3 r² − ½ π r².
      </p>
    </div>
  );
}
