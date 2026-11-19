/**
 * Static figure: forward and reverse bias of a p-n junction (concept
 * cetp-biasing), side by side.
 *
 * - Forward bias: the p-side goes to the + terminal (Vₚ > Vₙ). The applied
 *   field opposes the junction field, so the barrier drops, the depletion
 *   layer narrows and a large current flows (conventional current from the +
 *   terminal into the p-side, through the junction from p to n).
 * - Reverse bias: the p-side goes to the − terminal (Vₚ < Vₙ). The fields
 *   add, the barrier rises, the layer widens and almost no current flows.
 *
 * Each panel draws the unbiased layer width as a dashed outline so the change
 * shows. The battery's long plate is +. The widths and connections are
 * exported and pinned by tests/notes-cet-visuals-phys-a.test.ts. Server
 * component, no client state.
 */

export type BiasKind = "forward" | "reverse";

/** Width of the depletion layer with no bias (viewBox units). */
export const UNBIASED_WIDTH = 22;

export const BIAS: Record<
  BiasKind,
  { title: string; pTerminal: "+" | "−"; width: number; lines: readonly string[]; currentFlows: boolean }
> = {
  forward: {
    title: "Forward bias",
    pTerminal: "+",
    width: 10,
    lines: ["p to +, so Vₚ > Vₙ", "layer narrows", "barrier lower", "large current"],
    currentFlows: true,
  },
  reverse: {
    title: "Reverse bias",
    pTerminal: "−",
    width: 40,
    lines: ["p to −, so Vₚ < Vₙ", "layer widens", "barrier higher", "almost no current"],
    currentFlows: false,
  },
};

/** The rule the concept states: forward when the p-side is at the higher potential. */
export function biasOf(vp: number, vn: number): BiasKind {
  return vp > vn ? "forward" : "reverse";
}

// Panel geometry (local units; each panel is 156 wide).
const MID = 76;
const BLOCK = { left: 16, right: 136, top: 32, bottom: 70 };
const WIRE_Y = 114;
const PLATE = { left: 72, right: 80 };

function Panel({ kind, dx }: { kind: BiasKind; dx: number }) {
  const b = BIAS[kind];
  const pIsPlus = b.pTerminal === "+";
  const plate = (x: number, plus: boolean) =>
    plus ? (
      <line x1={x} y1={WIRE_Y - 11} x2={x} y2={WIRE_Y + 11} className="stroke-foreground" strokeWidth={1.5} />
    ) : (
      <line x1={x} y1={WIRE_Y - 6} x2={x} y2={WIRE_Y + 6} className="stroke-foreground" strokeWidth={3.5} />
    );
  const midY = (BLOCK.top + BLOCK.bottom) / 2;
  return (
    <g transform={`translate(${dx} 0)`}>
      <text x={MID} y={18} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        {b.title}
      </text>

      {/* The junction: p on the left, n on the right */}
      <rect
        x={BLOCK.left}
        y={BLOCK.top}
        width={MID - BLOCK.left}
        height={BLOCK.bottom - BLOCK.top}
        className="fill-rose-100/70 stroke-rose-400 dark:fill-rose-950/40 dark:stroke-rose-700"
      />
      <rect
        x={MID}
        y={BLOCK.top}
        width={BLOCK.right - MID}
        height={BLOCK.bottom - BLOCK.top}
        className="fill-sky-100/70 stroke-sky-400 dark:fill-sky-950/40 dark:stroke-sky-700"
      />
      <rect
        x={MID - b.width / 2}
        y={BLOCK.top}
        width={b.width}
        height={BLOCK.bottom - BLOCK.top}
        className="fill-amber-200/80 dark:fill-amber-800/60"
      />
      <rect
        x={MID - UNBIASED_WIDTH / 2}
        y={BLOCK.top - 3}
        width={UNBIASED_WIDTH}
        height={BLOCK.bottom - BLOCK.top + 6}
        fill="none"
        strokeDasharray="3 2"
        className="stroke-muted-foreground"
      />
      <text x={(BLOCK.left + MID) / 2 - 6} y={midY + 5} textAnchor="middle" className="fill-rose-700 text-[13px] font-bold dark:fill-rose-300">
        p
      </text>
      <text x={(MID + BLOCK.right) / 2 + 6} y={midY + 5} textAnchor="middle" className="fill-sky-700 text-[13px] font-bold dark:fill-sky-300">
        n
      </text>

      {/* The circuit */}
      <polyline
        points={`${BLOCK.left},${midY} 6,${midY} 6,${WIRE_Y} ${PLATE.left},${WIRE_Y}`}
        fill="none"
        className="stroke-foreground"
        strokeWidth={1.2}
      />
      <polyline
        points={`${BLOCK.right},${midY} 146,${midY} 146,${WIRE_Y} ${PLATE.right},${WIRE_Y}`}
        fill="none"
        className="stroke-foreground"
        strokeWidth={1.2}
      />
      {plate(PLATE.left, pIsPlus)}
      {plate(PLATE.right, !pIsPlus)}
      <text x={PLATE.left - 3} y={WIRE_Y - 14} textAnchor="end" className="fill-foreground text-[12px] font-bold">
        {pIsPlus ? "+" : "−"}
      </text>
      <text x={PLATE.right + 3} y={WIRE_Y - 14} className="fill-foreground text-[12px] font-bold">
        {pIsPlus ? "−" : "+"}
      </text>

      {/* Current: from the + terminal round to the p-side (forward only) */}
      {b.currentFlows ? (
        <g>
          <line x1={58} y1={WIRE_Y} x2={30} y2={WIRE_Y} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth={2.5} />
          <polygon points={`22,${WIRE_Y} 31,${WIRE_Y - 5} 31,${WIRE_Y + 5}`} className="fill-emerald-600 dark:fill-emerald-400" />
          <text x={40} y={WIRE_Y + 15} textAnchor="middle" className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-300">
            I
          </text>
        </g>
      ) : (
        <text x={38} y={WIRE_Y + 15} textAnchor="middle" className="fill-muted-foreground text-[11px] font-semibold">
          I ≈ 0
        </text>
      )}

      {b.lines.map((t, i) => (
        <text key={t} x={MID} y={146 + i * 14} textAnchor="middle" className={i === 0 ? "fill-foreground text-[10px] font-semibold" : "fill-foreground text-[10px]"}>
          {t}
        </text>
      ))}
    </g>
  );
}

export default function CetDiodeBias() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · forward and reverse bias
      </p>
      <svg
        viewBox="0 0 320 200"
        className="block h-auto w-full"
        role="img"
        aria-label="Two p-n junctions. Forward bias: the p-side is joined to the positive terminal, the depletion layer narrows and a large current flows. Reverse bias: the p-side is joined to the negative terminal, the layer widens and almost no current flows."
      >
        <Panel kind="forward" dx={4} />
        <line x1={160} y1={6} x2={160} y2={194} strokeDasharray="3 4" className="stroke-border" />
        <Panel kind="reverse" dx={164} />
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Shaded strip: the depletion layer. Dashed outline: its width with no bias. The battery&apos;s long plate is the
        + terminal. Check the sign: −1.0 V is higher than −1.5 V, so −1.0 V on the p-side and −1.5 V on the n-side is
        forward bias.
      </p>
    </div>
  );
}
