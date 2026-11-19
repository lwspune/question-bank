/**
 * Static figure: Kranz anatomy and the C₄ pathway, in the NEET concept's own
 * terms (nbops-c4).
 *
 * Top: a cross-section round one vein. Large bundle sheath cells, packed with
 * chloroplasts and with no spaces between them, form a wreath (Kranz) round
 * the vein; smaller mesophyll cells lie outside.
 * Bottom: what each of the two cells does. In the mesophyll, PEPcase fixes
 * CO₂ onto PEP (3 carbons) to give OAA (4 carbons), which forms malic acid or
 * aspartic acid. That C₄ acid moves to the bundle sheath, where it is broken
 * into CO₂, which enters the Calvin cycle (RuBisCO), and a 3-carbon molecule
 * that goes back to the mesophyll to make PEP again.
 *
 * The concept's trap is that each cell lacks one enzyme: the mesophyll has no
 * RuBisCO and the bundle sheath no PEPcase. The data below, with the carbon
 * counts, is pinned by tests/notes-neet-visuals-bio-a.test.ts. Server
 * component, no client state.
 */

export const CENTRE = { x: 120, y: 92 } as const;
export const VEIN_R = 22;

/** The two rings of cells round the vein. */
export const ANATOMY = {
  bundleSheath: { ring: 38, count: 10, r: 12, chloroplasts: 4 },
  mesophyll: { ring: 66, count: 16, r: 11, chloroplasts: 2 },
} as const;

/** Which enzyme each cell has and lacks (the concept's trap). */
export const CELL_ENZYMES = {
  mesophyll: { has: "PEPcase", lacks: "RuBisCO" },
  bundleSheath: { has: "RuBisCO", lacks: "PEPcase" },
} as const;

/** The pathway, step by step, with carbons on each side. */
export const C4_FLOW = [
  { cell: "mesophyll", what: "CO₂ fixed onto PEP by PEPcase", in: [["CO₂", 1], ["PEP", 3]], out: [["OAA", 4]] },
  { cell: "mesophyll", what: "OAA forms malic acid or aspartic acid", in: [["OAA", 4]], out: [["C₄ acid", 4]] },
  { cell: "bundleSheath", what: "the C₄ acid is broken down", in: [["C₄ acid", 4]], out: [["CO₂", 1], ["3C molecule", 3]] },
] as const;

export function ringCells(ring: number, count: number): { x: number; y: number }[] {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * 2 * Math.PI - Math.PI / 2;
    return {
      x: Math.round((CENTRE.x + ring * Math.cos(a)) * 100) / 100,
      y: Math.round((CENTRE.y + ring * Math.sin(a)) * 100) / 100,
    };
  });
}

/** Chloroplast offsets inside a cell. */
function chloroplastOffsets(n: number, d: number): { dx: number; dy: number }[] {
  if (n === 2) return [{ dx: -d, dy: 0 }, { dx: d, dy: 0 }];
  return [
    { dx: -d, dy: -d },
    { dx: d, dy: -d },
    { dx: -d, dy: d },
    { dx: d, dy: d },
  ];
}

export default function NeetKranzAnatomy() {
  const sheath = ringCells(ANATOMY.bundleSheath.ring, ANATOMY.bundleSheath.count);
  const meso = ringCells(ANATOMY.mesophyll.ring, ANATOMY.mesophyll.count);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · Kranz anatomy and the two cells
      </p>
      <svg
        viewBox="0 0 320 348"
        className="block h-auto w-full"
        role="img"
        aria-label="Cross-section of a C₄ leaf: a wreath of large bundle sheath cells full of chloroplasts round a vein, with mesophyll cells outside; mesophyll cells fix CO₂ with PEPcase into OAA, the C₄ acid moves to the bundle sheath where it releases CO₂ to the Calvin cycle and a 3-carbon molecule that returns to make PEP"
      >
        <defs>
          <marker id="kranz-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" className="fill-foreground" />
          </marker>
        </defs>

        {/* Mesophyll cells: smaller, fewer chloroplasts. */}
        {meso.map((p) => (
          <g key={`m-${p.x}-${p.y}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r={ANATOMY.mesophyll.r}
              className="fill-lime-50 stroke-lime-600 dark:fill-lime-950/40 dark:stroke-lime-500"
              strokeWidth={1}
            />
            {chloroplastOffsets(ANATOMY.mesophyll.chloroplasts, 4).map((o) => (
              <circle key={`${o.dx}-${o.dy}`} cx={p.x + o.dx} cy={p.y + o.dy} r={1.8} className="fill-emerald-500 dark:fill-emerald-400" />
            ))}
          </g>
        ))}

        {/* Bundle sheath cells: large, thick walls, touching, many chloroplasts. */}
        {sheath.map((p) => (
          <g key={`s-${p.x}-${p.y}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r={ANATOMY.bundleSheath.r}
              className="fill-emerald-100 stroke-emerald-800 dark:fill-emerald-900/60 dark:stroke-emerald-300"
              strokeWidth={2.5}
            />
            {chloroplastOffsets(ANATOMY.bundleSheath.chloroplasts, 4.5).map((o) => (
              <circle key={`${o.dx}-${o.dy}`} cx={p.x + o.dx} cy={p.y + o.dy} r={2.2} className="fill-emerald-600 dark:fill-emerald-400" />
            ))}
          </g>
        ))}

        {/* The vein. */}
        <circle cx={CENTRE.x} cy={CENTRE.y} r={VEIN_R} className="fill-amber-100 stroke-amber-600 dark:fill-amber-900/40 dark:stroke-amber-400" strokeWidth={1.5} />
        <text x={CENTRE.x} y={CENTRE.y + 4} textAnchor="middle" className="fill-amber-900 text-[11px] font-semibold dark:fill-amber-200">
          vein
        </text>

        {/* Labels. */}
        <text x={4} y={24} className="fill-foreground text-[11px] font-semibold">
          mesophyll cells
        </text>
        <line x1={50} y1={29} x2={meso[14].x - 6} y2={meso[14].y - 4} className="stroke-muted-foreground" strokeWidth={1} />
        <text x={206} y={22} className="fill-foreground text-[10px] font-bold">
          bundle sheath cells
        </text>
        {["large cells", "many chloroplasts", "thick walls", "no spaces between"].map((t, i) => (
          <text key={t} x={214} y={36 + 12 * i} className="fill-muted-foreground text-[10px]">
            {t}
          </text>
        ))}
        <line x1={208} y1={58} x2={sheath[2].x + 6} y2={sheath[2].y - 2} className="stroke-muted-foreground" strokeWidth={1} />
        <text x={316} y={150} textAnchor="end" className="fill-muted-foreground text-[10px]">
          Kranz means wreath
        </text>

        {/* The two cells and what each does. */}
        <rect x={6} y={188} width={148} height={152} rx={10} className="fill-lime-50 stroke-lime-600 dark:fill-lime-950/30 dark:stroke-lime-500" strokeWidth={1.5} />
        <rect x={166} y={188} width={148} height={152} rx={10} className="fill-emerald-50 stroke-emerald-800 dark:fill-emerald-950/40 dark:stroke-emerald-300" strokeWidth={2.5} />

        <text x={80} y={204} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
          Mesophyll cell
        </text>
        <text x={80} y={217} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          {`${CELL_ENZYMES.mesophyll.has}, no ${CELL_ENZYMES.mesophyll.lacks}`}
        </text>
        <text x={240} y={204} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
          Bundle sheath cell
        </text>
        <text x={240} y={217} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          {`${CELL_ENZYMES.bundleSheath.has}, no ${CELL_ENZYMES.bundleSheath.lacks}`}
        </text>

        {/* Mesophyll: CO₂ + PEP to OAA to malic or aspartic acid. */}
        <text x={80} y={238} textAnchor="middle" className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          CO₂
        </text>
        <line x1={80} y1={242} x2={80} y2={254} markerEnd="url(#kranz-arrow)" className="stroke-foreground" strokeWidth={1.2} />
        <text x={86} y={252} className="fill-muted-foreground text-[10px]">
          PEPcase
        </text>
        <text x={80} y={267} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          PEP (3C) → OAA (4C)
        </text>
        <line x1={80} y1={271} x2={80} y2={281} markerEnd="url(#kranz-arrow)" className="stroke-foreground" strokeWidth={1.2} />
        <text x={80} y={292} textAnchor="middle" className="fill-foreground text-[10px]">
          malic acid or
        </text>
        <text x={80} y={304} textAnchor="middle" className="fill-foreground text-[10px]">
          aspartic acid (4C)
        </text>
        <text x={80} y={330} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          PEP made again
        </text>

        {/* Across to the bundle sheath, and back. */}
        <line x1={134} y1={298} x2={188} y2={298} markerEnd="url(#kranz-arrow)" className="stroke-foreground" strokeWidth={1.2} />
        <line x1={188} y1={326} x2={124} y2={326} markerEnd="url(#kranz-arrow)" className="stroke-foreground" strokeWidth={1.2} />

        {/* Bundle sheath: C₄ acid to CO₂ (Calvin cycle) and a 3-carbon molecule. */}
        <text x={214} y={302} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
          C₄ acid
        </text>
        <line x1={232} y1={292} x2={266} y2={280} markerEnd="url(#kranz-arrow)" className="stroke-foreground" strokeWidth={1.2} />
        <text x={282} y={282} textAnchor="middle" className="fill-sky-700 text-[11px] font-semibold dark:fill-sky-300">
          CO₂
        </text>
        <line x1={282} y1={270} x2={282} y2={256} markerEnd="url(#kranz-arrow)" className="stroke-foreground" strokeWidth={1.2} />
        <text x={262} y={238} textAnchor="middle" className="fill-emerald-800 text-[11px] font-bold dark:fill-emerald-300">
          Calvin cycle
        </text>
        <text x={262} y={250} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          by RuBisCO
        </text>
        <line x1={214} y1={306} x2={214} y2={318} markerEnd="url(#kranz-arrow)" className="stroke-foreground" strokeWidth={1.2} />
        <text x={196} y={330} className="fill-foreground text-[10px] font-semibold">
          3C molecule
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The C₄ acid carries CO₂ from the mesophyll to the bundle sheath, so CO₂ stays high round RuBisCO. The Calvin cycle is
        still the main biosynthetic pathway.
      </p>
    </div>
  );
}
