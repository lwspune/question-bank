/**
 * Static figure: why NH₃ (1.47 D) is far more polar than NF₃ (0.23 D)
 * (concept jcbond-dipole-direction).
 *
 * - Chemist's crossed arrow: from the positive end to the negative end, the
 *   cross at the positive end, the head at the negative end.
 * - NH₃: each N–H bond moment points TOWARDS N; seen from the side of the
 *   pyramid, each has an upward part, along the lone-pair moment, so they add.
 * - NF₃: each N–F bond moment points AWAY from N (towards F), downward, so
 *   they oppose the lone-pair moment and partly cancel it.
 * - No net arrow is drawn: the concept gives the sizes (1.47 D, 0.23 D), not
 *   the direction of NF₃'s small net moment.
 *
 * Server component, pure SVG. Pinned by tests/notes-w2-11.test.ts.
 */

type Pt = { x: number; y: number };

export const MOLECULES = [
  { id: "NH3", formula: "NH₃", outer: "H", mu: 1.47, towardsN: true, verdict: "bond moments add to" },
  { id: "NF3", formula: "NF₃", outer: "F", mu: 0.23, towardsN: false, verdict: "bond moments oppose" },
] as const;

export type MoleculeId = (typeof MOLECULES)[number]["id"];

export const CENTRES: Record<MoleculeId, number> = { NH3: 80, NF3: 240 };
const N_Y = 96;

/** Bond ends relative to N, and the side each bond's arrow is drawn on. */
export const BONDS = [
  { dx: -46, dy: 30, off: { x: -0.55, y: -0.83 } },
  { dx: 46, dy: 30, off: { x: 0.55, y: -0.83 } },
  { dx: 0, dy: 52, off: { x: 1, y: 0 } },
] as const;

const OFFSET = 9;
const r2 = (n: number) => Math.round(n * 100) / 100;

export function nAt(id: MoleculeId): Pt {
  return { x: CENTRES[id], y: N_Y };
}

export function outerAt(id: MoleculeId, k: number): Pt {
  const n = nAt(id);
  return { x: n.x + BONDS[k].dx, y: n.y + BONDS[k].dy };
}

/** Crossed arrow beside bond k: tail (the cross, + end) and head (− end). */
export function bondArrow(id: MoleculeId, k: number): { tail: Pt; head: Pt } {
  const n = nAt(id);
  const o = outerAt(id, k);
  const off = BONDS[k].off;
  const at = (t: number): Pt => ({
    x: r2(n.x + (o.x - n.x) * t + off.x * OFFSET),
    y: r2(n.y + (o.y - n.y) * t + off.y * OFFSET),
  });
  const nearN = at(0.25);
  const nearOuter = at(0.8);
  const towardsN = MOLECULES.find((m) => m.id === id)!.towardsN;
  return towardsN ? { tail: nearOuter, head: nearN } : { tail: nearN, head: nearOuter };
}

/** The lone-pair moment: from N up into the lone pair. */
export function lonePairArrow(id: MoleculeId): { tail: Pt; head: Pt } {
  const n = nAt(id);
  return { tail: { x: n.x, y: n.y - 8 }, head: { x: n.x, y: n.y - 46 } };
}

function CrossedArrow({ tail, head, className, fillClass }: { tail: Pt; head: Pt; className: string; fillClass: string }) {
  const dx = head.x - tail.x;
  const dy = head.y - tail.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const back = { x: r2(head.x - ux * 6), y: r2(head.y - uy * 6) };
  const w1 = { x: r2(back.x - uy * 3.5), y: r2(back.y + ux * 3.5) };
  const w2 = { x: r2(back.x + uy * 3.5), y: r2(back.y - ux * 3.5) };
  const c = { x: r2(tail.x + ux * 4), y: r2(tail.y + uy * 4) };
  return (
    <g>
      <line x1={tail.x} y1={tail.y} x2={back.x} y2={back.y} strokeWidth={1.6} className={className} />
      <polygon points={`${head.x},${head.y} ${w1.x},${w1.y} ${w2.x},${w2.y}`} className={fillClass} />
      <line x1={r2(c.x - uy * 4)} y1={r2(c.y + ux * 4)} x2={r2(c.x + uy * 4)} y2={r2(c.y - ux * 4)} strokeWidth={1.6} className={className} />
    </g>
  );
}

function Molecule({ id }: { id: MoleculeId }) {
  const m = MOLECULES.find((x) => x.id === id)!;
  const n = nAt(id);
  const lp = lonePairArrow(id);
  return (
    <g>
      {/* Lone pair */}
      <ellipse cx={n.x} cy={n.y - 26} rx={9} ry={17} strokeWidth={1} className="fill-amber-100 stroke-amber-500 dark:fill-amber-950/50 dark:stroke-amber-400" />
      <circle cx={n.x - 3.5} cy={n.y - 36} r={1.8} className="fill-amber-700 dark:fill-amber-300" />
      <circle cx={n.x + 3.5} cy={n.y - 36} r={1.8} className="fill-amber-700 dark:fill-amber-300" />
      <line x1={lp.tail.x} y1={lp.tail.y} x2={lp.head.x} y2={lp.head.y + 6} strokeWidth={2} className="stroke-amber-600 dark:stroke-amber-400" />
      <polygon points={`${lp.head.x},${lp.head.y} ${lp.head.x - 4},${lp.head.y + 7} ${lp.head.x + 4},${lp.head.y + 7}`} className="fill-amber-600 dark:fill-amber-400" />

      {/* Bonds and atoms */}
      {BONDS.map((b, k) => {
        const o = outerAt(id, k);
        return (
          <g key={k}>
            <line x1={n.x} y1={n.y} x2={o.x} y2={o.y} strokeWidth={2} className="stroke-foreground" />
            <circle cx={o.x} cy={o.y} r={8} className="fill-background stroke-foreground" strokeWidth={1.2} />
            <text x={o.x} y={o.y + 3.5} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
              {m.outer}
            </text>
          </g>
        );
      })}
      <circle cx={n.x} cy={n.y} r={9} className="fill-background stroke-foreground" strokeWidth={1.4} />
      <text x={n.x} y={n.y + 3.5} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
        N
      </text>

      {/* Bond moments */}
      {BONDS.map((_, k) => {
        const a = bondArrow(id, k);
        return <CrossedArrow key={k} tail={a.tail} head={a.head} className="stroke-sky-600 dark:stroke-sky-400" fillClass="fill-sky-600 dark:fill-sky-400" />;
      })}

      <text x={n.x} y={176} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
        {m.formula}: {m.mu} D
      </text>
      <text x={n.x} y={191} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        {m.verdict}
      </text>
      <text x={n.x} y={203} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        the lone-pair moment
      </text>
    </g>
  );
}

export default function JeeNh3Nf3Dipoles() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · bond moments in ammonia and nitrogen trifluoride
      </p>
      <svg
        viewBox="0 0 320 240"
        className="block h-auto w-full"
        role="img"
        aria-label="Two pyramidal molecules, each with a lone pair on nitrogen and a lone-pair moment pointing up into it. In ammonia, 1.47 debye, the three crossed arrows for the N–H bonds point towards nitrogen, so their upward parts add to the lone-pair moment. In nitrogen trifluoride, 0.23 debye, the three N–F arrows point away from nitrogen towards fluorine, downward, so they oppose the lone-pair moment and partly cancel it."
      >
        <Molecule id="NH3" />
        <Molecule id="NF3" />
        {/* Legend */}
        <CrossedArrow tail={{ x: 40, y: 224 }} head={{ x: 76, y: 224 }} className="stroke-sky-600 dark:stroke-sky-400" fillClass="fill-sky-600 dark:fill-sky-400" />
        <text x={34} y={227.5} textAnchor="end" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          +
        </text>
        <text x={82} y={227.5} className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-300">
          −
        </text>
        <text x={94} y={227.5} className="fill-sky-700 text-[10px] dark:fill-sky-300">
          bond moment
        </text>
        <line x1={196} y1={224} x2={224} y2={224} strokeWidth={2} className="stroke-amber-600 dark:stroke-amber-400" />
        <polygon points="232,224 225,220 225,228" className="fill-amber-600 dark:fill-amber-400" />
        <text x={238} y={227.5} className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-300">
          lone pair
        </text>
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        The crossed arrow runs from the positive end to the negative end: the cross at the positive end, the head at the negative end. Each N–F bond is
        more polar than an N–H bond, yet NF₃ is far less polar, because its bond moments point away from N and work against the lone-pair moment.
      </p>
    </div>
  );
}
