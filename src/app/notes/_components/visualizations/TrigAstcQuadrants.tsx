/**
 * The ASTC sign chart: which trig ratios are positive in each quadrant.
 * "All Students Take Calculus" — All / Sine / Tangent / Cosine. Static SVG.
 */
export default function TrigAstcQuadrants() {
  const S = 230;
  const c = S / 2;
  const r = 92;

  const Quad = ({
    dx,
    dy,
    letter,
    positive,
    anchor,
  }: {
    dx: number;
    dy: number;
    letter: string;
    positive: string;
    anchor: "start" | "end";
  }) => (
    <g>
      <text x={c + dx} y={c + dy} className="fill-indigo-700 dark:fill-indigo-300" fontSize="22" fontWeight="700" textAnchor={anchor}>
        {letter}
      </text>
      <text x={c + dx} y={c + dy + 16} className="fill-slate-600 dark:fill-slate-300" fontSize="9.5" textAnchor={anchor}>
        {positive}
      </text>
    </g>
  );

  return (
    <div className="mx-auto max-w-xs rounded-xl border bg-indigo-50/40 p-4 dark:bg-indigo-950/20">
      <svg viewBox={`0 0 ${S} ${S}`} className="w-full" role="img" aria-label="The ASTC quadrant chart: All ratios positive in quadrant one, Sine in two, Tangent in three, Cosine in four.">
        <circle cx={c} cy={c} r={r} className="fill-none stroke-slate-300" strokeWidth="1" />
        <line x1={c - r - 12} y1={c} x2={c + r + 12} y2={c} className="stroke-slate-400" strokeWidth="0.9" />
        <line x1={c} y1={c - r - 12} x2={c} y2={c + r + 12} className="stroke-slate-400" strokeWidth="0.9" />
        {/* Q1 top-right: All */}
        <Quad dx={42} dy={-44} letter="A" positive="all +" anchor="start" />
        {/* Q2 top-left: Sine */}
        <Quad dx={-42} dy={-44} letter="S" positive="sin, csc +" anchor="end" />
        {/* Q3 bottom-left: Tangent */}
        <Quad dx={-42} dy={56} letter="T" positive="tan, cot +" anchor="end" />
        {/* Q4 bottom-right: Cosine */}
        <Quad dx={42} dy={56} letter="C" positive="cos, sec +" anchor="start" />
        <text x={c} y={S - 2} className="fill-slate-500" fontSize="9" textAnchor="middle">All Students Take Calculus</text>
      </svg>
    </div>
  );
}
