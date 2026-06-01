"use client";

import { useRef, useState } from "react";

/**
 * Drag-to-rotate: the three coordinate planes (XY, YZ, ZX) meeting at the
 * origin, the three axes drawn in both directions, and a sample point in the
 * first octant. Rotating makes the eight octants legible in a way a fixed
 * projection can't.
 */

const W = 360;
const H = 320;
const OX = 180;
const OY = 165;
const S = 30;
const A = 2.4; // half-extent of each coordinate plane / axis

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function makeProject(az: number, el: number) {
  const sa = Math.sin(az), ca = Math.cos(az), se = Math.sin(el), ce = Math.cos(el);
  return (x: number, y: number, z: number): [number, number] => {
    const sx = -x * sa + y * ca;
    const sy = -x * se * ca - y * se * sa + z * ce;
    return [OX + sx * S, OY - sy * S];
  };
}

const DEFAULT_AZ = (38 * Math.PI) / 180;
const DEFAULT_EL = (20 * Math.PI) / 180;

const SAMPLE = { x: 1.5, y: 1, z: 1.6 };

export default function OctantsCoordinatePlanes() {
  const [az, setAz] = useState(DEFAULT_AZ);
  const [el, setEl] = useState(DEFAULT_EL);
  const drag = useRef<{ x: number; y: number } | null>(null);

  const onDown = (e: React.PointerEvent<SVGSVGElement>) => {
    drag.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    drag.current = { x: e.clientX, y: e.clientY };
    setAz((a) => a - dx * 0.01);
    setEl((v) => clamp(v + dy * 0.01, -1.45, 1.45));
  };
  const onUp = () => { drag.current = null; };

  const p = makeProject(az, el);
  const O = p(0, 0, 0);
  const poly = (pts: [number, number, number][]) =>
    pts.map(([x, y, z]) => p(x, y, z).join(",")).join(" ");

  // Sample point + its projections to the axes/planes
  const Pt = p(SAMPLE.x, SAMPLE.y, SAMPLE.z);
  const Pxy = p(SAMPLE.x, SAMPLE.y, 0);

  const axes: { e: [number, number]; n: [number, number]; label: string; lp: [number, number, number] }[] = [
    { e: p(A + 0.4, 0, 0), n: p(-(A + 0.4), 0, 0), label: "x", lp: [A + 0.55, 0, 0] },
    { e: p(0, A + 0.4, 0), n: p(0, -(A + 0.4), 0), label: "y", lp: [0, A + 0.55, 0] },
    { e: p(0, 0, A + 0.4), n: p(0, 0, -(A + 0.4)), label: "z", lp: [0, 0, A + 0.55] },
  ];

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/15 p-4 max-w-md mx-auto">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          Diagram · coordinate planes & octants (drag to rotate)
        </p>
        <button
          type="button"
          onClick={() => { setAz(DEFAULT_AZ); setEl(DEFAULT_EL); }}
          className="rounded-md border border-input bg-background px-2 py-0.5 text-[11px] font-medium text-foreground hover:bg-accent"
        >
          Reset
        </button>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto cursor-grab touch-none select-none active:cursor-grabbing"
        role="img"
        aria-label="The three coordinate planes meeting at the origin with a sample point; drag to rotate"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <defs>
          <marker id="oct-axis" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
          </marker>
        </defs>

        {/* coordinate planes */}
        <polygon points={poly([[A, A, 0], [-A, A, 0], [-A, -A, 0], [A, -A, 0]])} className="fill-indigo-400/15 stroke-indigo-400/40" strokeWidth={1} />
        <polygon points={poly([[0, A, A], [0, -A, A], [0, -A, -A], [0, A, -A]])} className="fill-emerald-400/12 stroke-emerald-400/40" strokeWidth={1} />
        <polygon points={poly([[A, 0, A], [-A, 0, A], [-A, 0, -A], [A, 0, -A]])} className="fill-sky-400/12 stroke-sky-400/40" strokeWidth={1} />

        {/* axes, both directions */}
        {axes.map((a) => {
          const lab = p(a.lp[0], a.lp[1], a.lp[2]);
          return (
            <g key={a.label}>
              <line x1={a.n[0]} y1={a.n[1]} x2={a.e[0]} y2={a.e[1]} stroke="currentColor" className="text-muted-foreground/70" strokeWidth={1.25} markerEnd="url(#oct-axis)" />
              <text x={lab[0]} y={lab[1]} className="fill-muted-foreground text-[11px] font-semibold" textAnchor="middle">{a.label}</text>
            </g>
          );
        })}

        {/* sample point + projection */}
        <line x1={Pt[0]} y1={Pt[1]} x2={Pxy[0]} y2={Pxy[1]} className="stroke-indigo-500/60" strokeWidth={1} strokeDasharray="3 3" />
        <line x1={O[0]} y1={O[1]} x2={Pxy[0]} y2={Pxy[1]} className="stroke-indigo-500/40" strokeWidth={1} strokeDasharray="3 3" />
        <circle cx={Pt[0]} cy={Pt[1]} r={4} className="fill-indigo-600 dark:fill-indigo-400" />
        <text x={Pt[0] + 7} y={Pt[1] - 4} className="fill-indigo-700 dark:fill-indigo-300 text-[11px] font-semibold">P(+,+,+)</text>

        <circle cx={O[0]} cy={O[1]} r={3} className="fill-foreground" />
        <text x={O[0] - 12} y={O[1] + 12} className="fill-muted-foreground text-[10px]">O</text>
      </svg>

      <p className="mt-2 text-xs text-muted-foreground">
        Three planes (XY, YZ, ZX), each splitting space in two → 2 × 2 × 2 = <span className="font-semibold text-foreground">8 octants</span>.
        P sits in the first octant (all coordinates positive).
      </p>
    </div>
  );
}
