/**
 * Still: diborane against borazine (concept jcpb-diborane-borazine), with the
 * concept table's own numbers.
 *
 * Top, B₂H₆: drawn in the plane of the two borons and the two bridging H, so
 * the bridge angle H–B–H (97°) is true size. The four terminal H stick out of
 * that plane (wedge towards you, dashes away), which is the point of the
 * concept's trap: diborane is not planar. Each bridge is one 3-centre-2-electron
 * bond (shaded banana).
 *
 * Bottom, B₃N₃H₆: a flat ring of alternating B and N, six equal B–N bonds,
 * boron sp², electrons delocalised round the ring.
 *
 * Server component, pure SVG. Pinned by tests/notes-w2-03.test.ts.
 */

export const DIBORANE = {
  /** Valence electrons: 2 B × 3 + 6 H × 1. */
  valenceElectrons: 2 * 3 + 6 * 1,
  terminalBonds: 4,
  bridges: 2,
  electronsPerBridge: 2,
  terminalAngle: 122,
  bridgeAngle: 97,
  terminalPm: 119,
  bridgePm: 134,
} as const;

type Pt = { x: number; y: number };

// Geometry (viewBox 0 0 320 334).
export const B1: Pt = { x: 118, y: 92 };
export const B2: Pt = { x: 202, y: 92 };
const HALF = (B2.x - B1.x) / 2;
/** Bridging H placed so that the H–B–H angle at each boron is the stated 97°. */
const RISE = HALF * Math.tan(((DIBORANE.bridgeAngle / 2) * Math.PI) / 180);
export const HB_TOP: Pt = { x: (B1.x + B2.x) / 2, y: B1.y - RISE };
export const HB_BOTTOM: Pt = { x: (B1.x + B2.x) / 2, y: B1.y + RISE };

/** The angle (degrees) at `at` between the directions to p and q. */
export function angleAt(at: Pt, p: Pt, q: Pt): number {
  const a = Math.atan2(p.y - at.y, p.x - at.x);
  const b = Math.atan2(q.y - at.y, q.x - at.x);
  let d = Math.abs(a - b);
  if (d > Math.PI) d = 2 * Math.PI - d;
  return (d * 180) / Math.PI;
}

/** Borazine ring: six atoms, B and N alternating, on a circle. */
export const RING_CENTRE: Pt = { x: 130, y: 278 };
const RING_R = 28;
export const RING = Array.from({ length: 6 }, (_, k) => {
  const a = ((60 * k) * Math.PI) / 180;
  return {
    el: k % 2 === 0 ? ("N" as const) : ("B" as const),
    x: RING_CENTRE.x + RING_R * Math.cos(a),
    y: RING_CENTRE.y + RING_R * Math.sin(a),
    ux: Math.cos(a),
    uy: Math.sin(a),
  };
});

/** Borazine formula counted from the drawing: each ring atom carries one H. */
export function borazineFormula(): { B: number; N: number; H: number } {
  return {
    B: RING.filter((a) => a.el === "B").length,
    N: RING.filter((a) => a.el === "N").length,
    H: RING.length,
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

function Atom({ p, label, cls }: { p: Pt; label: string; cls: string }) {
  return (
    <g>
      <circle cx={r1(p.x)} cy={r1(p.y)} r={8} className="fill-background" />
      <text x={r1(p.x)} y={r1(p.y) + 4} textAnchor="middle" className={`${cls} text-[12px] font-semibold`}>
        {label}
      </text>
    </g>
  );
}

function Line({ a, b, dash }: { a: Pt; b: Pt; dash?: boolean }) {
  return (
    <line
      x1={r1(a.x)}
      y1={r1(a.y)}
      x2={r1(b.x)}
      y2={r1(b.y)}
      strokeWidth={1.4}
      strokeDasharray={dash ? "2 2" : undefined}
      className="stroke-foreground"
    />
  );
}

/** A wedge from a towards b (narrow at a). */
function Wedge({ a, b }: { a: Pt; b: Pt }) {
  const ang = Math.atan2(b.y - a.y, b.x - a.x);
  const px = -Math.sin(ang) * 3;
  const py = Math.cos(ang) * 3;
  return <polygon points={`${r1(a.x)},${r1(a.y)} ${r1(b.x + px)},${r1(b.y + py)} ${r1(b.x - px)},${r1(b.y - py)}`} className="fill-foreground" />;
}

function arcPath(at: Pt, p: Pt, q: Pt, r: number): string {
  const a = Math.atan2(p.y - at.y, p.x - at.x);
  const b = Math.atan2(q.y - at.y, q.x - at.x);
  const s = { x: at.x + r * Math.cos(a), y: at.y + r * Math.sin(a) };
  const e = { x: at.x + r * Math.cos(b), y: at.y + r * Math.sin(b) };
  return `M ${r1(s.x)} ${r1(s.y)} A ${r} ${r} 0 0 1 ${r1(e.x)} ${r1(e.y)}`;
}

export default function JeeDiboraneBorazine() {
  const tl = { wedge: { x: 76, y: 108 }, dash: { x: 82, y: 72 } };
  const tr = { wedge: { x: 244, y: 108 }, dash: { x: 238, y: 72 } };
  const mid = (a: Pt, b: Pt) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  const bridgeMid = mid(B1, HB_TOP);
  return (
    <div className="mx-auto max-w-md rounded-lg border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/15">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
        Diagram · diborane and borazine
      </p>

      <svg
        viewBox="0 0 320 334"
        className="block h-auto w-full"
        role="img"
        aria-label="Diborane: two borons joined by two bridging hydrogens, one above and one below, each bridge a three-centre two-electron banana bond, bridge H-B-H angle 97 degrees, bridging B-H 134 pm. The four terminal hydrogens, B-H 119 pm, lie out of the plane of the bridges, so the molecule is not planar. Borazine: a flat six-membered ring of alternating boron and nitrogen, each with one hydrogen, all B-N bonds equal, boron sp2, no banana bonds."
      >
        <text x={6} y={14} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          Diborane, B₂H₆: 12 valence electrons
        </text>

        {/* Banana bonds, shaded behind */}
        <path
          d={`M ${B1.x} ${B1.y} Q ${HB_TOP.x} ${r1(HB_TOP.y - 34)} ${B2.x} ${B2.y} Q ${HB_TOP.x} ${r1(HB_TOP.y + 36)} ${B1.x} ${B1.y} Z`}
          className="fill-amber-300/40 dark:fill-amber-500/25"
        />
        <path
          d={`M ${B1.x} ${B1.y} Q ${HB_BOTTOM.x} ${r1(HB_BOTTOM.y + 34)} ${B2.x} ${B2.y} Q ${HB_BOTTOM.x} ${r1(HB_BOTTOM.y - 36)} ${B1.x} ${B1.y} Z`}
          className="fill-amber-300/40 dark:fill-amber-500/25"
        />

        <Line a={B1} b={HB_TOP} />
        <Line a={HB_TOP} b={B2} />
        <Line a={B1} b={HB_BOTTOM} />
        <Line a={HB_BOTTOM} b={B2} />

        <Wedge a={B1} b={tl.wedge} />
        <Line a={B1} b={tl.dash} dash />
        <Wedge a={B2} b={tr.wedge} />
        <Line a={B2} b={tr.dash} dash />
        <text x={tl.wedge.x - 4} y={tl.wedge.y + 8} textAnchor="end" className="fill-foreground text-[11px]">
          H
        </text>
        <text x={tl.dash.x - 4} y={tl.dash.y + 2} textAnchor="end" className="fill-foreground text-[11px]">
          H
        </text>
        <text x={tr.wedge.x + 4} y={tr.wedge.y + 8} className="fill-foreground text-[11px]">
          H
        </text>
        <text x={tr.dash.x + 4} y={tr.dash.y + 2} className="fill-foreground text-[11px]">
          H
        </text>

        {/* Bridge angle at B2 */}
        <path d={arcPath(B2, HB_BOTTOM, HB_TOP, 16)} fill="none" strokeWidth={1} className="stroke-indigo-600 dark:stroke-indigo-400" />
        <text x={B2.x - 24} y={B2.y + 4} textAnchor="end" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          97°
        </text>

        <Atom p={B1} label="B" cls="fill-rose-700 dark:fill-rose-300" />
        <Atom p={B2} label="B" cls="fill-rose-700 dark:fill-rose-300" />
        <Atom p={HB_TOP} label="H" cls="fill-amber-700 dark:fill-amber-300" />
        <Atom p={HB_BOTTOM} label="H" cls="fill-amber-700 dark:fill-amber-300" />

        <text x={r1(bridgeMid.x) - 10} y={r1(bridgeMid.y) - 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
          134 pm
        </text>
        <text x={98} y={127} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          119 pm
        </text>
        <text x={HB_TOP.x + 12} y={HB_TOP.y - 8} className="fill-amber-700 text-[10px] dark:fill-amber-300">
          banana bond: 3 centres, 2 e⁻
        </text>
        <text x={292} y={92} textAnchor="end" className="fill-muted-foreground text-[10px]">
          B about sp³
        </text>

        <text x={6} y={162} className="fill-foreground text-[10px]">
          4 terminal B–H: ordinary 2-centre-2-electron bonds
        </text>
        <text x={6} y={176} className="fill-foreground text-[10px]">
          terminal H–B–H 122°, wider than the bridge angle
        </text>
        <text x={6} y={190} className="fill-foreground text-[10px]">
          2 bridges: one 3-centre bond each, 2 × 2 = 4 electrons
        </text>

        <line x1={6} y1={199} x2={314} y2={199} className="stroke-border" />

        <text x={6} y={214} className="fill-indigo-700 text-[11px] font-semibold dark:fill-indigo-300">
          Borazine, B₃N₃H₆: inorganic benzene
        </text>
        <circle cx={RING_CENTRE.x} cy={RING_CENTRE.y} r={15} fill="none" strokeWidth={1} strokeDasharray="3 2" className="stroke-indigo-500 dark:stroke-indigo-400" />
        {RING.map((a, i) => {
          const b = RING[(i + 1) % 6];
          return <Line key={`b${i}`} a={a} b={b} />;
        })}
        {RING.map((a, i) => (
          <g key={`h${i}`}>
            <Line a={{ x: a.x + 8 * a.ux, y: a.y + 8 * a.uy }} b={{ x: a.x + 20 * a.ux, y: a.y + 20 * a.uy }} />
            <text x={r1(a.x + 27 * a.ux)} y={r1(a.y + 27 * a.uy + 4)} textAnchor="middle" className="fill-foreground text-[10px]">
              H
            </text>
          </g>
        ))}
        {RING.map((a, i) => (
          <Atom key={`a${i}`} p={a} label={a.el} cls={a.el === "B" ? "fill-rose-700 dark:fill-rose-300" : "fill-sky-700 dark:fill-sky-300"} />
        ))}
        <text x={200} y={246} className="fill-foreground text-[10px]">
          flat ring,
        </text>
        <text x={200} y={258} className="fill-foreground text-[10px]">
          B and N alternate
        </text>
        <text x={200} y={270} className="fill-foreground text-[10px]">
          B sp²
        </text>
        <text x={200} y={284} className="fill-foreground text-[10px]">
          six equal B–N bonds
        </text>
        <text x={200} y={298} className="fill-foreground text-[10px]">
          no banana bonds
        </text>
      </svg>

      <p className="mt-2 text-sm text-foreground">
        Diborane is drawn in the plane of its two borons and two bridging hydrogens. The four terminal hydrogens lie in another plane, so
        the molecule is not planar. Borazine is flat, with only ordinary bonds.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">Wedge: towards you. Dashes: away from you. Shaded: a bridge holding one electron pair over three atoms.</p>
    </div>
  );
}
