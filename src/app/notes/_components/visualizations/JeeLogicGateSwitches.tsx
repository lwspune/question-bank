/**
 * Static figure: switches and a lamp as logic gates (concept
 * jpsemi-switch-gates). A closed switch is 1 and a lit lamp is 1. Two switches
 * in series with the lamp light it only when both are closed: AND, Y = A·B.
 * Two switches in parallel, together in series with the lamp, light it when
 * either is closed: OR, Y = A + B. Each circuit has its truth table under it.
 * Pinned by tests/notes-jee-visuals-phys-b.test.ts. Server component.
 */

export type Bit = 0 | 1;

/** Lamp for two switches in series: current needs both closed. */
export const seriesLamp = (a: Bit, b: Bit): Bit => (a && b ? 1 : 0);
/** Lamp for two switches in parallel: either closed gives a path. */
export const parallelLamp = (a: Bit, b: Bit): Bit => (a || b ? 1 : 0);

export const INPUTS: readonly (readonly [Bit, Bit])[] = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

/** Truth table rows [A, B, Y]. */
export const truthTable = (gate: (a: Bit, b: Bit) => Bit) => INPUTS.map(([a, b]) => [a, b, gate(a, b)] as const);

/** An open switch between (x1, y) and (x2, y), labelled. */
function Switch({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g>
      <circle cx={x1} cy={y} r={2.5} className="fill-foreground" />
      <circle cx={x2} cy={y} r={2.5} className="fill-foreground" />
      <line x1={x1} y1={y} x2={x2 - 2} y2={y - 11} strokeWidth={2} className="stroke-foreground" />
      <text x={(x1 + x2) / 2} y={y - 15} textAnchor="middle" className="fill-sky-700 text-[11px] font-bold dark:fill-sky-300">
        {label}
      </text>
    </g>
  );
}

function Cell({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 9} y={y - 8} width={18} height={16} className="fill-background" />
      <line x1={x - 9} y1={y - 3} x2={x + 9} y2={y - 3} strokeWidth={2} className="stroke-foreground" />
      <line x1={x - 5} y1={y + 3} x2={x + 5} y2={y + 3} strokeWidth={4} className="stroke-foreground" />
    </g>
  );
}

function Lamp({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={9} strokeWidth={1.5} className="fill-amber-100 stroke-foreground dark:fill-amber-900/40" />
      <line x1={x - 6} y1={y - 6} x2={x + 6} y2={y + 6} strokeWidth={1.2} className="stroke-foreground" />
      <line x1={x - 6} y1={y + 6} x2={x + 6} y2={y - 6} strokeWidth={1.2} className="stroke-foreground" />
      <text x={x + 13} y={y + 4} className="fill-amber-700 text-[11px] font-bold dark:fill-amber-300">
        Y
      </text>
    </g>
  );
}

function Table({ x, rows }: { x: number; rows: readonly (readonly [Bit, Bit, Bit])[] }) {
  const cols = [x + 22, x + 62, x + 102];
  return (
    <g className="tabular-nums">
      {["A", "B", "Y"].map((h, i) => (
        <text key={h} x={cols[i]} y={152} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          {h}
        </text>
      ))}
      <line x1={x + 6} y1={157} x2={x + 118} y2={157} className="stroke-border" />
      {rows.map((r, j) =>
        r.map((v, i) => (
          <text
            key={`${j}-${i}`}
            x={cols[i]}
            y={172 + j * 15}
            textAnchor="middle"
            className={i === 2 ? (v ? "fill-amber-700 text-[11px] font-bold dark:fill-amber-300" : "fill-muted-foreground text-[11px]") : "fill-foreground text-[11px]"}
          >
            {v}
          </text>
        )),
      )}
    </g>
  );
}

export default function JeeLogicGateSwitches() {
  // AND circuit: loop from x 18 to 132; OR circuit: loop from x 178 to 296.
  const top = 50;
  const bottom = 110;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · switches in series and in parallel as gates
      </p>
      <svg
        viewBox="0 0 320 236"
        className="block h-auto w-full"
        role="img"
        aria-label="Left: a cell, two switches A and B in series and a lamp Y, an AND gate; the lamp lights only when both switches are closed. Right: the two switches in parallel, together in series with the lamp, an OR gate; the lamp lights when either is closed. A truth table under each circuit."
      >
        {/* AND: switches in series */}
        <text x={75} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          AND: Y = A·B
        </text>
        <polyline points={`18,${bottom} 18,${top} 42,${top}`} fill="none" strokeWidth={1.5} className="stroke-foreground" />
        <line x1={62} y1={top} x2={86} y2={top} strokeWidth={1.5} className="stroke-foreground" />
        <polyline points={`106,${top} 132,${top} 132,${bottom} 18,${bottom}`} fill="none" strokeWidth={1.5} className="stroke-foreground" />
        <Switch x1={42} x2={62} y={top} label="A" />
        <Switch x1={86} x2={106} y={top} label="B" />
        <Cell x={18} y={78} />
        <Lamp x={132} y={78} />
        <text x={75} y={128} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          lit only if A and B are closed
        </text>
        <Table x={14} rows={truthTable(seriesLamp)} />

        {/* OR: switches in parallel */}
        <text x={238} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
          OR: Y = A + B
        </text>
        <polyline points={`178,${bottom} 178,${top} 206,${top}`} fill="none" strokeWidth={1.5} className="stroke-foreground" />
        <polyline points={`206,${top - 10} 206,${top + 14}`} fill="none" strokeWidth={1.5} className="stroke-foreground" />
        <line x1={206} y1={top - 10} x2={224} y2={top - 10} strokeWidth={1.5} className="stroke-foreground" />
        <line x1={206} y1={top + 14} x2={224} y2={top + 14} strokeWidth={1.5} className="stroke-foreground" />
        <line x1={244} y1={top - 10} x2={262} y2={top - 10} strokeWidth={1.5} className="stroke-foreground" />
        <line x1={244} y1={top + 14} x2={262} y2={top + 14} strokeWidth={1.5} className="stroke-foreground" />
        <polyline points={`262,${top - 10} 262,${top + 14}`} fill="none" strokeWidth={1.5} className="stroke-foreground" />
        <polyline points={`262,${top} 296,${top} 296,${bottom} 178,${bottom}`} fill="none" strokeWidth={1.5} className="stroke-foreground" />
        <Switch x1={224} x2={244} y={top - 10} label="A" />
        <Switch x1={224} x2={244} y={top + 14} label="" />
        <text x={234} y={top + 32} textAnchor="middle" className="fill-sky-700 text-[11px] font-bold dark:fill-sky-300">
          B
        </text>
        <Cell x={178} y={78} />
        <Lamp x={296} y={78} />
        <text x={238} y={128} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          lit if A or B is closed
        </text>
        <Table x={178} rows={truthTable(parallelLamp)} />

        <line x1={160} y1={140} x2={160} y2={228} className="stroke-border" />
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Closed switch = 1, open = 0; lit lamp = 1. In series the current must pass both switches, so one open switch breaks the circuit. In
        parallel either closed switch gives the current a path. Switches placed across the lamp, shorting it when closed, invert these: NOR and
        NAND.
      </p>
    </div>
  );
}
