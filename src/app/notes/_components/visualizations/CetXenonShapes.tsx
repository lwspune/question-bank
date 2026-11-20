/**
 * Static figure: lone pairs on xenon and the shapes they give (concept
 * cetg16-noble-gases-and-xenon).
 *
 * Xenon has 8 valence electrons; each Xe–F bond uses one, each Xe=O uses two,
 * and the rest sit as lone pairs: lp = (8 − Xe–F − 2 × Xe=O) ÷ 2. Drawn: XeF₂
 * (3, linear), XeOF₂ (2, T-shaped: the trap, not 3), XeF₄ (2, square planar),
 * XeOF₄ (1, square pyramidal, the ClF₅ shape) and XeO₃ (1, pyramidal). The
 * sketches are schematic (no bond angles measured). Lone-pair counts follow the
 * concept's formula; pinned by tests/notes-w2-01.test.ts. Server component.
 */

export type Ligand = { atom: "F" | "O"; dx: number; dy: number };
export type XenonCompound = { formula: string; nF: number; nO: number; shape: string; ligands: readonly Ligand[]; lonePairs: readonly number[] };

/** Lone pairs on Xe: (8 − n(Xe–F) − 2 n(Xe=O)) / 2. */
export function xenonLonePairs(nF: number, nO: number): number {
  return (8 - nF - 2 * nO) / 2;
}

const L = 30;
const P = { x: 26, y: 10 }; // the in-plane "depth" direction of a square drawn in perspective

/** Each compound: its bonded atoms (offsets from Xe) and lone-pair directions (degrees, 0 = right, clockwise on screen). */
export const XENON_COMPOUNDS: readonly XenonCompound[] = [
  {
    formula: "XeF₂",
    nF: 2,
    nO: 0,
    shape: "linear",
    ligands: [
      { atom: "F", dx: -L, dy: 0 },
      { atom: "F", dx: L, dy: 0 },
    ],
    lonePairs: [-90, 35, 145],
  },
  {
    formula: "XeOF₂",
    nF: 2,
    nO: 1,
    shape: "T-shaped",
    ligands: [
      { atom: "F", dx: 0, dy: -L },
      { atom: "F", dx: 0, dy: L },
      { atom: "O", dx: L, dy: 0 },
    ],
    lonePairs: [150, 210],
  },
  {
    formula: "XeF₄",
    nF: 4,
    nO: 0,
    shape: "square planar",
    ligands: [
      { atom: "F", dx: -L, dy: 0 },
      { atom: "F", dx: L, dy: 0 },
      { atom: "F", dx: -P.x, dy: P.y + 4 },
      { atom: "F", dx: P.x, dy: -P.y - 4 },
    ],
    lonePairs: [-90, 90],
  },
  {
    formula: "XeOF₄",
    nF: 4,
    nO: 1,
    shape: "square pyramidal",
    ligands: [
      { atom: "O", dx: 0, dy: -L },
      { atom: "F", dx: -L, dy: 4 },
      { atom: "F", dx: L, dy: 4 },
      { atom: "F", dx: -P.x, dy: P.y + 8 },
      { atom: "F", dx: P.x, dy: -P.y },
    ],
    lonePairs: [90],
  },
  {
    formula: "XeO₃",
    nF: 0,
    nO: 3,
    shape: "pyramidal",
    ligands: [
      { atom: "O", dx: -26, dy: 16 },
      { atom: "O", dx: 26, dy: 16 },
      { atom: "O", dx: 0, dy: 28 },
    ],
    lonePairs: [-90],
  },
];

const CELL = { w: 320 / 3, h: 122 } as const;
const r2 = (n: number) => Math.round(n * 100) / 100;

function BondTo({ c, l }: { c: { x: number; y: number }; l: Ligand }) {
  const len = Math.hypot(l.dx, l.dy);
  const ux = l.dx / len;
  const uy = l.dy / len;
  const a = { x: c.x + ux * 8, y: c.y + uy * 8 };
  const b = { x: c.x + l.dx - ux * 7, y: c.y + l.dy - uy * 7 };
  const offs = l.atom === "O" ? [-1.6, 1.6] : [0];
  return (
    <g>
      {offs.map((o) => (
        <line key={o} x1={r2(a.x - uy * o)} y1={r2(a.y + ux * o)} x2={r2(b.x - uy * o)} y2={r2(b.y + ux * o)} className="stroke-foreground" strokeWidth={1.2} />
      ))}
      <text
        x={r2(c.x + l.dx)}
        y={r2(c.y + l.dy + 4)}
        textAnchor="middle"
        className={l.atom === "O" ? "fill-rose-700 text-[11px] font-bold dark:fill-rose-300" : "fill-emerald-700 text-[11px] font-bold dark:fill-emerald-300"}
      >
        {l.atom}
      </text>
    </g>
  );
}

function LonePair({ c, deg }: { c: { x: number; y: number }; deg: number }) {
  const a = (deg * Math.PI) / 180;
  const cx = r2(c.x + 19 * Math.cos(a));
  const cy = r2(c.y + 19 * Math.sin(a));
  const px = -Math.sin(a) * 2.6;
  const py = Math.cos(a) * 2.6;
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={9} ry={5.5} transform={`rotate(${deg} ${cx} ${cy})`} className="fill-amber-100 stroke-amber-600 dark:fill-amber-950 dark:stroke-amber-400" strokeWidth={1} />
      <circle cx={r2(cx + px)} cy={r2(cy + py)} r={1.4} className="fill-amber-700 dark:fill-amber-300" />
      <circle cx={r2(cx - px)} cy={r2(cy - py)} r={1.4} className="fill-amber-700 dark:fill-amber-300" />
    </g>
  );
}

export default function CetXenonShapes() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · lone pairs on xenon and the shapes they give
      </p>
      <svg
        viewBox="0 0 320 244"
        className="block h-auto w-full"
        role="img"
        aria-label="Xenon compounds with their lone pairs: XeF2 three lone pairs, linear; XeOF2 two, T-shaped; XeF4 two, square planar; XeOF4 one, square pyramidal; XeO3 one, pyramidal. Lone pairs equal 8 minus the Xe–F bonds minus twice the Xe=O bonds, halved."
      >
        {XENON_COMPOUNDS.map((m, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const x0 = col * CELL.w;
          const y0 = row * CELL.h;
          const c = { x: r2(x0 + CELL.w / 2), y: y0 + 60 };
          const lp = xenonLonePairs(m.nF, m.nO);
          return (
            <g key={m.formula}>
              <text x={c.x} y={y0 + 13} textAnchor="middle" className="fill-foreground text-[12px] font-bold">
                {m.formula}
              </text>
              {m.lonePairs.map((deg) => (
                <LonePair key={deg} c={c} deg={deg} />
              ))}
              {m.ligands.map((l, k) => (
                <BondTo key={k} c={c} l={l} />
              ))}
              <text x={c.x} y={c.y + 4} textAnchor="middle" className="fill-foreground text-[11px] font-bold">
                Xe
              </text>
              <text x={c.x} y={y0 + 104} textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
                {lp} lone pair{lp === 1 ? "" : "s"}
              </text>
              <text x={c.x} y={y0 + 116} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {m.shape}
              </text>
            </g>
          );
        })}

        {/* The counting rule, in the sixth cell */}
        <g>
          <rect x={2 * CELL.w + 6} y={CELL.h + 8} width={CELL.w - 12} height={CELL.h - 16} rx={6} className="fill-background stroke-border" strokeWidth={1} />
          <text x={r2(2.5 * CELL.w)} y={CELL.h + 28} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
            Xe has 8 electrons
          </text>
          <text x={r2(2.5 * CELL.w)} y={CELL.h + 46} textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-300">
            each Xe–F uses 1
          </text>
          <text x={r2(2.5 * CELL.w)} y={CELL.h + 62} textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-300">
            each Xe=O uses 2
          </text>
          <text x={r2(2.5 * CELL.w)} y={CELL.h + 80} textAnchor="middle" className="fill-amber-700 text-[10px] dark:fill-amber-300">
            the rest pair up
          </text>
          <text x={r2(2.5 * CELL.w)} y={CELL.h + 94} textAnchor="middle" className="fill-amber-700 text-[10px] dark:fill-amber-300">
            as lone pairs
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Lone pairs = (8 − Xe–F bonds − 2 × Xe=O bonds) ÷ 2. XeOF₂: 8 − 2 − 2 = 4 electrons, so 2 lone pairs, not 3. XeOF₄: 8 − 4 − 2 = 2
        electrons, 1 lone pair, the same square pyramidal shape as ClF₅. Sketches show the shape only, not exact bond angles.
      </p>
    </div>
  );
}
