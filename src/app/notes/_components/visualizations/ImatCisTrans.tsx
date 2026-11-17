/**
 * Static figure: cis- and trans-but-2-ene side by side, the concept's first
 * example (CH₃CH=CHCH₃). Each carbon of the C=C carries H and CH₃. In the cis
 * isomer the two CH₃ groups are on the same side of the double bond; in the
 * trans isomer, on opposite sides. A faint dashed line along the C=C marks
 * the two sides.
 *
 * Pedagogical aim: see that the same atoms, bonded in the same order, give
 * two different molecules because the C=C cannot rotate, and that this needs
 * two different groups on EACH carbon. Pinned by
 * tests/notes-imat-visuals-chem2.test.ts. Server component, no client state.
 */

/** The four positions around a horizontal C=C. */
export type Slots = { upLeft: string; downLeft: string; upRight: string; downRight: string };

export type Isomer = { name: string; side: string; slots: Slots; boilingPointC: number };

/**
 * Boiling points: cis-but-2-ene 3.7 °C, trans-but-2-ene 0.9 °C, rounded to
 * whole degrees on the figure. They show the concept's point that cis and
 * trans isomers have different physical properties.
 */
export const ISOMERS: readonly Isomer[] = [
  {
    name: "cis-but-2-ene",
    side: "CH₃ groups on the same side",
    slots: { upLeft: "CH₃", downLeft: "H", upRight: "CH₃", downRight: "H" },
    boilingPointC: 3.7,
  },
  {
    name: "trans-but-2-ene",
    side: "CH₃ groups on opposite sides",
    slots: { upLeft: "CH₃", downLeft: "H", upRight: "H", downRight: "CH₃" },
    boilingPointC: 0.9,
  },
];

/** True if the two CH₃ groups are on the same side (both up or both down). */
export function methylsSameSide(s: Slots): boolean {
  const left = s.upLeft === "CH₃" ? "up" : "down";
  const right = s.upRight === "CH₃" ? "up" : "down";
  return left === right;
}

const W = 320;
const H = 170;
const HALF_CC = 16; // half the C=C length
const ARM = 34; // length of each single bond
const ANGLE = (60 * Math.PI) / 180; // bonds leave the carbon at 120° to the C=C

function Panel({ cx, isomer }: { cx: number; isomer: Isomer }) {
  const cy = 76;
  const lx = cx - HALF_CC;
  const rx = cx + HALF_CC;
  const dx = ARM * Math.cos(ANGLE);
  const dy = ARM * Math.sin(ANGLE);
  const pos = [
    { key: "upLeft", x: lx - dx, y: cy - dy, from: lx },
    { key: "downLeft", x: lx - dx, y: cy + dy, from: lx },
    { key: "upRight", x: rx + dx, y: cy - dy, from: rx },
    { key: "downRight", x: rx + dx, y: cy + dy, from: rx },
  ] as const;
  return (
    <g>
      {/* The two sides of the double bond */}
      <line x1={cx - 70} y1={cy} x2={lx - 9} y2={cy} strokeDasharray="2 4" stroke="currentColor" className="text-muted-foreground/40" />
      <line x1={rx + 9} y1={cy} x2={cx + 70} y2={cy} strokeDasharray="2 4" stroke="currentColor" className="text-muted-foreground/40" />

      {pos.map((p) => {
        const group = isomer.slots[p.key];
        const isMethyl = group === "CH₃";
        const sx = p.from + (p.x - p.from) * 0.22;
        const sy = cy + (p.y - cy) * 0.22;
        const ex = p.from + (p.x - p.from) * 0.6;
        const ey = cy + (p.y - cy) * 0.6;
        return (
          <g key={p.key}>
            <line x1={sx} y1={sy} x2={ex} y2={ey} className="stroke-foreground" strokeWidth={1.8} />
            {isMethyl && <circle cx={p.x} cy={p.y} r={13} className="fill-amber-400/30 stroke-amber-600 dark:fill-amber-400/20 dark:stroke-amber-400" />}
            <text x={p.x} y={p.y + 4} textAnchor="middle" className={`${isMethyl ? "fill-amber-800 dark:fill-amber-200" : "fill-muted-foreground"} text-[11px] font-semibold`}>
              {group}
            </text>
          </g>
        );
      })}

      {/* C=C */}
      <line x1={lx + 7} y1={cy - 2.5} x2={rx - 7} y2={cy - 2.5} className="stroke-foreground" strokeWidth={1.8} />
      <line x1={lx + 7} y1={cy + 2.5} x2={rx - 7} y2={cy + 2.5} className="stroke-foreground" strokeWidth={1.8} />
      <text x={lx} y={cy + 4} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        C
      </text>
      <text x={rx} y={cy + 4} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        C
      </text>

      <text x={cx} y={14} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        {isomer.name}
      </text>
      <text x={cx} y={134} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        {isomer.side}
      </text>
      <text x={cx} y={150} textAnchor="middle" className="fill-muted-foreground text-[10px] tabular-nums">
        boils at {Math.round(isomer.boilingPointC)} °C
      </text>
    </g>
  );
}

export default function ImatCisTrans() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · cis and trans isomers of but-2-ene
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Cis-but-2-ene and trans-but-2-ene side by side. Each carbon of the C=C double bond carries H and CH3. In cis both CH3 groups are on the same side of the double bond; in trans they are on opposite sides. Cis boils at about 4 degrees Celsius, trans at about 1 degree."
      >
        <Panel cx={80} isomer={ISOMERS[0]} />
        <line x1={W / 2} y1={24} x2={W / 2} y2={122} stroke="currentColor" className="text-border" />
        <Panel cx={240} isomer={ISOMERS[1]} />
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Both are CH₃CH=CHCH₃: the same atoms in the same order. The C=C cannot rotate, so the two CH₃ groups are
        locked on the same side (cis) or on opposite sides (trans), and these are two different molecules with
        different boiling points. It works because each carbon of the C=C carries two different groups, H and CH₃.
      </p>
    </div>
  );
}
