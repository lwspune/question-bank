/**
 * Static figure: why p-nitrophenol melts higher than o-nitrophenol (concept
 * cetalc-nitrophenol-melting-points).
 *
 * Top: o-nitrophenol. Its OH sits next to the nitro group and hydrogen-bonds to
 * it INSIDE the same molecule (intramolecular), so nothing holds one molecule
 * to the next: m.p. 45 °C, steam-volatile. Bottom: p-nitrophenol. The groups
 * are on opposite sides of the ring, too far apart, so each OH bonds to a
 * NEIGHBOURING molecule's nitro group (intermolecular): m.p. 114 °C,
 * non-volatile. The melting points are the concept's own; pinned by
 * tests/notes-w2-01.test.ts. Server component.
 */

export type Pt = { x: number; y: number };

/** The concept's melting points, °C. */
export const MELTING_POINTS = { paraNitrophenol: 114, orthoNitrophenol: 45, phenol: 41, paraCresol: 35 } as const;

const RING_R = 20;

/** Vertex k of a flat-topped hexagon (k = 0 is the right-hand vertex, angles go clockwise on screen). */
export function ringVertex(c: Pt, k: number, r = RING_R): Pt {
  const a = (Math.PI / 3) * k;
  return { x: Math.round((c.x + r * Math.cos(a)) * 100) / 100, y: Math.round((c.y + r * Math.sin(a)) * 100) / 100 };
}

/** Ring positions (vertex numbers) carrying OH and NO₂ in each isomer. */
export const POSITIONS = {
  ortho: { oh: 5, no2: 0 },
  para: { oh: 3, no2: 0 },
} as const;

/** Ring-step distance between the two groups: 1 for ortho (neighbours), 3 for para (opposite). */
export function ringSeparation(a: number, b: number): number {
  const d = Math.abs(a - b) % 6;
  return Math.min(d, 6 - d);
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/** A bond line from a to b, cut back `ta` and `tb` units at each end so it stops short of the atom labels. */
function Bond({ a, b, ta = 0, tb = 0, double = false }: { a: Pt; b: Pt; ta?: number; tb?: number; double?: boolean }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const p = { x: a.x + ux * ta, y: a.y + uy * ta };
  const q = { x: b.x - ux * tb, y: b.y - uy * tb };
  const lines = double ? [-1.6, 1.6] : [0];
  return (
    <g>
      {lines.map((o) => (
        <line key={o} x1={r2(p.x - uy * o)} y1={r2(p.y + ux * o)} x2={r2(q.x - uy * o)} y2={r2(q.y + ux * o)} className="stroke-foreground" strokeWidth={1.3} />
      ))}
    </g>
  );
}

function Atom({ p, label }: { p: Pt; label: string }) {
  return (
    <text x={p.x} y={p.y + 4} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
      {label}
    </text>
  );
}

function Ring({ c }: { c: Pt }) {
  const pts = [0, 1, 2, 3, 4, 5].map((k) => ringVertex(c, k));
  return (
    <g>
      <polygon points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" className="stroke-foreground" strokeWidth={1.3} />
      <circle cx={c.x} cy={c.y} r={11} fill="none" className="stroke-foreground" strokeWidth={1} />
    </g>
  );
}

function HBond({ a, b }: { a: Pt; b: Pt }) {
  return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeDasharray="2 3" strokeLinecap="round" className="stroke-amber-600 dark:stroke-amber-400" strokeWidth={2.2} />;
}

/** One nitro group on nitrogen n: a double bond up or down, a single bond to O⁻ the other way. */
function Nitro({ n, from, minusUp, len = 20 }: { n: Pt; from: Pt; minusUp: boolean; len?: number }) {
  const up = { x: n.x + len / 2, y: r2(n.y - len * 0.866) };
  const down = { x: n.x + len / 2, y: r2(n.y + len * 0.866) };
  return (
    <g>
      <Bond a={from} b={n} tb={7} />
      <Bond a={n} b={up} ta={6} tb={6} double={!minusUp} />
      <Bond a={n} b={down} ta={6} tb={6} double={minusUp} />
      <Atom p={n} label="N⁺" />
      <Atom p={up} label={minusUp ? "O⁻" : "O"} />
      <Atom p={down} label={minusUp ? "O" : "O⁻"} />
    </g>
  );
}

/** Geometry of the o-nitrophenol drawing. */
export const ORTHO = (() => {
  const c = { x: 56, y: 78 };
  const cOH = ringVertex(c, POSITIONS.ortho.oh);
  const cN = ringVertex(c, POSITIONS.ortho.no2);
  const O = { x: r2(cOH.x + 12), y: r2(cOH.y - 20.78) };
  const H = { x: O.x + 18, y: O.y };
  const N = { x: cN.x + 24, y: cN.y };
  const Ominus = { x: N.x + 12, y: r2(N.y - 20.78) };
  return { c, cOH, cN, O, H, N, Ominus };
})();

/** Geometry of two p-nitrophenol molecules in a row, held by one H-bond. */
export function paraMolecule(x0: number, y: number) {
  const O = { x: x0, y };
  const H = { x: x0 - 17, y };
  const c = { x: x0 + 20 + RING_R, y };
  const cOH = ringVertex(c, POSITIONS.para.oh);
  const cN = ringVertex(c, POSITIONS.para.no2);
  const N = { x: cN.x + 20, y };
  const Ominus = { x: N.x + 10, y: r2(y + 17.32) };
  return { O, H, c, cOH, cN, N, Ominus };
}

export const PARA_ROW = [paraMolecule(34, 192), paraMolecule(170, 192)] as const;

export default function CetNitrophenolHBonds() {
  const o = ORTHO;
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · one hydrogen bond inside, or between molecules
      </p>
      <svg
        viewBox="0 0 320 250"
        className="block h-auto w-full"
        role="img"
        aria-label="Top: o-nitrophenol, whose OH hydrogen-bonds to its own nitro group, melting point 45 degrees Celsius. Bottom: two p-nitrophenol molecules; the OH of one hydrogen-bonds to the nitro group of its neighbour, melting point 114 degrees Celsius."
      >
        {/* o-nitrophenol */}
        <Ring c={o.c} />
        <Bond a={o.cOH} b={o.O} tb={6} />
        <Bond a={o.O} b={o.H} ta={6} tb={5} />
        <Atom p={o.O} label="O" />
        <Atom p={o.H} label="H" />
        <Nitro n={o.N} from={o.cN} minusUp len={24} />
        <HBond a={{ x: o.H.x + 2, y: o.H.y + 5 }} b={{ x: o.Ominus.x - 3, y: o.Ominus.y - 7 }} />

        <text x={146} y={50} className="fill-foreground text-[12px] font-bold">
          o-Nitrophenol
        </text>
        <text x={146} y={66} className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          H-bond inside one molecule
        </text>
        <text x={146} y={82} className="fill-muted-foreground text-[11px]">
          (intramolecular)
        </text>
        <text x={146} y={100} className="fill-foreground text-[11px] font-semibold">
          m.p. {MELTING_POINTS.orthoNitrophenol} °C, steam-volatile
        </text>

        <line x1={8} y1={124} x2={312} y2={124} className="stroke-border" strokeWidth={1} />

        {/* p-nitrophenol, two molecules */}
        <text x={8} y={142} className="fill-foreground text-[12px] font-bold">
          p-Nitrophenol
        </text>
        <text x={98} y={142} className="fill-amber-700 text-[11px] font-semibold dark:fill-amber-300">
          H-bonds join neighbouring molecules
        </text>
        {PARA_ROW.map((m, i) => (
          <g key={i}>
            <Ring c={m.c} />
            <Bond a={m.H} b={m.O} ta={5} tb={6} />
            <Bond a={m.O} b={m.cOH} ta={6} />
            <Atom p={m.O} label="O" />
            <Atom p={m.H} label="H" />
            <Nitro n={m.N} from={m.cN} minusUp={false} />
          </g>
        ))}
        <HBond a={{ x: PARA_ROW[1].H.x - 6, y: PARA_ROW[1].H.y + 3 }} b={{ x: PARA_ROW[0].Ominus.x + 9, y: PARA_ROW[0].Ominus.y - 2 }} />
        <HBond a={{ x: PARA_ROW[1].Ominus.x + 9, y: PARA_ROW[1].Ominus.y - 2 }} b={{ x: 312, y: 200 }} />
        <text x={312} y={186} textAnchor="end" className="fill-muted-foreground text-[10px]">
          next
        </text>
        <text x={8} y={242} className="fill-foreground text-[11px] font-semibold">
          m.p. {MELTING_POINTS.paraNitrophenol} °C, non-volatile
        </text>
        <text x={312} y={242} textAnchor="end" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          dotted line: H-bond
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        In the ortho isomer the OH and NO₂ are neighbours on the ring, so the hydrogen bond closes inside the molecule and does nothing to hold
        molecules together. In the para isomer they are on opposite sides, too far apart, so each OH bonds to the next molecule: p-nitrophenol
        melts almost 70 °C higher.
      </p>
    </div>
  );
}
