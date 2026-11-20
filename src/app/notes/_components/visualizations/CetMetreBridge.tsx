/**
 * Static figure: the metre bridge at its null point (concept
 * cetp-ce-meter-bridge), with the concept's worked example: an unknown X in
 * the left gap and 6 Ω in the right gap balance at l = 40 cm, so
 * X/6 = 40/60 and X = 4 Ω.
 *
 * The 100 cm wire is drawn with a scale; the jockey touches it at 40 cm, where
 * the galvanometer from the junction between the two gaps reads zero. The
 * lengths l and 100 − l are marked under the wire. The last line is the
 * concept's interchange rule: swapping the gaps moves the null point from l to
 * 100 − l, here 60 cm (6/4 = 60/40).
 * Server component, pure SVG. Pinned by tests/notes-w2-19.test.ts.
 */

/** The worked example. */
export const BRIDGE = { R: 6, l: 40 } as const;

/** X from X/R = l/(100 − l). */
export const unknownX = (R: number, l: number) => (R * l) / (100 - l);

/** Null point l (cm) for a left gap a and a right gap b: a/b = l/(100 − l). */
export const nullPoint = (left: number, right: number) => (100 * left) / (left + right);

// Geometry (viewBox units).
export const WIRE = { x0: 30, x1: 290, y: 132 } as const;
export const TOP_Y = 46;
/** viewBox x of a point l cm along the wire. */
export const wireX = (l: number) => Math.round((WIRE.x0 + (l / 100) * (WIRE.x1 - WIRE.x0)) * 100) / 100;
/** The junction between the two gaps. */
export const JUNCTION_X = 160;

function Resistor({ cx, label, tone }: { cx: number; label: string; tone: "x" | "r" }) {
  const box =
    tone === "x"
      ? "fill-amber-100 stroke-amber-600 dark:fill-amber-950 dark:stroke-amber-400"
      : "fill-sky-100 stroke-sky-600 dark:fill-sky-950 dark:stroke-sky-400";
  const text = tone === "x" ? "fill-amber-800 dark:fill-amber-200" : "fill-sky-800 dark:fill-sky-200";
  return (
    <g>
      <rect x={cx - 24} y={TOP_Y - 10} width={48} height={20} rx={3} strokeWidth={1.5} className={box} />
      <text x={cx} y={TOP_Y + 4} textAnchor="middle" className={`${text} text-[11px] font-semibold`}>
        {label}
      </text>
    </g>
  );
}

export default function CetMetreBridge() {
  const xJ = wireX(BRIDGE.l);
  const leftGap = (WIRE.x0 + JUNCTION_X) / 2;
  const rightGap = (JUNCTION_X + WIRE.x1) / 2;
  const G = { x: (JUNCTION_X + xJ) / 2 + 4, y: 90 };
  const ticks = Array.from({ length: 11 }, (_, i) => i * 10);
  const dimY = 156;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · the metre bridge at its null point
      </p>
      <svg
        viewBox="0 0 320 244"
        className="block h-auto w-full"
        role="img"
        aria-label="A metre bridge. An unknown resistance X sits in the left gap and 6 ohms in the right gap. A galvanometer joins the point between the gaps to a jockey on the 100 centimetre wire. It reads zero with the jockey at 40 centimetres from the left end, so l is 40 centimetres and 100 minus l is 60. X over 6 equals 40 over 60, so X is 4 ohms. Swapping the gaps moves the null point to 60 centimetres."
      >
        {/* Top strip with the two gaps */}
        <line x1={WIRE.x0} y1={TOP_Y} x2={leftGap - 24} y2={TOP_Y} strokeWidth={2} className="stroke-foreground" />
        <line x1={leftGap + 24} y1={TOP_Y} x2={rightGap - 24} y2={TOP_Y} strokeWidth={2} className="stroke-foreground" />
        <line x1={rightGap + 24} y1={TOP_Y} x2={WIRE.x1} y2={TOP_Y} strokeWidth={2} className="stroke-foreground" />
        <Resistor cx={leftGap} label="X" tone="x" />
        <Resistor cx={rightGap} label={`R = ${BRIDGE.R} Ω`} tone="r" />
        <text x={leftGap} y={TOP_Y - 15} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          left gap
        </text>
        <text x={rightGap} y={TOP_Y - 15} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          right gap
        </text>
        {/* Ends down to the wire */}
        <line x1={WIRE.x0} y1={TOP_Y} x2={WIRE.x0} y2={WIRE.y} strokeWidth={2} className="stroke-foreground" />
        <line x1={WIRE.x1} y1={TOP_Y} x2={WIRE.x1} y2={WIRE.y} strokeWidth={2} className="stroke-foreground" />

        {/* Galvanometer from the junction to the jockey */}
        <circle cx={JUNCTION_X} cy={TOP_Y} r={3} className="fill-foreground" />
        <line x1={JUNCTION_X} y1={TOP_Y} x2={G.x} y2={G.y - 11} className="stroke-foreground" />
        <circle cx={G.x} cy={G.y} r={11} className="fill-background stroke-foreground" strokeWidth={1.5} />
        <text x={G.x} y={G.y + 4} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
          G
        </text>
        <text x={G.x + 15} y={G.y + 4} className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          reads zero
        </text>
        <line x1={G.x} y1={G.y + 11} x2={xJ} y2={WIRE.y - 7} className="stroke-foreground" />
        <polygon points={`${xJ},${WIRE.y - 1} ${xJ - 4},${WIRE.y - 9} ${xJ + 4},${WIRE.y - 9}`} className="fill-emerald-600 dark:fill-emerald-400" />
        <text x={xJ - 6} y={WIRE.y - 12} textAnchor="end" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          jockey
        </text>

        {/* The wire with its scale */}
        <line x1={WIRE.x0} y1={WIRE.y} x2={WIRE.x1} y2={WIRE.y} strokeWidth={2.5} className="stroke-muted-foreground" />
        {ticks.map((t) => (
          <line key={t} x1={wireX(t)} y1={WIRE.y} x2={wireX(t)} y2={WIRE.y + (t % 50 === 0 ? 6 : 4)} className="stroke-muted-foreground" />
        ))}
        {[0, 50, 100].map((t) => (
          <text
            key={t}
            x={t === 0 ? wireX(t) + 3 : t === 100 ? wireX(t) - 3 : wireX(t)}
            y={WIRE.y + 15}
            textAnchor={t === 0 ? "start" : t === 100 ? "end" : "middle"}
            className="fill-muted-foreground text-[9px] tabular-nums"
          >
            {t} cm
          </text>
        ))}

        {/* l and 100 − l */}
        <line x1={WIRE.x0} y1={dimY} x2={xJ} y2={dimY} className="stroke-amber-600 dark:stroke-amber-400" strokeWidth={1.5} />
        <line x1={xJ} y1={dimY} x2={WIRE.x1} y2={dimY} className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.5} />
        <line x1={xJ} y1={dimY - 4} x2={xJ} y2={dimY + 4} className="stroke-foreground" />
        <text x={(WIRE.x0 + xJ) / 2} y={dimY + 13} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          l = {BRIDGE.l} cm
        </text>
        <text x={(xJ + WIRE.x1) / 2} y={dimY + 13} textAnchor="middle" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          100 − l = {100 - BRIDGE.l} cm
        </text>

        {/* Cell across the wire */}
        <line x1={WIRE.x0} y1={WIRE.y} x2={WIRE.x0} y2={186} className="stroke-foreground" />
        <line x1={WIRE.x1} y1={WIRE.y} x2={WIRE.x1} y2={186} className="stroke-foreground" />
        <line x1={WIRE.x0} y1={186} x2={155} y2={186} className="stroke-foreground" />
        <line x1={165} y1={186} x2={WIRE.x1} y2={186} className="stroke-foreground" />
        <line x1={155} y1={177} x2={155} y2={195} strokeWidth={2} className="stroke-foreground" />
        <line x1={165} y1={181} x2={165} y2={191} strokeWidth={3} className="stroke-foreground" />
        <text x={160} y={207} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          cell
        </text>

        {/* The sum */}
        <text x={160} y={224} textAnchor="middle" className="fill-foreground text-[11px] font-semibold tabular-nums">
          X/R = l/(100 − l): X/6 = 40/60, so X = {unknownX(BRIDGE.R, BRIDGE.l)} Ω
        </text>
        <text x={160} y={239} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Swap the gaps: the null point moves to 100 − l = {nullPoint(BRIDGE.R, unknownX(BRIDGE.R, BRIDGE.l))} cm
        </text>
      </svg>
      <p className="mt-2 text-sm text-foreground">
        At the null point no current flows through G, so the bridge is balanced. The wire is uniform, so its two parts have resistances in
        the ratio of their lengths, l : (100 − l).
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Doubling both resistances, or using a thicker wire, leaves the null point where it is: only the ratio counts.
      </p>
    </div>
  );
}
