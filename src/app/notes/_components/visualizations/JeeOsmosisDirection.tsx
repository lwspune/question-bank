/**
 * Static figure: which way the solvent flows across a semipermeable membrane
 * (concept jcsol-osmosis-direction), drawn with the concept's own self-check:
 * 0.15 M glucose against 0.1 M NaCl (fully dissociated).
 *
 * - glucose: i = 1, so iC = 0.15 M (hypotonic); NaCl: i = 2, so iC = 0.2 M
 *   (hypertonic).
 * - Left panel, osmosis: water crosses from the glucose side to the NaCl side
 *   (lower iC to higher iC), so the NaCl side's level rises.
 * - Right panel, reverse osmosis: a pressure greater than π pushes on the
 *   CONCENTRATED (NaCl) side, and water is driven back to the glucose side.
 *
 * Server component, pure SVG. Pinned by tests/notes-w2-11.test.ts.
 */

export type SideId = "glucose" | "nacl";

export const SIDES: Record<SideId, { label: string; molarity: number; i: number }> = {
  glucose: { label: "glucose", molarity: 0.15, i: 1 },
  nacl: { label: "NaCl", molarity: 0.1, i: 2 },
};

/** Particle concentration iC (M), rounded to 4 places. */
export function iC(id: SideId): number {
  const s = SIDES[id];
  return Math.round(s.i * s.molarity * 10000) / 10000;
}

/** Osmosis moves solvent towards the side with the higher iC. */
export function osmosisTowards(): SideId {
  return iC("nacl") > iC("glucose") ? "nacl" : "glucose";
}

export type Panel = {
  id: "osmosis" | "reverse";
  title: string;
  flowTo: SideId;
  pressureOn: SideId | null;
  /** Liquid surface (SVG y; smaller is higher) on each side. */
  levels: Record<SideId, number>;
};

export const PANELS: readonly Panel[] = [
  { id: "osmosis", title: "Osmosis", flowTo: "nacl", pressureOn: null, levels: { glucose: 100, nacl: 80 } },
  { id: "reverse", title: "Reverse osmosis", flowTo: "glucose", pressureOn: "nacl", levels: { glucose: 80, nacl: 100 } },
];

const BOX = { top: 60, bottom: 190 } as const;
const PANEL_X = [6, 166] as const;

function fmt(n: number): string {
  return String(n);
}

function PanelView({ panel, ox }: { panel: Panel; ox: number }) {
  const left = { x0: ox + 4, x1: ox + 74 };
  const right = { x0: ox + 74, x1: ox + 144 };
  const mid = ox + 74;
  const toRight = panel.flowTo === "nacl";
  const ay = 114;
  const tail = toRight ? mid - 20 : mid + 20;
  const head = toRight ? mid + 20 : mid - 20;
  const hb = toRight ? head - 6 : head + 6;
  const cxL = ox + 39;
  const cxR = ox + 109;
  return (
    <g>
      <text x={mid} y={16} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        {panel.title}
      </text>
      {/* Liquid */}
      <rect x={left.x0} y={panel.levels.glucose} width={70} height={BOX.bottom - panel.levels.glucose} className="fill-sky-200/70 dark:fill-sky-900/50" />
      <rect x={right.x0} y={panel.levels.nacl} width={70} height={BOX.bottom - panel.levels.nacl} className="fill-sky-300/70 dark:fill-sky-800/60" />
      {/* Container: open at the top */}
      <polyline
        points={`${left.x0},${BOX.top} ${left.x0},${BOX.bottom} ${right.x1},${BOX.bottom} ${right.x1},${BOX.top}`}
        fill="none"
        strokeWidth={1.6}
        className="stroke-foreground"
      />
      {/* Semipermeable membrane */}
      <line x1={mid} y1={BOX.top} x2={mid} y2={BOX.bottom} strokeWidth={2} strokeDasharray="4 3" className="stroke-amber-600 dark:stroke-amber-400" />

      {/* Water arrow through the membrane */}
      <line x1={tail} y1={ay} x2={hb} y2={ay} strokeWidth={2} className="stroke-indigo-600 dark:stroke-indigo-400" />
      <polygon points={`${head},${ay} ${hb},${ay - 4} ${hb},${ay + 4}`} className="fill-indigo-600 dark:fill-indigo-400" />
      <text x={toRight ? tail - 3 : tail + 3} y={ay + 3.5} textAnchor={toRight ? "end" : "start"} className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
        water
      </text>

      {/* Solution labels */}
      <text x={cxL} y={146} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        {SIDES.glucose.label}
      </text>
      <text x={cxL} y={159} textAnchor="middle" className="fill-foreground text-[10px] tabular-nums">
        {fmt(SIDES.glucose.molarity)} M
      </text>
      <text x={cxL} y={172} textAnchor="middle" className="fill-foreground text-[10px] tabular-nums">
        iC = {fmt(iC("glucose"))}
      </text>
      <text x={cxR} y={146} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        {SIDES.nacl.label}
      </text>
      <text x={cxR} y={159} textAnchor="middle" className="fill-foreground text-[10px] tabular-nums">
        {fmt(SIDES.nacl.molarity)} M
      </text>
      <text x={cxR} y={172} textAnchor="middle" className="fill-foreground text-[10px] tabular-nums">
        iC = {fmt(iC("nacl"))}
      </text>
      <text x={cxL} y={204} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        hypotonic
      </text>
      <text x={cxR} y={204} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        hypertonic
      </text>
      <text x={mid} y={220} textAnchor="middle" className="fill-amber-700 text-[10px] dark:fill-amber-300">
        semipermeable membrane
      </text>

      {/* Applied pressure, reverse osmosis only */}
      {panel.pressureOn === "nacl" ? (
        <g>
          <rect x={right.x0 + 6} y={panel.levels.nacl - 8} width={58} height={8} rx={1} className="fill-muted-foreground" />
          <line x1={cxR} y1={46} x2={cxR} y2={panel.levels.nacl - 8} strokeWidth={3} className="stroke-muted-foreground" />
          <line x1={cxR + 18} y1={38} x2={cxR + 18} y2={60} strokeWidth={2} className="stroke-rose-600 dark:stroke-rose-400" />
          <polygon points={`${cxR + 18},${68} ${cxR + 14},${60} ${cxR + 22},${60}`} className="fill-rose-600 dark:fill-rose-400" />
          <text x={cxR} y={32} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
            pressure &gt; π
          </text>
        </g>
      ) : null}
    </g>
  );
}

export default function JeeOsmosisDirection() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · which way the solvent flows
      </p>
      <svg
        viewBox="0 0 320 228"
        className="block h-auto w-full"
        role="img"
        aria-label="Two containers, each split by a semipermeable membrane, with 0.15 molar glucose (iC 0.15, hypotonic) on the left and 0.1 molar sodium chloride (iC 0.2, hypertonic) on the right. Osmosis: water crosses from the glucose side to the sodium chloride side, whose level rises. Reverse osmosis: a piston pushes on the sodium chloride side with a pressure greater than pi, and water is driven back to the glucose side."
      >
        {PANELS.map((p, k) => (
          <PanelView key={p.id} panel={p} ox={PANEL_X[k]} />
        ))}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        NaCl gives two ions, so its iC is 2 × 0.1 = 0.2 M, more than glucose&apos;s 0.15 M. Water flows from the glucose side to the NaCl side. The
        membrane lets only the solvent through: Na⁺ and Cl⁻ stay on their own side. Push on the concentrated (NaCl) side with a pressure greater than π
        and the flow reverses: reverse osmosis.
      </p>
    </div>
  );
}
