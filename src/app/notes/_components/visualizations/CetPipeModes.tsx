/**
 * Static figure: the first two modes of an open pipe and of a closed pipe
 * (concept cetp-organ-pipes). An open end is an antinode (A), a closed end a
 * node (N). The open pipe fits λ/2 and all its multiples, n = pv/2L; the
 * closed pipe fits λ/4 and only its ODD multiples, n = (2p − 1)v/4L, so its
 * first overtone is the 3rd harmonic (the concept's trap).
 *
 * Frequencies are the concept's worked example: a 0.5 m pipe with sound at
 * 340 m/s gives 340 Hz open; 170 Hz and 510 Hz closed. Curves are the air's
 * displacement at its two extremes. Pinned by
 * tests/notes-cet-visuals-phys-b.test.ts. Server component, no client state.
 */

/** The concept's worked example. */
export const PIPE_EXAMPLE = { L: 0.5, v: 340 } as const;

/** Open pipe, pth harmonic: n = pv/2L. */
export function openFreq(p: number, L: number = PIPE_EXAMPLE.L, v: number = PIPE_EXAMPLE.v): number {
  return (p * v) / (2 * L);
}

/** Closed pipe, pth mode (p = 1, 2, ...): n = (2p − 1)v/4L, the (2p − 1)th harmonic. */
export function closedFreq(p: number, L: number = PIPE_EXAMPLE.L, v: number = PIPE_EXAMPLE.v): number {
  return ((2 * p - 1) * v) / (4 * L);
}

// Geometry (viewBox units). Every pipe runs from PX0 (left end) to PX1 (right end).
export const PX0 = 76;
export const PX1 = 236;
const PL = PX1 - PX0;
const HALF_H = 12;
const AMP = 10;
const SAMPLES = 80;

export type PipeKind = "open" | "closed";

/**
 * Air displacement amplitude along the pipe (fraction of the largest), with
 * x measured from the left end as a fraction u of the length. The closed pipe
 * is closed at its LEFT end (u = 0), a node.
 *   open, harmonic h:   |cos(hπu)|   (antinodes at both ends)
 *   closed, harmonic h: |sin(hπu/2)| (node at u = 0, antinode at u = 1), h odd
 */
export function displacement(kind: PipeKind, harmonic: number, u: number): number {
  return kind === "open" ? Math.abs(Math.cos(harmonic * Math.PI * u)) : Math.abs(Math.sin((harmonic * Math.PI * u) / 2));
}

/** Positions (fractions of L from the left end) of nodes and antinodes. */
export function nodesAndAntinodes(kind: PipeKind, harmonic: number): { nodes: number[]; antinodes: number[] } {
  const nodes: number[] = [];
  const antinodes: number[] = [];
  if (kind === "open") {
    // antinodes every 1/h from u = 0, nodes halfway between
    for (let k = 0; k <= harmonic; k++) antinodes.push(k / harmonic);
    for (let k = 0; k < harmonic; k++) nodes.push((k + 0.5) / harmonic);
  } else {
    // node at u = 0, then nodes every 2/h; antinodes at odd multiples of 1/h
    for (let k = 0; 2 * k <= harmonic; k++) nodes.push((2 * k) / harmonic);
    for (let k = 0; 2 * k + 1 <= harmonic; k++) antinodes.push((2 * k + 1) / harmonic);
  }
  return { nodes, antinodes };
}

/** The four rows drawn: the first two modes of each pipe. */
export const PIPE_ROWS: readonly {
  kind: PipeKind;
  harmonic: number;
  name: string;
  formula: string;
  freq: number;
}[] = [
  { kind: "open", harmonic: 1, name: "fundamental", formula: "n = v/2L", freq: openFreq(1) },
  { kind: "open", harmonic: 2, name: "1st overtone", formula: "n = 2v/2L", freq: openFreq(2) },
  { kind: "closed", harmonic: 1, name: "fundamental", formula: "n = v/4L", freq: closedFreq(1) },
  { kind: "closed", harmonic: 3, name: "1st overtone", formula: "n = 3v/4L", freq: closedFreq(2) },
];

const r2 = (n: number) => Math.round(n * 100) / 100;

function curve(kind: PipeKind, h: number, cy: number, sign: 1 | -1): string {
  const pts: string[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const u = i / SAMPLES;
    pts.push(`${i === 0 ? "M" : "L"} ${r2(PX0 + PL * u)} ${r2(cy - sign * AMP * displacement(kind, h, u))}`);
  }
  return pts.join(" ");
}

function PipeRow({ row, cy }: { row: (typeof PIPE_ROWS)[number]; cy: number }) {
  const { nodes, antinodes } = nodesAndAntinodes(row.kind, row.harmonic);
  return (
    <g>
      {/* The pipe's walls */}
      <line x1={PX0} y1={cy - HALF_H} x2={PX1} y2={cy - HALF_H} className="stroke-foreground" strokeWidth={1.5} />
      <line x1={PX0} y1={cy + HALF_H} x2={PX1} y2={cy + HALF_H} className="stroke-foreground" strokeWidth={1.5} />
      {row.kind === "closed" && <rect x={PX0 - 5} y={cy - HALF_H - 1} width={5} height={2 * HALF_H + 2} className="fill-foreground" />}

      {/* Air displacement at its two extremes */}
      <path d={curve(row.kind, row.harmonic, cy, 1)} fill="none" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.6} />
      <path d={curve(row.kind, row.harmonic, cy, -1)} fill="none" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth={1.6} />

      {nodes.map((u) => (
        <text key={`n${u}`} x={PX0 + PL * u} y={cy + HALF_H + 11} textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-300">
          N
        </text>
      ))}
      {antinodes.map((u) => (
        <text key={`a${u}`} x={PX0 + PL * u} y={cy - HALF_H - 4} textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-300">
          A
        </text>
      ))}

      <text x={4} y={cy - 2} className="fill-foreground text-[10px] font-semibold">
        {row.name}
      </text>
      <text x={4} y={cy + 10} className="fill-muted-foreground text-[10px]">
        {`harmonic ${row.harmonic}`}
      </text>
      <text x={316} y={cy - 2} textAnchor="end" className="fill-foreground text-[10px]">
        {row.formula}
      </text>
      <text x={316} y={cy + 10} textAnchor="end" className="fill-indigo-700 text-[11px] font-semibold tabular-nums dark:fill-indigo-300">
        {`${row.freq} Hz`}
      </text>
    </g>
  );
}

const ROW_Y = [46, 104, 192, 250] as const;

export default function CetPipeModes() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · open pipe and closed pipe, first two modes
      </p>

      <svg
        viewBox="0 0 320 278"
        className="block h-auto w-full"
        role="img"
        aria-label="An open pipe has antinodes at both ends and gives every harmonic: 340 hertz then 680 hertz for a 0.5 metre pipe. A pipe closed at one end has a node at the closed end and gives only odd harmonics: 170 hertz then 510 hertz."
      >
        <text x={160} y={14} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Open pipe: both ends antinodes, all harmonics
        </text>
        <PipeRow row={PIPE_ROWS[0]} cy={ROW_Y[0]} />
        <PipeRow row={PIPE_ROWS[1]} cy={ROW_Y[1]} />

        <line x1={4} y1={140} x2={316} y2={140} className="stroke-border" strokeWidth={1} />

        <text x={160} y={158} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
          Closed pipe: node at closed end, odd harmonics
        </text>
        <PipeRow row={PIPE_ROWS[2]} cy={ROW_Y[2]} />
        <PipeRow row={PIPE_ROWS[3]} cy={ROW_Y[3]} />
      </svg>

      <p className="mt-3 text-xs text-muted-foreground">
        Both pipes are 0.5 m long, with sound at 340 m/s. The open pipe fits λ/2 and gives 340 Hz, 680 Hz, 1020 Hz
        (every harmonic). The closed pipe fits only λ/4, so its fundamental is half as high, 170 Hz, and there is no 2nd
        harmonic: its first overtone is the 3rd harmonic, 510 Hz, then 850 Hz. The blue curves show how far the air
        moves at each point.
      </p>
    </div>
  );
}
